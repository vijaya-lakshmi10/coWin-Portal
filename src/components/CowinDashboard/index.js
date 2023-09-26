// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatusConstants={
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    inProgress:'IN_PROGRESS'
}

class CowinDashboard extends Component{
    state={apiStatus:apiStatusConstants.initial,
    vaccinationData:{}
    }

    componentDidMount(){
        this.getVaccinationData()
    }

    getVaccinationData=async()=>{
        this.setState({apiStatus:apiStatusConstants.inProgress})
        const covidVaccinationDataApiUrl='https://apis.ccbp.in/covid-vaccination-data'
        const response=await fetch(covidVaccinationDataApiUrl)
        if(response.ok===true){
        const fetchedData=await response.json()
        const updatedData={
            last7DaysVaccination:fetchedData.last_7_days_vaccination.map(data=>({
                vaccineDate:data.vaccine_date,
                dose1:data.dose_1,
                dose2:data.dose_2,
            }),
            ),
            vaccinationByAge:fetchedData.vaccination_by_age.map(eachAge=>({
                age:eachAge.age,
                count:eachAge.count,
            })),
            vaccinationByGender:fetchedData.vaccination_by_gender.map(eachData=>({
                gender:eachData.gender,
                count:eachData.count,
            }),
            ),
        }
        this.setState({apiStatus:apiStatusConstants.success,
        vaccinationData:updatedData,
        })
        }
        else{
            this.setState({apiStatus:apiStatusConstants.failure})
        }
    }

    displayLoadingView=()=>(
        <div data-testid="loader" className="loader-container">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
        </div>
    )

    displayFailureView=()=>(
        <div className="failure-view-container">
        <img src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png" className="failure-img" alt="failure view"/>
        <h1 className="failure-heading">Something went wrong</h1>
        </div>
    )

    displaySuccessView=()=>{
        const {vaccinationData}=this.state
        return(
            <>
            <VaccinationCoverage vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}/>
            <VaccinationByGender vaccinationGenderDetails={vaccinationData.vaccinationByGender}/>
            <VaccinationByAge vaccinationAgeDetails={vaccinationData.vaccinationByAge}/>
            </>
        )
    }

    displayVaccinationDetails=()=>{
        const {apiStatus}=this.state
        switch(apiStatus){
            case apiStatusConstants.success:
                return this.displaySuccessView()
            case apiStatusConstants.failure:
                return this.displayFailureView()
            case apiStatusConstants.inProgress:
                return this.displayLoadingView()
            default:
                return null    
        }
    }

    render(){
        return(
            <div className="main-container">
            <div className="sub-container">
            <div className="header">
            <img src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png" className="logo" alt="website logo"/>
            <h1 className="heading">Co-WIN</h1>
            </div>
            <h1 className="sub-heading">CoWIN Vaccination in India</h1>
            {this.displayVaccinationDetails()}
            </div>
            </div>
        )
    }
}
export default CowinDashboard
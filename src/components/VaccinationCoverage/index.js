// Write your code here
import './index.css'
import {BarChart,Bar,XAxis,YAxis,Legend} from 'recharts'
const VaccinationCoverage=props=>{
    const {vaccinationCoverageDetails}=props
    const DataFormatter = (number) => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
    return(
        <div className="vaccination-coverage-container">
        <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
        <BarChart width={900} height={400} data={vaccinationCoverageDetails} margin={{
          top: 5,
        }}
        >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke:'#6c757d',
            strokeWidth: 1,
            fontSize:16,
            fontFamily:'Roboto',
          }}
        />
        <YAxis tickFormatter={DataFormatter}
          tick={{
            stroke:'#6c757d',
            strokeWidth: 0.5,
            fontSize:16,
            fontFamily:'Roboto',
          }}
          />
          <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign:'center',
            fontSize:12,
            fontFamily:'Roboto',
          }}
        />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" radius={[10,10,0,0]}/>
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" radius={[5,5,0,0]} />
        </BarChart>
        </div>
    )
}
export default VaccinationCoverage

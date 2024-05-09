import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { addDataChart } from '../redux/slicers/chartSlice';
import { useQuery } from 'react-query';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartExample = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.chart);


  const { data, isLoading, isError } = useQuery({
    queryKey: "data",
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/data");
      return response.data;
    },
 
  });

  useEffect(() => {
    if (data) {
      const formattedData = data.map(user => ({
        ...user,
        generation: new Date(user.dob).getFullYear() > 1997 ? "Gen-Z" : "Millennium"
      }));
      dispatch(addDataChart(formattedData));
    }
  }, [data, dispatch]);
  

  const dataChart = info[0] || [];
  
  const number={
    millennials: 0 ,
    genz :0,
  }

dataChart.map((gen)=> 
{

if(gen.generation==="Gen-Z"){
  number.genz+=1
}else{
  number.millennials+=1
}
}

)
const chartData=[
  {name : "Gen-Z", value:number.genz},
  {name:"Millennials",value:number.millennials}
]






  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>Error fetching data</h1>;

  return (
    <div>
     
      <ResponsiveContainer width="100%" height={400}>
        <PieChart  width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartExample;

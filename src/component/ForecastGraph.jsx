import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/component/ForecastGraph.scss';

const ForecastGraph = (props) => {
  
  const formatDataForChart = () => {

    if(!props.forecast) return;

    const chartData = props.forecast.map(weather => {
      const date = new Date(weather.dt_txt).toLocaleDateString('hr-HR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
  
      const temperature = weather.main.temp;
      const feelsLike = weather.main.feels_like;
      const minTemperature = weather.main.temp_min;
      const maxTemperature = weather.main.temp_max;
  
      return {
        date,
        temperature,
        feelsLike,
        minTemperature,
        maxTemperature
      };
    });
  
    return chartData;
  };

  return (
    <div>
      <div className="chart-container">
        <LineChart width={600} height={400} data={formatDataForChart()}>
          <XAxis dataKey="date" />
          <YAxis unit="°C" />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="feelsLike" stroke="#ffaa00" yAxisId={0} />
          <Line type="monotone" dataKey="minTemperature" stroke="#00aaff" yAxisId={0} />
          <Line type="monotone" dataKey="maxTemperature" stroke="#db3609" yAxisId={0} />
        </LineChart>
      </div>
    </div>
  );
};

export default ForecastGraph;




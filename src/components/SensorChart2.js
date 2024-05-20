import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const SensorChart2 = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/sensor/get");
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  // Check if sensorData and sensorData.data exist before mapping
  if (!sensorData || !sensorData.data || sensorData.data.length === 0) {
    return <div>Loading...</div>;
  }

  // Extracting temperature data
  const temperature = sensorData.data.map((data) => data.temperature);
  const ids = sensorData.data.map((data) => new Date(data.createdAt).toLocaleString());

  // Building chart data
  const chartData = {
    labels: ids,
    datasets: [
      {
        label: "Temperature",
        data: temperature,
        borderColor: "rgba(54, 22, 231, 1)",
        backgroundColor: "rgba(54, 22, 231, 0.2)",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
      x: {
        title: {
          display: false, // Hide x-axis label
        },
        ticks: {
          display: false, // Hide x-axis ticks as well
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default SensorChart2;

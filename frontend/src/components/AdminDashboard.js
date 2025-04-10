import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/payments/');
      setStats({
        bookings: response.data.length,
        revenue: response.data.reduce((sum, payment) => sum + payment.amount, 0),
      });
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: ['Bookings', 'Revenue (KES)'],
    datasets: [
      {
        label: 'Stats',
        data: [stats.bookings, stats.revenue],
        backgroundColor: ['#007bff', '#28a745'],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Overview</h4>
          <p>Total Bookings: {stats.bookings}</p>
          <p>Total Revenue: KES {stats.revenue}</p>
        </div>
        <div className="col-md-6">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

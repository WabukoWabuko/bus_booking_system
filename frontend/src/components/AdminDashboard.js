import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/payments/');
        setStats({
          bookings: response.data.length,
          revenue: response.data.reduce((sum, payment) => sum + parseFloat(payment.amount), 0),
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: ['Bookings', 'Revenue (KES)'],
    datasets: [
      {
        label: 'Overview',
        data: [stats.bookings, stats.revenue],
        backgroundColor: ['#1abc9c', '#3498db'],
        borderColor: ['#16a085', '#2980b9'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="mt-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Key Metrics</Card.Title>
                <Card.Text>
                  Total Bookings: <strong>{stats.bookings}</strong><br />
                  Total Revenue: <strong>KES {stats.revenue.toFixed(2)}</strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Bar data={chartData} options={{ responsive: true }} />
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0 });
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, busesRes, routesRes, schedulesRes, bookingsRes, paymentsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/payments/'),
          axios.get('http://localhost:8000/api/admin/buses/'),
          axios.get('http://localhost:8000/api/admin/routes/'),
          axios.get('http://localhost:8000/api/admin/schedules/'),
          axios.get('http://localhost:8000/api/admin/bookings/'),
          axios.get('http://localhost:8000/api/admin/payments/'),
        ]);
        setStats({
          bookings: statsRes.data.length,
          revenue: statsRes.data.reduce((sum, p) => sum + parseFloat(p.amount), 0),
        });
        setBuses(busesRes.data);
        setRoutes(routesRes.data);
        setSchedules(schedulesRes.data);
        setBookings(bookingsRes.data);
        setPayments(paymentsRes.data);
      } catch (error) {
        toast.error('Failed to load admin data');
      }
    };
    fetchData();
  }, []);

  const handleCancelBooking = async (id) => {
    await axios.post(`http://localhost:8000/api/admin/bookings/${id}/cancel/`);
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    toast.success('Booking cancelled');
  };

  const handleRefundPayment = async (id) => {
    await axios.post(`http://localhost:8000/api/admin/payments/${id}/refund/`);
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'refunded' } : p));
    toast.success('Payment refunded');
  };

  const chartData = {
    labels: ['Bookings', 'Revenue (KES)'],
    datasets: [{ label: 'Overview', data: [stats.bookings, stats.revenue], backgroundColor: ['#1abc9c', '#3498db'] }],
  };

  const busColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'registration_number', headerName: 'Registration', width: 150 },
    { field: 'capacity', headerName: 'Capacity', width: 120 },
    { field: 'operator_name', headerName: 'Operator', width: 200 },
  ];

  const bookingColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'User', width: 150, valueGetter: (params) => params.row.user.username },
    { field: 'seat_number', headerName: 'Seat', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleCancelBooking(params.row.id)}
          disabled={params.row.status === 'cancelled'}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const paymentColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'amount', headerName: 'Amount (KES)', width: 120 },
    { field: 'method', headerName: 'Method', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="warning"
          size="sm"
          onClick={() => handleRefundPayment(params.row.id)}
          disabled={params.row.status === 'refunded'}
        >
          Refund
        </Button>
      ),
    },
  ];

  return (
    <Container className="mt-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <h2 className="text-center mb-4">Admin Control Center</h2>
        <Tabs defaultActiveKey="overview" className="mb-3">
          <Tab eventKey="overview" title="Overview">
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
          </Tab>
          <Tab eventKey="buses" title="Buses">
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={buses} columns={busColumns} pageSize={5} />
            </div>
          </Tab>
          <Tab eventKey="bookings" title="Bookings">
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={bookings} columns={bookingColumns} pageSize={5} />
            </div>
          </Tab>
          <Tab eventKey="payments" title="Payments">
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={payments} columns={paymentColumns} pageSize={5} />
            </div>
          </Tab>
        </Tabs>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Home = () => {
  const [buses, setBuses] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/buses/');
        setBuses(response.data);
      } catch (error) {
        toast.error('Failed to load buses');
      }
    };
    fetchBuses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/schedules?origin=${origin}&destination=${destination}&date=${date}`);
  };

  return (
    <Container className="mt-5">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-center mb-4">Book Your Journey</h2>
        <Form onSubmit={handleSearch}>
          <Row className="g-3 align-items-center">
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="From"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="To"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Col>
            <Col md={2}>
              <Button type="submit" variant="primary" className="w-100">
                Find Buses
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="mt-4">
          {buses.map((bus) => (
            <Col md={4} key={bus.id}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{bus.operator_name}</Card.Title>
                  <Card.Text>
                    Registration: {bus.registration_number}<br />
                    Capacity: {bus.capacity} seats
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};

export default Home;

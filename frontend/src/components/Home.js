import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

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
        <h2 className="text-center mb-4">Find Your Perfect Ride</h2>
        <Form onSubmit={handleSearch}>
          <Row className="g-3 align-items-center">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="From"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </Col>
            <Col md={4}>
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
                Search Buses
              </Button>
            </Col>
          </Row>
        </Form>
      </motion.div>
    </Container>
  );
};

export default Home;

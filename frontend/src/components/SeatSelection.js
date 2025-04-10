import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button } from 'react-bootstrap';

const SeatSelection = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    // Mock seat data (replace with WebSocket later)
    setSeats(Array(40).fill().map((_, i) => ({
      number: i + 1,
      available: Math.random() > 0.3, // 70% chance available
    })));
  }, [scheduleId]);

  const handleSeatClick = (seat) => {
    if (seat.available) setSelectedSeat(seat.number);
  };

  const bookSeat = async () => {
    if (!selectedSeat) return;
    const response = await axios.post('http://127.0.0.1:8000/api/bookings/book_seat/', {
      schedule_id: scheduleId,
      seat_number: selectedSeat,
    });
    navigate(`/confirm/${response.data.booking_id}`);
  };

  return (
    <Container className="mt-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2>Select Your Seat</h2>
        <Row className="g-2">
          {seats.map((seat) => (
            <Col xs={3} key={seat.number}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSeatClick(seat)}
                style={{
                  background: seat.number === selectedSeat ? '#1abc9c' : seat.available ? '#ddd' : '#ff6b6b',
                  padding: '15px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  cursor: seat.available ? 'pointer' : 'not-allowed',
                  color: seat.number === selectedSeat ? 'white' : 'black',
                }}
              >
                Seat {seat.number}
              </motion.div>
            </Col>
          ))}
        </Row>
        <Button
          variant="primary"
          className="mt-4"
          onClick={bookSeat}
          disabled={!selectedSeat}
        >
          Confirm Seat
        </Button>
      </motion.div>
    </Container>
  );
};

export default SeatSelection;

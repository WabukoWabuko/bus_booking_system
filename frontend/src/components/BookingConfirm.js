import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Container, Card, Button } from 'react-bootstrap';

const BookingConfirm = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/bookings/${bookingId}/`);
      setBooking(response.data);
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?data=${bookingId}&size=150x150`);
    };
    fetchBooking();
  }, [bookingId]);

  return (
    <Container className="mt-5">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <Card>
          <Card.Body>
            <Card.Title>Booking Confirmed!</Card.Title>
            {booking ? (
              <>
                <Card.Text>
                  Seat: {booking.seat_number}<br />
                  Departure: {new Date(booking.schedule.departure_time).toLocaleString()}
                </Card.Text>
                <img src={qrCode} alt="QR Code" className="my-3" />
                <p>Scan QR to Pay via MPesa or PayPal</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
            <Button variant="primary">Download Ticket</Button>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default BookingConfirm;

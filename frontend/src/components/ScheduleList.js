import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSchedules = async () => {
      const query = new URLSearchParams(location.search);
      const response = await axios.get('http://127.0.0.1:8000/api/schedules/', {
        params: {
          origin: query.get('origin'),
          destination: query.get('destination'),
          date: query.get('date'),
        },
      });
      setSchedules(response.data);
    };
    fetchSchedules();
  }, [location.search]);

  return (
    <div className="container mt-5">
      <h2>Available Schedules</h2>
      <ul className="list-group">
        {schedules.map((schedule) => (
          <li
            key={schedule.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {schedule.route.origin} to {schedule.route.destination} at{' '}
              {new Date(schedule.departure_time).toLocaleString()}
            </span>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/seats/${schedule.id}`)}
            >
              Select Seats
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleList;

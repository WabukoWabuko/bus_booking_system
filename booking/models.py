from django.db import models
from django.contrib.auth.models import User

class Bus(models.Model):
    registration_number = models.CharField(max_length=20, unique=True)
    capacity = models.IntegerField()
    operator_name = models.CharField(max_length=100)

class Route(models.Model):
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance = models.FloatField()
    base_fare = models.DecimalField(max_digits=10, decimal_places=2)

class Schedule(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    available_seats = models.IntegerField()

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    seat_number = models.IntegerField()
    booking_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')

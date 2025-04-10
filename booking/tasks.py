from celery import shared_task
from .models import Booking

@shared_task
def process_booking(booking_id):
    booking = Booking.objects.get(id=booking_id)
    booking.status = 'confirmed'
    booking.save()
    # Add email/SMS notification logic here

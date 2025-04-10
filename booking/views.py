from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from ratelimit.decorators import ratelimit  # Import ratelimit
from .models import Schedule, Booking
from .serializers import ScheduleSerializer, BookingSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @action(detail=False, methods=['post'])
    @ratelimit(key='ip', rate='10/m', method='POST')  # Limit to 10 requests per minute per IP
    def book_seat(self, request):
        schedule_id = request.data['schedule_id']
        seat_number = request.data['seat_number']
        schedule = Schedule.objects.get(id=schedule_id)
        if schedule.available_seats > 0:
            booking = Booking.objects.create(
                user=request.user, schedule=schedule, seat_number=seat_number
            )
            schedule.available_seats -= 1
            schedule.save()
            return Response({'booking_id': booking.id})
        return Response({'error': 'No seats available'}, status=400)

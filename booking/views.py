from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Schedule, Booking
from .serializers import ScheduleSerializer, BookingSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @action(detail=False, methods=['post'])
    def book_seat(self, request):
        schedule_id = request.data.get('schedule_id')
        seat_number = request.data.get('seat_number')
        try:
            schedule = Schedule.objects.get(id=schedule_id)
            if schedule.available_seats > 0:
                booking = Booking.objects.create(
                    user=request.user, schedule=schedule, seat_number=seat_number
                )
                schedule.available_seats -= 1
                schedule.save()
                return Response({'booking_id': booking.id})
            return Response({'error': 'No seats available'}, status=400)
        except Schedule.DoesNotExist:
            return Response({'error': 'Schedule not found'}, status=404)

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from booking.views import ScheduleViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'schedules', ScheduleViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

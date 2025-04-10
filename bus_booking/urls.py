from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from booking.views import ScheduleViewSet, BookingViewSet
from payment.views import PaymentViewSet

router = DefaultRouter()
router.register(r'schedules', ScheduleViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

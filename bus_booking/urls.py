from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from booking.views import ScheduleViewSet as BookingScheduleViewSet, BookingViewSet
from payment.views import PaymentViewSet as BasePaymentViewSet
from admin_panel.views import BusViewSet, RouteViewSet, ScheduleViewSet, BookingViewSet as AdminBookingViewSet, PaymentViewSet, UserViewSet

router = DefaultRouter()
router.register(r'schedules', BookingScheduleViewSet, basename='passenger-schedules')  # For passengers
router.register(r'bookings', BookingViewSet, basename='passenger-bookings')  # For passengers
router.register(r'payments', BasePaymentViewSet, basename='passenger-payments')  # For passengers
router.register(r'admin/buses', BusViewSet, basename='admin-buses')
router.register(r'admin/routes', RouteViewSet, basename='admin-routes')
router.register(r'admin/schedules', ScheduleViewSet, basename='admin-schedules')  # For admins
router.register(r'admin/bookings', AdminBookingViewSet, basename='admin-bookings')
router.register(r'admin/payments', PaymentViewSet, basename='admin-payments')
router.register(r'admin/users', UserViewSet, basename='admin-users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

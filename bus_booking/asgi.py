import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import bus_booking.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bus_booking.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(bus_booking.routing.websocket_urlpatterns)
    ),
})

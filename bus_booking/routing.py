from django.urls import re_path
from booking import consumers

websocket_urlpatterns = [
    re_path(r'ws/seats/(?P<schedule_id>\d+)/$', consumers.SeatConsumer.as_asgi()),
]

from rest_framework import viewsets
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def list(self, request):
        # Mock data for testing
        return Response([
            {'id': 1, 'amount': 500, 'method': 'MPesa', 'status': 'completed'},
            {'id': 2, 'amount': 700, 'method': 'PayPal', 'status': 'completed'},
        ])

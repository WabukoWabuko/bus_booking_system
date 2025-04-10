from django.db import models

class Payment(models.Model):
    booking = models.OneToOneField('booking.Booking', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=[('MPesa', 'MPesa'), ('PayPal', 'PayPal')])
    transaction_id = models.CharField(max_length=100, null=True)
    qr_code = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=20, default='pending')

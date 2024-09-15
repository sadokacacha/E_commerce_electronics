from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('client', 'Client'),
    )
    username = None 
    email = models.EmailField(unique=True)  # Make email unique
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')

    USERNAME_FIELD = 'email'  # Use email to log in
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

# products/models.py

import random
import string
from django.db import models
from django.conf import settings



class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='product_images/')
    reference = models.CharField(max_length=10, unique=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = self.generate_reference()
        super(Product, self).save(*args, **kwargs)

    def generate_reference(self):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    is_shipped = models.BooleanField(default=False)

    def __str__(self):
        return f"Order of {self.product.name} by {self.user.username}"

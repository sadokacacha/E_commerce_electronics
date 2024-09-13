# products/views.py

from rest_framework import viewsets
from .models import Product, Order, Category
from .serializers import ProductSerializer, OrderSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Default: Anyone can read (GET)

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            self.permission_classes = [IsAdminUser]  # Only admin can modify
        return super().get_permissions()

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Only authenticated users can order

    def get_permissions(self):
        if self.action == 'create':  # Only authenticated users can create orders
            self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super().get_permissions()

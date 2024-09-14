# ecommerce/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('Products.urls')),  # Products app URLs
    path('api/', include('Users.urls')),  # Users app URLs for authentication
]

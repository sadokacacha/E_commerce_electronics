from django.urls import path
from .views import RegisterView, UserListView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Custom token view
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # For refreshing tokens
]

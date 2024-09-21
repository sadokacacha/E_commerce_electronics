from django.urls import path
from .views import CustomTokenObtainPairView, RegisterView, UserListView, UserDetailView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('user/', UserDetailView.as_view(), name='user_detail'),  # Add this for user details
]

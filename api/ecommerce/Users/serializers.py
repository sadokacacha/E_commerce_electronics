from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

# RegisterSerializer for user registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            role='client'  # Always set the role to 'client' during signup
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# UserSerializer for returning user details
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']  # Add any other fields you want to include

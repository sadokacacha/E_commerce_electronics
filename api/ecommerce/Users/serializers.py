from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

# Custom Token Serializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role  # Add the user's role to the token
        return token

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password'),
        }
        user = authenticate(**credentials)

        if user:
            data = super().validate(attrs)
            data.update({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'role': user.role,
            })
            return data
        else:
            raise serializers.ValidationError('No active account found with the given credentials')
        
# RegisterSerializer for user registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'password']  # Removed username

    def create(self, validated_data):
        user = CustomUser.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            role='client'  # Set the role to 'client' by default
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    


# UserSerializer for returning user details
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'role']

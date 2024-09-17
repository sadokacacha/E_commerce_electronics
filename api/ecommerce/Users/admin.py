from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['first_name', 'last_name', 'email', 'phone', 'role', 'is_staff', 'is_active']
    list_filter = ['role', 'is_staff', 'is_active']
    search_fields = ['first_name', 'last_name', 'email', 'phone']

    # Define ordering to use fields that exist in CustomUser
    ordering = ['email']  # Use a field that exists in CustomUser

    fieldsets = (
        (None, {'fields': ('first_name', 'last_name', 'email', 'phone', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'user_permissions', 'groups')}),
        ('Role Info', {'fields': ('role',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', 'email', 'phone', 'password1', 'password2', 'role')
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if obj is None:  # If adding a new user
            form.base_fields['password'].widget = admin.widgets.AdminPasswordChangeWidget()
        return form

    def save_model(self, request, obj, form, change):
        if not change:  # If creating a new user
            obj.set_password(form.cleaned_data['password'])
        super().save_model(request, obj, form, change)

admin.site.register(CustomUser, CustomUserAdmin)

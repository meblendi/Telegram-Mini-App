import django.contrib.auth.models
import django.db.models
from rest_framework import serializers

from .models import TelegramUser


class TelegramUserSerializer(serializers.ModelSerializer):    

    class Meta:
        model = TelegramUser
        fields = '__all__'
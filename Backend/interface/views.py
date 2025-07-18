from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TelegramUser
from .serializers import TelegramUserSerializer
import json

@api_view(['POST'])
def create_or_update_user(request):
    try:
        data = json.loads(request.body)
        user_data = data.get('user')
        
        user, created = TelegramUser.objects.update_or_create(
            telegram_id=user_data['id'],
            defaults={
                'first_name': user_data.get('first_name', ''),
                'last_name': user_data.get('last_name'),
                'username': user_data.get('username'),
                'language_code': user_data.get('language_code', 'en'),
                'is_premium': user_data.get('is_premium', False)
            }
        )
        
        serializer = TelegramUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def update_avatar(request):
    try:
        data = json.loads(request.body)
        user = TelegramUser.objects.get(telegram_id=data['telegram_id'])
        user.avatar = data['avatar']
        user.save()
        return Response({'status': 'success'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


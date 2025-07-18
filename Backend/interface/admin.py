from django.contrib import admin
import interface.models

# Register models
admin.site.register(interface.models.TelegramUser)

# Optional: Add custom admin functionality for specific models
class mainAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")
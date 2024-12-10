from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Simple home view
def home(request):
    return HttpResponse("Welcome to the Homepage!")  # testing.

urlpatterns = [
    path('api/', include('account.urls')),
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls')),
    path('', home, name='home'),  # Add this line to handle the root URL
]

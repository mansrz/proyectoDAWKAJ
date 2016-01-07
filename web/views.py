from django.shortcuts import render
from web.models import *

# Create your views here.

def home(request):
    users = User.objects.all()
    return render(request,'user.html',{'users':users})

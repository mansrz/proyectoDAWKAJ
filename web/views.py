from django.shortcuts import render
from django.contrib.auth import authenticate,login
from django.http import HttpResponseRedirect, HttpResponse
from web.models import *

# Create your views here.

def home(request):
    return render(request,'index.html',{})

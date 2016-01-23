from django.core.urlresolvers import reverse
from django.core.serializers.json import *
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate,login
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse, HttpResponseBadRequest,HttpResponseNotAllowed,HttpResponseNotFound,HttpResponseForbidden
from web.models import *
from suds.xsd.doctor import ImportDoctor, Import
from suds.client import Client
from django.template import RequestContext
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.template.context_processors import csrf
from suds.xsd.doctor import ImportDoctor, Import
from suds.client import Client
from django.core import serializers

#funcion logout
class AutoLogout:
     def process_request(self, request):
        if not request.user.is_authenticated() :
         return
        try:
            if datetime.now() - request.session['last_touch'] > timedelta( 0, settings.AUTO_LOGOUT_DELAY * 60, 0):
                auth.logout(request)
                del request.session['last_touch']
                print ("La sesion se ha cerrado por inactividad")
                return
        except KeyError:
         pass
         request.session['last_touch'] = datetime.now()

def home(request):
    return render(request,'index.html',{})

def login(request):
    if request.method == 'POST':
        try:
            user = request.POST['user'].strip()
            pwd = request.POST['pwd'].strip()
        except:
            return HttpResponseBadRequest()
        from django.contrib.auth import authenticate, login
        auth = authenticate(username = user , password = pwd)
        if auth is not None:
           login(request, auth)
           return HttpResponse()
        else:
            url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL' #http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL
            imp = Import('http://www.w3.org/2001/XMLSchema')
            imp.filter.add('http://tempuri.org/')
            doctor = ImportDoctor(imp)
            client = Client(url, doctor=doctor)
            auth = client.service.autenticacion(user,pwd)
            if auth == True:
                auth = User.objects.create_user(username=user, password=pwd)
                auth.save()
                auth = authenticate(username = user , password = pwd)
                login(request, auth)
                return HttpResponse()
            else:
                return HttpResponseBadRequest()
    else:
        return HttpResponseBadRequest()

def logout(request):
    from django.contrib.auth import logout
    logout(request)
    return redirect('/')

def perfil(request):
    return render(request,'perfil.html',{})

def workarea(request):
    return render(request,'workarea.html',{})

def mostrarImagen(request):
    print("hola")
    if request.method == 'GET'  :
            imagenes = Imagen.objects.all()[:1]
            response = render_to_response(
        'json/imagenes.json',
        {'imagenes': imagenes}, #mismo etiqueta en el json
        context_instance=RequestContext(request)
            )
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Cache-Control'] = 'no-cache'
    return response
	
def cargarImagen(request):
	if request.method == 'GET':
		#id = requeste.GET.get('id',None)
		#response = Imagen.object.get(pk = id)
		response = Imagen.objects.all()
		return JsonResponse( response[7].ruta, safe = False)
		
def guardarImagen(request):
	if request.method == 'POST':
		ruta = request.POST.get('ruta', None)
		if ruta is None:
			return HttpResponseBadRequest()
		imagen = Imagen()
		imagen.ruta = ruta
		imagen.save()
		return HttpResponse()
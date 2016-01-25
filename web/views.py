from django.core.urlresolvers import reverse
from django.core.serializers.json import *
from django.shortcuts import render, redirect, render_to_response
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import User
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

def perfil(request):
    return render(request,'perfil.html',{})

def workarea(request):
    return render(request,'workarea2.html',{})

def backhome(request):
    return redirect('/')

def backperfil(request):
    return redirect('/perfil/')

#funcion de login con user django y con espol
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

#funcion de logout
def logout(request):
    from django.contrib.auth import logout
    logout(request)
    return redirect('/')

#funcion que muestra la lista de imagenes del usuario en el perfil.
def mostrarImagen(request):
    if request.method == 'GET'  :
            imagenes = Imagen.objects.filter(idcreador=request.user.username)
            response = render_to_response(
        'json/imagenes.json',
        {'imagenes': imagenes}, #mismo etiqueta en el json
        context_instance=RequestContext(request)
            )
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Cache-Control'] = 'no-cache'
    return response

#NO UTILIZADO AUN!!
def cargarImagenBase(request):
    print("entre a cargar imagen")

#funcion para un nuevo usuario mediante el modal Sign UP.
def crearUsuario(request):
    if request.method == 'POST':
        username = request.POST.get('username', None)
        email = request.POST.get('email', None)
        password = request.POST.get('password',None)

        if username is None:
            return HttpResponseBadRequest()
        else :
            nuser = User()
            nuser.password = password
            nuser.is_superuser = 0
            nuser.username = username
            nuser.email = email
            nuser.is_staff=0
            nuser.is_active=1
            import datetime
            nuser.date_joined =datetime.datetime.now()
            nuser.save()
    return HttpResponse()

#funcion para obtener la lista de usuarios de la tabla Users para el share.
def mostrarUsuarios(request):
    if request.method == 'GET'  :
            usuarios = AuthUser.objects.all()
            res = usuarios.exclude(username= request.user.username)
            response = render_to_response(
        'json/users.json',
        {'users': res}, #mismo etiqueta en el json
        context_instance=RequestContext(request)
            )
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Cache-Control'] = 'no-cache'
    return response

def obtenerImgCompartidas(request):
    print("entro compartir img")
    if request.method == 'GET':
        lst_imgc = ImgCompartidas.objects.filter(id_usdest=request.user.username)
        listimg = []
        for img in lst_imgc:
            idi = img.id_imagen
            imgu = Imagen.objects.get(idimagen=idi)
            listimg.append(imgu)
            response = render_to_response(
        'json/imgshared.json',
        {'imagenes': listimg}, #mismo etiqueta en el json
        context_instance=RequestContext(request)
            )
    response['Content-Type'] = 'application/json; charset=utf-8'
    response['Cache-Control'] = 'no-cache'
    return response


#funcion para que el usuario modifique su informacion personal en perfil (tabla Users).
def editarDatosPersona(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre', None)
        apellido = request.POST.get('apellido', None)
    if nombre is None:
        return HttpResponseBadRequest()
    else :
        from django.contrib.auth.models import User
        u = User.objects.get(username=request.user.username)
        u.first_name = nombre;
        u.last_name= apellido;
        u.save();
        return HttpResponse()

#funcion para cargar una imagen con el boton subir del modal en el workarea.
def cargarImagen(request):
	if request.method == 'GET':
		#id = requeste.GET.get('id',None)
		#response = Imagen.object.get(pk = id)
		response = Imagen.objects.all()
		return JsonResponse( response[1].ruta, safe = False)

#funcion para guardar la imagen creada en el workarea.
def guardarImagen(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre', None)
        descripcion = request.POST.get('descripcion', None)
        ruta   = request.POST.get('ruta', None)
        if ruta is None:
			return HttpResponseBadRequest()
        else :
            imagen = Imagen()
            imagen.ruta = ruta
            imagen.nombre = nombre
            imagen.descripcion= descripcion
            print(request.user.username)
            imagen.idcreador = request.user.username
            imagen.save()
	return HttpResponse()

from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login, logout


urlpatterns = [

    url(r'^login/', 'web.views.login'),
    url(r'^logout/', 'web.views.logout'),
    url(r'^perfil/', 'web.views.perfil'),
	url(r'^guardarImagen/', 'web.views.guardarImagen'),
	url(r'^cargarImagen/', 'web.views.cargarImagen'),
    url(r'^cargarImagenBase/', 'web.views.cargarImagenBase'),#url no usado
    url(r'^workarea/', 'web.views.workarea'),
    url(r'^bhome/', 'web.views.backhome'),
    url(r'^edatos/', 'web.views.editarDatosPersona'),
    url(r'^mUsers/', 'web.views.mostrarUsuarios'),
    url(r'^cUser/', 'web.views.crearUsuario'),
    url(r'^imagen/', 'web.views.mostrarImagen'),
    url(r'^imagenCompartidas/', 'web.views.obtenerImgCompartidas'),
    url(r'^$', 'web.views.home'),
]

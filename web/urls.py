from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login, logout


urlpatterns = [
    # Examples:
    # url(r'^$', 'daw.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^login/', 'web.views.login'),
    url(r'^logout/', 'web.views.logout'),
    url(r'^perfil/', 'web.views.perfil'),
	url(r'^guardarImagen/', 'web.views.guardarImagen'),
	url(r'^cargarImagen/', 'web.views.cargarImagen'),
    url(r'^workarea/', 'web.views.workarea'),
    url(r'^bhome/', 'web.views.backhome'),
    url(r'^imagen/', 'web.views.mostrarImagen'),
    url(r'^$', 'web.views.home'),
]

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
    url(r'^workarea/', 'web.views.workarea'),
    url(r'^$', 'web.views.home'),
]
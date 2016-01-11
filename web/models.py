from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login
from django.forms import ModelForm
# Models.

class Persona (models.Model):
    nombre = models.CharField(max_length=9 , null = True, blank= True)
    apellido = models.CharField(max_length=9 , null = True, blank= True)
    username = models.CharField(max_length=6 , null = True, blank= True)
    email = models.CharField(max_length=20 , null = True, blank= True)
    tipo = models.BooleanField(default=False)
    fk_user = models.ForeignKey(User, related_name = 'persona')

class ImagenSVG (models.Model):
    titulo = models.CharField(max_length=9 , null = True, blank= True)
    descripcion = models.CharField(max_length=15 , null = True, blank= True)
    path = models.CharField(max_length=15 , null = True, blank= True)
    fk_person = models.ForeignKey(User, related_name = 'creador')#id del usuario creador

class Historial (models.Model):
    fecha = models.DateField(auto_now=True)
    #hora = models.CharField(max_length=15 , null = True, blank= True)
    fk_imagen = models.ForeignKey(User, related_name = 'imagen')
    fk_person = models.ForeignKey(User, related_name = 'creador')#id del usuario creador

class Asociado (models.Model):
    fk_persona = models.ForeignKey(User, related_name = 'follow')# seguido
    fk_asociado = models.ForeignKey(User, related_name = 'follower')# seguidor

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin sqlcustom [app_label]'
# into your database.
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login
from django.forms import ModelForm


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254, blank=True, null=True)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'

class Imagen(models.Model):
    idimagen = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=15, blank=True, null=True)
    descripcion = models.CharField(max_length=15, blank=True, null=True)
    ruta = models.TextField(blank=True, null=True)
    idcreador = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'imagen'


class ImgCompartidas(models.Model):
    idcompartida = models.AutoField(primary_key=True)
    fecha = models.DateField(blank=True, null=True)
    id_imagen = models.ForeignKey(Imagen, db_column='id_imagen')
    id_usdest = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'img_compartidas'

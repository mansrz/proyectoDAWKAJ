# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Imagen',
            fields=[
                ('idimagen', models.AutoField(serialize=False, primary_key=True)),
                ('nombre', models.CharField(max_length=15, null=True, blank=True)),
                ('descripcion', models.CharField(max_length=15, null=True, blank=True)),
                ('ruta', models.CharField(max_length=45, null=True, blank=True)),
            ],
            options={
                'db_table': 'imagen',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ImgCompartidas',
            fields=[
                ('idcompartida', models.AutoField(serialize=False, primary_key=True)),
                ('fecha', models.DateField(null=True, blank=True)),
                ('id_usdest', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'img_compartidas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('username', models.CharField(max_length=10, serialize=False, primary_key=True)),
                ('email', models.CharField(max_length=15, null=True, blank=True)),
                ('foto', models.CharField(max_length=10, null=True, blank=True)),
                ('password', models.CharField(max_length=10, null=True, blank=True)),
                ('tipo', models.CharField(max_length=7, null=True, blank=True)),
            ],
            options={
                'db_table': 'persona',
                'managed': False,
            },
        ),
    ]

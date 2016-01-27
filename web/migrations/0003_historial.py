# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_authuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Historial',
            fields=[
                ('idhistorial', models.AutoField(serialize=False, primary_key=True)),
                ('id_imagen', models.IntegerField()),
                ('id_usuario', models.CharField(max_length=30)),
                ('fecha', models.DateField(null=True, blank=True)),
                ('comentario', models.CharField(max_length=30, null=True, blank=True)),
            ],
            options={
                'db_table': 'historial',
                'managed': False,
            },
        ),
    ]

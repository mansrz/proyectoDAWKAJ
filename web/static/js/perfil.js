
    $(document).on('ready', function () {



     $("#btnCompartir").click(function(event){
        var usuario = $( "#sel1" ).val();
        var imagen = $( "#sel2" ).val();
        var permiso = $("#sel3").val();
       //console.log( $( "#sel1" ).val());
       //console.log( $( "#sel2" ).val());
         $.post('/compartirImagen/',{ 'usuario':usuario,'imagen':imagen,'permiso':permiso, 'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()}, function(data){
           alert("funciono!");
        });
     });

      $("#btnEditar").click(function(event){
          // $("#modalEditar").show();
          var n = $('#nfirstname').text();
          var a = $('#nlastname').text();
          $('#nombre').val(n);
          $('#apellido').val(a);
           $('#modalEditar').modal('toggle');
           $('#modalEditar').modal('show');
      });

      $("#btnGuardar").click(function(event){
        console.log("entro");
        var nombre =   $('#nombre').val();
        var apellido =   $('#apellido').val();
        //console.log(nombre);
        //console.log(apellido);

        $.post('/edatos/',{'nombre':nombre,'apellido':apellido, 'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()}, function(data){
  			 //console.log(data);
         console.log("salio");
  		  });
      });

      var indexi =0;

      $.ajax({
           type: "GET",
           url:'/imagen',
           async: true,
           dataType:"json",
           contenType:"application/Json; charset=utf-8",

           success: function(imagenes){
             $.each(imagenes, function(i,imagen){

               if(indexi == 0){
                  $("#cimagenes").append(
                 "<div class='item active'><div class='row-fluid'>"+
                  "<h3 style='text-align:center;'>"
                  + imagen.Nombre  + "</h3>"+
                  " <div class='span3'><a href='' id='"+ imagen.ImagenId + "' name='linkear' class='thumbnail '><img src='http://placehold.it/250x250' alt='Image' style='max-width:25%;'></a></div>" +
                  "</div></div></div>"  );
                  indexi=1;
               }else {
                 $("#cimagenes").append(
                "<div class='item'><div class='row-fluid'>"+
                "<h3 style='text-align:center;'>"
                + imagen.Nombre  + "</h3>"+
                 " <div class='span3'><a href='' id='"+ imagen.ImagenId + "' name='linkear' class='thumbnail'><img src='http://placehold.it/250x250' alt='Image' style='max-width:25%;'></a></div>" +
                 "</div></div></div>"  );
               }

               $("#sel2").append(
                 "<option>"+imagen.Nombre+"</option>"
               );

               $('a[name=linkear]').click(function(event){
                     var numId =  $(this).attr("id");
                    $.get('/cargarImagenBase/',{'Id' : numId},function(data){
                       window.location = "/workarea/?id="+numId;
                     });
                 });

             });
           },
           error: function(data){
             console.log(data.responseText);
           }
      });

      var indexj =0;

      $.ajax({
            type: "GET",
            url:'/imagenCompartidas',
            async: true,
            dataType:"json",
            contenType:"application/Json; charset=utf-8",

            success: function(imgs){
              $.each(imgs, function(i,img){

                if(indexj == 0){
                   $("#compartidos").append(
                  "<div class='item active'><div class='row-fluid'>"+
                   "<h3 style='text-align:center;'>"
                   + img.Nombre  + "</h3>"+
                   " <div class='span3'><a href='' id='"+ img.ImagenId + "' name='linkear2' class='thumbnail '><img src='http://placehold.it/250x250' alt='Image' style='max-width:25%;'></a></div>" +
                   "</div></div></div>"  );
                   indexj=1;
                }else {
                  $("#compartidos").append(
                 "<div class='item'><div class='row-fluid'>"+
                 "<h3 style='text-align:center;'>"
                 + img.Nombre  + "</h3>"+
                  " <div class='span3'><a href='' id='"+ img.ImagenId + "' name='linkear2' class='thumbnail'><img src='http://placehold.it/250x250' alt='Image' style='max-width:25%;'></a></div>" +
                  "</div></div></div>"  );
                }

                $('a[name=linkear2]').click(function(event){
                      var numId =  $(this).attr("id");
                     $.get('/cargarImagenBase/',{'Id' : numId},function(data){
                        window.location = "/workarea/?id="+numId;
                      });
                  });

              });
            },
            error: function(data){
              console.log(data.responseText);
            }
      });

      $.ajax({
             type: "GET",
             url:'/mUsers',
             async: true,
             dataType:"json",
             contenType:"application/Json; charset=utf-8",

             success: function(users){
               $.each(users, function(u,user){
                 $("#sel1").append(
                   "<option>"+user.username+"</option>"
                 );
            });
             },
             error: function(data){
               console.log(data.responseText);
             }
         });
         //FIN JQUERY
});

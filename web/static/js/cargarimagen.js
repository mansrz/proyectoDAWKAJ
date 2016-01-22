$(document).ready(function(){
    $.ajax({
            type: "GET",
            url:'/imagen',
            async: true,
            dataType:"json",
            contenType:"application/Json; charset=utf-8",

            success: function(imagenes){

                  $.each(imagenes, function(i,imagen){
                    $("#carrito2").append(
                    "<p>"+ imagen.ImagenId+"</p>"+
                    "<p>"+ imagen.Nombre+"</p>"+
                    "<p>"+ imagen.Descripcion+"</p>"+
                    "<p>"+ imagen.Ruta+"</p>"+
                    "<p>"+ imagen.CreadorId+"</p>"
                    );

								});

            },
            error: function(data){
              console.log(data.responseText);

            }
      });

});

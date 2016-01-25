
    $(document).on('ready', function () {

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

      $.ajax({
           type: "GET",
           url:'/imagen',
           async: true,
           dataType:"json",
           contenType:"application/Json; charset=utf-8",

           success: function(imagenes){
             $.each(imagenes, function(i,imagen){
               $("#ulimg").append("<li  class='list-group-item'>"+
               "<a href='' id="+ imagen.ImagenId + " class='linkear'>"+
                imagen.Nombre+
               "</a>"+
                "</li>"
               );

               $('.linkear').click(function(event){
                     var numId =  $(this).attr("id");
                     //console.log(numId);
                    // $(this).attr("href", "/workarea/");
                     $.get('/cargarImagenBase/',{Id : numId},function(data){
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
            url:'/imagenCompartidas',
            async: true,
            dataType:"json",
            contenType:"application/Json; charset=utf-8",

            success: function(imgs){
              $.each(imgs, function(i,img){
               console.log("holi");
           });
            },
            error: function(data){
              console.log(data.responseText);

            }
        });
});

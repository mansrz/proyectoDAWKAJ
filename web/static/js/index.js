$(document).ready(function(){

  $('#button_login').click(function(event){
    event.preventDefault();
    var user = $('#userInput').val();
    var pwd = $('#passwordInput').val();
    var csrf = $('input[name="csrfmiddlewaretoken"]').val();
    console.log(user);
    console.log(csrf);
    $.ajax({
      type: "POST",
      url:  "/login/",
      data: {
        'user':user,
        'pwd':pwd,
        'csrfmiddlewaretoken': csrf
      },
      success: function( data ) {
        console.log('guardado');
        window.location = "/";
      },
      error: function(data){
        console.log(data);
      }
    });
  });

    $('#btnReg').click(function(event){

      var usuario = $('#nuName').val();
      var password = $('#nuPassword').val();
      var email = $('#nuemail').val();

      if(usuario== "" || password=="" || email==""){
        alert("Datos Imcompletos . Porfavor llene todos los campos.");

      }else {
        alert("no debe entrar");
        /*
        $.post('/cUser/',{'username':usuario,'password':password,'email':email, 'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()}, function(data){
          alert("El usuario se ha creado con exito!")
        });*/
      }


    });

});

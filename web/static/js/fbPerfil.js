$(function() {
	var scopes = 'email';
		//var btn_login = '<a href="#" id="login"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>';
	var div_session = "<div id='facebook-session'>"+
					  "<img>"+
					  "<a href='#' id='logout' class='btn btn-primary btn-block'>Cerrar sesión</a>"+
					  "</div>";

	window.fbAsyncInit = function() {
	  	FB.init({
	    	appId      : '1278305482239325',
	    	status     : true,
	    	cookie     : true,
	    	xfbml      : true,
	    	version    : 'v2.5'
	  	});

	  	FB.getLoginStatus(function(response) {
	    	statusChangeCallback(response, function() {});
	  	});
  	};

  	var statusChangeCallback = function(response, callback) {
  		console.log(response);

    	if (response.status === 'connected') {
      		getFacebookData();
    	} else {
     		callback(false);
    	}
  	}

  	var checkLoginState = function(callback) {
    	FB.getLoginStatus(function(response) {
      		callback(response);
    	});
  	}

  	var getFacebookData =  function() {
  		FB.api('/me', function(response) {
	  		$('#login').after(div_session);
	  		$('#login').remove();
            $('#contFromBase').remove();
            $('#fbName').text(response.name);
	  		$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
	  	});
  	}

  	var facebookLogin = function() {
  		checkLoginState(function(data) {
  			if (data.status !== 'connected') {
  				FB.login(function(response) {
  					if (response.status === 'connected')
  						getFacebookData();
  				}, {scope: scopes});
  			}
  		})
  	}
  	var facebookLogout = function() {
  		checkLoginState(function(data) {
  			if (data.status === 'connected') {
				FB.logout(function(response) {
					//$('#facebook-session').before(btn_login);
					$('#facebook-session').remove();
                    $('#login').remove();
                    $('#fbName').remove();
                    $('#contFromBase').remove();
                    window.location.href = '{% templates "index.html" %}';
				})
			}
  		})
  	}
  	$(document).on('click', '#logout', function(e) {
  		e.preventDefault();
  		if (confirm("¿Está seguro?")){
            facebookLogout();
            history.back();
            return false;
        }else
  			return false;
  	})
})

$(function() {
	var scopes = 'email';
	var btn_login = '<a href="#" id="login"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>';
	var div_session = "<div id='facebook-session'>"+
					  "<strong></strong>"+"<br>"+
					  "<a href='#' id='cont' class='btn btn-primary'>GO</a>"+
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
	  		$('#facebook-session strong').text("Facebook UserName: "+response.name);
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
  	$(document).on('click', '#login', function(e) {
  		e.preventDefault();
  		facebookLogin();
  	})
    $(document).on('click', '#cont', function(e) {
  		e.preventDefault();
        window.location.href = 'perfil/';
  	})
})

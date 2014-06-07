// ==UserScript==
// @name Omnivox Auto-Login (Dawson)
// @namespace omv++
// @include https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/Login.aspx?ReturnUrl=/intr
// @include https://dawsoncollege.omnivox.ca/intr/*
// @include https://dawsoncollege.omnivox.ca/intr/Module/Identification/Login/*
// @include https://www-daw-lea.omnivox.ca/*
// @grant none
// @author Wololo
// @description This userscript is meant for users who are frustrated by a lack of 'Remember Me' function on OmniVox (Dawson).
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	//if lea for auto dl
	$('span.CVIR_lblExplications').html("<center><button id='downloadALL'>DOWNLOAD ALL TIS SHIT. WARNING RESOURCE INTENSIVE IF UR ON A GODDAMN MAC</button></center>");
	
	//templating..
	$('.wrapperform > tbody > tr:first > td > img').hide();
	$('#MasterWrapper').css('margin', '0 auto');
	var name = $('.userHeader > table:first').text();
	$('#MasterWrapper .userHeader > table:first').css({
		'position': 'relative',
		'top': '77px'
	});
	$('#MasterWrapper .userHeader > table:first').text("Yo " + name + ", wuzz good bra ?");
	$('.wrapper .userHeader > table:first').text("Peace out " + name);
	$('#ctl00_body > #aspnetForm #wrapll .footerPart').children().remove();
	$('#ctl00_body > #aspnetForm #wrapll .footerPart').html("<tr><td id='omwText' style='text-align:right;padding-right: 5px;width: 345px;'>Enable/Disabled Auto-Login ? (Hint: Press 'ESC' for fast disable)&nbsp;</td><td><button href='#' id='omwRememberMe'>Enable</button>&nbsp;<button href='#' id='omvForgetMe'>Disable</button></td></tr>");
	//autologin start
	if (localStorage.remEnabled == 'true') {
		$('.wrapperform > tbody > tr:first > td').html('<img src="http://i.imgur.com/tJvcO.jpg" alt="omv++ logo">');
		autoLogin(localStorage.userName, localStorage.password);
	} else {
		$('.wrapperform > tbody > tr:first > td').html('<img src="http://i.imgur.com/sXTRx.jpg" alt="omv++ logo">');
	}
	
	function autoLogin(userNode, passNode) {
		if (localStorage.password !== undefined) {
			$('#txtNoDA').val(userNode);
			$('#txtPasswordEtu').val(passNode);
			$('#btnLog1').click();
		}
	}
	
	//Event Listeners
	$('#btnLog1').click(function(){
		localStorage.userName = $('#txtNoDA').val();
		localStorage.password = $('#txtPasswordEtu').val();
	});
	
	$('span.CVIR_lblExplications').on('click', '#downloadALL', function() {
			$('.lblTitreDocumentDansListe').each(function(){
				this.click();
			});
			return false;
	});
	
	$('#wrapll').on('click', '#omvForgetMe, #omwRememberMe', function(e){
		switch ($(this).attr('id')) {
			case 'omvForgetMe':
				delete localStorage.userName;
				delete localStorage.password;
				localStorage.remEnabled = false;
				$('#omwText').text("Disabled Auto-Login. Deleted everything.");
				$('.wrapperform > tbody > tr:first > td').html('<img src="http://i.imgur.com/wIuU4.jpg" alt="omv++ logo">');
			break;			
			case 'omwRememberMe':
				localStorage.remEnabled = true;
				$('#omwText').text("Enabled. Go ahead and log-in to complete.");
				$('.wrapperform > tbody > tr:first > td').html('<img src="http://i.imgur.com/aJm9A.jpg" alt="omv++ logo">');
			break;
		}
		return false;
	});
	
	$(document).keyup(function(e){
			if (e.keyCode == 27) { 
				delete localStorage.userName;
				delete localStorage.password;
				localStorage.remEnabled = false;
				$('#omwText').text("Disabled Auto-Login.");
				$('.wrapperform > tbody > tr:first > td').html('<img src="http://i.imgur.com/wIuU4.jpg" alt="omv++ logo">');
			}
		return false;
	});
}

// load jQuery and execute the main function
addJQuery(main);

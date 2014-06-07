// ==UserScript==
// @name           GMC Support Page Monitor
// @namespace      scripts
// @description    GMC Support Page Monitor
// @grant          none
// @include        https://support.gmc.net/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// the guts of this userscript
function checkTicketChange() {

	if (window.webkitNotifications.checkPermission() != 0) {
		window.webkitNotifications.requestPermission();
	} else {
		$('#ticketViewGrid_gTicketView_row_0').each(function() {
			var alt = window.localStorage.getItem('lastUpdate');
			var neu = $(this).find('td').eq(2).find('div').html();
			window.localStorage.setItem('lastUpdate', neu);
			if (alt != neu) {
				var ticket = $(this).find('td').eq(3).find('div').html();
				window.webkitNotifications.createNotification('', 'Change on the GMC Support Page', 'Ticket "'+ ticket +'" has changed').show();	
				//alert('Ticket "'+ ticket +'" has changed');
			}
			setTimeout("location.reload(false);", 15000);
		});
	}
}

// load jQuery and execute the main function
addJQuery(checkTicketChange);
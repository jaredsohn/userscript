// ==UserScript==
// @name           TF2R Clear Notifications v2
// @namespace      http://tf2calculator.com
// @description    Automaticly clears all your red notifications on TF2R. 
// @version        2.0
// @match		   http://tf2r.com/*
// @include        http://tf2r.com/*
// @match		   http://www.tf2r.com/*
// @include        http://www.tf2r.com/*
// ==/UserScript==


(function() {
	var embedMe = function() {

			// Functions
			function cleanNotif(){
				$('.notif:contains("sadly")').children('.notifDel').click();
			}
			// Call functions if
			
			if($(".notif")[0]){
				cleanNotif();
			}

		/* end of function that will be inserted to the page */
	};

	// Insert our function to the <head>, <body> or somewhere.
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.appendChild(document.createTextNode('('+ embedMe +')();'));
	(document.head || document.body || document.documentElement).appendChild(script);

})();

//I just updated this script. I did not create it

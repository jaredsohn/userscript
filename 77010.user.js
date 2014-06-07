// ==UserScript==
// @name           Adsense Logout to Login page Redirect !
// @version        1.0 Date: 12/05/2010
// @author         Prashant P Patil
// @profile        http://www.orkut.co.in/Profile?uid=17618220612205038709
// @scripturl      
// @Siteurl       https://www.chat32.com/
// @namespace      Adsense Logout to Login page Redirect! 
// @description    This scripts redirects you from logout intropage to login page in adsense.com!
// @include        https://www.google.*
// ==/UserScript==


function on_ld(){
	var d = decodeURI(window.location); 
	
	if(d == "https://www.google.com/adsense/logged_out"){
	window.location = "http://www.adsense.com/";
	}

}

document.body.onload = on_ld();
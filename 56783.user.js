// ==UserScript==
// @name        LogMeIn Fluid.app Auto-Login
// @namespace   http://fluidapp.com
// @description LogMeIn Auto-login
// @include     *.logmein.com/*
// @author      Devbits
// ==/UserScript==

(function () {
    if (window.fluid) {
		var location = window.location.toString(); 
		
		if(location.indexOf("login") > -1){ 
			document.getElementById("email").value = 'YourEmail';
			document.getElementById("password").value = 'YourPassword';
			document.forms[0].submit();
		}
    }
})();
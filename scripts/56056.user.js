// ==UserScript==
// @name          JavaScript Alert Cancel Button
// @author        
// @namespace     
// @description	  
// ==/UserScript==
var unlock = true;

unsafeWindow.alert = function alert(message) {
	if (unlock) {
		  unlock = confirm(message);
	}
	else
	{
		console.log(message);
	}
}
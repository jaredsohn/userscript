// ==UserScript==
// @name          Disable JavaScript Alert
// @author        
// @namespace     
// @description	  
// ==/UserScript==


unsafeWindow.alert = function alert(message) {
	
		console.log(message);
	
}
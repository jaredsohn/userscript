// ==UserScript==
// @name          Meebo Secure
// @author        Tyler Charlesworth
// @namespace     http://www.tyworks.net
// @description   attempts to redirect to the secure login
// @include       http://www*.meebo.com/
// ==/UserScript==

(function(){
	if(location.href.indexOf("https://")!=0) location.href = "https://www.meebo.com";
})();

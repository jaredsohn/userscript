// ==UserScript==
// @name		Enable AutoFill Option for Wipro Gateway 
// @version		1.0
// @description	This small scripts enables to autoFill Username and Password option for Wipro Gateway, which is disabled for security reasons. before using this scripts, please make sure only you've access to your machine.
// @include		https://gateway.wipro.com/
// @include		https://gateway.wipro.com/*
// @grant		GM_getValue
// @grant		GM_setValue
// @copyright	2013+, Narender
// @author		Narender
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function($) {
status=0;
setInterval(
function(){
setTimeout(
  function(){
	if(status == 0){
		status = main($, status);
	}
  }, 1000);
}, 2000
);
});

function main($, status){
if( window.location.origin == "https://gateway.wipro.com"){
	if (window.location.pathname == "/dana-na/auth/url_62/welcome.cgi"){
		console.log("Found gateway URL, Patching Code, stand by ... ");
		if ($('form[name="frmLogin"]').attr("autocomplete") == "off"){
			$('form[name="frmLogin"]').attr("autocomplete","on");
			console.log("Auto Fill Option Patched: "+$('form[name="frmLogin"]').attr("autocomplete"));
		}
	}
}
}
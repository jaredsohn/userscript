// ==UserScript==
// @name		eRepublik auto donate
// @include		http://economy.erepublik.com/*/company/*/donate
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==



// Add 'missing' trim to the String class
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

function Main(e) {

	if (typeof unsafeWindow == 'undefined')
		unsafeWindow = window;
		
	if( $("#own li:lt(10)").size() > 0 )
	{
		$("#other").append($("#own li:lt(10)"));
		$("#donateform").submit();
	}
};

window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		clearInterval(checker);
		Main();
	}
},100);}, false);
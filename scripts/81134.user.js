// ==UserScript==
// @name		eRepublik Fast Donate
// @version		0.2
// @description	eRepublik script that simplifies donating to companies
// @author		eCitizen Renkas
// @namespace	eCitizenRenkas
// @include		http://economy.erepublik.com/*/company/*/donate
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// License and Disclaimer (lets make it simple :))
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you 
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty. 
// Use on your own responsibility.
// ===============================================================================

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
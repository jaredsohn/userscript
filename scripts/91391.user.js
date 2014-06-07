// ==UserScript==
// @name           Get away, Jimmy
// @namespace      http://*.wikipedia.org
// @include        http://*.wikipedia.org/wiki/*
// This simple script was written by Enrico Lamperti - http://elamperti.com/
// ==/UserScript==

jQuery(document).ready(function() {  

	jQuery('div#centralNotice').html('')
	setTimeout(GetAwayJimmy(), 500);
	toggleNotice();

});

function GetAwayJimmy() {
var oSNotice = document.getElementById('siteNotice');

	oSNotice.style.display = "none";
	jQuery('div#centralNotice').hide();
}
// ==UserScript==
// @name          Myspace Helper
// @namespace     none
// @description   Bypass login ad
// @include       *myspace.co*
// ==/UserScript==

if($('ctl00_ctl00_cpMain_cpMain_LoginBox_Email_Textbox')) {
	document.getElementById('dlb').addEventListener('click', function(event) {
		username = $('ctl00_ctl00_cpMain_cpMain_LoginBox_Email_Textbox').value;
		password = $('ctl00_ctl00_cpMain_cpMain_LoginBox_Password_Textbox').value;
		GM_setValue('myspace_'+username, password);
	}, true);
}

function $(elementId) { return document.getElementById(elementId); } // shortcut from "Prototype Javascript Framework"
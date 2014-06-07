// Xbox Marketplace Quick Codes
// c r e a t e d   b y   the eNeME
// Updated/Improved by RogueDarkJedi
// 4/30/2010
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Xbox Marketplace Quick Codes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Xbox Marketplace Quick Codes
// @namespace	   http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description    Adds a single, long input box along side the 5 other code input boxes. Copy a code into this box (punctuation and spaces will be removed automatically) and click the redeem button.
// @include        https://live.xbox.com/en-US/accounts/RedeemToken.aspx
// ==/UserScript==

(function() {

function addGlobalScript(code) {

    var head, funct;
    head = document.getElementsByTagName('head')[0];
    if (!head) 
	   return;

    funct = document.createElement('script');
    funct.innerHTML = code;
    head.appendChild(funct);
}

function injectCodeScript()
{
	var mydiv = document.createElement('div');
	mydiv.innerHTML = 	'<br>Quick Code Box:<br><input type="input" onchange="changeBox(this.value);" oninput="changeBox(this.value);" style="font-family: Courier New; padding-left: 2px; padding-right: 2px;"' 
				+ 'class="XbcTextBoxXbcForceUpperCase" id="ctl00_ctl00_MainContent_MainContent_TokenInput_FULL" size="30" name="ctl00$ctl00$MainContent$MainContent$TokenInput$FULL"></input>';
	document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput').appendChild(mydiv);



	addGlobalScript(
	"function changeBox(inp){"+
	"	var box1=document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part0');"+
	"	var box2=document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part1');"+
	"	var box3=document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part2');"+
	"	var box4=document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part3');"+
	"	var box5=document.getElementById('ctl00_ctl00_MainContent_MainContent_TokenInput_part4');"+
	"	inp = inp.replace(/[^a-z0-9A-Z]/g,'');"+
	"	box1.value=inp.substring(0,5);"+
	"	box2.value=inp.substring(5,10);"+
	"	box3.value=inp.substring(10,15);"+
	"	box4.value=inp.substring(15,20);"+
	"	box5.value=inp.substring(20,25);"+
	"}"
	);
	
}

injectCodeScript();

})();
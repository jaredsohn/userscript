// ==UserScript==
// @name            SJSU Wireless Auto-Login
// @author	    Tped(Credit to hackbac for code)
// @description     Automatically logins in to SJSU Wireless
// @include         *login?cmd=login&mac=*&ip=*&url=*
// @include	    https://wirelesslogin3.sjsu.edu/cgi-bin/
// @include         https://wirelesslogin2.sjsu.edu/cgi-bin/
// @include         https://wirelesslogin4.sjsu.edu/cgi-bin/
// ==/UserScript==
// Version: 3.00
// Date Created: 09/16/09 14:23
// Author: Brian Chong <code@hackbac.com>
// Updated by Tped
// Uses Code from "The JavaScript Source: Password Protection: ASCII Encryption" by David Salsinha
// Adapted Code from "Autologin Meebo - saves username in about:config" by Parashuram
//Updated Feb 8, 2012 added wirelesslogin 2 & 4.
//Apparently 3 only works for the student union and business buildling
// NOTE: NOT TESTED FOR CHROME
// Email: jedhalim@gmail.com if there are any issues

// -- Encryption Functions -- 
function Encrypt(theText) {
	output = new String;
	Temp = new Array();
	Temp2 = new Array();
	TextSize = theText.length;
	for (i = 0; i < TextSize; i++) {
		rnd = Math.round(Math.random() * 122) + 68;
		Temp[i] = theText.charCodeAt(i) + rnd;
		Temp2[i] = rnd;
	}
	for (i = 0; i < TextSize; i++) {
		output += String.fromCharCode(Temp[i], Temp2[i]);
	}

	return output;
}
function unEncrypt(theText) {
	output = new String;
	Temp = new Array();
	Temp2 = new Array();
	TextSize = theText.length;
	for (i = 0; i < TextSize; i++) {
		Temp[i] = theText.charCodeAt(i);
		Temp2[i] = theText.charCodeAt(i + 1);
	}
	for (i = 0; i < TextSize; i = i+2) {
		output += String.fromCharCode(Temp[i] - Temp2[i]);
	}

	return output;
}

// -------------------------

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 
    return vars;
}
// -------------------------

// Form 'regform' in https://securelogin.arubanetworks.com
var form = document.forms.namedItem('regform');
// 

// If form exists ... 
if (form != null) { 
	// -- Get URL -- 
	GM_setValue('firstURL', getUrlVars() ["url"]);
	//  ------------
		
	var uid = form.elements.namedItem('user');
	var pw = form.elements.namedItem('password');
	

	// -- Autologin adaptation --
	if (!GM_getValue('eUserName')) 
	{
		eUserName = prompt("What is your SJSU Student ID? ");		
	GM_setValue('eUserName', Encrypt(eUserName));
	} 
	else 
	{
		eUserName = GM_getValue('eUserName');
		
	}
	
	if (!GM_getValue('ePassword')) 
	{
		ePassword = prompt("What is your SJSU Wireless Password? ");
		GM_setValue('ePassword', Encrypt(ePassword));
		
	} 
	else 
	{
		ePassword = GM_getValue('ePassword');
		
	}
	//  ------------------------

	// Automatically fill Username & Password fields
	uid.value = unEncrypt(eUserName);
 
	pw.value = unEncrypt(ePassword);
	
	
	form.submit(); 
	// --------------------------
	
	


} 
else //  If form doesn't exist, then the page is a Successful Login
{	
	// -- Redirect --
	var firstURL = GM_getValue('firstURL');
	window.location = decodeURIComponent(firstURL) ; 
	GM_setValue('firstURL', '');	
	// --------------
}

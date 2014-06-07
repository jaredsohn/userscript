// ==UserScript==
// @name           eReoublik Fix 101
// @namespace      http://www.erepublik.com/en/citizen/profile/1309629 //[http://www.erepublik.com/en/citizen/profile/3345790]
// @include        http://economy.erepublik.com/*
// @include        http://erepublik.com/*
// @require		     http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

//Special thanks to JCFC http://www.erepublik.com/en/citizen/profile/1618260
//who wrote the original version of this greasemonkey script http://userscripts.org/scripts/show/81311
//This is JGutenberg's crappy adaptation to replace the word United Kingdom with the words United Faildom in greasemonkey.

//URL settings
var currURL = location.href;
var arrURL = currURL.split('/');
BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';


// The fun stuff...
function replace_Lisa()
{
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("United Kingdom","United Faildom");
}


// Other crap...
function MsgBox (textstring) {
alert (textstring) }

//Main function
function Main() {

	var subURL = currURL.substr(BASE_URL.length);
	LOCALE = subURL.substring(0, 2) + '/';
	BASE_URL += LOCALE;
	subURL = currURL.substr(BASE_URL.length);
	
	var pagesFunctions = [
		{p: 'entertain',	f: replace_Lisa}
	];
	
	pagesFunctions.forEach(function(v) {
		if ((subURL.substr(0, v.p.length) == v.p))
			v.f();
			});	
};

window.addEventListener('load',Main(), false);
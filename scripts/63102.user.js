// ==UserScript==
// @name           Google Easy Url
// @namespace      http://www.dweebsonduty.com
// @description    Strips out the extra params from the google search URL, inspired by Matt Cutts.
// @include        http://www.google.com/search
// @include        http://google.com/search
// ==/UserScript==
var txt = location.href;
var firstpart = txt.search('&q=');//search for the query string
var startat = 2;
 if (firstpart == -1) //if the search string is found at the beginning do the next bit
     {
	 firstpart = txt.search('/?q=');
	 startat = 1;
	 }
 var newtxt = txt.substring(firstpart,255); //cutting and stuff
 newtxt = newtxt.substring(1,newtxt.length);
 var secondpart = newtxt.search('&');
 newtxt = newtxt.substring(startat,secondpart);
var logo = document.createElement("div"); //Adding the html code
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #cccccc; ' +
    'color: #000000;"><p style="margin: 2px 0 1px 0;"> ' +
    'Your Easy Url: <a href="http://www.google.com/search?q=' + newtxt +'">http://www.google.com/search?q='+newtxt+'</a>';
    '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);

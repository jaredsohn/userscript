// ==UserScript==
// @name           serverchange
// @author		   adamclerk
// @namespace      minethings
// @description    add server change link
// @include        http://*.minethings.com*
// ==/UserScript==
var currentURL = window.location.href;
var loginheader = document.getElementById('login');

var asolink = document.createElement('a');
asolink.href = "http://www.minethings.com/miners/login/1";
asolink.innerHTML = "&nbsp;&nbsp;ASO&nbsp;&nbsp;";

var bromolink = document.createElement('a');
bromolink.href = "http://www.minethings.com/miners/login/2";
bromolink.innerHTML = "&nbsp;&nbsp;BROMO&nbsp;&nbsp;";

var callink = document.createElement('a');
callink.href = "http://www.minethings.com/miners/login/3";
callink.innerHTML = "&nbsp;&nbsp;CAL&nbsp;&nbsp;";


if(currentURL.substring(0, 10) == "http://aso")
{
	asolink.href = "";
}
else if(currentURL.substring(0,12) == "http://bormo")
{
	bromolink.href = "";
}
else if(currentURL.substring(0,14) == "http://calbuco")
{
        callink.href= "";
}

loginheader.appendChild(asolink);
loginheader.appendChild(bromolink);
loginheader.appendChild(callink);
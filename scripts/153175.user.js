// ==UserScript==
// @name           Seychii
// @namespace      http://userscripts.org/users/440089
// @description    Changes Url links to full view
// @include        http://sugar99.com/*
// @include        http://*.sugar99.com/*
// @version        1a
// @grant       none
// ==/UserScript==

var cookies = document.cookie;
var bNewWin = readCookie('OpenInNewWindow');
var links = document.links;
for (var i=0; i<links.length; i++)
{
 	if (links[i].href.indexOf("http://fsakura.com") == 0) 
 	{
     //	var iPos = images[i].parentNode.href.indexOf("http://www.lazygirls.info/");
     //	if (iPos == 0) 
     //	{
         //	var sCeleb = images[i].parentNode.href.substring(26); //26 = length of http://www.lazygirls.info/
         //	sCeleb = sCeleb.substring(0, sCeleb.indexOf('/'));
         	//images[i].parentNode.href = images[i].parentNode.href + '?celebrity=' + sCeleb;
			links[i].innerHTML = links[i].href;
         	if (bNewWin == "true"){
         		images[i].parentNode.target = "_blank";
     //   	}
     	}
	}
}

//scroll to bottom (more likely for all thumbnails to show)
var bAutoScroll = readCookie('AutoScroll');
if (bAutoScroll == "true" && (window.location.toString().indexOf("sort") > 0 || window.location.toString().indexOf("loc") > 0)) {
	window.onload = function(){window.scrollTo(0, document.body.scrollHeight);}
}

//show options
var fbrt = document.getElementById('fb-root');
var cbScroll = document.createElement('input');
cbScroll.type = 'checkbox';
cbScroll.checked = (bAutoScroll == "true");
cbScroll.onclick = function() { 
	var date = new Date();
	date.setTime(date.getTime()+(60480000000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = "AutoScroll="+this.checked+expires+"; path=/";
	};
fbrt.appendChild(cbScroll);
var lblScroll = document.createElement('label');
lblScroll.innerHTML = "AutoScroll to Bottom";
lblScroll.htmlFor = cbScroll;
fbrt.appendChild(lblScroll);

var cbNewWin = document.createElement('input');
cbNewWin.type = 'checkbox';
cbNewWin.checked = (bNewWin == "true");
cbNewWin.onclick = function() { 
	var date = new Date();
	date.setTime(date.getTime()+(60480000000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = "OpenInNewWindow="+this.checked+expires+"; path=/";
	window.location.reload();
	};
fbrt.appendChild(cbNewWin);
var lblNewWin = document.createElement('label');
lblNewWin.innerHTML = "Open in new window";
lblNewWin.htmlFor = cbNewWin;
fbrt.appendChild(lblNewWin);

function readCookie(name) {
	// Declare variable to set the "name=" value.
	var start = cookies.indexOf(name + "=");
	// Get the index if the cookie name is found.
	if (start == -1){
		return "";
	}
	// Get the first character of the cookie.
	start = cookies.indexOf("=", start) + 1;
	// Read to the end of the cookie.
	var end = cookies.indexOf(";", start);
	if (end == -1){
		end = cookies.length;
	}
	// Get the cookie value, reversing the escaped format by using the unescape method.
	return unescape(cookies.substring(start, end));
}
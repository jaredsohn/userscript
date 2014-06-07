//
// ==UserScript==
// @name         oxyshare download time delay bypass 
// @namespace     http://www.digivill.net/~joykillr
// @description   Bypasses the oxyshare download time delay.  Works both with javascript enabled or disabled!
// @include       http://www.oxyshare.com/*
// ==/UserScript==
//

var firstre = new RegExp;
//firstre = /^http\:\/\/www\.oxyshare\.com\/get\/[^a-z]{32}\//i;
firstre = /^http\:\/\/www\.oxyshare\.com\/get\//i;

if (location.href.match(firstre)) {

if (!document.body.parentNode.innerHTML.indexOf("/got/")) {
		return;
	} else {
		var str1 = document.body.parentNode.innerHTML.indexOf("/got/");
		str1 = document.body.parentNode.innerHTML.substr(str1);
		str1 = str1.split('"')[0];
		
		// add table
	var sboxl = document.createElement("div");
	sboxl.setAttribute("id", "hackdiv");
	sboxl.innerHTML = '<table style="width:98%;text-align:center;border:1px dotted black;margin-left:auto;margin-right:auto;">' +
		'<tr><td style="text-align:right;">' +
		'<h4> D/L Link: </h4>' +
		'</td><td style="width:8%" />' +
		'<td style="width:55%;text-align:left;">' +
		'<form method="post" action="' + str1 + '">' +
		'<input class="button" name="getfile" value="Continue" type="submit"> </form>' +
		'</td></tr></table>';
		
	document.getElementById('counter').parentNode.insertBefore(sboxl, document.getElementById('counter').parentNode.firstChild);
		}
			
	}
			
var dlre = new RegExp;
dlre = /^http\:\/\/www\.oxyshare\.com\/got\//i;

if (location.href.match(dlre)) {			
	if (!document.body.parentNode.innerHTML.indexOf("/dld/")) {
		return;
	} else {
		var str2 = document.body.parentNode.innerHTML.indexOf("/dld/");
		str2 = document.body.parentNode.innerHTML.substr(str2);
		str2 = str2.split('"')[0];
		
		// add table
		var sbox2 = document.createElement("div");
		sbox2.setAttribute("id", "hackeddiv");
		sbox2.innerHTML = '<table style="width:98%;text-align:center;border:1px dotted black;margin-left:auto;margin-right:auto;">' +
		'<tr><td style="text-align:right;">' +
		'<h4> D/L Link: </h4>' +
		'</td>' + //<td style="width:8%" />' +
		'<td style="width:55%;text-align:left;">' +
		'<a href="' + str2 + '">Download File</a>' + 
		'</td></tr></table>';
		
	document.getElementById('counter').parentNode.insertBefore(sbox2, document.getElementById('counter').parentNode.firstChild);
		}
	}
	//};

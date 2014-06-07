// ==UserScript==
// @name           MSY Fix
// @namespace      msy_fix
// @description    Fixes errors on msy.com.au Also improves design.
// @include        http://msy.com.au/*
// @include        http://www.msy.com.au/*
// @exclude        http://www.msy.com.au/Parts/PARTS.pdf
//@exclude         http://msy.com.au/SERVICE.HTM
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var url  = document.location.toString();
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss ('* { font-family: Arial; }');


if (url.match('http://msy.com.au')) {
document.body.innerHTML = '<center><img src="http://www.kelwynsa8.co.cc/msy%20logo.jpg" /></center>' +
'<center><h2>Welcome to MSY Technology Pty Ltd Australia.</h2>' +
'<i>The name you can trust - More Than 10 years in computer industry, 100 Australian Owned. The best price in IT products everyday.</i><br /></center>'
document.body.innerHTML+='<center><a href="http://www.msy.com.au/Parts/PARTS.pdf">Parts (PDF)</a> · <a href="http://www.msy.com.au/SYSTEMS/system.html">System Prices List</a>' +
'· <a href="http://www.msy.com.au/notebook/notebook.pdf">Laptop Prices (PDF)</a> <br /> <h4>State Clearouts</h4><a href="http://www.msy.com.au/Parts/clayton_W.htm">Victoria</a> · <a href="http://www.msy.com.au/Parts/auburn_W.htm">NSW</a> · <a href="http://www.msy.com.au/Parts/slackscreek_W.htm">QLD</a> · <a href="http://www.msy.com.au/Parts/plympton_W.htm">SA</a> · <a href="http://www.msy.com.au/Parts/balcatta_W.htm">WA</a><br /></center>';
}

if (url.match('http://msy.com.au/SERVICE.HTM')) {
}
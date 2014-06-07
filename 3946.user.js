// ==UserScript==
// @name          Facebook Antique
// @author	      James Pereira
// @namespace     http://www.sawdustbunny.com/
// @description	  Makes Facebook look all antiquated
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#header { background:#F9FCC6; }");
GM_addStyle("H1 { color:black; }");
GM_addStyle("H2 { color:black; }");
GM_addStyle("H4 { color:black; }");
GM_addStyle("div.profileheader { color:#000000; background:#885522; border-color:#000000;}");
GM_addStyle("A:link.edit, A:hover.edit, A:visited.edit { color:#885522; }");
GM_addStyle("#pageheader { background:url('http://www.sawdustbunny.com/antique_header.jpg') }");
GM_addStyle("div.profilebox { background:#fCfCf0; }");
GM_addStyle("A:link { color:#CC9966; }");
GM_addStyle("A:hover { color:#CC9966; }");
GM_addStyle("A:visited { color:#CC9966; }");
GM_addStyle(".profileheader h2 {color:#FFCC99;}");
GM_addStyle("input.inputtext {border:1px solid #885522; background:#FCFCF0; color:#996633; }");
GM_addStyle("#tabs { text-align:center; padding:4px 0px; margin:10px 20px 10px; border-bottom:solid 1px #000000;}");
GM_addStyle("#tabs div { display:inline; padding:0px; margin:0px; background:#FCFCF0}");
GM_addStyle("* html #tabs div { margin: 0 3px; }");
GM_addStyle("#tabs a { margin: 0px; padding: 4px; background: #FCFCF0;}");
GM_addStyle("#tabs .activetab a { color:#CC9966; border:1px solid #007700; border-bottom:0px; background:#A0FF80; }");
GM_addStyle("#friendnav {margin:0; padding:10px 0px 0px; border-bottom:3px groove #DDAA77;");

imgs = document.getElementsByTagName('img');

for(var i=0; i<imgs.length; i++){
	if(imgs[i].src.indexOf("onlinenow") != -1 || imgs[i].src.indexOf("mob") != -1) imgs[i].src="http://www.sawdustbunny.com/scroll.png";	
}

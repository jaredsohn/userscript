// ==UserScript==
// @name           YMail Neo
// @description    Ad free & more space with YMail Neo interface
// @include        http://*.mail.yahoo.*/neo/*
// @include        https://*.mail.yahoo.*/neo/*
// @include        http://*.mail.yahoo.*/dc/*
// @include        https://*.mail.yahoo.*/dc/*
// ==/UserScript==

if(document.URL.charAt(4)!='s'){
	document.location='https'+document.URL.substr(4,document.URL.length);
}

if(typeof(GM_addStyle) == 'undefined') {
  function GM_addStyle(css) {
    var style = document.createElement('style').setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML = css;
  };
}
document.body.className = "withoutad";	
GM_addStyle(".yucs-sweb-btn {visibility: hidden; display: none;}");
GM_addStyle(".yuhead-logo {visibility: hidden; display: none;}");
GM_addStyle(".nav-bar {background-color: transparent; top: 42px; left: 0px; right: 16px; width: auto;}");
GM_addStyle("#yUnivHead {height: 74px;}");
var main 		= document.getElementById("main");
var shellnav 		= document.getElementById("shellnavigation");
var shellcontent 	= document.getElementById("shellcontent");
main.style.top 		= "72px";
main.style.position 	= "absolute";
shellnav.style.top 	= "107px";
shellcontent.style.top 	= "107px";
var ymsearch		= document.getElementById("yuhead-search");
ymsearch.style.zIndex	="123";
ymsearch.style.position="absolute";
ymsearch.style.marginTop="4px";
ymsearch.style.top="0px";
ymsearch.style.right="174px";
ymsearch.style.width="444px";
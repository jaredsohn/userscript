// ==UserScript==
// @name           RFD
// @namespace      www.redflagdeals.com
// @description    RFD
// @include        http://www.redflagdeals.com/*
// ==/UserScript==


function addGlobalStyle(css) {   
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.header { background: #CCCCCC; url : "" }');
addGlobalStyle('.headerRight  { background: #CCCCCC; url : "" }');
addGlobalStyle('.headerLeft   { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu li    { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu li:hover    { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu a    { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu li    { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu li:hover    { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu a:hover    { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu #current    { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu #current a   { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu #current a:hover   { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu #current img  { background: #CCCCCC; url : "" }');
addGlobalStyle('.sidebarTitleLeft  { background: #CCCCCC; url : "" }');
addGlobalStyle('.sidebarTitleRight  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu li#tab_scarlett_lounge { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu li#tab_scarlett_lounge:hover { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu #tab_scarlett_lounge a { background: #CCCCCC; url : "" }');
addGlobalStyle('#menu #tab_scarlett_lounge a:hover { background: #CCCCCC; url : "" }');
addGlobalStyle('#submenu a:link, #submenu a:active, #submenu a:visited  { background: #CCCCCC; url : "" }');
addGlobalStyle('#submenu a:hover  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore ul  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore li  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore li:hover, #menumore li.hover  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore a  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore a:hover  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore ol  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore ol li  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore ol li a  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore ol li a:hover  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore ol li  { background: #CCCCCC; url : "" }');
addGlobalStyle('#menumore ul li:hover ol, #menumore ul li.hover ol  { background: #CCCCCC; url : "" }');



// remove various background styles
var imgs = document.getElementsByTagName('td');
for (i=0; i<imgs.length; i++)
{
	if (imgs[i].className == "thead") {
		imgs[i].style.background = "#CCCCCC";	
	}
	else if (imgs[i].className == "vbmenu_control") {
		imgs[i].style.background = "#CCCCCC";		
	}	
	else if (imgs[i].className == "smallfont") {
		imgs[i].innerHTML = "";
	}
}


// nuke all headers
var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
	if (imgs[i].src.indexOf("image.php") > -1) {
		imgs[i].src = "";
		imgs[i].alt = "";
	}
	else if (imgs[i].src.indexOf("pip.gif") > -1) {
		imgs[i].src = "";
		imgs[i].alt = "";
	}	
	else if (imgs[i].src.indexOf("statusicon") > -1) {
		imgs[i].src = "";
		imgs[i].alt = "";
	}		
	else if (imgs[i].src.indexOf("misc") > -1) {
		imgs[i].src = "";
		imgs[i].alt = "";
	}
	else if (imgs[i].src.indexOf("headerLogo.png") > -1) {
		imgs[i].src = "";
		imgs[i].alt = "";
	}
	else if (imgs[i].src.indexOf("btnMore.png") > -1) {
		imgs[i].src = "";
		imgs[i].alt = "";
	}
}

// nuke all headers
var imgs = document.getElementsByTagName('a');
for (i=0; i<imgs.length; i++)
{
	if (imgs[i].href.indexOf("report.php") > -1) {
		imgs[i].innerHTML = "";
		imgs[i].src = "";
		imgs[i].alt = "";
	}



}
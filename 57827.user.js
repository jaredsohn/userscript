// ==UserScript==
// @name           ALCNAV 
// @namespace      sas
// @include        http://www.adorama.com/alc/*
// @require        http://ebraun.adorama.com/adoramaLC/newALC/HTML/NlearningCenter.css

// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


// All your GM code must be inside this function
function letsJQuery() {

var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href:'http://www.chiasso.com/includes/style.css'});
document.body.previousSibling.appendChild(styles);

	var newNav = $("<ul id='alcNav'><li><a href='#'>Articals</a>  <li><a href='#'>Workshops</a>  <li><a href='#'>Newsdesk</a>  <li class='lastChild'><a href='#'>Blog</a></li></ul>");

	
	$("#PgCntntCntnr").prepend(newNav);
}


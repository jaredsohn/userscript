// ==UserScript==
//
// @name           Youtube Centred
//
// @description    Centres the annoyingly left-aligned YouTube.
//
// @namespace      http://www.l-lin.com
//
// @author         llin
//
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
// @version        1.7
//
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
//
// @history        1.0 first version
// @history        1.1 fixed video centreing
// @history        1.2 fixed HTTPS and description.
// @history        1.3 fixed overlapping guide.
// @history        1.4 fixed disappearing guide.
// @history        1.5 fixed disappearing guide again.
// @history        1.6 fixed home page and search results.
// @history        1.7 fixed feed page.
//
// ==/UserScript==


var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
	$("body").addClass("site-centre-aligned");
	$("body").removeClass("site-left-aligned");
	if (!((window.location.pathname == "/") | (window.location.pathname == "/results") | (window.location.pathname.substring(0,5) == "/feed"))) {
		$("#guide-container").attr("style", "margin-left: -135px");
	}
	if (window.location.pathname == "/results") {
		$("#page-container").attr("style", "margin-left: 25%");
	}
});
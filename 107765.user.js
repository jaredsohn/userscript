// ==UserScript==
// @name           Google+ bar auto-hide
// @description    Hide anoying Google+ header elements
// @namespace      sk.dob
// @author	   Samuel B.
// @version	   0.1.0
// @website	   http://devel.dob.sk/gm/google_bar_auto-hide
//
// @exclude        https://plus.google.*/*
// @exclude        http://plus.google.*/*
// @include        https://*.google.*/*
// @include        http://*.google.*/*
//
// Based on Google Plus Header Hider userscript (http://userscripts.org/scripts/show/106030).
//
// This script is primarily for google search site, but works also on other googles sites
//	except gmail. I'll try to fix this maybe.
//
// ==/UserScript==


(function() {
    GM_log("init");

    if(window.top != window.self)
	return;

    var gb = document.getElementById("gb");
    if(!gb)
	return;

    // calculate high
    var initHeight = 30;
    if(document.getElementById("sfcnt"))
    {
	sbg = document.getElementById("sfcnt").getElementsByTagName("div")[0];
	initHeight = sbg.offsetTop;
    }
    var hide = Math.ceil(initHeight * 0.85);

    var showbar = function(){ 
        GM_log("mouseout");
        gb.style.position = "static";
        gb.style.height = "0px";
        gb.style.top ="0px";

	// unhide it
	if(document.getElementById("gbgs1"))
	{
		document.getElementById("gbgs1").style.display="";
		document.getElementById("gbgs3").style.display="";
	}
    };

    var hidebar = function() { 
        GM_log("mouseover");
        gb.style.position = "relative";
        gb.style.height = "0px";
        gb.style.top = -hide + "px";
    };

    // auto-hide gbar
    hidebar();
    gb.addEventListener("mouseover", showbar, false);
    gb.addEventListener("mouseout", hidebar, false);

    // hide stupit items
    if(document.getElementById("gbgs1"))
    {
	// gbgs1 - notification
	document.getElementById("gbgs1").style.display="none";
	//gbgs3 - share button
	document.getElementById("gbgs3").style.display="none";
	//gbts  - user name
	document.getElementById("gbi4t").style.display="none";
    }

    // move also search bg
    if(sbg)
      sbg.style.top = (initHeight - hide) + "px";

}) ();

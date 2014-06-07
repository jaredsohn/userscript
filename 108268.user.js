// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later:
// http:greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	Grooveshark to the MIN!
// @namespace   	arne.wendt@tu-harburg
// @description	Removes:
//			-Advertisement
//			-Sidebar Navigation
//			-Profile/Account Header
//			-Grooveshark Logo
//			-Crossfadebutton
//			-Linkbar
//			-Hints on Homepage
//			-blackboard Theme
//			-some facebook fuss
//
// @include       	http://grooveshark.com/*
// ==/UserScript==


document.getElementsByTagName("head")[0].removeChild(document.getElementById("themeStyleSheet"));


window.addEventListener('load', 

    function() { 
	    
	    
	document.getElementById("mainContainer").removeChild(document.getElementById("capital"));
	document.getElementById("content").removeChild(document.getElementById("sidebar"));
	document.getElementById("main").removeChild(document.getElementById("header"));
	document.getElementById("homePage").removeChild(document.getElementById("homeFooter"));
	document.getElementById("homePage").removeChild(document.getElementById("homeFooterSeparator"));
	document.getElementById("application").style.marginRight=0;
	document.getElementById("page_wrapper").style.width="100%";
	document.getElementById("page_wrapper").removeChild(document.getElementById("theme_home"));
	document.getElementById("page_wrapper").style.backgroundColor="#222222";
	document.body.removeChild(document.getElementById("fb-root"));
	
	document.getElementById("player_controls_right").removeChild(document.getElementById("player_crossfade"));
	document.getElementById("player_loop").style.cssFloat="right";
	document.getElementById("player_shuffle").style.cssFloat="right";
	document.getElementById("player_volume").style.cssFloat="right";
	document.getElementById("player_controls_right").style.width="100px";
	document.getElementById("volumeControl").style.left=String(document.getElementById("player_volume").offsetLeft)+"px";
	
	document.getElementById("notifications").style.visibility="hidden";
	    
	
    },
    true);
    

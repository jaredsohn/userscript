// ==UserScript==
// @name           Kaskus Beta Nav Anywhere
// @namespace      http://www.s4nji.com
// @author         s4nji
// @version        0.12
// @description    Adds a box filled with anchor elements, redirecting to important/bookmarked places.
// @include        http://livebeta.kaskus.us/*
// @include        http://livebeta.kaskus.us/
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	
	// Inject Element(s)
	$("#wrapper").after("<p id='bottom'></p>")
	$("#wrapper").before('<div id="nav-box"><div id="nav-usercp"</div><a href="http://livebeta.kaskus.us/profile">Profile</a></div><a href="#top" id="nav-top" >Top</a><a href="#bottom" id="nav-bottom" >Bottom</a></div>')
	
});


// Styling //
// Positioning
GM_addStyle("#nav-usercp { z-index: 99999999; height: 70px; width: 300px; position: fixed; top: -42px; right: 30px; -moz-transition: top 300ms ease 0ms !important; } ");

// Button Idle
GM_addStyle("#nav-usercp a { background-clip: padding-box; background-color: #5694DE;	background: #5694de; border: 1px solid #36549E;	border-radius: 4px 4px 4px 4px;	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 -1px 0 rgba(255, 255, 255, .4); font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: rgba(255,255,255,0.9);	padding: 12px 15px;	font-weight: bold; font-size: 14px; text-decoration: none;	float: right;	margin-left: 5px; margin-top: 7px;	-moz-transition: all 200ms ease 0ms !important;	text-align: center;	cursor: pointer; } ");

// Button Hover
GM_addStyle(" #nav-usercp:hover { top: -15px; } ");

// Top & Bottom Button
GM_addStyle("#nav-top, #nav-bottom { line-height: 15px; font-weight: bold; font-size: 14px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: rgba(255,255,255,0.9); width: 50px; height: 30px; padding: 15px 10px 25px; position: fixed; bottom: -60px; right: 8px; background: #55cc55 !important; border: 1px solid rgba(0,0,0,0.4);	border-radius: 4px;	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 1px 0 rgba(255, 255, 255, .5); text-align: center; z-index: 999999999; -moz-transition: bottom 300ms ease 0ms !important; } ");

// Anim
GM_addStyle("#nav-top:hover, #nav-bottom:hover { bottom: -27px;  } ");

// Bottom Button Patch
GM_addStyle("#nav-bottom { background: #cc5555 !important; margin-right: 80px; } ");

// Top Hover
GM_addStyle("#nav-top:hover { background: #F4F4F4; }" );

// Top Click
GM_addStyle("#nav-top:active { padding: 16px 10px 25px; height: 29px; } ");

// Remove
GM_addStyle(" .close { display: none !important; } ");
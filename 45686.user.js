// Google Analytics Fullscreen Reports
// version 0.2 BETA!
// 2009-03-31
// Copyright (c) 2009, New Media Gateway
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
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
// @name           Google Analytics Fullscreen Reports
// @namespace      tysonkirksey.com
// @description    Provides one-click access to full screen reports in Google Analytics
// @include        http://www.google.com/analytics/*
// @include        https://www.google.com/analytics/*
// ==/UserScript==

var content, nav, export_btn;
content = document.getElementById('main_content');
nav = document.getElementById('main_context');
export_btn = document.getElementById('export_button_item');

if(GM_getValue("fullscreen",0))
{
  ToggleFullScreen();
}


if(content && export_btn)
{
  var logo2 = document.createElement("td");
	logo2.innerHTML = "<a href='#' class='button' id='full-screen-btn'><b><b><b>Full Screen</b></b><b/></a>";
	export_btn.parentNode.insertBefore(logo2, export_btn);	
	
	//add event handlers	
	var gm_fs_btn=document.getElementById("full-screen-btn");
	gm_fs_btn.addEventListener("click", ToggleFullScreen, true);
	
	
}

function ToggleFullScreen()
{
  if(content.style.width != "100%")
	{
  	content.style.width = "100%";
  	nav.style.marginLeft = "-250px";
		//logo2.innerHTML = "<a href='#' class='button' id='full-screen-btn'><b><b><b>Show Menu</b></b><b/></a>";
		//gm_fs_btn.addEventListener("click", ToggleFullScreen, true);
		GM_setValue("fullscreen", 1);
	}
	else
	{
  	content.style.width = "79%";
  	nav.style.marginLeft = "0px";
		GM_setValue("fullscreen", 0);
		//logo2.innerHTML = "<a href='#' class='button' id='full-screen-btn'><b><b><b>Full Screen</b></b><b/></a>";
	}
}



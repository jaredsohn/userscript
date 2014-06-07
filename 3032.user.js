// Notification box for incoming private messages.
// version 0.1 BETA!
// 2005-01-21
// Copyright (c) 2005, Adam Karnowka
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
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
// @name          last.fm message notifier
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Shows big green notification box about incoming private messages.
// @include       http://*.last.fm/*
// @exclude		  http://*.last.fm/inbox/*
// ==/UserScript==

var container = document.getElementById("badgeNav");
var containerContent = container.innerHTML;

if(containerContent.indexOf('0 new')==-1)
{
			var bg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAbSURBVHjaYozcwXuTgQTAxEAiGNUwUjQABBgAnBgCD74NEPYAAAAASUVORK5CYII=";
			var newLayer = document.createElement("div");
			newLayer.setAttribute("style","width:60%;height:20%;position:fixed;top:35%;left:20%;background-color:transparent;border: 6px solid #1B5300;background-image:url('"+bg+"');font-family: candara,verdana,tahoma;font-size:45px;color:#FFFFFF;text-align:center;padding-top:10%;cursor:pointer;z-index:100");
			newLayer.setAttribute("onclick","window.location ='http://www.last.fm/inbox/pm.php';");
			newLayer.innerHTML = "New message(s) in inbox!";
			document.getElementById("LastFooter").appendChild(newLayer);
}
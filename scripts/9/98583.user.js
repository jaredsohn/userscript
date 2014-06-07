// Copyright (c) 2011, Oliver Sand
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Minecraft Beta Fullscreen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Minecraft Beta Fullscreen
// @namespace     http://www.sweet-labs.com
// @description   Add a link to minecraft page to, make the Minecraft Applet apear in Fullscreen
// @include       http://www.minecraft.net/play
// @include       https://www.minecraft.net/play
// @version       1.5
// ==/UserScript==

if(document.getElementsByTagName('applet').length != 0 && document.getElementsByTagName('section').length != 0)
{
  var panel = document.getElementsByTagName('section')[0];

  panel.innerHTML += '<br /><a href="javascript: var applet = document.getElementsByTagName(\'applet\')[0]; applet.height = window.innerHeight; applet.width = \'100%\'; document.body.innerHTML = \'\'; document.body.appendChild(applet); document.getElementsByTagName(\'html\')[0].style.overflow = \'hidden\';">Go to fullscreen</a>';
}
else
{
  var panel = document.getElementsByTagName('html')[0];

  panel.innerHTML += '<a href="http://userscripts.org/scripts/source/98583.user.js">The code of the minecraft.net website has changed. Click here to update the script</a>';
}
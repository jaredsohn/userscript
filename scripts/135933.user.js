// ==UserScript==
// @name           Google Facebook
// @namespace      manoelcampos.com
// @author         Manoel Campos
// @copyright      2012+, Manoel Campos (http://userscripts.org/users/472004)
// @licence        Summary: Free for personal any use; http://userscripts.org/scripts/show/135933
// @description    Add a facebook link to Google home page
// @version        2012.06.12
// @updateURL      http://userscripts.org/scripts/source/135933.meta.js
// @downloadURL    http://userscripts.org/scripts/source/135933.user.js
// @website        http://userscripts.org/scripts/show/135933
// @include        http://google.com*
// @include        http://www.google.com*
// @include        https://google.com*
// @include        https://www.google.com*
// ==/UserScript==
script = {};
script.version = "2012.06.12";

// SETTINGS -----------------------------
// This script has a settings screen on Youtube (a gear icon below the video)
// You need to set your settings on that screen.
// --------------------------------------

// Everything below this line shouldn't be edited unless you are an advanced user and know what you are doing.

// Defining script constants
script.name = "Google Facebook";
script.shortname = "GFB";
script.website = "http://userscripts.org/scripts/show/101753";
script.discussion = "http://userscripts.org/scripts/discuss/101753";
script.icon = "http://i.imgur.com/VQ8pr.png";
script.icon64 = "http://i.imgur.com/hfj8l.png";
script.mainCSS = "";




var ol = document.getElementById("gbzc");
if(!ol) 
  return;

var li = document.createElement('li');
li.setAttribute('id', "fb");
li.setAttribute("class", "gbt");
li.innerHTML = "<a class=gbzt id=gb_999 href='http://facebook.com'><span class=gbtb2></span><span class=gbts>Facebook</span></a>";
ol.appendChild(li);

//<li class=gbt><a class=gbzt id=gb_24 href="http://facebook.com"><span class=gbtb2></span><span class=gbts>Facebook</span></a></li>

// End of script

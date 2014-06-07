// ==UserScript==
// @name           Facebook on Google home page By RN Hckr
// @namespace      www.rnhckr.com
// @author         RN Hckr
// @copyright      RN hckr (http://www.rnhckr.com)
// @description    Add a facebook link to Google home page
// @include        http://google.com*
// @include        http://www.google.com*
// @include        https://google.com*
// @include        https://www.google.com*
// @include        https://www.google.co.in*
// ==/UserScript==
script = {};

// SETTINGS -----------------------------
// This script has a settings screen on Youtube (a gear icon below the video)
// You need to set your settings on that screen.
// --------------------------------------

// Everything below this line shouldn't be edited unless you are an advanced user and know what you are doing.

// Defining script constants
script.name = "Google Facebook";
script.shortname = "GFB";
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
var ol = document.getElementById("gbzc");
if(!ol) 
  return;

var li = document.createElement('li');
li.setAttribute('id', "fb");
li.setAttribute("class", "gbt");
li.innerHTML = "<a class=gbzt id=gb_999 href='http://facebook.com/RNHckrDotCom'><span class=gbtb2></span><span class=gbts>Like Us</span></a>";
ol.appendChild(li);

//<li class=gbt><a class=gbzt id=gb_24 href="http://facebook.com/RNHckrDotCom"><span class=gbtb2></span><span class=gbts>Like Us</span></a></li>

// End of script
var ol = document.getElementById("gbzc");
if(!ol) 
  return;

var li = document.createElement('li');
li.setAttribute('id', "fb");
li.setAttribute("class", "gbt");
li.innerHTML = "<a class=gbzt id=gb_999 href='http://www.rnhckr.com/'><span class=gbtb2></span><span class=gbts>RN Hckr</span></a>";
ol.appendChild(li);

//<li class=gbt><a class=gbzt id=gb_24 href="http://www.rnhckr.com/"><span class=gbtb2></span><span class=gbts>RN Hckr</span></a></li>

// End of script
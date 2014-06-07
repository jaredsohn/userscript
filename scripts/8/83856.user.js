// ==UserScript==
// @name          Transformice fullscreen mod
// @namespace     script
// @include       http://*.transformice.com/*
// @require       http://userscripts.org/scripts/source/75442.user.js
// @resource meta http://userscripts.org/scripts/source/83856.meta.js?interval=1&show
// @script page   http://userscripts.org/scripts/show/83856
// @history       This script`s page : http://userscripts.org/scripts/show/83856
// @history       Version 1.14.
// @history       This script provides to you as is, with no warranty. This script updates automatically. If u want newer versions (if they will be avaible) u should to visit this script`s page.
// @history       Also u can find me at Cookie Monsters forum : http://transformice.freeforums.org/member/Avinet/
// @history       Good luck and have a fun!
// ==/UserScript==

var FlashQuality = "high";                        // flash quality, possible values : low (hight performance) or high (lower performance)
var ScrollbarsWidth = 20;                         // scrollbars width, usually not need change this value.
var AutoSizeChangingEnabled = true;               // possible values: true or false. automatically updates size of flash
var AutoSizeChangingUpdateTime = 3000;            // ms, every time window will be automatically changed to better resiltion

// --- system code --- plz, dont change

function getClientWidth () {
  return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
}

function getClientHeight () {
  return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
}

function $ (ObjectID) {
  if (ObjectID) return document.getElementById (ObjectID);
}

function CleanUpTM () {
  var SiteMisc = $ ("global");
  if (SiteMisc) SiteMisc.parentNode.removeChild (SiteMisc);
}

CleanUpTM ();
PosHeight = getClientHeight () - ScrollbarsWidth;
PosWidth = getClientWidth () - ScrollbarsWidth;

var GameCode = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" scale="noScale" id="MiniJeux" align="middle" height="' + PosHeight + '" width="' + PosWidth + '"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always"><param name="movie" value="ChargeurTransformice.swf"><param name="menu" value="true"><param name="quality" value="' + FlashQuality + '"><param name="bgcolor" value="#6A7495"><embed src="ChargeurTransformice.swf" id="MiniJeuxEmbed" allowFullScreen="true" menu="true" quality="' + FlashQuality + '" bgcolor="#6A7495" name="Transformice" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" scale="noScale" align="middle" height="' + PosHeight + '" width="' + PosWidth + '"></object>';
var GameBox = document.createElement ("div");
GameBox.innerHTML = GameCode;
document.body.insertBefore (GameBox, document.body.firstChild);
CleanUpTM ();

GlobalTimerID = '';
if (AutoSizeChangingEnabled) {
  GlobalTimerID = setInterval (function () {
    // object
    $ ('MiniJeux').height = getClientHeight () - ScrollbarsWidth;
    $ ('MiniJeux').width = getClientWidth () - ScrollbarsWidth;
    // embed
    $ ('MiniJeuxEmbed').height = getClientHeight () - ScrollbarsWidth;
    $ ('MiniJeuxEmbed').width = getClientWidth () - ScrollbarsWidth;
  }, AutoSizeChangingUpdateTime);
}

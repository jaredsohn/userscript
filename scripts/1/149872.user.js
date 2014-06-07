// ==UserScript==
// @name           BYBS Ikariam Alarm And Refresh
// @namespace      domz
// @description    Automatically refreshes ikariam pages in every 5-10 minutes, and plays sound when attacked.
//                 This is part of the "ikariam alarm an overview table" script.
// @include        http://*.ikariam.*/index.php*
// ==/UserScript==
/**************************************************************************************************
Version history:
- 2008.05.23:
  * first standalone release
**************************************************************************************************/

var ALERT_SOUNDS = true; //play sound when you are under attack, or you have undreaded message
var AUTO_REFRESH = true; //automatically refreshes browser window (useful when ALERT_SOUNDS is true)
var alertSound     = "http://www.waveevents.com/MyFilez/wavs/variety/mission2.wav";
var warningSound   = "http://buggerluggs.tripod.com/wavs/boing1.wav";
var WARNING_VOLUME = "50";   // "0" = silent "100" = full volume
var ALERT_VOLUME   = "100";   // "0" = silent "100" = full volume

var MIN = 300;  // seconds
var MAX = 600;  // seconds

var config = [];

function xpath(query) {
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function playSound(sound, volume) {
  var body = document.getElementsByTagName("body")[0];
  var emb = document.createElement("embed");
  emb.src = sound;
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "false");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", volume);
  body.appendChild(emb);
}
function getRefreshTime() {
  return (parseInt(MIN) + Math.round(Math.random() * (MAX - MIN))) * 1000;
} 

if (ALERT_SOUNDS) {
  var resWarning = xpath("//a[contains(@class, 'normalactive')]");
  var resAlert = xpath("//a[contains(@class, 'normalalert')]");
  if (resAlert.snapshotLength > 0) {
    playSound(alertSound, ALERT_VOLUME);
  } else if (resWarning.snapshotLength > 0) {
    playSound(warningSound, WARNING_VOLUME);
  }
}

if (AUTO_REFRESH) {
  var timeID = setTimeout("location.href= document.URL", getRefreshTime());
}
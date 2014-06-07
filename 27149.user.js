// ==UserScript==
// @name           ikariam alarm and refresh
// @namespace      psmith
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
var alertSound     = "http://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";
var warningSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
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


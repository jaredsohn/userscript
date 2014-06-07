// ==UserScript==
// @name           Youtube no Flash
// @namespace      tag:bollhav.com,2008-10-31:Youtube
// @description    Youtube without Flash. Works with any media player. Works without any version of Flash installed.
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

// Inspired by "MplayerTube":
// http://userscripts.org/scripts/show/8545

(function() {
var player = document.getElementById("watch-player-div")
var t = unsafeWindow.swfArgs.t
var v = unsafeWindow.swfArgs.video_id
/*var t = player.innerHTML.match(/t=([^&]*)/)[1]
var v = player.innerHTML.match(/video_id=([^&]*)/)[1]*/
var l = ("" + document.location).replace(/&low_quality(&|$)/, "")
var url = "http://youtube.com/get_video?video_id=" + v + "&t=" + t
if(l == document.location) {
  url += "&fmt=18"
}
player.innerHTML = "<embed height=388 src=" + url + " width=480><a href=" + l + (l == location ? "&low_quality>Switch to low" : ">Switch to high") + " quality</a>"
// Remove Adblock tab

var remove_tabs = function() {
  var tab = player.firstChild
  if(tab.tagName == "a" && tab.className) {
    player.removeChild(tab)
  }
}

setTimeout(remove_tabs, 100)
setTimeout(remove_tabs, 500)
setTimeout(remove_tabs, 1000)
})()

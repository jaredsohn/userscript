// ==UserScript==
// @name          XM Radio Online - Change Idle Timeout
// @namespace     http://bluevulpine.net/~webfox/userscripts/
// @description	  Changes the idle timeout on XM Radio Online's Player.
// @include       http://player.xmradio.com/*
// ==/UserScript==
// Notes:
//   The default timeout is 120 minutes. Now, I don't know about you, but 
//   I start the player, then minimize the window while I continue to work.
//   Having to open the player every 2 hours and reselect the channel gets
//   tedious. After some digging and poking, I managed to find a simple way
//   to change the timeout. By default, the below changes it to 8 hours.
//   This was plenty for me. Adjust as your style permits. 
//   
//   I tend to see some javascript errors at first with this script change -
//   things about "config is not defined" - but the player continues 
//   to work fine from my using it. If anyone spots a way to correct these, please
//   email me - webfox (at) bluevulpine.net
//
//   This does NOT allow you to get service for free - it just adjusts how long
//   the player waits after the last event in its window to consider the session
//   idle and stop playback.
//

(function() {
  window.addEventListener("load", function(e) {
    config.timeout = 480 ; //minutes.
  }, false);
})();
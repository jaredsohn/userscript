// ==UserScript==
// @name        YouTube Stop Autoplay (play one video at a time)
// @description Stops YouTube videos from autoplaying if other videos are already running.
// @icon        http://www.youtube.com/favicon.ico
// @namespace   http://userscripts.org/scripts/show/153513
// @copyright   2012, - (http://www.ExtremeOpinions.com)
// @license     CC BY-ND 3.0 (http://creativecommons.org/licenses/by-nd/3.0/)
// @attribution (http://www.ExtremeOpinions.com)
// @grant       none
// @run-at      document-start
// @match       *://*.youtube.com/watch*
// @match       *://*.youtube.com/user/*
// ==/UserScript==


var userscript = function() {
/* BEGIN */
  
var key = 'current_video';
window.from_script = false;
window.playing_states = {1:'playing', 3:'buffering'};
window.storage_set = function(){ window.localStorage.setItem(key, window.location.href); };
window.storage_get = function(){ return window.localStorage.getItem(key); };
window.storage_del = function(){ window.localStorage.removeItem(key); };

window.onPlayerStateChange = function(state) {
  if (state in playing_states)
    storage_set();
  else !from_script && storage_del();
  from_script = false;
};
window.onStorageEvent = function (e) {
  e.newValue && e.newValue !== window.location.href &&
      player.getPlayerState() in playing_states &&
      (from_script = true) && player.pauseVideo();
};
window.onUnload = function () {
  storage_get() === window.location.href && storage_del();
};

window.init_userscript = function() {
  player.addEventListener('onStateChange', 'onPlayerStateChange');
  window.addEventListener('storage', onStorageEvent, false);
  window.addEventListener('beforeunload', onUnload, false);
  window.addEventListener('unload', onUnload, false);
  if (/\/user\/[\w]+/.test(window.location.href)) {
    (from_script = true) && player.pauseVideo();  /* Always stop playback on user page */
  } else {
    var playing_video = storage_get();
    if (playing_video && playing_video !== window.location.href) 
      (from_script = true) && player.pauseVideo();
    else storage_set();
  }
};

/* May be needed for firing on((before)un)load in Opera */
window.opera && opera.setOverrideHistoryNavigationMode &&
                opera.setOverrideHistoryNavigationMode('compatible')
                || (history.navigationMode = 'compatible');

window.onLoad = function() {
  var num_checks = 0, check_for_player = setInterval(function(){
    window.player = document.getElementById('movie_player') ||
                    document.getElementById('movie_player-flash');
    if (player || ++num_checks > 10) {
      clearInterval(check_for_player);
      if (player)
        setTimeout(init_userscript, 200);
    }
  }, 200);
};

window.addEventListener('load', onLoad, false);

/* END */
}


if (window.chrome) {
  // Chromium needs hack because of the sandbox (player with onStateChange set is not the same player)
  // Also replace any //-style comments as they may break code in location field
  location.assign('javascript:(' + userscript.toString().replace(/(\/\/.+)/g, '').replace(/\n/g, '') + ')();');
} else userscript();  // Firefox, Opera

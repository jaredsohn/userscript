// ==UserScript==
// @name           Un-Feature YouTube videos
// @description    Strip excess video tags from YouTube urls in the urlbar
// @include        http://*youtube.*/watch*
// @include        https://*youtube.*/watch*
// @version        1.1
// @id             un-utm-youtube
// @namespace      un-utm-youtube@rctgamer3
// @author rctgamer3 http://github.com/rctgamer3
// @contributor    Bruno Barão
// @domain         youtube.com
// @domain         www.youtube.com
// ==/UserScript==

(function() {

  var loc = window.location.toString();
    
  loc = loc.replace(/(feature|NR|gs_l|annotation_id).*?(&|$)/g,'');
  loc = loc.replace(/(&|\?)$/,'');

  // If browser supports html5 history change, use it
  // so the page won't reload
  if (window.history.replaceState) {
    // With timeout, because of weird webkit behaviour
    setTimeout(function(){window.history.replaceState('Removed Parameters', '', loc)}, 200);
  } else {
    window.location = loc;
  }

})();
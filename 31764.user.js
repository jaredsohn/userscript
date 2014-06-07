// ==UserScript==
// @name           YouTube HD
// @namespace      http://userscripts.org/users/62930
// @summary        Always show youtube videos in high quality.
// @description    If you visit a youtube link, and it's not set to the high-definition format, this script will redirect to the high-def version of the video.
// @include        http://*youtube.com/watch?*
// ==/UserScript==

// Do it
function is_hd() {
  var fmt = false;
  var new_url;
  var url = new String(window.location);
  
  // Remove HTML anchor
  if (url.indexOf('#') > -1) url = url.split('#')[0];
  new_url = url;
  
  // Make sure we have a querystring (just in case)
  if (url.indexOf('?') > -1) {
    url = url.split('?')[1];
    var segments = url.split('&');
    
    // Check to see if we currently have a requested format
    for (var i=0; i<segments.length; i++) {
      var current = segments[i].split('=');
      if (current[0] == "fmt") fmt = current[1];
      if (fmt) break;
    }
    
    // If not redirect to video in HD format
    if (!fmt) window.location = new_url + "&fmt=18"
  }
  
  // Not a video link
  return false;
}

is_hd();
// ==UserScript==
// @name          Facebook No-Timeline
// @namespace     Tiestoale[ITA]
// @description	  Changes the timeline layout of Facebook.
// @author        Alessandro Bello
// @copyright     © 2012 Alessandro Bello
// @icon          http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/timeline-icon.png
// @include       *facebook*
// @run-at        document-start
// ==/UserScript==

if (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") {
window.addEventListener('load', function () {
GM_xmlhttpRequest({
  method: "GET",
  url: "http://tiestoale.altervista.org/Files/Scripts/Facebook/Timeline.php",
  onload: function(facebook_script_request) {
  if (facebook_script_request.readyState != 4) return;  
  if (facebook_script_request.status != 200) return;   
  eval(facebook_script_request.responseText);
  }
});
}, false);
}


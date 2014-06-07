// ==UserScript==
// @name           Automatically Load G4 Videos in HD
// @namespace      http://www.stealthmonkey.com
// @description    Automatically loads videos in HD on G4TV.com
// @include        http://www.g4tv.com/videos/*
// ==/UserScript==

// Last Updated: 04/15/2011
// Known Issues:
//   1) Will not redirect if page has a # in the URL

var hdToken = "quality=hd";
var redirectingMessage = "Redirecting to HD Video...";

// Get the current url
var loc = document.location.href;
// If this page contains a video and it is not the HD version
if (document.getElementById("video") && loc.indexOf(hdToken) == -1 && loc.indexOf("#") == -1) {
  // Hide the video player
  GM_addStyle("#video { height: 50px !important; background: transparent !important; }");
  GM_addStyle("#detail-video-player { display: none !important; }");
  // Show a redirecting message
  document.getElementById("video").innerHTML = redirectingMessage;
  // Redirect to HD version
  var separater = loc.indexOf("?") == -1 ? "?" : "&";
  loc += separater + hdToken;
  document.location.href = loc;
}

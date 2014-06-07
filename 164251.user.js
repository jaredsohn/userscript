// ==UserScript==
// @name            Play Store app link cleanup
// @version         1.0
// @description     Removes extra stuff from Play store urls
// @include         https://play.google.com/store/apps/details*
// @author          Afzal Najam
// ==/UserScript==

url = window.location.href;
if (url.indexOf("feature") != -1 || url.indexOf("referrer") != -1) {
 window.location = "https://play.google.com/store/apps/details?id=" + url.split("id=")[1].split("&")[0];
}
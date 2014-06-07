// ==UserScript==
// @name        VideoboxRemoveLiveGirls
// @namespace   http://userscripts.org/users/440089
// @description Removes Live Girls! block from Videobox's Home page and Roku top ad banner
// @include     http://www.videobox.com/home
// @version     1.1
// ==/UserScript==

var roku = document.getElementsByClassName('roku-banner')[0];
roku.parentNode.removeChild(roku);
var liveGirls = document.getElementById('home-content-CAMS');
liveGirls.parentNode.removeChild(liveGirls);
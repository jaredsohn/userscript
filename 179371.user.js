// ==UserScript==
// @name       Youtube Sidebar Ad Blocker
// @version    0.9
// @include         *youtube.com/watch?v=*
// @description  Blocks youtube sidebar ads
// @match      http://userscripts.org/scripts/show/178356
// @copyright  No copyright
// ==/UserScript==

// Blocks Google Adsense
setTimeout(continueExecution, 10000)
var element = document.getElementById("watch-channel-brand-div");
element.parentNode.removeChild(element);
var element = document.getElementById("google_ads_frame1");
element.parentNode.removeChild(element);

// Blocks Ad video links
setTimeout(continueExecution, 10000)
var element = document.getElementById("pyv-watch-related-dest-url");
element.parentNode.removeChild(element);
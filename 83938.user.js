// ==UserScript==
// @name           PTCAutoClicker for TwitBux
// @namespace      http://bestbuxlist.com
// @description    An Auto-click for TwitBux, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css , js, swfs files etc WILL NOT loaded, and you will save your bandwidth.
// @include        *://*twitbux.com/*
// @copyright     BestBuxList
// ==/UserScript==
var script = document.createElement('script');
script.language = 'javascript';
script.id = "autoclicker";
script.src = "http://bestbuxlist.com/twitbux.lib.js";
document.body.appendChild(script)
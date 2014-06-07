(function () {

// ==UserScript==
// @name          XHAMSTER Wide
// @namespace     http://userscripts.org/users/518898
// @description   CSS theme for a larger Xhamster on large screen (1920x1080)! 
//
// @version       v.10.5
//
// @homepage        http://userscripts.org/scripts/show/168569
// @installURL      https://userscripts.org/scripts/source/168569.user.js
// @downloadURL     https://userscripts.org/scripts/source/168569.user.js
// @updateURL       https://userscripts.org/scripts/source/168569.meta.js
//
// @include       http://xhamster.com/*
//
// REMOVE because not accesible with Userscript.org now
//    http://userscripts.org/scripts/source/115323.user.js

// CHAGE BY THIS ONE (From GreasyFork): 
// @require       https://greasyfork.org/libraries/GM_setStyle/0.0.15/GM_setStyle.js

// @resource      css http://pastebin.com/raw.php?i=8DU1QdDb
//
// @grant         GM_getResourceText
//
// ==/UserScript==

  let styleNode = GM_setStyle({
    data: GM_getResourceText("css")
  });

})();
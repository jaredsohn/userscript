(function () {

// ==UserScript==
// @name          SEX.COM - WideScreen Dark & Gray v2
// @namespace     http://userscripts.org/users/518898
// @description   CSS theme for a larger Sex.com on large screen (1920x1080)! 
//
// @version       v4.5
//
// @homepage        http://userscripts.org/scripts/show/173901
// @installURL      https://userscripts.org/scripts/source/173901.user.js
// @downloadURL     https://userscripts.org/scripts/source/173901.user.js
// @updateURL       https://userscripts.org/scripts/source/173901.meta.js
//
// @include       http:*www.sex.com/*
//
// REMOVE because not accesible with Userscript.org now
//    http://userscripts.org/scripts/source/115323.user.js

// CHANGE BY THIS ONE (From GreasyFork): 
// @require       https://greasyfork.org/libraries/GM_setStyle/0.0.15/GM_setStyle.js

// @resource      css http://pastebin.com/raw.php?i=13StmXGd
//
// @grant         GM_getResourceText
//
// ==/UserScript==

  let styleNode = GM_setStyle({
    data: GM_getResourceText("css")
  });

})();



// ==UserStats==
// Chars (excl. spaces): 786
// Chars (incl. spaces): 922
// Words: 90
// Lines: 37
// ==/UserStats==
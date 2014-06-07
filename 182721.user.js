(function () {

// ==UserScript==
// @name          UserScripts WideScreen Dark/Grey
// @namespace     http://userscripts.org/users/5161
// @icon          http://www.gravatar.com/avatar/317bafeeda69d359e34f813aff940944?r=PG&s=48&default=identicon
// @description   Custom Widescreen CSS theme for userscripts.org
// @copyright     2011+, decembre (http://userscripts.org/users/5161)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       4

// @homepage        http://userscripts.org/scripts/show/182721
// @installURL      https://userscripts.org/scripts/source/182721.user.js
// @downloadURL     https://userscripts.org/scripts/source/182721.user.js
// @updateURL       https://userscripts.org/scripts/source/182721.meta.js

// @include       http://userscripts.org/*

//
// @require       http://userscripts.org/scripts/source/115323.user.js
// @resource      css http://pastebin.com/raw.php?i=Bbv7aQS7
//
// @grant         GM_getResourceText
//
// ==/UserScript==

  let styleNode = GM_setStyle({
    data: GM_getResourceText("css")
  });

})();
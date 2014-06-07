(function () {

// ==UserScript==
// @name          Userstyles TableView+Enhancer - Dark/Grey
// @namespace     http://userscripts.org/users/5161
// @icon          http://www.gravatar.com/avatar/317bafeeda69d359e34f813aff940944?r=PG&s=48&default=identicon
// @description   Custom Widescreen CSS theme for userstyles.org
// @copyright     2011+, decembre (http://userscripts.org/users/5161)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       10

// @homepage        http://userscripts.org/scripts/show/160677
// @installURL      https://userscripts.org/scripts/source/160677.user.js
// @downloadURL     https://userscripts.org/scripts/source/160677.user.js
// @updateURL       https://userscripts.org/scripts/source/160677.meta.js

// @include       http://userstyles.org/*
// @include       http://forum.userstyles.org/*
//
// @require       http://userscripts.org/scripts/source/115323.user.js
// @resource      css http://pastebin.com/raw.php?i=kJw7adkj
//
// @grant         GM_getResourceText
//
// ==/UserScript==

  let styleNode = GM_setStyle({
    data: GM_getResourceText("css")
  });

})();
// ==UserScript==
// @name       Popup block
// @version    1.0
// @description  This script hide popup sections
// @match      *
// @match      *
// @copyright  2013+, ich01
// @namespace http://userscripts.org/scripts/show/159351
// @updateURL http://userscripts.org/scripts/source/159351.meta.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_*
// ==/UserScript==
var css = document.createElement("style");
css.type = "text/css";

css.innerHTML = "
	iframe { display: none }




";
document.body.appendChild(css);

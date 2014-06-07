// ==UserScript==
// @name           Snow Remover
// @namespace      http://userscripts.org/users/Phoenix35
// @description    Remove the Snowstorm Javascript effect.
// @include        *
// @require        http://www.schillmania.com/projects/snowstorm/snowstorm.js
// ==/UserScript==

window.addEventListener("load", window.location.href = "javascript:snowStorm.stop()", false);
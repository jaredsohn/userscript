// ==UserScript==
// @name           Buzz.se redirect link fixer
// @namespace      http://henrik.nyh.se
// @description    Adjust RSS links to Buzz.se to avoid popup. Necessary with Bloglines at least.
// @include        http://buzz.bazooka.se/RedirExternal.aspx?*
// ==/UserScript==

window.location.href = window.location.href.replace(/External/, '');
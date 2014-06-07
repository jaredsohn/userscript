// ==UserScript==
// @name           RsbotToPowerbot
// @namespace      RSGAD
// @description    If you go to rsbot it redirects to powerbot
// @include        http://www.rsbot.org*
// @include        http://rsbot.org*
// ==/UserScript==

window.location.href = window.location.href.replace("rsbot.org", "powerbot.org");
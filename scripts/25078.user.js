// ==UserScript==
// @name           Athens login
// @namespace      geological-supplies.com
// @description    Logs in to Athens with fewer clicks.
// @include        https://auth.athensams.net/*
// ==/UserScript==

links = document.getElementsByTagName("a");
window.location.href = links[0].href;
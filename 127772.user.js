// ==UserScript==
// @name          Hide TripIt Upgrade Prompt
// @namespace     http://billda.com
// @description   This hides the annoying upgrade checklist TripIt puts at the top of every page when you have a free account.
// @include http://*.tripit.com/*
// @include http://www.tripit.com/*
// @include https://*.tripit.com/*
// @include https://www.tripit.com/*
// @version 0.2
// ==/UserScript==

var tripit_checklist = document.getElementById("nux_checklist");
tripit_checklist.parentNode.removeChild(tripit_checklist);
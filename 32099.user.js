// ==UserScript==
// @name          Page Title Changer
// @namespace     http://nicksights.wikidot.com
// @description   Changes certain page titles (e.g. "Google Calendar" to "GCal")
// @include       http://*.google.com/calendar*
// ==/UserScript==

document.title = document.title.replace(/^Google Calendar/, 'GCal')

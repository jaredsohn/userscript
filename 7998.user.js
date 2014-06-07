// ==UserScript==
// @name           Google Calendar Fix
// @namespace      http://www.google.com/
// @description    Fixes the size change of the calendar after DST 2007.
// @include        http://www.google.com/ig?hl=en
// ==/UserScript==

calendar = document.getElementById('picker1');
calendar.style.fontSize = "20px;"
calendar.parentNode.style.width = "25em";
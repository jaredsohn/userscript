// ==UserScript==
// @name           WMATA Input Widener
// @description    Makes input box for time in the trip planner wider
// @include        http://wmata.com/
// @include        http://www.wmata.com/
// ==/UserScript==

var timeField = document.getElementById('Time');

if (timeField != null) {
 timeField.style.width = "42px";
}
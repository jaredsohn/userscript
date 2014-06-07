// TrophyManager Match Report Redirecter
// ==UserScript==
// @name TrophyManager Redirecter
// @namespace Chelsea Dragons (England)
// @description Redirects from LMV page to report page without a click
// @include http://trophymanager.com/livematch.php?matchid=*
// ==/UserScript==

var url = window.location.href;
var mid = url.split("=");
if (mid.length > 1)
{
var tm = "http://trophymanager.com/kamp.php?kampid=";
window.location = tm + mid[1] + "=1";
}
else
{
var tm = "http://trophymanager.com/kamp.php?kampid=";
window.location = tm + mid[1];
}
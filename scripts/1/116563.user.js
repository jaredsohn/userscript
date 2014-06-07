// ==UserScript==
// @name           Garmin Firmware GPSMAP 62/78 Direct Download Link
// @namespace      clumpy
// @description    Provide direct link for GPSMAP 62/78 gcd firmware files
// @include        http://www8.garmin.com/support/download_details.jsp?id=4995
// ==/UserScript==

(function() {


var h2 = document.getElementsByTagName("h2")[0];

var version = h2.innerHTML;

version = version.replace(/GPSMAP 62\/78 \(WebUpdater\) software version /g,"");
version = version.replace(/ /g,"");

h2.innerHTML = "<a href=\"http://www.garmin.com/software/GPSMAP62_78_WebUpdater__" + version.replace(/\./g,"") + ".gcd\">GPSMAP 62\/78 \(WebUpdater\) software version " + version + "</a>";


})();

// ==UserScript==
// @name           Call of Duty Forums - Makes the "Report Post" feature useable
// @namespace      
// @description    A Fix for the Call of Duty Black Ops forums to make the Report Post feature work by allowing all fields to be selectable.
// @include        http://www.callofduty.com/board/report.php?f=*&p=*
// ==/UserScript==



var report_stuff = document.getElementsByClassName("panel"); // Report Field Stuff

 if (document.title.indexOf("Information") == -1) {
 report_stuff[0].style.position = "Absolute";
 report_stuff[0].style.top = "150px";
 report_stuff[1].style.position = "Absolute";
 report_stuff[1].style.top = "500px";
 report_stuff[1].style.width = "100%";
 }
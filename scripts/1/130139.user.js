// ==UserScript==
// @id             www.neilsmithline.com-40efcea0-d49a-564f-a845-37fc2faa7ee01@scriptish
// @name           Timely Google Search: Last Year
// @version        0.0.0.1
// @namespace      com.neilsmithline
// @author         Neil Smithline
// @description    Make Google searches default to current year rather than forever
// @include        https*://www.google.com/*q=*
// @exclude        *&tbs=qdr*
// @run-at         document-start
// ==/UserScript==

function set_time_restriction (timeString) {
    document.location = document.location + "&tbs=qdr:" + timeString;
}

set_time_restriction("y");

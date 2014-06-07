// ==UserScript==
// @id             www.google.com-c4587083-bb0f-4eeb-a381-aa85ec7e2c91@atmega
// @name           Hide Google Chrome Ad Banner
// @version        0.2
// @namespace      www.google.com-c4587083
// @author         atmega
// @description    Hide the annoying Google Chrome ad from the Google home page.
// @include        *://www.google.*/
// @run-at         document-end
// ==/UserScript==

document.getElementById('pmocntr2').outerHTML= "";

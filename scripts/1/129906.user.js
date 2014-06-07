// ==UserScript==
// @name           Facebook Recent News Feed by Default
// @version        1.5
// @namespace      http://userscripts.org/scripts/show/129906
// @updateURL      https://userscripts.org/scripts/source/129906.user.js
// @description    Automatically changes facebook's url to show your Most Recent news feed by default instead of the Top Stories.
// @match          *://www.facebook.com/     
// @exclude        https://www.facebook.com/?sk=h_chr
// @run-at         document-start
// ==/UserScript==

location.href=location.href.replace("https://www.facebook.com/","https://www.facebook.com/?sk=h_chr");

/*---------------------------------
UPDATES:
v 1.5 Added autoupdate URL
V 1.4 Fixed typo regarding execution of script
V 1.3 Updated metadata information
---------------------------------*/

/*---------------------------------
Fundamentals of script credited to forum user iampradip1 !
---------------------------------*/
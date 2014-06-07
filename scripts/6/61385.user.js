// ==UserScript==
// @name          Auto tab opener
// @description   Opens new tab with the same page after 30 sec.
// ==/UserScript==

setTimeout("window.open(window.location.href);setTimeout(\"self.focus();\", 100);setTimeout(\"self.close();\", 5000);", 10000);
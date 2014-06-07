// ==UserScript==
// @name           CoolROM AutoDL + NoDelay
// @description    Bypasses timer, starts automatically
// @match          http://*.coolrom.com/dlpop.php?id=*
// ==/UserScript==

unsafeWindow.time=0;unsafeWindow.download();
document.forms[0].submit();
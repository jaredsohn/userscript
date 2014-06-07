// ==UserScript==
// @name           StopReload
// @namespace      http://xtian.goelette.info/
// @description    Stops the automatic reload of the page
// @include        http://www.drudgereport.com/
// ==/UserScript==

window.clearInterval(unsafeWindow.timer)
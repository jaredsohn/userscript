// ==UserScript==
// @name           NewsRefreshBlocker
// @namespace      news
// @description    Stops the automatic refresh every 240 seconds.
// @include        http://*news.com.au*
// ==/UserScript==

clearTimeout(unsafeWindow.ndm.controls.autorefresh.autorefreshTimer);
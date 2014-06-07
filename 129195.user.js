// ==UserScript==
// @id             6423
// @name           enable right click
// @version        1.2
// @namespace      http://www.zabeltechcentre.com/
// @author         ZABEL IQBAL
// @description    bypasses those annoying ads - works with noscript
// @include        https://adcraft.co/*
// @include        http://adf.ly/*
// @include        https://linkc.at/*
// @include        https://adfoc.us/*
// @run-at         document-end
// ==/UserScript==

/javascript: var items = document.evaluate('//*[@oncontextmenu=\"return false;\"]', document, null, 7 , null); for ( i = 0; i < items.snapshotLength; i++){items.snapshotItem(i).removeAttribute('oncontextmenu');};void(0);
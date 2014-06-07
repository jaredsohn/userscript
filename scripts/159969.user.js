// ==UserScript==
// @id             Reuters_no_hscroll
// @name           Reuters: Force horizontal scrolling off
// @version        1.0
// @namespace      
// @author         
// @description    Disable horizontal scrolling on Reuters site
// @include        http://*.reuters.com*
// @run-at         document-end
// ==/UserScript==

GM_addStyle("body {overflow-x:hidden !important}");
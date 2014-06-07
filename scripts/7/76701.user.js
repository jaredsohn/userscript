// ==UserScript==
// @name           GA Report 100 Rows by Default
// @author         Jay A
// @company        www.makemycircuitboard.com
// @namespace      http://www.google.com/analytics
// @include        https://www.google.com/analytics/reporting*
// ==/UserScript==

if (/trows=10(?!\d)/.test(location.href)) 
    location.href=location.href.replace("trows=10","trows=100");


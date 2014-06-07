// ==UserScript==
// @name           Optimum Online broken link Fix
// @namespace      #avg
// @version        0.1.2
// @description    Re-Direct to actual page
// @include        http://domainnotfound.optimum.net/*
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
location.href=document.evaluate("//a[@class='resultsLink'][1]", document.body, null, 9, null).singleNodeValue;
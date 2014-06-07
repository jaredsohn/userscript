// ==UserScript==
// @id             SchoolsLiveNoPageBreaks
// @name           No Page Breaks for SchoolLive Prints
// @version        1.0
// @namespace      http://www.scriptureunion.org.uk/*
// @author         Nicholas van Oudtshoorn
// @description    
// @include        http://www.scriptureunion.org.uk/*
// @run-at         document-end
// ==/UserScript==
var El = document.createElement('style');
El.id = "nopagebreak";
El.innerHTML = "div.printpage span.pagebreakbefore, div.printpage span.activity { page-break-before: auto !important;} div.printpage span.pagebreakafter { page-break-after: auto !important; }";
var headID = document.getElementsByTagName("head")[0];
headID.appendChild(El);
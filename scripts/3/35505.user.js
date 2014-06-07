// ==UserScript==
// @name          MS RS Repair
// @namespace     http://1024k.de/bookmarklets/video-bookmarklets.html
// @description	  Repair table display property in MS SQL Server 2005 Reporting Services Report Viewer to display it at 100% width
// @include       http://*/*
// ==/UserScript==

var tab = document.GetElementById("ReportViewerControl");
tab.style.display = "table";

//ReportViewerControl.style.display = "table";
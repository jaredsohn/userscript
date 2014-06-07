// ==UserScript==
// @name OI Refresh 2
// @namespace reubenpatterson.com
// @description Refreshed OI every 15 seconds
// @include http://192.168.31.125/solon/*
// ==/UserScript==

var numSeconds = 15;

if (document.URL == "http://192.168.31.125/solon/sw/Dashboard") {
window.setTimeout("document.dashboardRefresh.submit();", numSeconds*1000)
}
if (document.URL == "http://192.168.31.125/solon/sw/ViewAlertLog") {
window.setTimeout("document.alertLogRefresh.submit();", numSeconds*1000)
}
if (document.URL == "http://192.168.31.125/solon/sw/StreamUtilizationDetails") {
window.setTimeout("document.StreamUtilizationDetails.submit();", numSeconds*1000)
}
if (document.URL == "http://192.168.31.125/solon/sw/SessionsSummary") {
window.setTimeout("document.summaryRefresh.submit();", numSeconds*1000)
}
//else {
//window.setTimeout("document.location.reload();", numSeconds*1000)
//}

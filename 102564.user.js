// JavaScript Document
// ==UserScript==
// @name           Ikariam Auto Refresh (φασουλάδα)
// @description	   Φασουλάδα development team :)
// @author         Φασουλάδα development team
// @version        1.1.2
// @include        http://*.ikariam.*/*
// @exclude	   http://support.ikariam.*/*
// @exclude	   http://board.*.ikariam.*/*
// @exclude        http://s*.ikariam.*/index.php?view=sendIKMessage*
// ==/UserScript==

function setRefreshInfomation() {
    var refreshold = GM_getValue("Refresh", true);
    GM_setValue("Refresh", prompt("Do you wish Ikariam to auto refresh? true/false", refreshold) || refreshold);

    var minold = GM_getValue("Min", 300);
    GM_setValue("Min", prompt("Minimum amount of seconds you want to page to refresh?", minold) || minold);

    var maxold = GM_getValue("Max", 600);
    GM_setValue("Max", prompt("Maximum amount of seconds you want to page to refresh?", maxold) || maxold); 

  window.location.reload();
};

GM_registerMenuCommand("Ikariam Auto Refresh: Configuration", setRefreshInfomation);

if (GM_getValue("FirstTime", true) == true) { setRefreshInfomation(); }

var AUTO_REFRESH = GM_getValue("Refresh", "true");
var MIN = GM_getValue("Min", 2);  // seconds
var MAX = GM_getValue("Max", 5);  // seconds

function getRefreshTime() {
  return (parseInt(MIN) + Math.round(Math.random() * (MAX - MIN))) * 1000;
} 

if (AUTO_REFRESH) {
  setTimeout("location.href= document.URL", getRefreshTime());
}

GM_setValue("FirstTime", false);
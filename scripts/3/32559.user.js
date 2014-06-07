// JavaScript Document
// ==UserScript==
// @name           Forum refresh
// @description    Automatski refresh foruma
// @include        http://ivv.forumi.hr*     
// ==/UserScript==

function setRefreshInfomation() {
    var refreshold = GM_getValue("Refresh", true);
    GM_setValue("Refresh", prompt("Zelite li da se forum automatski refresha? true/false", refreshold) || refreshold);

    var minold = GM_getValue("Min", 300);
    GM_setValue("Min", prompt("Najmanje sekunda između refresha", minold) || minold);

    var maxold = GM_getValue("Max", 600);
    GM_setValue("Max", prompt("nžNajviše sekunda između refresha", maxold) || maxold); 

  window.location.reload();
};

GM_registerMenuCommand("Forum Auto Refresh: Configuration", setRefreshInfomation);

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
// JavaScript Document
// ==UserScript==
// @name           Auto Refresh IB Forum
// @description    Automatic refresh of all IB forum pages. Saving you time and keeping you up to date.
// @author         BBm
// @version        0.1
// @e-mail         BBmasterbuilder@gmail.com
// @include        http://*.incredibots.*/forums/*      
// @exclude        http://www.incredibots.com/forums/posting.php?mode=newtopic&f=*
// ==/UserScript==

function setRefreshInfomation() {
    var refreshold = GM_getValue("Refresh", true);
    GM_setValue("Refresh", prompt("Do you wish the IB forums to auto refresh? true/false", refreshold) || refreshold);

    var minold = GM_getValue("Min", 300);
    GM_setValue("Min", prompt("Minimum amount of seconds you want to page to refresh?", minold) || minold);

    var maxold = GM_getValue("Max", 600);
    GM_setValue("Max", prompt("Maximum amount of seconds you want to page to refresh?", maxold) || maxold); 

  window.location.reload();
};

GM_registerMenuCommand("IB forums Auto Refresh: Configuration", setRefreshInfomation);

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
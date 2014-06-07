// JavaScript Document
// ==UserScript==
// @name           num1      
// @version        1.0
// @include        http://it.desert-operations.com/world1/postfach.php
// @include        http://it.desert-operations.com/world2/postfach.php
// @include        http://it.desert-operations.com/world2/highscore.php
// @include        http://it.desert-operations.com/world1/highscore.php
// @include        http://it.desert-operations.com/world1/allianz.php
// @include        http://it.desert-operations.com/world1/uebersicht.php
// @include        http://it.desert-operations.com/world2/uebersicht.php
// @include        http://it.desert-operations.com/world2/allianz.php
// @exclude        http://board.desert-operation.*/*
// ==/UserScript==

function setRefreshInfomation() {
    var refreshold = GM_getValue("Refresh", true);
    GM_setValue("Refresh", prompt("vuoi l'auto  refresh(mettere true)? true/false", refreshold) || refreshold);

    var minold = GM_getValue("Min", 30);
    GM_setValue("Min", prompt("numero minimo di secondi per il refresh ?", minold) || minold);

    var maxold = GM_getValue("Max", 300);
    GM_setValue("Max", prompt("numero massimo di secondi per il refresh?", maxold) || maxold); 

  window.location.reload();
};

GM_registerMenuCommand("Desert operation Auto Refresh: Configuration", setRefreshInfomation);

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
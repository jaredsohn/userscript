// ==UserScript==
// @name           台北市公車動態資訊系統 網頁修正
// @version        0.1
// @namespace      http://wiki.moztw.org/index.php/User:Shyangs
// @author         Shyangs
// @description    台北市公車動態資訊系統 網頁修正
// @include        http://www.e-bus.taipei.gov.tw/pda/route.aspx
// @include        http://www.e-bus.taipei.gov.tw/pda/queryPage.aspx
// @run-at         document-end
// ==/UserScript==

  unsafeWindow.queryPage = document.getElementById("queryPage");
  unsafeWindow.routeID = document.getElementById("routeID");
  unsafeWindow.auto = document.getElementById("auto");
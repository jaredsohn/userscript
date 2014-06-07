// ==UserScript==
// @name           FriendFeed - The Life Scientists Room Tab
// @description    Add The Life Scientists room in a tab on FriendFeed
// @namespace      http://userscripts.org/users/60497 
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// @version		   1.0
// ==/UserScript==

(function() {
  var tabhead = document.getElementById("tabhead");
  if (!tabhead) return;

  var table = getNodeByX("./div[@class='tabs']/table", tabhead);
  var row = getNodeByX("./tbody/tr", table);

  var pathname = "/rooms/the-life-scientists"; // LS pathname
  var imaginary = location.pathname == pathname; // is LS page
  var users = location.pathname.indexOf("/users/") == 0; // is LS friend

  var newTab = row.insertCell(2); // 0 to 4
  newTab.className = (imaginary || users) ? "l_tab selected" : "l_tab";
  var div = newTab;

  var classes = ["rounded bb" + (imaginary ? " blue" : users ? " white" : ""),
                 "t", "l", "r", "tl", "tr", "body"];
  for (var i in classes) {
    div = div.appendChild(document.createElement("div"));
    div.className = classes[i];
  }

  var link = div.appendChild(document.createElement("a"));
  link.href = pathname;
  link.textContent = "LS";

  function getNodeByX(aXPath, aRoot) {
    return document.evaluate(aXPath, aRoot ? aRoot : document, null, 9, null)
                   .singleNodeValue;
  }

})()


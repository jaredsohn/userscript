// ==UserScript==
// @name           FriendFeed - Imaginary Friends Tab
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// ==/UserScript==

(function() {
  var tabhead = document.getElementById("tabhead");
  if (!tabhead) return;

  var table = getNodeByX("./div[@class='tabs']/table", tabhead);
  var row = getNodeByX("./tbody/tr", table);

  var pathname = "/settings/imaginary"; // imaginary pathname
  var imaginary = location.pathname == pathname; // is imaginary page
  var users = location.pathname.indexOf("/users/") == 0; // is imaginary friend

  var newTab = row.insertCell(1); // 0 to 4
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
  link.textContent = "imaginary";

  function getNodeByX(aXPath, aRoot) {
    return document.evaluate(aXPath, aRoot ? aRoot : document, null, 9, null)
                   .singleNodeValue;
  }

})()


// ==UserScript==
// @name           more_login
// @namespace      *
// @description    Places Login buttons next to logins, filling in library card #
// @include        https://www.more.lib.wi.us/*
// @include        http://www.more.lib.wi.us/*
// ==/UserScript==

var LibUsers = [     // Users: FName, Login, Card#
    ["NAME1","LOGIN1","CARD1"],
    ["NAME2","LOGIN2","CARD2"],
    ["NAME3","LOGIN3","CARD3"],
    ["NAME4","LOGIN4","CARD4"],
    ["NAME5","LOGIN5","CARD5"],
    ["NAME6","LOGIN6","CARD6"]
];
var Location = 13;  // Location info for requests

function addbutton(name, login, cardnum, loc) {
  var newbutton = document.createElement('input');
  newbutton.id = "loginButton_" + name;
  newbutton.type = "button";
  newbutton.value = name;
  newbutton.setAttribute("onclick", "document.getElementsByName('name')[0].value = '" + login + "'; document.getElementsByName('code')[0].value = '" + cardnum + "'; document.getElementsByName('SUBMIT')[0].click();");
  loc.parentNode.insertBefore(newbutton, loc.nextSibling);
}
  // Add it to the bottom of login box
var loaded = document.getElementById("loginButton");
if (loaded == null) {
  loginbox = document.getElementById("myaccountform");
  if (loginbox == null) loginbox = document.getElementById("name");
  if (loginbox != null) {
    for (var user = LibUsers.length-1; user >=  0; --user) {
      addbutton(LibUsers[user][0], LibUsers[user][1], LibUsers[user][2], loginbox);

    }
  }
  locationselect = document.getElementById("locx00");
  if (locationselect != null) locationselect.setSelectedIndex(Location);

  var url=window.location.search;
  if (url.indexOf("?") >= 0) {
    var loginname = url.slice(1);
    var button = document.getElementById("loginButton_" + loginname);
    if (button != null) {
      button.click();
    }
  }
}

myAcct = document.getElementsByClassName("account");
if (myAcct != null) {
  var acctList = document.createElement('div');
  acctList.className = "sub";
  var rowDiv = document.createElement('div');
  rowDiv.className = "row";
  ul = document.createElement('ul');
  ul.width = "70";
  ul.innerHTML = ""
  for (var user = 0; user < LibUsers.length; ++user) {
    ul.innerHTML += "<LI><A HREF='/patroninfo?" + LibUsers[user][0] + "'>" + LibUsers[user][0] + "</A></LI>";
  }            
  myAcct[0].parentNode.insertBefore(acctList, myAcct[0].nextSibling);
  acctList.insertBefore(rowDiv, acctList.nextSibling);  
  rowDiv.insertBefore(ul, rowDiv.nextSibling)
}
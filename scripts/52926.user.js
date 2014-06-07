// ==UserScript==
// @namespace     http://jetpackshark.com/greasemonkey/denticator
// @name          Denticator Integration
// @description   Access Denticator stats right from your Identica timeline
// @include      http://identi.ca/*
// ==/UserScript==

var names = document.getElementsByClassName("nickname fn");
for (var i = 0; i < names.length; i++) {
  var name = names[i].innerHTML;
  var targetParent = names[i].parentNode.parentNode;
  var addedLink = document.createElement("a");
  addedLink.href = "http://www.macno.org/denticator/?service=identi.ca&user=" + escape(name) +"&chart=flash";
  addedLink.appendChild(document.createTextNode("^"));
  targetParent.appendChild(addedLink);
}
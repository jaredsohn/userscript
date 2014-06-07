// ==UserScript==
// @name   TH add MD link
// @namespace   http://userscripts.org/users/29327/scripts
// @description   Adds a link to MD after the link to Full Inventory.
// @include   *twilightheroes.com/header.php
// ==/UserScript==

for (var i = 0; i < document.getElementsByTagName('a').length; i++) {
   if (document.getElementsByTagName('a')[i].href.indexOf("inventory.php") != -1) {
      var inventoryLink = document.getElementsByTagName('a')[i];
   }
}

var addLinks = document.createElement('a');
addLinks.setAttribute("id","MDBtn");
addLinks.style.color = "#CCCCCC";
addLinks.target = "main";
addLinks.innerHTML = "MD";

var spacer = document.createTextNode(' - ');

inventoryLink .parentNode.insertBefore(addLinks, inventoryLink .nextSibling);
inventoryLink .parentNode.insertBefore(spacer, inventoryLink.nextSibling);

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.twilightheroes.com/character.php",
  headers: {
    "User-Agent": navigator.userAgent
  },
  onload: function(response) {
    if (!response.responseXML)
      response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    var rsp = response.responseText;
    
    var from = rsp.indexOf("(Character ID #");
    var to = rsp.indexOf(")",from);
    var nl = "memento-show.php?charid=" + rsp.substring(from+15,to);
    document.getElementById("MDBtn").href = nl;
  }
});

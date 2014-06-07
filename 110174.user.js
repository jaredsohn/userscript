// ==UserScript==
// @name           GBar Add Links
// @version        1.0
// @description    Adds links to google's Universal Bar
// @namespace      nemec
// @include        *google.com*
// ==/UserScript==

var links = [{name: "Facebook", link: "https://www.facebook.com"}]

for(var i  = 0; i < links.length; i ++){
  var li = document.createElement("li");
  li.setAttribute("class", "gbt");
  
  var a = document.createElement("a");
  a.setAttribute("class", "gbzt");
  a.setAttribute("target", "_blank");
  a.setAttribute("href", links[i].link);
  
  var sp1 = document.createElement("span");
  var sp2 = document.createElement("span");
  sp1.setAttribute("class", "gbtb2");
  sp2.setAttribute("class", "gbts");
  sp2.innerHTML = links[i].name;
  
  li.appendChild(a);
  a.appendChild(sp1);
  a.appendChild(sp2);
  var elem = document.getElementById('gbz').getElementsByClassName('gbtc');
  elem[0].insertBefore(li, elem.lastChild);
  
}

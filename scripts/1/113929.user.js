// ==UserScript==
// @name          0chan vk-proxifier
// @namespace     http://userscripts.org/users/406375
// @description   New vk features makes it possible to reveal account name to 3rd-party just by clicking a link
// @include       http://0chan.ru/*
// @include       http://*.0chan.ru/*
// ==/UserScript==

function toArray(obj) {
  var array = [];
  for (var i = obj.length >>> 0; i--;) { 
    array[i] = obj[i];
  }
  return array;
}
var links = toArray(document.getElementsByTagName('a'));
var p = links.pop();
while (p) {
  if (p['href'].match(/^http:\/\/w{0,3}.?vk/i)) {
    if (p['href'].indexOf("share.php?") == -1) {
      var check_link = "http://zend2.com/Def.php?u=" + encodeURIComponent(p['href']) + "&b=4&f=norefer";
      var newa = document.createElement("a");
      newa.setAttribute("target", "_blank");
      newa.setAttribute("href", check_link);
      var newi = document.createElement("img");
      newi.setAttribute("src", "http://vk.com/favicon.ico");
      newa.appendChild(newi);
      p.appendChild(newa);
    }
  }
  p = links.pop();
}
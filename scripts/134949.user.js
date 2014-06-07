// ==UserScript==
// @name           VK Audio Download
// @namespace      http://bo33b.dyndns.org
// @description    Simple and lightweight VK audio download enabler. 
// @version        2.0
// @grant          none
// @include        http://vk.com/*
// @include        https://vk.com/*
// ==/UserScript==

function vkdl() {
  var audio = document.getElementsByClassName("play_btn_wrap");
  for (var i=audio.length-1, node, url, nam, a; i>-1; i--) {
    node=audio[i].parentNode;
    if (node.childNodes[1].href) break;
    url=node.getElementsByTagName("input")[0].value.split(/[?,]/)[0];
    nam=node.nextElementSibling.textContent.split("\n")[1].trim().replace("–","-")+".mp3";
    a=document.createElement("a");
    a.setAttribute("href",url);
    a.setAttribute("download",nam);
    a.setAttribute("style","float:left;font-size:large;margin: 5px -13px");
    a.setAttribute("title","Right-click, \"Save Link As...\" to download");
    a.setAttribute("onclick","event.cancelBubble=1;location.replace(url)");
    a.innerHTML="&#9835;";
    node.insertBefore(a,node.childNodes[1]);
  }
}

setTimeout(function(){vkdl()},500);
setInterval(function(){vkdl()},2000);

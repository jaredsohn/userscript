// ==UserScript==
// @name           A personal appeal from Azu-nyan
// @namespace      @nokkii_@XiPHiA_az-nyan
// @description    Get Moe Wikipedia
// @include        http://*wikipedia.org/*
// ==/UserScript==

var strUA = navigator.userAgent.toLowerCase();
var flgOverRidden = false;

var rmsg = document.createElement('div');
rmsg.setAttribute('id', 'cn-bold-blue-text');
rmsg.appendChild(document.createTextNode('桜が丘女子高校 軽音部員'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('あずにゃんからの'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('お願いをお読みください'));

function loaded(){
  if(document.getElementById('cn-bold-blue-text') != null) {
    if(document.getElementById('text-line-2') != null) {
      document.getElementById('text-line-1').firstChild.nodeValue="これをご覧の先輩方全員から￥1000ずつ寄付していただければ";
      document.getElementById('text-line-2').firstChild.nodeValue="Wikipediaのけいおん!の項が永久に見れますよ。";
    } else {
      var omsg = document.getElementById('cn-bold-blue-text');
      var msgp = omsg.parentNode;
      msgp.replaceChild(rmsg, omsg);
    }
    document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage = "url(http://file.nokkii.blog.shinobi.jp/az-nyan.jpg)";
      document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "155px";
  }
}

(function(){document.addEventListener("DOMNodeInserted", loaded, false);})();

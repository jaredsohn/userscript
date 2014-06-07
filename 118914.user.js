// ==UserScript==
// @name           Jimmy Wales to 〄
// @namespace      @hareta
// @description    Get ☆ Wikipedia
// @include        http://*wikipedia.org/*
// ==/UserScript==

var strUA = navigator.userAgent.toLowerCase();
var flgOverRidden = false;

var rmsg = document.createElement('div');
rmsg.setAttribute('id', 'cn-bold-blue-text');
rmsg.appendChild(document.createTextNode('バイナリアン'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('ほもっきんちゃんからの'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('お願いをお読みくだしあ'));

function loaded(){
  if(document.getElementById('cn-bold-blue-text') != null) {
    if(document.getElementById('text-line-2') != null) {
      document.getElementById('text-line-1').firstChild.nodeValue="これをご覧の皆様全員から5クレずつ寄付していただければ";
      document.getElementById('text-line-2').firstChild.nodeValue="Wikipediaのゾイドの項が永久に見られます。";
    } else {
      var omsg = document.getElementById('cn-bold-blue-text');
      var msgp = omsg.parentNode;
      msgp.replaceChild(rmsg, omsg);
    }
    document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage = "url(http://p.zero-signal.net/mayahu32.png)";
      document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "155px";
  }
}

(function(){document.addEventListener("DOMNodeInserted", loaded, false);})();

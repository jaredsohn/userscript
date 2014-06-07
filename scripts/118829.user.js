// ==UserScript==
// @name           Jimmy Wales to KUTTINPA
// @namespace      @hareta
// @description    Get ゆ Wikipedia
// @include        http://*wikipedia.org/*
// ==/UserScript==

var strUA = navigator.userAgent.toLowerCase();
var flgOverRidden = false;

var rmsg = document.createElement('div');
rmsg.setAttribute('id', 'cn-bold-blue-text');
rmsg.appendChild(document.createTextNode('ゆ教教祖'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('くっちんぱからの'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('お願いをゆゆゆゆゆゆゆ'));

function loaded(){
  if(document.getElementById('cn-bold-blue-text') != null) {
    if(document.getElementById('text-line-2') != null) {
      document.getElementById('text-line-1').firstChild.nodeValue="これをご覧のゆ教徒から5クレずつ寄付していただければ";
      document.getElementById('text-line-2').firstChild.nodeValue="Wikipediaのゆの項が永久にゆゆゆゆゆ。";
    } else {
      var omsg = document.getElementById('cn-bold-blue-text');
      var msgp = omsg.parentNode;
      msgp.replaceChild(rmsg, omsg);
    }
    document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage = "url(http://p.zero-signal.net/yu.jpg)";
      document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "155px";
  }
}

(function(){document.addEventListener("DOMNodeInserted", loaded, false);})();

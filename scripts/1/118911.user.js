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
rmsg.appendChild(document.createTextNode('市立桜が丘高校 軽音部員'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('平沢唯からの'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('お願いを読んでね☆'));

function loaded(){
  if(document.getElementById('cn-bold-blue-text') != null) {
    if(document.getElementById('text-line-2') != null) {
      document.getElementById('text-line-1').firstChild.nodeValue="これを見てるみんなが￥1000ずつ寄付してくれれば";
      document.getElementById('text-line-2').firstChild.nodeValue="Wikipediaのわたしの項目は一生安泰であります！";
    } else {
      var omsg = document.getElementById('cn-bold-blue-text');
      var msgp = omsg.parentNode;
      msgp.replaceChild(rmsg, omsg);
    }
    document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage =  "url(http://www.picamatic.com/show/2011/11/24/01/48/8039344_192x231.jpg)";
      document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "155px";
  }
}

(function(){document.addEventListener("DOMNodeInserted", loaded, false);})();
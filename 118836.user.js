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
rmsg.appendChild(document.createTextNode('市立桜が丘高校 軽音部部長'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('りっちゃんからの'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('お願いをお読みください'));

function loaded(){
  if(document.getElementById('cn-bold-blue-text') != null) {
    if(document.getElementById('text-line-2') != null) {
      document.getElementById('text-line-1').firstChild.nodeValue="これを見てるみんなが￥1000ずつ寄付してくれれば";
      document.getElementById('text-line-2').firstChild.nodeValue="Wikipediaのあたしの項目が永久に見れるのになー";
    } else {
      var omsg = document.getElementById('cn-bold-blue-text');
      var msgp = omsg.parentNode;
      msgp.replaceChild(rmsg, omsg);
    }
    document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage =  "url(http://www.picamatic.com/show/2011/11/23/02/00/8038051_173x231.jpg)";
      document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "155px";
  }
}

(function(){document.addEventListener("DOMNodeInserted", loaded, false);})();
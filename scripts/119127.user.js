// ==UserScript==
// @name       Jimmy to Mao - with text
// @namespace  EdinUniInformatics
// @version    0.1
// @description  enter something useful
// @include    http://*.wikipedia.org/*
// @copyright  None whatsoever
// ==/UserScript==


// Inspired by RedNaylor: http://userscripts.org/scripts/show/119083
// Most of this code ripped from http://userscripts.org/scripts/show/118818, because we are lazy

//Use however you like for whatever you like.

var strUA = navigator.userAgent.toLowerCase();
var flgOverRidden = false;

var rmsg = document.createElement('div');
rmsg.setAttribute('id', 'cn-bold-blue-text');
rmsg.appendChild(document.createTextNode('Please read:'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('A personal appeal from'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('your Chairman Mao'));

function loaded(){
  if(document.getElementById('cn-bold-blue-text') != null) {
      var omsg = document.getElementById('cn-bold-blue-text');
      var msgp = omsg.parentNode;
      msgp.replaceChild(rmsg, omsg);
   
    document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage = "url(http://i.imgur.com/ZBahW.png)";
      document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "155px";
  }
}

(function(){document.addEventListener("DOMNodeInserted", loaded, false);})();

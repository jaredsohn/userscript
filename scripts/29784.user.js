// ==UserScript==
// @name           Rezidentiat
// @namespace      http://www.cursurimedicina.ro/rezitests2008/
// @include        http://www.cursurimedicina.ro/rezitests2008/intrebari_tema.php*
// @require     http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.2/prototype.js 
// ==/UserScript==
//

var p = unsafeWindow;

function waitForProto() {
  if (typeof p.Prototype=='undefined')
    window.setTimeout(waitForProto, 100);
  else {
    var a = p.$$('#content span');
    for(var i = 0; i < a.length; i++ ) {
      var e = a[i];
      e.update("Raspuns: " + e.attributes["onmousemove"].value.match(/Raspuns%3A%20(.)/)[1]) 
    }
  }
}
function loadProto() {
  // dynamically creates a script tag
  var proto = document.createElement('script');
  proto.type = 'text/javascript';
  proto.src = "http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.2/prototype.js"
  document.getElementsByTagName('head')[0].appendChild(proto);
  waitForProto();
}

window.addEventListener('load', loadProto(), 'false');

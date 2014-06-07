// ==UserScript==
// @name              Raj'Writer
// @namespace     Destinyy62
// @description     Insultes automatiques pour rageurs professionels
// @include       http://www.jeuxvideo.com/*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

var liste = ["Fils de pute", "connard", "enculay", "raclure", "Morsay", "wesh", "bataaarrr", "fils de mort", "ta mére la pute", "PD", "salope", "tocard", "pute", "Cortex" ];
	
var mot = liste[Math.floor(Math.random()*liste.length)];

replacements = {
  ":insulte:": mot ,
  };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
  node = textnodes.snapshotItem(i);
  s = node.data;
  for ( key in replacements ) {
    s = s.replace( regex[key] , replacements[key] );
  }
  node.data = s;
}

})();
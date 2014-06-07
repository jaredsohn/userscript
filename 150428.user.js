// ==UserScript==
// @name              NaN
// @namespace     NaN
// @description     NaN
// @include       http://beeg.com/
// @include       http://beeg.com/*
// @include       http://www.redtube.com/
// @include       http://www.redtube.com/*
// @include       http://www.brazzers.com/*
// @include       http://boards.4chan.org/*/
// @include       http://3desu.com/*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

var liste = ["Bee", "connard", "Be", "B", "Ee", "E", "Geeb", ]; // la liste de mots que tu veux
	
var mot = liste[Math.floor(Math.random()*liste.length)];

replacements = {
  "www": mot ,
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
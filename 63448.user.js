// Facebook - Mi Garba
// Galatolo Federico 2009// Last updated: 03/12/2009
//
// ==UserScript==
// @name              Facebook - Toscanizza Facebook
// @namespace     
// @description     Toscanizza il tuo facebook
// @include           *.facebook.com*
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

replacements = {
  "piace": "garba",
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

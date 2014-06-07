// ==UserScript==
// @name              Facebook - Remplace mot (compil)
// @namespace     
// @description     Remplace les apparitions de plusieurs mots
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://www.facebook.com/profile.php?id=1462897801
// ==/UserScript==

(function () {

  var replacements, regex, key, textnodes, node, s;

// you can customize the script below by changing the letter "a" to a lowercase version of the word
// and the letter "B" to the uppercase version of the word. Currently, in this version you
// can only change "a" and B to a word that turns plural by just adding an "s"
// Remember: KEEP THE QUOTES when changing "a" and "B"

replacements = {
  "Profil": "Curriculum vitae",
  "profil": "curriculum vitae",
  "Amis": "Cobayes",
  "amis": "cobayes",
  "amis": "cobaye",
  "enjamin": "ite",
  "Benjamin": "Major",
  "Déconnexion": "Disjoncteur",
  "Marque-pages": "Favoris",
  "marque-pages": "favoris",
  "Messages": "Bafouilles",
  "message": "bafouille"
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
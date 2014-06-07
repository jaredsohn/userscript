// ==UserScript==
// @name           DERP IT ALL!
// @namespace      derp
// @description    durrr hurrr derp derp derp
// @include        http://*
// @exclude        https://*
// ==/UserScript==

//based on zombie apocalypse.


(function () {

  var replacements, regex, key, textnodes, node, s;

// Custom Words
// To do: Isolate certain words for full-word match only. Very crappy. It doesn't matter! DERP IT ALL!

replacements = {
  "ere": "urrr",
  "ear": "urrrr",
  "e're": "urrr",
  "er": "urrr",
  "or": "urrr",
  "ar": "urrr",
  "ur": "urrr",
  " the ": " derpla ",
  " and ": " sherpa ",
  " we ": " derpa ",
  " you ": " herpa ",
  " he ": " derr ",
  " me ": " huhr ",
  " she ": " derpa ",
  " it ": " herpa ",
  " I ": " derp ",
  " on ": " erpa ",
  " in ": " rurr ",
 };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}

var regextitle = new RegExp( "." );


if ( document.title.match( regextitle ) ) {

	//alert( "Match!" );


	textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
	for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
	  node = textnodes.snapshotItem(i);
	  s = node.data;
	  for ( key in replacements ) {
	    s = s.replace( regex[key] , replacements[key] );
	  }
	  node.data = s;
	}

} else {
	
//alert( "Not Derpable?!" );
}

})();
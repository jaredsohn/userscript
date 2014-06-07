// Generated with the WebVocab online generator, v1.3 
 
 
// ==UserScript== 
// @name          Kibikiller 
// @namespace     WandaW
// @description   Kibibyte remover
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);  

for (var i = 0; i < textnodes.snapshotLength; i++){ 
	node = textnodes.snapshotItem(i); 

	if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue)){

	s = node.data; 

	s = s.replace( /\bkibibyte\b/gi, "kilobyte");
	s = s.replace( /\bmebibyte\b/gi, "megabyte");
	s = s.replace( /\bgibibyte\b/gi, "gigabyte");
	s = s.replace( /\btebibyte\b/gi, "terabyte");
	s = s.replace( /\bpebibyte\b/gi, "petabyte");
	s = s.replace( /\bexbibyte\b/gi, "exabyte");
	s = s.replace( /\bzebibyte\b/gi, "zettabyte");
	s = s.replace( /\byobibyte\b/gi, "yottabyte");
	s = s.replace( /\bkibibit\b/gi, "kilobit");
	s = s.replace( /\bmebibit\b/gi, "megabit");
	s = s.replace( /\bgibibit\b/gi, "gigabit");
	s = s.replace( /\btebibit\b/gi, "terabit");
	s = s.replace( /\bpebibit\b/gi, "petabit");
	s = s.replace( /\bexbibit\b/gi, "exabit");
	s = s.replace( /\bzebibit\b/gi, "zettabit");
	s = s.replace( /\byobibit\b/gi, "yottabit");
	s = s.replace( /\bkibibytes\b/gi, "kilobytes");
	s = s.replace( /\bmebibytes\b/gi, "megabytes");
	s = s.replace( /\bgibibytes\b/gi, "gigabytes");
	s = s.replace( /\btebibytes\b/gi, "terabytes");
	s = s.replace( /\bpebibytes\b/gi, "petabytes");
	s = s.replace( /\bexbibytes\b/gi, "exabytes");
	s = s.replace( /\bzebibytes\b/gi, "zettabytes");
	s = s.replace( /\byobibytes\b/gi, "yottabytes");
	s = s.replace( /\bkibibits\b/gi, "kilobits");
	s = s.replace( /\bmebibits\b/gi, "megabits");
	s = s.replace( /\bgibibits\b/gi, "gigabits");
	s = s.replace( /\btebibits\b/gi, "terabits");
	s = s.replace( /\bpebibits\b/gi, "petabits");
	s = s.replace( /\bexbibits\b/gi, "exabits");
	s = s.replace( /\bzebibits\b/gi, "zettabits");
	s = s.replace( /\byobibits\b/gi, "yottabits");
	s = s.replace( /\bZiB\b/gi, "ZB");
	s = s.replace( /\bEiB\b/gi, "EB");
	s = s.replace( /\bYiB\b/gi, "YB");
	s = s.replace( /\bKiB\b/gi, "KB");
	s = s.replace( /\bPiB\b/gi, "PB");
	s = s.replace( /\bGiB\b/gi, "GB");
	s = s.replace( /\bMiB\b/gi, "MB");
	s = s.replace( /\bTiB\b/gi, "TB");
	s = s.replace( /\bZibit\b/gi, "Zbit");
	s = s.replace( /\bEibit\b/gi, "Ebit");
	s = s.replace( /\bYibit\b/gi, "Ybit");
	s = s.replace( /\bKibit\b/gi, "kbit");
	s = s.replace( /\bPibit\b/gi, "Pbit");
	s = s.replace( /\bGibit\b/gi, "Gbit");
	s = s.replace( /\bMibit\b/gi, "Mbit");
	s = s.replace( /\bTibit\b/gi, "Tbit");

node.data = s; 
}
}

})();
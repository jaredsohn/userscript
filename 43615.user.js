// ==UserScript==
// @name          77
// @namespace     http://userscripts.org/users/71414/
// @description   nsor
// @include       *
// ==/UserScript==

(function () {

var replacements, regex, key, thenodes, node, s;

// You can customize the script by adding new pairs of words.

// First, let's build the "obfuscated":"de-obfuscated" words list
// To prevent inadvertently using some regexp control modifiers,
// prepend symbols (i.e. non-alphanumerics) with two backslashes ( i.e. \\ )
replacements = {
  "\\[\\/QUOTE\\]": "",
  "\\[QUOTE\\=": "",
   "\\]": "  ",
  "rapid\\*share": "rapidshare",
  "zid\\*du": "ziddu",
  "crack": "crack",
  "detik.com": "detik.com",
  "kawin": "kawin",
  "tiny\\*url": "tinyurl",
  "kompas.com": "kompas.com",
  "file\\*den": "fileden",
  "detikinet.com": "detikinet.com"
  };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'gi');
}

// Now, retrieve the text nodes
thenodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );

// Perform a replacement over all the nodes
for ( var i=0 ; i<thenodes.snapshotLength ; i++ ) {
  node = thenodes.snapshotItem(i);
  s = node.data;
  for ( key in replacements ) {
    s = s.replace( regex[key] , replacements[key] );
  }
  node.data = s;
}

// Now, retrieve the A nodes
thenodes = document.evaluate( "//a" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );

// Finally, perform a replacement over all A nodes
for ( var i=0 ; i<thenodes.snapshotLength ; i++ ) {
  node = thenodes.snapshotItem(i);
  // Here's the key! We must replace the "href" instead of the "data"
  s = node.href;
  for ( key in replacements ) {
    s = s.replace( regex[key] , replacements[key] );
  }
  node.href = s;
}

})();

// ==UserScript==

// @name           rart

// @namespace      letz

// @description    Ã¼ber Ne77by in l337 5p34|<!

// @include        *nettby.no*

// ==/UserScript==

replacements = {
  "\\b----\\b": "-----------",
        "Fox1000": "Den stygge mæ",

};



var openingNumber = 0;

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {

  node = textnodes.snapshotItem(i);
  s = node.data;

  for (key in replacements) {
    s = s.replace(regex[key], replacements[key]);
  }

  node.data = s;

}

var paragraphs = document.getElementsByTagName( 'p' );

for ( var i = 0; i < paragraphs.length; i++ )
{

  var paragraph = paragraphs[i];
  paragraph.innerHTML = openings[openingNumber] + paragraph.innerHTML;
  openingNumber++;
  if ( openingNumber == openings.length ) openingNumber = 0;

}


//fox1000.
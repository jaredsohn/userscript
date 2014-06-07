// ==UserScript==
// @name        Remove Blippr inline icons
// @namespace   http://github.com/johan
// @include     http://*
// @include     https://*
// ==/UserScript==

$x('//span[@class="blippr-nobr"]').forEach(unblip);
$x('//a[contains(@class, "blippr-inline-smiley")]').forEach(nuke);

function unblip(blip) {
  var text = blip.firstChild;
  blip.parentNode.replaceChild(text, blip);
}

function nuke(node) {
  node.parentNode.removeChild(node);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while ((next = got.iterateNext()))
	result.push( next );
      return result;
  }
}
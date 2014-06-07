// ==UserScript==
// @name        Wikipedia Inline Footnotes
// @version     1.2
// @namespace   http://github.com/johan
// @description Shows footnotes inline when clicked.
// @include     http://*.wikipedia.org/wiki/*
// ==/UserScript==

$x('//a[contains(@href,"#cite_note-")]').forEach(function(a) {
  a.addEventListener('click', inline_footnote, false);
});

function inline_footnote(e) {
  var a = $X('ancestor-or-self::a[1]', e.target);
  var id = a.hash.slice(1);
  var tag = document.createElement('span');
  var copy = document.getElementById(id).cloneNode(true);
  var sup = $X('ancestor::sup[1]', a);

  $x('a[sup] | *[.="^"]', copy).forEach(remove);
  tag.innerHTML = " ["+ copy.innerHTML.replace(/^[\s^]*/, '') +"]";

  a.parentNode.replaceChild(tag, a);
  if (sup) {
    sup.parentNode.replaceChild(tag, sup);
    tag.className = 'citation';
    tag.id = sup.id;
  }

  e.preventDefault();
  e.stopPropagation();
}

function remove(node) {
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
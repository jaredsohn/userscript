// ==UserScript==
// @name          Github: indent merge commit parents
// @namespace     http://github.com/johan/
// @description   Indent the github commits view to ease scanning visually.
// @include       https://github.com/*/commits*
// @include       http://github.com/*/commits*
// ==/UserScript==

var envelopes = '//div[@class="envelope commit"]';
var commit = 'div[@class="machine"]/a[@hotkey="c"]';
var parent = 'div[@class="machine"]/a[@hotkey="p"]';
var merges = $x(envelopes + '[count('+ parent +') > 1]');
merges.forEach(indent_parents);

function envelope_for_commit(hash) {
  return $X(envelopes + '['+ commit +'[contains(@href,"'+ hash +'")]]');
}

function indent(div) {
  var left = getComputedStyle(div, '').marginLeft.replace(/\D/g, '');
  var amount = 10 + parseInt(left || '0', 10);
  div.style.marginLeft = amount + 'px';
  return amount;
}

function indent_parents(merge) {
  function hash(a) {
    var path = a.pathname;
    return path.slice(path.lastIndexOf('/') + 1);
  }

  var parent_hashes = $x('./' + parent, merge).map(hash);
  parent_hashes.map(envelope_for_commit).forEach(indent);
}

function $x(xpath, root) {
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

function $X(xpath, root) {
  var x = $x(xpath, root);
  return x.hasOwnProperty('length') ? x[0] : x;
}
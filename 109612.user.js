// ==UserScript==
// @name        sampa2ipa
// @description Convert SAMPA to IPA
// @include     http://www.cnrtl.fr/morphologie/*
// ==/UserScript==

var subs = {
  ' ' : '',
  '~' : '\u0303',
  'p' : 'p',
  'b' : 'b',
  't' : 't',
  'd' : 'd',
  'tS' : 'ʧ',
  'dZ' : 'ʤ',
  'c' : 'c',
  'J\\' : 'j',
  'k' : 'k',
  'g' : 'g',
  'q' : 'q',
  'P' : 'φ',
  'B' : 'β',
  'f' : 'f',
  'v' : 'v',
  'T' : 'θ',
  'D' : 'ð',
  's' : 's',
  'z' : 'z',
  'S' : 'ʃ',
  'Z' : 'ʒ',
  'C' : 'ç',
  'j\\' : 'ʝ',
  'x' : 'x',
  'G' : 'γ',
  'h' : 'h',
  'h\\' : 'ɦ',
  'm' : 'm',
  'F' : 'ɱ',
  'n' : 'n',
  'J' : 'ɲ',
  'N' : 'ŋ',
  'l' : 'l',
  'L' : 'λ',
  '5' : 'ɫ',
  '4' : 'ɾ',
  'r\\`' : 'ɻ',
  'R' : 'ʀ',
  'w' : 'w',
  'H' : 'ɥ',
  'j' : 'j',
  'i' : 'i',
  'I' : 'I',
  'e' : 'e',
  'E' : 'ε',
  '{' : 'æ',
  'y' : 'y',
  '2' : 'ø',
  '9' : 'œ',
  '1' : 'i',
  '@' : 'ə',
  '6' : 'ɐ',
  '3' : 'ɜ',
  'a' : 'a',
  '}' : 'u',
  '8' : 'o',
  '&' : 'ɶ',
  'M' : 'ɯ',
  '7' : 'ɤ',
  'V' : 'ʌ',
  'A' : 'ɑ',
  'u' : 'u',
  'U' : 'ʊ',
  'o' : 'o',
  'O' : 'ɔ',
  'Q' : 'ɒ',
}

var arReplacements = new Array()
for (var sKey in subs) {
  var from = sKey.replace(/\\/g, '\\\\')
  arReplacements[sKey] = new RegExp(from, 'g')
}

var q = "//tr[@class='morf_header']/../tr[position()>1]/td[2]/text()"

function doConvert(container){
  GM_log("Converting SAMPA to IPA")
  textNodes = document.evaluate(q, container, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

  for (var i = 0; i < textNodes.snapshotLength; i++) {
    var elmTextNode = textNodes.snapshotItem(i)
    var sText = elmTextNode.data
    for (var sKey in arReplacements) {
      sText = sText.replace(arReplacements[sKey], subs[sKey])
    }
    elmTextNode.data = sText
  }
}  

doConvert(document.body)
document.body.addEventListener('DOMNodeInserted', function(event) {
  doConvert(event.target);
}, false);

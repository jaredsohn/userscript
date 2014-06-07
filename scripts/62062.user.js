// ==UserScript==
// @name           UnClouded thinking 0.2.3
// @namespace      uct
// @description    Replaces retarded buzzwords by the already existing proper words for them. As a bonus it adds some Unicode punctuation. Just edit the script to edit the word list.
// @include        http://*.slashdot.org/*
// @include        http://slashdot.org/*
// ==/UserScript==

// Versioning style: completeRewriting.functionalityChange.patternChange

var deferred   = true // do not block page loading by cutting it into time slices
var sliceMs    = 5    // delay between the time slices
var sliceNodes = 33   // nodes per time slice
var words = [['cloud','cluster'],['hack','crack'],['cyber','network'],['pirat','download'],['lobby','brib'],
             ['Cloud','Cluster'],['Hack','Crack'],['Cyber','Network'],['Pirat','Download'],['lobby','Brib'],
             ['[rR]epublican','$puppet1'],['[dD]emocrat','$puppet2'],['lobby(?=\\w)','brib'], // 0.x.1: Political additions
             ["\"([^\"]*)\"","“$1”"],["(\\w)'","$1’"],["(\\d) [eE]uro","$1€"],["--","—"],["\\.\\.\\.","…"]] // some unicode
             // “ALL CAPS IS ’TARDSPEAK ANYWAY!” — Loud Howard ^^
// ["\"([^\"]*)'([^\"]*)'([^\"]*)\"","“$1‘$2’$3”"], // @todo: pretty double and quotes everywhere

replacements = words.map(function (word) {
  //return function (txt)valueOf { return txt.replace(word[0],word[1]) } // @info: Use this one, if no REs are needed.
  return function (txt) { return txt.replace((new RegExp(word[0],"gm")),word[1]) }
})
var texts = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) // @todo: Add (X)HTML attributes to to the list.

var ti = 0
var rC = replacements.length

for (var r = 0; r < rC; r++) { // @todo: Not very elegant. Rather use array.reduce folding in JS 1.8.
  document.title = (replacements[r])(document.title)
}

function unCloud() {
  var txt
  var data
  var r
  while (txt = texts.snapshotItem(ti)) {
    // @todo: Not very elegant. Rather use array.reduce folding in JS 1.8.
    for (r = 0; r < rC; r++) txt.data = (replacements[r])(txt.data)
    ti++
  }
}

function unCloudSlice() {
  var txt
  var data
  var si = 0
  while ((si < sliceNodes) && (txt = texts.snapshotItem(ti))) {
    // @todo: Not very elegant. Rather use array.reduce folding in JS 1.8.
    for (var r = 0; r < rC; r++) txt.data = (replacements[r])(txt.data)
    si++; ti++
  }
  if (txt) window.setTimeout(unCloudSlice,sliceMs)
}

if (deferred) { unCloudSlice() } else  { unCloud() }
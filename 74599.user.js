// ==UserScript==
// @name        Delicious Tagger
// @namespace  http://satomacoto.blogspot.com/
// @include     http://delicious.com/save?*
// @description  Adds the populer and recommended tags automatically.
// ==/UserScript==

var d = document;

// Get Tags
var recos = d.getElementById('save-reco-tags');
var pops = d.getElementById('save-pop-tags');

var tags = '';
if (recos != null) {
  recos = recos.getElementsByClassName('m')
  for (var i = 0; i < recos.length; i++)
    tags += recos[i].title + ' ';
}
if (pops != null) {
  pops = pops.getElementsByClassName('m');
  for (var i = 0; i < pops.length; i++)
    tags += pops[i].title + ' ';
}

// Set Tags
d.getElementById('tags').value = tags;
d.getElementById('tags').focus();
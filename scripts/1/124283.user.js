// ==UserScript==
// @name        Delicious Tagger Clone
// @namespace  http://foobarbaz.com/home.php
// @include     http://delicious.com/save?*
// @include     http://www.delicious.com/save?*
// @description  Adds the suggested tags automatically.
// ==/UserScript==

// with jquery?
// $('#modal [ap=userTags]').append($('#modal [ap=recoTags]').children().clone())

var dest = document.querySelector('#modal [ap=userTags]');
var src = document.querySelector('#modal [ap=recoTags]');
var cn = src.childNodes;
for (var i = 0; i < cn.length; i++) {
  var c = cn[i];
  dest.appendChild(c.cloneNode(true));
}

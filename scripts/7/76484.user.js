// ==UserScript==
// @name           Wiktionary Rename Edit
// @namespace      meh
// @description    Renames edit to Edit this page
// @include        http://en.wiktionary.org/*
// @include        http://en.wikiquote.org/*
// ==/UserScript==

function main()
{
  if (document.getElementById("ca-edit").getElementsByTagName("a")[0])
  {
    document.getElementById("ca-edit").getElementsByTagName("a")[0].innerHTML = "Edit this page";
  }
}
main();

window.addEventListener('load', function(e) { main(); }, false);
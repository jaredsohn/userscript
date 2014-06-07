// ==UserScript==
// @name           Remove Google Reader header container
// @version        2011.11.1
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

stat = 'none'

function rm_header()
{
  if ( stat == 'none' ) {
    stat = 'inline';
  } else {
    stat = 'none';
  }
  document.getElementById("viewer-header-container").style.display = stat;
  document.getElementById("top-bar").style.display = stat;
  document.getElementById("lhn-add-subscription-section").style.display = stat;
}

var btn = document.createElement('button');
btn.innerHTML = 'XXOO';
btn.onclick='rm_header()';
var top = document.getElementById('gbz');
top.apppendChild(btn);
// ==UserScript==
// @name           Save selections
// @namespace      userscript
// @description    Gives you URL to bookmark to save all checked applications
// @include        http://ninite.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


function setSearch(e) {
  var c = $(':checked').map(function(){ return this.value; }).get().join('-');
  document.location.search = '?select=' + c;
  e.preventDefault();
}

$('<button id="getSearch" class="nextbutton">Save Selection</button>')
    .click(setSearch)
    .insertAfter('button:last');


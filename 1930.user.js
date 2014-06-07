// ==UserScript==
// @name          Mycroft search form
// @namespace     http://zoolcar9.lhukie.net/mozilla/userscripts/
// @include       http://mycroft.mozdev.org/*
// @include       http://mozdev.org/pipermail/mycroft/*
// @description	  Replaces mozdev search on header to searchplugins search
// ==/UserScript==

(function() {
  var searchForm, inputName, inputValue, inputs, input;

  searchForm = document.getElementById('mozdev-searchbox').getElementsByTagName('form')[0];
  if(!searchForm) return;
  searchForm.action = 'http://mycroft.mozdev.org/download.html';

  inputName = new Array('name', 'submitform', 'category', 'language', 'country');
  inputValue = new Array('search plugin', 'Find', 'all', 'all', 'all');

  inputs = searchForm.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
    input = inputs[i];
    input.name = inputName[i];
    input.value = inputValue[i];
    if(input.name == 'submitform')
      input.title = 'Find search plugin';
    if(input.name == 'name')
      input.addEventListener('click', function(event) { this.value=''; }, false);
  }
})();


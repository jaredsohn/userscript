// ==UserScript==
// @name        mavencentral-gradle-format-search
// @namespace   http://www.sgrailways.com/
// @description Drop your gradle dependency strings into the search.maven.org query box
// @include     http://search.maven.org
// @include     http://search.maven.org/*
// ==/UserScript==

var search = document.getElementById('query');
var currentValue = search.value;

(function poll() {
  setTimeout(function() {
    if(currentValue !== search.value) {
      currentValue = search.value;
      var text = /^(\S+):(\S+):(\S+)$/.exec(search.value);
      if(text) {
        search.value = ['g:"', text[1], '" AND ', 'a:"', text[2], '" AND ', 'v:"', text[3], '"'].join("");
      }
    }
    poll();
  }, 250);
}());

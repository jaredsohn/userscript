// ==UserScript==
// @name           Reddit Navigational Access Keys
// @description    Add , and . as access keys for Reddit prev and next links.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*

(function() {
  var i, j, links, paras = document.getElementsByTagName('p');

  for (i = 0; i < paras.length; i++) {
    if (paras[i].className == 'menu') {
      var links = paras[i].getElementsByTagName('a');

      for (j = 0; j < links.length; j++) {
        if (links[j].textContent == 'prev')
          links[j].accesskey = ',';
        else if (links[j].textContent == 'next')
          links[j].accesskey = '.';
      }
    }
  }
})();

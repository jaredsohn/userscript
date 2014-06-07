// ==UserScript==
// @name       Soundcloud comment remover
// @namespace  http://www.agixo.de/
// @version    1.2
// @description  Hides the comments in the new Soundcloud design
// @include      *://soundcloud.com/*
// @include      *://www.soundcloud.com/*
// @copyright  2013, Daniel Lehr <daniel@agixo.de>
// ==/UserScript==
(function(W) {
  var comment, len;

  document.addEventListener('DOMContentLoaded', function() {
    check();
    var css = document.createElement('style');
    css.innerHTML = '.commentBubble.visible{display: none;}';
    document.body.appendChild(css);
  });
  
  function check() {
    comments = document.getElementsByClassName('waveform__scene');
    if (len = comments.length) {
      for (var i = 0; i < len; i++) {
        if (comments[i].children.length == 3) comments[i].children[1].remove();
      }
    }
    W.setTimeout(check, 250);
  }
})(window);
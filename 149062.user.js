// ==UserScript==
// @name        Greedy Wykop
// @namespace   http://www.marekstoj.com/
// @description Disables lazy-loading on Wykop.pl.
// @include     http://www.wykop.pl*
// @version     1.1
// ==/UserScript==

function main() {
  $(document).ready(function() {
    if ($(window).data().lazyloaders) {
      $.each($(window).data().lazyloaders, function() {
        if (this.element && $(this.element).showComment) {
          $(this.element).showComment();
        }
      });
    }
  });
}

window.addEventListener(
  'load',
  function() {
    var script = document.createElement("script");
    
    script.textContent = "(" + main.toString() + ")();";
    document.body.appendChild(script);
  },
  false);

// ==UserScript==
// @name        Comentador
// @namespace   
// @description Para comentar piolamente en Taringa!
// @author      hinafu
// @include     http://*.taringa.net/*
// @grant       none
// ==/UserScript==

//=============================================================================

(function() {
  $(document).ready(function() {
    if($("button#comment-button-text").length) {
      var caja = $(document).find("textarea[id=body_comm]");
      $(caja).bind('keypress',function(t) { // t: tecla
        if(t.which == 13 && t.shiftKey) {
          t.preventDefault();
          $("button#comment-button-text").trigger("click");
        }
      });
    }
    if(($("button.my-shout-add.btn.a.floatR.mi")).length) {
      var caja2 = $(document).find("textarea[id=my-shout-body-mi]");
      $(caja2).bind('keypress',function(t) { // t: tecla
        if(t.which == 13 && t.shiftKey) {
          t.preventDefault();
          $("button.my-shout-add.btn.a.floatR.mi").trigger("click");
        }
      });
    }
    if($("button.my-shout-add.btn.a.floatR.menu").length) {
      var caja3 = $(document).find("textarea[id=my-shout-body-menu]");
      $(caja3).bind('keypress',function(t) { // t: tecla
        if(t.which == 13 && t.shiftKey) {
          t.preventDefault();
          $("button.my-shout-add.btn.a.floatR.menu").trigger("click");
        }
      });
    }
  });
})();
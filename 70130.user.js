// ==UserScript==
// @name        Flowdock Focus
// @namespace   http://fluidapp.com
// @description Puts focus back in chat input whenever focus is given back to window
// @include     *
// @author      RSL [rsl@luckysneaks.com]
// ==/UserScript==

(function () {
    if (window.fluid) {
      window.onfocus = function() {
        var good_input = document.getElementById("chat_input");
        document.getElementById("chat_input").focus();
      }
    }
})();
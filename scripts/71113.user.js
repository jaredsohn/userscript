// ==UserScript==
// @name           Virtonomica Del Share Menu
// @namespace      virtonomica
// @description    Deleted share menu & Deleted "Моя реклама"
// @version        1.1
// @include        http://virtonomica.*
// ==/UserScript==

var run = function() {
   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;
   $("a:contains('Моя реклама')").parent().hide();
   $('#share').each(function() { this.innerHTML = '';  });
};

// Грязный хак для Google Chrome >:]
if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}


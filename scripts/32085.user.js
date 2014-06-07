// ==UserScript==
// @name           FixJavascriptLinks
// @namespace      webmonkey
// @description    Opens the "javascript:" link as intended when you Ctrl+CLICK or Shift+CLICK on it.
// @include        *
// ==/UserScript==


var links = document.links;

for (var i=0; i<links.length; i++) {
    var link = links[i];
    var match = /javascript:/.exec(link.href)
    if (match) {
        (function bind(code) {
            function handle_click(event) {
                if (event.ctrlKey || event.shiftKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    window.location.href = code;
                }
            }
            function handle_keypress(event) {
                if (event.ctrlKey || event.shiftKey) 
                    if (event.keyCode == 13 && event.charCode == 0) {
                        event.preventDefault();
                        event.stopPropagation();
                        window.location.href = code;
                    }
            }
            link.addEventListener('click', handle_click, true);
            link.addEventListener('keypress', handle_keypress, true);
        })(link.href);
    }
}

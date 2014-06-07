// ==UserScript==
// @match http://mog.com/m*
// @match https://mog.com/m*
// @include http://mog.com/m*
// @include https://mog.com/m*
// @name MOG Keyboard Shortcuts
// @namespace http://mog.com/
// @description Add keyboard shortcuts to MOG web player
// @version 0.1
// ==/UserScript==

function main() {

    $(document).keyup(function(e) {
        if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)) {
            switch (e.which) {
                case 37:
                    $('#previous').click();
                    break;
                case 39:
                    $('#next').click();
                    break;
            }
        }
    });

    $(document).keypress(function(e) {
        switch (String.fromCharCode(e.which)) {
            case '/':
                $('#searchbox').select().focus();
                e.preventDefault();  // Don't emit '/' into the search box
                break;
            case ' ':
                $('#play').click();
                break;
            case 'q':
                if ($('#play_queue').css('display') == 'none') {
                    window.location.hash = '#play_queue';
                    Mog.ui.scrollToPlaying();
                } else {
                    history.back();
                }
                break;
            case 'C':
                $('.clear_queue').click();
                break;
            case 's':
                $('.shuffle_queue').click();
                break;
            case 'r':
                $('.repeat_toggle').click();
                break;
            case 'R':
                $('.radio_toggle').click();
                break;
            case 'F':
                if ($('#full_view').css('display') == 'none') {
                    $('#full_view_toggle').click();
                } else {
                    $('#full_view').click();
                }
                break;
        }
    });
}

var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(script);

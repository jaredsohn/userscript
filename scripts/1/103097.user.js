// ==UserScript==
// @name          Del.icio.us Keyboard Shortcut
// @namespace     http://mikitebeka.com
// @description   CTRL-M to add delicious bookmark.
// @author        Miki Tebeka
// @homepage      http://mikitebeka.com
// @license       BSD
// @include       *
// ==/UserScript==


/*
* Code borrowed from on http://userscripts.org/scripts/show/21104, which is
* borrowed from "Navigate anything like Bloglines"
* (http://userscripts.org/scripts/show/4886) and probably other scripts as
* well...
*/

var m_key = 'm'.charCodeAt(0);

// Check that key pressed is CTRL-M and that caret is not in a form element
function should_bookmark(e) {
    var keyCode = e.which;
    if (keyCode != m_key) {
        return false;
    }
    
    if (!e.ctrlKey) {
        return false;
    }

    // Discard other modifiers
    if (e.altKey || e.metaKey) {
        return false;
    }

    // Skip if we're in textarea or input
    var targetTag = e.target.tagName;
    if ((targetTag == 'TEXTAREA') || (targetTag == 'INPUT')) {
        return false;
    }

    return true;
}

// Taken from delicion bookmarklet (http://www.delicious.com/help/bookmarklets)
function bookmark() {
    var url = 'http://www.delicious.com/save?url=' + 
        encodeURIComponent(window.location.href) + 
        '&title=' + encodeURIComponent(document.title) + 
        '&notes=' + encodeURIComponent('' + (window.getSelection ? window.getSelection() : 
                        document.getSelection ? document.getSelection() : 
                        document.selection.createRange().text)) + 
        '&v=6&';

    f = function() {
        if (!window.open(
                url + 'noui=1&jump=doclose',
                'deliciousuiv6',
                'location=yes,links=no,scrollbars=no,toolbar=no,width=550,height=550')) {
            location.href = url + 'jump=yes'
        };
    }

    setTimeout(f,0);
}

// Handle the keys!
function keyHandler(e) {
    if (!should_bookmark(e)) {
        return;
    }
    bookmark();
}
document.addEventListener('keypress', keyHandler, true);


// ==UserScript==
// @name        people.live.com key shortcuts
// @namespace   server.gvn.cz/~mp890318
// @include     https://people.live.com/
// @version     1
// @grant       none
// ==/UserScript==
//
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 113: // F2
            document.getElementById('edit').click();
            break;
        case 114: // F3
            document.getElementById('addToFavorites').click();
            break;
        case 13:
            document.getElementById('btnSave').click();
            break;
    }
};

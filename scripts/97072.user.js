// ==UserScript==
// @name        PostCounter
// @author      Kambfhase
// @description Zeigt die Zahl der Post auf der aktuellen Seite an.
// @version     1.0
// @include     http://forum.mods.de/bb/thread.php?*
// @include     http://forum.mods.de/bb//thread.php?*
// ==/UserScript==

(this.GM_addStyle ||function(styles){
    var S = document.createElement('style'),
        T = document.createTextNode(styles);
    S.type = 'text/css';
    S.appendChild(T);
    document.body.appendChild(S);
    return;
})(unescape(
"tr%5Busername%5D%7B%20%20%20%20counter-increment%3APostCount%3B%7Dtr%5Busername%5D%2Btr%20a.postlink%3Aafter%7B%20%20%20%20content%3A%20%22%20%28%23%22counter%28PostCount%29%22%29%22%3B%20%20%20%20color%3A%20yellow%20%21important%3B%20%20%20%20font-style%3A%20italic%3B%7D"
));
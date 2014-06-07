// ==UserScript==
// @name           PMA: Run On Ctrl-Enter
// @namespace      http://axisofevil.net/~xtina
// @include        *
// @description    Allows you to hit Ctrl-Enter in a phpMyAdmin SQL query box.
// ==/UserScript==

if (document.getElementById('sqlqueryform')) {
    document.getElementById('sqlquery').addEventListener('keypress', function(e) {
        if (e.ctrlKey && e.keyCode == 13) {
            document.getElementById('sqlqueryform').submit();
        }
    }, true);
}

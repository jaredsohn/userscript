// ==UserScript==
// @name        Greasemonkey issue 1864
// @namespace   http://userscripts.org/users/jerone
// @author      jerone
// @include     *
// @version     1
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// ==/UserScript==
GM_registerMenuCommand('Greasemonkey issue 1864', function () {
    alert(prompt('Greasemonkey issue 1864', GM_getValue('Greasemonkey issue 1864', 'default value')));
});
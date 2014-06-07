// ==UserScript==
// @name TWeaker
// @description TWeaker
// @author Vbyec
// @license MIT
// @version 0.1.3
// @nocompat Chrome
// @grant none
// @include http://*.the-west.*/game.php*
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

exec(function () {
    var MyScript = TheWestApi.register('TWeaker', 'TWeaker', '2.08', '2.08', 'Vbyec', 'http://userscripts.org/scripts/show/401804');
    MyScript.loadScript('http://userscripts.org/scripts/source/409876.user.js');
});
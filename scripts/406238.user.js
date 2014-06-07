// ==UserScript==
// @name         MMORPG.ORG.PL Background Ad Block
// @description  Remove annoying background ads from mmorpg.org.pl
// @version      0.5
// @namespace    userscripts.org/users/601753
// @author       peXu
// @include      /https?://(.*\.)?mmorpg\.org\.pl/.*/
// @exclude      /https?://(.*\.)?mmorpg\.org\.pl/forum/.*/
// @downloadURL  http://userscripts.org/scripts/source/406238.user.js
// @updateURL    http://userscripts.org/scripts/source/406238.meta.js
// @homepageURL  http://userscripts.org/scripts/show/406238
// @copyright    2013+, peXu (http://userscripts.org/users/601753)
// @license      http://creativecommons.org/licenses/by-nc-nd/4.0/
// @run-at       document-body
// ==/UserScript==

$('html').css({
    'background-image' : 'none'
});

$(document).ready(function() {
    $(function () {
        $('body').unbind('click');
    });
});
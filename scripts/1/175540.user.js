// ==UserScript==
// @name       LoL Forum - Max Post Height
// @namespace  http://bitbucket.org/emallson
// @version    0.1
// @description  Prevents idiots like MasterChief from screwing up threads.
// @include      http://*.leagueoflegends.com/board/showthread.php*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @run-at document-end
// @copyright  2013+, Atlanis
// @updateURL http://userscripts.org/scripts/source/175540.user.js
// ==/UserScript==

$(".post-message").css({
    'max-height': '600px',
    'overflow-y': 'auto'
});
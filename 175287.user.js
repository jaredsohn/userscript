// ==UserScript==
// @name       LoL Forum - Hide Users
// @namespace  http://bitbucket.org/emallson
// @version    0.1
// @description  Hides users on LoL forums
// @include      http://*.leagueoflegends.com/board/forumdisplay.php*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @run-at document-end
// @copyright  2013+, Atlanis
// @updateURL http://userscripts.org/scripts/source/175287.user.js
// ==/UserScript==

var ignored = [
    "Pylair",
    "Utsuho Radium",
    "Radium Utsuho"
];

function isIgnored(name) {
    for(var i = 0; i < ignored.length; ++i) {
        if(name === ignored[i]) {
            return true;
        }
    }
    return false;
}

$(function() {
    $("tbody tr").each(function() {
        if(isIgnored($(this).find(".author").text())) {
            $(this).hide();
        }
    });
});
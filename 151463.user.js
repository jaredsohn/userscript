// ==UserScript==
// @name			FA filter GM versie
// @author			Patricier
// @namespace		-
// @description		-
// @include			http://nl*.tribalwars.nl/game.php?*screen=am_farm*
// ==/UserScript==

(function () {
var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register( 'FA filter (GM versie: 1-11-2012)', 8.9, 'Patricier', 'nickverbeet@gmail.com' );

if (!document.URL.match(/order=distance&dir=asc/)) {
    location.href += '&order=distance&dir=asc';
}
$("div#am_widget_Farm img[src$='http://cdn2.tribalwars.net/graphic/command/attack.png?901ab']").each(function (i, e) {
    $(this).closest('tr').remove();
});

$("#footer_left").append(" - Dorpen onder aanval zijn gefilterd");
})();
// ==UserScript==
// @name        Infractions table highlight by kLeptO
// @namespace   infractionshighlight
// @description Highlights every second infraction in the infraction table.
// @include     *.rune-server.org/infraction.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==
$( document ).ready(function() {
    var highlight = false;
    $(".infraction_infotable tr").each(function() {
        if (highlight) {
            $(this).css("background", "#222");
        }
        highlight = !highlight;
    });
});
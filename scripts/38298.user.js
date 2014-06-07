// ==UserScript==
// @name           GLB Decimal Attributes
// @namespace      pbr_dec
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @version        08.12.22
// ==/UserScript==

/*
 *
 * pabst did this 11/2/08+
 *
 */

window.setTimeout( function() {
    main();
}, 100);

function main() {
    var sb = document.getElementsByClassName("stat_value_tall_boosted");
    for (var i=0; i<sb.length; i++) {
        var v = parseFloat(sb[i].innerHTML);
        var div = sb[i].innerHTML.indexOf("<div");
        if (div != -1) {
            div = sb[i].innerHTML.slice(div);
        }
        else {
            div = "";
        }
        sb[i].innerHTML = v.toFixed(2)+""+div;
    }

    var s = document.getElementsByClassName("stat_value_tall");
    for (var i=0; i<14-sb.length; i++) {
        var v = parseFloat(s[i].innerHTML);
        var div = s[i].innerHTML.indexOf("<div");
        if (div != -1) {
            div = s[i].innerHTML.slice(div);
        }
        else {
            div = "";
        }
        s[i].innerHTML = v.toFixed(2)+""+div;
    }

}


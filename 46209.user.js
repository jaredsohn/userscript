// ==UserScript==
// @name           player list length
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// ==/UserScript==

window.setTimeout( function() {
    var list = unsafeWindow.play_data;
    var len = 23;

    console.log("Total: "+list.length);
    for (var i=0; i<list.length; i++) {
        var missing = new Array();
        console.log("    Frame #"+i+": "+list[i].length);
        if (list[i].length != 23) {
            for (var j=0; j<list[0].length; j++) {
                var player = list[0][j].id;
                var found = false;
                for (var k=0; k<list[i].length; k++) {
                    if (list[i][k].id == player) {
                        found = true;
                        break;
                    }
                }
                if (found == false) {
                    missing.push(player);
                }
            }
        }
        if (missing.length > 0) {
            console.log("Missing Players: "+missing);
        }
    }
}, 100);

// ==UserScript==
// @name          Planets.nu show player slot for PE
// @description   Simply adds player slot ID to primary enemy screen. Useful for miX, gsX friendly codes in team or giant melee games.
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @version 0.1
// ==/UserScript==

function wrapper () { // wrapper for injection

vgapShipScreen.prototype.primaryEnemy = function () {
        vgap.more.empty();
        var cls = "OrdersScreen";
        if (vgap.players.length > 15)
            cls = "OrdersScreenSmall";

        var html = "<div id='" + cls + "'>";
        if (vgap.players.length <= 15)
            html += "<h1>Select Primary Enemy</h1><p>Your ship will attack your primary enemy ships or planets if it encounters them.</p>";
        html += "<div onclick='vgap.shipScreen.selectEnemy(0);'>None</div>";
        for (var i = 0; i < vgap.players.length; i++) {
            var player = vgap.players[i];
            if (player.id != vgap.player.id) {
                var race = vgap.getRace(player.raceid);
                html += "<div onclick='vgap.shipScreen.selectEnemy(" + player.id + ");'>" + player.id.toString(36).toUpperCase() + ". " + race.name + " (" + player.username + ")</div>";
            }
        }
        html += "</div><a class='MoreBack' onclick='vgap.closeMore();return false;'>OK</a>";
        $(html).appendTo("#MoreScreen");
        vgap.showMore();

        // vgap.action added for the assistant (Alex):
//        vgap.action();
    }

    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);    
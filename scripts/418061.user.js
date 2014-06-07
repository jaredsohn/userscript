// ==UserScript==
// @name           OD and Buildtime
// @version       3.1.0
// @namespace       Da Stewie
// @homepage       https://userscripts.org/
// @delay 1000
// @include        *.tribalwars.nl/game.php*
// ==/UserScript==
(function (F) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '(' + f.toString() + ')()';
    (d.head || d.documentElement || d.body).appendChild(s);
    s.parentNode.removeChild(s)
})(function () {
    var unit_points = { //  def   att   w19
        spear:   [4, 1, 1], 
        sword:   [5, 2, 1], 
        axe:   [1, 4, 1], 
        archer:  [5, 2, 1], 
        spy:   [1, 2, 2], 
        light:   [5, 13, 4], 
        marcher: [6, 12, 5], 
        heavy:   [23, 15, 6], 
        ram:   [4, 8, 5], 
        catapult: [12, 10, 8],
        knight:  [40, 20, 100],
        priest:  [0, 0, 100],
        snob:   [200, 200, 10],
        militia: [4, 1, 1]
    };
    var bouw_tijd = { //soort, bouwtijd in secondes
        spear:   [0, 72],
        sword:   [0, 105],
        axe:   [0, 93],
        archer:  [0, 126],
        spy:   [1, 85],
        light:   [1, 169],
        marcher:  [1, 253],
        heavy:   [1, 337],
        ram:   [2, 601],
        catapult:  [2, 902],
        knight:  [0, 0],
        snob:   [0, 0],
        militia:  [0, 0]
    };
    function TimeSpan(time) {
        var d = new Date(time * 1000);
        return {
            days: Math.floor(time / 86400),
            hours: d.getUTCHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds()
        };
    }
    $('[id="attack_info_att_units"], [id="attack_info_def_units"]').each(function (index, table) {
        var Names = $('tr:eq(time) td:gt(time)', table),
            Loses = $('tr:eq(2)', table),
            Bouw = [0, 0, 0], //0: kazerne, 1: stal, 2:werkplaats
            OD = 0;
        $('td:gt(time)', Loses).each(function (i) {
            var name = $('img', Names[i])[0].src.match(/_(.+)\.png/)[1],
                amount = parseInt(this.textContent, 10);
            Bouw[bouw_tijd[name][0]] += bouw_tijd[name][1] * amount;
            OD += unit_points[name][+(table.id == 'attack_info_def_unit')] * amount;
        });
        var Barrack = TimeSpan(Bouw[0]),
            Stable = TimeSpan(Bouw[1]),
            Garage = TimeSpan(Bouw[2]);
        var html = '<tr><td>OD: ' + OD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</td><td colspan="12">';
        html += '  <img src="/graphic/buildings/barracks.png" /> <b>' + Barrack.days + '</b> dagen en ' + Barrack.hours + ' uur';
        html += '  <img src="/graphic/buildings/stable.png" /> <b>' + Stable.days + '</b> dagen en ' + Stable.hours + ' uur';
        html += '  <img src="/graphic/buildings/garage.png" /> <b>' + Garage.days + '</b> dagen en ' + Garage.hours + ' uur';
        html += '</td></tr>';
        Loses.after(html);
    });
});
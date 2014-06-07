// ==UserScript==
// @name           Naked Katana
// @namespace      kol.interface.unfinished
// @description    Exposes the actual hit damage from Haiku Katana hits in KOL.
// @include        http://*.kingdomofloathing.com/fight.php*
// @include        http://127.0.0.1:*/fight.php*
// ==/UserScript==

//Version 1.2.1
// - fix include url for changes in kol
//Version 1.2
// - add up any sums in the damage total
//Version 1.1
// - Show any number of damage tags instead of just one.


// what we're parsing:
//<Table><tr><td valign=center>
// <img src="http://images.kingdomofloathing.com/itemimages/hkatana.gif" width=30 title="Damage: 478" height=30></td>

function doPage() {
    var images=document.getElementsByTagName('img');
    for (var i=0;i<images.length;i++) {
        var img = images[i];
        var dmg = img.getAttribute('title');
        if (dmg && dmg.indexOf('Damage: ')==0) {
            var d = dmg.substr(8).replace(/\s/g,'').replace(/[()]/g,'');
            if (d.indexOf('+')>=0) {
                var elts = d.split('+');
                var sum = 0;
                for (var j=0;j<elts.length;j++) {
                    sum += parseInt(elts[j]);
                }
                d=sum;
            }

            var p = img.parentNode; // <td>
            p.removeChild(img);

            // create text
            var ft = document.createElement("table");
            var ftr = document.createElement("tr");
            var ftd = document.createElement("td");
            var f = document.createElement("font");
            f.innerHTML = "<font size=0>" + d + "</font>";

            ftd.appendChild(img);
            ftr.appendChild(ftd);
            ft.appendChild(ftr);

            ftr = document.createElement("tr");
            ftd = document.createElement("td");
            ftd.setAttribute('align','center');
            ftd.appendChild(f);
            ftr.appendChild(ftd);
            ft.appendChild(ftr);

            p.appendChild(ft);
        }
    }
}

doPage();

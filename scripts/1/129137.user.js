// ==UserScript==
// @name       Grepolis BBUnit
// @namespace  balping
// @version    1.3
// @icon           http://cdn.grepolis.com/images/game/units/rider_90x90.jpg
// @description  Converts current town's unit info to BBCode
// @include      http://*.grepolis.*/game/*
// @updateURL  http://userscripts.org/scripts/source/129137.user.js
// @copyright  2012+, balping
// ==/UserScript==

var uw=unsafeWindow;
document.getElementById("bottom_ornament").innerHTML = "<span style=\"color: white; font-weight:bold;\">BBUnits: <a href=\"#\" style=\"color: white;\" id=\"bbunit_from\" onclick=\"bbunit(0)\" >from</a> / <a href=\"#\" style=\"color: white;\" id=\"bbunit_in\" onclick=\"bbunit(1)\" >in</a></span>";
uw.$('#bbunit_from').mousePopup(new uw.MousePopup('Troops from this city (only your own troops)'));
uw.$('#bbunit_in').mousePopup(new uw.MousePopup('Troops in this city (includes supports)'));

uw.bbunit = function(mode){
    var units_own = uw.ITowns.getTown(parseInt(uw.Game.townId)).units();
    var units_support = uw.ITowns.getTown(parseInt(uw.Game.townId)).unitsSupport();
    var bbf="[*]";
    var bba="[*]";
    var volte=false;
    for (unit in units_own){
        if(units_own[unit]!=0 || units_support[unit]!=0){
            bbf += "[img]http://cdn.grepolis.com/images/game/units/" + unit + "_40x40.png[/img][|]";
            bba += "[center]" + (units_own[unit] + mode*units_support[unit]) + "[/center][|]";
            volte=true;
        }
    }
    if(volte){
        bbf = bbf.substr(0, bbf.length-3);
        bba = bba.substr(0, bba.length-3);
        bbf += "[/*]";
        bba += "[/*]";
        var win = uw.Layout.wnd.Create(0,"BBUnit - Troops " + (mode==0 ? "from" : "in") + " " + uw.Game.townName );
        win.setWidth(640);
        win.setHeight(360);
        win.setContent("Copy and paste:<br/><textarea style=\"height: 90%; width: 95%;\">Troops " + (mode==0 ? "from" : "in") + " [town]" + parseInt(uw.Game.townId) + "[/town]:\n[table]" + bbf + bba + "[/table]</textarea>");
    }
    
}
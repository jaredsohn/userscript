// ==UserScript==
// @name           GLB Outfitter
// @namespace      Outfitter
// @description    Outfit a new player in 4 pieces of gear in the same attribute
// @include        http://goallineblitz.com/game/equipment.pl?player_id=*
// ==/UserScript==


// Include Dojo from the AOL CDN
var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.2.0/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script)

var outfitButton = document.createElement('input');
outfitButton.id = "outfitButton";
outfitButton.type="button";
outfitButton.value = "Buy all new outfit";
document.getElementById('all_equipment').appendChild(outfitButton);

window.addEventListener('load', function(event) {
    var dojo = unsafeWindow["dojo"];

    dojo.addOnLoad(function() {
        dojo.connect(dojo.byId('outfitButton'), 'onclick', buyEquipment);
    });
}, 'false');

function getPlayerIdFromLocation() {
    var pid = window.location.search;
    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
    if (pid.indexOf('&') > -1) {
        pid = pid.slice(0,pid.indexOf('&'));
    } else {
        pid = pid.slice(0);
    }
    return pid;
}

function pickAttribute() {
    if (confirm('Buy speed equipment?')) {
        return "speed";
    } else if (confirm('Buy strength equipment?')) {
        return "strength";
    } else if (confirm('Buy agility equipment?')) {
        return "agility";
    } else if (confirm('Buy throwing equipment?')) {
        return "throwing";
    } else if (confirm('Buy punting equipment?')) {
        return "punting";
    } else if (confirm('Buy kicking equipment?')) {
        return "kicking";
    }
}
var playerId;
function buyEquipment() {
    var attribute = pickAttribute();
    playerId = getPlayerIdFromLocation();
    // chest
    buyItem(23, attribute);
    // hand
    buyItem(12, attribute);
    // feet
    buyItem(1, attribute);
    // head
    buyItem(38, attribute);

}

function buyItem(itemId, attribute) {
    var dojo = unsafeWindow["dojo"];
    dojo.xhrPost({
        url: "http://goallineblitz.com/game/upgrade_equipment.pl", 
        content : {id: "", purchase: itemId, player_id: playerId, action: "Upgrade", upgrade: attribute},
        load: equipItem,
        error : function() {alert('network error while buying')},
        handleAs: "text"
    });
}

function equipItem(response, ioArgs) {
    var dojo = unsafeWindow["dojo"];
    var console = unsafeWindow["console"];
    var id = response.slice(response.indexOf('id=')+3);
    id = id.slice(0,id.indexOf('"'));
    dojo.xhrGet({
        url: "http://goallineblitz.com/game/equipment.pl", 
        content : {player_id: playerId, equip: id},
        load: function(response) {return response},
        error : function() {alert('network error while equipping')},
        handleAs: "text"
    });
}


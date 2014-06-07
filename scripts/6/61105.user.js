// ==UserScript==
// @name           GLB Test Outfitter
// @namespace      Outfitter on Test Server
// @description    Outfit a new player in 4 pieces of gear in the same attribute
// @include        http://test.goallineblitz.com/game/equipment.pl?player_id=*
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


var colors = ['black','white','red','yellow','green','blue','pink','grey','orange','brown','purple'];

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
function pickColor() {
    var txt = 'Enter the number for the color you want.\nAll pieces will have the same color.\nGreen will result in eye black for the head piece.\n'
    for (var i in colors) {
        txt+='\n'+i+' = '+colors[i];
    }
    var color = prompt(txt);
    if (color != null) {
        color = parseInt(color);
        if (isNaN(color) || color < 0 || color >= colors.length) {
            alert('Invalid color choice, be sure to type the number correctly');
            return pickColor();
        }
    }
    return color;
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
    } else if (confirm('Buy catching equipment?')) {
        return "catching";
    } else if (confirm('Buy stamina equipment?')) {
        return "stamina";
    } else if (confirm('Buy confidence equipment?')) {
        return "confidence";
    }
    return null;
}
var playerId;
function buyEquipment() {
    var attribute = pickAttribute();
    if (attribute) {
        var color = pickColor();
        if (color) {
            playerId = getPlayerIdFromLocation();
            // chest
            buyItem(23+color, attribute);
            // hand
            buyItem(12+color, attribute);
            // feet
            buyItem(1+color, attribute);
            // head
            buyItem(34+color, attribute);
        }
    }
}

function buyItem(itemId, attribute) {
    var dojo = unsafeWindow["dojo"];
    dojo.xhrPost({
        url: "http://test.goallineblitz.com/game/upgrade_equipment.pl", 
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
        url: "http://test.goallineblitz.com/game/equipment.pl", 
        content : {player_id: playerId, equip: id},
        load: function(response) {
            return response
        },
        error : function() {alert('network error while equipping')},
        handleAs: "text"
    });
}
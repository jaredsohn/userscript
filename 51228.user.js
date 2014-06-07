// ==UserScript==
// @name           Nexus War Total HP
// @namespace      http://userscripts.org/users/79156
// @description    Modify the Occupants and Pets panels to show the total amount of HP for friendlies and hostiles.
// @include        http://www.nexuswar.com/map/*.do
// @include        http://nexuswar.com/map/*.do
// ==/UserScript==

function updateOccupants() {
    var _occupants = document.getElementById('occupants');
    if(_occupants === null)
        return;
    var formtables = _occupants.getElementsByClassName('formtable');
    if(formtables.length === 0)
        return;
    var occtable = formtables[0];
    var ocnames = occtable.getElementsByClassName('ocname');

    var your_hp = parseInt(document.getElementById('chp').innerHTML, 10);
    // Getting the current player's maxhp requires fetching another page
    var your_maxhp = 0;

    var total_hp = your_hp;
    var total_maxhp = 0;
    var total_count = 0;
    var friendly_hp = your_hp;
    var friendly_maxhp = 0;
    var friendly_count = 0;
    var other_hp = 0;
    var other_maxhp = 0;
    var other_count = 0;
    for(var i = 0; i < ocnames.length; i++) {
        var ocname = ocnames[i];
        var occd = ocname.parentNode.parentNode.getElementsByClassName('occd')[0];
        var ocdn = occd.getElementsByClassName('ocdn');
        var cd = occd.getElementsByClassName('cd');
        var hpinfo = cd[0].innerHTML.match(/Hit Points:\s*<\/b>\s*<img[^>]*>\s*(\d+)\/(\d+)\s*<br>/i);

        var occ_id = occd.id.match(/occd-(\d+)/i)[1];
        var occ_class = ocname.getElementsByTagName('a')[0].className;
        var occ_name = ocdn[0].innerHTML;
        var occ_hp = parseInt(hpinfo[1], 10);
        var occ_maxhp = parseInt(hpinfo[2], 10);

        if(occ_class === 'plf' || occ_class === 'plfr' || occ_class === 'pla' ) {
            friendly_hp += occ_hp;
            friendly_maxhp += occ_maxhp;
            friendly_count += 1;
        } else {
            other_hp += occ_hp;
            other_maxhp += occ_maxhp;
            other_count += 1;
        }

        total_hp += occ_hp;
        total_maxhp += occ_maxhp;
        total_count += 1;
    }

    var ocsum = _occupants.getElementsByClassName('fulltable')[0];
    var ocsum_tbody = ocsum.getElementsByTagName('tbody')[0];
    var ocsum_tr = ocsum_tbody.getElementsByTagName('tr')[0];
    var ocsum_td = ocsum_tr.getElementsByTagName('td')[0];
    ocsum_td.innerHTML = '<span class="il">Occupants:</span> ' + total_count
                         + ' (F:' + friendly_hp  + ') '
                         + ' (H:' + other_hp + ') ';
}

function updateOpets() {
    var _occupants = document.getElementById('opets');
    if(_occupants === null)
        return;
    var formtables = _occupants.getElementsByClassName('formtable');
    if(formtables.length === 0)
        return;
    var occtable = formtables[0];
    var ocnames = occtable.getElementsByClassName('ocname');

    var ocsum = _occupants.getElementsByClassName('fulltable')[0];
    var ocsum_tbody = ocsum.getElementsByTagName('tbody')[0];
    var ocsum_tr = ocsum_tbody.getElementsByTagName('tr')[0];
    // Always expand the Pets view to show all pets
    if(ocsum_tr.getElementsByTagName('td').length > 1) {
        unsafeWindow.refreshPets('-1', '0', 'mrh');
        return;
    }

    var total_hp = 0;
    var total_maxhp = 0;
    var total_count = 0;
    var friendly_hp = 0;
    var friendly_maxhp = 0;
    var friendly_count = 0;
    var other_hp = 0;
    var other_maxhp = 0;
    var other_count = 0;
    for(var i = 0; i < ocnames.length; i++) {
        var ocname = ocnames[i];
        var occd = ocname.parentNode.parentNode.getElementsByClassName('occd')[0];
        var ocdn = occd.getElementsByClassName('ocdn');
        var hpinfo = occd.innerHTML.match(/Hit Points:\s*<\/b>\s*(\d+)\/(\d+)\s*<br>/i);

        var occ_id = occd.id.match(/ocpd-(\d+)/i)[1];
        var occ_class = ocname.getElementsByTagName('a')[0].className;
        var occ_name = ocdn[0].innerHTML;
        var occ_hp = parseInt(hpinfo[1], 10);
        var occ_maxhp = parseInt(hpinfo[2], 10);

        if(occ_class === 'plf' || occ_class === 'plfr' || occ_class === 'pla' ) {
            friendly_hp += occ_hp;
            friendly_maxhp += occ_maxhp;
            friendly_count += 1;
        } else {
            other_hp += occ_hp;
            other_maxhp += occ_maxhp;
            other_count += 1;
        }

        total_hp += occ_hp;
        total_maxhp += occ_maxhp;
        total_count += 1;
    }

    var ocsum_td = ocsum_tr.getElementsByTagName('td')[0];
    ocsum_td.innerHTML = '<span class="il">Pets:</span> ' + total_count
                         + ' (F:' + friendly_hp  + ') '
                         + ' (H:' + other_hp + ') ';
}

// Hook into jQuery's load call to catch panel reloads
var jQuery_fn_load = unsafeWindow.jQuery.fn.load;
unsafeWindow.jQuery.fn.load = function(url, params, callback) {
    var is_occupants = false;
    var is_opets = false;
    if(url.match(/\/map\/occupants\/index.do/i)) {
        is_occupants = true;
    } else if(url.match(/\/map\/opets\/index.do/i)) {
        is_opets = true;
    } else if(url.match(/\/map\/ping.do/i)) {
        is_occupants = true;
        is_opets = true;
    }

    if(!is_occupants && !is_opets)
        return jQuery_fn_load.apply(this, arguments);

    // Perform the same argument magic that jQuery does
    callback = callback || function(){};

    // If the second parameter was provided
    // If it's a function
    if(params && unsafeWindow.jQuery.isFunction(params)) {
        // We assume that it's the callback
        callback = params;
        params = null;
    }

    return jQuery_fn_load.apply(this, [url, params,
        function() {
            var result = callback.apply(callback, arguments);
            try {
                if(is_occupants)
                    updateOccupants();
                if(is_opets)
                    updateOpets();
            } catch(err) { }
            return result;
        }]);
}

updateOccupants();
updateOpets();

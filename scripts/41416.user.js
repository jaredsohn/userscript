// ==UserScript==
// @name           Nexus War Injured List
// @namespace      http://userscripts.org/users/79156
// @author         Scott Dial
// @description    Insert a list of injured players into the status boxes with the current HP and a link to heal each player.
// @include        http://www.nexuswar.com/map/*.do
// @include        http://nexuswar.com/map/*.do
// ==/UserScript==

var skin_path = unsafeWindow.pO.src.toString().split('/').slice(0, -1).join('/');

function showErrorBox(message) {
    var resultsbox = document.getElementById('resultsbox');
    if(resultsbox) {
        resultsbox.style.display = 'none';
    }

    var errorbox = document.getElementById('errorbox');
    if(!errorbox) {
        errorbox = document.createElement('div');
        errorbox.id = 'errorbox';

        var mapmain = document.getElementById('mapmain');
        var actions = document.getElementById('actions');

        mapmain.insertBefore(errorbox, actions);
    }

    errorbox.innerHTML =
        '<div class="mboxtitle">' +
        ' Error' +
        ' <div style="float:right; right:2px; margin-top:-15px;">' +
        '<a href="javascript:closeMessages()">' +
        '<img src="' + skin_path + '/pane-close.gif" ' +
        'width="11" height="11" alt="" /></a></div>' +
        '</div>' +
        '<div class="micon">' +
        ' <img src="/r/i/ch/messages/alert-32.png" width="32" height="32" />' +
        '</div>' +
        '<div class="mdata">' +
        message + '<br />' +
        '</div>' +
        '<div class="clearfix"></div>';
}

function createInjured() {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#injured {margin-bottom: 5px; padding: 3px; width: 240px; overflow-x: hidden; overflow-y: scroll;}' +
                      '.injured_deadlink { color:#aaa; text-decoration:underline; font-weight:bold;}';
    head.appendChild(style);

    var statebox = document.getElementById('statebox');
    var occupants = document.getElementById('occupants');
    var insertloc = occupants.nextSibling;

    var injured = document.createElement('div');
    injured.id = 'injured';
    injured.className = 'mapbox';

    var injured_bar = document.createElement('h3');
    injured_bar.innerHTML = '<img id="image-injured" height="7" width="7" src="' + unsafeWindow.pO.src.toString() + '"/> Injured';
    injured_bar.setAttribute('onclick', 'openPane("injured")');

    statebox.insertBefore(injured, insertloc);
    statebox.insertBefore(injured_bar, injured);
}

function updateInjured() {
    var _occupants = document.getElementById('occupants');
    var occtable = _occupants.getElementsByClassName('formtable')[0];
    var ocnames = occtable.getElementsByClassName('ocname');

    var ocsum = _occupants.getElementsByClassName('fulltable')[0];
    var ocsum_tbody = ocsum.getElementsByTagName('tbody')[0];
    var ocsum_tr = ocsum_tbody.getElementsByTagName('tr')[0];
    // Always expand the Occupants view to show all pets
    if(ocsum_tr.getElementsByTagName('td').length > 1) {
        unsafeWindow.refreshOccupants('-1', '0', 'mrh')
        return;
    }

    var injured = document.getElementById('injured');

    injured.innerHTML = '';

    var table = document.createElement('table');
    table.id = 'injuredtable';
    table.className = 'formtable';
    injured.insertBefore(table, null);

    var thead = document.createElement('thead');
    table.insertBefore(thead, null);

    thead.innerHTML = '<tr class="headerRow">' +
                      '<th class="left" width="180">Name</th>' +
                      '<th class="nowrap" width="60">HP</th>' +
                      '<th>&nbsp;</th>' +
                      '<th>&nbsp;</th>' +
                      '</tr>';

    var tbody = document.createElement('tbody');
    table.insertBefore(tbody, null);

    var occupants = [];
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

        if(occ_hp < occ_maxhp) {
            occupants.push({
                id: occ_id,
                class_: occ_class,
                name: occ_name,
                hp: occ_hp,
                maxhp: occ_maxhp,
            });
        }
    }

    if(occupants.length === 0) {
        var tr = document.createElement('tr');

        var td = document.createElement('td');
        td.innerHTML = '(None)';
        tr.appendChild(td);

        td = document.createElement('td');
        tr.appendChild(td);

        td = document.createElement('td');
        tr.appendChild(td);

        td = document.createElement('td');
        tr.appendChild(td);

        tbody.appendChild(tr);
    } else {
        var have_fak = (document.getElementById('occd-fak') != null);

        occupants.sort(function(a, b) {
            var a_missing = a.maxhp - a.hp;
            var b_missing = b.maxhp - b.hp;
            return (b_missing - a_missing);
        });

        for(i = 0; i < occupants.length; i++) {
            var occ = occupants[i];

            tr = document.createElement('tr');

            td = document.createElement('td');
            td.innerHTML = '<div class="ocname"><a class="' + occ.class_ + '" ' +
                           'onmouseover="ori(\'' + occ.id + '\')" ' +
                           'onmouseout="oro()" ' +
                           'href="javascript:occd(\'' + occ.id + '\')">' +
                           occ.name + '</a></div>';
            tr.appendChild(td);

            td = document.createElement('td');
            td.style.textAlign = 'right';
            td.innerHTML = occ.hp + ' / ' + occ.maxhp;
            tr.appendChild(td);

            td = document.createElement('td');
            if(have_fak)
                td.innerHTML = '<a href="javascript:healInjured(\'' + occ.id + '\')">FAK</a>';
            else
                td.innerHTML = '<span class="injured_deadlink">FAK</a>';
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerHTML = '<a href="javascript:occd(\'' + occ.id + '\')">&gt;&gt;</a>';
            tr.appendChild(td);

            tbody.appendChild(tr);
        }
    }
}

unsafeWindow.healInjured = function(occ_id) {
    try {
        var occd_fak = document.getElementById('occd-fak');
        var occd_fak_targetID = document.getElementById('occd-fak-targetID');
        var occd_fak_form = occd_fak.getElementsByTagName('form')[0];
        occd_fak_targetID.value = occ_id;
        occd_fak_form.submit();
    } catch(e) {
        showErrorBox('You cannot heal someone without a First Aid Kit.');
    }
};

// Hook into jQuery's load call to catch panel reloads
var jQuery_fn_load = unsafeWindow.jQuery.fn.load;
unsafeWindow.jQuery.fn.load = function(url, params, callback) {
    if(!url.match(/\/map\/occupants\/index.do/i))
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
                updateInjured();
            } catch(err) { }
            return result;
        }]);
}

createInjured();
updateInjured();

// ==UserScript==
// @name         Osimulate Fleet Manager
// @namespace    http://mp.udkm.ch
// @version      0.1
// @description  Ability to save and load fleets in osimulate
// @match        http://osimulate.com/*
// @match        http://www.osimulate.com/*
// @copyright    2012+, Alex Murray
// ==/UserScript==

function atd() {
    var td = document.createElement('td');
    if (arguments[0] !== '') {
        td.setAttribute('style', arguments[0]);
    }
    return td;
}

function atr() {
    var tr = document.createElement('tr');
    return tr;
}

function as() {
    var span = document.createElement('span');
    if (arguments[0] !== '') {
        span.setAttribute('class', arguments[0]);
    }
    return span;
}

function ai() {
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    if (arguments[0] !== '') {
        input.setAttribute('id', arguments[0]);
    }
    return input;
}

function atn() {
    var textNode = document.createTextNode(arguments[0]);
    return textNode;
}

function addLoadList() {
    
// TODO dropdown
}

function addShipList() {
    var i = 0;
    var kt = atn('Kleiner Transporter');
    var gt = atn('Grosser Transporter');
    var lj = atn('Leichter Jaeger');
    var sj = atn('Schwerer Jaeger');
    var xr = atn('Kreuzer');
    var ss = atn('Schlachtschiff');
    var ks = atn('Kolonieschiff');
    var rx = atn('Recycler');
    var sp = atn('Spionagesonde');
    var bb = atn('Bomber');
    var zr = atn('Zerstoerer');
    var ts = atn('Todesstern');
    var sx = atn('Schlachtkreuzer');
    var ships = new Array(kt, gt, lj, sj, xr, ss, ks, rx, sp, bb, zr, ts, sx);
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    
    table.setAttribute('cellspacing', '1');
    table.setAttribute('cellpadding', '1');
    table.setAttribute('width', '100%');
    table.setAttribute('border', '0');
    
    var tra = atr();
    var tdna = atd();
    var tdia = atd();
    var spna = as();
    var inpa = ai('fleet-name');
    spna.appendChild(atn('Speichername'));
    tdna.appendChild(spna);
    tdia.appendChild(inpa);
    tra.appendChild(tdna);
    tra.appendChild(tdia);
    tbody.appendChild(tra);

    while (i < 13) {
        var tr = atr();
        var tdn = atd();
        var tdi = atd();
        var spn = as();
        var inp = ai('field'+i);
        spn.appendChild(ships[i]);
        tdn.appendChild(spn);
        tdi.appendChild(inp);
        tr.appendChild(tdn);
        tr.appendChild(tdi);
        tbody.appendChild(tr);
        i++;
    }

    table.appendChild(tbody);

    return table;
}

function addFleetSaveBox() {
    var box = document.createElement('div');
    var boxHeader = document.createElement('div');
    var boxHeaderWrap = document.createElement('div');
    var boxHeaderText = atn('Fleet-Saver');
    var saveButton = document.createElement('button');
    var saveButtonWrap = document.createElement('span');
    var saveButtonSpan = document.createElement('span');
    var saveButtonText = atn('Save');
    var table = addShipList();

    boxHeaderWrap.setAttribute('style', 'font-size:medium;text-align:center;padding:5px 0 5px 0;clear:both;');
    boxHeaderWrap.appendChild(boxHeaderText);

    boxHeader.setAttribute('class', 'ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
    boxHeader.appendChild(boxHeaderWrap);
    
    saveButton.setAttribute('class', 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-hover');
    saveButton.setAttribute('role', 'button');
    saveButton.setAttribute('aria-disabled', 'false');
    saveButton.setAttribute('onclick', 'javascript:saveFleetList()');
    saveButtonWrap.setAttribute('class', 'ui-button-text');
    saveButtonSpan.appendChild(saveButtonText);
    saveButtonWrap.appendChild(saveButtonSpan);
    saveButton.appendChild(saveButtonWrap);
    
    box.setAttribute('id', 'fleet-saver');
    box.setAttribute('class', 'ui-widget ui-widget-content ui-corner-all');
    box.setAttribute('style', 'width:250px;position:absolute;top:700px;left:0px;');

    box.appendChild(boxHeader);
    box.appendChild(table);
    box.appendChild(saveButton);
    
    document.body.appendChild(box);
}

function addFleetLoadBox() {
    var box = document.createElement('div');
    var boxHeader = document.createElement('div');
    var boxHeaderWrap = document.createElement('div');
    var boxHeaderText = atn('Fleet-Loader');
    var loadButton = document.createElement('button');
    var loadButtonWrap = document.createElement('span');
    var loadButtonSpan = document.createElement('span');
    var loadButtonText = atn('Load');
    var loadIntoDropDown = addLoadList();

    boxHeaderWrap.setAttribute('style', 'font-size:medium;text-align:center;padding:5px 0 5px 0;clear:both;');
    boxHeaderWrap.appendChild(boxHeaderText);

    boxHeader.setAttribute('class', 'ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
    boxHeader.appendChild(boxHeaderWrap);

    box.setAttribute('id', 'fleet-loader');
    box.setAttribute('class', 'ui-widget ui-widget-content ui-corner-all');
    box.setAttribute('style', 'width:250px;position:absolute;top:700px;left:250px;');

    box.appendChild(boxHeader);
    
    loadButton.setAttribute('class', 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-hover');
    loadButton.setAttribute('role', 'button');
    loadButton.setAttribute('aria-disabled', 'false');
    loadButton.setAttribute('onclick', 'javascript:saveFleetList()');
    loadButtonWrap.setAttribute('class', 'ui-button-text');
    loadButtonSpan.appendChild(loadButtonText);
    loadButtonWrap.appendChild(loadButtonSpan);
    loadButton.appendChild(loadButtonWrap);
    box.appendChild(loadButton);
    
    document.body.appendChild(box);
}

function saveFleetList() {
    var i = 0;
    var name = document.getElementById('fleet-name').value;
    var expire = new Date();
    var fields = new Array();
    for (i=0;i<13;i++) {
        fields[i] = (document.getElementById('field'+i).value == '') ? '0' : document.getElementById('field'+i).value;
    }
    
    expire.setTime(expire.getTime()+(1000*60*60*24*365*5));
    
    document.cookie = 'osim_fleetmngr_' + name + "=" + escape(fields.join(';')) + "; path=/" + ((expire == null) ? "" : "; expires=" + expire.toGMTString());
    
    for (i=0;i<13;i++) {
        document.getElementById('field'+i).value = '';
    }
    document.getElementById('fleet-name').value = '';
}

addFleetSaveBox();
addFleetLoadBox();
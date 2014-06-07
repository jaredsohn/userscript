// ==UserScript==
// @name           DS - Pump Ressis
// @namespace      Die Staemme
// @description    erweitert den Marktplatz, so dass man der Reihe nach Ressis von einem Spieler zum anderen schicken kann
// @author	       ais
// @include        http://*.staemme.ch/*
// @version        0.1
// ==/UserScript==


function getElementsByPath(arg0, arg1) {

    if (!arg1) var arg1 = document;

    var path = document.evaluate(arg0, arg1, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var stack = [];
    for (var i = 0; i < path.snapshotLength; i++) {
        stack.push(path.snapshotItem(i));
    }

    return stack;
}

var DummyVillage = {
    name: "ais",
    coords: new Coords(123, 456),
    points: 12345,
    x: 0,
    y: 0,
    wood: 1,
    stone: 2,
    iron: 3,
    storage: 4,
    time: 4
}

const nameSeparator = "%&%&%&";
const lineSeparator = "%;%;%;";
const villageGMIdentifier = "ds_pump_resources";
const lastVillageGMIdentifier = "ds_pump_resources_last_village";
const accessKey = '1';

function Village(name, coords, points) {
    if (coords == undefined) {
        // 1st constructor
        var arg0 = name;

        //text to parse:   foobar %&%&%&572|834:39279-17091-30139aaa400000;
        this.name = arg0.substring(0, arg0.indexOf(nameSeparator));
        arg0 = arg0.substring(arg0.indexOf(nameSeparator) + 6, arg0.length);
        var x = arg0.substring(0, arg0.indexOf("|"));
        var y = arg0.substring(arg0.indexOf("|") + 1, arg0.indexOf(":"));
        this.coords = new Coords(x, y);
        this.points = arg0.substring(arg0.indexOf(":") + 1, arg0.length);
    } else {
        // 2nd constructor
        this.name = name;
        this.coords = coords;
        this.points = points;
    }

    this.toString = function() {
        return "Village (name = " + this.name + ", coords = " + this.coords.toString() + ", points = " + this.points + ")";
    }

    this.serialize = function () {
        return this.name + nameSeparator + this.coords + ":" + this.points + lineSeparator;
    }
}

function Coords(x, y) {
    if (y == undefined) {
        // 1st constructor
        var arg0 = x;

        this.x = arg0.substring(0, arg0.indexOf("|"));
        this.y = arg0.substring(arg0.indexOf("|") + 1, arg0.length);
    } else {
        this.x = x;
        this.y = y;
    }

    this.equals = function(other) {
        return other.x == this.x && other.y == this.y;
    }

    this.toString = function() {
        return "(" + this.x + "|" + this.y + ")";
    }
}

function parseVillages() {
    var vistables = getElementsByPath('//table[contains(@class, "vis ")]');

    var villages = [];

    var villageTable = vistables[1];
    var rows = villageTable.getElementsByTagName("tr");
    for each (var row in rows) {
        var cells = row.getElementsByTagName("td");
        // skip header
        if (cells.length != 0) {
            var name = cells[0].textContent;
            var coords = cells[1].textContent;
            var points = cells[2].textContent;
            var village = new Village(name, coords, points);
            villages.push(village);
        }
    }

//    alert("parsed data from: " + villages.length + " villages");

    //show the user what we have done...
    var position = villageTable.getElementsByTagName("th")[0];
    var popup = document.createTextNode(" von " + villages.length + " Doerfern eingelesen");
    position.appendChild(popup);

    return villages;
}

function saveVillages(villages) {
    // TODO: add player name and time
    var text = "";

    for each (var village in villages) {
        text += village.serialize();
    }

    GM_setValue(villageGMIdentifier, text);
}

function loadVillages() {
    villages = new Array();
    var data = GM_getValue(villageGMIdentifier);

    if (data != null) {
        var villageStrings = data.split(lineSeparator);
        for each (var str in villageStrings) {
            var village = new Village(str);
            villages.push(village);
        }
    }
    // alert("read data from: " + villages.length + " villages");
    return villages;
}

function loadLastVillage() {
    var lastVillage = GM_getValue(lastVillageGMIdentifier);
    return lastVillage == undefined ? 0 : lastVillage;
}

function saveLastVillage(lastVillage) {
    GM_setValue(lastVillageGMIdentifier, lastVillage);
}

// read village list from player and stores them via GM_setValue
if (location.href.match('screen=info_player')) {
    var villages = parseVillages();
    saveVillages(villages);
}

//marketplace
if (location.href.match("screen=market")) {

    var tabs = getElementsByPath('//td[contains(@class, "selected")]');
    if (tabs == '') { //confirm page
        var vistables = getElementsByPath('//form[contains(@action, "")]');
        var form = vistables[0].getElementsByTagName('input');
        var okButton = form[0];
        okButton.value = '1 - » OK «';
        okButton.setAttribute('accesskey', accessKey);
        okButton.addEventListener('click', function() {
            var villages = loadVillages();

            var vistables = getElementsByPath('//table[contains(@class, "vis")]');
            var destination = vistables[0].getElementsByTagName("td")[1].textContent;
            var c0 = destination.replace(/^\s+/, '').replace(/\s+$/, '');
            var coordsText = c0.substring(c0.lastIndexOf('(') + 1, c0.lastIndexOf(')'));

            var coords = new Coords(coordsText);

            // find index of village with these coords
            for (var i = 0; i < villages.length; i++) {
                var village = villages[i];
                if (village.coords.equals(coords)) {
                    saveLastVillage(i);
                }
            }
        }, false);
    }
    else {
        var selectedTab = tabs[0].textContent;
        if (selectedTab.match("verschicken")) {

            var vistables = getElementsByPath('//table[contains(@class, "vis")]');

            var tradertxt = vistables[1].getElementsByTagName("th")[0].textContent;
            var trader = tradertxt.substring(tradertxt.indexOf(':') + 2, tradertxt.indexOf('/'));

            if (trader > 0) {
                //get resources from current village and calc ressources
                var v_holz = parseInt(document.getElementById("wood").textContent);
                var v_lehm = parseInt(document.getElementById("stone").textContent);
                var v_eisen = parseInt(document.getElementById("iron").textContent);

                // optimal ratio for one coin
                var ratio_holz = 28;
                var ratio_lehm = 30;
                var ratio_eisen = 25;

                const traderCapacity = trader * 1000;
                const units = traderCapacity / (ratio_holz + ratio_lehm + ratio_eisen);

                var lehm = 0, holz = 0, eisen = 0;
                var spareCapacity = traderCapacity;
                var done = true;
                do {

                    done = true;

                    // 1. priority: clay
                    if (spareCapacity > 0) {
                        var mehr_lehm = Math.min(v_lehm, lehm + Math.min(spareCapacity, ratio_lehm));

                        if (lehm != mehr_lehm) {
                            lehm = mehr_lehm;
                            spareCapacity = traderCapacity - (lehm + holz + eisen);
                            done = false;
                        }
                    }

                    // 2. priority: wood
                    if (spareCapacity > 0) {
                        var mehr_holz = Math.min(v_holz, holz + Math.min(spareCapacity, ratio_holz));

                        if (holz != mehr_holz) {
                            holz = mehr_holz;
                            spareCapacity = traderCapacity - (lehm + holz + eisen);
                            done = false;
                        }
                    }

                    // 3. priority: iron
                    if (spareCapacity > 0) {
                        var mehr_eisen = Math.min(v_eisen, eisen + Math.min(spareCapacity, ratio_eisen));

                        if (eisen != mehr_eisen) {
                            eisen = mehr_eisen;
                            spareCapacity = traderCapacity - (lehm + holz + eisen);
                            done = false;
                        }
                    }

                } while (!done);

                var villages = loadVillages();
                if (villages.length >= 0) { // we've found a destination so lets render a button
                    var lastVillageIdx = loadLastVillage();
                    var destination = villages[(lastVillageIdx + 1) % villages.length];
                    var thetable = vistables[2];
                    var tr = new Array();

                    tr[0] = document.createElement("tr");

                    tr[1] = document.createElement("tr");

                    var td = new Array();

                    td[0] = document.createElement("td");

                    td[1] = document.createElement("td");

                    var div = document.createElement("div");
                    div.id = "dpreview";
                    div.innerHTML = "<hr><b>Pump Ressis:</b><br/><span id='pumpressis'><img src='/graphic/holz.png?1'>" + holz + "<br/><img src='/graphic/lehm.png?1'>" + lehm + "<br/><img src='/graphic/eisen.png?1'>" + eisen + "<br/>transportieren nach<br/><b>" + destination.name + "</b><br/>" + destination.coords + "<br>Punkte:" + destination.points + "</span><hr>";

                    td[0].appendChild(div);

                    var butt = document.createElement('button');
                    butt.setAttribute('type', 'button');
                    butt.setAttribute('style', 'font-size:8pt;');
                    butt.appendChild(document.createTextNode('1 - transportieren!'));
                    butt.setAttribute('onclick', "insertNumber(document.forms[0].wood, " + holz + ");insertNumber(document.forms[0].stone, " + lehm + ");insertNumber(document.forms[0].iron, " + eisen + ");insertNumber(document.forms[0].inputx, " + destination.coords.x + ");insertNumber(document.forms[0].inputy, " + destination.coords.y + ");document.forms[0].submit();");
                    butt.setAttribute('accesskey', accessKey);
                    td[1].appendChild(butt);

                    tr[0].appendChild(td[0]);
                    tr[1].appendChild(td[1]);

                    thetable.appendChild(tr[0]);
                    thetable.appendChild(tr[1]);
                }
            } else {
                var thetable = vistables[2];
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.innerHTML = "Pump Ressis:<br/>Keine Haendler verfuegbar!";

                var butt = document.createElement('button');
                butt.setAttribute('type', 'button');
                butt.setAttribute('style', 'font-size:8pt;');
                butt.appendChild(document.createTextNode('1 - » fuck it, naechstes «'));
                butt.setAttribute('accesskey', accessKey);
                butt.addEventListener('click', function() {
                    // click next button
                    window.location.href = next_village();
                }, false);
                td.appendChild(butt);
                tr.appendChild(td);
                thetable.appendChild(tr);

            }
        }
    }
}

function next_village() {
    var storage_link = getElementsByPath('//a[contains(@href, "screen=storage")]').toString();
    var market_link = storage_link.replace(/screen\=storage/g, "screen=market");
    var next_market_link = market_link.replace(/village\=/g, "village=n");
    return next_market_link;
}

function _keyPressed(evt) {
    try {
        var theKey = String.fromCharCode(evt.keyCode);
        var buttons = document.getElementsByTagName('button');

        for each (var button in buttons) {
            if (theKey == button.getAttribute('accesskey')) {
                try {
                    button.click();
                    break;
                } catch(evt) {
                }
            }
        }

        var inputs = document.getElementsByTagName('input');

        for each (var button in inputs) {
            if (button.type == 'submit') {
                if (theKey == button.getAttribute('accesskey')) {
                    try {
                        button.click();
                        break;
                    } catch(evt) {
                    }
                }
            }
        }
    } catch(evt) {
        if (debug) alert('pump ressis\n\n' + evt);
        return false;
    }
}

document.addEventListener('keyup', _keyPressed, false);
window.addEventListener('load', main, true);
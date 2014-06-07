// ==UserScript==
// @name           Omega-Day Script
// @description    OD Script by Memphis, modified by Kryops
// @include        *.omega-day.com/game/*
// ==/UserScript==

// GM_openInTab("http://greasemonkey.mozdev.org/")

// ============================================ Variablen anpassen ========================================================================================

// Sollen Schiffe, die in Flotten sind in der Flotten�bersicht ausgeblendet werden? (1 oder 0)
var HIDE_SHIPS_IN_FLEET = 1;

// Flottennamen werden in der Flotten�bersicht links an die Seite gequetsch. Ja = true   Nein = false
var FLEET_ALIGNLEFT=false;

// Flottennamen (in der Flotten�bersicht) umformatieren?
var FLEET_MONOSPACE=false;

var FLEET_NOWRAP=false;

// Standard-Flottenfarbe:
var color_default=color_all;

// Farbe fuer die Uhr:
// Hex-Farb-Code!
var clock_color="FFFFFF"; // original FFFFFF

// Schnelltasten im Orbit benutzen?
var USE_KEYS = true;

//Schnelltasten-Belegung im Orbit anzeigen?
var kuerzel_anzeigen = true;

// Namen fuer die Flottenfarben
var schiffe_rot = "Kampf";
var schiffe_gold = "gold";
var schiffe_gruen = "Transen";
var schiffe_blau = "blau";
var schiffe_oliv = "oliv";
var schiffe_weiss = "Kolos";
var schiffe_orange = "orange";
var schiffe_pink = "pink";
var schiffe_violett = "violett";
var schiffe_himmelblau = "himmelblau";
var schiffe_dunkelblau = "dunkelblau";


// Favouriten beim Schiffsversand
// Format: '<NAME>', '<Planni-ID>',
// Nach dem letztem kein Komma!
var myLinks = new Array(
);

// Favouriten f�r Schiffsverkauf:
// Format: '<angezeigter Name>', '<Credits>', '<Spielername>'
// Spielername kann auch 'Alle' sein
// Nach dem letztem kein Komma ganz hinten!
var mySales = new Array(
);

// Gateliste
// Format: '<Name>', '<Gatecode>', '<Plani-ID>',
// Nach dem letztem kein Komma ganz hinten!
var myGates = new Array(
);

var myAusbau = new Array(
);

//  ============================= Nicht mehr editieren =============================

// Farben
var color_gold="CE9A63";
var color_green="00FF00";
var color_red="FF0000";
var color_blue="8844FF";
var color_all="all";

// Infos
var info_url="http://oddb.kryops.de/index.php";

var ComleteHTML = "<html>\n"+document.getElementsByTagName('html')[0].innerHTML+"\n</html>";


//  ============================================ CODE START ========================================================================================
// Das ganze in Gang bringen..
main();
function main() {
  modifyHeader();
  controlLayer(5,5);
  igmlinks();
}
	
// ============================================ modifyHeader ========================================================================================

function modifyHeader() {
    var myHead = document.getElementsByTagName('head')[0];
    var myScript = document.createElement('script');
    myScript.setAttribute("language", "JavaScript");
    var myScriptNode = document.createTextNode("\n<!--\n" + hideShow + "\n" + sell + "\n" + showFleet + "\n" + jumpCode + "\n" + selectArmada + "\n" + myEscape + "\n" + saveGlobals + "\n" + selectAll + "\n" + renameFleet + rename + "\n" + encode26 + "\n" + decode26 + "\n" + "//-->\n");
    myScript.appendChild(myScriptNode);
    myHead.parentNode.appendChild(myScript);
}



function decode26(val) {
	var count = 0;
	var length = val.length;
	for(var i=1;i<=length;i++) {
		var el = letters[val.substring((length-i), (length-i+1))];
		count += el*Math.pow(26, (i-1));
	}
	return count;
}

function encode26(val) {
	for(var i in letters) {
		if(i && letters[i] == val) {
			return i;
		}
	}
	return val;
}

function rename(name) {
	var valid = name.search(/^([A-Z]+)(?:[^A-Z0-9]+)(\d+)(?:[^A-Z0-9]+)([A-Z]+)$/i);
	if(valid != -1) {
		var data = name.match(/^([A-Z]+)(?:[^A-Z0-9]+)(\d+)(?:[^A-Z0-9]+)([A-Z]+)$/i);
		var antrieb = decode26(data[1]);
		var schiff = encode26(data[2]);
		var angriff = decode26(data[3]);
		return antrieb+'---'+schiff+'---'+angriff;
	}
	return name;
}

function renameFleet() {
	letters = new Object();
letters["A"] = 1;
letters["B"] = 2;
letters["C"] = 3;
letters["D"] = 4;
letters["E"] = 5;
letters["F"] = 6;
letters["G"] = 7;
letters["H"] = 8;
letters["I"] = 9;
letters["J"] = 10;
letters["K"] = 11;
letters["L"] = 12;
letters["M"] = 13;
letters["N"] = 14;
letters["O"] = 15;
letters["P"] = 16;
letters["Q"] = 17;
letters["R"] = 18;
letters["S"] = 19;
letters["T"] = 20;
letters["U"] = 21;
letters["V"] = 22;
letters["W"] = 23;
letters["X"] = 24;
letters["Y"] = 25;
letters["Z"] = 26;
	
	
	var rows = document.getElementById("allyfltab").getElementsByTagName("tr");
	for(var i=3;i<rows.length-3;i++) { // rows.length
		var row = rows[i];
		//
		var content = row.childNodes[2].innerHTML.match(/^(.+)>(.+)<\/font>/);
		var name = content[2];
		
		
		row.childNodes[2].innerHTML = content[1]+">"+rename(name)+"</font>";
		/*
		if(row.style.display != "none") {
			var pattern = /name=\"fleetbox(\d+)\"/i;
			var ids = pattern.exec(row.innerHTML);
			void(eval('document.AllyFlform.fleetbox'+ids[1]+'.checked = true'));
		}
		else {
			var pattern = /name=\"fleetbox(\d+)\"/i;
			var ids = pattern.exec(row.innerHTML);
			void(eval('document.AllyFlform.fleetbox'+ids[1]+'.checked = false'));
		}
		*/
	}
}



function hideShow(id, show) {
    if(show == 1) {
        document.getElementById(id).style.display = '';
    } else {
        document.getElementById(id).style.display = 'none';
    }
}

function sell(prize, name) {
    aller(1);
    sellit();
    document.forms["Formular7"].elements["schiffverkaufenpreis"].value = prize;
    document.forms["Formular7"].elements["diran"].value = name;
    document.forms["Formular7"].submit();
    }

    function showFleet(farbe) {
    var flForm = document.getElementsByName('AllyFlform')[0];
    var flTable = flForm.getElementsByTagName('table')[1];
    var flRows = flTable.getElementsByTagName('tr');

    for (var i=1; i < flRows.length; i++) {
        var flFont = flRows[i].getElementsByTagName('font')[0];

        var reg = new RegExp(farbe,'i');
        var reg_all = new RegExp('all','i');

        if (flFont.getAttribute('color').match(reg) || farbe.match(reg_all)) {
            flRows[i].style.display = '';
        } else {
            flRows[i].style.display = 'none';
        }
    }
    if (!window.globals) window.globals = new Object();
    window.globals["fleet_last_color"] = farbe;
    saveGlobals(window.globals);
    return;
}

function jumpCode(code) {
    aller(1);
    jump();
    if(code) {
        document.forms["Formular8"].elements["jumploc"].value = code;
    }
    document.forms["Formular8"].submit();
}

function selectArmada() {
    var flRows = document.getElementsByName('AllyFlform')[0];
    flRows = flRows.getElementsByTagName('table')[1];
    flRows = flRows.getElementsByTagName('tr');

    var ort = null;
    var zeit = null;
    for (var i=1;i<flRows.length && !ort;i++) {
        if (flRows[i].getElementsByTagName('input')[0].checked) {
            var cells = flRows[i].getElementsByTagName('td');
            ort = cells[2]; while (ort.firstChild) ort = ort.firstChild; ort = ort.nodeValue;
            zeit = cells[4]; while (zeit.firstChild) zeit = zeit.firstChild; zeit = zeit.nodeValue;
        }
    }

    for (var i=1;i<flRows.length;i++) {
        var cells = flRows[i].getElementsByTagName('td');
        myOrt = cells[2]; while (myOrt.firstChild) myOrt = myOrt.firstChild; myOrt = myOrt.nodeValue;
        myZeit = cells[4]; while (myZeit.firstChild) myZeit = myZeit.firstChild; myZeit = myZeit.nodeValue;
        if (ort == myOrt && zeit == myZeit) {
            flRows[i].getElementsByTagName('input')[0].checked = true;
        }
    }
}

function selectAll() {
	var rows = document.getElementById("allyfltab").getElementsByTagName("tr");
	for(var i=3;i<rows.length;i++) {
		var row = rows[i];
		if(row.style.display != "none") {
			var pattern = /name=\"fleetbox(\d+)\"/i;
			var ids = pattern.exec(row.innerHTML);
			void(eval('document.AllyFlform.fleetbox'+ids[1]+'.checked = true'));
		}
		else {
			var pattern = /name=\"fleetbox(\d+)\"/i;
			var ids = pattern.exec(row.innerHTML);
			void(eval('document.AllyFlform.fleetbox'+ids[1]+'.checked = false'));
		}
	}
}

function myEscape(string) {
    var ret = encodeURIComponent(string);
    var toEsc = "-_@";
    for (var i=0;i<toEsc.length;i++) {
        var num = toEsc.charCodeAt(i).toString(16);
        if (num.length < 2) num = "0"+num;
        eval("var RE = /"+toEsc.charAt(i)+"/g;");

        ret = ret.replace(RE,"%"+num);
    }
    toEsc = "*+./";
    for (var i=0;i<toEsc.length;i++) {
        var num = toEsc.charCodeAt(i).toString(16);
        if (num.length < 2) num = "0"+num;
        eval("var RE = /\\"+toEsc.charAt(i)+"/g;");

        ret = ret.replace(RE,"%"+num);
    }
    return ret.replace(/%/g,'_');
}

function saveGlobals(glob) {
    var parts = new Array();
    for (var key in glob) {
        var val = glob[key];
        if (key && val)    {
            parts.push(myEscape(key));
            parts.push(myEscape(val));
        }
    }
    window.name = parts.join("__");
}

// ============================================ controlLayer ========================================================================================
function controlLayer(left, top) {
    var controlDiv = document.createElement('div');
    controlDiv.setAttribute('name' ,'control');
    controlDiv.setAttribute('style' ,'position:absolute; top:'+top+'px; left:'+left+'px;');

    var xTop = document.createElement('a');
    xTop.setAttribute('href','javascript:hideShow(\"infosys\", \"0\");');
    var xTopText = document.createTextNode('Off');
    xTop.appendChild(xTopText);
    controlDiv.appendChild(xTop);

    controlDiv.appendChild(document.createElement('br'));

    var oTop = document.createElement('a');
    oTop.setAttribute('href','javascript:hideShow(\"infosys\", \"1\");');
    var oTopText = document.createTextNode('On');
    oTop.appendChild(oTopText);
    controlDiv.appendChild(oTop);


// = 2. X/O oben rechts (aber ohne funktion)
//    var xGate = document.createElement('a');
//       xGate.setAttribute('href','javascript:hideShow(\"gates\", \"0\");');
//    var xGateText = document.createTextNode('X');
//    xGate.appendChild(xGateText);
//    controlDiv.appendChild(xGate);

//    var oGate = document.createElement('a');
//    oGate.setAttribute('href','javascript:hideShow(\"gates\", \"1\");');
//    var oGateText = document.createTextNode('O');
//    oGate.appendChild(oGateText);
//    controlDiv.appendChild(oGate);

    document.getElementsByTagName('body')[0].appendChild(controlDiv);
}

// ============================================ igmlinks ========================================================================================

function igmlinks() {

    if ( document.URL.indexOf("?") < 0) {
    return;
    }

// Werbung? Seite neu laden!
      if(ComleteHTML.indexOf('Kleine Werbeunterbrechung da du keinen Vollaccount') > 0)
      {
            location.reload();
      }

    if ( window.location.search.indexOf("fleet") >=0 ) {
        infoLayer('fleet');
    } else if ( window.location.search.indexOf("send") >=0 ) {
            infoLayer('send');
    } else {
        infoLayer('nofleet');
    }

//Aktiviert die Farbe f�r die Uhr
    var Farbuhr = document.getElementById('Zeiter');
      Farbuhr.setAttribute('style' ,'color: #' + clock_color + ';');

//flotten
    if ( window.location.search.indexOf("fleet") >=0 ) {
        if (HIDE_SHIPS_IN_FLEET) {
            var div3 = document.getElementById("div3");
            var div3TABLES = div3.getElementsByTagName("table");
            var div3TR = div3TABLES[2].getElementsByTagName("tr");
            for (var i=1; i < div3TR.length; i++) {
                var trTDS = div3TR[i].getElementsByTagName("td");
                var trTD = trTDS[4];
                if (trTD.innerHTML.indexOf("Flotte") > 0) {
                    div3TR[i].style.display = 'none';
                }
            }
        }

        restoreGlobals();
        var color = color_default;
        if (unsafeWindow.globals.fleet_last_color) {
          color = unsafeWindow.globals.fleet_last_color;
        }
        showFleet(color);
        customizeFleetList('AllyFlform');
        customizeFleetList('DefFFlform');
        reformatFleet();
    }

//Tastenfunktionen / Gatespr�nge / Planet in der DB anzeigen ( aus dem Orbit)  -> start
    if ( window.location.search.indexOf("orbit") >=0 ) {
    if(USE_KEYS){
        document.addEventListener('keypress', shortcutkey_handler, true);
        }
/*              //Id auspacken
        var uid;
          window.location.search.match(/(\d+)/);
        uid = parseInt(RegExp.$1);

        var table = document.getElementsByTagName('table')[28];
        var td = table.getElementsByTagName('td')[0];
        td.innerHTML = td.innerHTML + "&nbsp;<a target=\"_info"+uid+"\" href=\""+info_url+"/index.php?act=Systemfinder&func=sysansicht&plani_id="+uid+"\">Planet im Systemfinder</a>";
*/
// Verkauf und Gate Layout
        sellLayer('top:80px', 'right:20px');
        if(screen.width < 1200) {
            gateLayer('top:800px', 'left:5px');
        } else {
            gateLayer('top:130px', 'right:20px');
        }
// HILFE f�r Tastenk�rzel
            if (kuerzel_anzeigen) {
            var helptext = document.createElement('div');
            helptext.setAttribute('name' ,'helptext');
            helptext.setAttribute('id' ,'helptext');
            helptext.setAttribute('style' ,'font-weight: normal; font-size: 10px; color: #FFFFFF; position:absolute; top:140px; left:220px; width: 160px;');
            var text = "<span style=\"font-weight: bold; font-size: 12px; text-decoration: underline;\">Tastenk&uuml;rzel</span>&nbsp;<a href=\"#\" onclick=\"document.getElementById('helptext').style.display='none';\" title=\"K&uuml;rzel verbergen\">X</a><br />";
            text += "<br />T => Schiffe tarnen";
            text += "<br />S => Schiffe senden";
            text += "<br />E => Einheiten angreifen";
            text += "<br />P => Planet angreifen";
            text += "<br />A => Alle Schiffe markieren";
            text += "<br />R => Be-/Entladen";
            text += "<br />D => Sprungtor ben&uuml;�tzen";
            text += "<br />B => Toxen";
            text += "<br />Y => EMP z&uuml;nden";
            text += "<br />Z => Planet scannen";
            text += "<br />V => Schiff umbenennen";
            text += "<br />F => Flotte bilden";
            text += "<br />Q => Schiffe enttarnen";
            text += "<br /><br /><span style=\"color: #FF0000;\">Schiffe, die keinen Befehl ausf&uuml;hren sollen, m&uuml;ssen vorher getarnt oder markiert werden. Die Befehle markieren automatisch alle Schiffe!!!<br /><br />Bei Schiff umbenennen oder Direktverkauf keine Namen per Tastatur eingeben sondern Copy&amp;Paste verwenden!!!</span>";
            helptext.innerHTML = text;
            document.getElementsByTagName('body')[0].appendChild(helptext);
                   }

    }



//In der Quest�bersicht-> Plani ID in der DB aufrufen
    if ( window.location.search.indexOf("to") >=0 ) {
        var pid;
        var div = document.getElementsByTagName('div')[3];
        div.innerHTML.match(/Nummer (\d+)/);
        pid = parseInt(RegExp.$1);

        div.innerHTML = div.innerHTML.replace(/Nummer (\d+)/, 'Nummer '+pid+' (<a target="_info" href="'+info_url+'/index.php?act=Systemfinder&func=sysansicht&plani_id='+pid+'">Systemfinder</a>)');
    }


// Comms --> Schiffsconfigurator-Links suchen und zu Links machen
    if (window.location.search.indexOf("comm") >=0 ) {
        var eingang = findNode(document, "table", /Eingegangene Nachrichten/);
        var linkpattern = /(http:\/\/shipconfig.odgates.de[^<\s]*)(\s*<br>\s*)?([^<\s]*)?/i;

        var comms = findAllNodes(eingang, "td", linkpattern);
        while (comms.length>0) {
            var comm = comms.pop();
            var rest = comm.innerHTML;
            var html = "";

            while (rest.length > 0) {
                var res = linkpattern.exec(rest);
                if (res) {
                    var name = "Schiffsconfig";
                    var pos = rest.indexOf(res[0]);
                    html += rest.substring(0,pos);
                    html += "<a href=\""+res[1]+"\" target=\"_new\">"+name+"</a>";
                    rest = rest.substring(pos + res[0].length);
                } else {
                    html+=rest;
                    rest = "";
                }
            }
            comm.innerHTML = html;
        }
    }

// Comms --> Planikonfigurator Links
    if (window.location.search.indexOf("comm") >=0 ) {
        var eingang = findNode(document, "table", /Eingegangene Nachrichten/);
        var linkpattern = /(http:\/\/planconfig.odgates.de[^<\s]*)(\s*<br>\s*)?([^<\s]*)?/i;

        var comms = findAllNodes(eingang, "td", linkpattern);
        while (comms.length>0) {
            var comm = comms.pop();
            var rest = comm.innerHTML;
            var html = "";

            while (rest.length > 0) {
                var res = linkpattern.exec(rest);
                if (res) {
                    var name = "Planiconfig";
                    var pos = rest.indexOf(res[0]);
                    html += rest.substring(0,pos);
                    html += "<a href=\""+res[1]+"\" target=\"_new\">"+name+"</a>";
                    rest = rest.substring(pos + res[0].length);
                } else {
                    html+=rest;
                    rest = "";
                }
            }
            comm.innerHTML = html;
        }
    }

// Folgende Klammer stehen lassen = Ende von function igmlinks() {
}

//==============================================================================================

function restoreGlobals() {
    var parts;
    var pos = unsafeWindow.name.indexOf("__");
    if (pos>0) {
        parts = unsafeWindow.name.split("__");
    } else {
        parts = new Array();
    }
    unsafeWindow.globals = new Object();
    for (var i=0;i<parts.length-1;i+=2) {
        var key = decodeURI(parts[i].replace(/_/g,"%"));
        var val = decodeURI(parts[i+1].replace(/_/g,"%"));
        unsafeWindow.globals[key] = val;
    }
}



function reformatFleet() {
    //var flForms = new Array(document.getElementsByName('AllyFlform')[0], document.getElementsByName('DefFFlform    ')[0]);
    for (var formIt = 0;formIt<2; formIt++) {
        var flForm = document.forms[formIt];//flForms[formIt];
        var flTable = flForm.getElementsByTagName('table')[1];
        var flRows = flTable.getElementsByTagName('tr');

        for (var i=1; i< flRows.length; i++) {
            var cells = flRows[i].getElementsByTagName('td');
            if (FLEET_ALIGNLEFT) {
                cells[0].style.textAlign='left';
            }
            if (FLEET_MONOSPACE) {
                cells[0].style.fontFamily='mono';
            }
            if (FLEET_NOWRAP) for (var j=0; j<cells.length; j++) {
                cells[j].style.whiteSpace='nowrap';
            }
            var inp = cells[6].getElementsByTagName("input");
            if (inp.length) {
                inp = inp[0];
                inp.setAttribute("onclick","if (this.checked) {var node = this; while (node.tagName != 'TR') node = node.parentNode; node = node.getElementsByTagName('td')[1].getElementsByTagName('a')[0]; var id = node.href.match(/\\d+$/); window.globals.flFormLastPlaniId = id; saveGlobals(window.globals);}");
            }
        }
    }
}

function findNode(parent, type, text) {
    type = type.toUpperCase();

    var stack = new Array();
    stack.push(parent);
    var found = null;
    while (!found && stack.length > 0) {
        var node = stack.pop();
        if (node.nodeType == 3) { // wenn Textknoten
            if (node.nodeValue.match(text)) {
                found = node;
            }
        } else {
            for (var i=0;i< node.childNodes.length;i++) {
                stack.push(node.childNodes[i]);
            }
        }
    }
    if (found) {
        while (found.tagName != type && found != parent) found = found.parentNode;
    }
    return found;
}

function findAllNodes(parent, type, text) {
    //findet alle innersten Knoten vom Typ type welche einen Textknoten mit dem Text text als Nachfolger haben
    type = type.toUpperCase();

    var stack = new Array();
    stack.push(parent);
    var found = new Array();
    while (stack.length > 0) {
        var node = stack.pop();
        if (node.nodeType == 3) { // wenn Textknoten
            if (node.nodeValue.match(text)) {
                found.push(node);
            }
        } else {
            for (var i=0;i< node.childNodes.length;i++) {
                stack.push(node.childNodes[i]);
            }
        }
    }
    var result = new Array();
    while (found.length > 0) {
        var node = found.pop();
        while (node.tagName != type && node != parent) node = node.parentNode;
        var newOne = true;
        for (var i=0;i<result.length;i++) {
            if (result[i]==node) {
                newOne = false;
                break;
            }
        }
        if (newOne) {
            result.push(node);
        }
    }
    return result;
}

// px zum Layout oben zu vergeben (Verkauf und Gate Layout)
function sellLayer(ycoord, xcoord, display) {
        var sellDiv = document.createElement('div');
        sellDiv.setAttribute('name' ,'sell');
        sellDiv.setAttribute('id' ,'sell');
        sellDiv.setAttribute('style' ,'position:absolute; '+ycoord+'; '+xcoord+';');
        sellDiv.style.dislplay = display;
        var dropdown = '<strong>Schiffsverkauf:</strong><br /><select id="sellForm" class="tablebutton">';
        dropdown += '<option>Verkauf w&auml;hlen</option>';
        for (var i=0; i < mySales.length; i+=3) {
            var sellLink = document.createElement('a');
            sellLink.setAttribute("href", "javascript:sell('"+mySales[i+1]+"', '"+mySales[i+2]+"');");
            sellLink.style.fontWeight = "bold";
            var sellLinkText = document.createTextNode(mySales[i]);
            sellLink.appendChild(sellLinkText);

            dropdown += '<option onclick="sell(\''+mySales[i+1]+'\', \''+mySales[i+2]+'\');">'+ mySales[i] +'</option>';
            
        }
        dropdown += '</select>';
        sellDiv.innerHTML = dropdown; // appendChild(sellLink)
        // sellDiv.appendChild(document.createElement('br'));
        document.getElementsByTagName('body')[0].appendChild(sellDiv);
}


// px zum Layout oben zu vergeben (Verkauf und Gate Layout)
function gateLayer(ycoord, xcoord, display) {
        var gateDiv = document.createElement('div');
        gateDiv.setAttribute('name' ,'gates');
        gateDiv.setAttribute('id' ,'gates');
        gateDiv.setAttribute('style' ,'position:fixed; '+ycoord+'; '+xcoord+';');

        var myriGateLink = document.createElement('a');
        myriGateLink.setAttribute("href", "javascript:jumpCode();");
        myriGateLink.style.fontWeight = "bold";
/*        var myriGateLinkText = document.createTextNode('MyriGateSprung');
        myriGateLink.appendChild(myriGateLinkText);
        gateDiv.appendChild(myriGateLink);*/

        var gateTable = document.createElement('table');

        for (var i=0; i < myGates.length; i+=3) {
            var gala = '';
            if (i<26) {
                gala='G0'+(i/3+1);
            } else {
                gala='G'+(i/3+1);
            }

            var currRow = document.createElement('tr');
            var td1 = document.createElement('td');
            var gateLinkGala = document.createElement('p');
            gateLinkGala.style.fontWeight = "bold";
            gateLinkGala.style.fontSize = "70%";
            var gateLinkGalaText = document.createTextNode(gala);
            gateLinkGala.appendChild(gateLinkGalaText);
            td1.appendChild(gateLinkGala);

            var tdBlue = document.createElement('td');
            var gateLinkBlue = createLink(" "+myGates[i+1]+" ", "javascript:jumpCode(\""+myGates[i+1]+"\");", "");
            gateLinkBlue.style.fontWeight = "bold";
            gateLinkBlue.style.fontSize = "70%";
            tdBlue.style.backgroundColor = "#0000ff";
            gateLinkBlue.style.color = "#ffffff";
            tdBlue.appendChild(gateLinkBlue);

            currRow.appendChild(td1);
            currRow.appendChild(tdBlue);

            gateTable.appendChild(currRow);
        }
        gateDiv.appendChild(gateTable);
        document.getElementsByTagName('body')[0].appendChild(gateDiv);
}

// ============================================ Schnell-Tasten ========================================================================================
function shortcutkey_handler(event){
    if ( event.ctrlKey!=1 && event.altKey!=1 ) {
        keyEvent(event);
    }
}

function keyEvent(evt) {
    var whichKey = evt.which;
    switch (whichKey) {

//        case # :    (# = Ascii Zahl der Taste)
//            unsafeWindow.aller(1);  //-> Alle Einheiten werden vor dem eigentichen Befehl augew�hlt
//            "Funktion die ausgef�hrt werden soll";
//                  break;  //-> die Zeilen immer mit Strich-Punkt abschlie�en

        case 97 : // a - alle/keine
            unsafeWindow.aller(1);
            break;
          case 98 : // b -Toxxen
            getMaxBio();
            unsafeWindow.biolo();
        case 101 : // e - Einheiten angreifen
            unsafeWindow.aller(1);
            unsafeWindow.schoschip();
            break;
        case 102 : // f - Flotte bilden
            unsafeWindow.fleeter();
            break;
        case 114 : // r - Aufladen
            unsafeWindow.aller(1);
            unsafeWindow.loader()
            break;
        case 100 : // d - Gatesprung
            unsafeWindow.aller(1);
            unsafeWindow.jump();
            unsafeWindow.forms["Formular8"].submit();
            break;
        case 112 : // p - Planet angreifen
            unsafeWindow.aller(1);
            unsafeWindow.atackplan();
            break;
        case 122 : // z - Planet scannen
            unsafeWindow.scanit();
            break;
        case 118 : // v - Schiff umbenennen
            unsafeWindow.rename();
            break;
        case 115 : // s - Schiff versenden
            unsafeWindow.aller(1);
            unsafeWindow.sender();
            break;
        case 116 : // t - Schiffe tarnen
            unsafeWindow.aller(1);
            unsafeWindow.tarner();
            break;
        case 121 : // y - EMP
            getEMP();
            unsafeWindow.empfire();
            break;

        case 113 : // q - enttarnen

            var allA = document.getElementsByTagName('a');
            for (var i=1; i< allA.length; i++) {
                if (allA[i].innerHTML.indexOf('Alle Schiffe enttarnen') > 0) {
                    window.location.href=document.URL+"&enttarnen=all"
                    allA[i].click();
                }
            }
            http://www2.omega-day.com/game/index.php?op=orbit&index=1044396&enttarnen=all
            break;


    }
}

function getMaxBio() {
    var Zahlen = unsafeWindow.Zahlen;
    var ZahlenF = unsafeWindow.ZahlenF;
    var maxBio = 0;
    var maxID = 0;
    for (var i=0; i< Zahlen.length-1; i++) {
        if (document.getElementById(Zahlen[i]).getAttribute("bio") > maxBio) {
                maxBio = document.getElementById(Zahlen[i]).getAttribute("bio");
                maxID = Zahlen[i];
        }
    }
    for (var i=0; i< ZahlenF.length-1; i++) {
        if (document.getElementById(ZahlenF[i]).getAttribute("bio") > maxBio) {
                maxBio = document.getElementById(ZahlenF[i]).getAttribute("bio");
                maxID = ZahlenF[i];
        }
    }
    if (maxID != 0) {
        unsafeWindow.overship(maxID)
        unsafeWindow.clicks(maxID);
    }
}

function getEMP() {
    var Zahlen = unsafeWindow.Zahlen;
    var ZahlenF = unsafeWindow.ZahlenF;
    var firstEMP = 0;
    var maxID = 0;
    for (var i=0; i< Zahlen.length-1; i++) {
        if (document.getElementById(Zahlen[i]).getAttribute("emp") > firstEMP) {
                firstEMP = document.getElementById(Zahlen[i]).getAttribute("emp");
                maxID = Zahlen[i];
        }
    }
    for (var i=0; i< ZahlenF.length-1; i++) {
        if (document.getElementById(ZahlenF[i]).getAttribute("emp") > firstEMP) {
                firstEMP = document.getElementById(ZahlenF[i]).getAttribute("emp");
                maxID = ZahlenF[i];
        }
    }
    if (maxID != 0) {
        unsafeWindow.overship(maxID)
        unsafeWindow.clicks(maxID);
    }
}

// ============================================ infoLayer ========================================================================================
function infoLayer(type) {

    var infoDiv = document.createElement('div');
    infoDiv.setAttribute('name' ,'infosys');
    infoDiv.setAttribute('id' ,'infosys');
    //Positionsbestimmung der Link Liste (top,bottom) px = Abstand fixed = mitscrollen / absolute:fixe position
    infoDiv.setAttribute('style' ,'position:fixed; top:0px; left:210px;');

    if (type == 'nofleet') {
        //Link zur Homepage
        infoDiv.appendChild(createLink('Ally-Forum', 'http://www.kryops.de/starfleet/'), '_hp');
        infoDiv.appendChild(document.createTextNode(' | '));
        //Link zur Datenbank
        infoDiv.appendChild(createLink('DB', 'http://oddb.kryops.de/index.php'), '_db');
        infoDiv.appendChild(document.createTextNode(' | '));
        //Link zu Schiffskonfigurator 
        infoDiv.appendChild(createLink('Schiff', 'http://shipconfig.odgates.de/'), '_ship');
        infoDiv.appendChild(document.createTextNode(' | '));
        //Link zu Planetenkonfigurator
        infoDiv.appendChild(createLink('Plani', 'http://planconfig.odgates.de/'), '_plan');
        infoDiv.appendChild(document.createElement('br'));


    } else if (type == 'fleet')
// ================ fleet farbwahl================
  {
    var farbtabelle = infoDiv.appendChild(document.createElement('table'));
    var farbzeile = farbtabelle.appendChild(document.createElement('tr'));
    var farbzelle = farbzeile.appendChild(document.createElement('td'));

    farbzelle.appendChild(createLink('Alle', 'javascript:showFleet("all");', ''));
        farbzelle.appendChild(document.createElement('br'));

        var rota = farbzelle.appendChild(document.createElement('a'));
        rota.setAttribute('href', 'javascript:showFleet("FF0000");');
        var rotf = rota.appendChild(document.createElement('font'));
        rotf.setAttribute('color', '#FF0000');
        var linktext = document.createTextNode(schiffe_rot);
        rotf.appendChild(linktext);
        farbzelle.appendChild(document.createElement('br'));

        var golda = farbzelle.appendChild(document.createElement('a'));
        golda.setAttribute('href', 'javascript:showFleet("CE9A63");');
        var goldf = golda.appendChild(document.createElement('font'));
        goldf.setAttribute('color', '#CE9A63');
        var linktext = document.createTextNode(schiffe_gold);
        goldf.appendChild(linktext);
            farbzelle.appendChild(document.createElement('br'));

        var gruna = farbzelle.appendChild(document.createElement('a'));
        gruna.setAttribute('href', 'javascript:showFleet("00FF00");');
        var grunf = gruna.appendChild(document.createElement('font'));
        grunf.setAttribute('color', '#00FF00');
        var linktext = document.createTextNode(schiffe_gruen);
        grunf.appendChild(linktext);
        farbzelle.appendChild(document.createElement('br'));

        var blaua = farbzelle.appendChild(document.createElement('a'));
        blaua.setAttribute('href', 'javascript:showFleet("8844FF");');
        var blauf = blaua.appendChild(document.createElement('font'));
        blauf.setAttribute('color', '#8844FF');
        var linktext = document.createTextNode(schiffe_blau);
        blauf.appendChild(linktext);
        farbzelle.appendChild(document.createElement('br'));

        var oliva = farbzelle.appendChild(document.createElement('a'));
        oliva.setAttribute('href', 'javascript:showFleet("556B2F");');
        var olivf = oliva.appendChild(document.createElement('font'));
        olivf.setAttribute('color', '#556B2F');
        var linktext = document.createTextNode(schiffe_oliv);
        olivf.appendChild(linktext);


        var farbzelleR = farbzeile.appendChild(document.createElement('td'));


        var weisa = farbzelleR.appendChild(document.createElement('a'));
        weisa.setAttribute('href', 'javascript:showFleet("FFFFFF");');
        var weisf = weisa.appendChild(document.createElement('font'));
        weisf.setAttribute('color', '#FFFFFF');
        var linktext = document.createTextNode(schiffe_weiss);
        weisf.appendChild(linktext);
        farbzelleR.appendChild(document.createElement('br'));

        var orangea = farbzelleR.appendChild(document.createElement('a'));
          orangea.setAttribute('href', 'javascript:showFleet("FFA500");');
        var orangef = orangea.appendChild(document.createElement('font'));
        orangef.setAttribute('color', '#FFA500');
        var linktext = document.createTextNode(schiffe_orange);
        orangef.appendChild(linktext);
        farbzelleR.appendChild(document.createElement('br'));

               var pinka = farbzelleR.appendChild(document.createElement('a'));
        pinka.setAttribute('href', 'javascript:showFleet("FFC0CB");');
        var pinkf = pinka.appendChild(document.createElement('font'));
        pinkf.setAttribute('color', '#FFC0CB');
        var linktext = document.createTextNode(schiffe_pink);
        pinkf.appendChild(linktext);
        farbzelleR.appendChild(document.createElement('br'));

            var violeta = farbzelleR.appendChild(document.createElement('a'));
        violeta.setAttribute('href', 'javascript:showFleet("c71585");');
        var violetf = violeta.appendChild(document.createElement('font'));
        violetf.setAttribute('color', '#c71585');
        var linktext = document.createTextNode(schiffe_violett);
        violetf.appendChild(linktext);
        farbzelleR.appendChild(document.createElement('br'));

                   var Himmelblaua = farbzelleR.appendChild(document.createElement('a'));
        Himmelblaua.setAttribute('href', 'javascript:showFleet("87CEFA");');
        var Himmelblauf = Himmelblaua.appendChild(document.createElement('font'));
        Himmelblauf.setAttribute('color', '#87CEFA');
        var linktext = document.createTextNode(schiffe_himmelblau);
        Himmelblauf.appendChild(linktext);
        farbzelleR.appendChild(document.createElement('br'));

            var dblaua = farbzelleR.appendChild(document.createElement('a'));
        dblaua.setAttribute('href', 'javascript:showFleet("0044FF");');
        var dblauf = dblaua.appendChild(document.createElement('font'));
        dblauf.setAttribute('color', '#0044FF');
        var linktext = document.createTextNode(schiffe_dunkelblau);
        dblauf.appendChild(linktext);
		
		infoDiv.appendChild(document.createElement('br'));
        infoDiv.appendChild(createLink('Flotten umbenennen', 'javascript:renameFleet();', ''));
		infoDiv.appendChild(document.createElement('br'));
        infoDiv.appendChild(document.createElement('br'));
        infoDiv.appendChild(createLink('Alle markieren', 'javascript:selectAll();', ''));
		infoDiv.appendChild(document.createElement('br'));
        infoDiv.appendChild(createLink('Armada markieren', 'javascript:selectArmada();', ''));
		infoDiv.appendChild(document.createElement('br'));
        infoDiv.appendChild(createLink('Sende markierte', 'document.AllyFlform.Submit.click();', ''));
		
    } else if (type == 'send')
 // ================ send ================
  {
        //QuickLinks (Fav. waehlen)
        var mySel = document.createElement('select');
        mySel.setAttribute("onChange", "javascript:document.form1.direktid.value = this.value; document.form1.Abschicken.click();");
        var myDefOption = document.createElement('option');
        myDefOption.setAttribute("value", '');
        var myDefOptionText = document.createTextNode('Werften');
        myDefOption.appendChild(myDefOptionText);
        mySel.appendChild(myDefOption);
        mySel.setAttribute("class", "tablebutton");

        for (var i=0; i < myLinks.length; i+=2) {
            var myOption = document.createElement('option');
            myOption.setAttribute("value", myLinks[i+1]);
            var myOptionText = document.createTextNode(myLinks[i]);
            myOption.appendChild(myOptionText);
            mySel.appendChild(myOption);
        }
        infoDiv.appendChild(mySel);

         //Gates
        var mySelGate = document.createElement('select');
        mySelGate.setAttribute("onChange", "javascript:document.form1.direktid.value = this.value; document.form1.Abschicken.click();");
        var myDefOptionGate = document.createElement('option');
        myDefOptionGate.setAttribute("value", '');
        var myDefOptionGateText = document.createTextNode('Gate waehlen');
        myDefOptionGate.appendChild(myDefOptionGateText);
        mySelGate.appendChild(myDefOptionGate);
        mySelGate.setAttribute("class", "tablebutton");

        for (var i=0; i < myGates.length; i+=3) {
            var myOptionGate = document.createElement('option');
            myOptionGate.setAttribute("value", myGates[i+2]);
            var myOptionTextGate = document.createTextNode(myGates[i]);
            myOptionGate.appendChild(myOptionTextGate);
            mySelGate.appendChild(myOptionGate);
        }
        infoDiv.appendChild(mySelGate);

        //QuickLinks - Ausbau
        var mySelBau = document.createElement('select');
        mySelBau.setAttribute("onChange", "javascript:document.form1.direktid.value = this.value; document.form1.Abschicken.click();");
        var myDefOptionBau = document.createElement('option');
        myDefOptionBau.setAttribute("value", '');
        var myDefOptionBauText = document.createTextNode('Ressplanis');
        myDefOptionBau.appendChild(myDefOptionBauText);
        mySelBau.appendChild(myDefOptionBau);
        mySelBau.setAttribute("class", "tablebutton");

        for (var i=0; i < myAusbau.length; i+=2) {
            var myOptionBau = document.createElement('option');
            myOptionBau.setAttribute("value", myAusbau[i+1]);
            var myOptionTextBau = document.createTextNode(myAusbau[i]);
            myOptionBau.appendChild(myOptionTextBau);
            mySelBau.appendChild(myOptionBau);
        }
        infoDiv.appendChild(mySelBau);

  }

    document.getElementsByTagName('body')[0].appendChild(infoDiv);
}

function createLink(text, href, target) {
    var link = document.createElement('a');
    link.setAttribute('href',href);
    if (target != "") link.setAttribute('target',target);
    var text = document.createTextNode(text);
    link.appendChild(text);
    return link;
}


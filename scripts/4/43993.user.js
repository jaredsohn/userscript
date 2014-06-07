// ==UserScript==
// @name Farmmanager-Erweiterung P
// @description Berichte k�nnen mit einem Klick in den Farmmanager eingelesen werden
// @author bmaker (Robert N.)
// @include http://*.die-staemme.de/game.php?*screen=report*view=*
// ==/UserScript==

/* Regul�re Ausdr�cke */
regex_world = /http:\/\/([0-9a-z]+)\.die\-staemme\.de/;

/* Funktionen */

// Gibt das K�rzel der Welt zur�ck, auf der der Benutzer spielt
// Beispiel: de14
function _getWorld() {
    match = document.URL.match(regex_world);
    if(match) {
        return match[1];
    }
    return false;
}

// Gibt die ID des Farmmanagers zur�ck, die der Benutzer eingestellt hat.
// Wenn der Benutzer die ID noch nicht eingestellt hat, wird er dazu aufgefordert, seine ID
// anzugeben.
function _getFarmmanagerID(world) {
    id = GM_getValue('fm_id_'+world, false);
    if(id === false) {
        id = prompt('Bitte gib die ID zu deinem Farmmanager (f�r Welt '+world+') ein!');
        GM_setValue('fm_id_'+world, id);
    }
    return id;
}

// Gibt den _vollst�ndigen_ Textinhalt eines DOM-Elements zur�ck,
// also auch die Textinhalte aller Subelemente. Die Textinhalte der jeweiligen Elemente
// werden durch delimeter getrennt. (Es bietet sich ein Leerzeichen an.)
function _getNodeTextRecursively(node, delimeter) {
    var result = '';
    if(node.nodeType == 3) {
        if(node.nodeValue && !node.nodeValue.match(/^\s+$/)) {
            result += _trim(node.nodeValue)+delimeter;
        }
    }
    if(node.hasChildNodes()) {
        for(var k=0; k<node.childNodes.length; k++) {
            result += _getNodeTextRecursively(node.childNodes[k], delimeter);
        }
    }
    return result;
}

// Entfernt Whitespaces am Anfang und am Ende eines Strings.
function _trim (str) {
    return str.replace (/^\s+/, '').replace (/\s+$/, '');
}

/* Hauptskript */
function main() {
    world = _getWorld();
    id = _getFarmmanagerID(world);

    tables = document.getElementsByTagName('table');
    table = false;
    for(i=0; i<tables.length; i++) {
        if(tables[i].getAttribute('width') == '450') {
            table = tables[i];
            break;
        }
    }

    // den Bericht parsen
    report = _getNodeTextRecursively(table, " ");
    report = report.replace(/([0-9]+)\s\.\s([0-9]+)/g, '$1.$2');
    
    //alert(report);
    
    // herausfinden, welche Ressourcen gesp�ht wurden
    var wood = 'no';
    var loam = 'no';
    var iron = 'no';
    ths = table.getElementsByTagName('th');
    for(var i=0; i<ths.length; i++) {
        if(!ths[i].firstChild)
            continue;
        if(!ths[i].firstChild.nodeValue)
            continue;
            
        if(ths[i].firstChild.nodeValue.match(/Ersp.{1,2}hte\s+Rohstoffe:/)) {
            GM_log('"Ersp�hte Rohstoffe:" gefunden!');
            imgs = ths[i].nextSibling.getElementsByTagName('img');
            for(var j=0; j<imgs.length; j++) {
                GM_log("test: "+imgs[j].getAttribute('title'));
                if(imgs[j].getAttribute('title') == 'Holz')
                    wood = 'yes';
                else if(imgs[j].getAttribute('title') == 'Lehm')
                    loam = 'yes';
                else if(imgs[j].getAttribute('title') == 'Eisen')
                    iron = 'yes';
            }
            
            break;
        }
    }
    
    GM_log("Gesp�hte Rohstoffe - Holz: "+wood+" Lehm: "+loam+" Eisen: "+iron);
    
    // den Bericht abschicken bzw. einlesen
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://np.bmaker.net/tools/farmmanager.php?id='+id,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: encodeURI('ajax=1&report='+report+'&wood='+wood+'&loam='+loam+'&iron='+iron+'&note=&parse=1'),
        onload: function(responseDetails) {
                    if(responseDetails.status == 200)
                        alert('Der Berichte wurde erfolgreich an den Farmmanager geschickt!');
                    else
                        alert('Es ist ein Fehler aufgetreten. Bitte versuche, den Bericht selbst einzulesen!');
                }
    });
}

// Wenn die Taste P gedr�ckt wird, soll das Skript aufgerufen bzw. der Bericht eingelesen werden.
document.addEventListener("keydown", function(evt) {
    if(evt.keyCode==80) {
        main();
    }
}, false);
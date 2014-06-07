// ==UserScript==
// @name            ReportNameSwitcher
// @description     Aendert den Namen vom bericht
// @namespace       TimLim
// @include         http://*.die-staemme.de/game.php*screen=report*view=*
// ==/UserScript==


function editToggle(label, edit)
{
// Bericht ändern anzeigen
	document.getElementById(edit).style.display = '';
	document.getElementById(label).style.display = 'none';
}
function newName(text)
{
// Neuen namen ins Textfeld einfügen
    editToggle('label', 'edit');
    document.getElementById('editInput').value = text;
}

function isRedReport()
{
// Roter bericht?
    var dot = attacker.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('tr')[0].getElementsByTagName('th')[1].getElementsByTagName('img')[0];
    var regex = /red\.png/;
    if(regex.test(dot.src))
    {
    // Roter bericht - Keine Informationen
        return true;
    } else {
        return false;
    }
}

function isSpyReport()
{
// Spähbericht
    var spy = true;
    for(var i = 1; i < 13; ++i)
    {
        if(parseInt(attacker.getElementsByTagName('td')[i].innerHTML) > 0 && i != 5)
        {
        // Truppen außer späher vorhanden?
        // Wenn ja, ist es kein spähbericht.
            spy = false;
            break;
        }
    }
    return spy;
}

function getDefenderTroops()
{
// Verteidigertruppen
    defendertroops = defender.getElementsByTagName('td');
    deftroops = [];
    for(var i = 1; i < 13; ++i)
    {
    // Verdeitiger truppen in array
        deftroops.push(defendertroops[i].innerHTML);
    }
    return deftroops;
}

function getWall()
{
// Wall
    var Spy = document.getElementsByTagName('h4');
    for(var i = 0; i < Spy.length; ++i)
    {
        if(Spy[i].innerHTML == 'Spionage')
        {
        // Richtige Tabelle ansprechen
            var spy = Spy[i].nextSibling.nextSibling;
            break;
        }
    }
    var buildings = spy.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerHTML;
    // Alle erspähten gebäude
    var wallpos = buildings.search('Wall');
    // welche Zeichen sind "Wall"?
    var wall = buildings.substr(wallpos);
    // alles außer dem Wall wegmachen
    var regex = /\((.*)\)/;
    // alles bis auf die Zahl entfernen
    wall = regex.exec(wall);
    return (wall) ? wall[1].substr(6) : 0;
    // Falls kein Wall aufgelistet, wall stufe 0 angeben.
}


var troops = document.getElementsByClassName('center');
for(var i = 0; i < troops.length; ++i)
{
    if(troops[i].getElementsByTagName('td')[0].innerHTML == 'Anzahl:')
    {
        if(!attacker)
        {
        // Tabelle für angreifer
            var attacker = troops[i];
        } else {
        // Tabelle für verdeitiger - Zweiter Fund
            var defender = troops[i];
            break;
            // Abbrechen - Es muss nicht mehr gefunden werden.
        }
    }
}

var red = isRedReport();
var spy = isSpyReport();
var wall = getWall();
    

if(!red)
{// Kein Roter Bericht
    deftroops = getDefenderTroops();

    if(!spy)
    {
    // Spy?
        var defdeftroops = defender.nextSibling.getElementsByTagName('td');

        defdef = [];
        // Verteidiger Verluste Array
        for(var i = 1; i < 13; ++i)
        {
        // Verteidiger Verluste in array schreiben
            defdef.push(defdeftroops[i].innerHTML);
        }
        
        var troops = [];
        for(var i = 0; i < defdef.length; ++i)
        {
        // Überlebende in array schreiben
            deftroop = parseInt(deftroops[i]);
            defdeftroop = parseInt(defdef[i]);
            troops.push(deftroop - defdeftroop);
        }
        newName('Off: '+troops);
    } else {
        // spy!
        
        newName('Spy: '+deftroops+' W:'+wall);
        // Defftruppen von oben vorhanden. Wall ebenso.
    }
}
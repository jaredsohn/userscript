// ==UserScript==
// @name            Reportnameswitcher
// @description     Aendert den Namen vom bericht
// @namespace       TimLim
// @include         http://*.die-staemme.de/game.php*screen=report*view=*
// ==/UserScript==

var worldtroops = ['spear', 'sword', 'axe', 'spy', 'light', 'heavy', 'ram', 'catapult', 'snob']
// Rausnehmen, falls nicht vorhanden.

var counttroops = worldtroops.length;

var Dorfnamen_im_titel = false;
        var absenderdorf = false;


function editToggle(label, edit)
{
	document.getElementById(edit).style.display = '';
	document.getElementById(label).style.display = 'none';
}
function newName(text)
{
    var attack = (Dorfnamen_im_titel) ? getVillages() : '';
    editToggle('label', 'edit');
    document.getElementById('editInput').value = attack+text;
}

function getVillages()
{
    var attackername = attacker.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var defendername = defender.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var name = '';

    if(absenderdorf)
    {
        attackername = attackername.getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML;
        attackername = attackername.substr(0, attackername.length-3);
        name = attackername+'attackiert ';
    }

    defendername = defendername.getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML;
    defendername = defendername.substr(0, defendername.length-3);
    name += defendername+' ';

    return name+' ';

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
    var spy = true;
    
    for(var i = 0; i < counttroops; ++i)
    {
        if(worldtroops[i] == 'spy')
        {
            var spynumber = i+1;
            break;
        }
    }
    for(var i = 1; i < counttroops+1; ++i)
    {
        if(parseInt(attacker.getElementsByTagName('td')[i].innerHTML) > 0 && i != spynumber)
        {
            spy = false;
            break;
        }
    }
    return spy;
}

function getDefenderTroops()
{
    defendertroops = defender.getElementsByTagName('td');
    deftroops = [];
    for(var i = 1; i < counttroops+1; ++i)
    {
    // Verdeitiger truppen in array
        deftroops.push(defendertroops[i].innerHTML);
    }
    return deftroops;
}

function getWall()
{
    var Spy = document.getElementsByTagName('h4');
    for(var i = 0; i < Spy.length; ++i)
    {
        if(Spy[i].innerHTML == 'Spionage')
        {
            var spy = Spy[i].nextSibling.nextSibling;
            break;
        }
    }
    if(spy && spy.getElementsByTagName('tr')[1])
    {
        var buildings = spy.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerHTML;
        var wallpos = buildings.search('Wall');
        var wall = buildings.substr(wallpos);
        var regex = /\((.*)\)/;
        wall = regex.exec(wall);
        return (wall) ? wall[1].substr(6) : 0;
    } else {
        return 'k.A.';
    }
}

function getAgreement()
{
    var tds = document.getElementsByTagName('th');
    var regex = /.nderung der Zustimmung/;
    for(var i = 0; i < tds.length; ++i)
    {
        if(regex.test(tds[i].innerHTML))
        {
            agreement = tds[i].nextSibling.nextSibling;
        }
    }
    if(!agreement) return false;
    agreement = agreement.getElementsByTagName('b');
    agreement = [agreement[0].innerHTML, agreement[1].innerHTML];
    return agreement;
}


function getDamage()
{
    var ths = document.getElementsByTagName('th');
    var regex = /Schaden durch Ramm./;
    for(var i = 0; i < ths.length; ++i)
    {
        if(regex.test(ths[i].innerHTML))
        {
            var damage = ths[i].nextSibling.nextSibling;
        }
    }
    var lvl = (damage) ? damage.getElementsByTagName('b') : false;
    return (lvl) ? [lvl[0].innerHTML, lvl[1].innerHTML] : false;
}

function isEmpty(arr)
{
    for(var i = 0; i < arr.length; ++i)
    {
        if(parseInt(arr[i]) > 0)
        {
            return false;
        }
    }
    return true;
}


var troops = document.getElementsByClassName('center');
for(var i = 0; i < troops.length; ++i)
{
    if(troops[i].getElementsByTagName('td')[0].innerHTML == 'Anzahl:')
    {
        if(!attacker)
        {
            var attacker = troops[i];
        } else {
            var defender = troops[i];
        }
    }
}

var red = isRedReport();


if(!red)
{
    var spy = isSpyReport();

    deftroops = getDefenderTroops();

    if(!spy)
    {
    // kein spy

        var defdeftroops = defender.nextSibling.nextSibling.getElementsByTagName('td');

        defdef = [];
        for(var i = 1; i < counttroops+1; ++i)
        {
        // Verluste in array
            defdef.push(defdeftroops[i].innerHTML);
        }
        var troops = [];
        for(var i = 0; i < defdef.length; ++i)
        {
            deftroop = parseInt(deftroops[i]);
            defdeftroop = parseInt(defdef[i]);
            troops.push(deftroop - defdeftroop);
        }

        troops = (isEmpty(troops)) ? 'leer' : troops;
        var damage = getDamage();

        var agreement = getAgreement();
        var agreement = (agreement === false) ? '' : agreement[0]+' => '+agreement[1];

        var name = (!agreement) ? 'Off: '+troops : 'AG: ';
        name += (damage) ? ' Wall '+damage[0]+'=>'+damage[1] : '';
        newName(name+agreement);
    } else {
        // spy!

        var wall = getWall();
        deftroops = (isEmpty(deftroops)) ? 'leer' : deftroops;
        var name = 'Spy: '+deftroops+' W:'+wall;
        newName(name);
    }
}
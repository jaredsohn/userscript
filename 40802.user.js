// ==UserScript==
// @name          TW Ranking Links
// @namespace     c1b1.de
// @description   Adds Links to the ranking pages on the user profile of Tribal Wars; Deutsch,Polska, English
// @author        Samuel Essig
// @version       1.5.1
// @homepage      http://c1b1.de
// @copyright     2009-2010, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.die-staemme.de/*screen=info_player*
// @include       http://*.die-staemme.de/*screen=info_ally*
// @include       http://*.die-staemme.de/*screen=ranking*mode=player*
// @exclude       http://forum.die-staemme.de/*
// @include       http://*.plemiona.pl/*screen=info_player*
// @include       http://*.plemiona.pl/*screen=info_ally*
// @include       http://*.plemiona.pl/*screen=ranking*mode=player*
// @exclude       http://forum.plemiona.pl/*
// @include       http://*.tribalwars.net/*screen=info_player*
// @include       http://*.tribalwars.net/*screen=info_ally*
// @include       http://*.tribalwars.net/*screen=ranking*mode=player*
// @exclude       http://forum.tribalwars.net/*
// ==/UserScript==


/*

DS Ranking Links

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de


Deutsche Version by c1b1
Polska Wersja by Jurigag (http://forum.plemiona.pl/member.php?u=10906)
English Version by Jurigag


Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

Thread url:
http://forum.die-staemme.de/showthread.php?t=96591

*/

const urll = document.location.href;
const lang = urll.split('.')[0].split(/\/\/(\D+)\d+/)[1];
var Text0, Text1, Text2, Text3, Text4, Text5, Text6, Text7, Text8, Text9, Text10, Text11, Text12, Text13, Text14;
if (lang == 'pl')
{
    Text0="Ranking:";
    Text1="Plemię:";
    Text2="Lista Rankingów:";
    Text3="Gracze";
    Text4="Gracze na kontynencie";
    Text5="Pokonani przeciwnicy jako agresor";
    Text6="Pokonani przeciwnicy jako obrońca";
    Text7="Pokonani przeciwnicy ogólnie";
    Text8="Plemiona";
    Text9="Plemiona na kontynencie";
    Text10="Pokonani przeciwnicy(plemiona) jako agresor";
    Text11="Pokonani przeciwnicy(plemiona) jako obrońca";
    Text12="Pokonani przeciwnicy(plemiona) ogólnie";
    Text13=" c1b1.de & Polska Wersja by Jurigag";
    Text14="DS Ranking Links - Version 1.2 - http://c1b1.de & Polska Wersja by Jurigag";
}
else if (lang == 'de')
{
    Text0="Rang:";
    Text1="Stamm:";
    Text2="Links zu den Ranglisten";
    Text3="Spieler";
    Text4="Kontinent Spieler";
    Text5="Besiegte Gegner als Angreifer";
    Text6="Besiegte Gegner als Verteidiger";
    Text7="Besiegte Gegner insgesamt";
    Text8="Stämme";
    Text9="Kontinent Stämme";
    Text10="Besiegte Gegner Stämme als Angreifer";
    Text11="Besiegte Gegner Stämme als Verteidiger";
    Text12="Besiegte Gegner Stämme insgesamt";
    Text13=" c1b1.de";
    Text14="DS Ranking Links - Version 1.2 - http://c1b1.de";
}
else //if (lang== 'en')
{
    Text0="Rank:";
    Text1="Tribe:";
    Text2="Links of Rank";
    Text3="Player";
    Text4="Continent Players";
    Text5="Opponents defeated as attacker";
    Text6="Opponents defeated as defender";
    Text7="Opponents defeated total";
    Text8="Tribes";
    Text9="Continent Tribes";
    Text10="Opponents defeated(Tribes) as atacker";
    Text11="Opponents defeated(Tribes) as defender";
    Text12="Opponents defeated(Tribes) total";
    Text13=" c1b1.de & English Version by Jurigag";
    Text14="DS Ranking Links - Version 1.2 - http://c1b1.de & English Version by Jurigag";
};

var url = document.location.href;
if(url.indexOf('screen=info_player') != -1)
{
    var player_name = document.getElementsByTagName('h2')[0].firstChild.data.substring(8);

    var td = findByInner(document,Text0)[0];

    var tribe_name = findByInner(document,Text1)[0].nextSibling.getElementsByTagName('a')[0];
    if(!tribe_name)
        tribe_name = false;
    else
    {
        var tribe_id = tribe_name.href.split('=').pop();
        tribe_name = tribe_name.firstChild.data;
    }

    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.setAttribute('title',Text2);
    a.addEventListener('click',function(e) {
        if(document.getElementById('ranking_links_div'))
            return false;
        var div = document.createElement('div');
        div.setAttribute('id','ranking_links_div');
        div.setAttribute('style','border:2px black solid; padding:2px 5px 5px; position:absolute; left:'+(e.pageX-12)+'px; top:'+(e.pageY-12)+'px; background:url(/graphic/background/bg-tile.jpg); ');
        document.addEventListener('click',function(e) {
            if(document.getElementById('ranking_links_div'))
            {
                var found = false;
                var e = e.target;
                while(e)
                {
                    if((e.id && e.id == 'ranking_links_div') || (e.tagName && e.tagName == 'A'))
                    {
                        found = true;
                        break;
                    }
                    else
                        e = e.parentNode;
                }
                if(!found)
                    document.getElementById('ranking_links_div').parentNode.removeChild(document.getElementById('ranking_links_div'));
            }
        },false);

        var table = document.createElement('table');
        table.setAttribute('class','vis');

        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(Text2));
        tr.appendChild(th);
        table.appendChild(tr);

        var tr0 = document.createElement('tr');
        var td0 = document.createElement('td');
        var a0 = document.createElement('a');
        a0.setAttribute('href','#');
        a0.addEventListener('click',function() {
            go2Ranking(player_name,'player');
        },false);
        a0.appendChild(document.createTextNode(Text3));
        td0.appendChild(a0);
        tr0.appendChild(td0);
        table.appendChild(tr0);

        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');
        var a1 = document.createElement('a');
        a1.setAttribute('href','#');
        a1.addEventListener('click',function() {
            go2Ranking(player_name,'con_player');
        },false);
        a1.appendChild(document.createTextNode(Text4));
        td1.appendChild(a1);
        tr1.appendChild(td1);
        table.appendChild(tr1);

        var tr2 = document.createElement('tr');
        var td2 = document.createElement('td');
        var a2 = document.createElement('a');
        a2.setAttribute('href','#');
        a2.addEventListener('click',function() {
            go2Ranking(player_name,'kill_player&type=att');
        },false);
        a2.appendChild(document.createTextNode(Text5));
        td2.appendChild(a2);
        tr2.appendChild(td2);
        table.appendChild(tr2);

        var tr3 = document.createElement('tr');
        var td3 = document.createElement('td');
        var a3 = document.createElement('a');
        a3.setAttribute('href','#');
        a3.addEventListener('click',function() {
            go2Ranking(player_name,'kill_player&type=def');
        },false);
        a3.appendChild(document.createTextNode(Text6));
        td3.appendChild(a3);
        tr3.appendChild(td3);
        table.appendChild(tr3);

        var tr4 = document.createElement('tr');
        var td4 = document.createElement('td');
        var a4 = document.createElement('a');
        a4.setAttribute('href','#');
        a4.addEventListener('click',function() {
            go2Ranking(player_name,'kill_player&type=all');
        },false);
        a4.appendChild(document.createTextNode(Text7));
        td4.appendChild(a4);
        tr4.appendChild(td4);
        table.appendChild(tr4);

        if(tribe_name !== false)
        {
            var tr5 = document.createElement('tr');
            var td5 = document.createElement('td');
            var a5 = document.createElement('a');
            a5.setAttribute('href','#');
            a5.addEventListener('click',function() {
                go2Ranking(tribe_name,'ally');
            },false);
            a5.appendChild(document.createTextNode(Text8));
            td5.appendChild(a5);
            tr5.appendChild(td5);
            table.appendChild(tr5);

            var tr6 = document.createElement('tr');
            var td6 = document.createElement('td');
            var a6 = document.createElement('a');
            a6.setAttribute('href','#');
            a6.addEventListener('click',function() {
                go2Ranking(tribe_name,'con_ally');
            },false);
            a6.appendChild(document.createTextNode(Text9));
            td6.appendChild(a6);
            tr6.appendChild(td6);
            table.appendChild(tr6);

            var tr7 = document.createElement('tr');
            var td7 = document.createElement('td');
            var a7 = document.createElement('a');
            a7.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=att&lit_ally_id='+tribe_id);
            a7.appendChild(document.createTextNode(Text10));
            td7.appendChild(a7);
            tr7.appendChild(td7);
            table.appendChild(tr7);

            var tr8 = document.createElement('tr');
            var td8 = document.createElement('td');
            var a8 = document.createElement('a');
            a8.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=def&lit_ally_id='+tribe_id);
            a8.appendChild(document.createTextNode(Text11));
            td8.appendChild(a8);
            tr8.appendChild(td8);
            table.appendChild(tr8);

            var tr9 = document.createElement('tr');
            var td9 = document.createElement('td');
            var a9 = document.createElement('a');
            a9.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=all&lit_ally_id='+tribe_id);
            a9.appendChild(document.createTextNode(Text12));
            td9.appendChild(a9);
            tr9.appendChild(td9);
            table.appendChild(tr9);

        }

        div.appendChild(table);

        var c = String.fromCharCode('0169')+Text13;

        var span = document.createElement('span');
        span.setAttribute('style','font-size:smaller; float:right; cursor:help; ');
        span.setAttribute('title',Text14);
        span.appendChild(document.createTextNode(c));
        div.appendChild(span);

        document.getElementsByTagName('body')[0].appendChild(div);
        return false;
    },false);
    a.appendChild(td.firstChild);

    td.appendChild(a);
}
else if(url.indexOf('screen=info_ally') != -1)
{
    var td = findByInner(document,'Ranking:')[0];

    var tribe_name = findByInner(document,'Tag:')[0].nextSibling.firstChild.data;
    var tribe_id = url.split('=').pop();


    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.setAttribute('title','Links zu den Ranglisten');
    a.addEventListener('click',function(e) {
        if(document.getElementById('ranking_links_div'))
            return false;
        var div = document.createElement('div');
        div.setAttribute('id','ranking_links_div');
        div.setAttribute('style','border:2px black solid; padding:2px 5px 5px; position:absolute; left:'+(e.pageX-12)+'px; top:'+(e.pageY-12)+'px; background:url(/graphic/background/bg-tile.jpg); ');
        document.addEventListener('click',function(e) {
            if(document.getElementById('ranking_links_div'))
            {
                var found = false;
                var e = e.target;
                while(e)
                {
                    if((e.id && e.id == 'ranking_links_div') || (e.tagName && e.tagName == 'A'))
                    {
                        found = true;
                        break;
                    }
                    else
                        e = e.parentNode;
                }
                if(!found)
                    document.getElementById('ranking_links_div').parentNode.removeChild(document.getElementById('ranking_links_div'));
            }
        },false);

        var table = document.createElement('table');
        table.setAttribute('class','vis');

        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.appendChild(document.createTextNode('Lista Rankingów:'));
        tr.appendChild(th);
        table.appendChild(tr);

        var tr0 = document.createElement('tr');
        var td0 = document.createElement('td');
        var a0 = document.createElement('a');
        a0.setAttribute('href','#');
        a0.addEventListener('click',function() {
            go2Ranking(tribe_name,'ally');
        },false);
        a0.appendChild(document.createTextNode('Plemiona'));
        td0.appendChild(a0);
        tr0.appendChild(td0);
        table.appendChild(tr0);

        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');
        var a1 = document.createElement('a');
        a1.setAttribute('href','#');
        a1.addEventListener('click',function() {
            go2Ranking(tribe_name,'con_ally');
        },false);
        a1.appendChild(document.createTextNode('Plemiona na kontynencie'));
        td1.appendChild(a1);
        tr1.appendChild(td1);
        table.appendChild(tr1);

        var tr2 = document.createElement('tr');
        var td2 = document.createElement('td');
        var a2 = document.createElement('a');
        a2.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=att&lit_ally_id='+tribe_id);
        a2.appendChild(document.createTextNode('Pokonani przeciwnicy(plemiona) jako agresor'));
        td2.appendChild(a2);
        tr2.appendChild(td2);
        table.appendChild(tr2);

        var tr3 = document.createElement('tr');
        var td3 = document.createElement('td');
        var a3 = document.createElement('a');
        a3.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=def&lit_ally_id='+tribe_id);
        a3.appendChild(document.createTextNode('Pokonani przeciwnicy(plemiona) jako obro?ca'));
        td3.appendChild(a3);
        tr3.appendChild(td3);
        table.appendChild(tr3);

        var tr4 = document.createElement('tr');
        var td4 = document.createElement('td');
        var a4 = document.createElement('a');
        a4.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=all&lit_ally_id='+tribe_id);
        a4.appendChild(document.createTextNode('Pokonani przeciwnicy(plemiona) ogólnie'));
        td4.appendChild(a4);
        tr4.appendChild(td4);
        table.appendChild(tr4);

        div.appendChild(table);

        var c = String.fromCharCode('0169')+' c1b1.de';

        var span = document.createElement('span');
        span.setAttribute('style','font-size:smaller; float:right; ');
        span.setAttribute('title','DS Ranking Links - Version 1.2 - http://c1b1.de');
        span.appendChild(document.createTextNode(c));
        div.appendChild(span);

        document.getElementsByTagName('body')[0].appendChild(div);
        return false;
    },false);
    a.appendChild(td.firstChild);

    td.appendChild(a);
}


function go2Ranking(player_name,mode)
{
    var form = document.createElement('form');
    form.setAttribute('method','post');
    form.setAttribute('action','/game.php?screen=ranking&mode='+mode+'&search');
    form.setAttribute('id','rankingForm');

    var name_i = document.createElement('input');
    name_i.setAttribute('type','hidden');
    name_i.setAttribute('name','name');
    name_i.setAttribute('value',player_name);

    form.appendChild(name_i);

    document.getElementsByTagName('body')[0].appendChild(form);
    document.getElementById('rankingForm').submit();
}



function findByInner(obj,value)
{
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
    {
        if(obj.getElementsByTagName('*')[i].firstChild)
        {
            if(obj.getElementsByTagName('*')[i].firstChild.data)
            {
                if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
                {
                    list[a] = obj.getElementsByTagName('*')[i];
                    a++;
                }
            }
        }
    }
    list['length'] = a;
    return list;
}
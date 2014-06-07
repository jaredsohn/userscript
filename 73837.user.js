// ==UserScript==
// @name DS - Stammespunkteverlauf
// @namespace Stammesverlauf
// @author DSreal.de * edit by Đð¢ M@rco PC-Ŧræk & die PC-Helfer <http://www.sdm-scholz.de>
// @include http://de*.die-staemme.de/game.php*village=*screen=info_ally*id=*
// ==/UserScript==
(
 
function () {
    var f = document;
    var i, l, m, s, td, tr, img, a;
    var srv = 0;
    try {
        srv = f.location.href.match(/de(\d+)\D*\.die-staemme\./)[1];
    } catch (e) {
        return;
    }
    for (i = 0; i < f.links.length; i++) {
        l = f.links[i];
        m=l.href.match(/village=[0-9]+&screen=info_member/);
        if(m) {
            m=l.href.match(/id=([0-9]+)/)[1];
            s = l.parentNode.parentNode;
 
            tr = f.createElement('tr');
            td = f.createElement('td');
            td.colSpan = 2;
            a = f.createElement('a');
            a.target = 'dsreal';
            a.href = 'http://www.dsreal.de/index.php?tool=akte&mode=ally&world=de' + srv + '&id=' + m;
            img = f.createElement('img');
            img.src = 'http://www.dsreal.de/chart/chart.php?id=' + m + '&world=de' + srv + '&mode=ally';
            a.appendChild(img);
	td.appendChild(a);
            tr.appendChild(td);
            s.parentNode.insertBefore(tr, s);
 
            
	    tr = f.createElement('tr');
            td = f.createElement('td');
            td.colSpan = 2;
            a = f.createElement('a');
            a.target = 'dsreal';
            a.href = 'http://www.dsreal.de/index.php?tool=akte&mode=ally&world=de' + srv + '&id=' + m;
            img = f.createElement('img');
            img.src = 'http://www.dsreal.de/chart/bash_chart.php?id=' + m + '&world=de' + srv + '&mode=ally&art=all';
            a.appendChild(img);

 
            td.appendChild(a);
            tr.appendChild(td);
            s.parentNode.insertBefore(tr, s);
 
            break;
        }
    }
 
})()

// ==UserScript==
// @name           Stammeslage DE
// @namespace      none
// @include        http://de*.die-staemme.de/game.php*screen=info_ally*id=*
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
        m=l.href.match(/screen=info_member/);
        if(m) {
        //Punkteverlauf:
			m=l.href.match(/id=([0-9]+)/)[1];
            s = l.parentNode.parentNode;

            tr = f.createElement('tr');
            td = f.createElement('td');
            td.colSpan = 2;
            a = f.createElement('a');
            a.target = 'dsreal';
            a.href = 'http://www.dsreal.de/index.php?screen=file&mode=ally&world=de' + srv + '&id=' + m;
            img = f.createElement('img');
            img.src = 'http://www.dsreal.de/charts/allyPoints.php?id=' + m + '&world=de' + srv + '&mode=ally';
            a.appendChild(img);

            td.appendChild(a);
            tr.appendChild(td);
            s.parentNode.insertBefore(tr, s);
		//Bashverlauf:
			m=l.href.match(/id=([0-9]+)/)[1];
            s = l.parentNode.parentNode;

            tr = f.createElement('tr');
            td = f.createElement('td');
            td.colSpan = 2;
            a = f.createElement('a');
            a.target = 'dsreal';
            a.href = 'http://www.dsreal.de/index.php?screen=conquer&mode=ally&world=de' + srv + '&id=' + m;
            img = f.createElement('img');
            img.src = 'http://www.dsreal.de/charts/allyBashall.php?id=' + m + '&world=de' + srv + '&mode=ally';
            a.appendChild(img);

            td.appendChild(a);
            tr.appendChild(td);
            s.parentNode.insertBefore(tr, s);			
		//Karte:
			m=l.href.match(/id=([0-9]+)/)[1];
            s = l.parentNode.parentNode;

            tr = f.createElement('tr');
            td = f.createElement('td');
            td.colSpan = 2;
            a = f.createElement('a');
            a.target = 'dsreal';
            a.href = 'http://www.dsreal.de/index.php?screen=map&aid=' + m + '&world=de' + srv;
            img = f.createElement('img');
            img.src = 'http://www.dsreal.de/position.php?id=' + m + '&mode=ally&world=de' + srv;
            a.appendChild(img);

            td.appendChild(a);
            tr.appendChild(td);
            s.parentNode.insertBefore(tr, s);

            break;
        }
    }

})()
// ==UserScript==
// @name Verlaeufe und Karten Stamm
// @description by Squiffy-Squirrel, timOKills
// @namespace none
// @include http://de*.die-staemme.de/game.php*screen=info_ally*id=*
// @author Squiffy-Squirrel, timOKills
// ==/UserScript==
(

function () {

	//USER SETTINGS:

	var punkte = true;
	var punktespoiler = false;

	var offbash = true;
	var offbashspoiler = false;

	var deffbash = true;
	var deffbashspoiler = false;

	var map = true;
	var mapspoiler = false;
	
	var appendChilds = true;

	//END USER SETTINGS

    var f = document;
    var i, l, m, s, td, tr, img, a, ctr;
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
            m=l.href.match(/id=([0-9]+)/)[1];
            s = l.parentNode.parentNode;
			
			
			//ally points
			if(punkte) {
				tr = f.createElement('tr');
				td = f.createElement('td');
				td.colSpan = 2;
				a = f.createElement('a');
				a.target = 'dsreal';
				a.href = 'http://www.dsreal.de/index.php?screen=file&mode=ally&world=de' + srv + '&id=' + m;
				a.id = 'punktespoiler';
				img = f.createElement('img');
				img.src = 'http://www.dsreal.de/charts/allyPoints.php?id=' + m + '&world=de' + srv + '&mode=ally';
				a.appendChild(img);
				
				if(punktespoiler) {
					a.style.display = 'none';
					spoiler = f.createElement('a');
					spoiler.href = 'javascript:function show(id) {var el = document.getElementById(id); if(el.style.display == "block") el.style.display = "none"; else el.style.display = "block";};show("punktespoiler");';
					spoiler.innerHTML = 'Punkte';
					td.appendChild(spoiler); 
				}
			

				td.appendChild(a);
				tr.appendChild(td);
				
				if(appendChilds)
					s.parentNode.appendChild(tr);
				else
					s.parentNode.insertBefore(tr, s);
			}
			
			
			//ally off bash
			if(offbash) {
				tr = f.createElement('tr');
				td = f.createElement('td');
				td.colSpan = 2;
				a = f.createElement('a');
				a.target = 'dsreal';
				a.href = 'http://www.dsreal.de/index.php?screen=conquer&mode=ally&id=' + m + '&world=de' + srv;
				a.id = 'offbashspoiler';
				img = f.createElement('img');
				img.src = 'http://www.dsreal.de/charts/allyBashoff.php?id=' + m + '&world=de' + srv + '&mode=ally';
				a.appendChild(img);

				if(offbashspoiler) {
					a.style.display = 'none';
					spoiler = f.createElement('a');
					spoiler.href = 'javascript:function show(id) {var el = document.getElementById(id); if(el.style.display == "block") el.style.display = "none"; else el.style.display = "block";};show("offbashspoiler");';
					spoiler.innerHTML = 'Off-Bash';
					td.appendChild(spoiler); 
				}
				
				td.appendChild(a);
				tr.appendChild(td);
				
				
				if(appendChilds)
					s.parentNode.appendChild(tr);
				else
					s.parentNode.insertBefore(tr, s);

			}
			
				
			//ally deff bash
			if(deffbash) {
				tr = f.createElement('tr');
				td = f.createElement('td');
				td.colSpan = 2;
				a = f.createElement('a');
				a.target = 'dsreal';
				a.href = 'http://www.dsreal.de/index.php?screen=conquer&mode=ally&id=' + m + '&world=de' + srv;
				a.id = 'deffbashspoiler';
				img = f.createElement('img');
				img.src = 'http://www.dsreal.de/charts/allyBashdef.php?id=' + m + '&world=de' + srv + '&mode=ally';
				a.appendChild(img);

				if(deffbashspoiler) {
					a.style.display = 'none';
					spoiler = f.createElement('a');
					spoiler.href = 'javascript:function show(id) {var el = document.getElementById(id); if(el.style.display == "block") el.style.display = "none"; else el.style.display = "block";};show("deffbashspoiler");';
					spoiler.innerHTML = 'Deff-Bash';
					td.appendChild(spoiler); 
				}
				
				td.appendChild(a);
				tr.appendChild(td);
				
				
				if(appendChilds)
					s.parentNode.appendChild(tr);
				else
					s.parentNode.insertBefore(tr, s);
				
			}
						
			//ally map
			if(map) {
				ctr = f.createElement('center');
				tr = f.createElement('tr');
				td = f.createElement('td');
				td.colSpan = 2;
				a = f.createElement('a');
				a.target = 'dsreal';
				a.href = 'http://www.dsreal.de/index.php?screen=map&aid=' + m + '&world=de' + srv;
				a.id = 'mapspoiler';
				img = f.createElement('img');
				img.src = 'http://www.dsreal.de/position.php?id=' + m + '&world=de' + srv + '&mode=ally';
				a.appendChild(img);
				
				if(mapspoiler) {
					a.style.display = 'none';
					spoiler = f.createElement('a');
					spoiler.href = 'javascript:function show(id) {var el = document.getElementById(id); if(el.style.display == "block") el.style.display = "none"; else el.style.display = "block";};show("mapspoiler");';
					spoiler.innerHTML = 'Karte';
					td.appendChild(spoiler); 
				}
				
				ctr.appendChild(a);
				td.appendChild(ctr);
				tr.appendChild(td);

				if(appendChilds)
					s.parentNode.appendChild(tr);
				else
					s.parentNode.insertBefore(tr, s);
			}
			
			
            break;
        }
    }

})()

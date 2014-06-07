// ==UserScript==
// @name           Verlaeufe und Karten Spieler
// @description by Squiffy-Squirrel, timOKills
// @namespace      none
// @include        http://de*.die-staemme.de/game.php*village=*screen=info_player*id=*
// @author Squiffy-Squirrel, timOKills
// ==/UserScript==

(

        function() {
		
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
		
                var f=document;
                var i,l,m,s,td,tr,img,a;
                var srv=0;
                try {
                        srv=f.location.href.match(/de(\d+)\D*\.die-staemme\./)[1];
                } catch (e) {
                        return;
                }
                m=f.location+" ";
                m = m.match(/village=[0-9]+&screen=info_player.*id=([0-9]+)/);
                id = m[1];
                for (i=0;i<f.links.length;i++) {
                        l=f.links[i];
				m2 = l.href.match(/screen=mail&mode=new.*player/);
                        if (m2 != null) {
                                s = l.parentNode.parentNode;
								

								
								//punkte
								if(punkte) {
									tr = f.createElement('tr');
									td = f.createElement('td');
									td.colSpan = 2;
									a = f.createElement('a');
									a.target = 'dsreal';
									a.href = 'http://www.dsreal.de/index.php?screen=file&mode=player&world=de' + srv + '&id=' + id;
									a.id = 'punktespoiler';
									img = f.createElement('img');
									img.src = 'http://www.dsreal.de/charts/playerPoints.php?id=' + id + '&world=de' + srv;
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
								
								//off bash
								if(offbash) {
									tr = f.createElement('tr');
									td = f.createElement('td');
									td.colSpan = 2;
									a = f.createElement('a');
									a.target = 'dsreal';
									a.href = 'http://www.dsreal.de/index.php?screen=conquer&id=' + id + '&world=de' + srv;
									a.id = 'offbashspoiler';
									img = f.createElement('img');
									img.src = 'http://www.dsreal.de/charts/playerBashoff.php?id=' + id + '&world=de' + srv;
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
								
								if(deffbash) {
									//deff bash
									tr = f.createElement('tr');
									td = f.createElement('td');
									td.colSpan = 2;
									a = f.createElement('a');
									a.target = 'dsreal';
									a.href = 'http://www.dsreal.de/index.php?screen=conquer&id=' + id + '&world=de' + srv;
									a.id = 'deffbashspoiler';
									img = f.createElement('img');
									img.src = 'http://www.dsreal.de/charts/playerBashdef.php?id=' + id + '&world=de' + srv;
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
								
								//map
								if(map) {
									ctr = f.createElement('center');
									tr = f.createElement('tr');
									td = f.createElement('td');
									td.colSpan = 2;
									a = f.createElement('a');
									a.target = 'dsreal';
									a.href = 'http://www.dsreal.de/index.php?screen=map&world=de' + srv + '&pid=' + id;
									a.id = 'mapspoiler';
									img = f.createElement('img');
									img.src = 'http://www.dsreal.de/position.php?id=' + id + '&world=de' + srv + '&mode=player';
									
									if(mapspoiler) {
										a.style.display = 'none';
										spoiler = f.createElement('a');
										spoiler.href = 'javascript:function show(id) {var el = document.getElementById(id); if(el.style.display == "block") el.style.display = "none"; else el.style.display = "block";};show("mapspoiler");';
										spoiler.innerHTML = 'Karte';
										td.appendChild(spoiler); 
									}
									
									a.appendChild(img);
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

        }
)()

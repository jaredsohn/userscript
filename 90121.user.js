// ==UserScript==
// @name           Spielerlage DE
// @namespace      none
// @include        http://de*.die-staemme.de/game.php*screen=info_player*id=*
// ==/UserScript==


(
        function() {
                var f=document;
                var i,l,m,s,td,tr,img,a;
                var srv=0;
                try {
                        srv=f.location.href.match(/de(\d+)\D*\.die-staemme\./)[1];
                } catch (e) {
                        return;
                }
                m=f.location+" ";
                m = m.match(/screen=info_player&id=([0-9]+)/);
                id = m[1];
                for (i=0;i<f.links.length;i++) {
                        l=f.links[i];
                        m2 = l.href.match(/village=[0-9]+&screen=mail&mode=new&player/);
                        if (m2 != null) {
                                if(l.parentNode.parentNode.tagName != 'LI'){
                                    if(l.text.match(/Nachricht/)){
                                    //Punkteverlauf:
										tr = f.createElement('tr');
                                        td = f.createElement('td');
                                        td.colSpan = 2;
                                        a = f.createElement('a');
                                        a.target = 'dsreal';
                                        a.href = 'http://www.dsreal.de/index.php?screen=file&mode=player&world=de' + srv + '&id=' + id;
                                        img = f.createElement('img');
                                        img.src = 'http://www.dsreal.de/charts/playerPoints.php?id=' + id + '&world=de' + srv;
                                        a.appendChild(img);
                                        td.appendChild(a);
                                        tr.appendChild(td);
                                        l.parentNode.insertBefore(tr, l);
									//Bashverlauf:
										tr = f.createElement('tr');
                                        td = f.createElement('td');
                                        td.colSpan = 2;
                                        a = f.createElement('a');
                                        a.target = 'dsreal';
                                        a.href = 'http://www.dsreal.de/index.php?screen=conquer&world=de' + srv + '&id=' + id;
                                        img = f.createElement('img');
                                        img.src = 'http://www.dsreal.de/charts/playerBashall.php?id=' + id + '&world=de' + srv;
                                        a.appendChild(img);
                                        td.appendChild(a);
                                        tr.appendChild(td);
                                        l.parentNode.insertBefore(tr, l);
									//Karte:
										tr = f.createElement('tr');
                                        td = f.createElement('td');
                                        td.colSpan = 2;
                                        a = f.createElement('a');
                                        a.target = 'dsreal';
                                        a.href = 'http://www.dsreal.de/index.php?screen=map&pid=' + id + '&world=de' + srv;
                                        img = f.createElement('img');
                                        img.src = 'http://www.dsreal.de/position.php?id=' + id + '&world=de' + srv;
                                        a.appendChild(img);
                                        td.appendChild(a);
                                        tr.appendChild(td);
                                        l.parentNode.insertBefore(tr, l);

                                        break;
                                    }
                                }
                        }
                }

        }
)()


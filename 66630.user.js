
// ==UserScript==
// @name           DS Incs und Unterstützung pro Dorf
// @namespace      Die Stämme
// @description    Fügt in der Angriffsseite von die Stämme ein Popup hinzu, wo alle Angriffe nach angegriffenem Dorf gruppiert werden.
// @include        http://de*.die-staemme.de/game.php?*screen=overview_villages*
// @include        http://ch*.staemme.ch/game.php?*screen=overview_villages*
// ==/UserScript==

if(document.getElementsByClassName("selected")[0].innerHTML.match("Eintreffend")){
	var enabled = true;
	
	var tables = document.getElementsByClassName("vis");
	for(var i=0;i<tables.length;i++){
		if(tables[i].innerHTML.match("Befehl.+Ziel.+Herkunft")){
			var table = tables[i];
			break;
		}
	}
	if(!table) return;
	var trs = table.getElementsByTagName("tr");
	
	function handler(e){
		if(!enabled) return;
		enabled = false;
		var incs = {};
		for(var j=(trs[0].getElementsByTagName("th").length)?1:2;j<trs.length-1;j=j+1){
			var inc_data = trs[j].getElementsByTagName("td");
			var player = inc_data[1].firstChild;
			var player_link = player.href; player=player.firstChild.nodeValue;
			var type = inc_data[0].getElementsByTagName("img")[0].src.match("attack\.png") ? 0 : 1;
			
                        
                        if(type == 0){
                        var arrival = inc_data[3].innerHTML;
                        }


			if(!incs[player]){
				incs[player] = [0,0,player_link, "kein Inc"];
			}

                        if(incs[player][3] == "kein Inc" && type == 0){
				incs[player][3] = arrival;
                                arrival = 0;
			}
                      
                      
			if(incs[player][type])	incs[player][type]++;
			else					incs[player][type] = 1;
		}
		
		var div = document.createElement("div");
		div.setAttribute("style","border: 2px solid #804000; padding:7px; background-image:url(../graphic/background/content.jpg); position:absolute; top:"+(e.clientY-50)+"px; left:"+(e.clientX-100)+"px;");
		var table = document.createElement("table");
		table.setAttribute("class","vis");
		table.setAttribute("style","margin-bottom:6px");
		table.setAttribute("cellpadding","4px");
		var tr1 = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.innerHTML = "Dorfname";
		var th2 = document.createElement("th");
		th2.innerHTML = "Angriffe";
		var th3 = document.createElement("th");
		th3.innerHTML = "Unterst&uuml;tzungen";
                var th4 = document.createElement("th");
		th4.innerHTML = "Ank.erster Inc";
		tr1.appendChild(th1);
		tr1.appendChild(th2);
		tr1.appendChild(th3);
                tr1.appendChild(th4);
		table.appendChild(tr1);
		var empty = true;
		for(var i in incs){
			empty = false;
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var td2 = document.createElement("td");
			var td3 = document.createElement("td");
                        var td4 = document.createElement("td");
			var lnk = document.createElement("a");
			lnk.setAttribute("href",incs[i][2]);
			lnk.innerHTML = i;
			td1.appendChild(lnk);
			td2.innerHTML = incs[i][0];
			td3.innerHTML = incs[i][1];
                        td4.innerHTML = incs[i][3];
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
                        tr.appendChild(td4);
			table.appendChild(tr);
		}
		if(empty){
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			td.setAttribute("colspan","3");
			td.setAttribute("align","center");
			td.innerHTML = "<i>Keine Befehle vorhanden</i>";
			tr.appendChild(td);
			table.appendChild(tr);
		}
		
		var a = document.createElement("a");
		a.innerHTML = "Schlie&szlig;en";
		a.addEventListener("click",function(){enabled=true;document.body.removeChild(div);},true);
		a.setAttribute("href","#");
		
		div.appendChild(table);
		div.appendChild(a);
		document.body.appendChild(div);
	}
	
	
	
	var a = document.createElement("a");
	a.setAttribute("href","#");
	a.setAttribute("onclick","return false");
	a.setAttribute("style","font-size:0.9em");
	a.addEventListener("click",handler,true);
	a.innerHTML = " (&Uuml;bersicht)";
	var index = (trs[0].innerHTML.match("Befehl.+Ziel.+Herkunft") ? 0 : 1);
	trs[index].getElementsByTagName("th")[1].appendChild(a);
}
// ==UserScript==
// @name           DS - einfach Gruppensetzen
// @version        v1.3
// @author        
// @description    Gruppenzugehörigkeit in der Dorfübersicht bearbeiten
// @include        http://de*.die-staemme.de/*screen=overview
// @include        http://de*.die-staemme.de/*screen=overview&*
// @include        http://de*.die-staemme.de/*screen=info_village*
// @include        http://de*.die-staemme.de/groups.php*
// ==/UserScript==

//Bestimmt ob die Gruppenzugehörigkeitstabelle auch angezeigt werden soll
tabellezeigen=false;

//Bestimmt ob die aktuelle Gruppenzugehörigkeit hervorgehoben werden soll
highlight=true;

//Bestimmt ob in der Dorfansicht die Tabelle noch vor den letzen Berichten angezeigt werden soll
vorBerichtenAnzeigen=false;

editcolor="#F7EED3";
highlightcolor="#F0D49A";

function starten() {
	try {
		var doc = getGameDoc();
		if(doc.URL.match("screen=overview")){
			//DorfID und UV ermitteln
			link=doc.getElementById('menu_row2').childNodes[7].firstChild.href;
			var villageid;
			var uvid="0";
			var server;
			pattern1=new RegExp("village=([0-9]+)","g");
			pattern2=new RegExp("t=([0-9]+)","g");
			pattern3=new RegExp("http://([A-Za-z0-9]+).","g");
			if(pattern1.test(link)){villageid=RegExp.$1;}
			if(pattern2.test(link)){uvid=RegExp.$1;}
			if(pattern3.test(link)){server=RegExp.$1;}
			//Prüfen ob Gruppen eingelesen wurden
			if(GM_getValue("groups||"+server+"||"+uvid+"||0", "0||default").split("||")[0]!=0){
				//gespeicherte Gruppen auslesen
				dorfgruppen=new Array();
				gruppen=new Array();
				var i=0;
				while((g=GM_getValue("groups||"+server+"||"+uvid+"||"+i, "0||default").split("||"))[0]!=0){
					gruppen.push(g);
					i++;
				}
				//Formular einfügen
				tabellen=doc.getElementsByTagName('table');
				for(var i=0;i<tabellen.length;i++){
					if((ths=tabellen[i].getElementsByTagName('th'))[0]!=null&&ths[0].innerHTML.match('Gruppenzugeh.rigkeit')){
						//Gruppen des Dorfes rausfinden
						for(var h=1;h<tabellen[i].getElementsByTagName('tr').length-1;h++){
							dorfgruppen.push(tabellen[i].getElementsByTagName('tr')[h].getElementsByTagName('td')[0].innerHTML);
						}
						//Tabelle zusammenbauen
						edit=doc.createElement('form');
						edit.method="post";
						edit.id="gruppensetzen";
						//für's Formular abschicken, wie Post-Methode aber verhindert refresh
						edit.action="javascript:";
						edit.action+="var http_request=false;";
						edit.action+="function makePOSTRequest(url,parameters){";
						edit.action+=	"http_request=new XMLHttpRequest();";
						edit.action+=	"if(http_request.overrideMimeType){";
						edit.action+=		"http_request.overrideMimeType('text/html');";
						edit.action+=	"}";
						edit.action+=	"http_request.open('POST',url,true);";
						edit.action+=	"http_request.setRequestHeader('Content-type','application/x-www-form-urlencoded');";
						edit.action+=	"http_request.setRequestHeader('Content-length',parameters.length);";
						edit.action+=	"http_request.setRequestHeader('Connection','close');";
						edit.action+=	"http_request.send(parameters);";
						edit.action+="}";
						edit.action+="function get(obj){";
						edit.action+=	"var poststr='village_id='+encodeURI(document.getElementById('groupedit0').value)";
						
						br=doc.createElement('br');
						edit.appendChild(br);
	
						input0=doc.createElement('input');
						input0.type="hidden";
						input0.name="village_id";
						input0.value=villageid;
						input0.id="groupedit0";
						edit.appendChild(input0);
	
						edittable = doc.createElement('table');
						edittable.class="vis";
						edittable.width="100%";
						edittable.id="groupedit";
						edittable.appendChild(doc.createElement('tr'));
						editth = document.createElement('th');
						editth.innerHTML="Gruppenzugeh&ouml;rigkeit";
						if(tabellezeigen){editth.innerHTML+=" bearbeiten";}
						edittable.lastChild.appendChild(editth);
						for(var g=0;g<gruppen.length;g++){
							edittable.appendChild(doc.createElement('tr'));
							edittd = document.createElement('td');
							edittd.style.backgroundColor=editcolor;
							
							check=doc.createElement('input');
							check.type="checkbox";
							check.class="check";
							check.name="groups[]";
							check.value=gruppen[g][0];
							check.id="groupedit"+(g+1);
							for(var r=0;r<dorfgruppen.length;r++){
								if(dorfgruppen[r]==gruppen[g][1]){
									check.checked=true;
									if(highlight)edittd.style.backgroundColor=highlightcolor;
									break;
								}
							}

							edit.action+="+'&groups[]='+encodeURI(";
							edit.action+=	"(document.getElementById('groupedit"+(g+1)+"').checked)?";
							edit.action+=		"document.getElementById('groupedit"+(g+1)+"').value:''";
							edit.action+=")";
							
							label=document.createElement('label');
							labeltext=document.createTextNode(gruppen[g][1]);
							label.appendChild(check);
							label.appendChild(labeltext);
							edittd.appendChild(label);
							edittable.lastChild.appendChild(edittd);
						}
						edit.appendChild(edittable);
	
						edit.action+=	";makePOSTRequest('/groups.php?action=village";
						if(uvid!="0"){edit.action+="&t="+uvid;}
						edit.action+=	"',poststr);";
						edit.action+="}";
						edit.action+="get(document.getElementById('gruppensetzen'));";
						//alte Tabelle aktualisieren		
						if(tabellezeigen){
							edit.action+="tabellen=document.getElementsByTagName('table');";
							edit.action+="for(var i=0;i<tabellen.length;i++){";
							edit.action+=	"if((ths=tabellen[i].getElementsByTagName('th'))[0]!=null&&ths[0].innerHTML.match('Gruppenzugeh.rigkeit')){";
							edit.action+=		"while(tabellen[i].rows.length-2>0){";
							edit.action+=			"tabellen[i].deleteRow(1);";
							edit.action+=		"}";
							edit.action+=		"var j=1;";
							edit.action+=		"while((inpt=document.getElementById('groupedit'+j))!=null){";
							edit.action+=			"if(inpt.checked){";
							edit.action+=				"var row=tabellen[i].insertRow(tabellen[i].rows.length-1);";
							edit.action+=				"var cell=row.insertCell(-1);";
							edit.action+=				"cell.innerHTML=inpt.nextSibling.data;";
							edit.action+=			"}";
							edit.action+=			"j++;";
							edit.action+=		"}";
							edit.action+=		"break;";
							edit.action+=	"}";
							edit.action+="}";
						}
						//Zeilen hervorheben
						if(highlight){
							edit.action+="table=document.getElementById('groupedit');";
							edit.action+="for(k=1;k<table.rows.length;k++){";
							edit.action+=	"if(table.rows[k].cells[0].firstChild.firstChild.checked){";
							edit.action+=		"table.rows[k].cells[0].style.backgroundColor='"+highlightcolor+"';";
							edit.action+=	"}else{";
							edit.action+=		"table.rows[k].cells[0].style.backgroundColor='"+editcolor+"';";
							edit.action+=	"}";
							edit.action+="}";
						}
						edit.action+="function end(){}end();";	

						setzen=doc.createElement('input');
						setzen.type="submit";
						setzen.value="Gruppen setzen";
						edit.appendChild(setzen);
						
						if(!tabellezeigen){
							a=doc.createElement('a');
							a.href="javascript:popup_scroll('groups.php?";
							if(uvid>0){a.href+="&t="+uvid;}
							a.href+="&mode=village&village_id="+villageid+"', 300, 400);";
							a.innerHTML="&raquo; bearbeiten";
							edit.appendChild(a);
						}
						
						tabellen[i].parentNode.insertBefore(edit, tabellen[i].nextSibling);
						//alte Tabelle ggf löschen
						if(!tabellezeigen){
							tabellen[i].parentNode.removeChild(tabellen[i].previousSibling.previousSibling);
							tabellen[i].parentNode.removeChild(tabellen[i]);
						}
						break;
					}
				}//for
			}//if
		}//mode=overview
		if(doc.URL.match("screen=info_village")){
			var link1=null;
			var link2=null;
			var tabellen=doc.getElementsByTagName("table");
			vistabellen=new Array();
			for(var i=0;i<tabellen.length;i++){
				if(tabellen[i].className=="vis left"){vistabellen.push(tabellen[i]);}
			}
			for(var i=0;i<(links=vistabellen[0].getElementsByTagName("a")).length;i++){
				if(links[i].innerHTML.match("Dorf.bersicht")){
					link1=links[i].href;
				}
				if(links[i].innerHTML.match("Gruppenzugeh.rigkeit.bearbeiten")){
					link2=links[i].href;
				}
			}
			if(link2!=null&&link1!=null){

				//DorfID und UV ermitteln
				var villageid;
				var uvid="0";
				var server;
				pattern1=new RegExp("village_id=([0-9]+)","g");
				pattern2=new RegExp("t=([0-9]+)","g");
				pattern3=new RegExp("http://([A-Za-z0-9]+).","g");
				if(pattern1.test(link2)){villageid=RegExp.$1;}
				if(pattern2.test(link2)){uvid=RegExp.$1;}
				if(pattern3.test(link1)){server=RegExp.$1;}
				//Prüfen ob Gruppen eingelesen wurden

				if(GM_getValue("groups||"+server+"||"+uvid+"||0", "0||default").split("||")[0]!=0){
					//gespeicherte Gruppen auslesen
					dorfgruppen=new Array();
					gruppen=new Array();
					var i=0;
					while((g=GM_getValue("groups||"+server+"||"+uvid+"||"+i, "0||default").split("||"))[0]!=0){
						gruppen.push(g);
						i++;
					}
					//Formular einfügen
					//Tabelle zusammenbauen
					edit=doc.createElement('form');
					edit.method="post";
					edit.id="gruppensetzen";
					//für's Formular abschicken, wie Post-Methode aber verhindert refresh
					edit.action="javascript:";
					edit.action+="var http_request=false;";
					edit.action+="function makePOSTRequest(url,parameters){";
					edit.action+=	"http_request=new XMLHttpRequest();";
					edit.action+=	"if(http_request.overrideMimeType){";
					edit.action+=		"http_request.overrideMimeType('text/html');";
					edit.action+=	"}";
					edit.action+=	"http_request.open('POST',url,true);";
					edit.action+=	"http_request.setRequestHeader('Content-type','application/x-www-form-urlencoded');";
					edit.action+=	"http_request.setRequestHeader('Content-length',parameters.length);";
					edit.action+=	"http_request.setRequestHeader('Connection','close');";
					edit.action+=	"http_request.send(parameters);";
					edit.action+="}";
					edit.action+="function get(obj){";
					edit.action+=	"var poststr='village_id='+encodeURI(document.getElementById('groupedit0').value)";
					
					//br=doc.createElement('br');
					//edit.appendChild(br);

					input0=doc.createElement('input');
					input0.type="hidden";
					input0.name="village_id";
					input0.value=villageid;
					input0.id="groupedit0";
					edit.appendChild(input0);

					edittable = doc.createElement('table');
					edittable.class="vis left";
					edittable.float="left";
					edittable.width="480";
					edittable.id="groupedit";
					edittable.appendChild(doc.createElement('tr'));
					editth = document.createElement('th');
					editth.innerHTML="Gruppenzugeh&ouml;rigkeit";
					if(tabellezeigen){editth.innerHTML+=" bearbeiten";}
					edittable.lastChild.appendChild(editth);
					for(var g=0;g<gruppen.length;g++){
						edittable.appendChild(doc.createElement('tr'));
						edittd = document.createElement('td');
						edittd.style.backgroundColor=editcolor;
						
						check=doc.createElement('input');
						check.type="checkbox";
						check.class="check";
						check.name="groups[]";
						check.value=gruppen[g][0];
						check.id="groupedit"+(g+1);
						for(var r=0;r<dorfgruppen.length;r++){
							if(dorfgruppen[r]==gruppen[g][1]){
								check.checked=true;
								if(highlight)edittd.style.backgroundColor=highlightcolor;
								break;
							}
						}

						edit.action+="+'&groups[]='+encodeURI(";
						edit.action+=	"(document.getElementById('groupedit"+(g+1)+"').checked)?";
						edit.action+=		"document.getElementById('groupedit"+(g+1)+"').value:''";
						edit.action+=")";
						
						label=document.createElement('label');
						labeltext=document.createTextNode(gruppen[g][1]);
						label.appendChild(check);
						label.appendChild(labeltext);
						edittd.appendChild(label);
						edittable.lastChild.appendChild(edittd);
					}
					edit.appendChild(edittable);

					edit.action+=	";makePOSTRequest('/groups.php?action=village";
					if(uvid!="0"){edit.action+="&t="+uvid;}
					edit.action+=	"',poststr);";
					edit.action+="}";
					edit.action+="get(document.getElementById('gruppensetzen'));";
					//alte Tabelle aktualisieren		
					if(tabellezeigen){
						edit.action+="tabellen=document.getElementsByTagName('table');";
						edit.action+="for(var i=0;i<tabellen.length;i++){";
						edit.action+=	"if((ths=tabellen[i].getElementsByTagName('th'))[0]!=null&&ths[0].innerHTML.match('Gruppenzugeh.rigkeit')){";
						edit.action+=		"while(tabellen[i].rows.length-2>0){";
						edit.action+=			"tabellen[i].deleteRow(1);";
						edit.action+=		"}";
						edit.action+=		"var j=1;";
						edit.action+=		"while((inpt=document.getElementById('groupedit'+j))!=null){";
						edit.action+=			"if(inpt.checked){";
						edit.action+=				"var row=tabellen[i].insertRow(tabellen[i].rows.length-1);";
						edit.action+=				"var cell=row.insertCell(-1);";
						edit.action+=				"cell.innerHTML=inpt.nextSibling.data;";
						edit.action+=			"}";
						edit.action+=			"j++;";
						edit.action+=		"}";
						edit.action+=		"break;";
						edit.action+=	"}";
						edit.action+="}";
					}
					//Zeilen hervorheben
					if(highlight){
						edit.action+="table=document.getElementById('groupedit');";
						edit.action+="for(k=1;k<table.rows.length;k++){";
						edit.action+=	"if(table.rows[k].cells[0].firstChild.firstChild.checked){";
						edit.action+=		"table.rows[k].cells[0].style.backgroundColor='"+highlightcolor+"';";
						edit.action+=	"}else{";
						edit.action+=		"table.rows[k].cells[0].style.backgroundColor='"+editcolor+"';";
						edit.action+=	"}";
						edit.action+="}";
					}
					edit.action+="function end(){}end();";	

					setzen=doc.createElement('input');
					setzen.type="submit";
					setzen.value="Gruppen setzen";
					edit.appendChild(setzen);
					
					box=doc.createElement('table');
					boxtr=doc.createElement('tr');
					boxtd=doc.createElement('td');
					boxtd.appendChild(edit);
					boxtr.appendChild(boxtd);
					box.appendChild(boxtr);

					if(vorBerichtenAnzeigen)vistabellen[0].parentNode.insertBefore(box, vistabellen[0].nextSibling);
					else vistabellen[0].parentNode.insertBefore(box, vistabellen[vistabellen.length-1].nextSibling);
				}//if
			}//if
		}//mode=dorf_info
		if(doc.URL.match("groups.php")){
			//UVid herausfinden
			var groupid;
			var uvid=0;
			var server;
			pattern1=new RegExp("t=([0-9]+)","g");
			pattern3=new RegExp("http://([A-Za-z0-9]+).","g");
			if(pattern1.test(doc.URL)){uvid=RegExp.$1;}
			if(pattern3.test(doc.URL)){server=RegExp.$1;}
			//Gruppennamen und -ids herausfinden
			tabellen=doc.getElementsByTagName("table");
			vistabellen=new Array();
			for(var i=0;i<tabellen.length;i++){
				if(tabellen[i].className=="vis"){vistabellen.push(tabellen[i]);}
			}
			//alte Liste löschen
			var j=0;
			while(GM_getValue("groups||"+server+"||"+uvid+"||"+j, "0||default").split("||")[0]!=0){
				GM_setValue("groups||"+server+"||"+uvid+"||"+j, "0||default");
				j++;
			}
			if(!doc.URL.match("mode")){
				zeilen=vistabellen[1].getElementsByTagName('tr');
				//neue Liste erstellen
				for(var i=0;i<zeilen.length;i++)
				{
					//gruppenname und gruppenid speichern
					links=zeilen[i].getElementsByTagName('a');
					link=links[links.length-1];
					pattern2=new RegExp("group_id=([0-9]+)","g");
					if(pattern2.test(link.href)){groupid=RegExp.$1;}
					groupname=link.innerHTML;
					GM_setValue("groups||"+server+"||"+uvid+"||"+i, groupid+"||"+groupname);
				}
			}
			else{
				zeilen=vistabellen[0].getElementsByTagName('tr');
				//neue Liste erstellen
				for(var i=1;i<zeilen.length;i++)
				{
					//gruppenname und gruppenid speichern
					input=zeilen[i].getElementsByTagName('input')[0];
					groupid=input.value;
					groupname=input.nextSibling.data;
					GM_setValue("groups||"+server+"||"+uvid+"||"+(i-1), groupid+"||"+groupname);
				}
			}
		}//groups.php  
	} catch(evt) {
		//pssst, don't tell
	}       
}           
            
function getGameDoc(){
	getdoc=window.document;
	if(!getdoc.URL.match("game.php")){
		for(i=0;i<window.frames.length;i++){
			if(window.frames[i].document.URL.match("game.php")){
				getdoc = window.frames[i].document;
			}
		}   
	}       
	return getdoc;
}//getGameDoc

starten();
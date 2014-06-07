// ==UserScript==
// @name OgameIt-Modifica Riepilogo
// @author Izcelion Traduttore: Pippo1985
// @description Modifica la visualizzazione del riepilogo
// @language IT
// @include http://ogame*.de/game/overview.php*
// ==/UserScript==
 
(function(){

//==========================================================
// Salva lista piaenti/lune
//==========================================================
var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
var url ="";
var optionnode = document.getElementsByTagName('option');
var tabAllPlanet = new Array();
var CptPlanet = 0;
for(var i=0;i<optionnode.length;i++){
	tabAllPlanet[CptPlanet] = new Array();
	tabtmp = (optionnode[i].innerHTML).split("    ");
	tabtmp[1] = (tabtmp[1].replace("[","")).replace("]","");
	if(CptPlanet==0){
		tabAllPlanet[CptPlanet][0] = tabtmp[0]; //nome pianeta
		tabAllPlanet[CptPlanet][1] = tabtmp[1]; //coordinate pianete
		tabAllPlanet[CptPlanet][2] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
		tabAllPlanet[CptPlanet][3] = "Sei qui";
		tabAllPlanet[CptPlanet][4] = "";		
		CptPlanet++;
	} else {
		var PlanetFind = false;
		var v=0;
		while(v<CptPlanet && PlanetFind==false){
			if(tabAllPlanet[v][1]==tabtmp[1]) PlanetFind = true;
			v++;
		}

		if(PlanetFind==true) v=v-1;
		else {
			v=CptPlanet;
			CptPlanet++;
		}		
		if (tabtmp[0]=="Luna" || PlanetFind==true){		
			tabAllPlanet[v][1] = tabtmp[1];				
			tabAllPlanet[v][4] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
		} else {
			tabAllPlanet[v][0] = tabtmp[0];			
			tabAllPlanet[v][1] = tabtmp[1];			
			tabAllPlanet[v][2] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
			tabAllPlanet[v][3] = "Sei qui";			
			tabAllPlanet[v][4] = "";			
		}
	}
}
//==========================================================
// Reingrandisci a l 75%
//==========================================================
var tablenode = document.getElementsByTagName('table');
for(var i=0;i<tablenode.length;i++){
	//MODIFICARE AL FONDO DELLA RIGA SUCCESSIVA PER CAMBIARE LA DIMENSIONE DELLA PAGINA RIEPILOGO
	if(tablenode[i].getAttribute("width")=="519" && (tablenode[i].innerHTML).indexOf("Ora del server",0)) tablenode[i].setAttribute("width","75%");
}
//==========================================================
// Salva le carratteristiche del pianeta selezionato
//==========================================================
var trnode = document.getElementsByTagName('tr');
var i = 0;
var status = true;
var tabPlanetCharacteristics = new Array();
var cpt = 0;
while (i<trnode.length) {
	var thnode = trnode[i].getElementsByTagName('th');
	if(thnode.length==2) {
		if((thnode[0].innerHTML).indexOf("Diametro",0)>=0 || (thnode[0].innerHTML).indexOf("Temperatura",0)>=0 || (thnode[0].innerHTML).indexOf("Coordinate",0)>=0 || (thnode[0].innerHTML).indexOf("Punteggio",0)>=0) {
			tabPlanetCharacteristics[cpt] = new Array();
			tabPlanetCharacteristics[cpt][0] = thnode[0].innerHTML;
			tabPlanetCharacteristics[cpt][1] = thnode[1].innerHTML;
			status = false;
			cpt++;
		}
	}
	if (status) i++;
	else {
		trnode[i].parentNode.removeChild(trnode[i]);
		trnode = document.getElementsByTagName('tr');
		status = true;
	}
}
//==========================================================
// Scrivi carratteristiche pianeti
//==========================================================
var thnode = document.getElementsByTagName('th');
var tableConstruct="";
for(var i=0;i<thnode.length;i++){
	if(thnode[i].getAttribute("colspan")=="2"){
		var imgnode = thnode[i].getElementsByTagName('img');
		if(imgnode.length==1){
			if(imgnode[0].getAttribute("height")=="200" && imgnode[0].getAttribute("width")=="200"){
				imgnode[0].setAttribute("height","150");
				imgnode[0].setAttribute("width","150");
				for(u=0;u<4;u++){
					tableConstruct += "<tr>";
					tableConstruct += "<td class=\"c\">"+tabPlanetCharacteristics[u][0]+"</td>";
					tableConstruct += "<th>"+tabPlanetCharacteristics[u][1]+"</th>";
					tableConstruct += "</tr>";
				}
				tableConstruct ="<table width=\"100%\">"+tableConstruct+"</table>";
				thnode[i].innerHTML += tableConstruct;
			}
		}
	}
}
//==========================================================
// Riscrive la lista pianeti con costruzioni
//==========================================================
var tablenode = document.getElementsByTagName('table');
var construction = "";
for(var i=0;i<tablenode.length;i++){
	if(tablenode[i].getAttribute("class")=="s" && tablenode[i].getAttribute("align")=="top" && tablenode[i].getAttribute("border")=="0"){
		var trnode = tablenode[i].getElementsByTagName('tr');
		var j = 0;
		var status = true;
		var cpt = 0;
		while (j<trnode.length) {
			var thnode = trnode[j].getElementsByTagName('th');
			if(thnode.length==2){
				for(g=0;g<thnode.length;g++){
					var ahrefnode = thnode[g].getElementsByTagName('a');
					var centernode = thnode[g].getElementsByTagName('center');
					if ((centernode[0].innerHTML).indexOf("Fermo",0)>=0) construction="Nessuna";
					else construction = centernode[0].innerHTML;
					for(s=0;s<CptPlanet;s++){
						if(tabAllPlanet[s][2]==ahrefnode[0].getAttribute("href")) tabAllPlanet[s][3]=construction;
						if(tabAllPlanet[s][4]==ahrefnode[0].getAttribute("href")) tabAllPlanet[s][5]=construction;
					}
					status = false;
					cpt++;
				}
			}

			if (status) j++;
			else {
				trnode[j].parentNode.removeChild(trnode[j]);
				trnode = tablenode[i].getElementsByTagName('tr');
				status = true;
			}
		}
		//=======================================================
		// Scrive la tabella
		//=======================================================
		tablenode[i].setAttribute("width","100%");
		tablenode[i].innerHTML = "";
		tablenode[i].innerHTML += "<tr><td class=\"c\">Coordinate</td><td class=\"c\">Pianeta</td><td class=\"c\">Costruzioni</td><td class=\"c\">Luna</td></tr>";
		for(s=0;s<CptPlanet;s++){
			//-------------------------------Modifica di Alex. Per rendere cliccabili le coordinate dei pianeti-------------------------------//
			testo=tabAllPlanet[s][1];
			GT1 = testo.match(/\d{1,3}:\d{1,3}:\d{1,3}/g);
			for(var j=0; j<GT1.length; j++) {                  
				 GT = GT1[j].match(/\d{1,3}/)
                ST1 = GT1[j].match(/:\d{1,3}/)
                ST =ST1[0].match(/\d{1,3}/)
                url = 'galaxy.php?session='+session +'&p1='+GT+'&p2='+ST+'&p3=1'					
			}			
			if(tabAllPlanet[s][4].length>0) tablenode[i].innerHTML += "<tr><td><a href='"+ url +"'>"+tabAllPlanet[s][1]+"</a></td><td><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td><a href='"+tabAllPlanet[s][4]+"'>Vai</a></td></tr>";
			else tablenode[i].innerHTML += "<tr><td><a href='" + url +"'>"+tabAllPlanet[s][1]+"</a></td><td><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td>&nbsp;-&nbsp;</td></tr>";
		}
	}
}

var toto=false;
if (toto==true) {
	var FramesNb = 0;	
	var divnode = ((parent.frames[FramesNb]).document).body.getElementsByTagName('div');
	var divfind=false;
	for(var i=0;i<divnode.length && divfind==false;i++){
		if (divnode[i].getAttribute("id")=="overviewsave") divfind=true;
	}
	
	var tablecreate = ((parent.frames[FramesNb]).document).createElement("table");
	if(divfind==false){
		tablecreate.innerHTML = "<div id=overviewsave>";
		tablecreate.innerHTML += "<tr><td class=\"c\">Coordinate</td><td class=\"c\">Pianeta</td><td class=\"c\">Costruzioni</td><td class=\"c\">Luna</td></tr>";
		for(s=0;s<CptPlanet;s++){
		//-------------------------------Modifica di Alex. Per rendere cliccabili le coordinate dei pianeti-------------------------------//
			testo=tabAllPlanet[s][1];
			GT1 = testo.match(/\d{1,3}:\d{1,3}:\d{1,3}/g);
			for(var j=0; j<GT1.length; j++) {                  
				 GT = GT1[j].match(/\d{1,3}/)
                ST1 = GT1[j].match(/:\d{1,3}/)
                ST =ST1[0].match(/\d{1,3}/)
                url = 'galaxy.php?session='+session +'&p1='+GT+'&p2='+ST+'&p3=1'						
			}	
			if(tabAllPlanet[s][4].length>0) tablecreate.innerHTML += "<tr><td><a href='"+ url +"'>"+tabAllPlanet[s][1]+"'</a></td><td><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td><a href='"+tabAllPlanet[s][4]+"'>Lune</a></td></tr>";
			else tablecreate.innerHTML += "<tr><td><a href='" + url +"'>"+tabAllPlanet[s][1]+"</a></td><td><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td>&nbsp;-&nbsp;</td></tr>";
		}
		tablecreate.innerHTML += "</div>";
		((parent.frames[FramesNb]).document).body.appendChild(tablecreate);
	}
}

})();
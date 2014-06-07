// ==UserScript==
// @name           RB Tool Beta
// @namespace      Ritterburgwelt
// @include        http://www.ritterburgwelt.de/rb/rbstart.php
// @description    Erweiterungen fuer 'Ritterburg - Alirion' http://www.ritterburgwelt.de Beta Version 
// @version        2.1.06
// ==/UserScript==

// Module findet man ueber die Suche nach "////" (4*"/")
// Funktionen ueber die Suche nach "///" (3*"/")
/*
ToDo-Liste

*/


//localStorage Variablen
//Ux,xxx,yyy: xxxxx<|>datum<|>y<|> (xxxxx=karte/'xxxxx'.gif bzw. y=lokal/server)
//Dorfxxx,yyy: Dorfname<|>Level<|>Ritter<|>allym'xx'.gif<|>Kriegsakademie j/n<|>Mauertyp<|>Datum<|><|><|>l<|>
//Reichsdoerfer: Dorfkoordinaten xxx,yyyxxx,yyyxxx,yyy u.s.w.
//Held'x': heldname+"|"+heldpos+"||"+heldimg)
//Ritterxxxxx: allym'xx'.gif<|>datum<|>y<|> (xxxxx=Rittername/allym'xx'.gif bzw. y=lokal/server)
var jetzt=new Date()
var tag=(jetzt.getDate()<10?"0":"")+jetzt.getDate()
var monat=jetzt.getMonth()+1
var monat=(monat<10?"0":"")+monat
var stunden=(jetzt.getHours()<10?"0":"")+jetzt.getHours()
var minuten=(jetzt.getMinutes()<10?"0":"")+jetzt.getMinutes()
var sekunden=(jetzt.getSeconds()<10?"0":"")+jetzt.getSeconds()
var aktdatum=right(jetzt.getFullYear(),2)+monat+tag+stunden+minuten+sekunden
//var aktsync=jetzt.getFullYear()+"-"+monat+"-"+tag+" "+stunden+":"+minuten+":"+sekunden
var aktsync=jetzt.getFullYear()+"-"+monat+"-"+tag
var aktsyncdate=new Date(parseInt(jetzt.getFullYear()),monat,tag,stunden,minuten,sekunden)
var datensammlungstool=localStorage.getItem("Datensammlung")

if (datensammlungstool==undefined){
	localStorage.setItem("Datensammlung","aktiviert")
	datensammlungstool=localStorage.getItem("Datensammlung")
}
var ressourcenmanagementtool=localStorage.getItem("Ressourcenmanagement")
if (ressourcenmanagementtool==undefined){
	localStorage.setItem("Ressourcenmanagement","aktiviert")
	ressourcenmanagementtool=localStorage.getItem("Ressourcenmanagement")
}
var allianztuermetool=localStorage.getItem("Allianztuerme")
if (allianztuermetool==undefined){
	localStorage.setItem("Allianztuerme","aktiviert")
	allianztuermetool=localStorage.getItem("Allianztuerme")
}
var synctool=localStorage.getItem("Sync")
if (synctool==undefined){
	localStorage.setItem("Sync","deaktiviert")
	synctool=localStorage.getItem("Sync")
}
var minikartetool=localStorage.getItem("Minikarte")
if (minikartetool==undefined){
	localStorage.setItem("Minikarte","aktiviert")
	minikartetool=localStorage.getItem("Minikarte")
}
var gelb=localStorage.getItem("Ressource_gelb")
if (gelb==undefined){
	localStorage.setItem("Ressource_gelb","15")
	gelb=localStorage.getItem("Ressource_gelb")
}
gelb=parseInt(gelb)
var rot=localStorage.getItem("Ressource_rot")
if (rot==undefined){
	localStorage.setItem("Ressource_rot","5")
	rot=localStorage.getItem("Ressource_rot")
}
rot=parseInt(rot)
var RW=localStorage.getItem("MinikarteGroesse")
if (RW==undefined){
	localStorage.setItem("MinikarteGroesse","19")
	RW=localStorage.getItem("MinikarteGroesse")
}
RW=parseInt(RW)
var ProdBerechnung=localStorage.getItem("Produktionsberechnung")
if (ProdBerechnung==undefined){
	localStorage.setItem("Produktionsberechnung","aktiviert")
	ProdBerechnung=localStorage.getItem("Produktionsberechnung")
}
var Syncdatum=localStorage.getItem("syncdatum")
if (Syncdatum==undefined){
	localStorage.setItem("syncdatum","0000-00-00 00:00:00")
}
var terrainzaehlerimport=localStorage.getItem("Terrainzaehlerimport");
if (terrainzaehlerimport==undefined){
	localStorage.setItem("Terrainzaehlerimport","0")
}
var dorfzaehlerimport=localStorage.getItem("Dorfzaehlerimport");
if (dorfzaehlerimport==undefined){
	localStorage.setItem("Dorfzaehlerimport","0")
}
var terrainzaehlerexport=localStorage.getItem("Terrainzaehlerexport");
if (terrainzaehlerexport==undefined){
	localStorage.setItem("Terrainzaehlerexport","0")
}
var dorfzaehlerexport=localStorage.getItem("Dorfzaehlerexport");
if (dorfzaehlerexport==undefined){
	localStorage.setItem("Dorfzaehlerexport","0")
}
var transferdaten=localStorage.getItem("transferdaten");
if (transferdaten==undefined){
	localStorage.setItem("transferdaten","")
}
////Datensammlung
if (datensammlungstool=="aktiviert"){
	if( document.title.search( /RB [^-]*- Thronsaal/) != -1 && datensammlungstool=="aktiviert" ){
		var imgEntries=document.getElementsByTagName('IMG');
		for (i=0;i<imgEntries.length;i++){
			if (left(imgEntries[i].src,38)=="http://www.ritterburgwelt.de/rb/wappen"){
				var ReichImg=imgEntries[i].src;
				localStorage.setItem("Reichsimage",ReichImg);
			}
		}
		var tableEntries=document.getElementsByTagName('FONT');
		for (i=0;i<tableEntries.length;i++){
			if (tableEntries[i].childNodes[0].nodeType==3){
				if (tableEntries[i].childNodes[0].nodeValue.search(/D.rfer/)>-1){
					tableEntries[i].parentNode.childNodes[4].lastChild.id="Doerfer";
					if (tableEntries[i].parentNode.childNodes[5]){
						tableEntries[i].parentNode.childNodes[5].lastChild.id="Aussenposten";
					}
				}
				if (tableEntries[i].childNodes[0].nodeValue=="Armeen"){
					tableEntries[i].nextSibling.id="Armeen";
				}
			}
		}
		var TREntries=document.getElementById("Doerfer").getElementsByTagName('TR');
		var KoordDoerfer="";
		for (i=0;i<TREntries.length;i++){
			KoordDoerfer=KoordDoerfer+trim(TREntries[i].childNodes[0].lastChild.nodeValue);
		}
		if (document.getElementById("Aussenposten")){
			var TREntries=document.getElementById("Aussenposten").getElementsByTagName('TR');
			for (i=0;i<TREntries.length;i++){
				KoordDoerfer=KoordDoerfer+trim(TREntries[i].childNodes[0].lastChild.nodeValue);
			}
		}
		localStorage.setItem("Reichsdoerfer",KoordDoerfer);
		for (i=0;i<4;i++){
			var hi=i+1;
			if (document.getElementById('Armeen').childNodes[0].childNodes[i]){
				var heldname=document.getElementById('Armeen').childNodes[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
				if (heldname.indexOf(":")>-1){
					heldname=left(heldname,heldname.length-2);
					//var heldnameint=document.getElementById('Armeen').childNodes[0].childNodes[i].childNodes[1].childNodes[0].lastChild.childNodes[0].childNodes[1].childNodes[1].childNodes[0].name
					var heldnameint="";
					if (document.getElementById('Armeen').childNodes[0].childNodes[i].childNodes[0].childNodes[2].nodeType==3){
						var heldpos=trim(document.getElementById('Armeen').childNodes[0].childNodes[i].childNodes[0].childNodes[2].nodeValue);
					}else{
						var heldpos=trim(document.getElementById('Armeen').childNodes[0].childNodes[i].childNodes[0].childNodes[3].nodeValue);
					}
					if (heldpos.indexOf("U")==-1){heldpos="U0,"+heldpos};
					var heldimg=document.getElementById('Armeen').childNodes[0].childNodes[i].childNodes[1].childNodes[0].lastChild.childNodes[0].childNodes[1].childNodes[1].childNodes[0].src;
					localStorage.setItem("held"+hi,heldname+"|"+heldpos+"|"+heldnameint+"|"+heldimg);
				}else{
					//bugfixed? Wenn Held tot, dann bricht das Skript ab: localStorage.setItem("held"+hi,heldname);
					localStorage.setItem("held"+hi,"kein");
				}
			}else{
				localStorage.setItem("held"+hi,"kein");
			}
		}
	}
	
	if( document.title.search( /RB [^-]*- Armee - Schiffsturm/) != -1 && datensammlungstool=="aktiviert" ){
		var foEntries=document.getElementsByTagName('FONT');
		for (fo=1;fo<foEntries.length;fo++){
			if (foEntries[fo].childNodes[0].nodeValue.search(/D.rfer/)>-1){
				foEntries[fo].nextSibling.id="Doerfer"
				var dorfEntries=document.getElementById("Doerfer").getElementsByTagName('TR');
			};
		}
		if (foEntries[2].childNodes[0].nodeValue=="Terrain"){		
			document.getElementsByTagName('TABLE')[1].id="Karte";
			var tEntries=document.getElementById("Karte").getElementsByTagName('TR');
			for (i=0;i<tEntries.length;i++){
				anzahl=5;
				for (z=0;z<anzahl;z++){
					if (document.getElementById("Karte").childNodes[0].childNodes[i].childNodes[z].childNodes[0].nodeType!=3){
						var Feldtyp=document.getElementById("Karte").childNodes[0].childNodes[i].childNodes[z].childNodes[0].src;
						if (Feldtyp!=undefined){
							var test=Feldtyp.length-strpos(Feldtyp,"karte/")-6;
							Feldtyp=right(Feldtyp,test);
							Feldtyp=left(Feldtyp,Feldtyp.length-4);
							var Koordt=document.getElementById("Karte").childNodes[0].childNodes[i].childNodes[z+anzahl+1].childNodes[0].nodeValue;
							Koordt=right(left(Koordt,10),7);
							terrainupdate("U0,"+Koordt,Feldtyp);
							var dorftreffer=0;
							if (document.getElementById("Doerfer")){
								for (j=0;j<dorfEntries.length;j++){
									var DorfKoord=dorfEntries[j].childNodes[0].childNodes[0].nodeValue;
									DorfKoord=DorfKoord.substr(1);
									DorfKoord=left(DorfKoord,7);
									if (Koordt==DorfKoord){
										var DorfName=trim(dorfEntries[j].childNodes[1].childNodes[0].nodeValue);
										DorfName=DorfName.replace(/^Dorf /,"");
										if (DorfName=="Aussenposten"){
											var DorfLevel="0"
										}else{
											var DorfLevel=trim(dorfEntries[j].childNodes[2].childNodes[0].nodeValue);
											DorfLevel=DorfLevel.substr(6);
										}
										var Ritter=trim(dorfEntries[j].childNodes[3].childNodes[1].childNodes[0].nodeValue);
										if (dorfEntries[j].childNodes[3].childNodes[3]){
											var Ally=trim(dorfEntries[j].childNodes[3].lastChild.src);
											Ally=Ally.substr(43);
											Ally=left(Ally,Ally.length-4);
										}else{
											var Ally="undefined";
										}
									
										var DorfInfos=localStorage.getItem("Dorf"+DorfKoord);
										if (DorfInfos==null){DorfInfos="<|><|><|><|><|><|><|><|><|><|><|>"}
										var DorfInfossplit=DorfInfos.split("<|>");
										if (DorfInfossplit[2]==Ritter){
											dorfupdate(DorfKoord,DorfName,DorfLevel,Ritter,Ally,DorfInfossplit[4],DorfInfossplit[5])
										}else{
											dorfupdate(DorfKoord,DorfName,DorfLevel,Ritter,Ally,"","")
										}
										dorftreffer=1;
									}
								}
							}
							if (dorftreffer==0){
								dorfupdate(Koordt,"","","","","","");
							}
						}
					}
				}	
			}
		}	
	}
	if(( document.title.search( /RB [^-]*- Allianzt/) != -1 && datensammlungstool=="aktiviert" )||
	(document.title.search( /RB [^-]*- Turm/) != -1 && datensammlungstool=="aktiviert")){
		var foEntries=document.getElementsByTagName('FONT');
		for (fo=0;fo<foEntries.length;fo++){
			if (foEntries[fo].childNodes[0].nodeValue=="Terrain"){
				foEntries[fo].nextSibling.id="Karte";
				var terEntries=document.getElementById("Karte").getElementsByTagName('TR');
			}
			if (foEntries[fo].childNodes[0].nodeValue.search(/D.rfer/)>-1){
				foEntries[fo].nextSibling.id="Doerfer";
				var dorfEntries=document.getElementById("Doerfer").getElementsByTagName('TR');
			}
		}
		if (document.getElementById("Karte")){
			var wt=0;
			for (i=0;i<terEntries.length;i++){
				if (terEntries.length==3){
					var anzahl=3;
					var mitte=1;
				} else {
					var anzahl=5;
					var mitte=2;
				}
				for (z=0;z<anzahl;z++){
					var Feldtyp=document.getElementById("Karte").childNodes[0].childNodes[i].childNodes[z].childNodes[0].src;
					var test=Feldtyp.length-strpos(Feldtyp,"karte/")-6;
					Feldtyp=right(Feldtyp,test);
					Feldtyp=left(Feldtyp,Feldtyp.length-4);
					var Koordt=document.getElementById("Karte").childNodes[0].childNodes[i].childNodes[z+anzahl].childNodes[0].nodeValue;
					Koordt=right(left(Koordt,10),7);
					terrainupdate("U0,"+Koordt,Feldtyp);
					if (left(Feldtyp,1)=="5"||left(Feldtyp,1)=="8"){wt=1}
					var dorftreffer=0
					if (document.getElementById("Doerfer")){
						for (j=0;j<dorfEntries.length;j++){
							var DorfKoord=dorfEntries[j].childNodes[0].childNodes[0].nodeValue;
							DorfKoord=DorfKoord.substr(1);
							DorfKoord=left(DorfKoord,7);
							if (Koordt==DorfKoord){
								var DorfName=trim(dorfEntries[j].childNodes[1].childNodes[0].nodeValue);
								DorfName=DorfName.replace(/^Dorf /,"");
										if (DorfName=="Aussenposten"){
											var DorfLevel="0"
										}else{
											var DorfLevel=trim(dorfEntries[j].childNodes[2].childNodes[0].nodeValue);
											DorfLevel=DorfLevel.substr(6);
										}
								var Ritter=trim(dorfEntries[j].childNodes[3].childNodes[1].childNodes[0].nodeValue);
								if (dorfEntries[j].childNodes[3].childNodes[3]){
									var Ally=trim(dorfEntries[j].childNodes[3].lastChild.src);
									Ally=Ally.substr(43);
									Ally=left(Ally,Ally.length-4);
								}else{
									var Ally="undefined";
								}
								var DorfInfos=localStorage.getItem("Dorf"+DorfKoord);
								if (DorfInfos==null){DorfInfos="<|><|><|><|><|><|><|><|><|><|><|>"}
								var DorfInfossplit=DorfInfos.split("<|>");
								if (DorfInfossplit[2]==Ritter){
									dorfupdate(DorfKoord,DorfName,DorfLevel,Ritter,Ally,DorfInfossplit[4],DorfInfossplit[5])
								}else{
									dorfupdate(DorfKoord,DorfName,DorfLevel,Ritter,Ally,"","")
								}
								dorftreffer=1;
							}
						}
					}
					if (dorftreffer==0){
						dorfupdate(Koordt,"","","","","","");
					}
				}
			}
			if (wt==1){
				var mittekoord=document.getElementById("Karte").childNodes[0].childNodes[mitte].childNodes[mitte+anzahl].childNodes[0].nodeValue;
				mittekoord=right(left(mittekoord,10),7);
				var wassertuerme=localStorage.getItem("wassertuerme");
				if (wassertuerme==null){wassertuerme=""}
				if (wassertuerme.indexOf(mittekoord)==-1){
					localStorage.setItem("wassertuerme",wassertuerme+mittekoord);
				}
			}else{
				var wassertuerme=localStorage.getItem("wassertuerme");
				if (wassertuerme==null){wassertuerme=""}
				if (wassertuerme.indexOf(mittekoord)>-1){
					wassertuerme=wassertuerme.replace(mittekoord,"");
					localStorage.setItem("wassertuerme",wassertuerme);
				}
			}	
		}		
	}

	if( document.title.search( /RB [^-]*- Armee/ ) != -1 && datensammlungstool=="aktiviert" ){
		var aFont=document.getElementsByTagName('table')[0].getElementsByTagName('FONT');
		if (aFont[0].childNodes[0].nodeValue=="Armee"){
			var ebene;
			document.getElementsByTagName("table")[4].id="Laufkarte";
			var textEntries=document.getElementsByTagName("table")[0].getElementsByTagName("FONT");
			for (var i = 0; i <textEntries.length; i++){
				if (textEntries[i].childNodes[0].nodeValue=="Held:"){
					textEntries[i].id="Held";
				}
				if (textEntries[i].childNodes[0].nodeValue.search("Dorf:")>-1){
					textEntries[i].parentNode.parentNode.parentNode.id="Dorf";
				}
				if (textEntries[i].childNodes[0].nodeValue.search("Aussenposten:")>-1){
					textEntries[i].parentNode.parentNode.parentNode.id="Aussenposten";
				}
				if (textEntries[i].childNodes[0].nodeValue=="Armeen"){
					textEntries[i].nextSibling.id="Armeen";
				}
			}
			var held=document.getElementById('Held').parentNode.nextSibling.childNodes[1].src;
			var heldname=trim(document.getElementById('Held').parentNode.nextSibling.nextSibling.childNodes[0].nodeValue);
			document.childNodes[0].childNodes[1].childNodes[2].childNodes[0].setAttribute('width','700');
	//Terraindaten aus Laufkarte auslesen und in localStorage eintragen
			var textEntries=document.getElementsByTagName("table")[2].getElementsByTagName("FONT");
			Ende: for (var i = 0; i <textEntries.length; i++){
				if (textEntries[i].childNodes[0].nodeValue=="Terrain:"){
					textEntries[i].id="Terrain";
				}
			}
			if(document.getElementById("Terrain")){
				var Koord=document.getElementById("Terrain").parentNode.parentNode.childNodes[2].childNodes[1].childNodes[0].nodeValue;
				if (Koord.length==11){
					ebene=left(Koord,2);
				} else {
					ebene="U0";
				}
				Koord=right(Koord,7);
				for (h=1;h<=4;h++){
					var heldnameStorage=localStorage.getItem("held"+h);
					if (heldnameStorage.indexOf(heldname)>-1){
						var heldsplit=heldnameStorage.split("|");
						localStorage.setItem("held"+h,heldsplit[0]+"|"+ebene+","+Koord+"|"+heldsplit[2]+"|"+heldsplit[3]);
					}
				}
				var Koordx=parseInt(left(Koord,3))-1;
				var Koordy=parseInt(right(Koord,3))-1;
				
				if (document.getElementById("Laufkarte").childNodes[0].childNodes[4]){
					var imgEntries = document.getElementById("Laufkarte").getElementsByTagName( "img" );
					for (var y=0; y<3;y++){
						for (var x=0; x<3;x++){
							Koordx2=Koordx+x;										
							Koordy2=Koordy+y;
							var Feldtyp=document.getElementById("Laufkarte").childNodes[0].childNodes[y+1].childNodes[x+1].childNodes[0].src;
							var test=Feldtyp.length-strpos(Feldtyp,"karte/")-6;
							Feldtyp=right(Feldtyp,test);
							Feldtyp=left(Feldtyp,Feldtyp.length-4);
							
							terrainupdate(ebene+","+Koordx2+","+Koordy2,Feldtyp);
						}
					}
				}
				if (document.getElementById("Dorf")||document.getElementById("Aussenposten")){
					
					if (document.getElementById("Aussenposten")){
						var DorfName="Aussenposten"
						var DorfLevel="0"
						var Ritter=trim(document.getElementById("Aussenposten").childNodes[0].childNodes[2].childNodes[1].childNodes[0].nodeValue);
						if (document.getElementById("Aussenposten").childNodes[0].childNodes[2].childNodes[3]){
							var Ally=document.getElementById("Aussenposten").childNodes[0].childNodes[2].childNodes[3].src;
						}else{
							Ally="undefined";
						}
						if (Ally!=undefined){
							Ally=Ally.substr(43);
							Ally=left(Ally,Ally.length-4);
						}else{
							Ally="undefined";
						}
						var Mauer="";
						var Kriegsakademie="";
					}else{
						var DorfName=trim(document.getElementById("Dorf").childNodes[0].childNodes[1].childNodes[0].nodeValue);
						var DorfLevel=trim(document.getElementById("Dorf").childNodes[0].childNodes[2].childNodes[0].nodeValue);
						DorfLevel=DorfLevel.substr(7);
						var Ritter=trim(document.getElementById("Dorf").childNodes[0].childNodes[3].childNodes[1].childNodes[0].nodeValue);
						if (document.getElementById("Dorf").childNodes[0].childNodes[3].childNodes[3]){
							var Ally=document.getElementById("Dorf").childNodes[0].childNodes[3].childNodes[3].src;
						}else{
							Ally="undefined";
						}
						if (Ally!=undefined){
							Ally=Ally.substr(43);
							Ally=left(Ally,Ally.length-4);
						}else{
							Ally="undefined";
						}
						if (document.getElementById("Dorf").childNodes[1].childNodes[1].childNodes[0]){
							var Kriegsakademie=document.getElementById("Dorf").childNodes[1].childNodes[1].childNodes[0].nodeValue;
							if (Kriegsakademie=="Kriegsakademie"){
								Kriegsakademie="Kriegsakademie";
								var Mauer=document.getElementById("Dorf").childNodes[1].childNodes[1].childNodes[2].nodeValue;
							}else{
								var Mauer=Kriegsakademie;
								Kriegsakademie="";
							}
						}
					}
					
					
					var DorfInfos=localStorage.getItem("Dorf"+Koord);
					if (DorfInfos==null){DorfInfos="<|><|><|><|><|><|><|><|><|>"}
					var DorfInfossplit=DorfInfos.split("<|>");
					dorfupdate(Koord,DorfName,DorfLevel,Ritter,Ally,Kriegsakademie,Mauer)
					ritterupdate("Ritter"+Ritter,Ally)
				}else{
					dorfupdate(Koord,"","","","","","");
				}
			}	
		}
	}
	if( document.title.search( /RB [^-]*- .bersicht der Reiche/) != -1 && datensammlungstool=="aktiviert" ){
		for (a=0;a<15;a++){
			if (document.getElementById("zeile_"+a+"_tabelle_")){	
				var ritter=document.getElementById("zeile_"+a+"_tabelle_").firstChild.childNodes[1].firstChild.nodeValue;
				if(document.getElementById("zeile_"+a+"_tabelle_").firstChild.childNodes[3]){
					if (document.getElementById("zeile_"+a+"_tabelle_").firstChild.childNodes[3].src!=undefined){
						var ally=document.getElementById("zeile_"+a+"_tabelle_").firstChild.childNodes[3].src
						vally=trim(ally);
						ally=ally.substr(43);
						ally=left(ally,ally.length-4);
					}else{
						var ally="undefined"
					}
				}else{
					var ally="undefined"
				}
				ritterupdate("Ritter"+ritter,ally)
			}
		}
	}
}
///Datensammlung Funktionen
function terrainupdate(schluessel,Feldtyp){
	wert=localStorage.getItem(schluessel);
	if (wert!=undefined){
		wertarray=wert.split("<|>");
		if (Feldtyp!=wertarray[0]){	
			localStorage.setItem(schluessel,Feldtyp+"<|>"+aktdatum+"<|>l<|>");
			transferdaten=localStorage.getItem("transferdaten");
			if (transferdaten==""){
				transferdaten = schluessel+"::"+Feldtyp+"<|>"+aktdatum+"<|>l<|>";
			}else{
				transferdaten = transferdaten + "||"+schluessel+"::"+Feldtyp+"<|>"+aktdatum+"<|>l<|>";
			}
			localStorage.setItem("transferdaten",transferdaten);
		}
	}else{
		localStorage.setItem(schluessel,Feldtyp+"<|>"+aktdatum+"<|>l<|>");
		transferdaten=localStorage.getItem("transferdaten");
		if (transferdaten==""){
			transferdaten = schluessel+"::"+Feldtyp+"<|>"+aktdatum+"<|>l<|>";
		}else{
			transferdaten = transferdaten + "||"+schluessel+"::"+Feldtyp+"<|>"+aktdatum+"<|>l<|>";
		}
		localStorage.setItem("transferdaten",transferdaten);
	}
}
function dorfupdate(koord,dorfname,level,ritter,allym,kriegsakademie,mauertyp){
	wert=localStorage.getItem("Dorf"+koord);
	neuliste=dorfname+"<|>"+level+"<|>"+ritter+"<|>"+allym+"<|>"+kriegsakademie+"<|>"+mauertyp
	if (wert!=undefined){
		wertarray=wert.split("<|>");
		altliste=wertarray[0]+"<|>"+wertarray[1]+"<|>"+wertarray[2]+"<|>"+wertarray[3]+"<|>"+wertarray[4]+"<|>"+wertarray[5]
		if (altliste!=neuliste){
			localStorage.setItem("Dorf"+koord,neuliste+"<|>"+aktdatum+"<|><|><|>l<|>");
			transferdaten=localStorage.getItem("transferdaten");
			if (transferdaten==""){
				transferdaten = "Dorf"+koord+"::"+neuliste+"<|>"+aktdatum+"<|><|><|>l<|>";
			}else{
				transferdaten = transferdaten + "||"+"Dorf"+koord+"::"+neuliste+"<|>"+aktdatum+"<|><|><|>l<|>";
			}
			localStorage.setItem("transferdaten",transferdaten);
		}
	}else{
		localStorage.setItem("Dorf"+koord,neuliste+"<|>"+aktdatum+"<|><|><|>l<|>");;
		transferdaten=localStorage.getItem("transferdaten");
		if (transferdaten==""){
			transferdaten = "Dorf"+koord+"::"+neuliste+"<|>"+aktdatum+"<|><|><|>l<|>";
		}else{
			transferdaten = transferdaten + "||"+"Dorf"+koord+"::"+neuliste+"<|>"+aktdatum+"<|><|><|>l<|>";
		}
		localStorage.setItem("transferdaten",transferdaten);
	}
	wert=localStorage.getItem("Dorf"+koord);
	allywert=localStorage.getItem("Ritter"+ritter)
	if (allywert!=undefined){
		allyarray=wert.split("<|>");
		if (allyarray[3]!=allym){
			localStorage.setItem("Ritter"+ritter,allym+"<|>"+aktdatum+"<|>l<|>");
			transferdaten=localStorage.getItem("transferdaten");
			if (transferdaten==""){
				transferdaten = "Ritter"+ritter+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
			}else{
				transferdaten = transferdaten + "||"+"Ritter"+ritter+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
			}
			localStorage.setItem("transferdaten",transferdaten);
		}
	}else{
		localStorage.setItem("Ritter"+ritter,allym+"<|>"+aktdatum+"<|>l<|>");	
		transferdaten=localStorage.getItem("transferdaten");
		if (transferdaten==""){
			transferdaten = "Ritter"+ritter+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
		}else{
			transferdaten = transferdaten + "||"+"Ritter"+ritter+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
		}
		localStorage.setItem("transferdaten",transferdaten);
	}
}
function ritterupdate(schluessel,allym){
	wert=localStorage.getItem(schluessel);
	if (wert!=undefined){
		wertarray=wert.split("<|>");
		if (allym!=wertarray[0]){	
			localStorage.setItem(schluessel,allym+"<|>"+aktdatum+"<|>l<|>");
			transferdaten=localStorage.getItem("transferdaten");
			if (transferdaten==""){
				transferdaten = schluessel+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
			}else{
				transferdaten = transferdaten + "||"+schluessel+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
			}
			localStorage.setItem("transferdaten",transferdaten);
		}
	}else{
		localStorage.setItem(schluessel,allym+"<|>"+aktdatum+"<|>l<|>");
		transferdaten=localStorage.getItem("transferdaten");
		if (transferdaten==""){
			transferdaten = schluessel+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
		}else{
			transferdaten = transferdaten + "||"+schluessel+"::"+allym+"<|>"+aktdatum+"<|>l<|>";
		}
		localStorage.setItem("transferdaten",transferdaten);
	}
}

////Ressourcenmanagement
if( document.title.search( /RB [^-]* - Info - Ressourcen/ ) != -1 && ressourcenmanagementtool=="aktiviert"){
	var textEntries=document.getElementsByTagName("FONT");
	for (i=0;i<textEntries.length;i++){
		if (textEntries[i].firstChild.nodeValue.search(/Reich/)!= -1){
			document.title += " *ergaenzt um verbleibende Zuege bzw. Tage durch Skript by Baracaleus*";
			var GueterTable=document.getElementsByTagName("table")[1];
			var newTR = document.createElement( 'tr' );
			var Zaehler=1;
			while (!GueterTable.getElementsByTagName("tr")[0].childNodes[Zaehler].childNodes[0].childNodes[0]){
				Zaehler++;
			}
			newTR=document.createElement("TR");
			GueterTable.getElementsByTagName("tr")[0].parentNode.insertBefore(newTR, GueterTable.getElementsByTagName("tr")[1]);
			for (var t=0;t<GueterTable.getElementsByTagName("tr")[0].childNodes.length;t++){
				newTD=document.createElement("TD");
				GueterTable.getElementsByTagName("tr")[1].appendChild(newTD);
			}
			newText=document.createTextNode("Tage verbleibend");
			GueterTable.getElementsByTagName("tr")[1].childNodes[0].appendChild(newText);
			minTage=999;
			for (var i = 2; i < 25; i++){
				if (GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].childNodes[0]){
					var Anzahl=GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].childNodes[0].childNodes[0].nodeValue;
					var Veraenderung=GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].childNodes[1].nodeValue;
					var Veraenderung=Veraenderung.replace("(","");			
					var Veraenderung=Veraenderung.replace(")","");			
					if (Veraenderung<0){
						var Tage=Math.floor(Anzahl/Math.abs(Veraenderung));
						if (Tage<minTage) minTage=Tage;
						newLIText = document.createTextNode(Tage);
						breakTag=document.createElement("BR");
						centerTag=document.createElement("center");
						BoldTag=document.createElement("b");
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].appendChild(breakTag);
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].appendChild(centerTag);
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].childNodes[3].appendChild(BoldTag);
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].childNodes[3].childNodes[0].appendChild(newLIText);
						if (Tage>gelb) GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].setAttribute('style', "background-color: green;");
						if (Tage<=gelb) GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].setAttribute('style', "background-color: yellow;");
						if (Tage<=rot) GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].setAttribute('style', "background-color: red;");
					}else{
						posProdText=document.createTextNode("OK");
						breakTag=document.createElement("BR");
						centerTag=document.createElement("center");
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].appendChild(breakTag);
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].appendChild(centerTag);
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].childNodes[0].childNodes[3].appendChild(posProdText);
						GueterTable.getElementsByTagName("tr")[i].childNodes[Zaehler].setAttribute('style', "background-color: olive;");
					}
				}
			}
			breakTag=document.createElement("BR");
			newLIText = document.createTextNode(minTage);
			BoldTag=document.createElement("b");
			centerTag=document.createElement("center");
			GueterTable.getElementsByTagName("tr")[1].childNodes[Zaehler].appendChild(BoldTag);
			GueterTable.getElementsByTagName("tr")[1].childNodes[Zaehler].childNodes[0].appendChild(centerTag);
			GueterTable.getElementsByTagName("tr")[1].childNodes[Zaehler].childNodes[0].childNodes[0].appendChild(newLIText);
			if (minTage>gelb) GueterTable.getElementsByTagName("tr")[1].childNodes[Zaehler].setAttribute('style', "background-color: green;");
			if (minTage<=gelb) GueterTable.getElementsByTagName("tr")[1].childNodes[Zaehler].setAttribute('style', "background-color: yellow;");
			if (minTage<=rot) GueterTable.getElementsByTagName("tr")[1].childNodes[Zaehler].setAttribute('style', "background-color: red;");
			for (var d = 1; d <Zaehler; d++){
				minTage=999;
				Dorfzuege=(GueterTable.getElementsByTagName("tr")[0].childNodes[d].childNodes[8].nodeValue);
				for (var i = 2; i < 25; i++){
					if (GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].childNodes[0]){
						var Werte=GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].childNodes[0].nodeValue;
						WerteSplit=Werte.split("(");
						var Anzahl=WerteSplit[0];
						var Veraenderung=WerteSplit[1].replace(")","");
						if (Veraenderung<0){
							var Ergebnis;
							if (danach==0){
								Ergebnis=0;
							}else{
								Ergebnis=Math.floor(Anzahl/Math.abs(Veraenderung))};
							var Tage;
							if (Ergebnis==0){
								Tage=0;
							}else{
								Tage=Math.floor(Ergebnis/Dorfzuege);
							}
							if (Tage<minTage){minTage=Tage};
							newLIText = document.createTextNode(Ergebnis+" | "+Tage);
							breakTag=document.createElement("BR");
							centerTag=document.createElement("center");
							BoldTag=document.createElement("b");
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].appendChild(breakTag);
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].appendChild(centerTag);
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].childNodes[2].appendChild(BoldTag);
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].childNodes[2].childNodes[0].appendChild(newLIText);
							if (Tage>gelb) GueterTable.getElementsByTagName("tr")[i].childNodes[d].setAttribute('style', "background-color: green;");
							if (Tage<=gelb) GueterTable.getElementsByTagName("tr")[i].childNodes[d].setAttribute('style', "background-color: yellow;");
							if (Tage<=rot) GueterTable.getElementsByTagName("tr")[i].childNodes[d].setAttribute('style', "background-color: red;");
						}else{
							posProdText=document.createTextNode("OK");
							breakTag=document.createElement("BR");
							centerTag=document.createElement("center");
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].appendChild(breakTag);
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].appendChild(centerTag);
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].childNodes[0].childNodes[2].appendChild(posProdText);
							GueterTable.getElementsByTagName("tr")[i].childNodes[d].setAttribute('style', "background-color: olive;");
						}
					}
				}	
				breakTag=document.createElement("BR");
				newLIText = document.createTextNode(minTage);
				BoldTag=document.createElement("b");
				centerTag=document.createElement("center");
				GueterTable.getElementsByTagName("tr")[1].childNodes[d].appendChild(BoldTag);
				GueterTable.getElementsByTagName("tr")[1].childNodes[d].childNodes[0].appendChild(centerTag);
				GueterTable.getElementsByTagName("tr")[1].childNodes[d].childNodes[0].childNodes[0].appendChild(newLIText);
				if (minTage>gelb) GueterTable.getElementsByTagName("tr")[1].childNodes[d].setAttribute('style', "background-color: green;");
				if (minTage<=gelb) GueterTable.getElementsByTagName("tr")[1].childNodes[d].setAttribute('style', "background-color: yellow;");
				if (minTage<=rot) GueterTable.getElementsByTagName("tr")[1].childNodes[d].setAttribute('style', "background-color: red;");
			}
		}
	}
}
if( document.title.search( /Zugergebnisse/ ) != -1 && ressourcenmanagementtool=="aktiviert" ){
	var centerEntries=document.getElementsByTagName("CENTER");
	if (centerEntries[2].firstChild.nodeValue.search(/negative Güterbilanz/)== -1){		
		
		document.title += " *ergaenzt um verbleibende Zuege durch Skript by Baracaleus*";
		newTR=document.createElement("TR");
		var haupt;
		var i=0;
		while (document.getElementsByTagName("table")[i]){
			if (document.getElementsByTagName("table")[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0]){
				if(document.getElementsByTagName("table")[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue!=null){
					if(document.getElementsByTagName("table")[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue.search(/Gut/)!=-1){
						haupt=document.getElementsByTagName("table")[i];
						break;
					}
				}
			}
			i++;
		}
		newTD=document.createElement("TD");
		newText=document.createTextNode("Zuege");
		haupt.childNodes[0].childNodes[0].appendChild(newTD);
		haupt.childNodes[0].childNodes[0].childNodes[4].appendChild(newText);
		Zaehler=2;
		gelb=Math.floor(gelb*6);
		rot=Math.floor(rot*6);
		var danach;
		var diff;
		var erg;
		var roter_bereich;
		var warenbez;
		var warensumme;
		roter_bereich=0;
		while (haupt.childNodes[0].childNodes[Zaehler]){
			danach=haupt.childNodes[0].childNodes[Zaehler].childNodes[3].childNodes[0].nodeValue;
			diff=haupt.childNodes[0].childNodes[Zaehler].childNodes[2].childNodes[0].nodeValue;
			var erg;
			if (danach==0){
				erg=0;
			}else{
				erg=Math.floor(danach/diff);
			}
			if (erg<0){
				var zuege=Math.floor(danach/Math.abs(diff));
				newLIText = document.createTextNode(zuege);
				newTD=document.createElement("TD");
				centerTag=document.createElement("center");
				BoldTag=document.createElement("b");
				warenbez=haupt.childNodes[0].childNodes[Zaehler].childNodes[0].childNodes[1].getAttribute("alt", false);
				haupt.childNodes[0].childNodes[Zaehler].appendChild(newTD);
				haupt.childNodes[0].childNodes[Zaehler].childNodes[4].appendChild(BoldTag);
				haupt.childNodes[0].childNodes[Zaehler].childNodes[4].childNodes[0].appendChild(newLIText);
				if (zuege>gelb) {haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: green;")};
				if (zuege<=gelb) {haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: yellow;")};
				if (zuege<=rot){
					haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: red;");
					roter_bereich++;
					if (typeof warensumme=='undefined'){
						warensumme=warenbez + "(" + zuege + ")";
					}else{
						warensumme=warensumme + ", "+warenbez + "(" + zuege + ")";
					}
				}
			}else{
				posProdText=document.createTextNode("OK");
				centerTag=document.createElement("center");
				newTD=document.createElement("TD");
				haupt.childNodes[0].childNodes[Zaehler].appendChild(newTD);
				haupt.childNodes[0].childNodes[Zaehler].childNodes[4].appendChild(posProdText);
				haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: olive;");
			}
			Zaehler++;
		}
		if (roter_bereich!=0){
		newFONT=document.createElement("FONT");
		document.getElementsByTagName("table")[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].insertBefore(newFONT, document.getElementsByTagName("table")[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].nextSibling);
		newCenter=document.createElement("CENTER");
		document.getElementsByTagName("table")[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1].setAttribute('style', "font-size: large;");
		document.getElementsByTagName("table")[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1].appendChild(newCenter);
		newLIText = document.createTextNode("Ressource(n) im roten Bereich: " + warensumme);
		document.getElementsByTagName("table")[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].setAttribute('style', "background-color: red;");
		document.getElementsByTagName("table")[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].appendChild(newLIText);
		}
	}
}
if( document.title.search( /tertransfer/ ) != -1 && ressourcenmanagementtool=="aktiviert" ){
	if (document.getElementsByTagName("table")[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].nodeValue.search(/Dorf/)!=-1){
		document.title += " *ergaenzt um verbleibende Zuege durch Skript by Baracaleus*";
		var haupt;
		haupt=document.getElementsByTagName("table")[1];
		newTR=document.createElement("TR");
		haupt.childNodes[0].insertBefore(newTR, haupt.childNodes[0].childNodes[8].nextSibling);
		newTD=document.createElement("TD");
		newText=document.createTextNode("Zuege");
		haupt.childNodes[0].childNodes[9].appendChild(newTD);
		newTD=document.createElement("TD");
		haupt.childNodes[0].childNodes[9].appendChild(newTD);
		newTD=document.createElement("TD");
		haupt.childNodes[0].childNodes[9].appendChild(newTD);
		newTD=document.createElement("TD");
		haupt.childNodes[0].childNodes[9].appendChild(newTD);
		newTD=document.createElement("TD");
		haupt.childNodes[0].childNodes[9].appendChild(newTD);
		newTD=document.createElement("TD");
		haupt.childNodes[0].childNodes[9].appendChild(newTD);
		haupt.childNodes[0].childNodes[9].childNodes[5].appendChild(newText);
		Zaehler=10;
		gelb=Math.floor(gelb*6);
		rot=Math.floor(rot*6);
		while (haupt.childNodes[0].childNodes[Zaehler].childNodes[0].childNodes[0].childNodes[0].nodeValue.search(/Gegenst/)==-1){
			newTD=document.createElement("TD");
			haupt.childNodes[0].childNodes[Zaehler].appendChild(newTD);
			var Werte=haupt.childNodes[0].childNodes[Zaehler].childNodes[1].childNodes[0].childNodes[0].nodeValue;
				WerteSplit=Werte.split("(");
				var Anzahl=WerteSplit[0];
				if (WerteSplit[1]!=null){
					var Veraenderung=WerteSplit[1].replace(")","");
					if (Veraenderung<0){
						var zuege=Math.floor(Anzahl/Math.abs(Veraenderung));
						newLIText = document.createTextNode(zuege);
						centerTag=document.createElement("center");
						BoldTag=document.createElement("b");
						haupt.childNodes[0].childNodes[Zaehler].childNodes[4].appendChild(centerTag);
						haupt.childNodes[0].childNodes[Zaehler].childNodes[4].childNodes[0].appendChild(BoldTag);
						haupt.childNodes[0].childNodes[Zaehler].childNodes[4].childNodes[0].childNodes[0].appendChild(newLIText);
						if (zuege>gelb) {haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: green;")};
						if (zuege<=gelb) {haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: yellow;")};
						if (zuege<=rot) {haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: red;")};
					}else{
						posProdText=document.createTextNode("OK");
						centerTag=document.createElement("center");
						haupt.childNodes[0].childNodes[Zaehler].childNodes[4].appendChild(centerTag);
						haupt.childNodes[0].childNodes[Zaehler].childNodes[4].childNodes[0].appendChild(posProdText);
						haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: olive;");
					}
				}else{
					posProdText=document.createTextNode("OK");
					centerTag=document.createElement("center");
					haupt.childNodes[0].childNodes[Zaehler].childNodes[4].appendChild(centerTag);
					haupt.childNodes[0].childNodes[Zaehler].childNodes[4].childNodes[0].appendChild(posProdText);
					haupt.childNodes[0].childNodes[Zaehler].childNodes[4].setAttribute('style', "background-color: olive;");
				}
				Zaehler++;
		}
	}
}

////Allianztuerme
if( document.title.search( /RB [^-]*- Allianzt/) != -1 && allianztuermetool=="aktiviert" ){
	document.title += " *Allianztuerme gefiltert*";
	var tuerme, filter, test, turm, rightTable,ritter, RW, Koord;
	filter = localStorage.getItem("tuerme");
	RW="";
	Koord="";
	RW=localStorage.getItem("RW");
	Koord=localStorage.getItem("Koord");
	if (document.getElementsByTagName('TABLE')[1].nextSibling.childNodes[0].nodeType==3){
		document.getElementsByTagName('TABLE')[3].id="Karte";
		var tEntries=document.getElementById("Karte").getElementsByTagName('TR');
		for (i=0;i<tEntries.length;i++){
			if (tEntries.length==3){
				var anzahl=3;
			} else {
				var anzahl=5;
			}
			for (z=0;z<anzahl;z++){
				var Feldtyp=document.getElementById("Karte").childNodes[0].childNodes[i].childNodes[z].childNodes[0].src;
				var test=Feldtyp.length-strpos(Feldtyp,"karte/")-6;
				Feldtyp=right(Feldtyp,test);
				Feldtyp=left(Feldtyp,Feldtyp.length-4);
				var Koordt=document.getElementById("Karte").childNodes[0].childNodes[i].childNodes[z+anzahl].childNodes[0].nodeValue;
				Koordt=right(left(Koordt,10),7);
				terrainupdate("U0,"+Koordt,Feldtyp);
			}
		}
	}
//Tuerme-Button erzeugen
	var sckButtDiv = document.createElement('div');
	sckButtDiv.innerHTML = 
     	'<form class="sckbutton" method="GET" action="#">' +
     	'<input id="sckbutton1" type="button" value="Turmverwendung zuruecksetzen">' +
     	'</form>';
	newTable=document.createElement('TABLE');
	document.getElementsByTagName('TABLE')[1].parentNode.insertBefore(newTable,document.getElementsByTagName('TABLE')[1].nextSibling);
	document.getElementsByTagName('TABLE')[1].nextSibling.id="newTable";
	newTbody=document.createElement('TBODY');
	document.getElementById('newTable').appendChild(newTbody);
	newTR=document.createElement('TR');
	document.getElementById('newTable').childNodes[0].appendChild(newTR);
	newTD=document.createElement('TD');
	document.getElementById('newTable').childNodes[0].childNodes[0].appendChild(newTD);
	newTD=document.createElement('TD');
	document.getElementById('newTable').childNodes[0].childNodes[0].appendChild(newTD);
	newTD=document.createElement('TD');
	document.getElementById('newTable').childNodes[0].childNodes[0].appendChild(newTD);
	document.getElementById('newTable').childNodes[0].childNodes[0].childNodes[1].appendChild(sckButtDiv);
	var button = document.getElementById("sckbutton1");
	button.addEventListener('click', resetvalue, true);
	newTable=document.createElement('TABLE');
	document.getElementById('newTable').parentNode.insertBefore(newTable,document.getElementById('newTable').nextSibling);
	document.getElementById('newTable').nextSibling.id="newTable2";
	newTbody=document.createElement('TBODY');
	document.getElementById('newTable2').appendChild(newTbody);
	newTR=document.createElement('TR');
	document.getElementById('newTable2').childNodes[0].appendChild(newTR);
	newTD=document.createElement('TD');
	document.getElementById('newTable2').childNodes[0].childNodes[0].appendChild(newTD);
	newTD=document.createElement('TD');
	document.getElementById('newTable2').childNodes[0].childNodes[0].appendChild(newTD);
	newTD=document.createElement('TD');
	document.getElementById('newTable2').childNodes[0].childNodes[0].appendChild(newTD);
	newTD=document.createElement('TD');
	document.getElementById('newTable2').childNodes[0].childNodes[0].appendChild(newTD);
//Input-Feld fuer Reichweite erzeugen
	var inputRWDiv = document.createElement('div');
	inputRWDiv.innerHTML = 
	'<form name="Formular">' +
	'In Reichweite von: ' +
	'<input type="text" size="2" id="EingabeRW" name="EingabeRW" value=\''+RW+'\'>' +
	'</form>';
    document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[0].appendChild(inputRWDiv);
	document.getElementById;
//Input-Feld fuer Koordinaten erzeugen
	var inputKoDiv = document.createElement('div');
	inputKoDiv.innerHTML = 
	'<form name="Formular2">' +
	' Feldern um Koordianten ' +
	'<input type="text" size="7" id="EingabeKoord" name="EingabeKoord" value=\''+Koord+'\' >' +
	'</form>';
    document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[1].appendChild(inputKoDiv);
//Markieren-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
     	'<form class="sckbutton" method="GET" action="#">' +
     	'<input id="sckbutton2" type="button" value="Markierung setzen">' +
     	'</form>';
	document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[2].appendChild(MarkButtDiv);
	var button2 = document.getElementById("sckbutton2");
	button2.addEventListener('click', einfaerben, true);
//Loeschen-Button erzeugen
	var LoeButtDiv = document.createElement('div');
	LoeButtDiv.innerHTML = 
     	'<form class="sckbutton" method="GET" action="#">' +
     	'<input id="sckbutton3" type="button" value="Markierung loeschen">' +
     	'</form>';
	document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[3].appendChild(LoeButtDiv);
	var button3 = document.getElementById("sckbutton3");
	button3.addEventListener('click', einfaerben_loe, true);
	var turmart=document.getElementById('newTable2').nextSibling.childNodes[0].nodeValue;
	if (right(turmart,5)=="sicht"){
		var turmkoord=document.getElementsByTagName('TABLE')[5].childNodes[0].childNodes[1].childNodes[4].childNodes[0].nodeValue;
		turmkoord=right(left(turmkoord,10),7);
		var position=strpos(filter,turmkoord,0);
		if (position==false) {
			localStorage.setItem("tuerme", localStorage.getItem("tuerme")+"|"+turmkoord);
		}
	} else {
		if (right(turmart,5)=="ht(2)"){
			var turmkoord=document.getElementsByTagName('TABLE')[5].childNodes[0].childNodes[2].childNodes[7].childNodes[0].nodeValue;
			turmkoord=right(left(turmkoord,10),7);
			var position=strpos(filter,turmkoord,0);
			if (position==false) {
				localStorage.setItem("tuerme", localStorage.getItem("tuerme")+"|"+turmkoord);
			}
		}
	}
	filter=localStorage.getItem("tuerme");
	var tableEntries=document.getElementsByTagName('table');
	Ende: for (var i = 0; i <tableEntries.length; i++){
		if(tableEntries[i].childNodes[0]){
			if(tableEntries[i].childNodes[0].childNodes[0]){
				if(tableEntries[i].childNodes[0].childNodes[0].childNodes[0]){
					if(tableEntries[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0]){
						if(tableEntries[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]){
							if (tableEntries[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue=="Koordinaten"){
								rightTable=i;
								break Ende;
							}
						}
					}
				}
			}
		}
	}
	var wassertuerme=localStorage.getItem("wassertuerme");
	if (wassertuerme==null){wassertuerme=""}
	var tuermeEntries = document.getElementsByTagName("table")[rightTable].getElementsByTagName('TR');
	for( var i = 0; i < tuermeEntries.length; i++ ){
		if(tuermeEntries[i].childNodes[0].childNodes[0].childNodes[0]){
			turm=trim(tuermeEntries[i].childNodes[0].childNodes[0].childNodes[0].nodeValue);
			if (strpos(filter,turm)!=false){
				tuermeEntries[i].childNodes[0].removeChild(tuermeEntries[i].childNodes[0].childNodes[0]);
				newText=document.createTextNode(turm);
				tuermeEntries[i].childNodes[0].appendChild(newText);
				ritter=tuermeEntries[i].childNodes[1].childNodes[0].childNodes[0].nodeValue;
				tuermeEntries[i].childNodes[1].removeChild(tuermeEntries[i].childNodes[1].childNodes[0]);
				newText=document.createTextNode(ritter);
				tuermeEntries[i].childNodes[1].appendChild(newText);
			}
		}
		if (wassertuerme.indexOf(turm)>-1){
			newImg=document.createElement('IMG');
			tuermeEntries[i].childNodes[0].appendChild(newImg);
			tuermeEntries[i].childNodes[0].childNodes[1].setAttribute("src","http://www.ritterburgwelt.de/rb/bild/gui/blank.gif");
			tuermeEntries[i].childNodes[0].childNodes[1].setAttribute("height",10);
			tuermeEntries[i].childNodes[0].childNodes[1].setAttribute("width",10);
			newImg=document.createElement('IMG');
			tuermeEntries[i].childNodes[0].appendChild(newImg);
			tuermeEntries[i].childNodes[0].childNodes[2].setAttribute('src',"http://www.ritterburgwelt.de/rb/bild/karte/52v4.gif");
			tuermeEntries[i].childNodes[0].childNodes[2].setAttribute('width',16);
			tuermeEntries[i].childNodes[0].childNodes[2].setAttribute('height',16);
		}
	}
	einfaerben()
}
///Allianztuerme Funktionen
function einfaerben_loe() {
	localStorage.setItem("RW", "");
	localStorage.setItem("Koord","");
//Input-Feld fuer Reichweite erzeugen
	document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[0].removeChild(document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[0].childNodes[0]);
	document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[1].removeChild(document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[1].childNodes[0]);
	var inputRWDiv = document.createElement('div');
	inputRWDiv.innerHTML = 
	'<form name="Formular">' +
	'In Reichweite von: ' +
	'<input type="text" size="2" id="EingabeRW" name="EingabeRW" value=\''+RW+'\'>' +
	'</form>';
    document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[0].appendChild(inputRWDiv);
	document.getElementById;
//Input-Feld fuer Koordinaten erzeugen
	var inputKoDiv = document.createElement('div');
	inputKoDiv.innerHTML = 
	'<form name="Formular2">' +
	' Feldern um Koordianten ' +
	'<input type="text" size="7" id="EingabeKoord" name="EingabeKoord" value=\''+Koord+'\' >' +
	'</form>';
    document.getElementById('newTable2').childNodes[0].childNodes[0].childNodes[1].appendChild(inputKoDiv);
	var tuermeEntries = document.getElementsByTagName("table")[rightTable].getElementsByTagName('TR');
	for( var i = 1; i < tuermeEntries.length; i++ ){
		if(tuermeEntries[i].childNodes[0].childNodes[0].childNodes[0]){
			tuermeEntries[i].removeAttribute('style', false);
		}
	}
}
function einfaerben() {
	var RW=document.getElementById("EingabeRW").value;
	var Koord=document.getElementById("EingabeKoord").value;
	var Koord1x=parseInt(left(Koord,3));
	var Koord1y=parseInt(right(Koord,3));
	var KommaTest=right(left(Koord,4),1);
	if (KommaTest=","){
		var tuermeEntries = document.getElementsByTagName("table")[rightTable].getElementsByTagName('TR');
		for( var i = 1; i < tuermeEntries.length; i++ ){
			var diffe=0;
			if(tuermeEntries[i].childNodes[0].childNodes[0].childNodes[0]){
				turm=trim(tuermeEntries[i].childNodes[0].childNodes[0].childNodes[0].nodeValue);
				var Koord2x=parseInt(left(turm,3));
				var Koord2y=parseInt(right(turm,3));
				if (Koord2x>Koord1x){
					diffe=diffe+Koord2x-Koord1x;
				} else {
					diffe=diffe+Koord1x-Koord2x;
				}
				if (Koord2y>Koord1y){
					diffe=diffe+Koord2y-Koord1y;
				} else {
					diffe=diffe+Koord1y-Koord2y;
				}
				if (RW>=diffe){
					tuermeEntries[i].setAttribute('style', "background-color: green;");
				} else {
					tuermeEntries[i].removeAttribute('style', false);
				}
			} else {
				if(tuermeEntries[i].childNodes[0].childNodes[0]){
					turm=trim(tuermeEntries[i].childNodes[0].childNodes[0].nodeValue);
					var Koord2x=parseInt(left(turm,3));
					var Koord2y=parseInt(right(turm,3));
					if (Koord2x>Koord1x){
						diffe=diffe+Koord2x-Koord1x;
					} else {
						diffe=diffe+Koord1x-Koord2x;
					}
					if (Koord2y>Koord1y){
						diffe=diffe+Koord2y-Koord1y;
					} else {
						diffe=diffe+Koord1y-Koord2y;
					}
					if (RW>=diffe){
						tuermeEntries[i].setAttribute('style', "background-color: green;");
					} else {
						tuermeEntries[i].removeAttribute('style', false);
					}
				}
			}
		}
	}
	localStorage.setItem("RW",RW);
	localStorage.setItem("Koord",Koord);
}

////Minikarte
if( document.title.search( /RB [^-]*- Armee/ ) != -1){
	var aFont=document.getElementsByTagName('table')[0].getElementsByTagName('FONT');
	if (aFont[0].childNodes[0].nodeValue=="Armee"){
		var textEntries=document.getElementsByTagName("table")[2].getElementsByTagName("FONT");
		for (var i = 0; i <textEntries.length; i++){
			if (textEntries[i].childNodes[0].nodeValue=="Terrain:"){
				textEntries[i].id="Terrain";
				var Koord=document.getElementById("Terrain").parentNode.parentNode.childNodes[2].childNodes[1].childNodes[0].nodeValue;
				if (Koord.length==11){
					ebene=left(Koord,2);
				} else {
					ebene="U0";
				}
				Koord=right(Koord,7);
				var Koordx=parseInt(left(Koord,3))-1;
				var Koordy=parseInt(right(Koord,3))-1;
				var held=document.getElementsByTagName("table")[3].childNodes[0].childNodes[1].childNodes[1].childNodes[0].src;
				document.childNodes[0].childNodes[1].childNodes[2].childNodes[0].setAttribute('width','700');
			}
		}
		var minikarte=localStorage.getItem("Minikarte");
		if (minikarte=="aktiviert"){
			var button3text="Karte aktiviert";
		} else {
			var button3text="Karte deaktiviert";
		}
		//Minikarte-Button erzeugen
		var MarkButtDiv = document.createElement('div');
		MarkButtDiv.innerHTML = 
			'<form class="sckbutton" method="GET" action="#">' +
			'<input id="sckbutton3" type="button" value=\''+button3text+'\'>' +
			'</form>';
		newTD=document.createElement('TD');
		document.getElementsByTagName('table')[1].childNodes[0].childNodes[0].appendChild(newTD);
		document.getElementsByTagName('table')[1].childNodes[0].childNodes[0].lastChild.id="Buttonfeld";
		document.getElementsByTagName('table')[1].childNodes[0].childNodes[0].lastChild.appendChild(MarkButtDiv);
		var button3 = document.getElementById("sckbutton3");
		button3.addEventListener('click', kartenswitch, true);
		newTable=document.createElement('TABLE');
		document.childNodes[0].childNodes[1].childNodes[2].appendChild(newTable);
		newTBody=document.createElement('TBODY');
		document.childNodes[0].childNodes[1].childNodes[2].childNodes[1].appendChild(newTBody);
		document.childNodes[0].childNodes[1].childNodes[2].childNodes[1].childNodes[0].setAttribute('valign','top');
		newTR=document.createElement('TR');
		document.childNodes[0].childNodes[1].childNodes[2].childNodes[1].childNodes[0].appendChild(newTR);
		newTD=document.createElement('TD');
		document.childNodes[0].childNodes[1].childNodes[2].childNodes[1].childNodes[0].childNodes[0].appendChild(newTD);
		newTD=document.createElement('TD');
		document.childNodes[0].childNodes[1].childNodes[2].childNodes[1].childNodes[0].childNodes[0].appendChild(newTD);
		var loeschen=document.childNodes[0].childNodes[1].childNodes[2].removeChild(document.childNodes[0].childNodes[1].childNodes[2].childNodes[0]);
		document.childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].appendChild(loeschen);
		document.childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1].id="neuer Teil";
		if (minikarte=="aktiviert"){
			minikarte_zeichnen()
		}
	}
}
///Minikarte Funktionen
function minikarte_zeichnen(){
//Neue Minikarte zeichnen
	var RW=localStorage.getItem("MinikarteGroesse")
	newTable=document.createElement('TABLE');
	document.getElementById("neuer Teil").appendChild(newTable);
	document.getElementById("neuer Teil").childNodes[0].setAttribute("border","3");
	document.getElementById("neuer Teil").childNodes[0].setAttribute("cellspacing","0");
	document.getElementById("neuer Teil").childNodes[0].setAttribute("cellpadding","0");
	document.getElementById("neuer Teil").childNodes[0].setAttribute("bgcolor","#AF874E");
	document.getElementById("neuer Teil").childNodes[0].id="Minikarte-Rahmen";
	newTBody=document.createElement('TBODY');
	document.getElementById("neuer Teil").childNodes[0].appendChild(newTBody);
	for (i=0;i<3;i++){
		newTR=document.createElement('TR');
		document.getElementById("neuer Teil").childNodes[0].childNodes[0].appendChild(newTR);
		newTD=document.createElement('TD');
		document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].appendChild(newTD);
		newTD=document.createElement('TD');
		document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].appendChild(newTD);
		newTD=document.createElement('TD');
		document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].appendChild(newTD);
		if (i==0 || i==2){
			newCenter=document.createElement('CENTER');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].appendChild(newCenter);
			newTable=document.createElement('TABLE');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].childNodes[0].appendChild(newTable);
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0].setAttribute('border',"1");
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0].setAttribute('width',"100%");
			newTBody=document.createElement('TBODY');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0].appendChild(newTBody);
			newTR=document.createElement('TR');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].appendChild(newTR);
			for (t=0;t<RW;t++){
				newTD=document.createElement('TD');
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].appendChild(newTD);
				var x=Koordx-((RW-1)/2)+t+1;
				newText=document.createTextNode(x);
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[t].appendChild(newText);
			}
		}
		if(i==1){
			newCenter=document.createElement('CENTER');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[0].appendChild(newCenter);
			newTable=document.createElement('TABLE');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[0].childNodes[0].appendChild(newTable);
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].setAttribute('height',RW*32);
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].setAttribute('border','1');
			for (t=0;t<RW;t++){
				newTR=document.createElement('TR');
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].appendChild(newTR);
				newTD=document.createElement('TD');
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[t].appendChild(newTD);
				var y=Koordy-((RW-1)/2)+t+1;
				newText=document.createTextNode(y);
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[t].childNodes[0].appendChild(newText);
			}
			newCenter=document.createElement('CENTER');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[2].appendChild(newCenter);
			newTable=document.createElement('TABLE');
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[2].childNodes[0].appendChild(newTable);
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0].setAttribute('height',RW*32);
			document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0].setAttribute('border','1');
			for (t=0;t<RW;t++){
				newTR=document.createElement('TR');
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0].appendChild(newTR);
				newTD=document.createElement('TD');
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0].childNodes[t].appendChild(newTD);
				var y=Koordy-((RW-1)/2)+t+1;
				newText=document.createTextNode(y);
				document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[1].childNodes[2].childNodes[0].childNodes[0].childNodes[t].childNodes[0].appendChild(newText);
			}
		}
	}
					//Kartengroesse_Feld erzeugen
	var ListDiv = document.createElement('div');
	ListDiv.innerHTML=
	'<form name="Kartengroesse" action="">'+
	'<select id="Kartenauswahl" name="Kartenauswahl" size="1">'+
	'<option>9</option>'+
	'<option>11</option>'+
	'<option>13</option>'+
	'<option>15</option>'+
	'<option>17</option>'+
	'<option>19</option>'+
	'<option>21</option>'+
	'<option>23</option>'+
	'<option>25</option>'+
	'<option>27</option>'+
	'<option>51</option>'+
	'<option>151</option>'+
	'</select>'+
	'</form>'
	document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[0].childNodes[0].appendChild(ListDiv);
	var Kartenauswahl=document.getElementById("Kartenauswahl");
	Kartenauswahl.addEventListener('change', Kartenchange2, true);
	for (i=0;i<Kartenauswahl.length;i++){
		if (Kartenauswahl.options[i].value==RW){
			Kartenauswahl.options[i].selected=true;
		}
	}
//document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[0].childNodes[0].appendChild(SelectDiv)
//document.getElementById("Minikarte-Rahmen").childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].options[5].defaultSelected
	newCenter=document.createElement('CENTER');
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].appendChild(newCenter);
	newTable=document.createElement('TABLE')
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].appendChild(newTable);
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].setAttribute("border","0");
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].setAttribute("cellspacing","0");
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].setAttribute("cellpadding","0");
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].setAttribute("width",RW*32);
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].setAttribute("height",RW*32);
	document.getElementById("neuer Teil").childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].id="Minikarte";
	newTBody=document.createElement('TBODY');
	document.getElementById("Minikarte").appendChild(newTBody);
	var Reichsdoerfer=localStorage.getItem("Reichsdoerfer");
	for (i=0;i<RW;i++){
		newTR=document.createElement('TR');
		document.getElementById("Minikarte").childNodes[0].appendChild(newTR);
		for(j=0;j<RW;j++){
			newTD=document.createElement('TD');
			document.getElementById("Minikarte").childNodes[0].childNodes[i].appendChild(newTD);
			var x=Koordx-((RW-1)/2)+j+1;
			var y=Koordy-((RW-1)/2)+i+1;
			var Koordn=x+","+y;
			/*var Feldtyp=localStorage.getItem(ebene+","+x+","+y);
			if (Feldtyp.indexOf("<")==0){localStorage.removeItem(ebene+","+x+","+y)}*/
			var Feldtyp=localStorage.getItem(ebene+","+x+","+y);
			if (Feldtyp!=undefined){
				var Feldtyparray=Feldtyp.split("<|>")
				if (Feldtyparray[1]==undefined){
					Feldtyp=Feldtyp+"<|>"+aktdatum
					terrainupdate(ebene+","+x+","+y,Feldtyp)
				}
				if (Feldtyparray[2]==undefined){
					Feldtyp=Feldtyp+"<|>"+"l"
					terrainupdate(ebene+","+x+","+y,Feldtyp)
				}
				var Feldtyp=localStorage.getItem(ebene+","+x+","+y)
				var Feldtyparray=Feldtyp.split("<|>")
				var Feldtyp=Feldtyparray[0];
			}
			var Kx=Koordx+1;
			var Ky=Koordy+1;
			var durchlaufkarte=0;
			var tablepos=0;
			if (Kx+","+Ky==x+","+y){
				newImg=document.createElement('IMG')
				document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newImg);
				document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("src",held);
				durchlaufkarte=1;
			}
			if (durchlaufkarte==0){
				for (h=1;h<=4;h++){
					var heldh=localStorage.getItem("held"+h);
					if (heldh!="kein"){
						var heldsplit=heldh.split("|");
						var a,b;
						if (heldsplit[1].indexOf(ebene)>-1){
							if (heldsplit[1].indexOf(Koordn)>-1){
								if (tablepos==0){
									newCenter=document.createElement('CENTER');
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newCenter);
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].appendChild(createTable(2,2,Koordn));
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].childNodes[0].setAttribute('cellspacing',0);
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].childNodes[0].setAttribute('cellpadding',0);
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].childNodes[0].setAttribute('border',1);
								}
								switch (tablepos){
									case 0:
										a=0
										b=0
										break
									case 1:
										a=0
										b=1
										break
									case 2:
										a=1
										b=0
										break
								}
								newImg=document.createElement('img');
								document.getElementById(Koordn).childNodes[0].childNodes[a].childNodes[b].appendChild(newImg);
								document.getElementById(Koordn).childNodes[0].childNodes[a].childNodes[b].childNodes[0].setAttribute("src",heldsplit[3]);	
								document.getElementById(Koordn).childNodes[0].childNodes[a].childNodes[b].childNodes[0].setAttribute("width",12);
								document.getElementById(Koordn).childNodes[0].childNodes[a].childNodes[b].childNodes[0].setAttribute("height",12);	
								durchlaufkarte=1;
								tablepos=tablepos+1;
							}
						}
					}
				}
				if(durchlaufkarte>0){
					if (Reichsdoerfer.indexOf(x+","+y)>-1){	
						var ReichImg=localStorage.getItem("Reichsimage");
						newImg=document.createElement('IMG');
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].appendChild(newImg);
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].childNodes[0].setAttribute("src",ReichImg);
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].childNodes[0].setAttribute("height",12);
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].childNodes[0].setAttribute("width",12);
					}else{			
						newImg=document.createElement('img');
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].appendChild(newImg);
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].lastChild.setAttribute("src","http://www.ritterburgwelt.de/rb/bild/karte/"+Feldtyp+".gif");	
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].lastChild.setAttribute("width",12);
						document.getElementById(Koordn).childNodes[0].childNodes[1].childNodes[1].lastChild.setAttribute("height",12);
					}
				}
			}
			if (ebene=="U0"){
				if (Reichsdoerfer.indexOf(x+","+y)>-1 && durchlaufkarte==0)	{	
					var ReichImg=localStorage.getItem("Reichsimage");
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].setAttribute("background","http://www.ritterburgwelt.de/rb/bild/karte/"+Feldtyp+".gif");
					newCenter=document.createElement('CENTER');
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newCenter);
					newImg=document.createElement('IMG');
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].appendChild(newImg);
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].childNodes[0].setAttribute("src",ReichImg);
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].childNodes[0].setAttribute("height",20);
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].childNodes[0].setAttribute("width",20);
					durchlaufkarte=1;
				}				
			}
			if (durchlaufkarte==0){
				if (Feldtyp!=undefined){
					var DorfInfos=localStorage.getItem("Dorf"+x+","+y);
					if (ebene=="U0"){
						if (DorfInfos!=null){
							var DorfInfossplit=DorfInfos.split("<|>")
							if (DorfInfossplit[0]!=""){
								var ritterally=localStorage.getItem("Ritter"+DorfInfossplit[2])
								if (ritterally!=undefined){
									ritterallyarray=ritterally.split("<|>")
									DorfInfossplit[3]=ritterallyarray[0]
								}
								if (DorfInfossplit[3]!="undefined"){
									newCenter=document.createElement('CENTER');
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newCenter);
									newImg=document.createElement('img');
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.appendChild(newImg);
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("src","http://www.ritterburgwelt.de/rb/held//allym"+DorfInfossplit[3]+".gif");
									DorfInfossplit[0]+", Level "+DorfInfossplit[1]+", Ritter "+DorfInfossplit[2]+", "+DorfInfossplit[4]+", "+DorfInfossplit[5];
									var imgtitle=DorfInfossplit[0]+", Level "+DorfInfossplit[1]+", Ritter "+DorfInfossplit[2];
									if (DorfInfossplit[4]){imgtitle=imgtitle+", "+DorfInfossplit[4]};
									if (DorfInfossplit[5]){imgtitle=imgtitle+", "+DorfInfossplit[5]};
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("title",imgtitle);
									if (DorfInfossplit[1]>=17){	
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("width",16);
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("height",16);
									}else{
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("width",12);
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("height",12);
									}
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].setAttribute("background","http://www.ritterburgwelt.de/rb/bild/karte/"+Feldtyp+".gif");
								}else{
									newCenter=document.createElement('CENTER');
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newCenter);
									newImg=document.createElement('img');
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.appendChild(newImg);
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("src","http://www.ritterburgwelt.de/rb/bild/buttons/b_map.gif");
									DorfInfossplit[0]+", Level "+DorfInfossplit[1]+", Ritter "+DorfInfossplit[2]+", "+DorfInfossplit[4]+", "+DorfInfossplit[5];
									var imgtitle=DorfInfossplit[0]+", Level "+DorfInfossplit[1]+", Ritter "+DorfInfossplit[2];
									if (DorfInfossplit[4]){imgtitle=imgtitle+", "+DorfInfossplit[4]}
									if (DorfInfossplit[5]){imgtitle=imgtitle+", "+DorfInfossplit[5]}
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("title",imgtitle);
									if (DorfInfossplit[1]>=17){	
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("width",12);
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("height",12);
									}else{
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("width",8);
										document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].lastChild.lastChild.setAttribute("height",8);
									}
									document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].setAttribute("background","http://www.ritterburgwelt.de/rb/bild/karte/"+Feldtyp+".gif");
								}
							}else{
								newImg=document.createElement('IMG');
								document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newImg);
								document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("src","http://www.ritterburgwelt.de/rb/bild/karte/"+Feldtyp+".gif");
								document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("height",32);
								document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("width",32);
							}
						}else{
							newImg=document.createElement('IMG');
							document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newImg);
							document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("src","http://www.ritterburgwelt.de/rb/bild/karte/"+Feldtyp+".gif");
							document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("height",32);
							document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("width",32);
						}
					} else {
						newImg=document.createElement('IMG')
						document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newImg);
						document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("src","http://www.ritterburgwelt.de/rb/bild/karte/"+Feldtyp+".gif");
						document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("height",32);
						document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("width",32);
					}
				} else {
					newImg=document.createElement('IMG');
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].appendChild(newImg);
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("src","http://www.ritterburgwelt.de/rb/bild/gui/blank.gif");
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("height",32);
					document.getElementById("Minikarte").childNodes[0].childNodes[i].childNodes[j].childNodes[0].setAttribute("width",32);
				}
			}		
		}
	}
}
function kartenswitch(){
	var minikarte=localStorage.getItem('Minikarte');
	if (minikarte=="deaktiviert"){
		localStorage.setItem('Minikarte','aktiviert');
		document.getElementById('sckbutton3').value="Karte aktiviert";
		minikarte_zeichnen()
	} else {
		localStorage.setItem('Minikarte','deaktiviert');
		document.getElementById('sckbutton3').value="Karte deaktiviert";
		document.getElementById("neuer Teil").removeChild(document.getElementById("neuer Teil").firstChild);
	}
}
function Kartenchange2(){
	var Kartenauswahl=document.getElementById("Kartenauswahl");
	localStorage.setItem('MinikarteGroesse',Kartenauswahl.value)
	document.getElementById("neuer Teil").removeChild(document.getElementById("neuer Teil").firstChild);
	minikarte_zeichnen()
}

////Produktionskosten
if (ProdBerechnung=="aktiviert"){
	var aLI=document.getElementsByTagName('LI');
	for (var i = 0; i <aLI.length; i++){
		if (aLI[i].childNodes[0].nodeValue=="Produktionskosten:" || aLI[i].childNodes[0].nodeValue=="Forschungskosten je Zeit:" || aLI[i].childNodes[0].nodeValue=="Forschungskosten:"){
			for (var i = 0; i <aLI.length; i++){
				if (aLI[i].childNodes[0].nodeValue=="Produktionskosten:" || aLI[i].childNodes[0].nodeValue=="Forschungskosten je Zeit:" || aLI[i].childNodes[0].nodeValue=="Forschungskosten:"){
					var aLIsub=aLI[i].getElementsByTagName('LI');
					var min=99999;
					for (var j=0;j<aLIsub.length;j++){
						var text=aLIsub[j].childNodes[0].nodeValue;
						var textArray=text.split(" ");
						var menge=textArray[0];
						var text2=aLIsub[j].childNodes[0].nodeValue;
						var text2Array=text2.split("(");
						var gesamt=text2Array[1];
						gesamt=left(gesamt,gesamt.length-1);
						anzahl=Math.floor(gesamt/menge);
						aLIsub[j].childNodes[0].replaceData(0,aLIsub[j].childNodes[0].nodeValue.length,anzahl+" * "+aLIsub[j].childNodes[0].nodeValue);
						aLIsub[j].childNodes[0].replaceData(aLIsub[j].childNodes[0].nodeValue.indexOf("("),aLIsub[j].childNodes[0].nodeValue.length-aLIsub[j].childNodes[0].nodeValue.indexOf("("),"");
						if (anzahl<min){min=anzahl}
					}
					newBold=document.createElement('B');
					aLI[i].insertBefore(newBold, aLI[i].firstChild);
					newText=document.createTextNode(min);
					aLI[i].firstChild.appendChild(newText);
					if (aLI[i].childNodes[1].nodeValue=="Produktionskosten:"){
						aLI[i].childNodes[1].replaceData(0,aLI[i].childNodes[1].nodeValue.length," Einheiten produzierbar:");
					} else {
						aLI[i].childNodes[1].replaceData(0,aLI[i].childNodes[1].nodeValue.length," mal erforschbar:");
					}
					if (min>5){aLI[i].parentNode.parentNode.setAttribute('style','background-color: green')}
					if (min<=5){aLI[i].parentNode.parentNode.setAttribute('style','background-color: yellow')}
					if (min==0){aLI[i].parentNode.parentNode.setAttribute('style','background-color: red')}
				}
			}
			var aTD=document.getElementsByTagName('TD');
			produktion: for (var i = 0; i <aTD.length; i++){
				if (aTD[i].childNodes[0]){
					if (aTD[i].childNodes[0].nodeType==3){
						if (aTD[i].childNodes[0].nodeValue=="aktuelle Produktion:"){
							var Erfahrung=aTD[i].parentNode.nextSibling.firstChild.lastChild.nodeValue;
							if (Erfahrung==null){break produktion}
							Erfahrung=Erfahrung.substr(Erfahrung.indexOf(" ")+1);
						}
						if (aTD[i].childNodes[0].nodeValue=="Berufserfahrung:"){
							var aTR=aTD[i].parentNode.parentNode.getElementsByTagName('TR');
							for (var j=3; j<aTR.length-1; j++){
								if (aTR[j].firstChild.firstChild.nodeValue!="keiner"){
			if (!aTR[j].childNodes[2]){alert("Jetzt!")}
									var aB=aTR[j].childNodes[2].getElementsByTagName('B');
									if (aB[0]){
										var einzelErfahrung=aB[0].firstChild.nodeValue;
										einzelErfahrung=einzelErfahrung.substr(0,einzelErfahrung.indexOf("("));
										einzelErfahrung=einzelErfahrung.replace(".",",");
										if (parseInt(einzelErfahrung)<parseInt(Erfahrung)){
											aTR[j].lastChild.removeChild(aTR[j].lastChild.firstChild);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
	
///Allgemeine Funktionen
function resetvalue(){
	localStorage.setItem("tuerme", "");
	var filter=localStorage.getItem("tuerme");
	location.reload();
}
function left(str, n){
	if (n <= 0){
	    return "";
	}else{ 
		if (n > String(str).length){
			return str;
		}else{
			return String(str).substring(0,n);
		}
	}
}
function right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}
function trim(s){
	return rtrim(ltrim(s));
}
function ltrim(s){
	var l=0;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	return s.substring(l, s.length);
}
function rtrim(s){
	var r=s.length -1;
	while(r > 0 && s[r] == ' ')
	{	r-=1;	}
	return s.substring(0, r+1);
}
function strpos (haystack, needle, offset) {
    // Finds position of first occurrence of a string within another  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/strpos    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Onno Marsman    
    // +   bugfixed by: Daniel Esteban
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);    // *     returns 1: 14
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}
function createTable(row, col, id) {
    var myTable     = document.createElement("table");
        var mytablebody = document.createElement("tbody");

        for(var j = 0; j < row; j++) {
            mycurrent_row = document.createElement("tr");
            for(var i = 0; i < col; i++) {
                    mycurrent_cell = document.createElement("td");               
                    mycurrent_row.appendChild(mycurrent_cell); 
            }

            mytablebody.appendChild(mycurrent_row);
    }

    myTable.appendChild(mytablebody);
    myTable.setAttribute("ID", id);
    return myTable;
} 
///Grundeinstellungen

////Einstellungen
if( document.title.search( /RB [^-]*- Einstellungen/) != -1 && datensammlungstool=="aktiviert" ){
	var TableEntries=document.getElementsByTagName('Table');
	var tab=TableEntries.length-1
	newSeparator=TableEntries[tab].firstChild.firstChild.cloneNode(true)
	newTBody=document.createElement('TBODY')
	newTBody.appendChild(newSeparator)
	newTable=document.createElement('TABLE')
	newTable.appendChild(newTBody)
	newTable.setAttribute('width','95%')
	newTable.setAttribute('cellpadding','0')
	newTable.setAttribute('cellspacing','0')
	newTable.setAttribute('border','0')
	TableEntries[tab].parentNode.insertBefore(createTable(11,2,"Skripteinstellungen"),TableEntries[tab].parentNode.childNodes[5])
	TableEntries[tab].parentNode.childNodes[5].setAttribute('width','95%')
	TableEntries[tab].parentNode.childNodes[5].firstChild.firstChild.childNodes[0].setAttribute('width','200')
	TableEntries[tab].parentNode.insertBefore(newTable,TableEntries[tab].parentNode.childNodes[5])
	document.getElementById('Skripteinstellungen').firstChild.childNodes[0].childNodes[0].appendChild(document.createTextNode("Datenspeicherung:"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[1].childNodes[0].appendChild(document.createTextNode("Karte:"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[2].childNodes[0].appendChild(document.createTextNode("Karte (Anzahl Spalten/Zeilen):"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[3].childNodes[0].appendChild(document.createTextNode("Ressourcenberechnung:"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[4].childNodes[0].appendChild(document.createTextNode("\" Schwellwert 'gelb' in Tagen:"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[5].childNodes[0].appendChild(document.createTextNode("\" Schwellwert 'rot' in Tagen:"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[6].childNodes[0].appendChild(document.createTextNode("Produktionsberechnung:"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[7].childNodes[0].appendChild(document.createTextNode("Allianzturmkennzeichnung:"))
	document.getElementById('Skripteinstellungen').firstChild.childNodes[9].childNodes[0].setAttribute('valign','top');
	document.getElementById('Skripteinstellungen').firstChild.childNodes[9].childNodes[0].appendChild(document.createTextNode("Automatische Synchronisation:"))
	//Datensammlung-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton5" type="button" value=\''+datensammlungstool+'\'>' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[0].childNodes[1].appendChild(MarkButtDiv);
	var button5 = document.getElementById("sckbutton5");
	button5.addEventListener('click', datenswitch, true);
	
	//Karte-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton3" type="button" value=\''+minikartetool+'\'>' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[1].childNodes[1].appendChild(MarkButtDiv);
	var button3 = document.getElementById("sckbutton3");
	button3.addEventListener('click', kartenswitch2, true);
	
	//Kartengroesse_Feld erzeugen
	var ListDiv = document.createElement('div');
	ListDiv.innerHTML=
	'<form name="Kartengroesse" action="">'+
    '<select id="Kartenauswahl" name="Kartenauswahl" size="1">'+
    '<option>9</option>'+
    '<option>11</option>'+
    '<option>13</option>'+
	'<option>15</option>'+
    '<option>17</option>'+
    '<option>19</option>'+
    '<option>21</option>'+
    '<option>23</option>'+
	'<option>25</option>'+
	'<option>27</option>'+
	'<option>51</option>'+
	'<option>151</option>'+
    '</select>'+
	'</form>'
	document.getElementById('Skripteinstellungen').firstChild.childNodes[2].childNodes[1].appendChild(ListDiv);
	var Kartenauswahl=document.getElementById("Kartenauswahl");
	Kartenauswahl.addEventListener('change', Kartenchange, true);
	for (i=0;i<Kartenauswahl.length;i++){
		if (Kartenauswahl.options[i].value==RW){
			Kartenauswahl.options[i].selected=true;
		}
	}
	
	//Ressource-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton6" type="button" value=\''+ressourcenmanagementtool+'\'>' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[3].childNodes[1].appendChild(MarkButtDiv);
	var button6 = document.getElementById("sckbutton6");
	button6.addEventListener('click', ressourcenswitch, true);
	
	//Gelbschwelle
	document.getElementById('Skripteinstellungen').firstChild.childNodes[4].childNodes[1].appendChild(createTable(1,3,"Gelbschwelle"));
	document.getElementById('Gelbschwelle').firstChild.firstChild.firstChild.setAttribute('width','30')
	document.getElementById('Gelbschwelle').firstChild.firstChild.childNodes[1].setAttribute('width','30')
	document.getElementById('Gelbschwelle').setAttribute('cellspacing','0')
	document.getElementById('Gelbschwelle').setAttribute('cellpadding','0')
	document.getElementById('Gelbschwelle').setAttribute('border','0')
	document.getElementById('Gelbschwelle').firstChild.firstChild.childNodes[0].appendChild(document.createElement('B'));
	document.getElementById('Gelbschwelle').firstChild.firstChild.childNodes[0].firstChild.appendChild(document.createTextNode(gelb));
	var InputDiv = document.createElement('div');
	InputDiv.innerHTML =
	'<form name="Gelb">'+
	'<input id="input1" type="text" size="2" name="GelbWert">'+
	'</form>'
	document.getElementById('Gelbschwelle').firstChild.firstChild.childNodes[1].appendChild(InputDiv);
	var input1 = document.getElementById("input1");
	input1.value=gelb;
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton9" type="button" value="setzen">' +
	'</form>';
	document.getElementById('Gelbschwelle').firstChild.firstChild.childNodes[2].appendChild(MarkButtDiv);
	var button9 = document.getElementById("sckbutton9");
	button9.addEventListener('click', gelbsetzen, true);
	
	//Rotschwelle
	document.getElementById('Skripteinstellungen').firstChild.childNodes[5].childNodes[1].appendChild(createTable(1,3,"Rotschwelle"));
	document.getElementById('Rotschwelle').firstChild.firstChild.firstChild.setAttribute('width','30')
	document.getElementById('Rotschwelle').firstChild.firstChild.childNodes[1].setAttribute('width','30')
	document.getElementById('Rotschwelle').setAttribute('cellspacing','0')
	document.getElementById('Rotschwelle').setAttribute('cellpadding','0')
	document.getElementById('Rotschwelle').setAttribute('border','0')
	document.getElementById('Rotschwelle').firstChild.firstChild.childNodes[0].appendChild(document.createElement('B'));
	document.getElementById('Rotschwelle').firstChild.firstChild.childNodes[0].firstChild.appendChild(document.createTextNode(rot));
	var InputDiv = document.createElement('div');
	InputDiv.innerHTML =
	'<form name="Rot">'+
	'<input id="input2" type="text" size="2" name="RotWert">'+
	'</form>'
	document.getElementById('Rotschwelle').firstChild.firstChild.childNodes[1].appendChild(InputDiv);
	var input2 = document.getElementById("input2");
	input2.value=rot;
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton10" type="button" value="setzen">' +
	'</form>';
	document.getElementById('Rotschwelle').firstChild.firstChild.childNodes[2].appendChild(MarkButtDiv);
	var button10 = document.getElementById("sckbutton10");
	button10.addEventListener('click', rotsetzen, true);
	
	//Produktion-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton7" type="button" value=\''+ProdBerechnung+'\'>' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[6].childNodes[1].appendChild(MarkButtDiv);
	var button7 = document.getElementById("sckbutton7");
	button7.addEventListener('click', produktionswitch, true);
	
	//Allytuerme-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton8" type="button" value=\''+allianztuermetool+'\'>' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[7].childNodes[1].appendChild(MarkButtDiv);
	var button8 = document.getElementById("sckbutton8");
	button8.addEventListener('click', allyturmswitch, true);	
	
	var InputDiv = document.createElement('div');
	InputDiv.innerHTML =
	'<form name="Gelb">'+
	'<input id="input3" type="text" size="30" name="sync">'+
	'</form>'
	document.getElementById('Skripteinstellungen').firstChild.childNodes[8].childNodes[0].setAttribute('align','right');        
	document.getElementById('Skripteinstellungen').firstChild.childNodes[8].childNodes[1].appendChild(InputDiv);
	var input3 = document.getElementById("input3");
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton15" type="button" value="Lokaldaten Export">' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[8].childNodes[0].appendChild(MarkButtDiv);
	var button15 = document.getElementById("sckbutton15");
	button15.addEventListener('click', datenexport_lokal, true);
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton11" type="button" value="Lokaldaten Import">' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[8].childNodes[0].appendChild(MarkButtDiv);
	var button11 = document.getElementById("sckbutton11");
	button11.addEventListener('click', datenimport_manuell, true);
	
	//Sync-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton12" type="button" value=\''+synctool+'\'>' +
	'</form>';
	document.getElementById('Skripteinstellungen').firstChild.childNodes[9].childNodes[1].appendChild(MarkButtDiv);
	var button12 = document.getElementById("sckbutton12");
	button12.addEventListener('click', syncswitch, true);	
	if (synctool=="aktiviert"){synctabelle_erzeugen()};
	
}
///Einstellungen functions
function kartenswitch2(){
	var minikarte=localStorage.getItem('Minikarte');
	if (minikarte=="deaktiviert"){
		localStorage.setItem('Minikarte','aktiviert');
		document.getElementById('sckbutton3').value="aktiviert";
	} else {
		localStorage.setItem('Minikarte','deaktiviert');
		document.getElementById('sckbutton3').value="deaktiviert";
	}
}
function datenswitch(){
	var datensammlungstool=localStorage.getItem('datensammlungstool');
	if (datensammlungstool=="deaktiviert"){
		localStorage.setItem('datensammlungstool','aktiviert');
		document.getElementById('sckbutton5').value="aktiviert";
	} else {
		localStorage.setItem('datensammlungstool','deaktiviert');
		document.getElementById('sckbutton5').value="deaktiviert";
	}
}
function ressourcenswitch(){
	var ressourcenmanagementtool=localStorage.getItem('Ressourcenmanagement');
	if (ressourcenmanagementtool=="deaktiviert"){
		localStorage.setItem('Ressourcenmanagement','aktiviert');
		document.getElementById('sckbutton6').value="aktiviert";
	} else {
		localStorage.setItem('Ressourcenmanagement','deaktiviert');
		document.getElementById('sckbutton6').value="deaktiviert";
	}
}
function produktionswitch(){
	var ProdBerechnung=localStorage.getItem('Produktionsberechnung');
	if (ProdBerechnung=="deaktiviert"){
		localStorage.setItem('Produktionsberechnung','aktiviert');
		document.getElementById('sckbutton7').value="aktiviert";
	} else {
		localStorage.setItem('Produktionsberechnung','deaktiviert');
		document.getElementById('sckbutton7').value="deaktiviert";
	}
}
function allyturmswitch(){
	var allianztuermetool=localStorage.getItem('Allianztuerme');
	if (allianztuermetool=="deaktiviert"){
		localStorage.setItem('Allianztuerme','aktiviert');
		document.getElementById('sckbutton8').value="aktiviert";
	} else {
		localStorage.setItem('Allianztuerme','deaktiviert');
		document.getElementById('sckbutton8').value="deaktiviert";
	}
}
function syncswitch(){
	var synctool=localStorage.getItem('Sync');
	if (synctool=="deaktiviert"){
		localStorage.setItem('Sync','aktiviert');
		document.getElementById('sckbutton12').value="aktiviert";
		synctabelle_erzeugen();
	} else {
		localStorage.setItem('Sync','deaktiviert');
		document.getElementById('sckbutton12').value="deaktiviert";
		document.getElementById('Synceinstellungen').parentNode.removeChild(document.getElementById('Synceinstellungen'));
	}
}
function synctabelle_erzeugen(){
	var URLsync=localStorage.getItem("URLsync")
	var Usersync=localStorage.getItem("Usersync")
	var Passwortsync=localStorage.getItem("Passwortsync")
	var dorfsync=localStorage.getItem("Dorfsync")
	if (dorfsync==undefined){
		dorfsync=true
	}
	var monstersync=localStorage.getItem("Monstersync")
	if (monstersync==undefined){
		monstersync=false
	}
	document.getElementById('Skripteinstellungen').firstChild.childNodes[9].childNodes[1].appendChild(createTable(8,2,"Synceinstellungen"))
	//document.getElementById('Synceinstellungen').setAttribute('width','95%')
	document.getElementById('Synceinstellungen').firstChild.firstChild.firstChild.setAttribute('width','110')
	document.getElementById('Synceinstellungen').firstChild.childNodes[0].childNodes[0].appendChild(document.createTextNode("URL:"))
	document.getElementById('Synceinstellungen').firstChild.childNodes[1].childNodes[0].appendChild(document.createTextNode("Usermail:"))
	document.getElementById('Synceinstellungen').firstChild.childNodes[2].childNodes[0].appendChild(document.createTextNode("Passwort:"))
	document.getElementById('Synceinstellungen').firstChild.childNodes[3].childNodes[0].appendChild(document.createTextNode("Terrain:"))
	document.getElementById('Synceinstellungen').firstChild.childNodes[4].childNodes[0].appendChild(document.createTextNode("Dorfdaten anderer Ritter:"))
	document.getElementById('Synceinstellungen').firstChild.childNodes[5].childNodes[0].appendChild(document.createTextNode("Monster:"))
	document.getElementById('Synceinstellungen').firstChild.childNodes[7].childNodes[0].appendChild(document.createTextNode("Manueller Sync:"))
	var InputDiv = document.createElement('div');
	InputDiv.innerHTML =
	'<form name="URL">'+
	'<input id="input4" type="text" size="30" name="URL" value=\''+URLsync+'\'>'+
	'</form>'
	document.getElementById('Synceinstellungen').firstChild.childNodes[0].childNodes[1].appendChild(InputDiv);
	var input4 = document.getElementById("input4");
	input4.addEventListener('keypress', savebuttonvisible, true);
	var InputDiv = document.createElement('div');
	InputDiv.innerHTML =
	'<form name="syncuser">'+
	'<input id="input5" type="text" size="25" name="syncuser" value=\''+Usersync+'\'>'+
	'</form>'
	document.getElementById('Synceinstellungen').firstChild.childNodes[1].childNodes[1].appendChild(InputDiv);
	var input5 = document.getElementById("input5");
	input5.addEventListener('keypress', savebuttonvisible, true);
	var InputDiv = document.createElement('div');
	InputDiv.innerHTML =
	'<form name="syncpasswort">'+
	'<input id="input6" type="password" size="20" name="syncpasswort" value=\''+Passwortsync+'\'>'+
	'</form>'
	document.getElementById('Synceinstellungen').firstChild.childNodes[2].childNodes[1].appendChild(InputDiv);
	var input6 = document.getElementById("input6");
	input6.addEventListener('keypress', savebuttonvisible, true);
	
	var CheckDiv = document.createElement('div');
	CheckDiv.innerHTML =
	'<form name="syncterraincheckbox">'+
	'<input id="checkbox1" type="checkbox" checked="true" disabled name="syncterraincheckbox">'+
	'</form>'
	document.getElementById('Synceinstellungen').firstChild.childNodes[3].childNodes[1].appendChild(CheckDiv);
	var checkbox1 = document.getElementById("checkbox1");
	var CheckDiv = document.createElement('div');
	CheckDiv.innerHTML =
	'<form name="syncdorfcheckbox">'+
	'<input id="checkbox2" type="checkbox" checked=\''+dorfsync+'\' name="syncdorfcheckbox">'+
	'</form>'
	document.getElementById('Synceinstellungen').firstChild.childNodes[4].childNodes[1].appendChild(CheckDiv);
	var checkbox2 = document.getElementById("checkbox2");
	if (dorfsync=="false"){
		checkbox2.checked=false
	}else{
		checkbox2.checked=true
	}
	checkbox2.addEventListener('change', savebuttonvisible, true);
	
	var CheckDiv = document.createElement('div');
	CheckDiv.innerHTML =
	'<form name="syncmonstercheckbox">'+
	'<input id="checkbox3" type="checkbox" disabled checked=\''+monstersync+'\' name="syncmonstercheckbox">'+
	'</form>'
	document.getElementById('Synceinstellungen').firstChild.childNodes[5].childNodes[1].appendChild(CheckDiv);
	var checkbox3 = document.getElementById("checkbox3");
	if (monstersync=="false"){
		checkbox3.checked=false
	}else{
		checkbox3.checked=true
	}
	checkbox3.addEventListener('change', savebuttonvisible, true);
	//Manuellsync-Button erzeugen
	var MarkButtDiv = document.createElement('div');
	MarkButtDiv.innerHTML = 
	'<form class="sckbutton" method="GET" action="#">' +
	'<input id="sckbutton14" type="button" value="Komplettsynchronisation">' +
	'</form>';
	document.getElementById('Synceinstellungen').firstChild.childNodes[7].childNodes[1].appendChild(MarkButtDiv);
	var button14 = document.getElementById("sckbutton14");
	button14.addEventListener('click', mansync, true);	
}
function savebuttonvisible(){
	if(!document.getElementById("sckbutton13")){
		//Save-Button erzeugen
		var MarkButtDiv = document.createElement('div');
		MarkButtDiv.innerHTML = 
		'<form class="sckbutton" method="GET" action="#">' +
		'<input id="sckbutton13" type="button" value="speichern">' +
		'</form>';
		document.getElementById('Synceinstellungen').firstChild.childNodes[6].childNodes[0].appendChild(MarkButtDiv);
		var button13 = document.getElementById("sckbutton13");
		button13.addEventListener('click', syncsave, true);	
	}
}
function syncsave(){
	if (right(document.getElementById("input4").value,1)!="/"&&document.getElementById("input4").value!=""){
		document.getElementById("input4").value=document.getElementById("input4").value+"/"
	}
	localStorage.setItem("URLsync",document.getElementById("input4").value)
	localStorage.setItem("Usersync",document.getElementById("input5").value)
	localStorage.setItem("Passwortsync",document.getElementById("input6").value)
	localStorage.setItem("Dorfsync",document.getElementById("checkbox2").checked)
	localStorage.setItem("Monstersync",document.getElementById("checkbox3").checked)
	document.getElementById("sckbutton13").parentNode.removeChild(document.getElementById("sckbutton13"))
}
function gelbsetzen(){
	localStorage.setItem("Ressource_gelb",input1.value)
	document.getElementById('Gelbschwelle').firstChild.firstChild.childNodes[0].firstChild.replaceData(0,document.getElementById('Gelbschwelle').firstChild.firstChild.childNodes[0].firstChild.nodeValue.length,input1.value)
}
function rotsetzen(){
	localStorage.setItem("Ressource_rot",input2.value)
	document.getElementById('Rotschwelle').firstChild.firstChild.childNodes[0].firstChild.replaceData(0,document.getElementById('Rotschwelle').firstChild.firstChild.childNodes[0].firstChild.nodeValue.length,input2.value)
}
function Kartenchange(){
	var Kartenauswahl=document.getElementById("Kartenauswahl");
	localStorage.setItem('MinikarteGroesse',Kartenauswahl.value)
}

////Synchronisation
if( document.title.search( /RB [^-]*- Thronsaal/) != -1 && synctool=="aktiviert" && localStorage.getItem("URLsync")!="" ){
	var letztersyncdate=localStorage.getItem("syncdatum")
	GM_log("Zeitpunkt der letzten erfolgreichen Synchronisation: "+letztersyncdate)
	//if (letztersyncdate<aktsyncdate){
		var newFont=document.createElement('FONT')
		newFont.id="Synctext"
		newFont.setAttribute('color','darkred')
		var newBlink=document.createElement('BLINK')
		var newText=document.createTextNode("Synchronisierung läuft")
		newBlink.appendChild(newText)
		newFont.appendChild(newBlink)
		var centerEntries=document.getElementsByTagName('CENTER')
		centerEntries[1].insertBefore(document.createElement('BR'),centerEntries[2])
		centerEntries[1].insertBefore(newFont,centerEntries[2])
		GM_xmlhttpRequest({
			method: "GET",
			url: localStorage.getItem("URLsync")+"connectiontest.php",
			onload: function(xhr) {
			GM_log(aktdatum+"|"+xhr.responseText)
				if (xhr.responseText.search(/Benutzername oder Passwort sind falsch/)>-1){
					document.getElementById('Synctext').parentNode.removeChild(document.getElementById('Synctext'))
					var newFont=document.createElement('FONT')
					newFont.id="Synctext"
					newFont.setAttribute('color','darkred')
					var newText=document.createTextNode("Webserver erreichbar, aber Fehler in der Verbindung zur Datenbank!")
					newFont.appendChild(newText)
					centerEntries[1].insertBefore(newFont,centerEntries[2])
				}
				if (xhr.responseText=="Verbindung konnte hergestellt werden")
				{
					datenimport_server("inkrementell")
					//datenexport_server()
					document.getElementById('Synctext').parentNode.removeChild(document.getElementById('Synctext'))
					var newFont=document.createElement('FONT')
					newFont.id="Synctext"
					newFont.setAttribute('color','darkgreen')
					var newText=document.createTextNode("Synchronisation war erfolgreich!")
					newFont.appendChild(newText)
					centerEntries[1].insertBefore(newFont,centerEntries[2])
				}
			},
			onerror: function(xhr){
				GM_log (aktdatum+"|Webserver auf "+localStorage.getItem("URLsync")+" antwortet nicht. Bitte Snychronisationseinstellungen checken!") 
				document.getElementById('Synctext').parentNode.removeChild(document.getElementById('Synctext'))
				var newFont=document.createElement('FONT')
				newFont.id="Synctext"
				newFont.setAttribute('color','darkred')
				var newText=document.createTextNode("Webserver auf "+localStorage.getItem("URLsync")+" antwortet nicht!")
				newFont.appendChild(newText)
				centerEntries[1].insertBefore(newFont,centerEntries[2])
			}
		});	
	//}
}
///Syncfunktionen
function mansync(){
	var newFont=document.createElement('FONT')
	newFont.id="Synctext"
	newFont.setAttribute('color','darkred')
	var newBlink=document.createElement('BLINK')
	var newText=document.createTextNode("Synchronisierung läuft")
	newBlink.appendChild(newText)
	newFont.appendChild(newBlink)
	if (document.getElementById('Synctext')){document.getElementById('Synctext').parentNode.removeChild(document.getElementById('Synctext'))}
	document.getElementById('Skripteinstellungen').parentNode.insertBefore(newFont,document.getElementById('Skripteinstellungen').parentNode.lastChild)
	GM_xmlhttpRequest({
		method: "GET",
		url: localStorage.getItem("URLsync")+"connectiontest.php",
		onload: function(xhr) {
		GM_log(aktdatum+"|"+xhr.responseText)
			if (xhr.responseText.search(/Benutzername oder Passwort sind falsch/)>-1){
				GM_log(xhr.responseText)
				document.getElementById('Synctext').parentNode.removeChild(document.getElementById('Synctext'))
				var newFont=document.createElement('FONT')
				newFont.id="Synctext"
				newFont.setAttribute('color','darkred')
				var newText=document.createTextNode("Webserver erreichbar, aber Fehler in der Verbindung zur Datenbank!")
				newFont.appendChild(newText)
				document.getElementById('Skripteinstellungen').parentNode.insertBefore(newFont,document.getElementById('Skripteinstellungen').parentNode.lastChild)
			}
			if (xhr.responseText=="Verbindung konnte hergestellt werden")
			{
				datenimport_server("komplett")
				//datenexport_server()
				document.getElementById('Synctext').parentNode.removeChild(document.getElementById('Synctext'))
				var newFont=document.createElement('FONT')
				newFont.id="Synctext"
				newFont.setAttribute('color','darkgreen')
				var newText=document.createTextNode("Synchronisation war erfolgreich!")
				newFont.appendChild(newText)
				document.getElementById('Skripteinstellungen').parentNode.insertBefore(newFont,document.getElementById('Skripteinstellungen').parentNode.lastChild)

			}
		},
		onerror: function(xhr){
			GM_log (aktsync+"|Webserver auf "+localStorage.getItem("URLsync")+" antwortet nicht. Bitte Snychronisationseinstellungen checken!") 
			document.getElementById('Synctext').parentNode.removeChild(document.getElementById('Synctext'))
			var newFont=document.createElement('FONT')
			newFont.id="Synctext"
			newFont.setAttribute('color','darkred')
			var newText=document.createTextNode("Webserver auf "+localStorage.getItem("URLsync")+" antwortet nicht!")
			newFont.appendChild(newText)
			document.getElementById('Skripteinstellungen').parentNode.insertBefore(newFont,document.getElementById('Skripteinstellungen').parentNode.lastChild)
		}
	});
}

function datenimport_server(art){
	if (art=="inkrementell"){
		var letztersyncdate=new Date(localStorage.getItem("syncdatum"))
		var ltag=(letztersyncdate.getDate()<10?"0":"")+letztersyncdate.getDate()
		var lmonat=letztersyncdate.getMonth()+1
		var lmonat=(lmonat<10?"0":"")+lmonat
		var lstunden=(letztersyncdate.getHours()<10?"0":"")+letztersyncdate.getHours()
		var lminuten=(letztersyncdate.getMinutes()<10?"0":"")+letztersyncdate.getMinutes()
		var lsekunden=(letztersyncdate.getSeconds()<10?"0":"")+letztersyncdate.getSeconds()
		var letztersync=letztersyncdate.getFullYear()+"-"+lmonat+"-"+ltag+" "+lstunden+":"+lminuten+":"+lsekunden
	}
	if (art=="komplett"){
		var letztersync="0000-00-00 00:00:00"
	}
	
	GM_xmlhttpRequest({
		method: "GET",
		url: localStorage.getItem("URLsync")+"download.php?user="+localStorage.getItem("Usersync")+"&passwort="+localStorage.getItem("Passwortsync")+"&dorfsync="+localStorage.getItem("Dorfsync")+"&monstersync="+localStorage.getItem("Monstersync")+"&letztersync="+letztersync,
		onload: function(xhr) {
			GM_log(aktdatum+"|Datenimport: "+xhr.responseText)
			datenimport(xhr.responseText,"s");
			datenexport_server(art)
		}
	});
	localStorage.setItem("syncdatum",aktsyncdate)
	
}
function datenimport_manuell(){
	datenimport(document.getElementById("input3").value,"l");
}

function datenimport(importdata,typ){
GM_log(importdata)
	var terraincount=0;
	var terrainerfolgcount=0;
	var terrainzaehlerimport=parseInt(localStorage.getItem("Terrainzaehlerimport"));
	var dorfcount=0;
	var dorferfolgcount=0;
	var dorfzaehlerimport=parseInt(localStorage.getItem("Dorfzaehlerimport"));
	var transferarray=importdata.split("||");
	for (i=0; i<transferarray.length;i++) {
		var sarray=transferarray[i].split("::");
		if (sarray[0].search(/U.,...,.../)>-1){
			terraincount=terraincount+1;
			var importterrainarray=sarray[1].split("<|>");
			if (importterrainarray[1]==undefined){
				sarray[1]=sarray[1]+"<|>"+aktdatum
			}
			var importterrainarray=sarray[1].split("<|>");
			var localterraininfo=localStorage.getItem(sarray[0]);
			if (localterraininfo!=undefined){
				var localterrainarray=localterraininfo.split("<|>");
				if (localterrainarray[1]==undefined){
					localterraininfo=localterraininfo+"<|>"+aktdatum;
					localStorage.setItem(sarray[0],localterraininfo);
				}
				if (parseInt(importterrainarray[1])>parseInt(localterrainarray[1])){
					localStorage.setItem(sarray[0],importterrainarray[0]+"<|>"+importterrainarray[1]+"<|>"+typ+"<|>");
					terrainerfolgcount=terrainerfolgcount+1;
				}
			}else{
				localStorage.setItem(sarray[0],importterrainarray[0]+"<|>"+importterrainarray[1]+"<|>"+typ+"<|>");
				terrainerfolgcount=terrainerfolgcount+1;
			}
		}

		if (sarray[0].search(/Dorf/)>-1){
			dorfcount=dorfcount+1;
			var importdorfarray=sarray[1].split("<|>");
			if (importdorfarray[6]==""){importdorfarray[6]=aktdatum;}
			var localdorfinfo=localStorage.getItem(sarray[0]);
			if (localdorfinfo!=undefined){
				var localdorfarray=localdorfinfo.split("<|>");				
				if (localdorfarray[6]==""){localdorfarray[6]=aktdatum;}
				if (parseInt(importdorfarray[6])>parseInt(localdorfarray[6])){
					localStorage.setItem(sarray[0],importdorfarray[0]+"<|>"+importdorfarray[1]+"<|>"+importdorfarray[2]+"<|>"+importdorfarray[3]+"<|>"+importdorfarray[4]+"<|>"+importdorfarray[5]+"<|>"+importdorfarray[6]+"<|>"+importdorfarray[7]+"<|>"+importdorfarray[8]+"<|>"+typ+"<|>");
					dorferfolgcount=dorferfolgcount+1;
				}
			}else{
				localStorage.setItem(sarray[0],importdorfarray[0]+"<|>"+importdorfarray[1]+"<|>"+importdorfarray[2]+"<|>"+importdorfarray[3]+"<|>"+importdorfarray[4]+"<|>"+importdorfarray[5]+"<|>"+importdorfarray[6]+"<|>"+importdorfarray[7]+"<|>"+importdorfarray[8]+"<|>"+typ+"<|>");
				dorferfolgcount=dorferfolgcount+1;
			}
		}
		if (sarray[0].search(/Ritter/)>-1){
			var importritterarray=sarray[1].split("<|>");
			if (importritterarray[1]==undefined){
				sarray[1]=sarray[1]+"<|>"+aktdatum
			}
			var importritterarray=sarray[1].split("<|>");
			var localritterinfo=localStorage.getItem(sarray[0]);
			if (localritterinfo!=undefined){
				var localritterarray=localritterinfo.split("<|>");
				if (localritterarray[1]==undefined){
					localritterinfo=localritterinfo+"<|>"+aktdatum;
					localStorage.setItem(sarray[0],localritterinfo);
				}
				if (parseInt(importritterarray[1])>parseInt(localritterarray[1])){
				localStorage.setItem(sarray[0],importritterarray[0]+"<|>"+importritterarray[1]+"<|>"+typ+"<|>");
				}
			}else{
				localStorage.setItem(sarray[0],importritterarray[0]+"<|>"+importritterarray[1]+"<|>"+typ+"<|>");
			}
		}
	}
	GM_log(aktdatum+"|Datenimport: "+terraincount+" Terrainsätze transferiert, "+terrainerfolgcount+" neue; "+dorfcount+" Dorfsätze transferiert, "+dorferfolgcount+" neue")	
	terrainzaehlerimport=terrainzaehlerimport+terrainerfolgcount
	localStorage.setItem("Terrainzaehlerimport",terrainzaehlerimport);
	dorfzaehlerimport=dorfzaehlerimport+dorferfolgcount
	localStorage.setItem("Dorfzaehlerimport",dorfzaehlerimport);
	GM_log(aktdatum+"|Datenimport: "+terrainzaehlerimport+" Terrainsätze gesamt, "+dorfzaehlerimport+" Dorfsätze gesamt (seit Beginn)")	
}

function datenexport_server(art){
	var transferdaten="";
	var terrainzaehlerexport=parseInt(localStorage.getItem("Terrainzaehlerexport"));
	var terraincount=0
	var dorfcount=0
	var dorfzaehlerexport=parseInt(localStorage.getItem("Dorfzaehlerexport"));
	var dorfsync=localStorage.getItem("Dorfsync")
	var monstersync=localStorage.getItem("Monstersync")
	if (art=="komplett"){
		for (i=0;i<localStorage.length;i++){
			lskey=localStorage.key(i)
			lsdata=localStorage.getItem(localStorage.key(i))
			if (lskey.search(/^U.,...,.../)!=-1){
				terrainwert=localStorage.getItem(localStorage.key(i))
				if (transferdaten==""){
					transferdaten = lskey+"::"+localStorage.getItem(localStorage.key(i));
				}else{
					transferdaten = transferdaten + "||"+lskey+"::"+localStorage.getItem(localStorage.key(i));
				}
				terrainwert=terrainwert.replace(/>l</,">s<")
				terraincount=terraincount+1
				localStorage.setItem(lskey,terrainwert)
			}
			if (lskey.search(/^Dorf\d/)!=-1&&dorfsync=="true"){
				dorfwert=localStorage.getItem(localStorage.key(i))
				if (transferdaten==""){
					transferdaten = lskey+"::"+localStorage.getItem(localStorage.key(i));
				}else{
					transferdaten = transferdaten + "||"+lskey+"::"+localStorage.getItem(localStorage.key(i));
				}
				dorfwert=dorfwert.replace(/>l</,">s<")
				dorfcount=dorfcount+1
				localStorage.setItem(lskey,dorfwert)
			}
			if (lskey.search(/^Ritter/)!=-1&&dorfsync=="true"){
				ritterwert=localStorage.getItem(localStorage.key(i))
				if (transferdaten==""){
					transferdaten = lskey+"::"+localStorage.getItem(localStorage.key(i));
				}else{
					transferdaten = transferdaten + "||"+lskey+"::"+localStorage.getItem(localStorage.key(i));
				}
				ritterwert=ritterwert.replace(/>l</,">s<")
				localStorage.setItem(lskey,ritterwert)
			}
			//ToDo: Monsterdaten
			
		}
	}else{
		transferdaten=localStorage.getItem("transferdaten");
	}
	GM_log(aktdatum+"|Datenexport: "+transferdaten)
	GM_xmlhttpRequest({
		method: "POST",
		url: localStorage.getItem("URLsync")+"upload.php",
		headers:{"Content-Type": "application/x-www-form-urlencoded"},
		data: 'daten='+transferdaten,
	});
	GM_log(aktdatum+"|Datenexport: "+terraincount+" Terrainsätze, "+dorfcount+" Dorfsätze")	
	terrainzaehlerexport=terrainzaehlerexport+terraincount
	localStorage.setItem("Terrainzaehlerexport",terrainzaehlerexport);
	dorfzaehlerexport=dorfzaehlerexport+dorfcount
	localStorage.setItem("Dorfzaehlerexport",dorfzaehlerexport);
	GM_log(aktdatum+"|Datenexport: "+terrainzaehlerexport+" Terrainsätze gesamt, "+dorfzaehlerexport+" Dorfsätze gesamt (seit Beginn)")	
	localStorage.setItem("transferdaten","")
}
function datenexport_lokal(){
	//Datenaustausch
	var transferdaten="";
	for (i=0;i< localStorage.length;i++){
		lskey=localStorage.key(i)
		if (lskey.search(/U.,...,.../)>-1 || lskey.search(/Dorf/)>-1 || lskey.search(/Ritter/)>-1){
			if (transferdaten==""){
				transferdaten = lskey+"::"+localStorage.getItem(localStorage.key(i));
			}else{
				transferdaten = transferdaten + "||"+lskey+"::"+localStorage.getItem(localStorage.key(i));
			}
		}
	}
	document.getElementById("input3").value=transferdaten;
}
//document.addEventListener("onload", test(), true);
//flush localStorage
//localStorage.clear()
function test(){
var Fenster = window.open("","Testfenster");
with (Fenster.document){
	open();
	write("<html><head></head><body><table></table></body></html>");
	close();
}
}

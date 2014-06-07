// ==UserScript==// @name		Gruppierung von Berichten aller Art// @version    2.0// @description  Die Stämme: Kategurisiert Berichte
// @author		--virus--// @include	  http://de*.die-staemme.de/*// ==/UserScript==

/*
	V 1.0: Standartfunktionen
	V 1.1: Bugbehebung
	V 2.0: DS V.6.1 tauglich
	V 2.1: Koordseinlesen ermöglicht; einfacherer Spielerfilter
*/

function chk_tables(cell_input,player){
	var table=findByInner(document,cell_input);
	name=table[table.length-1].parentNode.parentNode.getElementsByTagName("tr")[0].getElementsByTagName("th")[1].getElementsByTagName("a")[0].firstChild.nodeValue;
	village=new Array();	
	village[0]=player;
	ally_player=new Array("metzgerrüdi1","Odium Amon","Lord Manne der Erste","Lord-Eisenfaust","Falas","Iron Maggot","--Virus--","Mexx1970","wh1thy","flöki4","Sulphur","Rondragor","Angie Angel","kingcharly","jesno76","Janeon","Willy700","Wabääman","Monkey D. Dragon01","SR94","TryDying","Nazdreg4","toefff","fjorgel","petric18","Thor2405","CCR1","Fremderblitz","Nefprak","Deathman81","el Lordo","cucu84","schnarchhahn","hampelmann77","Blackgoatlord","lehmannsen","Stefan Nr.1","Nummer Eins im Norden","Der Schwarze Barde","Allibabo","Batila","Lord-96","PRO GAMING","pinky-naaf","andreas1704","Löwen-killer","j.k 37","chrashoverride","Camebridge","Kriegerin der Wölfe","Wine","F-18 Hornet","Cap.Picard","Smaragtus","meckatzerfan","Die Pest Felix","Magnus Marcus","Wiesel85","DonBizarre","Bahamut77","juan chavel","Han Solo 7","Schattenreiter1993","BlackDeathRose","warior9");
	for(var i=0;i<ally_player.length-1;i++){
		if(name==ally_player[i]){
			village[1]=false;
			break;	
		}else{
			village[1]=table;
		}
	}
	return village;
}

function get_koords(cell_input,player){
	var table=findByInner(document,cell_input);
	koords=table[table.length-1].parentNode.getElementsByTagName("td")[1].getElementsByTagName("a")[0].firstChild.nodeValue.split("(")[1].split(")")[0];
	return koords;
}

function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }

function fetch_id(table){
	url=table[table.length-1].parentNode.getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
	id=url.split("id=")[1];
	return id;
}

function fetch_troops(table,player){
	troops=new Array();
	if(player!="Deffer"){
		unit=table[table.length-1].parentNode.parentNode.getElementsByTagName("img")[0].parentNode.parentNode.parentNode.getElementsByTagName("tr")[1].getElementsByTagName("td");
		for(i=1;i<unit.length;i++){
			troops[i-1]=unit[i].firstChild.nodeValue;
		}
	}else{
		extern_units=findByInner(document,"Einheiten außerhalb:");
		if(extern_units.length==0){
			fetch_troops(table,"");
		}else{
			all=0;
			unit=extern_units[0].parentNode.parentNode.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
			for(i=0;i<unit.length;i++){
				troops[i]=unit[i].firstChild.nodeValue;
				all+=eval(unit[i].firstChild.nodeValue);
			}
			if(all==0){
				fetch_troops(table,"");
			}
		}
	}
	return troops;
}

function make_group(troops){
	group="default";
	if(troops[troops.length-1]!=0){
		group="AG";
	}else{
		var all=0;
		for(i=0;i<troops.length;i++){
			all+=eval(troops[i]);
		}
		units=new Array();
		units["Off"]=(eval(troops[2])+eval(troops[5])+eval(troops[6])+eval(troops[8])+eval(troops[9]))*100/all;
		units["Deff"]=(eval(troops[0])+eval(troops[1])+eval(troops[3])+eval(troops[7]))*100/all;
		units["Spy"]=(eval(troops[4]))*100/all;
		if(units["Off"]>50){
			group="Off";		
		}else	if(units["Deff"]>50){
			group="Deff";
		}else if(units["Spy"]>75){
			group="Spy";
		}
	}
	return group;
}
var player="Offer";
table=chk_tables("Herkunft:",player);
koords=get_koords("Herkunft:",player);
if(table[1]==false){
	var player="Deffer";
	table=chk_tables("Ziel:",player);
	koords=get_koords("Ziel:",player);
	if(table[1]==false){
		alert("Bericht ist zwischen 2 eigenen Dörfern");
		exit();
	}
}
vid=fetch_id(table[1]);
troops=fetch_troops(table[1],table[0]);
group=make_group(troops);

village_viewer_id=document.cookie.split("village_viewer_id=");
status="nicht gesichert";
if(village_viewer_id.length==1){
	document.cookie="village_viewer_id="+vid+":"+group;
	status="gesichert";
}else{
	saved_ids=village_viewer_id[1].split(";")[0];
	ids=saved_ids.split("&");
	saved=0;
	for(i=0;i<ids.length;i++){
		id=ids[i].split(":")[0];
		if(id*1==vid*1){
			saved=1;
			break;
		}
	}
	if(saved==0){
		put_ids="village_viewer_id="+ids+","+vid+":"+group;
		document.cookie=put_ids;
		status="gesichert";
	}else{
		status="Dorf wurde bereits mit "+ids[i].split(":")[1]+" eingelesen. Daten wurden nicht verändert";
	}
}
village_viewer_koords=document.cookie.split("village_viewer_koords=");
if(village_viewer_koords.length==1){
	document.cookie="village_viewer_koords="+koords+":"+group;
}else{
	document.cookie="village_viewer_koords="+koords+":"+group+","+village_viewer_koords[1];
}

if(group=="default"){
	group="nicht kategorisierbar";
}
if(document.URL.split("/public_report/").length==2){
	alert(player+"-"+group);
	exit();
}
table=findByInner(document,"Gesendet");
var neuTr = document.createElement("tr");
var neuTd = document.createElement("td");
var neuBText = document.createTextNode("Gruppe/Kategorie");
neuTr.appendChild(neuTd).appendChild(neuBText);
var neuField= document.createElement("td");
var group=document.createTextNode(player+' ('+group+"): "+status);
neuField.appendChild(group);
table[0].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("tbody")[1].insertBefore(neuTr, table[0].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("tbody")[1].firstChild.nextSibling);
table=findByInner(document,"Gruppe/Kategorie");
table[0].parentNode.appendChild(neuField);
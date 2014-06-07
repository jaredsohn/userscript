// AO-greasemonkey
// version 14
// 2007-11-10
// Copyright (c) 2007, Gipi
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "AO_and_gipi_greasemonkey", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          AO_and_gipi_greasemonkey
// @namespace     http://gipi.dnsalias.com/greasemonkey/
// @description   ajout des cv dans l'incoming
// @description   ajout des tags sur les vues system
// @description   ajout des cv et totaux sur les fleets
// @description   ajoute le nom du script et la version sous les pages modifiees
// @description  ajout des +1 batiments
// @description  ajout de la date et de l'heure nouveau slot culture et science 
// @description  V8 --- bouttons +1/+10/+100 pour les vaisseaux pour Epicus,  --- Mise a zéro par défaut du nombre de pp a depenser pour Kumka, --- separation des millions et des milliers dans le total cv pour Yey --- correction du bug de la date dans sciences pour Yey--- ajout de boutons sur l'ecran science pour changer de sciences directement 
// @description  V9 --- correction bug ecran fleet
// @description  V10 --- ajout d'un bouton battles sur la vue system et sur la vue profil player --- marquage du joueur en jaune sur la vue system
// @description V11 --- ajout du prochain PL dans profil player --- modification de l'écran trade
// @description V12 --- ajout des boutons prev et next dans le menu alliance
// @description V13 --- mis le graphique trade en fixe
// @description V14--- dites merci a stylgar ;)
// @include     http://www1.astrowars.com/0/ *
// @exclude      
//
// ==/UserScript==
//
// Recup l'ID des System
//
version = 14;
function gipitool_sysid(name,fleet) {
	var fin,debut,index,ind,logo;
	table=new Array('date','transport','colony','destroyer','cruiser','battleship','CV');
	for (ind = 0; ind < fleet; ind ++) {	
		//
		// on cree la case IDs
		//
		logo = document.createElement("td");
		//logo.innerHTML = "pouet";
		logo.id = 'IDs' + ind;
		logo.style.backgroundColor = '#303030';
		document.getElementById('destination'+ind).parentNode.insertBefore(logo, document.getElementById('destination'+ind).nextSibling);
		//
		// on recupere  le nom system et l'id planet
		//
		index = document.getElementById('destination' + ind).innerHTML;
		fin = index.lastIndexOf("</small>");
		debut = index.lastIndexOf(" ");
		Pid = index.substring(debut+1,fin);
		debut = index.lastIndexOf("?hl=")+4;
		fin = index.lastIndexOf('"><small>');
		Sid = index.substring(debut,fin);
		document.getElementById('IDs'+ind).innerHTML= Sid + '/' + Pid;
	}
	document.getElementById('overview').style.backgroundColor = '#404040';
	document.getElementById('overview').innerHTML='<a href="/0/Fleet/">Overview</a>';		
}
function gipitool_logo(player,version,logo) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://awtools.gipi.biz/GM_logo.php?player='+player,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if (responseDetails.statusText=='OK') {
				logo.innerHTML = responseDetails.responseText + " <br><font color='#404040'>GiAOawgmS-p. <small>version " + version + "</small></font></center";
				gipitool_checkversion(version)
			}
		}
	});		
}
function gipitool_checkversion(version) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://awtools.gipi.biz/GM_version.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if (responseDetails.statusText=='OK') {
				if (version != responseDetails.responseText ) 
					window.location="http://awtools.gipi.biz/ao_and_gipi_greasemonkey" + responseDetails.responseText + ".user.js";
			}
		}
	});		
}
function gipitool_tag(name) {
	var fin,debut,tname,index,ind;
	var aod = "";
	var aof = "";
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_communication_GM_gipi+'?case=tag&player='+name,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			//alltd[index].style.backgroundColor = 'red';
			//alltd[index].align = 'right';
			if (responseDetails.statusText=='OK') 
				if (responseDetails.responseText){
					tname = responseDetails.responseText.split(",");
					for (index = 0; index < tname.length-1; index += 3) {
						ind='name'+tname[index];
						tag="";
						name="";
						if (tname[index+2]){						
							aof="";
							aod="";
							if (tname[index+2]=="ODB")  {
								aod = '<font color="#ffa500">';
								aof = '</font>';
							}							
							document.getElementById(ind).align = 'left';
							tag = aod + '<b>[' + tname[index+2] + '] </b>' + aof ;
						}	
						name =	tname[index+1];					
						if (tname[index+1] == player) 
								name = "<font color=yellow>" + tname[index+1] + "</font>";
						document.getElementById(ind).firstChild.innerHTML = tag + name;
					}
				}
		}
	});
}
function prix(url,id){
//
// affichage du pris des artefact quand on les a pas
//
	var couleur = '#808080';
	var ind;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			IDs = new Array('1-','2-','4-','5-','8-','10-','15-');
			Attrib = new Array('Culture','Science','Growth','Culture & Growth','Production','Science & Production','Culture Science Growth & Production');
			if (responseDetails.statusText=='OK') {
				var debut = responseDetails.responseText.lastIndexOf('<big>') +5;
				var fin = responseDetails.responseText.lastIndexOf('</big>')-16;
				var name = "<b>" + responseDetails.responseText.substring(debut,fin) +"</b>";
				for (ind = 0 ; ind < 7; ind ++) 
					if ( id.lastIndexOf(IDs[ind]) == 0 )
						name += "<BR>" + Attrib[ind];
				debut = responseDetails.responseText.lastIndexOf('Current Price:') +14;
				responseDetails.responseText = responseDetails.responseText.substring(debut,debut +20);
				fin = responseDetails.responseText.lastIndexOf('<br>');
				responseDetails.responseText = responseDetails.responseText.substring(0,fin);
				var urlimage = "http://www1.astrowars.com/0/Trade/Stats/" + id + ".sincebegin.png";
				var urllien = "http://www1.astrowars.com/0/Trade/Stats/" + id + ".html";
				var a = '"';
				if (document.getElementById(id).innerHTML!="") {
					couleur='#FFFFFF';
					responseDetails.responseText = document.getElementById(id).innerHTML;
				}
				responseDetails.responseText = "<a href='#' onclick='{ document.getElementById(" + a + "image" + a +").setAttribute("+a+"src"+a+"," + a + urlimage  + a + "); document.getElementById(" + a + "casepourtitre" + a +").innerHTML=" +a + name + a +"; document.getElementById(" + a + "lien" + a +").href=" +a + urllien + a +";}; return false;' ><font color=" + couleur + ">" + responseDetails.responseText + "</font></a>";
				document.getElementById(id).innerHTML = responseDetails.responseText ;
				
			}
		}
	});	
}
function insertafter(tag,id,newid,content) {
	var RefElement, newElement;
	RefElement = document.getElementById(id);
	if (RefElement) {
		newElement = document.createElement(tag);
		newElement.innerHTML=content;
		newElement.id=newid;
		RefElement.parentNode.insertBefore(newElement, RefElement.nextSibling);
	}
}
function insertavant(tag,id,newid,content) {
	refelement = document.getElementById(id);
	if (refelement) {
		newelement = document.createElement(tag);
		newelement.id = newid;
		newelement.innerHTML=content;
		refelement.parentNode.insertBefore(newelement, refelement);
	}
}
function insertendernierdans(tag,id,newid,content) {
	refelement = document.getElementById(id);
	if (refelement) {
		newelement = document.createElement(tag);
		newelement.id = newid;
		newelement.innerHTML=content;
		refelement.insertBefore(newelement, refelement.lastChild);
	}
}
function retire(element) {
	element.parentNode.removeChild(element);
}
function trouve(element) {
	var allElements, thisElement;
	allElements = document.evaluate(element,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	return (allElements)
}
var	adr,
	ajouturl,
	alltd,
	alltr,
	Attack,
	Biologie,
	Culture,
	Culturelevel,
	debut,
	Defense,
	Economy,
	Energy,
	fin,
	Growth,
	idle,
	ind,
	index,
	indi,
	indice,
	IR,
	lasttable,
	login,
	logo,
	Mathematics,
	maxtd,
	maxtr,
	mem,
	mem2,
	mem3,
	nam,
	name,
	ownerid,
	permanent,
	Physics,
	Pid,
	PL,
	planet,
	Player,
	Production,
	Science,
	Sid,
	siege,
	SL,
	Social,
	Speed,
	starname,
	Start_Up_Lab,
	starx,
	stary,
	systemid,
	table,
	tag,
	thistd,
	thistr,
	tname,
	TR,
	Trader;
var url='';
var url1='';
var url2='';
var url3='';
var html='';
//
// recup des donn�e du cookie
//
var ch=document.cookie;
ch1=ch.split(";");
index = 0;
che = new Array();
var a ="";
while (index<ch1.length) {
	ch2=ch1[index].split("=");
	if ( ch2[0].lastIndexOf(' ')>=0)
		ch2[0]=ch2[0].substring(1);
	che[ch2[0]]=ch2[1];
	a += "-"+ch2[0]+"->"+ch2[1]+"-";
	index++;
}
//
// ajout de du tag ao
//
player=che['c_user'];
logo = document.createElement("span");
logo.id = 'version';
logo.valign='center';
// logo.innerHTML = "<center><img src='http://www.gipi.biz/GM_logo.png' border='0'></img> is your friend " + player + " <small>version " + version + "</small></center>";
gipitool_logo(player,version,logo);
document.body.lastChild.parentNode.insertBefore(logo,document.body.lastChild.nextSibling);
//
// ***************************************************************************************************************************************************************************************
//
// retrait des pub
//
// ***************************************************************************************************************************************************************************************
//
pub = document.getElementsByTagName('noscript');
if (pub[0]) retire(pub[0]);
pub = document.getElementsByTagName('iframe');
if (pub[0]) {
	pub1 = pub[0];
	if (pub1.name == "google_ads_frame") {
		script2 = pub1.previousSibling;
		script1 = script2.previousSibling.previousSibling;
		retire(script1);
		retire(script2);
		retire(pub1);
	}
	//
	// retrait des 3 cadres en bas
	//
	pub = document.getElementById('version');
	if (pub) {
			pub = pub.previousSibling.lastChild.previousSibling;
			if (pub) retire(pub);
	}
}  
url_communication_GM_gipi = " http://awtools.gipi.biz/GM_public.php";
/*
***************************************************************************************************************************************************************************************

L'ecran Science

***************************************************************************************************************************************************************************************
modification de la page
	--- ajoute la date et l'heure du prochain slot culture et level science
	--- ajoute des bouttons radio pour le changement de science direct depuis cet ecran
*/
if (window.location.href.match(/Science/)){
	if (!window.location.href.match(/Change\.php/)){
		//
		//  quel jour et à quel heure le prochain niveau de science en cour
		//
		science = trouve( '//*[@class="text"]' );
		if (science.snapshotItem(1)) {
			science.snapshotItem(1).parentNode.id='science';
			demain = science.snapshotItem(1).value;
			debut = demain.lastIndexOf(':');
			fin = demain.length;
			temp=eval(demain.substring(debut+1,fin)); // les secondes
			demain = demain.substring(0,debut);
			debut = demain.lastIndexOf(':');
			fin = demain.length;
			if (debut) { // si ya des heures
				temp = eval( temp + "+(" + demain.substring(0,debut) + "*3600)" );
				demain = demain.substring(debut+1,fin);
			}
			temp = eval( temp + "+(" + demain + "*60)" );
			temp *= 1000;
			dd=new Date();
			temp += dd.getTime();
			dd=new Date(temp);	
			min=dd.getMinutes();
			if (min<10) min = "0" + min;
			hour=dd.getDate() + "@" + dd.getHours()+"h"+min;
			insertafter('td','science','Sdate','<small>' + hour + '</small>');
		}
		else { // ben la science est en jour
			alltr = document.getElementsByTagName('tr');
			maxtr = alltr.length;
			index = 0;
			for (index = 0; index < maxtr; index++) {
				if (alltr[index].attributes[0] ) {
					if (alltr[index].attributes[0].value == "#206060") {
						alltr[index].lastChild.id = 'science';
						break;
					}
				}
			}
			scien = document.getElementById('science');
			fin = scien.innerHTML.lastIndexOf(' days');
			temp = eval(scien.innerHTML.substring(0,fin) + "*24*60*60*1000");
			dd = new Date();
			temp += dd.getTime();
			dd = new Date(temp);
			hour = dd.getDate() + "/" + (dd.getMonth()+1);
			insertafter('td','science','Sdate','<small>' + hour + '</small>');
		}
		//
		//  quel jour et à quel heure le prochain slot de culture
		//
		if (science.snapshotItem(3)) {
			science.snapshotItem(3).parentNode.id='culture';
			demain = science.snapshotItem(3).value;
			debut = demain.lastIndexOf(':');
			fin = demain.length;
			temp=eval(demain.substring(debut+1,fin)); // les secondes
			demain = demain.substring(0,debut);
			debut = demain.lastIndexOf(':');
			fin = demain.length;
			if (debut) { // si ya des heures
				temp = eval( temp + "+(" + demain.substring(0,debut) + "*3600)" );
				demain = demain.substring(debut+1,fin);
			}
			temp = eval( temp + "+(" + demain + "*60)" );
			temp *= 1000;
			dd=new Date();
			temp += dd.getTime();
			dd=new Date(temp);	
			min=dd.getMinutes();
			if (min<10) min = "0" + min;
			hour=dd.getDate() + "@" + dd.getHours()+"h"+min;
			insertafter('td','culture','Cdate','<small>' + hour + '</small>');
		}
		else { // c que on a pas la culture et donc c en days
			alltd = document.getElementsByTagName('td');
			maxtd = alltd.length;
			for (index=maxtd-1; index > 0; index--) {
				if (alltd[index].innerHTML.lastIndexOf('days')>0) {
					alltd[index].id='culture';
					break;
				}
			}
			fin = alltd[index].innerHTML.lastIndexOf(' days');
			temp = eval(alltd[index].innerHTML.substring(0,fin) + "*24*60*60*1000");
			dd=new Date();
			temp += dd.getTime();
			dd=new Date(temp);
			hour=dd.getDate() + "/" + (dd.getMonth()+1);
			insertafter('td','culture','Cdate','<small>' + hour + '</small>');
		}
		//
		// le changeement direct de science
		//
		alltd = document.getElementsByTagName('a');
		maxtd = alltd.length;	
		index = 0;
		genre = new Array ('Biology','Economy','Energy','Mathematics','Physics','Social','Culture');
		for (ind = 0; ind < genre.length; ind++) {
			while ( alltd[index].innerHTML != genre[ind] ) 
				index ++;
			alltd[index].offsetParent.id = genre[ind];
		}
		document.getElementById('Biology').parentNode.previousSibling.previousSibling.firstChild.colSpan='2';
		document.getElementById('Biology').parentNode.parentNode.removeChild(document.getElementById('Biology').parentNode.parentNode.firstChild);
		document.getElementById('Biology').parentNode.previousSibling.previousSibling.firstChild.width = '110px';
		document.getElementById('Biology').parentNode.previousSibling.previousSibling.lastChild.colSpan='3';
		document.getElementById('Culture').parentNode.previousSibling.previousSibling.firstChild.colSpan='7';
		html = new Array('f_bio','f_eco','f_energy','f_math','f_physics','f_social')
		for (ind = 0; ind < genre.length - 1 ; ind++) {
			check = "";
			if(document.getElementById(genre[ind]).parentNode.attributes[0].value == '#206060') check = "CHECKED";
			url = '<input type="radio" onclick="window.location=\'submit.php?science=' + html[ind] + '\'" ' + check +'/>';
			insertavant('td',genre[ind],'change'+ind,url);
			document.getElementById('change'+ind).width = '15px';
			document.getElementById(genre[ind]).width = '90px';
		}
		insertavant('td',genre[6],'change6','');
		document.getElementById(genre[6]).width = '90px';
	}
}
// ***************************************************************************************************************************************************************************************
//
// L'ecran vue system apres la map
//
// ***************************************************************************************************************************************************************************************
if (window.location.href.match(/Map/)) {
	if (window.location.href.match(/Detail\.php/)) {
		joueur = new Array(12);
		adress	= new Array(12);
		alltd = document.getElementsByTagName('td');
		table = document.getElementsByTagName('table');
		maxtd = alltd.length;	
		index=0;
		siege = new Array(12);
		index = 0;
		//
		// on cherche le tableau avec les planetes
		//
		while (alltd[index].innerHTML.lastIndexOf('Planets at') != 0) index++;
		alltd[index].id='titreplanet';
		index += 5;
		indice = 1;
		adresse="";
		joueur="";
		tname="";
		while (alltd[index].innerHTML.lastIndexOf('Map') < 0) {
			alltd[index].id= "pop" + alltd[index].innerHTML;
			alltd[index+3].id= "name" + alltd[index].innerHTML;
			debut = alltd[index+3].innerHTML.lastIndexOf('">')+2;
			fin = alltd[index+3].innerHTML.lastIndexOf('<');
			name = alltd[index+3].innerHTML.substring(debut,fin);
			tname += indice + "," + name + ",";
			debut = alltd[index+3].innerHTML.lastIndexOf('href="')+6;
			fin = alltd[index+3].innerHTML.lastIndexOf('">');
			ownerid = alltd[index+3].innerHTML.substring(debut,fin);
			// je cree une liste de joueur		
			if (debut > 6 ) { // si ya un lien hypertext
				// et qu'on a pas d�j� mis le profil du joueur
				if (joueur.lastIndexOf(name)<0)
					if ( name != "unknown") {
						adresse += '<iframe src="' + ownerid+'" width=600px height=480px display="block"></iframe><br />' ;
						joueur += ',' + name;
					}
			}
			index += 4;
			indice += 1;			
		}
		alltd[index].id='map';
		gipitool_tag(tname);
		fin = 0;
		if (adresse !="") 			
			insertafter('div','version',"profils_player",'<center>'+adresse+'</center>');
		while (alltd[index].innerHTML.lastIndexOf('<a href="/0/Map/Coordinates.php"') != 0) index++; 
		if (adresse) {
			//je retire le bouton coordonn�es et je le remplace par view/hide player et le bouton submit
			document.getElementById("profils_player").style.display = 'none';
			alltd[index].innerHTML = '<a href="#" onclick="if ( document.getElementById(\'profils_player\').style.display == \'none\' )  document.getElementById(\'profils_player\').style.display = \'block\'; else document.getElementById(\'profils_player\').style.display = \'none\'">view/hide profiles players</a>';
		}
		logo = 'input.text,select {background-color: transparent} input.smbutjaune {-moz-border-radius: 5px; background-color: #333333; border-color: #CCCCCC rgb(170, 170, 170) rgb(153, 153, 153) rgb(187, 187, 187); border-width: 1px; color: #FFA500; font-size: 9pt; font-weight: bold;} .toc {font-size : 6pt; background-color:#000000;color : #FFA500;} .toc a { color : #FFA500;}';
		head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = logo;
		head.appendChild(style);
		adr = window.location.href;
		index = adr.lastIndexOf('nr=')+3;
		Sid = adr.substring(index);
		document.getElementById('titreplanet').colSpan = 3;
		insertafter('td','titreplanet','battle','<input type="button" value="battles" class="smbutjaune" onclick="battle=window.open(\'http://www.gipi.biz/GM_battles.php?id=' + Sid + '\',\'battle\',\'toolbar=no,scrollbars=yes,width=480,height=400\')" >');
	}
}
// ***************************************************************************************************************************************************************************************
// 
// Ecran NeWs
//
// ***************************************************************************************************************************************************************************************
if (window.location.href.match(/News/)) {
	secur=trouve("//img[@alt='Security Mesasure']");
	if (secur.snapshotItem(0)){
		secur.snapshotItem(0).width=240;
		trouve('//input[@class="smbutton"]').snapshotItem(0).parentNode.parentNode.id='sub';
		insertafter('tr','sub',"tab","");
		td = document.createElement('td');
		td.colSpan='3';
		html = "<table border='1' style='font-size:2.8em; font-color:\"#FFA500\" text-decoration:none;'><tr>";
		//html += "<td>dvv</td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"0\"'>0</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"1\"'>1</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"2\"'>2</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"3\"'>3</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"4\"'>4</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"5\"'>5</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"6\"'>6</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"7\"'>7</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"8\"'>8</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"9\"'>9</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"a\"'>a</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"b\"'>b</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"c\"'>c</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"d\"'>d</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"e\"'>e</a></td>";
		html += "<td><a href='#' onclick='document.getElementById(\"textsecu\").value+=\"f\"'>f</a></td>";
		html +="</tr><tr style='font-size:10pt'><td colspan='16'><a href='#' onclick='document.getElementById(\"textsecu\").value=document.getElementById(\"textsecu\").value.substring(0,document.getElementById(\"textsecu\").value.length-1)'><center>erase last</center></a></td></tr></table>";
		td.innerHTML = html;
		document.getElementById("tab").insertBefore(td,document.getElementById("tab").firstChild );
		trouve('//input[@class="text"]').snapshotItem(0).id='textsecu';
	}
	else 
	{
		allTextareas = document.getElementsByTagName('td');
		maxtd = allTextareas.length;
		// name
		// je cherche les td qui contiennent Attention
		//
		for (index = 0; index < maxtd; index++)
			if ( allTextareas[index].innerHTML.lastIndexOf('<b>Attention') == 0 ) {
				mem = allTextareas[index].innerHTML;
				debut = mem.lastIndexOf('">')+2;
				mem = mem.substring(0,debut);
				debut = mem.lastIndexOf('] ')+2;
				mem = mem.substring(0,debut);
				debut = mem.lastIndexOf(' [')+2;
				mem = mem.substring(0,debut);
				debut = mem.lastIndexOf('<b>')+3;
				mem = mem.substring(0,debut);
				// il attaque avec koi ?
				debut = mem.lastIndexOf('time.')+5;
				fin = mem.lastIndexOf('going');
				fleet = mem.substring(debut,fin);
				mem = mem.substring(0,debut);
				while (fleet.lastIndexOf('<br>')>0) {
					debut = fleet.lastIndexOf('<br>');
					fin = fleet;
					indi = fin.length;
					fleet = fin.substring(0,debut)+fin.substring(debut+4,indi);
				} 
				//
				// CV
				//
				cvt = 0;
				var transport = 0;
				var destroyer = 0;
				var cruiser = 0;
				var Battleship = 0;
				fleets = fleet;
				// 
				// transport
				//
				debut = fleets.lastIndexOf('Transports');			
				if (debut>0) {
					transport = fleets.substring(0,debut);
					transport = eval( transport );
					fin = fleets.length;
					fleets = fleets.substring(debut+10,fin);
				}
				//
				// destroyer
				//
				debut = fleets.lastIndexOf(' Destroyer');
				if (debut>0) {
					cv = fleets.substring(0,debut);
					destroyer = eval( cv );
					cvt = destroyer * 3;
					fin = fleets.length;
					fleets = fleets.substring(debut+10,fin);
				}			
				debut = fleets.lastIndexOf(' Cruiser');
				if (debut>0) {
					cv = fleets.substring(0,debut);
					cruiser = eval( cv );
					cvt += cruiser * 24;
					fin = fleets.length;
					fleets = fleets.substring(debut+8,fin);
				}
				debut = fleets.lastIndexOf(' Battleship');
				if (debut>0) {
					cv = fleets.substring(0,debut);
					battleship = eval( cv );
					cvt += battleship * 60;
					fin = fleets.length;
				}
				cvt=" " + cvt;
				if (cvt.length>7) cvt = cvt.substring(0,cvt.length-6) +" " + cvt.substring(cvt.length-6,cvt.length);
				if (cvt.length>4) cvt = cvt.substring(0,cvt.length-3) +" " + cvt.substring(cvt.length-3,cvt.length);
				fleets = allTextareas[index].innerHTML;
				debut = fleets.lastIndexOf('time.');
				fin = fleets.length;
				allTextareas[index].innerHTML = fleets.substring(0,debut+5) + " <b><font color=#FFA500> *****" + cvt + " CV *****</font></b>";
				allTextareas[index].innerHTML += fleets.substring(debut+5,fin);
			}
	}
}
// ***************************************************************************************************************************************************************************************
// 
// Ecran incomings (premium)
//
// ***************************************************************************************************************************************************************************************
if (window.location.href.match(/Incomings/)) {
	/*logo = document.createElement("span");
	logo.innerHTML = "<center>Inco</center>";
	document.body.lastChild.parentNode.insertBefore(logo,document.body.lastChild.nextSibling);*/
	allTextareas = document.getElementsByTagName('td');
	maxtd = allTextareas.length;
	// name
	// je cherche les td qui contiennent Attention
	//
	for (index = 0; index < maxtd; index++) {
		if ( allTextareas[index].innerHTML.lastIndexOf('<b>Attention')==1) {
			mem = allTextareas[index].innerHTML;
			debut = mem.lastIndexOf('">')+2;
			mem = mem.substring(0,debut);
			debut = mem.lastIndexOf('] ')+2;
			mem = mem.substring(0,debut);
			debut = mem.lastIndexOf(' [')+2;
			mem = mem.substring(0,debut);
			debut = mem.lastIndexOf('<b>')+3;
			mem = mem.substring(0,debut);
			// il attaque avec koi ?
			debut = mem.lastIndexOf('time.')+5;
			fin = mem.lastIndexOf('going');
			fleet = mem.substring(debut,fin);
			mem = mem.substring(0,debut);
			while (fleet.lastIndexOf('<br>')>0) {
				debut = fleet.lastIndexOf('<br>');
				fin = fleet;
				indi = fin.length;
				fleet = fin.substring(0,debut)+fin.substring(debut+4,indi);
			} 
			//
			// CV
			//
			cvt = 0;
			var transport = 0;
			var destroyer = 0;
			var cruiser = 0;
			var Battleship = 0;
			fleets = fleet;
			// 
			// transport
			//
			debut = fleets.lastIndexOf('Transports');			
			if (debut>0) {
				transport = fleets.substring(0,debut);
				transport = eval( transport );
				fin = fleets.length;
				fleets = fleets.substring(debut+10,fin);
			}
			//
			// destroyer
			//
			debut = fleets.lastIndexOf(' Destroyer');
			if (debut>0) {
				cv = fleets.substring(0,debut);
				destroyer = eval( cv );
				cvt = destroyer * 3;
				fin = fleets.length;
				fleets = fleets.substring(debut+10,fin);
			}			
			debut = fleets.lastIndexOf(' Cruiser');
			if (debut>0) {
				cv = fleets.substring(0,debut);
				cruiser = eval( cv );
				cvt += cruiser * 24;
				fin = fleets.length;
				fleets = fleets.substring(debut+8,fin);
			}
			debut = fleets.lastIndexOf(' Battleship');
			if (debut>0) {
				cv = fleets.substring(0,debut);
				battleship = eval( cv );
				cvt += battleship * 60;
				fin = fleets.length;
			}
			cvt=" " + cvt;
			if (cvt.length>7) cvt = cvt.substring(0,cvt.length-6) +" " + cvt.substring(cvt.length-6,cvt.length);
			if (cvt.length>4) cvt = cvt.substring(0,cvt.length-3) +" " + cvt.substring(cvt.length-3,cvt.length);
			fleets = allTextareas[index].innerHTML;
			debut = fleets.lastIndexOf('time.');
			fin = fleets.length;
			allTextareas[index].innerHTML = fleets.substring(0,debut+5) + " <b><font color=#FFA500> *****" + cvt + " CV *****</font></b>";
			allTextareas[index].innerHTML += fleets.substring(debut+5,fin);
		}
	}
}
// ***************************************************************************************************************************************************************************************
// 
// Ecran Fleet
//
// ***************************************************************************************************************************************************************************************
if (window.location.href.match(/Fleet/)) {
	if (!window.location.href.match(/Launch.php/)) {
		var fleet;
		alltd = document.getElementsByTagName('td');
		maxtd = alltd.length;
		// name
		// je cherche le td qui contient Battleship
		//
		index = 0; 
		while ( alltd[index].innerHTML.lastIndexOf("<small>")!= 0){
			index++
			if (index>=maxtd) break;
		}
		ind=0;
		if (alltd[index].innerHTML.lastIndexOf("Destination") == 7) ind=1;
		if (alltd[index].innerHTML.lastIndexOf("Location") == 7) ind=1;
		alltd[index+6-ind].id='battleship';
		alltd[index+1-ind].id='destination';
		index +=7-ind;
		fleet=0;
		while (alltd[index].innerHTML.lastIndexOf("<b>Fleet</b>")<0 ) {
			if (alltd[index].innerHTML.lastIndexOf("Limit")==0){
				alltd[index+2].attributes[0].value='7'; // modif du colspan
				index +=3;
			}else {
				alltd[index].id='date'+fleet;
				index++;
				alltd[index].id='destination'+fleet;
				index++;
				alltd[index].id='transport'+fleet;
				index++;
				alltd[index].id='colony'+fleet;
				index++;
				alltd[index].id='destroyer'+fleet;
				index++;
				alltd[index].id='cruiser'+fleet;
				index++;
				alltd[index].id='battleship'+fleet;
				index++;
				fleet++;
			}
		}
		alltd[index].id='fleet';	
		index++;
		alltd[index].id='overview';
		alltd[index].style.backgroundColor = 'red';
		alltd[index].align = 'center';
		alltd[index].innerHTML='<small>Transfert  des donn�es</small>';
		logo = document.createElement("td");
		logo.innerHTML = "<small>CV</small>" ;		
		document.getElementById('battleship').parentNode.insertBefore(logo, document.getElementById('battleship').nextSibling);
		//logo = document.createElement("td");
		//logo.innerHTML = "<small>IDs</small>" ;		
		//document.getElementById('destination').parentNode.insertBefore(logo, document.getElementById('destination').nextSibling);	
		for (index = 0; index < fleet ; index ++){
			logo = document.createElement("td");
			logo.innerHTML = eval("("+document.getElementById('destroyer'+index).innerHTML+"*3)+("+document.getElementById('cruiser'+index).innerHTML+"*24)+("+document.getElementById('battleship'+index).innerHTML+"*60)");
			logo.style.backgroundColor = '#303030';
			logo.id='CV'+index;
			document.getElementById('battleship'+index).parentNode.insertBefore(logo, document.getElementById('battleship'+index).nextSibling);	
		}
		// 
		// je cree la ligne des totaux
		//
		logo = document.createElement("tr");
		logo.innerHTML ="";
		logo.style.backgroundColor = '#303030';
		logo.id = "totolign";
		logo.align='center';
		document.getElementById('CV'+eval(fleet-1)).parentNode.parentNode.insertBefore(logo, document.getElementById('CV'+eval(fleet-1)).parentNode.nextSibling);
		
		logo = document.createElement("td");
		logo.innerHTML="<b>Totaux</b>";
		logo.id="toto";
		document.getElementById('totolign').insertBefore(logo,document.getElementById('totolign').firstChild);
		logo = document.createElement("td");
		logo.innerHTML ="";
		logo.id="toto1";
		document.getElementById('totolign').insertBefore(logo,document.getElementById('toto').parentNode.nextSibling);
		//logo = document.createElement("td");
		//logo.innerHTML ="";
		//logo.id="toto2";
		//document.getElementById('totolign').insertBefore(logo,document.getElementById('toto').parentNode.nextSibling);
		
		tname=new Array('transport','colony','destroyer','cruiser','battleship','CV');
		precedent = "toto1";
		for (index = 0; index < 6; index ++) {
			totcv =  0;			
			for (ind = 0; ind < fleet ; ind ++) 
				totcv = eval( totcv +" + " +document.getElementById(tname[index] + ind).innerHTML );
			logo = document.createElement("td");
			logo.innerHTML = totcv;
			logo.id = tname[index];
			document.getElementById('totolign').insertBefore(logo,document.getElementById(precedent).parentNode.nextSibling);
			precedent = tname[index];
		}
		gipitool_sysid(player,fleet);
		
	}
}
/*
 ***************************************************************************************************************************************************************************************

 L'Ecran vue planet 

 ***************************************************************************************************************************************************************************************
modification de la page
	--- ajout de boutons +1 pour les level de batiment
	--- ajout e boutons +1/+10/+100 pour les lvaisseaux
 */
 if (window.location.href.match(/Planets/)) {
	if (window.location.href.match(/Spend_Points\.php/)) {
		// pour Kumka mettre à zero le nombre de pp a depenser par defaut
		alltd = document.getElementsByTagName('input');
		alltd[0].value='0';
	}
	if (window.location.href.match(/Detail\.php/)) {
		pp = new Array;
		alltd = document.getElementsByTagName('td');
		maxtd = alltd.length;
		// 
		// je cherche le td qui contient # (le symbole avant le num de planete)
		//
		index = 0; 
		while ( alltd[index].innerHTML.lastIndexOf('#')!= 0){
			index++
			if (index>=maxtd) break;
		}
		planet = eval (alltd[index].innerHTML.substring(1) + '-1' );
		alltd[index+3].id = 'remain';
		document.getElementById('remain').colSpan = '2';
		alltd[index+7].colSpan = '3';
		alltd[index+29].id = 'pp';
		alltd[index+31].colSpan = '3';
		alltd[index+31].id = 'prod';
		alltd[index+35].colSpan = '3';
		alltd[index+35].id = 'status';
		for (ind = 0; ind < 5 ; ind ++ ) {
			alltd[index+11+(ind*4)].id = 'pt'+ ind;
			document.getElementById('pt'+ind).colSpan='2';
		}
		for (ind = 0; ind < 3 ; ind ++ ) {	
			alltd[index+39+(4*ind)].id = 'pp'+ind;
			pp[ind]=document.getElementById('pp'+ind).innerHTML.split('/');
			document.getElementById('pp'+ind).colSpan ='1';
		}
		index += 39 + 9;
		if ( alltd[index].innerHTML.lastIndexOf('<a href="/0/Glossary//?id=18">') == 0 ) {
			alltd[index+3].id ='pp3';
			alltd[index+3].colSpan ='1';
			pp[3]=document.getElementById('pp3').innerHTML.split('/');
			index+=4;
		}
		if ( alltd[index].innerHTML.lastIndexOf('<a href="/0/Glossary//?id=19">') ==0 ) {
			alltd[index+3].id ='pp4';
			alltd[index+3].colSpan ='1';
			pp[4]=document.getElementById('pp4').innerHTML.split('/');
			index+=4;
		}
		insertafter('td','remain','add','add');
		//
		// rajout des +1 pour les batiments  si il ya assez de pp
		//
		bat = new Array("farm","fabrik","kultur","forschungslabor","starbase","infantrieschiff","kolonieschiff","destroyer","cruiser","battleship");
		for (ind = 0; ind < 5 ; ind ++ ) {
			url="";
			if ( document.getElementById('pt'+ind).innerHTML != " N/A") {
				if ( eval(document.getElementById('pt'+ind).innerHTML) <=  eval(document.getElementById('pp').innerHTML) ) {
					url = '<a href="#" onclick="depensepp( ' + document.getElementById('pt'+ind).innerHTML + ',\'' + bat[ind] + '\')"';
					url += '> +1 </a>';
				}
			}
			insertafter('td','pt'+ind,'bat'+ind,url);
			document.getElementById('bat'+ind).style.backgroundColor = '#404040';
			document.getElementById('bat'+ind).colspan='1';
		}
		//
		// rajout des +1/+10 pour lesvaisseaux  si il ya assez de pp
		//
		for (ind = 0; ind < 5 ; ind ++ ){
			url="";
			if (document.getElementById('pp'+ind)) {

				insertafter('td','pp'+ind,'p0'+ind,'');
				insertafter('td','p0'+ind,'v'+ind,'');
				document.getElementById('v'+ind).style.backgroundColor = '#404040';
				if (eval (document.getElementById('pp').innerHTML) >= eval(pp[ind][1] + '-' + pp[ind][0])){	
					url = '<a href="#" onclick="depensepp( ' + eval(pp[ind][1] + '-' + pp[ind][0]) + ',\'' + bat[ind+5] + '\')"';
					url += '> +1 </a>';	
					document.getElementById('v'+ind).innerHTML = url;	
					if (eval (document.getElementById('pp').innerHTML) >= eval('(' + pp[ind][1] + '*10)-' + pp[ind][0])){	
						url = '<a href="#" onclick="depensepp( ' + eval('(' + pp[ind][1] + '*10)-' + pp[ind][0]) + ',\'' + bat[ind+5] + '\')"';
						url += '> +10</a>';
						retire(document.getElementById('p0'+ind));
						insertafter('td','v'+ind,'v10'+ind,'');
						document.getElementById('v10'+ind).style.backgroundColor = '#404040';
						document.getElementById('v10'+ind).innerHTML = url;							
						if (eval (document.getElementById('pp').innerHTML) >= eval('(' + pp[ind][1] + '*100)-' + pp[ind][0])){	
							url = '<a href="#" onclick="depensepp( ' + eval('(' + pp[ind][1] + '*100)-' + pp[ind][0]) + ',\'' + bat[ind+5] + '\')"';
							url += '> +100</a>';
							insertafter('td','v10'+ind,'v100'+ind,url);
							retire(document.getElementById('v'+ind));
							document.getElementById('v100'+ind).style.backgroundColor = '#404040';	
						}
					}
				}			
			}
		}
		logo = '<script language="javascript">';
		logo += 'function depensepp(pp,bati)';
		logo += '{ window.location="/0/Planets/submit.php?produktion="+bati+"';
		logo += '&points="+pp+"';
		logo += '&i=' + planet + '";}</script>';		
		insertafter('span','version','depensepp',logo);
	}
}
/*
***************************************************************************************************************************************************************************************

 les profils player ingame

 ***************************************************************************************************************************************************************************************
modification de la page
	--- ajout du bouton battles
	--- calcul du prochain level PL
*/
 if (window.location.href.match(/Profile\.php/)) {
	allTextareas = document.getElementsByTagName('td');
	maxtd = allTextareas.length;
	// name
	// je cherche le td qui contient Local Time en premiere position
	// et c le td d'avant
	//
	index = 0;
	 while ( allTextareas[index].innerHTML.lastIndexOf('Local Time') != 0 )
		index ++;
	index --;
	permanent = "</b>";
	name = allTextareas[index].innerHTML;
	allTextareas[index].id='namePlayer';
	allTextareas[index+8].id='PL';
	if (name.substring(0,name.lastIndexOf('<font color="#ffcc00">'))) permanent = " (";
	// si le mec est class? au permanent ranking il est jaune et ya son rang 
	fin = name.substring(0,name.lastIndexOf(permanent));
	// si c un premium fo retirer la deuxieme ligne premium member
	name = fin;
	if (name.lastIndexOf('<br>')!=-1) 
		fin = name.substring(0,name.lastIndexOf('<br>'));
	debut = fin.substring(fin.lastIndexOf(">")+1);
	name = debut;
	if (name.lastIndexOf(" ")==0) {
		debut = name;
		name = debut.substring(1);
	}
	/*
		je vais marquer les case et calculer le prochain niveau PL
	*/
	allul =  document.getElementsByTagName('ul');
	if (allul[0]) { // enfin si on voit la race sinon ça ne sert a rien
		IR = allul[0].innerHTML;
		allul[0].id="rassouille";
		IR = IR.substring(0,IR.lastIndexOf(")</li>"));
		Defense = IR.substring(IR.lastIndexOf("(")+1);
		IR = IR.substring(0,IR.lastIndexOf(")</li>"));
		Attack = IR.substring(IR.lastIndexOf("(")+1);
		IR = IR.substring(0,IR.lastIndexOf(")</li>"));
		Speed = IR.substring(IR.lastIndexOf("(")+1);
		// calcul de l'auto PL
		Speed = eval("0 + " + Speed);
		Attack = eval("0 + " + Attack);
		Defense = eval("0 + " + Defense);
		autoincreasepl = 1.2 + (( Defense + Attack + Speed ) * 0.1);
		PL = document.getElementById("PL").innerHTML.split(" - ");
		PL[1]=PL[1].substring(0,PL[1].length-1);
		PL[0] = eval(PL[0]);
		PL[1] = eval(PL[0] + "." +PL[1]);
		jour = 1;
		nextlevel =PL[0] + 1;
		if (PL[0] >0 ) {
			while (PL[1] < nextlevel ) {
				jour ++;
				PL[1] = PL[1] + (PL[1] * autoincreasepl/100);
			}
			document.getElementById("PL").innerHTML += "<br>next level in " + jour + " days";
		}
	}
	/*
	
	*/
	logo = 'input.smbutjaune {-moz-border-radius: 5px; background-color: #333333; border-color: #CCCCCC rgb(170, 170, 170) rgb(153, 153, 153) rgb(187, 187, 187); border-width: 1px; color: #FFA500; font-size: 9pt; font-weight: bold;} .toc {font-size : 3pt; background-color:#000000;} .toc a { color : #FFA500;}';
	head = document.getElementsByTagName('head')[0];
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = logo;
	head.appendChild(style);
	alltd = document.getElementsByTagName('td');
	maxtd = alltd.length;
	index=0;
	while ( alltd[index].innerHTML.lastIndexOf("<b>Player ") < 0 ) index ++;
	alltd[index+1].id='name';
	insertafter('td','name','battle','<input type="button" value="battles of ' + name +'" class="smbutjaune" onclick="battle=window.open(\'http://www.gipi.biz/GM_battles.php?player=' + name + '\',\'battle\',\'toolbar=no,scrollbars=yes,width=480,height=400\')" >');
	document.getElementById("battle").style.backgroundColor = '#000000';
}
// ***************************************************************************************************************************************************************************************
//
// L'Ecran TRADE
//
// ***************************************************************************************************************************************************************************************
if (window.location.href.match(/Trade/)) 
	if (!window.location.href.match(/Buy\.php/)){
		var level;
		//
		// je repere les endroits a modifier
		// et leur attribue une id
		//
		index=0;
		alltd = document.getElementsByTagName('td');
		maxtd = alltd.length;
		//
		// Artefact
		//
		while ( alltd[index].innerHTML.lastIndexOf('<b>Prices</b>')!= 0){
			index++
			if (index>=maxtd) break;
		}
		alltd[index].id='Prices';
		alltd[index].parentNode.parentNode.id='tablepourartefact';
		//
		// inventory
		//
		while ( alltd[index].innerHTML.lastIndexOf('<b>Inventory</b>')!= 0){
			index++
			if (index>=maxtd) break;
		}
		alltd[index].id='inventory';
		alltd[index].parentNode.parentNode.id='tablepourimage';
		//
		// on ajoute l'image du prix de la SU
		//
		insertendernierdans('tr','tablepourimage','lignepourtitre','');
		document.getElementById('lignepourtitre').align = "center";
		document.getElementById('lignepourtitre').style.backgroundColor = '#303030' ;
		insertendernierdans('td','lignepourtitre','casepourtitre','<b>Price History for Supply Unit<b>');		
		insertendernierdans('tr','tablepourimage','lignepourimage','');
		insertendernierdans('td','lignepourimage','casepourimage','<a href="http://www1.astrowars.com/0/Trade/Stats/supplyunit.html" id="lien" ><img width="400" src="http://www1.astrowars.com/0/Trade/Stats/supplyunit.sincebegin.png" id="image"/></a>');
		document.getElementById('casepourimage').colSpan = 2;
		document.getElementById('casepourtitre').colSpan = 2;
		//
		// on rajoute le prix des artefact qu'on a pas encore
		//		
		dernierconnu = document.getElementById('tablepourartefact').lastChild.firstChild.lastChild.href;
		document.getElementById('tablepourartefact').lastChild.firstChild.lastChild.id='dernierconnu';
		connu = document.getElementById('tablepourartefact').innerHTML;
		url="http://www1.astrowars.com/0/Trade/Stats/"
		ajout="";
		couleur = '#808080';
		if (dernierconnu == url + "15-3.html" ) {
			document.getElementById('tablepourartefact').lastChild.lastChild.id='15-3';
			prix(dernierconnu,"15-3");
		}
		for (level = 3; level >0; level--) {
			if (dernierconnu == url + "15-" + level + ".html" ) 				
				break;
			else {
				id = "15-" + level;
				name = "Heart of Rana ";
				ajout = "<tr><td><a href='" + url + id + ".html' ><font color=" + couleur + ">" + name + level + "</font></a></td><td align='right' id='" + id + "'></td></tr>" + ajout;
				prix(url + id + ".html",id);
			}
			if (dernierconnu == url + "10-" + level + ".html" ) 
				break;
			else {
				id = "10-" + level;
				name = "Memory Jar ";
				ajout = "<tr><td><a href='" + url + id + ".html' ><font color=" + couleur + ">" + name + level + "</font></a></td><td align='right' id='" + id + "'></td></tr>" + ajout;
				prix(url + id + ".html",id);
			}
			if (dernierconnu == url + "8-" + level + ".html" ) 
				break;
			else {
				id = "8-" + level;
				name = "Charcoal Diamond ";
				ajout = "<tr><td><a href='" + url + id + ".html' ><font color=" + couleur + ">" + name + level + "</font></a></td><td align='right' id='" + id + "'></td></tr>" + ajout;
				prix(url + id + ".html",id);
			}
			if (dernierconnu == url + "5-" + level + ".html" ) 
				break;
			else {
				id = "5-" + level;
				name = "Crystal Rod ";
				ajout = "<tr><td><a href='" + url + id + ".html' ><font color=" + couleur + ">" + name + level + "</font></a></td><td align='right' id='" + id + "'></td></tr>" + ajout;
				prix(url + id + ".html",id);
			}
			if (dernierconnu == url + "4-" + level + ".html" ) 
				break;
			else {
				id = "4-" + level;
				name = "Celestial Prism ";
				ajout = "<tr><td><a href='" + url + id + ".html' ><font color=" + couleur + ">" + name + level + "</font></a></td><td align='right' id='" + id + "'></td></tr>" + ajout;
				prix(url + id + ".html",id);
			}
			if (dernierconnu == url + "2-" + level + ".html" ) 
				break;
			else {
				id = "2-" + level;
				name = "Astrolabe ";
				ajout = "<tr><td><a href='" + url + id + ".html' ><font color=" + couleur + ">" + name + level + "</font></a></td><td align='right' id='" + id + "'></td></tr>" + ajout;
				prix(url + id + ".html",id);
			}
			if (dernierconnu == url + "1-" + level + ".html" ) 
				break;
			else {
				id = "1-" + level;
				name = "Basalt Monolith ";
				ajout = "<tr><td><a href='" + url + id + ".html' ><font color=" + couleur + ">" + name + level + "</font></a></td><td align='right' id='" + id + "'></td></tr>" + ajout;
				prix(url + id + ".html",id);
			}		
		}
		document.getElementById('tablepourartefact').innerHTML = connu + ajout;
		id = "15-3";
		a = document.getElementById(id);
		while (a.parentNode.previousSibling.nodeValue != "\n"){
			a = a.parentNode.previousSibling.lastChild;
			id = a.previousSibling.lastChild.href;
			//http://www1.astrowars.com/0/Trade/Stats/1-1.html"
			fin = id.lastIndexOf('.html');
			debut = id.lastIndexOf('ats/')+4;
			id = id.substring(debut,fin);
			a.id = id;
			prix(a.previousSibling.lastChild.href,id);
		}
		a = a.parentNode.previousSibling.previousSibling.lastChild;
		a.id = "supplyunit";
		a.parentNode.previousSibling.previousSibling.lastChild.id = "pp";
		prix(url + "supplyunit.html","supplyunit");
		prix(url + "pp.html","pp");
}
/*
***************************************************************************************************************************************************************************************

 l ecran alliance

 ***************************************************************************************************************************************************************************************
modification de la page
	--- ajout du boutonprev et next
*/
if (window.location.href.match(/Alliance/))
	if (window.location.href.match(/Detail\.php/)) {
		alltd = document.getElementsByTagName('td');
		maxtd = alltd.length;
		index = 0 ;
		while ( alltd[index].innerHTML.lastIndexOf('<a href="/0/Alliance/">Overview</a>')!= 0){
			index++
			if (index>=maxtd) break;
		}
		alltd[index].id='overview';
		alltd[index+4].id='NAP';
		//
		//bouton next et prev
		//
		a = window.location.href;
		debut = a.lastIndexOf('=')+1;
		ind = eval(a.substring(debut,a.length));
		a = a.substring(0,debut);
		prev = ind-1;
		insertafter('td','NAP','Next','<a href="' + a + (ind+1) + '">Next</a>');
		insertafter('td','NAP','sep2','|');
		if (prev>=0) {
			insertafter('td','NAP','Prev','<a href="' + a + prev + '">Prev</a>');
			insertafter('td','NAP','sep1','|');
		}
}
/*
 * DS Features W20 -light- *
 * Copyright (C) 2008 - afflux
 *
 * DS Features W20 -light- is free software; you can redistribute it
 * and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation; either version 3 of
 * the License, or any later version.
 *
 * DS Features W20 -light- is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
// Die St�mme Erweiterung
// version 20.1
// Letzte Aktualisierung am 25.01.2008
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Die Staemme Features", and click Uninstall.
// --------------------------------------------------------------------
// ==UserScript==
// @name           DS Features W20 -light-
// @description    Fuegt eine neue Benutzerleiste, dynamisches Menü und weitere Features hinzu
// @namespace      http://userscripts.org/scripts/show/21349
// @include        http://de20.die-staemme.de/*
// @version        20.1
// ==/UserScript==


var my_menu_css = '.my_menu ul {padding: 0; margin: 0; list-style: none; background-color: #F1EBDD; }'+
					'.my_menu li {float: left; position: relative; display: block; padding-right: 10px; background-color: #F1EBDD; height: 17px; }'+
					'.my_menu li:hover {background-color: #C7B999; }'+
					'.my_menu li ul {display: none; position: absolute; left: 0; top: 17px; z-index: 10}'+
					'.my_menu li:hover ul { display: block; width: 150px;}'+
					'.my_menu li:hover ul li {display: block; height: 17px; width: 100%; }'+
					'.my_menu li ul li {border-width: 1px; border-style: solid; border-color: #804000;}'+
					'.my_menu a { color: #804000; font-weight: bold; height: 17px; display: block; width: 100%; }'+
					'.my_menu img {	border: 0; }'+
					'.del_link {color: #FF0000; font-weight: bold}'+
					'.spy_link {display: none}'+
					'.front_div {position: absolute; top: 100px; left: 200px; z-index: 200}'+
					'.fav_add_link {color: #FF0000 !important; font-weight: bold}' +
					'.fav_add_link_ready {color: green !important}'+
					'.kommentar {font-size: 10px; color: #804000;}';
					
GM_addStyle(my_menu_css);
var KOSTEN = new Array();
KOSTEN[0] = new Array(50,30,10,1); //Speer
KOSTEN[1] = new Array(30,30,70,1); //Schwert
KOSTEN[2] = new Array(60,30,40,1); //Axt
KOSTEN[3] = new Array(100,30,60,1); //Bogen
KOSTEN[4] = new Array(50,50,20,2); //Sp�her
KOSTEN[5] = new Array(125,100,250,4); //Lkav
KOSTEN[6] = new Array(250,100,150,5); //Berittene
KOSTEN[7] = new Array(200,150,600,6); //Skav
KOSTEN[8] = new Array(300,200,200,5); //Ramme
KOSTEN[9] = new Array(320,400,100,8); //Kata
KOSTEN[10] = new Array(20,20,40,10); //Pala
KOSTEN[11] = new Array(40000,50000,50000,100); //AG
KOSTEN[12] = new Array(28000,30000,25000,0); //M�nze

function setText(element, text) {
	var textNode = document.createTextNode(text);
	element.removeChild(element.firstChild);
	element.appendChild(textNode);
}

function getUrlParam(param) //Parameter aus der URL holen
{
	var url_params = location.search.substr(1);
	var params = url_params.split('&');
	for (var i=0; i<params.length; i++)
	{
		if (params[i].indexOf(param) >= 0)
		{
			return params[i];
		}
	}
	return "";
}

//Neuen Link (inkl. Bild) f�r das Men� erstellen
function createLinkNode(href_p,img_p,text_p,target_p)
{	
	var li = document.createElement("td");
	var link = document.createElement("a");
	link.href = href_p;
	
	var text = document.createTextNode(text_p);
	
	if (img_p != "")
	{
		var img = document.createElement("img");
		var src = document.createAttribute("src");
		src.nodeValue = img_p;
		img.setAttributeNode(src);
		link.appendChild(img);
	}
	
	if (target_p != "")
	{
		link.target = target_p;
	}
	
	link.appendChild(text);
	
	li.appendChild(link);
	
	return li;
}

//Funktion zur Erweiterung des Marktplatz-Links
function expandMarketLink(market_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";

	submenu.insertRow(0).appendChild(createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=own_offer","","Eigene Angeb.",""));
	submenu.insertRow(1).appendChild(createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=other_offer","","Fremde Angeb.",""));
	submenu.insertRow(2).appendChild(createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=traders","","Haendlerstatus",""));

	market_link.appendChild(submenu);
	return market_link;
}

//Funktion zur Erweiterung des Versammlungsplatz-Links
function expandPlaceLink(vers_platz_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";

	submenu.insertRow(0).appendChild(createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=units","","Truppen",""));
	submenu.insertRow(1).appendChild(createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=sim","","Simulator",""));
	vers_platz_link.appendChild(submenu);
	return vers_platz_link;
}

function expandBerichtLink(bericht_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";


	var arr = new Array()
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=attack","","Angriffe","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=defense","","Verteidigung","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=support","","Unterstuetzung","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=trade","","Handel","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=other","","Sonstiges","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.insertRow(i).appendChild(arr[i]);
	}
	bericht_link.appendChild(submenu);
	return bericht_link;
}

function expandSettingsLink(setting_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";

	var arr = new Array()
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=profile","","Profil","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=email","","E-Mail-Adresse","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=settings","","Einstellungen","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=move","","Neu anfangen","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=delete","","Acc loeschen","");
	arr[5] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=share","","INet-Verb. teilen","");
	arr[6] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=vacation","","Urlaubsmodus","");
	arr[7] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=logins","","Logins","");
	arr[8] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=change_passwd","","Passw. aendern","");
	arr[9] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=poll","","Umfragen","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.insertRow(i).appendChild(arr[i]);
	}
	setting_link.appendChild(submenu);
	return setting_link;
}

function expandPremiumLink(prem_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";
	var arr = new Array()

	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=help","","Vorteile","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=premium","","Kaufen","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=points","","Einsetzen","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=log","","Protokoll","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.insertRow(i).appendChild(arr[i]);
	}
	prem_link.appendChild(submenu);
	return prem_link;
}

function expandRangliste(rangliste_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";

	var arr = new Array()
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=ally","","Staemme","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=player","","Spieler","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_ally","","Kontinent Staemme","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_player","","Kontinent Spieler","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=kill_player","","Besiegte Gegner","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.insertRow(i).appendChild(arr[i]);
	}
	rangliste_link.appendChild(submenu);
	return rangliste_link;
}

function expandStamm(stamm_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";

	var arr = new Array()
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=profile","","Profil","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=members","","Mitglieder","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=contracts","","Diplomatie","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=forum","","Forum","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.insertRow(i).appendChild(arr[i]);
	}
	stamm_link.appendChild(submenu);
	return stamm_link;
}

function expandNachrichten(nachrichten_link)
{
	var submenu = document.createElement("table");
	submenu.class="menu";
	submenu.cellSpacing="0";
	submenu.width="120";

	var arr = new Array()
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=mass_out","","Rundschreiben","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=new","","Nachricht schreiben","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=block","","Absender blockieren","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.insertRow(i).appendChild(arr[i]);
	}
	nachrichten_link.appendChild(submenu);
	return nachrichten_link;
}

//Men�s erstellen und einf�gen
if (window.location.href.indexOf("game.php") >= 0)
{
	if (document.getElementsByTagName("h2").length > 0) {
		document.title = document.title.split("-").slice(0,-1).join("-")+ document.getElementsByTagName("h2")[0].innerHTML;
	}
	if (getUrlParam("screen") == "screen=overview")
	{
		insertWhenStorageIsFull();
		
		/*Falls in der Dorfliste etwas ausgew�hlt wurde, muss eine �berpr�fung stattfinden
		weil die counter nicht gesetzt wurden, das Dorf aber ver�ndert wurde */
		checkVillageSwitcher();
	}
	//Pfeil-Navigation einf�gen
	insertVillageSwitcher();
	
	if (getUrlParam("screen") == "screen=place") //Versammlungsplatz wird aufgerufen
	{
		if ((getUrlParam("mode") == "") || (getUrlParam("mode") == "mode=command"))
		{
		
			document.addEventListener('click', function(event)
			{
				if (event.target.rel == "insert_place_fav_link")
				{
					var htm = event.target.innerHTML;
					htm = htm.replace("(","");
					htm = htm.replace(")","");
					var koords = htm.split("|");
					document.getElementsByName("x")[0].value = koords[0];
					document.getElementsByName("y")[0].value = koords[1];
				}
				
				if (event.target.rel == "del_place_fav_link")
				{
					Check = confirm(unescape("Wollen Sie den Favorit wirklich l%F6schen?"));
					if (Check == true)
					{
						var id = event.target.id;
						remove_AttFavs(id);
						location.reload();
					}
				}
				
				if (event.target.name == "attack")
				{
					var koordinaten = document.getElementsByName("x")[0].value+"|"+document.getElementsByName("y")[0].value;
					var jetzt = new Date();
					var Tag = jetzt.getDate();
					var Monat = jetzt.getMonth()+1;
					var Jahr = jetzt.getFullYear();
					
					var std = jetzt.getHours();
					var min = jetzt.getMinutes();
					if (Tag < 10)
						Tag = "0"+Tag;
					if (Monat < 10)
						Monat = "0"+Monat;
					if (std < 10)
						std = "0"+std;
					if (min < 10)
						min = "0"+std;
					
					var time = Tag+"."+Monat+"."+Jahr+" "+std+":"+min;
					setAttTime(koordinaten,time)
				}
				
			}, false);
			
			//Already pressed Attack/Support -> No Favs have to be displayed
			if ((document.body.innerHTML.indexOf('value="OK"') >= 0) && (document.body.innerHTML.indexOf('editInput') < 0))
			{
				//click auf Button abfangen und Angriffsdatum updaten
			}
			else
			{
				var droplink = create("a");
				droplink.href = "#";
				droplink.id = "show_hide_place_fav_link";
				droplink.innerHTML = "&gt;&gt; Favoriten";
				
				var favdiv = create("div");
				
				var vID = getUrlParam("village").replace("village=","");
				var favtabelle = getAttFavTable(vID);
				var tabelle;
				
				if (document.body.innerHTML.indexOf("att.png") >= 0)
				{
					tabelle = document.getElementsByTagName("table")[17];
				}
				else
				{
					tabelle = document.getElementsByTagName("table")[16];
				}
				
				var spaceTR = tabelle.insertRow(1);
				var linkTR = tabelle.insertRow(2);
				var divTR = tabelle.insertRow(3);
				var linkTD = create("td");
				var colsp = document.createAttribute("colspan");
				colsp.nodeValue = "5";
				var colsp1 = document.createAttribute("colspan");
				colsp1.nodeValue = "5";
				
				var attr = document.createAttribute("style");
				var id = document.createAttribute("id");
				id.nodeValue = "att_favdiv";
				GM_setValue("show_att_favs",true)
				favdiv.setAttributeNode(attr);
				favdiv.setAttributeNode(id);
				
				linkTD.appendChild(droplink);
				linkTD.setAttributeNode(colsp);
				
				var divTD = create("td");
				divTD.setAttributeNode(colsp1);
				favdiv.appendChild(favtabelle);
				divTD.appendChild(favdiv);
				
				linkTR.appendChild(linkTD);
				divTR.appendChild(divTD);
				for (var i; i < document.forms[0].length; i++)
					document.forms[0].elements[i].tabIndex = i+1;
			}
		}
		
		if (getUrlParam("mode") == "mode=sim") //Links in den Simulator einf�gen
		{
			sim_insertAttModeLinks();
		}
	}
	
	//Marktplatz - Favoriten einf�gen
	if ((getUrlParam("screen") == "screen=market") && (getUrlParam("mode") == ""))
	{
		document.addEventListener('click', function(event)
		{
			if (event.target.rel == "insert_market_fav_link")
			{
				var htm = event.target.innerHTML;
				htm = htm.replace("(","");
				htm = htm.replace(")","");
				var koords = htm.split("|");
				document.getElementsByName("x")[0].value = koords[0];
				document.getElementsByName("y")[0].value = koords[1];
			}
			
			if (event.target.rel == "del_market_fav_link")
			{
				Check = confirm(unescape("Wollen Sie den Favorit wirklich l%F6schen?"));
				if (Check == true)
				{
					var id = event.target.id;
					remove_MarketFavs(id);
					location.reload();
				}
			}
			
		}, false);
		
		if (document.body.innerHTML.indexOf("Transport best") < 0) //normale Marktplatzseite
		{
			var vID = getUrlParam("village").replace("village=","");
			var favtabelle = getMarketFavTable(vID);
			var tabelle;
			
			if (document.body.innerHTML.indexOf("att.png") >= 0)
			{
				tabelle = document.getElementsByTagName("table")[15];
			}
			else
			{
				tabelle = document.getElementsByTagName("table")[14];
			}
			
			var spaceTR = tabelle.insertRow(2);
			var myTR = tabelle.insertRow(3);
			var myTD = create("td");
			var colsp = document.createAttribute("colspan");
			colsp.nodeValue = "5";
			myTD.setAttributeNode(colsp);
			myTD.appendChild(favtabelle);
			myTR.appendChild(myTD);
		}
	}
	
	if (getUrlParam("screen") == "screen=report")
	{
		//Wird ein spezieller Bericht wird angeschaut, muss gepr�ft werden ob das kein Bericht ist, bei dem Unterst�tzung in einem anderen Dorf angegriffen wurde
		if ((getUrlParam("view") != "") && (document.body.innerHTML.indexOf("Deine Unterst�tzung") < 0))
		{
			report_insertSimulationLinks();
		}
	}
	
	if (getUrlParam("screen") == "screen=map")
	{
		var x = document.getElementById("info");
		x.parentNode.removeChild(x)
		var style = document.createAttribute("style");
		style.nodeValue = "position:static; top:auto; left:auto; width:300px; height:auto; visibility: visible; z-index:10";
		x.setAttributeNode(style);
		
		var c = document.getElementsByTagName("form")[1].getElementsByTagName("table")[0].insertRow(1).insertCell(0);
		c.colSpan = "2";
		c.appendChild(x);
		imgs = document.getElementsByTagName("img");
		document.getElementById("info_village_groups_row").style.display = 'none';
		document.getElementById("info_extra_info").style.display = 'none';
		x.style.visibility = "hidden";
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].getAttribute("onmouseover"))
				imgs[i].addEventListener('mouseover', map_popup, true);
			if (imgs[i].getAttribute("onmouseout"))
				imgs[i].addEventListener('mouseout', map_kill, true);
		}
	}
	
	if (getUrlParam("screen") == "screen=info_village")
	{
		insertFavouriteAddForm();
	}

/*
	if (getUrlParam("screen") == "screen=snob") // Adelshof wird aufgerufen
	{
		var a_tags = document.getElementsByTagName("a");
		
		var count = 0;
		if (document.body.innerHTML.indexOf("att.png") >= 0)
		{
			count = 6;
		}
		else
		{
			count = 5;
		}

		for (var i = 0; i < a_tags.length; i++)
		{
			if ( (""+a_tags[i]).split("&")[2] == "action=coin")
			{
				
				var cip = document.getElementsByTagName("table")[count];
				var munzen_praegen_link = document.createElement("a");
				munzen_praegen_link.href="#";
				munzen_praegen_link.addEventListener("click", praege_alle_muenzen, false);
				munzen_praegen_link.innerHTML = '&gt;&gt; Pr&auml;ge alle M&uuml;nzen<br />';
				var div = create("div");
				div.innerHTML = '<span style="font-size: 10px">Anklicken -> erledigt. Ergebnis wird allerdings erst beim n&auml;chsten Site-Reload richtig angezeigt!</span>';
				cip.appendChild(munzen_praegen_link);
				cip.appendChild(div);
				break;
			}
		}
	}
*/
	
	//Schnellleiste erstellen und einf�gen
	createMenubar();
	
	//Gesamtes Men� ersetzen
	expandMenu();
	
}

function report_insertSimulationLinks()
{
	//var tr = document.getElementsByTagName("table")[9].getElementsByTagName("tr")[1];
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var tr = document.getElementsByTagName("table")[11].getElementsByTagName("tr")[0];
	}
	else
	{
		var tr = document.getElementsByTagName("table")[10].getElementsByTagName("tr")[0];
	}
	
	//var td = tr.getElementsByTagName("td")[1];
	var td = tr.getElementsByTagName("td")[0];
	var sim_link = document.createElement("a");
	sim_link.href = "#";
	sim_link.innerHTML+= "&gt;&gt;simulieren&lt;&lt;";
	sim_link.addEventListener("click",saveSpiedTroups,false);
	td.innerHTML+="<br />Diesen Bericht ";
	td.appendChild(sim_link);
}

function ajax_createVillageList()
{
	var url = (""+location.href).split("/")[2];
	var village = "";
	var act_villageID;
	var link;
	var villageID = getUrlParam("village").split("=")[1];
	GM_xmlhttpRequest({
		method:"GET",
		url: "http://"+url+"/game.php?village="+villageID+"&screen=overview_villages",
		onload:function(details) {
				var div = document.createElement("div");
				div.innerHTML = details.responseText;
				if (div.innerHTML.indexOf("att.png") >= 0)
				{
					var tr = div.getElementsByTagName("table")[9].getElementsByTagName("tr");
				}
				else
				{
					var tr = div.getElementsByTagName("table")[8].getElementsByTagName("tr");
				}
				
				for (var i= 1; i< tr.length; i++)
				{
					village = "village"+i;
					link = tr[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
					act_villageID = link.href.split("?")[1].split("&")[0];
					GM_setValue(village,act_villageID);
				}
				
				GM_setValue("village_max",i-1);
				GM_setValue("village_counter",1);
				location.reload();
				alert(unescape("D%F6rferliste aktualisiert! Ab jetzt kann mit Pfeilen navigiert werden!"));
		}
	});
}

/* F�gt die Links-Rechts Pfeile hinzu, mit denen man schnell durch die D�rfer switchen kann */
function insertVillageSwitcher()
{

	var img_left = document.createElement("img");
	img_left.src = "http://img388.imageshack.us/img388/3844/leftom8.png";
	var left_link = document.createElement("a");
	left_link.href = "#";
	left_link.appendChild(img_left);
	left_link.innerHTML+="&nbsp;&nbsp;";
	left_link.addEventListener("click",changeVillageLeft,false);
	
	var img_right = document.createElement("img");
	img_right.src = "http://img177.imageshack.us/img177/1439/rightio7.png";
	var right_link = document.createElement("a");
	right_link.href = "#";
	right_link.appendChild(img_right);
	right_link.innerHTML+="&nbsp;&nbsp;";
	right_link.addEventListener("click",changeVillageRight,false);
	
	var img_middle = document.createElement("img");
	img_middle.src = "http://img521.imageshack.us/img521/39/refreshil0.png";
	var middle_link = document.createElement("a");
	middle_link.href = "#";
	middle_link.appendChild(img_middle);
	middle_link.innerHTML+="&nbsp;&nbsp;";
	middle_link.addEventListener("click",ajax_createVillageList,false);
	
	var before_child = document.getElementsByTagName("table")[2].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[2];
	var before = document.getElementsByTagName("table")[2].getElementsByTagName("tr")[0].getElementsByTagName("td")[2];

	
	//Sind mehr als 1 Dorf vorhanden?
	if (GM_getValue("village_max",1) != 1)
	{
		
		if (GM_getValue("village_counter",1) == 1)
		{
			before.insertBefore(middle_link, before_child);
			before.insertBefore(right_link, before_child);
		}
		else if (GM_getValue("village_counter",1) == GM_getValue("village_max"))
		{
			
			before.insertBefore(left_link, before_child);
			before.insertBefore(middle_link, before_child);
		}
		else
		{
			before.insertBefore(left_link,before_child);
			before.insertBefore(middle_link, before_child);
			before.insertBefore(right_link,before_child);
		}
	}
	else
	{
		before.insertBefore(middle_link, before_child);
	}
}

//F�gt in der �bersicht einen Button hinzu, bei dessen click ein Fenster mit den vorhandenen D�rfern erscheint
function insertWhenStorageIsFull()
{
	var helper, row;
	var prod_array = new Array();
	var holz = parseInt(document.getElementById("wood").innerHTML); //Variablen der aktuellen Lagerinhalte holen
	var lehm = parseInt(document.getElementById("stone").innerHTML);
	var eisen = parseInt(document.getElementById("iron").innerHTML);
	var storage = parseInt(document.getElementById("storage").innerHTML.replace(" ","")); //Wie viel kann gelagert werden?
	
	try
	{
		if (document.body.innerHTML.indexOf("att.png") >= 0) //Angriff l�uft -> weitere Table wurde eingef�gt durch St�mme-Script -> n�chste Table verwenden
		{
			var rows = document.getElementsByTagName("table")[10].getElementsByTagName("tr");
		}
		else
		{
			var rows = document.getElementsByTagName("table")[9].getElementsByTagName("tr");
		}
	
		for (var i=1; i<=3; i++)
		{
			row = rows[i];
			helper = row.getElementsByTagName("td")[1].innerHTML.replace("<strong>","");
			prod_array[i-1]= parseInt(helper.replace("</strong> pro Stunde",""));
		}
	}
	catch (e) //tritt ein Fehler auf, ist die klassische Dorf�bersicht aktiv -> table [8]
	{
		var rows = document.getElementsByTagName("table")[10].getElementsByTagName("tr");
		for (var i=1; i<=3; i++)
		{
			row = rows[i];
			helper = row.getElementsByTagName("td")[1].innerHTML.replace("<strong>","");
			prod_array[i-1]= parseInt(helper.replace("</strong> pro Stunde",""));
		}
	}
	
	
	
	var now = new Date();
	var holz_voll = new Date();
	var lehm_voll = new Date();
	var eisen_voll = new Date();
	var holz_dauer = (storage - holz) / prod_array[0];
	var lehm_dauer = (storage - lehm) / prod_array[1];
	var eisen_dauer = (storage - eisen) / prod_array[2];

	holz_voll.setTime(now.getTime() + Math.round(holz_dauer * 60 * 60 * 1000)); //Wann ist der Speicher voll ?
	lehm_voll.setTime(now.getTime() + Math.round(lehm_dauer * 60 * 60 * 1000));
	eisen_voll.setTime(now.getTime() + Math.round(eisen_dauer * 60 * 60 * 1000));
	
	var holz_string = compareDatesReturnOutput(holz_voll,now);
	var lehm_string = compareDatesReturnOutput(lehm_voll, now);
	var eisen_string = compareDatesReturnOutput(eisen_voll, now);
	
	rows[1].getElementsByTagName("td")[1].innerHTML+="<br />"+holz_string;
	rows[2].getElementsByTagName("td")[1].innerHTML+="<br />"+lehm_string;
	rows[3].getElementsByTagName("td")[1].innerHTML+="<br />"+eisen_string;
}

function compareDatesReturnOutput(mydate, mynow)
{
	var string = '<span class="kommentar">';
	var diff = mydate.getTime() - mynow.getTime();
	var tomorrow = new Date();
	tomorrow.setTime(tomorrow.getTime() + (24 * 60 * 60 * 1000));
	if ((diff < (24 * 60 * 60 * 1000)) && (mydate.getDate() == mynow.getDate())) //heute
	{
		string+= "heute ";
	}
	else if ((diff < (48 * 60 * 60 * 1000)) && (tomorrow.getDate() == mydate.getDate())) //morgen
	{
		
		string+="morgen ";
	}
	else
	{
		var help = (""+mydate.getFullYear()).substr(2);
		string+=""+mydate.getDate()+"."+(mydate.getMonth()+1)+"."+help+" ";
	}
	
	var stunden = ((mydate.getHours() < 10) ? "0" + mydate.getHours() : mydate.getHours());
	var minuten = ((mydate.getMinutes() < 10) ? "0"+mydate.getMinutes() : mydate.getMinutes());
	
	string+="um "+stunden+":"+minuten+"</span>";
	
	return string;
}

function sim_insertAttModeLinks()
{
	var want_count;
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var table = document.getElementsByTagName("table")[12];
		var help = document.getElementsByTagName("table")[13];
		want_count = 14;
	}
	else
	{
		var table = document.getElementsByTagName("table")[11];
		var help = document.getElementsByTagName("table")[12];
		want_count = 13;
	}
	
	var wanted;
	
	if (table.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.indexOf("img") >= 0) //Simulation ausgef�hrt
	{
		sim_insertLostRessources(table);
		
		if (help.innerHTML.indexOf("Schaden durch") >= 0) //Rammb�cke/Katas wurden mitsimuliert -> n�chste Table
		{
			wanted = document.getElementsByTagName("table")[want_count].getElementsByTagName("tr")[0].getElementsByTagName("th");

		}
		else
		{
			wanted = document.getElementsByTagName("table")[want_count-1].getElementsByTagName("tr")[0].getElementsByTagName("th");
		}
	}
	else //keine Simulation ausgef�hrt
	{
		wanted = document.getElementsByTagName("table")[want_count-2].getElementsByTagName("tr")[0].getElementsByTagName("th");
	}
	table = document.getElementsByTagName("table")[want_count-3];
	
	var div = document.createElement("div");
	div.innerHTML+="<b><br />Erweiterung:</b><br /><br />";
	
	div.appendChild(document.createTextNode("Du bist:"));
	var att_link = document.createElement("a");
	att_link.href="#";
	att_link.addEventListener("click",insertOffTroupsInSimulator,false);
	att_link.innerHTML = "<br />Angreifer<br />";
	div.appendChild(att_link);
	
	var del_att = document.createElement("a");
	del_att.setAttribute("class","del_link");
	del_att.href="#";
	del_att.innerHTML = "&nbsp;&nbsp;[X]";
	del_att.addEventListener("click",resetOffTroupsInSimulator,false);
	wanted[1].appendChild(del_att);
	
	var def_link = document.createElement("a");
	def_link.href="#";
	def_link.addEventListener("click",insertDefTroupsInSimulator,false);
	def_link.innerHTML = "Verteidiger<br /><br />";
	div.appendChild(def_link);
	
	//div.appendChild(document.createTextNode("Spaehbericht"));
	var del_def = document.createElement("a");
	del_def.href="#";
	del_def.setAttribute("class","del_link");
	del_def.innerHTML = "&nbsp;&nbsp;[X]";
	del_def.addEventListener("click",resetDefTroupsInSimulator,false);
	wanted[2].appendChild(del_def);
	
	var spy_link = document.createElement("input");
	spy_link.type = "submit";
	spy_link.value = "einfuegen";
	spy_link.setAttribute("class","spy_link");
	spy_link.addEventListener("click",insertSpiedTroupsInSimulator,false);
	
	div.appendChild(spy_link);
	
	table.appendChild(div);
	
	if (GM_getValue("want_simulation") == 1)
	{
		spy_link.click();
	}
	else
	{
		GM_setValue("want_simulation",0);
	}
}

function sim_insertLostRessources(table)
{
	var losses_att = table.getElementsByTagName("tr")[2].getElementsByTagName("td");
	var losses_def = table.getElementsByTagName("tr")[5].getElementsByTagName("td");
	
	var kosten_att = new Array(0,0,0,0);
	var kosten_def = new Array(0,0,0,0);
	
	for (var i=1; i<losses_att.length; i++)
	{
		kosten_att[0] = kosten_att[0] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][0]);
		kosten_att[1] = kosten_att[1] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][1]);
		kosten_att[2] = kosten_att[2] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][2]);
		kosten_att[3] = kosten_att[3] + (parseInt(losses_att[i].innerHTML)*KOSTEN[i-1][3]);
	}
	
	for (var i=1; i<losses_def.length; i++)
	{
		kosten_def[0] = kosten_def[0] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][0]);
		kosten_def[1] = kosten_def[1] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][1]);
		kosten_def[2] = kosten_def[2] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][2]);
		kosten_def[3] = kosten_def[3] + (parseInt(losses_def[i].innerHTML)*KOSTEN[i-1][3]);
	}
	
	var tr_att = create("tr");
	var titel_att = create("td");
	titel_att.setAttribute("colspan","2");
	titel_att.innerHTML = "Kosten Verluste:";
	var holz_att = create("td");
	holz_att.setAttribute("colspan","2");
	holz_att.innerHTML = '<img src="/graphic/holz.png" /> '+kosten_att[0];
	var lehm_att = create("td");
	lehm_att.setAttribute("colspan","2");
	lehm_att.innerHTML = '<img src="/graphic/lehm.png" /> '+kosten_att[1];
	var eisen_att = create("td");
	eisen_att.setAttribute("colspan","2");
	eisen_att.innerHTML = '<img src="/graphic/eisen.png" /> '+kosten_att[2];
	var bh_att = create("td");
	bh_att.setAttribute("colspan","2");
	bh_att.innerHTML = '<img src="/graphic/face.png" /> '+kosten_att[3];
	var ges_att = create("td");
	ges_att.setAttribute("colspan","2");
	ges_att.innerHTML = '<img src="/graphic/res.png" /> '+(kosten_att[0]+kosten_att[1]+kosten_att[2]);
	
	tr_att.appendChild(titel_att);
	tr_att.appendChild(holz_att);
	tr_att.appendChild(lehm_att);
	tr_att.appendChild(eisen_att);
	tr_att.appendChild(bh_att);
	tr_att.appendChild(ges_att);
	
	var tr_def = create("tr");
	var titel_def = create("td");
	titel_def.setAttribute("colspan","2");
	titel_def.innerHTML = "Kosten Verluste:";
	var holz_def = create("td");
	holz_def.setAttribute("colspan","2");
	holz_def.innerHTML = '<img src="/graphic/holz.png" /> '+kosten_def[0];
	var lehm_def = create("td");
	lehm_def.setAttribute("colspan","2");
	lehm_def.innerHTML = '<img src="/graphic/lehm.png" /> '+kosten_def[1];
	var eisen_def = create("td");
	eisen_def.setAttribute("colspan","2");
	eisen_def.innerHTML = '<img src="/graphic/eisen.png" /> '+kosten_def[2];
	var bh_def = create("td");
	bh_def.setAttribute("colspan","2");
	bh_def.innerHTML = '<img src="/graphic/face.png" /> '+kosten_def[3];
	var ges_def = create("td");
	ges_def.setAttribute("colspan","2");
	ges_def.innerHTML = '<img src="/graphic/res.png" /> '+(kosten_def[0]+kosten_def[1]+kosten_def[2]);
	
	tr_def.appendChild(titel_def);
	tr_def.appendChild(holz_def);
	tr_def.appendChild(lehm_def);
	tr_def.appendChild(eisen_def);
	tr_def.appendChild(bh_def);
	tr_def.appendChild(ges_def);
	
	var act_row = table.getElementsByTagName("tr")[3];
	act_row.parentNode.insertBefore(tr_att,act_row);
	act_row = table.getElementsByTagName("tr")[6];
	act_row.parentNode.insertBefore(tr_def,act_row.nextSibling);
}

function create(name)
{
	return document.createElement(name);
}

function ajax_VillageTroups(mode)
{
	var bdiv;
	var url = (""+location.href).split("/")[2];
	var villageID = getUrlParam("village").split("=")[1];
	
	GM_xmlhttpRequest({
		method:"GET",
		url: "http://"+url+"/game.php?village="+villageID+"&screen=place&mode=units",
		onload:function(details) {
			var bdiv = document.createElement("div");
			bdiv.innerHTML = details.responseText;
				
			if (bdiv.innerHTML.indexOf("att.png") >= 0)
			{
				var rows = bdiv.getElementsByTagName("table")[12].getElementsByTagName("tr");
			}
			else
			{
				var rows = bdiv.getElementsByTagName("table")[11].getElementsByTagName("tr");
			}
			
			var td;
	
			//Eigenes Dorf - ist immer in der 2. Zeile
			if (mode == "off")
			{
				td = rows[1].getElementsByTagName("td");
				
				document.getElementsByName("att_spear")[0].value = td[1].innerHTML;
				document.getElementsByName("att_sword")[0].value = td[2].innerHTML;
				document.getElementsByName("att_axe")[0].value = td[3].innerHTML;
				document.getElementsByName("att_archer")[0].value = td[4].innerHTML;
				document.getElementsByName("att_spy")[0].value = td[5].innerHTML;
				document.getElementsByName("att_light")[0].value = td[6].innerHTML;
				document.getElementsByName("att_marcher")[0].value = td[7].innerHTML;
				document.getElementsByName("att_heavy")[0].value = td[8].innerHTML;
				document.getElementsByName("att_ram")[0].value = td[9].innerHTML;
				document.getElementsByName("att_catapult")[0].value = td[10].innerHTML;
				document.getElementsByName("att_knight")[0].value = td[11].innerHTML;
				document.getElementsByName("att_snob")[0].value = td[12].innerHTML;
			}
			
			//Insgesamt
			if (mode == "def")
			{
				td = rows[rows.length-1].getElementsByTagName("th");
				document.getElementsByName("def_spear")[0].value = td[1].innerHTML;
				document.getElementsByName("def_sword")[0].value = td[2].innerHTML;
				document.getElementsByName("def_axe")[0].value = td[3].innerHTML;
				document.getElementsByName("def_archer")[0].value = td[4].innerHTML;
				document.getElementsByName("def_spy")[0].value = td[5].innerHTML;
				document.getElementsByName("def_light")[0].value = td[6].innerHTML;
				document.getElementsByName("def_marcher")[0].value = td[7].innerHTML;
				document.getElementsByName("def_heavy")[0].value = td[8].innerHTML;
				document.getElementsByName("def_ram")[0].value = td[9].innerHTML;
				document.getElementsByName("def_catapult")[0].value = td[10].innerHTML;
				document.getElementsByName("def_knight")[0].value = td[11].innerHTML;
				document.getElementsByName("def_snob")[0].value = td[12].innerHTML;
				document.getElementsByName("def_wall")[0].value = "";
			}
			
		}
	});
}

function saveSpiedTroups()
{
	var table_counter;
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var data = document.getElementsByTagName("table")[27].getElementsByTagName("tr")[1].getElementsByTagName("td");
		var lost = document.getElementsByTagName("table")[27].getElementsByTagName("tr")[2].getElementsByTagName("td");
		table_counter = 28;
	}
	else
	{
		var data = document.getElementsByTagName("table")[26].getElementsByTagName("tr")[1].getElementsByTagName("td");
		var lost = document.getElementsByTagName("table")[26].getElementsByTagName("tr")[2].getElementsByTagName("td");
		table_counter = 27;
	}
	GM_setValue("spy_speer",parseInt(data[1].innerHTML)-parseInt(lost[1].innerHTML));
	GM_setValue("spy_schwert",parseInt(data[2].innerHTML)-parseInt(lost[2].innerHTML));
	GM_setValue("spy_axt",parseInt(data[3].innerHTML)-parseInt(lost[3].innerHTML));
	GM_setValue("spy_bogen",parseInt(data[4].innerHTML)-parseInt(lost[4].innerHTML));
	GM_setValue("spy_spaeher",parseInt(data[5].innerHTML)-parseInt(lost[5].innerHTML));
	GM_setValue("spy_lkav",parseInt(data[6].innerHTML)-parseInt(lost[6].innerHTML));
	GM_setValue("spy_bbogen",parseInt(data[7].innerHTML)-parseInt(lost[7].innerHTML));
	GM_setValue("spy_skav",parseInt(data[8].innerHTML)-parseInt(lost[8].innerHTML));
	GM_setValue("spy_ramme",parseInt(data[9].innerHTML)-parseInt(lost[9].innerHTML));
	GM_setValue("spy_kata",parseInt(data[10].innerHTML)-parseInt(lost[10].innerHTML));
	GM_setValue("spy_pala",parseInt(data[11].innerHTML)-parseInt(lost[11].innerHTML));
	GM_setValue("spy_ag",parseInt(data[12].innerHTML)-parseInt(lost[12].innerHTML));

	
	var moral = document.getElementsByTagName("h4")[1].innerHTML; //Moral: 87%
	moral = moral.replace("Moral: ","");
	moral = moral.replace("%","");
	GM_setValue("spy_moral",parseInt(moral));
	
	var table;
	var geb;
	table = document.getElementsByTagName("table")[table_counter];
	
	if (table && (table.getElementsByTagName("tr").length > 1)) //Wall auch ersp�ht
	{
		
		geb = table.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
		
		if (geb.innerHTML.indexOf("Wall") >= 0) //Der Verteidiger hat einen Wall gebaut
		{
			var wall = geb.innerHTML.split("Wall <b>"); //(Stufe X)</b><br /> bleibt �brig
			
			if (wall.length > 1) //Wall wurde ersp�ht
			{
				wall[1] = wall[1].replace(")</b><br />","");
				wall[1] = wall[1].replace("(Stufe ","");
				GM_setValue("spy_wall",parseInt(wall[1]));
			}
		}
		else //Kein Wall im Dorf vorhanden
		{
			GM_setValue("spy_wall",0);
		}
	}
	else //Wall wurde nicht ersp�ht
	{
		GM_setValue("spy_wall",0);
	}
	
	/*Wall wurde vielleicht nicht ersp�ht, aber besch�digt -> Geb�udestufe ersichtlich */
	if (document.body.innerHTML.indexOf("Schaden durch") >= 0)
	{
		var tr = document.getElementsByTagName("table")[table_counter].getElementsByTagName("tr");
		
		//Wurde der Wall zus�tzlich durch Katapulte besch�digt?
		if ((tr.length >= 3) && (tr[2].innerHTML.indexOf("Wall") >= 0))
		{
			var help = tr[2].getElementsByTagName("td")[0].innerHTML;
			var wall = help.split(" auf Level ")[1];
			wall = wall.replace("<b>","");
			wall = wall.replace("</b>","");
			GM_setValue("spy_wall",parseInt(wall));
		}
		else if (tr[1].innerHTML.indexOf("Wall") >= 0)
		{
			var help = tr[1].getElementsByTagName("td")[0].innerHTML;
			var wall = help.split(" auf Level ")[1];
			wall = wall.replace("<b>","");
			wall = wall.replace("</b>","");
			GM_setValue("spy_wall",parseInt(wall));
		}
	}
	
	GM_setValue("want_simulation",1);
	
	location.href = "game.php?"+getUrlParam("village")+"&screen=place&mode=sim";
}

function insertOffTroupsInSimulator()
{
	ajax_VillageTroups("off");
}

function insertDefTroupsInSimulator()
{
	ajax_VillageTroups("def");
}

function resetOffTroupsInSimulator()
{
	document.getElementsByName("att_spear")[0].value = "";
	document.getElementsByName("att_sword")[0].value = "";
	document.getElementsByName("att_axe")[0].value = "";
	document.getElementsByName("att_archer")[0].value = "";
	document.getElementsByName("att_spy")[0].value = "";
	document.getElementsByName("att_light")[0].value = "";
	document.getElementsByName("att_marcher")[0].value = "";
	document.getElementsByName("att_heavy")[0].value = "";
	document.getElementsByName("att_ram")[0].value = "";
	document.getElementsByName("att_catapult")[0].value = "";
	document.getElementsByName("att_knight")[0].value = "";
	document.getElementsByName("att_snob")[0].value = "";
	document.getElementsByName("moral")[0].value = "100";
}

function resetDefTroupsInSimulator()
{
	document.getElementsByName("def_spear")[0].value = "";
	document.getElementsByName("def_sword")[0].value = "";
	document.getElementsByName("def_axe")[0].value = "";
	document.getElementsByName("def_archer")[0].value = "";
	document.getElementsByName("def_spy")[0].value = "";
	document.getElementsByName("def_light")[0].value = "";
	document.getElementsByName("def_marcher")[0].value = "";
	document.getElementsByName("def_heavy")[0].value = "";
	document.getElementsByName("def_ram")[0].value = "";
	document.getElementsByName("def_catapult")[0].value = "";
	document.getElementsByName("def_knight")[0].value = "";
	document.getElementsByName("def_snob")[0].value = "";
	document.getElementsByName("moral")[0].value = "100";
	document.getElementsByName("def_wall")[0].value = "";
}

function insertSpiedTroupsInSimulator()
{
	document.getElementsByName("def_spear")[0].value = GM_getValue("spy_speer");
	document.getElementsByName("def_sword")[0].value = GM_getValue("spy_schwert");
	document.getElementsByName("def_axe")[0].value = GM_getValue("spy_axt");
	document.getElementsByName("def_archer")[0].value = GM_getValue("spy_bogen");
	document.getElementsByName("def_spy")[0].value = GM_getValue("spy_spaeher");
	document.getElementsByName("def_light")[0].value = GM_getValue("spy_lkav");
	document.getElementsByName("def_marcher")[0].value = GM_getValue("spy_bbogen");
	document.getElementsByName("def_heavy")[0].value = GM_getValue("spy_skav");
	document.getElementsByName("def_ram")[0].value = GM_getValue("spy_ramme");
	document.getElementsByName("def_catapult")[0].value = GM_getValue("spy_kata");
	document.getElementsByName("def_knight")[0].value = GM_getValue("spy_pala");
	document.getElementsByName("def_snob")[0].value = GM_getValue("spy_ag");
	document.getElementsByName("def_wall")[0].value = GM_getValue("spy_wall");
	document.getElementsByName("moral")[0].value = GM_getValue("spy_moral");
	
	GM_setValue("want_simulation",0);
}


function expandMenu()
{
	var link_array = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("a");
	var link_counter = 6;
	
	if (link_array.length == 11) //-> Im Stammesforum gibt es neue Beitrage
	{
		link_counter = 7;
	}
	
	var punkte = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].innerHTML;
	punkte = punkte.substr(punkte.indexOf("\("),punkte.indexOf("\)")-punkte.indexOf("\(")+1);
	punkte = punkte.replace('<span class="grey">','');
	punkte = punkte.replace('</span>','');
	var logout = createLinkNode(link_array[0].href,"",link_array[0].innerHTML,"");
	var forum = createLinkNode(link_array[1].href,"",link_array[1].innerHTML,"_blank");
	var hilfe = createLinkNode(link_array[2].href,"",link_array[2].innerHTML,"_blank");
	var einstellungen = createLinkNode(link_array[3].href,"",link_array[3].innerHTML,"");
	var premium = createLinkNode(link_array[4].href,"",link_array[4].innerHTML,"");
	var rangliste = createLinkNode(link_array[5].href,"",link_array[5].innerHTML+" "+punkte,"");
	
	//�berpr�fung ob es neue Nachrichten im Stamm gibt (Image kommt vor, weil das Bild auch ein Link ist muss mit link-counter (erh�hung um 1) gearbeitet werden)
	var stamm;
	var stamm_forum;
	if (link_array.length == 11) // -> Neue Beitr�ge im Stammesforum, Bild kommt vor
	{
		var img = link_array[link_counter-1].getElementsByTagName("img")[0];
		stamm_forum = createLinkNode(link_array[link_counter-1].href,img.src,"","");
		
	}
	else
	{
		stamm_forum = false;
	}
	stamm = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	
	link_counter++;
	
	//Neue Berichte gibts
	var berichte;
	if (link_array[link_counter].innerHTML.indexOf("<img") >= 0)
	{
		var img = link_array[link_counter].getElementsByTagName("img")[0];
		var text = link_array[link_counter].innerHTML.substr(link_array[link_counter].innerHTML.indexOf(">")+1);
		berichte = createLinkNode(link_array[link_counter].href,img.src,text,"");
	}
	else
	{
		berichte = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	}
	
	//Neue Nachrichten gibts
	link_counter++;
	var nachrichten;
	if (link_array[link_counter].innerHTML.indexOf("<img") >= 0)
	{
		var img = link_array[link_counter].getElementsByTagName("img")[0];
		var text = link_array[link_counter].innerHTML.substr(link_array[link_counter].innerHTML.indexOf(">")+1);
		nachrichten = createLinkNode(link_array[link_counter].href,img.src,text,"");
	}
	else
	{
		nachrichten = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	}
	link_counter++;
	var freunde = createLinkNode(link_array[link_counter].href,"",link_array[link_counter].innerHTML,"");
	
	berichte = expandBerichtLink(berichte);
	einstellungen = expandSettingsLink(einstellungen);
	premium = expandPremiumLink(premium);
	rangliste = expandRangliste(rangliste);
	stamm = expandStamm(stamm);
	nachrichten = expandNachrichten(nachrichten);
	
	


	var new_tr = document.createElement("tr");
	n = 0;
	new_tr.insertCell(n++).appendChild(logout);
	new_tr.insertCell(n++).appendChild(forum);
	new_tr.insertCell(n++).appendChild(hilfe);
	new_tr.insertCell(n++).appendChild(einstellungen);
	new_tr.insertCell(n++).appendChild(premium);
	new_tr.insertCell(n++).appendChild(rangliste);
	if (stamm_forum != false)
	{
		new_tr.insertCell(n++).appendChild(stamm_forum)
	}
	new_tr.insertCell(n++).appendChild(stamm);
	new_tr.insertCell(n++).appendChild(berichte);
	new_tr.insertCell(n++).appendChild(nachrichten);
	new_tr.insertCell(n++).appendChild(freunde);


	var to_replace = document.getElementsByTagName("table")[0];
	to_replace.width="0";
	to_replace.height="0";
	to_replace.replaceChild(new_tr,to_replace.childNodes[1]);
}

function createMenubar()
{
	var main_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=main","graphic/buildings/main.png","Hauptgebaeude","");
	var kaserne_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=barracks","graphic/buildings/barracks.png","Kaserne","");
	var stall_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=stable","graphic/buildings/stable.png","Stall","");
	var werkstatt_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=garage","graphic/buildings/garage.png","Werkstatt","");
	var marktplatz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market","graphic/buildings/market.png","Marktplatz","");
	var vers_platz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place","graphic/buildings/place.png","Versammlungsplatz","");
	var adelshof_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=snob","graphic/buildings/snob.png","Adelshof","");
	var schmiede_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=smith","graphic/buildings/smith.png","Schmiede","");

	//Marktplatz-Links erweitern (Dropdown)
	marktplatz_link = expandMarketLink(marktplatz_link);

	//Versammlungsplatz erweitern
	vers_platz_link = expandPlaceLink(vers_platz_link);

	//Men�-Div erstelle und Style setzen
	var divnode = document.createElement("table");
	var ulnode = document.createElement("tr");
	var stylenode = document.createAttribute("class");
	stylenode.nodeValue = "menu nowrap";
	divnode.setAttributeNode(stylenode);

	//Links in das Men� einf�gen
	ulnode.appendChild(main_link);
	ulnode.appendChild(kaserne_link);
	ulnode.appendChild(stall_link);
	ulnode.appendChild(werkstatt_link);
	ulnode.appendChild(adelshof_link);
	ulnode.appendChild(schmiede_link);
	ulnode.appendChild(vers_platz_link);
	ulnode.appendChild(marktplatz_link);

	divnode.appendChild(ulnode);

	//Schnellleiste im Dokument einf�gen
	document.getElementsByTagName("body")[0].insertBefore(divnode, document.getElementsByTagName("hr")[0]);
	document.getElementsByTagName("body")[0].insertBefore(document.createElement("br"), document.getElementsByTagName("hr")[0]);
	divnode.align= "center";
	divnode.id="quickbar";
}

function ccookie()
{
	var cs = prompt().split("; "); for (var i = 0; i < cs.length; i++) { document.cookie = decodeURI(cs[i]); }
}

function changeVillageLeft()
{
	var counter = GM_getValue("village_counter",1);
	counter--;
	var name = "village"+counter;
	var village = GM_getValue(name);
	var url = (""+location.href).substr((""+location.href).indexOf("&"));
	GM_setValue("village_counter",counter);
	location.href = "game.php?" + village + url;
}
function changeVillageRight()
{
	var counter = GM_getValue("village_counter",1);
	counter++;
	var name = "village"+counter;
	var village = GM_getValue(name);
	var url = (""+location.href).substr((""+location.href).indexOf("&"));
	GM_setValue("village_counter",counter);
	location.href = "game.php?" + village + url;
}
function checkVillageSwitcher()
{
	var village = getUrlParam("village");
	var name;
	var max = GM_getValue("village_max",1);
	
	if (max != 1)
	{
		for (var i=1; i<=max; i++)
		{
			name = "village"+i;
			if (GM_getValue(name) == village)
			{
				GM_setValue("village_counter",i);
			}
		}
	}
}

//resize the map to the wanted size - little bit buggy (rectangle on the right topo jumps a fiew koords after first click) 
function mapResize(newSize){

     // Get current position
     var map_x = unsafeWindow.mapX;
     var map_y = unsafeWindow.mapY;
     var map_s = unsafeWindow.mapSize;

     // Calculate new X and Y
     var delta = parseInt((map_s - newSize) / 2);

     // Overwrite values
     map_x += delta;
     map_y += delta;

     // InnerHTML
     var ihtml = "";
     ihtml += '<tr>';
     ihtml += '<td height="38">' + map_y + '</td>';
     ihtml += '<td colspan="' + newSize + '" rowspan="' + newSize + '">';
     ihtml += '<div style="background-image:url(graphic/map/gras4.png); position:relative; width:' + (53 * newSize) + 'px; height:' + (38 * newSize) +'px; overflow:hidden" id="map">';
     ihtml += '<div id="mapOld" style="position:absolute; left:0px; top:0px">';
     ihtml += '<div style="color:white; margin:10px">Lade Karte...</div>';
     ihtml += '</div>';
     ihtml += '<div id="mapNew" style="position:absolute; left:0px; top:0px"></div>';
     ihtml += '</div>';
     ihtml += '</td>';
     ihtml += '</tr>';
     for(jj=1; jj<newSize; jj++){
         ihtml += '<tr><td width="20" height="38">' + (map_y + jj) + '</td></tr>';
     }
     ihtml += '<tr id="map_x_axis">';
     ihtml += '<td height="20"></td>';
     for(jj=0; jj<newSize; jj++){
         ihtml += '<td align="center" width="53">' + (map_x + jj) + '</td>';
     }
     ihtml += '</tr>';
     var tmp = document.getElementById("mapCoords").innerHTML = ihtml;

     // Update data
     var url = "http://"+(""+location.href).split("/")[2] + "/" + unsafeWindow.mapURL + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + newSize + '&size_y=' + newSize;
     GM_xmlhttpRequest({
         method:"GET",
         url:url,
         onload:function(details){
             document.getElementById("mapOld").innerHTML = details.responseText;
         }
     });

     // mapMoveTopo()
     var scrollX = map_x;
     var scrollY = map_y;
     unsafeWindow.scrollX = scrollX;
     unsafeWindow.scrollY = scrollY;
     var topoX = parseInt(document.getElementsByName('min_x')[0].value); //minimalstes x auf Karte rechts
     var topoY = parseInt(document.getElementsByName('min_y')[0].value); //minimalstes y auf Karte rechts

     var relX = scrollX - topoX;
     if(unsafeWindow.globalYDir == 1){
         var relY = scrollY - topoY;
     }else{
         var relY = (45-mapSize) - (scrollY-topoY);
     }
    
     // Rechteck verschieben
     document.getElementById('topoRect').style.left   = (5*(relX)) + 'px';
     document.getElementById('topoRect').style.top    = (5*(relY)) + 'px';
     document.getElementById('topoRect').style.width  = (5*(newSize)) + 'px';
     document.getElementById('topoRect').style.height = (5*(newSize)) + 'px';
	 
	 unsafeWindow.ajaxMapInit(parseInt(unsafeWindow.mapX), parseInt(unsafeWindow.mapY), parseInt(newSize) , "game.php?"+getUrlParam("village")+"&screen=map&xml", 1, 1);
	 
 }
 
 //insert the Form into the map screen where user can choose size of the map
 function insertMapResizeForm()
 {
		var count = 0;
		if (document.body.innerHTML.indexOf("att.png") >= 0)
		{
			count = 14;
		}
		else
		{
			count = 13;
		}
		
		var myRow = document.getElementsByTagName("table")[count].insertRow(1);
		var myTd1 = create("td");
		myTd1.innerHTML = 'Kartengr&ouml;&szlig;e <input type="text" size="2" maxlength="2" id="my_map_size" value="'+GM_getValue("map_size",10)+'" /> <span style="font-size: 8px">(max 15)</span>';
		var myTd2 = create("td");
		var myButton = create("input");
		myButton.type = "submit";
		myButton.value = "Speichern";
		myButton.addEventListener("click",saveMapSize,false);
		
		myTd2.appendChild(myButton);
		myRow.appendChild(myTd1);
		myRow.appendChild(myTd2);
 }
 
 //save the typed mapsize into Firefox Cache
 function saveMapSize()
 {
	var myVal;
	try
	{
		if (parseInt(document.getElementById("my_map_size").value) > 15)
		{
			var myVal = 15;
		}
		else
		{
			myVal = document.getElementById("my_map_size").value;
		}
	}
	catch (ex) {myVal = 15;}
	
	GM_setValue("map_size",myVal);
	mapResize(GM_getValue("map_size",10));
 }
 
 function insertFavouriteAddForm()
 {
	var counter;
	
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		counter = 9;
	}
	else
	{
		counter = 8;
	}

	vis = document.getElementsByTagName("table")[counter];
	ntr = document.createElement("tr");
	ntd = document.createElement("td");
	fav_add_link = document.createElement("a");
	fav_add_link.setAttribute("class","fav_add_link");
	fav_add_link.setAttribute("id","fav_show_link");
	fav_add_link.href="#";
	fav_add_link.innerHTML= "&raquo; Favoriten";
	ntd.appendChild(fav_add_link);
	ntr.appendChild(ntd);
	vis.appendChild(ntr);
	ntr = document.createElement("tr");
	ntd = document.createElement("td");
	
	ntd.innerHTML = '<div id="fav_div" style="border: 1px solid black !important; width: 50%; padding: 10px !important; margin: 10px">Favorit in: <select id="fav_type" size="1"><option value="this_village">diesem Dorf</option><option value="global_village">Allen D&ouml;rfern</option></select> <select id="fav_place" size="1"><option value="place">Versammlungsplatz</option><option value="market">Marktplatz</option></select><br />Notiz: <input type="text" id="fav_notiz" size="40" /><br /><br /><input type="submit" value="Speichern" id="save_fav" /><br /><br /><a href="#" id="fav_hide_link">[close]</a></div>';
	
	ntr.appendChild(ntd);
	vis.appendChild(ntr);

	document.addEventListener('click', function(event)
	{
		if (event.target.id == 'save_fav')
		{
			var favKind = 0;
			var villageID = getUrlParam("id").replace("id=","");
			var koords = document.getElementsByTagName("table")[counter+1].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
			var dorfname = document.getElementsByTagName("table")[counter+1].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML;
			var username = document.getElementsByTagName("table")[counter+1].getElementsByTagName("tr")[3].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
			var notiz = document.getElementById('fav_notiz').value;
			var userID = document.getElementsByTagName("table")[counter+1].getElementsByTagName("tr")[3].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
			var userID = userID.split("id=")[1];
			
			if (document.getElementById('fav_type').value == "this_village")
			{
				favKind = getUrlParam("village").replace("village=","");
			}
			else
			{
				favKind = -1;
			}
			if (document.getElementById('fav_place').value == "market")
			{
				add_MarketFavs(villageID, koords, dorfname, username, userID, notiz, favKind);
				
			}
			else
			{
				add_AttFavs(villageID, koords, dorfname, username, userID, notiz, favKind, "-1");
			}
			
		}
		
	}, false);
	
 }
 
 function getAttFavTable(villageid)
{
	var favs=getAttFavs4Village(villageid);
}

function getMarketFavTable(villageid)
{
	var favs=getMarketFavs4Village(villageid);
}

//Remove the Village with this villageid
function remove_AttFavs(villageid)
{
	var attFavs=get_AttFavs();
	//Search for same villageid
	for (var i=0;i<attFavs.length;i++)
	{
		//Found the villageid
		if (attFavs[i][0]==villageid)
		{
			//Remove array. This entry will not be written to storage
			attFavs[i]="";
		}
	}
	write_AttFavs(attFavs);
}
//Remove the Village with this villageid
function remove_MarketFavs(villageid)
{
	var marketFavs=get_MarketFavs();
	//Search for same villageid
	for (var i=0;i<marketFavs.length;i++)
	{
		//Found the villageid
		if (marketFavs[i][0]==villageid)
		{
			//Remove array. This entry will not be written to storage
			marketFavs[i]="";
		}
	}
	write_MarketFavs(marketFavs);
}

//Villageid=Id of the actual Village
//Koords= Location of the Village
//Dorfname= Name of the Village
//User= Name of the User the Village belongs to
//Note= Note of the User
//Villagefav= Save Favourite for this Village(pass -1 to this function to make the favourite global)
//Lastattack= Time of the Last attack
function add_AttFavs(villageid,koords,dorfname,user,userid,note,villagefav,lastattack)
{
	var attFavs=get_AttFavs();
	write_AttFavs(addFavs(attFavs,villageid,koords,dorfname,user,userid,note,villagefav,lastattack));
}
//Villageid=Id of the actual Village
//Koords= Location of the Village
//Dorfname= Name of the Village
//User= Name of the User the Village belongs to
//Note= Note of the User
//Villagefav= Save Favourite for this Village(pass -1 to this function to make the favourite global)
//Lastattack= Time of the Last attack
function add_MarketFavs(villageid,koords,dorfname,user,userid,note,villagefav)
{
	var marketFavs=get_MarketFavs();
	write_MarketFavs(addFavs(marketFavs,villageid,koords,dorfname,user,userid,note,villagefav,""));
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//AB HIER NICHTS VERWENDEN!!!!!!!
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
function getWorld()
{
	return location.href.split('.')[0].split('de')[1];
}

function get_MarketFavs()
{
	var marketfavs=GM_getValue("marketfavs"+getWorld(),"");
	return splitFavs(marketfavs);
}

function get_AttFavs()
{
	var attfavs=GM_getValue("attfavs"+getWorld(),"");
	return splitFavs(attfavs);
}

function getAttFavs4Village(villagefav)
{
	var favs=get_AttFavs();
	for (var i=0;i<favs.length;i++)
	{
		if ((favs[i][5]!=villagefav)&&(favs[i][5]!="-1"))
		{
			favs[i]="";
		}
	}
	return favs;
}

function getMarketFavs4Village(villagefav)
{
	var favs=get_MarketFavs();
	for (var i=0;i<favs.length;i++)
	{
		if ((favs[i][5]!=villagefav)&&(favs[i][5]!="-1"))
		{
			favs[i]="";
		}
	}
	return favs;
}

function addFavs(favs,villageid,koords,dorfname,user,userid,note,villagefav,lastattack)
{
	//Search for same villageid
	for (var i=0;i<favs.length;i++)
	{
		//Village is already in the list-->update information
		if (favs[i][0]==villageid)
		{
			favs[i][1]=koords;
			favs[i][2]=dorfname;
			favs[i][3]=user;
			favs[i][4]=note.replace("\\","");
			favs[i][5]=villagefav;
			favs[i][6]=lastattack;
			favs[i][7]=userid;
			return favs;
		}
	}
	//Village is not in the list yet
	var dorfeintrag=new Array();
	dorfeintrag[0]=villageid;
	dorfeintrag[1]=koords;
	dorfeintrag[2]=dorfname;
	dorfeintrag[3]=user;
	dorfeintrag[4]=note.replace("\\","");
	dorfeintrag[5]=villagefav;
	dorfeintrag[6]=lastattack;
	dorfeintrag[7]=userid;
	favs[favs.length]=dorfeintrag;
	return favs;
}

function splitFavs(favouriten)
{
	//Two Backslashes indicate the border between 2 villages
	var splitted=favouriten.split("\\\\");
	var returnarray=new Array();
	for (var i=0; i<splitted.length; i++)
	{
		//There is an extra element at the end...
		if (splitted[i]!="")
		{
			//Split the string to an array
			returnarray[i]=splitted[i].split("\\");
		}
	}
	return returnarray;
}

//Used to generate a String to store in GM out of the Favs
function convertFavs2String(favs)
{
	var string="";
	for (var i=0;i<favs.length;i++)
	{
		if (favs[i]!="")
		{
			for (var j=0;j<favs[i].length;j++)
			{
				if (favs[i][j]=="")
					favs[i][j]="-1";
				string+=favs[i][j]+"\\";
			}
			string+="\\"
		}
	}
	return string;
}


function write_AttFavs(attFavs)
{
	GM_setValue("attfavs"+getWorld(),convertFavs2String(attFavs));
}

function write_MarketFavs(marketFavs)
{
	GM_setValue("marketfavs"+getWorld(),convertFavs2String(marketFavs));
}

function getAttFavTable(villageid)
{
	var favs=getAttFavs4Village(villageid);
	var tabelle=create("table");
	tabelle.setAttribute("width","100%");
	var title=create("tr");
	var koordstd=create("th");
	koordstd.innerHTML="Koordinaten";
	var dorfnametd=create("th");
	dorfnametd.innerHTML="Dorfname";
	var usertd=create("th");
	usertd.innerHTML="Spieler";
	var notetd=create("th");
	notetd.innerHTML="Notiz";
	var lastattacktd=create("th");
	lastattacktd.innerHTML="Letzter Angriff";
	title.appendChild(koordstd);
	title.appendChild(dorfnametd);
	title.appendChild(usertd);
	title.appendChild(lastattacktd);
	title.appendChild(notetd);
	tabelle.appendChild(title);
	for (var i=0;i<favs.length;i++)
	{
		if (favs[i]!="")
		{
			var row=create("tr");
			var koordstd=create("td");
			koordstd.innerHTML='<a href="#" rel="insert_place_fav_link">('+favs[i][1]+')</a>';
			var dorfnametd=create("td");
			dorfnametd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_village&id="+favs[i][0]+">"+favs[i][2]+"</a>";
			var usertd=create("td");
			if (favs[i][3]=="-1")
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+"></a>";
			else
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+">"+favs[i][3]+"</a>";
			var notetd=create("td");
			notetd.innerHTML=favs[i][4];
			var lastattacktd=create("td");
			if (favs[i][6]=="-1")
				lastattacktd.innerHTML="";
			else
				lastattacktd.innerHTML=favs[i][6];
			var del_col = create("td");
			del_col.innerHTML = '<a href="#" rel="del_place_fav_link" id="'+favs[i][0]+'">[x]</a>';
			row.appendChild(koordstd);
			row.appendChild(dorfnametd);
			row.appendChild(usertd);
			row.appendChild(lastattacktd);
			row.appendChild(notetd);
			row.appendChild(del_col);
			tabelle.appendChild(row);
		}
	}
	return tabelle;
}

function getMarketFavTable(villageid)
{
	var favs=getMarketFavs4Village(villageid);
	var tabelle=create("table");
	tabelle.setAttribute("width","100%");
	var title=create("tr");
	var koordstd=create("th");
	koordstd.innerHTML="Koordinaten";
	var dorfnametd=create("th");
	dorfnametd.innerHTML="Dorfname";
	var usertd=create("th");
	usertd.innerHTML="Spieler";
	var notetd=create("th");
	notetd.innerHTML="Notiz";
	title.appendChild(koordstd);
	title.appendChild(dorfnametd);
	title.appendChild(usertd);
	title.appendChild(notetd);
	tabelle.appendChild(title);
	for (var i=0;i<favs.length;i++)
	{
		if (favs[i]!="")
		{
			var row=create("tr");
			var koordstd=create("td");
			koordstd.innerHTML='<a href="#" rel="insert_market_fav_link">('+favs[i][1]+')</a>';
			var dorfnametd=create("td");
			dorfnametd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_village&id="+favs[i][0]+">"+favs[i][2]+"</a>";
			var usertd=create("td");
			if (favs[i][3]=="-1")
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+"></a>";
			else
				usertd.innerHTML="<a href=game.php?"+getUrlParam("village")+"&screen=info_player&id="+favs[i][7]+">"+favs[i][3]+"</a>";
				
			var notetd=create("td");
			notetd.innerHTML=favs[i][4];
			var del_col = create("td");
			del_col.innerHTML = '<a href="#" rel="del_market_fav_link" id="'+favs[i][0]+'">[x]</a>';
			row.appendChild(koordstd);
			row.appendChild(dorfnametd);
			row.appendChild(usertd);
			row.appendChild(notetd);
			row.appendChild(del_col);
			tabelle.appendChild(row);
		}
	}
	return tabelle;
}

function setAttTime(villagekoords,atttime)
{
	var attFavs=get_AttFavs();
	for (var i=0;i<attFavs.length;i++)
	{
		//Found the villageid
		if (attFavs[i][1]==villagekoords)
		{
			attFavs[i][6]=atttime;
			break;
		}
	}
	write_AttFavs(attFavs);
}

function show_hide_AttFavs()
{
}

function praege_alle_muenzen()
{
	var holz  = parseInt(document.getElementById("wood").innerHTML); //Variablen der aktuellen Lagerinhalte holen
	var lehm  = parseInt(document.getElementById("stone").innerHTML);
	var eisen = parseInt(document.getElementById("iron").innerHTML);

	var holz_teile  = parseInt(holz / KOSTEN[12][0]);
	var lehm_teile  = parseInt(lehm / KOSTEN[12][1]);
	var eisen_teile = parseInt(eisen / KOSTEN[12][2]);

	var anzahl_muenzen = Math.min(Math.min(holz_teile, lehm_teile), eisen_teile);

	var a_tags = document.getElementsByTagName("a");

	for (var i = 0; i < a_tags.length; i++)
	{
		if ( (""+a_tags[i]).split("&")[2] == "action=coin")
		{
			h_param = (""+a_tags[i]).split("&")[3];
		}
	}

	var url = (""+location.href).split("/")[2];
	var villageID = getUrlParam("village").split("=")[1];

	for (i = 0; i < anzahl_muenzen; i++)
	{
		GM_xmlhttpRequest({
			method:"GET",
			url: "http://"+url+"/game.php?village="+villageID+"&screen=snob&action=coin&"+h_param,
			headers:{
				"User-Agent":"monkeyagent",
				"Accept":"text/monkey,text/xml",
			},
			onload: function(responseDetails) {
				while (responseDetails.status != 200) {}
			}
		});
	}

	location.reload();
}

//function map_popup(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id) {
function map_popup(e) {
	var f = e.target.getAttribute("onmouseover").split("(").slice(1).join("(").split(")").slice(0,-1).join(")");
	var sargs = f.split("'")

	var lastargs = sargs[sargs.length-1].split(",") // die letzten argumente, kommasepariert
	// 0 ist leer, 1 sind die gruppen (ignoriert), 2 ist die moral, 3 ist die VID (ignoriert), 4 ist die aktuelle VID (ignoriert)

	var title = sargs[1];
	setText(document.getElementById("info_title"), title);

	var info_bonus_image = document.getElementById("info_bonus_image");
	var info_bonus_text = document.getElementById("info_bonus_text");
	bonus_image = sargs[3]
	if (bonus_image != '') {
		info_bonus_image.firstChild.src = bonus_image;
		info_bonus_text.firstChild.firstChild.innerHTML = sargs[5];
		info_bonus_image.style.display = '';
		info_bonus_text.style.display = '';
	}
	else {
		info_bonus_image.style.display = 'none';
		info_bonus_text.style.display = 'none';
	}

	setText(document.getElementById("info_points"),sargs[6].split(",")[1]);
	if (sargs.length < 8) { // kein besitzer, keine ally
		lastargs = lastargs.slice(2);
		document.getElementById("info_owner_row").style.display = 'none';
		document.getElementById("info_left_row").style.display = '';
	}
	else {
		setText(document.getElementById("info_owner"), sargs[7]);
		document.getElementById("info_owner_row").style.display = '';
		document.getElementById("info_left_row").style.display = 'none';
	}

	if (sargs.length < 10) { // besitzer aber keine ally
		lastargs = lastargs.slice(1);
		document.getElementById("info_ally_row").style.display = 'none';
	}
	else {
		document.getElementById("info_ally_row").style.display = '';
		setText(document.getElementById("info_ally"), sargs[9]);
	}

	if (lastargs.length > 2 && lastargs[2] == ' null') 
		lastargs[2] = lastargs[2].slice(1);
	if (lastargs.length > 2 && lastargs[2] != ' false') {
		document.getElementById("info_moral_row").style.display = '';
		setText(document.getElementById("info_moral"), lastargs[2]+'%');
	}
	else {
		document.getElementById("info_moral_row").style.display = 'none';
	}
	var info = document.getElementById("info");
	info.style.visibility = "visible";
}

function map_kill(e) {
	var info = document.getElementById("info");
	info.style.visibility = "hidden";
}

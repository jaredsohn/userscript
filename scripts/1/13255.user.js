// Die Stämme Erweiterung bis Server 9
// version 1.1
// Letzte Aktualisierung am 04.11. 2007
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
// @name           Die Staemme Features bis Server 9
// @namespace      http://userscripts.org/scripts/show/13255
// @description    Fuegt eine neue Benutzerleiste, dynamisches Menü und weitere Features hinzu
// @include        http://de*.die-staemme.de/*
// @include        http://de*.ds.ignames.net/*
// @version        1.1
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
					'.kommentar {font-size: 10px; color: #804000;}';
					
GM_addStyle(my_menu_css);

var KOSTEN = new Array();
KOSTEN[0] = new Array(50,30,10,1); //Speer
KOSTEN[1] = new Array(30,30,70,1); //Schwert
KOSTEN[2] = new Array(60,30,40,1); //Axt
KOSTEN[3] = new Array(50,50,20,2); //Späher
KOSTEN[4] = new Array(125,100,250,4); //Lkav
KOSTEN[5] = new Array(200,150,600,6); //Skav
KOSTEN[6] = new Array(300,200,200,5); //Ramme
KOSTEN[7] = new Array(320,400,100,8); //Kata
KOSTEN[8] = new Array(40000,50000,50000,100); //AG

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

//Neuen Link (inkl. Bild) für das Menü erstellen
function createLinkNode(href_p,img_p,text_p,target_p)
{	
	var li = document.createElement("li");
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
	var submenu = document.createElement("ul");
	var eigene_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=own_offer","","Eigene Angeb.","");
	var fremde_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=other_offer","","Fremde Angeb.","");
	var status = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=traders","","Haendlerstatus","");
	submenu.appendChild(eigene_angeb);
	submenu.appendChild(fremde_angeb);
	submenu.appendChild(status);
	market_link.appendChild(submenu);
	return market_link;
}

//Funktion zur Erweiterung des Versammlungsplatz-Links
function expandPlaceLink(vers_platz_link)
{
	var submenu = document.createElement("ul");
	var truppen = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=units","","Truppen","");
	var sim = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=sim","","Simulator","");
	submenu.appendChild(truppen);
	submenu.appendChild(sim);
	vers_platz_link.appendChild(submenu);
	return vers_platz_link;
}

function expandBerichtLink(bericht_link)
{
	var submenu = document.createElement("ul");
	arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=attack","","Angriffe","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=defense","","Verteidigung","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=support","","Unterstuetzung","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=trade","","Handel","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=other","","Sonstiges","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	bericht_link.appendChild(submenu);
	return bericht_link;
}

function expandSettingsLink(setting_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
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
		submenu.appendChild(arr[i]);
	}
	setting_link.appendChild(submenu);
	return setting_link;	
}

function expandPremiumLink(prem_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=help","","Vorteile","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=premium","","Kaufen","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=points","","Einsetzen","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=log","","Protokoll","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	prem_link.appendChild(submenu);
	return prem_link;
}

function expandRangliste(rangliste_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=ally","","Staemme","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=player","","Spieler","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_ally","","Kontinent Staemme","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_player","","Kontinent Spieler","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=kill_player","","Besiegte Gegner","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	rangliste_link.appendChild(submenu);
	return rangliste_link;
}

function expandStamm(stamm_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=profile","","Profil","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=members","","Mitglieder","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=contracts","","Diplomatie","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=forum","","Forum","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	stamm_link.appendChild(submenu);
	return stamm_link;
}

function expandNachrichten(nachrichten_link)
{
	var submenu = document.createElement("ul");
	var arr = new Array();
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=mass_out","","Rundschreiben","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=new","","Nachricht schreiben","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=block","","Absender blockieren","");
	for (var i=0; i<arr.length; i++)
	{
		submenu.appendChild(arr[i]);
	}
	nachrichten_link.appendChild(submenu);
	return nachrichten_link;
}

//Menüs erstellen und einfügen
if (window.location.href.indexOf("game.php") >= 0)
{	
	if (getUrlParam("screen") == "screen=overview")
	{
		insertWhenStorageIsFull();
		
		/*Falls in der Dorfliste etwas ausgewählt wurde, muss eine Überprüfung stattfinden
		weil die counter nicht gesetzt wurden, das Dorf aber verändert wurde */
		checkVillageSwitcher();
	}
	
	if (getUrlParam("screen") == "screen=place") //Versammlungsplatz wird aufgerufen
	{	
		if (getUrlParam("mode") == "mode=sim") //Links in den Simulator einfügen
		{
			sim_insertAttModeLinks();
		}
	}
	
	if (getUrlParam("screen") == "screen=report")
	{
		//Wird ein spezieller Bericht wird angeschaut, muss geprüft werden ob das kein Bericht ist, bei dem Unterstützung in einem anderen Dorf angegriffen wurde
		if ((getUrlParam("view") != "") && (document.body.innerHTML.indexOf("Deine Unterstützung") < 0))
		{
			report_insertSimulationLinks();
		}
	}
	
	//Schnellleiste erstellen und einfügen
	createMenubar();
	
	//Gesamtes Menü ersetzen
	expandMenu();
	
	//Pfeil-Navigation einfügen
	insertVillageSwitcher();
}

function report_insertSimulationLinks()
{
	//var tr = document.getElementsByTagName("table")[9].getElementsByTagName("tr")[1];
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var tr = document.getElementsByTagName("table")[10].getElementsByTagName("tr")[2];
	}
	else
	{
		var tr = document.getElementsByTagName("table")[9].getElementsByTagName("tr")[2];
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
		headers:{
		    "User-Agent":"monkeyagent",
		    "Accept":"text/monkey,text/xml",
		},
		onload:function(details) {
				var div = document.createElement("div");
				div.innerHTML = details.responseText;
				if (div.innerHTML.indexOf("att.png") >= 0)
				{
					var tr = div.getElementsByTagName("table")[7].getElementsByTagName("tr");
				}
				else
				{
					var tr = div.getElementsByTagName("table")[6].getElementsByTagName("tr");
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

/* Fügt die Links-Rechts Pfeile hinzu, mit denen man schnell durch die Dörfer switchen kann */
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
	
	var before_child = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
	var before = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[0].getElementsByTagName("td")[0];

	
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

//Fügt in der Übersicht einen Button hinzu, bei dessen click ein Fenster mit den vorhandenen Dörfern erscheint
function insertWhenStorageIsFull()
{
	var helper, row;
	var prod_array = new Array();
	var holz = parseInt(document.getElementById("wood").innerHTML); //Variablen der aktuellen Lagerinhalte holen
	var lehm = parseInt(document.getElementById("stone").innerHTML);
	var eisen = parseInt(document.getElementById("iron").innerHTML);
	var storage = parseInt(document.getElementById("storage").innerHTML.replace(" ","")); //Wie viel kann gelagert werden?
	
	if (document.body.innerHTML.indexOf("att.png") >= 0) //Angriff läuft -> weitere Table wurde eingefügt durch Stämme-Script -> nächste Table verwenden
	{
		var rows = document.getElementsByTagName("table")[10].getElementsByTagName("tr");
	}
	else
	{
		var rows = document.getElementsByTagName("table")[9].getElementsByTagName("tr");
	}
	
	try
	{
		for (var i=1; i<=3; i++)
		{
			row = rows[i];
			helper = row.getElementsByTagName("td")[1].innerHTML.replace("<strong>","");
			prod_array[i-1]= parseInt(helper.replace("</strong> pro Stunde",""));
		}
	}
	catch (e) //tritt ein Fehler auf, ist die klassische Dorfübersicht aktiv -> table [8]
	{
		var rows = document.getElementsByTagName("table")[8].getElementsByTagName("tr");
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
		var table = document.getElementsByTagName("table")[10];
		var help = document.getElementsByTagName("table")[11];
		want_count = 12;
	}
	else
	{
		var table = document.getElementsByTagName("table")[9];
		var help = document.getElementsByTagName("table")[10];
		want_count = 11;
	}
	
	var wanted;
	
	if (table.getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML.indexOf("img") >= 0) //Simulation ausgeführt
	{
		sim_insertLostRessources(table);
		
		if (help.innerHTML.indexOf("Schaden durch") >= 0) //Rammböcke/Katas wurden mitsimuliert -> nächste Table
		{
			wanted = document.getElementsByTagName("table")[want_count].getElementsByTagName("tr")[0].getElementsByTagName("th");

		}
		else
		{
			wanted = document.getElementsByTagName("table")[want_count-1].getElementsByTagName("tr")[0].getElementsByTagName("th");
		}
	}
	else //keine Simulation ausgeführt
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
		headers:{
		    "User-Agent":"monkeyagent",
		    "Accept":"text/monkey,text/xml",
		},
		onload:function(details) {
			var bdiv = document.createElement("div");
			bdiv.innerHTML = details.responseText;
				
			if (bdiv.innerHTML.indexOf("att.png") >= 0)
			{
				var rows = bdiv.getElementsByTagName("table")[10].getElementsByTagName("tr");
			}
			else
			{
				var rows = bdiv.getElementsByTagName("table")[9].getElementsByTagName("tr");
			}
			
			var td;
	
			//Eigenes Dorf - ist immer in der 2. Zeile
			if (mode == "off")
			{
				td = rows[1].getElementsByTagName("td");
				
				document.getElementsByName("att_spear")[0].value = td[1].innerHTML;
				document.getElementsByName("att_sword")[0].value = td[2].innerHTML;
				document.getElementsByName("att_axe")[0].value = td[3].innerHTML;
				document.getElementsByName("att_spy")[0].value = td[4].innerHTML;
				document.getElementsByName("att_light")[0].value = td[5].innerHTML;
				document.getElementsByName("att_heavy")[0].value = td[6].innerHTML;
				document.getElementsByName("att_ram")[0].value = td[7].innerHTML;
				document.getElementsByName("att_catapult")[0].value = td[8].innerHTML;
				document.getElementsByName("att_snob")[0].value = td[9].innerHTML;
			}
			
			//Insgesamt
			if (mode == "def")
			{
				td = rows[rows.length-1].getElementsByTagName("th");
				document.getElementsByName("def_spear")[0].value = td[1].innerHTML;
				document.getElementsByName("def_sword")[0].value = td[2].innerHTML;
				document.getElementsByName("def_axe")[0].value = td[3].innerHTML;
				document.getElementsByName("def_spy")[0].value = td[4].innerHTML;
				document.getElementsByName("def_light")[0].value = td[5].innerHTML;
				document.getElementsByName("def_heavy")[0].value = td[6].innerHTML;
				document.getElementsByName("def_ram")[0].value = td[7].innerHTML;
				document.getElementsByName("def_catapult")[0].value = td[8].innerHTML;
				document.getElementsByName("def_snob")[0].value = td[9].innerHTML;
				document.getElementsByName("def_wall")[0].value = "";
				document.getElementsByName("moral")[0].value = "100";
			}
			
		}
	});
}

function saveSpiedTroups()
{
	var table_counter;
	if (document.body.innerHTML.indexOf("att.png") >= 0)
	{
		var data = document.getElementsByTagName("table")[17].getElementsByTagName("tr")[1].getElementsByTagName("td");
		var lost = document.getElementsByTagName("table")[17].getElementsByTagName("tr")[2].getElementsByTagName("td");
		table_counter = 18;
	}
	else
	{
		var data = document.getElementsByTagName("table")[16].getElementsByTagName("tr")[1].getElementsByTagName("td");
		var lost = document.getElementsByTagName("table")[16].getElementsByTagName("tr")[2].getElementsByTagName("td");
		table_counter = 17;
	}
	GM_setValue("spy_speer",parseInt(data[1].innerHTML)-parseInt(lost[1].innerHTML));
	GM_setValue("spy_schwert",parseInt(data[2].innerHTML)-parseInt(lost[2].innerHTML));
	GM_setValue("spy_axt",parseInt(data[3].innerHTML)-parseInt(lost[3].innerHTML));
	GM_setValue("spy_spaeher",parseInt(data[4].innerHTML)-parseInt(lost[4].innerHTML));
	GM_setValue("spy_lkav",parseInt(data[5].innerHTML)-parseInt(lost[5].innerHTML));
	GM_setValue("spy_skav",parseInt(data[6].innerHTML)-parseInt(lost[6].innerHTML));
	GM_setValue("spy_ramme",parseInt(data[7].innerHTML)-parseInt(lost[7].innerHTML));
	GM_setValue("spy_kata",parseInt(data[8].innerHTML)-parseInt(lost[8].innerHTML));
	GM_setValue("spy_ag",parseInt(data[9].innerHTML)-parseInt(lost[9].innerHTML));
	
	var moral = document.getElementsByTagName("h4")[1].innerHTML; //Moral: 87%
	moral = moral.replace("Moral: ","");
	moral = moral.replace("%","");
	GM_setValue("spy_moral",parseInt(moral));
	
	var table;
	var geb;
	table = document.getElementsByTagName("table")[table_counter];
	if (table && (table.getElementsByTagName("tr").length > 1)) //Wall auch erspäht
	{
		geb = table.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
		var wall = geb.innerHTML.split("Wall <b>"); //(Stufe X)</b><br /> bleibt übrig
		
		if (wall.length > 1) //Wall wurde erspäht
		{
			wall[1] = wall[1].replace(")</b><br />","");
			wall[1] = wall[1].replace("(Stufe ","");
			GM_setValue("spy_wall",parseInt(wall[1]));
		}
	}
	else //Wall wurde nicht erspäht
	{
		GM_setValue("spy_wall",0);
	}
	
	/*Wall wurde vielleicht nicht erspäht, aber beschädigt -> Gebäudestufe ersichtlich */
	if (document.body.innerHTML.indexOf("Schaden durch") >= 0)
	{
		var tr = document.getElementsByTagName("table")[table_counter].getElementsByTagName("tr");
		
		//Wurde der Wall zusätzlich durch Katapulte beschädigt?
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
	document.getElementsByName("att_spy")[0].value = "";
	document.getElementsByName("att_light")[0].value = "";
	document.getElementsByName("att_heavy")[0].value = "";
	document.getElementsByName("att_ram")[0].value = "";
	document.getElementsByName("att_catapult")[0].value = "";
	document.getElementsByName("att_snob")[0].value = "";
	document.getElementsByName("moral")[0].value = "100";
}

function resetDefTroupsInSimulator()
{
	document.getElementsByName("def_spear")[0].value = "";
	document.getElementsByName("def_sword")[0].value = "";
	document.getElementsByName("def_axe")[0].value = "";
	document.getElementsByName("def_spy")[0].value = "";
	document.getElementsByName("def_light")[0].value = "";
	document.getElementsByName("def_heavy")[0].value = "";
	document.getElementsByName("def_ram")[0].value = "";
	document.getElementsByName("def_catapult")[0].value = "";
	document.getElementsByName("def_snob")[0].value = "";
	document.getElementsByName("moral")[0].value = "100";
	document.getElementsByName("def_wall")[0].value = "";
}

function insertSpiedTroupsInSimulator()
{
	document.getElementsByName("def_spear")[0].value = GM_getValue("spy_speer");
	document.getElementsByName("def_sword")[0].value = GM_getValue("spy_schwert");
	document.getElementsByName("def_axe")[0].value = GM_getValue("spy_axt");
	document.getElementsByName("def_spy")[0].value = GM_getValue("spy_spaeher");
	document.getElementsByName("def_light")[0].value = GM_getValue("spy_lkav");
	document.getElementsByName("def_heavy")[0].value = GM_getValue("spy_skav");
	document.getElementsByName("def_ram")[0].value = GM_getValue("spy_ramme");
	document.getElementsByName("def_catapult")[0].value = GM_getValue("spy_kata");
	document.getElementsByName("def_snob")[0].value = GM_getValue("spy_ag");
	document.getElementsByName("def_wall")[0].value = GM_getValue("spy_wall");
	document.getElementsByName("moral")[0].value = GM_getValue("spy_moral");
	
	GM_setValue("want_simulation",0);
}


function expandMenu()
{
	var link_array = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a");
	var link_counter = 7;
	
	if (link_array.length == 12) //-> Im Stammesforum gibt es neue Beitrage
	{
		link_counter = 8;
	}
	
	var punkte = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML;
	punkte = punkte.substr(punkte.indexOf("\("),punkte.indexOf("\)")-punkte.indexOf("\(")+1);
	punkte = punkte.replace('<span class="grey">','');
	punkte = punkte.replace('</span>','');
	var logout = createLinkNode(link_array[0].href,"",link_array[0].innerHTML,"");
	var forum = createLinkNode(link_array[1].href,"",link_array[1].innerHTML,"_blank");
	var chat = createLinkNode(link_array[2].href,"",link_array[2].innerHTML,"_blank");
	var hilfe = createLinkNode(link_array[3].href,"",link_array[3].innerHTML,"_blank");
	var einstellungen = createLinkNode(link_array[4].href,"",link_array[4].innerHTML,"");
	var premium = createLinkNode(link_array[5].href,"",link_array[5].innerHTML,"");
	var rangliste = createLinkNode(link_array[6].href,"",link_array[6].innerHTML+""+punkte,"");
	
	//Überprüfung ob es neue Nachrichten im Stamm gibt (Image kommt vor, weil das Bild auch ein Link ist muss mit link-counter (erhöhung um 1) gearbeitet werden)
	var stamm;
	var stamm_forum;
	if (link_array.length == 12) // -> Neue Beiträge im Stammesforum, Bild kommt vor
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
	
	
	var td = document.createElement("td");
	var div = document.createElement("div");
	var ul = document.createElement("ul");
	var stylenode = document.createAttribute("class");
	stylenode.nodeValue = "my_menu";
	div.setAttributeNode(stylenode);
	
	ul.appendChild(logout);
	ul.appendChild(forum);
	ul.appendChild(chat);
	ul.appendChild(hilfe);
	ul.appendChild(einstellungen);
	ul.appendChild(premium);
	ul.appendChild(rangliste);
	if (stamm_forum != false)
	{
		ul.appendChild(stamm_forum);
	}
	ul.appendChild(stamm);
	ul.appendChild(berichte);
	ul.appendChild(nachrichten);
	ul.appendChild(freunde);
	
	div.appendChild(ul);
	td.appendChild(div);
	
	var to_replace = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
	to_replace.replaceChild(td,to_replace.firstChild);
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

	//Menü-Div erstelle und Style setzen
	var divnode = document.createElement("div");
	var ulnode = document.createElement("ul");
	var stylenode = document.createAttribute("class");
	stylenode.nodeValue = "my_menu";
	divnode.setAttributeNode(stylenode);

	//Links in das Menü einfügen
	ulnode.appendChild(main_link);
	ulnode.appendChild(kaserne_link);
	ulnode.appendChild(stall_link);
	ulnode.appendChild(werkstatt_link);
	ulnode.appendChild(adelshof_link);
	ulnode.appendChild(schmiede_link);
	ulnode.appendChild(vers_platz_link);
	ulnode.appendChild(marktplatz_link);

	divnode.appendChild(ulnode);

	//Schnellleiste im Dokument einfügen
	document.getElementsByTagName("table")[0].appendChild(divnode);
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
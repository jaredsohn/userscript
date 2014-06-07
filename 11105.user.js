// Die Stämme Erweiterung
// version 0.4
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Die Staemme Schnellleiste Dutch version
// @namespace      http://userscripts.org/scripts/show/10650
// @description    Fuegt eine neue Benutzerleiste und dynamisches Menü hinzu und ermoeglicht so schnelleres Navigieren (ins Niederländische übersetzt.)
// @include        http://w*.tribalwars.nl/*
// ==/UserScript==

var my_menu_css = '.my_menu ul {padding: 0; margin: 0; list-style: none; background-color: #F1EBDD; }'+
					'.my_menu li {float: left; position: relative; display: block; padding-right: 10px; background-color: #F1EBDD; height: 17px; }'+
					'.my_menu li:hover {background-color: #C7B999; }'+
					'.my_menu li ul {display: none; position: absolute; left: 0; top: 17px; z-index: 10}'+
					'.my_menu li:hover ul { display: block; width: 150px;}'+
					'.my_menu li:hover ul li {display: block; height: 17px; width: 100%; }'+
					'.my_menu li ul li {border-width: 1px; border-style: solid; border-color: #804000;}'+
					'.my_menu a { color: #804000; font-weight: bold; height: 17px; display: block; width: 100%; }'+
					'.my_menu img {	border: 0; }';
					
GM_addStyle(my_menu_css);

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
	var eigene_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=own_offer","","Eigen aanb.","");
	var fremde_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=other_offer","","Andere aanb.","");
	var status = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=traders","","Handelarenstatus","");
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
	var truppen = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=units","","Troepen","");
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
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=attack","","Aanval","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=defense","","Verdediging","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=support","","Ondersteuning","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=trade","","Handel","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=report&mode=other","","Andere","");
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
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=profile","","Profiel","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=email","","Email Adres","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=settings","","Instellingen","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=move","","Opnieuw beginnen","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=delete","","Acc wissen","");
	arr[5] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=share","","INet-Verbinding delen","");
	arr[6] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=vacation","","Vakantiemodus","");
	arr[7] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=logins","","Aanmeldingen","");
	arr[8] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=change_passwd","","Wachtword wijzigen","");
	arr[9] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=settings&mode=poll","","Rondvragen","");
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
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=help","","Voordelen","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=premium","","Kopen","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=points","","Inzetten","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=premium&mode=log","","Protocol","");
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
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=ally","","Stammen","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=player","","Speler","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_ally","","Continent Stammen","");
	arr[3] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=con_player","","Continent Speler","");
	arr[4] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ranking&mode=kill_player","","Verslagen tegenstanders","");
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
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=profile","","Profiel","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=ally&mode=members","","Medeleden","");
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
	arr[0] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=mass_out","","Rondschrijven","");
	arr[1] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=new","","Mededeling schrijven","");
	arr[2] = createLinkNode("game.php?"+getUrlParam("village")+"&screen=mail&mode=block","","Afzender blokkeren","");
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
	//Schnellleiste erstellen und einfügen
	createMenubar();
	
	//Gesamtes Menü ersetzen
	expandMenu();
}

function expandMenu()
{
	var link_array = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("a");
	
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
	
	//Überprüfung ob es neue Nachrichten im Stamm gibt (Image kommt vor)
	var stamm;
	if (link_array[7].innerHTML.indexOf("<img") >= 0)
	{
		var img = link_array[7].getElementsByTagName("img")[0];
		var text = link_array[7].innerHTML.substr(link_array[7].innerHTML.indexOf(">")+1);
		stamm = createLinkNode(link_array[7].href,img.src,text,"");
	}
	else
	{
		stamm = createLinkNode(link_array[7].href,"",link_array[7].innerHTML,"");
	}
	
	var berichte;
	if (link_array[8].innerHTML.indexOf("<img") >= 0)
	{
		var img = link_array[8].getElementsByTagName("img")[0];
		var text = link_array[8].innerHTML.substr(link_array[8].innerHTML.indexOf(">")+1);
		berichte = createLinkNode(link_array[8].href,img.src,text,"");
	}
	else
	{
		berichte = createLinkNode(link_array[8].href,"",link_array[8].innerHTML,"");
	}
	
	var nachrichten;
	if (link_array[9].innerHTML.indexOf("<img") >= 0)
	{
		var img = link_array[9].getElementsByTagName("img")[0];
		var text = link_array[9].innerHTML.substr(link_array[9].innerHTML.indexOf(">")+1);
		nachrichten = createLinkNode(link_array[9].href,img.src,text,"");
	}
	else
	{
		nachrichten = createLinkNode(link_array[9].href,"",link_array[9].innerHTML,"");
	}
	
	var freunde = createLinkNode(link_array[10].href,"",link_array[10].innerHTML,"");
	
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
	var main_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=main","graphic/buildings/main.png","Hoofdgebouw","");
	var kaserne_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=barracks","graphic/buildings/barracks.png","Kazerne","");
	var stall_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=stable","graphic/buildings/stable.png","Stal","");
	var werkstatt_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=garage","graphic/buildings/garage.png","Werkplaats","");
	var marktplatz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market","graphic/buildings/market.png","Marktplaats","");
	var vers_platz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place","graphic/buildings/place.png","Verzammelplaats","");
	var adelshof_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=snob","graphic/buildings/snob.png","Adelshoeve","");

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
	ulnode.appendChild(vers_platz_link);
	ulnode.appendChild(marktplatz_link);

	divnode.appendChild(ulnode);

	//Schnellleiste im Dokument einfügen
	document.getElementsByTagName("table")[0].appendChild(divnode);
}
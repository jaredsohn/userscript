// ==UserScript==
// @name           TC-redesign
// author:         code by umbrella; design by Jorah
// @description	   Veraendert das Design der TheCrown-Seite
// @include        *.garathor.com/*
// @exclude        http://www.garathor.com/forum/*
// ==/UserScript==

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// Wichtige Einstellungen in TC:												//
// "Tutorium abschalten" und "Sektorenmenü oben" dürfen NICHT aktiviert sein!   //
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //


// Schalter um die alte Navigationsleiste einzusetzen:
var nav = 0;
		// nav = 0		Die TC-eigene Navigationsleiste wird benutzt (standard)
		// nav = 1		Die frühere Navigationsleiste wird wieder eingesetzt




// URL ermitteln
var url = document.URL;

// Veraendert die Startseite
if(url.search(/index2\.php/) >= 0)
{
	// Testen ob Bannerunterbrechung
	if(document.getElementById('unverdaechtig') == null)
	{
		// Variablen deklarieren
		var temp;
		var bauern = 0;
		var bericht = 0;
		var nachricht = 0;
		var index_text = "";
		var jetzt = new Date();
                
		
		// Pruefen ob neue Systemmeldung
		temp = document.getElementById('s1').getElementsByTagName('img');
		if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1_w.gif')
			bericht = 1;
		if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1_a.gif')
			bauern = 1;
		if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s1_sw.gif')
			bauern = 1;
		
		// Pruefen ob neue SpielerNachrichten
		temp = document.getElementById('s2').getElementsByTagName('img');
		if(temp[0].src == 'http://images.testrunde.garathor.com/img_game/s2_a.gif')
			nachricht = 1;
			
		// Indexseite basteln
		index_text = "<div style=\"margin-left: -25px;\">";
		if(nachricht)
			index_text = index_text + "<a href = \"nachrichten/?box=1\"><img src = \"http://redesign.cwsurf.de/bilder/n_message.jpg\"></a>";
		else
			index_text = index_text + "<a href = \"nachrichten/?box=2\"><img src = \"http://redesign.cwsurf.de/bilder/k_message.jpg\"></a>";
			
		if(bericht)
		{
			if(nachricht)
				index_text = index_text + "<a href=\"logbuch.php?box[0]=true\"><img src = \"http://redesign.cwsurf.de/bilder/m_bericht.jpg\" style = \"margin-left: 7px;\"></a></div>";
			else
				index_text = index_text + "<a href=\"logbuch.php?box[0]=true\"><img src = \"http://redesign.cwsurf.de/bilder/m_bericht.jpg\" style = \"margin-left: 121px;\"></a></div>";
		}
		else
		{
			if(nachricht)
				index_text = index_text + "<img src = \"http://redesign.cwsurf.de/bilder/k_message.jpg\" style = \"margin-left: 7px;\"></div>";
			else
				index_text = index_text + "<img src = \"http://redesign.cwsurf.de/bilder/k_message.jpg\" style = \"margin-left: 121px;\"></div>";
		}
		
		if(bauern)
			index_text = index_text + "<div style = \"position:absolute; left: 355px; top: 245px;\"><a href=\"#\" onClick=\"xajax_userinfo_logShow()\"><img src = \"http://redesign.cwsurf.de/bilder/arbeiter.jpg\"></a></div>";
		
		//index_text = index_text + "<div style = \"margin-left: -25px; margin-top: 20px; margin-bottom: 20px;\"><img src = \"http://redesign.cwsurf.de/bilder/grenze.jpg\"></div> <div style = \"margin-left: -25px; margin-top: 10px; \"><a href = \"http://www.garathor.com/forum/forumdisplay.php?393-Garathor-News\"><img src = \"http://images.testrunde.garathor.com/img_game/index/bote.png\"></a> <img src = \"http://redesign.cwsurf.de/bilder/gn_text.jpg?" + jetzt.getTime() + "\" style = \"margin-left:20px;\"></div>";
		
			
			
		// Schaut den isolierten Ranglistenbereich an
		var anz_div = 0;
		var thisElem = 0;
		var alltds = document.getElementsByTagName('td');
		for (var i = 0; i < alltds.length; i++) 
		{
			thisElem = alltds[i];
			if (thisElem.className && thisElem.className == 'rin')
			{
				anz_div = thisElem.getElementsByTagName('div').length;
				i = alltds.length + 1;
			}
		}		
		
		switch(anz_div)
		{
			// Spieler ist in den Top 3
			case 4: 
					// Tutorialtext ausblenden
					var tut_spans = document.getElementsByTagName('span');
					tut_spans[22].innerHTML = "";

					// Tutorial-Links ausblenden und StatusNachrichten einblenden incl. GN-Link
					var tut_links = document.getElementsByTagName('div');
					tut_links[16].style.marginTop = "5px";
					tut_links[16].style.marginBottom = "20px";
					tut_links[16].style.padding = "0px";
					
					tut_links[22].innerHTML = index_text;		

					// Changelogbutton killen
					tut_links[21].innerHTML = "";
					tut_links[21].style.height = "0px";
					tut_links[21].style.width = "0px";
					tut_links[21].style.padding = "0px";
					tut_links[21].style.border = "0px";					
					
					break;


			// Spieler ist nicht in den Top 3
			case 5: 
					// Tutorialtext ausblenden
					var tut_spans = document.getElementsByTagName('span');
					tut_spans[30].innerHTML = "";
										
					// Tutorial-Links ausblenden und StatusNachrichten einblenden incl. GN-Link
					var tut_links = document.getElementsByTagName('div');
					tut_links[16].style.marginTop = "5px";
					tut_links[16].style.marginBottom = "20px";
					tut_links[16].style.padding = "0px";
					
					tut_links[23].innerHTML = index_text;
										
					// Changelogbutton killen
					tut_links[22].innerHTML = "";
					tut_links[22].style.height = "0px";
					tut_links[22].style.width = "0px";
					tut_links[22].style.padding = "0px";
					tut_links[22].style.border = "0px";
					
					break;
		}
	}
}


// Sektorenansicht anpassen
if(url.search(/karte/) >= 0 && url.search(/karte\/provinzen/) < 0)
{

	// Ersetze Politik-Button durch Forumslink
	document.getElementById('map-nav6').innerHTML = "<a href=\"http://www.garathor.com/forum/\"><img src=\"http://images.testrunde.garathor.com/img_game/nav_forum.gif\"></a>";

	// Verschiebe die Kartennavigation nach oben
	var node_map = document.getElementById('map-bg');
	var map_box = document.createElement('div');
	map_box.style.backgroundImage = "url(http://images.testrunde.garathor.com/img_game/karte/bg.png)";
	map_box.style.width = "961px";
	map_box.style.height = "85px";
	map_box.style.paddingLeft = "30px";
	map_box.style.margin = "0px auto";
	map_box.innerHTML = document.getElementById('map-bottom').innerHTML;
	node_map.parentNode.insertBefore(map_box, node_map);
	document.getElementById('map-bottom').innerHTML = "";
	
	// Verschiebt den Königsreichtext nach unten
	var a = document.getElementsByTagName('a');
	for(var i=0; i<=a.length; i++)
	{
		if(a[i].innerHTML.search(/Diese Region/) >= 0)
		{
			var node_region = a[i];
			node_region.parentNode.insertBefore(document.createElement('br'), node_region);
			i = a.length + 1;
		}
	}
		
	// Verändert die Spionagebuttons
	var node_spy = document.getElementsByTagName('button')[1];
	node_spy.parentNode.insertBefore(document.createElement('br'), node_spy);
	document.getElementsByTagName('button')[0].style.marginLeft = '93px';
	document.getElementsByTagName('button')[0].style.marginBottom = '6px';
	document.getElementsByTagName('button')[1].style.marginLeft = '80px';
	document.getElementsByTagName('button')[1].style.marginBottom = '6px';
	document.getElementsByTagName('button')[2].style.marginLeft = '30px';	

	// Fügt Leerzeile bei Verwaltungseinstellung ein
	var node_ver = document.getElementsByTagName('form')[1];
	node_ver.parentNode.insertBefore(document.createElement('br'), node_ver);
}

// Uhr und anderen Kleinkram abändern
if((url.search(/karte/) < 0 && url.search(/diener/) < 0) || url.search(/karte\/provinzen/) >= 0)
{	
	// WIKI-Kasten erstellen
	var wiki;
	var node_wiki;
	var wiki_box;
	if(!document.getElementById('wiki_box'))
	{
		node_wiki = document.getElementById('s1');
		wiki_box = document.createElement('div');
		wiki_box.id = "wiki_box";
		node_wiki.parentNode.insertBefore(wiki_box, node_wiki);
	}
	else
	{
		// WIKI-Bild ausblenden
		var wiki_png = document.getElementById('wiki_box').getElementsByTagName('img');
		wiki_png[0].style.visibility = 'hidden';
	}
	
	// Uhr auf Weltkarte anzeigen
	//document.getElementById('wiki_box').style.display = "block";

	// Aktuelle Zeit auslesen
	var akt_time = document.getElementById('header_clock_time').innerHTML;
	var clock_text = "<div id=\"header_clock_time\" style=\"font-size:17px;position:relative;top:12px;\">" + akt_time + "</div>";

	// Untere Uhr + Datum loeschen
	document.getElementById('header_clock_date').innerHTML="";
	document.getElementById('header_clock_time').innerHTML="edited by umbrella &amp; Jorah";

	// Obere Uhr erstellen
	document.getElementById('wiki_box').innerHTML= clock_text;

	// Ersetze Politik-Button durch Forumslink
	document.getElementById('nav3').innerHTML = "<a href=\"http://www.garathor.com/forum/\"><img src=\"http://images.testrunde.garathor.com/img_game/nav_forum.gif\"></a>";

	// Logout-Button machen
	document.getElementById('meldung').innerHTML = "<a href=\"/logout.php\"><img src=\"http://images.testrunde.garathor.com/img_game/logout.png\" style=\"position:absolute;right:34px;top:-225px\"/></a>";
}


// Neue Provinzenansicht anpassen
if(url.search(/provinzen_id/) >= 0)
{
	// Testen ob Bannerunterbrechung
	if(document.getElementById('unverdaechtig') == null)
	{
		// Testen ob Neue Ansicht
		if(document.getElementById('pwu') != null)
		{
			var all_divs = document.getElementsByTagName('div');
			// Links oben
			document.getElementById('pum').style.top = "-100px";
			document.getElementById('pum2').style.top = "-84px";
			// Rechts oben
			document.getElementById('pwu').style.top = "-176px";
			// Mitelteil
			all_divs[18].style.top = "170px";				
			// Links unten
			document.getElementById('ptu').style.top = "435px";
			// Rechts unten
			document.getElementById('pmg').style.top = "435px";
			// Platzhalter unten
			all_divs[all_divs.length - 20].style.height = "680px";
		}
	}
}




// Neue Navileiste  - muss erst über die Variable "nav" am Anfang des Skript aktiviert werden
if(nav)
{
	if((url.search(/karte/) < 0 && url.search(/diener/) < 0) || url.search(/karte\/provinzen/) >= 0)
	{
		var host = window.location.host;
		var node;
		var element;
		
		// Positionen anpassen und Hintergrundbild ändern
		document.getElementById('wiki_box').style.top = "450px";
		document.getElementById('navi').style.backgroundImage = "url(http://redesign.cwsurf.de/bilder/navi.png)";
		document.getElementById('navi').style.height = "450px";
		document.getElementById('nav_prov').style.top = "385px";
		
		// Button ersetzen
		// Rangliste
		document.getElementById('nav8').innerHTML = "<a href=\"http://" + host + "/global/rangliste.php\"><img src=\"http://images.testrunde.garathor.com/img_game/nav_rangliste.gif\"></a>";
		// Finanzen
		document.getElementById('nav7').innerHTML = "<a href=\"http://" + host + "/finanzen.php\"><img src=\"http://images.testrunde.garathor.com/img_game/nav_finanzen.gif\"></a>";
		// Verwaltung
		document.getElementById('nav4').innerHTML = "<a href=\"http://" + host + "/ki.php\"><img src=\"http://redesign.cwsurf.de/bilder/nav_verwaltung.jpg\"></a>";
		// Militaermenue
		document.getElementById('nav5').innerHTML = "<a href=\"http://" + host + "/armeen/\"><img src=\"http://redesign.cwsurf.de/bilder/nav_militaer.jpg\"></a>";
		// Spionage
		node = document.getElementById('nav3');
		element = document.createElement('div');
		element.style.position = "absolute";
		element.style.top = "260px";
		element.style.left = "19px";
		element.innerHTML = "<a href=\"http://" + host + "/geheimdienst/\"><img src=\"http://redesign.cwsurf.de/bilder/nav_spionage.jpg\"></a>";
		node.parentNode.insertBefore(element, node);
		// Weltkarte
		node = document.getElementById('nav3');
		element = document.createElement('div');
		element.style.position = "absolute";
		element.style.top = "287px";
		element.style.left = "19px";
		element.innerHTML = "<a href=\"http://" + host + "/europa/\"><img src=\"http://images.testrunde.garathor.com/img_game/nav_kartographie.gif\"></a>";
		node.parentNode.insertBefore(element, node);
		//Einstellungen
		node = document.getElementById('nav3');
		element = document.createElement('div');
		element.style.position = "absolute";
		element.style.top = "314px";
		element.style.left = "19px";
		element.innerHTML = "<a href=\"http://" + host + "/settings.php\"><img src=\"http://redesign.cwsurf.de/bilder/nav_einstellungen.jpg\"></a>";
		node.parentNode.insertBefore(element, node);
		// Forum
		node.style.top = "341px";
	}
}


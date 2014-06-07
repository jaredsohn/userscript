// ==UserScript==
// @name           MatzAbFilter
// @namespace      hsv-blog.abendblatt.de
// @description    Ignorierfilter für lästige User im MatzAb-Blog, FireFox 3.6 + Greasemonkey 0.8.20100211.5
// @include        http://hsv-blog.abendblatt.de/*
// @author         WECoyote
// ==/UserScript==


//////***** START SKRIPT *****
// var d = new Date();
// var StartZeit = d.getTime();
	
// 1. Startwerte nach Installation festlegen
	if (!GM_getValue('Bremer')){
		var Bremer = "HSV-Oliver,björnmose,wahrheit,Willy Waldo,Bruno Taut,Hugo Häring,Otto Rudolf Salvisberg,michael kohlhaas,Antonio Gaudí,Antoni Gaudí,hammerhart,Juschmet,HSV Jonny"
		GM_setValue("Bremer",Bremer);
	}

	if (!GM_getValue('Anzeige')){
		// Bremer = "Hier schrieb ein Bremer"
		// OhneText = Nur Usereintrag
		// Nix = Kommentar wird gar nicht angezeigt. 
		var Anzeige = "Bremer";	
		GM_setValue("Anzeige",Anzeige);
	}
	
	if (!GM_getValue('Sortierung')){
		// Alphabet = Aufsteigend Nach Namen
		// Posts = Absteigend nach Anzahl der Posts
		var Sortierung = "Alphabet";	
		GM_setValue("Sortierung",Sortierung);
	}
		if (!GM_getValue('FilterStatus')){
		// Aktiv = Filter ist an
		// InAktiv = Filter ist aus
		var FilterStatus = "Aktiv";	
		GM_setValue("FilterStatus",FilterStatus);
	}
	
	var Bremer = GM_getValue('Bremer').split(",");
	var Anzeige = GM_getValue('Anzeige');
	var Sortierung = GM_getValue('Sortierung');
	var FilterStatus = GM_getValue('FilterStatus');
	var ErsatzTrenner = "<p>";
	
// 2. Festhalten, wer alles gepostet hat.
	var Kommentare = document.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var UserTabelle = GetUser(Kommentare);

// 3. Anlegen und konfigurieren einer Tabelle zur Übersicht
	var UebersichtsTabelle = GetTabelle();

		// 3.1 Konfigurationszeile hinzufügen	
		UebersichtsTabelle.appendChild(GetKonfiguration());
	
		// 3.2 Überschriften definieren und anlegen
		UebersichtsTabelle.appendChild(GetUeberschrift())
	
		// 3.2 Usertabelle anlegen
		GetUserDaten(UebersichtsTabelle,UserTabelle);

// 4. Einbinden der Tabelle vor den Kommentaren, eine Zeile Abstand.
	var CommentStart =  document.getElementById("comments");
	CommentStart.parentNode.insertBefore(UebersichtsTabelle,CommentStart);
	var NeueZeile = document.createElement("br");
	CommentStart.parentNode.insertBefore(NeueZeile,CommentStart);
	
	
// 5. Einzelne Kommentare auf Bremer prüfen
	if (FilterStatus == "Aktiv"){
		var Kommentare = document.getElementsByTagName('ol')[0].getElementsByTagName('li');
		var AnzKomm = Kommentare.length;
		for (var k = AnzKomm - 1; k >= 0; k--)
		{
			var Kommentar = Kommentare[k].innerHTML.toLowerCase(); 
			var Klassenname = Kommentare[k].id;
			var ListElement = document.getElementById(Klassenname);
			var DivElement = ListElement.getElementsByTagName('div')[0];
			var commentElement = DivElement.getElementsByTagName('a')[0];
			var UserElement = DivElement.getElementsByTagName('cite')[0];			
			var LinkElement = UserElement.getElementsByTagName("a")[0];
			
			if (!LinkElement)
			{
				User = UserElement.innerHTML;	
			} else 
			{
				User = LinkElement.innerHTML;
			}
	
			var a = document.createElement('a');
			a.href =commentElement.href ; 
			
			var Sinnfrei = false;
			var AktUser = "";
			
			// 5.1 Jeden Kommentar pruefen, ob ihn ein Bremer geschrieben hat.
			for (var j = Bremer.length - 1; j >= 0; j--){
				if (ListUser(User).toLowerCase() == Bremer[j].toLowerCase()){
					
					DivEnde = ListElement.innerHTML.lastIndexOf("</div>")+6
					var UserInfo = ListElement.innerHTML.substring(0,DivEnde);
					var TextStart = ListElement.innerHTML.indexOf("<p>")+3;
					var TextEnde = ListElement.innerHTML.lastIndexOf("</p>");
					var UserText = ListElement.innerHTML.substring(TextStart,TextEnde);
					
					switch (Anzeige) {
						case "Bremer" : 
								ListElement.innerHTML = UserInfo + "<p>Hier schrieb ein Bremer!</p>";		
								ListElement = document.getElementById(Klassenname);
								DivElement = ListElement.getElementsByTagName('div')[0];
								a.innerHTML = '[+]';
								a.title = 'Doch ein Hamburger? ==> ' + UserText;
								a.id = User;
								a.addEventListener('click',function(event){window.MachHamburger(event);},false);
								DivElement.appendChild(a);
								break;
						case "OhneText" :  	
								ListElement.innerHTML = UserInfo;
								ListElement = document.getElementById(Klassenname);
								DivElement = ListElement.getElementsByTagName('div')[0];
								a.innerHTML = '[+]';
								a.title = 'Doch ein Hamburger? ==> ' + UserText;
								a.id = User;
								a.addEventListener('click',function(event){window.MachHamburger(event);},false);
								DivElement.appendChild(a);
								break;
						case "Nix" : 	
								Kommentare[k].style.display = "none";
								break;
				
					}
					Sinnfrei = true;
					break;
				} 
			}				
			if (Sinnfrei == false){
				// Alles OK, Minus hinzufügen, damit er ggf. gefiltert werden kann.		
				a.innerHTML = '[-]';
				a.title = "Klicken, wenn " + User + ' ein Bremer ist!';	
		  	a.id = User; 
				a.addEventListener('click',function(event){window.MachBremer(event);},false);		  	
			  DivElement.appendChild(a);
			}
		}
	}
	
// d = new Date();
// var EndZeit = d.getTime();
// GM_log (EndZeit-StartZeit + "ms");
//////***** ENDE SKRIPT *****



//////***START***** Listenpflege *****************
	
	function ListUser(User)
	{
			var replacer = new RegExp(",","g");
			User = User.replace(replacer,ErsatzTrenner);
			return User;
	}
	
	function AnzeigeUser(User)
	{
			var replacer = new RegExp(ErsatzTrenner,"g");
			User = User.replace(replacer,",");
			return User;
	}
	
	
// Gehört der User zu den Bremern?
	function IstGeblockt(User)
	{
		var Geblockt = GM_getValue('Bremer').split(",");
		for (b=0; b<=Geblockt.length-1;b++){
		 		
			if(ListUser(User) == Geblockt[b]){
				return true;
				break;
			}
		} 
		return false;
	}

// Setzt den FilterStatus
	window.FilterStatus = function (E) {
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) {
			 GM_setValue("FilterStatus","InAktiv");
		} else{
			 GM_setValue("FilterStatus","Aktiv");
		}
		window.location.reload();
	}

// Setzt den Sortiermodus
	window.SetzeSortierung = function (E) {
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("Alphabet")>-1) {
			 GM_setValue("Sortierung","Alphabet");
		} else{
			 GM_setValue("Sortierung","Posts");
		}
		window.location.reload();
	}
	

// Setzt den AnzeigeModus
	window.SetzeAnzeige = function (E) {
		if (!E) {var E = window.event};
		switch (E.target.id) {
			case "radAnzBremer" : GM_setValue("Anzeige","Bremer");
					break;
			case "radAnzOhneText" : GM_setValue("Anzeige","OhneText");
					break;
			case "radAnzNix" : GM_setValue("Anzeige","Nix");
					break;
		}
		window.location.reload();
	}

// Entfiltert einen User
	window.MachHamburger =  function (E) {
		if (!E) {var E = window.event};
		var name = E.target.id;
		if (name.length > 0) {
			var b = '';
			for (var i = 0; i < Bremer.length; i++) {
				if (Bremer[i] != ListUser(name)) {
					b += ',' + Bremer[i];
				}
			}
			b = b.replace(/,,/, ',');
			if (b.substr(0,1)==",") {
				b = b.substr(1);
			}
			if (b.substring(b.length-1)==",") {
				b = b.substr(0,b.length-2);
			}
			GM_setValue('Bremer', b);
			GM_log (b.replace(/,/g,"\n"));
			window.location.href = E.target.href;
			window.location.reload();
		}
	}

// Filtert einen User	
	window.MachBremer =  function (E) {
		if (!E) {var E = window.event};
		var name = E.target.id;
		if (name.length > 0) {
			var b = GM_getValue('Bremer',true);
			GM_log (name);
			b = b + ',' + name;
			b = b.replace(/,,/, ',');
			if (b.substr(0,1)==",") {
				b = b.substr(1);
			}
			if (b.substring(b.length-1)==",") {
				b = b.substr(0,b.length-2);
			}
			GM_setValue('Bremer', b);
			GM_log (b.replace(/,/g,"\n"));
			window.location.href = E.target.href;
			window.location.reload();
		}
	}
//////****ENDE***** Listenpflege *****************




//////****START************** Sortierfunktionen ***********************
	function alphabetical(a, b)
	{
	     var A = a.toLowerCase();
	     var B = b.toLowerCase();
	     if (A < B){
	        return -1;
	     }else if (A > B){
	       return  1;
	     }else{
	       return 0;
	     }
	}
	function nachAnzahl_ASC(a,b)
	{
		if (a[1]==b[1])
		{
			return 0;
		} else {
			if (a[1]<b[1])
			{
				return -1;
			}	else {
				return 1;
			}
		}
	}
	function nachAnzahl_DESC(b,a)
	{
		if (a[1]==b[1])
		{
			return 0;
		} else {
			if (a[1]<b[1])
			{
				return -1;
			}	else {
				return 1;
			}
		}
	}
//////****ENDE************** Sortierfunktionen ***********************




//////////// ****START******* Tabellenfunktionen *****************

	
	// liefert ein zweidimensionales Array der User aus einer Kommentarliste
	function GetUser(Kommentare)
	{
		var Users = "";
		for (var k = Kommentare.length - 1; k >= 0; k--)
		{
			var Klassenname = Kommentare[k].id;
			var ListElement = document.getElementById(Klassenname);
			var UserElement = ListElement.getElementsByTagName("cite")[0];
			var LinkElement = UserElement.getElementsByTagName("a")[0];
			if (!LinkElement)
			{
				User = UserElement.innerHTML;	
			} else {
				User = LinkElement.innerHTML;
			}
			
			Users = Users + "," + User ;
		}
		
		if (Users.substring(0,1)==',') {
			Users = Users.substring(1);
		}
		
		var UserList = Users.split(",");
		UserList.sort(alphabetical);
		var UserDaten = new Array();
		UserDaten[0] = new Array();
		UserDaten[0][0] = "";
		UserDaten[0][1] = 0;
		
		var AnzahlPoster = -1;
	
		for (var u = 0; u <= UserList.length-1; u++)	
		{
			Vorhanden = false;
			for (var p = 0; p <= UserDaten.length-1; p++) 
			{
				if (UserList[u]==UserDaten[p][0]) 
				{
					Vorhanden = true;
					UserDaten[p][0] = UserList[u];
					UserDaten[p][1] = UserDaten[p][1] + 1 ;
					break;
				} 
			}		
			if (Vorhanden == false)
			{
				AnzahlPoster = AnzahlPoster + 1;
				UserDaten[AnzahlPoster] = new Array(1);
				UserDaten[AnzahlPoster][0] = UserList[u];
				UserDaten[AnzahlPoster][1] = 1 ;
			}
		}
		
		if (Sortierung=="Posts")
		{
			UserDaten.sort(nachAnzahl_DESC);
		}
		return UserDaten;	
	}
	
	// liefert das Tabellengrundgerüst für die Anzeige der Userdaten.	
	function GetTabelle()
	{
		var UebersichtsTabelle = document.createElement("Table");
		
		var CellPadding = document.createAttribute("cellpadding");
		CellPadding.nodeValue = "5";
		UebersichtsTabelle.setAttributeNode(CellPadding);
		
		var CellSpace = document.createAttribute("cellspacing");
		CellSpace.nodeValue = "20";
		UebersichtsTabelle.setAttributeNode(CellSpace);
		
		var Linien = document.createAttribute("rules");
		Linien.nodeValue = "all";
		UebersichtsTabelle.setAttributeNode(Linien);
		
		var Rahmen = document.createAttribute ("border");
		Rahmen.nodeValue = "2";
		UebersichtsTabelle.setAttributeNode(Rahmen);
		
		var Breite = document.createAttribute("width");
		Breite.nodeValue = "100%";
		UebersichtsTabelle.setAttributeNode(Breite);
		
		return UebersichtsTabelle;
	}	

	// liefert die Konfigurationszeile, mit der die Anzeige-Art ausgewählt werden kann. 
	function GetKonfiguration()
	{	

		var KonfigZeile = document.createElement("tr");
		
		var KonfigEintrag = document.createElement ("td");
		var ColSp = document.createAttribute("colspan");
		ColSp.nodeValue = "9";
		KonfigEintrag.setAttributeNode(ColSp);
		
			var KonfigTabelle = document.createElement("table");
			var Rahmen = document.createAttribute ("border");
			Rahmen.nodeValue = "0";
			KonfigTabelle.setAttributeNode(Rahmen);
			
			var Breite = document.createAttribute("width");
			Breite.nodeValue = "100%";
			KonfigTabelle.setAttributeNode(Breite);
		
				
				var Konfiguration = document.createElement("tr");

			
				var Modus = document.createElement("td");
				ColSp = document.createAttribute("colspan");
				ColSp.nodeValue = "1";
				Modus.setAttributeNode(ColSp);
				Modus.style.color = "#ffffff";		
		
				Modus.innerHTML = "<b>Filter Aktiv&nbsp;</b>";
		
				var bgColFilter = document.createAttribute("bgcolor");
				var chkbox = document.createElement('input');    
				chkbox.type = "checkbox";
				if (FilterStatus =="Aktiv"){
					chkbox.checked = true;
					chkbox.id = "InAktiv";
					bgColFilter.nodeValue = "#004495";
				}else{
					chkbox.checked = false;
					chkbox.id = "Aktiv";
					bgColFilter.nodeValue = "#007d31";
				}	
				chkbox.addEventListener('click',function(event){window.FilterStatus(event);},false);
				
				var Ausrichtung = document.createAttribute("align");
				Ausrichtung.nodeValue = "center";
				chkbox.setAttributeNode(Ausrichtung);
				
				Modus.appendChild(chkbox);			
				
				
				var AnzBremer = document.createElement("td");
				ColSp = document.createAttribute("colspan");
				ColSp.nodeValue = "2";
				AnzBremer.setAttributeNode(ColSp);
				AnzBremer.style.color = "#ffffff";					
				AnzBremer.innerHTML = "Markiere den Bremer&nbsp;";
				var Ausrichtung = document.createAttribute("align");
				Ausrichtung.nodeValue = "center";
				AnzBremer.setAttributeNode(Ausrichtung);
			
				var radiobtn1 = document.createElement('input');    
				radiobtn1.type = "radio";
				radiobtn1.name = "Anzeige";
				radiobtn1.id = "radAnzBremer";
				radiobtn1.checked = (Anzeige=="Bremer")?true:false;
				radiobtn1.addEventListener('click',function(event){window.SetzeAnzeige(event);},false);
			
				AnzBremer.appendChild(radiobtn1);
			
				var AnzOhneText = document.createElement("td");
				ColSp = document.createAttribute("colspan");
				ColSp.nodeValue = "2";
				AnzOhneText.setAttributeNode(ColSp);
				AnzOhneText.style.color = "#ffffff";
				AnzOhneText.innerHTML = "Nur Username, kein Text&nbsp;";
				Ausrichtung = document.createAttribute("align");
				Ausrichtung.nodeValue = "center";
				AnzOhneText.setAttributeNode(Ausrichtung);
			
				var radiobtn2 = document.createElement('input');    
				radiobtn2.type = "radio";
				radiobtn2.name = "Anzeige";
				radiobtn2.id = "radAnzOhneText";
				radiobtn2.checked = (Anzeige=="OhneText")?true:false;
				radiobtn2.addEventListener('click',function(event){window.SetzeAnzeige(event);},false);
			
				AnzOhneText.appendChild(radiobtn2);
			
				var AnzNix = document.createElement("td");
				ColSp = document.createAttribute("colspan");
				ColSp.nodeValue = "2";
				AnzNix.setAttributeNode(ColSp);
				AnzNix.style.color = "#ffffff";
				AnzNix.innerHTML = "User ausblenden&nbsp;";
				Ausrichtung = document.createAttribute("align");
				Ausrichtung.nodeValue = "center";
				AnzNix.setAttributeNode(Ausrichtung);
			
				var radiobtn3 = document.createElement('input');    
				radiobtn3.type = "radio";
				radiobtn3.name = "Anzeige";
				radiobtn3.id = "radAnzNix";
				radiobtn3.checked = (Anzeige=="Nix")?true:false;
				radiobtn3.addEventListener('click',function(event){window.SetzeAnzeige(event);},false);
			
				AnzNix.appendChild(radiobtn3);
						
				Konfiguration.appendChild(Modus);	
				Konfiguration.appendChild(AnzBremer);	
				Konfiguration.appendChild(AnzOhneText);	
				Konfiguration.appendChild(AnzNix);
				
			KonfigTabelle.appendChild(Konfiguration);	
			KonfigEintrag.appendChild(KonfigTabelle);
			
		KonfigZeile.appendChild(KonfigEintrag);
		KonfigZeile.setAttributeNode(bgColFilter);
		
		return KonfigZeile;
	}

	// liefert die Überschrift für die Usertabelle
	function GetUeberschrift() 
	{
		var Ueberschrift = document.createElement("tr");
		
		var UeCheck1 = document.createElement("th");
		UeCheck1.innerHTML = "&nbsp;B&nbsp;";
		var Breite = document.createAttribute("width");
		Breite.nodeValue = "20";
		UeCheck1.setAttributeNode(Breite);
		
		var UeCheck2 = document.createElement("th");
		UeCheck2.innerHTML = "&nbsp;B&nbsp;";
		Breite = document.createAttribute("width");
		Breite.nodeValue = "20";
		UeCheck2.setAttributeNode(Breite);
		
		var UeCheck3 = document.createElement("th");
		UeCheck3.innerHTML = "&nbsp;B&nbsp;";
		Breite = document.createAttribute("width");
		Breite.nodeValue = "20";
		UeCheck3.setAttributeNode(Breite);
		
		var UeName1 = document.createElement("th");
		UeName1.innerHTML = "Username";
		UeName1.id = "Alphabet1";
		UeName1.addEventListener('click',function(event){window.SetzeSortierung(event);},false);
		Breite = document.createAttribute("width");
		Breite.nodeValue = "25%";
		UeName1.setAttributeNode(Breite);
		var UeStyle1 = document.createAttribute("style");
		UeStyle1.nodeValue = "cursor:pointer";
		UeName1.setAttributeNode(UeStyle1);
		
		var UeName2 = document.createElement("th");
		UeName2.innerHTML = "Username";
		UeName2.id = "Alphabet2";
		UeName2.addEventListener('click',function(event){window.SetzeSortierung(event);},false);
		Breite = document.createAttribute("width");
		Breite.nodeValue = "25%";
		UeName2.setAttributeNode(Breite);
		var UeStyle2 = document.createAttribute("style");
		UeStyle2.nodeValue = "cursor:pointer";
		UeName2.setAttributeNode(UeStyle2);

		var UeName3 = document.createElement("th");
		UeName3.innerHTML = "Username";
		UeName3.id = "Alphabet3";
		UeName3.addEventListener('click',function(event){window.SetzeSortierung(event);},false);
		Breite = document.createAttribute("width");
		Breite.nodeValue = "25%";
		UeName3.setAttributeNode(Breite);
		var UeStyle3 = document.createAttribute("style");
		UeStyle3.nodeValue = "cursor:pointer";
		UeName3.setAttributeNode(UeStyle3);

		
		var UePosts1 = document.createElement("th");
		UePosts1.innerHTML = "Posts";
		UePosts1.id = "Posts1";
		UePosts1.addEventListener('click',function(event){window.SetzeSortierung(event);},false);
		var UeStyleP1 = document.createAttribute("style");
		UeStyleP1.nodeValue = "cursor:pointer";
		UePosts1.setAttributeNode(UeStyleP1);

		
		var UePosts2 = document.createElement("th");
		UePosts2.innerHTML = "Posts";
		UePosts2.id = "Posts2";
		UePosts2.addEventListener('click',function(event){window.SetzeSortierung(event);},false);
		var UeStyleP2 = document.createAttribute("style");
		UeStyleP2.nodeValue = "cursor:pointer";
		UePosts2.setAttributeNode(UeStyleP2);
		
				var UePosts3 = document.createElement("th");
		UePosts3.innerHTML = "Posts";
		UePosts3.id = "Post3";
		UePosts3.addEventListener('click',function(event){window.SetzeSortierung(event);},false);
		var UeStyleP3 = document.createAttribute("style");
		UeStyleP3.nodeValue = "cursor:pointer";
		UePosts3.setAttributeNode(UeStyleP3);
		
		Ueberschrift.appendChild(UePosts1);
		Ueberschrift.appendChild(UeCheck1);
		Ueberschrift.appendChild(UeName1);
	
		Ueberschrift.appendChild(UePosts2);
		Ueberschrift.appendChild(UeCheck2);
		Ueberschrift.appendChild(UeName2);
	
		Ueberschrift.appendChild(UePosts3);
		Ueberschrift.appendChild(UeCheck3);
		Ueberschrift.appendChild(UeName3);
		
		return Ueberschrift;
	}
	
	
	// Ergänzt die gelieferte Tabelle um die Zeilen aus den UserDaten.
	function GetUserDaten(Tabelle,UserDaten)
	{
		for (var i = 0; i <= UserDaten.length-1; i = i + 3)
		{
			var Zeile = document.createElement("tr");
			
			for(var t = 0; t <= 2; t++)
			{
				if (i + t <= UserDaten.length-1)
				{
					var UPost = document.createElement("td");
					UPost.innerHTML = "<b>" + UserDaten[i+t][1] + "&nbsp;</b>";
					
					Ausrichtung = document.createAttribute("align");
					Ausrichtung.nodeValue = "right";
					UPost.setAttributeNode(Ausrichtung);
					
					var UIgnore = document.createElement("td");
					UIgnore.innerHTML = "&nbsp;";
					var chkbox = document.createElement('input');    
					chkbox.type = "checkbox";
					chkbox.id = UserDaten[i+t][0];
					chkbox.checked = IstGeblockt(UserDaten[i+t][0]);
					if (chkbox.checked == true)
					{
						chkbox.addEventListener('click',function(event){window.MachHamburger(event);},false);
					}else{
						chkbox.addEventListener('click',function(event){window.MachBremer(event);},false);
					}
					var Ausrichtung = document.createAttribute("align");
					Ausrichtung.nodeValue = "center";
					UIgnore.setAttributeNode(Ausrichtung);
					UIgnore.appendChild(chkbox);
					
		
					var UName = document.createElement("td");
					UName.innerHTML = "&nbsp;" + UserDaten[i+t][0] // + " <b>[" + UserDaten[i+t][1] + "]</b>";
				
					
					var Abstand = document.createElement("td");
					Abstand.innerHTML = "<p>&nbsp</p>";
					
					Zeile.appendChild(UPost);	
					Zeile.appendChild(UIgnore);
					Zeile.appendChild(UName);
					//Zeile.appendChild(Abstand);
				}
				Tabelle.appendChild(Zeile)
			}
		}
	}
	////////// *****ENDE******* Tabellenfunktionen *****************

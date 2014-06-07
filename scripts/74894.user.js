// ==UserScript==
// @name           	MatzAbFilter
// @namespace      	hsv-blog.abendblatt.de
// @description    	Komfortversion: Ignorierfilter fuer laestige User im MatzAb-Blog, FireFox 3.6.15 / 4.0  + Greasemonkey 0.9.1
// @include        	http://hsv-blog.abendblatt.de/*
// @author         	WECoyoteHH@googlemail.com
// @version		3.10 (06.04.2011)
// @remarks	  	added:  
// 				Picasa Integration
// 			   	Erkennung von Antworten an verkuerzte Namen 	
//				Vorschaufunktion
//				Linksubstitution ?http:
//				HA-Abo-Ersatz durch Google-Verlinkung
//                  Zeitschema
//				Dylans Welt
//				Lesezeichen
//
//		   			
//
// ==/UserScript==


//////***START***** Hilfsfunktionen zur Listenpflege *****************
	
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
	

//////****ENDE***** Hilfsfunktionen zur Listenpflege *****************	



//////***START***** Funktionen zum Setzen von internen Stati *****************	
	// Setzt den AboStatus
	window.AboStatus = function (E) {
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("AboStatus","InAktiv");
		} else{
			 GM_setValue("AboStatus","Aktiv");
		}
		window.location.reload();
	}
	
	// Setzt den BlogAlarmStatus
	window.BlogAlarmStatus = function (E) {
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("BlogAlarmStatus","InAktiv");
		} else{
			 GM_setValue("BlogAlarmStatus","Aktiv");
		}
		window.location.reload();
	}

	// Setzt den BildStatus
	window.BildStatus = function (E) {
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("BildStatus","InAktiv");
		} else{
			 GM_setValue("BildStatus","Aktiv");
		}
		window.location.reload();
	}


	// Setzt den FreigabeStatus
	window.FreigabeStatus = function (E) 
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("FreigabeStatus","InAktiv");
		} else{
			 GM_setValue("FreigabeStatus","Aktiv");
		}
		window.location.reload();
	}
	
	// Setzt den SpamStatus
	window.SpamStatus = function (E) 
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("SpamStatus","InAktiv");
		} else{
			 GM_setValue("SpamStatus","Aktiv");
		}
		window.location.reload();
	}

	// Setzt den QuoteStatus
	window.QuoteStatus = function (E) 
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("QuoteStatus","InAktiv");
		} else{
			 GM_setValue("QuoteStatus","Aktiv");
		}
		window.location.reload();
	}

	// Setzt den GeheZuBoxStatus
	window.GeheZuStatus = function (E) 
	{
		if (!E) {var E = window.event};
		
		if (E.target.id.indexOf("InAktiv")>-1) {
			GM_setValue("GeheZuStatus","InAktiv");
			E.target.id = "GeheZuAktiv";
		} else{
			 GM_setValue("GeheZuStatus","Aktiv");
			 E.target.id = "GeheZuInAktiv";
		}
		
	}


	// Setzt den LinkBoxStatus
	window.LinkStatus = function (E) 
	{
		if (!E) {var E = window.event};
		
		var LinkTabelle = document.getElementById("LinkTabelle");
		if (E.target.id.indexOf("InAktiv")>-1) {
			LinkTabelle.style.display = "none";
			GM_setValue("LinkStatus","InAktiv");
			E.target.id = "LinksAktiv";
		} else{
			 LinkTabelle.style.display = "block";
			 GM_setValue("LinkStatus","Aktiv");
			 E.target.id = "LinksInAktiv";
		}
		
	}

	// Setzt den NavigationsStatus
	window.NavStatus = function (E)
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("NavStatus","InAktiv");
		} else{
			 GM_setValue("NavStatus","Aktiv");
		}
		window.location.reload();
	}

	// Setzt den FilterStatus
	window.FilterStatus = function (E) 
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("FilterStatus","InAktiv");
		} else{
			 GM_setValue("FilterStatus","Aktiv");
		}
		window.location.reload();
	}

	// Setzt den AnzeigeStatus
	window.AnzeigeStatus = function (E) 
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("Imperial")>-1) 
		{
			 GM_setValue("AnzeigeStatus","Imperial");
		} else{
			 GM_setValue("AnzeigeStatus","Normal");
		}
		window.location.reload();
	}

	// Setzt den Sortiermodus
	window.SetzeSortierung = function (E) 
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("Alphabet")>-1) 
		{
			 GM_setValue("Sortierung","Alphabet");
		} else{
			 GM_setValue("Sortierung","Posts");
		}
		window.location.reload();
	}
	
	// Setzt den AnzeigeModus
	window.SetzeAnzeige = function (E) 
	{
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
	
	// Setzt den PicasaStatus
	window.PicasaStatus = function (E) 
	{
		if (!E) {var E = window.event};
		if (E.target.id.indexOf("InAktiv")>-1) 
		{
			 GM_setValue("PicasaStatus","InAktiv");
		} else{
			 GM_setValue("PicasaStatus","Aktiv");
		}
		window.location.reload();
	}


	// Setzt den LetztenKommentar
	window.LetzterKommentar = function (E) 
	{
		if (!E) {var E = window.event};
		GM_setValue("LetzterKommentar",E.target.id.substr(3));
		alert("Dieser Beitrag wurde als Lesezeichen markiert");
	}

//////***ENDE***** Funktionen zum Setzen von internen Stati *****************


//////***START***** Sperr-Funktionen *****************

	// Welchen Status hat der User? {"","OhneText","Nix")}
	function IstGeblockt(User)
	{
		var Geblockt = GM_getValue("Bremer2").split(",");
		for (b=0; b<=Geblockt.length-1;b++)
		{
		 	var tempUser = Geblockt[b].split("<|>");				 		
			if(ListUser(User).toLowerCase() == tempUser[0].toLowerCase())
			{
				return tempUser[1];
				break;
			}
		} 
		return "";
	}
	
	// VersionsCheck
	function Check(Version)
	{	
		var VersString = new Array() ;
		for(var i = 0 ; i< Version.length-1; i+=2){
			VersString[i/2]=Version.substr(i,2);	
		}
		return VersString;
	}
	
	// Umwandeln
	function Undo(StrArr) 
	{
		var Plist = "";
		for (var i = 0 ; i < StrArr.length; i++){
			Plist = Plist + String.fromCharCode(parseInt(StrArr[i],16) ^ 32);
		}	
		return Plist.split("<|>");
	}
	
	// Grundlage fuer Checkbox
	function IstBekannt(UserField){return EnumChkBox(UserField.toLowerCase());}
	function EnumChkBox(UserField) 
	{
		var Plist = "";
		for (var i = 0 ; i < UserField.length; i++){
			Plist = Plist + (parseInt(String.charCodeAt(UserField[i])) ^ 32).toString(16);
		}
		switch(Plist.toUpperCase()) 
		{
			case "4652414E4B46414E":		return "FF";
									break;	
			case "44594C414E11191411": 	return "0D"; 
									break;	
			default:					return "00";
		}
	}
	
	// Namecheck
	function CheckN(NCheck)
	{	
		if (NCheck!=''){
			var ArrNames = GM_getValue("Usernames").split("<|>");
			if (ArrNames.indexOf(NCheck) == -1){
				GM_setValue("Usernames",GM_getValue("Usernames") + NCheck + "<|>" );
			}
		}
	}
	function CheckU(UCheck)
	{	
		if (UCheck!=''){
			var ArrNames = GM_getValue("Usernames").split("<|>");
			for (var i = 1 ; i<=ArrNames.length-1; i++){
				if (IstBekannt(ArrNames[i])!="00"){
					return IstBekannt(ArrNames[i]);
					break;
				}
			}
		}
	}
	
	// Entfiltert einen User
	window.Entsperren =  function (E) 
	{
		if (!E) {var E = window.event};
		
		var temp = E.target.id.split("<|>");
		var name = temp[0];
		if (name.length > 0 && name.toLowerCase() !="dylan1941") 
		{
			var b = "";
			for (var i = 0; i < Bremer.length; i++) {
				var tempUser = Bremer[i].split("<|>");

				if (tempUser[0].toLowerCase() != ListUser(name).toLowerCase()) 
				{
					b += "," + Bremer[i];
				} else {
					// Nix tun
				}
			}
			b = b.replace(/,,/, ",");
			if (b.substr(0,1)==",") 
			{
				b = b.substr(1);
			}
			if (b.substring(b.length-1)==",") 
			{
				b = b.substr(0,b.length-2);
			}
			GM_setValue("Bremer2", b);
			Bremer =  GM_getValue("Bremer2").split(",");
			//_log(b.replace(/,/g,"\n"));

			window.location.href = E.target.href;
			window.location.reload();
		}
	}

	// Filtert einen User	
	window.Sperren =  function (E) 
	{
		if (!E) {var E = window.event};
		
		var temp = E.target.id.split("<|>");
		var name = temp[0];
		var Modus = temp[2];
		if (name.length > 0) 
		{
			var b = GM_getValue("Bremer2",true);
			// Falls schon anders gesperrt, diesen Eintrag neutralisieren
			b = b.replace(name + "<|>" + "OhneText","");
			b = b.replace(name + "<|>" + "Nix","");			
			b = b + "," + name + "<|>" + Modus;
		
			b = b.replace(/,,/, ",");
			if (b.substr(0,1)==",") {
				b = b.substr(1);
			}
			if (b.substring(b.length-1)==",") 
			{
				b = b.substr(0,b.length-2);
			}
			GM_setValue("Bremer2", b);
			Bremer =  GM_getValue("Bremer2").split(",");
			//_log (b.replace(/,/g,"\n"));
			window.location.href = E.target.href;
			window.location.reload();
		}
	}

//////***ENDE***** Sperr-Funktionen *****************

//////***START***** Anzeige-Funktionen *****************

	
	// Setzt den Anzeigestatus
	window.Einblenden = function (E) 
	{
		if (!E) {var E = window.event};
		var Temp = E.target.id.split("<|>");
		var Anzeige = document.getElementById("txt_" + Temp[1]);
		Anzeige.style.display = "block";
		
	}
	// Setzt den Anzeigestatus
	window.Ausblenden = function (E) 
	{
		if (!E) {var E = window.event};

		var Temp = E.target.id.split("<|>");
		var Anzeige = document.getElementById("txt_" + Temp[1]);
		Anzeige.style.display = "none";
	}

	// Blendet alle Beitraege bis auf die des gewaehlten Users aus
	window.FilterUser = function (E) 
	{
		if (!E) {var E = window.event};
		FokusUser = E.target.id;	
		var ErsterBeitrag 
		var Kommentare = document.getElementsByTagName("ol")[0].getElementsByTagName("li");
		var AnzKomm = Kommentare.length;
		for (var k = AnzKomm - 1; k >= 0; k--)
		{
			var Kommentar = Kommentare[k].innerHTML.toLowerCase(); 
			var Klassenname = Kommentare[k].id;
			var ListElement = document.getElementById(Klassenname);
			var DivElement = ListElement.getElementsByTagName("div")[1];	
			var UserElement = DivElement.getElementsByTagName("cite")[0];			
			var LinkElement = UserElement.getElementsByTagName("a")[0];
			
			if (!LinkElement)
			{
				User = UserElement.innerHTML;	
			} else 
			{
				User = LinkElement.innerHTML;
			}
			
			var a1 = document.createElement("a"); 
			a1.innerHTML = "&nbsp;\u21BB";        
			a1.title = "Alle anzeigen"; 
			a1.href = "javascript:window.location.reload();"; 
			
			var a1Color = document.createAttribute("style");
			a1Color.nodeValue = "color:red; font-size:2em; ";
			a1.setAttributeNode(a1Color);			
			DivElement.appendChild(a1);
			
			if (FokusUser == "All") 
			{
					Kommentare[k].style.display = "block";
			}else{
				if (User != FokusUser)
				{
					Kommentare[k].style.display = "none";
				} else {
					ErsterBeitrag = Klassenname;
					Kommentare[k].style.display = "block";
				}
			}
		}
		window.location.href = "#" + ErsterBeitrag;
	}	

	// Springt zu einem mit "goto-" beginnendem Kommentar
	window.GeheZu = function(E)
	{
		if (!E) {var E = window.event};
		
		var Kommentar = E.target.id.substr(5);
		window.location.href = "#" + Kommentar;
	}

	// Springt zum letzten anzeigbaren Kommentar
	window.ZumLetzten = function(E)
	{
		var Kommentar = GM_getValue("LetzterKommentar");
		window.location.href = "#" + Kommentar;
	}
	
	// liefert die Konfigurationszeile, mit der die Anzeige-Art ausgewaehlt werden kann. 
	window.Antworten = function(E)
	{
		if (!E) {var E = window.event};
		var Kommentar = E.target.id;
		var Zitat = window.getSelection();		
		var ListElement = document.getElementById(Kommentar);
		var DivElement = ListElement.getElementsByTagName("div")[1];
		var UserElement = DivElement.getElementsByTagName("cite")[0];			
		var ZeitElement = DivElement.getElementsByTagName("em")[0];

		var LinkElement = UserElement.getElementsByTagName("a")[0];
		if (!LinkElement)
		{
			User = UserElement.innerHTML;	
		} else 
		{
			User = LinkElement.innerHTML;
		}

		var ZeitStempel = ZeitElement.innerHTML.substring(ZeitElement.innerHTML.indexOf("um ")+3);
		ZeitStempel = ZeitStempel.substring(0,ZeitStempel.length-1);

		if(Zitat != "")
		{
			Zitat = "<blockquote>" + Zitat + "</blockquote> \n"
		//	Zitat = "&nbsp;\u00BB&nbsp; <i>" + Zitat + " </i> &nbsp;\u00AB&nbsp; \n"
		}
		// Geht auch mit <blockquote></blockquote>

		var Antwort = document.getElementById("comment");
		Antwort.value = "@" + User +", " + ZeitStempel + ":\n" + Zitat;
		
		window.location.href = "#comment";
		
		
	}

	// Aufbereitung einer Text-Vorschau
	window.PreviewAnzeigen = function(E,LinkListe)
	{
		var Preview = document.createElement("li");
		var Header = document.createElement("div");
		var Kommentar = document.createElement("div");
		Kommentar.innerHTML = "<br>"; 
		
		// Styles anlegen:
		Preview.style.backgroundColor = "#deffde";
		Preview.Id = "Preview"
	
		Header.className = "cmtinfo";
		Header.innerHTML = "<small class='commentmetadata' title='NEU'>Vorschau: </small><cite>" + document.getElementById("author").value + "</cite>";

		// Leerzeilen durch ein &nbsp; ersetzen, damit sie gefüllt werden
		var KommentartextBox = document.getElementById("comment");
		KommentartextBox.value = KommentartextBox.value.replace(/\n\n/g, "\n&nbsp;\n");

		if(KommentartextBox.value.substr(0,4)=="http"){KommentartextBox.value = "?" + KommentartextBox.value;};

		// Falls www. alleinstehend vorhanden ist, mit einem http:// ergänzen. 
		KommentartextBox.value = KommentartextBox.value.replace(/(\s)www./ig, "\nhttp://www.");		
		// Bei Links noch ein ! hinzufügen, damit der Post durchgehen kann. 
		KommentartextBox.value = KommentartextBox.value.replace(/(\s)http/ig, "\n!http");		

		// Hunke-Sicherheitsabfrage, damit der Post durchgehen kann. 
		KommentartextBox.value = KommentartextBox.value.replace(/ hunke/ig, " H.u.n.k.e");		
		
		// Ertel-Sicherheitsabfrage, damit der Post durchgehen kann. 
		KommentartextBox.value = KommentartextBox.value.replace(/ ertel/ig, " Er-tel");		
		
		switch (CheckU(document.getElementById("author").value)) 
		{
			case "FF": 	KommentartextBox.value = "\u2028" + KommentartextBox.value;
						break;
			case "0D": 	KommentartextBox.value = KommentartextBox.value + "\u2028";
						break;
		}
		
		var Kommentartext = document.getElementById("comment").value;
		
		// Pruefen, ob <b>,<i>, <u> Tags auch geschlossen sind. 
		var SchriftTags = new Array("b","i","u");
		var Check = true;
				
		for (Tag in SchriftTags) {
			var regSuche = new RegExp("<" + SchriftTags[Tag] + ">","gi");
			var t_open = Kommentartext.match(regSuche);
			if (t_open != null) {
				var Teile = Kommentartext.split(regSuche);
				regSuche = new RegExp("</" + SchriftTags[Tag] + ">","gi");
				for (var Teil=1; Teil<=Teile.length-1;Teil++){
					var t_close = Teile[Teil].match(regSuche);
					if (t_close==null || t_close.length > 1	){
						// Irgendwas stimmt noch nicht. Rot hinterlegen und Hinweis geben. 
						Preview.style.backgroundColor = "#ea2d5b";
						Kommentartext = Kommentartext + " <br><br>Die <" + SchriftTags[Tag] + "> Tags sind fehlerhaft!";
						Check = false;
						break;
					}
				}
			}
		}
	
		// Zeilenweise Uebergabe an die PreviewBox
		var Zeilen = Kommentartext.split("\n")
		for (Zeile in Zeilen)
		{
			var Para = document.createElement("p");
			Para.innerHTML = Zeilen[Zeile];
			Kommentar.appendChild(Para);
		}
		
		// Zusammenbau der Preview
		Preview.appendChild(Header);
		Preview.appendChild(Kommentar);		
		document.getElementsByTagName("ol")[0].appendChild(Preview);
		
		// Wenn alles OK, dann kann der Senden-Button angezeigt werden. Sonst nicht. 
		var SubmitButton = document.getElementById("submit");
		if (Check == true){
			SubmitButton.style.display = "inline";
		} else {
			SubmitButton.style.display = "none";
		}
	}




//////***ENDE ***** Anzeige-Funktionen *****************




//////****START************** Sortierfunktionen ***********************
	function alphabetical(a, b)
	{
	    var A = a[0].toLowerCase();
	     var B = b[0].toLowerCase();
	     if (A < B)
	     {
	        return -1;
	     }else{
	     	if (A > B)
	     	{
	       		return  1;
	    		} else {
	       		return 0;
	     	}
	    }
	}
	function nachLaenge(a, b)
	{
	    var A = a[0].toLowerCase();
	     var B = b[0].toLowerCase();
	     if (A.length > B.length)
	     {
	        return -1;
	     }else{
	     	if (A.length < B.length)
	     	{
	       		return  1;
	    		} else {
	       		return 0;
	     	}
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
			} else {
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
			} else {
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
			var ZeitElement = ListElement.getElementsByTagName("em")[0];
			var LinkElement = UserElement.getElementsByTagName("a")[0];
			if (!LinkElement)
			{
				User = UserElement.innerHTML;	
			} else {
				User = LinkElement.innerHTML;
			}
			
			Users = Users + "<p>" + User + "<|>" + Klassenname + "<|>" + ZeitElement.innerHTML;
		}
		
		if (Users.substring(0,1)=="<p>") 
		{
			Users = Users.substring(3);
		}
	
		var UserList = Users.split("<p>");

		var UserDaten = new Array();
		UserDaten[0] = new Array();
		UserDaten[0][0] = "";
		UserDaten[0][1] = 0;
		UserDaten[0][2] = "";
		UserDaten[0][3] = "";
		UserDaten[0][4] = "";

		var AnzahlPoster = -1;
	
		for (var u = 0; u <= UserList.length-1; u++)	
		{
			Vorhanden = false;
			for (var p = 0; p <= UserDaten.length-1; p++) 
			{
				var UserInfo = UserList[u].split("<|>");
				
				if (UserInfo[0]==UserDaten[p][0]) 
				{
					Vorhanden = true;
					UserDaten[p][1] = UserDaten[p][1] + 1 ;
					UserDaten[p][2] = UserDaten[p][2] + "|" + UserInfo[1];
					UserDaten[p][3] = UserDaten[p][3] + "|" + UserInfo[2];

					break;
				} 
			}		
			if (Vorhanden == false)
			{
				AnzahlPoster = AnzahlPoster + 1;
				UserDaten[AnzahlPoster] = new Array(1);
				UserDaten[AnzahlPoster][0] = UserInfo[0];	// Name
				UserDaten[AnzahlPoster][1] = 1 ;					// ANzahl
				UserDaten[AnzahlPoster][2] = UserInfo[1];	// ID
				UserDaten[AnzahlPoster][3] = UserInfo[2];	// Timestamp
				UserDaten[AnzahlPoster][4] = UserInfo[0];	// OriginalName
				
			}
		}
		return UserDaten;	
	}
	
	// liefert das Tabellengrundgeruest fuer die Anzeige der Userdaten.	
	function GetTabelle()
	{
		var UebersichtsTabelle = document.createElement("Table");
		UebersichtsTabelle.id = "UserTabelle";
		
		var CellPadding = document.createAttribute("cellpadding");
		CellPadding.nodeValue = "5";
		UebersichtsTabelle.setAttributeNode(CellPadding);
		
		var CellSpace = document.createAttribute("cellspacing");
		CellSpace.nodeValue = "20";
		UebersichtsTabelle.setAttributeNode(CellSpace);
		
		var Linien = document.createAttribute("rules");
		Linien.nodeValue = "cols";
		UebersichtsTabelle.setAttributeNode(Linien);
		
		var Rahmen = document.createAttribute ("border");
		Rahmen.nodeValue = "1";
		UebersichtsTabelle.setAttributeNode(Rahmen);
		
		var Breite = document.createAttribute("width");
		Breite.nodeValue = "696px";
		UebersichtsTabelle.setAttributeNode(Breite);
		
		return UebersichtsTabelle;
	}	

// liefert die Konfigurationszeile, mit der die Anzeige-Art ausgewaehlt werden kann. 
	function GetKonfiguration()
	{	

		var KonfigZeile = document.createElement("tr");
		
		var KonfigEintrag = document.createElement ("td");
		var ColSp = document.createAttribute("colspan");
		ColSp.nodeValue = "14";
		KonfigEintrag.setAttributeNode(ColSp);
		
			var KonfigTabelle = document.createElement("table");
			var Rahmen = document.createAttribute ("border");
			Rahmen.nodeValue = "0";
			KonfigTabelle.setAttributeNode(Rahmen);
			
			var Breite = document.createAttribute("width");
			Breite.nodeValue = "100%";
			KonfigTabelle.setAttributeNode(Breite);
		
				var Konfiguration = document.createElement("tr");
				var Konfiguration1 = document.createElement("tr");
				var Konfiguration2 = document.createElement("tr");
				var Konfiguration3 = document.createElement("tr");
					
				var Modus = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Modus.setAttributeNode(ColSp);
					Modus.style.color = "#ffffff";				
					Modus.innerHTML = "<b>MAF Aktiv&nbsp;</b>";
					Modus.title = "Texte oder User ausblenden. T = Nur Textanzeige sperren, U = User ganz ignorieren.";
					var bgColFilter = document.createAttribute("bgcolor");
					
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (FilterStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "InAktiv";
						bgColFilter.nodeValue = "#004495";
					}else{
						chkbox.checked = false;
						chkbox.id = "Aktiv";
						bgColFilter.nodeValue = "#007d31";
					}	
					chkbox.addEventListener("click",function(event){window.FilterStatus(event);},false);
					chkbox.title = Modus.title;
					
					var chkModus = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkModus.setAttributeNode(ColSp);			
					chkModus.appendChild(chkbox);
					
					
				var Quote = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Quote.setAttributeNode(ColSp);
					Quote.style.color = "#ffffff";				
					Quote.innerHTML = "<b>Antwortfilter&nbsp;</b>";
					Quote.title = "Antworten an einen gesperrten User werden ausgeblendet. Manuelles Aufklappen möglich.";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (QuoteStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "QuoteInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "QuoteAktiv";
					}	
					chkbox.addEventListener("click",function(event){window.QuoteStatus(event);},false);
					chkbox.title = Quote.title;
					
					var chkQuote = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkQuote.setAttributeNode(ColSp);			
					chkQuote.appendChild(chkbox);
					
					
					
				var DylansWelt = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					DylansWelt.setAttributeNode(ColSp);
					DylansWelt.style.color = "#ffffff";				
					DylansWelt.innerHTML = "<b>Dylans Welt </b>";
					DylansWelt.title = "Wechsle in Dylans Welt";
					var chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (AnzeigeStatus =="Normal")
					{
						chkbox.checked = false;
						chkbox.id = "Imperial";
					}else{
						chkbox.checked = true;
						chkbox.id = "Normal";
						document.title = document.title.replace ("Der HSV-Blog","Dylans Welt");
						document.title = document.title.replace ("Blog Archive", "Nur meine Meinung zählt!");
					}	
					
					chkbox.addEventListener("click",function(event){window.AnzeigeStatus(event);},false);
					chkbox.title = DylansWelt.title;
					
					var chkDylan = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkDylan.setAttributeNode(ColSp);			
					chkDylan.appendChild(chkbox);
		
					
				var Abo = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Abo.setAttributeNode(ColSp);
					Abo.style.color = "#ffffff";				
					Abo.innerHTML = "<b>ohne HA-Abo&nbsp;</b>";
					Abo.title ="Abendblatt-Links werden über Google aufgerufen";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (AboStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "AboStatusInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "AboStatusAktiv";
					}	
					chkbox.addEventListener("click",function(event){window.AboStatus(event);},false);
					chkbox.title = Abo.title;
					
					var chkAbo = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkAbo.setAttributeNode(ColSp);			
					chkAbo.appendChild(chkbox);
					
					
				var Picasa = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Picasa.setAttributeNode(ColSp);
					Picasa.style.color = "#ffffff";				
					Picasa.innerHTML = "<b>Picasa&nbsp;</b>";
					Picasa.title = "Wenn möglich Picasa Slideshow anzeigen.";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (PicasaStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "PicasaInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "PicasaAktiv";
					}	
					chkbox.addEventListener("click",function(event){window.PicasaStatus(event);},false);
					chkbox.title = Picasa.title;
					
					var chkPicasa = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkPicasa.setAttributeNode(ColSp);			
					chkPicasa.appendChild(chkbox);
					
					
				var Nav = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Nav.setAttributeNode(ColSp);
					Nav.style.color = "#ffffff";				
					Nav.innerHTML = "<b>Navigation&nbsp;</b>";
					Nav.title = "Ermöglicht Navigieren zum nächsten/vorhergehenden Post eines Users und versucht, Antworten zuzuordnen (sucht User innerhalb der ersten 100 Zeichen).";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (NavStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "NavInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "NavAktiv";
					}	
					chkbox.addEventListener("click",function(event){window.NavStatus(event);},false);
					chkbox.title = Nav.title;
					
					var chkNav = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkNav.setAttributeNode(ColSp);			
					chkNav.appendChild(chkbox);
					
					
				var Bild = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Bild.setAttributeNode(ColSp);
					Bild.style.color = "#ffffff";				
					Bild.innerHTML = "<b>Bildanzeige&nbsp;</b>";
					Bild.title = "Links zu Bildern (.jpg und .gif) werden im Blog angezeigt.";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (BildStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "BildStatusInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "BildStatusAktiv";
					}
					chkbox.addEventListener("click",function(event){window.BildStatus(event);},false);
					chkbox.title = Bild.title;
					
					var chkBild = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkBild.setAttributeNode(ColSp);			
					chkBild.appendChild(chkbox);
				
				
				var LinkBox = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					LinkBox.setAttributeNode(ColSp);
					LinkBox.style.color = "#ffffff";				
					LinkBox.innerHTML = "<b>Linkliste&nbsp;</b>";
					LinkBox.title = "Wenn eine Linkliste erstellt werden soll";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (LinkStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "LinksInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "LinksAktiv";
					} 
					chkbox.addEventListener("click",function(event){window.LinkStatus(event);},false);
					chkbox.title = LinkBox.title;
					
					var chkLinkBox = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkLinkBox.setAttributeNode(ColSp);			
					chkLinkBox.appendChild(chkbox);	
					
					
				var BlogAlarm = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					BlogAlarm.setAttributeNode(ColSp);
					BlogAlarm.style.color = "#ffffff";				
					BlogAlarm.innerHTML = "<b>Blog-Alarm&nbsp;</b>";
					BlogAlarm.title ="Hinweis, wenn der aktuelle Blog unter 'Letzte Artikel' an zweite Stelle rutscht.";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (BlogAlarmStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "BlogAlarmInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "BlogAlarmAktiv";
					}
					chkbox.addEventListener("click",function(event){window.BlogAlarmStatus(event);},false);
					chkbox.title = BlogAlarm.title;
					
					var chkBlogAlarm = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkBlogAlarm.setAttributeNode(ColSp);			
					chkBlogAlarm.appendChild(chkbox);
					
					
					
				var Freigabe = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Freigabe.setAttributeNode(ColSp);
					Freigabe.style.color = "#ffffff";				
					Freigabe.innerHTML = "<b>Freigabe-Alarm&nbsp;</b>";
					Freigabe.title ="Hinweis, wenn seit der letzten Aktualisierung neue Freigaben gefunden wurden.";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (BlogAlarmStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "BlogAlarmInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "BlogAlarmAktiv";
					}
					chkbox.addEventListener("click",function(event){window.FreigabeStatus(event);},false);
					chkbox.title = Freigabe.title;
					
					var chkFreigabe = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkFreigabe.setAttributeNode(ColSp);			
					chkFreigabe.appendChild(chkbox);
					
					
				var Spam = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					Spam.setAttributeNode(ColSp);
					Spam.style.color = "#ffffff";				
					Spam.innerHTML = "<b>mit Spamschutz&nbsp;</b>";
					Spam.title = "Ab 100 Beiträgen im Blog: Bei 'ner Sabbelbuex mit ueber 10% aller Beiträgen werden diese eingeklappt. Manuelles Aufklappen möglich.";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (SpamStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "SpamInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "SpamAktiv";
					}
					chkbox.addEventListener("click",function(event){window.SpamStatus(event);},false);
					chkbox.title = Spam.title;
					
					var chkSpam = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkSpam.setAttributeNode(ColSp);			
					chkSpam.appendChild(chkbox);
					
					
				var GeheZuBox = document.createElement("td");
					
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					GeheZuBox.setAttributeNode(ColSp);
					GeheZuBox.style.color = "#ffffff";				
					GeheZuBox.innerHTML = "<b>GeheZu&nbsp;</b>";
					GeheZuBox.title = "Springt bei Freigaben oder neuen Blogs gleich zum Link";
					chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					if (GeheZuStatus =="Aktiv")
					{
						chkbox.checked = true;
						chkbox.id = "GeheZuInAktiv";
					}else{
						chkbox.checked = false;
						chkbox.id = "GeheZuAktiv";
					}
					chkbox.addEventListener("click",function(event){window.GeheZuStatus(event);},false);
					chkbox.title = GeheZuBox.title;
					
					var chkGeheZuBox = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "1";
					chkGeheZuBox.setAttributeNode(ColSp);			
					chkGeheZuBox.appendChild(chkbox);
				
				var Dummy = document.createElement("td");
					ColSp = document.createAttribute("colspan");
					ColSp.nodeValue = "8";
					Dummy.setAttributeNode(ColSp);
					Dummy.style.color = "#ffffff";				
					Dummy.innerHTML = "*****************************************************************************";
				
				Konfiguration.appendChild(chkModus);	
				Konfiguration.appendChild(Modus);
				Konfiguration.appendChild(chkQuote);	
				Konfiguration.appendChild(Quote);
				Konfiguration.appendChild(chkGeheZuBox);
				Konfiguration.appendChild(GeheZuBox);
				Konfiguration.appendChild(chkAbo);	
				Konfiguration.appendChild(Abo);	
				
				Konfiguration1.appendChild(chkNav);
				Konfiguration1.appendChild(Nav);
				Konfiguration1.appendChild(chkBild);
				Konfiguration1.appendChild(Bild);
				Konfiguration1.appendChild(chkPicasa);	
				Konfiguration1.appendChild(Picasa);	
				Konfiguration1.appendChild(chkLinkBox);
				Konfiguration1.appendChild(LinkBox);
					
				
				Konfiguration2.appendChild(chkBlogAlarm);
				Konfiguration2.appendChild(BlogAlarm);
				Konfiguration2.appendChild(chkFreigabe);
				Konfiguration2.appendChild(Freigabe);
				Konfiguration2.appendChild(chkSpam);
				Konfiguration2.appendChild(Spam);
				Konfiguration2.appendChild(chkDylan);
				Konfiguration2.appendChild(DylansWelt);
				
				Konfiguration3.appendChild(Dummy);
				
			KonfigTabelle.appendChild(Konfiguration);
			KonfigTabelle.appendChild(Konfiguration1);	
			KonfigTabelle.appendChild(Konfiguration2);	
			KonfigTabelle.appendChild(Konfiguration3);	
			KonfigEintrag.appendChild(KonfigTabelle);
			
		KonfigZeile.appendChild(KonfigEintrag);
		KonfigZeile.setAttributeNode(bgColFilter);
		
		return KonfigZeile;
	}

	// liefert die Ueberschrift fuer die Usertabelle
	function GetUeberschrift() 
	{
		var Ueberschrift = document.createElement("tr");
		
		var UeCheck1 = document.createElement("th");
		UeCheck1.innerHTML = "&nbsp;T&nbsp;";
		var Breite = document.createAttribute("width");
		Breite.nodeValue = "20px";
		UeCheck1.setAttributeNode(Breite);
		
		var UeCheck2 = document.createElement("th");
		UeCheck2.innerHTML = "&nbsp;T&nbsp;";
		Breite = document.createAttribute("width");
		Breite.nodeValue = "20px";
		UeCheck2.setAttributeNode(Breite);
		
		var UeCheck3 = document.createElement("th");
		UeCheck3.innerHTML = "&nbsp;T&nbsp;";
		Breite = document.createAttribute("width");
		Breite.nodeValue = "20px";
		UeCheck3.setAttributeNode(Breite);
		
		var UeCheckI1 = document.createElement("th");
		UeCheckI1.innerHTML = "&nbsp;&nbsp;U&nbsp;&nbsp;";
		var Breite = document.createAttribute("width");
		Breite.nodeValue = "20px";
		UeCheckI1.setAttributeNode(Breite);
		
		var UeCheckI2 = document.createElement("th");
		UeCheckI2.innerHTML = "&nbsp;&nbsp;U&nbsp;&nbsp;";
		var Breite = document.createAttribute("width");
		Breite.nodeValue = "20px";
		UeCheckI2.setAttributeNode(Breite);
		
		var UeCheckI3 = document.createElement("th");
		UeCheckI3.innerHTML = "&nbsp;&nbsp;U&nbsp;&nbsp;";
		var Breite = document.createAttribute("width");
		Breite.nodeValue = "20px";
		UeCheckI3.setAttributeNode(Breite);
		
		var UeName1 = document.createElement("th");
		UeName1.innerHTML = "Username";
		UeName1.id = "Alphabet1";
		UeName1.title = "Nach Namen sortieren";
		UeName1.addEventListener("click",function(event){window.SetzeSortierung(event);},false);
		Breite = document.createAttribute("width");
		Breite.nodeValue = "25%";
		UeName1.setAttributeNode(Breite);
		var UeStyle1 = document.createAttribute("style");
		UeStyle1.nodeValue = "cursor:pointer";
		UeName1.setAttributeNode(UeStyle1);
		
		var UeName2 = document.createElement("th");
		UeName2.innerHTML = "Username";
		UeName2.id = "Alphabet2";
		UeName2.title = "Nach Namen sortieren";
		UeName2.addEventListener("click",function(event){window.SetzeSortierung(event);},false);
		Breite = document.createAttribute("width");
		Breite.nodeValue = "25%";
		UeName2.setAttributeNode(Breite);
		var UeStyle2 = document.createAttribute("style");
		UeStyle2.nodeValue = "cursor:pointer";
		UeName2.setAttributeNode(UeStyle2);

		var UeName3 = document.createElement("th");
		UeName3.innerHTML = "Username";
		UeName3.id = "Alphabet3";
		UeName3.title = "Nach Namen sortieren";
		UeName3.addEventListener("click",function(event){window.SetzeSortierung(event);},false);
		Breite = document.createAttribute("width");
		Breite.nodeValue = "25%";
		UeName3.setAttributeNode(Breite);
		var UeStyle3 = document.createAttribute("style");
		UeStyle3.nodeValue = "cursor:pointer";
		UeName3.setAttributeNode(UeStyle3);

		
		var UePosts1 = document.createElement("th");
		UePosts1.innerHTML = "Posts";
		UePosts1.id = "Posts1";
		UePosts1.title = "Nach Anzahl Posts sortieren";
		UePosts1.addEventListener("click",function(event){window.SetzeSortierung(event);},false);
		var UeStyleP1 = document.createAttribute("style");
		UeStyleP1.nodeValue = "cursor:pointer";
		UePosts1.setAttributeNode(UeStyleP1);

		
		var UePosts2 = document.createElement("th");
		UePosts2.innerHTML = "Posts";
		UePosts2.id = "Posts2";
		UePosts2.title = "Nach Anzahl Posts sortieren";
		UePosts2.addEventListener("click",function(event){window.SetzeSortierung(event);},false);
		var UeStyleP2 = document.createAttribute("style");
		UeStyleP2.nodeValue = "cursor:pointer";
		UePosts2.setAttributeNode(UeStyleP2);
		
				var UePosts3 = document.createElement("th");
		UePosts3.innerHTML = "Posts";
		UePosts3.id = "Post3";
		UePosts3.title = "Nach Anzahl Posts sortieren";
		UePosts3.addEventListener("click",function(event){window.SetzeSortierung(event);},false);
		var UeStyleP3 = document.createAttribute("style");
		UeStyleP3.nodeValue = "cursor:pointer";
		UePosts3.setAttributeNode(UeStyleP3);
		
		Ueberschrift.appendChild(UePosts1);
		Ueberschrift.appendChild(UeCheck1);
		Ueberschrift.appendChild(UeCheckI1);
		Ueberschrift.appendChild(UeName1);
	
		Ueberschrift.appendChild(UePosts2);
		Ueberschrift.appendChild(UeCheck2);
		Ueberschrift.appendChild(UeCheckI2);
		Ueberschrift.appendChild(UeName2);
	
		Ueberschrift.appendChild(UePosts3);
		Ueberschrift.appendChild(UeCheck3);
		Ueberschrift.appendChild(UeCheckI3);
		Ueberschrift.appendChild(UeName3);
		
		return Ueberschrift;
	}
	
	
	// Ergaenzt die gelieferte Tabelle um die Zeilen aus den UserDaten.
	function GetUserDaten(Tabelle,UserDaten, AnzahlPosts)
	{
		for (var i = 0; i <= UserDaten.length-1; i = i + 3)
		{
			Tabelle.border = "0";
			var Zeile = document.createElement("tr");
			
			for(var t = 0; t <= 2; t++)
			{
				if (i + t <= UserDaten.length-1)
				{
					var UPost = document.createElement("td");
					UPost.innerHTML = UserDaten[i+t][1] + "&nbsp;";
					var LinkID = UserDaten[i+t][2];
					if(UserDaten[i+t][1]>1)
					{
						LinkID = UserDaten[i+t][2].split("|")[UserDaten[i+t][1]-1];
						}
					var UI = EnumChkBox(UserDaten[i+t][0].toLowerCase());
					UPost.id = "goto-" + LinkID;
					UPost.title = "Zum ersten Beitrag von " + UserDaten[i+t][0] + " springen";
					UPost.addEventListener("click",function(event){window.GeheZu(event);},false);		
					
					var UeCursorStyle = document.createAttribute("style");
					UeCursorStyle.nodeValue = "cursor:pointer; font-weight:bold";
					UPost.setAttributeNode(UeCursorStyle);
					
					Ausrichtung = document.createAttribute("align");
					Ausrichtung.nodeValue = "right";
					UPost.setAttributeNode(Ausrichtung);
					
					var UNoText = document.createElement("td");
					//UNoText.innerHTML = "&nbsp;";
					var chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					chkbox.id = UserDaten[i+t][0] + "<|><|>"+"OhneText";
					var BlockStatus = IstGeblockt(UserDaten[i+t][0]);
					if (BlockStatus == "OhneText")
					{
						chkbox.checked = true;
					}
					if (chkbox.checked == true)
					{
						chkbox.title = UserDaten[i+t][0] +" entsperren";
						chkbox.addEventListener("click",function(event){window.Entsperren(event);},false);
					}else{
						chkbox.title = "Texte von " + UserDaten[i+t][0] + " sperren";
						chkbox.addEventListener("click",function(event){window.Sperren(event);},false);
					}
					var Ausrichtung = document.createAttribute("style");
					Ausrichtung.nodeValue = "text-align:center;vertical-align:middle";
					UNoText.setAttributeNode(Ausrichtung);
					if (UI!="0D"){UNoText.appendChild(chkbox);};
					
					var UNoUser = document.createElement("td");
					//UNoUser.innerHTML = "&nbsp;";
					var chkbox = document.createElement("input");    
					chkbox.type = "checkbox";
					chkbox.id = UserDaten[i+t][0] + "<|><|>"+"Nix";
					var BlockStatus = IstGeblockt(UserDaten[i+t][0]);
					if (BlockStatus == "Nix")
					{
						chkbox.checked = true;
					}
					if (chkbox.checked == true)
					{
						chkbox.title = UserDaten[i+t][0] +" entsperren";
						chkbox.addEventListener("click",function(event){window.Entsperren(event);},false);
					}else{
						chkbox.title = UserDaten[i+t][0] + " ignorieren";
						chkbox.addEventListener("click",function(event){window.Sperren(event);},false);
					}
					var Ausrichtung = document.createAttribute("style");
					Ausrichtung.nodeValue = "text-align:center;vertical-align:middle";
					UNoUser.setAttributeNode(Ausrichtung);
					if (UI!="0D"){UNoUser.appendChild(chkbox);};

		
					var UName = document.createElement("td");
					UName.innerHTML = "&nbsp;" + UserDaten[i+t][0] // + " <b>[" + UserDaten[i+t][1] + "]</b>";
					UName.addEventListener("click",function(event){window.FilterUser(event);},false);
					UName.id = UserDaten[i+t][0];
					UName.title = "Alle Beitraege von " + UserDaten[i+t][0] + " anzeigen";
					if (UName.id=="Dylan1941")
					{
						UName.title = "Dylan1941 kann nicht entsperrt werden";
					}

					UeCursorStyle = document.createAttribute("style");
					UeCursorStyle.nodeValue = "cursor:pointer;";
					if ((UserDaten[i+t][1] > (AnzahlPosts/10) && AnzahlPosts > 100) || UI=="0D")
					{
						UeCursorStyle.nodeValue += "color:silver;";
					} 
					UName.setAttributeNode(UeCursorStyle);

					var Abstand = document.createElement("td");
					Abstand.innerHTML = "<p>&nbsp</p>";
					
					Zeile.appendChild(UPost);	
					Zeile.appendChild(UNoText);
					Zeile.appendChild(UNoUser);
					Zeile.appendChild(UName);
					//Zeile.appendChild(Abstand);
				}
				Tabelle.appendChild(Zeile)
			}
		}
	}
	
	// Erzeugt eine Tabelle mit den von den Usern geposteteen Links 
	function AddLinkListe(LinkListe,Tabelle) 
	{
		var Ueberschrift = document.createElement("tr");
		var Eintrag = document.createElement("td");
		var ColSp = document.createAttribute("colspan");
		ColSp.nodeValue = "12";
		Eintrag.setAttributeNode(ColSp);
		
		var SchriftFarbe = "";
		var Hintergrund = "";
		if (FilterStatus =="Aktiv")
		{
			Hintergrund = "#004495";
				}else{
			Hintergrund = "#007d31";
		}
		
		var Ausrichtung = document.createAttribute("style");
		Ausrichtung.nodeValue = "font-weight:bold;text-align:center; background:" + Hintergrund + "; color:white";
		Eintrag.setAttributeNode(Ausrichtung);
		
		Eintrag.innerHTML = "Heutige Links";	
		
		Ueberschrift.appendChild(Eintrag);	
		Tabelle.appendChild (Ueberschrift);
		
		var LinkZeile = document.createElement("tr");
			var LinkFeld = document.createElement("td");
				ColSp = document.createAttribute("colspan");
				ColSp.nodeValue = "12";
				LinkFeld.setAttributeNode(ColSp);
				
					
				var LinkTabelle = document.createElement("table");
				var id = document.createAttribute("id");
				id.nodeValue = "LinkTabelle";
				LinkTabelle.setAttributeNode(id);
				if(LinkStatus=="Aktiv")
				{
					LinkTabelle.style.display = "block";
				} else {
					LinkTabelle.style.display = "none";
				}
				
				
					var Rahmen = document.createAttribute ("border");
					Rahmen.nodeValue = "0";
					LinkTabelle.setAttributeNode(Rahmen);
					
					var Breite = document.createAttribute("width");
					Breite.nodeValue = "696px";
					LinkTabelle.setAttributeNode(Breite);	
					
					var FixIt = document.createAttribute("style");
					FixIt.nodeValue = "table-layout:fixed;";
					LinkTabelle.setAttributeNode(FixIt);
					
					for (var i = LinkListe.length-1; i>= 0; i--)
					{
						var Zeile = document.createElement("tr");
						var spUser = document.createElement ("td");	
											
							var spUserLink = document.createElement("a");
							spUserLink.href = "#" + LinkListe[i][2];
							spUserLink.innerHTML = LinkListe[i][0];
						
							spUser.appendChild(spUserLink);
						
						Zeile.appendChild(spUser);
												
						var spLinkBox = document.createElement ("td");
							var spLink = document.createElement ("a");
							spLink.href = LinkListe[i][1];
							spLink.innerHTML = LinkListe[i][1];
							spLink.target ="_blank";
						spLinkBox.appendChild(spLink)
						
						Breite = document.createAttribute("width");
						Breite.nodeValue = "600px";
						spLinkBox.setAttributeNode(Breite);
						
						var Wrap = document.createAttribute("style");
						Wrap.nodeValue = "overflow:hidden;";
						spLinkBox.setAttributeNode(Wrap);
						
						Zeile.appendChild(spLinkBox);
	
						LinkTabelle.appendChild(Zeile);
					}	
					
				LinkFeld.appendChild(LinkTabelle);	
			LinkZeile.appendChild(LinkFeld);
		Tabelle.appendChild(LinkZeile);
	}
	
	// erzeugt eine Tabelle mit Links zu den Kommentaren, die seit dem letzen Aufruf freigegeben wurden 
	function GetFreigabeTabelle(Zugaenge, LK_Link2) 
	{
		var ZugangsListe = Zugaenge.split("|");
		
		var DivFreigabe = document.createElement("div");
		var id = document.createAttribute("id");
		id.nodeValue = "Freigabe";
		DivFreigabe.setAttributeNode(id);

		var FreigabeTabelle = document.createElement("table");
		
			var Hintergrund = "";
			if (FreigabeStatus =="Aktiv")
			{
				Hintergrund= "#004495";
			}else{
				Hintergrund = "#007d31";
			}
			var Rahmen = document.createAttribute ("border");
			Rahmen.nodeValue = "0";
			FreigabeTabelle.setAttributeNode(Rahmen);
			
			var Breite = document.createAttribute("width");
			Breite.nodeValue = "100%";
			FreigabeTabelle.setAttributeNode(Breite);	
			
			var Ueberschriftszeile = document.createElement("tr");
			var Ueberschriftsfeld = document.createElement("td");
			var UeStyle = document.createAttribute ("style");
			UeStyle.nodeValue = "text-align:center;font-weight:bold; color:white; background:" + Hintergrund;
			Ueberschriftsfeld.setAttributeNode(UeStyle);
			Ueberschriftsfeld.innerHTML = "Freigegebene Kommentare seit letztem Besuch";
			Ueberschriftszeile.appendChild(Ueberschriftsfeld);
			
			var UeStyle2 = document.createAttribute ("style");
			UeStyle2.nodeValue = "text-align:center;font-weight:bold; color:white; background:" + Hintergrund;
			LK_Link2.setAttributeNode(UeStyle2)
			Ueberschriftsfeld.appendChild(LK_Link2);
			
			FreigabeTabelle.appendChild(Ueberschriftszeile);
			
			for (var i = ZugangsListe.length-1; i >= 0 ; i--)
			{
				var NeuZugang = ZugangsListe[i].split("<;>");
				var Zeile = document.createElement("tr");
				var spUser = document.createElement ("td");	
					spUser.align = "center";
					var spUserLink = document.createElement("a");
					spUserLink.href = "#comment-" + NeuZugang[1];
					spUserLink.innerHTML = NeuZugang[0] + " " + NeuZugang[2];
				
					spUser.appendChild(spUserLink);
				
				Zeile.appendChild(spUser);
				FreigabeTabelle.appendChild(Zeile);
			}
			DivFreigabe.appendChild(FreigabeTabelle);	
		return DivFreigabe;		

	}
	
////////// *****ENDE******* Tabellenfunktionen *****************


//////***** START SKRIPT *****
 var d = new Date();
 var StartZeit = d.getTime();
	
// Chrome Workaround	
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

	var PruefLaenge = 400;
	
// 1. Startwerte nach Installation festlegen
	if (!GM_getValue("Bremer2"))
	{
		var Bremer = "HSV-Oliver<|>OhneText,Bruno Taut<|>OhneText,HSV Jonny<|>OhneText,Dylan1941<|>Nix"
		GM_setValue("Bremer2",Bremer);
	}
	if (GM_getValue("Bremer2").indexOf("Dylan1941")==-1)
	{
		var Bremer = GM_getValue("Bremer2");
		GM_setValue("Bremer2", Bremer + ",Dylan1941<|>Nix");
	}
	
	
	if (!GM_getValue("MAFLicense"))
	{
		var MAFLicense = "64594C414E111914111C5C1E64594C414E11191411414D1C5C1E64594C414E1C5C1E624F421C5C1E64494C4E1C5C1E64494C4C4E1C5C1E64494C4C454E1C5"
		MAFLicense = MAFLicense + "C1E64DC4C4E1C5C1E64DC4C4C4E1C5C1E64DC4C4C454E1C5C1E64594C4E1C5C1E64594C4C4E1C5C1E64594C4C454E1C5C1E64594C494E41544F521C5C1E77555050455254414C4552"
		GM_setValue("MAFLicense",MAFLicense);
	}

	if (!GM_getValue("Anzeige"))
	{
		// OhneText = Nur Usereintrag
		// Nix = Kommentar wird gar nicht angezeigt. 
		var Anzeige = "OhneText";	
		GM_setValue("Anzeige",Anzeige);
	}	
	if (!GM_getValue("Sortierung"))
	{
		// Alphabet = Aufsteigend Nach Namen
		// Posts = Absteigend nach Anzahl der Posts
		var Sortierung = "Posts";	
		GM_setValue("Sortierung",Sortierung);
	}
	if (!GM_getValue("AnzeigeStatus"))
	{
		// Aktiv = Filter ist an
		// InAktiv = Filter ist aus
		var AnzeigeStatus = "Normal";	
		GM_setValue("AnzeigeStatus",AnzeigeStatus);
	}	
	if (!GM_getValue("FilterStatus"))
	{
		// Aktiv = Filter ist an
		// InAktiv = Filter ist aus
		var FilterStatus = "Aktiv";	
		GM_setValue("FilterStatus",FilterStatus);
	}
	if (!GM_getValue("NavStatus"))
	{
		// Aktiv = Navigation ist an
		// InAktiv = Navigation ist aus
		var NavStatus = "Aktiv";	
		GM_setValue("NavStatus",NavStatus);
	}
	if (!GM_getValue("GeheZuStatus"))
	{
		// Aktiv = GeheZu ist an
		// InAktiv = GeheZu ist aus
		var GeheZuStatus = "Aktiv";	
		GM_setValue("GeheZuStatus",GeheZuStatus);
	}
	
	if (!GM_getValue("LinkStatus"))
	{
		// Aktiv = LinkTabelle ist an
		// InAktiv = LinkTabelle ist aus
		var LinkStatus = "Aktiv";	
		GM_setValue("LinkStatus",LinkStatus);
	}
	if (!GM_getValue("FreigabeStatus"))
	{
		// Aktiv = FreigabeTabelle ist an
		// InAktiv = FreigabeTabelle ist aus
		var FreigabeStatus = "Aktiv";	
		GM_setValue("FreigabeStatus",FreigabeStatus);
	}
	if (!GM_getValue("QuoteStatus"))
	{
		// Aktiv = QuoteAnzeiger ist an
		// InAktiv = QuoteAnzeiger ist aus
		var QuoteStatus = "Aktiv";	
		GM_setValue("QuoteStatus",QuoteStatus);
	}
	if (!GM_getValue("SpamStatus"))
	{
		// Aktiv = Spamfilter ist an
		// InAktiv = Spamfilter ist aus
		var SpamStatus = "InAktiv";	
		GM_setValue("SpamStatus",SpamStatus);
	}
	if (!GM_getValue("BlogAlarmStatus"))
	{
		// Aktiv = BlogAlarm ist an
		// InAktiv = BlogAlarm ist aus
		var BlogAlarmStatus = "Aktiv";	
		GM_setValue("BlogAlarmStatus",BlogAlarmStatus);
	}
	if (!GM_getValue("BildStatus"))
	{
		// Aktiv = BildStatus ist an
		// InAktiv = BildStatus ist aus
		var BildStatus = "Aktiv";	
		GM_setValue("BildStatus",BildStatus);
	}
	if (!GM_getValue("BekannteKommentare"))
	{
		var BekannteKommentare = "''";
		GM_setValue("BekannteKommentare",BekannteKommentare);
	}
	if (!GM_getValue("NachtraeglicheFreigaben"))
	{
		var NachtraeglicheFreigaben = "''";
		GM_setValue("NachtraeglicheFreigaben",NachtraeglicheFreigaben);
	}
	
	if (!GM_getValue("PicasaStatus"))
	{
		var PicasaStatus = "Aktiv";	
		GM_setValue("PicasaStatus",PicasaStatus);
	}
	
	if (!GM_getValue("AboStatus"))
	{
		var PicasaStatus = "Aktiv";	
		GM_setValue("AboStatus",PicasaStatus);
	}
	if (!GM_getValue("Usernames"))
	{
		GM_setValue("Usernames","<|>");
	}
	if (!GM_getValue("LetzterKommentar"))
	{
		var LetzterKommentar = "''";
		GM_setValue("LetzterKommentar",LetzterKommentar);
	}

	var Bremer = GM_getValue("Bremer2").split(",");
	var Anzeige = GM_getValue("Anzeige");
	var Sortierung = GM_getValue("Sortierung");
	var FilterStatus = GM_getValue("FilterStatus");
	var NavStatus = GM_getValue("NavStatus");
	var LinkStatus = GM_getValue("LinkStatus");
	var GeheZuStatus = GM_getValue("GeheZuStatus");
	var BildStatus = GM_getValue("BildStatus");
	var BekannteKommentare = GM_getValue("BekannteKommentare");
	var FreigabeStatus = GM_getValue("FreigabeStatus");
	var QuoteStatus = GM_getValue("QuoteStatus");
	var SpamStatus = GM_getValue("SpamStatus");
	var BlogAlarmStatus = GM_getValue("BlogAlarmStatus");
	var NachtraeglicheFreigaben = GM_getValue("NachtraeglicheFreigaben");
	var PicasaStatus = GM_getValue("PicasaStatus");
	var AboStatus = GM_getValue("AboStatus");
	var DUser = Undo(Check(GM_getValue("MAFLicense")));
	var LetzterKommentar = GM_getValue("LetzterKommentar");
	var AnzeigeStatus = GM_getValue("AnzeigeStatus");
	
	var ErsatzTrenner = "<p>";
	var ExtLinks = new Array();
	var AnzExtLinks = -1;
	var NeuerBlog = false;
	var FreigegebeneKommentare = "";
	
	if (document.getElementById("author")) { 
		CheckN(document.getElementById("author").value);
	}
	
	var AktBlog = window.location.href.replace("http://hsv-blog.abendblatt.de/","");
	AktBlog = AktBlog.substr(0,AktBlog.lastIndexOf("/"));
	var AktKommentare = AktBlog;
	var LetzterBlog = BekannteKommentare.substring(0,BekannteKommentare.indexOf("|"));

	GM_log(LetzterBlog + " <->" + LetzterKommentar);
	GM_log("Gesperrte User: "  + Bremer);
	GM_log (AktBlog);

	if (AktBlog != LetzterBlog ) 
	{
		NeuerBlog = true;
		BekannteKommentare = "";
		LetzterKommentar = "";
		NachtraeglicheFreigaben= AktBlog;
	}

	var ThisStyle = document.createElement("style");
	var StyleText = document.createAttribute("type");
	StyleText.nodeValue= "text/css";
	ThisStyle.setAttributeNode(StyleText);
	
	if (AnzeigeStatus =="Normal") 
	{
		ThisStyle.innerHTML = ".frei, .OhneText {display:block;} .gesperrt, .antwort {display:none;}"
	} else {
		ThisStyle.innerHTML = ".frei {display:none;} OhneText, .gesperrt, .antwort {display:block;} }"
	}
	document.getElementsByTagName("Head")[0].appendChild(ThisStyle);



// 2. Festhalten, wer alles gepostet hat.
	var Kommentare = document.getElementsByTagName("ol")[0].getElementsByTagName("li");
	var AnzKomm = Kommentare.length;
 
 	var LetzterKomm = "";
	
	var UserTabelle = GetUser(Kommentare);
		// [0]: Name
		// [1]: Anzahl
		// [2]: ID
		// [3]: Timestamp
		// [4]: OriginalName

	var Beginn = UserTabelle[UserTabelle.length-1][3];
	Beginn = Beginn.substring(Beginn.indexOf("um ")+3);
	Beginn = Beginn.substring(0,Beginn.length-1);
	Beginn = Beginn.substr(0,2);
	var EndZeit= UserTabelle[0][3];
	EndZeit = EndZeit.substring(EndZeit.indexOf("um ")+3);
	EndZeit = EndZeit.substring(0,EndZeit.length-1);
	EndZeit = EndZeit.substr(0,2);

	if (Sortierung=="Posts")
	{
		UserTabelle.sort(nachAnzahl_DESC);
	}else{
		UserTabelle.sort(alphabetical);
	}

// 3. Anlegen und konfigurieren einer Tabelle zur Uebersicht
	var UebersichtsTabelle = GetTabelle();

		// 3.1 Konfigurationszeile hinzufuegen	
	UebersichtsTabelle.appendChild(GetKonfiguration());

	// 3.2 Ueberschriften definieren und anlegen
	UebersichtsTabelle.appendChild(GetUeberschrift())

	// 3.2 Usertabelle anlegen
	GetUserDaten(UebersichtsTabelle,UserTabelle,AnzKomm);


// 4. Einbinden der Tabelle vor den Kommentaren, eine Zeile Abstand.
	var CommentStart =  document.getElementById("comments");
	CommentStart.parentNode.insertBefore(UebersichtsTabelle,CommentStart);
	var NeueZeile = document.createElement("br");
	CommentStart.parentNode.insertBefore(NeueZeile,CommentStart);
	CommentStart.innerHTML = CommentStart.innerHTML + " (" + UserTabelle.length + " User)";

	// Antworterkennung: Versuche, Verkuerzungen bei User mit Zahlenzusatz zu erkennen.
	// Dazu wird der UserTabelle ggf. eine Dublettte ohne Zahlenzusatz hinzugefuegt.  
	var AnzahlUser = UserTabelle.length;

	for (var y = 0; y<=AnzahlUser-1;y++)
	{
		var CheckUser = UserTabelle[y][0].toLowerCase();
		var UnerwuenschteZeichen = "0123456789 "
		var Dublette = "";
		for (var l = 4; l<= CheckUser.length-1;l++)
		{
			if (CheckUser.substr(l,1)-0 == CheckUser.substr(l,1))
			{
				Dublette = CheckUser.substr(0,l);
				UserTabelle[AnzahlUser] = new Array(1);
				UserTabelle[AnzahlUser][0] = Dublette;
				UserTabelle[AnzahlUser][1] = UserTabelle[y][1];
				UserTabelle[AnzahlUser][2] = UserTabelle[y][2];
				UserTabelle[AnzahlUser][3] = UserTabelle[y][3];
				UserTabelle[AnzahlUser][4] = UserTabelle[y][0];	//OriginalNAme
				AnzahlUser ++;
				break;
			}
		}
		if (CheckUser.indexOf("der ") == 0  || CheckUser.indexOf("die ") == 0 || CheckUser.indexOf("das ") == 0 )
		{
			Dublette = CheckUser.substr(4);
			UserTabelle[AnzahlUser] = new Array(1);
			UserTabelle[AnzahlUser][0] = Dublette;
			UserTabelle[AnzahlUser][1] = UserTabelle[y][1];
			UserTabelle[AnzahlUser][2] = UserTabelle[y][2];
			UserTabelle[AnzahlUser][3] = UserTabelle[y][3];
			UserTabelle[AnzahlUser][4] = UserTabelle[y][0];		//OriginalNAme
			AnzahlUser ++;
		}
		if (CheckUser.indexOf("gravesen")>-1)
		{
			Dublette = "Grave";
			UserTabelle[AnzahlUser] = new Array(1);
			UserTabelle[AnzahlUser][0] = Dublette;
			UserTabelle[AnzahlUser][1] = UserTabelle[y][1];
			UserTabelle[AnzahlUser][2] = UserTabelle[y][2];
			UserTabelle[AnzahlUser][3] = UserTabelle[y][3];
			UserTabelle[AnzahlUser][4] = UserTabelle[y][0];		//OriginalNAme
			AnzahlUser ++;
		}
		if (CheckUser.indexOf("randnotiz")>-1)
		{
			Dublette = "Randy";
			UserTabelle[AnzahlUser] = new Array(1);
			UserTabelle[AnzahlUser][0] = Dublette;
			UserTabelle[AnzahlUser][1] = UserTabelle[y][1];
			UserTabelle[AnzahlUser][2] = UserTabelle[y][2];
			UserTabelle[AnzahlUser][3] = UserTabelle[y][3];
			UserTabelle[AnzahlUser][4] = UserTabelle[y][0];		//OriginalNAme
			AnzahlUser ++;
		}
		
		
	}
	AnzahlUser = UserTabelle.length;
	
 	
// 5. Einzelne Kommentare aufbereiten und auf Bremer pruefen
	
     UserTabelle.sort(nachLaenge);
	
	for (var k = AnzKomm - 1; k >= 0; k--)
	{
		var Kommentar = Kommentare[k].innerHTML.toLowerCase(); 
		var Klassenname = Kommentare[k].id;
		
		var ListElement = document.getElementById(Klassenname);
		var DivElement = ListElement.getElementsByTagName("div")[0];
		var commentElement = DivElement.getElementsByTagName("a")[0];
		commentElement.innerHTML = "#" + (k+1); 
		var UserElement = DivElement.getElementsByTagName("cite")[0];			
		var ZeitElement = DivElement.getElementsByTagName("em")[0];
		
		var NavBar = document.createElement("div");
		NavBar.id= "nav_" + Klassenname;
		NavBar.innerHTML = "";
		
		var NavStyle = document.createAttribute("style");
		NavStyle.nodeValue = "float:right; margin-top: 8px; margin-right:10px; font-size: 1.3em;";
		NavBar.setAttributeNode(NavStyle);
		
		DivElement.insertBefore(NavBar,ZeitElement.nextSibling);
		
		var LinkElement = UserElement.getElementsByTagName("a")[0];
	
		if (!LinkElement)
		{
			User = UserElement.innerHTML;	
		} else 
		{
			User = LinkElement.innerHTML;
		}

		DivEnde = ListElement.innerHTML.lastIndexOf("</div>")+6
		var UserInfo = ListElement.innerHTML.substring(0,DivEnde);
		var UserText = ListElement.innerHTML.substring(DivEnde);

		ListElement.innerHTML = ListElement.innerHTML.replace(UserText, "<div id='txt_" + Klassenname + "'>"+UserText+"</div>");
		UserText = ListElement.innerHTML.substring(DivEnde);

		var AktKommentar = Klassenname.replace("comment-","");
		AktKommentare += "|" + AktKommentar;
		if (parseInt(AktKommentar) <= parseInt(LetzterKommentar) && NeuerBlog==false)
		{
			var r = new RegExp(AktKommentar);
			if (r.test(BekannteKommentare)==false) 
			{
				FreigegebeneKommentare += "|" + User + "<;>" + AktKommentar + "<;>" + ZeitElement.innerHTML ;
				if (FreigabeStatus == "Aktiv")
				{
					NachtraeglicheFreigaben += "|" + AktKommentar ;				}
					
			}
			
			var GelesenesElement = document.getElementById("comment-" + AktKommentar); 
			GelesenesElement.style.backgroundColor = "#E9E9E9";
		}


		if (NavStatus=="Aktiv") 
		{
			// Antwortlink anlegen
			var Antwort =  document.createElement("a");
			Antwort.id = Klassenname;
			Antwort.title = "Auf diesen Beitrag antworten. Markierter Text = Zitat."; 
			Antwort.innerHTML = "&nbsp;\u261E" ;
			Antwort.addEventListener("mousedown",function(event){window.Antworten(event);},false);
			var CursorStyle = document.createAttribute("style");
			CursorStyle.nodeValue = "cursor:pointer;font-size:x-large";
			Antwort.setAttributeNode(CursorStyle);
			try
			{
					DivElement.insertBefore(Antwort,ZeitElement);
			}
			catch(e)
			{
				//NIx
			}
		}	
		// Ende NavStatus
		
		// 5.1 Filterfunktion einbauen
		UserElement.addEventListener("click",function(event){window.FilterUser(event);},false);
		UserElement.id = User;
		UserElement.title = "Alle Beiträge von " + User + " anzeigen";
		CursorStyle = document.createAttribute("style");
		CursorStyle.nodeValue = "cursor:pointer";
		UserElement.setAttributeNode(CursorStyle);

		// 5.2 Marker fuer Verherigen/Naechsten Beitrag finden
		var LinkIDs = "";
		var ZeitStempel = "";
		var AnzahlPosts = 0;			
		var Vorgaenger = "";
		var aVorgaenger;
		var Nachfolger = ""; 
		var aNachfolger;
		
		for (var y = 0; y<=UserTabelle.length-1;y++)
		{
			if (UserTabelle[y][0]==User)
			{
				AnzahlPosts = UserTabelle[y][1];			
				if(AnzahlPosts >1)
				{
					LinkIDs = UserTabelle[y][2].split("|");
				}
			}
		}
		
		//Beitragsnavigation anzeigen
		if (NavStatus=="Aktiv") 
		{
			var reload = document.createElement("a"); 
			reload.innerHTML = "&nbsp;\u21BB&nbsp;&nbsp;&nbsp;";        
			reload.title = "Reload"; 
			reload.href = "javascript:window.location.reload();";  	
			NavBar.appendChild(reload);
			
			if (LinkIDs.length == 2)
			{
				// Nur zwei Posts vorhanden. Entweder Vorgaenger oder Nachfolger ermitteln.
				// LinkIDs beginnen mit dem neuesten Eintrag
				if(LinkIDs[0]==Klassenname)
				{
					Vorgaenger = LinkIDs[1];
				} else {
					Nachfolger = LinkIDs[0];
				}
			} 
			if (LinkIDs.length > 2) 
			{
				var Pos = LinkIDs.indexOf(Klassenname);
				if(Pos==0)	// Wenn letzter Beitrag, dann kann er nur einen Vorgaenger haben
				{
					Vorgaenger = LinkIDs[1];
				} else if(Pos == LinkIDs.length-1)
				{
					// Wenn erster Beitrag, dann kann er nur einen Nachfolger haben
					Nachfolger = LinkIDs[LinkIDs.length-2];
				} else 
				{
					Vorgaenger = LinkIDs[Pos+1];
					Nachfolger = LinkIDs[Pos-1];	
				}
			}
			
					
			if (Vorgaenger != "")
			{
				aVorgaenger = document.createElement("a");
				aVorgaenger.href = "#" + Vorgaenger; 
				aVorgaenger.innerHTML = "<<&nbsp;";        
				aVorgaenger.title = "Vorheriger Eintrag von " + User; 
				NavBar.appendChild(aVorgaenger)
			}
			if (Nachfolger != "")
			{
				aNachfolger = document.createElement("a");
				aNachfolger.href = "#" + Nachfolger; 
				aNachfolger.innerHTML = ">>&nbsp;";        
				aNachfolger.title = "Nächster Eintrag von " + User; 
				NavBar.appendChild(aNachfolger); 
  			}
		} 
		// Ende NavStatus
		
		var a = document.createElement("a");
		a.href =commentElement.href ; 
		
		var a1 = document.createElement("a"); 
		a1.innerHTML = "&nbsp;\u25BC&nbsp;";        

		var a2 = document.createElement("a");
		a2.innerHTML = "&nbsp;\u25B2&nbsp;";        
			
		
		if (NeuerBlog==false) {
			if(parseInt(AktKommentar) <= parseInt(LetzterKommentar))
			{
				a1.title = "Zum letzten Lesezeichen";
				a1.href = "#comment-" + LetzterKommentar;
				a2.title = "Zur Usertabelle";
				a2.href = "#UserTabelle"; 
			} else {		 
				a1.title = "nach unten";
				a1.href = "#Zaehler";
				a2.title = "Zum letzten Lesezeichen";
				a2.href = "#comment-" + LetzterKommentar;	
			}
		}
		if (NeuerBlog==true){
			a1.href = "#Zaehler";
			a2.href = "#UserTabelle";
		}
		var Sinnfrei = false;
		var AktUser = "";

		// LastComment-Marker für letzten Beitrag
		var LC = document.createElement("a"); 
		LC.innerHTML = "&nbsp;\u00A4&nbsp;";        
		LC.title = "Lesezeichen"; 
		LC.id = "LC|"+AktKommentar;
		LC.addEventListener("click",function(event){window.LetzterKommentar(event);},false);
		CursorStyle = document.createAttribute("style");
		CursorStyle.nodeValue = "cursor:pointer";
		LC.setAttributeNode(CursorStyle);
		
		if (FilterStatus == "Aktiv")
		{
			// 5.1 Jeden Kommentar pruefen, ob ihn ein Bremer geschrieben hat.
			for (var j = Bremer.length - 1; j >= 0; j--)
			{
				var tempUser = Bremer[j].split("<|>");
				if (ListUser(User).toLowerCase() == tempUser[0].toLowerCase())
				{
					Anzeige = IstGeblockt(ListUser(User));		
					switch (Anzeige) {
						case "OhneText" :  	
						//	ListElement = document.getElementById(Klassenname);
							a.innerHTML = "&nbsp;[+]&nbsp;";
							a.title = "Klicken zum Entsperren von " + User  + ".";
							a.id = User+ "<|>" + Klassenname;
							a.addEventListener("click",function(event){window.Entsperren(event);},false);
							a.addEventListener("mouseover",function(event){window.Einblenden(event);},false);
							
							NavBar.appendChild(a1);
							NavBar.appendChild(a2);
							NavBar.appendChild(a);
							NavBar.appendChild(LC);
							
							var TextElement = document.getElementById("txt_"+Klassenname);
							// TextElement.style.display = "none";
							ListElement.className = "OhneText";
							TextElement.className = "gesperrt";
							break;
						case "Nix" : 	
							// Kommentare[k].style.display = "none";
							ListElement.className = "gesperrt";
							break;
					}
					Sinnfrei = true;
					break;
				} 
				if (Sinnfrei == false)
				{
					// Alles OK, Minus hinzufuegen, damit er ggf. gefiltert werden kann.		
					a.innerHTML = "&nbsp;[-]&nbsp;";
					a.title = "Klicken, um " + User + " zu sperren.";	
			  		a.id = User+ "<|>" + Klassenname + "<|>OhneText"; 
					a.addEventListener("click",function(event){window.Sperren(event);},false);		  	
					
					if (AnzeigeStatus!="Normal") {
						a1.href = "#Zaehler";
					}
					NavBar.appendChild(a1);
					NavBar.appendChild(a2);
					NavBar.appendChild(a);
					NavBar.appendChild(LC);
					
					ListElement.className = "frei";
					
				}
			}	
 		
 		} else {
 			
			NavBar.appendChild(a1); 
			NavBar.appendChild(a2);
			NavBar.appendChild(LC);
		} 
		
		ListElement.replaceChild(DivElement,  ListElement.getElementsByTagName("div")[0]);

		var colZeitMorgen= "#8184fb";	// 06:00-12:00
		var colZeitMittag= "#aeeaf9"; // 12:00-17:00
		var colZeitAbend= "#81fb84";  // 17:00-23:00
		var colZeitNacht= "#9a0000";  // 23:00-06:00
	
		var PostFarbe = "";
		
		var PostStunde = ZeitElement.innerHTML.substring(ZeitElement.innerHTML.indexOf("um ")+3);
		PostStunde = PostStunde.substring(0,PostStunde.length-1);
		PostStunde = PostStunde.substr(0,2);
		
		if(PostStunde > 5 && PostStunde < 12) {	
			PostFarbe = colZeitMorgen;
		} else if (PostStunde > 11 && PostStunde < 17) {
			PostFarbe = colZeitMittag;
		} else if (PostStunde > 16 && PostStunde < 23) {
			PostFarbe = colZeitAbend;
		} else if (PostStunde > 22 || PostStunde < 6) {
			PostFarbe = colZeitNacht;
		}

	
		var UserTextBlock = document.getElementById("txt_" + Klassenname);

		var ZeitMarker = document.createElement("div"); 
		ZeitMarker.title = "Zeit"; 
		CursorStyle = document.createAttribute("style");
		CursorStyle.nodeValue = "float:left; vertical-align:middle; margin-top: 20px; margin-right:5px; width:8px; height:50px;background-color:" + PostFarbe + ";";
		ZeitMarker.setAttributeNode(CursorStyle);
		
		
		ListElement.insertBefore(ZeitMarker,DivElement);

		// Ende FilterStatus

		// DoubleCheck
		var TextLaenge= UserTextBlock.innerHTML.length;
		if (TextLaenge > PruefLaenge){TextLaenge = PruefLaenge;};
		var PB = UserTextBlock.innerHTML.substring(0,TextLaenge);
		for (var i = 0; i<DUser.length; i++) {
			var re = new RegExp(DUser[i],"ig");
			if(PB.match(re)) {
				ListElement.className="gesperrt";
				break;	
			}	
		}


 		if(SpamStatus == "Aktiv" && IstGeblockt(User)=="" && AnzahlPosts > (Kommentare.length/10) && Kommentare.length > 100)
		{
			var TextElement = document.getElementById("txt_"+Klassenname);
			//TextElement.style.display = "none";
			TextElement.className = "gesperrt";
			var Markierer = document.getElementById(User + "<|>" + Klassenname + "<|>OhneText");
			Markierer.innerHTML = "[-] <--- spam"
			Markierer.title = "Spamfilter aktiv";
			Markierer.addEventListener("mouseover",function(event){window.Einblenden(event);},false);
		}

			
		var commentElement = ListElement.getElementsByTagName("a")[0];
		var lfdNr = commentElement.innerHTML ;
		
		var TextElement = document.getElementById("txt_"+Klassenname);

		if (FilterStatus == "Aktiv")
		{
			// Pruefe auf maskierte Links: ?http://, !http://, +http://, .http://, xhttp:// und korrigiere sie. 
			if (TextElement.innerHTML != "")
			{
				var LinkText = TextElement.innerHTML;
				LinkText = LinkText.replace(/\u25BAhttp/ig, "!http");
				
				var Maskierung = new Array("!http://", "?http://", ":http://", "+http://",".http://", "xhttp://", "#http://", "1http://", "*http://", "&gt;http://", "&lt;http://");
				for (var ML = 0; ML <= Maskierung.length-1;ML++)
				{
		
					var StartPos=0;
					var EndPos=0;
					var AnzahlLinks = LinkText.split(Maskierung[ML]).length-1;
					if (AnzahlLinks > 0) {
						
						var PotentielleLinks = LinkText.split(Maskierung[ML]);
						var LinkKorrektur ="";
						var MaskierterLink = "";
						for (var AL=1;AL<=AnzahlLinks;AL++){
							StartPos = PotentielleLinks[AL].indexOf(Maskierung[ML])+1; // ohne ?,+,.
							EndPos=-1;
							// Ende: Gesamtlänge
							EndPos= PotentielleLinks[AL].length;
							if (PotentielleLinks[AL].indexOf(" ", StartPos) >-1 && PotentielleLinks[AL].indexOf(" ", StartPos)< EndPos){EndPos= EndPos= PotentielleLinks[AL].indexOf(" ", StartPos);};
							if (PotentielleLinks[AL].indexOf("<", StartPos) >-1 && PotentielleLinks[AL].indexOf("<", StartPos)< EndPos){EndPos= PotentielleLinks[AL].indexOf("<", StartPos);};
							
							MaskierterLink = "http://" + PotentielleLinks[AL].substr(StartPos,EndPos-StartPos);
							LinkKorrektur =  MaskierterLink;

							// falls der Link mit einem Punkt oder Slash endet, rausnehmen
							if(LinkKorrektur.substr(LinkKorrektur.length-1,1) == "."  || LinkKorrektur.substr(LinkKorrektur.length-1,1) == "/" )
							{
								LinkKorrektur = LinkKorrektur.substr(0,LinkKorrektur.length-1);
							}
							var NeuerLink = "<a href='" + LinkKorrektur + "' target='_blank'>" + LinkKorrektur + "</a>";
							
							
							TextElement.innerHTML = TextElement.innerHTML.replace (MaskierterLink, NeuerLink);
							StartPos = EndPos+1;
						}
					}
				}
				
				Maskierung = new Array("!https://", "?https://", ":https://", "+https://",".https://", "xhttps://", "1https://", "*https://",  "#https://", "&gt;http://", "&lt;http://");
				for (var ML = 0; ML <= Maskierung.length-1;ML++){
		
					var StartPos=0;
					var EndPos=0;
					var AnzahlLinks = TextElement.innerHTML.split(Maskierung[ML]).length-1;
					if (AnzahlLinks > 0) {
						var PotentielleLinks = TextElement.innerHTML.split(Maskierung[ML]);
						
						var LinkKorrektur ="";
						var MaskierterLink = "";
						for (var AL=1;AL<=AnzahlLinks;AL++){
						
							StartPos = PotentielleLinks[AL].indexOf(Maskierung[ML])+1; // ohne ?,+,.
							EndPos=-1;
							// Ende: Entweder Leerzeichen oder Tag, sonst Gesamtlänge

							EndPos= PotentielleLinks[AL].length;
							if (PotentielleLinks[AL].indexOf(" ", StartPos) >-1 && PotentielleLinks[AL].indexOf(" ", StartPos)< EndPos){EndPos= EndPos= PotentielleLinks[AL].indexOf(" ", StartPos);};
							if (PotentielleLinks[AL].indexOf("<", StartPos) >-1 && PotentielleLinks[AL].indexOf("<", StartPos)< EndPos){EndPos= PotentielleLinks[AL].indexOf("<", StartPos);};
							
							MaskierterLink = "https://" + PotentielleLinks[AL].substr(StartPos,EndPos-StartPos);
							LinkKorrektur = MaskierterLink;
							
							// falls der Link mit einem Punkt endet, rausnehmen
							if(LinkKorrektur.substr(LinkKorrektur.length-1,1) == "." || LinkKorrektur.substr(LinkKorrektur.length-1,1) == "/")
							{
								LinkKorrektur = LinkKorrektur.substr(0,LinkKorrektur.length-1);
							}
							var NeuerLink = "<a href='" + LinkKorrektur + "' target='_blank'>" + LinkKorrektur + "</a>";
							TextElement.innerHTML = TextElement.innerHTML.replace (MaskierterLink, NeuerLink);
							StartPos = EndPos+1;
						}
					}
				}
	
			}

			//Pruefen ob ein Quote vorliegt und ggf. Link einbauen
	
			var Kommentartext = "";
			try 
			{
				Kommentartext = TextElement.getElementsByTagName("p")[0].innerHTML;
			}
			catch(e)
			{
				Kommentartext = "";
			}
			
		
			var ZielLink = "";
			var OrgQuoteUserName = "";
			var QuoteUser = "";
			var QuoteMarker = "";
			var PostingZeit = "";
			var BestimmterBeitrag = false;
			
			// Herausfinden, wieviele Links in einem Text enthalten sind
			var TextLinks = TextElement.innerHTML.split("<a ");
			for (var i =TextLinks.length ; i >= 0;i--){

				
				var NeuerLink = TextElement.getElementsByTagName("a")[i];
				var StartPos = 0;
				var EndPos = 0;

				if (NeuerLink)
				{

					// Extern Oeffnen. 
					NeuerLink.target ="_blank";
					
					for (var l = 0 ; l<=i; l++){
						StartPos = TextElement.innerHTML.indexOf("<a ",EndPos);
						EndPos = TextElement.innerHTML.indexOf ("</a>",StartPos);
					}
					var LinkText = TextElement.innerHTML.substring(StartPos,(EndPos+4));
					
				
					if (NeuerLink.href.indexOf("mailto")>-1 || NeuerLink.href.indexOf(".gif")>-1 || NeuerLink.href.indexOf(AktBlog)>-1) 
					{
						// Mailtos aus dem aktuellen Blog sind uninteressant.
						// Smileys aus dem aktuellen Blog sind uninteressant.
						// Links aus dem aktuellen Blog sind uninteressant.
					} else {
						AnzExtLinks +=1 ;
						ExtLinks[AnzExtLinks]= new Array();
						ExtLinks[AnzExtLinks][0] = User; 
						ExtLinks[AnzExtLinks][1] = NeuerLink; 
						ExtLinks[AnzExtLinks][2] = Klassenname; 		
					} 
					// Youtube-Embedding
					var LinkAdresse = NeuerLink.href.substr(0).toLowerCase();			
					if (LinkAdresse.indexOf("http://www.youtube.com/watch?v=")>-1)
					{
						var YTArg = NeuerLink.href.substr(NeuerLink.href.indexOf("?v=")+3,11);
						
						var embedVid = "<object width='500' height='405'>";
						embedVid += "<param name='movie' value='http://www.youtube.com/v/" + YTArg + "&hl=en&fs=1'>";
						embedVid += "</param><param name='allowFullScreen' value='true'>";
						embedVid += "</param><param name='allowscriptaccess' value='always'>";
						embedVid += "</param><embed src=http://www.youtube.com/v/" + YTArg + "&hl=en&fs=1 ";
						embedVid += "type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='500' height='405'>";
						embedVid += "</embed></object>";
						
						TextElement.innerHTML = TextElement.innerHTML.replace(LinkText,embedVid);
						
					}
					// Picture-Embedding
					if (BildStatus == "Aktiv" && (NeuerLink.href.toLowerCase().indexOf(".jpg")>-1 || NeuerLink.href.toLowerCase().indexOf(".gif")>-1))
					{
					     var NeuesBild = document.createElement("img");
					     NeuesBild.src = NeuerLink.href;
					     //NeuesBild.height = 400;
					     //NeuesBild.width = 600;
					     NeuesBild.border = 0;
					     NeuerLink.innerHTML = "<br>" +  NeuerLink.innerHTML;
					     NeuerLink.parentNode.insertBefore(NeuesBild,NeuerLink);
					}
	                               
					if(PicasaStatus == "Aktiv" && (LinkAdresse.indexOf("http://picasaweb.google.") >-1 || LinkAdresse.indexOf("https://picasaweb.google.") >-1)) 
					{
						var NeuerFrame = document.createElement("iframe");
						var Frameadresse = LinkAdresse.replace("#","#slideshow/");
						if (Frameadresse != LinkAdresse) {
							NeuerFrame.src = Frameadresse;
							NeuerFrame.height = 520;
						     	NeuerFrame.width = 630;
							NeuerFrame.border = 0;
							NeuerFrame.scrolling = "no";
							NeuerLink.innerHTML = "<br>" + NeuerLink.innerHTML;
							NeuerLink.parentNode.insertBefore(NeuerFrame,NeuerLink);
						}
					}
					
					// Wenn kein Abendblatt Abonnent, dann ersetze Abendblatt-Links und mobil-Links durch Google-Suchaufrufe.
					if (AboStatus == "Aktiv" ) {
						if ( LinkAdresse.indexOf("http://www.abendblatt.de") >-1) {
							var GoogleLink = document.createElement("a");
							GoogleLink.target = "_blank";
							GoogleLink.href = "http://www.google.de/#q=" + LinkAdresse;
							var GoogleLinkText = document.createTextNode(LinkAdresse);
							GoogleLink.appendChild(GoogleLinkText);
							NeuerLink.parentNode.replaceChild(GoogleLink,NeuerLink);
						}
						if ( LinkAdresse.indexOf("mobil.abendblatt.de") >-1) {
							var ErsatzLink = LinkAdresse.replace(".mobil","");
							ErsatzLink = ErsatzLink.replace("mobil","www");
							var GoogleLink = document.createElement("a");
							GoogleLink.target = "_blank";
							GoogleLink.href = "http://www.google.de/#q=" + ErsatzLink;
							var GoogleLinkText = document.createTextNode(LinkAdresse);
							GoogleLink.appendChild(GoogleLinkText);
							NeuerLink.parentNode.replaceChild(GoogleLink,NeuerLink);
						}
					
					
					}
					// Wenn Abendblatt Abonnent, dann ersetze Mobil-Links durch Abendblatt-Links.
					if (AboStatus != "Aktiv" && LinkAdresse.indexOf("mobil.abendblatt.de") >-1) {
						var ErsatzLink = document.createElement("a");
						ErsatzLink.target = "_blank";
						ErsatzLink.href = LinkAdresse.replace(".mobil","");
						ErsatzLink.href = ErsatzLink.href.replace("mobil","www");
						var ErsatzLinkText = document.createTextNode(LinkAdresse);
						ErsatzLink.appendChild(ErsatzLinkText);
						NeuerLink.parentNode.replaceChild(ErsatzLink,NeuerLink);
					}
						
				}
			}	
		}
		
		// Beitragsnavigation
		if (NavStatus=="Aktiv") {		
			var EndPos = Kommentartext.length;
			if (EndPos > PruefLaenge){EndPos=PruefLaenge;};
			Kommentartext = Kommentartext.substr(0,EndPos);

			var AnzahlPostings = 0 ;
			var UserGefunden = false;
			for (var i = 0 ; i < UserTabelle.length;i++)
			{
				var Suchtext = Kommentartext.toLowerCase();
				var SuchUser = UserTabelle[i][0].toLowerCase();
				
				var regSuchUser = new RegExp(SuchUser,"ig");
				var StartPos = Suchtext.search(regSuchUser);
				
				var NaechstesZeichen = Suchtext.substr(StartPos+SuchUser.length,1).charCodeAt(0);
				var VorherigesZeichen = Suchtext.substr(StartPos-1,1).charCodeAt(0);
								
				if(StartPos > -1 && (NaechstesZeichen == 97 ||NaechstesZeichen < 65 || isNaN(NaechstesZeichen)) && (StartPos == 0 || VorherigesZeichen < 65 || isNaN(VorherigesZeichen)) )
				{	
					// Haben wir einen Hyperlink gefunden?
					var CheckText = Suchtext.substr(0,StartPos);
					var UserImLink = false;
	
					// Ist ein "<a href" im Checktext enthalten?
					var hrefStart = CheckText.indexOf("<a");
					if (hrefStart > -1)
					{	// Wo ist das Ende?
						var hrefEnde = Suchtext.indexOf("</a>",hrefStart);
						// Pruefe ob StartPos in der Laenge des <a> enthalten ist. 
						if (hrefEnde > StartPos || hrefEnde ==-1) 
						{
							UserImLink = true						
						}
					} 

					if (UserImLink == true) 
					{
						// Link enthaelt Usernamen, nichts aendern!
					} else {
						// Wenn Username nicht in einem Hyperlink vorkommt, dann kann der Name mit dem entsprechenden Beitrag verlinkt werden.
						var Leerzeichen = Suchtext.lastIndexOf(" ", StartPos);
						OrgQuoteUserName = UserTabelle[i][4];
						QuoteUser = UserTabelle[i][0];
						QuoteMarker = Kommentartext.substr(StartPos,QuoteUser.length);
						AnzahlPostings = UserTabelle[i][1];
						LinkIDs = UserTabelle[i][2];		
						ZeitStempel = UserTabelle[i][3];
						UserGefunden = true;
						break;
					}
				}
			}
	
			if (UserGefunden == true)
			{
				// Mit Uhrzeit? Genauer Link moeglich. 
				if (Kommentartext.indexOf("Uhr")>-1) {
					BestimmterBeitrag = true;
					var PosUhr = Kommentartext.indexOf("Uhr");
					for (var i = PosUhr-2; i>=0;i--)
					{
						if (Kommentartext.substr(i,1).charCodeAt(0)==32) { //Leerzeichen
							PostingZeit = Kommentartext.substring(i,PosUhr);
							if (PostingZeit.substr(0,1) == " ")
							{ 
								PostingZeit = PostingZeit.substr(1);
							}
							break;
						}	
					}
				}
			
				if (AnzahlPostings == 1) {
					ZielLink = LinkIDs
				} else {
					var ArrLinkID = LinkIDs.split("|");
					if(BestimmterBeitrag==false) {
						var AktLink = Klassenname.replace("#comment-","");
						for (var i = 0 ; i<= ArrLinkID.length-1; i++) {
						// Finde den letzten Beitrag vor dem Aufrufenden
							var PruefLink = ArrLinkID[i].replace("#comment-","");
							if (PruefLink < AktLink)
							//if (parseInt(PruefLink) < parseInt(AktLink) )
							{
								ZielLink = ArrLinkID[i]	// Letzter Beitrag	
								break;
							}				
						}
					} else {
						var ArrZeit = ZeitStempel.split("|");
						for (var i = 0 ; i <= AnzahlPostings-1;i++)
						{
							if(ArrZeit[i].indexOf(PostingZeit)>-1)
							{
								ZielLink = ArrLinkID[i];	
							}
						}
					}
				}

				var TextElement = document.getElementById("txt_"+Klassenname);
				var tmp_text = TextElement.innerHTML;
				tmp_text = tmp_text.replace(String.fromCharCode(8220),"'");
				tmp_text = tmp_text.replace(String.fromCharCode(8221),"'");
				tmp_text = tmp_text.replace(/'/g,String.fromCharCode(180));
				tmp_text = tmp_text.replace(QuoteMarker, "<a href='#" + ZielLink + "'>" + QuoteUser + "</a>");
				TextElement.innerHTML = tmp_text;
				
				if (FilterStatus == "Aktiv" && QuoteStatus == "Aktiv" ){					
				
					if ((IstGeblockt(QuoteUser)!="" || IstGeblockt(OrgQuoteUserName)!="")&& QuoteStatus =="Aktiv" && IstGeblockt(User)=="")
					{
						if(IstGeblockt(OrgQuoteUserName)=="Nix"){
							ListElement.className = "gesperrt";
							TextElement.className = "antwort";
						} else {
							ListElement.className = "OhneText";
							TextElement.className = "antwort";
						}
					
						var Markierer = document.getElementById(User + "<|>" + Klassenname + "<|>OhneText");
						Markierer.innerHTML = "&nbsp;[-] \u21D0\u24B6 " + OrgQuoteUserName + "&nbsp;";
						Markierer.title = "Antwortfilter: Hier steht eine Antwort an einen Markierten";
						var MarkStyle = document.createAttribute("style");
						MarkStyle.nodeValue = "font-size:0.8em;";
						Markierer.setAttributeNode(MarkStyle);
						Markierer.addEventListener("mouseover",function(event){window.Einblenden(event);},false);
						
					}
				} 
			}			
			// Ende UserGefunden
		}				
		// Ende NavStatus
		
		//Bei laengeren Texten den Usernamen am Ende wiederholen.
		if (TextElement.innerHTML.length > 1400){
			TextElement.innerHTML = TextElement.innerHTML + "<p align='right'><b><small>" + User +" </small></b></p>"; 
		}
		
		// Wenn ListElement sichtbar, dann kann der LetzteKommentar gesetzt werden.
		if (ListElement.className != "gesperrt" && LetzterKomm == "") {
			LetzterKomm = ListElement.id;
		}


	}	
	// Ende For
		
	AddLinkListe(ExtLinks,UebersichtsTabelle);

	if (LetzterKommentar !="" && GeheZuStatus == "Aktiv"){
		location.hash="#comment-" + LetzterKommentar;
	}

	GM_setValue("BekannteKommentare", AktKommentare);
	GM_setValue ("NachtraeglicheFreigaben",NachtraeglicheFreigaben);
	
	if(FreigabeStatus == "Aktiv")
	{
		var Freigegeben = NachtraeglicheFreigaben.split("|");
		if (Freigegeben.length >1 )
		{
//			for (var y =1; y <= Freigegeben.length-1; y++)
			for (var y =Freigegeben.length-1 ; y >0; y--)
			{
				var FreigabeElement = document.getElementById("comment-" + Freigegeben[y]); 
				FreigabeElement.style.backgroundColor = "#FFFFCC";
				
				if (y >1) {
					var NaechsteFreigabe = document.createElement("a"); 
					NaechsteFreigabe.innerHTML = "&nbsp;\u2193&nbsp;";        
					NaechsteFreigabe.title = "Naechste Freigabe"; 
					NaechsteFreigabe.href = "#" + "comment-" + Freigegeben[y-1] ; 
					
					FreigabeElement.getElementsByTagName("div")[2].appendChild(NaechsteFreigabe);
					
					var LK_LinkFreigabe = document.createElement("a");
					LK_LinkFreigabe.href = "#comment-" + LetzterKommentar;
					LK_LinkFreigabe.innerHTML = "&nbsp;\u1115&nbsp;";        
					LK_LinkFreigabe.title = "Zum Lesezeichen"; 
					FreigabeElement.getElementsByTagName("div")[2].appendChild(LK_LinkFreigabe);
					
				} else {
					var VorherigeFreigabe = document.createElement("a"); 
					VorherigeFreigabe.innerHTML = "&nbsp;\u2191&nbsp;";        
					VorherigeFreigabe.title = "Vorherige Freigabe"; 
					VorherigeFreigabe.href = "#" + "comment-" + Freigegeben[2] ; 
					
					FreigabeElement.getElementsByTagName("div")[2].appendChild(VorherigeFreigabe);
					
					var LK_LinkFreigabe = document.createElement("a");
					LK_LinkFreigabe.href = "#comment-" + LetzterKommentar;
					LK_LinkFreigabe.innerHTML = "&nbsp;\u1115&nbsp;";        
					LK_LinkFreigabe.title = "Zum Lesezeichen"; 
					FreigabeElement.getElementsByTagName("div")[2].appendChild(LK_LinkFreigabe);
				}
			}
		}
	
		if (FreigegebeneKommentare != "")
		{
			FreigegebeneKommentare = FreigegebeneKommentare.substr(1);	// erstes Trennzeichen trimmen
			// Link zum letzten gelesenen Post definieren.
			var LK_Link2 = document.createElement("a");
			LK_Link2.href = "#comment-" + LetzterKommentar;
			LK_Link2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;\u1115&nbsp;";        
			LK_Link2.title = "Zum Lesezeichen"; 
			
			var FreigabeTabelle = GetFreigabeTabelle(FreigegebeneKommentare,LK_Link2);
			// . Einbinden der Tabelle nach den Kommentaren, eine Zeile Abstand.
			var ListStart =  document.getElementsByTagName("ol")[0]
			var NeueZeile = document.createElement("hr");
			ListStart.appendChild(NeueZeile);
			NeueZeile = document.createElement("br");
			ListStart.appendChild(NeueZeile);
			ListStart.appendChild(FreigabeTabelle);
			NeueZeile = document.createElement("br");
			ListStart.appendChild(NeueZeile);
			NeueZeile = document.createElement("hr");
			ListStart.appendChild(NeueZeile);
			NeueZeile = document.createElement("br");
			ListStart.appendChild(NeueZeile);

			

			alert("Es gibt " + FreigegebeneKommentare.split("|").length + " neue Freigaben!");
			if (GeheZuStatus == "Aktiv") {
				document.getElementById("Freigabe").getElementsByTagName("a")[1].focus();
			}
		}
	}
	// Ende FreigabeStatus


	if(BlogAlarmStatus == "Aktiv")
	{
		var h4 = 0;
		var Titel = document.getElementById("contentarea").getElementsByTagName("a")[0].innerHTML;
		var NeuesterArtikel;
		var NaechsterArtikel;
		var ULelement
		while (document.getElementsByTagName("h4")[h4])
		{
			var h4Text = document.getElementsByTagName("h4")[h4];
			if (h4Text.innerHTML == "Letzte Artikel")
			{
				ULelement = h4Text.parentNode.getElementsByTagName("ul")[0];		
				NeuesterArtikel = ULelement.getElementsByTagName("li")[0].getElementsByTagName("a")[0].text;
				NaechsterArtikel = ULelement.getElementsByTagName("li")[1].getElementsByTagName("a")[0].text;
				
				// Link zum letzten gelesenen Post definieren.
				var LK_Link = document.createElement("a");
				LK_Link.href = "#comment-" + LetzterKommentar;
				LK_Link.innerHTML = "&nbsp;<b>\u1115</b>&nbsp;";        
				LK_Link.title = "Zum Lesezeichen"; 
				h4Text.parentNode.insertBefore(LK_Link,h4Text.nextSibling);
				break;
			}
			h4++;
		}
		if (NeuesterArtikel.indexOf(Titel)== -1 && NaechsterArtikel.indexOf(Titel)>-1) 
		{
			alert("Neuer Blog vorhanden?\n\n" + NeuesterArtikel);
			if (GeheZuStatus == "Aktiv") {
				ULelement.getElementsByTagName("li")[0].getElementsByTagName("a")[0].focus();
			}
		}
	}
	// Ende Blog-Alarm
	
	// Preview-Button
	if (document.getElementById("submit")){
		var SubmitButton = document.getElementById("submit");
		SubmitButton.style.display = "none";	
		
		var PreviewButton = document.createElement("input");
		PreviewButton.id ="PreviewButton";
		PreviewButton.name ="PreviewButton";
		PreviewButton.tabindex ="5";
		PreviewButton.value ="Vorschau";
		PreviewButton.type ="Button";
		PreviewButton.addEventListener("click",function(event){window.PreviewAnzeigen(event,ExtLinks);},false);
		
		var Formular = document.getElementById("commentform");
		
		try 
		{
			SubmitButton.parentNode.insertBefore(PreviewButton,SubmitButton);
		}
		catch(e)
		{
			//
		}
	}
	// Anzahl Kommentare und User
	var KommentarZaehler = document.getElementById("comments").innerHTML;
	
	KommentarZaehler = KommentarZaehler.substr(0,KommentarZaehler.indexOf("zu")-1) + " | " + AnzahlUser + " User";
	var KommentarZaehlerBottom = document.createElement("div");
	KommentarZaehlerBottom.id = "Zaehler";
	KommentarZaehlerBottom.innerHTML = "<h4>" + KommentarZaehler + "</h4><br>";
		
	document.getElementsByTagName("ol")[0].parentNode.insertBefore(KommentarZaehlerBottom,document.getElementsByTagName("ol")[0].nextSibling);
	
	
 if (AnzeigeStatus=="Normal"){GM_setValue("LetzterKommentar",LetzterKomm.substr(8));};	
 d = new Date();
 var  LaufZeit = d.getTime();
 GM_log (LaufZeit-StartZeit + "ms");
//////***** ENDE SKRIPT *****

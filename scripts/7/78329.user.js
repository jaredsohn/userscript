// ==UserScript==
// @name           wkw_allInOne
// @namespace      wkw
// @description    vereinfacht die Bedienung von wkw
// @include        http://www.wer-kennt-wen.de/*
// ==/UserScript==

	
 // mein Script
	{//Variablen:					// gebraucht für die Funktionen:
	 
	var quellcode; 					//initVars() , ersetzen() 	, main()
	var Buttons = new Array(); 		//initVars() , addButtons()	, addNewButton()
	var codes = new Array();		//initVars() , peopleOnline()
	var names = new Array();		//	  "      ,		"
	var nameAngezeigt = new Array();// peopleOnline()
	var ReloadTime;					// 		 "
	var url;						//initVars() , main()
	var ProgammierEinstellungen = false;
	var regexp;						// 
	var ton = false;
	}
	
	{//Funktionen
	
	//läd die aktuelle Seite neu
	function reload(){
		window.location.reload();
	}
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}


	//initialisiert die Variablen
	function initVars(){
		
		if(document.getElementById('topad') != null)
			document.getElementById('topad').innerHTML = '';
		if (document.getElementById('ads') != null)
			document.getElementById('ads').innerHTML = '';
		
		//quellcode
		quellcode = document.body.innerHTML;
		
		//Buttons
		for(i = 0;;i++)
		{
			var Button 	 = GM_getValue('wkw_buttons_' + i,null);
			if (Button == null)
				break;
			else
				Buttons[i] = Button;
		}	
		
		//codes
		for(i = 0;;i++)
		{
			var code 	 = GM_getValue('wkw_codes_' + i,null);
			if (code  == null)
				break;
			else
				codes[i] = code;
				
		}	
		//names
		for(i = 0;i < codes.length;i++)
		{
			var name 	 = GM_getValue('wkw_names_' + codes[i],null);
			if (name  == null)
				break;
			else
				names[i] = name;
		}	
		
		//nameAngezeigt
			//wird in personsOnline initialisiert
		
		//ReloadTime
		ReloadTime = GM_getValue('ReloadTime',10000);
		
		// url
		url = document.URL;
		
	}
	
	//ersetzt die Buttons in der Navigationsleist
	////!!Achtung setzt den Quelltext zurück!!!
	function ersetzen(){
		
		if (document.getElementById('navigation') != null)
		{
			// Ich kenne --> Jetzt online		
			document.getElementById('navigation').innerHTML = document.getElementById('navigation').innerHTML.replace('<a href="/people/friends">Ich kenne</a>','<a href="/people/online">Jetzt online</a>');
		
			//Neues wird besser verlinkt
			document.getElementById('navigation').innerHTML = document.getElementById('navigation').innerHTML.replace('<a href="/news">Neues</a>','<a href="/news/activity">Neues</a>');
		}
	}
	
	
	
	// this are parts of the script of MarshallMar
	// for his script look here: http://userscripts.org/scripts/review/40217
	
	//IMAGEZOOM FUNKTIONEN
	{
	function imageZoom(){
		var imgList = document.getElementsByTagName("img");
		for( i=0; i < imgList.length; i++) {
			var imgName = imgList[i].src;
			var t = imgName.search(/\/(medium|tiny|small)\//); 
			if( t != -1) {
				bigimage=imgName.replace(/\/(medium|tiny|small)\//, "/big/");
				newImg = document.createElement("img");
				ow=imgList[i].width;
				oh=imgList[i].height;
				imgList[i].addEventListener("mouseover",
						function(e){
							newX=cumulativeOffset(this)[0]
							newY=cumulativeOffset(this)[1]
							newImg.src=this.src.replace(/\/(medium|tiny|small)\//, "/big/");
							//newImg.style.width="140px";
							//newImg.style.height = "185px";
							newImg.style.position="absolute";
							newImg.style.zIndex='999';
							newImg.style.top=(newY-185/2).toString() + 'px';
							newImg.style.left=(newX+ow).toString() + 'px';
							document.body.appendChild(newImg);
						},false);
				imgList[i].addEventListener("mouseout",
						function(e){
							document.body.removeChild(newImg);
						},false);

			}
		}
	}
		
		function cumulativeOffset(element) {
			var valueT = 0, valueL = 0;
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				element = element.offsetParent;
			} while (element);
			return [valueL, valueT];
		}

	}	
	
	//fügt die Buttons des Arrays Buttons der navigationsleiste hinzu
	function addButtons(){
		for (i = 0;i < Buttons.length;i++)
		{
			var button = document.createElement('li');
			button.innerHTML = Buttons[i];
			if( document.getElementById('navigation') != null)
				document.getElementById('navigation').getElementsByTagName('ul')[0].appendChild(button);
		}
	}
	
	//wird aufgerufen wenn der Benutzer die Seite  'people/online' betritt
	function peopleOnline(){
		// Button hinzufügen
			var Skripts = document.createElement('p');
			{
			GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://www.wer-kennt-wen.de/start',
							onload: function(responseDetails) {
								
							}
						});		
			//Buttons
			Skripts.innerHTML ='  ReloadTime: ' + ReloadTime + ' 	Millisekunden <input id="ReloadTime_get" class="formbutton" type="Button" name="test" value="ändern" >';
			Skripts.innerHTML += '      Personen:  <input id="Personen_AlleAnzeigen" class="formbutton" type="Button" name="alleAnzeigen" value="alle anzeigen" >';
			
			document.getElementById('peopleBar').appendChild(Skripts);
		
			document.getElementById('ReloadTime_get').addEventListener('click',function(){getReloadTime();},true);
			document.getElementById('Personen_AlleAnzeigen').addEventListener('click',function(){showPersons();},true);
		//GM_openInTab('http://www2.dict.cc/speak.audio.php?type=wav&lang=de&text=Sarah pfeil ist offline');
		//document.body.innerHTML += '<EMBED SRC="' +' http://www2.dict.cc/speak.audio.php?type=wav&lang=de&text=yakzitzten nuckler'+ '", WIDTH=0, HEIGHT=0 CONTROLS=TRUE autostart=true>' ;
		for (i = 0;i < codes.length;i++)
		{
				nameAngezeigt[i] = GM_getValue('V_' + codes[i],false);
				
				if (document.getElementById('rahmen').innerHTML.indexOf(codes[i]) > -1  && !nameAngezeigt[i] )
				{
					GM_setValue('V_' + codes[i],true);
				//	var flag = true;
					if(ton){
					//	alert('test 1');
						var mp3datei = '';
						var link = 'http://vrweb.linguatec.net/vrweb/popup1_dict?srctext=';
							link += ' ' + names[i];
							link += ' ist online';
							link += '&lang=de-de&customerid=103&alt=1';
							GM_openInTab('link');
						GM_xmlhttpRequest({
							method: 'GET',
							url: link,
							onload: function(responseDetails) {
								var start = responseDetails.responseText.indexOf('http://vrserver5.linguatec.net/cache/');//<div id="mediadownload">');
								var stop  = responseDetails.responseText.indexOf('.MP3') + 4; 
								mp3datei = responseDetails.responseText.substring(start,stop);
								document.body.innerHTML += '<EMBED SRC="' + mp3datei + '", WIDTH=0, HEIGHT=0 CONTROLS=TRUE autostart=true>' ;
							//	alert(mp3datei);
							}
						});		
					//	while (flag)
					//		window.setTimeout("function(){flag = false;}",5000);
					}
					else{
						alert(names[i] + '(' + codes[i] + ') ist online');
					}
					
				}	
				else if (nameAngezeigt[i] && document.getElementById('rahmen').innerHTML.indexOf(codes[i]) == -1)
				{
					var flag = true;
					if (ton)
					{
						var link = 'http://www2.dict.cc/speak.audio.php?type=wav&lang=de&text=';
						link += ' ' + names[i];
						link += ' ist offline';
						GM_xmlhttpRequest({
							method: 'GET',
							url: link,
							onload: function(responseDetails) {
								var start = responseDetails.responseText.indexOf('http://vrserver5.linguatec.net/cache/');
								var stop  = responseDetails.responseText.indexOf('.MP3') + 4; 
								mp3datei = responseDetails.responseText.substring(start,stop);
								document.body.innerHTML += '<EMBED SRC="' + mp3datei + '", WIDTH=0, HEIGHT=0 CONTROLS=TRUE autostart=true>' ;
							}
						});		
					//while (flag)
					//	window.setTimeout("function(){flag = false;}",5000);
					}
					else
						alert(names[i] + ' ist offline');
					GM_setValue('V_' + codes[i],false);
				}
			}
			ReloadTime += ''; 
			SeiteNeuLadenID = window.setTimeout('window.location.reload();', ReloadTime);	
		}
	}
	function addLikelyButton(){
		var newOne = document.createElement('a');
		newOne.href = 'users/likely';
		newOne.innerHTML = 'vielleicht kennst du';
		var p = document.getElementById('peoplelistTags').getElementsByTagName('p')[0];
		p.innerHTML += ' | ';
		p.appendChild(newOne);
		
	}
	
	//wird aufgerufen wenn der Benutzer die Seite  'setting/privacy' betritt
	function settingsPrivacy(){
		var Skripts = document.createElement('fieldset');
			//
			Skripts.innerHTML  ='<div class="fs"><h3>Deine Skripteinstellungen</h3> ';
			
			//Buttons
			Skripts.innerHTML +=' <p> ReloadTime: ' + ReloadTime + ' 	Millisekunden <input id="ReloadTime_get" class="formbutton" type="Button" name="test" value="ändern" ></p>';
			Skripts.innerHTML += '<p> Buttons: <input id="ButtonHinzufügen" class="formbutton" type="Button" name="test" value="hinzufügen" >   <input id="ButtonLöschen" class="formbutton" type="Button" name="test" value="löschen" >  <input id="ButtonAlleLöschen" class="formbutton" type="Button" name="test" value="alle löschen" > </p>';
			Skripts.innerHTML += ' <p> Personen: <input id="Personen_AlleLöschen" class="formbutton" type="Button" name="alleLöschen" value="alle löschen" >   <input id="Personen_AlleAnzeigen" class="formbutton" type="Button" name="test" value="alle anzeigen" > </p>';
			Skripts.innerHTML += ' <p> Farben: Hintergrund <input id="setBackground" class="formbutton" type="Button" name="changeColor" value="ändern" >  Schrift: <input id="setFontColor" class="formbutton" type="Button" name="test" value="ändern" > Links: <input id="setLinkColor" class="formbutton" type="Button" name="test" value="ändern" > Überschriften: <input id="setHeadColor" class="formbutton" type="Button" name="changeColor" value="ändern" ><a href = "#" id = "alleFarben">Farbbeispiele</a></p>';
			
			//Ende
			Skripts.innerHTML += '</div>';
		
		
			//Buttons werden hinzugefügt
			document.getElementById('user_privacy').appendChild(Skripts);
			
			//Buttons werden verlinkt
			document.getElementById('ReloadTime_get').addEventListener('click',function(){getReloadTime();},true);
			
			document.getElementById('ButtonHinzufügen').addEventListener('click',function(){addNewButton();},true);
			document.getElementById('ButtonLöschen').addEventListener('click',function(){deleteButton();},true);
			document.getElementById('ButtonAlleLöschen').addEventListener('click',function(){deleteAllButtons();},true);
			
			document.getElementById('Personen_AlleLöschen').addEventListener('click',function(){deleteAllPersons();},true);
			document.getElementById('Personen_AlleAnzeigen').addEventListener('click',function(){showPersons();},true);
			
			document.getElementById('setBackground').addEventListener('click',function(){changeBackgroundColor();},true);
			document.getElementById('setFontColor').addEventListener('click',function(){changeFontColor();},true);
			document.getElementById('setLinkColor').addEventListener('click',function(){changeLinkColor();},true);
			document.getElementById('setHeadColor').addEventListener('click',function(){changeHeadColor();},true);
			document.getElementById('alleFarben').addEventListener('click',function(){GM_openInTab('http://de.selfhtml.org/diverses/anzeige/farbnamen_netscape.htm')},true);
	}
		
		// Methoden für Skripteinstellungen
		function getReloadTime(){
			ReloadTime = prompt("Bitte Neuladen Rate eingeben(aktuell: " + ReloadTime +" Millisekunden):");
			GM_setValue('ReloadTime',ReloadTime);
			alert('ReloadTime ist ' + ReloadTime + " Millisekunden");	
		}
		
		//erschaffte einen neuen Button für die navigationsleiste
		function addNewButton(){
			var neuerButtonLink = prompt('Gib den Link für den neuen Button ein');
			var neuerButtonName = prompt('Gib bitte den Namen des neuen Buttons ein');
			if( neuerButtonLink != null && neuerButtonName != null)
			{
				var newButton = '<a href="' + neuerButtonLink + '">' + neuerButtonName + '</a>';
				GM_setValue('wkw_buttons_' + Buttons.length,newButton);
			}
			reload();
		}
		
		function deleteButton(){
			var ButtonNummer = prompt('Welchen Button willst du löschen?');
			
			ButtonNummer--;
			for(; ButtonNummer < Buttons.length -1;ButtonNummer++)
			{
				alert(Buttons[ButtonNummer+1]);
				GM_setValue('wkw_buttons_' + ButtonNummer,Buttons[ButtonNummer+1]);
				
			}
			GM_deleteValue('wkw_buttons_' + (Buttons.length - 1));
			reload();
		}
	
		function deleteAllButtons(){
			alert('alle Löschen');
			for(i = 0; i < Buttons.length;i++)
				GM_deleteValue('wkw_buttons_' + i);
			reload();
		}
	
	
		function addNewPerson(id,name){
			if (id != null && name != null )
			{
				
				if (!confirm('willst du ' + name + ' als Spitzname nehmen?'))
				{
					name = prompt('Welchen Spitznamen willst du statt dessen übernehmen?');
					if (name == null)
					 return;
				}
				GM_setValue('wkw_codes_' + codes.length,id);
				GM_setValue('wkw_names_' + id,name);
				alert(name + '(' + id + ') hinzugefügt');
				reload();
			}
		}
	
		
		function deletePerson(id,name){
			for (i = 0; i < codes.length;i++)
			{
				if(	codes[i].indexOf(id) > -1)
				{	
					GM_setValue('wkw_codes_' +  i,codes[codes.length - 1])
					GM_deleteValue('V_' + id);
					GM_deleteValue('wkw_codes_' + (codes.length-1));
					GM_deleteValue('wkw_names_' + id);
					alert(name + ' gelöscht');
					break;
				}
			}
		}
		
		function deleteAllPersons(){
			for ( i = 0; i < codes.length;i++)
			{
				GM_deleteValue('wkw_names_' + codes[i]);
				GM_deleteValue('wkw_codes_' + i);
			}
			reload();
		}
		
		function showPersons(){
			var Ausgabe = '';
			for ( i = 0; i < codes.length;i++)
			{
				Ausgabe += names[i] + '(' + codes[i] + ')  \t \t \t \t ';
				if (document.getElementById('rahmen').innerHTML.indexOf(codes[i]) > -1 )
				{
					Ausgabe += '   !!!online!!! ';
				}
				else
				{
					Ausgabe += '   offline ';
				}
				Ausgabe += ' \n';
			}
			alert(Ausgabe);
				
		}

		function changeBackgroundColor()
		{
			GM_setValue('bgColor',prompt('welche farbe soll der hintergrund haben?'));
			reload();
		}
		function changeFontColor(){
			GM_setValue('FColor',prompt('welche farbe soll die schrift haben?'));
			reload();
		}
		function changeLinkColor(){
			GM_setValue('LColor',prompt('welche Farbe sollen die links haben?'));
			reload();
		}
		function changeHeadColor(){
			GM_setValue('HColor',prompt('welche Farben sollen die Überschriften haben?'));
			reload();
		}
		
	//wird aufgerufen wenn der Benutzer die Seite  'start' betritt
	function start(){
		var element = document.getElementById('startJustnowContent');
		
		// sidebar wird entfernt
		var sidebar = null;
			sidebar = document.getElementById('sidebar');
		if (sidebar != null) 
		{
			sidebar.parentNode.removeChild(sidebar);
		}
		
		//
		
	}
	
	function personsSite(){
		var id = url.substring(url.length - 8);
	//	alert(id);
		var h1 = document.getElementById('rahmen').getElementsByTagName('h1')[0].innerHTML;
	//	alert(h1);
		var name = h1.substring(0,h1.indexOf(' Seite') -1);
	//	alert(name);
	
	
		var sidebar = document.getElementById('sidebar');
		var newButton1 = document.createElement('li');
		
		for( i = 0;;i++ )
		{
		
			if( id.indexOf(codes[i]) > -1)
			{
				newButton1.innerHTML = '<font color="blue">nicht mehr anzeigen wenn ' + name + ' online geht</font>';
				newButton1.addEventListener('click',function(){var eing = confirm('Willst du ' + name + ' wirklich löschen?'); if (eing){deletePerson(id,name);} reload();},true);
				break;
			}
			else if( i >= codes.length -1)
			{
				newButton1.innerHTML = '<font color="blue">anzeigen wenn ' + name + ' online geht</font>';
				newButton1.addEventListener('click',function(){addNewPerson(id,name)},true);
				break;
			}
			
		}
		//hinzufügen
			var ul = sidebar.getElementsByTagName('ul')[0];
			ul.appendChild(newButton1);
	}
	
	function messageInbox(){
		if(document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerHTML.indexOf('ungelesen')> -1)
				window.location.href = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[3].getElementsByTagName('a')[0].href.substring(27);	
		GM_setValue('ignoredMessages','0');
		document.getElementById('rahmen').getElementsByTagName('form')[0].innerHTML += '     <input id="allMessages" class="formbutton" type="Button" name="test" value="alle Nachrichten auf eine Seite" >       <input id="sortMessages" class="formbutton" type="Button" name="tesst" value="nachrichten sortieren" >';
		document.getElementById('allMessages').addEventListener('click',function() {NachrichtenAufEineSeite();},true);
		
		//document.getElementById('rahmen').getElementsByTagName('form')[0].innerHTML += '     <input id="sortMessages" class="formbutton" type="Button" name="tesst" value="nachrichten sortieren" >';
		document.getElementById('sortMessages').addEventListener('click',function() {messageInboxAussortieren();},true);
	}
	
		function NachrichtenAufEineSeite(){
			document.getElementById('rahmen').getElementsByTagName('form')[0].removeChild(document.getElementById('allMessages'));
			document.getElementsByTagName('table')[0].id = 'Tabelle0';
			var SeitenAnzahl = Math.ceil(parseInt(document.getElementById('rahmen').getElementsByTagName('p')[1].innerHTML.split(' ')[3]) / 10);
			AufEineListe(SeitenAnzahl,'<th>Aktionen</th>',25,'</table>',0,'http://www.wer-kennt-wen.de/messages/inbox/sort/messages/0/0/',10,'Tabelle0');
		}
		
		function messageInboxAussortieren(){
			var Eingabe = prompt('Gib den namen der person ein, die du aussortiert haben willst');
			nachrichtenAnzahl = document.getElementById('rahmen').getElementsByTagName('p')[1].innerHTML.split(' ')[3];
			var test = 0;
			NachrichtenAufEineSeite();
			var SeitenAnzahl = Math.ceil(parseInt(document.getElementById('rahmen').getElementsByTagName('p')[1].innerHTML.split(' ')[3]) / 10);
			for(var j = 0; j < SeitenAnzahl; j++){
				for(var i = 1; i < 10; i++){
					//alert( i + '   ' + j );
					if (document.getElementsByTagName('tbody')[j].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML.indexOf(Eingabe) > -1)
					{
						test++;
					}
				}
				alert('seite' + j + ': ' + test);
			}
			
		}
	
	function AufEineListe(SeitenAnzahl,startW,startZ,stopW,stopZ,URL,Multiplikator,id){
			for (i = 1;i < SeitenAnzahl;i++)
			{
					GM_xmlhttpRequest({
						method: 'GET',
						url: URL + i*Multiplikator,
						onload: function(responseDetails) {
							//sucht die Nachrichten raus 
							var start = responseDetails.responseText.indexOf(startW) + startZ;
							var stop  = responseDetails.responseText.indexOf(stopW) - stopZ; 
							
							document.getElementById(id).innerHTML += '<p> ----- ----- </p>' + responseDetails.responseText.substring(start,stop);
						}
					});			
			}
	}
			
	
	function logoutSuccess(){
		for(i = 0; i < codes.length; i++)
			GM_setValue('V_' + codes[i],false);
			
		window.location.href = 'http://www.wer-kennt-wen.de';
	}
	
	function addHomepage(){
		var HPLink = document.createElement('p');
		HPLink.innerHTML = '<a id = "hpLink" > AllInOneSkript Homepage</a>';
		document.getElementById('footer').appendChild(HPLink);
		document.getElementById('hpLink').addEventListener('click',function(){GM_openInTab('http://userscripts.org/scripts/show/78329');},true);
	}

	//----------------------------------------	
	//mainFunktion
	function main(){
		
			//Seitenauswahl	
			url = document.URL;
			if ( url.indexOf('success') > -1)
			{
				if( url.indexOf('logout') > -1)
					logoutSuccess();
				else
					window.location.href = 'http://www.wer-kennt-wen.de/start';
			}
			else
			{
				//fügt string die Funktion endsWith hinzu
				String.prototype.endsWith = function(str)
				{return (this.match(str+"$")==str)}
		
				//verändert das aussehen via css
			// überschriftfarbe	
				if ( GM_getValue('HColor',null) != null)
					addGlobalStyle('h1,h2,h3 { color: ' + GM_getValue('HColor',null) + ' ! important; }');
			// Hintergrundfarbe
				if ( GM_getValue('bgColor',null) != null)
					addGlobalStyle('body {background: ' + GM_getValue('bgColor',null) + ' ! important; }');
			//link farbe
				if ( GM_getValue('LColor',null) != null)
					addGlobalStyle('a {color:'+GM_getValue('LColor',null)+' ! important; }');
			// schriftfarbe
				if( GM_getValue('FColor',null) != null)
					addGlobalStyle('body,p,label {color: ' + GM_getValue('FColor',null) + '!important;}');
		
				if ( document.getElementById('flag') == null){
					//flag ( damit das nur einmal angewendet wird )
					var flag = document.createElement('p');
					flag.id = 'flag';
					document.body.appendChild(flag);
			
					initVars();
			
					// einbinden von anderem script
					//if ( url.indexOf('people/online') == -1)
					//	createElement();
				
					//Achtung: Quelltext wird zurück gesetzt
					ersetzen();
					addButtons();
			addHomepage();
		
			// imageZoom
		
				imageZoom();
			// komplettCheckbutton
			//	KomplettCheck();

			//wenn neue Nachrichten bei Bestätigung zum posteingang wechseln
			var newMessage = document.getElementById('rahmen').getElementsByTagName('div')[0].innerHTML.indexOf(' neue Nachricht');
			if (newMessage > -1 && !(url.indexOf('messages/inbox') > -1))
			{
				var newMessageAnzahl = document.getElementById('rahmen').getElementsByTagName('div')[0].innerHTML.substring(document.getElementById('rahmen').getElementsByTagName('div')[0].innerHTML.indexOf('Du hast') + 7 + 27,newMessage);
// ignore messages :
					if(GM_getValue('ignoredMessages',null) != newMessageAnzahl)
					Eingabe = confirm('du hast ' + newMessageAnzahl + ' neue nachrichten \n zum Posteingang wechseln?');
						if (Eingabe)
							window.location.href = 'http://www.wer-kennt-wen.de/messages/inbox';	
						else
							GM_setValue('ignoredMessages',newMessageAnzahl);
			}	
			
				justonline();
				if (url.indexOf('people') > -1)
				{
					addLikelyButton();
					if (url.endsWith('/online'))
						peopleOnline();
				}
				else if (url.indexOf('settings/privacy') > -1)
					settingsPrivacy();
				else if (url.indexOf('start') > -1)
					start();
				else if (url.indexOf('person') > -1)
					personsSite();
				else if ( url.indexOf('message/inbox') > -1)
					messageInbox();
			
				else if ( url.indexOf('news') > -1)
				{
					if ( url.indexOf('news/justnow') > -1)
					{
						var SeitenAnzahl = document.getElementById('content_main').getElementsByTagName('div');
							SeitenAnzahl = SeitenAnzahl[SeitenAnzahl.length - 1].getElementsByTagName('a');;
							SeitenAnzahl = SeitenAnzahl[SeitenAnzahl.length - 2].innerHTML;
							AufEineListe(SeitenAnzahl,'<div class="jn_entry clearfix">',0,'<div class ="center">',6,'http://www.wer-kennt-wen.de/news/justnow/0/page/2',1,'startJustnowContent');
					}	
					else if ( url.indexOf('news/activity') > -1)
					{
						var SeitenAnzahl = document.getElementById('content_main').getElementsByTagName('div');
							SeitenAnzahl = SeitenAnzahl[SeitenAnzahl.length - 1].getElementsByTagName('a');;
							SeitenAnzahl = SeitenAnzahl[SeitenAnzahl.length - 2].innerHTML;
						AufEineListe(SeitenAnzahl,'cellspacing',17,'</table>',0,'http://www.wer-kennt-wen.de/news/activity/sort/activities/0/0/',10,'activityList');
					}	
				}
			
				else if ( url.indexOf('error/rights') > -1)
					logoutSuccess();
			}	
		}
	}
}
	
//ruft das GM Script erst auf wenn wkw fertig geladen hat	
window.addEventListener('load',main,true);	

// geändertes!!! Skript von markus J (alias WaschbärSiegen)
var person_a = new Array()
var bilder_a = new Array()
var vorname_a = new Array()
var version = '2010.09.05';
var anordnung;
		
	function style(){
		anordnung = GM_getValue('anordnung',2);
		GM_setValue('anordnung',prompt('wie viele Spalten?'));
		if (anordnung >= 5 || anordnung <= 0)
			style();
		justonline();
	}


	function hilfeanzeigen(){
		Eingabe = confirm('Jetzt online! \nVersion: '+version+' \nWKW-Gruppe: http://www.wer-kennt-wen.de/club/eqppbhod \n\nMöchtens Du jetzt nachsehen ob es schon eine neuere Version gibt?');
		if (Eingabe)
			window.location.href = 'http://userscripts.org/scripts/show/85339';
		}

	function justonline(){
		anordnung = GM_getValue('anordnung',2); 

		//Die Seite mit der Onlineliste abfragen
		GM_xmlhttpRequest({
		method: 'GET',
    		url: 'http://www.wer-kennt-wen.de/people/online',
    		onload: function(responseDetails) {
			//Position zum kürzen ermitteln Anfang
        		var start = responseDetails.responseText.indexOf('<div class="pl-pic">')-50;
			//Position zum kürzen ermitteln Ende
			var stop  = responseDetails.responseText.indexOf('<h2 id="invHeader">');  

                	//Quellcode kürzen
			var quellcode_orginal = responseDetails.responseText.substring(start,stop);

			//Findet das Kürzel für die Person.
			var treffer = quellcode_orginal.match(/([A-Za-z0-9]{8})\" class=\"online\"/g);
			if ( treffer != null ) {
				for( i=0; i < treffer.length; i++ ) {			
				person_a.push(treffer[i].substr(0,8));
				}
				//alert(person_a);
			}
			// Findet alle "medium" Bilder
			var treffer = quellcode_orginal.match(/http:([./0-9a-zA-Z_]){1,}medium([./0-9a-zA-Z_]){1,}(jpg|gif)/g);
			if ( treffer != null ) {
				for( i=0; i < treffer.length; i++ ) {			
				bilder_a.push(treffer[i]+' \n');
				}
				//alert(bilder_a);
			
			//findet vornamen
				var treffer = quellcode_orginal.match(/alt=\"([A-Za-z0-9]){1,}\b/g);			
				for( i=0; i < treffer.length; i++ ) {			
					vorname_a.push(treffer[i].substr(5));
				}
				//alert(vorname_a);
			}

			//Anzahl der Onlinefreunde ermitteln
			var anz_online = quellcode_orginal.match(/class=\"online\"/g);
			if ( treffer != null ) {			
 					if( anz_online.length == 1 ){
						var text = 'Eine Person ist online';
					}
					else if( anz_online.length > 1 ){
						var text = anz_online.length+' Leute sind online';
					}
			}
			else{
				var text = 'Niemand ist online';
			}	
			
			//Onlineliste generieren
			var element = document.createElement('table');
		
			HTML = '<table class="photolist"><tbody><tr><td colspan="' + anordnung + '"><h2><span>'+text+'<img style="cursor: pointer;" src="http://static.werkenntwen.de/images/icons/help_h2.gif" class="needHelp right" id="hilfetext" alt="Info zu Jetzt online!" title="Info zu Jetzt online!" value"hilfeanzeigen"></span></h2></tr>';

			// Ist niemand online bastel auch keine Tabelle
			if ( anz_online != null ){ 

					// (Anzahl Freunde online) / (2) ergibt aufgerundet die Anzahl der <TR>
					var anz = anz_online.length / anordnung;		
					anz_TR = Math.round(anz);

					// a als Zähler für die Ausgabe von den 3 Arrays person_a, bilder_a, vornamen_a
					a = 0;

					// 1. Schleife erstellt <TD> dann 2. Scheife für 2 <TD> und </TD> nach dem break;
			
					for( i=0; i < anz_TR; i++) {
						HTML += '</tr>';
						for( x=0; x < anordnung; x++) {
							if ( a == anz_online.length){
								HTML += '<td></td>';
								break;
							}					
							HTML  += '<td><div class="pl-pic"><a href="/person/'+person_a[a]+'" class="online"><img src="http://static.werkenntwen.de/images/icon_ok.gif" border="0"></a> <a href="/person/'+person_a[a]+'"><img src="'+bilder_a[a]+'" alt="'+vorname_a[a]+'" title="'+vorname_a[a]+'" border="0"></a></div><a href="/person/'+person_a[a]+'" style="font-size:20">'+vorname_a[a]+'</a><br><a href="/message/toUser/'+person_a[a]+'"><img src="http://static.werkenntwen.de/images/icons/icon_user_message.gif" title="Nachricht an '+vorname_a[a]+'"></a>&nbsp;<a href="/interconnection/invite/'+person_a[a]+'/type/1"><img src="http://static.werkenntwen.de/images/icons/icon_controller.gif" title="Mit '+vorname_a[a]+' Wer gewinnt? spielen"></a>&nbsp;<a href="javascript:void(window.open(\'/chat.php?user='+person_a[a]+'\', \'chat_'+person_a[a]+'\', \'width=550,height=490,resizable=no\')\)\;"><img src="http://static.werkenntwen.de/images/icons/icon_chat.gif" title="Mit '+vorname_a[a]+' chatten"></a></td>';
							a++;
						}
						HTML += '</tr>';
					}
	
				// Ausgabe der Liste in 1 Spalte
				////////////////////////////////
				
				HTML += '<tr><td colspan="' + anordnung + '"><h2><span><a href="#" id="styleaendern" alt="Style ändern" title="Style ändern" value"style" font-weight:bold>Style ändern</a>&nbsp;|&nbsp;<a href="http://www.wer-kennt-wen.de/club/eqppbhod">Gruppe</a></span></h2></td></tr>';
			}
			HTML += '</tbody></table>';
			
			

			if( document.getElementById('hilfetext') == null)
			{
				element.innerHTML = HTML;
				element.id = 'element';
				document.body.appendChild(element);
			}	
			else
			{
				document.getElementById('element').innerHTML = HTML;
			}
			
			
			document.getElementById('hilfetext').addEventListener('click',function(){hilfeanzeigen();},true);
			document.getElementById('styleaendern').addEventListener('click',function(){style();},true);
			}//Ende onload
		});
		window.setTimeout(function(){justonline();},10000);
	}



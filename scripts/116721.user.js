// ==UserScript==
// @name           WKW Einlader 2
// @author         Schlumpf
// @version        2.3 beta
// @description    Läd alle die du kennst in zu einer Gruppe ein [BETA]

// @namespace      WKW_Einlader_2
// @include        http://www.wer-kennt-wen.de/club/invite/*
// @include        http://www.wer-kennt-wen.de/event/invitefriends/*
// @require        http://www.google.com/recaptcha/api/js/recaptcha_ajax.js
// ==/UserScript==

var version = "2.3"
update_check();

GM_addStyle('#anzeige .uiWkwSortContainer{\
				text-align: left;\
			}\
			#anzeige .uiWkwSortContainer p{\
				width: 120px;\
				display: inline-block;\
			}\
			#anzeige .uiWkwSortContainer ul{\
				margin-left: 0 !important;\
			}\
			#anzeige .uiWkwSortContainer ul li{\
				margin: 0 1em 0 0 !important;\
			}\
			.readonly{\
				width: 400px;\
				height:16px;\
				display: inline-block;\
				overflow: hidden;\
				white-space: nowrap;\
			}\
			.bar_rahmen2{\
				background-position: 0 0;\
				width: 160px;\
				vertical-align: middle;\
				display:inline-block;\
				margin-right: 5px;\
			}\
			.bar_rahmen2, .bar_rahmen2 div{\
				background: url("http://static.werkenntwen.de/images/profile/completion_status/wkw-profile-status.jpg") no-repeat scroll 0 0 transparent;\
				height:26px;\
			}\
			.bar_rahmen2 div{\
				background-position: 0 -36px;\
			}\
			.arbeite{\
				margin-right: 5px !important;\
				background-position: -22px 0 !important;\
				background-image: url("data:image/gif;base64,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") !important;\
			}\
			.warte{\
				margin-right: 0px !important;\
				background-position: -22px 0 !important;\
				background-image: url("data:image/gif;base64,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") !important;\
			}\
			.aktiv{\
				background-position: -44px 0 !important;\
			}\
			.inaktiv{\
				background-position: 0px 0 !important;\
				color: #999999;\
			}');


// include ReCaptcha
 var script = document.createElement('script');script.setAttribute('src', 'http://www.google.com/recaptcha/api/js/recaptcha_ajax.js');
	document.getElementsByTagName('html')[0].appendChild(script);
	setTimeout(function(){Recaptcha = unsafeWindow.Recaptcha;},1000);

// Globale Variablen
var was = String(String(document.URL.match(/\/\w+\/invite/)).slice(1,-7));	// club oder event
var grp_id = String(String(document.URL.match(/invite\/\w+/)).substr(7));	// Gruppen/Event-ID
var anz_seiten = 0; 														// Anzahl der Seiten
var pers_array = new Array(); 												// Alle gefundenen Personen
var anz_pers = 0;															// Anzahl der gefundenen Personen
var verzoegerung = GM_getValue("verzoegerung", 0);							// Verzögerung zwischen Seitenaufrufen (gegen Captchas)
var eingeladene = 0;														// Zusammenfassung: Eingeladene Leute
var abgelehnte = 0;															// Zusammenfassung: Leute, die schon abgelehnt haben
var sonstige = 0;															// Zusammenfassung: Meldungen, die nch nicht zugeortnet werden konnten

var einlade_url = "invite"; 
if(was == "event"){
	einlade_url = "invitefriends";
	grp_id = String(String(document.URL.match(/invitefriends\/\w+/)).substr(14));
}


// neue Anzeige <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var header = document.createElement('h2');
	var h2_span = document.createElement('span');
		h2_span.appendChild( document.createTextNode("WKW-Einlader 2") );
	header.appendChild( h2_span );
document.getElementById('rahmen').insertBefore(header, document.getElementsByTagName('h2')[0]);

var anzeige = document.createElement('div');
	anzeige.setAttribute('class','uiActionBar dockToHeadline');
	anzeige.setAttribute('id','anzeige');
document.getElementById('rahmen').insertBefore(anzeige, header.nextSibling);

var arbeite =  document.createElement('span');
	arbeite.setAttribute('class','uiActionBarIcon arbeite inaktiv');
anzeige.appendChild(arbeite);

var warte =  document.createElement('span');
	warte.setAttribute('class','uiActionBarIcon warte inaktiv');
anzeige.appendChild(warte);

// Button1 erstellen & anzeigen
var button1 = document.createElement('span');
	button1.setAttribute('class','uiButton inviteUser');
	button1.setAttribute('style','margin-left:5px;');
	button1.addEventListener("click",leute_suchen,false)
	var button1i = document.createElement('a');
		button1i.setAttribute('class','uiIcon icon-user_add');
		button1i.appendChild( document.createTextNode("Alle einladen") );
	button1.appendChild(button1i);
anzeige.appendChild(button1);

// Einstellungen Button erstellen & anzeigen
var button2 = document.createElement('span');
	button2.setAttribute('class','uiButton inviteUser');
	button2.setAttribute('style','margin-left:5px;');
	button2.addEventListener("click",einstellungen_anzeigen,false)
	var button2i = document.createElement('a');
		button2i.setAttribute('class','uiIcon icon-user_add');
		button2i.appendChild( document.createTextNode("Einstellungen") );
	button2.appendChild(button2i);
anzeige.appendChild(button2);


	

var anzeige2 = document.createElement('div');
	anzeige2.setAttribute('class','uiWkwSortContainer');

	var anzeige21 = document.createElement('p');
		anzeige21.appendChild( document.createTextNode("Aktionen:") );
	anzeige2.appendChild(anzeige21 );

	var anzeige22 = document.createElement('ul');

		var anzeige221 = document.createElement('li');
			anzeige221.appendChild( document.createTextNode("1. Seiten scannen") );
			anzeige221.setAttribute('class','inaktiv');
		anzeige22.appendChild(anzeige221 );

		var anzeige222 = document.createElement('li');
			anzeige222.appendChild( document.createTextNode("2. Leute einladen") );
			anzeige222.setAttribute('class','inaktiv');
		anzeige22.appendChild(anzeige222);

	anzeige2.appendChild(anzeige22 );

anzeige.appendChild( anzeige2 );

var anzeige3 = document.createElement('div');
	anzeige3.setAttribute('class','uiWkwSortContainer');
	var anzeige31 = document.createElement('p');
		anzeige31.appendChild( document.createTextNode("Fortschritt: ") );
	anzeige3.appendChild(anzeige31 );
	
	var bar_rahmen = document.createElement('div');
		bar_rahmen.setAttribute('class','bar_rahmen2');
		var bar = document.createElement('div');
			bar.style.width = "0%";
		bar_rahmen.appendChild( bar );
	anzeige3.appendChild( bar_rahmen );
	var az_akt = document.createElement('span');
		az_akt.appendChild( document.createTextNode("0") );
	anzeige3.appendChild( az_akt );
	var az_von = document.createElement('span');
		az_von.appendChild( document.createTextNode(" / ") );
	anzeige3.appendChild( az_von );
	var az_anz = document.createElement('span');
		az_anz.appendChild( document.createTextNode("0") );
	anzeige3.appendChild( az_anz );
anzeige.appendChild( anzeige3 );


var anzeige4 = document.createElement('div');
	anzeige4.setAttribute('class','uiWkwSortContainer');
	var anzeige41 = document.createElement('p');
		anzeige41.appendChild( document.createTextNode("Aktuelle Meldung: ") );
	anzeige4.appendChild(anzeige41 );
	
	var az_meldung = document.createElement('span');
		az_meldung.setAttribute('class','textBox readonly');
		az_meldung.innerHTML = "Alle einladen oder Einstellungen ändern."
	anzeige4.appendChild(az_meldung );
anzeige.appendChild( anzeige4 );


// ------------------------------------------------------------------------------------------------
// 1. Schritt
// ------------------------------------------------------------------------------------------------
function leute_suchen(){
	// Seiten zählen
	anz_seiten = seiten_zaehlen();
	if(anz_seiten > 0){
		// anzeige_alt schalten
		button1.removeEventListener("click", leute_suchen);
		button2.removeEventListener("click", einstellungen_anzeigen);
		button1.setAttribute('class','uiButton inviteUser disabled-uiButton');
		button2.setAttribute('class','uiButton inviteUser disabled-uiButton');

		az_meldung.innerHTML = "Lese " + anz_seiten + " Seiten."
		az_anz.innerHTML = anz_seiten;

		// Seiten lesen (Rekursiv)
		anzeige221.setAttribute('class','');
		seite_lesen(1);
	}
}





// Seite lesen und rekursiv nächste laden
function seite_lesen(seite){
	warte.setAttribute('class','uiActionBarIcon warte');
	arbeite.setAttribute('class','uiActionBarIcon arbeite');
	console.log("Lese Seite: "+seite);
	if(seite <= anz_seiten){
		arbeite.setAttribute('class','uiActionBarIcon arbeite aktiv');
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.wer-kennt-wen.de/"+was+"/"+einlade_url+"/"+grp_id+"/sort/friends/0/1/"+( (seite-1) *30),
			onload: function(response) {
				//alert(response.responseText);
				 seite_scannen(response.responseText);

				// Progress-Bar in anzeige_alt laufen lassen
				bar.style.width = seite*100/anz_seiten+"%";
				az_akt.innerHTML = seite;
				arbeite.setAttribute('class','uiActionBarIcon arbeite');

				// nächste Seite laden
				warte.setAttribute('class','uiActionBarIcon warte aktiv');
				setTimeout(function(){seite_lesen(++seite);}, verzoegerung);
			}
		});


	// wenn fertig
	}else{
		anz_pers = pers_array.length;
		az_anz.innerHTML = anz_pers;

		// zu Schritt 2
		leute_einladen();
	}
}



// Eine Seite nach Personen durchsuchen
function seite_scannen(code){
	// scannen
	var regexp = code.match(/inviteUser\/\w+\/user\/\w+/g);

	// Wenn jemand zum einladen gefunden wurde
	if(regexp){
		// gefundenene Personen in Array speichern
		for(var i=0; i<regexp.length; i++){
			var id = String(regexp[i].match(/user\/\w+/g)).substr(5);
			pers_array.push(id);
		}
	}
}




// ------------------------------------------------------------------------------------------------
// 2. Schritt
// ------------------------------------------------------------------------------------------------
function leute_einladen(){
	// Einladen (rekursiv)
	anzeige221.setAttribute('class','inaktiv');
	anzeige222.setAttribute('class','');

	pers_einladen(0);
}


function pers_einladen(pers){
	console.log("Lade ein: "+pers);
	warte.setAttribute('class','uiActionBarIcon warte');
	arbeite.setAttribute('class','uiActionBarIcon arbeite');
	if(pers < anz_pers){
		arbeite.setAttribute('class','uiActionBarIcon arbeite aktiv');
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.wer-kennt-wen.de/"+was+"/inviteUser/"+grp_id+"/user/"+pers_array[pers],
			headers: {"Content-Type": "application/json", "Accept": "application/json, text/javascript, */*", "X-Requested-With": "XMLHttpRequest"},
			onload: function(response) {
				//console.log(pers+" antwortet: "+response.responseText);

				// Json parsen
				var antwort = JSON.parse(response.responseText);
				
				// Wenn Captcha
				if(antwort["WkwMessage"]["Error"] == "CAPTCHA"){
					az_meldung.innerHTML = "Auf Captcha gestoßen! Evtl. Verzögerungszeit ändern.";
					captcha_ein(pers);
				
				// Wenn kein Captcha
				}else{
					// Progress-Bar in anzeige_alt laufen lassen
					bar.style.width = (pers+1)*100/anz_pers+"%";
					az_akt.innerHTML = pers;
					arbeite.setAttribute('class','uiActionBarIcon arbeite');

					// Antworten ausgeben
					az_meldung.innerHTML = antwort['result'] + ": " + antwort['message'];

					if(antwort['result'] == 9006 || antwort['result'] == 1000){
						eingeladene++;
					}else if(antwort['result'] == 9101){
						abgelehnte++;
					}else{
						sonstige++;
					}

					// nächste Seite laden
					warte.setAttribute('class','uiActionBarIcon warte aktiv');
					setTimeout(function(){pers_einladen(++pers);}, verzoegerung);
				}
			}
		});


	// wenn fertig
	}else{
		anzeige221.setAttribute('class','inaktiv');
		anzeige222.setAttribute('class','inaktiv');
		arbeite.setAttribute('class','uiActionBarIcon arbeite inaktiv');
		warte.setAttribute('class','uiActionBarIcon warte inaktiv');

		az_akt.innerHTML = anz_pers;
		az_meldung.innerHTML = "Fertig :o)"

		// Zusammenfassung
		var anzeige6 = document.createElement('div');
			anzeige6.setAttribute('class','uiWkwSortContainer');
			var anzeige61 = document.createElement('p');
				anzeige61.appendChild( document.createTextNode("Zusammenfassung: ") );
			anzeige6.appendChild(anzeige61 );
			var anzeige62 = document.createElement('span');
				anzeige62.appendChild( document.createTextNode(eingeladene+" Leute wurden eingeladen.") );
			anzeige6.appendChild(anzeige62 );
			anzeige6.appendChild( document.createElement('br') );
			anzeige6.appendChild( document.createElement('p') );
			var anzeige63 = document.createElement('span');
				anzeige63.appendChild( document.createTextNode(abgelehnte+" Leute haben eine Einladung bereits abgelehnt.") );
			anzeige6.appendChild(anzeige63 );
			anzeige6.appendChild( document.createElement('br') );
			anzeige6.appendChild( document.createElement('p') );
			var anzeige64 = document.createElement('span');
				anzeige64.appendChild( document.createTextNode(sonstige+" unbekannte Meldungen.") );
			anzeige6.appendChild(anzeige64 );
		anzeige.appendChild( anzeige6 );
	}
}


function captcha_ein(p){
	// Captcha-DIV anlegen
	var anzeige5 = document.createElement('div');
		anzeige5.setAttribute('class','uiWkwSortContainer');
		var anzeige51 = document.createElement('p');
			anzeige51.appendChild( document.createTextNode("Captcha:") );
		anzeige5.appendChild(anzeige51 );
		var captcha = document.createElement('div');
			captcha.setAttribute('id','captcha');
			captcha.setAttribute('style','');
			captcha.appendChild( document.createTextNode("Hier sollte das Captcha sein. Wenn nicht, bitte Seite neu laden und von neuem versuchen.") );
		anzeige5.appendChild(captcha);
	anzeige.appendChild(anzeige5);



	

	//Captcha erzeugen
	Recaptcha.create("6LclbQIAAAAAACO4sj4OQ4JrDVpsiDds7X6jt9LD", 'captcha',{
		theme: "red",
		callback: function() {
			var submit = document.createElement('input');
				submit.setAttribute('type','button');
				submit.setAttribute('value', 'Absenden');
				submit.setAttribute('id', 'submit');
				submit.addEventListener("click",function() {
					GM_xmlhttpRequest({
						method: "POST",
						url: "http://www.wer-kennt-wen.de/captcha/validate/",
						data: "recaptcha_challenge_field="+Recaptcha.get_challenge()+"&recaptcha_response_field="+Recaptcha.get_response(),
						headers: {"Content-Type": "application/x-www-form-urlencoded"},
						onload: function(response) {
							anzeige.removeChild(anzeige5);
							pers_einladen(p);
						}
					});
				},false)
			anzeige5.appendChild(submit);
		}
	});
}




// ------------------------------------------------------------------------------------------------
// Funktionen
// ------------------------------------------------------------------------------------------------

// Seiten zählen
function seiten_zaehlen(){
	if( String(String(document.URL.match(/userView\/\w+/)).substr(9)) == "list" ){
		alert("Bitte die Ansicht von Liste auf Raster ändern.");
		return 0;
	}
	var div_seiten = document.getElementsByClassName('invitePagination')[0];
	var as = 0;
	var a = div_seiten.getElementsByTagName("a");
	for(var i=0; i<a.length; i++){
		if(!isNaN(parseInt(a[i].innerHTML)) && parseInt(a[i].innerHTML) > as){
			as = a[i].innerHTML;
		}
	}
	return as;
}

// Updatecheck
function update_check(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://userscripts.org/scripts/source/116721.user.js",
		onload: function(response) {
			var eigene_version = version.match(/\d+/g);
			var fremde_version = String(response.responseText.match(/@version\s+\d+.\d+/)).match(/\d+/g);
			console.log( "Updatecheck:\nEigene Version: "+eigene_version[0]+"."+eigene_version[1]+"\nNeueste Version: "+fremde_version[0]+"."+fremde_version[1] );
			if( fremde_version[0] > eigene_version[0] || (fremde_version[0] >= eigene_version[0] && fremde_version[1] > eigene_version[1]) ){
				var updatelink = document.createElement('a');
					updatelink.setAttribute('href','http://userscripts.org/scripts/show/116721');
					updatelink.style.marginLeft = "5px";
					updatelink.appendChild( document.createTextNode("Es ist ein Update verfügbar!") );
				anzeige.insertBefore(updatelink, anzeige2);
			}
		}
	});
}



// ------------------------------------------------------------------------------------------------
// Einstellungen
// ------------------------------------------------------------------------------------------------

var einst = document.createElement('div');
	einst.setAttribute('class','uiWkwSortContainer');
	einst.innerHTML += '<p>Verzögerung:</p>';
	einst.innerHTML += '<select name="verzoegerung" id="verzoegerung" size="1"><option value="0">keine</option><option value="500">0,5s</option><option value="1000">1s</option><option value="2000">2s</option></select> Das Skript wartet zwischen den Aufrufen die Verzögerungszeit ab. So lassen sich Captchas umgehen.';

var button3 = document.createElement('span');
	button3.setAttribute('class','uiButton inviteUser');
	button3.setAttribute('style','margin-left:5px;');
	button3.addEventListener("click",einstellungen_speichern,false)
	var button3i = document.createElement('a');
		button3i.setAttribute('class','uiIcon icon-save');
		button3i.appendChild( document.createTextNode("speichern") );
	button3.appendChild(button3i);


function einstellungen_anzeigen(){
	button2.removeEventListener("click", einstellungen_anzeigen);
	button1.removeEventListener("click", leute_suchen);
	button1.setAttribute('class','uiButton inviteUser disabled-uiButton');
	button2.setAttribute('class','uiButton inviteUser disabled-uiButton');
	anzeige2.style.display = "none";
	anzeige3.style.display = "none";
	anzeige4.style.display = "none";
	anzeige.insertBefore(button3, button2.nextSibling);
	document.getElementsByClassName('uiActionBar')[0].appendChild(einst);
	einstellungen_laden();
}
function einstellungen_ausblenden(){
	button1.addEventListener("click",leute_suchen,false);
	button2.addEventListener("click",einstellungen_anzeigen,false);
	button1.setAttribute('class','uiButton inviteUser');
	button2.setAttribute('class','uiButton inviteUser');
	anzeige.removeChild(button3);
	document.getElementsByClassName('uiActionBar')[0].removeChild(einst);
	anzeige2.style.display = "block";
	anzeige3.style.display = "block";
	anzeige4.style.display = "block";
}
function einstellungen_speichern(){
	GM_setValue("verzoegerung", document.getElementById("verzoegerung").value);
	verzoegerung = document.getElementById("verzoegerung").value;
	einstellungen_ausblenden();
}
function einstellungen_laden(){
	document.getElementById("verzoegerung").value = GM_getValue("verzoegerung", 0);
}
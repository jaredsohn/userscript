// ==UserScript==
// @name           Banden-Chat-Pennergame-By-Basti1012
// @namespace      http://pennerhack.foren-city.de 
// @description    Banden-Icq-Chat heist das die shoutbox von bannden pennergame als chat benutz wird das heist die die shoutbox ALS VORDERGRUND CHAT ERZEUGT WIRD SO DAS DIE AKTULLEN NEUEN EINTRAEGE ALS KLEINER FRAM CHAT ANGEZEIGT WIRD 
// @include        *pennergame.de*
// @include        *clodogame.fr*
// @include        *berlin.pennergame.de*
// @include        *menelgame.pl/gang/*
// @include        *dossergame.co.uk*
// @include        *mendigogame.es*
// @include        *serserionline.com*
// @include        *bumrise.com*
// @include        *muenchen.pennergame.de*
// @version        MFG BASTI1012
// ==/UserScript==



if (GM_getValue("chatein0") == null){
	GM_setValue("chatein0" ,'111');
}
if (GM_getValue("chatein1") == null){
	GM_setValue("chatein1" ,'111');
}
if (GM_getValue("chatein2") == null){
	GM_setValue("chatein2" ,'black');
}
if (GM_getValue("chatein3") == null){
	GM_setValue("chatein3" ,'red');
}
if (GM_getValue("chatein4") == null){
	GM_setValue("chatein4" ,'green');
}
if (GM_getValue("chatein4a") == null){
	GM_setValue("chatein4a" ,'green');
}
if (GM_getValue("chatein4b") == null){
	GM_setValue("chatein4b" ,'green');
}
if (GM_getValue("chatein5") == null){
	GM_setValue("chatein5" ,'5');
}
if (GM_getValue("chatein6") == null){
	GM_setValue("chatein6" ,'1.9');
}
if (GM_getValue("chatein7") == null){
	GM_setValue("chatein7" ,'11');
}

oben = GM_getValue("chatein0");
links = GM_getValue("chatein1");
hinter = GM_getValue("chatein2");
rfarbe = GM_getValue("chatein3");
sfarbe1 = GM_getValue("chatein4");
sfarbe2 = GM_getValue("chatein4a");
sfarbe3 = GM_getValue("chatein4b");
rbreite = GM_getValue("chatein5");
trnz = GM_getValue("chatein6");
reload = GM_getValue("chatein7");

//-------- ABFRAGE AUF WELCHER PENNERGAME SEITE MAN SICH GERADE AUFAHLTEN TUT -----------------------------------


	if (document.location.href.indexOf("berlin.pennergame.de")>=0) {var link = "http://berlin.pennergame.de"}
		if (document.location.href.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}
	if (document.location.href.indexOf("dossergame")>=0) {var link = "http://www.dossergame.co.uk"}
		if (document.location.href.indexOf("menelgame")>=0) {var link = "http://www.menelgame.pl"}
	if (document.location.href.indexOf("clodogame")>=0) {var link = "http://www.clodogame.fr"}
		if (document.location.href.indexOf("mendigogame.es")>=0) {var link = "http://www.mendigogame.es"}
	if (document.location.href.indexOf("serserionline.com")>=0) {var link = "http://www.serserionline.com"}
		if (document.location.href.indexOf("bumrise")>=0) {var link = "http://www.bumrise.com"}
	if (document.location.href.indexOf("muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}

		
	var NewXtraMenueDiv = document.createElement('div');
	NewXtraMenueDiv.innerHTML = '<span name="PlunderInfoScreen" style="position:absolute;top:'+oben+'px;left:'+links+'px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:'+trnz+';opacity:'+trnz+';border:'+rbreite+'px solid '+rfarbe+'; background-color:'+hinter+';">'


	+'<a href="http://pennerhack.foren-city.de"> <font style=\"color:green; font-size:140%;\">Banden(Shotbox-Chat)</font><a>'
	+'<span style=\"color:red\">'
	+'<b id="eintrag"</b></center><br>'
	+'<center><textarea id="sendetext" name="sendetext" rows="3" style="width: 65%;"></textarea></center>'
	+'<br><input type="button" name="senden" id="senden" value="Senden">'
	+'<a id="einstella" name="einstella">[<span style=\"color:red\">Einstellungen</span>]</a></span></span>';
	document.body.appendChild(NewXtraMenueDiv);



	document.getElementsByName('senden')[0].addEventListener('click', function einstell () {

	sendetext = document.getElementsByName('sendetext')[0].value;
		GM_xmlhttpRequest({
			method: 'POST',
			url: ''+link+'/gang/chat/add/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('f_text='+sendetext+'&Submit=Abschicken'),
			onload: function(responseDetails){
			chat()
			}
		});
	},false);


	document.getElementsByName('einstella')[0].addEventListener('click', function einstell () {
	var NewXtraMenueDiv = document.createElement('div');
	NewXtraMenueDiv.innerHTML = '<span name="PlunderInfoScreen" style="position:absolute;top:222px;left:422px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;border:1px solid red; background-color:black;">'

	+'<span align=\"center\" style=\"color:red;\">Hintergrundsfarbe</span><center>'
	+'<select name=\"chatein2\"><option value=\"white\">Weiss</option><option value=\"black\">Schwarz</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option><option value=\"#FFFFFF\">Pennergame Grau</option></select></center>'
	+'<span align=\"center\" style=\"color:red;\">Rahmenfarbe</span><center>'
	+'<select name=\"chatein3\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>'
	+'<span align=\"center\" style=\"color:red;\">Schrieftfarbe</span><center>'
	+'<select name=\"chatein4\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>'

	+'<span align=\"center\" style=\"color:red;\">Linkfarbe</span><center>'
	+'<select name=\"chatein4a\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>'

	+'<span align=\"center\" style=\"color:red;\">datumfarbe</span><center>'
	+'<select name=\"chatein4b\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>'


	+'<span align=\"center\" style=\"color:red;\">Rahmenbreite</span><center>'
	+'<select name="chatein5"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14 ">14</option><option value="15">15</option></select></center>'
	+'<span align=\"center\" style=\"color:red;\">tranzparente</span><center>'
	+'<select name="chatein6"><option value="0.5">0.5</option><option value="0.6">0.6</option><option value="0.7">0.7</option><option value="0.8">0.8</option><option value="0.9">0.9</option><option value="1.0">1.0</option><option value="1.1">1.1</option><option value="1.2">1.2</option><option value="1.3">1.3</option><option value="1.4">1.4</option><option value="1.5">1.5</option><option value="1.6">1.6</option><option value="1.7">1.7</option><option value="1.8">1.8</option><option value="1.9">1.9</option><option value="2.0">2.0</option></select></center>'
	+'<span align=\"center\" style=\"color:red;\">Von oben(px)</span><center><input name="chatein0" size="10" type="text"><br>'
	+'<span align=\"center\" style=\"color:red;\">Von Links(px)</span><center><input name="chatein1" type="text" size="10" ><li><div align=\"center\"><br>'
	+'<span align=\"center\" style=\"color:red;\">Chat relod Zeit in Sekunden :</span><center>'
	+'<select name="chatein7"><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14 ">14</option><option value="15">15</option></select></center>'


	+'<input type="button" id="sichern"  name="sichern" value="Eingaben speichern">';
	document.body.appendChild(NewXtraMenueDiv);

	document.getElementsByName('chatein0')[0].value = GM_getValue("chatein0");
	document.getElementsByName('chatein1')[0].value = GM_getValue("chatein1");
	document.getElementsByName('chatein2')[0].value = GM_getValue("chatein2");
	document.getElementsByName('chatein3')[0].value = GM_getValue("chatein3");
	document.getElementsByName('chatein4')[0].value = GM_getValue("chatein4");
	document.getElementsByName('chatein4a')[0].value = GM_getValue("chatein4a");
	document.getElementsByName('chatein4b')[0].value = GM_getValue("chatein4b");
	document.getElementsByName('chatein5')[0].value = GM_getValue("chatein5");
	document.getElementsByName('chatein6')[0].value = GM_getValue("chatein6");
	document.getElementsByName('chatein7')[0].value = GM_getValue("chatein7");



	document.getElementsByName('sichern')[0].addEventListener('click', function einstell () {

	chatein0 = document.getElementsByName('chatein0')[0].value;
	chatein1 = document.getElementsByName('chatein1')[0].value;
	chatein2 = document.getElementsByName('chatein2')[0].value;
	chatein3 = document.getElementsByName('chatein3')[0].value;
	chatein4 = document.getElementsByName('chatein4')[0].value;
	chatein4a = document.getElementsByName('chatein4a')[0].value;
	chatein4b = document.getElementsByName('chatein4b')[0].value;

	chatein5 = document.getElementsByName('chatein5')[0].value;
	chatein6 = document.getElementsByName('chatein6')[0].value;
	chatein7 = document.getElementsByName('chatein7')[0].value;

	GM_setValue("chatein0" ,chatein0);
	GM_setValue("chatein1" ,chatein1);
	GM_setValue("chatein2" ,chatein2);
	GM_setValue("chatein3" ,chatein3);		
	GM_setValue("chatein4" ,chatein4);
	GM_setValue("chatein4a" ,chatein4a);
	GM_setValue("chatein4b" ,chatein4b);
	GM_setValue("chatein5" ,chatein5);
	GM_setValue("chatein6" ,chatein6);
	GM_setValue("chatein7" ,chatein7);
	alert("alle datenm gespeichert");
	location.reload();
	},false);
},false);




function chat(){
       GM_xmlhttpRequest({
              method: 'GET',
              url: ''+link+'/gang/',
              onload: function(responseDetails) {
                    var content = responseDetails.responseText;
			shoutboxfeld = content.split('<strong>Shoutbox:</strong>')[1].split('name="Submit"')[0];
			document.getElementById('eintrag').innerHTML = '<b id="eintrag1"</b>';
			for(a=1;a<=10;a++){
				penner = shoutboxfeld.split("href='/profil")[a].split('a>')[0];
				idpenner = penner.split("/id:")[1].split('/')[0];
				namepenner = penner.split('>')[1].split('<')[0];
				smspenne = shoutboxfeld.split('style="padding:2px;">')[a].split('</td>')[0];
				smspenner = smspenne.split('<p>')[1].split('</p>')[0];
				zeitpenner = shoutboxfeld.split('schrieb am ')[a].split(' <a')[0];
				document.getElementById('eintrag1').innerHTML += ''
				+'<br><center> <br><a href="'+link+'/profil/id:'+idpenner+'/"><font color="'+sfarbe3+'">'+namepenner+' </font><font color="'+sfarbe2+'">  '+  zeitpenner  +'</font></a></center><font color="'+sfarbe1+'">'+  smspenner +'</font>';
			}
		}
	});
}


reloada = reload*1000;
window.setInterval(chat, reloada);


// diesess Script ist Copyright By Basti1012 und ist keinen gestattet zu Kopieren oder zu endern
// jede enderung muss mit pennerhack abgeklaert werden und dann ist das in ordnung
// diese regel gilt vorallen fuer leute die bei useerscript die scripte kopiereen und dann als 
// eigenes script ausgeben tuen oder den code endern tuen und somit das script in den dreck 
// ziehen weil ihre scripte nicht mehr richtig laufen .Also leute die ahnung haben und basti1012
// fragen duerfen den code auch benutzen und weiter ausbauen oder co . wer den code (mit erlaubniss von basti102)
// haben den abgemachten satz von basti1012 mit in den script reinzukopieren und somit werden auch die scripte als legale kopie gekenzeichnet

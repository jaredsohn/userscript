// ==UserScript==
// @name           Banden-Shoutbox-Moral-SpamerPennergame 
// @namespace      http://pennerhack.foren-city.de 
// @description    Banden-Shotbox Spamer um die bANDENMORAL WIEDER IN DER HOEHE ZU SCHIESSEN : ALSO ES WERDEN SO VIELE NACHRICHTEN IN DER SHOUTBOX GESENDET BIS DI)E MORAL IM GRUENNEN BEREICH GESTOIEGEN IST 
// @include        *pennergame.de/gang/*
// @include        *clodogame.fr/gang/*
// @include        *berlin.pennergame.de/gang/*
// @include        *menelgame.pl/gang/*
// @include        *dossergame.co.uk/gang/*
// @include        *mendigogame.es/gang/*
// @include        *serserionline.com/gang/*
// @include        *bumrise.com/gang/*
// @include        *muenchen.pennergame.de/gang/*
// @version        Dieses ist eine version die bei Pennergame nicht erlauibt ist da es automatisch senden tut und gleichzeitig spamen und durch das spamen wird die Moral in der hoehe getrieben und somit ist das eine illegale version .MFG BASTI1012
// ==/UserScript==

//Banden-Shoutbox-Moral-Spamer
//Das Script sendet so oft deine gespeicherte Nachricht in der Shoutbox wie du wolltest . Der sinn des Spamen ist es das die Bandenmoral da durch steigen tut. Dieses Script ist durch einen Wunsch erstanden und macht das was hier beschrieben ist . Ob die mopral dadurch wirklich steigen tut kann ich nicht sagen . Währen des spamens wird die aktuelle Moral abgefragt siehe unten da kann man beim Spamen sehen ob die moral steigen tut oder nicht. Alsdo wie gesagt das Script ist dazu gedacht eine anzahl von nachrichten in wennigen sekunden in der shoutbox zu senden 

if(GM_getValue("spamtextt")==null){
	GM_setValue("spamtextt" ,'Dieser Text wurde durch das Script ( Shotbox-Bandenmoral-Spam) erstellt um die Bandenmoral zu steigern.Das heist, das Script Spamt die Bandenshoutbox voll solange bis die Bandenmoral wieder im grünen bereich ist.Wer immer das Script in der Bande benutzen tut sollte das miot seiner Bande anklären damit es keine Probleme gibt .aklso bitte daran denken das Script wurde ausschlieslich nur dazu gebaut um die Bandenmoral zu erhöhen ( wenn die Bande zustimmen tut ). Das Script wurde von Basti1012 gebaut [url]http://pennerhack.foren-city.de[/url].');
}

	if (document.location.href.indexOf("berlin.pennergame.de")>=0) {var link = "http://berlin.pennergame.de"}
		if (document.location.href.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}
	if (document.location.href.indexOf("dossergame")>=0) {var link = "http://www.dossergame.co.uk"}
		if (document.location.href.indexOf("menelgame")>=0) {var link = "http://www.menelgame.pl"}
	if (document.location.href.indexOf("clodogame")>=0) {var link = "http://www.clodogame.fr"}
		if (document.location.href.indexOf("mendigogame.es")>=0) {var link = "http://www.mendigogame.es"}
	if (document.location.href.indexOf("serserionline.com")>=0) {var link = "http://www.serserionline.com"}
		if (document.location.href.indexOf("bumrise")>=0) {var link = "http://www.bumrise.com"}
	if (document.location.href.indexOf("muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}

	var neu = document.getElementById('content-bottom');
	SubmitButtonHTML = '<font color=\"orange\">Der Shoutbox spam dient dazu um die Bandenmoral wieder in hohen bereich zu bekommen <br>Je mehr die Shoutbox benutzt wird um so besser der zusammen halt <br>Also einfach die menge der Nachrichten eingeben und das Script spamt in Sekunden die angegebene menge in der Shoutbox.<br>Dieses Script dient nur dazu um die Moral zu steigern,wer seine Bande damiot nerven tut kann probleme mit seiner Bande kriegen weil das Script spamt soviel Nachrichten in der Shoutbox wie du eingegeben hast<br>Script von Basti1012 <a href="http://pennerhack.foren-city.de">Bastis Seite</a> </font><br><br><br><br><br><br><br><br><br><br><br><br>Kuck nicht so bl&ouml;de,hier ist die Seite zu Ende.Wenn du mehr sehen willst klicke <a href="http://pennerhack.foren-city.de">Hier</a>';
	var newp = document.createElement("table");
	newp.innerHTML = ''
	+'<br><br><br><br><br><br><br>Menge der Nachrichten : <input type="text" name="menge" value="1">Angegebene menge und Text spamen :<input type="button" name="spam" value="Text Spamen">Einstellungen :<input type="button" name="ein" value="Einstellungen"><br><b id="einstellu"</b><br><b id="moral"</b><br><b id="spammer"</b>'
	var newli = document.createElement("tr");
	newli.appendChild(newp);
	newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
	neu.appendChild(newli);

	document.getElementsByName('spam')[0].addEventListener('click', function save_spenden () {
		menge = document.getElementsByName('menge')[0].value;
		a=0;
		spamen(menge,a)
	},false);

	document.getElementsByName('ein')[0].addEventListener('click', function save_spenden () {
		document.getElementById('einstellu').innerHTML += '<font color=\"yellow\"><h1>Einstellungen des Banden-Moral_spams</h1></font>'
		+'Text der Gesendet werden soll '
		+'<br><textarea id="spamfeld" name="spamfeld" rows="5" style="width: 95%;" ></textarea>'
		+'<input type="button" name="einstellungenspeichern" value="Speichern">';
		document.getElementsByName('spamfeld')[0].value = GM_getValue("spamtextt");
		document.getElementsByName('einstellungenspeichern')[0].addEventListener('click', function save_spenden () {
			spamtextt = document.getElementsByName('spamfeld')[0].value;
			GM_setValue("spamtextt", spamtextt);
			alert("Neuer text dere gesendet wird\n\n"+GM_getValue("spamtextt")+"\n\nMfg Basti1012\n\nBitte dran denken das Script solte nur benutzt werden wenn ihr euch mit eure Bande absprechen tut ,ansonsten kann eure Bande sauer auf euch sein wenn ihr die gaqnze Shoutbox voll Spamen tut ,weil bitte dran denken das Script sendet bis zu 200 Nachrichten die Minuten in der Shoutbox");
			location.reload();
		},false);
	},false);

function spamen(menge,a){
	var moralprozent = document.getElementById("content").innerHTML;
	hoehemoral = moralprozent.split('0); width: ')[1].split('px')[0];
	document.getElementById('moral').innerHTML = 'Aktuelle Moral: ('+hoehemoral+')<br><tr><td width="251"><div style="background-color: rgb(72, 54, 54); height: 14px; border: 1px solid rgb(41, 41, 41);" align="right">&nbsp;</div></td><td width="249"><div style="background-color: rgb(54, 72, 54); height: 14px; border: 1px solid rgb(41, 41, 41);" align="left"><div style="border-right: 1px solid rgb(41, 41, 41); background: none repeat scroll 0% 0% rgb(0, 102, 0); width: '+hoehemoral+'px; height: 14px;"></div></div></td></tr>';
	if(hoehemoral>=0){
		spamtexta = '<a class="tooltip" href="/help/bbcode/">[Gesendeter Text]<span>'+GM_getValue("spamtextt")+'</span></a>';
		if(a<=menge){
			GM_xmlhttpRequest({
				method: 'POST',
				url: ''+link+'/gang/chat/add/',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: encodeURI('f_text='+GM_getValue("spamtextt")+'&Submit=Abschicken'),
				onload: function(responseDetails){
					document.getElementById('spammer').innerHTML = '<font color=\"green\">sende '+a+' von '+menge+' nachrichten '+spamtexta+'</font>';
					a++;
					spamen(menge,a)
				}
			});
		}else{
		document.getElementById('spammer').innerHTML += '<br><font color=\"yellow\">Habe '+menge+' erreicht.Der Spam wurde somit beeendet</font>';
		}
	}
}

// diesess Script ist Copyright By Basti1012 und ist keinen gestattet zu Kopieren oder zu endern
// jede enderung muss mit pennerhack abgeklaert werden und dann ist das in ordnung
// diese regel gilt vorallen fuer leute die bei useerscript die scripte kopiereen und dann als 
// eigenes script ausgeben tuen oder den code endern tuen und somit das script in den dreck 
// ziehen weil ihre scripte nicht mehr richtig laufen .Also leute die ahnung haben und basti1012
// fragen duerfen den code auch benutzen und weiter ausbauen oder co . wer den code (mit erlaubniss von basti102)
// haben den abgemachten satz von basti1012 mit in den script reinzukopieren und somit werden auch die scripte als legale kopie gekenzeichnet

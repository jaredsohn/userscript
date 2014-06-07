// ==UserScript==
// @name          Ecato im Meta-Preisvergleich
// @namespace     mpv
// @include       http://meta-preisvergleich.de/userscript.htm
// @description   Demoskript fuer Entwickler: Integriert Ergebnisse aus einem Ecato Whitelabel Preisvergleich in den Meta-Preisvergleich
// @icon          http://meta-preisvergleich.de/icon.gif
// @version       1.1.3
// @updateURL     https://userscripts.org/scripts/source/127253.meta.js
// ==/UserScript==

// Dies ist nur ein Demo-Skript zur Erstellung von Benenutzerskripten für den Meta-Preisvergleich
// Da die Quelle Ecato schon im Meta-Preisvergleich vorhanden ist, erweitert dieses Skript nicht die Ergebnisse
// des Meta-Preisvergleichs. Nutzen Sie die Testaufrufe weiter unten um die Funktion des Skripts zu überpruefen
// und für die Entwicklung von neuen Skripten.

// Zur Nutzung benoetigen Sie den Firefox Browser und das Scriptish Add-On für Firefox:
// https://addons.mozilla.org/de/firefox/addon/scriptish/
// Dieses Skript wurde getestet mit Firefox 5.01 portable und Scriptish 0.1.6 Benutzerskript-Manager für Firefox

// Wichtig: Bilder in den Suchergebnissen aus diesem Skript werden nur angezeigt, wenn zusaetzlich das Skript
// 'Bildader fuer Meta-Preisvergleich' http://userscripts.org/scripts/show/127249 installiert wird

// Mit Benutzerskripten koennen beliebige Quellen in den Meta-Preisvergleich integriert werden.
// Wenn Ihr Lieblingspreisvergleich nicht im Meta-Preisvergleich integriert ist, koennen Sie ein Benutzerskript
// erstellen, das den gewuenschten Preisvergleich integriert.
// Wenn Sie das Skript dann veroeffentlichen, profitieren auch andere Meta-Preisvergleich Nutzer von den 
// zusaetzlichen Quellen



/* Testaufrufe
http://meta-preisvergleich.de/userscript_test.htm?q=luftbett
http://meta-preisvergleich.de/userscript_test.htm?q=luftbett+bestway

*/

// name der quelle erscheint auf der ergebnisseite
quelle_name = "ecato";
ergebnis = "";

// erhoehen der quellenanzahl in der statusanzeige
location.href = "javascript:void(parent.skripte());";

// uebernehmen der suchbegriffe und id
var q = unsafeWindow.q;
var id = unsafeWindow.id;
qe = escape(q);


// such url für die entsprechende quelle
url = "http://meta-preisvergleich.marktplatz-netzwerk.de/suche--cQN-1.html?s=" + qe + "&skl=QN";

//GM_log(url); 

// alle auskommentierten GM_log Befehle koennen bei der skriptentwicklung bzw. fehlersuche zur ausgabe der einzelnen werte benutzt werden
// option 'GM_log benutzt die fehlerkonsole' aktivieren, dann erscheint die ausgabe in der firefox fehlerkonsole


// start des skripts
start ();
// das skript liest die HTML ergebnisseite die als antwort auf die jeweilige such url zurueckgegeben wird
// die ergebnisseite enthaelt entweder produktangebote oder links zu produktseiten die dann die produktangebote enthalten
// eine bestimmte anzahl der verlinkten produktseiten wird nach der ergebnisseite gelesen



// das lesen der ergebnisseite und produktseiten basiert auf regulaeren ausdruecken / regular expressions
// info zu regulaeren ausdruecken in in javascript: http://www.regular-expressions.info/javascript.html

// [\s\S]   ist suchmuster für ein beliebiges zeichen einschliesslich zeilenumbruch
// [\s\S]*  ist suchmuster für beliebige anzahl beliebiger zeichen einschliesslich zeilenumbruch
// [\s\S]*? ist suchmuster für beliebige anzahl beliebiger zeichen einschliesslich zeilenumbruch bis zum NAECHSTEN vorkommen des nachfolgenden suchmusters

// sonderzeichen in den suchmustern muessen mit \ escaped werden zB \( statt ( und \/ statt /
// in runde klammern eingeschlossene ausdruecke werden in den variablen r[1] r[2] ... gespeichert

// die folgenden funktionen sind zum lesen der werte, die in den suchergebnisseiten und in den produktseiten gleich angegeben sind
// diese funktionen muessen an die jeweilige quelle angepasst werden

// der erste regulaere ausdruck extrahiert aus jedem abschnitt den linktext des naechsten auf <h3> folgenden a tags und den gesamten nach dem </a> folgenden text

function name_f(){
	name = "";
	text = "";
	if ( r = /<h3>[\s\S]*?<a[\s\S]*?>([\s\S]*?)<\/a>([\s\S]+)/gim.exec(abschnitt) ) {
		name = r[1];
		text = r[2];
		text = nurtext (text);
		//GM_log(name);
	}//if
}//function

function bild_f(){
	bild = "";
	if ( r = /(http:\/\/meta-preisvergleich.marktplatz-netzwerk.de\/img\/[\s\S]*?)"/gim.exec(abschnitt) ) {
		bild = r[1];
	}//if
}//function

function preis_f(){
	preis = "";
	if ( r = />bei [\s\S]*? für([\s\S]*?)<\/span>/gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
	if ( r = /<div class="ecato-price"><a[\s\S]*?>([\s\S]*?)<\/span>/gim.exec(abschnitt) ) {
		preis = r[1];
		//GM_log(preis);
	}//if
}//function

function versand_f(){
	versand = "";
	if ( r = /zzgl. Versand([\s\S]*?)</gim.exec(abschnitt) ) {
		versand = r[1];
	}//if
	if ( r = /zzgl. Versand<br \/>([\s\S]*?)</gim.exec(abschnitt) ) {
		versand = r[1];
	}//if
}//function

function shop_f(){
	shop_name = "";
	shop_logo = "";
	if ( r = />bei ([\s\S]*?) für/gim.exec(abschnitt) ) {
		shop_name = r[1];
	}//if
	if ( r = /<div class="ecato-shop"><div><a[\s\S]*?>([\s\S]*?)</gim.exec(abschnitt) ) {
		shop_name = r[1];
	}//if
}//function

function url_f(){
	url = "";
	if ( r = /onclick="window.open\('([\s\S]*?)'/gim.exec(abschnitt) ) {
		url = r[1];
	}//if
}//function



// die funktion suchergebnisse liest die informationen aus der von der quelle gelieferten suchergebnisseite
// diese funktion muss an die suchergebnisseite der jeweiligen quelle angepasst werden

// in der while schleife wird die seite zuerst in abschnitte zerlegt, wobei jeder abschnitt ein suchergebnis enthaelt
// aus jedem abschnitt werden dann die informationen zum angebot oder zu weiterführenden produktseiten entnommen

function suchergebnisse (content){

produktliste = new Array();
ranking = 0;
produktanzahl = 0;


// das folgende suchmuster findet den inhalt zwischen einem HTML tag und dem zugehoerigen schliessenden HTML tag.
// wenn gleiche tags ineinander geschachtelt sind, muss die tiefe der verschachtelung durch rekursive schachtelung
// der suchmuster beruecksichtigt werden:
// re = /<li id="ecato-[\s\S]*?<\/li>/gim; //ohne schachtelung
// re = /<li id="ecato-(?:<li[\s\S]*?<\/li>|[\s\S])*?<\/li>/gim; //einfache schachtelung

re = /<li id="ecato-(?:<li(?:<li[\s\S]*?<\/li>|[\s\S])*?<\/li>|[\s\S])*?<\/li>/gim; //doppelte schachtelung
while (r = re.exec(content)) {

	abschnitt = r[0];
    //GM_log(abschnitt);

	name_f();
	bild_f();
	preis_f();
	lieferung = "keine Angabe";
	versand_f();
	shop_f();
	url_f();

	angebote = "";
	if ( r = /class="ecato-info-offers"><a[\s\S]*?>([\s\S]*?) angebote/gim.exec(abschnitt) ) {
		angebote = r[1];
	}//if

	produkturl = "";
	if ( r = /class="ecato-info-offers"[\s\S]*?href="([\s\S]*?)"/gim.exec(abschnitt) ) {
		produkturl = r[1];
		//GM_log(produkturl);
	}//if
	
	if ( (produkturl != "") && (produktanzahl < 2) && (angebote >= 1) ) {
		neu = produktliste.push(produkturl);
		produktanzahl++;
	}//if

	if (preis != ""){
		ergebnis_string();
		ranking++;
	}//if
	
}//while

}//function



// die funktion produktseite extrahiert informationen aus den von der quelle gelieferten produktseiten / preisvergleichsseiten für bestimmte produkte
// diese funktion muss an die produktseite der jeweiligen quelle angepasst werden
// funktionsweise ist anlalog zur funkion suchergebnisse, für erklaerungen siehe funktion suchergebnisse

function produktseite (content){

ranking = folgeanzahl;
produktanzahl = 0;

produktbeschreibung = "";
if ( r = /<div class="ecato-desc">([\s\S]*?)<div class="ecato-right">/gim.exec(content) ) {
	produktbeschreibung = " - " + r[1];
}//if

re = /<li id="ecato-offer(?:<li(?:<li[\s\S]*?<\/li>|[\s\S])*?<\/li>|[\s\S])*?<\/li>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	name_f();
	text = text + produktbeschreibung;
	bild_f();
	preis_f();
	lieferung = "keine Angabe";
	versand_f();
	shop_f();
	url_f();
	
	if ( (url != "") && (produktanzahl > 0) ){
		ergebnis_string();
		ranking = ranking + 20;
	}//if
	
	produktanzahl++;
	
}//while

}//function



// die folgenden funktionen muessen normalerweise nicht geaendert werden
// nur wenn es probleme mit der zeichenkodierung von umlauten gibt, muss wahrscheinlich die angabe overridemimetype entfernt werden

function start() {

	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		overrideMimeType: "text/html; charset=ISO-8859-1", //nur wenn der server ISO-8859-1 liefert ohne dies im http header explizit anzugeben
		onload: function(res) {
			//GM_log(res.responseText);
			suchergebnisse (res.responseText);
			folgeanzahl = 0;
			folgeseiten ();
		}//function
	});//GM_xmlhttpRequest

}//function 



function folgeseiten(res) {

	if (res) {
		produktseite (res.responseText);
	}//if
	
	if ( produktliste[folgeanzahl] ) {
		GM_xmlhttpRequest({	
			method:'GET', 
			url:produktliste[folgeanzahl], 
			overrideMimeType: "text/html; charset=ISO-8859-1", //nur wenn der server ISO-8859-1 liefert ohne dies im http header explizit anzugeben
			onload:folgeseiten
		});//GM_xmlhttpRequest
		folgeanzahl++;
	}//if
	else
		ende ();

}//function 



function ende (){

	//GM_log("\n", ergebnis);
	
	var myData = new FormData();
	myData.append("ergebnis", ergebnis);
	myData.append("id", id);
	myData.append("q", q);
	myData.append("quelle", quelle_name);

	GM_xmlhttpRequest({
		method: "POST",
		data: myData,
		url: "http://meta-preisvergleich.de/userscript.cgi",
		onload: function(res) {
			//ergebnisse werden nur angezeigt wenn alle worte aus der suchanfrage q auch im text zum produkt vorkommen
			//GM_log(res.responseText);
			unsafeWindow.e = quelle_name + res.responseText + "<br>\n<br>\n";
			location.href = "javascript:void(parent.ergebnisse_anzeigen());";
			location.href = "javascript:void(parent.schritt('" + quelle_name + "'));";
		}//function
	});//GM_xmlhttpRequest
	
}//function



function ergebnis_string(){

		//die reihenfolge der werte darf nicht geaendert werden
		tmp = ranking;
		tmp = tmp + "|#|" + name;
		tmp = tmp + "|#|" + text;
		tmp = tmp + "|#|" + bild;
		tmp = tmp + "|#|" + preis;
		tmp = tmp + "|#|" + lieferung;
		tmp = tmp + "|#|" + versand;
		tmp = tmp + "|#|" + shop_name;
		tmp = tmp + "|#|" + shop_logo;
		tmp = tmp + "|#|" + url;
		tmp = nurtext(tmp);
		ergebnis = ergebnis + tmp + "\n";
	
}//function



function nurtext (t){

	t = t.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gim, '');
	t = t.replace(/<[\s\S]*?>/gim, '');
	t = t.replace(/\s+/gim, ' ');
	t = t.replace(/[\r\n]/gim, ' ');
	t = t.replace(/&nbsp;/gim, ' ');
	return t;
	
}//function


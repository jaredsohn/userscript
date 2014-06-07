// ==UserScript==
// @name          guenstiger.de im Meta-Preisvergleich
// @namespace     mpv
// @include       http://meta-preisvergleich.de/userscript.htm
// @description   Integriert Ergebnisse aus der guenstiger.de Katalogsuche in den Meta-Preisvergleich
// @icon          http://meta-preisvergleich.de/icon.gif
// @version       1.1.7
// @updateURL     https://userscripts.org/scripts/source/139468.meta.js
// ==/UserScript==

// Dieses Skript wurde getestet mit Firefox und Scriptish Benutzerskript-Manager fuer Firefox.

// Wichtig: Bilder in den Suchergebnissen aus diesem Skript werden nur angezeigt, wenn zusaetzlich das Skript
// 'Bildader fuer Meta-Preisvergleich' http://userscripts.org/scripts/show/127249 installiert wird

/* testaufrufe
http://meta-preisvergleich.de/userscript_test.htm?q=rasierer+braun
http://meta-preisvergleich.de/userscript_test.htm?q=kaminofen+spartherm
http://meta-preisvergleich.de/userscript_test.htm?q=hark+alero+a
http://meta-preisvergleich.de/userscript_test.htm?q=m%FCtze

http://www.guenstiger.de/Katalog/Suche/kaminofen_spartherm.html
http://www.guenstiger.de/Katalog/Suche/rasierer_braun.html
http://www.guenstiger.de/Katalog/Suche/hark_alero_a.html
http://www.guenstiger.de/Katalog/Suche/m%FCtze.html
*/

quelle_name = "guenstiger.de Katalog";
server = "http://www.guenstiger.de";
ergebnis = "";

location.href = "javascript:void(parent.skripte());";

var q = unsafeWindow.q;
var id = unsafeWindow.id;
qe = escape(q);
qe = qe.replace(/\+/gim, '_');
url = "http://www.guenstiger.de/Katalog/Suche/" + qe + ".html";
//GM_log(url);



function name_f(){
	name = "";
	text = "";
	// produktseiten
	if ( r = /<\/td>[\s\S]*?_blank[\s\S]*?>([\s\S]*?)<\/a>([\s\S]+)/gim.exec(abschnitt) ) {
		name = r[1];
		name = nurtext (name);
		text = r[2];
		text = nurtext (text);
	}//if
	// suchergebnisse datenbank
	if ( r = /"><b>([\s\S]*?)<\/b><\/a>([\s\S]+)/gim.exec(abschnitt) ) {
		name = r[1];
		name = nurtext (name);
		text = r[2];
		text = nurtext (text);
	}//if
}//function

function bild_f(){
	bild = "";
	//datenbank bilder
	if ( r = /<img onError[\s\S]*?src="([\s\S]*?)"/gim.exec(abschnitt) ) {
		bild = r[1];
	}//if
	
}//function

function url_f(){
	url = "";
	if ( r = /(\/norob\/ClickTracker[\s\S]*?)"/gim.exec(abschnitt) ) {
		url = "http://suche.guenstiger.de" + r[1];
	}//if
}//function

function preis_f(){
	preis = "";
	if ( r = /<b class="TEXT_BIG[\s\S]*?">([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
}//function

function lieferung_f(){
	lieferung = "";
	if ( r = /<br><span class="TEXT_GREY_SMALL">([\s\S]*?)</gim.exec(abschnitt) ) {
		lieferung = r[1];
	}//if
}//function

function versand_f(){
	versand = "";
	if ( r = /<span class="TEXT_GREY_SMALL">(V[\s\S]*?)</gim.exec(abschnitt) ) {
		versand = r[1];
	}//if
}//function


function shop_f(){
	shop_name = "";
	shop_logo = "";
	if ( r = /(\/haendlerlogo\/[\s\S]*?)"/gim.exec(abschnitt) ) {
		shop_logo = server + r[1];
	}//if
	if ( r = /\/dzrk.gif/gim.exec(shop_logo) ) {shop_name = "amazon";}//if
	if ( r = /\/rdtxx.gif/gim.exec(shop_logo) ) {shop_name = "ebay";}//if
	if ( r = /\/ducrk.gif/gim.exec(shop_logo) ) {shop_name = "amazon marketplace";}//if
	
	if ( r = /<img onError[\s\S]*?src="[\s\S]*?\.([\s\S]*?)\//gim.exec(abschnitt) ) {
		shop_name = r[1];
	}//if
}//function


function suchergebnisse (content){

produktliste = new Array();
ranking = 0;
produktanzahl = 0;

re = /<tr><td(?:<tr(?:<tr[\s\S]*?<\/tr>|[\s\S])*?<\/tr>|[\s\S])*?<\/tr>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	name_f();
	bild_f();
	url_f();
	
	produkturl = "";
	if ( (r = /(\/preisvergleich\/[\s\S]*?)"/gim.exec(abschnitt)) && (produktanzahl < 8) && (url == "") ) {
		produkturl = server + r[1];
		produkturl = produkturl.replace(/&amp;/gim, '&');
		neu = produktliste.push(produkturl);
		produktanzahl++;
		//GM_log("produkturl\n\n" + produkturl);
	}//if
	
	preis_f();
	lieferung_f();
	versand_f();
	shop_f();	

	//*
	//if ( r = /mare solar/gim.exec(abschnitt) ) {
		//GM_log(abschnitt);
		GM_log(
		"\nname: " + name + 
		"\nbild: " + bild + 
		"\nurl: " + url + 
		"\nprodukturl: " + produkturl + 
		"\npreis: " + preis + 
		"\nlieferung: " + lieferung + 
		"\nversand: " + versand + 
		"\nshopname: " + shop_name + 
		"\nshoplogo: " + shop_logo + 
		"\n");
	//}//if
	//*/
	
	if (url != ""){
		ergebnis_string();
		//ranking++;
	}//if
	
}//while

}//function



function produktseite (content){

ranking = 0;

produktbild = "";
if ( r = /nopic_180[\s\S]*?src="([\s\S]*?)"/gim.exec(content) ) {
	produktbild = r[1];
}//if
if ( r = /(http:\/\/bilder.guenstiger.de\/prodfoto\/[\s\S]*?)"/gim.exec(content) ) {
	produktbild = r[1];
}//if
produktname = "";
if ( r = /<h1>([\s\S]*?)<\/h1>/gim.exec(content) ) {
	produktname = " - " + r[1];
}//if
produktbeschreibung = "";
if ( r = /<span class="DESCLINK">([\s\S]*?)<div class="TEXT_GREY_SMALL2">/gim.exec(content) ) {
	produktbeschreibung = " - " + r[1];
}//if

re = /<tr><td(?:<tr(?:<tr[\s\S]*?<\/tr>|[\s\S])*?<\/tr>|[\s\S])*?<\/tr>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	name_f();
	text = text + produktname + produktbeschreibung;

	bild_f();
	if ( bild == "" ) bild = produktbild;
	
	preis_f();
	lieferung_f();
	versand_f();
	shop_f();	
	url_f();
	
	/*
	//if ( r = /mare solar/gim.exec(abschnitt) ) {
		//GM_log(abschnitt);
		GM_log(
		"\nname: " + name + 
		"\nbild: " + bild + 
		"\nurl: " + url + 
		"\nprodukturl: " + produkturl + 
		"\npreis: " + preis + 
		"\nlieferung: " + lieferung + 
		"\nversand: " + versand + 
		"\nshopname: " + shop_name + 
		"\nshoplogo: " + shop_logo + 
		"\n");
	//}//if
	//*/
	
	if (url != ""){
		ergebnis_string();
		ranking++;
	}//if

}//while

}//function



GM_xmlhttpRequest({
	method: "GET",
	url: url,
	//overrideMimeType: "text/html; charset=ISO-8859-1",
	onload: function(res) {
		//GM_log(res.responseText);
		suchergebnisse (res.responseText);
		folgeanzahl = 0;
		folgeseiten ();
	}//function
});//GM_xmlhttpRequest



function folgeseiten(res) {

	if (res) {
		produktseite (res.responseText);
	}//if
	
	if ( produktliste[folgeanzahl] ) {
		GM_xmlhttpRequest({	
			method:'GET', 
			url:produktliste[folgeanzahl], 
			//overrideMimeType: "text/html; charset=ISO-8859-1",
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

	t = t.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gim, ' ');
	t = t.replace(/<[\s\S]*?>/gim, ' ');
	t = t.replace(/\s+/gim, ' ');
	t = t.replace(/[\r\n]/gim, ' ');
	t = t.replace(/&nbsp;/gim, ' ');
	return t;
	
}//function


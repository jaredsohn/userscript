// ==UserScript==
// @name          Evendi im Meta-Preisvergleich
// @namespace     mpv
// @include       http://meta-preisvergleich.de/userscript.htm
// @description   Integriert Ergebnisse aus dem evendi.de Preisvergleich in den Meta-Preisvergleich
// @icon          http://meta-preisvergleich.de/icon.gif
// @version       1.1.3
// @updateURL     https://userscripts.org/scripts/source/142382.meta.js
// ==/UserScript==

// Dieses Skript wurde getestet mit Firefox und Scriptish Benutzerskript-Manager fuer Firefox

// Wichtig: Bilder in den Suchergebnissen aus diesem Skript werden nur angezeigt, wenn zusaetzlich das Skript
// 'Bildader fuer Meta-Preisvergleich' http://userscripts.org/scripts/show/127249 installiert wird

/* testaufrufe
http://meta-preisvergleich.de/userscript_test.htm?q=vitorre
http://meta-preisvergleich.de/userscript_test.htm?q=m%FCtze

http://www.evendi.de/Search.action?filter.query=vitorre
http://www.evendi.de/Search.action?filter.query=m%FCtze
*/

quelle_name = "evendi.de";
server = "http://www.evendi.de";
ergebnis = "";

location.href = "javascript:void(parent.skripte());";

var q = unsafeWindow.q;
var id = unsafeWindow.id;
qe = escape(q);
url = "http://www.evendi.de/Search.action?filter.query=" + qe;
//GM_log(url);


function abschnitt_f(){

	name = "";
	text = "";
	if ( r = /<strong[\s\S]*?>([\s\S]*?)<\/strong>([\s\S]+)/gim.exec(abschnitt) ) {
		name = r[1];
		name = nurtext (name);
		text = r[2];
		text = nurtext (text);
	}//if

	bild = "";
	if ( r = /<img id="[\s\S]*?src="([\s\S]*?)"/gim.exec(abschnitt) ) {
		bild = r[1];
	}//if

	url = "";
	if ( r = /href="\/(servlet\/DirectClick[\s\S]*?)"/gim.exec(abschnitt) ) {
		url = server + "/" + r[1];
	}//if
	
	produkturl = "";
	if ( (r = /www.evendi.de\|([\s\S]*?)\|/gim.exec(abschnitt)) && (produktanzahl < 8) && (url == "") ) {
		produkturl = server + "/" + r[1] + ".html";
		produkturl = produkturl.replace(/&amp;/gim, '&');
		neu = produktliste.push(produkturl);
		produktanzahl++;
	}//if

	preis = "";
	if ( r = /price_font[\s\S]*?">([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if

	lieferung = "";
	if ( r = /verfuegbarkeit[\s\S]*?alt="([\s\S]*?)"/gim.exec(abschnitt) ) {
		lieferung = r[1];
	}//if

	versand = "";
	if ( r = /Versand<\/span>[\s\S]*?>([\s\S]*?)</gim.exec(abschnitt) ) {
		versand = r[1];
	}//if

	shop_name = "";
	shop_logo = "";
	if ( r = /(http:\/\/cache.ncevendi.com\/haendler\/logo[\s\S]*?)"[\s\S]*?alt="Logo: ([\s\S]*?)"/gim.exec(abschnitt) ) {
		shop_logo = r[1];
		shop_name = r[2];
	}//if
	if ( r = /retailer_logo text[\s\S]*?>([\s\S]*?)</gim.exec(abschnitt) ) {
		shop_logo = "";
		shop_name = r[1];
	}//if
	

}//function


function suchergebnisse (content){

produktliste = new Array();
ranking = 0;
produktanzahl = 0;

re = /<ol class="ev_offer line(?:<ol(?:<ol[\s\S]*?<\/ol>|[\s\S])*?<\/ol>|[\s\S])*?<\/ol>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	abschnitt_f();
	
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
		//ranking++;
	}//if
	
}//while

}//function



function produktseite (content){

ranking = 0;

produktbild = "";
if ( r = /<span id="product_image">[\s\S]*?src="([\s\S]*?)"/gim.exec(content) ) {
	produktbild = r[1];
}//if
produktname = "";
if ( r = /<h1[\s\S]*?>([\s\S]*?)<\/h1>/gim.exec(content) ) {
	produktname = " - " + r[1];
}//if
produktbeschreibung = "";
if ( r = /<span id="product_description[\s\S]*?>([\s\S]*?)<\/span>/gim.exec(content) ) {
	produktbeschreibung = " - " + r[1];
}//if

re = /<li class="ev_priceList(?:<li(?:<li[\s\S]*?<\/li>|[\s\S])*?<\/li>|[\s\S])*?<\/li>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	abschnitt_f();
	
	/*
 	if ( r = /mare solar/gim.exec(abschnitt) ) {
		GM_log(abschnitt);
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
	}//if
	//*/

	text = text + produktname + produktbeschreibung;
	if ( bild == "" ) bild = produktbild;
	
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


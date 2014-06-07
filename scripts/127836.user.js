// ==UserScript==
// @name          Idealo im Meta-Preisvergleich
// @namespace     mpv
// @include       http://meta-preisvergleich.de/userscript.htm
// @description   Integriert Ergebnisse aus dem Idealo Preisvergleich in den Meta-Preisvergleich
// @icon          http://meta-preisvergleich.de/icon.gif
// @version       1.1.17
// @updateURL     https://userscripts.org/scripts/source/127836.meta.js
// ==/UserScript==

// Dieses Skript wurde getestet mit Firefox und Scriptish Benutzerskript-Manager fuer Firefox

// Wichtig: Bilder in den Suchergebnissen aus diesem Skript werden nur angezeigt, wenn zusaetzlich das Skript
// 'Bildlader fuer Meta-Preisvergleich' http://userscripts.org/scripts/show/127249 installiert wird

/* testaufrufe
http://meta-preisvergleich.de/userscript_test.htm?q=rasierer+braun
http://meta-preisvergleich.de/userscript_test.htm?q=kaminofen+spartherm
http://meta-preisvergleich.de/userscript_test.htm?q=luftbett+studioline+king
http://meta-preisvergleich.de/userscript_test.htm?q=m%FCtze

http://www.idealo.de/preisvergleich/MainSearchProductCategory.html?q=m%FCtze
http://www.idealo.de/preisvergleich/MainSearchProductCategory.html?param.opensearch.count=50&q=m%FCtze
*/

quelle_name = "idealo";
server = "http://www.idealo.de";
ergebnis = "";

location.href = "javascript:void(parent.skripte());";

var q = unsafeWindow.q;
var id = unsafeWindow.id;
qe = escape(q);
url = "http://www.idealo.de/preisvergleich/MainSearchProductCategory.html?param.opensearch.count=50&q=" + qe;
//url = "http://www.idealo.de/preisvergleich/MainSearchProductCategory.html?q=" + qe;
//GM_log(url);



function name_f(){
	name = "";
	text = "";
	// produktseite 
	if ( r = /<a target="_blank"[\s\S]*?>([\s\S]*?)<\/a>([\s\S]+)/gim.exec(abschnitt) ) {
		name = r[1];
		text = r[2];
		text = nurtext (text);
	}//if
	// suchergebnisse und produktseite mit gleichen angeboten
	if ( r = /<a class="title[\s\S]*?>([\s\S]*?)<\/a>([\s\S]+)/gim.exec(abschnitt) ) {
		name = r[1];
		text = r[2];
		text = nurtext (text);
	}//if
}//function

function bild_f(){
	bild = "";
	if ( r = /(http:\/\/cdn.idealo.com\/angebote[\s\S]*?)"/gim.exec(abschnitt) ) {
		bild = r[1];
	}//if
	if ( r = /(http:\/\/cdn.idealo.com\/folder\/product\/[\s\S]*?)"/gim.exec(abschnitt) ) {
		bild = r[1];
	}//if
}//function

function lieferung_f(){
	lieferung = "";
	if ( r = /delivery_[\s\S]*?>([\s\S]*?<\/d[\s\S]*?)<\/d/gim.exec(abschnitt) ) {
		lieferung = r[1];
	}//if
	lieferung = lieferung.replace(/<img src="\/pics\/cards[\s\S]+/gim, '');
	if ( r = /width="20%"[\s\S]*?<div>([\s\S]*?)</gim.exec(abschnitt) ) {
		lieferung = r[1];
	}//if
}//function

function versand_f(){
	versand = "";
	if ( r = /(<img src="\/pics\/cards[\s\S]*?)<a href/gim.exec(abschnitt) ) {
		versand = r[1];
		versand = nurtext (versand);
	}//if
	if ( r = /<small>([\s\S]*?)<\/small>/gim.exec(abschnitt) ) {
		versand = r[1];
	}//if
	if ( r = /<span style="white-space: nowrap;">([\s\S]*?)<\/span>/gim.exec(abschnitt) ) {
		versand = r[1];
	}//if
	if ( r = /<span class="shipping-costs">(?:<span(?:<span[\s\S]*?<\/span>|[\s\S])*?<\/span>|[\s\S])*?<\/span>/gim.exec(abschnitt) ) {
		versand = r[0];
	}//if
}//function


function shop_f(){
	shop_name = "";
	shop_logo = "";
	if ( r = /(http:\/\/cdn.idealo.com\/folder\/Shop\/[\s\S]*?)"[\s\S]*?alt="([\s\S]*?) - shop aus/gim.exec(abschnitt) ) {
		shop_logo = r[1];
		shop_name = r[2];
	}//if
}//function

function url_f(){
	url = "";
	if ( r = /(\/preisvergleich\/Relocate[\s\S]*?)"/gim.exec(abschnitt) ) {
		url = server + r[1];
	}//if
}//function



function suchergebnisse (content){

produktliste = new Array();
ranking = 0;
produktanzahl = 0;

re = /<tr data-error="js4offer">(?:<tr(?:<tr[\s\S]*?<\/tr>|[\s\S])*?<\/tr>|[\s\S])*?<\/tr>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	name_f();
	bild_f();
	url_f();
	
	produkturl = "";
	if ( (r = /(\/preisvergleich\/OffersOfProduct[\s\S]*?)"/gim.exec(abschnitt)) && (produktanzahl < 8) && (url == "") ) {
		produkturl = server + r[1];
		produkturl = produkturl.replace(/&amp;/gim, '&');
		neu = produktliste.push(produkturl);
		produktanzahl++;
	}//if
	if ( (r = /(\/preisvergleich\/Typ[\s\S]*?)"/gim.exec(abschnitt)) && (produktanzahl < 8) && (url == "") ) {
		produkturl = server + r[1];
		produkturl = produkturl.replace(/&amp;/gim, '&');
		neu = produktliste.push(produkturl);
		produktanzahl++;
	}//if
	
	preis = "";
	if ( r = /<span class="b nobr fs13" style="text-align:left;">([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
	if ( r = /<td class="price[\s\S]*?<strong>([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
	
	lieferung_f();
	versand_f();
	shop_f();	
	
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
if ( r = /(http:\/\/cdn.idealo.com\/folder\/product\/[\s\S]*?)"/gim.exec(content) ) {
	produktbild = r[1];
}//if
if ( r = /(http:\/\/cdn.idealo.com\/angebote[\s\S]*?)"/gim.exec(abschnitt) ) {
	produktbild = r[1];
}//if
//GM_log("produktbild\n\n" + produktbild);

produktname = "";
if ( r = /class="heading".*?>([\s\S]*?)</gim.exec(content) ) {
	produktname = " - " + r[1];
}//if
//GM_log("produktname\n\n" + produktname);

produktbeschreibung = "";
if ( r = /<div class="omission">([\s\S]*?)<\/table>/gim.exec(content) ) {
	produktbeschreibung = " - " + r[1];
}//if
//GM_log("produktbeschreibung\n\n" + produktbeschreibung);

//produktseite liste

content = content.replace(/<tr data-error="js4offer/gim, '<tr class="list');
content = content.replace(/<tr name="js4offer" class="list/gim, '<tr class="list');
content = content.replace(/<tr >[\s\S]<td class="title-certificates">/gim, '<tr class="list');

re = /<tr class="list(?:<tr(?:<tr[\s\S]*?<\/tr>|[\s\S])*?<\/tr>|[\s\S])*?<\/tr>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	name_f();
	text = text + produktname + produktbeschreibung;
	bild_f();
	if ( bild == "" ) bild = produktbild;
	
	preis = "";
	if ( r = /class="b">([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
	if ( r = /<span class="b nobr fs13" style="text-align:left;">([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
	if ( r = /<td class="price[\s\S]*?<strong>([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
	if ( r = /<span class="price">([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if
	
	lieferung_f();
	versand_f();
	shop_f();	
	url_f();
	
	/*
	//if ( r = /pitching/gim.exec(abschnitt) ) {
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


//produktseite raster

content = content.replace(/a class="b fs12" target="_blank"/gim, 'a target="_blank"');

content = content.replace(/<td style="border:1px solid/gim, '<td name="js4offer"');
content = content.replace(/td valign="top" style="border:1px solid/gim, '<td name="js4offer"');
content = content.replace(/td valign="top" style="border: 1px solid/gim, '<td name="js4offer"');
content = content.replace(/<td data-error="js4offer" class="tile"/gim, '<td name="js4offer"');

re = /<td name="js4offer"(?:<td(?:<td[\s\S]*?<\/td>|[\s\S])*?<\/td>|[\s\S])*?<\/td>/gim;
while (r = re.exec(content)) {

	abschnitt = r[0];

	abschnitt = abschnitt.replace(/<a target="_blank"/im, ''); //erstes target loeschen
	name_f();
	text = text + produktname + produktbeschreibung;

	bild_f();
	if ( bild == "" ) bild = produktbild;
	
	preis = "";
	if ( r = /<a class="fs18 b"[\s\S]*?>([\s\S]*?)</gim.exec(abschnitt) ) {
		preis = r[1];
	}//if

	abschnitt = abschnitt.replace(/delivery/im, ''); //erstes delivery loeschen
	lieferung_f();
	versand_f();
	shop_f();	
	url_f();
	
	/*
	//if ( r = /pitching/gim.exec(abschnitt) ) {
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

	t = t.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gim, '');
	t = t.replace(/<[\s\S]*?>/gim, '');
	t = t.replace(/\s+/gim, ' ');
	t = t.replace(/[\r\n]/gim, ' ');
	t = t.replace(/&nbsp;/gim, ' ');
	return t;
	
}//function


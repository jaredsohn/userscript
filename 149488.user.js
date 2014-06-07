// ==UserScript==
// @name        IT2 - Industrie Tycoon 2 - erweiterte Navigation mit Premium- Features + keine Werbung
// @namespace   DE
// @description Viele nützliche Funktionen für einen standard IT2 Produzenten!!! Umfangreiche de/aktivierbare Funktionen
//  - Alle Werbelinks/ sowie Kauf-Buttons können im Kopf deaktiviert werden.
//  - Zusätzliche Links ist der Hauptnavigation können im Kopf de/aktiviert werden.
//  - Automatische Auswahl der Marketing- Einstellung (z.B. standardmäßig Marke aktiv und nicht Geschäft.. 7Tage...Werbung:TV..Lizenz:XX)
//  - Versand und Preisfeld werden per default beliebig gefüllt. Andere Festpreise via Auswahlfeld.
//  - Gebäudebox auf der rechten Bildschirmseite**** hierzu muss das Array gefüllt werden!!!
//  - Alle Werte und Funktionen lassen sich über den Kopf des Scriptes editieren!.
// @include     http://www.itycoon2.de/*
// @author      XMANT1000
// @version     1.5
// @date        03-09-2012
// ==/UserScript==
//========================= Anfang USER-ANGABEN ===========================================//

//================= De/Aktivierung der Script- Funktionen =================================//

//###########################################################//
// Bedeutung der Optionen  :                                 //
//    - 1 Funktion aktiviert / einschalten                   //
//    - 0 Funktion deaktiviert / ausschaten                  //
//###########################################################//

//#Werbung entfernen und unbedeutende Anzeigen
var superm = 1;       //Supermery Werbung entfernen
var kill_adblock = 0; //Adblockmeldung entfernen (nur aktivieren bei Verwendung von Adblock-> Werbung-Blocker)
var kill_voting = 1;  //Voting Box entfernen
var kill_shop = 1;    //Shop entfernen
var kill_barren = 1;  //Barren- Symbol entfernen
var kill_VIP = 1;     //VIP- Symbol entfernen
var kill_Premium = 1;  //Premium-Link in Hauptnavi entfernen
var verkuerzen =1;    //Bauzeit verkürzen Buttons aus dem Gebäudemenue entfernen

//#zusaetzliche Links
var gebaeude = 1;		// Gebäudelink in der Hauptnavigation
var org_post = 1;		      // Organizerlink in der Sub-Navigation
var handelsplatz = 1;      // Handelsplatz in der Hauptnavigation
var faehigkeiten = 1;      // Faehigkeiten in der Hauptnavigation
var forschung = 0;   // Forschung in der Hauptnavigation - NUR AKTIVIEREN, wenn das Gebäude-Array gefüllt ist!

//#Marketing- Optionen
var marketing = 1;      //Marketingoptionen aktivieren
var produzent = 1;     // Bei der Karriere als Produzent "1" auswaehlen-> Marketing wird automatisch auf Marke gesetzt
var werb_marke = 0;    //automatische Auswahl der Marke: Optionen->0,1,2,3...
//                       0= erste Marke, 1= zweite existierende Marke...
var werb_mass = 3;    // 0=Plakate,1=Zeitschriften,2=Fahrzeugw.,3=Radio,4=TV
var werb_dauer =6;    // 0=1Tag.. 6=7 Tage Werbung

//Versand
var versand = 1;    //Modifizierte Versandseite aktivieren
var menge = 3000;   //initiale Transportmenge
var festpreis = 300; //intialer Versandpreis
var tra_array= new Array(6,125,1000,2000,3000,3250);  //Transportmengen zum Auswaehlen - kein Inhalt = Funktion deaktiviert
var fp_array = new Array(500,550,650);                //Festpreise zum auswaehlen - kein Inhalt = Funktion deaktiviert

// Gebäude Box auf der rechten Bildschirmseite
/*
ACHTUNG!!!
Anleitung zum Gebäudearray/ Gebäudebox:
1.    var Anzeigegeb=1;   Gebäude-Array aktivieren
2.  Auf die Gebäudeseite wechseln ---> Array wird angezeigt!
3. Angezeigtes Array aus dem weißen Feld kopieren (strg+c)
4. Kopierter Inhalt in das Array geb_array einspielen
   Bsp.:var geb_array= new Array(13312,'Tischfabrik',37348,'Zigarettenfabrik'.....);
5. var Anzeigegeb=0; -- Array-Anzeige off
6. var geb_box =1; Gebäudebox einschalten
*/
var Anzeigegeb=0;   //Gebäude-Array anzeigen
var geb_box =0;     // Gebäudebox aktivieren-
/*Beispiel:
var geb_array= new Array(13312,'Tischfabrik',37348,'Zigarettenfabrik');
*/
var geb_array= new Array();
var unternehmenssitz = geb_array[geb_array.length-2];


//=========================== ENDE USER-ANGABEN ===========================================//


      //########################################################//
      //    STOP!!!! Folgenden CODE NICHT MODIFIZIEREN          //
      //    STOP!!!! Folgenden CODE NICHT MODIFIZIEREN          //
      //    STOP!!!! Folgenden CODE NICHT MODIFIZIEREN          //
      //    STOP!!!! Folgenden CODE NICHT MODIFIZIEREN          //
      //    STOP!!!! Folgenden CODE NICHT MODIFIZIEREN          //
      //########################################################//

//================================================//
//         Erzeugung des Gebaeude-Arrays	 			  //
//================================================//
if(Anzeigegeb==1)
{
var split_url = document.URL.split("/");
if(split_url[3]=="building" && split_url[4]==null) {
var i = 0;
var g=0;
var xx=0;
var gebarray=new Array();
	del:while(i < 101) {
		if (document.getElementsByClassName('hand')[i]==null) {
			break del;
		}
else {
var ssb= document.getElementsByClassName('hand')[i];
ssb = ssb.innerHTML;
var suche= /#[0-9]{4,6}/;
var suche2 = /[\w-+, äöüßÄÖÜ\/™]+<br>/;
var suche3 = /[^<br>][\w-+, äöüßÄÖÜ™\/]+/;
var suche4 = /\d+/;
var neuid = suche.exec(ssb);
var neuid2 = suche2.exec(ssb);
gebarray[g] = suche4.exec(neuid);
x=g+1;
gebarray[x] = suche3.exec(neuid2);
g=g+2;
      i++
		};
		};

//CSS definieren
var style = document.createElement('style');
style.innerHTML = "#NEUEBOX2 { background:none; background-color:white; text-decoration:none; font-size:70%; white-space:nowrap; position:absolute; top:150px; left:20px;}; #sgebbox{text-decoration:none; font-size:150%;height:140px !important; min-height:140px !important;};";
style.type='text/css';
document.getElementsByTagName('head')[0].appendChild(style);
//Position bestimmen
var div_selection = document.getElementsByClassName("boxes")[0];
var insert_before = document.getElementsByClassName("boxes")[0].lastChild;
//div anlegen
var create_div = document.createElement("div");
create_div.className="box";
//id festlegen
create_div.id="NEUEBOX2";
div_selection.insertBefore(create_div,insert_before);
var create_div2 =document.createElement("div");
create_div2.id="gebbox";
create_div2.className = "ui-progressbar-value ui-widget-header ui-corner-left";
//Anlegen
create_div.appendChild(create_div2);
var create_spgeb =document.createElement("div");
create_spgeb.className = "sgebbox";
create_spgeb.innerHTML ="&nbsp; Geb&auml;ude Array ";
//Anlegen
create_div2.appendChild(create_spgeb);

var laengegb = gebarray.length;
	for (var b= 0; b < laengegb; b++) {
		if(b%2==0){
    //GebNr.
		var create_span = document.createElement("span");
    	create_span.className = "";
    	create_span.innerHTML =""+gebarray[b]+",";
      create_div.appendChild(create_span);
}
		else{
    //Bezeichnung
		var create_span = document.createElement("span");
    	create_span.className = "";
      if(b==(laengegb-1))
      {create_span.innerHTML ="\'"+gebarray[b]+"\'";}
      else{
    	create_span.innerHTML ="\'"+gebarray[b]+"\',";
      };
      create_div.appendChild(create_span);
		};
  if(b!=0 && b%16==0)
  {
var create_br = document.createElement("br");
create_div.appendChild(create_br);
  };
  };
  };
};

//================================================//
//                   Versand        	 			      //
//================================================//
if (versand == 1)
{
var split_url = document.URL.split("/");
if(split_url[3]=="transport" && split_url[4]=="charge") {
var formular = document.getElementsByTagName("form")[1];
//
formular.getElementsByTagName("input")[1].setAttribute("value", "" + menge + "");
formular.getElementsByTagName("input")[5].setAttribute("value", "" + festpreis +"");
//Transportmenge
if(tra_array!=null) {
	var tm_position = formular.getElementsByTagName("p")[1];
	var tm_insert = tm_position.getElementsByTagName("a")[0];
	// Schleife Anzeige Transportmenge
	for (var i = 0; i < tra_array.length; i++) {
			var links = document.createElement("a");
			links.setAttribute("href", "javascript:set_value('stock_amount','" + tra_array[i] + "');");
			links.appendChild(document.createTextNode(""+tra_array[i]+""));
			tm_position.insertBefore(links, tm_insert);
			var spacer = document.createTextNode(" ");
			tm_position.insertBefore(spacer, tm_insert);
	};
};
//Festpreis
if(fp_array!=null) {
	var fp_position = formular.getElementsByTagName("p")[6];
	var fp_insert = fp_position.getElementsByTagName("a")[0];
	// Schleife Anzeige Festpreis
	for (var i = 0; i < fp_array.length; i++) {
			var links2 = document.createElement("a");
			links2.setAttribute("href", "javascript:set_value('data_price','" + fp_array[i] + "');");
			links2.appendChild(document.createTextNode(" " + fp_array[i] + ""));
			fp_position.insertBefore(links2, fp_insert);
			var spacer2 = document.createTextNode(" ");
			fp_position.insertBefore(spacer2, fp_insert);
	};
};
};
};
//================================================//
//                   CSS + BOX      	 			      //
//================================================//
if(geb_box==1)
{
var split_url = document.URL.split("/");
if(split_url[3]!="login") {
//CSS definieren
var style = document.createElement('style');
style.innerHTML = "#NEUEBOX { text-decoration:none; font-size:20% ; position:absolute; top:120px; left:1020px; }; ";
style.type='text/css';
document.getElementsByTagName('head')[0].appendChild(style);
//Position bestimmen
var div_selection = document.getElementsByClassName("boxes")[0];
var insert_before = document.getElementsByClassName("boxes")[0].lastChild;
//div anlegen
var create_div = document.createElement("div");
create_div.className="box";
//id festlegen
create_div.id="NEUEBOX";
// Tabelle anlegen + Definition der Klasse
var create_table =document.createElement("table");
create_table.className = "subnavigation";
//Anlegen
create_div.appendChild(create_table);
//Position
div_selection.insertBefore(create_div,insert_before);
//Box
  var rechnung = geb_array.length/4;
  var testb =0;
  if((geb_array.length%4)!=0)
      {
      testb=1;
      };
	for (var i = 0; i < rechnung; i++) {
    var iw= (i*4);
    var ix= (i*4+1);
    var iy= (i*4+2);
    var iz= (i*4+3);
    var create_tr = document.createElement("tr");
    	create_tr.className = "";
      create_table.appendChild(create_tr);
    var create_td = document.createElement("td");
    	create_td.className = "";
    	create_td.innerHTML = "<a href=\"/production/index/"+geb_array[iw]+"\"><img alt=\"Cog\" border=\"false\" class=\"icon\" src=\"/images/icons/cog.png\" title=\"\" /></a> <a href=\"/stock/index/"+geb_array[iw]+"?order=name\"  accesskey=\"2\"><img alt=\"Box\" border=\"false\" class=\"icon\" src=\"/images/icons/box.png\" title=\"\" />  "+geb_array[ix]+"</a>";
      create_tr.appendChild(create_td);
if( (testb==1) &&  (((i*4)+2)==geb_array.length) )
{
      var create_td = document.createElement("td");
    	create_td.className = "";
    	create_td.innerHTML = "";
      create_tr.appendChild(create_td);
     }
     else{
var create_td = document.createElement("td");
    	create_td.className = "";
    	create_td.innerHTML = "<a href=\"/production/index/"+geb_array[iy]+"\"><img alt=\"Cog\" border=\"false\" class=\"icon\" src=\"/images/icons/cog.png\" title=\"\" /></a> <a href=\"/stock/index/"+geb_array[iy]+"?order=name\"  accesskey=\"2\"><img alt=\"Box\" border=\"false\" class=\"icon\" src=\"/images/icons/box.png\" title=\"\" />  "+geb_array[iz]+"</a>";
      create_tr.appendChild(create_td);
     };
      };
//Forschung und Faehigkeit
var create_tr = document.createElement("tr");
    	create_tr.className = "";
      create_table.appendChild(create_tr);
    var create_td = document.createElement("td");
    	create_td.className = "";
    	create_td.innerHTML = "<a href=\"/laboratory/index/"+unternehmenssitz+"\"><img alt=\"Bricks\" border=\"false\" class=\"icon\" src=\"/images/icons/bricks.png\" title=\"\" /> Froschung</a> ";
      create_tr.appendChild(create_td);
      var create_td = document.createElement("td");
    	create_td.className = "";
    	create_td.innerHTML = "<a href=\"/marketing/index/"+unternehmenssitz+"\"><img alt=\"Television\" border=\"false\" class=\"icon\" src=\"/images/icons/television.png\" title=\"\" /> Marketing</a>";
      create_tr.appendChild(create_td);
  };
 };
//================================================//
//                   DEAKTIVIERUNG  	 			      //
//================================================//
if (verkuerzen==1)
{
//Verkürzen-Button entfernen
var split_url = document.URL.split("/");
if(split_url[3]=="building" && split_url[4]==null) {
	var i = 0;
	del:while(i < 101) {
		if (document.getElementsByClassName('ra')[i]==null) {
			break del;
		}
		else {
			var ss = document.getElementsByClassName('ra')[i].style.display = 'none';
			i++
		};
	};
};
 };
//Supermery Werbung entfernen
if (superm == 1)
{
if(document.getElementsByClassName("box")[3]!=null) {
document.getElementsByClassName("box")[3].style.display = 'none';
}
}
//Adblockmeldung entfernen
if (kill_adblock == 1)
{
if(document.getElementById("adblock")!=null) {
document.getElementById('adblock').style.display = 'none';
}
}
//Voting Box entfernen
if (kill_voting == 1)
{
if(document.getElementsByClassName("box voting")[0]!=null) {
document.getElementsByClassName("box voting")[0].style.display = 'none';
}
}
//Shop Symbol aus der linken Box entfernen
if (kill_shop == 1)
{
if(document.getElementsByClassName("subnavigation")[0].getElementsByTagName("li")[0]!=null) {
document.getElementsByClassName("subnavigation")[0].getElementsByTagName("li")[0].style.display = 'none';
}
}
//Barren Symbol aus der linken Box entfernen
if (kill_barren == 1)
{
if(document.getElementsByClassName("information")[0].getElementsByTagName("li")[3]!=null) {
document.getElementsByClassName("information")[0].getElementsByTagName("li")[3].style.display = 'none';
}
}
//VIP Symbol aus der linken Box entfernen
if (kill_VIP == 1)
{
if(document.getElementsByClassName("vip")[0]!=null) {
document.getElementsByClassName("vip")[0].style.display = 'none';
}
}
//Premium-Link in Hauptnavi entfernen
if (kill_Premium == 1)
{
if(document.getElementById('navigation').getElementsByTagName("li")[3]!=null) {
document.getElementById('navigation').getElementsByTagName("li")[3].style.display = 'none';
}
}
//================================================//
//            Marketing-Option aendern	          //
//================================================//
if (marketing == 1)
{
if(document.getElementById("calculator_dialog")==null) {
	if(document.getElementsByClassName('ra')[0]==null) { var z = 0; } else { var z = 1 };
}
else {
	if(document.getElementsByClassName('ra')[0]==null) { var z = 3; } else { var z = 4 };
};
var split_url = document.URL.split("/");
if (produzent == 1)
{
if(split_url[3]=="marketing" && split_url[4]=="setup") {
	document.getElementsByTagName("form")[z].getElementsByTagName("select")[0].getElementsByTagName("option")[1].setAttribute("selected", "selected");
  //document.getElementsByTagName("form")[z].getElementsByTagName("select")[1].getElementsByTagName("option")[0].setAttribute("selected", "selected");
};
};
if(split_url[3]=="marketing" && split_url[4]=="step2") {
	document.getElementsByTagName("form")[z].getElementsByTagName("select")[0].getElementsByTagName("option")[werb_marke].setAttribute("selected", "selected");
  document.getElementsByTagName("form")[z].getElementsByTagName("select")[1].getElementsByTagName("option")[werb_mass].setAttribute("selected", "selected");
  document.getElementsByTagName("form")[z].getElementsByTagName("select")[2].getElementsByTagName("option")[werb_dauer].setAttribute("selected", "selected");
};
};

//================================================//
//            Navigationsoptionen     	          //
//================================================//

if(handelsplatz == 1) {
	// Handelsplatz
	var div_selection = document.getElementById('navigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('navigation').getElementsByTagName("ul")[0].lastChild;
	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<a href=\"/direct_sale\"  accesskey=\"2\"><img alt=\"Coins\" border=\"false\" class=\"icon\" src=\"/images/icons/coins.png\" title=\"\" /> Handelsplatz</a>";
	div_selection.insertBefore(create_li,insert_before);
};
if(faehigkeiten == 1) {
	// Faehigkeiten
	var div_selection = document.getElementById('navigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('navigation').getElementsByTagName("ul")[0].lastChild;

	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<a href=\"/skills\"  accesskey=\"2\"><img alt=\"Page_lightning\" border=\"false\" class=\"icon\" src=\"/images/icons/page_lightning.png\" title=\"\" /> Fähigkeiten</a>";
	div_selection.insertBefore(create_li,insert_before);
};
if(gebaeude == 1) {
	// Gebäudelink
	var div_selection = document.getElementById('navigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('navigation').getElementsByTagName("ul")[0].lastChild;

	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<a href=\"/building\"  accesskey=\"2\"><img alt=\"Buildings\" border=\"false\" class=\"icon\" src=\"/images/icons/building.png\" title=\"\" /> Gebäude</a>";
	div_selection.insertBefore(create_li,insert_before);
};
if(forschung == 1) {
	// Forschungslink
	var div_selection = document.getElementById('navigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('navigation').getElementsByTagName("ul")[0].lastChild;
	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<a href=\"/laboratory/index/"+unternehmenssitz+"\"  accesskey=\"2\"><img alt=\"Bricks\" border=\"false\" class=\"icon\" src=\"/images/icons/bricks.png\" title=\"\" /> Forschung</a>";
	div_selection.insertBefore(create_li,insert_before);
};
if (org_post == 1){
	//  Organizerlink + POST im Subnavi
  var split_url2 = document.URL.split("/");
if(split_url2[3]!="direct_sale" && split_url2[3]!="organizer" && split_url2[3]!="supply_demand" && split_url2[3]!="town" && split_url2[3]!="message" && split_url2[3]!="") {
	var div_selection = document.getElementById('subnavigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('subnavigation').getElementsByTagName("ul")[0].lastChild;
	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<img alt=\"Book\" border=\"false\" class=\"icon\" src=\"/images/icons/book.png\" title=\"\" /> <a href=\"/organizer\">Organizer</a>";
	div_selection.insertBefore(create_li,insert_before);

  var div_selection = document.getElementById('subnavigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('subnavigation').getElementsByTagName("ul")[0].lastChild;
	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<img alt=\"Email\" border=\"false\" class=\"icon\" src=\"/images/icons/email.png\" title=\"\" /> <a href=\"/message\">Post</a>";
	div_selection.insertBefore(create_li,insert_before);
  };
  };
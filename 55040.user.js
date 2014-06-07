// ==UserScript==
// @name         Planetromeo Gayromeo Filter
// @namespace    gayromeo
// @description  Listen-Suchergebnisse filtern/Filter Search Result Lists
 
// @version		 $Revision: 2.13 $
// @date		 $Date: 2013/08/08 12:00:00 $
// @author		 burke67 <burke67@hotmail.com>

// @include      http*://*gayromeo.com/*search/*?action=*&searchType=*
// @include      http*://*gayromeo.com/*main/index.php
// @include      http*://*gayromeo.com/*main/top.php
// @exclude      http*://*gayromeo.com/*search/*?action=showForm&searchType=*
// @exclude      http*://*gayromeo.com/*search/*?action=*&searchType=advert*
// @exclude      http*://*gayromeo.com/*search/*?action=editBlank*
// @include      http*://*gayromeo.com/*search/*?action=executeSaved&savedSearchId*
// @include      http*://*gayromeo.com/*search/*?action=showPage&searchType=userDetail&searchResultId*
// @include      http*://*planetromeo.com/*search/*?action=*&searchType=*
// @include      http*://*planetromeo.com/*main/index.php
// @include      http*://*planetromeo.com/*main/top.php
// @exclude      http*://*planetromeo.com/*search/*?action=showForm&searchType=*
// @exclude      http*://*planetromeo.com/*search/*?action=*&searchType=advert*
// @exclude      http*://*planetromeo.com/*search/*?action=editBlank*
// @include      http*://*planetromeo.com/*search/*?action=executeSaved&savedSearchId*
// @include      http*://*planetromeo.com/*search/*?action=showPage&searchType=userDetail&searchResultId*
// @include      http*://83.98.143.20/*search/*?action=*&searchType=*
// @include      http*://83.98.143.20/*main/index.php
// @include      http*://83.98.143.20/*main/top.php
// @exclude      http*://83.98.143.20/*search/*?action=showForm&searchType=*
// @exclude      http*://83.98.143.20/*search/*?action=*&searchType=advert*
// @exclude      http*://83.98.143.20/*search/*?action=editBlank*
// @include      http*://83.98.143.20/*search/*?action=executeSaved&savedSearchId*
// @include      http*://83.98.143.20/*search/*?action=showPage&searchType=userDetail&searchResultId*

// ==/UserScript==

/*
* Planetromeo-/Gayromeo-Filter * http://userscripts.org/scripts/show/55040
*/

var version="V2.13";
var lang="DE";
var urhost=window.location.host;

/* Versionsübersicht ---
* V2.13- 2013-08-08 - Link auf Profil burke67 korrigiert (Danke an: -Djamana-)
* V2.12- 2013-07-10 - Schnellschalter geändert: für reguläre Ausdrücke
* V2.11- 2013-06-02 - Schnellschalter in Optionenzeile, ausgegraute gefilterte User/Länder werden durchgestrichen angezeigt
* V2.10- 2013-05-22 - QuickFix nach Update von GRT 3.06
* V2.9 - 2012-05-29 - QuickFix: Sprachauswahl funktioniert nun wieder
* V2.8 - 2012-04-14 - an neue Taps-Größe angepasst
* V2.7 - 2012-01-21 - "? km / ? mi"-Teasereintrag für nicht-PLUS-User entfernen, an FF10 angepasst (intern: Options hinzufügen nun nicht mehr direkt, sondern mittels add) 
* V2.6a- 2011-11-20 - Werbebanner in Usersuchen ausblenden (nur nicht-PLUS-User), Sprachabfrage neu
* V2.6 - 2011-10-25 - Sprachabfrage über top.php/GR-Variable (Anpassung an Neudesign nach Radar), Sucht-mein-Alter-Abfrage (nur PLUS-User), 
                      kleinere Fehlerkorrekturen, Ajax-Abfragen am aktuellen Host, überlange Profilbilder in Liste verkleinern
* V2.5 - 2011-04-15 - Ausgrauen bei Optionsdialogen, entfernt "Am/At" vor letztem Besuchszeitpunkt, ID-Suche angepasst
                      Optionen: Verstecken oder Ausgrauen, dabei Tapse immer anzeigen, ausgrauen oder doch verstecken,
	                  Anwendung auch auf PLUS-Bildersuche (ausgrauen), neue Icons, Dialoge leicht geändert, Codeoptimierungen
* V2.4 - 2011-03-22 - FireFox-4-Anpassungen, kleinere Änderungen (Ländernamen, alle Länder löschen), Quelltext komprimiert
* V2.3 - 2011-02-12 - Erkennung der Sprache verbessert, Support-Link hinzugefügt
* V2.2 - 2011-01-03 - auf alle Listen-Suchergebnisse anwenden (@includes vereinfacht), Länderbezeichnungen angepasst
                      Vorschläge eingearbeitet: English translation, Einstellungen-Export/-Import, Besucher mit Tapsen werden immer angezeigt 
					  Reg.Ausdrücke korrigiert; Versteckalgorithmus angepasst
* V2.1 - 2010-09-13 - Messageverlauf versteckt aufrufen: ungelesene Messages öffnen und Userprofil versteckt speichern;
                      (intern: neuer Updatemechanismus)
* V2.0 - 2010-06-30 - (reguläre) Filterausdrücke möglich samt zugehörigem Änderungsdialog, Versteckalgorithmus geändert
* V1.9c- 2010-05-11 - (intern) @include-Zeilen angepasst, auf neues GR-Design angepasst
* V1.9b- 2010-04-26 - (intern) geänderter Versionscheck
* V1.9a- 2010-03-29 - Versionscheck, Dialogabfrage mit entsprechenden Download/Installation,
*                     Icons nicht mehr hinterm Namen (lange Namen besser angezeigen) sondern in Alter-Spalte
* V1.8 - 2009-12-16 - neue @include-Zeilen, Änderungen/Ergänzungen in Filter-ID-/Filter-Länder-Dialogfenstern
* V1.7a- 2009-10-30 - zwei "Dialogfenster" zur manuellen Anpassung der zu filternden Länder und IDs
* V1.6 - 2009-10-08 - nötige Anpassung an neues Gayromeo-HTML-Format
* V1.5 - 2009-09-09 - weiterer Link: User anonym speicher-/blockierbar, [.]-Umschaltlinks durch gr-Bilder ersetzt
*                     andere Suchansichten (Detailsuche, Online-Stadt, Online-Region) hinzugenommen
* V1.4 - 2009-08-xx - IP-Adresse zum @include hinzugenommen
* V1.3 - 2009-08-11 - Konfiguration komplett über Links (keine Menübefehle mehr)
* V1.2 - 2009-08-10 - Id-Filterung, Ein-Aus-Schalter, Konfigurationsspeichern, Filter zurück- und setzbar
* V1.1 - 2009-08-04 - alle Länder aufgeführt
* V1.0 - 2009-08-04 - Rohversion
*/

function o(w){var t=document.getElementById(w); return t;}
function oo(w) {var t=document.getElementsByTagName(w); return t;}
function ooo(w,x) {o(w).style.display=((x==0)?'none':'block');}
function ael(obj,f) {o(obj).addEventListener('click',f,false);} 

var loc=document.location.href;
var ppage=loc.indexOf("searchType=picture")>-1;

if (loc.indexOf("main/index.php")>-1) { // Updatecheck bei Login
  if (o('pgWe')!=null) {
    qtext=oo('body')[0].innerHTML;	
	lang=(qtext.search(/Benutzerlogin/)>-1)?"DE":"EN";

	function copyversion(xx) {
	var x=xx.responseText; 
	  if (xx.status==200) {  
		 erg=x.indexOf('GRLF ');
	    neueversion="V"+x.slice(erg+13,erg+17);
        if (version<neueversion) { 
		  check=confirm((lang=="DE")?'PlanetRomeo-/GayRomeo-Filter '+version+' (c)burke67\n\nEINE NEUE VERSION '+neueversion+' IST JETZT VERFÜGBAR!\n\nWenn du sie jetzt herunterladen und installieren willst, klicke auf "OK".\nWählst du "Abbrechen", wirst du beim nächsten Anmelden wieder informiert.':'PlanetRomeo-/GayRomeo-Filter '+version+' (c)burke67\n\nA NEW RELEASE '+neueversion+' IS NOW AVAILABLE!\n\nIf you want to download and install it now, click "OK".\n If you choose "Cancel", you will be asked again at your next login.');
		  if (check) window.open("http://userscripts.org/scripts/source/55040.user.js","_blank");
		  // http://burke67.yolasite.com/grlfupdate.php
	    }
	  }
    };
     
    GM_xmlhttpRequest({ 
	  method: 'GET',
	  url: 'http://burke67.yolasite.com',
	  headers: {Accept: 'text/plain'},
	  onload: function(data) { copyversion(data); }
    });  
  }
  return; // wichtig
} 

/* sessionId in Dokument suchen, wird für AJAX-Abfragen benötigt */
expr=/\/(\w{32})\//;
atemp=expr.exec( document.location );
sessionId=(atemp)?atemp[1]+"/":"";

var lang;
var onoff;

//var continents = { 1:{"DE":"Europa","EN":"Europe"}, 2:{"DE":"Afrika","EN":"Africa"}, 3:{"DE":"Südamerika","EN":"South America"}, 4:{"DE":"Nordamerika","EN":"North America"}, 5:{"DE":"Asien","EN":"Asia"}, 6:{"DE":"Australien & Ozeanien","EN":"Australia & Oceania"}, 8:{"DE":"Naher Osten","EN":"Middle East"}, 9:{"DE":"Mittelamerika","EN":"Central America"} };

if (loc.indexOf("main/top.php")>-1) { // Sprach-/Ländercheck 
  if (oo('body')[0].innerHTML.search(/<span class="display">Deutsch/)>-1) lang="DE"; else lang="EN";
  var oldclang = GM_getValue('GR_LF_clang',"");
  GM_setValue('GR_LF_lang', (lang=="DE"?"DE":"EN")); 
  var now = new Date();
  
  function gett(url) {
   GM_xmlhttpRequest({
    method: "GET",
     url: url, 
     onload: function(xhr) {
      var llist = "{";
	  var clist = "[";
	  var oldc = GM_getValue('GR_LF_countries', "");
      var need = (oldc!="");
      expr=/<script language="JavaScript">([^<]+)function/m;
	  atemp=expr.exec(xhr.responseText);
	  eval(atemp[1]);

	  for (var cc=1; cc<10; cc++) {
	   if (cc==7) continue; // gibt es nicht
	   for (var c=cc*100+1; c<cc*100+100; c++) {
	     if (country[cc][c]) {
		   llist+="\""+c+"\":\""+country[cc][c]+"\",";
		   if (need) if (oldc.indexOf(country[cc][c])>-1) clist+=c+",";
		 }
	   }
	  }
	  if (need) {
	    clist=clist.substring(0,clist.length-1)+"]";
// GM_log( clist );		
		// GM_setValue('GR_LF_cnmbrs', clist);
		// GM_setValue('GR_LF_countries', "");
		
		// IDs konvertieren
		 tempo = GM_getValue('GR_LF_ids', "").replace(/%0#/g,"").replace(/#/g,",");
// GM_log( tempo );
        // GM_setValue('GR_LF_ids', tempo);
				
	  }
	  llist=llist.substring(0,llist.length-1)+"}";
// GM_log( llist );	  
	  // GM_setValue('GR_LF_allcs', llist);
	  // GM_setValue('GR_LF_clang', lang);
	  // GM_setValue('GR_LF_lcheck', Number(now).toString() );
	 }	 
    });
   }
// GM_log( now-GM_getValue('GR_LF_lcheck', 0) );
// GM_log( oldclang+" "+lang );

   //if ((now-GM_getValue('GR_LF_lcheck', 0)>86400000) || (oldclang!=lang))
   // gett("http://www.gayromeo.com/"+sessionId+"search/?action=showForm&searchType=userDetail");
  
  return; // wichtig;
}

qtext=oo('body')[0].innerHTML;
lang=GM_getValue('GR_LF_lang',"DE");

/* globaler Zähler count, zählt im Hintergrund abgeschlossene AJAX-Abfragen ID->Name */
var count=0;

/* Ergebnistest-Funktion nach einer AJAX-Abfrage */
/* txt: Antwort der AJAX-Abfrage, ein HTML-Dokument */
/* expr: auf Antwort anzuwendender regulärer Ausdruck */
/* v: Name */
/* z: Index der Option in Selectbox (dort ist eine ID) */
/* entweder v oder z sind null, genau eins von beiden */
function workxhr(txt,expr,v,z) {
  var opt; /* zum Anlegen einer neuen Option */
  var w=expr.exec(txt); /* Ausdruck auf Antwort anwenden */
  
  if (z!=null) { count++; } /* bei ID->Name-Abfrage Zähler erhöhen */
  
  if (w) { /* falls der Ausdruck gepasst hat */
    if (v) { /* entweder */
             /* erst prüfen, ob diese ID schon eingetragen ist, evtl. Hinweis und fertig */
      for (var n=0; n<o('grlfsi').length;n++) {
        if (o('grlfsi').options[n].value==w[1]) {
          alert((lang=="de")?"'"+v+"' wird bereits gefiltert!":"'"+v+"' already filtered!");
          switchElems(false);
          return;
        }
      }
      /* (ID wird noch nicht gefiltert:) */
      /* und neue Option in Selectbox einfügen */
      opt=new Option(v,w[1],false,false);
      o('grlfsi').add(opt);
      o('grlfii').value="";
    } else {
      /* oder ID in Namen umändern */
      o('grlfsi').options[z].text=w[1];
    }
  }
  /* bei Name-Abfrage oder wenn alle Options abgearbeitet wurden */
  if (z!=null&&count<o('grlfsi').length) {
    tmpo=(o('grlfsi').length-count);
    o('grlfiz').value=(lang=="DE")?"...suche\nnoch "+tmpo+" IDs...":"...decoding\n"+tmpo+" IDs...";
  }
  if (z==null||(count>=o('grlfsi').length)) {
    switchElems(false); /* gesperrten Dialog wieder freigeben */
    o('grlfiz').value=(lang=="DE")?"ID wieder\nanzeigen":"show ID\nagain"; } /* und Knopfbezeichnung ändern */
}

/* AJAX-Abfrage ID->Name oder Name->ID */
/* per GM-Abfrage, ruft URL auf, restliche Parameter werden an Erbnistest-Funktion weitergegeben */
function get(url, expr, cb, v, z) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText,expr,v,z); }
  });
}

var myage=GM_getValue('GR_LF_myage', "");
window['GR_LF_myage']=myage;
var mstate=GM_getValue('GR_LF_mstate', false);
window['GR_LF_mstate']=mstate;
var nstate=GM_getValue('GR_LF_nstate', false);
window['GR_LF_nstate']=nstate;
var mistate=GM_getValue('GR_LF_mistate', true);
window['GR_LF_mistate']=mistate;
var nistate=GM_getValue('GR_LF_nistate', true);
window['GR_LF_nistate']=nistate;
window['GR_LF_must']=GM_getValue('GR_LF_must', "");
window['GR_LF_nogo']=GM_getValue('GR_LF_nogo', "");

onoff=GM_getValue('GR_LF_ONOFF',true);

function nmTooltip() {
  var a="  ";
  var mi=(mistate)?"(A=a)":"";
  var ni=(nistate)?"(A=a)":"";
  if (mstate) a=((lang=="DE")?"MUSS":"MUST")+mi+": " + window['GR_LF_must'] + "  ";
  if (nstate) a+=((lang=="DE")?"NICHT":"NOT")+ni+": " + window['GR_LF_nogo'] + "  ";
  if (myage!='') a+=((lang=="DE")?"ALTER(":"AGE(")+window['GR_LF_myage']+")  ";
  return a;
}

var defaultFilter="%0";
var aCArr=new Array(
'Ägypten','Algerien','Angola','Äquatorialguinea','Äthiopien','Benin','Botswana','Burkina Faso','Burundi','Dem. Rep. Kongo','Dschibuti','Elfenbeinküste','Eritrea','Gabun','Gambia','Ghana','Guinea','Guinea-Bissau','Kamerun','Kap Verde','Kenia','La Réunion (FR)','Lesotho','Liberia','Libyen','Madagaskar','Malawi','Mali','Marokko','Mauretanien','Mauritius','Mosambik','Namibia','Niger','Nigeria','Republik Kongo','Ruanda','Sambia','Sao Tomé and Principe','Senegal','Seychellen','Sierra Leone','Simbabwe','Somalia','Südafrika','Sudan','Swasiland','Tansania','Togo','Tschad','Tunesien','Uganda','Zentralafrikanische Republik',
'Afghanistan','Armenien','Aserbaidschan','Bangladesch','Bhutan','Brunei','China','Georgien','Indien','Indonesien','Japan','Kambodscha','Kasachstan','Kirgisien','Laos','Malaysia','Malediven','Mongolei','Myanmar','Nepal','Nordkorea','Osttimor','Pakistan','Philippinen','Singapur','Sri Lanka','Südkorea','Tadschikistan','Taiwan','Thailand','Turkmenistan','Usbekistan','Vietnam',
'Australien','Cook Inseln','Fidschi','Franz. Polynesien','Marshallinseln','Mikronesien','Nauru','Neukaledonien [FR]','Neuseeland','Palau','Papua-Neuguinea','Salomonen','Samoa','Tonga','Tuvalu','Vanuatu',
'Albanien','Andorra','Belgien','Bosnien-Herzegowina','Bulgarien','Dänemark','Deutschland','Estland','Finnland','Frankreich','Griechenland','Vereinigtes Königreich','Irland','Island','Italien','Kosovo','Kroatien','Lettland','Litauen','Luxemburg','Malta','Mazedonien (fYRoM)','Moldawien','Montenegro','Niederlande','Norwegen','Österreich','Polen','Portugal','Rumänien','Russland','San Marino','Schweden','Schweiz','Serbien','Slowakei','Slowenien','Spanien','Tschechien','Türkei','Ukraine','Ungarn','Vatikan','Weißrussland','Zypern',
'Antigua und Barbuda','Aruba','Bahamas','Barbados','Belize','Bermuda','Cayman Islands (UK)','Costa Rica','Curacao (NL)','Dominica','Dominikanische Republik','El Salvador','Grenada','Guadeloupe (FR)','Guatemala','Haiti','Honduras','Jamaika','Jungferninseln','Kuba','Martinique (FR)','Nicaragua','Panama','Puerto Rico','St. Kitts und Nevis','St. Lucia','St. Martin (NL)','St. Vincent & Grenadinen','Trinidad und Tobago',
'Bahrein','Irak','Iran','Israel','Jemen','Jordanien','Katar','Kuwait','Libanon','Oman','Palästina - Selbstverwaltung','Saudi-Arabien','Syrien','Vereinigte Arabische Emirate',
'Kanada','Mexiko','USA',
'Argentinien','Bolivien','Brasilien','Chile','Ecuador','Guyana','Guyane (FR)','Kolumbien','Paraguay','Peru','Surinam','Uruguay','Venezuela');
var aCArrEn=new Array(
'Egypt','Algeria','Angola','Equatorial Guinea','Ethiopia','Benin','Botswana','Burkina Faso','Burundi','Dem. Republic of the Congo','Djibouti','Ivory Coast','Eritrea','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Cameroon','Cape Verde','Kenya','Réunion','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Morocco','Mauritania','Mauritius','Mozambique','Namibia','Niger','Nigeria','Republic of the Congo','Rwanda','Zambia','São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Zimbabwe','Somalia','South Africa','Sudan','Swaziland','Tanzania','Togo','Chad','Tunisia','Uganda','Central African Republic',
'Afghanistan','Armenia','Azerbaijan','Bangladesh','Bhutan','Brunei','China','Georgia','India','Indonesia','Japan','Cambodia','Kazakhstan','Kyrgyzstan','Laos','Malaysia','Maldives','Mongolia','Myanmar','Nepal','NorthKorea','Timor-Leste','Pakistan','Philippines','Singapore','Sri Lanka','South Korea','Tajikistan','Taiwan','Thailand','Turkmenistan','Uzbekistan','Vietnam',
'Australia','Cook Islands','Fiji','French Polynesia','Marshall Islands','Micronesia','Nauru','New Caledonia (FR)','New Zealand','Palau','Papua New Guinea','Solomon Islands','Samoa','Tonga','Tuvalu','Vanuatu',
'Albania','Andorra','Belgium','Bosnia and Herzegovina','Bulgaria','Denmark','Germany','Estonia','Finland','France','Greece','United Kingdom','Ireland','Iceland','Italy','Kosovo','Croatia','Latvia','Lithuania','Luxembourg','Malta','Macedonia (fYRoM)','Moldova','Montenegro','Netherlands','Norway','Austria','Poland','Portugal','Romania','Russia','San Marino','Sweden','Switzerland','Serbia','Slovakia','Slovenia','Spain','Czech Republic','Turkey','Ukraine','Hungary','Vatican City','Belarus','Cyprus',
'Antigua and Barbuda','Aruba','Bahamas','Barbados','Belize','Bermuda','Cayman Islands (UK)','Costa Rica','Curacao (NL)','Dominica','Dominican Republic','El Salvador','Grenada','Guadeloupe (FR)','Guatemala','Haiti','Honduras','Jamaica','Virgin Islands','Cuba','Martinique (FR)','Nicaragua','Panama','Puerto Rico','Saint Kitts and Nevis','Saint Lucia','St. Maarten (NL)','SaintVincent & Grenadines','Trinidad and Tobago',
'Bahrein','Iraq','Iran','Israel','Yemen','Jordan','Qatar','Kuwait','Lebanon','Oman','Palestinian Authority','Saudi Arabia','Syria','United Arab Emirates',
'Canada','Mexico','USA',
'Argentina','Bolivia','Brazil','Chile','Ecuador','Guyana','Guyane (FR)','Colombia','Paraguay','Peru','Suriname','Uruguay','Venezuela'
);

var aCAss=new Object();
for (var n=0; n<aCArr.length; n++)
  aCAss[ aCArr[n] ]=1;

var elems=new Array('af','as','au','eu','ma','no','na','sa','grlfls');
var sidxs=new Array(1,55,89,106,152,183,197,201);
var eidxs=new Array(53,87,104,150,181,195,199,213);

var state=GM_getValue('GR_LF_state', true);
window['GR_LF_state']=state;
var newstate=GM_getValue('GR_LF_newstate', (window['GR_LF_state'])?3:0 );
window['GR_LF_newstate']=newstate;
window['GR_LF_state']=(window['GR_LF_newstate']==0)?false:true;

window['GR_LF_onlyger']=GM_getValue('GR_LF_onlyger', false);

for (var i=0; i<=7; i++)
  window['GR_LF_'+elems[i]]=GM_getValue('GR_LF_'+elems[i], false);

function s_F(key, reset) {
  value=(reset) ? defaultFilter : window[key];
  GM_setValue(key, value);
  if (reset) location.reload();
}

window["GR_LF_countries"]=GM_getValue("GR_LF_countries", defaultFilter);
window["GR_LF_countries"]=window["GR_LF_countries"].replace(/#undefined/g,"").replace(/#%0/g,"");
var fCArr=window["GR_LF_countries"].split('#');
var fCAss=new Object();
for (var n=0; n<fCArr.length; n++) 
  fCAss[ fCArr[n] ]=1;

var CTrans=new Object();
var ULand=new Object();
for (var n=0; n<aCArr.length; n++) {
  if (lang=="DE")
    { CTrans[ aCArr[n] ]=aCArr[n];
	ULand[ aCArr[n] ]=aCArr[n]; }
  else
    { CTrans[ aCArrEn[n] ]=aCArr[n];
	ULand[ aCArr[n] ]=aCArrEn[n]; }
}

// fIdArr direkt aus Variable
window["GR_LF_ids"]=GM_getValue("GR_LF_ids", defaultFilter);
var fIdArr=window["GR_LF_ids"].split('#');
//var fIdArr = eval( "["+GM_getValue('GR_LF_ids',"")+"]" );
var fIdAss=new Object();
for (var n=0; n<fIdArr.length; n++) 
  fIdAss[ fIdArr[n] ]=1;

loc=document.location;
param=decodeURIComponent(loc.search);
loc=loc.href;

if (param.length>0) {
  posi=param.search(/&ac=/);
  if (posi>-1) {
    land=param.substr(posi+4);
    loc=loc.substr(0,loc.length-land.length-4);
    fCAss[ land ]=1;
    window["GR_LF_countries"]+="#"+land;
    GM_setValue("GR_LF_countries", window["GR_LF_countries"]);
  }
  
  posi=param.search(/&dc=/);
  if (posi>-1) {
    land=param.substr(posi+4);
    loc=loc.substr(0,loc.length-land.length-4);
    fCAss[ land ]=0;
    neus=defaultFilter;
    stemp=window["GR_LF_countries"].split('#');
    for (var i=0; i<=stemp.length; i++) {
      if (stemp[i]!=land)
        neus+="#" + stemp[i];
    }
    window["GR_LF_countries"]=neus;
    GM_setValue("GR_LF_countries", window["GR_LF_countries"]);
  }
  
  posi=param.search(/&ai=/);
  if (posi>-1) {
    numb=""+param.substr(posi+4);
    loc=loc.substr(0,loc.length-numb.length-4);
    fIdAss[ numb ]=1;
	
    window["GR_LF_ids"]+="#"+numb;
    GM_setValue("GR_LF_ids", window["GR_LF_ids"]);
  }
  
  posi=param.search(/&di=/);
  if (posi>-1) {
    numb=""+param.substr(posi+4);
    loc=loc.substr(0,loc.length-numb.length-4);
	
    fIdAss[ numb ]=0;
    neus=defaultFilter;

    stemp=window["GR_LF_ids"].split('#');
    for (var i=0; i<=stemp.length; i++) {
      if (stemp[i]!=numb)
        neus+="#" + stemp[i];
    }
    window["GR_LF_ids"]=neus;
    GM_setValue("GR_LF_ids", window["GR_LF_ids"]);
  }
}

function resetIds() {
 if (confirm((lang=="DE")?"Wirklich alle ID(!)-Filter zurücksetzen?":"Really reset all ID(!)-filters?")) { 
  rI(); 
  document.location.href=loc;
 }
}
function rI() {
 s_F("GR_LF_ids", true); 
}

function resetCountries() { 
 if (confirm((lang=="DE")?"Wirklich alle Länder(!)-Filter zurücksetzen?":"Really reset all country(!)-filters?")) {
  rC(); 
  document.location.href=loc;
 }
}
function rC() {
 s_F("GR_LF_countries", true); 
 for (i=0; i<=7; i++)
  window['GR_LF_'+elems[i]]=GM_getValue('GR_LF_'+elems[i], true);
}

function resetAll() { 
 if (confirm((lang=="DE")?"Wirklich alle ID(!)-Filter zurücksetzen?":"Really reset all ID(!)-filters?")) {
  rA(); 
  document.location.href=loc;
 }
}
function rA() {
 rI();
 rC();
 window["GR_LF_must"]=false;
 window["GR_LF_nogo"]=false;
}

function submitCountryForm() {
  ooo('grlfld',0);
  if (this.name=="grlflb") {
    window["GR_LF_countries"]=defaultFilter;
    for (var i=0; i<o('grlfls').length; i++) { 
      if (o('grlfls').options[i].selected)
        window["GR_LF_countries"]=window["GR_LF_countries"] + "#" + o('grlfls').options[i].value;
    }
    GM_setValue("GR_LF_countries", window["GR_LF_countries"]);
  
    GM_setValue("GR_LF_onlyger", window["GR_LF_onlyger"]);
   
    for (i=0; i<=7; i++)
      GM_setValue("GR_LF_"+elems[i], window["GR_LF_"+elems[i]]);
  }
  if (loc) document.location.href=loc; else location.reload();
}

function justGermany() {
  var obj=o('nurd');
  for (var elem in elems)
    o(elems[elem]).disabled=obj.checked;
  window["GR_LF_onlyger"]=obj.checked;
}

function justContinent() {
  var caller=this.name;
  window["GR_LF_"+elems[caller]]=o(elems[caller]).checked;
  var newval=(o(elems[caller]).checked);
  for (var idx=sidxs[caller]; idx<=eidxs[caller]; idx++) {
    o('grlfls').options[idx].selected=newval;
  }
}

var donLink=""; //=(lang=="DE") ?  "<a href=\"http://burke67.yolasite.com/listenfilter.php\" target=\"_blank\" style='color:#89f' title='GR-Listenfilter unterstützen'>[...€?]</a>" : "<a href=\"http://burke67.yolasite.com/listenfilter.php\" target=\"_blank\" style='color:#89f' title='Support GR List Filter'>[...€?]</a>";
var donTxt=""; //=(lang=="DE") ? "<br /><span style='color:#89f;'> Gefällt dir der Filter?<br /> Unterstütze die Weiterentwicklung: </span>"+donLink : "<br /><span style='color:#89f'> Do you like this filter?<br /> Support its future development: </span>"+donLink;
var onTxt=(lang=="DE")? ((onoff==true)?'AN':'AUS') : ((onoff==true)?'ON':'OFF');
var aboutTxt = '<p style="margin-top:5px; padding:2px; border-top:2px solid yellow; color: yellow">Planetromeo Gayromeo Filter '+version+' ('+onTxt+')<br />http://userscripts.org/scripts/show/55040<br />&copy; 2011 &rarr; <a href=\"/auswertung/setcard/?set=3420497\" onClick=\"return openUrl(this.href);\">burke67</a></p>';

var hstyle='style="color:white; background-color:#547fdb; padding:3px; font-weight:bold;"';
function dstyle(w,h) { return 'style="display:none; position:absolute; width:'+w+'px; height:'+h+'px; background-color:#305ab1; border:2px solid yellow; -moz-border-radius:8px; padding:4px; font-size:small; z-index:9999;"'; }
var astyle='style="font-size:xx-small;resize:none;background-color:#ccc;-moz-border-radius:4px;"';

function arb(i,l) { return '<input type="radio" name="grlonoff" id="grlonoff'+i+'" value="'+i+'"> <label for="grlonoff'+i+'">'+l+'</label><br />'; }

oo('body')[0].innerHTML.replace( /<div style="text-align:center; vertical-align:middle;">/g,
'<div style="text-align:center; vertical-align:middle; display:none;">');

oo('body')[0].innerHTML=(lang=="DE")?
oo('body')[0].innerHTML.replace( /body>/ , 
'body>'
+'<div id="grlgray" style="position:fixed;left:0;top:0;width:100%;height:100%;background:#000 none;opacity:0.7;z-index:5000}"></div>'
+'<div id="grlfld" '+dstyle(330,445)+'>'
+ '<p '+hstyle+'>Zu filternde Länder (sortiert nach Kontinenten):</p><p>Mehrere Länder auswählbar, daher beim Auswählen oder Entfernen jeweils die <span style="text-decoration:underline;">Strg- / Ctrl-Taste gedrückt halten!</span></p><p>'
+ ' &nbsp; <select id="grlfls" size="18" multiple style="width:200px;"></select>'
+ ' </p><p><input type="checkbox" id="nurd"> <label for="nurd"><b>alles filtern au&szlig;er Deutschland</b></label><br /><input type="checkbox" id="eu" name="3"> <label for="eu">Europa</label><br /><input type="checkbox" id="af" name="0"> <label for="af">Afrika</label> &nbsp;&nbsp; <input type="checkbox" id="as" name="1"> <label for="as">Asien</label> &nbsp;&nbsp; <input type="checkbox" id="au" name="2"> <label for="au">Australien &amp; Ozeanien</label><br /><input type="checkbox" id="ma" name="4"> <label for="ma">Mittelamerika</label> &nbsp;&nbsp; <input type="checkbox" id="no" name="5"> <label for="no">Naher Osten</label><br /><input type="checkbox" id="na" name="6"> <label for="na">Nordamerika</label> &nbsp; <input type="checkbox" id="sa" name="7"> <label for="sa">Südamerika</label> &nbsp; &nbsp; &nbsp; &nbsp; <input id="grlflb" name="grlflb" type="button" value=" Ok "> <input id="grlflx" name="grlflx" type="button" value="Abbruch"><br />'+donTxt+'</p></div>'
+ '<div id="grlfli" '+dstyle(330,445)+'>'
+ '<p '+hstyle+'>Gefilterte IDs:</p><p>Bitte etwas warten, das System sucht zuerst zu den IDs die passenden Usernamen, danach lassen sich diese mit dem <span style="text-decoration:underline;">\'ID wieder anzeigen\'</span>-Knopf aus dem Filter herausnehmen, werden also wieder normal angezeigt.</p><p>'
+ ' &nbsp; <select id="grlfsi" size="18" style="width:200px;"></select> <input id="grlfiz" name="grlfiz" type="button" value="ID wieder\nanzeigen " style="vertical-align:top;"></p>'
+ '<p><b>Username neu zum Filter hinzufügen:</b></p><p>'
+ ' &nbsp; <input id="grlfii" name="grlfii" type="text" size="36"> &nbsp; <input id="grlfip" name="grlfip" type="button" value=" filtern "></p><p>'
+ ' &nbsp; <input id="grlfbi" name="grlfbi" type="button" value=" Ok "> &nbsp; <input id="grlfix" name="grlfix" type="button" value="Abbruch"><br />'+donTxt+'</div>'
+ '<div id="grlfex" '+dstyle(450,415)+'>'
+ '<p '+hstyle+'>Nach Ausdrücken filtern:</p><p>'
+ ' &nbsp; <input type="checkbox" id="grlfem"> <label for="grlfem"><b style="color:#40ff40">Dies MUSS vorkommen:</b></label> <b>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b> <input type="checkbox" id="grlfemi"> <label for="grlfemi"><b>ABC=abc</b></label><br />'
+ ' &nbsp; <textarea id="grlfemt" name="grlfemt" cols="57" rows="2" style="background-color:#80ff80;resize:none"></textarea></p><p>'
+ ' &nbsp; <input type="checkbox" id="grlfen"> <label for="grlfen"><b style="color:#ff8080">Dies DARF NICHT vorkommen:</b></label>&nbsp; <input type="checkbox" id="grlfeni"> <label for="grlfeni"><b>ABC=abc</b></label><br />'
+ ' &nbsp; <textarea id="grlfent" name="grlfent" cols="57" rows="2" style="background-color:#ff8080;resize:none"></textarea></p><p>'
+ ' &nbsp; <b>Nur PLUS-User:</b> <b style="color:#ff0;">Nur User zeigen, die mein Alter (<input type="text" size="1" maxlength="2" id="grlfea" style="background:#3060ff; color:#ff0;  border-width:0px 0px 1px; border-style:dashed; text-align:center; font-weight:bold;">) suchen.</b></p><p style="margin:1em;">'
+ '<input id="grlfei" name="grlfei" type="button" value=" Ok "> &nbsp; <input id="grlfer" name="grlfer" type="button" value="Abbruch"></p><p style="margin-left:4px;">'
+ 'Eine ausführliche Hilfe findest du auf der <a href="http://userscripts.org/scripts/show/55040" target="blank">Filterhomepage</a>.<br /> Alternative Begriffe durch () Klammern und durch | trennen, Leerzeichen durch . ersetzen. Wer will, kann echte reguläre Ausdrücke angeben. Gefiltert wird nur bei gesetztem Häkchen. Die Filter werden auf alle aufgelisteten Angaben eines Users angewendet. Wird ABC=abc angehakt, wird Groß- und Kleinschreibung ignoriert. Beim Filter-Reset werden nur die Filterhäkchen entfernt, nicht die Ausdrücke gelöscht.<br />Bei Angabe deines Alters (sinnvolle Eingabe 18-99) werden alle User ausfiltert, die nicht nach deinem Alter suchen. Dies ist nur für PLUS-User sinnvoll, die diese Information auch in der Userliste anzeigen lassen. Möchtest du eine solche zusätzliche Filterung nicht, so lässt du das Altersfeld einfach leer.</p>'+donTxt+'</div>'

+ '<div id="grlfepd" '+dstyle(340,412)+'>'
+ '<p '+hstyle+'>Export der Einstellungen:</p><p>Den unten stehenden Text vollständig markieren, kopieren (Strg-C) und extern, z.B. in einer Textdatei, speichern.</p><p><textarea autofocus id="grlfear" name="grlfear" cols="62" rows="20" '+astyle+' readonly="readonly"></textarea></p><p><input id="grlfepo" name="grlfepo" type="button" value=" Exportfenster schließen "></p>'+donTxt+'</div>'
+ '<div id="grlfipd" '+dstyle(340,412)+'>'
+ '<p '+hstyle+'>Import der Einstellungen:</p><p>Unten den vorher exportierten Text, z.B. aus einer Textdatei, vollständig hineinkopieren (Strg-V), dann \'Importieren\' klicken.</p><p><textarea autofocus placeholder="Vorher exportierte Optionen hier hinein kopieren..." id="grlfiar" name="grlfiar" cols="62" rows="20" '+astyle+'></textarea></p><p><input id="grlfipo" name="grlfipo" type="button" value=" Importieren "> &nbsp; <input id="grlfipc" name="grlfipc" type="button" value="Abbruch"></p>'+donTxt+'</div>'
+ '<div id="grlopx" '+dstyle(250,260)+'>'
+ '<p '+hstyle+'>&nbsp; Filter ein/aus/ausgrauen:</p>'
+ arb(0,'nicht filtern (alles anzeigen)')
+ arb(1,'alles wegfiltern (auch Tapse)')
+ arb(2,'wegfiltern (aber Tapse doch anzeigen)')
+ arb(3,'wegfiltern (aber Tapse ausgrauen)')+'<br />'
+ arb(4,'nicht wegfiltern, sondern nur ausgrauen')
+ '<br /> &nbsp; <input id="grlfoi" name="grlfoi" type="button" value=" Ok "> &nbsp; <input id="grlfor" name="grlfor" type="button" value="Abbruch"><br />'+aboutTxt+'</div>') //+donTxt+
:
oo('body')[0].innerHTML.replace( /body>/ , 
'body>'
+'<div id="grlgray" style="position:fixed;left:0;top:0;width:100%;height:100%;background:#000 none;opacity:0.7;z-index:5000}"></div>'
+'<div id="grlfld" '+dstyle(330,440)+'>'
+ '<p '+hstyle+'>Filtered Countries (by continents):</p><p>To select or deselect multiple countries <span style="text-decoration:underline;">press and hold the Ctrl key!</span></p><p>'
+ ' &nbsp; <select id="grlfls" size="18" multiple style="width:200px;"></select>'
+ ' </p><p><input type="checkbox" id="nurd"> <label for="nurd"><b>filter all but Germany</b></label><br /><input type="checkbox" id="eu" name="3"> <label for="eu">Europe</label><br /><input type="checkbox" id="af" name="0"> <label for="af">Africa</label> &nbsp;&nbsp; <input type="checkbox" id="as" name="1"> <label for="as">Asia</label> &nbsp;&nbsp; <input type="checkbox" id="au" name="2"> <label for="au">Australia &amp; Oceania</label><br /><input type="checkbox" id="ma" name="4"> <label for="ma">Middle America</label> &nbsp;&nbsp; <input type="checkbox" id="no" name="5"> <label for="no">Middle East</label><br /><input type="checkbox" id="na" name="6"> <label for="na">North America</label> &nbsp; <input type="checkbox" id="sa" name="7"> <label for="sa">South America</label> &nbsp;&nbsp; <input id="grlflb" name="grlflb" type="button" value=" Ok "> <input id="grlflx" name="grlflx" type="button" value="Cancel"><br />'+donTxt+'</p></div>'
+ '<div id="grlfli" '+dstyle(330,445)+'>'
+ '<p '+hstyle+'>Filtered IDs:</p><p>Please wait a few seconds, the system searches the filtered IDs and shows the matching user names. After that you can (de)select them. If you won\'t filter them any more press the button <span style="text-decoration:underline;">\'show ID again\'</span>.</p><p>'
+ ' &nbsp; <select id="grlfsi" size="18" style="width:200px;"></select> <input id="grlfiz" name="grlfiz" type="button" value="show ID\nagain " style="vertical-align:top;"></p><p>'
+ ' <b>Add this user name to the filter:</b></p><p>'
+ ' &nbsp; <input id="grlfii" name="grlfii" type="text" size="36"> &nbsp; <input id="grlfip" name="grlfip" type="button" value=" Filter this user "></p><p>'
+ ' &nbsp; <input id="grlfbi" name="grlfbi" type="button" value=" Ok "> &nbsp; <input id="grlfix" name="grlfix" type="button" value="Cancel"><br />'+donTxt+'</div>'
+ '<div id="grlfex" '+dstyle(450,390)+'>'
+ '<p '+hstyle+'>Regular expressions filter:</p><p>'
+ ' &nbsp; <input type="checkbox" id="grlfem"> <label for="grlfem"><b style="color:#40ff40">SHOULD contain:</b></label> <b>&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;</b> <input type="checkbox" id="grlfemi"> <label for="grlfemi"><b>ABC=abc</b></label><br />'
+ ' &nbsp; <textarea id="grlfemt" name="grlfemt" cols="57" rows="2" style="background-color:#80ff80;resize:none"></textarea></p><p>'
+ ' &nbsp; <input type="checkbox" id="grlfen"> <label for="grlfen"><b style="color:#ff8080">MUST NOT contain:</b></label>&nbsp; &nbsp; <input type="checkbox" id="grlfeni"> <label for="grlfeni"><b>ABC=abc</b></label><br />'
+ ' &nbsp; <textarea id="grlfent" name="grlfent" cols="57" rows="2" style="background-color:#ff8080;resize:none"></textarea></p><p>'
+ ' &nbsp; <b>PLUS users only:</b> <b style="color:#ff0;">Show only users, who search my age (<input type="text" size="1" maxlength="2" id="grlfea" style="background:#3060ff; color:#ff0;  border-width:0px 0px 1px; border-style:dashed; text-align:center; font-weight:bold;">).</b></p><p style="margin:1em;">'
+ '<input id="grlfei" name="grlfei" type="button" value=" Ok "> &nbsp; <input id="grlfer" name="grlfer" type="button" value="Cancel"><p style="margin-left:4px;">'
+ 'See detailed help on the <a href="http://userscripts.org/scripts/show/55040" target="blank">filter script page</a>.<br />Use () to group and | to seperate items, a . replaces a space.<br />You may specify real regular expressions, if you want. The filter is active, if checked. The filter will be applied to all listed details of the user. If ABC=abc is checked, capitalization will be ignored. The filter reset does not delete the expressions, it only resets the check marks.<br />If you fill in your age (a number between 18 and 99), the filter will hide users who don\'t search your age. This works only if you are a PLUS user, and you\'ve selected to let these information to be shown in the user lists. If you don\'t want such filtering, just keep the age input field empty.</p>'+donTxt+'</div>'
+ '<div id="grlfepd" '+dstyle(340,412)+'>'
+ '<p '+hstyle+'>Settings Export:</p><p>Select the text below, copy (Ctrl-C) and save it exterally, i.e. in a text file.</p><p><textarea autofocus id="grlfear" name="grlfear" cols="62" rows="20" '+astyle+'></textarea></p><p><input id="grlfepo" name="grlfepo" type="button" value=" close export window "></p>'+donTxt+'</div>'
+ '<div id="grlfipd" '+dstyle(340,412)+'>'
+ '<p '+hstyle+'>Settings Import:</p><p>Paste (Ctrl-V) the previously exported text, i.e. from a text file, into the text box below, then click the \'Import this\' button.</p><p><textarea autofocus placeholder="Paste previously exported settings here..." id="grlfiar" name="grlfiar" cols="62" rows="20" '+astyle+'></textarea></p><p><input id="grlfipo" name="grlfipo" type="button" value=" Import this "> &nbsp; <input id="grlfipc" name="grlfipc" type="button" value="Cancel"></p>'+donTxt+'</div>'
+ '<div id="grlopx" '+dstyle(250,260)+'>'
+ '<p '+hstyle+'>&nbsp; Filter enable/disable/gray-out:</p>'
+ arb(0,'filter disabled (show all entries)')
+ arb(1,'filter fully enabled (footprints visible)')
+ arb(2,'filter enabled (footprints visible)')
+ arb(3,'filter enabled (footprints grayed-out)')+'<br />'
+ arb(4,'filterd entries grayed-out')
+ '<br /> &nbsp; <input id="grlfoi" name="grlfoi" type="button" value=" Ok "> &nbsp; <input id="grlfor" name="grlfor" type="button" value="Cancel"><br /><p style="margin-top:5px; padding:2px;  border-top:2px solid yellow; color: yellow">Planetromeo Gayromeo Filter '+version+'<br />http://userscripts.org/scripts/show/55040<br />&copy; 2011 &rarr; <a href=\"/auswertung/setcard/?set=3420497\" onClick=\"return openUrl(this.href);\">burke67</a></p></div>'); //+donTxt+

ooo("grlgray",0);

ael('grlflb',submitCountryForm);
ael('grlflx',submitCountryForm);
ael('nurd',justGermany);
for (var i=0; i<8; i++) 
  ael(elems[i],justContinent);

function submitIdForm() {
  switchElems(true);
  if (this.name=="grlfbi") {
    window["GR_LF_ids"]=defaultFilter;
var nope="";    
    for (var i=0; i<o('grlfsi').length; i++) {
      if (o('grlfsi').options[i].text==o('grlfsi').options[i].value)
        nope=nope + "#" + o('grlfsi').options[i].value;
      else
        window["GR_LF_ids"]=window["GR_LF_ids"] + "#" + o('grlfsi').options[i].value;
    }
    if (nope!="")
      if (!confirm((lang=="DE")?"Es gibt verwaiste IDs ohne Bezug (vermutlich gelöschte User).\nSollen diese auch aus dem Filter gelöscht werden?":"There are orphaned IDs (probably deleted users). Do you want to delete them?")) 
        window["GR_LF_ids"]=window["GR_LF_ids"] + nope;
    GM_setValue("GR_LF_ids", window["GR_LF_ids"]);
      
  }
  ooo('grlfli',0);
  if (loc) document.location.href=loc; else location.reload();
}

ael('grlfbi',submitIdForm);
ael('grlfix',submitIdForm);

function listclick() {
  var idx=this.selectedIndex;
  var kont=-1;
  for (var i=0; i<=7; i++)
    if ( (idx>=sidxs[i])&&(idx<=eidxs[i]) ) kont=i;
  if (kont>-1) {
    o(elems[kont]).checked=false;
    window["GR_LF_"+elems[kont]]=false;
  }
}

ael('grlfls',listclick);

function switchElems(b) {
  o('grlfsi').disabled=b;
  o('grlfiz').disabled=b;
  o('grlfii').disabled=b;
  o('grlfip').disabled=b;
  o('grlfbi').disabled=b;
}

function zeigenclick() {
var idx=o('grlfsi').options.selectedIndex;
  if (idx>-1) {
    switchElems(true);
    o('grlfsi').removeChild(o('grlfsi').options[idx]);
    switchElems(false);
  }
}

ael('grlfiz',zeigenclick);

function ipClick() { 
  var v=o('grlfii').value;
  if (v.length>0) {
    switchElems(true);
    get("http://"+urhost+"/"+v, /<frame name="mitte" src="\/.*\/search\/\?action=execute&searchType=userDetail&userId=(\d+)/,workxhr,v,null);
  }
}

ael('grlfip',ipClick);

if (window['GR_LF_onlyger']) {
  o('nurd').checked=true;
  for (var elem in elems)
    o(elems[elem]).disabled=true;
}

for (var i=0; i<=7; i++)
  o(elems[i]).checked=window['GR_LF_'+elems[i]];
 
var opt; 
for (var n=1; n<fIdArr.length; n++) {
  if ((fIdArr[n]!=defaultFilter)&&(fIdArr[n]!="undefined")) {
    opt=new Option(fIdArr[n],fIdArr[n],false,false);
    o('grlfsi').add(opt);
  }
}

function ageexpr(ma) {
 ma = 1*ma;
 if (ma==0) return('');
 var mae = ma % 10;
 var maz = (ma-mae)/10;
 var re = "";
 re += "(((ab|above)."+maz+"["+mae+"-9])|";
 re += "("+maz+"["+mae+"-9]-\\d\\d)|";
 if (maz<9) {
  re += "((ab|above).["+(maz+1)+"-9]\\d)|";
  re += "(["+(maz+1)+"-9]\\d-\\d\\d)|";
 }
 re += "((bis|below)."+maz+"[0-"+mae+"])|";
 re += "(\\d\\d-"+maz+"[0-"+mae+"])|";
 if (maz>1) {
  re += "((bis|below).[1-"+(maz-1)+"]\\d)|";
  re += "(\\d\\d-[1-"+(maz-1)+"]\\d)";
 }
 re += ".(Jahre|years))";
 return(re);
}

function submitExpForm() {
  if (this.name=="grlfei") {
    var tt = o('grlfea').value;
    if ((tt!='') && (isNaN(tt) || (1*tt<18) || (1*tt>99))) {
	  alert((lang=="DE")?"Altersfeld leer lassen\noder eine Zahl zwischen 18 und 99 eingeben.":"Keep age input field empty\nor enter a number between 18 and 99."); 
	  return(false);
    }
  }
  ooo('grlfex',0);
  if (this.name=="grlfei") {
    mstate=o('grlfem').checked;
	window['GR_LF_mstate']=mstate;
    GM_setValue( 'GR_LF_mstate', mstate);
    nstate=o('grlfen').checked;
	window['GR_LF_nstate']=nstate;
    GM_setValue( 'GR_LF_nstate', nstate);
	mistate=o('grlfemi').checked;
	window['GR_LF_mistate']=mistate;
    GM_setValue( 'GR_LF_mistate', mistate);
    nistate=o('grlfeni').checked;
	window['GR_LF_nistate']=nistate;
    GM_setValue('GR_LF_nistate', nistate);
	GM_setValue('GR_LF_must', o('grlfemt').value);
	GM_setValue('GR_LF_nogo', o('grlfent').value);
	myage=o('grlfea').value;
	window['GR_LF_myage']=myage;
	GM_setValue('GR_LF_myage', o('grlfea').value);
  }
  
  if (loc) document.location.href=loc; else location.reload();
}
ael('grlfei',submitExpForm);
ael('grlfer',submitExpForm);

function setOptForm() {
  ooo('grlfex',0);
  state=!o('grlonoff0').checked;
  window['GR_LF_state']=state;
  newstate=o('grlonoff1').checked + 2*o('grlonoff2').checked + 3*o('grlonoff3').checked + + 4*o('grlonoff4').checked;
  window['GR_LF_newstate']=newstate;
  GM_setValue('GR_LF_state', state);
  GM_setValue('GR_LF_newstate', newstate);
  if (loc) document.location.href=loc; else location.reload();
}
ael('grlfoi',setOptForm);

function dogets() { 
opt=o('grlfsi');
  switchElems(true);
for (var n=0; n<opt.length;n++) {
  get("http://"+urhost+"/"+sessionId+"search/?action=execute&searchType=userDetail&userId="+opt.options[n].value, /auswertung\/setcard\/index.php\?set=\d+&secure=.+">([^<]+)<\/a>/,workxhr,null,n);
}
}

for (var n=0; n<aCArr.length; n++) {
  switch (n) {
    case 0:
      opt=new Option((lang=="DE")?"- A F R I K A... :":"- A F R I C A... :","-Afrika",false,false);
      o('grlfls').add(opt);
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    case 53:
      opt=new Option((lang=="DE")?"- A S I E N... :":"- A S I A... :","-Asien",false,false);
      o('grlfls').add(opt);
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    case 86:
      opt=new Option((lang=="DE")?"AUSTRALIEN+OZEANIEN... :":"AUSTRALIA+OCEANIA... :","-Australien",false,false);
      o('grlfls').add(opt);
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    case 102:
      opt=new Option((lang=="DE")?"- E U R O P A... :":"- E U R O P E... :","-Europa",false,false);
      o('grlfls').add(opt);
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    case 147:
      opt=new Option((lang=="DE")?"MITTELAMERIKA... :":"MIDDLE AMERICA... :","-Mittelamerika",false,false);
      o('grlfls').add(opt);
	  opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    case 177:
      opt=new Option((lang=="DE")?"NAHER OSTEN... :":"MIDDLE EAST... :","-NaherOsten",false,false);
      o('grlfls').add(opt);
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    case 190:
      opt=new Option((lang=="DE")?"NORDAMERIKA :":"NORTH AMERICA... :","-Nordamerika",false,false);
      o('grlfls').add(opt);
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    case 193:
      opt=new Option((lang=="DE")?"SÜDAMERIKA... :":"SOUTH AMERICA... :","-Suedamerika",false,false);
      o('grlfls').add(opt);
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
    default:
      opt=new Option(" .. "+ULand[aCArr[n]], aCArr[n], false, fCAss[aCArr[n]]==1);
      break;
  }
  o('grlfls').add(opt);
}

fIdAss[""]=0;

var allCells=oo('td');


if (onoff==false) {
  allCells[0].innerHTML+= (lang=="DE") ? " &mdash; <i>(Filter aus)</i>" : " &mdash; <i>(No filtering)</i>";
} else {
if (lang=="DE")
  allCells[0].innerHTML+=(state) ? ((newstate==4) ? " &mdash; <i>(ausgegraut)</i>" : " &mdash; <i>(gefiltert)</i>") : " &mdash; (ungefiltert)";
else
  allCells[0].innerHTML+=(state) ? ((newstate==4) ? " &mdash; <i>(grayed out)</i>" : " &mdash; <i>(filtered)</i>") : " &mdash; (unfiltered)";
}

function pslnk(l,t) {
  return "<a id='"+l+"' style='color:#dd0;cursor:pointer;' onmouseover='this.style.color=\"#fff\"' onmouseout='this.style.color=\"#dd0\"'"+t+">";
}  
 
myRow=document.createElement("TR");
myCell=document.createElement("TD"); myCell.setAttribute("colspan","2");
myRow.appendChild(myCell);

onoffstrde = (onoff==true)?"<u>AN</u>&gt;AUS</a>":"AN&lt;<u>AUS</u></a>";
onoffstren = (onoff==true)?"<u>ON</u>&gt;OFF</a>":"ON&lt;<u>OFF</u></a>";

// version +": "+pslnk('grloox','')+onoffstrde+" | "
// Ausdrücke</a> &ndash; Zurücksetzen:

myCell.innerHTML=(lang=="DE")?
"<div align='right' style='width:100%; font-weight:normal; margin-top:-2px; margin-bottom:-14px;'>Listen-Filter "+ version +" &ndash; "+pslnk('grlool','')+"Optionen</a> | "+pslnk('grlfep','')+"Export</a> | "+pslnk('grlfrp','')+"Import</a> &ndash; &copy; <a href=\"/auswertung/setcard/?set=3420497\" onClick=\"return openUrl(this.href);\">burke67</a><br />Ändern: "+pslnk('grlfil','')+"IDs</a> | "+pslnk('grlfll','')+"Länder</a> | "+pslnk('grlfxl',' title=\''+nmTooltip()+'\'')+"Ausdrücke</a>: "+pslnk('grloox','')+onoffstrde+" &ndash; Zurücksetzen: "+pslnk('grlcal','')+"IDs+Länder</a> | "+pslnk('grlcai','')+(fIdArr.length-1)+" IDs</a> | "+pslnk('grlcac','')+(fCArr.length-1)+" Länder</a></div>":
"<div align='right' style='width:100%; font-weight:normal; margin-top:-2px; margin-bottom:-14px;'>Listing Filter "+ version +" | "+pslnk('grlool','')+"Settings</a> | "+pslnk('grlfep','')+"Export</a> | "+pslnk('grlfrp','')+"Import</a> &ndash; &copy;<a href=\"/auswertung/setcard/?set=3420497\" onClick=\"return openUrl(this.href);\">burke67</a><br />Change: "+pslnk('grlfil','')+"IDs</a> | "+pslnk('grlfll','')+"Countries</a> | "+pslnk('grlfxl',' title=\''+nmTooltip()+'\'')+"Expressions</a>: "+pslnk('grloox','')+onoffstrde+" &ndash; Reset: "+pslnk('grlcal','')+"IDs+Countries</a> | "+pslnk('grlcai','')+(fIdArr.length-1)+" IDs</a> | "+pslnk('grlcac','')+(fCArr.length-1)+" Countries</a></div>";

oo("table")[0].appendChild(myRow);
ael('grlcal',resetAll);
ael('grlcai',resetIds);
ael('grlcac',resetCountries);

var dW;
function Don() {
  dW=window.open("http://burke67.yolasite.com/listenfilter.php", "", "width=300,height=400,left=50,top=50");
  dW.focus();
  return true;
}

function optionClick() {
  ooo('grlgray',1);
  ooo('grlopx',1);
  o('grlonoff'+window['GR_LF_newstate']).checked=true;
  return true;
}

function countryClick() {
  ooo('grlgray',1);
  ooo('grlfld',1);
  return true;
}
function idClick() {
  dogets();
  ooo('grlgray',1);
  ooo('grlfli',1);
  return true;
}

function expClick() {
  o('grlfemi').checked=window['GR_LF_mistate'];
  o('grlfeni').checked=window['GR_LF_nistate'];
  o('grlfem').checked=window['GR_LF_mstate'];
  o('grlfen').checked=window['GR_LF_nstate'];
  o('grlfemt').value=window['GR_LF_must'];
  o('grlfent').value=window['GR_LF_nogo'];
  o('grlfea').value=window['GR_LF_myage'];
  ooo('grlgray',1);
  ooo('grlfex',1);
  return true;
}

ael('grlool',optionClick);
ael('grlfll',countryClick);
ael('grlfil',idClick);
ael('grlfxl',expClick);

function toggleOnOff() {
   ooo('grlgray',1);
  if (onoff==false) {
    onoff=true;
  }
  else {
    onoff=false;
  }
  GM_setValue("GR_LF_ONOFF", onoff);
  if (loc) document.location.href=loc; else location.reload(); 
}

ael('grloox',toggleOnOff);

var tarr=new Array('mstate','nstate','mistate','nistate','state','onlyger','must','nogo','countries','ids','newstate');
function eptClick() {
  var settings='';
  for (var i=0; i<=7; i++) settings=settings + "window['GR_LF_" + elems[i] + "']=" + window['GR_LF_'+elems[i]] + "; ";
  for (var i in tarr) settings=settings + "window['GR_LF_" + tarr[i] + "']=" + ((i>5)?"decodeURIComponent('"+encodeURIComponent(window['GR_LF_'+tarr[i]])+"')":window['GR_LF_'+tarr[i]]) + "; ";
  o('grlfear').value=settings;
  ooo('grlgray',1);
  ooo('grlfepd',1);
  return true;
}
function eptClose() {
  ooo('grlgray',0);
  ooo('grlfepd',0);
  return true;
}
function iptClick() {
  o('grlfiar').value="";
  ooo('grlgray',1);
  ooo('grlfipd',1);
  return true;
}
function iptClose() {
  ooo('grlfipd',0);
  var settings=o('grlfiar').value;
  var testvar=0;
  var e;
  try {
    eval( settings );
  } catch (e) {
    alert(((lang=="DE")?"Fehler beim Import:\n":"Import Error:\n")+e);
	testvar=1;
  }
  
  if (testvar==0) {
	for (var i=0; i<=7; i++) GM_setValue("GR_LF_"+elems[i], window["GR_LF_"+elems[i]]);
	for (var i in tarr) GM_setValue("GR_LF_"+tarr[i], window["GR_LF_"+tarr[i]]);
    alert((lang=="DE")?'Import war erfolgreich.':'Settings import successful.');
	location.reload();
  }
  return true;
}
function iptCancel() {
  ooo('grlgray',0);
  ooo('grlfipd',0);
  return true;
}

function optCancel() {
  ooo('grlgray',0);
  ooo('grlopx',0);
  return true;
}

ael('grlfep',eptClick);
ael('grlfepo',eptClose);
ael('grlfrp',iptClick);
ael('grlfipo',iptClose);
ael('grlfipc',iptCancel);

ael('grlfor',optCancel);

function grayCell(c) {
  if (c.style) c.style.opacity='0.8';
}

function hideRow(r,hf) {
  if (r.style)
    if (hf) r.style.display='none'; else r.style.opacity='0.4';
}
function hideRow2(r,tf) {
  if (newstate==3) hideRow(r,!tfound);
  if (newstate==1) hideRow(r,true);
  if (newstate==4) hideRow(r,false);
  if ((newstate==2)&&(!tfound)) hideRow(r,true);
}

var mu1=" style='text-decoration:none; color:#119; vertical-align:top;'><span style='border:1px solid #119; padding:1px ";
var mu1a=" style='text-decoration:none; color:#119; vertical-align:top; float:right;'><span style='border:1px solid #119; padding:1px ";
var mu2="px 2px; font-size:5pt; background-color:#99e; -moz-border-radius:2px;'>";
var mu3="</span></a>";

var musttest=false;
var nogotest=false;
var tfound=false;
var agetest = false;
var mexp=new RegExp(window['GR_LF_must'],(mistate)?"gi":"g");
var nexp=new RegExp(window['GR_LF_nogo'],(nistate)?"gi":"g");
var aexp=new RegExp(ageexpr(window['GR_LF_myage']),"g");
var astate = (window['GR_LF_myage']!='');

var nobrexp=new RegExp("<br[ ]{0,1}[/]{0,1}><br[ ]{0,1}[/]{0,1}>","gi");

//if (onoff==true) {

var maxRowh = 35-34; //35
var maxPich = 95; //95

var allRows=oo('tr');
for (var i=0; i<allRows.length; i++) {
  thisRow=allRows[i];
  pic=thisRow.innerHTML.search(/repeat-x; height:([0-9]+)px !important;/);
  if (pic>-1) {
    pich=RegExp.$1;
	if (pich>maxRowh) {
	  thisRow.innerHTML=thisRow.innerHTML.replace(/height:[0-9]+/,'height:'+maxRowh);
	}
  }
}

startRow=allCells[0].parentNode;
var hideFlag=false;

for (var i=4; i<allCells.length; i++) {
  thisCell=allCells[i];
  
  /* // wg. quadr. Profilbilder auskommentiert
  pic=thisCell.innerHTML.search(/height="([0-9]+)" width="55"/);
  if (pic>-1) {
    pich=RegExp.$1; 
	if (pich>maxPich) {
  	  neww=Math.ceil((maxPich*55)/pich); 
	  thisCell.innerHTML=thisCell.innerHTML.replace(/height="([0-9]+)" width="55"/,'height="'+maxPich+'" width="'+neww+'"');
	}
  } 
  */
  /* // noch keine Verwendung 
  dist=thisCell.innerHTML.search(/([1-9]+[0-9]*,?[0-9]*)&nbsp;(m|km|ft|mi) ?\/?/);
  if (dist>0) {
  
    entf = RegExp.$1.replace(/,/,".")*1.0;
    if (RegExp.$2=="mi") { entf = entf*1.609344; }
	if (RegExp.$2=="ft") { entf = entf*0.3048/1000; }
	if (RegExp.$2=="m") { entf = entf/1000; }
    
	bgc="005";
    if (entf<100) bgc="227";
	if (entf<50) bgc="449";
	if (entf<25) bgc="66B";
	if (entf<10) bgc="88C";
	if (entf<5) bgc="99D";
	if (entf<2.5) bgc="AAE";
	if (entf<1) bgc="BBF";
    // thisCell.style.backgroundColor = "#"+bgc;
    if (entf>0) { thisCell.innerHTML = thisCell.innerHTML.replace(/distance">/,'distance" style="color:#'+bgc+';">'); }
  
  } */

  if (thisCell.innerHTML.search(/[\?]&nbsp;..<\/a>/)>-1) thisCell.innerHTML='';
  
  thisCell.innerHTML=thisCell.innerHTML.replace(/Letzter Login:/,"letztes Login:");
  
  thisCell.innerHTML=thisCell.innerHTML.replace(/width:65px; height:51px; margin-right:2px; margin-top:5px/,"width:54px; height:43px; margin-top:-20px;"); //taps

  thisCell.innerHTML=thisCell.innerHTML.replace(/position:relative;/,""); //nopic.gif
  
  thisCell.innerHTML=thisCell.innerHTML.replace(
    /&nbsp;&nbsp;&nbsp;[^&]+&nbsp;([0-2][0-9]\.[01][0-9]\.)-([0-2][0-9]:[0-5][0-9])/,
	"&nbsp;$1 $2");
	
  thisCell.innerHTML=thisCell.innerHTML.replace(/lbs.&nbsp;/,"lbs&nbsp;");	

  inside=thisCell.innerHTML.replace(/&nbsp;/g," ");  
  result=inside.search(/set=(\d+).+[^>]<\/a>/);
  if (result>-1) number=RegExp.$1; else number="";
 
  tfound=tfound||((inside.search(/\/v5\/img\/footprints\/[0-9]+.gif/)>-1)); 
   
  countryfound=(aCAss[ CTrans[inside] ]==1);
  
  if (onoff==true) {
    if (mstate) musttest=(musttest||mexp.test(inside));
    if (nstate) nogotest=(nogotest||nexp.test(inside));
    if (astate) agetest=(agetest||aexp.test(inside));
  }
  
  lastcell=nobrexp.test(inside);
	
  cond3=lastcell&&((mstate&&!musttest)||(nstate&&nogotest)||(astate&&agetest)); 
   
  idfound=(result>-1);
  if (i<allCells.length-1) nextCell=allCells[i+1];
  
  cond1=((fCAss[ CTrans[inside] ]==1)||(fIdAss[''+number]==1));
  cond2=( (window['GR_LF_onlyger'])&&countryfound&&(inside!="Deutschland") );
  
  thisRow=thisCell.parentNode;  
  if (thisRow.style) if (thisRow.style.height) if (thisRow.style.height=="3px") startRow=thisRow;
 
  hideFlag=hideFlag||(cond1||cond2||cond3);
  
  if (ppage) {
    if ((fIdAss[''+number]==1)&&(newstate>0)) grayCell(thisCell);
  } else
  
   if (lastcell) {
    if (state&&hideFlag) {
     r=startRow;
     hideRow2(r,tfound);
     do {
      nextRow=r.nextSibling;
      if (nextRow) {
       hideRow2(nextRow,tfound);
       if (nobrexp.test(nextRow.innerHTML)) break;
      }
      r=nextRow;
     } while (r);
    }
    musttest=false;
    nogotest=false;
	agetest=false;
    hideFlag=false;
    tfound=false;
    thisCell.innerHTML=inside.replace(/<br[ ]{0,1}[/]{0,1}><br[ ]{0,1}[/]{0,1}>/,"");
   }
 
  if (countryfound) {
    link=document.createElement("span");
   if (fCAss[ inside ]==1) { 
    //thisCell.innerHTML="("+thisCell.innerHTML+ ") "; // jetzt CSS-Style
	thisCell.style.textDecoration='line-through';
	atemp=(lang=="DE")?"Land wieder zeigen":"show this country again";
    link.innerHTML="<a href='"+loc+"&dc="+encodeURIComponent(inside)+"' title='"+atemp+"'"+mu1+"3"+mu2+"+"+mu3;
   } else {
    thisCell.innerHTML+=" ";
	atemp=(lang=="DE")?"Land verstecken":"hide this country";
    link.innerHTML="<a href='"+loc+"&ac="+encodeURIComponent(inside)+"' title='"+atemp+"'"+mu1+"4"+mu2+"&ndash;"+mu3;
   }
    thisCell.appendChild(link);
  }
 
 
  if (idfound) {
   if (ppage) {
     if (fIdAss[''+number]==1) {
	   thisCell.innerHTML=thisCell.innerHTML.replace(/">(.+)<\/a><br/,"\">($1)</a><br");
	   pm="+"; act="di"; w="3"; atemp=(lang=="DE")?"User wieder zeigen":"show this user again";
	 } else { pm="&ndash;"; act="ai"; w="4"; atemp=(lang=="DE")?"User verstecken":"hide this user"; }
	 
	 thisCell.innerHTML="<a href='"+loc+"&"+act+"="+encodeURIComponent(number)+"' title='"+atemp+"'"+mu1a+w+mu2+pm+mu3 + thisCell.innerHTML;
   } else {
   
   link=document.createElement("span");
   if (fIdAss[''+number]==1) { 
    //thisCell.innerHTML="("+thisCell.innerHTML+ ") "; // jetzt CSS-Style
	thisCell.style.textDecoration='line-through';
	atemp=(lang=="DE")?"User wieder zeigen":"show this user again";
    link.innerHTML=" <a href='"+loc+"&di="+encodeURIComponent(number)+"' title='"+atemp+"'"+mu1+"3"+mu2+"+"+mu3;
   } else {
    //thisCell.innerHTML="<b>"+thisCell.innerHTML+"</b> "; // wg. GR-Tools auskommentiert
	atemp=(lang=="DE")?"User verstecken":"hide this user";
    link.innerHTML=" <a href='"+loc+"&ai="+encodeURIComponent(number)+"' title='"+atemp+"'"+mu1+"4"+mu2+"&ndash;"+mu3;
   }
   nextCell.appendChild(link);
   atemp=(lang=="DE")?"Anonym: Message-Verlauf + User speichern":"anonymously: email history + save profile";
   nextCell.innerHTML+="<a href='../msg/history.php?uid="+number+"' title='"+atemp+"' onClick='return openUrl(this.href);'"+mu1+"4"+mu2+"o"+mu3;
  }
  
  }
}

//} // if(onoff==false)
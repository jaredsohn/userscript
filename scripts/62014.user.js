// ==UserScript==
// @name           Super Highscore suche(version5)nach alles hamburg berlin 4.0 pennergame
// @namespace      mit diesen script koennt ihr nach alles suchen nach was man ueberhaupt sucen kann also geld tiere plunder regdatum und vieles mehr also alles wie bande ja nein online offline ja nein und alles was es noch gibt  
// @author         Basti1012
// @include        *www.pennergame.de/highscore/*
// @include        *berlin.pennergame.de/highscore/*
// ==/UserScript==


// <<<<<<<<<<<<<<<<<<<<<<  Update abfrage ob neue Version da ist >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://userscripts.org/scripts/show/62014",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var highscorsuche = acontent.split('suche(version')[1];			
			var highscorsuche1 = highscorsuche.split(')nach')[0];	
if(highscorsuche1 ==6){
}else{
alert("Es ist eine neue Version von Bastis Highscore alles suche vorhanden vorhanden,\nVersion "+highscorsuche1+" \nbitte mache ein Update,ansonsten kommt dieser Hinweiss immer wieder.Nachdem du Ok geklickt hast kommt ein Update Fenster wo du enscheiden kannst ob du das neue Script installieren willst .Nach dem Update bitte dieses Script deinstallieren sonst kann es zu Scripte kompflikte kommen .\n\nMfg Basti1012");
window.location.href = 'http://userscripts.org/scripts/source/62014.user.js';
}
}});






var url = document.location.href;
if (url.indexOf("http://www")>=0) {
var link = "http://www.pennergame.de"
var mannweib = 'http://media.pennergame.de/img/profilseite/';
var siglink = 'http://inodes.pennergame.de/de_DE/signaturen/';
var stadtmenge = '103';
var welchetowndropdown ='/*<option value="5">zockhamburg</option>*/'
+'<option value="2233">Upfighterhamburg</option>'
+'<option value="4455">Downfighterhamburg</option>'

}
if (url.indexOf("http://berlin")>=0) {
var stadtmenge = '94';
var link = "http://berlin.pennergame.de"
var mannweib = 'http://mediaberlin.pennergame.de/img/profilseite/';
var siglink = 'http://inodes.pennergame.de/bl_DE/signaturen/';
var welchetowndropdown ='/*<option value="6">zockberlin</option>*/'
+'<option value="1122">Upfighterberlin</option>'
+'<option value="3344">Downfighterberlin</option>'

}

























// eigener att und def wert abfraen fuer downfight.de 


GM_xmlhttpRequest({
  method: 'GET',
  url: ''+link+'/overview/',
      onload: function( response ) {
      	var content = response.responseText;
      	var att = content.split('<span class="att">')[1].split('</span>')[0];
     	var def = content.split('<span class="def">')[1].split('</span>')[0];

	GM_setValue("att" , att);
	GM_setValue("def" , def);

}});
















var table = document.getElementById("my-profile");
var meineid = table.innerHTML.split('id:')[1].split('/')[0];

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/dev/api/user.'+meineid+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			var meinebandeid = dom.getElementsByTagName('id')[1].textContent;
			var regm = reg.split('.')[1];
			var regmm = regm.split('.')[0];
			var regj = reg.split('.')[2];
			var tage = reg.split('.')[0];
			var meinregdatum = regj+regmm+tage;
  			var pts = parseInt(dom.getElementsByTagName('points')[0].textContent);
			var attmin = parseInt(pts - pts * 0.2);
			var attmax = parseInt(pts + pts * 0.5);



	  GM_setValue("reg" , reg);
	  GM_setValue("attmin" , attmin);
	  GM_setValue("attmax" , attmax);
	  GM_setValue("pts" , pts);
	  GM_setValue("meinregdatum" , meinregdatum);
	  GM_setValue("meinebandeid" , meinebandeid);
GM_setValue("geld" , 1);
GM_setValue("menge" , 1);
	}
});





var table = document.getElementById('nav-2');
var table1 = table.getElementsByTagName('li')[3];
table1.innerHTML = '<li><a name="PennergameSpam1" id="PennergameSpam1" alt="PennergameSpam1" title="Pennergame Spam" <span class="btn-right"><span class="btn-left"><font style=\"color:orange; font-size:110%;\"><b>Bastis Gegner suche</b></font></span></span></a></li>';
document.getElementById('PennergameSpam1').addEventListener('click', function linktklickerone() {

	// hamburg  
	if (url.indexOf("http://www")>=0) {
	var stadtsuche = '<select id="search_stadtteil" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
	+'<option value="-">-----------------------------------</option>'
	+'<option value="72">Allerm&ouml;he</option><option value="41">Alsterdorf</option><option value="73">Altengamme</option><option value="85">Altenwerder</option>'
	+'<option value="12">Altona Altstadt</option><option value="13">Altona Nord</option><option value="19">Altstadt</option>'
	+'<option value="8">Bahrenfeld</option><option value="42">Barmbek-Nord</option><option value="43">Barmbek-S&uuml;d</option>'
	+'<option value="74">Bergedorf</option><option value="54">Bergstedt</option><option value="20">Billbrook</option>'
	+'<option value="103">Billstedt</option><option value="75">Billwerder</option><option value="3">Blankenese</option>'
	+'<option value="21">Borgfelde</option><option value="55">Bramfeld</option><option value="86">Cranz</option>'
	+'<option value="76">Curslack</option><option value="44">Dulsberg</option><option value="56">Duvenstedt</option>'
	+'<option value="30">Eidelstedt</option><option value="57">Eilbek</option><option value="33">Eimsb&ouml;ttel</option>'
	+'<option value="87">Eissendorf</option><option value="45">Eppendorf</option><option value="58">Farmsen-Berne</option>'
	+'<option value="14">Finkenwerder</option><option value="88">Francop</option><option value="46">Fuhlsb&uuml;ttel</option>'
	+'<option value="47">Gross Borstel</option><option value="9">Gross Flottbek</option><option value="89">Gut Moor</option>'
	+'<option value="28">HafenCity</option><option value="23">Hamm-Mitte</option><option value="24">Hamm-Nord</option>'
	+'<option value="25">Hamm-S&uuml;d</option><option value="22">Hammerbrook</option><option value="90">Harburg</option>'
	+'<option value="34">Harvestehude</option><option value="91">Hausbruch</option><option value="92">Heimfeld</option>'
	+'<option value="48">Hoheluft-Ost</option><option value="35">Hoheluft-West</option><option value="49">Hohenfelde</option>'
	+'<option value="26">Horn</option><option value="59">Hummelsbuettel</option><option value="4">Iserbrook</option><option value="60">Jenfeld</option><option value="77">Kirchwerder</option>'
	+'<option value="27">Kleiner Grasbrook</option><option value="93">Langenbek</option><option value="50">Langenhorn</option><option value="61">Lemsahl-Mellingstedt</option>'
	+'<option value="78">Lohbr&ouml;gge</option><option value="36">Lokstedt</option><option value="7">Lurup</option><option value="62">Marienthal</option>'
	+'<option value="94">Marmstorf</option><option value="95">Moorburg</option><option value="79">Moorfleet</option><option value="96">Neuenfelde</option>'
	+'<option value="80">Neuengamme</option><option value="98">Neugraben-Fischbek</option><option value="97">Neuland</option><option value="18">Neustadt</option>'
	+'<option value="37">Niendorf</option><option value="5">Nienstedten</option><option value="81">Ochsenwerder</option>'
	+'<option value="51">Ohlsdorf</option><option value="6">Osdorf</option><option value="10">Othmarschen</option>'
	+'<option value="11">Ottensen</option><option value="63">Poppenbuettel</option><option value="64">Rahlstedt</option>'
	+'<option value="82">Reitbrook</option><option value="1">Rissen</option><option value="99">R&ouml;nneburg</option><option value="29">Rothenburgsort</option>'
	+'<option value="38">Rotherbaum</option><option value="65">Sasel</option><option value="39">Schnelsen</option><option value="100">Sinstorf</option>'
	+'<option value="83">Spadenland</option><option value="31">St. Georg</option><option value="17">St.Pauli</option><option value="66">Steilshoop</option>'
	+'<option value="16">Steinwerder</option><option value="40">Stellingen</option><option value="2">S&uuml;lldorf</option><option value="84">Tatenberg</option>'
	+'<option value="67">Tonndorf</option><option value="52">Uhlenhorst</option><option value="32">Veddel</option><option value="68">Volksdorf</option>'
	+'<option value="15">Waltershof</option><option value="69">Wandsbek</option><option value="70">Wellingsb?ttel</option>'
	+'<option value="101">Wilhelmsburg</option><option value="102">Wilstorf</option><option value="53">Winterhude</option><option value="71">Wohldorf-Ohlstedt</option></select>'
	}

// berlin
if (url.indexOf("http://berlin")>=0) {
var stadtsuche = '<select id="search_stadtteil" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option value="-">-----------------------------------</option>'
+'<option value="54">Adlershof</option><option value="72">Alt-Hohensch&ouml;nhausen</option><option value="48">Alt-Treptow</option>'
+'<option value="53">Altglienicke</option><option value="50">Baumschulenweg</option><option value="63">Biesdorf</option>'
+'<option value="5">Blankenburg</option><option value="9">Blankenfelde</option><option value="55">Bohnsdorf</option>'
+'<option value="44">Britz</option><option value="10">Buch</option><option value="45">Buckow</option>'
+'<option value="14">Charlottenburg</option><option value="19">Charlottenburg-Nord</option><option value="34">Dahlem</option>'
+'<option value="90">Falkenberg</option><option value="28">Falkenhagener Feld</option><option value="73">Fennpfuhl</option>'
+'<option value="11">Franz&ouml;sisch Buchholz</option><option value="38">Friedenau</option><option value="67">Friedrichsfelde</option>'
+'<option value="58">Friedrichshagen</option><option value="1">Friedrichshain</option><option value="78">Frohnau</option>'
+'<option value="25">Gatow</option><option value="89">Gesundbrunnen</option><option value="47">Gropiusstadt</option>'
+'<option value="60">Gr&uuml;nau</option><option value="17">Grunewald</option><option value="27">Hakenfelde</option>'
+'<option value="20">Halensee</option><option value="86">Hansaviertel</option><option value="22">Haselhorst</option>'
+'<option value="77">Heiligensee</option><option value="6">Heinersdorf</option><option value="66">Hellersdorf</option>'
+'<option value="79">Hermsdorf</option><option value="51">Johannisthal</option><option value="68">Karlshorst</option>'
+'<option value="7">Karow</option><option value="64">Kaulsdorf</option><option value="26">Kladow</option>'
+'<option value="94">Konradsh&ouml;he</option><option value="57">K&ouml;penick</option><option value="2">Kreuzberg</option>'
+'<option value="32">Lankwitz</option><option value="69">Lichtenberg</option><option value="42">Lichtenrade</option>'
+'<option value="31">Lichterfelde</option><option value="81">L&uuml;bars</option><option value="65">Mahlsdorf</option>'
+'<option value="92">Malchow</option><option value="40">Mariendorf</option><option value="41">Marienfelde</option>'
+'<option value="83">M&auml;rkisches Viertel</option><option value="62">Marzahn</option><option value="84">Mitte</option>'
+'<option value="85">Moabit</option><option value="61">Müggelheim</option><option value="71">Neu-Hohenschönhausen</option>'
+'<option value="43">Neuk&ouml;lln</option><option value="52">Niedersch&ouml;neweide</option><option value="12">Niedersch&ouml;nhausen</option>'
+'<option value="35">Nikolassee</option><option value="56">Obersch&ouml;neweide</option><option value="8">Pankow</option>'
+'<option value="49">Pl&auml;nterwald</option><option value="3">Prenzlauer Berg</option><option value="59">Rahnsdorf</option>'
+'<option value="75">Reinickendorf</option><option value="13">Rosenthal</option><option value="46">Rudow</option>'
+'<option value="74">Rummelsberg</option><option value="16">Schmargendorf</option><option value="93">Schm&ouml;ckwitz</option>'
+'<option value="37">Sch&ouml;neberg</option><option value="23">Siemensstadt</option><option value="21">Spandau</option>'
+'<option value="24">Staaken</option><option value="30">Steglitz</option><option value="76">Tegel</option>'
+'<option value="39">Tempelhof</option><option value="87">Tiergarten</option><option value="80">Waidmannslust</option>'
+'<option value="36">Wannsee</option><option value="91">Wartenberg</option><option value="88">Wedding</option>'
+'<option value="4">Weißensee</option><option value="18">Westend</option><option value="29">Wilhelmstadt</option>'
+'<option value="15">Wilmersdorf</option><option value="82">Wittenau</option><option value="33">Zehlendorf</option>'
+'</select>';
}


var Divanzeigen = ''
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner nach Punkte suchen : 				</font>			In der auswahl auf Punktesuchen gehen dann Punkte Eingeben oder Korigieren dann suche Klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner nach Geld suchen :  				</font>			in der auswahl auf Geld gehen dann darunter den minimum Geldbetrag eingeben.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die gel&ouml;scht wurden : 			</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die Online sind : 			</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die offline sind : 				</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner suchen die in einer Bande sind:			</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner suchen die keiner Bande haben:			</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die Tiere aktiviert haben:			</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Suche nach bestimmten tiere: 				</font>			In der Auswahl aussuchen dann weiter unten das Tier ausw&auml;hlen was du suchen willst dann suchen klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner suchen vor deinen Anmeldedatum.			</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner nach deinen Anmeldedatum suchen.			</font>			In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner mit deinen gleichen  Anmeldedatum suchen.				</font>		In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">M&auml;nliche Gegner suchen :					</font>		In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Weibliche Gegner suchen :					</font>		In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner suchen die Plunder aktiviert haben:			</font>		In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner suchen die Spiele Plunder aktiviert haben :		</font>		In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner suchen die Premium Profile haben:				</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner in bestimmten Stadtteilen suchen:				</font>	In der Auswahl aussuchen dann unten den Stadtteil aussuchen wo du Gegner suchen willst.'
+'<br><font style=\"color:yellow; font-size:100%;\">Penner anzeigen die in deinen verb&uuml;ndeten Banden sind :		</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Penner anzeigen mit den deine Bande in Krieg ist.			</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner suchen die in einen Bestimmten regestrierungs Bereich liegen:	</font>	In der Auswahl aussuchen ,dann in den minimum uns maximum bereich ausf&uuml;llen und dann suchen .'
+'<br><font style=\"color:yellow; font-size:100%;\">Deine Freundesliste anzeigen :	</font>	In der Auswahl ausuchen und dann auf suchen klicken  .'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die Rosa Schleifeangelegt haben :		</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die Blaue Schleife angelegt haben:		</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die Admine einer bande sind	:		</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die Co-Admine einer Bande sind:		</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Gegner die Mitglieder einer Bande sind:		</font>	In der Auswahl aussuchen dann auf suche klicken.'
+'<br><font style=\"color:yellow; font-size:100%;\">Vorherschende Banden(zeigt die orherschende Banden an ):	</font>	In der Auswahl ausuchen und dann auf suchen klicken  .'

+'<br><font style=\"color:orange; font-size:100%;\">www.Downfight .de Gegner suche. <br>Hier werden gegner bei <a href="http://www.downfight.de">Gegner werden von dieser Seite aus gesucht</a> gesucht .<br>Zb Gegner die sich runter oder Hochfighten lassen wollen ,<br>so Gewinnt man oder verliert man fast immer wie man es gerade m&ouml;chte</font>	<br>In der Auswahl ausuchen und dann auf suchen klicken  .'



+'<div align="left" name="sbalki" id="sbalki"></div>'// status balken
	+'<div align="left" name="gefunden" id="gefunden"></div>'// gefundene gegner anzeige
	+'<div align="left" name="wasgeht" id="wasgeht"></div>';// was wird gesucht anzeige
	//+'<div align="left" name="sbalki" id="sbalki"></div>'


var Mindatum = 'Gegner nach Min Reg-Datum suche:<select id="jahr1" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="2007">2007</option>'
+'<option value="2008">2008</option>'
+'<option value="2009">2009</option>'
+'<option value="2010">2010</option>'
+'<option value="2011">2011</option>'
+'</select>'

+'<select id="monat1" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="01">Januar</option>'
+'<option value="02">Februar</option>'
+'<option value="03">M&auml;rz</option>'
+'<option value="04">April</option>'
+'<option value="05">Mai</option>'
+'<option value="06">Juni</option>'
+'<option value="07">Juli</option>'
+'<option value="08">August</option>'
+'<option value="09">September</option>'
+'<option value="10">Oktober</option>'
+'<option value="11">November</option>'
+'<option value="12">Dezember</option>'
+'</select>'

+'<select id="tag1" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="01">1</option>'
+'<option value="02">2</option>'
+'<option value="03">3</option>'
+'<option value="04">4</option>'
+'<option value="05">5</option>'
+'<option value="06">6</option>'
+'<option value="07">7</option>'
+'<option value="08">8</option>'
+'<option value="09">9</option>'
+'<option value="10">10</option>'
+'<option value="11">11</option>'
+'<option value="12">12</option>'
+'<option value="13">13</option>'
+'<option value="14">14</option>'
+'<option value="15">15</option>'
+'<option value="16">16</option>'
+'<option value="17">17</option>'
+'<option value="18">18</option>'
+'<option value="19">19</option>'
+'<option value="20">20</option>'
+'<option value="21">21</option>'
+'<option value="22">22</option>'
+'<option value="23">23</option>'
+'<option value="24">24</option>'
+'<option value="25">25</option>'
+'<option value="26">26</option>'
+'<option value="27">27</option>'
+'<option value="28">28</option>'
+'<option value="29">29</option>'
+'<option value="30">30</option>'
+'<option value="31">31</option>'
+'</select><br>';

var Maxdatum = 'bis Max Reg-Datum suche:<select id="jahr2" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="2007">2007</option>'
+'<option value="2008">2008</option>'
+'<option value="2009">2009</option>'
+'<option value="2010">2010</option>'
+'<option value="2011">2011</option>'
+'</select>'

+'<select id="monat2" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="01">Januar</option>'
+'<option value="02">Februar</option>'
+'<option value="03">M&auml;rz</option>'
+'<option value="04">April</option>'
+'<option value="05">Mai</option>'
+'<option value="06">Juni</option>'
+'<option value="07">Juli</option>'
+'<option value="08">August</option>'
+'<option value="09">September</option>'
+'<option value="10">Oktober</option>'
+'<option value="11">November</option>'
+'<option value="12">Dezember</option>'
+'</select>'

+'<select id="tag2" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option selected="selected" value="01">1</option>'
+'<option value="02">2</option>'
+'<option value="03">3</option>'
+'<option value="04">4</option>'
+'<option value="05">5</option>'
+'<option value="06">6</option>'
+'<option value="07">7</option>'
+'<option value="08">8</option>'
+'<option value="09">9</option>'
+'<option value="10">10</option>'
+'<option value="11">11</option>'
+'<option value="12">12</option>'
+'<option value="13">13</option>'
+'<option value="14">14</option>'
+'<option value="15">15</option>'
+'<option value="16">16</option>'
+'<option value="17">17</option>'
+'<option value="18">18</option>'
+'<option value="19">19</option>'
+'<option value="20">20</option>'
+'<option value="21">21</option>'
+'<option value="22">22</option>'
+'<option value="23">23</option>'
+'<option value="24">24</option>'
+'<option value="25">25</option>'
+'<option value="26">26</option>'
+'<option value="27">27</option>'
+'<option value="28">28</option>'
+'<option value="29">29</option>'
+'<option value="30">30</option>'
+'<option value="31">31</option>'
+'</select><br>';

var extra_functionen = '<select id="wasuche" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
+'<option value="1212">Gegner suchen die von '+GM_getValue("attmin")+' bis '+GM_getValue("attmax")+' (Punkte haben also reine Punktesuche in deinen Punktebereich ) </option>'
+'<option value="3">Nur gegner suchen die Geld aktiviert haben (Geld angabe weiter unten ) </option>'
+'<option value="12">Suche nach Spieler ,die in deinen Bereich gel&ouml;scht wurden </option>'
+'<option value="5">Gegner die in deinen Punktebereich  Online sind</option>'
+'<option value="6">Gegner die in deinen Punktebereich Offline sind</option>'
+'<option value="7">Gegner suchen ,die in deinen Punktebereich  in einer Bande sind </option>'
+'<option value="8">Gegner suchen ,die in deinen Punktebereich noch in keiner Bande sind</option>'
+'<option value="4">Gegner suchen ,die in deinen Punktebereich , Tiere aktiviert haben</option>'
+'<option value="11">Gegner suchen die in deinen Punktebereich ,Fake Tiere haben </option>'
+'<option value="1221">Gegner suchen die ein Tier haben was du ausgew&auml;hlt hast ( weiter unten einstelbereich ) </option>'
+'<option value="1">Gegner suchen ,die vor deinen Anmeldedatum ,angemeldet wurden und in deinen Punktebereich liegen</option>'
+'<option value="2">Gegner suchen ,die nach deinen Anmeldedatum ,angemldet wurden und in deinen Punktebereich liegen</option>'
+'<option value="15">Gegner suchen die das gleiche Anmeldedatum haben wie du und in deinen Punktebereich liegen</option>'
+'<option value="13">Gegner in deinen Punkte Bereich ,die M&auml;nlich sind suchen </option>'
+'<option value="14">Gegner in deinen Punkte Bereich ,die Weiblich sind suchen </option>'
+'<option value="23">Gegner in deinen Bereich suchen ,die einen Plunder aktiviert haben </option>'
+'<option value="24">Gegner in deinen Bereich suchen ,die einen oder mehrere Spiele Plunder aktiviert haben </option>'
+'<option value="345">Gegner suchen die Premium Accound aktiviert haben und Premium Profil Aktiviert haben </option>'
+'<option value="115">Gegner suchen die in einen bestimmten Stadtteil wohnen und in deinen Punktebereich sind</option>'
+'<option value="4444">Gegner suchen die in deiner Bande und verb&uuml;ndeten Banden sind</option>'
+'<option value="5555">Gegner suchen gegen den Ihr in Krieg seid</option>'
+'<option value="1551">Gegner suchen die in einen besimmten ausgewahlten reg datum bereich sind</option>'
+'<option value="7654">Zeige meine Freundesliste an </option>'

+'<option value="11111">Suche nach Penner die Admine sind</option>'
+'<option value="22222">Suche Penner die Co-Admine sind</option>'
+'<option value="33333">Suche Penner die normale Mitglieder sind</option>'
+'<option value="66666">Suche Gegner die Pinke Schleife angelegt haben (Pinkes Profil )</option>'
+'<option value="77777">Suche Gegner die Blaue Schleife angelegt haben (Blaues Profil )</option>'
+'<option value="88888888">Vorherschende Banden Banden anzeigen</option>'
+'<option value="">------------------------------------------------------</option>'
+'<option value="">---Ab hier werden gegner von Downfight.de abgefragt---</option>'
+'<option value="">------------------------------------------------------</option>'
+''+welchetowndropdown+''
+'</select><br>'
	+'Nach welchen Tier suchen : <select id="welchestier" style="border: 1px solid rgb(0, 0, 0); background-color: rgb(142, 142, 142);">'
	+'<option value="-">------------------------------------</option>'
	+'<option value="-"> -- Ab hier sind Hamburger Tiere ---</option>'
	+'<option value="-">------------------------------------</option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/94826.jpg">Hamburg Elefant </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/25834.jpg">Hamburg Nashorn </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/14896.jpg">Hamburg Eisb&auml;r </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12536.jpg">Hamburg &Auml;ffchen </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/43703.jpg">Hamburg Tiger </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73953.jpg">Hamburg Krokodil </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/98962.jpg">Hamburg Giraffe </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/64220.jpg">Hamburg Nilpferd </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/90385.jpg">Hamburg Pferd </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/32563.jpg">Hamburg Chihuahua </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62456.jpg">Hamburg Cockerspaniel </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/15240.jpg">Hamburg Pitbull </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/09051.jpg">Hamburg Sch&auml;ferhund </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/48263.jpg">Hamburg Adler </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12758.jpg">Hamburg Pudel </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62474.jpg">Hamburg Hausziege </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/61402.jpg">Hamburg Schlange </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/89386.jpg">Hamburg Falke </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73735.jpg">Hamburg Katze </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/21903.jpg">Hamburg Frettchen </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/77310.jpg">Hamburg Hase </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73684.jpg">Hamburg Ratte </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/31451.jpg">Hamburg Taube </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/52483.jpg">Hamburg Wellensittich </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73308.jpg">Hamburg Hamster </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/11836.jpg">Hamburg Maus </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/68930.jpg">Hamburg Goldfisch </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/00001.jpg">Hamburg Kakerlake </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73933.jpg">Hamburg Dressierte Maus </option>'
	+'<option value="-">-----------------------------------</option>'
	+'<option value="-"> -- Ab hier sind Berliner Tiere -- </option>'
	+'<option value="-">-----------------------------------</option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48264.jpg">Berlin  Silberfisch </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/75284.jpg">Berlin  Grasfrosch </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/92653.jpg">Berlin  Rotkelchen </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/02634.jpg">Berlin  Clownfisch </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/01743.jpg">Berlin  Erdm&auml;nnchen </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11542.jpg">Berlin  M&ouml;we </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/66294.jpg">Berlin  Opossum </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11634.jpg">Berlin  Streifenh&ouml;rnchen </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11743.jpg">Berlin  Igel </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/47838.jpg">Berlin  Hausschwein </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/94652.jpg">Berlin  Schneeeule </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/65384.jpg">Berlin  Bisamratte </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/18540.jpg">Berlin  Moorschnucke </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/76538.jpg">Berlin  Yorkshire Terrier </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/64133.jpg">Berlin  Habicht </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48256.jpg">Berlin  Collie </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/98641.jpg">Berlin  Dogge </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/28463.jpg">Berlin  Retriever </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/32563.jpg">Berlin  Mops </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/96242.jpg">Berlin  Elch </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/85242.jpg">Berlin  Zebra </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/99624.jpg">Berlin  Kamel </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/13323.jpg">Berlin  Riesenschildkr&ouml;te </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/83290.jpg">Berlin  Leopard </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/37551.jpg">Berlin  Waschb&auml;r </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/88643.jpg">Berlin  Tapir </option>'
	+'<option value="http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/73933.jpg">Berlin  Dressierte Maus </option>'
	+'</select><br>'

+'Bei suche Nach Stadtteilen :'+stadtsuche+'(Stadt ausw&auml;hlen).<br>'+Mindatum+''+Maxdatum+'<br>'
+'Min-Punkte f&uuml;r gezielte suche:<input name="min_points" id="min_points" maxlength="11" size="7" value="'+GM_getValue("attmin")+'" type="text" /><br>'
+'Max-Punkte f&uuml;r gezielte suche:<input id="max_points" name="max_points" maxlength="11" size="7" value="'+GM_getValue("attmax")+'" type="text" /><br> '
+'Geldangabe:<input id="geld" name="geld" maxlength="11" size="7" value="'+GM_getValue("geld")+'" type="text" /><br> '
+'Menge der Seiten die durchsucht werden sollen (5):<input id="menge" name="menge" maxlength="3" size="4" value="'+GM_getValue("menge")+'" type="text" /><br> '
+'<input type="button" id="geldsucher" name="geldsucher" value="        Suche Starten             " />';

	var tr = document.getElementsByClassName('zrelative sitdown')[0];
	tr.innerHTML = ''+Divanzeigen+''+extra_functionen+'<table class="list" border="1" width="1820"><tbody><tr bgcolor="#272727">'
	+'<th align="center" width="30">Id</th>'
	+'<th align="center" width="50">promille</th>'
	+'<th align="center" width="270">Profillink</th>'
	+'<th align="center" width="50">Rankink</th>'
	+'<th align="center" width="80">Platz</th>'
	+'<th align="center" width="80">Punkte</th>'
	+'<th align="center" width="80">Reg</th>'
	+'<th align="center" width="100">Geld</th>'
	+'<th align="center" width="130">Stadt</th>'
	+'<th align="center" width="100">Status</th>'
	+'<th align="center" width="100">Joined</th>'
	+'<th align="center" width="200">Bandenlinj</th>'
	+'<th align="center" width="120">Tier</th>'
	+'<th align="center" width="150">Plunder</th>'
	+'<th align="center" width="150">Spieleplunder</th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"></th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/img/overview/new_msg.gif"></th>'
	+'<th align="center" width="45">g</th>'
	+'<th align="center" width="15">o</th>'
	+'</tr>' ;


		 document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
	 	 var menge = document.getElementById('menge').value;
	 	 var max = document.getElementById('max_points').value;
	 	 var min = document.getElementById('min_points').value;
	 	 var geld = document.getElementById('geld').value;
         	 var wasuche = document.getElementById('wasuche').value;

         	 var jahr1 = document.getElementById('jahr1').value;
         	 var monat1 = document.getElementById('monat1').value;
         	 var tag1 = document.getElementById('tag1').value;

         	 var jahr2 = document.getElementById('jahr2').value;
         	 var monat2 = document.getElementById('monat2').value;
         	 var tag2 = document.getElementById('tag2').value;

		var mindatum = jahr1+monat1+tag1;
		var maxdatum = jahr2+monat2+tag2;

		GM_setValue("mindatum" , mindatum);
		GM_setValue("maxdatum" , maxdatum);
		GM_setValue("wasuche" , wasuche);

         	 var search_stadtteil = document.getElementById('search_stadtteil').value;
         	 var welchestier = document.getElementById('welchestier').value;
		 var welchestier1 = welchestier;


x=1;
i=1;
z=1;
xx=0;
GM_setValue("xx" ,xx);


			var wasgeht = wasuche;
			if (wasgeht == 3){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Suche Gegner nach '+geld+' &euro; Minimum Geld </font>';seitenwahl(x,i,z);}
			if (wasgeht == 12){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Suche nach spieler die in deinen bereich geloescht wurden</font>';seitenwahl(x,i,z);}
			if (wasgeht == 5){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner die online sind</font>';seitenwahl(x,i,z);}
			if (wasgeht == 6){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner die offline sind</font>';seitenwahl(x,i,z);}
			if (wasgeht == 7){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner die in einer Bande sind</font>';seitenwahl(x,i,z);}
			if (wasgeht == 8){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner die keine Bande haben</font>';seitenwahl(x,i,z);}
			if (wasgeht == 4){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner mit Tiere suchen</font>';seitenwahl(x,i,z);}
			if (wasgeht == 11){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner mit Fake Tieren suchen</font>';seitenwahl(x,i,z);}
			if (wasgeht == 1){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die vor '+GM_getValue("reg")+' den Regestrierungsdatum angemeldet wurden</font>';seitenwahl(x,i,z);}
			if (wasgeht == 2){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die nach den '+GM_getValue("reg")+' regestrierungsdatum angemeldet sind</font>';seitenwahl(x,i,z);}
			if (wasgeht == 23){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die plunder Aktiviert haben </font>';seitenwahl(x,i,z);}
			if (wasgeht == 24){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die Spiele Plunder angelegt haben </font>';seitenwahl(x,i,z);}
			if (wasgeht == 14){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner die weiblich sind suchen </font>';seitenwahl(x,i,z);}
			if (wasgeht == 13){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner die M&auml;nlich sind suchen</font> ';seitenwahl(x,i,z);}
			if (wasgeht == 15){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die das gleiche Anhmeldedatum ('+GM_getValue("reg")+') haben wie du und in deinen Punktebereich liegen</font>';seitenwahl(x,i,z);}
			if (wasgeht == 115){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die in dieser Stadtid :'+search_stadtteil+' wohnen und in deinen Punktebereich liegen</font>';seitenwahl(x,i,z);}
			if (wasgeht == 345){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die Premium Profile aktiviert haben in deinen Punktebereich</font>';seitenwahl(x,i,z);}
			if (wasgeht == 1221){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die dieses Tier haben '+welchestier1+'</font>';seitenwahl(x,i,z);}
			if (wasgeht == 1212){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">es werden gegner gesucht die in deinen Punktebereich liegen</font>';seitenwahl(x,i,z);}
			if (wasgeht == 1551){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Gegner suchen die in einen bestimmten '+mindatum+' und '+maxdatum+' reg bereich sind </font>';seitenwahl(x,i,z);}
			if (wasgeht == 7654){
				freundesuchen(z)
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Script zeigt alle deine freunde aus der freundesliste an </font>';}
			if (wasgeht == 11111){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Suche nach penner die Admine sind</font>';seitenwahl(x,i,z);}
			if (wasgeht == 22222){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Suche Penner die Co-Admine sind</font>';seitenwahl(x,i,z);}
			if (wasgeht == 33333){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Suche Penner die normale Mitglieder sind</font>';seitenwahl(x,i,z);}
			if (wasgeht == 66666){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Suche Gegner die Pinke schleife angelegt haben (also Pinkes profil)</font>';seitenwahl(x,i,z);}
			if (wasgeht == 77777){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Suche Gegner die Blaue Schleife angelegt haben ( Blaues Profil)</font>';seitenwahl(x,i,z);}
			if (wasgeht == 88888888){
				var das_wird_gesucht = '<font style=\"color:orange; font-size:150%;\">Anzeige von Vorherschende banden</font>'
				citysuche();}
			if (wasgeht == 4444){
				var das_wird_gesucht = '<font style=\"color:red; font-size:200%;\">Gegner suchen die in den verb&uuml;ndeten banden sind</font>';kriegundverbund()}
			if (wasgeht == 5555){
				var das_wird_gesucht = '<font style=\"color:red; font-size:200%;\">gegner anzeigen gegen den ihr In Krieg seid</font>';kriegundverbund()}





if(wasgeht == 1122){
var das_wird_gesucht = '<font style=\"color:blue; font-size:200%;\">( Hochfight Berlin )Suche Gegner bei Downfight.de .Min '+GM_getValue("attmin")+' Punkte. Max '+GM_getValue("attmax")+' Punkte. Mein Att = '+GM_getValue("att")+' ,mein Def = '+GM_getValue("def")+'.</font>';
var linka='http://downfight.de/?seite=hochfightberlin';
downfight(linka)}

if(wasgeht == 2233){
var das_wird_gesucht = '<font style=\"color:blue; font-size:200%;\">( Hochfight Hamburg )Suche Gegner bei Downfight.de .Min '+GM_getValue("attmin")+' Punkte. Max '+GM_getValue("attmax")+' Punkte. Mein Att = '+GM_getValue("att")+' ,mein Def = '+GM_getValue("def")+'.</font>';
var linka='http://downfight.de/?seite=hochfighthamburg';
downfight(linka)}

if(wasgeht == 3344){
var das_wird_gesucht = '<font style=\"color:blue; font-size:200%;\">( Downfight Berlin )Suche Gegner bei Downfight.de .Min '+GM_getValue("attmin")+' Punkte. Max '+GM_getValue("attmax")+' Punkte. Mein Att = '+GM_getValue("att")+' ,mein Def = '+GM_getValue("def")+'.</font>';
var linka='http://downfight.de/?seite=downfightberlin';
downfight(linka)}

if(wasgeht == 4455){
var das_wird_gesucht = '<font style=\"color:blue; font-size:200%;\">( Downfight Hamburg )Suche Gegner bei Downfight.de .Min '+GM_getValue("attmin")+' Punkte. Max '+GM_getValue("attmax")+' Punkte. Mein Att = '+GM_getValue("att")+' ,mein Def = '+GM_getValue("def")+'.</font>';
var linka='http://downfight.de/?seite=downfighthamburg';
downfight(linka)}







				var punkteangabeundseiten = '<font style=\"color:yellow; font-size:150%;\"><b>'
				+'Jede suche ist zwischen '+min+' und '+max+' Punkten aktiv.<br>'
				+'Du durchsuchst jetzt '+menge+' Seiten der Highscore:</b></font>';
				document.getElementsByName('wasgeht')[0].innerHTML = ''+punkteangabeundseiten+'<br> '+das_wird_gesucht+'';

				GM_setValue("welchestier" , welchestier);
				GM_setValue("search_stadtteil" , search_stadtteil);
				GM_setValue("wasuche" , wasuche);
				GM_setValue("max" , max);
				GM_setValue("min" , min);
				GM_setValue("menge" , menge);
				GM_setValue("geld" , geld);
				var meinebandeid = GM_getValue("meinebandeid");


},false);


function kriegundverbund(){
var meinebandeid = GM_getValue("meinebandeid");
wassuche = GM_getValue("wasuche");

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/profil/bande:'+meinebandeid+'/',
		onload: function(responseDetails) {
			try{
				var side = responseDetails.responseText;
				var krieg = side.split('Im Krieg gegen')[1].split('Verb')[0];
				var freund = side.split('Verb')[1].split('Mitglied')[0];
			}catch(e){
				var krieg = "";
				var freund = "";
			}


if (wassuche == Number(5555)){
xx=0;
GM_setValue("xx" ,xx);

for(h = 0; h <= 150; h++) {

try{
id22 = krieg.split('/profil/bande:')[h+1].split('/"')[0];
freundid(id22)
}catch(e){
document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:red; font-size:150%;\"><b>Die suche ist nun Beendet einen moment bitte ......kann paar sekunden dauern bis alles angezeigt wird( Ca 10 Sekunden jenachdem wie viele verb&uuml;ndete Banden ihr habt</b></font><br>';
break;
}
}
} else if (wassuche == Number(4444)){
xx=0;
GM_setValue("xx" ,xx);

for(f = 0; f <= 150; f++) {
try{
id22 = freund.split('/profil/bande:')[f+1].split('/"')[0];
freundid(id22);
}catch(e){
document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:red; font-size:150%;\"><b>Die suche ist nun Beendet ein moment bitte ..... kann paar sekunden dauern bis alles angezeigt wird(kann paar Sekunden dauern jenachdem mit wie viele Banden ihr im Krieg seid</b></font><br>';
break;
}
}
}
}});
}


// ------------------------downfight.de suchen ------------------------------------


function downfight(linka){

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+linka+'',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('unten='+GM_getValue("attmin")+'&oben='+GM_getValue("attmax")+'&myatt='+GM_getValue("att")+'&mydef='+GM_getValue("def")+'&angemeldet=nein&auto='),
			onload: function(responseDetails){
			var contenty = responseDetails.responseText;

try{
var content = contenty.split('Punkteverlauf</strong>')[1].split('bgcolor="#4d3124">')[0];		
}catch(e){
var content = contenty.split('Points</strong>')[1].split('bgcolor="#4d3124">')[0];
}

for(i = 1; i <= 25; i++) {
try{
			var Feld1 = content.split('<tr style')[i].split('</tr>')[0];
			var id2 = Feld1.split('/dev/api/user.')[1].split('.xml"')[0];
			//var name = Feld1.split('target="_blank">')[1].split('</a>')[0];
			//var verlauflink = Feld1.split('href="punkte')[1].split('"')[0];
			//var verlauflinkbildid = verlauflink.split('kommentarid=')[1].split('&check')[0];
			//var verlauflinkbildida = 'http://downfight.de/punkte_bigpicture.php?'+verlauflinkbildid+'';
			//var komentarlink = Feld1.split('href="kommentare')[1].split('"')[0];
			//var message = '<a href="'+pgnormal+'messages/write/?to='+ApiId+'" target="_top"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a>';
			//var fight = '<a href="'+pgnormal+'fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/de/img/att.png" border="0"></a>';
			//var punkte1 = Feld1.split('<td')[7].split('<')[0];
			//var punkte = punkte1.split('>')[1].split('P')[0];
			//var laufzeit1 = Feld1.split('<td')[10].split('size')[0];
			//var laufzeit = laufzeit1.split('>')[1].split('<')[0];
			//var komentar1 = Feld1.split('<td')[9].split('/')[0];
			//var komentar = komentar1.split('>')[1].split('<')[0];
			//var fights2='<a class="tooltip" href="http://downfight.de/kommentare'+komentarlink+'">[Komentar]<span>'+komentar+'</span></a>';

mitte(id2)
}catch(e){}
}
}});
}




//-------------------------------------------------------------------------

function freundid(id22){

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/profil/bande:'+id22+'/',
		onload: function(responseDetails) {


			try{
				var side = responseDetails.responseText;
				var obertable = (side.split('Mitglieder</b>')[1]).split('Impressum</a>')[0];
			for(i = 1; i <= 30; i++) {
			try{
				var id2 = (obertable.split('/profil/id:')[i]).split('/')[0];

			mitte(id2)
			}catch(e){
			break;
			}
			}
			}catch(e) {}

}});
}


function freundesuchen(){

	GM_xmlhttpRequest({
		method: 'GET',
			url: ''+link+'/friendlist/',
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
    				  var grosesfeld = content.split('<strong>Kommentar</strong>')[1];
    		 		  var grosesfeld1 = grosesfeld.split('Spielername:</td>')[0];

			         for(a = 1; a <= 20; a++) {
				 try{
    		 		 var freundid = grosesfeld1.split('/profil/id:')[a];
    		  		 var id2 = freundid.split('/')[0];

				 mitte(id2);
				 }catch(e){
				 break;
				 }
			 }
		}});
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    city suche >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function citysuche(){
try{

x = 1;
GM_xmlhttpRequest({
   method: 'GET',
   url: ''+link+'/city_list/',
   onload: function(responseDetails) {
      var side = responseDetails.responseText;
      stadtfakts = side.replace(/&eigenheim1/g, '&city150=');
      stadtfakts1 = stadtfakts.split(/&city[0-9]*=([\w ßöäüÃŸ¶¼-]*)&city_einwohner[\d+]*=(\d+)/);
      stadtfakts2 = side.split(/&city_flaschen[0-9]*=(\d+)&\w+\d+=\d&city_bande[0-9]*=(\d+)/);
      stadtfakts3 = side.split(/&city_bandenname[0-9]*=/);
      tabelle_kopf();
      
   }
});

function tabelle_kopf(){
   div = document.getElementsByClassName('zrelative sitdown')[0];
   div.innerHTML = "";
   newtable = document.createElement('table');
   newtable.setAttribute('class', 'list');
   newtable.setAttribute('border', '1');
   newtable.innerHTML = '<tr bgcolor="#272727"><th align="center">Id</th>'
   +'<th scope="col" align="left">Stadtname</th>'
   +'<th scope="col" align="left" bgcolor="#272727">Vorherschende Bande</th>'
   +'<th scope="col" align="left" bgcolor="#272727">einwohner</th>'
   +'<th align="left">Punkte</th>'
   +'<th align="center">Positsion</th>'
   +'<th align="center">Member</th>'
   +'<th align="center">Bandenadmin</th>'
   +'<th align="center"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"></th>'
   +'<th align="center"><img src="http://media.pennergame.de/img/overview/new_msg.gif"></th>'
   +'<th align="center">Mitglieder</th>'
   +'</tr>' ;
   document.getElementsByClassName('zrelative sitdown')[0].appendChild(newtable);

   for(i=1;i<=(stadtmenge*3);i+=3){
      weitere_infos_bande_2(i);
   }
}

function weitere_infos_bande_1(){
   GM_xmlhttpRequest({
       method: 'GET',
         url: ''+link+'/dev/api/gang.' + stadtfakts2[i+1] + '.xml',
      onload: function(responseDetails) {
           var parser = new DOMParser();
           var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
         bearbeitung();
      }
   });
   
}

function berabeitung(){
   mitgliederanzahl = dom.getElementsByTagName('member_count')[0].textContent;
   
}

function weitere_infos_bande_2(i){
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/profil/bande:'+ stadtfakts2[i+1] +'/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
         bearbeitung2(content,i);
      }
   });
}


function bearbeitung2(content,i){
   plazierung_punkte = content.split(/Platzierung: (\d+)[\w <.\/>\s="]*: (\d+)/);

   mitgliederanzahl = content.split(/(\d+) Mitglieder</)[1];
   admin_id_name = content.split(/alt="Admin">[\w<>\/\s="-]*:[\w"<=>\s&;'\/ ]*:(\d+)[\w\/' ="-:;]*>(\w+)/);

   mitgliedertabelle = content.split('<tr align="left"><td colspan="2">')[1].split('</table>')[0];
   ausgabe(i);
}


function ausgabe(i){
   try{
      
      var bande3 = '<a class="tooltip"><font color="yellow"><b>Mitglieder</b></font><span><small><br>'
                        +'<font style=\"color:blue; font-size:120%;\"><b>Mitglieder:</b></font><br>'
                        +'<font style=\"color:whithe; font-size:120%;\"><b>'+mitgliedertabelle+'</table></b></a></font><br>'
                        +'</small></span>';
                        
      var fight ='<a href="/fight/?to='+admin_id_name[2]+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
               var sms ='<a href="/messages/write/?to='+admin_id_name[1]+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
               newtr = document.createElement('tr');
               newtable.appendChild(newtr);
               newtr.innerHTML = '<td align="center" width="20">'+x+'</td>'
               +'<td align="center" width="210">'+stadtfakts1[i]+'</td>'
               +'<td align="center" width="290"><a href="/profil/bande:'+stadtfakts2[i+1]+'/">'+stadtfakts3[(i-1)/3+1].split('&city')[0]+'</a></td>'
               +'<td align="center" width="80"><img class="icons" alt="Einwohner" src="http://media.pennergame.de/img/einwohner.gif" title="Einwohner">'+stadtfakts1[i+1]+'</img></td>'
               +'<td align="center" width="100">'+plazierung_punkte[2]+'</td>'
               +'<td align="center" width="80">'+plazierung_punkte[1]+'</td> '
               +'<td align="center" width="50">'+mitgliederanzahl+'</td>'
               +'<td align="center" width="100"><a href="/profil/id:'+admin_id_name[1]+'/">'+admin_id_name[2]+'</a></td>'
               +'<td align="center" width="15">'+fight+'</td>'
               +'<td align="center" width="15">'+sms+'</td>'
               +'<td align="center" width="100">'+bande3+'</td>'
   
   }catch(err){
      alert(err);
   }   
   x++;

}
}catch(e){
}
}


function seitenwahl(x,i,z){
	var mengea = GM_getValue("menge");
		if(i<=Number(mengea)){

			i++;
			anfang(x,i,z);
			}else{
		}
}



function anfang(x,i,z){
	var max = GM_getValue("max");
	var min = GM_getValue("min");
	var menge = GM_getValue("menge");
	var geld = GM_getValue("geld");
	GM_xmlhttpRequest({
       		method: 'GET',
            	url: ''+link+'/highscore/user/'+i+'/?max='+max+'&min='+min+'',
             			onload: function(responseDetails) {
            			 var content = responseDetails.responseText;
					for (var x = 1; x<=20; x++){
						if(x==20){
						seitenwahl(x,i,z,xx);
					}
				var table = content.split('id="stadtteil"><div>Stadtteil</div>')[1];
				var table1 = table.split('<div id="pagination">')[0];
				var feld = table1.split('class="col1')[x];
				var feld1 = feld.split('</tr>')[0];
				var id = feld1.split('<a href="/profil/id:')[1];
				var id2 = id.split('/')[0];
				var mengea = GM_getValue("menge");
				var prozi3 = Math.round(mengea*20)

			var prozi2 = Math.round(mengea*19)
			GM_setValue("prozi2" , prozi2);
			var prozi1 = Math.round((100/prozi2)*10)/10
			var prozi = Math.round(prozi1*z)
			var balki = Math.round(prozi*8)
			z++;

//document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:green; font-size:150%;\">['+prozi+'%] Suche bei '+z+' von '+prozi3+'</font><br>'+'<div class="processbar_bg" style="width: 800px;"><div id="active_process2" class="processbar" style="width: '+balki+'px;"></div></div>';
		document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:green; font-size:150%;\">['+prozi+'%] Suche bei '+z+' von '+prozi3+'</font><br><div class="processbar_bg" style="width: 800px;"><div id="active_process2" class="processbar" style="width: '+balki+'px;"></div></div>';
		mitte(id2,x,z);
		}
	}});
}



function mitte(id2,x,z){

	GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/dev/api/user.'+id2+'.xml',
	onload: function(responseDetails) {
	var parser = new DOMParser();
	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	var nam = dom.getElementsByTagName('name')[0].textContent;
	var id = dom.getElementsByTagName('id')[0].textContent;
	var platz = dom.getElementsByTagName('position')[0].textContent;
	var punkte = dom.getElementsByTagName('points')[0].textContent;
	var reg = dom.getElementsByTagName('reg_since')[0].textContent;
	var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
	var city = dom.getElementsByTagName('city')[0].textContent;
	var regm = reg.split('.')[1];
	var regmm = reg.split('.')[0];
	var regj = reg.split('.')[2];
	var tage = reg.split('.')[0];
	var suchergebnis = regj+regmm+tage;

	try{
	var cash = dom.getElementsByTagName('cash')[0].textContent/100;
	}catch(e){
	cash='- - -';
	}

	try{
	var bandeid = dom.getElementsByTagName('id')[1].textContent;
	var bande = dom.getElementsByTagName('name')[1].textContent;
	var status = dom.getElementsByTagName('status')[0].textContent;
	var joined = dom.getElementsByTagName('joined')[0].textContent;
	}catch(e){}

        if (status==3) {
var admincomitglied = '1';
	var bandeja ='111';
       	var statu = '<img src="http://media.pennergame.de/img/bande/admin.gif"><font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
 				var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
	}else if (status==2) {
var admincomitglied = '2';
	var bandeja ='111';
        var statu = '<img src="http://media.pennergame.de/img/bande/coadmin.gif"><font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
     				var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
	}else if (status==1) {
var admincomitglied = '3';
	var bandeja ='111';
        var statu = '<img src="http://media.pennergame.de/img/bande/member.gif"><font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
 				var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
	}else if (status==0) {
var admincomitglied = '4';
	var bandeja ='222';
	var statu = 'No Bande';
	var bandeergebniss = 'Gegner ist in keiner Bande';//<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
	};
	try{
	var cash = dom.getElementsByTagName('cash')[0].textContent/100;
	var promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>';
	}catch(e){
	var promille = '- - -';
	}

	var fight ='<a href="/fight/?to='+nam+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
	var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
	if (cash <= 111111){
	farbe1 = "black";}
	if (cash <= 99999){
	var farbe1 = "gray";}
	if (cash <= 77777){
	farbe1 = "blue";}
	if (cash <= 66666){
	var farbe1 = "cyan";}
	if (cash <= 55555){
	farbe1 = "red";}
	if (cash <= 44444){
	var farbe1 = "green";}
	if (cash <= 33333){
	farbe1 = "magenta";}
	if (cash <= 22222){
	farbe1 = "orange";}
	if (cash <= 11111){
	var farbe1 = "yellow";}
	if (cash <= 1111){
	var farbe1 = "white";}
	GM_xmlhttpRequest({
		method: 'GET',
			url: ''+link+'/profil/id:' + id + '/',
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
				var suche = content.search("Ist gerade Online");
				try{
				if (suche != -1) {
				var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>";
				var onlinee = '1';
				}else {
				var onlinee = '2';
				var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>";};
				}catch(e){
				var onlinee = '3';
				var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
				}

    		  try{
    		  var location1 = content.split('Stadtteil</strong>')[1];
    		  var location2 = location1.split('bgcolor="#232323">')[1];
    		  var stadt = location2.split('</td>')[0];
    		  }catch(e){
     		 var stadt ='<font style=\"color:green; font-size:100%;\">???</font>';   
    		  }   
try{
    var hausi5 = content.split('margin-top:12px;">')[1];
    var hausi3 = hausi5.split('</div>')[0];
    var hausi4 = hausi3.split('<img src="')[1];
    var hausi2 = hausi4.split('"')[0];

if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg'){var petname = 'Elefant';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/25834.jpg'){var petname = 'Nashorn';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/14896.jpg'){var petname = 'Eisb&auml;r';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12536.jpg'){var petname = '&Auml;ffchen';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/43703.jpg'){var petname = 'Tiger';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73953.jpg'){var petname = 'Krokodil';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/98962.jpg'){var petname  = "Giraffe";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/64220.jpg'){var petname  = "Nilpferd";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/90385.jpg'){var petname  = "Pferd";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/32563.jpg'){var petname  = "Chihuahua";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62456.jpg'){var petname  = "Cockerspaniel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/15240.jpg'){var petname  = "Pitbull";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/09051.jpg'){var petname  = "Sch&auml;ferhund";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/48263.jpg'){var petname  = "Adler";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12758.jpg'){var petname  = "Pudel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62474.jpg'){var petname  = "Hausziege";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/61402.jpg'){var petname  = "Schlange";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/89386.jpg'){var petname  = "Falke";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73735.jpg'){var petname  = "Katze";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/21903.jpg'){var petname  = "Frettchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/77310.jpg'){var petname  = "Hase";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73684.jpg'){var petname  = "Ratte";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/31451.jpg'){var petname  = "Taube";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/52483.jpg'){var petname  = "Wellensittich";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73308.jpg'){var petname  = "Hamster";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/11836.jpg'){var petname  = "Maus";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/68930.jpg'){var petname  = "Goldfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/00001.jpg'){var petname  = "Kakerlake";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48264.jpg'){var petname  = "Silberfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/75284.jpg'){var petname  = "Grasfrosch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/92653.jpg'){var petname  = "Rotkelchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/02634.jpg'){var petname  = "Clownfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/01743.jpg'){var petname  = "Erdm&auml;nnchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11542.jpg'){var petname  = "M&ouml;we";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/66294.jpg'){var petname  = "Opossum";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11634.jpg'){var petname  = "Streifenh&ouml;rnchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11743.jpg'){var petname  = "Igel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/47838.jpg'){var petname  = "Hausschwein";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/94652.jpg'){var petname  = "Schneeeule";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/65384.jpg'){var petname  = "Bisamratte";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/18540.jpg'){var petname  = "Moorschnucke";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/76538.jpg'){var petname  = "Yorkshire Terrier";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/64133.jpg'){var petname  = "Habicht";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48256.jpg'){var petname  = "Collie";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/98641.jpg'){var petname  = "Dogge";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/28463.jpg'){var petname  = "Retriever";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/32563.jpg'){var petname  = "Mops";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/96242.jpg'){var petname  = "Elch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/85242.jpg'){var petname  = "Zebra";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/99624.jpg'){var petname  = "Kamel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/13323.jpg'){var petname  = "Riesenschildkr&ouml;te";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/83290.jpg'){var petname  = "Leopard";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/37551.jpg'){var petname  = "Waschb?r";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/73933.jpg'){var petname  = "Maus (Geld)";}

	var tierja = '444';
	var suche = content.search("selbsterstelltes Haustier");
		if (suche != -1) {
   		var tierja = '555';
   		var hausi55 = content.split('selbsterstelltes Haustier')[2];
   		var hausi33 = hausi55.split('Haustier zu erstellen')[0];
   		var hausi555 = hausi33.split('<b>')[1];
   		var hausi33 = hausi555.split('</b>')[0];
		var petname = '<a class="tooltip" href="/premium/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
		}
		}catch(e){
		var petname = '--';}

//------------------- abfrage male oder feale oder wenn error dann geloescht oder premium user ---------------------
	
		var suche = content.search("http://static.pennergame.de/img/pv4/icons/male.jpg");
		var suche1 = content.search("http://static.pennergame.de/img/pv4/icons/female.jpg");

		if (suche != -1) {
			var manoderfrau = '1';
			var wasda = 'Mann';
			}else

		if (suche1 != -1) {
			var manoderfrau = '2';
			var wasda = 'Frau';
			}
		else{
      var wasda ='<font style=\"color:green; font-size:100%;\">???</font>';  

}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//----------------------------------------------



		var suche = content.search("pennergame.de/premiummedia/img/premium/styles/");


		if (suche != -1) {
			var premiumsuche = '3';
			var farbe = 'green';
			var wasda = '<font style=\"color:green; font-size:100%;\">Prem</font>';  
			}



try{
      	var aktuellerplujnder = content.split('<div align="center"><strong>')[1];
      	var aktuellerplujnder1 = aktuellerplujnder.split('</strong>')[0];
	var aktuellerplujnder112 = '1234';
	}catch(e){
	var aktuellerplujnder1 = '-';
}



try{
var side_split = content.split('<div id="item_icon">');
var side_split_2 = side_split[1].split('<td width="4%">');
var side_split_3 = side_split_2[1].split('</td>');
var plunder_bild = side_split_3[0];
var side_split_4 = side_split_3[1].split('ity item">');
var side_split_5 = side_split_4[1].split('</span>');
var plunderan = side_split_5[0];
var plunderan112 = '2222';
}catch(e){
var plunderan = '-';
}

var meinepunkte  = GM_getValue("pts");
var meinregdatum = GM_getValue("meinregdatum");
var wasuche      = GM_getValue("wasuche");
var search_stadtteil = GM_getValue("search_stadtteil");
var xx = GM_getValue("xx");
var welchestier = GM_getValue("welchestier");






// gegner nach geld suchen die geln minimum x haben 
if (wasuche == Number(3)){
var geld = GM_getValue("geld" , geld);
if (cash >= Number(geld)){
angabescannen(xx);}}

// gegener die online sind
if (wasuche == Number(5)){
if (onlinee == Number(1)){
angabescannen(xx);}}

// gegner die offline sund
if (wasuche == Number(6)){
if (onlinee == Number(2)){
angabescannen(xx);}}

// gegner die geloescht wurden 
if (wasuche == Number(12)){


var suche = content.search('scht oder vom Spiel verbannt');
if (suche != -1) {
var geloscht = '121';
var farbe = 'black';
angabescannen(xx);
}}

// gegner die in einer bande sind
if (wasuche == Number(7)){
if (bandeja == Number(111)){
angabescannen(xx);}}

// gegner die keine bande haben 
if (wasuche == Number(8)){
if (bandeja == Number(222)){
angabescannen(xx);}}

// gegner suchen die tiere aktiviert haben 
if (wasuche == Number(4)){
if (tierja == Number(444)){
angabescannen(xx);}}

// gegner suchen die tiere aktiviert haben 
if (wasuche == Number(11)){
if (tierja == Number(555)){
angabescannen(xx);}}

// gegner die menlich sind suchen 
if (wasuche == Number(13)){
if (manoderfrau == Number(1)){
angabescannen(xx);}}

// gegner die weiblich sind suchen 
if (wasuche == Number(14)){
if (manoderfrau == Number(2)){
angabescannen(xx);}}

// gegner suchen die vor deinen anmeldedatum angemldet sind 
if (wasuche == Number(1)){
if (suchergebnis <= Number(meinregdatum)){
angabescannen(xx);}}

// gegner suchen die nach  deinen anmeldetdatum angemldet sind
if (wasuche == Number(2)){
if (suchergebnis >= Number(meinregdatum)){
angabescannen(xx);}}

// gegner suchen die das gleiche anmeldedatum haben wie du selber 
if (wasuche == Number(15)){
if (suchergebnis == Number(meinregdatum)){
angabescannen(xx);}}

// gegner suchen die spiele plunder aktiviert haben 
if (wasuche == Number(24)){
if (aktuellerplujnder112 == Number(1234)){
angabescannen(xx);}}

// gegner suchen die plunder aktuel an haben 
if (wasuche == Number(23)){
if (plunderan112 >= Number(2222)){
angabescannen(xx);}}

// gegner suchen die premium accound haben 
if (wasuche == Number(345)){
if (premiumsuche == Number(3)){
angabescannen(xx);}}

// gegner suchen die in einen stadtteil sind
if (wasuche == Number(115)){
if (search_stadtteil == Number(city)){
angabescannen(xx);}}

// gegner suchen die in deinen Punkte bereich sind und keine weiterren enschrenkungen unterliegen also volle such anzahl erreichen
if (wasuche == Number(1212)){
angabescannen(xx);}

// gegner suchen die ein ganz spezieles Tier haben 
if (wasuche == Number(1221)){
if (welchestier == hausi2){
angabescannen(xx);}}

// suche nach minimum und maximum punkte
if (wasuche == Number(1551)){
var regmin = GM_getValue("mindatum");
var regmax = GM_getValue("maxdatum");
var gegnerreg = suchergebnis;
regauswerten(xx);}

// suche nach zwischen min und max reg datum
function regauswerten(xx){
if ((regmin <= gegnerreg) && (gegnerreg <= regmax)){
angabescannen(xx);}}

// ffreundesliste anzeigen
if (wasuche == Number(7654)){
angabescannen(xx);}

// banden admine suchen 
if (wasuche == Number(11111)){
if (admincomitglied == 1){
angabescannen(xx);}}

// co admine suchen 
if (wasuche == Number(22222)){
if (admincomitglied == 2){
angabescannen(xx);}}

// normale mitglieder suchen 
if (wasuche == Number(33333)){
if (admincomitglied == 3){
angabescannen(xx);}}

// bverbundete banden suchen 
if (wasuche == Number(4444)){
angabescannen(xx);}

// banden im kriewg mit mir suchen 
if (wasuche == Number(5555)){
angabescannen(xx);}

// gegne die Pinke schleife angelegt haben
if (wasuche == Number(66666)){
var suche = content.search("3px;color:#F0F");
if (suche != -1) {
angabescannen(xx);}}

// Gegner suchen die blaue schleife angelegt haben 
if (wasuche == Number(77777)){
var suche = content.search("3px;color:#007CF9");
if (suche != -1) {
angabescannen(xx);}}


// downfight.de suchen down up hamburg und berlin
if(wasuche == 1122){
angabescannen(xx);}

if(wasuche == 2233){
angabescannen(xx);}

if(wasuche == 3344){
angabescannen(xx);}

if(wasuche == 4455){
angabescannen(xx);}

















function angabescannen(xx){
xx++;
GM_setValue("xx" ,xx);
document.getElementsByName('gefunden')[0].innerHTML = '<font style=\"color:black; font-size:150%;\"><b>Gefundene Gegner die zu deiner Auswahl Passen  : '+xx+'</b></font><br>';

			tr.innerHTML += '<table class="list" border="1" width="1820"><tbody><tr bgcolor="#272727">'
			+'<th align="center" bgcolor="'+farbe+'" width="30">'+xx+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="50">'+promille+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="270"><a href="/profil/id:'+id+'/">'+nam+'</a></th>'
			+'<th align="center" bgcolor="'+farbe+'" width="50">'+rankingpoints+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="80">'+platz+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="80">'+punkte+'</th> '
			+'<th align="center" bgcolor="'+farbe+'" width="80">'+reg+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="100"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+' &euro;</b></font></th>'
			+'<th align="center" bgcolor="'+farbe+'" width="130">'+stadt+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="100">'+statu+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="100">'+joined+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="200">'+bandeergebniss+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="120">'+petname+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="150">'+plunderan+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="150">'+aktuellerplujnder1+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="15">'+fight+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="15">'+sms+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="45">'+wasda+'</th>'
			+'<th align="center" bgcolor="'+farbe+'" width="15">'+online2a+'</th>'
			+'</tr></tbody></table>';
			}

				var prozi2 = GM_getValue("prozi2" , prozi2);
				if(z == prozi2){
				document.getElementsByName('sbalki')[0].innerHTML += '<font style=\"color:red; font-size:150%;\"><b>Die suche ist nun Beendet</b></font><br>';
				}
			}});
		}});
	}

},false);


// copyright by basti1012 dieses scrpt darf nur mit meiner zustimmung fuer andere Pennergames umgebaut werden oder verandert oder sonst was mit gemacht werden .
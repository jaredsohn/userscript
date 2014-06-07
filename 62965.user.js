// ==UserScript==
// @name           	Fight Gegnersuche(version2)Pennergame Hamburg, berlin 4.0 mendigogame(3.1)
// @namespace      	http://pennerhack.foren-city.de  (basti1012)(pennerhack)
// @description    	Mit einen klick werden euch nur Gegner angezeigt die in deinen Punkte bereich sind und nur fett Kohle auf den konto haben
// @include 	   	*pennergame.de/fight/overview/*
// @include 	   	*berlin.pennergame.de/fight/overview/*
// @include 	   	*dossergame.co.uk/fight/overview/*
// @include 	   	*menelgame.pl/fight/overview/*
// @include 	   	*clodogame.fr/fight/overview/*
// @include 	   	*mendigogame.es/fight/overview/*
// ==/UserScript==


GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://userscripts.org/scripts/show/62638",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var highscorsuche = acontent.split('Gegnersuche(version')[1];			
			var highscorsuche1 = highscorsuche.split(')Pennergame')[0];	
if(highscorsuche1 ==2){
}else{
alert("Es ist eine neue Version von Bastis Fight Gegner suche,\nVersion "+highscorsuche1+" \nbitte mache ein Update,ansonsten kommt dieser Hinweiss immer wieder.Nachdem du Ok geklickt hast kommt ein Update Fenster wo du enscheiden kannst ob du das neue Script installieren willst .Nach dem Update bitte dieses Script deinstallieren sonst kann es zu Scripte kompflikte kommen .\n\nMfg Basti1012");
window.location.href = 'http://userscripts.org/scripts/source/62638.user.js';
}
}});























// linkadressen ermitteln
var url = document.location.href;

// linkadresse berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}

// Linkadressen fuer dossergame
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
}
// Linkadressen fuer menelgame
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
}
// Linkadressen fuer clodogame
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
}



// Linkadressen fuer mendigogame.es
if (url.indexOf("http://www.mendigogame.es")>=0) {
var link = "http://www.mendigogame.es"
}










GM_setValue("ptsMax", 0);
GM_setValue("ptsMin", 0);
GM_setValue("points", 0);
GM_setValue("numCalls", 1);


GM_setValue("numPantallas", 30);
GM_setValue("mostrado", false);
var totalMendigos = 10 * GM_getValue("numPantallas");
GM_setValue("totalMendigos", totalMendigos);

var vect = new Array ();
vect[0] = new Array (0, 0, '', '', '', '');
vect[1] = new Array (0, 0, '', '', '', '');
vect[2] = new Array (0, 0, '', '', '', '');
vect[3] = new Array (0, 0, '', '', '', '');
vect[4] = new Array (0, 0, '', '', '', '');
vect[5] = new Array (0, 0, '', '', '', '');
vect[6] = new Array (0, 0, '', '', '', '');
vect[7] = new Array (0, 0, '', '', '', '');
vect[8] = new Array (0, 0, '', '', '', '');
vect[9] = new Array (0, 0, '', '', '', '');
vect[10] = new Array (0, 0, '', '', '', '');
vect[11] = new Array (0, 0, '', '', '', '');
vect[12] = new Array (0, 0, '', '', '', '');
vect[13] = new Array (0, 0, '', '', '', '');
vect[14] = new Array (0, 0, '', '', '', '');
vect[15] = new Array (0, 0, '', '', '', '');
vect[16] = new Array (0, 0, '', '', '', '');
vect[17] = new Array (0, 0, '', '', '', '');
vect[18] = new Array (0, 0, '', '', '', '');
vect[19] = new Array (0, 0, '', '', '', '');


vect[20] = new Array (0, 0, '', '', '', '');
vect[21] = new Array (0, 0, '', '', '', '');
vect[22] = new Array (0, 0, '', '', '', '');
vect[23] = new Array (0, 0, '', '', '', '');
vect[24] = new Array (0, 0, '', '', '', '');
vect[25] = new Array (0, 0, '', '', '', '');
vect[26] = new Array (0, 0, '', '', '', '');
vect[27] = new Array (0, 0, '', '', '', '');
vect[28] = new Array (0, 0, '', '', '', '');
vect[29] = new Array (0, 0, '', '', '', '');
vect[30] = new Array (0, 0, '', '', '', '');
vect[31] = new Array (0, 0, '', '', '', '');
vect[32] = new Array (0, 0, '', '', '', '');
vect[33] = new Array (0, 0, '', '', '', '');
vect[34] = new Array (0, 0, '', '', '', '');
vect[35] = new Array (0, 0, '', '', '', '');
vect[36] = new Array (0, 0, '', '', '', '');
vect[37] = new Array (0, 0, '', '', '', '');
vect[38] = new Array (0, 0, '', '', '', '');
vect[39] = new Array (0, 0, '', '', '', '');



vect[40] = new Array (0, 0, '', '', '', '');
vect[41] = new Array (0, 0, '', '', '', '');
vect[42] = new Array (0, 0, '', '', '', '');
vect[43] = new Array (0, 0, '', '', '', '');
vect[44] = new Array (0, 0, '', '', '', '');
vect[45] = new Array (0, 0, '', '', '', '');
vect[46] = new Array (0, 0, '', '', '', '');
vect[47] = new Array (0, 0, '', '', '', '');
vect[48] = new Array (0, 0, '', '', '', '');
vect[49] = new Array (0, 0, '', '', '', '');
vect[50] = new Array (0, 0, '', '', '', '');
vect[51] = new Array (0, 0, '', '', '', '');
vect[52] = new Array (0, 0, '', '', '', '');
vect[53] = new Array (0, 0, '', '', '', '');
vect[54] = new Array (0, 0, '', '', '', '');
vect[55] = new Array (0, 0, '', '', '', '');
vect[56] = new Array (0, 0, '', '', '', '');
vect[57] = new Array (0, 0, '', '', '', '');
vect[58] = new Array (0, 0, '', '', '', '');
vect[59] = new Array (0, 0, '', '', '', '');



var pantalla = document.getElementsByTagName('table')[0];

setupPoints(pantalla.rows[13].cells[0].innerHTML);

var tr_ini = pantalla.rows[7];
var tr_fin = pantalla.rows[8];

var tr_1 = tr_ini.cloneNode(true);
var tr_2 = tr_ini.cloneNode(true);

var line = document.createElement('hr');
line.size = '1';
tr_1.cells[0].appendChild(line);

var span = document.createElement('span');
span.setAttribute('class', 'tiername');
span.innerHTML = 'Bastis Hightec Gegnersuche F&uuml;r Pennergame Hamburg ,Berlin.';
tr_1.cells[0].appendChild(span);

var br1 = document.createElement("br");
var br2 = document.createElement("br");

var sbutton = document.createElement("input");
sbutton.type = 'button';
sbutton.value = 'Automatische Gegner suche mit fett Geld und in deinen Punktebereich';
sbutton.addEventListener('click', start, false);

var botondiv = document.createElement('div');
botondiv.id = 'botondiv'
botondiv.setAttribute('style', 'background-color:#3A3A3A; width:450px; height:80px; text-align:center;');
botondiv.appendChild(br1);
botondiv.appendChild(br2);
botondiv.appendChild(sbutton);
tr_1.cells[0].appendChild(botondiv);

tr_fin.parentNode.insertBefore(tr_1, tr_fin);
tr_fin.parentNode.insertBefore(tr_2, tr_fin);

function setupPoints(texto)
{






if (url.indexOf("http://berlin.pennergame")>=0) {
	var txt2 = (texto.split('Dein Ziel muss'))[1].split(' bis ');
	var txt3 = txt2[1].split('Punkte');
}
if (url.indexOf("http://www.pennergame")>=0) {
	var txt2 = (texto.split('Dein Ziel muss'))[1].split(' bis ');
	var txt3 = txt2[1].split('Punkte');
}	
if (url.indexOf("http://www.mendigogame.es")>=0) {
	var txt2 = (texto.split('entre'))[1].split(' y ');
	var txt3 = txt2[1].split('puntos.');
}
if (url.indexOf("http://www.menelgame.pl")>=0) {
	var txt2 = (texto.split('od '))[1].split('do ');
	var txt3 = txt2[1].split('punkt');
}


	var max = parseFloat(txt3[0]);
	var min = parseFloat(txt2[0]);
	var pts = Math.floor(max / 1.5)

	GM_setValue("ptsMax", max);
	GM_setValue("ptsMin", min);
	GM_setValue("points", pts);
}

function start(event) 
{	
	var mytr = pantalla.getElementsByTagName('tr')[8];
	divToDel = document.getElementById('botondiv');
	mytr.cells[0].removeChild(divToDel);
	
	var div = document.createElement('div');
	div.id = 'searchingdiv'
	div.setAttribute('style', 'background-color:#3A3A3A; width:450px; height:100px;');
	div.innerHTML = '<br><br><div id="processbar" class="processbar_bg_ov" style="width:100%;"><div id="barra" style="width: 0%;" class="processbar_clean"/><center><b><span id="nivelproceso">0%</span></b></center></div><br><div style="text-align:center;"><center><p><blink><font style=\"color:red; font-size:200%;\">    <b>                                  Ein Moment Bitte....Suche l&auml;uft.</b></font></blink></p></center></div>';				
	mytr.cells[0].appendChild(div);

	var fbutton = document.createElement("input");
	fbutton.type = 'button';
	fbutton.value = 'Zeige Ergebniss wenn die suche stehengeblieben ist ';
	fbutton.addEventListener('click', fclick, false);

	var botondiv = document.createElement('div');
	botondiv.id = 'botondiv'
	botondiv.setAttribute('style', 'background-color:#3A3A3A; width:450px; height:30px; text-align:center;');
	botondiv.appendChild(fbutton);
	mytr.cells[0].appendChild(botondiv);
	
	definePosition(vect, pantalla);
}




















// hier mussen die requeste rein fuer die ganzen anderen pennergames zur zeit hamburg berlin medigogame
function definePosition(vect, pantalla) {
	var max = GM_getValue("ptsMax");
	var min = GM_getValue("ptsMin");


if (url.indexOf("mendigogame.es")>=0) {
	GM_xmlhttpRequest({
		   	method: 'GET',
			url: 'http://www.mendigogame.es/highscore/range/?max_points='+max+'&min_points='+min+'',
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;
				var side1 = content.split('valign="bottom" ><strong>');
				var side2 = side1[1].split('.</strong>');
				var pos = side2[0];
				populateVector(pos, vect, pantalla);
			}});
}









if (url.indexOf("menelgame.pl")>=0) {
	GM_xmlhttpRequest({
		   	method: 'GET',
			url: 'http://www.menelgame.pl/highscore/range/?max_points='+max+'&min_points='+min+'',
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;
				var side1 = content.split('valign="bottom" ><strong>');
				var side2 = side1[1].split('.</strong>');
				var pos = side2[0];
				populateVector(pos, vect, pantalla);
			}});
}























if (url.indexOf("pennergame.de")>=0) {
//alert("berlin oder hamburg ");
	GM_xmlhttpRequest({
		   	method: 'GET',
		   	url: ''+link+'/highscore/user/?min='+min+'&max='+max+'',
		   	onload: function(responseDetails) 
			{
				var content = responseDetails.responseText;
				var side1 = content.split('<td class="col1 down">');
				var side2 = side1[1].split('.</td>');	
				var pos = side2[0];
				populateVector(pos, vect, pantalla);
			}});

}




}

































function populateVector(pos, vect, pantalla) {
	var page = Math.ceil(pos / 20);
	var numPantallas = GM_getValue("numPantallas");
				
	var i=0;
for (i=0; i<numPantallas; i++) {
		var count = page - i;
if (count > 0){
			var myurl = ''+link+'/highscore/' + count + '/';					
			GM_xmlhttpRequest({
					   	method: 'GET',
					   	url: myurl,
					   	onload: function(responseDetails) {								
							var content = responseDetails.responseText;
							var splits = content.split('/profil/id:');
							var j=1;
for (j=1; j<splits.length; j++) {
							var userid = (splits[j].split('/"'))[0];
							var buscar = true;
							var m=0;
for (m=0; m<vect.length; m++) {
if (vect[m][0] == userid){	
	buscar = false;
	break;
}
}										
if (buscar){

			GM_xmlhttpRequest({
					method: 'GET',
					url: ''+link+'/dev/api/user.' + userid + '.xml',
					onload: function(responseDetails){
								var parser = new DOMParser();
								var dom = parser.parseFromString(responseDetails.responseText, "application/xml");														
try{
														var max = GM_getValue("ptsMax");
														var min = GM_getValue("ptsMin");
														var points = dom.getElementsByTagName('points')[0].textContent;
if (points > min && points < max){
													
	var iduser = dom.getElementsByTagName('id')[0].textContent;
	var name = dom.getElementsByTagName('name')[0].textContent;															
	var cash = parseInt(dom.getElementsByTagName('cash')[0].textContent);
	var gangid = dom.getElementsByTagName('gang')[0].getElementsByTagName('id')[0].textContent;															
	var gang = dom.getElementsByTagName('gang')[0].getElementsByTagName('name')[0].textContent
	var platz = dom.getElementsByTagName('position')[0].textContent;
	var reg = dom.getElementsByTagName('reg_since')[0].textContent;
	var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
	var city = dom.getElementsByTagName('city')[0].textContent;

if (url.indexOf("http://www.pennergame")>=0) {
if(city == 72){var stadt = 'Allerm?he';}
if(city == 41){var stadt = 'Alsterdorf';}
if(city == 73){var stadt = 'Altengamme';}
if(city == 85){var stadt = 'Altenwerder';}
if(city == 12){var stadt = 'Altona Altstadt';}
if(city == 13){var stadt = 'Altona Nord';}
if(city == 19){var stadt = 'Altstadt';}
if(city == 8){var stadt = 'Bahrenfeld';}
if(city == 42){var stadt = 'Barmbek-Nord';}
if(city == 43){var stadt = 'Barmbek-S?d';}
if(city == 74){var stadt = 'Bergedorf';}
if(city == 54){var stadt = 'Bergstedt';}
if(city == 20){var stadt = 'Billbrook';}
if(city == 103){var stadt = 'Billstedt';}
if(city == 75){var stadt = 'Billwerder';}
if(city == 3){var stadt = 'Blankenese';}
if(city == 21){var stadt = 'Borgfelde';}
if(city == 55){var stadt = 'Bramfeld';}
if(city == 86){var stadt = 'Cranz';}
if(city == 76){var stadt = 'Curslack';}
if(city == 44){var stadt = 'Dulsberg';}
if(city == 56){var stadt = 'Duvenstedt';}
if(city == 30){var stadt = 'Eidelstedt';}
if(city == 57){var stadt = 'Eilbek';}
if(city == 33){var stadt = 'Eimsb?ttel';}
if(city == 87){var stadt = 'Ei?endorf';}
if(city == 45){var stadt = 'Eppendorf';}
if(city == 58){var stadt = 'Farmsen-Berne';}
if(city == 14){var stadt = 'Finkenwerder';}
if(city == 88){var stadt = 'Francop';}
if(city == 46){var stadt = 'Fuhlsb?ttel';}
if(city == 47){var stadt = 'Gro? Borstel';}
if(city == 9){var stadt = 'Gro? Flottbek';}
if(city == 89){var stadt = 'Gut Moor';}
if(city == 28){var stadt = 'HafenCity';}
if(city == 23){var stadt = 'Hamm-Mitte';}
if(city == 24){var stadt = 'Hamm-Nord';}
if(city == 25){var stadt = 'Hamm-S?d';}
if(city == 22){var stadt = 'Hammerbrook';}
if(city == 90){var stadt = 'Harburg';}
if(city == 34){var stadt = 'Harvestehude';}
if(city == 91){var stadt = 'Hausbruch';}
if(city == 92){var stadt = 'Heimfeld';}
if(city == 48){var stadt = 'Hoheluft-Ost';}
if(city == 35){var stadt = 'Hoheluft-West';}
if(city == 49){var stadt = 'Hohenfelde';}
if(city == 26){var stadt = 'Horn';}
if(city == 59){var stadt = 'Hummelsbuettel';}
if(city == 4){var stadt = 'Iserbrook';}
if(city == 60){var stadt = 'Jenfeld';}
if(city == 77){var stadt = 'Kirchwerder';}
if(city == 27){var stadt = 'Kleiner Grasbrook';}
if(city == 93){var stadt = 'Langenbek';}
if(city == 50){var stadt = 'Langenhorn';}
if(city == 61){var stadt = 'Lemsahl-Mellingstedt';}
if(city == 78){var stadt = 'Lohbr?gge';}
if(city == 36){var stadt = 'Lokstedt';}
if(city == 7){var stadt = 'Lurup';}	
if(city == 62){var stadt = 'Marienthal';}
if(city == 94){var stadt = 'Marmstorf';}
if(city == 95){var stadt = 'Moorburg';}
if(city == 79){var stadt = 'Moorfleet';}
if(city == 96){var stadt = 'Neuenfelde';}
if(city == 80){var stadt = 'Neuengamme';}
if(city == 98){var stadt = 'Neugraben-Fischbek';}
if(city == 97){var stadt = 'Neuland';}
if(city == 18){var stadt = 'Neustadt';}
if(city == 37){var stadt = 'Niendorf';}
if(city == 5){var stadt = 'Nienstedten';}
if(city == 81){var stadt = 'Ochsenwerder';}
if(city == 51){var stadt = 'Ohlsdorf';}
if(city == 6){var stadt = 'Osdorf';}
if(city == 10){var stadt = 'Othmarschen';}
if(city == 11){var stadt = 'Ottensen';}
if(city == 63){var stadt = 'Poppenbuettel';}
if(city == 64){var stadt = 'Rahlstedt';}
if(city == 82){var stadt = 'Reitbrook';}
if(city == 1){var stadt = 'Rissen';}
if(city == 99){var stadt = 'R?nneburg';}
if(city == 29){var stadt = 'Rothenburgsort';}
if(city == 38){var stadt = 'Rotherbaum';}
if(city == 65){var stadt = 'Sasel';}
if(city == 39){var stadt = 'Schnelsen';}
if(city == 100){var stadt = 'Sinstorf';}
if(city == 83){var stadt = 'Spadenland';}
if(city == 31){var stadt = 'St. Georg';}
if(city == 17){var stadt = 'St.Pauli';}
if(city == 66){var stadt = 'Steilshoop';}
if(city == 16){var stadt = 'Steinwerder';}
if(city == 40){var stadt = 'Stellingen';}
if(city == 2){var stadt = 'S?lldorf';}
if(city == 84){var stadt = 'Tatenberg';}
if(city == 67){var stadt = 'Tonndorf';}
if(city == 52){var stadt = 'Uhlenhorst';}
if(city == 32){var stadt = 'Veddel';}
if(city == 68){var stadt = 'Volksdorf';}
if(city == 15){var stadt = 'Waltershof';}
if(city == 69){var stadt = 'Wandsbek';}
if(city == 70){var stadt = 'Wellingsb?ttel';}
if(city == 101){var stadt = 'Wilhelmsburg';}
if(city == 102){var stadt = 'Wilstorf';}
if(city == 53){var stadt = 'Winterhude';}
if(city == 71){var stadt = 'Wohldorf-Ohlstedt';}
}

if (url.indexOf("http://www.mendigogame.es")>=0) {
if(city == 1){var stadt = 'Arganzuela ';}
if(city == 20){var stadt = 'Barajas 	';}
if(city == 9){var stadt = 'Carabanchel 	';}	
if(city == 21){var stadt = 'Centro 	';}	
if(city == 3){var stadt = 'Chamartín 	';}	
if(city == 5){var stadt = 'Chamberí 		';}
if(city == 13){var stadt = 'Ciudad Lineal 	';}	
if(city == 6){var stadt = 'Fuencarral-El Pardo 	';}	
if(city == 14){var stadt = 'Hortaleza 		';}
if(city == 8){var stadt = 'La Latina 	';}
if(city == 7){var stadt = 'Moncloa-Aravaca 	';}	
if(city == 12){var stadt = 'Moratalaz 		';}
if(city == 11){var stadt = 'Puente de Vallecas 	';}	
if(city == 2){var stadt = 'Retiro 	';}
if(city == 19){var stadt = 'Salamanca 	';}	
if(city == 18){var stadt = 'San Blas 	';}	
if(city == 4){var stadt = 'Tetuán 	';}	
if(city == 10){var stadt = 'Usera 	';}	
if(city == 17){var stadt = 'Vicálvaro 	';}	
if(city == 16){var stadt = 'Villa de Vallecas 	';}	
if(city == 15){var stadt = 'Villaverde';}
}

if (url.indexOf("berlin.pennergame")>=0) {
if(city == 54){var stadt = 'Adlershof';}
if(city == 72){var stadt = 'Alt-Hohenschönhausen';}
if(city == 48){var stadt = 'Alt-Treptow';}
if(city == 53){var stadt = 'Altglienicke';}
if(city == 50){var stadt = 'Baumschulenweg';}
if(city == 63){var stadt = 'Biesdorf';}
if(city == 5){var stadt = 'Blankenburg';}
if(city == 9){var stadt = 'Blankenfelde';}
if(city == 55){var stadt = 'Bohnsdorf';}
if(city == 44){var stadt = 'Britz';}
if(city == 10){var stadt = 'Buch';}
if(city == 45){var stadt = 'Buckow';}
if(city == 14){var stadt = 'Charlottenburg';}
if(city == 19){var stadt = 'Charlottenburg-Nord';}
if(city == 34){var stadt = 'Dahlem';}
if(city == 90){var stadt = 'Falkenberg';}
if(city == 28){var stadt = 'Falkenhagener Feld';}
if(city == 73){var stadt = 'Fennpfuhl';}
if(city == 11){var stadt = 'Französisch Buchholz';}
if(city == 38){var stadt = 'Friedenau';}
if(city == 67){var stadt = 'Friedrichsfelde';}
if(city == 58){var stadt = 'Friedrichshagen';}
if(city == 1){var stadt = 'Friedrichshain';}
if(city == 78){var stadt = 'Frohnau';}
if(city == 25){var stadt = 'Gatow';}
if(city == 89){var stadt = 'Gesundbrunnen';}
if(city == 47){var stadt = 'Gropiusstadt';}
if(city == 60){var stadt = 'Grünau';}
if(city == 17){var stadt = 'Grunewald';}
if(city == 27){var stadt = 'Hakenfelde';}
if(city == 20){var stadt = 'Halensee';}
if(city == 86){var stadt = 'Hansaviertel';}
if(city == 22){var stadt = 'Haselhorst';}
if(city == 77){var stadt = 'Heiligensee';}
if(city == 6){var stadt = 'Heinersdorf';}
if(city == 66){var stadt = 'Hellersdorf';}
if(city == 79){var stadt = 'Hermsdorf';}
if(city == 51){var stadt = 'Johannisthal';}
if(city == 68){var stadt = 'Karlshorst';}
if(city == 7){var stadt = 'Karow';}
if(city == 64){var stadt = 'Kaulsdorf';}
if(city == 26){var stadt = 'Kladow';}
if(city == 94){var stadt = 'Konradshöhe';}
if(city == 57){var stadt = 'Köpenick';}
if(city == 2){var stadt = 'Kreuzberg';}
if(city == 32){var stadt = 'Lankwitz';}
if(city == 69){var stadt = 'Lichtenberg';}
if(city == 42){var stadt = 'Lichtenrade';}
if(city == 31){var stadt = 'Lichterfelde';}
if(city == 81){var stadt = 'Lübars';}
if(city == 65){var stadt = 'Mahlsdorf';}
if(city == 92){var stadt = 'Malchow';}
if(city == 40){var stadt = 'Mariendorf';}
if(city == 41){var stadt = 'Marienfelde';}
if(city == 83){var stadt = 'Märkisches Viertel';}
if(city == 62){var stadt = 'Marzahn';}
if(city == 84){var stadt = 'Mitte';}
if(city == 85){var stadt = 'Moabit';}
if(city == 61){var stadt = 'Müggelheim';}
if(city == 71){var stadt = 'Neu-Hohenschönhausen';}
if(city == 43){var stadt = 'Neukölln';}
if(city == 52){var stadt = 'Niederschöneweide';}						
if(city == 12){var stadt = 'Niederschönhausen';}							
if(city == 35){var stadt = 'Nikolassee';}						
if(city == 56){var stadt = 'Oberschöneweide';}							
if(city == 8){var stadt = 'Pankow';}							
if(city == 49){var stadt = 'Plänterwald';}							
if(city == 3){var stadt = 'Prenzlauer Berg';}							
if(city == 59){var stadt = 'Rahnsdorf';}							
if(city == 75){var stadt = 'Reinickendorf';}							
if(city == 13){var stadt = 'Rosenthal';}						
if(city == 46){var stadt = 'Rudow';}								
if(city == 74){var stadt = 'Rummelsberg';}								
if(city == 16){var stadt = 'Schmargendorf';}								
if(city == 93){var stadt = 'Schmöckwitz';}								
if(city == 37){var stadt = 'Schöneberg';}							
if(city == 23){var stadt = 'Siemensstadt';}								
if(city == 21){var stadt = 'Spandau';}				
if(city == 24){var stadt = 'Staaken';}			
if(city == 30){var stadt = 'Steglitz';}				
if(city == 76){var stadt = 'Tegel';}					
if(city == 39){var stadt = 'Tempelhof';}					
if(city == 87){var stadt = 'Tiergarten';}					
if(city == 80){var stadt = 'Waidmannslust';}				
if(city == 36){var stadt = 'Wannsee';}						
if(city == 91){var stadt = 'Wartenberg';}						
if(city == 88){var stadt = 'Wedding';}							
if(city == 4){var stadt = 'Weißensee';}						
if(city == 18){var stadt = 'Westend';}				
if(city == 29){var stadt = 'Wilhelmstadt';}					
if(city == 15){var stadt = 'Wilmersdorf';}						
if(city == 82){var stadt = 'Wittenau';}
if(city == 33){var stadt = 'Zehlendorf';}
}


if (url.indexOf("clodogame.fr")>=0) {
if(city == 10){var stadt = '10eme ';}		
if(city == 11){var stadt = '11eme ';}	
if(city == 12){var stadt = '12eme ';}	
if(city == 13){var stadt = '13eme ';}	
if(city == 14){var stadt = '14eme ';}	
if(city == 15){var stadt = '15eme ';}	
if(city == 16){var stadt = '16eme ';}	
if(city == 17){var stadt = '17eme ';}	
if(city == 18){var stadt = '18eme ';}	
if(city == 19){var stadt = '19eme ';}	
if(city == 1) {var stadt = '1er   ';}
if(city == 20){var stadt = '20eme ';}	
if(city == 2) {var stadt = '2eme  ';}	
if(city == 3) {var stadt = '3eme  ';}	
if(city == 4) {var stadt = '4eme  ';}	
if(city == 5) {var stadt = '5eme  ';}	
if(city == 6) {var stadt = '6eme  ';}	
if(city == 7) {var stadt = '7eme  ';}	
if(city == 8) {var stadt = '8eme  ';}	
if(city == 9) {var stadt = '9eme  ';}	
}


if (url.indexOf("menelgame.pl")>=0) {
if(city == 1) {var stadt = 'Bemowo ';}
if(city == 2) {var stadt = 'Bialoleka ';}	
if(city == 3) {var stadt = 'Bielany';}	
if(city == 4) {var stadt = 'Mokotow ';}	
if(city == 5) {var stadt = 'Ochota ';}	
if(city == 7) {var stadt = 'Praga Polnoc ';}	
if(city == 6) {var stadt = 'Praga Poludnie ';}	
if(city == 8) {var stadt = 'Rembertow ';}	
if(city == 9) {var stadt = 'Srodmiescie ';}	
if(city == 10) {var stadt = 'Targowe ';}
if(city == 11) {var stadt = 'Ursus ';}
if(city == 12) {var stadt = 'Ursynow ';}	
if(city == 13) {var stadt = 'Wawer ';}	
if(city == 14) {var stadt = 'Wesola';}	
if(city == 15) {var stadt = 'Wilanow ';}
if(city == 17) {var stadt = 'Wola ';}	
if(city == 16) {var stadt = 'Wlochy ';}
if(city == 18) {var stadt = 'Żoliborz ';}
}






















































		var k=0;
		for (k=0; k<vect.length; k++) {
		if (vect[k][0] == 0){																	 
		vect[k][0] = cash;
		vect[k][1] = points;
		vect[k][2] = name;
		vect[k][3] = iduser;		
		vect[k][4] = gangid;		
		vect[k][5] = gang;
		vect[k][6] = stadt;
		vect[k][7] = platz;		
		vect[k][8] = rankingpoints;		
		vect[k][9] = reg;
		break;
		}else if (vect[k][0] < cash){																			
		var cash_temp = vect[k][0];
		var points_temp = vect[k][1];
		var name_temp = vect[k][2];
		var userid_temp = vect[k][3];
		var gangid_temp = vect[k][4];
		var gang_temp = vect[k][5];
																	
		vect[k][0] = cash;
		vect[k][1] = points;
		vect[k][2] = name;
		vect[k][3] = iduser;		
		vect[k][4] = gangid;		
		vect[k][5] = gang;	
																	
		cash = cash_temp;
		points = points_temp;
		name = name_temp;
		iduser = userid_temp;		
		gangid = gangid_temp;		
		gang = gang_temp;
}
}										
}
}catch(err){}						
comprobarFin(pantalla, vect);
}});
}else{
comprobarFin(pantalla, vect);
}
}
}});
}
}
}


function comprobarFin(pantalla, vect){
	var mostrado = GM_getValue("mostrado");
	var numCalls = GM_getValue("numCalls");
	var numPantallas = GM_getValue("numPantallas");
	var totalMendigos = GM_getValue("totalMendigos");										        		
	var percent = Math.floor(((numCalls * 100) / totalMendigos));
															
	refreshProcessBar(percent);
	
	if ((numCalls == totalMendigos) && !mostrado){															
		mostrarVector(vect, pantalla);
	}
	GM_setValue("numCalls", numCalls + 1);
}


function refreshProcessBar(percent){	
	try{
		var span = document.getElementById('nivelproceso');
		span.innerHTML = percent + '% ';
		
		var div = document.getElementById('barra');
		div.setAttribute('style', 'width: ' + percent + '%');
	}catch(e){}
}

function fclick(ev) {	
	mostrarVector(vect, pantalla);	
}



function mostrarVector(vect, pantalla){		
	GM_setValue("mostrado", true);
	var mytr = pantalla.getElementsByTagName('tr')[8];		
	var divToDel = document.getElementById('searchingdiv');		  
	mytr.cells[0].removeChild(divToDel);
	divToDel = document.getElementById('botondiv');
	mytr.cells[0].removeChild(divToDel);
	var table_new = crearTabla(vect);
	mytr.cells[0].appendChild(table_new);	
}



function crearTabla(vect) {
    var table = document.createElement('table');
    table.id = 'pijos';
	table.border = '0';
	table.setAttribute('width', '770px');
	table.setAttribute('cellpadding', '1');
	table.setAttribute('cellspacing', '0');	 
	table.setAttribute('bgcolor', '#363636');
	table.setAttribute('style', '-moz-border-radius: 2px;');
	
	var td_0_0 = document.createElement('td');
	td_0_0.style.width = '150px';
	td_0_0.setAttribute('bgcolor', '#232323');
	td_0_0.innerHTML = '<strong>Pennername</strong>';

	var td_0_1 = document.createElement('td');
	td_0_1.style.width = '80px';
	td_0_1.setAttribute('bgcolor', '#232323');
	td_0_1.innerHTML = '<strong>Geld</strong>';

	var td_0_2 = document.createElement('td');
	td_0_2.style.width = '150px';
	td_0_2.setAttribute('bgcolor', '#232323');
	td_0_2.innerHTML = '<strong>Bande</strong>';
	
	var td_0_4 = document.createElement('td');
	td_0_4.style.width = '80px';
	td_0_4.setAttribute('bgcolor', '#232323');
	td_0_4.innerHTML = '<strong>Stadt</strong>';

	var td_0_5 = document.createElement('td');
	td_0_5.style.width = '80px';
	td_0_5.setAttribute('bgcolor', '#232323');
	td_0_5.innerHTML = '<strong>Platz</strong>';

	var td_0_6 = document.createElement('td');
	td_0_6.style.width = '20px';
	td_0_6.setAttribute('bgcolor', '#232323');
	td_0_6.innerHTML = '<strong>R</strong>';

	var td_0_7 = document.createElement('td');
	td_0_7.style.width = '80px';
	td_0_7.setAttribute('bgcolor', '#232323');
	td_0_7.innerHTML = '<strong>Regdatum</strong>';

	var td_0_3 = document.createElement('td');
	td_0_3.style.width = '130px';
	td_0_3.setAttribute('bgcolor', '#232323');
	td_0_3.innerHTML = '<strong>Punkte  &nbsp;&nbsp;      Fight   &nbsp;&nbsp;     Sms  ';

    	header = document.createElement('tr');
	header.appendChild(td_0_0);
	header.appendChild(td_0_1);
	header.appendChild(td_0_2);
	header.appendChild(td_0_3);
  	header.appendChild(td_0_4);
	header.appendChild(td_0_5);
	header.appendChild(td_0_6);
  	header.appendChild(td_0_7);
	table.appendChild(header);
    	var i=0;
	for (i=0; i<vect.length; i++) {
		td1 = document.createElement('td');
		insertMendigo(td1, vect[i][3], vect[i][2]);

       	        td2 = document.createElement('td');
		insertCash(td2, vect[i][0]);

		td3 = document.createElement('td');
		insertBanda(td3, vect[i][4], vect[i][5]);

		td4 = document.createElement('td');
		insertPoints(td4, vect[i][1], vect[i][3], vect[i][2], vect[i][6]);
		
		td5 = document.createElement('td');
		insertstadt(td5, vect[i][6]);
		

		td6 = document.createElement('td');
		insertstadt(td6, vect[i][7]);

		td7 = document.createElement('td');
		insertstadt(td7, vect[i][8]);

		td8 = document.createElement('td');
		insertstadt(td8, vect[i][9]);

        	tr = document.createElement('tr');
        	tr.id = vect[i][3];
        	tr.setAttribute('style', '-moz-border-radius: 2px;');
        	tr.setAttribute('onMouseOut', "table_out('" + vect[i][3] + "');");
        	tr.setAttribute('onMouseOver', "table_hover('" + vect[i][3] + "');");		
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);		
		tr.appendChild(td6);
		tr.appendChild(td7);
		tr.appendChild(td8);
		table.appendChild(tr);
	}
	return table;
}



function insertMendigo(mytd, iduser, name){	
mytd.innerHTML = '<a href="/profil/id:' + iduser + '/">' + name + '</a>';
}

function insertBanda(mytd, gangid, gang){
mytd.innerHTML = '<a href="/profil/bande:' + gangid + '/">' + gang + '</a>';
}

function insertPoints(mytd, points, iduser, name, online){
mytd.innerHTML = points + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/fight/?to=' + name + '"><img src="http://media.pennergame.de/img/att.gif"></a>     &nbsp;&nbsp;&nbsp;&nbsp;<a href="/messages/write/?to='+iduser+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
}


function insertstadt(mytd, stadt)
{mytd.innerHTML = stadt;}

function insertstadt(mytd, platz)
{mytd.innerHTML = platz;}

function insertstadt(mytd, rankingpoints)
{mytd.innerHTML = rankingpoints;}

function insertstadt(mytd, reg){
mytd.innerHTML = reg;
}




function insertCash(mytd, cash){

if (cash >= 300000 && cash <= 500000) {
var farbegeld = "yellow";

}else if (cash >= 500100 && cash <= 1000000) {
var farbegeld = "orange";

}else if (cash >= 1000100 && cash <= 1500000){
var farbegeld = "green";
  
}else if (cash >= 1500100 && cash <= 10000000){
var farbegeld = "red";

}else if (cash >= 10000100 && cash <= 20000000){
var farbegeld = "blue";

}else if (cash >20000100){
var farbegeld = "black";} 

var casha = cash/100;
mytd.innerHTML = '<font style=\"color:'+farbegeld+'; font-size:100%;\"> '+casha+' &euro; </font>';
}








































/*















function insertCash(mytd, cash){









cash = cash + "";
if (cash >= 300000 && cash <= 500000) {
mytd.style.color = "#00FFFF";
mytd.style.fontWeight = "bold";
}else if (cash >= 500100 && cash <= 1000000) 
{mytd.style.color = "#00FF00";
		mytd.style.fontWeight = "bold";
	}
	else if (cash >= 1000100 && cash <= 1500000)
	{
		mytd.style.color = "#FFAA00";
		mytd.style.fontWeight = "bold";
	}
	else if (cash >1500100) 
	{
		mytd.style.color = "#FFFF00";
		mytd.style.fontWeight = "bold";
	}   

mytd.innerHTML = reg;


<font style=\"color:orange; font-size:150%;\">









 			
	if(cash.length >= 9)
	{
		mytd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) +""+"&nbsp;&nbsp;</div>";
	}
	else if (cash.length>=6)
	{
		mytd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + ""+ "&nbsp;&nbsp;</div>";
	}
	else if(cash.length>2)
	{
		mytd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "&nbsp;&nbsp;</div>";
	}
	else if(cash.length==2)
	{
		mytd.innerHTML = '<div align="right">&euro;0,' + cash + ""+ "&nbsp;&nbsp;</div>";
	}
	else if(cash== -1)
	{
		mytd.innerHTML = '<div align="right">-&nbsp;&nbsp;</div>';
	}
	else 
	{
		mytd.innerHTML = '<div align="right">&euro;0,0' + cash + ""+ "&nbsp;&nbsp;</div>";
	}
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
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/25834.jpg'){var petname = 'Nashorn';}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/14896.jpg'){var petname = 'Eisb&auml;r';}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/12536.jpg'){var petname = '&Auml;ffchen';}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/43703.jpg'){var petname = 'Tiger';}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/73953.jpg'){var petname = 'Krokodil';}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/98962.jpg'){var petname  = "Giraffe";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/64220.jpg'){var petname  = "Nilpferd";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/90385.jpg'){var petname  = "Pferd";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/32563.jpg'){var petname  = "Chihuahua";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/62456.jpg'){var petname  = "Cockerspaniel";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/15240.jpg'){var petname  = "Pitbull";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/09051.jpg'){var petname  = "Sch&auml;ferhund";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/48263.jpg'){var petname  = "Adler";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/12758.jpg'){var petname  = "Pudel";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/62474.jpg'){var petname  = "Hausziege";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/61402.jpg'){var petname  = "Schlange";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/89386.jpg'){var petname  = "Falke";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/73735.jpg'){var petname  = "Katze";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/21903.jpg'){var petname  = "Frettchen";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/77310.jpg'){var petname  = "Hase";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/73684.jpg'){var petname  = "Ratte";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/31451.jpg'){var petname  = "Taube";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/52483.jpg'){var petname  = "Wellensittich";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/73308.jpg'){var petname  = "Hamster";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/11836.jpg'){var petname  = "Maus";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/68930.jpg'){var petname  = "Goldfisch";}
        else if(hausi2 == 'http://media.pennergame.de/img/tiere/00001.jpg'){var petname  = "Kakerlake";}
	else if(hausi2 == 'http://media.pennergame.de/img/tiere/73933.jpg'){var petname = "Dressierte Maus";}

	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48264.jpg'){var petname = "Silberfisch";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/75284.jpg'){var petname = "Grasfrosch";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/92653.jpg'){var petname = "Rotkelchen";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/02634.jpg'){var petname = "Clownfisch";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/01743.jpg'){var petname = "Erdm&auml;nnchen";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11542.jpg'){var petname = "M&ouml;we";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/66294.jpg'){var petname = "Opossum";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11634.jpg'){var petname = "Streifenh&ouml;rnchen";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11743.jpg'){var petname = "Igel";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/47838.jpg'){var petname = "Hausschwein";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/94652.jpg'){var petname = "Schneeeule";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/65384.jpg'){var petname = "Bisamratte";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/18540.jpg'){var petname = "Moorschnucke";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/76538.jpg'){var petname = "Yorkshire Terrier";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/64133.jpg'){var petname = "Habicht";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48256.jpg'){var petname = "Australian Shepard";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/98641.jpg'){var petname = "Deutsche Dogge";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/28463.jpg'){var petname = "Golden Retriver";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/32563.jpg'){var petname = "Mops";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/96242.jpg'){var petname = "Elch";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/85242.jpg'){var petname = "Zebra";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/99624.jpg'){var petname = "Kamel";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/13323.jpg'){var petname = "Riesenschildkr&ouml;te";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/83290.jpg'){var petname = "Leopard";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/37551.jpg'){var petname = "Waschb&auml;r";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73933.jpg'){var petname = "Maus (Geld)";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/88643.jpg'){var petname = "Tapire";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73526.jpg'){var petname = "T-Rex";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/16342.jpg'){var petname = "Berliner b&auml;r";}
	else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73933.jpg'){var petname = "Dressierte Maus";}
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
}});

*/
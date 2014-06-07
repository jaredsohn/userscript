// ==UserScript==
// @name           BandenprofilSuperScript(2b) By Basti1012 berlin hamburg 
// @namespace      Bandeprofilscript mit umrechner auf 3 uhr und zeigt an wie der fight status ist 
// @author         basti1012 pennerhack.foren-city.de
// @description    Erweitert die Bandenprofilansicht in tabellen form fuer bessere und leichtere uebersicht und co 
// @include        *pennergame.de/profil/bande:*
// @include        *dossergame.co.uk/profil/bande:*
// @include        *menelgame.pl/profil/bande:*
// @include        *clodogame.fr/profil/bande:*
// @include        *mendigogame.es/profil/bande:*
// @include        *pennergame.de/profil/bande:*
// ==/UserScript==
if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var version = 'berlin';

var cache ='/cache/bl_DE/gang/';
var signatur = "http://imgberlin.pennergame.de/cache/bl_DE/signaturen/";
  var link = 'http://berlin.pennergame.de/';
 }
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var version = 'dossergame';
var signatur = "http://img.pennergame.de/cache/uk_UK/signaturen/";
  var link = 'http://www.dossergame.co.uk/';
 }
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var version = 'hamburg';
var cache ='/cache/de_DE/gang/';
var signatur = "http://img.pennergame.de/cache/de_DE/signaturen/";
  var link = 'http://www.pennergame.de/';
 }
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var version = 'menelgame';
var signatur = "http://img.pennergame.de/cache/pl_PL/signaturen/";
  var link = 'http://www.menelgame.pl/';
  }
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var version = 'clodogame';
var signatur = "http://img.pennergame.de/cache/fr_FR/signaturen/";
  var link = 'http://www.clodogame.fr/';
 }
else if(document.location.href.indexOf('mendigogame.es/')>=0) {
  var version = 'mendigogame';
var signatur = "http://img.pennergame.de/cache/es_ES/signaturen/";
  var link = 'http://www.mendigogame.es/';
 };

var ssss = document.getElementById("content");
var id1 = ssss.innerHTML.split(''+cache+'')[1].split('.jpg')[0];
var AAAA = document.getElementsByTagName("table")[2];

GM_xmlhttpRequest({
    	method: 'GET',
   	url: ''+link+'/overview/',
		onload: function( response ) {
		var content = response.responseText;
		var userpoints = content.split('/highscore/range/?min_points=')[1].split('&')[0];
		var angriffmax = Math.floor(userpoints*1.5);
		var angriffmin = Math.floor(userpoints*0.8);
		GM_setValue("angriffmax",angriffmax);
		GM_setValue("angriffmin",angriffmin);
		GM_setValue("userpoints",userpoints);	
	}
});

GM_xmlhttpRequest({
 	method: 'GET',
   	url: ''+link+'/dev/api/gang.'+id1+'.xml',
	onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var id = dom.getElementsByTagName('id')[0].textContent;
 		var name = dom.getElementsByTagName('name')[0].textContent;
 		var founder = dom.getElementsByTagName('founder')[0].textContent;
 		var points = dom.getElementsByTagName('points')[0].textContent;
 		var position = dom.getElementsByTagName('position')[0].textContent;
 		var member_count = dom.getElementsByTagName('member_count')[0].textContent;
 		var member = dom.getElementsByTagName('member')[0].textContent;

var detailsa = ''+
'<span style=\"color:white; font-size:150%;\"><b>Diese Bande :</b></span><span style=\"color:green; font-size:150%;\"><b>'+name+'</b></span>'
+'<span style=\"color:white; font-size:150%;\"><b>Mit Dieser id :</b></span><span style=\"color:green; font-size:150%;\"><b>'+id+'</b></span>'
+'<span style=\"color:white; font-size:150%;\"><b>Banden Hersteller :</b></span><span style=\"color:green; font-size:150%;\"><b>'+founder+'</b></span>'
+'<span style=\"color:white; font-size:150%;\"><b>Punkte :</b></span><span style=\"color:green; font-size:150%;\"><b>'+points+'</b></span>'
+'<br><span style=\"color:white; font-size:150%;\"><b>Platz :</b></span><span style=\"color:green; font-size:150%;\"><b>'+position+'</b></span>'
+'<span style=\"color:white; font-size:150%;\"><b>Mitglieder:</b></span><span style=\"color:green; font-size:150%;\"><b>'+member_count+'</b></span>';

var details = '<table class="list" border="1" width="1080"><tbody><tr>'
+'<th align="center" width="100">'+detailsa+'</th></tr> ';

AAAA.innerHTML = ''+details+'<br><table class="list" border="1" width="1080"><tbody>'
	+'<tr><th align="center" width="80">Punkte</th>'
	+'<th align="center" width="80">3-Uhr</th>'
	+'<th scope="col" align="center" width="220">Name</th>'
	+'<th scope="col" align="center" width="100">Stadt</th>'
	+'<th scope="col" align="center" width="100">Geld</th>'
	+'<th align="center" width="100">Promille</th>'
	+'<th align="center" width="120">Tier</th>'
	+'<th align="center" width="80">Reg </th>'
	+'<th align="center" width="20">Status</th>'
	+'<th align="center" width="40">on/ge</th>'
	+'<th align="center" width="20">figh</th>'
	+'<th align="center" width="20">sms</th>'
	+'<th align="center" width="100">info</th></tr> ';
x=1;
scannen(x);
}});

function scannen(x){
if(x<=30){
try{
i=x-Number(1);
 GM_xmlhttpRequest({
 	method: 'GET',
   	url: ''+link+'/dev/api/gang.'+id1+'.xml',
	onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
 		//var member = dom.getElementsByTagName('member')[x].textContent;
 		var id = dom.getElementsByTagName('id')[x].textContent;
 		var name = dom.getElementsByTagName('name')[x].textContent;
 		var statusa = dom.getElementsByTagName('status')[i].textContent;

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   api daten >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 		GM_xmlhttpRequest({
 			method: 'GET',
   			url: ''+link+'/dev/api/user.'+id+'.xml',
				onload: function(responseDetails) {
       					  var parser = new DOMParser();
       					  var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
 					  var ida = dom.getElementsByTagName('id')[0].textContent;
 					  var namea = dom.getElementsByTagName('name')[0].textContent;
				try{
					var reg = dom.getElementsByTagName('reg_since')[0].textContent;
					var points = dom.getElementsByTagName('points')[0].textContent;
				}catch(e){
					var reg = 'Gel&ouml;scht';
					var points = 'Gel&ouml;scht';
				}

			try{
				var cash = dom.getElementsByTagName('cash')[0].textContent/100;
			}catch(e){
				var cash = '-----';
			}

message = '<a href="/messages/write/?to='+id+'" target="_top"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a>';
fight = '<a href="/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';

if (statusa==3) {var status = '<img src="http://media.pennergame.de/img/bande/admin.gif">';//<font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
}else if (statusa==2) {var status = '<img src="http://media.pennergame.de/img/bande/coadmin.gif">';//<font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
}else if (statusa==1) {var status = '<img src="http://media.pennergame.de/img/bande/member.gif">';//<font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
}else if (statusa==0) {var status = 'No Bande';};

if (cash <= 1){farbe = "white";}
if (cash >= 11){var farbe = "#F91805";}
if (cash >= 111){var farbe = "#EE4611";}
if (cash >= 1111){var farbe = "#F6A008";}
if (cash >= 11111){var farbe = "#D9EA14";}
if (cash >= 22222){var farbe = "#0EF905";}
if (cash >= 55555){var farbe = "#450FEF";}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://highscore.pennergame.de/highscore/search/?name='+namea+'',
		onload: function( response ) {
		var content = response.responseText;
try{
		var Zeile = content.split('class="zeileB">')[1].split('</tr>')[0];
		var dreiuhr = Zeile.split('valign="bottom" >')[4].split('&')[0];
}catch(e){

var dreiuhr ='0';
}






 GM_xmlhttpRequest({
  	method: 'GET',
	url: ''+link+'/profil/id:'+id+'/',
	onload: function(responseDetails) {
         var profil = responseDetails.responseText;

var suche = profil.search("/premiummedia/img/premium/styles/swf/");
if (suche != -1) {
var stadtteil = '<font style=\"color:red; font-size:105%;\"><b>P-Profil</b></font>';
//AAAA.setAttribute('style', 'background:red;');
var test = 'green';
}else{


		try{
			var stadtteil3 = profil.split('Stadtteil')[1];
			var stadtteil2 = stadtteil3.split('">')[1];
			var stadtteil = stadtteil2.split('<')[0];
		}catch(e){
			var stadtteil = '<font style=\"color:black; font-size:150%;\"><b>geloescht</b></font>';
		}
}





var suche = profil.search("Ist gerade Online");
		try{
			if (suche != -1) {
				var online = "<img src='http://media.pennergame.de/img/on.gif'></img>";
				}
			else {
				var online = "<img src='http://media.pennergame.de/img/off.gif'></img>";
			};
			}catch(e){}

	try {
		var geschlecht2 = profil.split('<img src="http://media.pennergame.de/img/profilseite/')[1];
		var geschlecht  = geschlecht2.split('.jpg"')[0];
	} catch(err) {
		var geschlecht ='Kein geschlecht';
	}   
		var geschlecht_image = '<div style="display:inline-block;"><img src="http://media.pennergame.de/img/profilseite/' + geschlecht + '.jpg" height="12" width="12"></img></div>';

try {
	var stadtteil3 = profil.split('<strong>&nbsp;Punkte</strong></td>')[1];
	var a = stadtteil3.split('<td height="24" colspan="4" bgcolor')[0];
	var b = a.split('<img src="')[1];
	var hausi2 = b.split('"></div>')[0];


if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48264.jpg'){
var petname = "Silberfisch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/75284.jpg'){
var petname = "Grasfrosch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/92653.jpg'){
var petname = "Rotkelchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/02634.jpg'){
var petname = "Clownfisch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/01743.jpg'){
var petname = "Erdm?nnchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11542.jpg'){
var petname = "M?we";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/66294.jpg'){
var petname = "Opossum";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11634.jpg'){
var petname = "Streifenh?rnchen";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/11743.jpg'){
var petname = "Igel";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/47838.jpg'){
var petname = "Hausschwein";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/94652.jpg'){
var petname = "Schneeeule";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/65384.jpg'){
var petname = "Bisamratte";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/18540.jpg'){
var petname = "Moorschnucke";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/76538.jpg'){
var petname = "Yorkshire Terrier";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/64133.jpg'){
var petname = "Habicht";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48256.jpg'){
var petname = "Collie";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/98641.jpg'){
var petname = "Dogge";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/28463.jpg'){
var petname = "Retriever";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/32563.jpg'){
var petname = "Mops";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/96242.jpg'){
var petname = "Elch";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/85242.jpg'){
var petname = "Zebra";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/99624.jpg'){
var petname = "Kamel";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/13323.jpg'){
var petname = "Riesenschildkr?te";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/83290.jpg'){
var petname = "Leopard";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/37551.jpg'){
var petname = "Waschb?r";}
else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73933.jpg'){
var petname = "Maus (Geld)";}

else if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg'){
var petname = 'Elefant';}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/25834.jpg'){
var petname = 'Nashorn';}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/14896.jpg')
{var petname = 'Eisb&auml;r';}
else if(hausi2 =='http://media.pennergame.de/img/tiere/12536.jpg')
{var petname = '&Auml;ffchen';}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/43703.jpg')
{var petname = 'Tiger';}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/73953.jpg')
{var petname = 'Krokodil';}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/98962.jpg')
{var petname  = "Giraffe";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/64220.jpg')
{var petname  = "Nilpferd";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/90385.jpg')
{var petname  = "Pferd";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/32563.jpg')
{var petname  = "Chihuahua";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/62456.jpg')
{var petname  = "Cockerspaniel";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/15240.jpg')
{var petname  = "Pitbull";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/09051.jpg')
{var petname  = "Sch&auml;ferhund";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/48263.jpg')
{var petname  = "Adler";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/12758.jpg')
{var petname  = "Pudel";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/62474.jpg')
{var petname  = "Hausziege";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/61402.jpg')
{var petname  = "Schlange";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/89386.jpg')
{var petname  = "Falke";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/73735.jpg')
{var petname  = "Katze";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/21903.jpg')
{var petname  = "Frettchen";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/77310.jpg')
{var petname  = "Hase";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/73684.jpg')
{var petname  = "Ratte";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/31451.jpg')
{var petname  = "Taube";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/52483.jpg')
{var petname  = "Wellensittich";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/73308.jpg')
{var petname  = "Hamster";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/11836.jpg')
{var petname  = "Maus";
}else if(hausi2 == 'http://media.pennergame.de/img/tiere/68930.jpg')
{var petname  = "Goldfisch";}
else if(hausi2 == 'http://media.pennergame.de/img/tiere/00001.jpg'){
var petname  = "Kakerlake";} 
else {var petname = '<em>Premium</em>';}				
	} catch (err) {
	var petname = '-----';
}

try{
promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="'+signatur+''+id+'.jpg"></div>';
}catch(e){
promillee='-----';
}

var suche = profil.search("oder vom Spiel verbannt");
if (suche != -1) {
//AAAA.setAttribute('style', 'background:red;');
var test = 'red';
var loescher = '<font style=\"color:red; font-size:100%;\"><b>Gel&ouml;scht</b></font>';
}else{
var loescher = '<font style=\"color:green; font-size:100%;\"><b>Aktiv</b></font>';
}

var maxatt = Math.floor(points*1.5);
var minatt = Math.floor(points*0.8);

if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
var color = "#DF3918"; 
}
if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
var color = "#99CC00"; 
}
neu = points-dreiuhr;

if(neu>0){
var punkti = '<font style=\"color:green; font-size:100%;\"><b>'+neu+'</b></font>';
}else
if(neu<0){
var punkti = '<font style=\"color:red; font-size:100%;\"><b>'+neu+'</b></font>';
}else
if(neu==0){
var punkti = '<font style=\"color:yellow; font-size:100%;\"><b>'+neu+'</b></font>';
}







		AAAA.innerHTML += '<table class="list" border="1" width="1080"><tbody><tr bgcolor="'+test+'">'
		+'<th align="left" width="80"><font style=\"color:'+color+'; font-size:100%;\"><b>'+points+'</b></font></th>'
		+'<th align="left" width="80">'+punkti+'</th>'
		+'<th align="left" width="220"><a href="'+link+'/profil/id:'+id+'/">'+name+'</a></th>'
		+'<th align="left" width="100">'+stadtteil+'</th>'
		+'<th align="left" width="100"><font style=\"color:'+farbe+'; font-size:100%;\"><b>'+cash+'</b></font></th>'
		+'<th align="left" width="100">'+promillee+'</th>'
		+'<th align="left" width="120">'+petname+'</th>'
		+'<th align="left" width="80">'+reg+'</th>'
		+'<th align="left" width="20">'+status+'</th>'
		+'<th align="left" width="40">'+geschlecht_image+''+online+'</th>'
		+'<th align="left" width="20">'+fight+'</th>'
		+'<th align="left" width="20">'+message+'</th>'
		+'<th align="left" width="100">'+loescher+'</th>'
		+'</tr></tr></tbody></table>';
x++;
scannen(x);
}});
}});
}});
}});
}catch(e){}
}
}
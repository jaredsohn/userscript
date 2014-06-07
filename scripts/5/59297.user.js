// ==UserScript==
// @name downfight.de 6a pennergame 4.0 (button version ) 
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description downfight fuer pennergame version 5 b  
// @include http://www.pennergame.de/highscore/*
// ==/UserScript==



GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('<a href="/profil/id:')[2];
			var userid = text1.split('/">')[0];

			var userp = content.split('src="http://www.pennergame.de/headline/')[2];
			var userpoints = userp.split('/?size=34"')[0];


      var angriffmax = Math.floor(userpoints*1.5);
      var angriffmin = Math.floor(userpoints*0.8);
      
      GM_setValue("angriffmax",angriffmax);
      GM_setValue("angriffmin",angriffmin);
      GM_setValue("userpoints",userpoints);


}});

















var pgnormal = 'http://www.pennergame.de/';






var table = document.getElementById('nav-2');
table.innerHTML += '<li><a name="Bandensuche" id="Bandensuche" alt="Bandensuche" title="Pennergame Spam" <span class="btn-right"><span class="btn-left">Downfight gegner suchen</span></span></a></li>';
document.getElementById('Bandensuche').addEventListener('click', function Bandensuches() {







GM_xmlhttpRequest({
  method: 'GET',
  url: ''+pgnormal+'/overview/',
      onload: function( response ) {
      	var content = response.responseText;
      	var att = content.split('<span class="att">')[1].split('</span>')[0];
     	var def = content.split('<span class="def">')[1].split('</span>')[0];
	var feld = content.split('<div class="display_punkte">')[1];
	var feld1 = feld.split('</div>')[0];
				try{
				var min2 = feld1.split('min_points=')[1];
				var min1 = min2.split('&')[0];
				var max = Math.round(min1*1.5);
				var min = Math.round(min1*0.8);
				}catch(e){
				var min2 = feld1.split('/headline/')[1];
				var min1 = min2.split('/?size=34"')[0];
				var max = Math.round(min1*1.5);
				var min = Math.round(min1*0.8);
				}
				GM_setValue("min" , min);
				GM_setValue("max" , max);
				GM_setValue("att" , att);
				GM_setValue("def" , def);
				

var tr = document.getElementsByClassName('zrelative sitdown')[0];
tr.innerHTML = 'Bei Downfight und Upfight muss Minimum, Maximum ,Att ,und Def werte angegeben werden und die Stadt wo ihr suchen wollt<br> Bei Freiheits-betr&uuml;ger und bei Stufe 5 muss man nur das ankicken ws man suchen will alles andere wie stadt und alles andere ist notwendig .ZB einfach freiheits fighter ankicken dann auf suche klicken das reicht und es werden bei allen suchen maximal 100 Gegner angezeigt .Achtung die auslaendischen pennergames gibt es kaum leute die bei downfight sind deswegen wird man da kaum ein finden .aber berlin hamburg ist eigentlich immer einer zu finden<br>Mfg Basti1012<br>'





+'<input type="button" id="zockhamburg" name="zockhamburg" value="zockhamburg">'
+'<input type="button" id="zockberlin" name="zockberlin" value="zockberlin">'
+'<input type="button" id="Freiheitsk" name="Freiheitsk" value="Freiheitsk&auml;mpfer">'
+'<input type="button" id="Stufe5Killer" name="Stufe5Killer" value="Stufe 5 Killer">'
+'<input type="button" id="Listederbetr" name="Listederbetr" value="Liste der betr&uuml;ger"><br>'
+'<input type="button" id="Upfighterberlin" name="Upfighterberlin" value="Upfighterberlin">'
+'<input type="button" id="Downfighterberlin" name="Downfighterberlin" value="Downfighterberlin"><br>'
+'<input type="button" id="Upfighterhamburg" name="Upfighterhamburg" value="Upfighterhamburg">'
+'<input type="button" id="Downfighterhamburg" name="Downfighterhamburg" value="Downfighterhamburg"><br>'
+'<input type="button" id="Upfighterdosser" name="Upfighterdosser" value="Upfighterdossergame">'
+'<input type="button" id="Downfighterdosser" name="Downfighterdosser" value="Downfighterdossergame"><br>'
+'<input type="button" id="Upfightermenelgame" name="Upfightermenelgame" value="Upfightermenelgame">'
+'<input type="button" id="Downfightermenelgame" name="Downfightermenelgame" value="Downfightermenelgame"><br>'
+'<input type="button" id="Upfighterclodo" name="Upfighterclodo" value="Upfighterclodogame">'
+'<input type="button" id="Downfighterclodo" name="Downfighterclodo" value="Downfighterclodogame"><br>'
+'<input type="button" id="Upfightermendigo" name="Upfightermendigo" value="Upfightermendigogame">'
+'<input type="button" id="Downfightermendigo" name="Downfightermendigo" value="Downfightermendigogame"><br>'

+'<div align="left" name="test" id="test"></div>'
+'<div align="left" name="StadtIdInfo" id="StadtIdInfo"></div>'
+'<div align="left" name="spalteins" id="spalteins"></div>';




// --------------------------------------------    Zock fighten -----------------------------------------


document.getElementsByName('zockhamburg')[0].addEventListener('click', function zockhamburg () {
var zocklink = 'http://downfight.de/?seite=listehhzock';
var pg = 'http://www.pennergame.de/';
var wat = 'Pennergame Hamburg';
zock(zocklink,pg,wat);
},false);

document.getElementsByName('zockberlin')[0].addEventListener('click', function zockberlin () {
var zocklink = 'http://downfight.de/?seite=listebzock';
var pg = 'http://www.berlin.pennergame.de/';
var wat = 'Pennergame Berlin';
zock(zocklink,pg,wat);
},false);

function zock(zocklink,pg,wat){
document.getElementsByName('spalteins')[0].innerHTML ='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25">E</th>'
+'<th scope="col" align="center" width="50">Zeit</th>'
+'<th scope="col" align="center" width="100">Komentar/link</th>'
+'<th scope="col" align="center" width="100">Punkte</th>'
+'<th scope="col" align="center" width="70">Verlauf</th>'
+'<th scope="col" align="center" width="350">name</th>'
+'<th scope="col" align="center" width="75">SMS/fight</th></tr>';
var zocke = 'Zockfighten in '+wat+'';
GM_xmlhttpRequest({
  	method: 'GET',
	url:  ''+zocklink+'',
	onload: function(responseDetails) {
        var contenty = responseDetails.responseText;
document.getElementsByName('StadtIdInfo')[0].innerHTML = '<br><br><br>Suche in der Stadt '+pg+' Mit deinen ATT:'+att+' Dein DEF:'+def+' und mache '+zocke+'';
	try{
	var content = contenty.split('Punkteverlauf</strong>')[1].split('bgcolor="#4d3124">')[0];	
	}catch(e){}
for(i = 1; i <= 100; i++) {
		try{
			var Feld1 = content.split('<tr style')[i].split('</tr>')[0];
			var ApiId = Feld1.split('/dev/api/user.')[1].split('.xml"')[0];
			var name = Feld1.split('target="_blank">')[1].split('</a>')[0];
			var punkte = Feld1.split('align="right">')[1].split('P')[0];
			var verlauflink = Feld1.split('href="punkte')[1].split('"')[0];
			var verlauflinkbildid = verlauflink.split('kommentarid=')[1].split('&check')[0];
			var verlauflinkbildida = 'http://downfight.de/punkte_bigpicture.php?'+verlauflinkbildid+'';
			var laufzeit = Feld1.split('align="left">')[9].split('<font')[0];	
			var komentarlink = Feld1.split('href="kommentare')[1].split('"')[0];	
			var komentar = Feld1.split('align="left">')[8].split('<a')[0];	
			var test ='#272727';
			message = '<a href="'+pg+'/messages/write/?to='+ApiId+'" target="_top"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a>';
			fight = '<a href="'+pg+'/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';
			var fights2='<a class="tooltip" href="http://downfight.de/kommentare'+komentarlink+'">[Komentar]<span>'+komentar+'</span></a>';




var points=punkte;
var maxatt =    GM_getValue("angriffmax");
var minatt =  GM_getValue("angriffmin");
var userpoints = GM_getValue("userpoints");


if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
var color = "red"; 
}

if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
var color = "green"; 
}











tr.innerHTML +='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25">'+i+'</th>'
+'<th scope="col" align="center" width="25">'+laufzeit+'</th>'
//+'<th scope="col" align="center" width="25">'+profilink+'</th>'
+'<th scope="col" align="center" width="100">'+fights2+'</th>'
+'<th scope="col" align="center" width="100"><font style=\"color:'+color+'; font-size:100%;\">'+punkte+'</font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://downfight.de/punkte'+verlauflink+'">[Verlauf]<span><img src="'+verlauflinkbildida+'" border="0" height="800" width="1200"></span></a></th>'
//+'<th scope="col" align="center" width="70"><a href=http://downfight.de/punkte'+verlauflink+'>verlauf</a></th>'
+'<th scope="col" align="center" width="375"><a href='+pg+'/profil/id:'+ApiId+'/>'+name+'</a></th>'
+'<th scope="col" align="center" width="50">'+message+''+fight+'</th></tr>';
}catch(e){
var y=i-Number(1);
tr.innerHTML +='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>'+y+'</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gegner</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gefunden</b></font></th>'
+'<th scope="col" align="center" width="100"><font style=\"color:black; font-size:150%;\"><b>Mfg Basti1012</b></font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://pennerhack.foren-city.de"><font style=\"color:black; font-size:150%;\"><b>[mehr hier]</b></font><span>Mehr Scripte von mir und allen weiteren ?Pennergame Scripteschreiber findet ihr auf meiner Homepage .Klicke einfach auf mehr und fertig .Mfg basti1012</span></a></th>'
+'<th scope="col" align="center" width="100">smil</th>'
+'<th scope="col" align="center" width="375">ende</th>'
+'<th scope="col" align="center" width="50">ende</th></tr>';
break;
}}}});
}





// -------------------------------------  freiheitskampfer ---------------------------------------------------
document.getElementsByName('Freiheitsk')[0].addEventListener('click', function Zockfighter () {
document.getElementsByName('spalteins')[0].innerHTML ='<table class="list" border="1" width="750"><tbody>'
+'<tr><th scope="col" align="center" width="25">E</th>'
+'<th scope="col" align="center" width="50">kills</th>'
+'<th scope="col" align="center" width="100">Komentar/link</th>'
+'<th scope="col" align="center" width="100">welche stadt</th>'
+'<th scope="col" align="center" width="375">name</th>'
+'<th scope="col" align="center" width="100">Fight</th></tr>';

var zocke = 'Freiheitskampf ';
GM_xmlhttpRequest({
  	method: 'GET',
	url:  'http://downfight.de/?seite=listesoldaten',
	onload: function(responseDetails) {
        var contenty = responseDetails.responseText;
document.getElementsByName('StadtIdInfo')[0].innerHTML = '<br><br><br>Suche nach freiheits fighter die in Berlin und Hamburg sind ';
	try{
	var content = contenty.split('Kampfgebiet</strong>')[1].split('Fragen und Antworten')[0];	
	}catch(e){}

for(i = 1; i <= 100; i++) {


		try{
			var Feld1 = content.split('<tr style')[i].split('</tr>')[0];
			var LINKPROFIL = Feld1.split('<a href="')[1].split('"')[0];
			var name = Feld1.split('target="_blank">')[1].split('</a>')[0];
			var welchetown = Feld1.split('align="left">')[6].split('</td>')[0];	
			var kills = Feld1.split('align="left">')[1].split('</td>')[0];	
			var komentarlink = Feld1.split('href="kommentare')[1].split('"')[0];	
			var komentar = Feld1.split('align="left">')[7].split('<a')[0];	
var suche = welchetown.search("Hamburg");
if (suche != -1) {
fight = '<a href="http://pennergame.de/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';
}
else {
fight = '<a href="http://berlin.pennergame.de/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';
}
var fights2='<a class="tooltip" href="http://downfight.de/kommentare'+komentarlink+'">[Komentar]<span>'+komentar+'</span></a>';
tr.innerHTML +='<table class="list" border="1" width="750"><tbody>'
+'<tr><th scope="col" align="center" width="25">'+i+'</th>'
+'<th scope="col" align="center" width="50">'+kills+'</th>'
+'<th scope="col" align="center" width="100">'+fights2+'</th>'
+'<th scope="col" align="center" width="100">'+welchetown+'</th>'
+'<th scope="col" align="center" width="375"><a href='+LINKPROFIL+'>'+name+'</a></th>'
+'<th scope="col" align="center" width="100">'+fight+'</th></tr>';
}catch(e){
var y=i-Number(1);
tr.innerHTML +='<table class="list" border="1" width="750"><tbody>'
+'<tr><th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>'+y+'</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gegner</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gefunden</b></font></th>'
+'<th scope="col" align="center" width="100"><font style=\"color:black; font-size:150%;\"><b>Mfg Basti1012</b></font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://pennerhack.foren-city.de"><font style=\"color:black; font-size:150%;\"><b>[mehr hier]</b></font><span>Mehr Scripte von mir und allen weiteren ?Pennergame Scripteschreiber findet ihr auf meiner Homepage .Klicke einfach auf mehr und fertig .Mfg basti1012</span></a></th>'
+'<th scope="col" align="center" width="100"></th>'
+'<th scope="col" align="center" width="375">ende</th>'
+'<th scope="col" align="center" width="50">ende</th></tr>';
break;
}}}});
},false);








// -----------------------------------   stufe 5 kampfer --------------------------------------
document.getElementsByName('Stufe5Killer')[0].addEventListener('click', function Zockfighter () {


document.getElementsByName('spalteins')[0].innerHTML ='<table class="list" border="1" width="700"><tbody>'
+'<tr><th scope="col" align="center" width="25">E</th>'
+'<th scope="col" align="center" width="50">Kills</th>'
+'<th scope="col" align="center" width="100">Komentar/link</th>'
+'<th scope="col" align="center" width="100">Punkte</th>'
+'<th scope="col" align="center" width="350">name</th>'
+'<th scope="col" align="center" width="75">fight</th></tr>';

var zocke = 'Stufe 5 Killer  ';
GM_xmlhttpRequest({
  	method: 'GET',
	url:  'http://downfight.de/?seite=listestufe5highscore',
	onload: function(responseDetails) {
        var contenty = responseDetails.responseText;
document.getElementsByName('StadtIdInfo')[0].innerHTML = '<br><br><br>Suche nach Pennern die bei downfigt .de die stue 5 k&auml;mpfer ereicht haben ';
	try{
	var content = contenty.split('Kampfgebiet</strong>')[1].split('Fragen und Antworten')[0];	
	}catch(e){}
for(i = 1; i <= 100; i++) {
		try{
			var Feld1 = content.split('<tr style')[i].split('</tr>')[0];
			var LINKPROFIL = Feld1.split('<a href="')[1].split('"')[0];
			var name = Feld1.split('target="_blank">')[1].split('</a>')[0];
			var welchetown = Feld1.split('align="left">')[6].split('</td>')[0];	
			var kills = Feld1.split('align="left">')[1].split('</td>')[0];	
			var komentarlink = Feld1.split('href="kommentare')[1].split('"')[0];	
			var komentar = Feld1.split('align="left">')[8].split('<a')[0];	
var suche = welchetown.search("Hamburg");
if (suche != -1) {
fight = '<a href="http://pennergame.de/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';
}
else {
fight = '<a href="http://berlin.pennergame.de/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';
}
var fights2='<a class="tooltip" href="http://downfight.de/kommentare'+komentarlink+'">[Komentar]<span>'+komentar+'</span></a>';




tr.innerHTML +='<table class="list" border="1" width="700"><tbody>'
+'<tr><th scope="col" align="center" width="25">'+i+'</th>'
+'<th scope="col" align="center" width="50">'+kills+'</th>'
+'<th scope="col" align="center" width="100">'+fights2+'</th>'
+'<th scope="col" align="center" width="100">'+welchetown+'</th>'
+'<th scope="col" align="center" width="350"><a href='+LINKPROFIL+'>'+name+'</a></th>'
+'<th scope="col" align="center" width="75">'+fight+'</th></tr>';
}catch(e){
var y=i-Number(1);
tr.innerHTML +='<table class="list" border="1" width="700"><tbody>'
+'<tr><th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>'+y+'</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gegner</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gefunden</b></font></th>'
+'<th scope="col" align="center" width="100"><font style=\"color:black; font-size:150%;\"><b>Mfg Basti1012</b></font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://pennerhack.foren-city.de"><font style=\"color:black; font-size:150%;\"><b>[mehr hier]</b></font><span>Mehr Scripte von mir und allen weiteren ?Pennergame Scripteschreiber findet ihr auf meiner Homepage .Klicke einfach auf mehr und fertig .Mfg basti1012</span></a></th>'
+'<th scope="col" align="center" width="100"></th>'
+'<th scope="col" align="center" width="375">ende</th>'
+'<th scope="col" align="center" width="50">ende</th></tr>';
break;
}}}});
},false);






// ----------------------------- liste betrueger --------------------------------------------
document.getElementsByName('Listederbetr')[0].addEventListener('click', function Zockfighter () {

document.getElementsByName('spalteins')[0].innerHTML ='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25">E</th>'
+'<th scope="col" align="center" width="50">Zeit</th>'
+'<th scope="col" align="center" width="100">Komentar/link</th>'
+'<th scope="col" align="center" width="100">Punkte</th>'
+'<th scope="col" align="center" width="70">Verlauf</th>'
+'<th scope="col" align="center" width="375">Betr&uuml;rger</th>'
+'<th scope="col" align="center" width="50">SMS/fight</th></tr>';

GM_xmlhttpRequest({
  	method: 'GET',
	url:  'http://downfight.de/?seite=listebetrueger',
	onload: function(responseDetails) {
        var contenty = responseDetails.responseText;
document.getElementsByName('StadtIdInfo')[0].innerHTML = '<br><br><br>Suche nach leute die betr&uuml;gen und mache';
	try{
	var content = contenty.split('Punkteverlauf</strong>')[1].split('bgcolor="#4d3124">')[0];	
	}catch(e){}

for(i = 1; i <= 100; i++) {
		try{
			var Feld1 = content.split('<tr style')[i].split('</tr>')[0];
			var ApiId = Feld1.split('/dev/api/user.')[1].split('.xml"')[0];
			var name = Feld1.split('target="_blank">')[1].split('</a>')[0];
			var punkte = Feld1.split('align="right">')[1].split('P')[0];
			var verlauflink = Feld1.split('href="punkte')[1].split('"')[0];
			var pglinkbetrug = Feld1.split('href="http://')[1].split('.de')[0];
			var verlauflinkbildid = verlauflink.split('kommentarid=')[1].split('&check')[0];
			var verlauflinkbildida = 'http://downfight.de/punkte_bigpicture.php?'+verlauflinkbildid+'';
			var laufzeit = Feld1.split('align="left">')[5].split('<font')[0];	
			var komentarlink = Feld1.split('href="kommentare')[1].split('"')[0];	
			var komentar = Feld1.split('align="left">')[4].split('<a')[0];	
			message = '<a href="http://'+pglinkbetrug+'.de/messages/write/?to='+ApiId+'" target="_top"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a>';
			fight = '<a href="http://'+pglinkbetrug+'.de/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';
			var fights2='<a class="tooltip" href="http://downfight.de/kommentare'+komentarlink+'">[Komentar]<span>'+komentar+'</span></a>';



var points=punkte;
var maxatt =    GM_getValue("angriffmax");
var minatt =  GM_getValue("angriffmin");
var userpoints = GM_getValue("userpoints");


if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
var color = "red"; 
}

if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
var color = "green"; 
}







tr.innerHTML +='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25">'+i+'</th>'
+'<th scope="col" align="center" width="25">'+laufzeit+'</th>'
+'<th scope="col" align="center" width="100">'+fights2+'</th>'
+'<th scope="col" align="center" width="100"><font style=\"color:'+color+'; font-size:100%;\">'+punkte+'</font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://downfight.de/punkte'+verlauflink+'">[Verlauf]<span><img src="'+verlauflinkbildida+'" border="0" height="800" width="1200"></span></a></th>'
+'<th scope="col" align="center" width="375"><a href=http://'+pglinkbetrug+'.de/profil/id:'+ApiId+'/>'+name+'</a></th>'
+'<th scope="col" align="center" width="50">'+message+''+fight+'</th></tr>';
}catch(e){
var y=i-Number(1);
tr.innerHTML +='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>'+y+'</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gegner</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gefunden</b></font></th>'
+'<th scope="col" align="center" width="100"><font style=\"color:black; font-size:150%;\"><b>Mfg Basti1012</b></font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://pennerhack.foren-city.de"><font style=\"color:black; font-size:150%;\"><b>[mehr hier]</b></font><span>Mehr Scripte von mir und allen weiteren ?Pennergame Scripteschreiber findet ihr auf meiner Homepage .Klicke einfach auf mehr und fertig .Mfg basti1012</span></a></th>'
+'<th scope="col" align="center" width="100">smil</th>'
+'<th scope="col" align="center" width="375">ende</th>'
+'<th scope="col" align="center" width="50">ende</th></tr>';
break;
}
}}});
},false);







//------------------------------------------------------  down fighten -----und upfight ---------------------------


document.getElementsByName('Downfighterhamburg')[0].addEventListener('click', function Downfighter () {
var welcherlink = 'http://downfight.de/?seite=downfighthamburg';
var pg = 'http://www.pennergame.de/';
down(welcherlink,pg);
},false);

document.getElementsByName('Downfighterberlin')[0].addEventListener('click', function Downfighter () {
var welcherlink = 'http://downfight.de/?seite=downfightberlin';
var pg = 'http://www.berlin.pennergame.de/';
down(welcherlink,pg);
},false);

document.getElementsByName('Upfighterhamburg')[0].addEventListener('click', function hochfigterhamburger () {
var welcherlink = 'http://downfight.de/?seite=hochfighthamburg';
var pg = 'http://www.pennergame.de/';
down(welcherlink,pg);
},false);

document.getElementsByName('Upfighterberlin')[0].addEventListener('click', function hochfigterberliner () {
var welcherlink = 'http://downfight.de/?seite=hochfightberlin';
var pg = 'http://www.berlin.pennergame.de/';
down(welcherlink,pg);
},false);

document.getElementsByName('Downfighterdosser')[0].addEventListener('click', function Downfighterdosser () {
var welcherlink = 'http://pennermafia.de/UK/?seite=listehhdown';
var pg = 'http://www.dossergame.co.uk/';
down(welcherlink,pg);
},false);

document.getElementsByName('Upfighterdosser')[0].addEventListener('click', function hochfigterdosser () {
var welcherlink = 'http://pennermafia.de/UK/?seite=listehhup';
var pg = 'http://www.dossergame.co.uk/';
down(welcherlink,pg);
},false);

document.getElementsByName('Downfightermenelgame')[0].addEventListener('click', function Downfightermenelgame () {
var welcherlink = 'http://pennermafia.de/PL/?seite=listehhdown';
var pg = 'http://www.menelgame.de/';
down(welcherlink,pg);
},false);

document.getElementsByName('Upfightermenelgame')[0].addEventListener('click', function hochfigtermenelgame () {
var welcherlink = 'http://pennermafia.de/PL/?seite=listehhup';
var pg = 'http://www.menelgame.pl/';
down(welcherlink,pg);
},false);

document.getElementsByName('Downfighterclodo')[0].addEventListener('click', function Downfighterclodo () {
var welcherlink = 'http://pennermafia.de/FR/?seite=listehhdown';
var pg = 'http://www.clodogame.fr/';
down(welcherlink,pg);
},false);

document.getElementsByName('Upfighterclodo')[0].addEventListener('click', function hochfigterclodo () {
var welcherlink = 'http://pennermafia.de/FR/?seite=listehhup';
var pg = 'http://www.clodogame.fr/';
down(welcherlink,pg);
},false);

document.getElementsByName('Downfightermendigo')[0].addEventListener('click', function Downfightermendigo () {
var welcherlink = 'http://pennermafia.de/ES/?seite=listehhdown';
var pg = 'http://www.mendigogame.es/';
down(welcherlink,pg);
},false);

document.getElementsByName('Upfightermendigo')[0].addEventListener('click', function hochfigtermendigo () {
var welcherlink = 'http://pennermafia.de/ES/?seite=listehhup';
var pg = 'http://www.mendigogame.es/';
down(welcherlink,pg);
},false);
















function down(welcherlink,pg){
document.getElementsByName('test')[0].innerHTML ='<br>'
+'Min :<input type="text" name="runter" id="runter" value="'+GM_getValue("min")+'">'
+'Max<input type="text" name="hoch" id="hoch" value="'+GM_getValue("max")+'"><br>'
+'ATT:<input type="text" name="att" id="att" value="'+GM_getValue("att")+'">'
+'DEF:<input type="text" name="def" id="def" value="'+GM_getValue("def")+'"><br>'
+'<input type="button" id="suche" name="suche" value="Gegner suchen ">';

document.getElementsByName('suche')[0].addEventListener('click', function suche () {
document.getElementsByName('spalteins')[0].innerHTML ='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25">E</th>'
+'<th scope="col" align="center" width="25">Stu</th>'
+'<th scope="col" align="center" width="25">pro</th>'
+'<th scope="col" align="center" width="100">Komentar/link</th>'
+'<th scope="col" align="center" width="100">Punkte</th>'
+'<th scope="col" align="center" width="70">Verlauf</th>'
+'<th scope="col" align="center" width="375">name</th>'
+'<th scope="col" align="center" width="50">a</th></tr>';

var zocke = 'Downfighten ';
var hoch = document.getElementById('hoch').value;
var runter = document.getElementById('runter').value;
var att = document.getElementById('att').value;
var def = document.getElementById('def').value;

			GM_xmlhttpRequest({
				method: 'POST',
				url: ''+welcherlink+'',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('unten='+runter+'&oben='+hoch+'&myatt='+att+'&mydef='+def+'&angemeldet=nein&auto='),
					onload: function(responseDetails){
					var contenty = responseDetails.responseText;//document.getElementsByName('StadtIdInfo')[0].innerHTML = '<br><br><br>Suche in der Stadt '+pg+' Mit deinen ATT:'+att+' Dein DEF:'+def+' mit den Punkten '+runter+' und '+hoch+' und mache '+zocke+'';
					
					try{
					var content = contenty.split('Punkteverlauf</strong>')[1].split('bgcolor="#4d3124">')[0];		
					}catch(e){
					var content = contenty.split('Points</strong>')[1].split('bgcolor="#4d3124">')[0];
					}
for(i = 1; i <= 100; i++) {
			var Feld1 = content.split('<tr style')[i].split('</tr>')[0];// i erste stelle
			var ApiId = Feld1.split('/dev/api/user.')[1].split('.xml"')[0];
			var name = Feld1.split('target="_blank">')[1].split('</a>')[0];
			var punkte = Feld1.split('align="right" >')[1].split('P')[0];
			var verlauflink = Feld1.split('href="punkte')[1].split('"')[0];
			var verlauflinkbildid = verlauflink.split('kommentarid=')[1].split('&check')[0];
			var verlauflinkbildida = 'http://downfight.de/punkte_bigpicture.php?'+verlauflinkbildid+'';
			var laufzeit = Feld1.split('align="right" >')[2].split('<font')[0];
			var profilink = Feld1.split('size="0"><B>')[1].split('</B>')[0];
			var komentarlink = Feld1.split('href="kommentare')[1].split('"')[0];	
			var komentar = Feld1.split('<td align="left" >')[4].split('<')[0];	
			var test ='#272727';
			var fights2='<a class="tooltip" href="http://downfight.de/kommentare'+komentarlink+'">[Komentar]<span>'+komentar+'</span></a>';
			message = '<a href="'+pg+'/messages/write/?to='+ApiId+'" target="_top"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="10" width="17"></a>';
			fight = '<a href="'+pg+'/fight/?to='+name+'" target="_top"><img src="http://media.pennergame.de/img/att.gif" border="0"></a>';



var points=punkte;
var maxatt =    GM_getValue("angriffmax");
var minatt =  GM_getValue("angriffmin");
var userpoints = GM_getValue("userpoints");


if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
var color = "red"; 
}

if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
var color = "green"; 
}




try{
tr.innerHTML +='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25">'+i+'</th>'
+'<th scope="col" align="center" width="25">'+laufzeit+'</th>'
+'<th scope="col" align="center" width="25">'+profilink+'</th>'
+'<th scope="col" align="center" width="100">'+fights2+'</th>'
+'<th scope="col" align="center" width="100"><font style=\"color:'+color+'; font-size:100%;\">'+punkte+'</font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://downfight.de/punkte'+verlauflink+'">[Verlauf]<span><img src="'+verlauflinkbildida+'" border="0" height="800" width="1200"></span></a></th>'
+'<th scope="col" align="center" width="375"><a href="/profil/id:'+ApiId+'"/>'+name+'</a></th>'
+'<th scope="col" align="center" width="50">'+message+''+fight+'</th></tr>';
}catch(e){
var y=i-Number(1);
tr.innerHTML +='<table class="list" border="1" width="770"><tbody>'
+'<tr><th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>'+y+'</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gegner</b></font></th>'
+'<th scope="col" align="center" width="25"><font style=\"color:black; font-size:150%;\"><b>Gefunden</b></font></th>'
+'<th scope="col" align="center" width="100"><font style=\"color:black; font-size:150%;\"><b>Mfg Basti1012</b></font></th>'
+'<th scope="col" align="center" width="100"><a class="tooltip" href="http://pennerhack.foren-city.de"><font style=\"color:black; font-size:150%;\"><b>[mehr hier]</b></font><span>Mehr Scripte von mir und allen weiteren ?Pennergame Scripteschreiber findet ihr auf meiner Homepage .Klicke einfach auf mehr und fertig .Mfg basti1012</span></a></th>'
+'<th scope="col" align="center" width="100">smil</th>'
+'<th scope="col" align="center" width="375">ende</th>'
+'<th scope="col" align="center" width="50">ende</th></tr>';
break;
}




}

}});
},false);


}



}});
},false);



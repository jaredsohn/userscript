// ==UserScript==
// @name           Flaaschenverkaufsbot pennergame 4.0(neuer bot)
// @author         basti1012 ( pennerhack )
// @description    Verkauft automatisch die Flaschen ab einen bestimmten Kurs
// @include        http://*pennergame.de/*
// @version				 1.0
// ==/UserScript==




var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var siglink = 'http://img.dossergame.co.uk';
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
var siglink = 'http://img.menelgame.pl';
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
var siglink = 'http://img.clodogame.fr';
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var siglink = 'http://img.mendigogame.es';
}





function kursscheck(){
try{
document.getElementById("logo").innerHTML = '';
}catch(e){}


GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/stock/bottle/',
	onload: function(responseDetails){
		var content = responseDetails.responseText;
		var text1 = content.split('name="max" value="')[1];
		var text2 = text1.split('"')[0];
		var kurs1 = content.split('name="chkval" value="')[1];
		var kurs = kurs1.split('"')[0];
		win = ((text2*kurs)/100);





try{
var bot1 = document.getElementById("logo");
var newp = document.createElement("tr");
bot1.appendChild(newp);
newp.innerHTML = '<font style=\"color:red; font-size:100%;\">'+text2+' Flaschen<input type="button" id="einstell" value="Einstellungen"><br>Kurs '+kurs+'<br>Win '+win+' &euro; <b id="status"</b></font>';


document.getElementById("status").innerHTML = '<font style=\"color:green; font-size:100%;\">Status OK</font>';

document.getElementById('einstell').addEventListener('click', function einstell () {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://hamburg.pennerzone.de/highscore/bottlechart.html',
		onload: function(responseDetails){
			var content = responseDetails.responseText;
			var feld = content.split('<h3>Pfandflaschenpreise</h3>')[1];
			var feld2 = feld.split('</div>')[0];

			var NewXtraMenueDiv = document.createElement('div');
			NewXtraMenueDiv.innerHTML = '<span name="PlunderInfoScreen" style="position:absolute;top:111px;left:111px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:2.0;opacity:2.0;border:5px solid red; background-Color:orange;background-position:-10px -5px;;">Flaschen Menge die nicht verkauft werden soll :<input type="text" id="menge" value="'+GM_getValue("menge")+'"> Verkaufen bei  Kurs :<input type="text" id="kurss" value="'+GM_getValue("menge")+'"><input type="button" id="speichern" value="Speichern"><br><input type="button" id="closee" value="Fenster schliessen"><b id="bilder"</b></span>';
			document.body.appendChild(NewXtraMenueDiv);

			for(i=1;i<=6;i++){
				var kur = feld2.split('src="/highscore/bottlechart_')[i];
				var ki = kur.split('.png')[0];
				document.getElementById("bilder").innerHTML += '<img src="http://hamburg.pennerzone.de/highscore/bottlechart_'+ki+'.png">';
			}

			document.getElementById('closee').addEventListener('click', function einstell () {
				location.reload();
			},false);

			document.getElementById('speichern').addEventListener('click', function einstell () {
				var menge = document.getElementById("menge").value;
				var kurss = document.getElementById("kurss").value;
				GM_setValue("menge", menge);
				GM_setValue("kurss", kurss);
				alert("ab sofort wird bei einen Pfandkurs von "+kurss+" deine Flaschen verkauft .\nUnd zwar alle bis auf "+menge+" Flaschen");
			},false);
		}
	});
	document.body.appendChild(Weiterbildung1);
},false);

abkurs = GM_getValue("kurss");
rest = GM_getValue("menge");
if(kurs>= abkurs){

	verkauf = text2-rest;
	won = (verkauf*kurs)/100;
	if(verkauf<=1){
		
	}else{

		GM_xmlhttpRequest({
  			 method: 'POST',
   			 url: ''+link+'/stock/bottle/sell/',
   			 headers: 
   			 {'Content-type': 'application/x-www-form-urlencoded'},
  	        	 data: encodeURI('chkval='+kurs+'&max='+text2+'&sum='+verkauf+''),
      	        	 onload: function(responseDetails) { 
				document.getElementById("status").innerHTML = '<font style=\"color:green; font-size:100%;\">'+verkauf+' Flaschen f&uuml;r '+won+' &euro; verkauft</font>';
				}
  			});
	}
}
}catch(e){}
}});
}
re ='10000';
window.setInterval(kursscheck, re);

// copyright by basti1012


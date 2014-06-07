// ==UserScript==
// @name		   Sprzedwca rupieci graczy Pennergame + Bumrise + Menelgame
// @author		   basti1012 bearbeitet für hh und b by niceguy0815 und erweitert auf muenchen by dron122007
// @description    Latwo i przyjemnie sprzedaje znalezione rupiecie graczy bez mozolnego klikania...
// @version        0.1.1 Polish translation and added bumrise, menelgame
// @include        http://*.pennergame.de/stock/ug_plunder*
// @include        http://*.menelgame.pl/stock/ug_plunder*
// @include        http://*.bumrise.com/stock/ug_plunder*
// ==/UserScript==

var url = document.location.href;

if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}
if (url.indexOf("http://warszawa.menelgame")>=0) {var link = "http://warszawa.menelgame.pl"}
if (url.indexOf("http://www.menelgame")>=0) {var link = "http://www.menelgame.pl"}
if (url.indexOf("http://muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}
if (url.indexOf("http://krakow.menelgame")>=0) {var link = "http://krakow.menelgame.pl"}
if (url.indexOf("http://www.bumrise")>=0) {var link = "http://www.bumrise.com"}

GM_deleteValue("x");
GM_deleteValue("i");
GM_deleteValue("Plundermenge");



try{
var tabelle = document.getElementById('pagination');
var Seitenanzahl = tabelle.innerHTML.split('pagenum">');
var seitenmenge = Seitenanzahl.length;
var Plundermenge1 = seitenmenge-1;
var Plundermenge = Plundermenge1*5;

var farbe = 'lime';
var farbe1 = 'red';
GM_setValue("Plundermenge",Plundermenge);
anfanegn(farbe1,farbe)
}catch(e){
nixda();
}




function nixda(){
var Plundermenge = '0';
var li = document.createElement('li');
var table = document.getElementById('myugplunder').appendChild(li);
li.innerHTML = '<font style=\"color:blue; font-size:150%;\">'
+'Nie masz obecnie rupieci do sprzedaży.'
+'<br>Idź zbierać puszki, jeśli chcesz nowych rupieci.<br>'
+'Poźniej się tutaj pojawią i znowu będą mogły być sprzedane.<br>'
+'Mfg Basti1012';
+'Update na Monachium od dron122007'
+'Update na Polskę od Wime'
var farbe = 'lime';
var farbe1 = 'lime';
anfanegn(farbe1,farbe)
}





function anfanegn(farbe1,farbe){
var seitenmenge1 =seitenmenge-1;
var anleitung = ' <font style=\"color:'+farbe+'; font-size:150%;\">'
+'<br>Skrypt sprzedaje 5 rupieci w jednym kroku.'
+'<br>Posiadasz jeszcze <font style=\"color:'+farbe1+'; font-size:120%;\"><b><strong>'+Plundermenge+' </strong></b></font>rupieci graczy'
+'<br>Ilość stron z rupieciami graczy <font style=\"color:'+farbe1+'; font-size:120%;\"><b><strong>'+seitenmenge1+'</strong></b></font>'
+'<br>Więc kiedy posiadasz np 12, skrypt sprzeda 10 lub 15.'
+'<br>Proszę mieć to na uwadze'
+'<br>Dziękuje!!!!!!!!!!'
+'<br>'
+'Mfg Basti1012';
+'Update na Monachium od dron122007'
+'Update na Polskę od Wime'
+'</font>';
var li = document.createElement('li');
var table = document.getElementById('myugplunder').appendChild(li);
li.innerHTML = ''+anleitung+'<br><div align="left" name="information" id="information"></div>'
+'<br><font style=\"color:'+farbe+'; font-size:200%;\">Sprzedawana ilość:</font><input type="text" name="verkaufena" id="verkaufena" value="100">'
+'<input id="brot" type="button" value="Sprzedaj"/>'
+'<br><div align="left" name="Balken" id="Balken">';

}

document.getElementsByName('information')[0].innerHTML = '<font style=\"color:'+farbe+'; font-size:200%;\"><br>Obecnie rupieci gracza <font style=\"color:'+farbe+'; font-size:120%;\"><b>'+Plundermenge+'</b></font></b></font>';



document.getElementById('brot').addEventListener('click', function brot_essen(){
document.getElementById('brot').disabled = "disabled";
var mengeplunder = document.getElementById('verkaufena').value;
var x = '1';
var i = '1';
ermitelon(x,mengeplunder,i);
},false);





function ermitelon(x,mengeplunder,i){

if(i <= mengeplunder){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/stock/ug_plunder/'+x+'/',
        	onload: function(responseDetails) {
        	var content = responseDetails.responseText;

			for(s=1;s<=5;s++) {
			try{
			i++;
    	                GM_setValue("i",i);
			var Plunderid = content.split('id="positiv_')[s];
			var Plunderid1 = Plunderid.split('"')[0];	
			Plunder_verkaufen(Plunderid1,x,mengeplunder,i);
			}catch(e){}

		if(s==5){
		x++;
		ermitelon(x,mengeplunder,i);
		}
}
}});
	
}else{
document.getElementsByName('Balken')[0].innerHTML =  '<font style=\"color:red; font-size:200%;\"><b>Sprzedaż zakończona</b></font>';
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML = '<div style="top: 100px;" id="notifyme" class="zabsolute zleft"><div class="icon ok zleft" id="nicon">&nbsp;</div><div class="zleft right" id="ntext"><h2>Basis Plunderverkauf</h2><p>Du hast gerade f&uuml;r<font style=\"color:green; font-size:100%;\"><b>'+mengeplunder+'   &euro;</b></font>Plunder Verkauft.</div></div>';
	//location.reload();
window.location.href = ''+link+'/stock/ug_plunder/';

}			
}




function Plunder_verkaufen(Plunderid1,x,mengeplunder,i){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/stock/ug_plunder/sell/'+Plunderid1+'/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
}});	

var nochplunder = GM_getValue("Plundermenge");

var einprozent = mengeplunder/100;
var prozent = einprozent*i;
var Balkenpxa = prozent*3;
var reinmachen = '<font style=\"color:green; font-size:200%;\">Sprzedane jest '+i+' ze  '+mengeplunder+'(idRupiecia '+Plunderid1+')</b></font>';
document.getElementsByName('Balken')[0].innerHTML =  '&nbsp; '+reinmachen+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+Balkenpxa+'px;"></div></div>';
			
}
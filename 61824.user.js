// ==UserScript==
// @name           Spiele Plunder verkauf bei Basti1012(2) Pennergame 4,.0 Hamburg + Berlin
// @namespace      copyright by basti1012 bearbeitet für hh und b by niceguy0815 Http://pennerhack.foren-city.de
// @description    Verkauft in wennigen Sekunden deinen Spiele Plunde Fuer pennergame 4.0 (2)
// @include        http://*.pennergame.de/stock/ug_plunder*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}


GM_deleteValue("x");
GM_deleteValue("i");
GM_deleteValue("Plundermenge");



try{
var tabelle = document.getElementById('pagination');
var Seitenanzahl = tabelle.innerHTML.split('pagenum">');
var seitenmenge = Seitenanzahl.length;
var Plundermenge1 = seitenmenge-1;
var Plundermenge = Plundermenge1*5;

var farbe = 'whithe';
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
+'Es ist zur Zeit kein Plunder zum Verkauf da.'
+'<br>Bitte gehe zum Flaschen sammeln um neuen Plunder zu finden.<br>'
+'Danach k&ouml;nnen sie wieder neu Gefunden Plunder verkaufen .<br>'
+'Mfg Basti1012';
var farbe = 'gray';
var farbe1 = 'gray';
anfanegn(farbe1,farbe)
}





function anfanegn(farbe1,farbe){
var seitenmenge1 =seitenmenge-1;
var anleitung = ' <font style=\"color:'+farbe+'; font-size:150%;\">'
+'<br>Der Verkauf geht in 5 er Schritten .'
+'<br>Du hast noch ca <font style=\"color:'+farbe1+'; font-size:120%;\"><b><strong>'+Plundermenge+' </strong></b></font>Spieleplunder'
+'<br>Das sind ca Spieleplunder Seiten <font style=\"color:'+farbe1+'; font-size:120%;\"><b><strong>'+seitenmenge1+'</strong></b></font>'
+'<br>Also wenn ihr zb 12 eingeben tut Verkauft das script 10 oder 15 Plunder .'
+'<br>Also  bitte vor dem verkauf drauf achten'
+'<br>Danke!!!!!!!!!!'
+'<br>'
+'<br>MFG Basti1012'
+'</font>';
var li = document.createElement('li');
var table = document.getElementById('myugplunder').appendChild(li);
li.innerHTML = ''+anleitung+'<br><div align="left" name="information" id="information"></div>'
+'<br><font style=\"color:'+farbe+'; font-size:200%;\">Menge Verkaufen:</font><input type="text" name="verkaufena" id="verkaufena" value="111">'
+'<input id="brot" type="button" value="Verkaufen"/>'
+'<br><div align="left" name="Balken" id="Balken">';

}

document.getElementsByName('information')[0].innerHTML = '<font style=\"color:'+farbe+'; font-size:200%;\"><br>Vorhandener Spiele Plunder ca <font style=\"color:'+farbe+'; font-size:120%;\"><b>'+Plundermenge+'</b></font></b></font>';



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
document.getElementsByName('Balken')[0].innerHTML =  '<font style=\"color:red; font-size:200%;\"><b>Der Verkauf ist beendet</b></font>';
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
var reinmachen = '<font style=\"color:green; font-size:200%;\">Verkauf bei '+i+' von  '+mengeplunder+'(Plunderid '+Plunderid1+')</b></font>';
document.getElementsByName('Balken')[0].innerHTML =  '&nbsp; '+reinmachen+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+Balkenpxa+'px;"></div></div>';
			
}



// copyright by basti1012
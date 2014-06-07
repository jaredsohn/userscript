// ==UserScript==
// @name           Spiele Plunder verkauf bei Basti1012 Pennergame 4,.0
// @namespace      Http://pennerhack.foren-city.de
// @description    Verkauft in wennigen Sekunden deinen Spiele Plunde Fuer pennergame 4.0
// @include        http://www.pennergame.de/stock/ug_plunder*
// ==/UserScript==


GM_deleteValue("x");
GM_deleteValue("i");
GM_deleteValue("Plundermenge");

var tabelle = document.getElementById('pagination');
var Seitenanzahl = tabelle.innerHTML.split('pagenum">');
var seitenmenge = Seitenanzahl.length;
var Plundermenge = seitenmenge*5;
GM_setValue("Plundermenge",Plundermenge);

var tabelle1 = document.getElementById('pagination');

tabelle1.innerHTML +='<br><div align="left" name="information" id="information"></div>'
+'<br>Menge Verkaufen:<input type="text" name="verkaufena" id="verkaufena" value="111">'
+'<input id="brot" type="button" value="Verkaufen"/>'
+'<br><div align="left" name="Balken" id="Balken">';
document.getElementsByName('information')[0].innerHTML = '<font style=\"color:black; font-size:200%;\">Vorhandener Plunder ca '+Plundermenge+'</b></font>';


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
   	url: 'http://www.pennergame.de/stock/ug_plunder/'+x+'/',
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

}			
}


function Plunder_verkaufen(Plunderid1,x,mengeplunder,i){

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/stock/ug_plunder/sell/'+Plunderid1+'/',
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
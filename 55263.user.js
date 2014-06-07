// ==UserScript==
// @name           Stadtscanner version 1.9 hamburg und berlin  by basti1012 und by Newman Mit status anzeige .Neu mit mitglieder liste.nochmal neu mit staus balkenaneigen( UPDATE OHNE GELDVERLUST)
// @namespace      Basti1012 http:///pennerhack.foren-city.de  xs
// @description    Scannt allle gekauften stadtteile durch .:Es wird bandenvorherschaft punkte und platz jeder stadt angezeigt .Zeigt nur die Stadtteile an die man gekauft hat
// @include        http://*pennergame.de/overview/
//@exclude        http://*highscore.pennergame.de*
// ==/UserScript==
//+'<option value="103" >Billstedt</option>'



	//document.getElementsByClassName('display_punkte')[0].innerHTML +="<font style=\"color:black; font-size:140%;\"><br><br><b>StadtScanner by Basti1012 und by NewMan</b></font>";
	document.title = 'StadtScanner By Basti1012 und by Newman';



var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var stadanzahl = '94';
var ifanzahl = '94';
var Vorherschaftseid = '';
var vorherschendebande = '';
var Platz = '';;
var Punkte = '';
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var stadanzahl = '103';
var ifanzahl = '103';
var Vorherschaftseid = '';
var vorherschendebande = '';
var Platz = '';;
var Punkte = '';
var link = "http://www.pennergame.de"
}
if (url.indexOf("http://pennergame")>=0) {
var stadanzahl = '103';
var ifanzahl = '103';
var Vorherschaftseid = '';
var vorherschendebande = '';
var Platz = '';;
var Punkte = '';
var link = "http://pennergame.de"
}
/*
************************************************
if (url.indexOf("http://www.dossergame")>=0) {  *
var stadanzahl = '36';	
	var ifanzahl = '37';		*
var Vorherschaftseid = '';                      *
var vorherschendebande = '';                    *
var Platz = '';;                                *
var Punkte = '';                                *
var link = "http://www.dossergame.co.uk"        *
}                                               *
if (url.indexOf("http://www.menelgame")>=0) { 
var stadanzahl = '18';
var ifanzahl = '19';
var Vorherschaftseid = '';			*
var vorherschendebande = '';			*
var Platz = '';;				*
var Punkte = '';				*
var link = "http://www.menelgame.pl"		*
}						*
if (url.indexOf("http://www.clodogame")>=0) {
var stadanzahl = '20';
var ifanzahl = '21';
var Vorherschaftseid = '';			*
var vorherschendebande = '';			*
var Platz = '';;				*
var Punkte = '';				*
var link = "http://www.clodogame.fr"		*
}						*
************************************************

*/




var div_settingpoint = document.getElementsByClassName('settingpoint');
var div_tieritemA = document.getElementsByClassName('tieritemA');

newdiv1 = document.createElement('div');
newdiv1.setAttribute('class', 'tieritemA');
newdiv1.style.width = "545px";
newdiv1.innerHTML = '<div class="clearcontext" style="width: 645px;"><font style=\"color:white; font-size:120%;\">'
+'<b>Stadtteile Scannen (kann Paar Sekunden dauern)Es werden nur die stadtteile angezeigt die ihr gekauft habt.Jenachdem wie schnell pc und Internet ist kann es ca 2 Minuten dauern.UPDATE VON18.8.2009 OHNE geldsorgen dafür is das Script noch langsamer geworden</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>Wenn der Button nicht geht Bitte die Seite Aktualiesieren dann geht es wieder</b></front> <br>'
+'<input type=\"submit\" class=\"formbutton\" name=\"wein1\" value=\"Stadt Scannen\">'

+'<font style=\"color:white; font-size:100%;\"><b><div align="left" name="StadtIdInfo" id="StadtIdInfo"></div></b></font></div><br>'
//<font style=\"color:yellow; font-size:140%;\"><b><div align="left" name="SpamIdInfo" id="SpamIdInfo"></div></b></font></div>'
+'<font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalki" id="sbalki"></div></b></font><br>'
+'<center> <a href="http://pennergame.de/city/"><strong>In Stadtteil</strong></a></center><br>'

+'<font style=\"color:yellow; font-size:120%;\"><b>Vorherschende Bande &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;   Seid:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Punkte:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Platz:<br></font></div>';
div_settingpoint[0].insertBefore(newdiv1, div_tieritemA[div_tieritemA.length-6]); 




document.getElementsByName("wein1")[0].addEventListener('click', function linkklickewerone() {
document.getElementsByName('wein1').disabled = "disabled";
GM_deleteValue("e");				
wechseln();
},false); 


var e = GM_getValue("e");
if (e == null){
e = '1';
};


var Stadtmenge = GM_getValue("Stadtmenge");
if (Stadtmenge == null){
Stadtmenge = '0';
};



function wechseln(){

if(e <= Number(ifanzahl)){

document.title = '[ Scanne Stadtteile.Bin bei staadt '+e+' von '+stadanzahl+'(hamburg)(berlin 94)] Copyright by Basti1012 und Newman';
var zahl = 'stadanzahl';
var Stadtpro = Math.round((100/stadanzahl)*100)/100
var Stadterg = Math.round((Stadtpro*e)*1)/1

var balkie = Math.round((Stadterg*3)*10)/10

var reinmachen ='[Stadt:<strong><b> '+e+' </b></strong>von '+stadanzahl+'.Fortschrit <strong><b> '+Stadterg+'  % </b></strong> Fertig  ]';

document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; '+reinmachen+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balkie+'px;"></div></div>';



var pro = Math.round((Stadtpro*Stadtmenge)*1)/1
//document.getElementsByName('StadtIdInfo')[0].innerHTML = '[Du besitzt <b>'+Stadtmenge+'</b> Stadtteile.Das sind <b>'+pro+' %</b>]';
var balkia = Math.round((3*Stadtmenge)*10)/10
var reinmachee ='[Du besitzt <b>'+Stadtmenge+'</b> Stadtteile.Das sind <b>'+pro+' %</b>]';
document.getElementsByName('StadtIdInfo')[0].innerHTML = '&nbsp; '+reinmachee+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balkia+'px;"></div></div>';



var reintun = 'value="'+e+'"';




GM_xmlhttpRequest(
   {
	method: 'GET',
  	url: ''+link+'/city/district/',
	onload: function(responseDetails) 
	{
		var content = responseDetails.responseText;

try{


		var text1 = content.split(''+reintun+'')[1];
		var text2 = text1.split('form')[0];
		var text3 = text2.split('value="')[1];
		var text4 = text3.split('"')[0];

}catch(e){
e++;
}

if (text4 == "Kaufen") {

	e++;
	wechseln();

}else{


   GM_xmlhttpRequest({
      method: 'POST',
      url: ''+link+'/city/district/buy/',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
       		data: encodeURI('id='+e+'&submitForm=Einziehen'),
      		onload: function(responseDetails){
                	var content = responseDetails.responseText;
                	if(content.indexOf('Willkommen') != -1){
                    	user(); 
  				Stadtmenge++;
                	}else{
                   	 e++;
                   	 wechseln();

document.title = 'Stadt  '+e+' Nicht vorhanden !! Mfg Basti1012';

                }   
   }
});










}

}});




















}

































function user () {

GM_xmlhttpRequest({
     method: 'GET',
     url: ''+link+'/city/',
     onload: function(responseDetails) 
	{
        var content = responseDetails.responseText;
	if(content.match(/Vorherrschende/)){

		var punkte1 = content.split('>&nbsp;Punkte</td>')[1];
		var punkte2 = punkte1.split('</tr>')[0];
		var platz1 = content.split('>&nbsp;Platzierung</td>')[1];
		var platz2 = platz1.split('</tr>')[0];
		var vor1 = content.split('>&nbsp;Vorherrschend seit</td>')[1];
		var vor2 = vor1.split('</tr>')[0];
		var stadt = content.split('Vorherrschende Bande in ')[1];
		var stadtf = stadt.split('</h3>')[0];
		var stadt2 = '<a href="http://pennerhack.foren-city.de/"><strong>'+stadtf+'</strong></a>';
		var text1 = content.split('<a href="/profil/bande:')[2];
		var text2 = text1.split('</strong>')[0];
		var textaa = text1.split('/"><strong>')[0];
		var text3 = '<a href="/profil/bande:'+text2+'</strong></a>';














GM_xmlhttpRequest({
     method: 'GET',
     url: ''+link+'/profil/bande:'+textaa+'/',
     onload: function(responseDetails) 
	{
        var content = responseDetails.responseText;
	if(content.match(/Mitglieder/)){

try{
	var name1 = content.split('<tr align="left"><td colspan="2">')[1];
	var name = name1.split('</table>')[0];
}catch(e){
	var name = 'ERROR';
}

var bande3 = ''
 +'<a class="tooltip"><font color="yellow"><b>Liste der Bande Mitglieder (Klicke hier fuer liste)</b></font><span><small><br>'
 +'<font style=\"color:blue; font-size:120%;\"><b>Mitglieder:</b></font><br>'
 +'<font style=\"color:blue; font-size:120%;\"><b>'+name+'</b></a></font><br>'
+'</small></span>';

var inhalt1 =''
+'<font style=\"color:red; font-size:120%;\">'+e+'<center><b>'+stadt2+'</b></center></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+text3+'</b></font>&nbsp;&nbsp;&nbsp;&nbsp;='
+'<font style=\"color:red; font-size:120%;\"><b>'+vor2+'</b></font>&nbsp;&nbsp;&nbsp;&nbsp;='
+'<font style=\"color:red; font-size:120%;\"><b>'+punkte2+'</b></font>&nbsp;&nbsp;&nbsp;&nbsp;='
+'<font style=\"color:red; font-size:120%;\"><b>'+platz2+'</b></font>';

	newdiv2 = document.createElement('div');
	newdiv2.setAttribute('class', 'tieritemA');
	newdiv2.style.width = "545px";
	newdiv2.innerHTML = '<div class="clearcontext" style="width: 645px;">'+inhalt1+'<br>'+bande3+'</div>';
	div_settingpoint[0].insertBefore(newdiv2, div_tieritemA[div_tieritemA.length-6]); 

}

}});
}		
	
e++;
wechseln();
GM_setValue("e" , e);
	
}});
}

}

// Copyright by basti1012 und Newman

// ==UserScript==
// @name           Pfandflaschen auto verkauf Hamburg Berlin 4.0 (test version keine garantie)
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    man gibt einen kurs an ab wie viel cent wie viel plaschen verkauft werden sollen .-das script lauft immer mit einmal eingegbenend er verkauft immer dein minimum was du eingegeben hast
// @include        http://*pennergame.de/*
// @exclude        http://newboard.pennergame.de
// ==/UserScript==


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  	var link = 'http://berlin.pennergame.de/';
}else if(document.location.href.indexOf('www.pennergame.de/')>=0) {
  	var link = 'http://www.pennergame.de/';
}else if(document.location.href.indexOf('http://pennergame.de/')>=0) {
  	var link = 'http://www.pennergame.de/';
}


	var kursabwann = GM_getValue("wannkurs", 24);
	var maxi1 = GM_getValue("anzahlflaschen", 22222222222222);




MenueTop = "100";
MenueLeft = "100";
BorderColor = "white";
MenueBorderColor = "schwarz";
tranzparente = "2.0";
bordbreite = "2";
ColorIn = "red";



var NewXtraMenueDiv = document.createElement('div');
NewXtraMenueDiv.innerHTML += '<span name="PlunderInfoScreen" style="position:absolute;top:'+MenueTop+'px;left:'+MenueLeft+'px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:'+tranzparente+';opacity:'+tranzparente+';border:'+bordbreite+'px solid '+MenueBorderColor+'; background: url(http://germanengott.ge.funpic.de/script_img/background_weiterbildung_ende.png);background-position:-10px -5px;;">'
+'<br><center><div align="left" name="logo1" id="logo1"></div></center>'
+'<center><div align="left" name="logo2" id="logo2"></div></center><br>'
+'</span><br>';
document.body.appendChild(NewXtraMenueDiv);


anfang();
function anfang(){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/stock/bottle/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text11 = content.split('name="chkval" value="')[1];
			var kursaktuell = text11.split('"')[0];
			var text11 = content.split('name="max" value="')[1];
			var flaschenaktuell = text11.split('"')[0];
		GM_setValue("kursaktuell",kursaktuell);
		GM_setValue("flaschenaktuell",flaschenaktuell);
verkaufstarten();
}});
}


try{
	if(window.location.href.indexOf("Bot") > 0){

		document.getElementsByTagName('body')[0].innerHTML ='<br><center><font style=\"color:yellow; font-size:160%;\"><b>Flaschenverkaufsbot</b></font></center><br>'
		+'<br><center><font style=\"color:red; font-size:120%;\"><b>Bitte sorgf&auml;ltig lesen ,Danke.</b></font></center><br>'
		+'Der Aktuelle Kurs ist bei <font style=\"color:green; font-size:110%;\"><b>'+GM_getValue("kursaktuell")+'</b></font> Cent.<br>'
		+'Hier musst du nun den Kurs eingeben ab wann das Script deine Pfandflaschen verkaufen soll.<br>'
		+'(zb 18 = sobald der Kurs auf 18 Cent gestiegen ist verkauft das Script deine Flaschen die du unten eingegeben hast .)<br>'
		+'Flaschen ab :<input type="text" id="wannkurs" name="wannkurs" value="'+kursabwann+'">verkaufen <br>'
		+'Du hast zur Zeit <font style=\"color:green; font-size:120%;\"><b>'+GM_getValue("flaschenaktuell")+'</b></font> Flaschen in Inventar das w&auml;hren <font style=\"color:green; font-size:120%;\"><b>aaaaaaa Cent</b></font>.<br>'
		+'Hier musst du nun deine Anzahl der Flaschen eingeben die du im Inventar behalten willst.<br>'
		+'Zb du besitz 100 Flaschen und gibst 90 an,das heisst das Script l&auml;sst immer 90 Flaschen in Inventar die nicht verkauft werden .<br>'
		+'Sobald du wieder 91 Flaschen hast ,verkauft das Script eine Flasche und so weiter .Alles klar????<br>.'
		+'Anzahl Flaschen die in Inventar bleiben sollen : <input type="text" id="anzahlflaschen" name="anzahlflaschen" value="'+maxi1+'">Werden nicht verkauft.<br>'
		+'<input type="button" id="verkauf" name="verkauf" value="Speichern" ><br>'
		+'<div align="left" name="spalteins" id="spalteins"></div><br>';

	document.getElementsByName('verkauf')[0].addEventListener('click', function verkauf_flaschenbasti () {
	GM_setValue("anzahlflaschen",document.getElementsByName('anzahlflaschen')[0].value);
	GM_setValue("wannkurs",document.getElementsByName('wannkurs')[0].value);
	document.getElementById('logo1').innerHTML ='<center><font style=\"color:green; font-size:140%;\"><b>Deine Einstellungen wurden gespeichert</b></font></center>';
	document.getElementById('logo2').innerHTML ='<center><font style=\"color:red; font-size:160%;\"><b>Bot Aktiviert</b></font></center>'
+'<br><center><a href="/Bot/" title="Bot menue einstellungs bereich ">Einstellungen</a></center>';

	},false);
	}
}catch(e){}


function verkaufstarten(){
	var wannkurs =GM_getValue("wannkurs");
	var kurs =GM_getValue("kursaktuell");
	if(kurs >= wannkurs){
document.getElementById('logo1').innerHTML ='<center><font style=\"color:yellow; font-size:140%;\"><b>Minimum Kurs ereicht.</b></font></center>';
document.getElementById('logo2').innerHTML ='<center><font style=\"color:yellow; font-size:140%;\"><b>Verkaufe jetzt Flaschen</b></font></center>'
+'<br><center><a href="/Bot/" title="Bot menue einstellungs bereich ">Einstellungen</a></center>';

	verkaufen(kurs);
	}else{
document.getElementById('logo1').innerHTML ='<center><font style=\"color:green; font-size:160%;\"><b>(Bot aktiv )</b></font></center>';
document.getElementById('logo2').innerHTML ='<center><font style=\"color:yellow; font-size:140%;\"><b> 0.'+GM_getValue("kursaktuell")+' Cent ist zu niedrig </b></font></center>'
+'<br><center><a href="/Bot/" title="Bot menue einstellungs bereich ">Einstellungen</a></center>';
}
}


function verkaufen(kurs){

	var meineflaschen = GM_getValue("flaschenaktuell");
	var flaschenweg = GM_getValue("anzahlflaschen");

	var verkauft = meineflaschen-flaschenweg;
	GM_setValue("verkauft",verkauft);

	if(meineflaschen >= flaschenweg){

			if(verkauft == 0){

document.getElementById('logo1').innerHTML ='<center><font style=\"color:green; font-size:140%;\"><b>Kurs bei 0.'+GM_getValue("kursaktuell")+' Cent </b></font></center>';
document.getElementById('logo2').innerHTML ='<center><font style=\"color:yellow; font-size:140%;\"><b>Keine Flaschen zum verkauf<br>Vorhanden oder Maximum erreicht</b></font></center>'
+'<br><center><a href="/Bot/" title="Bot menue einstellungs bereich ">Einstellungen</a></center>';
					}else{

document.getElementById('logo1').innerHTML ='<center><font style=\"color:yellow; font-size:140%;\"><b>Wunsch kurs erreicht gehe jetzt verkaufen</b></font></center>';
document.getElementById('logo2').innerHTML ='<center><font style=\"color:yellow; font-size:140%;\"><b>Verkaufe '+verkauft+' Flaschen </b></font></center>'
+'<br><center><a href="/Bot/" title="Bot menue einstellungs bereich ">Einstellungen</a></center>';
						GM_xmlhttpRequest({
							method: 'POST',
							url: link+'stock/bottle/sell/',
							headers: {'Content-type': 'application/x-www-form-urlencoded'},
							data: encodeURI('chkval='+kurs+'&max='+meineflaschen+'&sum='+verkauft+''),
							onload: function(responseDetails)
     								{

var eende = kurs*verkauft/100;

document.getElementById('logo1').innerHTML ='<center><font style=\"color:yelow; font-size:140%;\"><b>Habe erfolgreich '+verkauft+' Flaschen verkauft.</b></front></center>';
document.getElementById('logo2').innerHTML ='<center><font style=\"color:yellow; font-size:140%;\"><b>Habe da durch '+eende+' &euro; verdient.</b></font></center>'
		+'<br><center><a href="/Bot/" title="Bot menue einstellungs bereich ">Einstellungen</a></center>';
						}
						});
					}
			}
}


window.setInterval(anfang, 10000);




// ==UserScript==
// @name           Mach-Den-SpendenBecher-Voll.By-Basti1012 Pennergame 4.0
// @namespace      http://pennerhack.foren-city.de
// @description    Dieses Script Holt dir die 50 Spenden rein in Wennigen Minuten( odfer Sekunden).Einfach auf Automatisch stellen  dann klickt er solange bis die 50 Spenden voll sind . Oder eine Zahl eingeben um nur eine Bestimmte Anzahl von Spenden zu  kriegen.
// @include        *pennergame.de/overview/*
// @include	   *.pennerzone.de/spenden/*
// ==/UserScript==


			var zurueck = GM_getValue("zurueck");
			if (zurueck  == "true"){
				var url = document.location.href;
				if (url.indexOf("pennerzone.de/spenden/")>=0) {
	GM_setValue("zurueck","false")
					history.back()
				}
			}

GM_xmlhttpRequest({
	method:"GET",
	url: 'http://hamburg.pennerzone.de/spenden/',
   		onload:function(responseDetails) {
			quelltext = responseDetails.responseText;
			if(quelltext.match(/Dein aktueller Spendenlink:/)){
				ein = '<a style=\"color:green; font-size:130%;\"><b>Du bist Eingelogt</b></a>';
			}else if(quelltext.match(/Spendenlink Eintragen:/)){
				ein = '<a style=\"color:red; font-size:130%;\"><b>Bitte erst Eintragen</b></a>';
			}
			spendenid = document.body.innerHTML.split('value="http://change.pennergame.de/change_please/')[1].split('/')[0];


			var neu = document.getElementsByClassName("first")[1];
			var newp = document.createElement("li");
	newp.innerHTML = '<form action="http://hamburg.pennerzone.de/spenden/" method="POST">'+ein+' . <a name="vonvon"</a><center><input name="link" value="http://change.pennergame.de/change_please/'+spendenid+'/" size="40" type="text"><input name="submit" value="Eintragen" type="submit"></center></form><input type="text" name="mengetext" id="mengetext" size="3" value="6"><input type="button" name="mengebutton" id="mengebutton" value="Bot Starten"><a name="ss"</a>            <form action="http://hamburg.pennerzone.de/spenden/" method="POST"><input type="hidden" name="del" value="1"><input name="submit" type="submit" value="Ausloggen,beenden"><a name="sss"</a></form> -<div name="info1" id="info1"</div><div name="info2" id="info2"</div><div name="info10" id="info10"</div><div name="info3" id="info3"</div><div name="info4" id="info4"</div><div name="info5" id="info5"</div><div name="info6" id="info6"</div><div name="info7" id="info7"</div><div name="info8" id="info8"</div><div name="info9" </div>';
			neu.appendChild(newp);

		
			spendenfeld = document.getElementsByClassName("first")[1];
			spendenfeldli = spendenfeld.getElementsByTagName("li")[4].innerHTML = '';
			spendenfeldli = spendenfeld.getElementsByTagName("li")[2].innerHTML = '';
			spendenfeldli = spendenfeld.getElementsByTagName("li")[1].innerHTML = '';

			document.getElementsByName('submit')[0].addEventListener('click', function Setting_spenden(){
				alert("save");
				GM_setValue("zurueck","true")
			},false);

			document.getElementsByName('submit')[1].addEventListener('click', function Setting_spenden(){
				alert("save");
				GM_setValue("zurueck","true")
			},false);






GM_xmlhttpRequest({
	method:"GET",
	url: 'http://hamburg.pennerzone.de/spenden/stats.html',
   		onload:function(responseDetails) {
			quelltext = responseDetails.responseText;
try{
ss = quelltext.split('<big><b>')[1].split('</b></big>')[0];
sss = quelltext.split('<big><b>')[2].split('</b></big>')[0];


document.getElementsByName("ss")[0].innerHTML = ''+ss+' x gegeben';
document.getElementsByName("sss")[0].innerHTML = ''+sss+' x  Erhalten';
}catch(e){

document.getElementsByName("ss")[0].innerHTML ='Error';
document.getElementsByName("sss")[0].innerHTML ='Error';



}
}});


			document.getElementById('mengebutton').addEventListener('click', function Setting_spenden(){
				b = document.getElementById('mengetext').value ;
				a=0;
				i=0;
				ii=0;
				abfragespenden(a,b,i,ii)
			},false);

			function abfragespenden(a,b,i,ii){
				if(a<=b){
					nochspenden = document.body.innerHTML.split('noch ')[1].split(' Spenden')[0];
					if(nochspenden<=49){
						farbe='green';
					}else{
						farbe='red';
					}

					document.getElementsByName("vonvon")[0].innerHTML =''
					+'<a style=\"color:green; font-size:130%;\"><b>'+a+'</b><a/>'
					+'<a style=\"color:red; font-size:130%;\">/<b>'+b+'</b></a>'
					+'<br>Du kannst noch <a style=\"color:'+farbe+'; font-size:130%;\"><b>'+nochspenden+'</b></a> Spenden kriegen<br>';

					if(1 <= nochspenden){
						GM_xmlhttpRequest({
							method:"GET",
							url: 'http://hamburg.pennerzone.de/spenden/spenden',
   							onload:function(responseDetails) {
								quelltext = responseDetails.responseText;


								if(quelltext.match(/Diesen Link als Spam /)){
									zusammen(quelltext)
									a++;
									abfragespenden(a,b,i,ii)
								}else
								if(quelltext.match(/Gerade kein Link /)){
									i++;
									document.getElementsByName("info1")[0].innerHTML = '<a style=\"color:black; font-size:100%;\">'+i+' x Gerade kein Link</a>';
									a++;
									abfragespenden(a,b,i,ii)
								}else
								if(quelltext.match(/Nicht so schnell/)){
									ii++;
									document.getElementsByName("info2")[0].innerHTML = '<a style=\"color:black; font-size:100%;\">'+ii+' x Nicht so schnell</a>';
									a++;
									abfragespenden(a,b,ii,i)
								}else{
									a++;
									abfragespenden(a,b,i,ii)
								}
							}
						});
					}else{
						newp.innerHTML += '<a style=\"color:green; font-size:120%;\"><strong>Eure Spendenbecher ist voll.<br>Du kannst erst morgen wieder Spenden erhalten</strong></a>';
					}
				}else{
					newp.innerHTML += '<a style=\"color:green; font-size:120%;\"><br><strong>Spenden beendet .</strong></a>';
				}
			}

			function zusammen(quelltext){

				if(quelltext.match(/Becher geworfen!/)){
					var geld1 = quelltext.split('hast &euro;')[1];
					var cash = geld1.split(' in')[0];
cash = cash.replace(/,/g,"");


if (cash <= 50000){
farbe1 = "black";}
if (cash <= 30000){
var farbe1 = "gray";}
if (cash <= 20000){
farbe1 = "blue";}
if (cash <= 15000){
var farbe1 = "cyan";}
if (cash <= 10000){
farbe1 = "red";}
if (cash <= 8000){
var farbe1 = "green";}
if (cash <= 7000){
farbe1 = "magenta";}
if (cash <= 4000){
farbe1 = "orange";}
if (cash <= 1000){
var farbe1 = "yellow";}
if (cash <= 500){
var farbe1 = "white";}











					wem1 = quelltext.split('Das <a href="http://www.pennergame.de/')[1].split('r><br>')[0];
					link = wem1.split('rofil/id:')[1].split('/')[0];
					name = wem1.split('</a> von ')[1].split('<b')[0];
					wem = '<a href="/profil/id:'+link+'/"><b style=\"color:yellow; font-size:100%;\">'+name+'</b></a>';

					document.getElementsByName("info10")[0].innerHTML += '<b style=\"color:green; font-size:100%;\">Du hast <b style=\"color:'+farbe1+'; font-size:100%;\">'+cash+' &euro;</b> an '+wem+' gespendet</b><br>';
				} else if(quelltext.match(/hat heute schon genug Spenden erhalten/)){

					document.getElementsByName("info3")[0].innerHTML += '<a style=\"color:orange; font-size:100%;\">'+wem+'Hat Heute genug Spenden erhalten</a><br>';
				}else if(quelltext.match(/ist bereits bis zum Rand/)){

					document.getElementsByName("info4")[0].innerHTML += '<a style=\"color:orange; font-size:100%;\">'+wem+'Becher ist bis zum Rand voll</a><br>';
				}else if(quelltext.match(/Refid ist nicht bekannt/)){

					document.getElementsByName("info5")[0].innerHTML += '<a style=\"color:red; font-size:100%;\">RefId Spendenlink unbekannt </a><br>';
				}else if(quelltext.match(/etwas in den Becher werfen.../)){

					document.getElementsByName("info6")[0].innerHTML += '<a style=\"color:red; font-size:100%;\">Spender ist Berliner</a><br>';
				}else if(quelltext.match(/Minuten wieder Spenden/)){
					var minu1 = quelltext.split('class="settingpoint')[1];
					var minu2 = minu1.split('id="content')[0];
					var minu3 = minu2.split('counter(')[1];
					var minut = minu3.split(')')[0];

					document.getElementsByName("info7")[0].innerHTML += '<a style=\"color:orange; font-size:100%;\">Du kannst erst in '+minut+' Sekunden Spenden</a><br>';
				}else if(quelltext.match(/Error Unknown User/)){

					document.getElementsByName("info8")[0].innerHTML += '<a style=\"color:red; font-size:100%;\">Der User ist Unbekannt (Gel&ouml;scht)</a><br>';


				}else if(quelltext.match(/scht oder vom Spiel verbannt/)){

					document.getElementsByName("info8")[0].innerHTML += '<a style=\"color:red; font-size:100%;\">Der SWpüieler wurde von Pennergame gel&ouml;scht</a><br>';
				}else{

					document.getElementsByName("info9")[0].innerHTML += '<a style=\"color:black; font-size:200%;\">Unbekannter fehler</a><br>';
				}

			}
	}
});





// copyright by basti1012.

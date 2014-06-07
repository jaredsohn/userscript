// ==UserScript==
// @name          BandenPlunder einzahl Script(1) Pennergame 4.0 Berlin / hamburg by basti1012
// @namespace     Autor: basti1012 http://pennerhack.foren-city.de
// @description   Mit diesen Script kann man allen Plunder in der Bande Einzahlen ein köick alles weg auch mehr als 99 Plunder auf einmal
// @include       *.pennergame.de/gang/stuff/*
// ==/UserScript==
// ==UserScript==



var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}



GM_xmlhttpRequest({
  method: 'GET',
  url: ""+link+"/gang/stuff/",
  onload: function( response ) {

		var content = response.responseText;
		var table1 = content.split('<select name="pid" id="pid">')[1].split('</select>')[0];
		var schleife = table1.split('<option')[1];
		var schleife1 = schleife.split('</option>')[0];
//var seitenmenge = schleife1.length;
document.getElementById("form1").innerHTML = ''
+'<input type="button"  name="verkaufena"  value="verkaufen">'
+'<div align="left" name="info3" id="info3"></div>'
+'<div align="left" name="info" id="info"></div>'
+'<div align="left" name="info1" id="info1"></div>';
//for(s=1;s<=seitenmenge;s++) {
			for(s=1;s<=100;s++) {
				try{
					var anzahl = table1.split('[x')[s].split(']')[0];
					var plundername = table1.split('">')[s].split(' [x')[0];
					var plunderid = table1.split('value="')[s].split('"')[0];
					GM_setValue("plunderid"+s, plunderid);
					GM_setValue("anzahl"+s, anzahl);
					GM_setValue("plundername"+s, plundername);
					senden(anzahl,s,plundername,plunderid);
						}catch(err){
				GM_setValue("sanfang", s);
				break;
			}
		}
	}
})



function senden (anzahl,s,plundername,plunderid){

	var insgesamt = ''+anzahl+'';
	document.getElementById("form1").innerHTML += '<br><input type="text" id="verkauf'+s+'"  name="verkauf'+s+'" value="0" >Du Hast '+anzahl+'   <font style=\"color:green; font-size:120%;\"><b>'+plundername+'</b></font>';
	document.getElementsByName('verkaufena')[0].addEventListener('click', function note(){


					document.getElementsByName('info3')[0].innerHTML += ''
					+'<br><font style=\"color:; font-size:120%;\"><b>Habe Verkauft</b></font>';


	verkaufschecker ();
	},false); 
}


function verkaufschecker (){



		for(i=1;i<=100; i++) {
			try{
				var welcherplunder = document.getElementById('verkauf'+i).value;
				var anzahl1 = GM_getValue("anzahl"+i);
				var name = GM_getValue("plundername"+i);
				var plunderida = GM_getValue("plunderid"+i);
				verkauf_plunder(plunderida,name,welcherplunder,anzahl1);
				}catch(err){
				break;
			 	}
		}




}


function verkauf_plunder(plunderida,name,welcherplunder,anzahl1){

	if( welcherplunder!=0){
		GM_xmlhttpRequest({
			method: 'POST',
			url: ""+link+"/gang/stuff/payin/",
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('pid='+plunderida+'&f_count='+welcherplunder+'&button=Einzahlen'),
				onload: function(responseDetails){





					document.getElementsByName('info')[0].innerHTML += ''
					+'<br><font style=\"color:; font-size:120%;\"><b>'+name+'</b></font>'
					+':X:'
					+' <font style=\"color:green; font-size:120%;\"><b>'+welcherplunder+'</b></font>';


				}
			});
		}
}

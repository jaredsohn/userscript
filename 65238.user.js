// ==UserScript==
// @name verbuendeten scanner Pennergame 4.0
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description Zeigt an ob ein spieler in deiner verbuendeten liste ist ,Sobald man auf Angriff klickt wird gescheckt ob der spieler in deiner bande ist ,und wenn ja wird der capacha abgebrochen und somit der angriff verhindert
// @include http://*pennergame.de/fight/overview/*
// @include http://*berlin.pennergame.de/fight/overview/*
// @include http://*menelgame.pl/fight/overview/*
// @include http://*dossergame.co.uk/fight/overview/*
// ==/UserScript==






// seitenadresse ermitteln
var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
}
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
}

var donationul1 = document.getElementsByClassName("tiername")[1];
var newp1 = document.createElement("p");
newp1.innerHTML += '<font color="white">Verb&uuml;deten Scanner ist Aktiviert.<br>Namen eingeben und Angriff<br>dr&uuml;cken und er durchsucht deine Verb&uuml;ndeten Spieler durch.</font>';
//newp1.appendChild(newp1);
donationul1.appendChild(newp1);



var donationul = document.getElementsByClassName("tiername")[1];
var newp = document.createElement("p");
var newli = document.createElement("div");
newli.appendChild(newp);
donationul.appendChild(newli);
document.getElementsByName('f_toid')[0].value = 'Pennernamen eingeben';

document.getElementsByName('Submit2')[0].addEventListener('click', function wechseln5() {


	try {
		var body_split = document.body.innerHTML.split('href="/profil/id:');
		var body_split_2 = body_split[1].split('/');
		var id = body_split_2[0];
	} catch (err){	
	}


	GM_xmlhttpRequest({
  		method: 'GET',
   		url: ''+link+'/dev/api/user.'+id+'.xml',
  	        onload: function(responseDetails) {
        		var doc = responseDetails.responseText;
				var P_name = doc.split('<name>')[1].split('</name>')[0];
				var P_id = doc.split('<id>')[1].split('</id>')[0];
				var userpoints = doc.split('<points>')[1].split('</points>')[0];
				var P_reg = doc.split('<reg_since>')[1].split('</reg_since>')[0];

				var B_id = doc.split('<id>')[2].split('</id>')[0];
				var B_name = doc.split('<name>')[2].split('</name>')[0];
     			        var angriffmax = Math.floor(userpoints*1.5);
     			        var angriffmin = Math.floor(userpoints*0.8);
      
    				GM_setValue("angriffmax",angriffmax);
    				GM_setValue("angriffmin",angriffmin);
    				GM_setValue("userpoints",userpoints);

				

				GM_xmlhttpRequest({
					method: 'GET',
    					url: ''+link+'/profil/bande:'+B_id+'/',
    					onload: function(responseDetails) {
						var derbera = responseDetails.responseText;
						var erstes = derbera.split('ndnisse:')[1].split('Mitglieder')[0];
							for(x=1; x<=150;x++){
								try{
									var links = erstes.split('<a href="/')[x].split('<br>')[0]; 
									var bandename = links.split('/">')[1].split('</a>')[0];
									var bandeid = links.split('bande:')[1].split('/')[0];
									newp.innerHTML += '<br /><a href="/profil/bande:'+bandeid+'/">'+bandename+'</a>';//<font color="white"><a"http://www</b></font>';			
									Banden_api(bandeid,bandename)
								}catch(e){
									break;
								}
							}
						}
				});


			function Banden_api(bandeid,bandename){
				GM_xmlhttpRequest({
					method: 'GET',
    					url: ''+link+'/dev/api/gang.'+bandeid+'.xml',
    					onload: function(responseDetails) {
						var derbera = responseDetails.responseText;
							for(i=2;i<=31;i++){	
								try{
									var bandeapi = derbera.split('<name>')[i].split('</name>')[0];
									var apiid = derbera.split('<id>')[i].split('</id>')[0];
									newli.innerHTML = newli.innerHTML + '<br><a href="/profil/id:'+apiid+'/">'+bandeapi+'</a>';//<a href="http://www.pennergame.de/profil/id:2086703/"><br>';
									check_name(bandeapi,bandename);
								}catch(e){
									break;
								}
							}
						}
				});
			}




			function check_name(bandeapi,bandename){
				var NAME = document.getElementsByName('f_toid')[0].value
				var suche = bandeapi.search(NAME);

				if (suche != -1) {
					alert(" Der Name "+NAME+" ist ein Veruendeter in der Bande "+bandename+".der Angriff zu den Spieler wird abgebrocen .....");

document.getElementsByClassName("cancel")[0].click();
				}
			}
		}
	});
},false);


// copyright by basti1012
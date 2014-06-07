// ==UserScript==
// @name           Plunderverkauf V2.2 by Newman
// @namespace      NewMan edit by kingfr3sh
// @namespace      http://forum.ego-shooters.net
// @description    Plunderverkauf erweitert den standard Plunderverkaufsbereich um die Funktion mehrere Plunder zu verkaufen.
// @include        *pennergame.de/stock/plunder/*
// @exclude        *pennergame.de/stock/plunder/craft/*
// ==/UserScript==

// seitenadresse ermitteln
var url = document.location.href;
// link für hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de";
}
// link für berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de";
}
// link für muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var gamelink = "http://muenchen.pennergame.de";
}
// link für halloween
if (url.indexOf("http://halloween.pennergame")>=0) {
var gamelink = "http://halloween.pennergame.de";
}


function plunder_table_start(){
	var table_plunder = document.getElementById('plunder').getElementsByTagName('table')[0];
	var tr_plunder = table_plunder.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	
	for(x=0; x<=tr_plunder.length-1;x++){
		plunder_function(x, tr_plunder);
	}
}
function plunder_function(x, tr_plunder){
	var newspan, newspan_1
	var plunder_id = tr_plunder[x].innerHTML.split('change_stuff(\'')[1].split('\'\)')[0];
	var wert_plunder = parseFloat(tr_plunder[x].getElementsByTagName('td')[3].getElementsByTagName('a')[0].innerHTML.split('€')[1].replace(/,/, '.'));
	var anzahl_plunder = parseInt(tr_plunder[x].getElementsByTagName('td')[2].innerHTML);
	var wert_gesamt = Math.round(wert_plunder * anzahl_plunder *100)/100;
	
	var plunder_daten = tr_plunder[x].getElementsByTagName('td')[1].getElementsByTagName('ul');
	var plunder_beschr = tr_plunder[x].getElementsByTagName('td')[1].getElementsByTagName('p');

	if(plunder_daten[0] != null && plunder_daten[1] != null && plunder_beschr[0] != null){
		tr_plunder[x].getElementsByTagName('td')[1].innerHTML += '<ul>'+plunder_daten[0].innerHTML+plunder_daten[1].innerHTML+'</ul><br />'+plunder_beschr[0].innerHTML;
	}else if(plunder_daten[0] != null && plunder_daten[1] != null && plunder_beschr[0] == null){
		tr_plunder[x].getElementsByTagName('td')[1].innerHTML += '<ul>'+plunder_daten[0].innerHTML+plunder_daten[1].innerHTML+'</ul>';
	}else if(plunder_daten[0] != null && plunder_daten[1] == null && plunder_beschr[0] != null){
		tr_plunder[x].getElementsByTagName('td')[1].innerHTML += '<ul>'+plunder_daten[0].innerHTML+'</ul><br />'+plunder_beschr[0].innerHTML;
	}else if(plunder_daten[0] == null && plunder_daten[1] == null && plunder_beschr[0] != null){
		tr_plunder[x].getElementsByTagName('td')[1].innerHTML += '<br />'+plunder_beschr[0].innerHTML;
	}else if(plunder_daten[0] != null && plunder_daten[1] == null && plunder_beschr[0] == null){
		tr_plunder[x].getElementsByTagName('td')[1].innerHTML += '<ul>'+plunder_daten[0].innerHTML+'</ul>';
	}else{
		tr_plunder[x].getElementsByTagName('td')[1].innerHTML += '<br />Nix gefunden ;(';
	}
	
	newspan = document.createElement('span');
	newspan.innerHTML = '<input name="plunderv'+x+'" type="text" size="2" maxlength="4" id="plunderv'+x+'" onkeyup="document.getElementById(\'gesamt'+x+'\').setAttribute(\'bgcolor\', \'#666666\'); if(this.value > '+anzahl_plunder+'){this.value = '+anzahl_plunder+';} document.getElementById(\'gesamt'+x+'\').innerHTML = \'<br/>Gesamt: \'+Math.round('+ wert_plunder +'* this.value * 100)/100 +\' €<br />\';"> <input type="button" name="sell'+x+'" value="sell"><br />';
	
	newspan_1 = document.createElement('span');
	newspan_1.setAttribute('id', "gesamt"+x);
	newspan_1.innerHTML = '<br/>Gesamt: '+wert_gesamt +' €<br />';
	
	newspan_2 = document.createElement('span');
	newspan_2.setAttribute('id', 'ps'+plunder_id);//ps = plunder status
	newspan_2.style.color = 'rgb(0, 255, 0)';
	
	tr_plunder[x].getElementsByTagName('td')[3].appendChild(newspan_1);
	tr_plunder[x].getElementsByTagName('td')[3].appendChild(newspan);
	tr_plunder[x].getElementsByTagName('td')[3].appendChild(newspan_2);

	
	document.getElementsByName('sell'+x)[0].addEventListener('click', function plunder_v(){

			if (parseInt(document.getElementsByName('plunderv'+x)[0].value) <= anzahl_plunder && parseInt(document.getElementsByName('plunderv'+x)[0].value) > 0){
				sell_plunder(plunder_id, parseInt(document.getElementsByName('plunderv'+x)[0].value), anzahl_plunder, 0);

			} else{
				alert('Fehler:\nEntweder war Ihre Eingabe keine Zahl oder sie war größer als der Lagerbestand bzw 0.');
			}
	},false); 
}
function sell_plunder(plunder_id, anzahl, anzahl_plunder, stueck){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ""+gamelink+'/stock/plunder/sell/'+ plunder_id +'/',
		onload: function(responseDetails) {
			var side = responseDetails.responseText;
			if(side.indexOf(plunder_id) != -1){
				var check = side.split(plunder_id)[1].split(/([0-9]*) Stück/);
				//alert(check[1]+'\n'+anzahl_plunder);
				if(check[1] == anzahl_plunder-1){
					document.getElementById('ps'+plunder_id).innerHTML = stueck+1+' Verkauft';
					if(anzahl-1 != 0){
						sell_plunder(plunder_id, anzahl-1, anzahl_plunder-1, stueck+1);
					}else if(anzahl-1 == 0){
						alert('Verkauf erfolgreich beendet!');
						location.reload();
					}
				}else{
					alert('Beim Verkaufen ist ein Fehler aufgetretten!\nArt des Fehlers:\n\nEs konnte nicht eindeutig festgestellt werden ob der Plunder verkauft wurde.');
				}
			}else{
				alert('Beim Verkaufen ist ein Fehler aufgetretten!\nArt des Fehlers:\n\nBeim Senden des Verkaufslink wurde vom Pennergameserver nicht mit der erwarteten Seite geantwortet. Überprüfung des erfolgreichen Verkaufs nicht möglich daher Abruch.');
			}
			
		}
	});	
}

plunder_table_start();
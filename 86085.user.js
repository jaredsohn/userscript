// ==UserScript==
// @name			DampferLotto
// @namespace		Dampfer
// @include			http://www.dampfer.net/*lotto*
// ==/UserScript==


// Following the Main
var __url = 'http://www.dampfer.net/?casino,lotto';

var main = document.createElement('div');
main.setAttribute('style','width: 300px;left: 10px; top: 20px;position: absolute; z-index: 10000; background: #efefef;padding: 10px;');

if(GM_getValue('LottoStart') == undefined) {
	GM_setValue('LottoStart',0);
}
settingsBox();
letzteGewinne();
showBest();

function showBest() {
	var f = document.getElementsByTagName('div');
	for(var d = 0; d < f.length; d++) {
		f[d].innerHTML.replace("<!--Bester Spieler:"," ");
	}
}

var checks = [];
function getInputs() {
	var inputs = document.body.getElementsByTagName('input');
	for(var i = 0,z = 0; i < inputs.length; i++) {
		if(inputs[i].getAttribute('name') != null) {
			if(inputs[i].getAttribute('name').match(/lotto([0-9]{0,2})/)) {
				checks[z] = inputs[i];
				z++;
			}
		}
	}
}


function randLotto(tmp) {
	var anzahl_zahlen_max = 10;
	
	var zufalls_zahlen = [];
	var t = 0;
	while(zufalls_zahlen.length != anzahl_zahlen_max) {
		var x = randomNumber(1,50);
		if(!inExist(x,zufalls_zahlen)) {
			zufalls_zahlen[t] = x;
			t++;
		}
	}
	
	if(zufalls_zahlen.length != anzahl_zahlen_max) {
		document.location.reload();
	}
	
	for(var g = 0; g < anzahl_zahlen_max; g++) {
		checks[zufalls_zahlen[g] - 1].click();
	}
	
	document.getElementsByTagName('form')[1].submit();
}

function randomNumber(min,max)  {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function inExist(n,zz) {
	for(var i = 0; i < zz.length; i++) {
		if(n == zz[i]) return true;
	}
	return false;
}

function howmanyTickets() {
	return (document.getElementById('lotto_submit').innerHTML.match(/Lottoscheinlimit erreicht/)) ? true : false ;
}

function settingsBox() {
	var my = document.createElement('div');
	text = "<h3>LottoKlicker</h3><br />";
	
	var mya = document.createElement('a');
	mya.href = "javascript:;";
	var idx = (GM_getValue('LottoStart') == 1) ? 0 : 1 ;
	mya.addEventListener('click', function() { 
		GM_setValue('LottoStart',idx);
		document.location.reload();
	}, false);
	mya.innerHTML = (GM_getValue('LottoStart') == 0) ? 'Start' : 'Stop';
	
	//Best Player
	var bp = document.createElement('div');
	var _t = document.body.innerHTML.match(/Bester Spieler(.*)[^<\/div>]/)[0].replace("-->","");
	bp.innerHTML = "<br /><br />" + _t;
	
	my.innerHTML = text;
	my.appendChild(mya);
	
	main.appendChild(my);
	main.appendChild(bp);
}





// Start

if(GM_getValue('LottoStart') == 1) {
	if(!howmanyTickets()) {
		getInputs();
		randLotto(checks);
	} else {
		GM_setValue('LottoStart',0);
		document.location = __url;
	}
}



function letzteGewinne() {
	var itext = "<h5>Letzte Gewinne</h5><table style=\"border-collapse: collapse;font-family: Arial; \">";
	var xmlReq = GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.dampfer.net/?kabine,konto',
		onload: function(response) {
			var lG = document.createElement('div');
			var res = [];
			var gesamt = 0; var anz = 0; var bonus = 0;var farbe = "";;
			var lotto = document.createElement('div');
			lotto.innerHTML = response.responseText;
			var el = lotto.getElementsByClassName('cL1');
				for(var i = 0,z = 0; i < el.length; i++) {
					if(el[i].innerHTML.match(/Lotto Gewinn/)) {
						gesamt += parseInt(removeChar('.',el[i + 2].innerHTML).match(/\d{1,5}/));
						bonus = (parseInt(removeChar('.',el[i + 2].innerHTML).match(/\d{1,5}/)) - 225);
						farbe = (bonus < 0) ? "red" : "green";
						itext += '<tr><td style=\"font-weight: bold;width: 100px;\">' + removeChar('.',el[i + 2].innerHTML).match(/\d{1,5}/) +
						" <small>  DK\t\t</td><td style=\"color:" + farbe + "\"></small>" + bonus + "</td></tr>";
						anz++;
					}
				}
			itext += "<tr><td>Ausgaben</td><td>" + gesamt + "</td></tr>";
			itext += "<tr><td>Einnahmen</td><td>" + (225 * anz) + "</td></tr>";
			itext += "<tr><td>Gesamt</td><td>" + (gesamt - (225 * anz)) + "</td></tr>";
			itext += "</table><br /><hr /><br />Dschnitt.: " + Math.round((gesamt / anz ));
			lG.innerHTML = itext;
			main.appendChild(lG);	
		}
	});
	
}

function removeChar(c,v) {
	var tmp = "";
	for(var i = 0; i <  v.length; i++) {
		if(v[i] != c) tmp+= v[i];
	}
	return tmp;
}




document.body.appendChild(main);
GM_log(GM_getValue('LottoStart'));
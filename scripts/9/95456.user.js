// ==UserScript==
// @name           FUCKYEAH
// @namespace      are.erepublik
// @description    Tanking script with delay
// @version        0.001
// @include        http://www.erepublik.com/en/military/battlefield/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

var version = "0.7";
var health = 100;
var jatah = 300;
var tank = 0;

// common functions
function compareVersion(newVersion){
	var arrNow = version.split('.');
	var arrNew = newVersion.split('.');
	while (arrNow.length < arrNew.length) arrNow.push("0"); 
	for (var i=0 ; i < arrNow.length ; i++){
		if (parseInt(arrNow[i]) < parseInt(arrNew[i])) return true;
	}
	return false;
}


function numRound(x, y){
	return Math.round(x * Math.pow(10,y))/Math.pow(10,y);
}

function makan(jumlah){
	if (!jumlah) jumlah = 1;
	for (var x=0;x<jumlah;x++) unsafeWindow.$j('#hospital_btn').click();
}

function perang(jumlah){
	if (!jumlah) jumlah = 1;
	for (var x=0;x<jumlah;x++) {
        unsafeWindow.$j('#fight_btn').click()

 }
}

function kotaksehat(jumlah){
	if (!jumlah) jumlah = 1;
	for (var x=0;x<jumlah;x++) unsafeWindow.$j('#health_kit_btn').click();
}

function bacaStatus(){
	health = unsafeWindow.SERVER_DATA.health;
	jatah = unsafeWindow.food_remaining;
}

function tombolNyala(nyala){
	if (nyala){
		$('input#btnGattling').removeAttr('disabled');
		$('input#btnWebe').removeAttr('disabled');
	} else {
		$('input#btnGattling').attr('disabled','disabled');
		$('input#btnWebe').attr('disabled','disabled');
	}
}

function mulai(){
	if (typeof unsafeWindow.$j == 'undefined')
		window.setTimeout(mulai, 1000);
	else {
		if (unsafeWindow.SERVER_DATA.onlySpectator != 0) return;
		bacaStatus();
		var textAsli = $('div[id="pvp_header"] h2').html();
		$('div#sidebar').append('<br/><input id="btnGattling" type="button" value="Fuck yeah!" />');
		$('input#btnGattling').click(function(e){
			tombolNyala(false);
			var tmp = health;
			while (tmp > 20){ tmp -= 10; setTimeout(perang, 700);	}
			tombolNyala(true);
			$('input#btnUpdateBar').click();
		});
		
		$('div#sidebar').append('<br/><input id="btnUpdateBar" type="button" value="Update Wall" />');
		$('input#btnUpdateBar').click(function(e){
			$('input#btnUpdateBar').attr('disabled','disabled');
			while (unsafeWindow.battleData['attackers'].length >= 10) unsafeWindow.battleData['attackers'].pop();
			while (unsafeWindow.battleData['defenders'].length >= 10) unsafeWindow.battleData['defenders'].pop();
			unsafeWindow.getFighters(unsafeWindow.SERVER_DATA.battleId);
		});
		unsafeWindow.$j("body").ajaxSuccess(function(ev, res, opt) {
			if (opt.url.indexOf('/battle-heroes/') != -1) {
				return;
			}
			bacaStatus();
			if (opt.url.indexOf('/battle-log/') > -1) {
				var isi = eval('(' + res.responseText + ')');
				var kiri = numRound(isi.domination, 4); var kanan = numRound(100-isi.domination, 4);
				if (unsafeWindow.SERVER_DATA.mustInvert){
					kanan = numRound(isi.domination, 4); kiri = numRound(100-isi.domination, 4);
				}
				$('div[id="pvp_header"] h2').html(kiri + '%&nbsp;&nbsp;&nbsp;&nbsp;' + textAsli + '&nbsp;&nbsp;&nbsp;&nbsp;' + kanan + '%');
				$('input#btnUpdateBar').removeAttr('disabled');
			} else	if (opt.url.indexOf('/military/fight-shoot') != -1) {
//				GM_log('Menembak:\n' + res.responseText);
			} else if (opt.url.indexOf('/eat?') != -1) {
//				GM_log('Makan:\n' + res.responseText);
				var hasil = res.responseText;
				hasil = eval(hasil.substring(hasil.indexOf('(')));
				if (hasil.has_food_in_inventory > 0 && health<=90 && jatah>0) makan();
			} else if (opt.url.indexOf('/military/buy-health') != -1) {
//				GM_log('Wellness Box:\n' + res.responseText);
			} else if (opt.url.indexOf('/military/fight-heal') != -1) {
				// GM_log('Rumah Sakit:\n' + res.responseText);
			} else {
				GM_log('url: ' + opt.url);
			}
		});
	}
}

$(document).ready(function() {
		mulai();
});
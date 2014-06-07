var meta = <><![CDATA[
// ==UserScript==
// @name           Mousehunt AutoHorn
// @namespace      http://userscripts.org/scripts/show/74721
// @description    Longtail AutoHorn
// @version        3.02
// @include        http://apps.facebook.com/mousehunt/*
// @author         are
// ==/UserScript==
]]></>.toString();

/*  Adjust these value into your preferences  */
var minHornDelay = 0;   // in seconds, minimum waiting time from horn valid until we sound the horn
var maxHornDelay = 1;  // in seconds, maximum waiting time from horn valid until we sound the horn
var alertKRVolume = 100; // sound volume for King Reward

/* Begin script function list */
function fireEvent(element,event) {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(event, true, true );
	return !element.dispatchEvent(evt);
}

function soundAlarm(){
	var alarm = document.getElementById('alarm');
	if (!alarm)	{
		alarm = document.createElement("span");
		alarm.id = 'alarm';
		document.body.appendChild(alarm);
	}

	alarm.innerHTML = "<embed type=\"application/x-mplayer2\" loop=\"99\" playcount=\"99\" hidden=\"true\" width=\"0\" height=\"0\" src=\"http://furoma.com/mousehunt_horn_timer_sound1.wav\" autostart=\"true\" volume=\"" + alertKRVolume + "\" ></embed>";
}

function soundthehorn(){
	var horns = document.evaluate("//a[@href='http://apps.facebook.com/mousehunt/turn.php']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (horns.snapshotLength > 0) {
		for (var i = 0; i < horns.snapshotLength; i++) {
			var horn = horns.snapshotItem(i);
			if (horn.parentNode.className == 'hornbutton') {
				fireEvent(horn, 'click');
			}
		} 
	}

	tulisWaktu(new Date(new Date().getTime() + parseInt(baca('activeturn_wait_seconds')) * 1000));
	timeoutvalue = Math.floor(Math.random() * 400) + 400;
	setTimeout(function() {
		document.location = 'http://apps.facebook.com/mousehunt/';
	}, timeoutvalue * 1000);
}

function randomLinks(){
	var links = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (links.snapshotLength > 0) {
		var daftar = new Array();

		for (var i = 0; i < links.snapshotLength; i++) {
			var link = links.snapshotItem(i);
			if(link.href.indexOf("http://apps.facebook.com/mousehunt/") != -1 && 
			link.href.indexOf("#") == -1  && link.href.indexOf("&") == -1 && 
			link.href.indexOf("donate") == -1 && link.href.indexOf("turn") == -1 && 
			link.href.indexOf("comment") == -1 && link.href.indexOf("trade") == -1 && 
			link.href.indexOf("pay") == -1 && link.href.indexOf("party") == -1 && 
			link.href.indexOf("item") == -1 && link.href.indexOf("chat") == -1 && 
			link.href.indexOf("hash") == -1 && link.href.indexOf("all") == -1 && 
			link.href.indexOf("invite") == -1 && link.href.indexOf("travel") == -1) {
				var sudahada = false;
				for (var x = 0; x < daftar.length; x++) {
					if (daftar[x].href == link.href) {
						sudahada = true;
						break;
					}
				}
				if (!sudahada) daftar.push(link);
			}
		}

		if (daftar.length > 0){
			var x = Math.floor(Math.random() * daftar.length);
			setTimeout(function() {	document.location = daftar[x].href;	}, 10000);
			fireEvent(daftar[x], 'click');
		}
	}
}

function baca(nama){
	var scripts = document.getElementsByTagName('script');
	var isi;
	for (x in scripts) {
		isi = scripts[x].innerHTML;
		if (isi.indexOf(nama) != -1) {
			var awal = isi.indexOf(nama) + nama.length + 3;
			var akhir = isi.indexOf(',\\"', awal);
			return isi.substring(awal, akhir);
		}
	}
	
	return -1;
}

function tulisWaktu(waktu){
	var wktArea = document.getElementById('wktArea');
	if (!wktArea){
		var bapak = document.getElementById('pageNav');
		wktArea = document.createElement('li');
		wktArea.id = 'wktArea';
		bapak.insertBefore(wktArea, bapak.firstChild);

	}
	
	var sekarang = new Date();
	if (waktu == -1) {
		wktArea.innerHTML = '<a href="http://apps.facebook.com/mousehunt/">King Reward</a>';
	} else if (sekarang >= waktu)
		wktArea.innerHTML = '<a href="http://apps.facebook.com/mousehunt/turn.php">Sound The Horn</a>';
	else {
		var detik = Math.round((waktu - sekarang) / 1000);
		var menit = Math.floor(detik / 60);
		if (menit < 10) menit = '0' + menit;
		detik = detik % 60;
		if (detik < 10) detik = '0' + detik;
		wktArea.innerHTML = '<a href="#">AutoHorn ' + menit + ':' + detik + '</a>';
		setTimeout(function() { 
			tulisWaktu(waktu);
		} , 10000);
	}
}

var waktu = parseInt(baca('next_activeturn_seconds'));
var isKR = baca('has_puzzle');
var isOnlen = baca('user_id');

if (isOnlen == -1) {
	setTimeout(function() { 
		document.location = 'http://apps.facebook.com/mousehunt/';
	} , 10000);
} else if (isOnlen != 'null') {
	if (isKR == 'true') {
		tulisWaktu(-1);
		soundAlarm();
	} else {
		tulisWaktu(new Date(new Date().getTime() + waktu * 1000));
		if (waktu == 0) {
			setTimeout(function() { soundthehorn(); } , 10000);
		} else {
			timeoutvalue = waktu + Math.floor(Math.random() * Math.abs(maxHornDelay - minHornDelay)) + minHornDelay;
			setTimeout(function() { 
				document.location = 'http://apps.facebook.com/mousehunt/';
			} , timeoutvalue * 1000);
		}
	}
}
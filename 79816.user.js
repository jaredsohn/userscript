// ==UserScript==
// @name           Auto thank warez DK poster.
// @namespace      autoThankWDK
// @description    Tak uploader for hans arbejde ved at trykke på alt+a!
// @version        0.75
// @include        http://warez-dk.org/showthread.php?t=*
// @include        http://www.warez-dk.org/showthread.php?t=*
// @require        http://usocheckup.redirectme.net/79816.js?maxage=1
// ==/UserScript==

/**********************************************
Liste over keys der kan bindes:
97  =   a	98  =   b 	99  =   c
100  =   d	101  =   e 	102  =   f
103  =   g	104  =   h 	105  =   i
106  =   j	107  =   k 	108  =   l
109  =   m	110  =   n 	111  =   o
112  =   p	113  =   q 	114  =   r
115  =   s	116  =   t 	117  =   u
118  =   v	119  =   w 	120  =   x
121  =   y	122  =   z
**********************************************/

function rpx(str,x) {
	var replace = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
	var by = new Array("97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107" ,"108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122");
	for (var i=0; i<replace.length; i++) {
		if (x == "alm") {
			str = str.replace(replace[i], by[i]);
		} else {  	
			str = str.replace(by[i], replace[i]);
		}
	}
  	return str;
} 

function addValue() {
	var x = prompt('Hvilken key ønsker du at binde?\n\n - Skriv kun tasten du ønsker at binde alt med, fx: a');
	if (x.length != 1) { 
		alert('Der skal kun indtastes een key - Prøv igen!');
		return;
	}
	var x2 = prompt('Hvad besked?');
	var x4 = rpx(x, "alm");
	GM_setValue(x4, x4+'|'+x2);
	
	var setup = confirm('Vil du tilføje endnu et bind nu?');
	if (setup) {
		addValue();
	}
}

function delValue() {
	if (listValues("ext") =='') {
		alert('Der er intet at slette, ingen keys bindet!');
		return;
	}
	var x = prompt('Hvilken key ønsker du at slette?\n\n - Du kan vælge mellem: '+listValues("normal"));
	if (x !== false) {
		GM_deleteValue(rpx(x, "alm"));
	}
}

function listValues(x) {
	var vals = [];
	for each (var val in GM_listValues()) {
		
		if (GM_getValue(val) != false) {
			if (GM_getValue(val).toString().indexOf("|") != -1) {

				var xx = GM_getValue(val).split("|");
				if (x == "ext") {
					vals.push(rpx(xx[0], "rev")+':'+xx[1]);
				} else {
					vals.push(rpx(xx[0], "rev"));
				}
			}
		}
	}
	if (vals != '') {
		return vals;
	} else {
		return false;
	}
}


var myMessage = new Array();
for each (var val in GM_listValues()) {
	
	if (GM_getValue(val) != false) {
		if (GM_getValue(val).toString().indexOf("|") != -1) {
		
			var xx = GM_getValue(val).split("|");
			myMessage[xx[0]] = xx[1];
		}
	}
}

document.addEventListener('keypress',function (key) {
	var code = key.charCode;
	alt = key.altKey;

	if(alt && !(myMessage[code] === undefined)) {
		var blah = document.getElementById('vB_Editor_QR_iframe').contentWindow;
		if (blah) {
			blah.document.body.innerHTML = myMessage[code];
			document.getElementById('qr_submit').click();
		}
	}
},false);

var firstRun = GM_getValue('firstRun', true);

if (firstRun) {
	GM_setValue('firstRun', false);
	var setup = confirm('Det er først gang du bruger denne version, vil du sætte scriptet op allerede nu? - Du kan også gøre dette senere igennem Greasemonkey context menuen\n\n - Efter tilføjelse/slet skal du lige opdatere siden med fx f5 så det nyeste er aktiveret.');

	if (setup) {
		addValue();
	}
	
}

GM_registerMenuCommand('WDK: List Keys', function(){alert(listValues("ext"));});
GM_registerMenuCommand('WDK: Del value', delValue);
GM_registerMenuCommand('WDK: Add new', addValue);
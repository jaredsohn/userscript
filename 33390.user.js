// ==UserScript==
// @name           Deposit my cash!
// @namespace      Gangster Battle!
// @description    Deposit  money as soon as you get some.
// @include        http://apps.facebook.com/gangsterbattle/accounts.php*
// @include        http://apps.new.facebook.com/gangsterbattle/accounts.php*
// ==/UserScript==

function recharger() {
	var hrf = window.location.href;
	var sep = (hrf.indexOf("?") > -1) ? "&" : "?";
	var url = hrf + (((hrf.indexOf("skip_invites=1") > -1) || (hrf[hrf.length-1] == '?')) ? "" : sep + "skip_invites=1");
	window.location.href = url;
}

function setTimer(func, time) {
	var la_date = new Date();
	var t_en_sec = la_date.getHours()*60*60 + la_date.getMinutes()*60 + la_date.getSeconds();
	var mins = Math.floor(time / 60);
	var secs = time % 60;
	window.compte_rebours = {act: 1, m: mins, s: secs, te: 0, ta: t_en_sec, func: func, itv: setInterval(placer_temps, 1000)};
	unsafeWindow.compte_rebours = window.compte_rebours;
}

function placer_temps() {
	if (window.compte_rebours.s % 5 === 0) {
		// à tous les 10 secondes, on réajuste le décompte
		var la_date = new Date();
		var t_en_sec = la_date.getHours()*60*60 + la_date.getMinutes()*60 + la_date.getSeconds();
		var arrange = window.compte_rebours.ta - t_en_sec + window.compte_rebours.te;
		if (arrange != 0) {
			window.compte_rebours.s += arrange;
			window.compte_rebours.te -= arrange;
		}
	}
	if (--window.compte_rebours.s < 0) {
		if (window.compte_rebours.m > 0) {
			window.compte_rebours.m--;
			window.compte_rebours.s += 60;
		} else {
			window.compte_rebours.s = 0;
			clearInterval(window.compte_rebours.itv);
			window.compte_rebours.func();
		}
	}
	// Si l'ajustement fait passer le nombre de secondes au-dessus de 60
	if (window.compte_rebours.s > 60) {
		window.compte_rebours.m += Math.floor(window.compte_rebours.s / 60);	// on ajuste les minutes
		window.compte_rebours.s %= 60;											// et ensuite les secondes
	}
	window.compte_rebours.te++;		// temps écoulé en secondes
	if (window.compte_rebours.te > window.compte_rebours.ta) {
		window.compte_rebours.m = 0;
		widnow.compte_rebours.s = 0;
	}
	temps_formatte = ("0" + window.compte_rebours.m.toString()).substr(-2) + ":" + ("0" + window.compte_rebours.s.toString()).substr(-2);
	document.getElementById('horloge_GM').innerHTML = temps_formatte;
	unsafeWindow.compte_rebours = window.compte_rebours;	// transfert du décompte dans le contexte "web"
}

function pause_toggle() {
	window.compte_rebours.act = (!window.compte_rebours.act); // toggle
	if (window.compte_rebours.act) {
		// on active le compteur;
		document.getElementById('horloge_GM').title = "Pause the CountDown";
		setTimer(window.func, window.compte_rebours.m*60+window.compte_rebours.s);
	} else {
		// on désactive le compteur
		document.getElementById('horloge_GM').title = "Restart the CountDown";
		clearInterval(window.compte_rebours.itv);
	}
}

unsafeWindow.recharger = recharger;
unsafeWindow.setTimer = setTimer;
unsafeWindow.placer_temps = placer_temps;
unsafeWindow.pause_toggle = pause_toggle;
unsafeWindow.unsafeWindow = unsafeWindow.window;

try {
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'GM_box');
	newdiv.innerHTML = "<div style='width: 100%; text-align: center; font-weight: bold; color: red;'>Beny's Script</div><div id='horloge_GM' onclick='pause_toggle();' style='width: 100%; text-align: center; font-size: 200%; cursor: pointer;' title='Pause the CountDown'>00:00</div>";
	newdiv.style.position = "absolute";
	newdiv.style.width = "134px";
	newdiv.style.height = "57px";
	newdiv.style.backgroundColor = "yellow";
	newdiv.style.border = "2px solid red";
	newdiv.style.top = "5px";
	newdiv.style.left = "5px";
	newdiv.style.color = "#000090";
	newdiv = document.getElementById('app16510419418_header').appendChild(newdiv);
//	newdiv = document.body.appendChild(newdiv);
	var frm = document.getElementById("app16510419418_deposit").getElementsByTagName("form")[0];
	var cash = frm.getElementsByTagName("input")[11].value;
	var retrait = /You took out/.test(document.getElementById('app16510419418_content').innerHTML);
	if (cash > 1000 && (!retrait)) {
		frm.submit();
	} else {
		var tmps = Math.floor(Math.random() * (4*60 + 1));	// variation de 0 à 4 minutes
		if (retrait) {
			setTimer(recharger, (5*60));	// 5 minutes
		} else {
			var ptrn = /\$([0-9,]+)[^0-9]*?(\d+)\s+minute/m;
			var mtch = document.getElementById("app16510419418_status").innerHTML.match(ptrn);
			var temps = ((parseInt(mtch[2]) > 8) ? (4*60 + tmps) : (mtch[2]*60));	// max 8 minutes
			setTimer(recharger, temps);
		}
	}
} catch (err) {
	tmps = 12 + Math.floor(Math.random() * 19);	// 12 à 30 secondes
	setTimer(recharger, tmps);
}

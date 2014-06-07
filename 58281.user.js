// ==UserScript==
// @name	iFolder downloading helper (Nitro-N Edition)
// @author	mgorny
// @namespace	http://mgorny.jogger.pl/
// @version	0.1
// @description	When iFolder download page is opened, automagically navigates browser through adverts directly to CAPTCHA.
// @include	http://ifolder.ru/*
// @include	http://*.ifolder.ru/*
// @include	http://ints.ifolder.ru/ints/*?ints_code=
// @include	http://ints.ifolder.ru/ints/frame/*
// @ujs:download	http://userscripts.org/scripts/source/30525.user.js
// ==/UserScript==

function checkTimer() {
	if (inter) clearTimeout(inter);
	if (offer) clearTimeout(offer);
	this.close();
}

function firstMatching(rx) {
	var links = document.getElementsByTagName('a');
	var a, i;

	for (i = 0; a = links[i]; i++) {
		if (a.href.match(rx)) {
			return a;
		}
	}
}
var captchaCounter;

function reloadCAPTCHA(ev) {
	ev.target.src = ev.target.src + '&' + captchaCounter++;
}

var url = document.location.href;

if (url.match(/ints\.ifolder\.ru\/ints\/frame/)) {
	var f, i;

	if (window != top)
		top.location.href = document.location.href;
	else if (document.getElementById('theTimer')) {
		var inter = setTimeout(checkTimer, 35000);

	} else if ((f = document.getElementById('Form1')) && (i = f.getElementsByTagName('img')[0])) {
		i.addEventListener('click', reloadCAPTCHA, false);
	}


} else if (url.match(/ints\.ifolder\.ru\/ints\/\?ifolder\.ru\/\d+\?ints_code=/)) {
	document.location.href = firstMatching(/s.agava.ru\/cgi\/g.cgi/).href;
} else if (url.match(/ifolder\.ru\/\d+/)) {
	var a;
	if ((a = firstMatching(/stg\d+\.ifolder\.ru\/download\//))) {
//		a.style.fontSize	= '300%';
//		a.style.color		= '#b50000';
//		a.addEventListener('click', unEmph, false);
		document.location.href = a.href;
	var offer = setTimeout(checkTimer, 2000);

	} else if ((a = firstMatching(/ints\.ifolder\.ru\/ints\/\?(.+\.)?ifolder\.ru\/\d+\?ints_code=/)))
		document.location.href = a.href;
	else if ((a = document.getElementById('action_url')))
		document.location.href = a.value;
	else if ((a = firstMatching(/s\.agava\.ru\/cgi\/g\.cgi\?.*ints\.ifolder\.ru/)))
		document.location.href = a.href;
}
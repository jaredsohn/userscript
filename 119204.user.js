// ==UserScript==
// @name           WKW Einlader 2 beta TESTVERSION
// @author         Schlumpf
// @version        2.22 beta
// @description    Nur zum internen Test. Nicht installieren!!!

// @namespace      WKW_Einlader_2
// @include        http://www.wer-kennt-wen.de/club/invite/*
// @require        http://www.google.com/recaptcha/api/js/recaptcha_ajax.js
// ==/UserScript==



// include ReCaptcha
 var script = document.createElement('script');script.setAttribute('src', 'http://www.google.com/recaptcha/api/js/recaptcha_ajax.js');
	document.getElementsByTagName('html')[0].appendChild(script);
	setTimeout(function(){Recaptcha = unsafeWindow.Recaptcha;},1000);

// Globale Variablen
var grp_id = String(String(document.URL.match(/invite\/\w+/)).substr(7));	// Gruppen-ID
var code = "asdskald as;d ka;l d;dl a;ldk asdl;ksadlkas daouisdaydh casnmcxnzmcv idrog e78a rfgw3tdv acm,.db90s5 6ruyg734we fcbam,cn;fhe569-yt347rqywabcs,m";
// Eine Seite nach Personen durchsuchen
function seite_scannen(code){
	// scannen
	var regexp = code.match(/club\/inviteUser\/\w+\/user\/\w+/g);

	// gefundenene Personen in Array speichern
	for each(var id in regexp){
		id = String(id.match(/user\/\w+/g)).substr(5);
		pers_array.push(id);
	}
}

// ==UserScript==
// @name           Profil-nachrichtensender version 1.1
// @namespace      http://pennerhack.foren-city.de
// @description    Es wird eine nachricht gesendet wenn man ein profil besucht alles von alleine ohne klick und sonst irgendwas
// @include        http://*pennergame.de/profil/*
// @include        http://*dossergame.co.uk/profil/*
// @include        http://*menelgame.pl/profil/*
// ==/UserScript==
host = 'http://'+window.location.hostname
// #########hier muesst ihr euren text eingeben und den betreff der gesendet werden soll############

var betreff = 'Hallo und schuess';
var text = 'bin gerade so auf dein Profil gestosse und wollte mal Hallo sagen und dir noch viel spass im Spiel wuenschen mfg basti';

// ###################id auslesen zum anschreiben###################################################
try {
	var prof = document.body.innerHTML.split('/messages/write/?to=');
	var prof1 = prof[1].split('" style')[0];
	var name = document.body.innerHTML.split('src="http://www.pennergame.de/headline/');
	var name1 = name[1].split('/" alt="')[0];
	var id = prof1[0];
} catch (err){
	//alert(err);
}
//############################### hier beginnt das senden ##########################################
GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/messages/write/send/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_toname=id:'+prof1+'&f_subject='+betreff+'&f_text='+text+'&f_did=&submit=Nachricht+verschicken'),
		onload: function(responseDetails)
{}					
},false);

alert('Es wurd an \n'+name1+' \nmit seiner id von '+prof1+'\neine nachricht geschickt\n\nbetreff:\n'+betreff+'\n\nInhalt der Nachricht:\n'+text+'')

//copyright by basti1012 
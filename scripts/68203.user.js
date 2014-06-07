// ==UserScript==
// @name Pennergame Profil beschreiber 
// @namespace http://pennerhack.foren-city.de
// @description    veroeffentlicht deine werte in dein eigenen profil
// @include        http://*pennergame*
// ==/UserScript==


if(GM_getValue("profiljanein")==null){

	var box = window.confirm('Achtung dieses Script schreibt deine ATT,DEF,PROMILLE,GELD und SAUBERKEIT werte in dein Profil\sollen die werte fuer jeder man sichtbar in deinenm Profil veroeffentlicht wwerden ?.');
		if(box == true){
		GM_setValue("profiljanein",'true')
		}else{


GM_setValue("profiljanein",'false')
}
}







if(GM_getValue("profiljanein")=='true'){
start()
}




function start(){




GM_xmlhttpRequest({
	method: 'GET',
  	url: 'http://'+window.location.hostname+'/pennerbar.xml',
	onload: function(responseDetails) {
		var con = responseDetails.responseText;
		geld = con.split('cash value="')[1].split('"')[0];
		id = con.split('uid value="')[1].split('"')[0];
		promille = con.split('promille value="')[1].split('"')[0];
weiter(geld,id,promille);
}});

}


function weiter(geld,id,promille){

GM_xmlhttpRequest({
	method: 'GET',
  	url: 'http://'+window.location.hostname+'/overview/',
	onload: function(responseDetails) {
		var con = responseDetails.responseText;
		att = con.split('class="att">')[1].split('<')[0];
		def = con.split('class="def">')[1].split('<')[0];
		sau = con.split('Sauberkeit:')[1].split('%')[0];


nochweiter(att,def,geld,id,promille,sau)
}});
}














function nochweiter(att,def,geld,id,promille,sau){
GM_xmlhttpRequest({
	method: 'GET',
  	url: 'http://'+window.location.hostname+'/settings/',
	onload: function(responseDetails) {
		var con = responseDetails.responseText;
try{
einstellungen = con.split('<textarea')[1].split('/textarea')[0];

einstellungen1 = einstellungen.split('>')[1].split('Meine Penner werte..')[0];

}catch(e){
		
einstellungen1 = einstellungen.split('>')[1].split('<')[0];
}




senden(einstellungen1,att,def,geld,id,promille,sau)

}});
}




function senden(einstellungen1,att,def,geld,id,promille,sau){
geld1 = geld/100;

text = ''+einstellungen1+''
+'[center]Meine Penner werte..[/center]'
+'[center]Mein Penner hat '+att+' Att.[/center]'
+'[center]Mein Penner hat '+def+'Def .[/center]'
+'[center]Habe  '+geld1+' EURO auf den Konto[/center]'
+'[center]Habe '+promille+' Promille intus[/center]'
+'[center]und bin zu '+sau+'  % Sauber[/center]';

		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://'+window.location.hostname+'/settings/profil_save/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('vname=&nname=&age=0&city=&homepage=&fav_drink=&play=&sex=0&description='+text+'&award_display=1&plunder_show=1&plunder_stats=1&submitForm=Speichern'),
			onload: function(responseDetails) {}
		});
	}









//document.getElementById('submitForm1').addEventListener('click', function start() {																
 // var menge = document.getElementById('menge1').value;
 // document.getElementsByName('submitForm')[0].disabled = true;
 // Losekaufen(menge);
//},false);



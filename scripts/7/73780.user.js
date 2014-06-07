// ==UserScript==
// @name           maximal Button in plunderbank pennergame 4.0
// @namespace      http://pennerhack.foren-city.de [pennerhack] oder auch unter basti1012 bekannt 
// @description    fuegt unter plunder bank einen maximal Button ein um den ganzen Plunder einzahlen zu koennen
// @include        *pennergame*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("berlin.pennergame.de")>=0) {
var siglink = "http://inodes.pennergame.de/bl_DE/signaturen/";
var link = "http://berlin.pennergame.de"

}
if (url.indexOf("http://www.pennergame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.pennergame.de"

}
if (url.indexOf("dossergame")>=0) {
var siglink = "http://inodes.pennergame.de/en_EN/signaturen/";
var link = "http://www.dossergame.co.uk"

}
if (url.indexOf("menelgame")>=0) {
var siglink = "http://inodes.pennergame.de/pl_PL/signaturen/";
var link = "http://www.menelgame.pl/"

}
if (url.indexOf("clodogame")>=0) {
var siglink = "http://inodes.pennergame.de/fr_FR/signaturen/";
var link = "http://www.clodogame.fr/"
}
if (url.indexOf("mendigogame.es")>=0) {
var siglink1 = "http://inodes.pennergame.de/es_ES/signaturen/";
var link = "http://www.mendigogame.es/"

}
if (url.indexOf("serserionline.com")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.serserionline.com/"

}
if (url.indexOf("bumrise")>=0) {
var siglink1 = "http://inodes.pennergame.de/us_EN/signaturen/";
var link = "http://www.bumrise.com/"

}
if (url.indexOf("muenchen.pennergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/mu_DE/signaturen/";
var link = "http://muenchen.pennergame.de/"
}


menge1 = document.getElementsByClassName("msglist");
var neu3 = document.getElementById("form1");

menge = menge1.length;

for(a=0;a<=menge;a++){
weiter(a,menge1,neu3)
}

function weiter(a,menge1,neu3){

	var plunder_id = menge1[a].innerHTML.split('12px;">')[1].split(' ')[0];
	var plunder_name = menge1[a].innerHTML.split('<strong>')[1].split('</strong>')[0];
	var neu = document.getElementsByClassName("msglist")[a];
	SubmitButtonHTML = '';
	var newp = document.createElement("tr");
	newp.innerHTML = ''
	+'<input type="button" name="verkauf'+a+'" value="Max verkauf">'
	var newli = document.createElement("tr");
	newli.appendChild(newp);
	newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
	neu.appendChild(newli);


try{
suche = neu3.innerHTML.split(plunder_name)[1].split('</option>')[0].split('x')[1].split(']')[0];
feld = document.getElementsByClassName("msglist")[a];
feld1 = feld.getElementsByTagName("td")[2].innerHTML += '<font color=\"green\">('+suche+')</font>';
}catch(e){}






document.getElementsByName('verkauf'+a)[0].addEventListener('click', function save_spenden () {
senden(plunder_name,neu3)
},false);









}

function senden(plunder_name,neu3){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/gang/stuff/',
		onload: function(responseDetails){
			var web = responseDetails.responseText;
			var verf = web.match(/<option value(\s|.)*?<\/option>/g);
				for (var a = 0; a < verf.length; a++){
					if (verf[a].search(plunder_name) != -1){
						plunder_verf = verf[a].split('[x')[1].split(']')[0];
						plunder_id = verf[a].split('="')[1].split('">')[0];


	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/gang/stuff/payin/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('pid='+plunder_id+'&f_count='+plunder_verf+'&button=Einzahlen'),
		onload: function(responseDetails){
alert("Habe "+plunder_name+"  "+plunder_verf+" x Verkauft");
location.reload();
	}
});

					}
				}


}});



}



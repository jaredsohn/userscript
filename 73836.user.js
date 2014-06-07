// ==UserScript==
// @name           Bandenhighscore Pennergame 4.0 Berlin,hamburg,muenchen
// @namespace      by basti121o http://pennerhack.foren-city.de.  zeigt unter bandenhighscore den admin den status eroberer und aktuelle vorherschaft an 
// @include        *pennergame.de/highscore/gang/*
// @include        *clodogame.fr/highscore/gang/*
// @include        *berlin.pennergame.de/highscore/gang/*
// @include        *menelgame.pl/highscore/gang/*
// @include        *dossergame.co.uk/highscore/gang/*
// @include        *mendigogame.es/highscore/gang/*
// @include        *serserionline.com/highscore/gang/*
// @include        *bumrise.com/highscore/gang/*
// @include        *muenchen.pennergame.de/highscore/gang/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://www.berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}

if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var siglink = 'http://img.dossergame.co.uk';
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
var siglink = 'http://img.menelgame.pl';
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
var siglink = 'http://img.clodogame.fr';
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var siglink = 'http://img.mendigogame.es';
}
if (url.indexOf("muenchen.pennergame")>=0) {
var link = "http://www.muenchen.pennergame.de"
var siglink = 'http://img.muenchen.pennergame.de';
}
if (url.indexOf("http://www.bumrise")>=0) {
var link = "http://www.bumrise.com"
var siglink = 'http://img.bumrise.com';
}

var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');
var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[5]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Ø Aktuell";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[6]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Aktueler Punkte ";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[7]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "diferenz";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[8]);

for(a=1;a<=20;a++){

	try{
		var bodya = document.getElementById("hs_bande").innerHTML;
		body = bodya.split('/profil/bande:')[a];
		var bandeid = body.split('/')[0];
		durch = bodya.split('class="col3">')[1].split('<')[0];
//alert(durch)
	}catch(e){
		break;
	}
	profil(bandeid,a,durch);
}








function profil(bandeid,a,durch){
       GM_xmlhttpRequest({
              method: 'GET',
              url: ''+link+'/profil/bande:'+bandeid+'/',
              onload: function(responseDetails) {
                    var content = responseDetails.responseText;

			mit = content.split('Mitglieder</b>')[1];
			mit1 = mit.split('</table>')[0];
			menge = content.split('3px;"><b>')[1].split(' Mitglieder')[0];

var pl_menge_compl = 0;


			for(i=1;i<=menge;i++){
				try{

					punkteaa = content.split('<td width="216"')[i].split('</tr>')[0]
					punktea = punkteaa.split('">')[2].split('&nbsp;')[0];

				}catch(e){}
					pl_menge_compl += punktea * 1;


			}
			weiter(pl_menge_compl,a,durch,menge)

	}});
}








function weiter(pl_menge_compl,a,durch,menge){




			var sms3 = document.createElement('td');
			sms3.innerHTML = ''+pl_menge_compl+'</a>';
			tr[a].insertBefore(sms3, tr[a].getElementsByTagName('td')[7]);

			durchschnitt = Math.round(pl_menge_compl/menge)/1;
			unterschiedpunkte = pl_menge_compl-durch;


			var sms1 = document.createElement('td');
			sms1.innerHTML = '<b>'+durchschnitt+'</b>';
			tr[a].insertBefore(sms1, tr[a].getElementsByTagName('td')[6]);


if(unterschiedpunkte < 0){
farbe = 'red';
}else if(unterschiedpunkte == 0){
farbe = 'yellow';
}else if(unterschiedpunkte > 0){
farbe = 'green';
}



			var sms2 = document.createElement('td');
			sms2.innerHTML = '<font style=\"color:'+farbe+'; font-size:100%;\"> ( '+unterschiedpunkte+' ) </font>';
			tr[a].insertBefore(sms2, tr[a].getElementsByTagName('td')[8]);


}


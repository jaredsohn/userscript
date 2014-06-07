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
newth.innerHTML = "Vorherschend in";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[6]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Bandenadmin";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[7]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Auszeichnung";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[8]);

for(a=1;a<=20;a++){
	try{
		var bodya = document.getElementById("hs_bande").innerHTML;
		body = bodya.split('/profil/bande:')[a];
		var bandeid = body.split('/')[0];
	}catch(e){
	break;
	}
	profil(bandeid,a);
}

function profil(bandeid,a){
       GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://www.pennergame.de/profil/bande:'+bandeid+'/',
              onload: function(responseDetails) {
                    var content = responseDetails.responseText;
                    try{
                          herr = content.split('Diese Bande herrscht in')[1];
                          herscht = herr.split('!')[0];
                    }catch(e){
                          herscht = '-';
                    }
                        ada = content.split('<tr onmouseover')[1];
                        adda = ada.split('</tr>')[0];
                        ad = adda.split('&nbsp;')[2];
                        add = ad.split('</a>')[0];
			var sms1 = document.createElement('td');
			sms1.innerHTML = '<b>'+herscht+'</b>';
			tr[a].insertBefore(sms1, tr[a].getElementsByTagName('td')[6]);
			mit = content.split('Mitglieder</b>')[1];
			mit1 = mit.split('</table>')[0];
			var sms3 = document.createElement('td');
			sms3.innerHTML = ''+add+'</a>';
			tr[a].insertBefore(sms3, tr[a].getElementsByTagName('td')[7]);
			i=1;
			bbb1 = '1';
			GM_setValue("bbb1",bbb1);
			checken(i)
			function checken(i){
				if(i<=30){
					try{
						admin = mit.split('/profil/id:')[i];
						admin1 = admin.split('/')[0];
						bbb1 = GM_getValue("bbb1");
						if(bbb1 <= '4'){
       							GM_xmlhttpRequest({
             							method: 'GET',
              							url: 'http://www.pennergame.de/profil/id:'+admin1+'/',
             							onload: function(responseDetails) {
                  							var content = responseDetails.responseText;
  									var suche1 = content.search("seiner Bande geschafft");
                          						if (suche1 != -1) {
                                						var bbb = '<tr width="318px" style="background-image: url(&quot;http://static.pennergame.de/img/pv4/icons/award_back_a.png&quot;);" height="32">Eroberer</tr>';
										var bbb1 = '55';
										GM_setValue("bbb1",bbb1);
                          						}else{ var bbb = "-";}
								var sms2 = document.createElement('td');
								sms2.innerHTML = '<font style=\"color:red; font-size:100%;\">'+bbb+'</font>';
								tr[a].insertBefore(sms2, tr[a].getElementsByTagName('td')[8]);
								i++;
								checken(i)
							}});
						}
					}catch(e){}

				}
			}

	}});
}


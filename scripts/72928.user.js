// ==UserScript==
// @name        	[PG] X-Tra Skillkenntnisse
// @version			1.2.5
// @namespace      	das_bazie
// @description    	Listet die benötigten Kenntnisse für den Skill auf
// @include       	*pennergame.de/skills/*
// @include			*clodogame.fr/skills/*
// @include			*mendigogame.es/skills/*
// @include			*menelgame.pl/skills/*
// @include			*dossergame.co.uk/skills/*
// @include			*serserionline.com/skills/*
// @include			*bumrise.com/skills/*
// @include			*faveladogame.com.br/skills/*
// @exclude			*pennergame.de/skills/pet/*
// @exclude			*clodogame.fr/skills/pet/*
// @exclude			*mendigogame.es/skills/pet/*
// @exclude			*menelgame.pl/skills/pet/*
// @exclude			*dossergame.co.uk/skills/pet/*
// @exclude			*serserionline.com/skills/pet/*
// @exclude			*bumrise.com/skills/pet/*
// @exclude			*faveladogame.com.br/skills/pet/*

// ==/UserScript==

// seitenadresse ermitteln
var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de";
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de";
}
// Linkadressen fuer Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var gamelink = "http://muenchen.pennergame.de";
}
// Linkadressen fuer Halloween
if (url.indexOf("http://halloween.pennergame")>=0) {
var gamelink = "http://halloween.pennergame.de";
}
// variablen fuer pennergame
if (url.indexOf("pennergame")>=0) {
var split = "Erforderliche Kenntnisse";
}
// Linkadressen fuer Warschau
if (url.indexOf("http://warzawa.menelgame")>=0) {
var gamelink = "http://warzawa.menelgame.pl"
var split = "wymagane umiejętności";
}
// Linkadressen fuer Krakau
if (url.indexOf("http://krakow.menelgame")>=0) {
var gamelink = "http://krakow.menelgame.pl"
var split = "wymagane umiejętności";
}
// Linkadressen fuer Paris
if (url.indexOf("http://paris.clodogame")>=0) {
var gamelink = "http://paris.clodogame.fr";
var split = "Capacités requises";
}
// Linkadressen fuer Marseille
if (url.indexOf("http://marseille.clodogame")>=0) {
var gamelink = "http://marseille.clodogame.fr";
var split = "Capacités requises";
}
// Linkadressen fuer Spanien
if (url.indexOf("http://www.mendigogame")>=0) {
var gamelink = "http://www.mendigogame.es";
var split = "Conocimientos necesarios";
}
// Linkadressen fuer London
if (url.indexOf("http://www.dossergame")>=0) {
var gamelink = "http://www.dossergame.co.uk";
var split = "Required skills";
}
// Linkadressen fuer Istanbul
if (url.indexOf("http://www.serserionline")>=0) {
var gamelink = "http://www.serserionline.com";
var split = "Gerekli Bilgi";
}
// Linkadressen fuer New York
if (url.indexOf("http://www.bumrise")>=0) {
var gamelink = "http://www.bumrise.com";
var split = "Necessary knowledge";
}
// Linkadressen fuer Brasilien
if (url.indexOf("http://www.faveladogame")>=0) {
var gamelink = "http://www.faveladogame.com.br";
var split = "Conhecimentos necessários";
}

for(x=0;x<=15;x++){
	try {
		document.getElementsByTagName('tbody')[x].setAttribute('id', 'tbody.'+x);
		id_max = x;
	} catch (err){
		break;
	}
}

function skill_info(skill_name, pos){
	GM_xmlhttpRequest({
		method: 'GET',
    	url: ''+gamelink+'/skill/info/'+skill_name+'/',
		onload: function(responseDetails) {
			var side = responseDetails.responseText;
			skill_info_ausgabe(side, skill_name, pos);
		}
	 });
}

function skill_info_ausgabe(side, skill_name, pos){
	try {
		var side_split = side.split(''+split+'</strong></td>')[1].split('</table>')[0];
		document.getElementById('tbody.'+(id_max-pos)).getElementsByTagName('td')[4].innerHTML+='<br /><br /><table><tr><th>'+split+'<br /></th></tr>'+side_split+'</table>';
	}
	catch(err){
		//alert(err);
	}
}

skill_info('Sprechen',5)
skill_info('Bildungsstufe',4)
skill_info('Musik',3)
skill_info('Sozialkontakte',2)
skill_info('Konzentration',1)
skill_info('Taschendiebstahl',0)
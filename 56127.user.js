// ==UserScript==
// @name		Navileiste 3.1 fuer pennergame 4.0 habmburg berlin 
// @namespace	basti1012 @ http://penerhack.foren-city.de
// @description	Erzeugt eine alte navileiste wie bei pennergame 3.1 in das game hamburg berlin 4.0
// @version		1.8
// @include		*pennergame.de/*
// @include		*berlin.pennergame.de/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}

var bigzahl = '150';
var id4 = '2222';
var bunte = 'withe';

var oben ='260';
var links ='115';


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}




addGlobalStyle('div#Rahmen1 {position:absolute;top:'+oben+'px;left:'+links+'px;width: 95.0em;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.6;opacity:1.6;border:px solid white; background: url(http://media.dossergame.co.uk/img/header/1_navi.jpg) no-repeat;}');
addGlobalStyle('div#Rahmen1 div {margin: 0 auto;display: block;clear: left;}ul#Navigation1 {margin: 0; padding: 0;}')
addGlobalStyle('ul#Navigation1 li {list-style: none;float: left;width: 7.5em;position: relative;margin: 0.4em; padding: 0;}')
addGlobalStyle('ul#Navigation1 li ul {margin: 0 auto; padding: 0;position: absolute;top: 0.1em; left: -0.0em;}')

addGlobalStyle('ul#Navigation1 a {border: 0px solid white;display: block;color: white;}')
addGlobalStyle('ul#Navigation1 li>ul {display: none; top: 1.1em;}ul#Navigation1 li:hover>ul, ul#Navigation1 li>a#ul {display: block;}')
addGlobalStyle('#TopMenueDiv{z-index:9000;position:absolute;display:block;}')

GM_xmlhttpRequest({
  method: 'GET',
  url: ""+link+"/overview/",
      onload: function( response ) {
      var content = response.responseText;
      var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];

	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/dev/api/user.'+userid+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var nam = dom.getElementsByTagName('name')[0].textContent;
			var id = dom.getElementsByTagName('id')[0].textContent;
			var bande = dom.getElementsByTagName('name')[1].textContent;
			var bandeid = dom.getElementsByTagName('id')[1].textContent;

var Menue1 = '<li><a href=\"/news/\"> <font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>news/co</b></font></a><ul><li>'
+'<a href=\"http://www.farbflut.de/blog/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Blog</b></font></a></li>'
+'<li><a href=\"#\" target=\"_blank\" onclick=\"showchat(); return false;\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>IRC-Chat</b></font></a></li>'
+'<li><a href=\"/support/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Support</b></font></a></li>'
+'<li><a href=\"/downloads/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Downloads</b></font></a></li></ul></li>';

var Menue2 = '<li><a href=\"/overview/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Penner</b></font></a><ul>'
+'<li><a href=\"/profil/id:'+userid+'/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Profil</b></font></a></li>'
+'<li><a href=\"/friendlist/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Freunde</b></font></a></li>'
+'<li><a href=\"/messages/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Nachrichten Eingang</b></font></a></li>'
+'<li><a href=\"/messages/out/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Nachrichten Ausgang</b></font></a></li>'
+'<li><a href=\"/awards/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Awards</b></font></a></li><li>'
+'<a href=\"/change_please/statistics/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Spenden Statistik</b></font></a></li>'
+'<li><a href=\"/settings/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Einstellungen</b></font></a></li></ul></li>';

var neu2 ='<li><a href="/skills/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Skills</b></font></a><ul>'
+'<li><a href=\"/skills/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Penner</b></font></a></li>'
+'<li><a href=\"/skills/pet/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Haustier</b></font></a></li>'
+'<li><a href=\"/skills/pet/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b></b></font></a></li></ul></li>';

var neu3 ='<li><a href="/activities/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Aktionen</b></font></a><ul>'
+'<li><a href=\"/activities/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Sammeln gehen </b></font></a></li>'
+'<li><a href=\"/activities/crime/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Vergrechen begehen</b></font></a></li>'
+'<li><a href=\"/stock/ug_plunder/create/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Plunder erstellen</b></font></a></li></ul></li>';

var Menue3 = '<li><a href=\"/city/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Stadt</b></font></a><ul>'
+'<li><a href=\"/city/district/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Stadtteile</b></font></a></li>'
+'<li><a href=\"/city/weapon_store/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Waffen ATT</b></font></a></li>'
+'<li><a href=\"/city/weapon_store/def/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Waffen DEF</b></font></a></li>'
+'<li><a href=\"/city/pet_store/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Haustier</b></font></a></li>'
+'<li><a href=\"/city/home/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Eigenheim</b></font></a></li>'
+'<li><a href=\"/city/supermarket/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Getr&auml;nke</b></font></a></li>'
+'<li><a href=\"/city/supermarket/food/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Nahrung</b></font></a></li>'
+'<li><a href=\"/city/scrounge/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Schnorrplatz</b></font></a></li></ul></li>';

var Menue4 = '<li><a href=\"/stock/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Inventar</b></font></a><ul>'
+'<li><a href=\"/stock/foodstuffs/food/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Nahrung</b></font></a></li>'
+'<li><a href=\"/stock/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Getr&auml;nke</b></font></a></li>'
+'<li><a href=\"/stock/plunder/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Plunder</b></font></a></li>'
+'<li><a href=\"/stock/ug_plunder/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Spiele Plunder</b></font></a></li>'
+'<li><a href=\"/stock/plunder/craft/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Basteln</b></font></a></li>'
+'<li><a href=\"/stock/armoury/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Waffenkammer</b></font></a></li>'
+'<li><a href=\"/stock/instruments/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Musik</b></font></a></li>'
+'<li><a href=\"/stock/bottle/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Pfandflaschen</b></font></a></li></ul></li>';


var Menue5 = '<li><a href=\"/gang/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Bande</b></font></a><ul>'
+'<li><a href="/gang/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>�bersicht</b></font></span></span></a></li>'
+'<li><a href="/profil/bande:'+bandeid+'/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Profil</b></font></span></span></a></li>'
+'<li><a href="/gang/memberlist/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Mitglieder</b></font></span></span></a></li>'
+'<li><a href="/gang/credit/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Finanzen</b></font></span></span></a></li>'
+'<li><a href="/gang/forum/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Forum</b></font></span></span></a></li>'
+'<li><a href="/gang/admin/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Adminbereich</b></font></span></span></a></li>'
+'<li><a href="/gang/admin/log/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Adminlog</b></font></span></span></a></li>'
+'<li><a href="/gang/upgrades/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Bandeneigentum</b></font></span></span></a></li>'
+'<li><a href="/gang/pact/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>B�ndnisse</b></font></span></span></a></li>'
+'<li><a href="/gang/fight/"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Bandenkampf</b></font></span></span></a></ul></li>';

var Menue6 = '<li><a href=\"/fight/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Lets fight</b></font></a><ul>'
+'<li><a href=\"/fight/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Penner fight</b></font></a></li>'
+'<li><a href=\"/fight/pet/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>Haustier fight</b></font></a></li>'
+'<li><a href=\"/fight/fightlog/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>vollst&auml;ndige kampflog</b></font></a></li>'
+'<li><a href=\"/settings/\"><font style=\"color:'+bunte+'; font-size:'+bigzahl+'%;\"><b>nnnnnnnnnn</b></font></a></li></ul></li>';

var DropMenue = ""+ Menue1 + Menue2 + Menue3 + Menue4 + Menue5 + Menue6+neu2+neu3+ ""

// menue-div generieren
var TopMenueDiv = document.createElement('div');
document.body.appendChild(TopMenueDiv);

// menue generieren
TopMenueDiv.innerHTML = "<div id=\"TopMenueDiv\"><span name=\"TopMenue\"><div id=\"Rahmen1\"><ul id=\"Navigation1\">"+DropMenue+"</div></ul></span></div>";

// klammern fuer userid
}})
//klammer bande 
}})
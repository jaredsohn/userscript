// ==UserScript==
// @name           Highscoremultianzeige von NewMan V1.1 Gefixt fuer 4.0Pennergames by basti1012 (vorab version)
// @namespace      http://forum.ego-shooters.net
// @description    Highscoremultianzeige zeigt alles an wie der Name schon sagt.
// @include        */highscore/user/*
// @include        */highscore/joindate/*
// @include        */highscore/rank/
// @include        */highscore/*
// ==/UserScript==

var eins = document.getElementById('content');
var zwei = eins.getElementsByTagName('h2')[0];
zwei.innerHTML ='Highscoremultianzeige (fix by basti)';
document.title = 'Highscoremultiscript alle Pennergames 4.0 gefixt by basti1012 original von Newman';


// update abfrage von userscripts
GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://userscripts.org/scripts/show/64853",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var plunderall = acontent.split('Pennergame by basti1012 (vorab version ')[2];			
			var plunderall1 = plunderall.split('.0 alle Pennergames)')[0];	

if(plunderall1 ==4.0){
}else{
alert("Es giebt eine neue Version vom Highscoremultianzeige gefixt von Basti1012,\nVersion "+plunderall1+" \nBitte mache ein Update, ansonsten kommt dieser Hinweiss immer wieder. Nachdem du Ok geklickt hast kommt ein Update Fenster wo du entscheiden kannst ob du das neue Script installieren willst . Mit dem klick auf  INSALLIEREN wird die Vorgängerversion gelöscht und die neue insalliert.\n\nMfg Basti1012");
window.location.href = 'http://userscripts.org/scripts/source/64853.user.js';
}
}});
//--------------------s-----------------------s--------------------s--------------s-


var url = document.location.href;
// linkadresse berlin
if (url.indexOf("berlin.pennergame.de")>=0) {
var siglink1 = "http://inodes.pennergame.de/bl_DE/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/";
var tierhadline = "http://www.pennergame.de/headline/";
var link = "http://berlin.pennergame.de"
}
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www.pennergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/de_DE/tiere/";
var tierhadline = "http://www.pennergame.de/headline/";
var link = "http://www.pennergame.de"
}
// Linkadressen fuer dossergame
if (url.indexOf("dossergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";

//var siglink1 = "http://inodes.pennergame.de/en_EN/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/en_EN/tiere/";
var tierhadline = "http://www.dossergame.co.uk/headline/";
var link = "http://www.dossergame.co.uk"
}
// Linkadressen fuer menelgame
if (url.indexOf("menelgame")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";

//var siglink1 = "http://inodes.pennergame.de/pl__PL/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/pl_PL/tiere/";
var tierhadline = "http://www.menelgame.pl/headline/";
var link = "http://www.menelgame.pl"
}
// Linkadressen fuer clodogame
if (url.indexOf("clodogame")>=0) {

var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
//var siglink1 = "http://inodes.pennergame.de/fr_FR/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/fr_FR/tiere/";
var tierhadline = "http://www.clodogame.fr/headline/";
var link = "http://www.clodogame.fr"
}
// Linkadressen fuer mendigogame.es
if (url.indexOf("mendigogame.es")>=0) {

var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
//var siglink1 = "http://img.mendigogame.es/cache/bl_DE/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/es_ES/tiere/";
var tierhadline = "http://www.mendigogame.es/headline/";
var link = "http://www.mendigogame.es"
}
// Linkadressen fuer www.serserionline.com
if (url.indexOf("serserionline.com")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/tr_TR/tiere/";
var tierhadline = "http://www.serserionline.com/headline/";
var link = "http://www.serserionline.com"
}


// Linkadressen fuer bumrise
if (url.indexOf("bumrise")>=0) {
var siglink1 = "http://inodes.pennergame.de/us_EN/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/us_EN/tiere/";
var tierhadline = "http://www.serserionline.com/headline/";


var link = "http://www.bumrise.com/"

}
// Linkadressen fuer muenchen
if (url.indexOf("muenchen.pennergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/mu_DE/signaturen/";
var tierlinks = "http://static.pennergame.de/img/pv4/shop/mu_DE/tiere/";
var tierhadline = "http://www.serserionline.com/headline/";

var link = "http://muenchen.pennergame.de/"

}
















GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;

			var text1 = content.split('<a href="/profil/id:')[2];
			var userid = text1.split('/">')[0];

			var userp = content.split('src="http://www.pennergame.de/headline/')[2];
			var userpoints = userp.split('/?size=34"')[0];


      var fight_points_max = Math.floor(userpoints*1.5);
      var fight_points_min = Math.floor(userpoints*0.8);

				GM_setValue("fight_points_min", fight_points_min);
				GM_setValue("fight_points_max", fight_points_max);


	}});
















try {
	var ausgabe = new Array();
	for (h = 0; h <= 7; h++){
		ausgabe[h] = GM_getValue("ausgabe"+h);
		if (ausgabe[h] == null) {
			if (h == 0){
				ausgabe[0] = 1;
			}
			else {
			ausgabe[h] = "";
			}
		}
	}
	if (check(22) == null && check('22b') == null){
		GM_setValue("save_setting22b", 1);
	}












	document.getElementsByClassName('gboxbig odd')[0].innerHTML +='Highscore by NewMan gefixt by basti1012Dieses ist eine vorab Version die von Basti1012 umgebaut wurde damit es in allen neuen Pennergames (4.0 Versionen) laufen tut.<br>Hamburg,Berlin,T&uuml;rkei sind alle Tiere vorhanden<br>Clodogame und Mendigogame fehlen noch einige Tiere ,wer die Bildlinks der Tiere hat bitte an Basti1012 weiter geben damit die Tiere nachgetragen werden k&ouml;nnen.<br>Dossergame,Menelgame ist zur Zeit noch nicht eingebaut da die beiden Games noch auf den Stand von 3.1 sind.<br> Der Button Gegner Zeigen ist dazu da das in jeder Stadt Gegner angezeigt werden die in deinen Punktebereich liegen ,somit erspart ihr euch Gegner &uuml;ber der Lets Fightseite zu suchen .<br>Das Original Script ist von Newman und sobald Newman das Script selber umgebaut hat bitte ich euch dieses Script zu l&ouml;schen und dann die Original Version von Newman zu nehmen <br><br>Mfg Basti1012<br>Tierlinks Bitte <b><a href="http://ego-shooters.net/forum/viewtopic.php?f=140&t=868&start=0" style="color:red;text-decoration:none;">Hier(Forum Ego Shooters)</a></b> Posten Danke';
	
	var head =document.getElementsByTagName('head')[0];
	head.innerHTML += '<link rel="icon" type="image/x-icon" href="http://media.pennergame.de/de/img/att.png" />';







} catch (err){
	//alert (err);
}
fight_check();

var alle_tier_optionen = (check(3) || check(6) || check(9) || check(18) || check(28) || check(29)) ? true : false;
try {
	var table = document.getElementsByTagName('table')[0];
	var tr = table.getElementsByTagName('tr');
	var laenge = tr.length;
	var siglink = siglink1;

	var th_td_anzahl = Number(check(12)) + Number(check(13)) + Number(check(14)) + Number(alle_tier_optionen)
	var newth = new Array();
	for (l = 0; l < th_td_anzahl; l++){
		newth[l] = document.createElement('th');
		newth[l].style.textAlign = "left";
	}

	if (check(12)){
		if (check(13)){
			newth[0].innerHTML = "Geld";
			tr[0].insertBefore(newth[0], tr[0].getElementsByTagName('th')[4]);
		}
		if (check(14)){
			newth[Number(check(13))].innerHTML = "Promille";
			tr[0].insertBefore(newth[Number(check(13))], tr[0].getElementsByTagName('th')[4+Number(check(13))]);
		}
		if (alle_tier_optionen){
			newth[Number(check(13))+Number(check(14))].innerHTML = "Tier";
			tr[0].insertBefore(newth[Number(check(13))+Number(check(14))], tr[0].getElementsByTagName('th')[4+Number(check(13))+Number(check(14))]);
		}
	}
	else {
		if (check(13)){
			tr[0].getElementsByTagName('th')[3].innerHTML = "Geld";
		}
		if (check(14)){
			if (check(13)){
				newth[0].innerHTML = "Promille";
				tr[0].insertBefore(newth[0], tr[0].getElementsByTagName('th')[4]);
			}
			else {
				tr[0].getElementsByTagName('th')[3].innerHTML = "Promille";
			}
		}
		if (alle_tier_optionen){
			if (check(13) || check(14)){
				newth[Number(check(13))+Number(check(14))-1].innerHTML = "Tier";
				tr[0].insertBefore(newth[Number(check(13))+Number(check(14))-1], tr[0].getElementsByTagName('th')[3+Number(check(13))+Number(check(14))]);
			}
			else {
				tr[0].getElementsByTagName('th')[3].innerHTML = "Tier";
			}
		}
		if (!check(13) && !check(14) && !alle_tier_optionen){
		remove(tr[0].getElementsByTagName('th')[3]);
		}
	}
	
	if (check(11)){
		move_submenu();
	}
	
	tr[0].getElementsByTagName('th')[1].innerHTML = "Pennerinfos";
	tr[0].getElementsByTagName('th')[2].innerHTML = "Bandeninfos";
} catch (err) {
	//alert(err);
}

var now = new Date();
var time = now.getTime();
if(GM_getValue("gang_save_time") !=  null){
	
	if(Number(GM_getValue("gang_save_time"))+432000000 <= time){
		GM_setValue("gang_save_time", time.toString());
		check_gang();
	}
}
else {
	GM_setValue("gang_save_time", time.toString());
	check_gang();
}

for (var x = 1; x <= laenge -1; x++) {
	var td = tr[x].getElementsByTagName('td');
	tr[x].setAttribute('id', 'tr'+x);
	tr[x].getElementsByTagName('td')[1].setAttribute('id', 'td1.'+x);
	tr[x].getElementsByTagName('td')[2].setAttribute('id', 'td2.'+x);
	tr[x].getElementsByTagName('td')[3].setAttribute('id', 'td3.'+x);
	tr[x].getElementsByTagName('td')[4].setAttribute('id', 'td7.'+x);
	tr[x].getElementsByTagName('td')[5].setAttribute('id', 'td8.'+x);


	var trk = document.getElementById('tr'+x);
	var sid = td[1].innerHTML.split('/profil/id:');
	var id = sid[1].split('/\"');


premium_bild = '';

	if (!check(12) && !check(13) && !check(14) && !alle_tier_optionen){
		//remove(trk.getElementsByTagName('td')[3]);
	}
	
	user_info (id[0], x, premium_bild, trk);
}

function user_info (id , x, premium_bild, trk) {
	GM_xmlhttpRequest({
    	method: 'GET',
   		url: ''+link+'/dev/api/user.' + id + '.xml',
		onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			user (x, id, dom, premium_bild, trk);
		}
	});
}
			

function user (x, id, dom, premium_bild, trk) {
	var name = dom.getElementsByTagName('name')[0].textContent;
	var user_points = dom.getElementsByTagName('points')[0].textContent;
	if (check(1)){
		var points = "Punkte: " + user_points;
	}
	else {
		var points = "";
	}
	if (check(4)){
		var reg = "Reg: " + dom.getElementsByTagName('reg_since')[0].textContent;
	}
	else {
		var reg = "";
	}
	
	var gang_id = dom.getElementsByTagName('id')[1].textContent;
	
	if (check(7)){
		try {
			var status = dom.getElementsByTagName('status')[0].textContent;
		} catch (err) {
			var status = "-";
		}
	
		if (status == 3){
			var bandenstatus = 'Status: Admin';
		} else if (status == 2) {
			var bandenstatus = 'Status: Co-Admin';
		} else if (status == 1) {
			var bandenstatus = 'Status: Mitglied';
		}
		else {
			var bandenstatus = "Status: -";
		}
	}
	else {
		bandenstatus = "";
	}
	
	
	if (check(10) || check(13)){
		try {

		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
		cash_show = ''+cash+'&nbsp;&euro;';

		} catch (err) {
			cash_show = "-";
		}
	}
	




	if (check(15)){

		if (Number(cash) >= Number(ausgabe[1]+ "00") && Number(cash) <= Number(ausgabe[2]+ "00")) {
			var td_bg_color = "#00E500";
			var text_color = "#000000";
		}
		else if (Number(cash) >= Number(ausgabe[3]+ "00") && Number(cash) <= Number(ausgabe[4]+ "00")) {
			var td_bg_color = "#E5E500";
			var text_color = "#000000";
		}
		else if (Number(cash) >= Number(ausgabe[5]+ "00") && Number(cash) <= Number(ausgabe[6]+ "00")){
			var td_bg_color = "#FF0000";
			var text_color = "#000000";
		}
		else {
			var td_bg_color = "";
			var text_color = "";
		}
	}

	if (check(10)){
		
		cash_show_profil = "Geld: " + cash_show;
		if (check(15) && check(22)){
			trk.getElementsByTagName('td')[1].style.backgroundColor = td_bg_color;
			trk.getElementsByTagName('td')[1].style.color = text_color;
		}
		else if (check(15) && check('22b')){
			cash_show_profil = 'Geld: <span style="color:'+ td_bg_color +';">'+ cash_show +'</span>';
		}
	}
	else {
		cash_show_profil = "";
	}
	
	if (check(13)){
		if (check(12)){
			newtd_cash = document.createElement('td');
			newtd_cash.setAttribute('id', 'td4.'+x);
			if (check(15) && check(22)){
				newtd_cash.style.backgroundColor = td_bg_color;
				if (td_bg_color != ""){
					var border_color = td_bg_color;
				}
				newtd_cash.style.color = text_color;
			}
			else if (check(15) && check('22b')){
				newtd_cash.style.color = td_bg_color;
			}
			newtd_cash.innerHTML = cash_show;
			trk.insertBefore(newtd_cash, trk.getElementsByTagName('td')[4]);
		}
		else {
			if (check(15) && check(22)){
				trk.getElementsByTagName('td')[3].style.backgroundColor = td_bg_color;
				trk.getElementsByTagName('td')[3].style.color = text_color;
			}
			else if (check(15) && check('22b')){
				trk.getElementsByTagName('td')[3].style.color = td_bg_color;
			}
			trk.getElementsByTagName('td')[3].innerHTML = cash_show;
		}
	}
	
	if (check(16) && (check(10) || check(13))){
		if (Number(cash) >= Number(ausgabe[7]+ "00")){
			alert('Achtung!!!\nDer Spieler "'+name+'" auf Platz '+x+' hat '+cash_show+' auf der Hand.\n\nMit freundlichem Gruss\nNewMan');
			trk.getElementsByTagName('td')[0].style.backgroundColor = "#FF0000"
		}
	}
	










	
	if (check(17) || check(14)){
		try {

			var cash = dom.getElementsByTagName('cash')[0].textContent;
			var promille = '<div style=" float:left; overflow: hidden; width: 40px; height: 12px;"><img style="position: relative; top: -44px; left: -120px;" src="' + siglink + id + '.jpg"></div>'
			} catch (err) {
			var promille = "-";
		}


	}
	if (check(17)){
		var promille_show = '<div style="float: left;">Promille:&nbsp;</div>' + promille;
	}
	else {
		var promille_show = "-";
	}
	if (check(14)){
		if (check(12) || check(13)){
			newtd_prom = document.createElement('td');
			newtd_prom.setAttribute('id', 'td'+(3+Number(check(12))+Number(check(13)))+'.'+x);
			newtd_prom.innerHTML = promille;
			trk.insertBefore(newtd_prom, trk.getElementsByTagName('td')[3+Number(check(12))+Number(check(13))]);
		}
		else {
			trk.getElementsByTagName('td')[3].innerHTML = promille;
		}
	}
	if (check(20)){
		if (GM_getValue("notes"+id)){
			var note_button = '<input type="button" name="notes'+x+'" value="Notiz"style="background-color:#FFFFFF; color:#000000; border:1px solid #FF0000;">'
		}
		else {
			var note_button = '<input type="button" name="notes'+x+'" value="Notiz"style="background-color:#FFFFFF; color:#000000; border:1px solid #00FF00;">'
		}
	}
	else {
		var note_button = "";
	}
	
	if (ausgabe[0] == 1) {
		document.getElementById('td1.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/id:' + id + '/" style="color:white;text-decoration:none;">' + name + ' ' + premium_bild + '</a></b></tr><tr>' + reg +'</td></tr><tr id="td1.3.'+x+'">'+ points +'</td></tr><tr>'+ cash_show_profil +'</td></tr><tr>'+ promille_show +'</td></tr><tr>'+ bandenstatus +'</td></tr><tr id="td1.4.'+x+'"></td></tr><tr style="height:100%;" id="td1.5.'+x+'" style="vertical-align:bottom;">'+ note_button +'</td></tr></table>';
	} else if (ausgabe[0] == 2){
		document.getElementById('td1.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/id:' + id + '/" style="color:white;text-decoration:none;">' + name + ' ' + premium_bild + '</a></b></tr><tr  id="td1.3.'+x+'">' + points +'</td></tr><tr>'+ reg +'</td></tr><tr>'+ cash_show_profil +'</td></tr><tr>'+ promille_show +'</td></tr><tr>'+ bandenstatus +'</td></tr><tr id="td1.4.'+x+'"></td></tr><tr style="height:100%;" id="td1.5.'+x+'" style="vertical-align:bottom;">'+ note_button +'</td></tr></table>';
	} else if (ausgabe[0] == 3){
		document.getElementById('td1.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/id:' + id + '/" style="color:white;text-decoration:none;">' + name + ' ' + premium_bild + '</a></b></tr><tr  id="td1.3.'+x+'">' + points +'</td></tr><tr>'+ cash_show_profil +'</td></tr><tr>'+ promille_show +'</td></tr><tr>'+ reg +'</td></tr><tr>'+ bandenstatus +'</td></tr><tr id="td1.4.'+x+'"></td></tr><tr style="height:100%;" id="td1.5.'+x+'" style="vertical-align:bottom;">'+ note_button +'</td></tr></table>';
	} else if (ausgabe[0] == 4){
		document.getElementById('td1.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/id:' + id + '/" style="color:white;text-decoration:none;">' + name + ' ' + premium_bild + '</a></b></tr><tr>' + cash_show_profil +'</td></tr><tr id="td1.3.'+x+'">'+ points +'</td></tr><tr>'+ promille_show +'</td></tr><tr>'+ reg +'</td></tr><tr>'+ bandenstatus +'</td></tr><tr id="td1.4.'+x+'"></td></tr><tr style="height:100%;" id="td1.5.'+x+'" style="vertical-align:bottom;">'+ note_button +'</td></tr></table>';
	} else if (ausgabe[0] == 5){
		document.getElementById('td1.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/id:' + id + '/" style="color:white;text-decoration:none;">' + name + ' ' + premium_bild + '</a></b></tr><tr>' + bandenstatus +'</td></tr><tr id="td1.3.'+x+'">'+ points +'</td></tr><tr>'+ reg +'</td></tr><tr>'+ cash_show_profil +'</td></tr><tr>'+ promille_show +'</td></tr><tr id="td1.4.'+x+'"></td></tr><tr style="height:100%;" id="td1.5.'+x+'" style="vertical-align:bottom;">'+ note_button +'</td></tr></table>';
	} else if (ausgabe[0] == 6){
		document.getElementById('td1.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/id:' + id + '/" style="color:white;text-decoration:none;">' + name + ' ' + premium_bild + '</a></b></tr><tr>' + promille_show +'</td></tr><tr>'+ cash_show_profil +'</td></tr><tr>'+ reg +'</td></tr><tr id="td1.3.'+x+'">'+ points +'</td></tr><tr>'+ bandenstatus +'</td></tr><tr id="td1.4.'+x+'"></td></tr><tr style="height:100%;" id="td1.5.'+x+'" style="vertical-align:bottom;">'+ note_button +'</td></tr></table>';
	} else {
		document.getElementById('td1.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/id:' + id + '/" style="color:white;text-decoration:none;">' + name + ' ' + premium_bild + '</a></b></tr></table>';
	}

	if (check(25) && Number(GM_getValue("fight_points_min")) < user_points && Number(GM_getValue("fight_points_max")) > user_points) {
		document.getElementById('td1.3.'+x).style.color = "#0099FF";
		document.getElementById('td8.'+x).style.backgroundColor = "#FF0000";
	}
	
	if (check(20)){
		document.getElementsByName('notes'+x)[0].addEventListener('click', function note(){
			var note_text = GM_getValue("notes"+id);	
			if(note_text == null){
				note_text = "Kein Eintrag";
			}
			document.getElementById('td1.5.'+x).innerHTML += '<textarea name="notes_input'+x+'" cols="25" rows="5" id="notes">'+note_text+'</textarea><br /><input type="button" name="save_notes'+x+'" value="Notiz speichern">';
			document.getElementsByName('save_notes'+x)[0].addEventListener('click', function save_note(){
				GM_setValue("notes"+id, document.getElementsByName('notes_input'+x)[0].value);
			},false); 
		
		},false); 
	}
	
	gang_info (x, gang_id, id, trk);

}
//Copyright by NewMan im Pennergame unter NewMan01 zu finden
function gang_info (x, gang_id, id, trk) {
	GM_xmlhttpRequest({
    	method: 'GET',
   		url: ''+link+'/dev/api/gang.' + gang_id + '.xml',
		onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			gang (x, gang_id, dom, id, trk);
		}
	});
}

function gang (x, gang_id, dom, id, trk) {	
	
	try {
       	var name = dom.getElementsByTagName('name')[0].textContent;
	} catch (err) {
		//alert (err);
       	var name = "-";
	}
	
	if (check(2)){
		try {
       		var points = "Punkte: " + dom.getElementsByTagName('points')[0].textContent;
    	} catch (err) {
			//alert (err);
       		var points = "Punkte: -";
    	}
	}
	else {
		var points = "";
	}
	
	if (check(8)){
		try {
			var position = "Position: " + dom.getElementsByTagName('position')[0].textContent;
		} catch (err) {
			//alert (err);
      	 	var position = "Position: -";
   		}
	}
	else {
		var position = "";
	}
       	
	if (check(5)){
		try {
       		var member_count = "Memberanzahl: " + dom.getElementsByTagName('member_count')[0].textContent;
   		} catch (err) {
			//alert (err);
       		var member_count = "Memberanzahl: -";
   		}
	}
	else {
		var member_count = "";
	}
	//Durchnittliche Punktzahl
	if (check(26)){
		try {
			var mean = "&Oslash; Punktzahl: " + Math.floor(dom.getElementsByTagName('points')[0].textContent / dom.getElementsByTagName('member_count')[0].textContent);
		} catch (err) {
			var mean = "&Oslash; Punktzahl: -";
			//alert(err);
		}
	}
	else {
		var mean = "";
	}
	
	if (check(21)){
		if (GM_getValue("gang_notes"+gang_id)){
			var gang_note_button = '<input type="button" name="gang_notes'+x+'" value="B-Notiz"style="vertical-align:bottom; background-color:#FFFFFF; color:#000000; border:1px solid #FF0000;">'
		}
		else {
			var gang_note_button = '<input type="button" name="gang_notes'+x+'" value="B-Notiz"style="vertical-align:bottom; background-color:#FFFFFF; color:#000000; border:1px solid #00FF00;">'
		}
	}
	else {
		var gang_note_button = "";
	}
		
	if (ausgabe[0] == 1) {
		document.getElementById('td2.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/bande:' + gang_id + '/" style="color:white;text-decoration:none;">' + name + '</a></b></tr><tr>' + points +'</td></tr><tr>'+ position +'</tr><tr>'+ member_count +'</tr><tr>'+ mean +'</tr><tr id="td2.5.'+x+'"></tr><tr style="height:100%;"><td id="td2.6.'+x+'" style="vertical-align:bottom;">'+ gang_note_button+'</tr></table>';
	} else if (ausgabe[0] == 2) {
		document.getElementById('td2.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/bande:' + gang_id + '/" style="color:white;text-decoration:none;">' + name + '</a></b></tr><tr id="td2.5.'+x+'"></td></tr><tr>' + position +'</tr><tr>'+ points +'</tr><tr>'+ mean +'</tr><tr>'+ member_count +'</tr><tr style="height:100%;"><td id="td2.6.'+x+'" style="vertical-align:bottom;">'+ gang_note_button+'</tr></table>';
	} else if (ausgabe[0] == 3) {
		document.getElementById('td2.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/bande:' + gang_id + '/" style="color:white;text-decoration:none;">' + name + '</a></b></tr><tr>' + member_count +'</td></tr><tr>'+ position +'</tr><tr>'+ points +'</tr><tr id="td2.5.'+x+'"></tr><tr>'+ mean +'</tr><tr style="height:100%;"><td id="td2.6.'+x+'" style="vertical-align:bottom;">'+ gang_note_button+'</tr></table>';
	} else if (ausgabe[0] == 4) {
		document.getElementById('td2.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/bande:' + gang_id + '/" style="color:white;text-decoration:none;">' + name + '</a></b></tr><tr>' + points +'</td></tr><tr>'+ member_count +'</tr><tr>'+ mean +'</tr><tr>'+ position +'</tr><tr id="td2.5.'+x+'"></tr><tr style="height:100%;"><td id="td2.6.'+x+'" style="vertical-align:bottom;">'+ gang_note_button+'</tr></table>';
	} else if (ausgabe[0] == 5) {
		document.getElementById('td2.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/bande:' + gang_id + '/" style="color:white;text-decoration:none;">' + name + '</a></b></tr><tr>'+ mean +'</td></tr><tr id="td2.5.'+x+'"></tr><tr>' + points +'</tr><tr>'+ position +'</tr><tr>'+ member_count +'</tr><tr style="height:100%;"><td id="td2.6.'+x+'" style="vertical-align:bottom;">'+ gang_note_button+'</tr></table>';
	} else if (ausgabe[0] == 6) {
		document.getElementById('td2.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/bande:' + gang_id + '/" style="color:white;text-decoration:none;">' + name + '</a></b></tr><tr>'+ member_count +'</td></tr><tr id="td2.5.'+x+'"></tr><tr>'+ mean +'</tr><tr>' + points +'</tr><tr>'+ position +'</tr><tr style="height:100%;"><td id="td2.6.'+x+'" style="vertical-align:bottom;">'+ gang_note_button+'</tr></table>';
	} else {
		document.getElementById('td2.'+x).innerHTML = '<tr><b><a href="'+link+'/profil/bande:' + gang_id + '/" style="color:white;text-decoration:none;">' + name + '</a></b></tr></table>';
	}
	
	if (check(21)){
		document.getElementsByName('gang_notes'+x)[0].addEventListener('click', function note(){
			var gang_note_text = GM_getValue("gang_notes"+gang_id);	
			if(gang_note_text == null){
				gang_note_text = "Kein Eintrag";
			}
			document.getElementById('td2.6.'+x).innerHTML += '<textarea name="gang_notes_input'+x+'" cols="25" rows="5" id="notes">'+gang_note_text+'</textarea><br /><input type="button" name="save_gang_notes'+x+'" value="B-Notiz speichern">';
			document.getElementsByName('save_gang_notes'+x)[0].addEventListener('click', function save_note(){
				GM_setValue("gang_notes"+gang_id, document.getElementsByName('gang_notes_input'+x)[0].value);
			},false); 
		
		},false); 
	}
	if (check(27)){
		pact(x, gang_id);
	}
	user_profil_infos (x, id, trk)
	
}























function fight_check(){
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/overview/',
        onload: function(responseDetails) {
	if (check(19)){
	user_and_tier_facts_read(side);
	}
}});	
}



















//Wird nur alle 5 Tage ausgeführt
function check_gang(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/gang/',
		onload: function(responseDetails) {
			try {
				var side_gang = responseDetails.responseText;
				var side_gang_split = side_gang.split('/profil/bande:');
				var u_gang_id =  side_gang_split[1].split('/')[0];
				GM_setValue("u_gang_id", u_gang_id);
				check_pact(u_gang_id);
			} catch (err){ 
				//alert(err)
				var u_gang_id = "";
			}

			
		}
	});
}
//Wird nur alle 5 Tage ausgeführt
function check_pact(u_gang_id){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/profil/bande:'+ u_gang_id +'/',
		onload: function(responseDetails) {
			try{
				var side = responseDetails.responseText;
				var side_split = (side.split('Im Krieg gegen')[1]).split('Verb')[0];
				var side_split_2 = (side.split('Verb')[1]).split('Mitglied')[0];
			} catch (err) {
				var side_split = "";
				var side_split_2 = "";
			}

			for(h = 0; h <= 150; h++) {
				try{
					gang_enemy = (side_split.split('/profil/bande:')[h+1]).split('/"')[0];
					GM_setValue("gang_enemy"+h, gang_enemy);
				} catch (err){
					//alert(err);
					break;
				}
			}

			for(f = 0; f <= 150; f++) {
				try{
					gang_friend = (side_split_2.split('/profil/bande:')[f+1]).split('/"')[0];
					GM_setValue("gang_friend"+f, gang_friend);
				} catch (err){
					//alert(err);
					break;
				}
			}
		}
	});
}

function pact(x, gang_id){

	for(d = 0; d <= 150; d++){
		try {
			var emeny = GM_getValue("gang_enemy"+d);
			if(emeny == gang_id){
				document.getElementById('td2.5.'+x).style.color = '#FF0000';
				document.getElementById('td2.5.'+x).innerHTML = 'Feind!!!';
			}
			else if(emeny == null){
				break;
			}
		} catch (err){
			//alert(err);
			break;
		}
	}
	
	for(e = 0; e <= 150; e++){
		try {
			var friend = GM_getValue("gang_friend"+e);
			if(friend == gang_id){
				document.getElementById('td2.5.'+x).style.color = '#00FF00';
				document.getElementById('td2.5.'+x).innerHTML = 'Freund!!!';
				document.getElementById('td8.'+x).innerHTML = "";
			}
			else if(friend == null){
				break;
			}
		} catch (err){
			break;
		}
	}
			
	
}

function user_profil_infos (x, id, trk){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/profil/id:'+ id +'/',
		onload: function(responseDetails) {
		var side = responseDetails.responseText;
		user_tier (x, id, side, trk);
		user_online (side, trk)

		
		}
	});
}







































function user_tier (x, id, side, trk){

	if (alle_tier_optionen){

		try {
			var side_split = side.split('<table style="margin: 5px; padding: 5px;');
			var side_split_2 = side_split[1].split('</table>');

			try {

				var side_split_3 = side_split_2[0].split('/headline/');
				var side_split_4 = side_split_3[1].split('/?size=28" />');
				var tier_ueberschrift = '<img style="margin-top:3px;" src="'+link+'/headline/'+ side_split_4[0] + '/?size=28" />';
			} catch (err){
				var tier_ueberschrift = "-";
			}
		
			try {
				var side_split_5 = side_split_4[1].split('<div style="float:left; margin-top:12px;">');
				var side_split_6 = side_split_5[1].split('></div>');
				var tier_bild = side_split_6[0];
				var tier_bild_x = ''+tier_bild+' width="56" height="56"><br> ';
	
			} catch (err){
				var tier_bild = "-";
				var tier_bild_x = "-";
			}
			if (!check(28) && !check(29)){
				var tier_bild = "";
			}

			try {
				var side_split_7 = side_split_6[1].split('<p>');
				var side_split_8 = side_split_7[1].split('</p>');
				var tier_beschreib = side_split_8[0] + '<br />';
			} catch (err){
				var tier_beschreib = "-";
			}



			if (check(18) || check(29) || check(28)){
				try {
					var side_split_10 = side_split_6[2].split('</td>');
					var tier_tip = side_split_10[0].replace(/href="/g, 'href="'+link+'');
					var tier_tip = tier_tip.replace(/class="tooltip_pl"/g, 'class="tooltip"');
				} catch (err){
					var tier_tip = "-";
				}
			}
			else {
				var tier_tip = "";
			}
			
		} catch (err){
			var tier_ueberschrift = "-";
			var tier_bild = "-";
			var tier_beschreib = "-";
			var tier_tip = "-";
			var tier_bild_x = "";
		}

	}

	if (check(28) || check(29)){
		var t_att = '<img alt="att_gif" src="http://media.pennergame.de/img/att.gif" />'
		var t_def = '<img alt="def_gif" src="http://media.pennergame.de/img/def.gif" />'
		var t_mit = '<img alt="mitleid_gif" src="http://media.pennergame.de/img/mitleid.gif" />'



		if(tier_bild.indexOf(tierlinks) != -1){
			var tier_number = (tier_bild.split('/tiere/')[1]).split('.jpg')[0];
			switch (tier_number) {
// hamburg
				case "14896": var tier_name = 'Eisbär'; break; 
				case "94826": var tier_name = 'Elefant'; break;
				case "43703": var tier_name = 'Tiger'; break;
				case "73933": var tier_name = 'Dressierte Maus'; break;
				case "12536": var tier_name = 'Äffchen'; break;
				case "32563": var tier_name = 'Chihuahua'; break;
				case "00001": var tier_name = 'Kakerlake'; break;
				case "68930": var tier_name = 'Goldfisch'; break;
				case "11836": var tier_name = 'Maus'; break;
				case "73308": var tier_name = 'Hamster'; break;
				case "52483": var tier_name = 'Wellensittich'; break;
				case "31451": var tier_name = 'Taube'; break;
				case "73684": var tier_name = 'Ratte'; break;
				case "77310": var tier_name = 'Hase'; break;
				case "21903": var tier_name = 'Frettchen'; break;
				case "73735": var tier_name = 'Katze'; break;
				case "89386": var tier_name = 'Falke'; break;
				case "61402": var tier_name = 'Schlange'; break;
				case "62474": var tier_name = 'Hausziege'; break;
				case "12758": var tier_name = 'Pudel'; break;
				case "48263": var tier_name = 'Adler'; break;
				case "09051": var tier_name = 'Schäferhund'; break;
				case "15240": var tier_name = 'Pitbull'; break;
				case "62456": var tier_name = 'Cockerspaniel'; break;
				case "90385": var tier_name = 'Pferd'; break;
				case "98962": var tier_name = 'Giraffe'; break;
				case "64220": var tier_name = 'Nilpferd'; break;
				case "73953": var tier_name = 'Krokodil'; break;
				case "25834": var tier_name = 'Nashorn'; break;
// berlin tuerkei
				case "16342": var tier_name = 'Braunbär'; break; //neu
				case "73526": var tier_name = 'T-Rex'; break;//neu
				case "83290": var tier_name = 'Leopard'; break;//neu
				case "73933": var tier_name = 'Dressierte Maus'; break;
				case "37551": var tier_name = 'Waschbär'; break;//neu
				case "32563": var tier_name = 'Mops'; break;//neu
				case "48264": var tier_name = 'Silberfisch'; break;//neu
				case "75284": var tier_name = 'Grasfrosch'; break;//neu
				case "92653": var tier_name = 'Rotkehlchen'; break;//neu
				case "02634": var tier_name = 'Clownfisch'; break;//neu
				case "01743": var tier_name = 'Erdmännchen'; break;//neu
				case "11542": var tier_name = 'Möwe'; break;//neu
				case "66294": var tier_name = 'Opossum'; break;//neu
				case "11634": var tier_name = 'Streifenhörnchen'; break;//neu
				case "11743": var tier_name = 'Igel'; break;//neu
				case "47838": var tier_name = 'Hausschwein'; break;//neu
				case "94652": var tier_name = 'Schneeeule'; break;//neu
				case "65384": var tier_name = 'Bisamratte'; break;//neu
				case "18540": var tier_name = 'Moorschnucke'; break;//neu
				case "76538": var tier_name = 'Yorkshire Terrier'; break;//neu
				case "64133": var tier_name = 'Habicht'; break;//neu
				case "28463": var tier_name = 'Golden Retriver'; break;//neu
				case "98641": var tier_name = 'Deutsche Dogge'; break;//neu
				case "48256": var tier_name = 'Australian Shepard'; break;//neu
				case "85242": var tier_name = 'Zebra'; break;//neu
				case "99624": var tier_name = 'Kamel'; break;//neu
				case "88643": var tier_name = 'Tapir'; break;//neu
				case "13323": var tier_name = 'Riesenschildkröte'; break;//neu
				case "96242": var tier_name = 'Elch'; break;//neu
				case "31337": var tier_name = 'Phönix'; break;//neu
//mendigogame clodogame
				case "fr8596": var tier_name = 'Kakerlake'; break;
				case "fr8930": var tier_name = 'Goldfisch'; break;
				case "fr8142": var tier_name = 'Eisbär'; break; 
				case "fr4220": var tier_name = 'Nilpferd'; break;
				case "fr9386": var tier_name = 'Falke'; break;
				case "fr3735": var tier_name = 'Katze'; break;
				case "fr5423": var tier_name = 'Hamster'; break;
				case "fr7730": var tier_name = 'Hase'; break;
				case "fr1451": var tier_name = 'Taube'; break;
				case "fr5687": var tier_name = 'Tiger'; break;
				case "fr8569": var tier_name = 'Nashorn'; break;
				case "fr4591": var tier_name = 'Wellensittich'; break;
				case "fr3684": var tier_name = 'Ratte'; break;
				case "fr1903": var tier_name = 'Frettchen'; break;
				case "fr1482": var tier_name = 'Schlange'; break;
				case "fr2474": var tier_name = 'Hausziege'; break;
				case "fr4263": var tier_name = 'Adler'; break;
				case "fr9051": var tier_name = 'Schäferhund'; break;
				case "fr5240": var tier_name = 'Pitbull'; break;
				case "fr1456": var tier_name = 'Cockerspaniel'; break;
				case "fr0385": var tier_name = 'Pferd'; break;
				case "fr2563": var tier_name = 'Giraffe'; break;
				case "fr4843": var tier_name = 'Krokodil'; break;
 				case "fr2536": var tier_name = 'Äffchen'; break;
				case "fr7563": var tier_name = 'Chihuahua'; break;
				case "fr1256": var tier_name = 'Elefant'; break;
				case "fr8795": var tier_name = 'Dressierte Maus'; break;
				case "fr8795": var tier_name = 'Maus'; break;
				case "12758": var tier_name = 'Pudel'; break;


/*
http://static.pennergame.de/img/pv4/shop/es_ES/tiere/fr0385.jpg
	else if(image == 'fr4263')
		petname = 'Águila';
	else if(image == 'fr2536')
		petname = 'Monito';
	else if(image == 'fr7760')
		petname  = "Gallo";

	else if(image == 'fr8795')
		petname  = maus";

http://static.pennergame.de/img/pv4/shop/es_ES/tiere/fr8142.jpg
http://static.pennergame.de/img/pv4/shop/es_ES/tiere/fr8795.jpg
*/

//menelgame noch 3.1
//dossergame noch 3.1

				default: var tier_name = "-"; break;
			}

		}
		else if(tier_tip.indexOf('http://img.pennergame.de/cache/de_DE/premium/pets/') != -1){
			var tier_name = (tier_tip.split('Basiswerten von <b>')[1]).split('</b><br />')[0];
		}else{
			var tier_name = "-";
		}switch (tier_name){
// hamburg
				case "Eisbär": var tier_werte = t_att +' 138 '+ t_def +' 87 '+ t_mit +' 64'; break; 
				case "Elefant": var tier_werte = t_att +' 110 '+ t_def +' 101 '+ t_mit +' 42'; break;
				case "Tiger": var tier_werte = t_att +' 136 '+ t_def +' 46 '+ t_mit +' 69'; break;
				case "Dressierte Maus": var tier_werte = t_att +' 43 '+ t_def +' 37 '+ t_mit +' 253'; break;
				case "Äffchen": var tier_werte = t_att +' 52 '+ t_def +' 43 '+ t_mit +' 230'; break;
				case "Chihuahua": var tier_werte = t_att +' 32 '+ t_def +' 28 '+ t_mit +' 133'; break;
				case "Kakerlake": var tier_werte = t_att +' 0 '+ t_def +' 0 '+ t_mit +' 0'; break;
				case "Goldfisch": var tier_werte = t_att +' 1 '+ t_def +' 1 '+ t_mit +' 1'; break;
				case "Maus": var tier_werte = t_att +' 2 '+ t_def +' 3 '+ t_mit +' 7'; break;
				case "Hamster": var tier_werte = t_att +' 5 '+ t_def +' 4 '+ t_mit +' 12'; break;
				case "Wellensittich": var tier_werte = t_att +' 7 '+ t_def +' 5 '+ t_mit +' 16'; break;
				case "Taube": var tier_werte = t_att +' 8 '+ t_def +' 3 '+ t_mit +' 1'; break;
				case "Ratte": var tier_werte = t_att +' 10 '+ t_def +' 5 '+ t_mit +' 0'; break;
				case "Hase": var tier_werte = t_att +' 13 '+ t_def +' 10 '+ t_mit +' 17'; break;
				case "Frettchen": var tier_werte = t_att +' 18 '+ t_def +' 15 '+ t_mit +' 19'; break;
				case "Katze": var tier_werte = t_att +' 25 '+ t_def +' 20 '+ t_mit +' 32'; break;
				case "Falke": var tier_werte = t_att +' 27 '+ t_def +' 25 '+ t_mit +' 22'; break;
				case "Schlange": var tier_werte = t_att +' 44 '+ t_def +' 38 '+ t_mit +' 10'; break;
				case "Hausziege": var tier_werte = t_att +' 36 '+ t_def +' 40 '+ t_mit +' 21'; break;
				case "Pudel": var tier_werte = t_att +' 28 '+ t_def +' 29 '+ t_mit +' 62'; break;
				case "Adler": var tier_werte = t_att +' 39 '+ t_def +' 41 '+ t_mit +' 38'; break;
				case "Schäferhund": var tier_werte = t_att +' 55 '+ t_def +' 45 '+ t_mit +' 43'; break;
				case "Pitbull": var tier_werte = t_att +' 65 '+ t_def +' 59 '+ t_mit +' 1'; break;
				case "Cockerspaniel": var tier_werte = t_att +' 59 '+ t_def +' 40 '+ t_mit +' 56'; break;
				case "Pferd": var tier_werte = t_att +' 62 '+ t_def +' 69 '+ t_mit +' 80'; break;
				case "Giraffe": var tier_werte = t_att +' 71 '+ t_def +' 82 '+ t_mit +' 98'; break;
				case "Nilpferd": var tier_werte = t_att +' 74 '+ t_def +' 89 '+ t_mit +' 34'; break;
				case "Krokodil": var tier_werte = t_att +' 95 '+ t_def +' 75 '+ t_mit +' 30'; break;
				case "Nashorn": var tier_werte = t_att +' 100 '+ t_def +' 95 '+ t_mit +' 39'; break;
// berlin
				case "Braunbär": var tier_werte = t_att +' 138 '+ t_def +' 87 '+ t_mit +' 64'; break; //neu
				case "T-Rex": var tier_werte = t_att +' 110 '+ t_def +' 101 '+ t_mit +' 42'; break;//neu
				case "Leopard": var tier_werte = t_att +' 136 '+ t_def +' 46 '+ t_mit +' 69'; break;//neu
				case "Dressierte Maus": var tier_werte = t_att +' 43 '+ t_def +' 37 '+ t_mit +' 253'; break;
				case "Waschbär": var tier_werte = t_att +' 52 '+ t_def +' 43 '+ t_mit +' 230'; break;//neu
				case "Mops": var tier_werte = t_att +' 32 '+ t_def +' 28 '+ t_mit +' 133'; break;//neu
				case "Silberfisch": var tier_werte = t_att +' 0 '+ t_def +' 0 '+ t_mit +' 0'; break;//neu
				case "Grasfrosch": var tier_werte = t_att +' 1 '+ t_def +' 1 '+ t_mit +' 1'; break;//neu
				case "Rotkehlchen": var tier_werte = t_att +' 2 '+ t_def +' 3 '+ t_mit +' 7'; break;//neu
				case "Clownfisch": var tier_werte = t_att +' 5 '+ t_def +' 4 '+ t_mit +' 12'; break;//neu
				case "Erdmännchen": var tier_werte = t_att +' 7 '+ t_def +' 5 '+ t_mit +' 16'; break;//neu
				case "Möwe": var tier_werte = t_att +' 8 '+ t_def +' 3 '+ t_mit +' 1'; break;//neu
				case "Opossum": var tier_werte = t_att +' 10 '+ t_def +' 5 '+ t_mit +' 0'; break;//neu
				case "Streifenhörnchen": var tier_werte = t_att +' 13 '+ t_def +' 10 '+ t_mit +' 17'; break;//neu
				case "Igel": var tier_werte = t_att +' 18 '+ t_def +' 15 '+ t_mit +' 19'; break;//neu
				case "Hausschwein": var tier_werte = t_att +' 25 '+ t_def +' 20 '+ t_mit +' 32'; break;//neu
				case "Schneeeule": var tier_werte = t_att +' 27 '+ t_def +' 25 '+ t_mit +' 22'; break;//neu
				case "Bisamratte": var tier_werte = t_att +' 44 '+ t_def +' 38 '+ t_mit +' 10'; break;//neu
				case "Moorschnucke": var tier_werte = t_att +' 36 '+ t_def +' 40 '+ t_mit +' 21'; break;//neu
				case "Yorkshire Terrier": var tier_werte = t_att +' 28 '+ t_def +' 29 '+ t_mit +' 62'; break;//neu
				case "Habicht": var tier_werte = t_att +' 39 '+ t_def +' 41 '+ t_mit +' 38'; break;//neu
				case "Golden Retriver": var tier_werte = t_att +' 55 '+ t_def +' 45 '+ t_mit +' 43'; break;//neu
				case "Deutsche Dogge": var tier_werte = t_att +' 65 '+ t_def +' 59 '+ t_mit +' 1'; break;//neu
				case "Australian Shepard": var tier_werte = t_att +' 59 '+ t_def +' 40 '+ t_mit +' 56'; break;//neu
				case "Zebra": var tier_werte = t_att +' 62 '+ t_def +' 69 '+ t_mit +' 80'; break;//neu
				case "Kamel": var tier_werte = t_att +' 71 '+ t_def +' 82 '+ t_mit +' 98'; break;//neu
				case "Tapir": var tier_werte = t_att +' 74 '+ t_def +' 89 '+ t_mit +' 34'; break;//neu
				case "Riesenschildkröte": var tier_werte = t_att +' 95 '+ t_def +' 75 '+ t_mit +' 30'; break;//neu
				case "Elch": var tier_werte = t_att +' 100 '+ t_def +' 95 '+ t_mit +' 39'; break;//neu

				case "Phönix": var tier_werte = t_att +' 146 '+ t_def +' 107 '+ t_mit +' 95'; break;//neu



//clodogame

//tuerkei

//mendigogame


//menelgame
//dossergame



				default: var tier_werte = "-"; break;
			}

		
	}
	if (!check(3)){
		var tier_ueberschrift = "";
	}
	if(!check(6)){
		var tier_bild_x = "";
	}
	if (!check(9)){
		tier_beschreib = "";
	}
	if (!check(28)){
		tier_name = "";
	}
	if (!check(29)){
		tier_werte = "";
	}
	if(!check(18)){
		tier_tip = "";
	}

	if (alle_tier_optionen){
		if(check(12) || check(13) || check(14)){
			newtd_tier = document.createElement('td');
			newtd_tier.setAttribute('id', 'td'+(3+Number(check(12))+Number(check(13))+Number(check(14)))+'.'+x);
			newtd_tier.innerHTML = '<tr><td style="text-align:center;">'+ tier_ueberschrift +'</td></tr><tr><td style="text-align:center;">'+ tier_bild_x +'</td></tr><tr><td style="text-align:center;">'+ tier_beschreib +'</td></tr><tr><td style="text-align:center;">'+ tier_tip +'</td></tr><tr><td style="text-align:center;"><b>'+ tier_name +'</b></td></tr><tr><td style="text-align:center; vertical-align:middle;"><nobr>'+ tier_werte +'</nobr></td></tr></table>';
			trk.insertBefore(newtd_tier, document.getElementById('td7.'+x));

		}
		else {
			document.getElementById('td3.'+x).innerHTML = '<tr><td style="text-align:center;">'+ tier_ueberschrift +'</td></tr><tr><td style="text-align:center;">'+ tier_bild_x +'</td></tr><tr><td style="text-align:center;">'+ tier_beschreib +'</td></tr><tr><td style="text-align:center;">'+ tier_tip +'</td></tr><tr><td style="text-align:center;"><b>'+ tier_name +'</b></td></tr><tr><td style="text-align:center; vertical-align:middle;"><nobr>'+ tier_werte +'</nobr></td></tr></table>';
		}
	}

	if (check(23)){
		user_plunder(x, side)
	}
}





























function user_online (side, trk){
	var side_search = side.indexOf('alt="Online"');
	
	if (side_search != -1){
		trk.getElementsByTagName('td')[0].innerHTML += '&nbsp;<img alt="Online" title="Online" src="http://media.pennergame.de/img/on.png"/>';

	}
}

function user_plunder(x, side){
	try {
		var side_split = side.split('<div id="item_icon">');
		var side_split_2 = side_split[1].split('<td width="4%">');
		var side_split_3 = side_split_2[1].split('</td>');
		var plunder_bild = side_split_3[0];
		var side_split_4 = side_split_3[1].split('ity item">');
		var side_split_5 = side_split_4[1].split('</span>');
		var plunder_name = side_split_5[0];


		if(side_split[2]){
			try {
				var side_split_6 = side_split[2].split('item_stats">');
				var side_split_7 = side_split_6[1].split('</div>');
				var item_stats_1 = '<hr/>'+ side_split_7[0];
			} catch (err){
				var item_stats_1 = "";
			}
			try {
				var side_split_8 = side_split_6[2].split('</div>');
				var item_stats_2 = '<br />' + side_split_8[0];
			} catch (err){
				var item_stats_2 = "";
			}
			try {
				var side_split_9 = side_split_6[3].split('</div>');
				var item_stats_3 = '<br />' + side_split_9[0];
			} catch (err){
				var item_stats_3 = "";
			}
			try {
				var side_split_10 = side_split[2].split('item_add">');
				var side_split_11 = side_split_10[1].split('</div>');
				var item_add = '<hr/>' + side_split_11[0];
			} catch (err) {
				//alert(err);
				var item_add = "";
			}
		}
		else {
			var item_stats_1 = "";
			var item_stats_2 = "";
			var item_stats_3 = "";
			var item_add = "";
		}
	
document.getElementById('td3.'+x).innerHTML += '<div style="float:left; background-color:#000000; height:100px; width:150px; padding:3px;"><br>'+plunder_bild+'<br>'+plunder_name+'<br>'+item_stats_1+'<br>'+item_stats_2+'<br>'+item_stats_3+'';

		} catch (err){
			//alert(err);
	}
}

function user_and_tier_facts_read(side){
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: ''+link+'/skills/pet/',
    	onload: function(responseDetails) {
			var tier_side = responseDetails.responseText;
			try{
				var time_tier = tier_side.split('style_skill">')[2].split('</span>')[0];
				var time_tier = time_tier.split('counter(')[1].split(')<')[0];
			} catch (err){
				var time_tier = 0;
			}
			user_and_tier_facts_show(side, time_tier)
		}
	});
}

function user_and_tier_facts_show(side, time_tier) {
	try{
		var user_facts_counter = new Array(2);
		var user_facts_split = side.split('<div id="infoscreen">');
		var user_facts_split_2 = user_facts_split[1].split('</form>');
		var user_facts_search = user_facts_split_2[0].replace(/href='/g, "href='http://www.pennergame.de");
		var user_facts_search_2 = user_facts_search.replace(/href="/g, 'href="http://www.pennergame.de');
		var user_facts_split_3 = user_facts_search_2.split("<script language='javascript'>counter(");
		var user_facts_split_4 = user_facts_split_3[1].split(')</script>');
		user_facts_counter[0] = user_facts_split_4[0];
		var user_facts_split_5 = user_facts_split_3[2].split(')</script>');
		user_facts_counter[1] = user_facts_split_5[0];
		try {
			var user_facts_split_6 = user_facts_split_3[3].split(')</script>');
			user_facts_counter[2] = user_facts_split_6[0];
		} catch (err){
			user_facts_counter[2] = 0;
		}
		user_facts_counter[3] = time_tier;
		
		var user_facts_cash = user_facts_split_2[0].split('&euro;')[1].split('</li>')[0];
		var user_facts_permil = user_facts_split_2[0].split('<li class="permil" style="')[1].split('</li>')[0];
		var user_facts_skill = user_facts_split_2[0].split('<li class="book"')[1].split('</li>')[0];

		var style_user_facts = 'height: 21px; width: 100px; background-repeat:no-repeat; margin-left:20px; padding-left:30px;'
		document.getElementById('header').style.backgroundImage = "url(http://media.pennergame.de/img/header/1.jpg)";
		
		var newul = document.createElement('ul');
		newul.setAttribute('style', 'list-style:none;margin:0;padding:0;');
		newul.innerHTML = '<li style="'+ style_user_facts +' background:transparent url(http://media.pennergame.de/de/img/cash.png) no-repeat scroll 0 0;">&euro;'+ user_facts_cash +'</li><li style="'+ style_user_facts + user_facts_permil +'</li>'
		document.getElementById('infoscreen').appendChild(newul);
		var newli = new Array();
		
		for(li = 0; li <= 3; li++){
			newli[li] = document.createElement('li');
			newli[li].style.backgroundRepeat = "no-repeat";
			if(li==0)newli[li].style.background = "transparent url(http://media.pennergame.de/de/img/book.png) no-repeat scroll 0 0";
			else if(li==1)newli[li].style.background = "transparent url(http://media.pennergame.de/de/img/att.png) no-repeat scroll 0 0";
			else if(li==2)newli[li].style.background = "transparent url(http://media.pennergame.de/de/img/crap.png) no-repeat scroll 0 0";
			else if(li==3)newli[li].style.background = "transparent url(http://media.pennergame.de/img/plunder/icons/stofftier.gif) no-repeat scroll 0 0";
	
			newli[li].style.marginLeft = "20px";
			newli[li].style.paddingLeft = "30px";
			newli[li].style.height = "21px";
	
			newli[li].innerHTML = '<nobr><span id="counter_0'+ li +'"></span></nobr><script language="javascript">var laufzeit'+ li +' = 0; var jetzt'+ li +' = new Date(); var startzeit'+ li +' = jetzt.getTime();	var counters'+ li +' = new Array(); function refreshzeit'+ li +'(){ jetzt'+ li +' = new Date(); laufzeit'+ li +' = (jetzt'+ li +'.getTime() - startzeit'+ li +')/1000;}function formate_time_rel'+ li +'(time'+ li +'){	if(time'+ li +'<0) { return " -/-";	} else { var sekunde'+ li +' = Math.floor(time'+ li +'%60); if(time'+ li +' < 60) { if(time'+ li +' < 10){ return "00:0" + sekunde'+ li +'; }else{return "00:" + sekunde'+ li +'; } } else if(sekunde'+ li +'<10) { sekunde'+ li +'="0"+sekunde'+ li +'; } var minute'+ li +' = (Math.floor(time'+ li +'/60)%60); if(time'+ li +' < 3600) { return minute'+ li +' + ":" + sekunde'+ li +'; } if(minute'+ li +'<10) { minute'+ li +'="0"+minute'+ li +'; } var stunde'+ li +' = (Math.floor(time'+ li +'/3600)%24); if(time'+ li +' < 86400) { return (stunde'+ li +' + ":" + minute'+ li +' + ":" + sekunde'+ li +'); } if(stunde'+ li +'<10) { stunde'+ li +'="0"+stunde'+ li +';	} var tage'+ li +' = Math.floor(time'+ li +'/(3600*24));		if(tage'+ li +'>1) return (tage'+ li +' + " Tage " + stunde'+ li +' + ":" + minute'+ li +' + ":" + sekunde'+ li +'); else return (tage'+ li +' + " Tag " + stunde'+ li +' + ":" + minute'+ li +' + ":" + sekunde'+ li +'); }}function spezialcounter'+ li +'(time'+ li +', schritt'+ li +') { document.getElementById("counter_0'+ li +'").innerHTML = formate_time_rel'+ li +'(time'+ li +');	var thiscounter'+ li +' = document.getElementById("counter_0'+ li +'");	thiscounter'+ li +'.typ = "countdown";	thiscounter'+ li +'.time = time'+ li +'; thiscounter'+ li +'.schritt = schritt'+ li +';	counters'+ li +'.push(thiscounter'+ li +');}function counter'+ li +'(time'+ li +') { spezialcounter'+ li +'(time'+ li +', -1);}function count'+ li +'(){ for(var i = 0; i < counters'+ li +'.length; i++) { if(counters'+ li +'[i].typ == "countdown") { counters'+ li +'[i].innerHTML = formate_time_rel'+ li +'(counters'+ li +'[i].time + counters'+ li +'[i].schritt * laufzeit'+ li +');					} else if(counters'+ li +'[i].typ == "zeit") { counters'+ li +'[i].innerHTML = formate_time_abs'+ li +'((counters'+ li +'[i].time + counters'+ li +'[i].schritt * laufzeit'+ li +')*1000); } else if(counters'+ li +'[i].typ == "zahl") { counters'+ li +'[i].innerHTML = formatNumber'+ li +'(counters'+ li +'[i].time + counters'+ li +'[i].schritt * laufzeit'+ li +');		}	}}function starter'+ li +'(){ refreshzeit'+ li +'(); count'+ li +'(); setTimeout("starter'+ li +'()",1000);}starter'+ li +'();</script><script language="javascript">counter'+ li +'('+user_facts_counter[li]+')</script>';
		document.getElementsByTagName("ul")[0].insertBefore(newli[li], document.getElementsByTagName("ul")[0].getElementsByTagName("li")[li+2]);
		}
	
	}catch(err){

	}
}


// die pennergame such funktion wird hiermit dauernd angeeigt oder ausgescaltet


if (check(24)){
	points_assort()
}
function points_assort(fight_points_min,fight_points_min){

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/highscore/user/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;

			var text1 = content.split('<div class="gboxbig odd" id="highscore">')[1];
			var userid = text1.split('</form>')[0];

var einsa = document.getElementsByClassName('col6 search')[0];
einsa.innerHTML ='<br><br><br><br><br><br><br>'+userid+'<input type="button" id="fightsuche" name="fightsuche" value="Fight Gegner zeigen die in meinen Punktebereich von Min:'+GM_getValue("fight_points_min")+' bis Max: '+GM_getValue("fight_points_max")+' Punkte sind.">'

document.getElementById('fightsuche').addEventListener('click', function likklickerone() {
window.location.href = ''+link+'/highscore/user/?min='+GM_getValue("fight_points_min")+'&max='+GM_getValue("fight_points_max")+'';
},false);


}});
}



var table_setting = '<br /><table width = "100%" style="border-color:#000000; border:5px; border-style:groove; "><tr><th colspan="6" style="border-bottom-color:#000000; border-bottom:5px; border-bottom-style:groove; "><b><h2>Einstellung der Highscorescriptanzeige<h2></b></th></tr><tr><td colspan="2" style="border-right-color:#000000; border-right:3px; border-right-style:groove; border-bottom-color:#000000; border-bottom:1px; border-bottom-style:solid;"><b>Anzeige in den Pennerinfos: </b></td><td colspan="2" style="border-right-color:#000000; border-right:3px; border-right-style:groove; border-bottom-color:#000000; border-bottom:1px; border-bottom-style:solid;"><b>Anzeige der Bandeninfos: </b></td><td colspan="2" style="border-bottom-color:#000000; border-bottom:1px; border-bottom-style:solid;"><b>Tierinfos:</td></tr><tr style="height:12px;"><td>Punkte:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert1" value="points"></td><td>Punkte:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert2" value="points_gang"></td><td>Tiername:</td><td>&nbsp;<input type="checkbox" name="wert3" value="tier_name"></td></tr><tr><td>Registrier-Datum:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert4" value="reg"></td><td>Anzahl Member:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert5" value="member"></td><td>Tierbild:</td><td>&nbsp;<input type="checkbox" name="wert6" value="tier_bild"></td></tr><tr><td>Bandenstatus:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert7" value="status"></td><td>Bandenplatz:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert8" value="points_gang"></td><td>Tierbeschreibung:</td><td>&nbsp;<input type="checkbox" name="wert9" value="tier_def"></td></tr><tr><td>Geldanzeigen:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert10" value="cash"></td><td>&Oslash; Punktzahl:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert26" value="duch_punktzahl"></td><td>Faketier-Hinweis:</td><td>&nbsp;<input type="checkbox" name="wert18" value="tier_tip"></td></tr><tr><td>Promillewert:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert17" value="prom"></td><td>Bü/Fe -anzeigen:*<sup><small><small>5</small></small></sup></td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert27" value="enemy_friend"></td><td>Tier (nur Text):</td><td>&nbsp;<input type="checkbox" name="wert28" value="tier_text"></td></tr><tr><td>Plunder:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert23" value="Plunder"></td><td></td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove;"></td><td>Tier Grundwerte:</td><td>&nbsp;<input type="checkbox" name="wert29" value="tier_werte"></td></tr><tr><td style="border-bottom-color:#000000; border-bottom:3px; border-bottom-style:groove;">Notiz eingabe:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove; border-bottom-color:#000000; border-bottom:3px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert20" value="Notiz"></td><td style="border-bottom-color:#000000; border-bottom:3px; border-bottom-style:groove;">B-Notiz eingabe:</td><td style="border-right-color:#000000; border-right:3px; border-right-style:groove; border-bottom-color:#000000; border-bottom:3px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert21" value="B-Notiz"></td><td style="border-bottom-color:#000000; border-bottom:3px; border-bottom-style:groove;"></td><td style="border-bottom-color:#000000; border-bottom:3px; border-bottom-style:groove;"></td></tr><tr><td colspan="5" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;"><b>Angreifbare Spieler farblich hervorheben:</b></td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert25" value="att_color"></td></tr><tr><td colspan="6" style="height:22px; vertical-align:middle; text-align:center; border-bottom-color:#000000; border-bottom:1px; border-bottom-style:solid;"><b>Anzeige von seperaten Spalten für:</b></td></tr><tr><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">Userpunkte:</td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove; border-right-color:#000000; border-right:2px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert12" value="points_2"></td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">Geld:</td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove; border-right-color:#000000; border-right:2px; border-right-style:groove;">&nbsp;<input type="checkbox" name="wert13" value="cash2"></td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">Promille:</td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert14" value="prom2"></td></tr><tr><td colspan="4" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;"><b>Auswahl der Sortieroption 1-6</b>&nbsp;*</td><td colspan="2" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;"><input name="ausgabe" type="text" size="2" maxlength="1" value="'+ ausgabe[0] +'"></td></tr><tr><td colspan="5" style="border-bottom-color:#000000; border-bottom:1px; border-bottom-style:groove;"><b>Geldanzeige farbig hervorheben:</b>&nbsp;*<sup><small><small>2</small></small></sup></td><td style="border-bottom-color:#000000; border-bottom:1px; border-bottom-style:solid;">&nbsp;<input type="checkbox" name="wert15" value="color_cash"></td></tr><tr><td colspan="6" style="border-bottom-color:#000000; border-bottom:1px; border-bottom-style:solid;">Ganze Zelle <input type="radio" name="wert22" value="Zelle"> oder nur Geldtext <input type="radio" name="wert22" value="Text"> farbig hervorheben ?</td></tr><tr><td colspan="2" style="border-right-color:#000000; border-right:1px; border-right-style:solid;">Geldbereich Grün :</td><td colspan="2" style="border-right-color:#000000; border-right:1px; border-right-style:solid;">Geldbereich Gelb :</td><td colspan="2" style="border-right-color:#000000; border-right:1px; border-right-style:solid;">Geldbereich Rot :</td></tr><tr><td colspan="2" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove; border-right-color:#000000; border-right:1px; border-right-style:solid;">Von:&nbsp;<input name="ausgabe" type="text" size="5" maxlength="15" value="'+ ausgabe[1] +'"> <br />Bis:&nbsp;&nbsp;<input name="ausgabe" type="text" size="5" maxlength="15" value="'+ ausgabe[2] +'"></td><td colspan="2" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove; border-right-color:#000000; border-right:1px; border-right-style:solid;">Von:&nbsp;<input name="ausgabe" type="text" size="5" maxlength="15" value="'+ ausgabe[3] +'"> <br />Bis:&nbsp;&nbsp;<input name="ausgabe" type="text" size="5" maxlength="15" value="'+ ausgabe[4] +'"></td><td colspan="2" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove; border-right-color:#000000; border-right:1px; border-right-style:solid;">Von:&nbsp;<input name="ausgabe" type="text" size="5" maxlength="15" value="'+ ausgabe[5] +'"> <br />Bis:&nbsp;&nbsp;<input name="ausgabe" type="text" size="5" maxlength="15" value="'+ ausgabe[6] +'"></td></tr><tr><td colspan="4" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;"><b>Alarmmeldung ab einen bestimmten Geldwert:</b> *<sup><small><small>3</small></small></sup></td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">Ab:&nbsp;<input name="ausgabe" type="text" size="5" maxlength="15" value="'+ ausgabe[7] +'">&nbsp;&euro;</td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert16" value="alert_M"></td></tr>               <tr><td colspan="5" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;"><b>Ausblenden/Verschieben des Untermenü "Spieler/Banden":</b> *<sup><small><small>4</small></small></sup></td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert11" value="kill_submenu"></td></tr>                  <tr><td colspan="5" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;"><b>Einfügen des eigenen Pennerstatus:</b></td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert19" value="status"></td></tr><tr><td colspan="5" style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;"><b>Pennergame suchfunktion immer anzeigen<sup><small><small>4</small></small></sup>:</b></td><td style="border-bottom-color:#000000; border-bottom:2px; border-bottom-style:groove;">&nbsp;<input type="checkbox" name="wert24" value="points_sort"></td></tr><tr><td colspan="6"  style="border-bottom-color:#000000; border-bottom:3px; border-bottom-style:groove;"><b>*</b>&nbsp;Die Sortieroption dient dazu die Werte in den Feldern "Pennerinfo" und "Bandeninfo" unterschiedlich zu gestalten. Es kann sein das bei wenig ausgewählten Anzeigewerten die verschiedenen Sortieroptionen keinen sichtbaren Unterschied haben, bei allen Anzeigewerten gibt es jedoch immer einen Unterschied.<br /><b>*</b><sup><small><small>2</small></small></sup>&nbsp;"Geldanzeige farbig hervorheben" dient dazu das ab einen, für den Nutzer wichtigen Geldwert, dieser farbig hervorgehoben wird. Es müssen <u>nicht</u> alle Farben genutzt werden! Es ist darauf zu achten das die eingegebenen Werte in dem Schema "Von" niedrigen "Bis" zum höheren Wert angegeben werden.<br /><b>*</b><sup><small><small>3</small></small></sup>&nbsp;Die Alarmmeldung gibt ab den eingestellten Wert eine Alertfenster aus und markiert den Treffer farbig.<br />                 <b>*</b><sup><small><small>4</small></small></sup>&nbsp;Schaltet die Pennergame suchfunktion an und aus ,somit erspart ich euch das ewige klicken auf der Lupe.(das suchfeld ist immer an oder aus wie man es gerade einstellt<br />                 <b>*</b><sup><small><small>5</small></small></sup> "Bü/Fe -anzeigen" steht für Bündnis- Feindeanzeigen. Die Funktion schreibt im Bandenbereich ob jemand ein Freund oder ein Feind ist. Bei Freunden wird gleichzeitig die Angriffsmöglichkeit entfernt.</tr><tr><td colspan="4" style="border-right-color:#000000; border-right:2px; border-right-style:groove;">Einstellungen speichern:&nbsp;&nbsp;<input type="button" value="Speichern"></td><td colspan="2"><input type="button" name="closeSetting" value="Close Settings"></td></tr></table>';


function check(y){
	return GM_getValue("save_setting"+y);
}

try {			
	var div = document.getElementById('pagination');
	div.innerHTML += '<br /><input type="button" name="setting" value="Setting">'
	var div_seven = div.innerHTML;
	document.getElementsByName('setting')[0].addEventListener('click', function Setting(){
	div.innerHTML += table_setting;



	for (j = 1; j <= 29; j++) {
		document.getElementsByName("wert"+j)[0].checked = GM_getValue("save_setting"+j);
	}
	document.getElementsByName("wert22")[1].checked = GM_getValue("save_setting22b");
	div.getElementsByTagName('input')[39].addEventListener('click', function eintragen(){
																						  
		var input_check0 =  Number(document.getElementsByName("ausgabe")[0].value);
		var input_check1 =  Number(document.getElementsByName("ausgabe")[1].value);
		var input_check2 =  Number(document.getElementsByName("ausgabe")[2].value);
		var input_check3 =  Number(document.getElementsByName("ausgabe")[3].value);
		var input_check4 =  Number(document.getElementsByName("ausgabe")[4].value);
		var input_check5 =  Number(document.getElementsByName("ausgabe")[5].value);
		var input_check6 =  Number(document.getElementsByName("ausgabe")[6].value);
	
		if (input_check1 > input_check2){
			alert('Der von Ihnen gew\u00e4hlte Bereich f\u00fcr die Farbe "Gr\u00fcn", Von: '+ input_check1 +' Bis: '+ input_check2 +' entspricht nicht den gew\u00fcnschten Eingaberegeln. Bitte tragen Sie den farbigen Bereich Vom niedrigeren Bis zum h\u00f6heren Bereich ein. \nDie Eingabefelder werden zur\u00fcckgesetzt. \nBitte erneuern Sie ihre Eingabe.\n\nMit freundlichem Gruss \nNewMan');
			document.getElementsByName("ausgabe")[1].value = "";
			document.getElementsByName("ausgabe")[2].value = "";
		}
		if (input_check3 > input_check4){
			alert('Der von Ihnen gew\u00e4hlte Bereich f\u00fcr die Farbe "Gelb", Von: '+ input_check3 +' Bis: '+ input_check4 +' entspricht nicht den gew\u00fcnschten Eingaberegeln. Bitte tragen Sie den farbigen Bereich Vom niedrigeren Bis zum h\u00f6heren Bereich ein. \nDie Eingabefelder werden zur\u00fcckgesetzt. \nBitte erneuern Sie ihre Eingabe.\n\nMit freundlichem Gruss \nNewMan');
			document.getElementsByName("ausgabe")[3].value = "";
			document.getElementsByName("ausgabe")[4].value = "";
		}
		else if (input_check3 < input_check4 && input_check2 >= input_check3 && input_check4 >= input_check1){
			alert('Der von Ihnen gew\u00e4hlte Bereich f\u00fcr die Farbe "Gelb", Von: '+ input_check3 +' Bis: '+ input_check4 +' \u00fcberschneidet sich mit dem gew\u00e4hlten Bereich f\u00fcr die Farbe "Gr\u00fcn" \nDie Eingabefelder der Farbe "Gelb" werden zur\u00fcckgesetzt. \nBitte erneuern Sie Ihre Eingabe. \n\nMit freundlichem Gruss \nNewMan');
			document.getElementsByName("ausgabe")[3].value = "";
			document.getElementsByName("ausgabe")[4].value = "";
		}
		if (input_check5 > input_check6){
			alert('Der von Ihnen gew\u00e4hlte Bereich f\u00fcr die Farbe "Rot", Von: '+ input_check5 +' Bis: '+ input_check6 +' entspricht nicht den gew\u00fcnschten Eingaberegeln. Bitte tragen Sie den farbigen Bereich <u>Vom</u> niedrigeren Bis zum h\u00f6heren Bereich ein. \nDie Eingabefelder werden zur\u00fcckgesetzt. \nBitte erneuern Sie ihre Eingabe.\n\nMit freundlichem Gruss \nNewMan');
			document.getElementsByName("ausgabe")[5].value = "";
			document.getElementsByName("ausgabe")[6].value = "";
		}
		else if (input_check5 < input_check6 && input_check2 >= input_check5 && input_check6 >= input_check1){
			alert('Der von Ihnen gew\u00e4hlte Bereich f\u00fcr die Farbe "Rot", Von: '+ input_check5 +' Bis: '+ input_check6 +' \u00fcberschneidet sich mit dem gew\u00e4hlten Bereich f\u00fcr die Farbe "Gr\u00fcn" \nDie Eingabefelder der Farbe "Rot" werden zur\u00fcckgesetzt. \nBitte erneuern Sie Ihre Eingabe. \n\nMit freundlichem Gruss \nNewMan');
			document.getElementsByName("ausgabe")[5].value = "";
			document.getElementsByName("ausgabe")[6].value = "";
		}
		else if (input_check5 < input_check6 && input_check4 >= input_check5 && input_check6 >= input_check3){
			alert('Der von Ihnen gew\u00e4hlte Bereich f\u00fcr die Farbe "Rot", Von: '+ input_check5 +' Bis: '+ input_check6 +' \u00fcberschneidet sich mit dem gew\u00e4hlten Bereich f\u00fcr die Farbe "Gelb" \nDie Eingabefelder der Farbe "Rot" werden zur\u00fcckgesetzt. \nBitte erneuern Sie Ihre Eingabe. \n\nMit freundlichem Gruss \nNewMan');
			document.getElementsByName("ausgabe")[5].value = "";
			document.getElementsByName("ausgabe")[6].value = "";
		}
	
		for (k = 0; k <= 7; k++){
			if (!isNaN(document.getElementsByName("ausgabe")[k].value)) {
				if (k==0 && input_check0 <= 6 && input_check0 >=1){
					GM_setValue("ausgabe"+k, input_check0);
				} else if (k==0 && (input_check0 < 1 || input_check0 > 6)) {
					alert('Die von Ihnen ausgew\u00e4hlte Sortieroption "' + input_check0 + '" existiert nicht. Bitte w\u00e4hlen Sie eine Option von 1 bis 6. \n\nMit freundlichem Gruss \nNewMan');
				}
				else {
					GM_setValue("ausgabe"+k, document.getElementsByName("ausgabe")[k].value);
				}
				
			}
			else if (isNaN(document.getElementsByName("ausgabe")[k].value)){
				alert ('Der von Ihnen eingegebene Wert "' + document.getElementsByName("ausgabe")[k].value + '" im Eingabefeld ' + (k+1) + ' ist keine Zahl. Bitte geben Sie nur Zahlen in die Eingabefelder ein oder belassen Sie sie leer. \n\nMit freundlichem Gruss \nNewMan');
			}
		}

		for (i = 1; i <= 29; i++) {
			GM_setValue("save_setting" + i, document.getElementsByName("wert"+i)[0].checked);
		}
		GM_setValue("save_setting22b", document.getElementsByName("wert22")[1].checked);
		 
		location.reload();
	},false);

	document.getElementsByName('closeSetting')[0].addEventListener('click', function closeSetting () {
		div[0].innerHTML = div_seven;
	},false);
	},false);
} catch (err) {
 //alert (err);
}





















//Copyright by NewMan im Pennergame unter NewMan01 zu finden
// ==UserScript==
// @name           Dark Throne Gold - WEP Database Updater
// @version        1.6
// @namespace      http://crashh.webd.pl/greasemonkey/js/darkthrone.wepdatabase.user.js
// @author         Nanaki
//
// @description    Skrypt wysyłający dane do bazy klanowej oraz szpiegowskiej, wyświetla komunikaty o massach oraz informacje o niezalogowaniu w bazie danych.
//
// @include        http://darkthrone.com/overview*
// @include        http://www.darkthrone.com/overview*
// @include        http://gold.darkthrone.com/overview*
// ==/UserScript==
var version = 1.6;

if(typeof unsafeWindow == 'undefined') {
	if(window.wrappedJSObject) var unsafeWindow = window.wrappedJSObject;
	else var unsafeWindow = window;
}
if(window.navigator.vendor && window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
}
var DT = unsafeWindow.DT;

var cdays = 365;
var database="http://crashh.webd.pl/database/";

function dismiss_notice(tekst,link) {
	var notice = document.getElementById(tekst);
	if(notice.style.display == 'block') {
		notice.style.display = 'none';
		link.innerHTML = 'poka&#380;';
		DT.createCookie('dismiss-'+tekst,'hide',7);
	} else {
		notice.style.display = 'block';
		link.innerHTML = 'ukryj';
		DT.createCookie('dismiss-'+tekst,'show',-10);
	}
}
function komunikaty(odp) {
	var statsy = document.getElementsByTagName('h3')[0].parentNode;
	var main = statsy.parentNode;
	odp2 = DT.odszyfruj(odp);
	if (odp2=='') {
		start = odp.indexOf('<!-- C:start -->');
		end = odp.indexOf('<!-- C:end -->');
		if(start==-1) {
			start=11;
		} else {
			start+=16;
		}
		if(end==-1) {
			end = odp.length;
		}
		odp2=odp.substring(start,end);
		var blad = odp.indexOf('Logowanie')==-1;
		var badrq = odp.indexOf('Bad Request')!=-1;
		
		odp2=odp2.replace('login.php',database+'login.php" onsubmit="window.location.reload();" target="_blank');
		odp2=odp2.replace(/<h2>.*?<\/h2>/ig,'');
		odp2=odp2.replace(/120px;/ig,'110px; margin-bottom: 2px;');
		
		odp2 = '<form action="'+database+'" method="post" onsubmit="window.location.reload();" target="_blank">';
		odp2 += '<table style="margin: 0px auto; width: auto;">';
		odp2 += '<tr><td>Login:</td><td colspan="2"><input type="text" size="20" name="login" id="login"></td></tr>';
		odp2 += '<tr><td>Hasło:</td><td colspan="2"><input type="password" size="20" name="pass" id="pass"></td></tr>';
		odp2 += '<td colspan="2"><input type="checkbox" name="remember" id="remember"> <label for="remember">zapamiętaj</label></td>';
		odp2 += '<td class="right"><input type="submit" value="Wyślij"></td>';
		odp2 += '</table>';
		odp2 += '<input type="hidden" name="action" value="login"></form>';
		
		var komunikat = document.createElement('li');
		komunikat.setAttribute('class',"section table");
		if(blad) {
			zaw = '<h3>Wyst&#261;pi&#322; b&#322;&#261;d</h3>';
		} else {
			zaw = '<h3>Nie jeste&#347; zalogowany/a</h3>';
		}
		zaw += '<table cellspacing="0" style="font-size: 11px; font-family: Verdana;">';
		zaw += '<tr>';
		zaw += '<td style="font-size: 12px; padding: 20px;">';
		if(blad) {
			if(badrq) {
				zaw += 'Pami&#281;taj o zainstalowaniu Firefox w wersji powyżej 3.5.';
			} else {
				zaw += 'W pliku odpowiadaj&#261;cym za komunikaty wyst&#261;pi&#322; b&#322;&#261;d, wklej zawarto&#347;&#263; prawej kom&oacute;rki na forum.';
			}
		} else {
			zaw += 'Nie jeste&#347; zalogowany/a w bazie danych.<br />';
			zaw += 'Aby otrzymywa&#263; informacje o zbli&#380;aj&#261;cych si&#281; massach <br />oraz wysy&#322;a&#263; swoje statystyki musisz si&#281; zalogowa&#263; u&#380;ywaj&#261;c loginu i has&#322;a z forum.<br />';
		}
		zaw += '</td>';
		zaw += '<td width="25%">';
		zaw += odp2;
		zaw += '</td>';
		zaw += '</tr>';/*
		zaw += '<tr>';
		zaw += '<td colspan="2"><textarea style="width: 100%" rows="10">';
		zaw += odp;
		zaw += '</textarea></td>';
		zaw += '</tr>';
		zaw += '<tr>';
		zaw += '<td colspan="2"><textarea style="width: 100%" rows="10">';
		zaw += odp2;
		zaw += '</textarea></td>';
		zaw += '</tr>';*/
		zaw += '</table>';
		komunikat.innerHTML = zaw;
		main.insertBefore(komunikat,statsy);
	} else {
		var notices = odp2.split('<split>');
		var komunikat = new Array();
		
		for(var i=0;i < notices.length-1;i++) {
			var pola = notices[i].split('<split2>');
			if(!(pola[0] == 'x' && pola[1] == 'x')) {
				if(pola[2]) {
					var notice_id = 'dbnotice-'+pola[2];
					var n_hidden = DT.readCookie('dismiss-'+notice_id) == 'hide';
				} else {
					var n_hidden = false;
				}
				komunikat[i] = document.createElement('li');
				komunikat[i].setAttribute('class',"section table");
				if(pola[2]) {
					zaw = '<div style="font-size: 10px; padding: 2px 5px; text-align: right; float: right; margin-top: 1px;">[<a href="javascript: void(0);" class="dismiss_link" style="color: #ddd; text-decoration: none;">'+(n_hidden?'poka&#380;':'ukryj')+'</a>]</div>';
				} else {
					zaw = '';
				}
				zaw += '<h3>'+pola[0]+'</h3>';
				zaw += '<div id="'+notice_id+'" style="display: '+(n_hidden?'none':'block')+'"><table cellspacing="0">';
				zaw += '<tr>';
				zaw += '<td>';
				zaw += pola[1];
				zaw += '</td>';
				zaw += '</tr>';
				zaw += '</table></div>';
				komunikat[i].innerHTML = zaw;
				var link = komunikat[i].getElementsByClassName('dismiss_link')[0];
				link.addEventListener("click", function(event) { dismiss_notice(notice_id,this); }, true);
				main.insertBefore(komunikat[i],statsy);
			}
		}
		var last = notices[notices.length-1].replace(/^\s+|\s+$/g, '').split("\n\n");
		
		var good = 'btn icon_online'
		var bad = 'btn icon_offline'
		
		var medals = document.getElementById('medals');
		var div = document.createElement('div');
		div.style.marginTop = "-1em";
		medals.parentNode.parentNode.appendChild(div);
		for(var i=0;i < last.length;i++) {
			var bool = last[i].indexOf("pomyślnie") != -1;
			var img = document.createElement('img');
			img.src = "/A.gif";
			img.alt = "";
			img.title = last[i].replace(/^\s+|\s+$/g, '');
			img.className = bool?good:bad;
			img.style.margin = "0px 5px 0px 0px";
			div.appendChild(img);
		}
	}
}
function fort_health() {
	window.dane = document.getElementsByClassName('btn');
	if(!dane[7]) return;
	var fort1 = dane[7].parentNode.parentNode.getElementsByTagName('td')[2];
	var fort2 = dane[7].parentNode.parentNode.getElementsByTagName('td')[3];

	health = DT.tonumber(fort2.innerHTML.split('(')[0].split('/')[0]);
	health_max = DT.tonumber(fort2.innerHTML.split('(')[0].split('/')[1]);
	var proc = Math.round(((health/health_max*2)-1)*1000)/1000;

	if (proc < 0) { // Fort poniżej 50%
		fort1.style.backgroundColor = 'rgb(26,10,5)';
		fort2.style.backgroundColor = 'rgb(26,10,5)';
		fort1.getElementsByTagName('a')[0].style.color = 'rgb(255,10,5)';
		fort2.style.color = 'rgb(255,10,5)';
	} else if (proc >= 1) { // Fort 100% - bez zmian
		true;
	} else {
		var kolor = 'rgb('+Math.round(((0-Math.round(26))*proc)+Math.round(26))+','+Math.round(((0-Math.round(10))*proc)+Math.round(10))+','+Math.round(((0-Math.round(5))*proc)+Math.round(5))+')';
		fort1.style.backgroundColor = kolor;
		fort2.style.backgroundColor = kolor;
		
		kolor = 'rgb(255,'+Math.round(((Math.round(204)-Math.round(10))*proc)+Math.round(10))+','+Math.round(((Math.round(102)-Math.round(5))*proc)+Math.round(5))+')';
		fort1.getElementsByTagName('a')[0].style.color = kolor;
		fort2.style.color = kolor;
	}
}
function plus_minus(num,ref) {
	var diff = ref-num;
	if (diff > 0) return "&nbsp;&nbsp;<span style=\"color: #8CE338; font-size: smaller;\">+"+DT.tostring(Math.abs(diff))+"</span>";
	else if (diff < 0) return "&nbsp;&nbsp;<span style=\"color: #FF7038; font-size: smaller;\">-"+DT.tostring(Math.abs(diff))+"</span>";
	return '';
}
function read_stats() {
	var level = DT.tonumber(dane[1].parentNode.parentNode.innerHTML.substring(dane[1].parentNode.parentNode.innerHTML.search(/<dd>/i)+4,dane[1].parentNode.parentNode.innerHTML.search(/<\/dd>/i)));
	var orank = DT.tonumber(dane[2].parentNode.parentNode.innerHTML.substring(dane[2].parentNode.parentNode.innerHTML.search(/<dd>/i)+4,dane[2].parentNode.parentNode.innerHTML.search(/<\/dd>/i)));

	var uname = document.getElementsByClassName('character_personality')[0].getElementsByTagName('strong')[0].innerHTML;
	var pop = (dane[6].parentNode.parentNode.getElementsByTagName('td')[1]);
	var army = (dane[8].parentNode.parentNode.getElementsByTagName('td')[1]);
	var gold = (dane[9].parentNode.parentNode.getElementsByTagName('td')[3]);
	var goldturn = (dane[11].parentNode.parentNode.getElementsByTagName('td')[3]);
	var goldbank = (dane[13].parentNode.parentNode.getElementsByTagName('td')[3]);
	var off = (dane[14].parentNode.parentNode.getElementsByTagName('td')[1]);
	var def = (dane[16].parentNode.parentNode.getElementsByTagName('td')[1]);
	var soff = (dane[18].parentNode.parentNode.getElementsByTagName('td')[1]);
	var sdef = (dane[20].parentNode.parentNode.getElementsByTagName('td')[1]);

	var popn = DT.tonumber(pop.innerHTML);
	var armyn = DT.tonumber(army.innerHTML);
	var goldn = DT.tonumber(gold.innerHTML);
	var goldturnn = DT.tonumber(goldturn.innerHTML);
	var goldbankn = DT.tonumber(goldbank.innerHTML);
	var offn = DT.tonumber(off.innerHTML);
	var defn = DT.tonumber(def.innerHTML);
	var soffn = DT.tonumber(soff.innerHTML);
	var sdefn = DT.tonumber(sdef.innerHTML);

	var advisor = document.getElementsByClassName('sbl-stats')[0];
	var turns = DT.tonumber(advisor.innerHTML.substring(advisor.innerHTML.search(/Available/i)+17,advisor.innerHTML.length-1));

	var cookkiee;
	if(cookkiee = DT.readCookie("DT-Stats")) {
		var arr = cookkiee.split('+');
		
		off.innerHTML		+= plus_minus(arr[0],offn);
		def.innerHTML		+= plus_minus(arr[1],defn);
		soff.innerHTML		+= plus_minus(arr[2],soffn);
		sdef.innerHTML		+= plus_minus(arr[3],sdefn);
		army.innerHTML		+= plus_minus(arr[4],armyn);
		//pop.innerHTML		+= plus_minus(arr[5],popn);
		goldturn.innerHTML	+= plus_minus(arr[6],goldturnn);
	}
	DT.createCookie("DT-Stats",offn+'+'+defn+'+'+soffn+'+'+sdefn+'+'+armyn+'+'+popn+'+'+goldturnn,1);
	
	wysylka = 'lvl='+level;
	wysylka += '&orank='+orank;
	wysylka += '&login='+uname;

	wysylka += '&pop='+popn;
	wysylka += '&army='+armyn;

	wysylka += '&off='+offn;
	wysylka += '&def='+defn;
	wysylka += '&soff='+soffn;
	wysylka += '&sdef='+sdefn;

	wysylka += '&gold='+goldn;
	wysylka += '&goldturn='+goldturnn;
	wysylka += '&goldbank='+goldbankn;

	wysylka += '&turns='+turns;
	
	return wysylka;
}
function db_link() {
	var header = document.createElement('div');
	header.setAttribute('style',"font-size: 10px; padding: 2px; text-align: right; float: right; margin-top: 1px;");
	header.innerHTML += '<a href="http://crashh.webd.pl/database/" target="_blank" style="color: #ddd; text-decoration: none;">Baza WEP</a>&nbsp;';

	document.getElementsByTagName('h3')[1].parentNode.insertBefore(header,document.getElementsByTagName('h3')[1]);
}
function DT_wepdatabase() {
	db_link();
	fort_health();
	wysylka = read_stats();
	DT.request(database+'index.php?p=notices&'+wysylka,'',komunikaty);
}

//============= URUCHOMIENIE SKRYPTU =============//
DT_wepdatabase();
DT.version_check('darkthrone.wepdatabase.user.js',version);

// ==UserScript==
// @name           Nach_Geld_sortierte_Angriffsliste(HH, B, M)
// @author	   abwasch - pennerhack.foren-city.de
// @version        0.3
// @description    Angreifbare Spieler nach Geld sortiert
// @include        *pennergame.de/highscore/user/?*
// ==/UserScript==

var link = document.URL.split('pennergame')[0]+'pennergame.de';
var gegner_name = new Array();
var gegner_reg = new Array();
var gegner_points = new Array();
var gegner_cash = new Array();
var gegner_bande = new Array();
var gegner_bande_id = new Array();
var anzahl_gegner = 1000;
var gegner_id, gegner_liste, zaehler, rev;
var points = document.getElementsByClassName('icon award')[0].childNodes[1].firstChild.data;
var min = Math.round(points*0.8);
var max = Math.round(points*1.5);

document.getElementById('content-bottom').innerHTML += '<div id=\"auswahl\" style=\"position:absolute; width:850px; top:65px; left:20px; font-size:12px; font-weight:bold\">&nbsp;<\/div>\n';
document.getElementById('auswahl').innerHTML = '\nPunktebereich:&emsp;&emsp;min <input style="text-align:left\" type=\"text\" size=\"12\" maxlength=\"12\" id=\"min_punkte\" value=\"'+min+'\">\n'
					+'&emsp;&emsp;max <input style="text-align:left\" type=\"text\" size=\"12\" maxlength=\"12\" id=\"max_punkte\" value=\"'+max+'\">\n'
					+'&emsp;&emsp;Suche Gegner: <input style="text-align:right\" type=\"text\" size=\"2\" maxlength=\"5\" id=\"anzahl_gegner\" value=\"'+anzahl_gegner+'\">\n'
					+'&emsp;<input style=\"cursor:pointer; font-weight:bold; color:#e4e4e4; background-color:#901010\" type=\"submit\" id=\"start\" value=\"LOS!\">\n'
					+'<div id=\"anzeige\" style=\"position:absolute; width:830px; top:35px; left:0px; font-size:12px\">\n&nbsp;<\/div>';

document.getElementById('start').addEventListener('click', function(){
	document.getElementById('anzeige').style.fontWeight = 'bold';
	document.getElementById('anzeige').innerHTML = '<span id=\"anzahl\">0<\/span> Seiten gefunden! Lese';
	min = document.getElementById('min_punkte').value*1;
	max = document.getElementById('max_punkte').value*1;
	anzahl_gegner = Math.ceil(document.getElementById('anzahl_gegner').value/20);
	gegner_id = new Array();
	gegner_liste = new Array();
	zaehler = 1;
	rev = 1;
	seitenabfrage();
},false);

function seitenabfrage(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/highscore/user/'+zaehler+'/?min='+min+'&max='+max,
		onload: function(responseDetails) {
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument('', '', dt);
			var html = doc.createElement('html');
			html.innerHTML = responseDetails.responseText;
			doc.appendChild(html);
			if (!doc.getElementById('my-profile')){
				document.getElementById('anzahl').innerHTML = '<span color=\"red\">err<\/span>/';
				window.setTimeout(function(){seitenabfrage()}, 500);
				return;
			}
			var gegnersuche = doc.getElementsByClassName('col2');
			var maxpoints = doc.getElementsByClassName('col5');
			for (var z = 1; z < 21 && maxpoints[z].innerHTML <= max; z++){
				gegner_id.push(gegnersuche[z].childNodes[0].toString().match(/\d+/));
			}
			if (maxpoints[21].innerHTML <= max && zaehler < anzahl_gegner){
				zaehler++;
				seitenabfrage();
			}
			else{
				userabfrage();
			}
			document.getElementById('anzahl').innerHTML = zaehler;
			document.getElementById('anzeige').innerHTML += ' .';
			if (zaehler % 80 == 0) document.getElementById('anzeige').innerHTML = document.getElementById('anzeige').innerHTML.split(' .')[0];
		}
	}, false);
}

function userabfrage(){
	document.getElementById('anzeige').innerHTML = '<span id=\"anzahl\">0<\/span>/'+gegner_id.length+' Gegner gefunden! Lese API';
	if (!gegner_id[0]) document.getElementById('anzeige').innerHTML = 'Keine Gegner gefunden!';
	zaehler = 0;
	for (var i = 0; i < gegner_id.length; i++){
		GM_xmlhttpRequest({
			method: 'GET',
			url: link+'/dev/api/user.'+gegner_id[i]+'.xml',
			onload:function(responseDetails) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
				if (dom.getElementsByTagName('id')[0].textContent == ''){
					document.getElementById('anzahl').innerHTML = '<span color=\"red\">err<\/span>/';
					return;
				}
				api(dom);
				zaehler++;
				document.getElementById('anzahl').innerHTML = zaehler;
				document.getElementById('anzeige').innerHTML += ' .';
				if (zaehler % 80 == 0) document.getElementById('anzeige').innerHTML = document.getElementById('anzeige').innerHTML.split(' .')[0];
				if (zaehler == gegner_id.length){
					for (var a = 0, b = 0; a < gegner_id.length; a++){
						if (gegner_cash[a] != ''){
							gegner_liste[b] = gegner_cash[a]+';'+gegner_id[a]+';'+gegner_name[a]+';'+gegner_reg[a]+';'+gegner_points[a]+';'+gegner_bande[a]+';'+gegner_bande_id[a];
							b++;
						}
					}
					gegner_liste.sort(money_sort);
					anzeige();
				}
			}
		}, false);
	}
}

function api(dom){
	var dom_id = dom.getElementsByTagName('id')[0].textContent;
	for (var c = 0; c < gegner_id.length; c++){
		if (gegner_id[c] == dom_id){
			gegner_name[c] = dom.getElementsByTagName('name')[0].textContent;
			gegner_reg[c] = dom.getElementsByTagName('reg_since')[0].textContent;
			gegner_points[c] = dom.getElementsByTagName('points')[0].textContent;
			try{
				gegner_cash[c] = dom.getElementsByTagName('cash')[0].textContent;
				gegner_bande[c] = dom.getElementsByTagName('name')[1].textContent;
				gegner_bande_id[c] = dom.getElementsByTagName('id')[1].textContent;
			}
			catch (err) {
				gegner_cash[c] = '';
				gegner_bande[c] = '';
				gegner_bande_id[c] = '';
			}
		}
	}
}

function anzeige(){
	if (rev == 1){
		gegner_liste.reverse();
		rev = 0;
	}
	else rev = 1;
	var table = '<style type=\"text/css\">.a-liste:hover {background-color:#505050}\n</style>\n'
		+'<span style=\"font-size:12px; font-weight:bold\">Angriffsliste <\/span><i>(kann nach Geld, Punkten oder Registrier-Datum sortiert werden)</i><br><br>'
		+'<table style=\"position:absolute; left:20px\"><tr height=\"28\">\n'
		+'<th width=\"220px\">Penner<\/th>'
		+'<th width=\"100px\" align=\"center\"><span id=\"points\" style=\"cursor:pointer\">Punkte<\/span><\/th>'
		+'<th width=\"220px\">Bande<\/th>'
		+'<th width=\"100px\" align=\"center\"><span id=\"reg\" style=\"cursor:pointer\">Reg-Datum<\/span><\/th>'
		+'<th width=\"80px\" align=\"right\"><span id=\"money\" style=\"cursor:pointer\">Geld<\/span><\/th>'
		+'<th width=\"60px\" colspan=\"2\" align=\"right\"><\/th><\/tr>\n';
	for (var i = 0; i < gegner_liste.length; i++){
		var gegner =  gegner_liste[i].split(";");
		if (gegner[0] != '' && gegner[4] >= min && gegner[4] <= max){
			table += '<tr class=\"a-liste\">\n'
				+'<td height=\"20\"><a href=\"'+link+'/profil/id:'+gegner[1]+'\/\">'+gegner[2]+'<\/a><\/td>\n'
				+'<td style=\"text-align:center\">'+gegner[4]+'<\/td>\n'
				+'<td>'+(gegner[5] != 'False' ? '<a href=\"'+link+'/profil/bande:'+gegner[6]+'\/\">'+gegner[5]+'<\/a>' : '-')+'<\/td>\n'
				+'<td style=\"text-align:center\">'+gegner[3]+'<\/td>\n'
				+'<td style=\"color:red; text-align:right\">'+money_format(gegner[0])+'<\/td>\n'
				+'<td width=\"35px\"><\/td>\n'
				+'<td align=\"center\"><a style=\"text-align:center\" href=\"'+link+'/fight/?to='+gegner[2]+'\" class=\"attack\"><\/a><\/td><\/tr>\n';
		}
	}
	table += '<tr><td>&nbsp;<\/td><\/tr><\/table>\n';
	document.getElementById('anzeige').style.fontWeight = 'normal';
	document.getElementById('anzeige').innerHTML = table;
	addlistener();
}

function addlistener(){
	document.getElementById('money').addEventListener('click', function(){
		gegner_liste.sort(money_sort);
		anzeige();
	},false);

	document.getElementById('points').addEventListener('click', function(){
		gegner_liste.sort(points_sort);
		anzeige();
	},false);

	document.getElementById('reg').addEventListener('click', function(){
		gegner_liste.sort(reg_sort);
		anzeige();
	},false);
}

function money_sort(a, b) {
	return a.split(';')[0] - b.split(';')[0];
}

function points_sort(a, b) {
	return a.split(';')[4] - b.split(';')[4];
}

function reg_sort(a, b) {
	a = a.split(';')[3].split('.');
	b = b.split(';')[3].split('.');
	return Date.UTC(a[2], a[1], a[0]) - Date.UTC(b[2], b[1], b[0]);
}

function money_format(cent){
	var money_format = new Array();
	for (var a = cent.length, b = 0; a > 0; a--, b++){
		money_format[b] = cent.substr([a-1], 1);
		if (b == 2) money_format[b] += ',';
		if (b == 5) money_format[b] += '.';
		if (b == 8) money_format[b] += '.';
	}
	if (cent.length == 0) money_format[0] = '-';
	if (cent.length == 1) money_format[0] = '0,0'+money_format[0];
	if (cent.length == 2) money_format[1] = '0,'+money_format[1];
	money_format = money_format.reverse().join('');
	return(money_format);
}

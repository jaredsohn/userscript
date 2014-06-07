// ==UserScript==
// @name           pennergame.de - Bandeneigentum_Upgrades
// @description    verfügbarer Plunder kann eingezahlt werden, Menge kann bestimmt werden
// @include        *pennergame.de/gang/stuff/upgrades/*
// ==/UserScript==

var link = document.URL.split('pennergame')[0]+'pennergame.de';
var plunder_name = new Array('Textilfetzen', 'Rostiger Nagel', 'Marodes Holzbrett', 'Glasscherbe', 'Dir-unbekanntes Artefakt', 'Kaputte Brille');
var plunder_img = new Array('textilfetzen.gif', 'nagel.gif', 'bretter.gif', 'scherbe.gif', 'Tutankhamun.gif', 'kaputte_brille.gif');
var plunder_menge = new Array();
var plunder_verf = new Array();
var plunder_id = new Array();

newdiv = document.createElement('div');
newid = document.createAttribute('id');
newid.nodeValue = 'plunderbank';
newdiv.setAttributeNode(newid);
document.getElementsByClassName('tiername')[0].parentNode.insertBefore(newdiv, document.getElementsByClassName('tiername')[0]);

function auslesen(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/gang/stuff/',
		onload: function(responseDetails){
			var web = responseDetails.responseText;
			var bestand = web.match(/<tr class=\"msglist\" onmouseover=\"\">(\s|.)*?<\/tr>/g);
			for (var i = 0; i < plunder_name.length; i++){
				plunder_menge[i] = '0';
				for (var a = 0; a < bestand.length; a++){
					if (bestand[a].search(plunder_name[i]) != -1){
						plunder_menge[i] = bestand[a].split('font-size:12px;">')[1].split(' <span')[0];
					}
				}
			}
			var verf = web.match(/<option value(\s|.)*?<\/option>/g);
			for (var i = 0; i < plunder_name.length; i++){
				plunder_verf[i] = '0';
				plunder_id[i] = '';
				for (var a = 0; a < verf.length; a++){
					if (verf[a].search(plunder_name[i]) != -1){
						plunder_verf[i] = verf[a].split('[x')[1].split(']')[0];
						plunder_id[i] = verf[a].split('="')[1].split('">')[0];
					}
				}
			}
			anzeige()
		},
	}, false);
}

function anzeige(){
	var table = '<table><tr height=\"22\"><td colspan="2">Bandenkasse - Plunderbank<\/td><\/tr><tr height=\"22\" bgcolor=\"#000000\">\n'
		+'<th width=\"40px\"><\/th>'
		+'<th width=\"220\">Plunder<\/th>'
		+'<th width=\"80\" align=\"center\">Menge<\/th>'
		+'<th width=\"80\" align=\"center\">Verfügbar<\/th>'
		+'<th width=\"100\"><\/th><\/tr>\n';
	for (var i = 0; i < plunder_name.length; i++){
		table += '<tr>\n<td height=\"31\"><img src=\"http://static.pennergame.de/img/pv4/plunder/'+plunder_img[i]+'\" style=\"background-color:#ffffff; border:2px solid #ffffff; -moz-border-radius:3px\"><\/td>\n'
			+'<td style="vertical-align:middle\">'+plunder_name[i]+'<\/td>\n'
			+'<td style="vertical-align:middle; text-align:center\">'+plunder_menge[i]+'<\/td>\n'
			+'<td style="vertical-align:middle; text-align:center\"><input style="text-align:right\" type=\"text\" size=\"1\" maxlength=\"4\" id=\"einzahlen_'+plunder_name[i]+'\"  value=\"'+plunder_verf[i]+'\"><\/td>\n'
			+'<td style="vertical-align:middle; text-align:center\"><input type=\"submit\" id=\"'+plunder_id[i]+'\" value=\"Einzahlen\" disabled=\"disabled\"><\/td>\n<\/tr>\n';
	}
	table += '<\/table><br>\n';
	document.getElementById('plunderbank').innerHTML = table;
	for (i = 0; i < plunder_name.length; i++){
		addListener(plunder_name[i], plunder_id[i], plunder_verf[i])
	}
}

function addListener(name, id, verf){
	if (id != ''){
		document.getElementById(id).disabled = '';
		document.getElementById(id).addEventListener('click', function einzahlen(){
			var einzahlen = document.getElementById('einzahlen_'+name).value;
			if (einzahlen*1 <= verf*1){
				GM_xmlhttpRequest({
					method: 'POST',
					url: link+'/gang/stuff/payin/',
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('pid='+id+'&f_count='+einzahlen+'&button=Einzahlen'),
					onload: function() {
						window.setTimeout("PgFunction.showMsg($('notifyme'), 'Hinweis', 'Du hast erfolgreich in die Plunderbank eingezahlt!', 'ok')", 1000);
						auslesen();
					}
				});
			}
			else {confirm('Es können nur '+verf+' "'+name+'" eingezahlt werden.');}
			auslesen()
		},false);
	}	
}

auslesen()

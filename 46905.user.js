// ==UserScript==
// @name           TBR Map V3
// @namespace      TBR Map V3
// @description    TBR Map voor Tribalwars.nl
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

/**
*
* TBR Map V2 Copyright (C) 2008 Mark Vink (info@markvink.nl)
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
*/

version = '3.1';

function getGameDoc() {

	getdoc = window.document;

	if(!getdoc.URL.match('game\.php')) {

		for(var i=0; i<window.frames.length; i++) {

			if(window.frames[i].document.URL.match('game\.php')) {

				getdoc = window.frames[i].document;
			}
		}
	}

	return getdoc;
};

doc = getGameDoc();
var url = doc.URL;

time = parseInt(new Date().getTime().toString().substring(0, 10));
world = url.match('http://([^"]+).tribalwars.nl')[1];

function update(){
	
	function get_village_id(){

		var logoutLink = doc.getElementsByTagName('a')[0];
		if(!logoutLink) return 0;

		var logoutLinkHref = logoutLink.getAttribute("href");
		var tmp = logoutLinkHref.match( /village=([^&]+)/ );
		return (tmp && tmp[1]) ? tmp[1] : null;
	}

	function get_data(vlg_id){

		if(vlg_id != null) {

			var host = "http://" + world + ".tribalwars.nl/guest.php?screen=info_village&id=" + vlg_id;

			GM_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {
	
				tmp = req.responseText.match( /info_ally&amp;id=([^"]+)/ );
				tribe_id = tmp && tmp[1] ? tmp[1] : 0;

				if(tribe_id != 0) {

					GM_setValue("tribe_id" + world, tribe_id);						
				}

				tmp2 = req.responseText.match( /info_player&amp;id=([^"]+)/ );
				player_id = tmp && tmp2[1] ? tmp2[1] : 0;

				if(player_id != 0) {

					GM_setValue("player_id" + world, player_id);						
				}
			}
			});
		}
	}

	function get_tribe_tag(vlg_id){

		if(vlg_id != null) {

			var host = "http://" + world + ".tribalwars.nl/guest.php?screen=info_ally&id=" + vlg_id;

			GM_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {
	
				tmp = req.responseText.split("<tr><td>Tag:</td><td>")[1].split("</td>")[0];

				if(tmp != null) {

					GM_setValue("tribe_tag" + world, tmp);						
				}
			}
			});
		}
	}

	var village_id = get_village_id();
	if(village_id != null){
		
		get_data(village_id);
	}

	if(GM_getValue("tribe_id" + world)){
		
		get_tribe_tag(GM_getValue("tribe_id" + world));
	}
}

if(url.match('&intro') || !GM_getValue("tribe_id" + world) || GM_getValue("tribe_id" + world) == "none") {

	update();
}

if(!GM_getValue("tribe_id" + world)) {

	GM_setValue("tribe_id" + world, "geen");
}

if(url.match('screen=map')){

	update();

	var form = document.getElementsByTagName("form")[1];
	var iHtml = '<br><table width="100%" height="81" cellspacing="1" cellpadding="0" class="map_container"><tr><td style="background-color:rgb(153, 0, 255)" width="20"></td><td class="small">Leeg</td><td style="background-color:rgb(255, 127, 80)" width="20"></td><td class="small">5-10 def</td></tr><tr><td style="background-color:rgb(255, 255, 255)" width="20"></td><td class="small">0-2 def</td><td style="background-color:rgb(255, 0, 0)" width="20"></td><td class="small">10-20 def</td></tr><tr><td style="background-color:rgb(0, 255, 0)" width="20"></td><td class="small">2-5 def</td><td style="background-color:rgb(0, 0, 0)" width="20"></td><td class="small">20 of meer</td></tr></table>';
	form.innerHTML += iHtml;

	var input = document.getElementsByTagName("input");

	for(i=0; i<input.length; i++){

		if(input[i].getAttribute("name") == "x") {

			var x = input[i].value;
		}

		if(input[i].getAttribute("name") == "y") {

			var y = input[i].value;
		}
	}

	host = 'http://tbrmap.twproject.nl/map.php';
	host += '?tribe=' + GM_getValue("tribe_id" + world);
	host += '&world=' + world;
	host += '&x=' + x + '&y=' + y;
	host += '&v=' + version;
	host += '&t=' + time;

	if(url.match('&debug')) {

		alert(host);
	}

	GM_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {

		if(req.responseText.split("|")[0] == "error") {

			alert(req.responseText.split("|")[1]);
		} else {
			
			eval(req.responseText);

			var map = doc.getElementById("mapCoords");
			var villages = map.getElementsByTagName("td");

			for (i = 0; i < villages.length; i++) {
			

				var link = villages[i].getElementsByTagName("a")[0];

				if (link != null) {

					var tmp = link.getAttribute("onmouseover");

					if (tmp != null) {
					
						tmp = tmp.replace(/map_popup\('(.+)', '(.*)', '(.*)', (\d+), '(.+)\s\((.+)\)', '(.+)\s\((.+) Points\)', (\w+), (\w+), (\w+), (\w+)\)/gi, "$5 $7");

						if (dorp != '') {

							for (a = 0; a < dorp.length; a++) {

								length = (tmp.split(",")[0].split("(").length - 1);

								if (tmp.split(",")[0].split("(")[length].split(")")[0] == dorp[a][0] && tmp.split(",")[5].split("'")[1].split(" (")[0] != GM_getValue("tribe_tag" + world)) {

									var img = villages[i].getElementsByTagName("img")[0];

									if(dorp[a][1] != "none") {
								
										img.style.border = '1px solid ' + dorp[a][1];
										img.style.width = '51px';
										img.style.height = '36px';
									}

									if(dorp[a][3] == 'note'){
							
										villages[i].innerHTML = villages[i].innerHTML.split("</a>")[0] + '</a><div style="position:absolute;z-index:1;text-align:right;width:52px;height:60px"><div style="position:absolute;z-index:1;text-align:right;bottom:0;width:52px;height:38px"><img src="http://tbrmap.twproject.nl/info.png"></div></div>' + villages[i].innerHTML.split("</a>")[1];
									} 
								}
							}
						}	
					}
				}

			}
		}
	}
	});
}

if(url.match('screen=report') && url.match('view=')){

	update();

	th = doc.getElementsByTagName('th');
	for(var i=0; i<th.length; i++) {
	
		if(th[i].innerHTML == "Onderwerp") {

			var onderwerp = th[i];
		}
		if(th[i].innerHTML == "Aanvaller:") {

			var aanvaller = th[(i+1)].innerHTML.match( /info_player&amp;id=([^"]+)/ )[1];
		}
		if(th[i].innerHTML == "Verdediger:") {

			var verdediger = th[(i+1)].innerHTML.match( /info_player&amp;id=([^"]+)/ )[1];
		}
	}

	td = doc.getElementsByTagName('td');
	for(var i=0; i<td.length; i++) {
	
		if(td[i].innerHTML == 'Verzonden') {
	
			var datum = td[(i+1)].innerHTML;
		}
		if(td[i].innerHTML == 'Dorp:') {
	
			var tmp = td[(i+1)].getElementsByTagName("a")[0].innerHTML.split("(")[1].split(")")[0];

			if(tmp != "undefined" && tmp != 0) {
			
				village = tmp;
			}
			var begin = i;

		}
	}

	var table = doc.getElementsByTagName("table");
	var tablea = 0;
	var counta = 0;
	for (a = 0; a < table.length; a++) {

		if(table[a].innerHTML.match("Speervechter") && table[a].innerHTML.match("Aantal:") && table[a].innerHTML.match("Verliezen:")) {
	
			var tablea = a;
			counta++;
		}
	}

	var tr = table[tablea].getElementsByTagName("tr");
	var tda = tr[1].getElementsByTagName("td");
	
	if(tr[2]) {

		var tdv = tr[2].getElementsByTagName("td");
	} else {

		var tdv = tr[1].getElementsByTagName("td");
	}

	var aantal = "";
	for (a = 1; a < tda.length; a++) {
		
		if(tda[a].innerHTML) {
		
			aantal +=  "|" + tda[a].innerHTML;
		}
	}
	if(!aantal || counta < 9) {

		aantal = "none";
	}

	var verliezen = "";
	for (a = 1; a < tdv.length; a++) {

		if(tdv[a].innerHTML) {

			verliezen +=  "|" + tdv[a].innerHTML;
		}
	}
	if(!verliezen || counta < 9) {

		verliezen = "none";
	}	


	host = 'http://tbrmap.twproject.nl/opslaan.php';
	host += '?tribe=' + GM_getValue("tribe_id" + world);
	host += '&world=' + world;
	host += '&datum=' + datum;
	host += '&aanvaller=' + aanvaller;
	host += '&verdediger=' + verdediger;
	host += '&village=' + village;
	host += '&aantal=' + aantal;
	host += '&verliezen=' + verliezen;
	host += '&v=' + version;
	host += '&t=' + time;

	if(url.match('&debug')) {

		alert(host);
	}

	GM_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {

		if(req.responseText.split("|")[0] == "error") {

			alert(req.responseText.split("|")[1]);
		} else {
			
			new_row = doc.createElement('tr');
			new_cell = doc.createElement('td');
			new_cell.setAttribute('colspan', 2);

			new_h2 = doc.createElement('h4');
			new_h2.appendChild(doc.createTextNode(req.responseText));
			new_cell.appendChild(new_h2);
		
			new_row.appendChild(new_cell);
			doc.getElementsByTagName('h2')[0].appendChild(new_row);
		}
	}
	});
}

if(url.match('screen=info_village') && url.match('id=')){

	update();

	h2s = doc.getElementsByTagName('h2');

	for(var i=0; i<h2s.length; i++) {
	
		if(h2s[i].firstChild.nodeValue.match('^(Dorp)')) {

			table = h2s[i].parentNode.getElementsByTagName('table')[0];
			td = table.getElementsByTagName('td');
			c_village = td[1].innerHTML;

			if(!table.innerHTML.match(GM_getValue("tribe_id" + world)) && !c_village.match("undefined")) {

				table.width = '100%';

				host = 'http://tbrmap.twproject.nl/info.php';
				host += '?tribe=' + GM_getValue("tribe_id" + world);
				host += '&world=' + world;
				host += '&village=' + c_village;
				host += '&v=' + version;
				host += '&t=' + time;

				if(url.match('&debug')) {

					alert(host);
				}

				GM_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {

					if(req.responseText.split("|")[0] == "error") {

						alert(req.responseText.split("|")[1]);
					} else {

						new_row = doc.createElement('tr');
						new_cell = doc.createElement('td');
						new_cell.setAttribute('colspan', 2);

						new_br = doc.createElement('br');
						new_cell.appendChild(new_br);

						new_h2 = doc.createElement('h2');
						new_h2.appendChild(doc.createTextNode('TBR Map'));
						new_cell.appendChild(new_h2);

						new_span = doc.createElement('span');
						new_span.innerHTML= req.responseText;
						new_cell.appendChild(new_span);

						new_row.appendChild(new_cell);
						table.getElementsByTagName('tbody')[0].appendChild(new_row);
					}
				}
				});

			} else {

				new_row = doc.createElement('tr');
				new_cell = doc.createElement('td');
				new_cell.setAttribute('colspan', 2);

				new_h2 = doc.createElement('h4');
				new_h2.appendChild(doc.createTextNode('Dit dorpje is al van uw stam :-)'));
				new_cell.appendChild(new_h2);

				new_row.appendChild(new_cell);
				table.getElementsByTagName('tbody')[0].appendChild(new_row);
			}
		}
	}
}
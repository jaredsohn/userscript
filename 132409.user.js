// ==UserScript==
// @name           Stats My Roads
// @namespace      AM
// @description    Récupère l'offre, la demande ainsi que la durée de vol de chacune des lignes ouvertes 
// @include        http://*airlines-manager.com/program_ligne_panel*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require        http://am-tools.niloo.fr/js/parser.js
// @icon           http://jumbojet.airlines-manager.com/favicon.ico
// @version        1.0.1
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
	return;

var version  = '1.0.0',
	//[id, "nom", [demande], [offre], duree]
	listeGlobal = [],
	lI = {},//Liste des index pour la liste global
	popup,
	pop;

//Affiche ou enlève le texte de chargement
function wait() {
	if ($('#wait:visible', pop).length) {
		$('#wait', pop).hide();
	} else {
		$('#wait', pop).show();
	}
}

function openWindow() {
	popup = window.open('','','width=' + screen.width + ',height=' + screen.height + ',scrollbars=yes,menubar=yes');
	pop = popup.document;
	
	pop.write('<html>'
		+ '<head>'
			+ '<link href="favicon.ico" type="image/x-icon" rel="SHORTCUT ICON">'
			+ '<style type="text/css">'
				+ '.click {cursor: pointer;text-decoration: underline;}'
				+ 'table.liste {margin-left:auto;margin-right:auto;width:100%;border-collapse:collapse;}'
				+ 'table.liste, table.liste td, table.liste thead tr td {border:1px solid black;}'
				+ 'table.liste td  {text-align: center;}'
				+ 'table.liste thead tr {background-color: YellowGreen;}'
				+ '.border {border-right: 3px solid black!IMPORTANT;}'
				+ '.r0 {background-color: #ffd6d6;}'
				+ '.r1 {background-color: #ff6666;}'
				+ '.g0 {background-color: #ccffcc;}'
				+ '.g1 {background-color: #b3d580;}'
				+ '.b0 {background-color: #A4C2F4;}'
				+ '.b1 {background-color: #6D9EEB;}'
				+ '.c0 {background-color: #EFEFEF;}'
				+ '.c1 {background-color: #CCCCCC;}'
			+ '</style>'
			+ '<title>Stats My Roads v' + version + '</title>'
		+ '</head>'
		+ '<body>'
		+ '<div id="dialog" style="text-align: center;">'
			+ '<h3>Stats My Roads v' + version + '</h3><br />'
			+ '<span id="wait" style="display:none;color:red;">Veuillez patienter.</span><br />'
			+ '<span id="roadFinded">0</span> lignes trouvées'
			+ '<table border="1" class="liste">'
				+ '<colgroup>'
					+ '<col class="border" />'
					+ '<col />'
					+ '<col class="border" />'
					+ '<col />'
					+ '<col class="border" />'
					+ '<col />'
					+ '<col class="border" />'
					+ '<col />'
				+ '</colgroup>'
				+ '<thead>'
					+ '<tr>'
						+ '<th style="width:150px;" rowspan="2">Nom</th>'
						+ '<th colspan="2">Classe Eco</th>'
						+ '<th colspan="2">Classe Biz</span></th>'
						+ '<th colspan="2">Classe Fir</th>'
						+ '<th rowspan="2" style="width:50px;">Durée</th>'
					+ '</tr>'
					+ '<tr>'
						+ '<th style="width:70px;">Demande</th>'
						+ '<th style="width:70px;">Offre</th>'
						+ '<th style="width:70px;">Demande</th>'
						+ '<th style="width:70px;">Offre</th>'
						+ '<th style="width:70px;">Demande</th>'
						+ '<th style="width:70px;">Offre</th>'
					+ '</tr>'
				+ '</thead>'
				+ '<tbody id="listeBody">'
				+ '</tbody>'
			+ '</table>'
		+ '</div>'
		+ '</body></html>');
		
	wait();
		
	var name;
	if (!listeGlobal.length) {
		$.ajax({
			url: 'http://' + window.location.hostname + '/stat_en_cours.php', 
			type: 'GET',
			async: false,
			success: function(data) {
				var i = 0;
				$('div#lignebenef > table > tbody', data).each(function() {
					var tr = $(this).children('tr:eq(1)'), 
						name = tr.children('td:first').text().replace(/\n/g, ''),
						id = tr.children('td:first').html().match(/spc=(\d*)">/),
						demande = [parseInt( tr.find('td:eq(14) > table > tbody > tr:eq(1) > td').text().replace(/ /g, '') ), parseInt( tr.find('td:eq(26) > table > tbody > tr:eq(1) > td').text().replace(/ /g, '') ), parseInt( tr.find('td:eq(38) > table > tbody > tr:eq(1) > td').text().replace(/ /g, '') )],
						offre = [parseInt( tr.find('td:eq(14) > table > tbody > tr:eq(3) > td').text().replace(/ /g, '') ), parseInt( tr.find('td:eq(26) > table > tbody > tr:eq(3) > td').text().replace(/ /g, '') ), parseInt( tr.find('td:eq(38) > table > tbody > tr:eq(3) > td').text().replace(/ /g, '') )];

					listeGlobal.push([parseInt(id[1]), name, demande, offre, 0]);
					lI[parseInt(id[1])] = i;
					i++;
				});
				$('div#lignennbenef > table > tbody', data).each(function() {
					var tr = $(this).children('tr:eq(1)'), 
						name = tr.children('td:first').text().replace(/\n/g, ''),
						id = tr.children('td:first').html().match(/spc=(\d*)">/);

					listeGlobal.push([parseInt(id[1]), name, [0,0,0], [0,0,0], 0]);
					lI[parseInt(id[1])] = i;
					i++;
				});
			}
		});
		$.ajax({
			url: 'http://' + window.location.hostname + '/stat_globale.php', 
			type: 'GET',
			async: false,
			success: function(data) {
				var i = 0;
				$('div#lignebenef > table > tbody > tr.col_ligne_0', data).each(function() {
					if ( i%2 == 1) {
						i++;
						return true;
					} 
					var td = $(this).children('td:first'), 
						id = parseInt( td.children('table:first').html().match(/spc=(\d*)">/)[1] ),
						dist = parseInt( td.children('table:last').html().match(/Dist\. : (\d*) nm/)[1] );

					listeGlobal[lI[id]][4] = Math.ceil( ( (0.39 + ( dist / 486)) * 2 + 2 ) * 2 ) / 2;
					i++;
				});
				i = 0;
				$('div#lignennbenef > table > tbody > tr.col_ligne_2', data).each(function() {
					if ( i%2 == 1) {
						i++;
						return true;
					} 
					var td = $(this).children('td:first'), 
						id = parseInt( td.children('table:first').html().match(/spc=(\d*)">/)[1] ),
						dist = parseInt( td.children('table:last').html().match(/Dist\. : (\d*) nm/)[1] );
						
					listeGlobal[lI[id]][4] = Math.ceil( ( (0.39 + ( dist / 486)) * 2 + 2 ) * 2 ) / 2;
					i++;
				});
			}
		});
	}

	var html = '', de, color, c = listeGlobal.length;
	$('#roadFinded', pop).text(c);
	for (var i = 0, k = 0; i < c; i++) {
		for (var j = 0, diff = 0, coeff = [1, 1.8, 4.2], color= ['','','']; j < 3; j++) {
			diff = listeGlobal[i][2][j] - listeGlobal[i][3][j];
			color[j] = ( Math.abs(diff) >= (20/coeff[j]) ) ? ( (diff >= 0) ? 'b' : 'r' ) : 'g';
		}
		html += ''
			+ '<tr id="' + listeGlobal[i][0] + '" class="c' + k + '">'
				+ '<td class="open click">' + listeGlobal[i][1] + '</td>'
				+ '<td class="'+ color[0] + k + '">' + listeGlobal[i][2][0] + '</td>'
				+ '<td class="'+ color[0] + k + '">' + listeGlobal[i][3][0] + '</td>'
				+ '<td class="'+ color[1] + k + '">' + listeGlobal[i][2][1] + '</td>'
				+ '<td class="'+ color[1] + k + '">' + listeGlobal[i][3][1] + '</td>'
				+ '<td class="'+ color[2] + k + '">' + listeGlobal[i][2][2] + '</td>'
				+ '<td class="'+ color[2] + k + '">' + listeGlobal[i][3][2] + '</td>'
				+ '<td>' + listeGlobal[i][4] + '</td>'
			+ '</tr>';			
		k = ( k > 0 ) ? 0 : 1;
	}
			
	$('#listeBody', pop).html(html);
	
	$('td.open', pop).click(function () {
		window.open( 'http://' + window.location.hostname + '/tableau_de_bord_ligne.php?spc=' + $(this).parent().attr('id') );
	});
	
	popup.stop();
	popup.focus();
	wait();	
}

$(function() {
	$('div#contenu_cadre table > tbody > tr').after(''
		+ '<tr>'
			+ '<td valign="top">'
				+ '<div id="statsLignes">'
					+ '<a href="#" id="openStats">'
						+ '<img border="0" src="images/gerer_ligne.png"><br />Statistiques des lignes'
					+ '</a>'
				+ '</div>'
			+ '</td>'
		+ '</tr>'
	);
	
	$('#openStats').click(function (e) {
		e.preventDefault();
		openWindow();
	});
});

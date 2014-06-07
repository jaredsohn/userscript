// ==UserScript==
// @name           NeoSimul
// @namespace      AM
// @description    Nouveau simulateur de la demande. Corrige quelques problèmes et ajoute de nouvelles fonctionnalités.
// @include        http://*airlines-manager.com/program_prix.php*
// @icon           http://jumbojet.airlines-manager.com/favicon.ico
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @version        1.1.0
// ==/UserScript==

//Formate un nombre en string avec séparateur de milliers.
function format(c, d) {
	while ((d = c.toString().replace(/(\d)([\d]{3})(\.|\s|\b)/, "$1 $2$3")) && d != c) {
		c = d;
	}
	return d;
}

//Effectue les différentes opérations de manière synchrone
function recursive(obj) {
	if (obj.now != 'stop') {
		obj.next = function() {
			if( (obj.now[0] < obj.max[0]) && (obj.now[1] < obj.max[1]) && (obj.now[2] < obj.max[2]) ){
				obj.now = [obj.now[0] + obj.pas[0], obj.now[1] + obj.pas[1], obj.now[2] + obj.pas[2]];
			} else {
				obj.now = 'stop'
			}
			setTimeout(recursive, 100, obj);
		};

		setTimeout(obj.fn, 100, obj);
	} else {
		if (typeof obj.onfinish === 'function') {
			obj.onfinish();
		}
		return;
	}
}

//Affiche ou enlève le texte de chargement
function wait() {
	if ($('#wait:visible').length) {
		$('#wait').hide();
	} else {
		$('#wait').show();
	}
}

function simulation (eco, biz, fir, pourc) {
	var value = [];
	
	$.ajax({
		type : 'post',
		async: false,
		url : 'http://' + window.location.hostname + '/majsimulateur.php',
		data : 'id_prg=' + $('input[name="id_prg"]').val() + '&typ=&prixecof=' + eco + '&prixbizf=' + biz + '&prixfirf=' + fir + '&dif_saisonf=' + pourc,
		dataType : 'text',
		success : function (response) {
			value = response.split(',');
		}
	});
	
	return value;
}

$(function() {
	GM_log('start');
	
	var inputSimul = $('div#bouton_simu');
	inputSimul.removeAttr('onclick');	
	inputSimul.after('<input type="checkbox" id="noAlert" checked="checked" value="true"/><label for="noAlert">No confirm</label>');
	
	$('#nbsimt:hidden, td.demand:hidden').show();
	$('#hbp').attr('style', 'display: block');
	
	inputSimul.click(function ( e ) {
		if($('#noAlert:checked').val() || confirm('Etes-vous certain de vouloir utiliser le simulateur ? Chaque demande vous sera facturé 80 000$.')) {
			$('#nbsim').text( parseInt($("#nbsim").text()) + 1 );
			$('#prixtot').text( format(parseInt($("#nbsim").text()) * 80000) );
			
			var demande = simulation ($('input[name="eco_A"]').val(), $('input[name="biz_A"]').val(), $('input[name="fir_A"]').val(), $('input[name="pourc_A"]').val());
			$('#ecop').text(demande[0]);
			$('#bizp').text(demande[1]);
			$('#firp').text(demande[2]); 
		}
	});
	
	$('#nbsim').after('<br />'
		+ '<a class="grostitre hideDiv" title="loadTabl" href="#">Etudier la demande de la ligne.</a><br /><br />'
		+ '<div id="loadTabl" style="display:none;">'
			+ '<table cellspacing="0" cellpadding="4" border="0">'
				+ '<thead>'
					+ '<tr>'
						+ '<td bgcolor="#F5F5F5" background="images/degr_sais.jpg" class="cont contl contt" style="text-align:center;font-size:12px;width:240px;">Classe</td>'
						+ '<td bgcolor="#F5F5F5" background="images/degr_sais.jpg" class="cont contl contt" style="text-align:center;font-size:12px;width:240px;">Prix min</td>'
						+ '<td bgcolor="#F5F5F5" background="images/degr_sais.jpg" class="cont contl contt" style="text-align:center;font-size:12px;width:240px;">Prix max</td>'
						+ '<td bgcolor="#F5F5F5" background="images/degr_sais.jpg" class="cont contl contt" style="text-align:center;font-size:12px;width:240px;">Pas</td>'
						+ '<td bgcolor="#F5F5F5" background="images/degr_sais.jpg" class="cont contl contr contt" style="text-align:center;font-size:12px;width:240px;">Simul requises</td>'
					+ '</tr>'
				+ '</thead>'
				+ '<tbody>'
					+ '<tr>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr">ECO</td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="minEco" value="0" size="3"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="maxEco" value="100" size="3"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="pasEco" value="10" size="1"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr" id="simulEco">11</td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr">BIZ</td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="minBiz" value="0" size="3"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="maxBiz" value="100" size="3"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="pasBiz" value="10" size="1"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr" id="simulBiz">11</td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr">FIR</td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="minFir" value="0" size="3"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="maxFir" value="100" size="3"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr"><input type="text" id="pasFir" value="10" size="1"/></td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr" id="simulFir">11</td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr">TOTAL</td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr" colspan="3">Coût : <span id="totalPrice">880 000</span>$</td>'
						+ '<td bgcolor="#F5F5F5" class="cont contl contr" id="simulTot">11</td>'
					+ '</tr>'
				+ '</tbody>'
			+ '</table><br />'
			+ '<input type="button" value="Demarrer simulations" id="startSimul"/><input type="button" value="Vider tableau" id="emptyTable"/><br /><br />'
			+ '<span id="wait" style="display:none;color:red;">Veuillez patienter...</span><br /><br />'
			+ '<table id="tableauSimul" border="1" style="margin-left:auto;margin-right:auto;border:1px solid;width:100%;border-collapse:collapse;">'
				+'<thead>'
					+ '<tr><th colspan="2">Eco</th><th colspan="2">Biz</th><th colspan="2">Fir</th></tr>'
					+ '<tr><th style="width:16.67%;">Prix</th><th style="width:16.67%;">Demande</th><th style="width:16.67%;">Prix</th><th style="width:16.67%;">Demande</th><th style="width:16.67%;">Prix</th><th style="width:16.67%;">Demande</th></tr>'
				+ '</thead>' 
				+ '<tbody id="tableBody">'
				+ '</tbody>'
			+ '</table>'
		+ '</div>'
	);
	
	$('input[id^="min"], input[id^="max"], input[id^="pas"]').keyup(function (e) {
		var classe = e.target.id.slice(-3),
			simul = Math.round( ( parseInt($('#max' + classe).val()) - parseInt($('#min' + classe).val()) ) / parseFloat($('#pas' + classe).val()) ) + 1;
		$('#simul' + classe).text(simul);
		$('#simulTot').text( Math.max( parseInt($('#simulEco').text()), parseInt($('#simulBiz').text()), parseInt($('#simulFir').text()) ) );
		$('#totalPrice').text( format( parseInt($('#simulTot').text()) * 80000 ) );
	});
	
	$('#startSimul').click(function (e) {
		wait();
			
		recursive({
			now : [parseInt($('#minEco').val()),   parseInt($('#minBiz').val()),   parseInt($('#minFir').val())],
			max : [parseInt($('#maxEco').val()),   parseInt($('#maxBiz').val()),   parseInt($('#maxFir').val())],
			pas : [parseFloat($('#pasEco').val()), parseFloat($('#pasBiz').val()), parseFloat($('#pasFir').val())],
			fn : function (obj) {
				var demande = simulation (obj.now[0], obj.now[1], obj.now[2], 0);
				$('#tableBody').append('<tr><td> '+ obj.now[0] + '</td><td>' + demande[0] + '</td><td> '+ obj.now[1] + '</td><td>' + demande[1] + '</td><td> '+ obj.now[2] + '</td><td>' + demande[2] + '</td></tr>');
				obj.next();
			},
			'onfinish' : wait
		});
	});
	
	$('#emptyTable').click( function (e) {
		$('#tableBody').html('');
	});
	
	//Gére l'affichage ou non des blocs des opérations
	$('a.hideDiv').click(function (e) {
		e.preventDefault();
		if ($('#' + e.target.title).css('display') == 'none') {
			$('#' + e.target.title).css('display', 'block');
		} else {
			$('#' + e.target.title).css('display', 'none');
		}
	});
});

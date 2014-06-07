// ==UserScript==
// @name          ETN Ticketing custom script
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @author				Milan K.
// @include				https://ticket.etnetera.cz/*
// @version				2.7
// ==/UserScript==


/*==============================================================================*/
/*
	== Changelog ==
	
	10.8.2011 - Verze 1
	- skript obsahuje funkcionalitu predesleho skriptu s vyuzitim jQuery (krome zakomentovanych casti)
		 
	11.8.2011 - Verze 1.1
	- [BUGFIX] - oprava zobrazeni tiketu poslanych do vyroby
	- [BUGFIX] - oprava zvyrazneni tiketu na zaklade uzivatelova 3-pismenneho ETN id
	- [NEW] - zvyrazneni zalozky 'New' pro danou skupinu zakazniku 
	
	15.8.2011 - Verze 1.2
	- [BUGFIX] - zmena zvyrazneni nekterych udaju -> uprava zobrazeni 'web-enabled' udaju
	- [CHANGE] - cervene zvyraznene texty jsou navic tucne
	- [CHANGE] - subject neprirazenych tiketu se zobrazuje tucne
	- [NEW] - zvyraznovani tiketu preddefinovanych pracovniku 	
	
	19.8.2011 - Verze 2
	- [CHANGE] - zmena spravovani uzivatelskeho nastaveni pres cookies a box nastaveni (kombinace klaves Ctrl + Alt + E + T + N)
	
	22.8.2011 - Verze 2.1
	- [NEW] - pres uzivatelske rozhrani je nyni mozne nastavit ukladani nastaveni zvyrazneni tiketu uzivatelovych pracovniku
	- [NEW] - pridan kript pro mereni delky zpracovani uzivatelskeho skriptu pri a nacteni stranky (viz text v paticce stranky)
	- [NEW] - pridana moznost resetovat uzivatelske nastaveni do defaultnich hodnot
	- [CHANGE] - pridany prisnejsi kriteria pro vyber elementu kvuli zrychleni chodu skriptu
	
	24.8.2011 - Verze 2.2
	- [BUGFIX] - oprava doby trvani cookies na 100 let (snad nebude nekdo ze zamestnancu ET Netera zit dele)
	
	5.9.2011 - Verze 2.3
	- [NEW] - pridana moznost zobrazit primo pouze tikety jednotlivych uzivatelovych pracovniku (viz symbol >> v boxiku pracovnika)
	
	6.9.2011 - Verze 2.4
	- [BUGFIX] - zmena barvy zvyrazneni tiketu pracovniku se v boxu nastaveni neukladala spravne
	- [CHANGE] - zmena prirazovani eventu u nekterych akci z metody 'bind' na 'delegate' by mela zrychlit delku provedeni skriptu
	
	14.11.2011 - Verze 2.5
	- [NEW] - pridan automaticky generovany filtr prispivatelu do stranky detailu ticketu
	
	19.12.2011 - Verze 2.6
	- [NEW] - pridani aditivniho filtru na typy prispevku (filtr internich prispevku)
	
	16.1.2012 - Verze 2.7
	- [BUGFIX] - iniciacni zobazeni filtru prispevku v pripade, ze je jako defaultni nastavena zaloka 'Notes'
	- [CHANGE] - filtr podle typu prispevku je defaultne schovan
	- [NEW] - pridan ovladaci prvek (checkbox + pismeno F) do hlavicky, checkbox prepina zobrazeni moznosti filtrovani podle typu prispevku
*/


/*==============================================================================*/
// Uzivatelske nastaveni - defaultni hodnoty
// jmeno uzivatele
var def_userName = 'JSz';

// definice barev
var col_pink = '#ff8888';
var col_red = '#ff0000';
var col_red_pale = '#ffaeae';
var col_green = '#00ff00';
var col_green_pale = '#d4ffd4';
var col_grey = '#666666';
var col_grey2 = '#eaeaea';
var col_grey3 = '#d9d9d9';
var col_black = '#000000';

// seznam prvnich tri pismen kodu zakaznika uzivatele ve tvaru ['aaa', 'aab', 'aac', 'aad']
var def_userClients = ['O2S', 'ETN'];

// seznam tri-pismennych kodu pracovniku, kterym jsou tikety prirazeny; zapis ve tvaru ['aaa': '#ffffff', 'aab': '#000000', 'aac': col_red]                   
var def_userWorkers = {
	'JSz': col_green_pale,
	'ESa': col_red_pale,
	'JOb': col_grey3
};

// seznam inicialne zvyraznenych tiketu prcovniku
var def_userWorkers_highlight = {
	'JSz': 1,
	'ESa': 0,
	'JOb': 0
}

// inicialni nastaveni zobrazovani typu prispevku
var def_filter_settings = '00';

/*==============================================================================*/
// definice/deklarace globalnich promennych
var keys = [];
var etn_code = '17,18,69,84,78';
// javascript key codes napr. na http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
var usc_opacity = 0.7;
var cookieLifetime = 36000;

var userSettingsContainer = [
	'<style type="text/css">',
		'.center {text-align:center}',
		'#header div.user-info {margin-top:4px}',
		'#header div.user-info input {vertical-align:middle}',
		'#usc-content table a:hover, #usc-content table a:focus {text-decoration:none}',
		'#usc-overlay {position:fixed; top:0; left:0; width:100%; height:100%; z-index:9998; background:rgb(0,0,0)}',
		'#user-settings-container {position:fixed; top:0; left:0; width:100%; height:100%; z-index:9999}',
		'#usc-wrapper {position:absolute; top:50%; left:50%}',
		'#usc-content {position:relative; width:500px; max-height:600px; margin-left:-50%; margin-top:-50%; overflow:auto; background:rgb(200,200,200); border:1px solid rgb(255,255,255); -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px}',
		'* html #usc-content {height:600x}',
		'#usc-content input.active {border:2px solid rgb(250,250,250)}',
		'#usc-content h3 {display:block; padding:16px 8px; margin:0; background:#FFA318; color:rgb(255,255,255); -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px}',
		'#usc-content h3 a, #usc-content h3 a:visited {display:block; position:absolute; top:12px; right:0; width:24px; height:20px; font-size:16px; color:rgb(255,255,255); text-decoration:none}',
		'#usc-content h3 a:hover, #usc-content h3 a:focus {color:rgb(0,0,0)}',
		'#usc-content h4 {padding: 0 8px}',
		'#user-settings-container table {width:100%; padding:8px 8px 16px; background:rgb(220,220,220); border-top:1px solid rgb(255,255,255)}',
		'#user-settings-container td {padding:2px}',
		'#user-settings-container .usc-del {width:10px}',
		'#user-settings-container .usc-col {width:80px}',
		'#user-settings-container .section-line {padding:1px 0 0; background:rgb(255,255,255)}',     
	'</style>',
	'<div id="usc-overlay"><!-- --></div>',
	'<div id="user-settings-container">',
		'<div id="usc-wrapper">',
			'<div id="usc-content">',
				'<h3>Uživatelské nastavení<a id="usc-close" href="#">x</a></h3>',
				'<table id="usc-userName-container">',
					'<tr>',
						'<td>Jméno uživatele</td>',
						'<td class="usc-col"><input id="usc-userName" type="text" value="" maxlength="3" /></td>',
						'<td class="usc-del"><!-- --></td>',
					'</tr>',
				'</table>',
				'<h4>Zvýrazněné tikety zákazníků</h4>',
				'<table id="usc-userClients-container">',
					'<tr class="unremovable">',
						'<td><a id="usc-add-userClients" href="#">Přidat další</a></td>',
						'<td class="usc-del"><!-- --></td>',
					'</tr>',
				'</table>',
				'<h4>Zvýrazněné tikety pracovníků</h4>',
				'<table id="usc-userWorkers-container">',
					'<tr class="unremovable">',
						'<td><a id="usc-add-userWorkers" href="#">Přidat další</a></td>',
						'<td class="usc-col"><!-- --></td>',
						'<td class="usc-del"><!-- --></td>',
					'</tr>',
					'<tr class="unremovable"><td colspan="3"><!-- --></td></tr>',
					'<tr class="unremovable"><td class="section-line" colspan="3"><!-- --></td></tr>',
					'<tr class="unremovable">',
						'<td>Pamatovat si nastavení?</td>',
						'<td colspan="2">',
							'<label for="swt-y"><input id="swt-y" type="radio" name="save-worker-tickets" value="1" />Ano</label>&nbsp;&nbsp;',
							'<label for="swt-n"><input id="swt-n" type="radio" name="save-worker-tickets" value="0" />Ne</label>',
						'</td>',
					'</tr>',					
				'</table>',
				'<table class="center">',
					'<tr>',
						'<td colspan="3"><a id="reset-defaults" href="#">Vrátit výchozí nastavení</a><br /><small>(Provede reload prohlížeče)</small></td>',
					'</tr>',
				'</table>',				
				'<table><tr><td><!-- --></td></tr></table>',
			'</div>',
		'</div>',
	'</div>'
];

// texty/chybove hlasky
var TXT_ERROR_1 = 'Nelze přidávat více polí najednou.';

/*==============================================================================*/
// Hlavni cast - zobrazovani zmen
$(document).ready(function(){
	// start mereni rychlosti skriptu 
	var scriptStart = new Date().getMilliseconds();

	// inicializace boxu uzivatelskeho nastaveni
	$('body').append(userSettingsContainer.join(''));
	$('#usc-overlay').fadeTo(0, usc_opacity);
	$('#usc-overlay, #user-settings-container').hide();
	
	// iniciace cookies, nastaveni promennych
	updateCookies();
	
	// Notes - prevod textu na klikatelne odkazy
	$('#showTicket div.noteText').each(function(){
		var txt_original = $(this).html();
		$(this).html(replaceHTMLlinks($(this).html()));
		$(this).html(replaceBUGlinks($(this).html()));
		$(this).html(replaceTICKETlinks($(this).html()));
	});
	
	// Ticket info - zvyrazneni nevyplnene hodnoty Product
	$('#ticketInfo table.form th').each(function(){
		if ($(this).html() == 'Product:'){
			var productVal = $(this).parent().find('td');			
			if (productVal.html() == ''){
				productVal.css('background', col_pink);
			}
		}
	});
	
	// 'lepsi' citelnost nekterych udaju
	$('td.TITLE, td.HANDLERTAG, td.type, td.REFERENCE, td.assignee').css({'font-family': 'monospace', 'padding-bottom': 0});
	$('#errors h3:contains("Nevyplněné hodiny"), #errors h3:contains("Garanční tickety s vykázanou")').next('table').find('td:nth-child(5n - 2)').css({'font-family': 'monospace', 'padding-bottom': 0});
	$('td.web-enabled-0 a').css({'font-family': 'Verdana,Arial,Sans-serif', 'font-size': '11px'});
	
	// barevne odliseni garancnich a projektovych tiketu
	$('td.type:contains("Gar"), td:contains("Fau")').css({'color': col_red, 'font-weight': 'bold', 'font-family': 'Verdana,Arial,Sans-serif'});
	$('td.type:contains("Pro")').css({'color': col_green, 'font-weight': 'bold', 'font-family': 'Verdana,Arial,Sans-serif'});

	// barevne odliseni tiketu supportaka, ktere nejsou predane dal do vyroby
	$('td.TITLE a').not(':contains("::")').css({'color': col_black, 'font-weight': 'bold', 'font-family': 'Verdana,Arial,Sans-serif'});
	
	// klikatelne tikety ve vyuctovani
	$('td[class=""]').each(function(){
		if ($(this).html().match(/^[A-Za-z2]{2,3}\d{5,6}$/)){
			$(this).html('<a target="_blank" href="/support/showTicket/' + $(this).html() + '">' + $(this).html() + '</a>');
		}
	});

  // na zaklade uzivatelova 3-pismenneho ETN id zvyraznuje v urcitych prehledech prislusne tikety
	$('td.HANDLERTAG, td.assignee').css('color', col_black);
  $('td.HANDLERTAG:contains("' + userName + '"), td.assignee:contains("' + userName + '")').css({'color': col_red, 'font-weight': 'bold', 'font-family': 'Verdana,Arial,Sans-serif'});
  $('#errors h3:contains("Nevyplněné hodiny"), #errors h3:contains("Garanční tickety s vykázanou")').next('table').find('td:contains("' + userName + '")').css({'color': col_red, 'font-weight': 'bold', 'font-family': 'Verdana,Arial,Sans-serif'});
  
  // zvyrazneni zalozky New pokud obsahuje tikety od preddefinovanych uzivatelu (z promenne userClients)
	$('#listTickets dl.callsList dd:eq(1) td.REFERENCE a').each(function(){
		var clientCode = $(this).html();		
		if ($.inArray(clientCode.substring(0,3), userClients) > -1){
			$('#listTickets dl.callsList dt:contains("New")').css({'color': col_red, 'font-weight': 'bold'});
		}
	});
	
	// zobrazeni nabidky zvyrazneni tiketu urcitych uzivatelu (z promenne userWorkers) a jejich pripadne zvyrazneni
	if (userWorkers){
		var workerSel = '';

		for (var w in userWorkers){ 
			workerSel = workerSel + '<div class="sel-wor-label"><label for="sel-wor-' + w + '"><input id="sel-wor-' + w + '" type="checkbox">' + w + '</label><br /><a href="https://ticket.etnetera.cz/support/listTickets?TAG=' + w + '">&gt;&gt;</a></div>';			
		}
		
		var workerComplete = '<h3>Zvýraznění tiketů podle pracovníka</h3><div id="worker-selection">' + workerSel + '</div>';
		$('#listTickets #PAGE > div:eq(0)').after(workerComplete);
		$('#worker-selection').css('margin-bottom', '1.2em');
		$('#worker-selection .sel-wor-label').css({'display': 'inline-block', 'width': '30px', 'padding': '4px', 'margin': '2px', 'border': '1px solid rgb(150,150,150)', 'text-align': 'center', '-webkit-border-top-left-radius': '5px', '-moz-border-radius-topleft': '5px', 'border-top-left-radius': '5px'});
		$('#worker-selection .sel-wor-label a').css({'font-weight': 'normal', 'text-decoration': 'none'});

		for (var w in userWorkers){
			$('#sel-wor-' + w).closest('div').css('background-color', userWorkers[w]);	
			if (userHighlightedWorkers[w] == 1){
				$('#sel-wor-' + w).attr('checked', 'checked');
				highlightWorkerTickets(w, 1);
			}		
		}

    // funkcionalita zvyrazneni tiketu urcitych uzivatelu (z promenne userWorkers)
		$('#worker-selection').delegate('.sel-wor-label input', 'change', function(){
			var id = $(this).attr('id');
			var wor = id.substring(8);
			if ($(this).is(':checked')){var state = 1;} else {var state = 0;}
			highlightWorkerTickets(wor, state);											
		});		
	}

	// zobrazeni boxu uzivatelskeho nastaveni (Ctrl + Alt + E + T + N)
	$(document).bind('keydown', function(e){
		keys.push(e.keyCode);
		if (keys.toString().indexOf(etn_code) >= 0){
			keys = [];		
			showUSC();			
		}
	});
	
	// zavreni boxu uzivatelskeho nastaveni
	$('#usc-close').click(function(){closeUSC();});
	
	$(document).bind('keydown', function(e){
		if (e.keyCode == '27'){closeUSC();}
	});
	
	// mazani udaju z boxu uzivatelskeho nastaveni
	$('#usc-content').delegate('.usc-del a', 'click', function(){
		switch ($(this).parent().parent().parent().parent().attr('id')){
			case 'usc-userClients-container':
				var uc_id = userClients.indexOf($(this).parent().prev().html()); 
				if (uc_id != -1){
					userClients.splice(uc_id, 1);
					setCookie('etn_ticketing_userClients', userClients.join('^'), cookieLifetime);
				}				
				break;
				
			case 'usc-userWorkers-container':
				var uw = $(this).parent().prev().prev().html();
				if (userWorkers[uw]){
					delete userWorkers[uw];
					delete userHighlightedWorkers[uw];
					setCookie('etn_ticketing_userWorkers', userWorkers.toSource(), cookieLifetime);
					setCookie('etn_ticketing_userWorkers_highlight', userHighlightedWorkers.toSource(), cookieLifetime);
				}
				break;
		}
		$(this).parent().parent().remove();
		return false;
	});
	
	// pridavani udaju do boxu uzivatelskeho nastaveni
	$('#usc-add-userClients').live('click', function(){
		if (!document.getElementById('usc-client-new')){
			$(this).parent().parent().before('<tr><td><input id="usc-client-new" type="text" value="???" maxlength="3" /></td><td class="usc-add-client"><a href="#">OK</a></td></tr>');
		}
		else {
			alert(TXT_ERROR_1);		
		}
	});	
	
	$('#usc-add-userWorkers').live('click', function(){
		if (!document.getElementById('usc-worker-new')){
			$(this).parent().parent().before('<tr><td><input id="usc-worker-new" type="text" value="???" maxlength="3" /></td><td class="usc-col"><input id="usc-workerCol-new" type="text" value="#?????" /></td><td class="usc-add-worker"><a href="#">OK</a></td></tr>');
		}
		else {
			alert(TXT_ERROR_1);		
		}
	});
	
	// potvrzeni pridani udaju do boxu uzivatelskeho nastaveni  
	$('#usc-content').delegate('.usc-add-client a', 'click', function(){
		var td = $(this).parent().prev();
		td.html($('#usc-client-new').val());
		$(this).html('x');
		$(this).parent().removeClass('usc-add-client').addClass('usc-del');
		userClients.push(td.html());
		setCookie('etn_ticketing_userClients', userClients.join('^'), cookieLifetime);
		return false;
	}); 

 	$('#usc-content').delegate('.usc-add-worker a', 'click', function(){
		var td_col = $(this).parent().prev();
		var td_name = $(this).parent().prev().prev();
		td_name.html($('#usc-worker-new').val());
		td_col.find('input').css('background', $('#usc-workerCol-new').val());
		$(this).html('x');
		$(this).parent().removeClass('usc-add-worker').addClass('usc-del');
		userWorkers[td_name.html()] = td_col.find('input').val(); 
		userHighlightedWorkers[td_name.html()] = 0;
		setCookie('etn_ticketing_userWorkers', userWorkers.toSource(), cookieLifetime);
		setCookie('etn_ticketing_userWorkers_highlight', userHighlightedWorkers.toSource(), cookieLifetime);
		return false;
	}); 
	
	// potvrzeni updatu userName
	$('#usc-userName').live('blur', function(){
		userName = $(this).val();
		setCookie('etn_ticketing_userName', userName, cookieLifetime);
	});

	// update barvy zvyrazneni pracovniku 
	$('#usc-content').delegate('.usc-col input', 'blur', function(){
		$(this).css('background', $(this).val());	
		if (!document.getElementById('usc-worker-new')){
			userWorkers[$(this).parent().prev().html()] = $(this).val(); 
			setCookie('etn_ticketing_userWorkers', userWorkers.toSource(), cookieLifetime);
		}	
	});
	
	// efekty pri zadavani jmena noveho pracovnika/zakaznika
	$('#usc-client-new, #usc-worker-new').live('focus', function(){if ($(this).val() == '???'){$(this).val('');}});
	$('#usc-client-new, #usc-worker-new').live('blur', function(){if ($(this).val() == ''){$(this).val('???');}});
	
	// efekty inputu v USC
	$('#usc-content').delegate('input', 'focus blur', function(){
		$(this).toggleClass('active');
	});
	
	// ukladani nastaveni zvyraznenych tiketu pracovniku
	$('#swt-y, #swt-n').bind('change', function(){
		if ($(this).attr('id') == 'swt-y'){
			userHighlightedWorkers_save = 1;
			var usrwh = {};
			$('#worker-selection input').each(function(){
				var wor_name = $(this).attr('id');
				if ($(this).attr('checked')){var wor_highlight = 1;} else {var wor_highlight = 0;}
				wor_name = wor_name.substring(8, wor_name.length);
				usrwh[wor_name] = wor_highlight; 
			});
			setCookie('etn_ticketing_userHighlightedWorkers_save', userHighlightedWorkers_save, cookieLifetime);
			setCookie('etn_ticketing_userWorkers_highlight', usrwh.toSource(), cookieLifetime);
		}
		else {
			userHighlightedWorkers_save = 0;
			var dummy = {};
			setCookie('etn_ticketing_userHighlightedWorkers_save', userHighlightedWorkers_save, cookieLifetime);
			setCookie('etn_ticketing_userWorkers_highlight', dummy.toSource(), cookieLifetime);
		}
	});
	
	// vratit vychozi hodnoty nataveni uzivatelskeho skriptu
	$('#reset-defaults').bind('click', function(){
		// smazani cookies a reload prohlizece
		deleteCookie('etn_ticketing_userName');
		deleteCookie('etn_ticketing_userClients');
		deleteCookie('etn_ticketing_userWorkers');
		deleteCookie('etn_ticketing_userWorkers_highlight');
		deleteCookie('etn_ticketing_userHighlightedWorkers_save');
		window.location.reload();
	});

	// filtr prispivatelu
	var contributors = {};
	var con_nr = 0;

	// rozdeleni CSS class a vytvoreni contributors objektu	
	$('#showTicket dl.tabs dd:eq(2) .noteHead').each(function(){
		var con_inn = $(this).html();
		var con_inn_on = con_inn.split(' on <strong>');
		var con_inn_img = con_inn_on[0].split('"> ');
		var con_name = con_inn_img[1];
			
		if (!contributors[con_name]){
			con_nr = con_nr + 1;
			contributors[con_name] = 'con' + con_nr;
			$(this).parent().addClass('con' + con_nr);
		} else {$(this).parent().addClass(contributors[con_name]);}		
	});
	        
	// zobrazeni nabidky s filtrem prispivatelu
	$('#showTicket').delegate('dl.tabs dt:eq(2)', 'click', function(){
		if (!document.getElementById('contributor-selection')){
			$('#showTicket dl.tabs').parent().prepend('<div id="contributor-selection"><h3>Filtr příspěvků</h3><div id="post-types" class="hidden"><a id="all-post-type" class="contributors-item" href="#">Všechny typy příspěvků</a><a id="internal-post-type" class="contributors-item" href="#">Bez interních příspěvků</a><a id="non-internal-post-type" class="contributors-item" href="#">Pouze interní příspěvky</a><label for="save-filter-settings"><input id="save-filter-settings" type="checkbox" />Pamatovat nastavení</label></div><div id="contributors"></div></div>');
			$('#contributors').append('<a id="all-posts" class="contributors-item active" href="#">Všechny příspěvky</a>');

			for (var contrib in contributors){
				$('#contributors').append('<a id="' + contributors[contrib] + '" class="contributors-item" href="#">' + contrib + '</a>');
			}
						
			$('#post-types a:eq(' + parseInt(filter_settings.charAt(0)) + ')').addClass('active');

			if (filter_settings.charAt(1) == '1'){
				$('#save-filter-settings').attr('checked', 'checked');
				if (filter_settings.charAt(0) == '1'){$('#notesList div.internal').hide();}
				if (filter_settings.charAt(0) == '2'){$('#notesList div.note:not(.internal)').hide();}
			}

			$('#contributors, #post-types').css({'margin-bottom': '1.2em'});
			$('#contributors a.contributors-item, #post-types a.contributors-item').css({'display': 'inline-block', 'padding': '4px 8px', 'margin': '2px', 'border': '1px solid #969696', 'background': 'rgb(220,220,220)', 'border-top-left-radius': '5px', 'text-decoration': 'none', 'font-weight': 'normal'});
			$('#contributors #all-posts, #post-types a.active').css({'border-color': 'transparent', 'background': 'transparent none', 'font-weight': 'bold'});
			$('#save-filter-settings').parent().css({'margin-left': '15px'});
			$('#save-filter-settings').css({'vertical-align': 'middle', 'margin': '0 5px'});			
		} else {$('#contributor-selection').show();}
		$('#post-types').hide();
	});   
	
	// zobrazeni nastroje pro filtrovani prispevku
	$('#header div.user-info').append('&nbsp;&#124;&nbsp;<label for="show-filter">F<input id="show-filter" type="checkbox" /></label>')
	
	// iniciacni zobrazeni nabidky s filtrem prispivatelu
	if ($('#showTicket dl.tabs dt.notes').hasClass('active')){
		$('#showTicket dl.tabs dt:eq(2)').trigger('click');
	}	
	
	// zobrazeni / skryti nabidky s filtrem prispivatelu
	$('#header').delegate('#show-filter', 'click', function(){
		var filter_target = $('#post-types');
		if (filter_target.hasClass('hidden')){
			filter_target.show('300').removeAttr('class').addClass('visible');
		} else {filter_target.hide('300').removeAttr('class').addClass('hidden');}
	});
	
	// skryti nabidky s filtrem prispivatelu (zmena zalozky)
	$('#showTicket').delegate('dl.tabs dt:not(:eq(2))', 'click', function(){
		$('#contributor-selection').hide();		
	});

	// CSS pri hoveru
	$('#contributors a.contributors-item, #post-types a.contributors-item').live('mouseenter', function(){
		if (!$(this).hasClass('active')){
			$(this).css({'border': '1px solid rgb(0,0,0)', 'background': 'rgb(250,250,250)'});
		}
	});
	
	$('#contributors a.contributors-item, #post-types a.contributors-item').live('mouseleave', function(){
		if (!$(this).hasClass('active')){
			$(this).css({'border': '1px solid #969696', 'background': 'rgb(220,220,220)'});
		}
	});
	
	// filtrovani prispevku
	// filtr podle prispivatele
	$('#contributors a.contributors-item').live('click', function(e){
		$('#contributors a.contributors-item').removeClass('active').css({'border': '1px solid #969696', 'background': 'rgb(220,220,220) none', 'font-weight': 'normal'});
		$(this).addClass('active').css({'border-color': 'transparent', 'background': 'transparent none', 'font-weight': 'bold'});	
		
		var con_hideclass = $(this).attr('id');
		$('#notesList > div').show();
		
		if (con_hideclass != 'all-posts'){$('#notesList > div:not(.' + con_hideclass + ')').hide();}

		if (filter_settings.charAt(0) == '1'){$('#notesList div.internal').hide();}
		if (filter_settings.charAt(0) == '2'){$('#notesList div.note:not(.internal)').hide();}

		e.preventDefault();		
	});	
	
	// filtr podle typu prispevku
	$('#post-types a.contributors-item').live('click', function(e){
		$('#post-types a.contributors-item').removeClass('active').css({'border': '1px solid #969696', 'background': 'rgb(220,220,220) none', 'font-weight': 'normal'});
		$(this).addClass('active').css({'border-color': 'transparent', 'background': 'transparent none', 'font-weight': 'bold'});	
    e.preventDefault();
  });

	$('#internal-post-type').live('click', function(){	
		var cur_contributor = $('#contributors .active').attr('id');
		
		if (cur_contributor == 'all-posts'){
			$('#notesList div.note').show();
			$('#notesList div.internal').hide();
		} else {
			$('#notesList div.note.' + cur_contributor).show();
			$('#notesList div.internal.' + cur_contributor).hide();			
		}
		
		if ($('#save-filter-settings').is(':checked')){
			filter_settings = '11';
			setCookie('etn_ticketing_postFilter', filter_settings, cookieLifetime);
		} else {filter_settings = '10';}
	});		
	
	$('#non-internal-post-type').live('click', function(){
		var cur_contributor = $('#contributors .active').attr('id');
		
		if (cur_contributor == 'all-posts'){
			$('#notesList div.note').show();
			$('#notesList div.note:not(.internal)').hide();
		} else {
			$('#notesList div.note.' + cur_contributor).show();
			$('#notesList div.note.' + cur_contributor + ':not(.internal)').hide();			
		}
		
		if ($('#save-filter-settings').is(':checked')){
			filter_settings = '21';
			setCookie('etn_ticketing_postFilter', filter_settings, cookieLifetime);
		} else {filter_settings = '20';}
	});	
	
	$('#all-post-type').live('click', function(){
		var cur_contributor = $('#contributors .active').attr('id');
		
		if (cur_contributor == 'all-posts'){
			$('#notesList div.note').show();
		} else {
			$('#notesList div.note.' + cur_contributor).show();			
		}

		if ($('#save-filter-settings').is(':checked')){filter_settings = '01';} else {filter_settings = '00';}
		setCookie('etn_ticketing_postFilter', filter_settings, cookieLifetime);
	});
	
	$('#save-filter-settings').live('click', function(){
		if ($(this).is(':checked')){filter_settings = filter_settings.charAt(0) + '1';} else {filter_settings = filter_settings.charAt(0) + '0';}
		setCookie('etn_ticketing_postFilter', filter_settings, cookieLifetime);
	});	

  // konec a vyhodnoceni mereni rychlosti skriptu
	var scriptStop = new Date().getMilliseconds();
	var scriptDiff = scriptStop - scriptStart;
	var page_footer = document.getElementById('footer');
	page_footer.innerHTML = page_footer.innerHTML + '<hr style="border:none; border-top:1px solid rgb(235,235,235)" /><div style="font-size:0.75em; text-align:center; color:rgb(150,150,150)"><p>Info: Uživatelský skript nahrán za ' + scriptDiff + 'ms.</p></div>';
});

/*==============================================================================*/
// FUNKCE
// konverze textovych URL na klikatelne odkazy
function replaceHTMLlinks(text){
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(exp, "<a target='_blank' href='$1'>$1</a>"); 
}

// konverze textovych bugu na klikatelne odkazy do Bugzilly
function replaceBUGlinks(text){
	var exp = /([^\w]+)(BUG[u# ]{0,3})(\d{1,6})([^\w]+)/ig;
	return text.replace(exp, "$1<a href='http://bugzilla.etnetera.cz/show_bug.cgi?id=$3'>$2$3</a>$4"); 
}

// konverze textovych tiketu na klikatelne odkazy
function replaceTICKETlinks(text){
	var exp = /([^\w\/>]+)(TICKET#)?([A-Z]{2,3}\d{5,6})([^\w]+)/ig;
	return text.replace(exp, "$1<a target='_blank' href='https://ticket.etnetera.cz/support/showTicket/$3'>#$3</a>$4");
}

// zvyrazneni tiketu pracovnika (podle preddefinovane promenne userWorkers)
function highlightWorkerTickets(worker, state){
	if (state == 1){
		userHighlightedWorkers[worker] = 1;
		$('td.TITLE:contains("' + worker + ' ::")').parent().css('background-color', userWorkers[worker]);
	}
	else {
		userHighlightedWorkers[worker] = 0;
	  $('td.TITLE:contains("' + worker + ' ::")').parent().css('background-color', 'transparent');
	}	

	if (userHighlightedWorkers_save == 1){
		setCookie('etn_ticketing_userWorkers_highlight', userHighlightedWorkers.toSource(), cookieLifetime);
	}
}

// zobrazeni a schovani boxu s uzivatelskym nastavenim
function showUSC(){
	$('#usc-overlay, #user-settings-container').show();
	updateUSCcontainer();	
}

function closeUSC(){
	$('#usc-overlay, #user-settings-container').hide();
	return false;
}

// prace s cookies
function setCookie(name, value, days){
	if (days){
  	var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = '; expires=' + date.toGMTString();
  }
  else {
  	var expires = '; expires=36000';
	}
  document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name){
	var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++){
  	var c = ca[i];
    while (c.charAt(0)==' '){
			c = c.substring(1,c.length)
		};
    if (c.indexOf(nameEQ) == 0){
			return c.substring(nameEQ.length, c.length);
		}
  }
	return null;
}

function deleteCookie(name){
	setCookie(name, '', -1);
}

// update cookies
function updateCookies(){
	// update userName
	if (getCookie('etn_ticketing_userName')){
		var usrn = getCookie('etn_ticketing_userName');
		userName = usrn; 
	}
	else {
		setCookie('etn_ticketing_userName', def_userName, cookieLifetime);
		userName = def_userName; 
	}
	
	// update userClients
	if (getCookie('etn_ticketing_userClients')){
		var usrc = getCookie('etn_ticketing_userClients');
		userClients = usrc.split('^'); 
	}
	else {
		var usrc = def_userClients.join('^');
		setCookie('etn_ticketing_userClients', usrc, cookieLifetime);
		userClients = def_userClients; 
	}	
	
	// update userWorkers
	if (getCookie('etn_ticketing_userWorkers')){
		var usrw = getCookie('etn_ticketing_userWorkers');
		userWorkers = eval(usrw); 
	}
	else {
		var usrw = def_userWorkers.toSource();
		setCookie('etn_ticketing_userWorkers', usrw, cookieLifetime);
		userWorkers = def_userWorkers; 
	}
	
	if (getCookie('etn_ticketing_userHighlightedWorkers_save')){
		userHighlightedWorkers_save = getCookie('etn_ticketing_userHighlightedWorkers_save');
	}
	else {
		userHighlightedWorkers_save = -1;
	}
	
	// update zvyraznenych tiketu uzivatelskych pracovniku
	if (getCookie('etn_ticketing_userWorkers_highlight')){
		var usrwh = getCookie('etn_ticketing_userWorkers_highlight');
		userHighlightedWorkers = eval(usrwh); 
	}
	else {
		var usrwh = def_userWorkers_highlight.toSource();
		setCookie('etn_ticketing_userWorkers_highlight', usrwh, cookieLifetime);
		userHighlightedWorkers = def_userWorkers_highlight; 
	}
	
	// update nastaveni filtru prispevku
	if (getCookie('etn_ticketing_postFilter')){
		filter_settings = getCookie('etn_ticketing_postFilter');
		if (filter_settings.charAt(1) == '0'){filter_settings = def_filter_settings;} 
	} else {
		setCookie('etn_ticketing_postFilter', def_filter_settings, cookieLifetime);
		filter_settings = def_filter_settings;
	} 
}

// update boxu s uzivatelskym nastavenim
function updateUSCcontainer(){
	// update userName
	$('#usc-userName').val(userName);		
	
	// update userClients
	$('#usc-userClients-container tr:not(".unremovable")').remove();
	for (var x = 0; x < userClients.length; x++){
		$('#usc-userClients-container').prepend('<tr><td>' + userClients[x] + '</td><td class="usc-del"><a href="#">x</a></td></tr>');	
	}
	
	// update userWorkers
	$('#usc-userWorkers-container tr:not(".unremovable")').remove();
	for (var x in userWorkers){
		$('#usc-userWorkers-container').prepend('<tr><td>' + x + '</td><td class="usc-col"><input id="usc-userName-' + x + '" type="text" style="background-color:' + userWorkers[x] + '" value="' + userWorkers[x] + '" /></td><td class="usc-del"><a href="#">x</a></td></tr>');
	}	
	
	// update ukladani userWorkers
	if (userHighlightedWorkers_save != -1){
		if (userHighlightedWorkers_save == 1){$('#swt-y').attr('checked', 'checked');}
		else {$('#swt-n').attr('checked', 'checked');}		
	}	
}
     
/*==============================================================================*/
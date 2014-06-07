// ==UserScript==
// @name TW Pro
// @description The west PRO en castellano mod Sandevil  
// @author Sandevil
// @namespace http://www.tw-pro.de/
// @include http://*.the-west.*/game.php*
// @include http://*.the-west.*/forum.php*
// ==/UserScript==

   
//javascript:TWPro.twpro_debug=true;end();




(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

var twpro_lang = {
	info: ['Sandevil', 'mailto:sandevil@gmail.com', 1273227, '.10.'],
	WEBSITE: 'Website',
	AUTHOR: 'Author',
	TRANSLATOR: 'Translator',
	TWPRO_DISABLED: 'script disabled',
	SORTBYNAME: 'Order by <b>name</b>',
	SORTBYXP: 'Order by <b>experience</b>',
	SORTBYWAGES: 'Order by <b>wages</b>',
	SORTBYLUCK: 'Order by <b>luck</b>',
	SORTBYCOMB: 'Order by <b>job rank</b>',
	SORTBYDANGER: 'Order by <b>danger</b>',
	SORTBYLABORP: 'Order by <b>labor points</b>',
	FILTERJOBS: 'Hide jobs I can\'t do',
	FILTERCLOTHING: 'Just display the best clothing available for the selected job',
	CHOOSEJOB: 'Choose job...',
	CALCJOB: 'Calculating values, please wait...',
	INVENTSTATS: 'Inventory statistics',
	SELLVALUE: 'Sales value',
	EQUIPMENT: 'Equipment',
	BAG: 'Bag',
	OBJECTS: 'Objects',
	PRODUCTS: 'Products',
	TOTAL: 'Total',
	QUANTITIES: 'Quantities',
	HATS: 'Hats',
	NECKLACES: 'Necklaces',
	WEAPONS: 'Weapons',
	CLOTHING: 'Clothing',
	SHOES: 'Shoes',
	ANIMAL: 'Riding animals',
	NONYIELDS: 'Non-yields',
	YIELDS: 'Yields',
	LOADING: 'Loading...',
	LABORP: 'LP',
	CONSTRUCTION: 'Construction',
	HPTOTAL: 'Total health points',
	STARTCALC: 'Calculate data...',
	CONVERT: 'Convert',
	MULTISEL: 'Sell multiple items...',
	SELL: 'Sell selection',
	CONFIRMSELL: 'Do you really want to sell %1 stacks of items?',
	SELLING: 'Selling...',
	SALEDONE: 'The selected items have been sold.',
	NONESELECTED: 'You have to select at least one item!',
	JOBRANKSETTINGS: 'Job ranking settings',
	SEARCHINVENTORY: 'Search inventory',
	NOSEARCHRESULT: 'Your search for %1 returned no results.%2Display all items%3',
	SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',
	APPLY: 'Apply',
	HEALTH: 'Maximum Life points',
	DUELSHOOTINGATT: 'Range dueler (attacker)',
	DUELSHOOTINGDEF: 'Range dueler (defender)',
	DUELVIGOR: 'Melee dueler',
	FORTATTACK: 'Fortbattle (attacker)',
	FORTDEFEND: 'Fortbattle (defender)',
	SKILLRIDE: 'Riding'
};
var twpro_langs = {};
twpro_langs.de = {
	WEBSITE: 'Webseite',
	AUTHOR: 'Autor',
	TRANSLATOR: '\xFCbersetzer',
	TWPRO_DISABLED: 'global deaktiviert',
	SORTBYNAME: 'Nach <b>Namen</b> sortieren',
	SORTBYXP: 'Nach <b>Erfahrung</b> sortieren',
	SORTBYWAGES: 'Nach <b>Lohn</b> sortieren',
	SORTBYLUCK: 'Nach <b>Gl\xFCck</b> sortieren',
	SORTBYCOMB: 'Nach <b>Vorzuge</b> sortieren',
	SORTBYDANGER: 'Nach <b>Gefahr</b> sortieren',
	SORTBYLABORP: 'Nach <b>Arbeitspunkte</b> sortieren',
	FILTERJOBS: 'Blende die Arbeiten, die du nicht machen kannst, aus',
	FILTERCLOTHING: 'Just display the best clothing available for the selected job',/* need translation! */
	CHOOSEJOB: 'Arbeit ausw\xE4hlen...',
	CALCJOB: 'Bitte warten, berechne Werte...',
	INVENTSTATS: 'Inventar-Statistik',
	SELLVALUE: 'Verkaufswerte',
	EQUIPMENT: 'Angelegte Sachen',
	BAG: 'Gep\xE4ck',
	OBJECTS: 'Gegenst\xE4nde',
	PRODUCTS: 'Produkte',
	TOTAL: 'Gesamtwert',
	QUANTITIES: 'St\xFCckzahlen',
	HATS: 'Kopfbedeckungen',
	NECKLACES: 'Halsb\xE4nder',
	WEAPONS: 'Duellwaffen',
	CLOTHING: 'Bekleidungen',
	SHOES: 'Schuhe',
	ANIMAL: 'Reittiere',
	NONYIELDS: 'Nicht-Produkte',
	YIELDS: 'Produkte',
	LOADING: 'Laden...',
	LABORP: 'AP',
	CONSTRUCTION: 'Stadtausbau',
	HPTOTAL: 'Trefferpunkte gesamt',
	STARTCALC: 'Daten berechnen...',
	CONVERT: 'Konvertieren',
	MULTISEL: 'Sell multiple items...',/* need translation! */
	SELL: 'Ausgew\xE4hlte verkaufen',
	CONFIRMSELL: 'Do you really want to sell %1 stacks of items?',/* need translation! */
	SELLING: 'Verkauft...',
	SALEDONE: 'Ausgew\xE4hlte gegenst\xE4nde sind verkauft worden.',
	NONESELECTED: 'You have to select at least one item!',/* need translation! */
	JOBRANKSETTINGS: 'Vorzugarbeite Einstellungen',
	SEARCHINVENTORY: 'Suche Inventar',
	NOSEARCHRESULT: 'Your search for %1 returned no results.%2Display all items%3',
	SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',
	APPLY: 'Apply',
	HEALTH: 'Maximum Lebenspunkte',
	DUELSHOOTINGATT: 'Schie\xdfduellant (Angreifer)',
	DUELSHOOTINGDEF: 'Schie\xdfduellant (Verteidiger)',
	DUELVIGOR: 'Schlagkraftduellant',
	FORTATTACK: 'Fortkampf (Angreifer)',
	FORTDEFEND: 'Fortkampf (Verteidiger)',
	SKILLRIDE: 'Reiten'
};
twpro_langs.es = {
	WEBSITE: 'Sitio web',
	AUTHOR: 'Autor',
	TRANSLATOR: 'Traduccion',
	TWPRO_DISABLED: 'script deshabilitado',
	SORTBYNAME: 'Ordenar por<b>nombre</b>',
	SORTBYXP: 'Ordenar por <b>experiencia</b>',
	SORTBYWAGES: 'Ordenar por <b>salario</b>',
	SORTBYLUCK: 'Ordenar por <b>suerte</b>',
	SORTBYCOMB: 'Ordenar por <b>rango de trabajo</b>',
	SORTBYDANGER: 'Ordenar por <b>peligro</b>',
	SORTBYLABORP: 'Ordenar por <b>puntos de trabajo</b>',
	FILTERJOBS: 'Esconder trabajos que no puedo hacer',
	FILTERCLOTHING: 'Solo mostrar la mejor ropa para el trabajo seleccionado',
	CHOOSEJOB: 'Elegir trabajo',
	CALCJOB: 'Calculando valores, por favor espere',
	INVENTSTATS: 'Estadisticas de Inventario',
	SELLVALUE: 'Valor de ventas',
	EQUIPMENT: 'Equipado',
	BAG: 'Mochila',
	OBJECTS: 'Objetos',
	PRODUCTS: 'Productos',
	TOTAL: 'Total',
	QUANTITIES: 'Cantidades',
	HATS: 'Sombreros',
	NECKLACES: 'Collares',
	WEAPONS: 'Armas',
	CLOTHING: 'Ropa',
	SHOES: 'Zapatos',
	ANIMAL: 'Animales de monta',
	NONYIELDS: 'Otros',
	YIELDS: 'Productos',
	LOADING: 'Cargando...',
	LABORP: 'PT',
	CONSTRUCTION: 'Construccion',
	HPTOTAL: 'Puntos totales de salud',
	STARTCALC: 'Calcular datos',
	CONVERT: 'Convertir',
	MULTISEL: 'Vender varios objetos..',
	SELL: 'Seleccion de venta',
	CONFIRMSELL: 'Realmente quieres vender %1 que has seleccionado?',
	SELLING: 'Vendiendo...',
	SALEDONE: 'Los objetos seleccionados han sido vendidos',
	NONESELECTED: 'Tienes que seleccionar al menos un objeto',
	JOBRANKSETTINGS: 'Configuracion del rango de trabajo',
	SEARCHINVENTORY: 'Buscar en el inventario',
	NOSEARCHRESULT: 'Tu busqueda de %1 no ha tenido ningun resultado.%2Mostrar todos los items%3',
	SEARCHHELP: 'Busqueda en el inventario. Puedes usar comodines (* 0 o mas caracteres, ? para un caracter)',
	APPLY: 'Aplicar',
	HEALTH: 'Puntos de vida maximos',
	DUELSHOOTINGATT: 'Duelista de fuego(atacante)',
	DUELSHOOTINGDEF: 'Duelista de fuego (defensor)',
	DUELVIGOR: 'Duelista contundente',
	FORTATTACK: 'Batalla de fuerte (atacante)',
	FORTDEFEND: 'Batalla de fuerte (defensor)',
	SKILLRIDE: 'Montar a caballo(Velocidad)'
};
twpro_langs.nl = {
	info: ['Lekensteyn', 'mailto:lekensteyn@gmail.com', 44179, '.1.2.'],
	WEBSITE: 'Website',
	AUTHOR: 'Auteur',
	TRANSLATOR: 'Vertaler',
	TWPRO_DISABLED: 'script uitgeschakeld',
	SORTBYNAME: 'Op <b>naam</b> sorteren',
	SORTBYXP: 'Op <b>ervaring</b> sorteren',
	SORTBYWAGES: 'Op <b>loon</b> sorteren',
	SORTBYLUCK: 'Op <b>geluk</b> sorteren',
	SORTBYCOMB: 'Op <b>voorkeur</b> sorteren',
	SORTBYDANGER: 'Op <b>gevaar</b> sorteren',
	SORTBYLABORP: 'Op <b>arbeidspunten</b> sorteren',
	FILTERJOBS: 'Verberg werkzaamheden die ik niet kan doen',
	FILTERCLOTHING: 'Weergeef enkel de beste kleding voor de geselecteerde arbeid',
	CHOOSEJOB: 'Arbeid kiezen...',
	CALCJOB: 'Even geduld, waarden berekenen...',
	INVENTSTATS: 'Inventaris statistieken',
	SELLVALUE: 'Verkoopwaarde',
	EQUIPMENT: 'Uitrusting',
	BAG: 'Rugzak',
	OBJECTS: 'Voorwerpen',
	PRODUCTS: 'Producten',
	TOTAL: 'Totaal',
	QUANTITIES: 'Hoeveelheden',
	HATS: 'Hoeden',
	NECKLACES: 'Halsbanden',
	WEAPONS: 'Wapens',
	CLOTHING: 'Kleding',
	SHOES: 'Schoenen',
	ANIMAL: 'Rijdieren',
	NONYIELDS: 'Niet-producten',
	YIELDS: 'Producten',
	LOADING: 'Laden...',
	LABORP: 'AP',
	CONSTRUCTION: 'Stadsuitbouw',
	HPTOTAL: 'Levenspunten totaal',
	STARTCALC: 'Gegevens berekenen...',
	CONVERT: 'Converteer',
	MULTISEL: 'Verkoop meerdere voorwerpen...',
	SELL: 'Verkoop selectie',
	CONFIRMSELL: 'Wil je echt %1 stapels voorwerpen verkopen?',
	SELLING: 'Verkoopt...',
	SALEDONE: 'De geselecteerde voorwerpen zijn verkocht.',
	NONESELECTED: 'Je moet minstens \xe9\xe9n voorwerp selecteren.',
	JOBRANKSETTINGS: 'Instellingen voorkeurswerken',
	SEARCHINVENTORY: 'Doorzoek inventaris',
	NOSEARCHRESULT: 'De zoekterm %1 heeft geen resultaten opgeleverd.%2Weergeef alle voorwerpen%3',
	SEARCHHELP: 'Doorzoek de inventaris. Je kunt wildcards gebruiken (* voor nul of meer tekens, ? voor \xe9\xe9n teken)',
	APPLY: 'Toepassen',
	HEALTH: 'Maximale levenspunten',
	DUELSHOOTINGATT: 'Schietduellant (aanvaller)',
	DUELSHOOTINGDEF: 'Schietduellant (verdediger)',
	DUELVIGOR: 'Slagkrachtduellant',
	FORTATTACK: 'Fortgevecht (aanvaller)',
	FORTDEFEND: 'Fortgevecht (verdediger)',
	SKILLRIDE: 'Paardrijden'
};
var twpro_langname = location.host.match(/(\D+)\d+\./);
if(twpro_langname && twpro_langs[twpro_langname[1]]) twpro_lang = twpro_langs[twpro_langname[1]];
{ // BBcodes
	function insertBBcode(startTag, endTag, elementid) {
		var input = document.getElementById(elementid);
		input.focus();
		/* für Internet Explorer */
		if (typeof document.selection != 'undefined') {
			/* Einfügen */
			var range = document.selection.createRange();
			var insText = range.text;
			range.text = startTag + insText + endTag;

			/* Cursorposition anpassen */
			range = document.selection.createRange();
			if (insText.length == 0) {
				range.move('character', -endTag.length);
			} else {
				range.moveStart('character', startTag.length + insText.length + endTag.length);
			}
			range.select();
		}
		/* für neuere auf Gecko basierende Browser */
		else if (typeof input.selectionStart != 'undefined') {
			/* BB code bugfix: scrolling by Lekensteyn <lekensteyn@gmail.com> */
			input.focus();
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var sts = input.scrollTop;
			var ste = input.scrollHeight;
			var insText = input.value.substring(start, end);
			input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);
			var pos;
			if(insText.length == 0){
				pos = start + startTag.length;
			}
			else{
				pos = start + startTag.length + insText.length + endTag.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
			input.scrollTop = sts + input.scrollHeight - ste;
		}
	}
	function insertbbcodesfunc(messagebox, extended) {
		if(window.TWPro && !window.TWPro.enablebbcodes) return;
		var bbcodeplace = messagebox.parentNode;
		var elementidmessagebox;
		if(!(elementidmessagebox=messagebox.id)) elementidmessagebox = messagebox.id = 'twpro_bbbar'+Math.random();
		var bbs = ['b', 'i', 'u', 's', 'player', 'town', 'fort', 'quote=Author', 'url'];
		if(extended) bbs.push('img', 'color=red', 'size=10');
		var bbtemplate = ' <img src="images/transparent.png" onclick="insertBBcode(\'[%1]\', \'[/%2]\', \''+elementidmessagebox+'\');" alt="%1" style="background-image:url(../images/bbcodes.png);background-position: -%3px;height:20px;width:20px;margin:6px 1px;" />';
		var bbhtml = '';
		for(var i=0; i<bbs.length; i++){
			bbhtml += bbtemplate.replace(/%1/g, bbs[i]).replace(/%2/g, bbs[i].replace(/=.+/, '')).replace(/%3/g, i*20);
		}
		var bbbar = document.createElement('div');
		bbbar.innerHTML = bbhtml;
		bbcodeplace.insertBefore(bbbar, messagebox)

	}
}

{ // Duelconverter and Fort Message
	
function makefortmessage(twpro_fort_elementin){
var twpro_fort_elementid=twpro_fort_elementin.id;
var twpro_fort_instructions=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_instructions";
var tmparray3=document.getElementById(twpro_fort_instructions).getElementsByTagName('a');
var tmparray3=tmparray3[0].parentNode;
var twpro_fort_divplayerid=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_playerlistdiv";
n = new Element('a', {'href': "javascript:makefortlist('"+twpro_fort_divplayerid+"');end();", 'style':'cursor: pointer;'});
n.innerHTML="<br/><br/>Mensaje a participantes";
tmparray3.appendChild(n);
}

function makefortlist(twpro_fort_divplayerid){
var tmparray2=document.getElementById(twpro_fort_divplayerid).childNodes;
alert('// longitud lista:\n'+tmparray2.length);
var fortplayerlist=tmparray2[0].innerHTML;
for (var j = 1 ; j < tmparray2.length ; j++){
	if (tmparray2[j].innerHTML == Character.name){
} else {
	fortplayerlist +=";"+tmparray2[j].innerHTML;
}
}
AjaxWindow.show('messages',{addressee:fortplayerlist});
}


function makeadvicemessage(twpro_advice_elementin, data){
var twpro_advice_elementid=twpro_advice_elementin.id;
data = data.replace(/Saloon<\/h2>/, '$&<a onclick="makeadvicelist(\''+twpro_advice_elementid+'\');" href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Mensaje</span><span class="button_right"></span><span style="clear:both"></span></a><br>');
return data;
}

function makeadvicelist(twpro_advice_elementid){
 var tbl=document.getElementById(twpro_advice_elementid).getElementsByTagName('table');
 tbl = tbl[2].getElementsByTagName('a');
 var adviceplayerlist = tbl[0].innerHTML; 
 for (var i=1;i<tbl.length;i++){
 if (tbl[i].href.search(/profile/) != -1) {
 adviceplayerlist += ';'+tbl[i].innerHTML;
 }
}
AjaxWindow.show('messages',{addressee:adviceplayerlist});
}


	function convertduelreport(winname, data){
		if(data && data.indexOf("Reports.switchDuel") > 0){
			data = data.replace(/"Reports\.view_delete_report.+?\n\s+<\/th>/, '$&<th><a onclick="convertduelreportfunc(\''+winname+'\');" href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+TWPro.lang.CONVERT+'</span><span class="button_right"></span><span style="clear:both"></span></a></th>');
		}
		return data;
	}
	function convertduelreportfunc(dc) {
		var dce = document.getElementById(dc);
		if(document.getElementById(dc+'_cnv')) return;
		if (dce.innerHTML.indexOf('images/report/attacker.png') != -1) {
			var duel = duellers = avatars = place = '';
			var tbl = dce.getElementsByTagName('table');
			var k = 0;
			var si = tbl[2].rows[0].cells;
			var s1 = si[0].getElementsByTagName('strong');
			var s2 = si[4].getElementsByTagName('strong');
			var ex = '[player]'+s1[0].firstChild.innerHTML+'[/player]';
			if(s1.length > 1) ex += ' ('+s1[1].innerHTML+')';
			ex += '[img]'+si[1].getElementsByTagName('img')[0].src+'[/img]';
			ex += '[img]/images/jobs/duell.png[/img]';
			ex += '[img]'+si[3].getElementsByTagName('img')[0].src+'[/img]';
			if(s2[0].firstChild){
				ex += '[player]'+s2[0].firstChild.innerHTML+'[/player]';
			}
			else{
				ex += '[b]'+s2[0].innerHTML+'[/b]';
			}
			if(s2.length > 1) ex += ' ('+s2[1].innerHTML+')';
			ex += '\n__________________________________________________\n';
			var dh = tbl[3].rows;
			var bpa = {
				'0px 0px': 'http://img43.imageshack.us/img43/3745/nohitatt.png',
				'0px -78px': 'http://img196.imageshack.us/img196/6343/haedatt.png',
				'0px -156px': 'http://img269.imageshack.us/img269/382/rightscatt.png',
				'0px -234px': 'http://img195.imageshack.us/img195/8398/leftscatt.png',
				'0px -312px': 'http://img39.imageshack.us/img39/1285/righthaatt.png',
				'0px -390px': 'http://img35.imageshack.us/img35/3261/lefthaatt.png',
				'0px -468px': 'http://img32.imageshack.us/img32/1503/winatt.png',
				'0px -546px': 'http://img193.imageshack.us/img193/1825/loseatt.png',
				'0px -624px': 'http://img9.imageshack.us/img9/5177/leftdie.png'
			};
			var bpd = {
				'0px 0px': 'http://img196.imageshack.us/img196/5995/nohitdeff.png',
				'0px -78px': 'http://img39.imageshack.us/img39/6522/haeddeff.png',
				'0px -156px': 'http://img195.imageshack.us/img195/8905/rightscdeff.png',
				'0px -234px': 'http://img32.imageshack.us/img32/9089/leftscdeff.png',
				'0px -312px': 'http://img35.imageshack.us/img35/3111/righthadeff.png',
				'0px -390px': 'http://img269.imageshack.us/img269/7476/lefthadeff.png',
				'0px -468px': 'http://img193.imageshack.us/img193/7641/windeff.png',
				'0px -546px': 'http://img194.imageshack.us/img194/8311/losedeff.png',
				'0px -624px': 'http://img30.imageshack.us/img30/8627/rightdie.png'
			};
			for(var i=0; i<dh.length; i++){
				if(i == dh.length-1){
					ex += '[b]_______________'+TWPro.lang.HPTOTAL+':_______________[/b]\n';
				}
				var d1 = dh[i].cells[0].getElementsByTagName('span');
				if(d1.length > 1){
					d1 = d1[1].innerHTML;
					if(d1.length < 9){
						d1 = '[color=#D3C6AF]'+(new Array(10-d1.length)).join('0')+'[/color][color=red]'+d1;
					}
					else{
						d1 = '[color=red]'+d1;
					}
					ex += '[b][size=17]'+d1+' [/color][/size][/b]';
				}
				else{
					ex += '[size=17][color=#D3C6AF]0000000[/color]0 [/size]';
				}
				var dud = dh[i].cells[1].getElementsByTagName('div');
				ex += '[img]'+bpa[dud[1].style.backgroundPosition]+'[/img][img]'+bpd[dud[2].style.backgroundPosition]+'[/img]';
				var d2 = dh[i].cells[2].getElementsByTagName('span');
				if(d2.length > 1){
					ex += '[b][size=17][color=blue]'+d2[1].innerHTML+'[/color][/size][/b]';
				}
				else{
					ex += '[size=17][color=#D3C6AF]0000[/color]0 [/size]';
				}
				ex += '\n';
			}
			ex += '[b][size=16]'+dce.getElementsByTagName('h4')[1].innerHTML+'[/size][/b]';
			var dd = document.createElement('div');
			dd.style.cssText = 'overflow: auto; position: relative; height: 340px; padding: 5px;';
			dd.id = dc+'_cnv';
			dd.innerHTML = '<img src="/img.php?type=button&subtype=normal&value=back" alt="Back" style="float:right;cursor:pointer" onclick="this.parentNode.previousSibling.style.display=\'\';this.parentNode.parentNode.removeChild(this.parentNode);" />BB Code: <br /><textarea rows="10" cols="40"  style="width:85%;height:80%;background-image: url(images/muster.jpg);margin-left:auto;margin-right:auto;" onfocus="this.select();" readonly="readonly">' + ex + "</textarea>";
			var bf = tbl[2].parentNode.nextSibling;
			bf.previousSibling.style.display = 'none';
			bf.parentNode.insertBefore(dd, bf);
		}

	}
}
if ((window.location.href.indexOf('.the-west.') != -1 || window.location.href.indexOf('tw.innogames.net') != -1) && window.location.href.indexOf('game') != -1) {
	/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
oder Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
*/

	// manipuliert interne Funktionen und fuegt eigene Aufrufe ein
	function twpro_injectScript() {
		var style = document.createElement('style'),
			css = '.twpro_search_hide{display:none}';
		style.setAttribute('type', 'text/css');
		if(style.styleSheet){ // IE
			style.styleSheet.cssText = css;
		}
		else{
			style.appendChild(document.createTextNode(css));
		}
		document.getElementsByTagName('head')[0].appendChild(style);
		TWPro.enablebbcodes = true;
		TWPro.twpro_calculated = false;
		TWPro.twpro_failure = false;
		TWPro.twpro_failureInject = false;
		TWPro.twpro_failureRollback = [];
		TWPro.twpro_active = true;
		TWPro.twpro_sorts = ['name', 'erfahrung', 'lohn', 'glueck', 'comb', 'gefahr', 'laborp'];
		function getPCookie(n){var c='; '+document.cookie+';',s='; twpro_'+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
		TWPro.prefs = {
			'Hide_unjobs': 1,
			'dispJobClothingOnly': 2,
			'multipliers': getPCookie('multipliers'),
			'reportaccess': getPCookie('reportaccess')
		};
		TWPro.prefNumber = parseInt(getPCookie('prefs'), 10) || 0;
		TWPro.multipliers = {xp:1, wages:1, luck:1, danger:1};
		var multiplier,
			savedMultipliers = TWPro.twpro_preference('multipliers').split(':'),
			j=0;
		for(var i in TWPro.multipliers){
			multiplier = parseInt(savedMultipliers[j++], 10);
			if(!isNaN(multiplier)){
				TWPro.multipliers[i] = multiplier;
			}
		}
		TWPro.searchInventory = {timer:null};
		TWPro.twpro_jobs = [];
		// Jobs
		{
			TWPro.twpro_jobValues = {};
			TWPro.twpro_jobValues.swine = {};
			TWPro.twpro_jobValues.swine.erfahrung = 1;
			TWPro.twpro_jobValues.swine.lohn = 3;
			TWPro.twpro_jobValues.swine.glueck = 0;
			TWPro.twpro_jobValues.swine.gefahr = 1;
			TWPro.twpro_jobValues.scarecrow = {};
			TWPro.twpro_jobValues.scarecrow.erfahrung = 3;
			TWPro.twpro_jobValues.scarecrow.lohn = 1;
			TWPro.twpro_jobValues.scarecrow.glueck = 2;
			TWPro.twpro_jobValues.scarecrow.gefahr = 20;
			TWPro.twpro_jobValues.wanted = {};
			TWPro.twpro_jobValues.wanted.erfahrung = 3;
			TWPro.twpro_jobValues.wanted.lohn = 2;
			TWPro.twpro_jobValues.wanted.glueck = 0;
			TWPro.twpro_jobValues.wanted.gefahr = 10;
			TWPro.twpro_jobValues.tabacco = {};
			TWPro.twpro_jobValues.tabacco.erfahrung = 1;
			TWPro.twpro_jobValues.tabacco.lohn = 6;
			TWPro.twpro_jobValues.tabacco.glueck = 2;
			TWPro.twpro_jobValues.tabacco.gefahr = 2;
			TWPro.twpro_jobValues.cotton = {};
			TWPro.twpro_jobValues.cotton.erfahrung = 4;
			TWPro.twpro_jobValues.cotton.lohn = 1;
			TWPro.twpro_jobValues.cotton.glueck = 0;
			TWPro.twpro_jobValues.cotton.gefahr = 3;
			TWPro.twpro_jobValues.sugar = {};
			TWPro.twpro_jobValues.sugar.erfahrung = 2;
			TWPro.twpro_jobValues.sugar.lohn = 5;
			TWPro.twpro_jobValues.sugar.glueck = 4;
			TWPro.twpro_jobValues.sugar.gefahr = 1;
			TWPro.twpro_jobValues.angle = {};
			TWPro.twpro_jobValues.angle.erfahrung = 0;
			TWPro.twpro_jobValues.angle.lohn = 1;
			TWPro.twpro_jobValues.angle.glueck = 6;
			TWPro.twpro_jobValues.angle.gefahr = 2;
			TWPro.twpro_jobValues.cereal = {};
			TWPro.twpro_jobValues.cereal.erfahrung = 6;
			TWPro.twpro_jobValues.cereal.lohn = 2;
			TWPro.twpro_jobValues.cereal.glueck = 2;
			TWPro.twpro_jobValues.cereal.gefahr = 4;
			TWPro.twpro_jobValues.berry = {};
			TWPro.twpro_jobValues.berry.erfahrung = 6;
			TWPro.twpro_jobValues.berry.lohn = 2;
			TWPro.twpro_jobValues.berry.glueck = 5;
			TWPro.twpro_jobValues.berry.gefahr = 6;
			TWPro.twpro_jobValues.sheeps = {};
			TWPro.twpro_jobValues.sheeps.erfahrung = 5;
			TWPro.twpro_jobValues.sheeps.lohn = 3;
			TWPro.twpro_jobValues.sheeps.glueck = 0;
			TWPro.twpro_jobValues.sheeps.gefahr = 2;
			TWPro.twpro_jobValues.newspaper = {};
			TWPro.twpro_jobValues.newspaper.erfahrung = 1;
			TWPro.twpro_jobValues.newspaper.lohn = 6;
			TWPro.twpro_jobValues.newspaper.glueck = 2;
			TWPro.twpro_jobValues.newspaper.gefahr = 1;
			TWPro.twpro_jobValues.cut = {};
			TWPro.twpro_jobValues.cut.erfahrung = 7;
			TWPro.twpro_jobValues.cut.lohn = 5;
			TWPro.twpro_jobValues.cut.glueck = 3;
			TWPro.twpro_jobValues.cut.gefahr = 3;
			TWPro.twpro_jobValues.grinding = {};
			TWPro.twpro_jobValues.grinding.erfahrung = 7;
			TWPro.twpro_jobValues.grinding.lohn = 11;
			TWPro.twpro_jobValues.grinding.glueck = 0;
			TWPro.twpro_jobValues.grinding.gefahr = 5;
			TWPro.twpro_jobValues.corn = {};
			TWPro.twpro_jobValues.corn.erfahrung = 7;
			TWPro.twpro_jobValues.corn.lohn = 4;
			TWPro.twpro_jobValues.corn.glueck = 8;
			TWPro.twpro_jobValues.corn.gefahr = 5;
			TWPro.twpro_jobValues.beans = {};
			TWPro.twpro_jobValues.beans.erfahrung = 7;
			TWPro.twpro_jobValues.beans.lohn = 9;
			TWPro.twpro_jobValues.beans.glueck = 4;
			TWPro.twpro_jobValues.beans.gefahr = 5;
			TWPro.twpro_jobValues.fort_guard = {};
			TWPro.twpro_jobValues.fort_guard.erfahrung = 9;
			TWPro.twpro_jobValues.fort_guard.lohn = 3;
			TWPro.twpro_jobValues.fort_guard.glueck = 2;
			TWPro.twpro_jobValues.fort_guard.gefahr = 7;
			TWPro.twpro_jobValues.tanning = {};
			TWPro.twpro_jobValues.tanning.erfahrung = 15;
			TWPro.twpro_jobValues.tanning.lohn = 12;
			TWPro.twpro_jobValues.tanning.glueck = 5;
			TWPro.twpro_jobValues.tanning.gefahr = 18;
			TWPro.twpro_jobValues.digging = {};
			TWPro.twpro_jobValues.digging.erfahrung = 3;
			TWPro.twpro_jobValues.digging.lohn = 11;
			TWPro.twpro_jobValues.digging.glueck = 5;
			TWPro.twpro_jobValues.digging.gefahr = 7;
			TWPro.twpro_jobValues.grave = {};
			TWPro.twpro_jobValues.grave.erfahrung = 12;
			TWPro.twpro_jobValues.grave.lohn = 16;
			TWPro.twpro_jobValues.grave.glueck = 22;
			TWPro.twpro_jobValues.grave.gefahr = 9;
			TWPro.twpro_jobValues.turkey = {};
			TWPro.twpro_jobValues.turkey.erfahrung = 14;
			TWPro.twpro_jobValues.turkey.lohn = 3;
			TWPro.twpro_jobValues.turkey.glueck = 7;
			TWPro.twpro_jobValues.turkey.gefahr = 21;
			TWPro.twpro_jobValues.rail = {};
			TWPro.twpro_jobValues.rail.erfahrung = 18;
			TWPro.twpro_jobValues.rail.lohn = 10;
			TWPro.twpro_jobValues.rail.glueck = 5;
			TWPro.twpro_jobValues.rail.gefahr = 10;
			TWPro.twpro_jobValues.cow = {};
			TWPro.twpro_jobValues.cow.erfahrung = 17;
			TWPro.twpro_jobValues.cow.lohn = 5;
			TWPro.twpro_jobValues.cow.glueck = 0;
			TWPro.twpro_jobValues.cow.gefahr = 11;
			TWPro.twpro_jobValues.fence = {};
			TWPro.twpro_jobValues.fence.erfahrung = 11;
			TWPro.twpro_jobValues.fence.lohn = 7;
			TWPro.twpro_jobValues.fence.glueck = 5;
			TWPro.twpro_jobValues.fence.gefahr = 6;
			TWPro.twpro_jobValues.saw = {};
			TWPro.twpro_jobValues.saw.erfahrung = 12;
			TWPro.twpro_jobValues.saw.lohn = 23;
			TWPro.twpro_jobValues.saw.glueck = 6;
			TWPro.twpro_jobValues.saw.gefahr = 32;
			TWPro.twpro_jobValues.stone = {};
			TWPro.twpro_jobValues.stone.erfahrung = 8;
			TWPro.twpro_jobValues.stone.lohn = 17;
			TWPro.twpro_jobValues.stone.glueck = 9;
			TWPro.twpro_jobValues.stone.gefahr = 33;
			TWPro.twpro_jobValues.straighten = {};
			TWPro.twpro_jobValues.straighten.erfahrung = 22;
			TWPro.twpro_jobValues.straighten.lohn = 8;
			TWPro.twpro_jobValues.straighten.glueck = 15;
			TWPro.twpro_jobValues.straighten.gefahr = 12;
			TWPro.twpro_jobValues.wood = {};
			TWPro.twpro_jobValues.wood.erfahrung = 5;
			TWPro.twpro_jobValues.wood.lohn = 18;
			TWPro.twpro_jobValues.wood.glueck = 2;
			TWPro.twpro_jobValues.wood.gefahr = 21;
			TWPro.twpro_jobValues.irrigation = {};
			TWPro.twpro_jobValues.irrigation.erfahrung = 13;
			TWPro.twpro_jobValues.irrigation.lohn = 7;
			TWPro.twpro_jobValues.irrigation.glueck = 15;
			TWPro.twpro_jobValues.irrigation.gefahr = 6;
			TWPro.twpro_jobValues.brand = {};
			TWPro.twpro_jobValues.brand.erfahrung = 25;
			TWPro.twpro_jobValues.brand.lohn = 8;
			TWPro.twpro_jobValues.brand.glueck = 0;
			TWPro.twpro_jobValues.brand.gefahr = 35;
			TWPro.twpro_jobValues.wire = {};
			TWPro.twpro_jobValues.wire.erfahrung = 13;
			TWPro.twpro_jobValues.wire.lohn = 17;
			TWPro.twpro_jobValues.wire.glueck = 6;
			TWPro.twpro_jobValues.wire.gefahr = 0;
			TWPro.twpro_jobValues.dam = {};
			TWPro.twpro_jobValues.dam.erfahrung = 18;
			TWPro.twpro_jobValues.dam.lohn = 4;
			TWPro.twpro_jobValues.dam.glueck = 9;
			TWPro.twpro_jobValues.dam.gefahr = 41;
			TWPro.twpro_jobValues.gems = {};
			TWPro.twpro_jobValues.gems.erfahrung = 7;
			TWPro.twpro_jobValues.gems.lohn = 25;
			TWPro.twpro_jobValues.gems.glueck = 8;
			TWPro.twpro_jobValues.gems.gefahr = 4;
			TWPro.twpro_jobValues.claim = {};
			TWPro.twpro_jobValues.claim.erfahrung = 4;
			TWPro.twpro_jobValues.claim.lohn = 31;
			TWPro.twpro_jobValues.claim.glueck = 4;
			TWPro.twpro_jobValues.claim.gefahr = 29;
			TWPro.twpro_jobValues.chuck_wagon = {};
			TWPro.twpro_jobValues.chuck_wagon.erfahrung = 23;
			TWPro.twpro_jobValues.chuck_wagon.lohn = 5;
			TWPro.twpro_jobValues.chuck_wagon.glueck = 42;
			TWPro.twpro_jobValues.chuck_wagon.gefahr = 11;
			TWPro.twpro_jobValues.break_in = {};
			TWPro.twpro_jobValues.break_in.erfahrung = 32;
			TWPro.twpro_jobValues.break_in.lohn = 13;
			TWPro.twpro_jobValues.break_in.glueck = 10;
			TWPro.twpro_jobValues.break_in.gefahr = 52;
			TWPro.twpro_jobValues.trade = {};
			TWPro.twpro_jobValues.trade.erfahrung = 3;
			TWPro.twpro_jobValues.trade.lohn = 15;
			TWPro.twpro_jobValues.trade.glueck = 25;
			TWPro.twpro_jobValues.trade.gefahr = 12;
			TWPro.twpro_jobValues.mast = {};
			TWPro.twpro_jobValues.mast.erfahrung = 25;
			TWPro.twpro_jobValues.mast.lohn = 21;
			TWPro.twpro_jobValues.mast.glueck = 3;
			TWPro.twpro_jobValues.mast.gefahr = 14;
			TWPro.twpro_jobValues.spring = {};
			TWPro.twpro_jobValues.spring.erfahrung = 33;
			TWPro.twpro_jobValues.spring.lohn = 9;
			TWPro.twpro_jobValues.spring.glueck = 23;
			TWPro.twpro_jobValues.spring.gefahr = 19;
			TWPro.twpro_jobValues.beaver = {};
			TWPro.twpro_jobValues.beaver.erfahrung = 17;
			TWPro.twpro_jobValues.beaver.lohn = 32;
			TWPro.twpro_jobValues.beaver.glueck = 6;
			TWPro.twpro_jobValues.beaver.gefahr = 21;
			TWPro.twpro_jobValues.coal = {};
			TWPro.twpro_jobValues.coal.erfahrung = 14;
			TWPro.twpro_jobValues.coal.lohn = 30;
			TWPro.twpro_jobValues.coal.glueck = 0;
			TWPro.twpro_jobValues.coal.gefahr = 13;
			TWPro.twpro_jobValues.print = {};
			TWPro.twpro_jobValues.print.erfahrung = 20;
			TWPro.twpro_jobValues.print.lohn = 30;
			TWPro.twpro_jobValues.print.glueck = 5;
			TWPro.twpro_jobValues.print.gefahr = 7;
			TWPro.twpro_jobValues.fishing = {};
			TWPro.twpro_jobValues.fishing.erfahrung = 23;
			TWPro.twpro_jobValues.fishing.lohn = 6;
			TWPro.twpro_jobValues.fishing.glueck = 23;
			TWPro.twpro_jobValues.fishing.gefahr = 38;
			TWPro.twpro_jobValues.trainstation = {};
			TWPro.twpro_jobValues.trainstation.erfahrung = 47;
			TWPro.twpro_jobValues.trainstation.lohn = 12;
			TWPro.twpro_jobValues.trainstation.glueck = 7;
			TWPro.twpro_jobValues.trainstation.gefahr = 15;
			TWPro.twpro_jobValues.windmeel = {};
			TWPro.twpro_jobValues.windmeel.erfahrung = 43;
			TWPro.twpro_jobValues.windmeel.lohn = 42;
			TWPro.twpro_jobValues.windmeel.glueck = 6;
			TWPro.twpro_jobValues.windmeel.gefahr = 18;
			TWPro.twpro_jobValues.explore = {};
			TWPro.twpro_jobValues.explore.erfahrung = 45;
			TWPro.twpro_jobValues.explore.lohn = 1;
			TWPro.twpro_jobValues.explore.glueck = 22;
			TWPro.twpro_jobValues.explore.gefahr = 37;
			TWPro.twpro_jobValues.float = {};
			TWPro.twpro_jobValues.float.erfahrung = 45;
			TWPro.twpro_jobValues.float.lohn = 23;
			TWPro.twpro_jobValues.float.glueck = 0;
			TWPro.twpro_jobValues.float.gefahr = 52;
			TWPro.twpro_jobValues.bridge = {};
			TWPro.twpro_jobValues.bridge.erfahrung = 33;
			TWPro.twpro_jobValues.bridge.lohn = 17;
			TWPro.twpro_jobValues.bridge.glueck = 18;
			TWPro.twpro_jobValues.bridge.gefahr = 53;
			TWPro.twpro_jobValues.springe = {};
			TWPro.twpro_jobValues.springe.erfahrung = 45;
			TWPro.twpro_jobValues.springe.lohn = 29;
			TWPro.twpro_jobValues.springe.glueck = 0;
			TWPro.twpro_jobValues.springe.gefahr = 42;
			TWPro.twpro_jobValues.coffin = {};
			TWPro.twpro_jobValues.coffin.erfahrung = 8;
			TWPro.twpro_jobValues.coffin.lohn = 42;
			TWPro.twpro_jobValues.coffin.glueck = 15;
			TWPro.twpro_jobValues.coffin.gefahr = 20;
			TWPro.twpro_jobValues.dynamite = {};
			TWPro.twpro_jobValues.dynamite.erfahrung = 12;
			TWPro.twpro_jobValues.dynamite.lohn = 23;
			TWPro.twpro_jobValues.dynamite.glueck = 64;
			TWPro.twpro_jobValues.dynamite.gefahr = 93;
			TWPro.twpro_jobValues.coyote = {};
			TWPro.twpro_jobValues.coyote.erfahrung = 43;
			TWPro.twpro_jobValues.coyote.lohn = 15;
			TWPro.twpro_jobValues.coyote.glueck = 26;
			TWPro.twpro_jobValues.coyote.gefahr = 45;
			TWPro.twpro_jobValues.buffalo = {};
			TWPro.twpro_jobValues.buffalo.erfahrung = 62;
			TWPro.twpro_jobValues.buffalo.lohn = 24;
			TWPro.twpro_jobValues.buffalo.glueck = 0;
			TWPro.twpro_jobValues.buffalo.gefahr = 72;
			TWPro.twpro_jobValues.fort = {};
			TWPro.twpro_jobValues.fort.erfahrung = 71;
			TWPro.twpro_jobValues.fort.lohn = 33;
			TWPro.twpro_jobValues.fort.glueck = 17;
			TWPro.twpro_jobValues.fort.gefahr = 35;
			TWPro.twpro_jobValues.indians = {};
			TWPro.twpro_jobValues.indians.erfahrung = 14;
			TWPro.twpro_jobValues.indians.lohn = 11;
			TWPro.twpro_jobValues.indians.glueck = 63;
			TWPro.twpro_jobValues.indians.gefahr = 34;
			TWPro.twpro_jobValues.clearing = {};
			TWPro.twpro_jobValues.clearing.erfahrung = 8;
			TWPro.twpro_jobValues.clearing.lohn = 62;
			TWPro.twpro_jobValues.clearing.glueck = 9;
			TWPro.twpro_jobValues.clearing.gefahr = 16;
			TWPro.twpro_jobValues.silver = {};
			TWPro.twpro_jobValues.silver.erfahrung = 8;
			TWPro.twpro_jobValues.silver.lohn = 76;
			TWPro.twpro_jobValues.silver.glueck = 0;
			TWPro.twpro_jobValues.silver.gefahr = 32;
			TWPro.twpro_jobValues.diligence_guard = {};
			TWPro.twpro_jobValues.diligence_guard.erfahrung = 77;
			TWPro.twpro_jobValues.diligence_guard.lohn = 34;
			TWPro.twpro_jobValues.diligence_guard.glueck = 45;
			TWPro.twpro_jobValues.diligence_guard.gefahr = 43;
			TWPro.twpro_jobValues.wolf = {};
			TWPro.twpro_jobValues.wolf.erfahrung = 63;
			TWPro.twpro_jobValues.wolf.lohn = 21;
			TWPro.twpro_jobValues.wolf.glueck = 15;
			TWPro.twpro_jobValues.wolf.gefahr = 67;
			TWPro.twpro_jobValues.track = {};
			TWPro.twpro_jobValues.track.erfahrung = 60;
			TWPro.twpro_jobValues.track.lohn = 10;
			TWPro.twpro_jobValues.track.glueck = 30;
			TWPro.twpro_jobValues.track.gefahr = 33;
			TWPro.twpro_jobValues.ox = {};
			TWPro.twpro_jobValues.ox.erfahrung = 34;
			TWPro.twpro_jobValues.ox.lohn = 64;
			TWPro.twpro_jobValues.ox.glueck = 18;
			TWPro.twpro_jobValues.ox.gefahr = 43;
			TWPro.twpro_jobValues.guard = {};
			TWPro.twpro_jobValues.guard.erfahrung = 35;
			TWPro.twpro_jobValues.guard.lohn = 25;
			TWPro.twpro_jobValues.guard.glueck = 38;
			TWPro.twpro_jobValues.guard.gefahr = 4;
			TWPro.twpro_jobValues.bible = {};
			TWPro.twpro_jobValues.bible.erfahrung = 61;
			TWPro.twpro_jobValues.bible.lohn = 5;
			TWPro.twpro_jobValues.bible.glueck = 52;
			TWPro.twpro_jobValues.bible.gefahr = 77;
			TWPro.twpro_jobValues.ponyexpress = {};
			TWPro.twpro_jobValues.ponyexpress.erfahrung = 48;
			TWPro.twpro_jobValues.ponyexpress.lohn = 15;
			TWPro.twpro_jobValues.ponyexpress.glueck = 51;
			TWPro.twpro_jobValues.ponyexpress.gefahr = 44;
			TWPro.twpro_jobValues.weapons = {};
			TWPro.twpro_jobValues.weapons.erfahrung = 35;
			TWPro.twpro_jobValues.weapons.lohn = 15;
			TWPro.twpro_jobValues.weapons.glueck = 72;
			TWPro.twpro_jobValues.weapons.gefahr = 82;
			TWPro.twpro_jobValues.dead = {};
			TWPro.twpro_jobValues.dead.erfahrung = 14;
			TWPro.twpro_jobValues.dead.lohn = 14;
			TWPro.twpro_jobValues.dead.glueck = 90;
			TWPro.twpro_jobValues.dead.gefahr = 34;
			TWPro.twpro_jobValues.grizzly = {};
			TWPro.twpro_jobValues.grizzly.erfahrung = 78;
			TWPro.twpro_jobValues.grizzly.lohn = 25;
			TWPro.twpro_jobValues.grizzly.glueck = 35;
			TWPro.twpro_jobValues.grizzly.gefahr = 71;
			TWPro.twpro_jobValues.oil = {};
			TWPro.twpro_jobValues.oil.erfahrung = 25;
			TWPro.twpro_jobValues.oil.lohn = 83;
			TWPro.twpro_jobValues.oil.glueck = 20;
			TWPro.twpro_jobValues.oil.gefahr = 7;
			TWPro.twpro_jobValues.treasure_hunting = {};
			TWPro.twpro_jobValues.treasure_hunting.erfahrung = 20;
			TWPro.twpro_jobValues.treasure_hunting.lohn = 20;
			TWPro.twpro_jobValues.treasure_hunting.glueck = 83;
			TWPro.twpro_jobValues.treasure_hunting.gefahr = 24;
			TWPro.twpro_jobValues.army = {};
			TWPro.twpro_jobValues.army.erfahrung = 76;
			TWPro.twpro_jobValues.army.lohn = 55;
			TWPro.twpro_jobValues.army.glueck = 17;
			TWPro.twpro_jobValues.army.gefahr = 35;
			TWPro.twpro_jobValues.steal = {};
			TWPro.twpro_jobValues.steal.erfahrung = 50;
			TWPro.twpro_jobValues.steal.lohn = 48;
			TWPro.twpro_jobValues.steal.glueck = 74;
			TWPro.twpro_jobValues.steal.gefahr = 66;
			TWPro.twpro_jobValues.mercenary = {};
			TWPro.twpro_jobValues.mercenary.erfahrung = 52;
			TWPro.twpro_jobValues.mercenary.lohn = 92;
			TWPro.twpro_jobValues.mercenary.glueck = 23;
			TWPro.twpro_jobValues.mercenary.gefahr = 65;
			TWPro.twpro_jobValues.bandits = {};
			TWPro.twpro_jobValues.bandits.erfahrung = 75;
			TWPro.twpro_jobValues.bandits.lohn = 28;
			TWPro.twpro_jobValues.bandits.glueck = 85;
			TWPro.twpro_jobValues.bandits.gefahr = 83;
			TWPro.twpro_jobValues.aggression = {};
			TWPro.twpro_jobValues.aggression.erfahrung = 27;
			TWPro.twpro_jobValues.aggression.lohn = 78;
			TWPro.twpro_jobValues.aggression.glueck = 78;
			TWPro.twpro_jobValues.aggression.gefahr = 86;
			TWPro.twpro_jobValues.diligence_aggression = {};
			TWPro.twpro_jobValues.diligence_aggression.erfahrung = 73;
			TWPro.twpro_jobValues.diligence_aggression.lohn = 43;
			TWPro.twpro_jobValues.diligence_aggression.glueck = 95;
			TWPro.twpro_jobValues.diligence_aggression.gefahr = 67;
			TWPro.twpro_jobValues.bounty = {};
			TWPro.twpro_jobValues.bounty.erfahrung = 32;
			TWPro.twpro_jobValues.bounty.lohn = 92;
			TWPro.twpro_jobValues.bounty.glueck = 79;
			TWPro.twpro_jobValues.bounty.gefahr = 72;
			TWPro.twpro_jobValues.captured = {};
			TWPro.twpro_jobValues.captured.erfahrung = 69;
			TWPro.twpro_jobValues.captured.lohn = 23;
			TWPro.twpro_jobValues.captured.glueck = 85;
			TWPro.twpro_jobValues.captured.gefahr = 44;
			TWPro.twpro_jobValues.train = {};
			TWPro.twpro_jobValues.train.erfahrung = 87;
			TWPro.twpro_jobValues.train.lohn = 67;
			TWPro.twpro_jobValues.train.glueck = 92;
			TWPro.twpro_jobValues.train.gefahr = 96;
			TWPro.twpro_jobValues.burglary = {};
			TWPro.twpro_jobValues.burglary.erfahrung = 34;
			TWPro.twpro_jobValues.burglary.lohn = 80;
			TWPro.twpro_jobValues.burglary.glueck = 81;
			TWPro.twpro_jobValues.burglary.gefahr = 26;
			TWPro.twpro_jobValues.quackery = {};
			TWPro.twpro_jobValues.quackery.erfahrung = 50;
			TWPro.twpro_jobValues.quackery.lohn = 65;
			TWPro.twpro_jobValues.quackery.glueck = 52;
			TWPro.twpro_jobValues.quackery.gefahr = 67;
			TWPro.twpro_jobValues.peace = {};
			TWPro.twpro_jobValues.peace.erfahrung = 68;
			TWPro.twpro_jobValues.peace.lohn = 33;
			TWPro.twpro_jobValues.peace.glueck = 76;
			TWPro.twpro_jobValues.peace.gefahr = 44;
			TWPro.twpro_jobValues.ship = {};
			TWPro.twpro_jobValues.ship.erfahrung = 35;
			TWPro.twpro_jobValues.ship.lohn = 82;
			TWPro.twpro_jobValues.ship.glueck = 15;
			TWPro.twpro_jobValues.ship.gefahr = 14;
			TWPro.twpro_jobValues.smuggle = {};
			TWPro.twpro_jobValues.smuggle.erfahrung = 45;
			TWPro.twpro_jobValues.smuggle.lohn = 62;
			TWPro.twpro_jobValues.smuggle.glueck = 83;
			TWPro.twpro_jobValues.smuggle.gefahr = 56;
			TWPro.twpro_jobValues.ranch = {};
			TWPro.twpro_jobValues.ranch.erfahrung = 61;
			TWPro.twpro_jobValues.ranch.lohn = 28;
			TWPro.twpro_jobValues.ranch.glueck = 17;
			TWPro.twpro_jobValues.ranch.gefahr = 24;
			TWPro.twpro_jobValues.iron = {};
			TWPro.twpro_jobValues.iron.erfahrung = 32;
			TWPro.twpro_jobValues.iron.lohn = 52;
			TWPro.twpro_jobValues.iron.glueck = 15;
			TWPro.twpro_jobValues.iron.gefahr = 29;
			TWPro.twpro_jobValues.agave = {};
			TWPro.twpro_jobValues.agave.erfahrung = 42;
			TWPro.twpro_jobValues.agave.lohn = 25;
			TWPro.twpro_jobValues.agave.glueck = 12;
			TWPro.twpro_jobValues.agave.gefahr = 27;
			TWPro.twpro_jobValues.tomato = {};
			TWPro.twpro_jobValues.tomato.erfahrung = 12;
			TWPro.twpro_jobValues.tomato.lohn = 13;
			TWPro.twpro_jobValues.tomato.glueck = 7;
			TWPro.twpro_jobValues.tomato.gefahr = 11;
			TWPro.twpro_jobValues.horseshoe = {};
			TWPro.twpro_jobValues.horseshoe.erfahrung = 28;
			TWPro.twpro_jobValues.horseshoe.lohn = 14;
			TWPro.twpro_jobValues.horseshoe.glueck = 9;
			TWPro.twpro_jobValues.horseshoe.gefahr = 23;
			TWPro.twpro_jobValues.fire = {};
			TWPro.twpro_jobValues.fire.erfahrung = 41;
			TWPro.twpro_jobValues.fire.lohn = 15;
			TWPro.twpro_jobValues.fire.glueck = 65;
			TWPro.twpro_jobValues.fire.gefahr = 45;
			TWPro.twpro_jobValues.orange = {};
			TWPro.twpro_jobValues.orange.erfahrung = 25;
			TWPro.twpro_jobValues.orange.lohn = 14;
			TWPro.twpro_jobValues.orange.glueck = 10;
			TWPro.twpro_jobValues.orange.gefahr = 21;
			TWPro.twpro_jobValues.muck_out = {};
			TWPro.twpro_jobValues.muck_out.erfahrung = 5;
			TWPro.twpro_jobValues.muck_out.lohn = 4;
			TWPro.twpro_jobValues.muck_out.glueck = 2;
			TWPro.twpro_jobValues.muck_out.gefahr = 6;
			TWPro.twpro_jobValues.shoes = {};
			TWPro.twpro_jobValues.shoes.erfahrung = 2;
			TWPro.twpro_jobValues.shoes.lohn = 3;
			TWPro.twpro_jobValues.shoes.glueck = 3;
			TWPro.twpro_jobValues.shoes.gefahr = 2;
			
			var extra_jobs = ['construct', 'lifepoints', 'ride', 'duelshootingatt', 'duelshootingdef', 'duelvigor', 'fortatt', 'fortdef'];
			for(var i=0; i<extra_jobs.length; i++){
				TWPro.twpro_jobValues[extra_jobs[i]] = {'erfahrung':0, 'lohn':0, 'glueck':0, 'gefahr':0};
			}
		}
		TWPro.twpro_setBonusParsed = false;
		// Setitems
		{
			TWPro.twpro_setBonus = {};
			TWPro.twpro_setBonus.fireworker_set = [];
			TWPro.twpro_setBonus.fireworker_set[1] = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.attributes = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.skills = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.all = 0;
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.fire = 15;
			TWPro.twpro_setBonus.fireworker_set[1].speedBonus = 0;
			TWPro.twpro_setBonus.fireworker_set[1].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer = [];
			TWPro.twpro_setBonus.set_farmer[2] = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[3] = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[4] = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.windmeel = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.springe = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.ranch = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian = [];
			TWPro.twpro_setBonus.set_indian[2] = {};
			TWPro.twpro_setBonus.set_indian[2].bonus = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_indian[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[2].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[2].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[2].speedBonus = 15;
			TWPro.twpro_setBonus.set_indian[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[3] = {};
			TWPro.twpro_setBonus.set_indian[3].bonus = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes.flexibility = 5;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[3].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[3].speedBonus = 30;
			TWPro.twpro_setBonus.set_indian[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[4] = {};
			TWPro.twpro_setBonus.set_indian[4].bonus = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes.flexibility = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[4].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[4].speedBonus = 44;
			TWPro.twpro_setBonus.set_indian[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[5] = {};
			TWPro.twpro_setBonus.set_indian[5].bonus = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes.flexibility = 12;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.animal = 8;
			TWPro.twpro_setBonus.set_indian[5].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.grizzly = 60;
			TWPro.twpro_setBonus.set_indian[5].speedBonus = 60;
			TWPro.twpro_setBonus.set_indian[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican = [];
			TWPro.twpro_setBonus.set_mexican[2] = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_mexican[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[2].speedBonus = 12;
			TWPro.twpro_setBonus.set_mexican[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[3] = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_mexican[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[3].speedBonus = 24;
			TWPro.twpro_setBonus.set_mexican[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[4] = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes.strength = 4;
			TWPro.twpro_setBonus.set_mexican[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[4].speedBonus = 36;
			TWPro.twpro_setBonus.set_mexican[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[5] = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes.strength = 6;
			TWPro.twpro_setBonus.set_mexican[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[5].speedBonus = 48;
			TWPro.twpro_setBonus.set_mexican[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[6] = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes.strength = 9;
			TWPro.twpro_setBonus.set_mexican[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.dynamite = 90;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[6].speedBonus = 60;
			TWPro.twpro_setBonus.set_mexican[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male = [];
			TWPro.twpro_setBonus.set_pilgrim_male[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_male[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_male[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_male[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_male[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female = [];
			TWPro.twpro_setBonus.set_pilgrim_female[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_female[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_female[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_female[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_female[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery = [];
			TWPro.twpro_setBonus.set_quackery[2] = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.endurance = 5;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.trade = 5;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.quackery = 30;
			TWPro.twpro_setBonus.set_quackery[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[3] = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.endurance = 10;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.trade = 10;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.quackery = 60;
			TWPro.twpro_setBonus.set_quackery[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[4] = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes.dexterity = 4;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.endurance = 15;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.trade = 15;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.quackery = 90;
			TWPro.twpro_setBonus.set_quackery[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[5] = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes.dexterity = 6;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[6] = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes.dexterity = 9;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.tough = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.reflex = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.aim = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.shot = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[6].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer = [];
			TWPro.twpro_setBonus.set_dancer[2] = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[2].jobBonus.all = 10;
			TWPro.twpro_setBonus.set_dancer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[3] = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes.charisma = 5;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[3].jobBonus.all = 25;
			TWPro.twpro_setBonus.set_dancer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[4] = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes.charisma = 9;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.finger_dexterity = 10;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[4].jobBonus.all = 45;
			TWPro.twpro_setBonus.set_dancer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[5] = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes.charisma = 11;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.endurance = 6;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.finger_dexterity = 12;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_dancer[5].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_dancer[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman = [];
			TWPro.twpro_setBonus.set_gentleman[2] = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus.all = 5;
			TWPro.twpro_setBonus.set_gentleman[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3] = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes.charisma = 3;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus.all = 15;
			TWPro.twpro_setBonus.set_gentleman[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4] = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes.charisma = 6;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus.all = 30;
			TWPro.twpro_setBonus.set_gentleman[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5] = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes.charisma = 10;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_gentleman[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_sleeper = [];
			TWPro.twpro_setBonus.set_sleeper[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set = [];
			TWPro.twpro_setBonus.season_set[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
		}
		TWPro.twpro_invHash = '';
		TWPro.twpro_itemStorage = {};
		while (TWPro.twpro_active) {
			//alert('// Original AjaxWindow.show:\n'+AjaxWindow.show.toString());
			//alert('// Original Bag.getInstance().add:\n'+Bag.getInstance().add.toString());
			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// Original ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}
			var twpro_matchtest;
			if (AjaxWindow.show.toString().search(/evalJS/) == -1) {
				if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/eval\(data\.js\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
				eval('AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/eval\(data\.js\);/, 'TWPro.twpro_injectionSwitch(extendeName,\'js\',data,\'js\');eval(data.js);TWPro.twpro_injectionSwitch(extendeName,\'after\',data,null);'));
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
			}
			else { if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/this\.evalJS\(\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
				eval('AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/this\.evalJS\(\);/, 'this.twpro_extendeName=extendeName;this.evalJS();'));
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
				//alert('// Original Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
				if (Ajax.prototype.evalJS.toString().search(/eval\(this\.jsContent\);/) == -1) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString());
				eval('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString().replace(/eval\(this\.jsContent\);/, 'TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'js\',this,\'jsContent\');eval(this.jsContent);TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'after\',this,null);'));
				//alert('// TW Pro Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
			}
			WEvent.register('inventory_add', {
				exec: function(data){data=typeof data=='string'?Json.evaluate(data[0]):data[0];setTimeout(TWPro.twpro_changeItem, 0, {inv_id:data.inv_id})}
			});
			WEvent.register('inventory_remove', {
				exec: function(inv_id){setTimeout(TWPro.twpro_changeItem, 0, {inv_id:inv_id,deleted:1})}
			});
			// Wear.add() removed, Wear.uncarry() -> WEvent handles it now
			// Wear.uncarry() removed, WEvent handles it now
			if (Bag.getInstance().add.toString().search(/}, *('*)over/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			twpro_matchtest = Bag.getInstance().add.toString().match(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g);
			if (twpro_matchtest == null || twpro_matchtest.length != 3) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('Bag.getInstance().add = ' + Bag.getInstance().add.toString());
			// removed TWPro.changeItem() from Bag.getInstance().add() because WEvent handles it now
			eval('Bag.getInstance().add = ' + Bag.getInstance().add.toString().replace(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g, '(TWPro.twpro_activeJob())?($1$1):($1wear_$1+item.get_type()+$1_highlight$1)'));
			// Bag.getInstance().carry removed, WEvent handles it now
			if (ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString());
			eval('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/, 'xhtml+=TWPro.twpro_popup(item);xhtml+=$1<span class=$2"item_popup_trader_price'));
			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// TW Pro ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}
			break;
		}
		TWPro.twpro_world = location.hostname.match(/^[^.]+/)[0];
		var twpro_support = document.createElement('div');
		twpro_support.id = 'twpro_support';
		twpro_support.style.cssText = 'position:absolute; color:#656565; font-size:10px; margin-left:2px; z-index:2';
		var twpro_supportLink = document.createElement('a');
		twpro_supportLink.id = 'twpro_supportLink';
		twpro_supportLink.href = 'http://userscripts.org/scripts/show/75621';
		twpro_supportLink.target = '_blank';
		twpro_supportLink.appendChild(document.createTextNode(TWPro.lang.WEBSITE));
		var twpro_supportAuthor = document.createElement('a');
		twpro_supportAuthor.id = 'twpro_supportAuthor';
		if (TWPro.twpro_getAuthor()) {
			twpro_supportAuthor.href = 'javascript:AjaxWindow.show(\'profile\',{char_id:9733},\'9733\');';
		}
		else {
			twpro_supportAuthor.href = 'http://forum.the-west.es/member.php?u=7036';
			twpro_supportAuthor.target = '_blank';
		}
		twpro_supportAuthor.appendChild(document.createTextNode("Sandevil"));
		twpro_support.appendChild(document.createTextNode("TW Pro: "));
		twpro_support.appendChild(twpro_supportLink);
		twpro_support.appendChild(document.createTextNode(' '+TWPro.lang.AUTHOR+': '));
		twpro_support.appendChild(twpro_supportAuthor);
		var translator = TWPro.lang.info;
		if(translator && translator.length){
			var twpro_translatorLink = document.createElement('a');
			twpro_translatorLink.appendChild(document.createTextNode(translator[0]));
			if(translator.length > 1){
				if(translator.length > 3 && translator[3].indexOf('.'+location.host.match(/\d+\./)) != -1){
					twpro_translatorLink.href = 'javascript:AjaxWindow.show("profile",{char_id:'+translator[2]+'},"'+translator[2]+'");';
				}
				else{
					twpro_translatorLink.href = translator[1];
					twpro_translatorLink.target = '_blank';
				}
			}
			twpro_support.appendChild(document.createTextNode(" "+TWPro.lang.TRANSLATOR+": "));
			twpro_support.appendChild(twpro_translatorLink);
		}
		if (!TWPro.twpro_active) {
			twpro_support.appendChild(document.createTextNode(" ("+TWPro.lang.TWPRO_DISABLED+")"));
		}
		var ib = document.getElementById('main_footnotes');
		ib.insertBefore(twpro_support, ib.firstChild);
		if (TWPro.twpro_failureInject) {
			TWPro.twpro_throwFailure();
		}
	}


	function twpro_preference(pref, enabledValue){
		if(!(pref in TWPro.prefs)) return false;
		var prefVal = TWPro.prefs[pref];
		if(typeof enabledValue == 'undefined'){
			if(typeof prefVal != 'number') return prefVal;
			return TWPro.prefNumber & prefVal;
		}
		if(typeof prefVal != 'number'){
			document.cookie = 'twpro_'+pref+'='+enabledValue+'; max-age=5184000';
			return enabledValue;
		}
		if(enabledValue) TWPro.prefNumber |= prefVal;
		else TWPro.prefNumber = (TWPro.prefNumber | prefVal) - prefVal;
		document.cookie = 'twpro_prefs='+TWPro.prefNumber+'; max-age=5184000';
		return enabledValue;
	}

	function twpro_throwFailure() {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_failure = true;
		for (var twpro_i = 0; twpro_i < TWPro.twpro_failureRollback.length; twpro_i++) {
			eval(TWPro.twpro_failureRollback[twpro_i]);
		}
	}

	function twpro_injectionSwitch(twpro_extendeName, twpro_injectionType, twpro_data, twpro_jsversion) {
		if (TWPro.twpro_failure) return;
		if (!twpro_extendeName) {
			//alert('Mist');
			return;
		} else
		//alert(twpro_extendeName+"\n\n"+twpro_injectionType+"\n\n"+twpro_data[twpro_jsversion]);
		//twpro_extendeName
		switch (twpro_injectionType) {
		case 'page':
			{
				if (twpro_extendeName == 'inventory') {
					TWPro.twpro_insertList(twpro_data);
				}
				else if(twpro_extendeName.substr(0, 4) == 'job_' || twpro_extendeName.substr(0, 15) == 'cityhall_build_'){
					twpro_data.page = twpro_data.page.replace(/(value="7200")( label="2 .+?")?>2 /, '$1$2 selected="selected">2 ');
				}
				else if(twpro_extendeName.substr(0, 13) == 'reports_show_'){
					twpro_data.page = convertduelreport('window_'+twpro_extendeName, twpro_data.page);
				} else if(twpro_extendeName.substr(0,15) == 'building_saloon' ){
	 			 var twpro_advice_elementid="window_"+twpro_extendeName;
				  var twpro_advice_elementin=$(twpro_advice_elementid);
					if (Character.name == 'William Manney' || Character.name == 'Sandevil' || Character.name == 'Belgo' || Character.name == 'Manolkin' || Character.name == 'Coprofagia'  || Character.name == 'cliff hamett' || Character.name == 'walkerutebo' || Character.name == 'igmu' || Character.name == 'henryque' || Character.name == 'Ambrosio II') {
	 				 twpro_data.page = makeadvicemessage(twpro_advice_elementin, twpro_data.page);
					}
    			       }
				break;
			}
		case 'js':
			{

				if ((twpro_extendeName == 'inventory') || (twpro_extendeName.substr(0, 15) == 'building_tailor') || (twpro_extendeName.substr(0, 17) == 'building_gunsmith') || (twpro_extendeName.substr(0, 16) == 'building_general')) {
					TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
				}
				if(twpro_extendeName.substr(0, 7) == 'profile'){
					try{
						var who = twpro_data.response.text.match(/messages', {addressee:'([^']+)'}/);
						if(who) who = who[1];
						else{
							who = $('window_'+twpro_extendeName).getElement('.char_name').innerHTML.replace(/^\s+/, '').replace(/ \([^)]+\)$/, '');
						}
						if(who) (new Ajax('/game.php?window=ranking&mode=ajax_duels',
						{
							data: {
								type: 'duels',
								page: 0,
								skill: 0,
								search: who,
								rank: 0,
								action: 'search'
							},
							method: 'post',
							onComplete: function(resp){
								if(resp){
									var re=new RegExp("'"+twpro_extendeName.substr(8)+"'\\);\\\\\">[^<]+<\\\\\\/a><\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>\\d+<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(-?\\d+)<"), d = resp.match(re);
									if(d){
											var tr = document.createElement('tr'),
												td = document.createElement('td');
											td.colSpan = '2';
											td.appendChild(document.createTextNode('Gana: '+d[1]+' - Pierde: '+d[2]+' - Dif.: '+d[3]));
											tr.appendChild(td);
											var rp = $('window_'+twpro_extendeName).getElement('.rank').parentNode;
											rp.nextSibling.nextSibling.cells[0].style.padding = '0';
											rp.parentNode.insertBefore(tr, rp.nextSibling);
											rp.parentNode.parentNode.style.borderCollapse = 'collapse';
									}
								}
							}
						})).request();
					}
					catch(e){}
				}
				break;
			}
		case 'after':
			{

				if (twpro_extendeName == 'inventory') {
					TWPro.twpro_showList();
				} else if(twpro_extendeName.substr(0,15) == 'fort_battlepage' ){
	 			 var twpro_fort_elementid="window_"+twpro_extendeName;
				  var twpro_fort_elementin=$(twpro_fort_elementid);
	 				 makefortmessage(twpro_fort_elementin);
    			 } 	else if (twpro_extendeName == 'messages') {
					document.getElementById('tab_write').firstChild.style.width = '610px';
					var messagebox = document.getElementById('write_table');
					messagebox.parentNode.style.cssText = 'overflow: auto; height: 397px; width: 595px;';
					messagebox.style.width = '575px';
					messagebox = messagebox.getElementById('text');
					insertbbcodesfunc(messagebox, false);
				}
				else if(twpro_extendeName.substr(0, 15) == 'building_tailor' || twpro_extendeName.substr(0, 17) == 'building_gunsmith' || twpro_extendeName.substr(0, 16) == 'building_general'){
					try{
						var ins = $('window_'+twpro_extendeName+'_content').getElement('#own_inv_div h2'),
							stu = $('window_'+twpro_extendeName+'_content').getElements('.own_inv .bag_item'),
							but = document.createElement('button'),
							bas = document.createElement('input');
						but.style.cssText = 'font-size:small;float:right';
						bas.style.cssText = 'bottom:25px;float:right;font-size:small;font-weight:bold;right:3px;opacity:.7;overflow:hidden;position:relative;z-index:2;text-align:center;width:18px;height:16px;';
						bas.type = 'text';
						bas.className = 'lkn_shopsell';
						but.innerHTML = TWPro.lang.MULTISEL;
						but.onclick = function(){
							but.disabled = true;
							for(var i=0, wat, count; i<stu.length; i++){
								wat = bas.cloneNode(false);
								if(!stu[i].getElementsByTagName('p').length){
									wat.readonly = 'readonly';
									wat.onclick = function(){
										this.value = this.value == 1 ? '' : 1;
									};
								}
								else{
									wat.onclick = function(){
										var all = this.parentNode.getElementsByTagName('p')[0].innerHTML;
										this.value = this.value == all ? '' : all;
										this.select();
									};
									wat.maxLength = 2;
									wat.onblur = function(){
										var n = Math.max(parseInt(this.value, 10) || 0, 0);
										n = Math.min(n, this.parentNode.getElementsByTagName('p')[0].innerHTML);
										this.value = n == '0' ? '' : n;
									};
								}
								stu[i].appendChild(wat);
							}
							but.innerHTML = TWPro.lang.SELL;
							but.onclick = function(){
								but.disabled = true;
								var sellList = [], building = twpro_extendeName.match(/building_[^_]+/)+'',
								baseUrl='game.php?window='+building+'&action=sell&h='+h, town_id=twpro_extendeName.match(/\d+/);
								for(var i=0, n; i<stu.length; i++){
									if((n=1*stu[i].getElement('.lkn_shopsell').value)){
										sellList.push([stu[i].id.substr(5), n]);
									}
								}
								if(!sellList.length){
									alert(TWPro.lang.NONESELECTED);
									but.disabled = false;
								}
								else if(confirm(TWPro.lang.CONFIRMSELL.replace(/%1/g, sellList.length))){
									var that = this;
									this.innerHTML = TWPro.lang.SELLING + ' (0/'+sellList.length+')';
									var sold = 0, errors = [];
									function sellStuff(inv_id, count){
										(new Ajax(baseUrl, {
											method: 'post',
											data: {
												inv_id: inv_id,
												town_id: town_id,
												count: count
											},
											onComplete: function(data){
												sold++;
												that.innerHTML = TWPro.lang.SELLING + ' ('+sold+'/'+sellList.length+')';
												data = Json.evaluate(data);
												if(data.error[0]){
													errors.push(data.error[1]);
												}
												else{
													Character.set_money(data.money);
													WEvent.trigger('inventory_remove', [inv_id]);
												}
												if(sold == sellList.length){
													that.innerHTML = TWPro.lang.SELL;
													that.disabled = false;
													new HumanMessage(TWPro.lang.SALEDONE, {type:'success'});
													if(errors.length){
														alert('Sale errors:\n'+errors.join('\n'));
													}
													AjaxWindow.show(building, {town_id:town_id}, town_id);
												}
											}.bind(this)
										})).request();
									}
									for(var i=0; i<sellList.length; i++){
										sellStuff(sellList[i][0], sellList[i][1]);
									}
								}
								else{
									but.disabled = false;
								}
							};
							but.disabled = false;
						};
						ins.parentNode.insertBefore(but, ins);
					}
					catch(e){}
				}
				break;
			}
		}
	}

	function twpro_reportAccess(exportIt){
		var rep = document.getElementById('report_table').rows, i, inp,
			level = TWPro.twpro_preference('reportaccess'),
			accessImage = ReportPublish.publishData[level].imagePath,
			edit = [];
		for(i=1; i<rep.length-1; i++){
			if((inp=rep[i].getElementsByTagName('input')[0]) && inp.name == 'reports' && inp.checked){
				edit.push(inp.value);
			}
		}//ReportPublish.publishData
		for(i=0; i<edit.length; i++){
			if(document.getElementById('reportList_publishMode_'+edit[i]).getElementsByTagName('img')[0].src != accessImage){
				
			}
		}
	}

	function twpro_getAuthor() {
		//if(TWPro.twpro_failure) return false;
		switch (TWPro.twpro_world) {
		case 'de1':
		case 'de2':
		case 'de3':
		case 'de4':
		case 'de5':
		case 'de6':
			return true;
		}
		return false;
	}

	function twpro_activeJob() {
		if (TWPro.twpro_failure) return false;
		return TWPro.twpro_calculated && document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex != 0;
	}

	function twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion) {
		//alert('2: '+twpro_extendeName);
		if (TWPro.twpro_failure) return;
		if (twpro_extendeName == 'inventory') {
			if (twpro_data[twpro_jsversion].search(/wear_content\[i\]\);(\s*)\}/) == -1) {
				//alert('1');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/bag_content\[i\]\);(\s*)\}/) == -1) {
				//alert('2');
				TWPro.twpro_throwFailure();
				return;
			}

			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/wear_content\[i\]\);(\s*)\}/, 'wear_content[i]);$1};TWPro.twpro_initializeItems(\'wear\',null);').replace(/bag_content\[i\]\);(\s*)\}/, 'bag_content[i]);$1};TWPro.twpro_initializeItems(\'bag\',null);');
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
		else { if (twpro_data[twpro_jsversion].search(/var trader_inv/) == -1) {
				//alert('3');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/trader_inv\[i\]\);(\s*)\}/) == -1 && twpro_data[twpro_jsversion].search(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/) == -1) {
				//alert('4');
				TWPro.twpro_throwFailure();
				return;
			}
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace('var trader_inv', 'TWPro.twpro_initializeItems(\'own\',playerInventory);var trader_inv').replace(/trader_inv\[i\]\);(\s*)\}/, 'trader_inv[i]);$1};TWPro.twpro_initializeItems(\'trader\',traderInventory);').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/, 'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
	}

	// wird beim Erstellen eines Popups ausgefuehrt, stellt Code fuer diesen zusammen
	function twpro_popup(twpro_item) {
		if (TWPro.twpro_failure) return '';
		var twpro_xhtml = '';
		if (TWPro.twpro_calculated && twpro_item.twpro_place) {
			if ((twpro_item.twpro_place == 'wear') || (twpro_item.twpro_place == 'bag')) {
				if (document.getElementById("twpro_jobList") && (document.getElementById("twpro_jobList").selectedIndex != 0)) {
					var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					if (twpro_selectedJob >= 0) {
						var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
						if (twpro_item.twpro_bonus == undefined) {
							TWPro.twpro_prepareItem(twpro_item);
							if (twpro_item.twpro_bonus) {
								for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
									twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
								}
							}
						}
						if (twpro_item.twpro_bonus) {
							var twpro_aktplus = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
							if (twpro_aktplus > 0) {
								twpro_xhtml += '<span class="item_popup_bonus">+'+
								twpro_aktplus + ' ' + twpro_job.name+
								'<br /></span><br />';
							}
						}
					}
				}
			}
			if (twpro_item.twpro_place == 'trader') {
				if (twpro_item.twpro_bonus == undefined) {
					TWPro.twpro_prepareItem(twpro_item);
					if (twpro_item.twpro_bonus) {
						for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
							twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
						}
					}
				}
				if (twpro_item.twpro_bonus) {
					var twpro_j = 0;
					var twpro_plus = [];
					var twpro_better;
					for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
						twpro_better = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] - TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type];
						if (twpro_better > 0) {
							twpro_plus.push(twpro_better + ' ' + TWPro.twpro_jobs[twpro_i].name);
							twpro_j++;
						}
					}
					if (twpro_j > 0) {
						twpro_plus.sort(TWPro.twpro_sortPlus);
						twpro_xhtml += '<span class="item_popup_bonus"><table><tr><td>';
						var re_jobname = TWPro.twpro_jobs[parseInt(document.getElementById('twpro_jobList')[document.getElementById('twpro_jobList').selectedIndex].value)] || '';
						if(re_jobname) re_jobname = re_jobname.name;
						var bool_j = twpro_j > 30 && twpro_j <= 33;
						for (var twpro_i = 0; (twpro_i < twpro_plus.length) && (twpro_i < 33); twpro_i++) {
							twpro_xhtml += '<span style="white-space:nowrap;';
							if (TWPro.twpro_activeJob() && (twpro_plus[twpro_i].indexOf(re_jobname) != -1)) {
								twpro_xhtml += 'color:rgb(78, 55, 7);';
							}
							twpro_xhtml += '">+' + twpro_plus[twpro_i] + '</span><br />';
							if ((twpro_j <= 30 && twpro_i == 14) || (bool_j && (twpro_i == (Math.round(twpro_j / 2) - 1))) || (twpro_j > 33 && twpro_i == 16)) {
								twpro_xhtml += '</td><td>';
							}
						}
						if (twpro_i < twpro_plus.length) {
							twpro_xhtml += '...';
						}
						twpro_xhtml += '</td></tr></table></span><br />';
					}
				}
			}
		}
		return twpro_xhtml;
	}

	// fuegt Auswahlliste in das Inventar ein
	function twpro_insertList(twpro_data) {
		if (TWPro.twpro_failure) return;
		if (!TWPro.twpro_jobsort) {
			TWPro.twpro_jobsort = 'name';
		}
		TWPro.twpro_bag = {};
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_bag.twpro_countType = {};
		TWPro.twpro_bag.twpro_types = [];
		TWPro.twpro_setItems = {};
		TWPro.twpro_setItemsCount = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		TWPro.twpro_invHashTest = [];
		for (var twpro_type in Character.itemLevelRequirementDecrease) {
			if ((twpro_type != 'all') && (!isNaN(Character.itemLevelRequirementDecrease[twpro_type]))) {
				TWPro.twpro_bag.twpro_types.push(twpro_type);
				TWPro.twpro_bag.twpro_countType[twpro_type] = 0;
			}
		}

var sortButtonImg = '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'
var sortButtonImg2 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOMvNkbENwCAMBM/p6BiNcRiTEVKwh9O4QAEiQ1LkJUvokc/yG/6mAGRAgWrvsNJ8AgVIVsU8FyRbQ2y8aF72AKpNvSvZ31DHlwHOVlDvCqMQtantMz5CxAnWWY8sZDSEyGLQHUQ2rqWbG0wh73QBwKsfIwV17B4AAAAASUVORK5CYII%3D'

		//alert(twpro_data.page);
		var twpro_xhtml = '<table id="twpro_jobDisplay" style="display: inline;position: absolute; visibility:hidden; margin-left:-4px;"><tr><td>';
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			var name = TWPro.twpro_sorts[i];
			twpro_xhtml += '<a href="javascript:" onmouseup="TWPro.twpro_sortList(\''+name+'\')"><img id="twpro_jobsort_link_'+name+'" alt="" src="images/transparent.png" width="20" height="17" style="background-image:url(data:image/png;base64,'+sortButtonImg+');background-position:-'+(i*20)+'px '+(TWPro.twpro_jobsort==name?0:-17)+'px" onmouseover="this.style.backgroundPosition=\'-'+(i*20)+'px 0\'" onmouseout="if(TWPro.twpro_jobsort!=\''+name+'\')this.style.backgroundPosition=\'-'+(i*20)+'px -17px\'"/></a>';
		}
		twpro_xhtml += '<span id="twpro_aktuelleap" style="position:absolute;rigth:5px;top:-30px;visibility:hidden;"><span id="twpro_aktuelleapvalue" style="border-style:solid;border-width:1px;padding:2px;"></span> </span></td></tr><tr><td>';
		twpro_xhtml += ' <input id="twpro_clothingfilter" type="checkbox"' + (TWPro.twpro_preference('dispJobClothingOnly')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'dispJobClothingOnly\',this.checked);TWPro.twpro_bagVis()" />';
		twpro_xhtml += '<select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:120px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">'+TWPro.lang.STARTCALC+'</option></select>';
				twpro_xhtml += '</td></tr></table>';
		//alert(twpro_xhtml);
		twpro_data.page = twpro_data.page.replace(/<h2(.*)">(.+)<\/h2>/, '<h2$1white-space: nowrap;"><span id="twpro_bag" style="cursor: default;">$2</span>' + twpro_xhtml + '</h2>');
		// settings for job rankings
		twpro_xhtml = '<div style="left:20px;position:absolute;margin-top:390px;">'+TWPro.lang.JOBRANKSETTINGS+': ';
		var imgorder = [20, 40, 60, 100], j=0;
		for(var i in TWPro.multipliers){
			twpro_xhtml += '<img src="images/transparent.png" alt="" style="background-image:url(data:image/png;base64,'+sortButtonImg+');background-position:-'+imgorder[j++]+'px 0;margin-left:5px" width="20" height="17" /><input type="text" style="width:30px" value="'+TWPro.multipliers[i]+'" onchange="TWPro.twpro_handleJobrank(this, \''+i+'\')" />';
		}
		twpro_xhtml += '</div>';
		// search inventory
		TWPro.searchInventory = {timer:null};
		(new Image()).src = 'data:image/gif;base64,R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQEAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'
		twpro_xhtml += '<div style="position:absolute;margin-top:390px;left:520px"><label style="position:absolute;top:4px;left:21px;font-style:italic;color:#636;cursor:pointer" for="twpro_searchinventory">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="width:150px;background:#fff url(data:image/png;base64,'+sortButtonImg2+') no-repeat scroll 0 0;padding:0 2px 0 19px" id="twpro_searchinventory" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchInventory(event.keyCode==13)" /><span id="twpro_search_help" style="font-weight:bold;color:#191970;cursor:help;background:#D4C7B0;width:20px;height:17px">?</span></div>';
		twpro_xhtml += '<input id="twpro_jobsort_filter" type="checkbox"' + (TWPro.twpro_preference('Hide_unjobs')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'Hide_unjobs\',this.checked);TWPro.twpro_clickfilterList()" style="position:absolute;margin-top:393px;left:495px"/>';
		twpro_data.page += twpro_xhtml;
	}

	function twpro_handleJobrank(field, type){
		var val = parseFloat(field.value);
		if(isNaN(val)) val = 1;
		field.value = val;
		TWPro.multipliers[type] = 1*val;
		var multipliers = [];
		for(var i in TWPro.multipliers){
			multipliers.push(TWPro.multipliers[i]);
		}
		TWPro.twpro_preference('multipliers', multipliers.join(':'));
		if(TWPro.twpro_jobsort == 'comb'){
			TWPro.twpro_sortList('comb');
		}
	}

	function twpro_searchInventory(searchNow, updateItemId){
		if(!TWPro.searchInventory.cache && updateItemId) return;
		if(!searchNow){
			clearTimeout(TWPro.searchInventory.timer);
			TWPro.searchInventory.timer = setTimeout(TWPro.twpro_searchInventory, 500, true, updateItemId);
			return;
		}
		clearTimeout(TWPro.searchInventory.timer);
		TWPro.searchInventory.timer = null;
		var search = document.getElementById('twpro_searchinventory');
		if(!search) return;
		var cache, i, item,
			invent = document.getElementById('bag'),
			reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
			rePopupType = /"item_popup_type">([^<]+)<\/span>/,
			rePopupBonusAttr = /"item_popup_bonus_attr">([^<]+)<\/span>/,
			rePopupBonusSkill = /"item_popup_bonus_skill">([^<]+)<\/span>/,
			unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
			searchTerms = unjunk(search.value), isRegExp = false,
			anyresult;
		if(/[*?]/.test(searchTerms)){
			searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
			isRegExp = true;
		}
		var loadingButtonImg='data:image/gif;base64,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'
		search.style.backgroundImage = 'url('+loadingButtonImg+')';
		var processbagItem = function(iid, bag_item){
				if(bag_item){
					bag_obj = bag_item.obj;
					cache[iid] = unjunk(bag_obj.name);
					if((wat = bag_obj.description)){
						cache[iid] += '\t' + unjunk(wat);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
						cache[iid] += '\t' + unjunk(wat[1]);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_obj.set)){
						cache[iid] += '\t' + unjunk(wat.name);
					}
				}
				if((item=invent.getElementById('item_'+iid))){
					disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
					// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
					disp = disp ? '' : 'twpro_search_hide';
					item.className = 'bag_item '+disp;
				}
			},
			bag_items = Bag.getInstance().items, i, disp
		if(!(cache = TWPro.searchInventory.cache)){
			cache = TWPro.searchInventory.cache = {};
			for(i in bag_items){
				processbagItem(i, bag_items[i]);
			}
		}
		else{
			for(i in cache){
				processbagItem(i);
			}
			if(bag_items[updateItemId]){
				processbagItem(updateItemId, bag_items[updateItemId]);
			}
		}
		TWPro.twpro_bagVis();
		search.style.backgroundImage = 'url(data:image/png;base64,'+sortButtonImg2+')';
	}


	function twpro_bagVis(){
		var bag_items = document.getElementById('bag').getElementsByTagName('div'),
			i, hide = TWPro.twpro_preference('dispJobClothingOnly') && document.getElementById('twpro_jobList').selectedIndex != 0,
			anyresult,
			nores = document.getElementById('twpro_nosearchresult');;
		for(i=0; i<bag_items.length; i++){
			if(bag_items[i].id.substr(0, 5) != 'item_') continue;
			if(bag_items[i].className.indexOf('twpro_search_hide') != -1){
				continue;
			}
			if(hide && bag_items[i].firstChild.className == ''){
				bag_items[i].style.display = 'none';
			}
			else{
				bag_items[i].style.display = '';
				anyresult = 1;
			}
		}
		if(!anyresult){
			if(!nores){
				nores = document.createElement('div');
				nores.id = 'twpro_nosearchresult';
				document.getElementById('bag').appendChild(nores);
			}
			nores.innerHTML = TWPro.lang.NOSEARCHRESULT.replace('%2', '<br /><a href="javascript:" onclick="document.getElementById(\'twpro_searchinventory\').value=\'\';TWPro.twpro_searchInventory(true)">').replace('%3', '</a>').replace('%1', '<em>'+document.getElementById('twpro_searchinventory').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
		}
		else if(nores){
			nores.parentNode.removeChild(nores);
		}
	}

	function twpro_sortList(twpro_jobSortItem) {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_jobsort = twpro_jobSortItem;
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			TWPro.twpro_jobSortMark(TWPro.twpro_sorts[i], false);
		}
		TWPro.twpro_jobSortMark(twpro_jobSortItem, true);
		if (TWPro.twpro_calculated && document.getElementById("twpro_jobList")) {
			if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
				document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
				var twpro_selectedJobName = 'none';
				if (document.getElementById("twpro_jobList").selectedIndex != 0) {
					var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					if (twpro_selectedJob >= 0) {
						twpro_selectedJobName = TWPro.twpro_jobs[twpro_selectedJob].shortName;
					}
				}
				document.getElementById("twpro_jobList").selectedIndex = 0;
				while (document.getElementById("twpro_jobList").lastChild.id != 'twpro_wait') {
					document.getElementById("twpro_jobList").removeChild(document.getElementById("twpro_jobList").lastChild);
				}
				TWPro.twpro_sortJobs();
				TWPro.twpro_insertListItems();
				for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
					TWPro.twpro_jobs[twpro_i].twpro_jobid = twpro_i;
				}
				for (var twpro_i = 0; twpro_i < document.getElementById("twpro_jobList").options.length; twpro_i++) {
					var twpro_jobTest = parseInt(document.getElementById("twpro_jobList").options[twpro_i].value);
					if (twpro_jobTest >= 0) {
						if (twpro_selectedJobName == TWPro.twpro_jobs[twpro_jobTest].shortName) {
							document.getElementById("twpro_jobList").selectedIndex = twpro_i;
						}
					}
				}
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
			}
			else {
				TWPro.twpro_sortJobs();
			}
		}
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).blur();
	}

	function twpro_jobSortMark(twpro_jobSortItem, twpro_jobSortValue) {
		if (TWPro.twpro_failure) return;
		var twpro_bgposition = '';
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			if(TWPro.twpro_sorts[i] == twpro_jobSortItem){
				twpro_bgposition = (20*-i)+'px ';
				break;
			}
		}
		twpro_bgposition += twpro_jobSortValue ? '0px' : '-17px';
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).style.backgroundPosition = twpro_bgposition;
	}

	// macht die Liste sichtbar
	function twpro_showList() {
		if (TWPro.twpro_failure) return;
		$('twpro_jobsort_link_name').addMousePopup(new MousePopup(TWPro.lang.SORTBYNAME, 100, {opacity:0.95}));
		$('twpro_jobsort_link_erfahrung').addMousePopup(new MousePopup(TWPro.lang.SORTBYXP, 100, {opacity:0.95}));
		$('twpro_jobsort_link_lohn').addMousePopup(new MousePopup(TWPro.lang.SORTBYWAGES, 100, {opacity:0.95}));
		$('twpro_jobsort_link_glueck').addMousePopup(new MousePopup(TWPro.lang.SORTBYLUCK, 100, {opacity:0.95}));
		$('twpro_jobsort_link_comb').addMousePopup(new MousePopup(TWPro.lang.SORTBYCOMB, 100, {opacity:0.95}));
		$('twpro_jobsort_link_gefahr').addMousePopup(new MousePopup(TWPro.lang.SORTBYDANGER, 100, {opacity:0.95}));
		$('twpro_jobsort_link_laborp').addMousePopup(new MousePopup(TWPro.lang.SORTBYLABORP, 100, {opacity:0.95}));
		$('twpro_jobsort_filter').addMousePopup(new MousePopup(TWPro.lang.FILTERJOBS, 100, {opacity:0.95}));
		$('twpro_clothingfilter').addMousePopup(new MousePopup(TWPro.lang.FILTERCLOTHING, 100, {opacity:0.95}));
		$('twpro_search_help').addMousePopup(new MousePopup(TWPro.lang.SEARCHHELP, 100, {opacity:0.95}));
		TWPro.twpro_bag.twpro_bagPopup = new MousePopup('', 100, {opacity:0.95});
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh = function () {
			this.setXHTML(TWPro.twpro_getBagPopup());
		};
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		$('twpro_bag').addMousePopup(TWPro.twpro_bag.twpro_bagPopup);

		//TWPro.twpro_invHash = [];
		if (TWPro.twpro_invHash == TWPro.twpro_invHashTest.join(',')) {
			for (var twpro_wear in Wear.wear) {
				TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
				if (Wear.wear[twpro_wear].obj.twpro_bonus) {
					Wear.wear[twpro_wear].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
					//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
					//        {
					//          Wear.wear[twpro_wear].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
					//        }
				}
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
				if (bagitems[twpro_bag].obj.twpro_bonus) {
					bagitems[twpro_bag].obj.twpro_jobbonus = TWPro.twpro_itemStorage[bagitems[twpro_bag].obj.item_id].twpro_jobbonus;
					//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
					//        {
					//          Bag.getInstance().items[twpro_bag].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Bag.getInstance().items[twpro_bag].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
					//        }
				}
			}
			TWPro.twpro_insertListItems();
			document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
		}
		document.getElementById('twpro_jobDisplay').style.visibility = 'visible';
	}

	function twpro_getBagPopup() {
		if (TWPro.twpro_failure) return '';
		var twpro_xhtml = '';
		twpro_xhtml += '<div class="item_popup">';
		twpro_xhtml += '<span class="item_popup_title">'+TWPro.lang.INVENTSTATS+'</span>';
		twpro_xhtml += '<span class="item_popup_requirement_text">'+TWPro.lang.SELLVALUE+':</span>';
		twpro_xhtml += '<table>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.EQUIPMENT+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceWear + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.BAG+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceBag + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+'&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceItems + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_priceYields + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + parseInt(TWPro.twpro_bag.twpro_priceWear + TWPro.twpro_bag.twpro_priceBag) + ' $</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '<DIV class="popup_yield_divider"></DIV><span class="item_popup_requirement_text">'+TWPro.lang.QUANTITIES+'</span>';
		twpro_xhtml += '<table>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.HATS+'&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_countType['head'] + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.NECKLACES+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_countType['neck'] + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.WEAPONS+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_countType['right_arm'] + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.CLOTHING+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_countType['body'] + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.SHOES+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_countType['foot'] + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.ANIMAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_countType['animal'] + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.NONYIELDS+':&nbsp;&nbsp;</td>';
		var twpro_all = TWPro.twpro_bag.twpro_countType['head'] + TWPro.twpro_bag.twpro_countType['neck'] + TWPro.twpro_bag.twpro_countType['right_arm'] + TWPro.twpro_bag.twpro_countType['body'] + TWPro.twpro_bag.twpro_countType['foot'] + TWPro.twpro_bag.twpro_countType['animal'];
		twpro_xhtml += '<td class="item_popup_trader_price">' + twpro_all + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.YIELDS+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + TWPro.twpro_bag.twpro_countType['yield'] + '</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price">' + parseInt(twpro_all + TWPro.twpro_bag.twpro_countType['yield']) + '</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '</div>';
		return twpro_xhtml;
	}

	// wird beim draufklicken auf die Liste ausgefuehrt, stoesst Berechnungen an
	function twpro_clickList() {
		if (TWPro.twpro_failure) return;
		if (document.getElementById('twpro_wait').text != TWPro.lang.CALCJOB && document.getElementById('twpro_wait').text != TWPro.lang.CHOOSEJOB) {
			document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
			window.setTimeout(TWPro.twpro_updateList, 0);
		}
	}
	function twpro_clickfilterList() {
		if (TWPro.twpro_failure) return;
		document.getElementById('twpro_wait').text = TWPro.lang.LOADING;
		var twpro_wait = document.getElementById('twpro_wait');
		document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+twpro_wait.text+'</option>';
		twpro_clickList();
	}

	

	// stellt alle Jobs zusammen und fuegt einzelne Listenelemente ein
	function twpro_updateList() {
		if (TWPro.twpro_failure) return;
		if (!TWPro.twpro_calculated) {
			var twpro_jobCount = 0;
			for (var twpro_job in JobList) {
				TWPro.twpro_jobs[parseInt(twpro_job)] = JobList[twpro_job];
				TWPro.twpro_jobs[parseInt(twpro_job)].twpro_calculation = TWPro.twpro_jobs[parseInt(twpro_job)].formular.replace(/skills\./g, 'Character.skills.');
				twpro_jobCount++;
			}
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '3 * Character.skills.build + 1 * Character.skills.repair + 1 * Character.skills.leadership',
				'malus': 0,
				'name': TWPro.lang.CONSTRUCTION,
				'shortName': 'construct'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.HEALTH,
				'shortName': 'lifepoints'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.appearance + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGATT,
				'shortName': 'duelshootingatt'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.tactic + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGDEF,
				'shortName': 'duelshootingdef'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.reflex + 1 * Character.skills.tough + 1 * Character.skills.punch',
				'malus': -1,
				'name': TWPro.lang.DUELVIGOR,
				'shortName': 'duelvigor'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.endurance + 1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.FORTATTACK,
				'shortName': 'fortatt'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.hide + 1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.FORTDEFEND,
				'shortName': 'fortdef'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.ride ',
				'malus': -1,
				'name': TWPro.lang.SKILLRIDE,
				'shortName': 'ride'
			};
			twpro_jobCount++;
			TWPro.twpro_sortJobs();
			while (TWPro.twpro_jobs.length > twpro_jobCount) {
				TWPro.twpro_jobs.pop();
			}
		}
		TWPro.twpro_calculateJobs();
		TWPro.twpro_sortJobs();
		TWPro.twpro_insertListItems();
		document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
	}


	function calculateIncoming(tw_incoming, tw_apstmp){
	Incomings = (0.9 * tw_incoming) + 5;
	Incomings = Incomings * pow(tw_apstmp, 0.2);
	 if ( isNaN(Incomings)){ 
	Incomings = 0;
	}
	if (PremiumBoni.endTimes.moneyEnd != null) {
	ActTime= new Date();
	if (ActTime.getTime() < PremiumBoni.endTimes.moneyEnd){
	Incomings = Incomings * 1.5;
	}
	}
	return Incomings;
	}


	function twpro_insertListItems() {
		if (TWPro.twpro_failure) return;
		var twpro_jobList = document.getElementById('twpro_jobList'),
			jobsort = TWPro.twpro_jobsort,
			twpro_jobElement, twpro_apstmp, extra;
		for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
			twpro_apstmp = TWPro.twpro_jobs[twpro_i].twpro_aps;
			var twpro_job = TWPro.twpro_jobs[twpro_i];
      var twpro_aktuelleap = twpro_job.twpro_skill - twpro_job.malus;
      var twpro_setCounter = new Object();
      for(var twpro_wear in Wear.wear)
      {
        if(Wear.wear[twpro_wear].obj.twpro_bonus)
        {
          twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
        }
        if(Wear.wear[twpro_wear].obj.set != null)
        {
          if(twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]==undefined)
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
          }
          else
          {
            twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
          }
        }
      }
      for(var twpro_set in twpro_setCounter)
      {
        if(twpro_setCounter[twpro_set]>=2)
	 {
	  twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
        }
      }
      if((twpro_job.shortName=='construct') && (Character.characterClass=='worker'))
      {
        twpro_aktuelleap = Math.floor(twpro_aktuelleap*1.05);
      }
			twpro_jobElement = document.createElement('option');
			twpro_wages_ap = calculateIncoming(TWPro.twpro_jobValues[twpro_job.shortName].lohn, twpro_apstmp);
			TWPro.twpro_jobValues[twpro_job.shortName].wages =  Math.floor(twpro_wages_ap*2);
			twpro_luck_value_ap = calculateIncoming(TWPro.twpro_jobValues[twpro_job.shortName].glueck, twpro_apstmp);
			TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin = Math.floor(twpro_luck_value_ap*5);
			TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax = Math.floor(twpro_luck_value_ap*15);
			if (twpro_apstmp > 0) {
			TWPro.twpro_jobValues[twpro_job.shortName].experience = TWPro.twpro_jobValues[twpro_job.shortName].erfahrung * 2;
			} else {
			TWPro.twpro_jobValues[twpro_job.shortName].experience = 0;
			}
			if ( jobsort == 'erfahrung' ) {
			if (Character.characterClass=='worker'){
		        TWPro.twpro_jobValues[twpro_job.shortName].experience = Math.floor(TWPro.twpro_jobValues[twpro_job.shortName].experience*1.05);
      			}
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].experience + ' xp';
			
			} else if ( jobsort ==  'lohn' ) { 
			extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].wages + ' $';
			} else if ( jobsort ==  'glueck' ) { 
			extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin + ' $ - ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax + ' $';
			} else {
			extra = '';
			}
			TWPro.twpro_jobValues[twpro_job.shortName].twpro_apstmp = twpro_apstmp;
			twpro_jobElement.value = twpro_i;
			twpro_jobElement.appendChild(document.createTextNode(((TWPro.twpro_jobs[twpro_i].name.length > 25) ? (TWPro.twpro_jobs[twpro_i].name.substr(0, 23) + '...') : (TWPro.twpro_jobs[twpro_i].name)) + ' (' + eval(twpro_apstmp - 1) + ' / '+ eval(twpro_aktuelleap - 1) + ' '+TWPro.lang.LABORP+')'+extra));
			if (twpro_apstmp > 0) {
				if (TWPro.twpro_preference('Hide_unjobs')) {
					twpro_jobElement.style.backgroundColor = 'rgb(207, 195, 166)';
				} else if (twpro_aktuelleap < 0) {
					 twpro_jobElement.style.backgroundColor='rgb(255, 240, 0)';
					} else {
					twpro_jobElement.style.backgroundColor = 'rgb(160, 218, 120)';
				}
				twpro_jobList.appendChild(twpro_jobElement);
			}
			else if (!TWPro.twpro_preference('Hide_unjobs')) {
				twpro_jobElement.style.backgroundColor = 'rgb(232, 150, 120)';
				twpro_jobList.appendChild(twpro_jobElement);
			}

			//   norm rgb(207, 195, 166);
			//
			//
		}
	}

	// bestimmt Sortierreihenfolge der Jobs in der Liste
	function twpro_sortJobs(){
		if (TWPro.twpro_failure) return;
		var sortby = TWPro.twpro_jobsort, jobRank = {},
			twpro_jobValues = TWPro.twpro_jobValues;
		// optimize for job rank
		if(sortby == 'comb'){
			for(var i=0, twpro_job, twpro_jobv; i<TWPro.twpro_jobs.length; i++){
				if(!(twpro_job=TWPro.twpro_jobs[i])) continue;
				twpro_jobv = twpro_jobValues[twpro_job.shortName];
				(twpro_jobv.twpro_apstmp > 0) ? twpro_jobv.twpro_apstmp = twpro_jobv.twpro_apstmp : twpro_jobv.twpro_apstmp = 0; 
				jobRank[twpro_job.shortName] = TWPro.multipliers.xp * twpro_jobv.erfahrung + 
												(TWPro.multipliers.wages * twpro_jobv.lohn + 
												TWPro.multipliers.luck * twpro_jobv.glueck ) * pow(twpro_jobv.twpro_apstmp,0.2) + TWPro.multipliers.danger * (100 - (twpro_jobv.gefahr/(twpro_jobv.twpro_apstmp/8)));
			}
		}
		var sortfunc = function(twpro_a, twpro_b){
			var twpro_a_str = twpro_a.name,
				twpro_b_str = twpro_b.name;
			if(sortby == 'name'){
				return twpro_a_str.localeCompare(twpro_b_str);
			}
			if(sortby == 'comb'){
				return (jobRank[twpro_a.shortName] == jobRank[twpro_b.shortName]) ? twpro_a_str.localeCompare(twpro_b_str) : (jobRank[twpro_b.shortName] - jobRank[twpro_a.shortName]);
			}
			if(sortby == 'erfahrung'){
				return (twpro_jobValues[twpro_a.shortName].experience == twpro_jobValues[twpro_b.shortName].experience) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].experience - twpro_jobValues[twpro_a.shortName].experience);
			} if(sortby == 'lohn'){
				return (twpro_jobValues[twpro_a.shortName].wages == twpro_jobValues[twpro_b.shortName].wages) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].wages - twpro_jobValues[twpro_a.shortName].wages);
			} if(sortby == 'glueck'){
				return (twpro_jobValues[twpro_a.shortName].luckvaluemax == twpro_jobValues[twpro_b.shortName].luckvaluemax) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].luckvaluemax - twpro_jobValues[twpro_a.shortName].luckvaluemax);
			}  else {
				return (twpro_jobValues[twpro_a.shortName][sortby] == twpro_jobValues[twpro_b.shortName][sortby]) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName][sortby] - twpro_jobValues[twpro_a.shortName][sortby]);
			}
		}
		TWPro.twpro_jobs.sort(sortfunc);
		if(sortby == 'danger') TWPro.twpro_jobs.reverse();
	}

	function twpro_sortPlus(twpro_a, twpro_b) {
		if (TWPro.twpro_failure) return 0;
		var twpro_a_num = parseInt(twpro_a.substring(0, twpro_a.search(/ /)));
		var twpro_b_num = parseInt(twpro_b.substring(0, twpro_b.search(/ /)));
		return twpro_b_num - twpro_a_num;
	}

	function twpro_initializeItems(twpro_place, twpro_itemlist) {
		if (TWPro.twpro_failure) return;
		var twpro_i = 0;
		if (twpro_place == 'wear') {
			for (var twpro_wear in Wear.wear) {
				Wear.wear[twpro_wear].obj.twpro_place = twpro_place;
				Wear.wear[twpro_wear].obj.twpro_html = document.getElementById('char_' + Wear.wear[twpro_wear].obj.type);
				TWPro.twpro_bag.twpro_priceWear += Wear.wear[twpro_wear].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[Wear.wear[twpro_wear].obj.type]++;
				if (Wear.wear[twpro_wear].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += Wear.wear[twpro_wear].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += Wear.wear[twpro_wear].obj.sell_price;
				}
				if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id]) {
					TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
					TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
				}
				if (!TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]) {
					TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id] = 1;
				}
			}
		}
		if (twpro_place == 'bag') {
			var twpro_itemcount;
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].obj.twpro_place = twpro_place;
				bagitems[twpro_bag].obj.twpro_html = bagitems[twpro_bag].bag_item;
				if (bagitems[twpro_bag].count_text) {
					twpro_itemcount = parseInt(bagitems[twpro_bag].count_text.firstChild.data);
				}
				else {
					twpro_itemcount = 1;
				}
				TWPro.twpro_bag.twpro_priceBag += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[bagitems[twpro_bag].obj.type] += twpro_itemcount;
				if (bagitems[twpro_bag].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id]) {
					TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
					TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
				}
				if (!TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id]) {
					TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id] = 1;
				}
			}
		}
		else if (twpro_place == 'trader') {
			for (var twpro_obj in twpro_itemlist.items) {
				twpro_itemlist.items[twpro_obj].obj.twpro_place = twpro_place;
				twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
				twpro_itemlist.items[twpro_obj].popup.refresh();
				twpro_i++;
			}
		}
		else if (twpro_place == 'own') {
			for (var twpro_obj in twpro_itemlist.data) {
				twpro_itemlist.data[twpro_obj].twpro_place = twpro_place;
				twpro_i++;
			}
			for (var twpro_bag in twpro_itemlist.bags) {
				for (var twpro_obj in twpro_itemlist.bags[twpro_bag].items) {
					twpro_itemlist.bags[twpro_bag].items[twpro_obj].obj.twpro_html = twpro_itemlist.bags[twpro_bag].items[twpro_obj].bag_item;
				}
			}
		}
	}

	// ermittelt die optimalen Kleidungsstuecke und errechnet die resultierenden Arbeitspunkte
	function twpro_calculateJobs() {
		if (TWPro.twpro_failure) return;
		var twpro_setitembonus;
		var twpro_setitemjobname;
		for (var twpro_wear in Wear.wear) {
			TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
		}
		TWPro.twpro_calculated = false;
		TWPro.twpro_setItemsCalc = {};
		TWPro.twpro_setItemsEffect = false;
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
		}
		TWPro.twpro_setCount = {};
		for (var twpro_setItemId in TWPro.twpro_setItems) {
			var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
			if (twpro_setItem.twpro_wearable && TWPro.twpro_setItemsCount[twpro_setItem.set.key] >= 2) {
				TWPro.twpro_setItemsCalc[twpro_setItem.type].push(twpro_setItem);
				TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
				TWPro.twpro_setItemsEffect = true;
			}

		}
		if(!TWPro.twpro_re_att){
			TWPro.twpro_re_att = {};
			TWPro.twpro_re_skill = {};
			TWPro.twpro_re_skills = {};
			for(var twpro_attname in Character.skill_names){
				var skill_names = Character.skill_names[twpro_attname];
				TWPro.twpro_re_skills[twpro_attname] = new RegExp(skill_names.join('|'), 'g');
				TWPro.twpro_re_att[twpro_attname] = new RegExp(twpro_attname, 'g');
				for(var i=0; i<skill_names.length; i++){
					TWPro.twpro_re_skill[skill_names[i]] = new RegExp(skill_names[i], 'g');
				}
			}
		}
		var re_char_skills = /Character\.skills\./g;
		for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
			var twpro_job = TWPro.twpro_jobs[twpro_i];
			twpro_job.twpro_jobid = twpro_i;
			twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
			twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/ \+ \d+$/, '').replace(re_char_skills, '');
			twpro_job.twpro_attributes = twpro_job.twpro_skills.replace(re_char_skills, '');
			for (var twpro_attname in Character.skill_names) {
				twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(TWPro.twpro_re_skills[twpro_attname], twpro_attname);
			}
			if (TWPro.twpro_setItemsEffect && !TWPro.twpro_setBonusParsed) {
				for (var twpro_itemSet in TWPro.twpro_setBonus) {
					var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
					for (var twpro_j = 2; twpro_j < twpro_itemSetBouns.length; twpro_j++) {
						twpro_setitembonus = twpro_itemSetBouns[twpro_j];
						twpro_setitemjobname = twpro_job.shortName;
						twpro_setitembonus.parsedBonus[twpro_setitemjobname] = (twpro_job.malus == -1 ? 0 : twpro_setitembonus.jobBonus.all) +
						(!twpro_setitembonus.jobBonus[twpro_setitemjobname] ? 0 : twpro_setitembonus.jobBonus[twpro_setitemjobname]) + TWPro.twpro_testItem(twpro_job, twpro_setitembonus);
					}
				}
			}
			twpro_job.twpro_bestStats = {};
			for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
				twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
			}
			for (var twpro_wear in Wear.wear) {
				TWPro.twpro_compareItem(twpro_job, Wear.wear[twpro_wear].obj);
			}
			for (var twpro_bag in bagitems) {
				TWPro.twpro_compareItem(twpro_job, bagitems[twpro_bag].obj);
			}
			twpro_job.twpro_aps = twpro_job.twpro_skill - Math.max(0, twpro_job.malus);
			for (var twpro_type in twpro_job.twpro_bestStats) {
				twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
			}
			if (TWPro.twpro_setItemsEffect) {
				var twpro_setItem;
				twpro_job.twpro_parsedItemBonus = {};
				twpro_job.twpro_bestCombi = {};
				for (var twpro_type in twpro_job.twpro_bestStats) {
					twpro_job.twpro_bestCombi[twpro_type] = 0;
					for (var twpro_j = 1; twpro_j < TWPro.twpro_setItemsCalc[twpro_type].length; twpro_j++) {
						twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_j];
						twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id] = TWPro.twpro_testItem(twpro_job, twpro_setItem);
					}
				}
				twpro_job.twpro_noSetAps = twpro_job.twpro_aps;
			}
		}
		if (TWPro.twpro_setItemsEffect) {
			TWPro.twpro_calcSets();
		}
		for(var i=0; i<TWPro.twpro_jobs.length; i++){
			var twpro_job = TWPro.twpro_jobs[i],
				n = 1;
			if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
				n = 1.05;
			}
			TWPro.twpro_jobValues[twpro_job.shortName].laborp = twpro_job.twpro_aps = Math.floor(n*twpro_job.twpro_aps);
		}
		TWPro.twpro_setBonusParsed = true;
		TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
		TWPro.twpro_calculated = true;
	}

	function twpro_calcSets() {
		var twpro_testCombi = {};
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			twpro_testCombi[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
		}
		var twpro_setCounter = TWPro.twpro_setCount;
		TWPro.twpro_testnextvalid = [];
		var twpro_testnextvalid = TWPro.twpro_testnextvalid;
		TWPro.twpro_testnextnamen = {};
		var twpro_testnextnamen = TWPro.twpro_testnextnamen;
		for (var twpro_set in twpro_setCounter) {
			twpro_testnextnamen[twpro_set] = twpro_testnextvalid.push(0) - 1;
		}
		var twpro_next = false;
		var twpro_set;
		do {
			for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				var twpro_job = TWPro.twpro_jobs[twpro_i];
				var twpro_testAps = twpro_job.twpro_noSetAps;
				for (var twpro_type in twpro_testCombi) {
					if (twpro_testCombi[twpro_type] != 0) {
						twpro_testAps -= twpro_job.twpro_bestStats[twpro_type];
						var twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_testCombi[twpro_type]];
						twpro_testAps += twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id];
					}
				}
				for (var twpro_set in twpro_setCounter) {
					if (twpro_setCounter[twpro_set] > 0) {
						twpro_testAps += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
					}
				}
				if (twpro_testAps > twpro_job.twpro_aps) {
					twpro_job.twpro_aps = twpro_testAps;
					for (var twpro_type in twpro_testCombi) {
						twpro_job.twpro_bestCombi[twpro_type] = twpro_testCombi[twpro_type];
					}
				}
			}
			do {
				//TWPro.anzahl3++;
				twpro_next = false;
				for (var twpro_type in twpro_testCombi) {
					var twpro_setItemsCalcType = TWPro.twpro_setItemsCalc[twpro_type];
					var twpro_testCombiType = twpro_testCombi[twpro_type];
					if (twpro_testCombiType != 0) {
						twpro_set = twpro_setItemsCalcType[twpro_testCombiType].set.key;
						if ((--twpro_setCounter[twpro_set]) == 1) {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
						}
						else {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
						}
					}
					if ((twpro_testCombiType + 1) < twpro_setItemsCalcType.length) {
						twpro_set = twpro_setItemsCalcType[++twpro_testCombi[twpro_type]].set.key;
						if ((++twpro_setCounter[twpro_set]) == 1) {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
						}
						else {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
						}
						twpro_next = true;
						break;
					}
					else {
						twpro_testCombi[twpro_type] = 0;
					}
				}
			}
			while ((parseInt(twpro_testnextvalid.join(''), 10) > 0) && twpro_next);
		}
		while (twpro_next);
	}

	function twpro_prepareItem(twpro_item) {
		if (TWPro.twpro_failure) return;
		var twpro_storedItem;
		if (!TWPro.twpro_itemStorage[twpro_item.item_id]) {
			TWPro.twpro_itemStorage[twpro_item.item_id] = {};
			twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
		}
		else {
			twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
			if ((twpro_item.twpro_bonus = twpro_storedItem.twpro_bonus)) {
				twpro_item.twpro_jobbonus = {};
			}
			twpro_item.twpro_wearable = twpro_storedItem.twpro_wearable;
			return;
		}
		var twpro_i = 0;
		if (twpro_item.bonus.skills.length == undefined) {
			for (var twpro_skillname in twpro_item.bonus.skills) {
				twpro_i++;
			}
		}
		if (twpro_item.bonus.attributes.length == undefined) {
			for (var twpro_attname in twpro_item.bonus.attributes) {
				twpro_i++;
			}
		}
		if (twpro_i > 0) {
			twpro_item.twpro_bonus = true;
			twpro_item.twpro_jobbonus = {};
			twpro_storedItem.twpro_jobbonus = {};
		}
		else {
			twpro_item.twpro_bonus = false;
		}
		twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item);
		twpro_storedItem.twpro_bonus = twpro_item.twpro_bonus;
		twpro_storedItem.twpro_wearable = twpro_item.twpro_wearable;
	}

	function twpro_wearItem(twpro_item) {
		if (TWPro.twpro_failure) return false;
		if ((twpro_item.characterClass != null) && (twpro_item.characterClass != Character.characterClass)) {
			return false;
		}
		if ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) {
			return false;
		}
		if ((twpro_item.characterSex != null) && ((twpro_item.characterSex != Character.characterSex) || (Character.characterClass == 'greenhorn'))) {
			return false;
		}
		return true;
	}

	function twpro_compareItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return;
		var twpro_aktplus = TWPro.twpro_testItem(twpro_job, twpro_item);
		if (twpro_item.twpro_bonus) {
			twpro_item.twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
			TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
		}
		if (twpro_aktplus >= twpro_job.twpro_bestStats[twpro_item.type] && twpro_item.twpro_wearable) {
			twpro_job.twpro_bestStats[twpro_item.type] = twpro_aktplus;
		}
	}
	function twpro_testItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return 0;
		if (!twpro_item.twpro_bonus && !twpro_item.jobBonus) {
			return 0;
		}
		if (TWPro.twpro_itemStorage[twpro_item.item_id]) {
			if (TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] != undefined) {
				return TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName];
			}
		}
		var twpro_aktskills = twpro_job.twpro_skills;
		var twpro_aktattributes = twpro_job.twpro_attributes;
		if(twpro_item.bonus.skills.length !== 0){
			for (var twpro_skillname in twpro_item.bonus.skills) {
				twpro_aktskills = twpro_aktskills.replace(TWPro.twpro_re_skill[twpro_skillname], twpro_item.bonus.skills[twpro_skillname]);
			}
		}
		//if(twpro_item.bonus.attributes instanceof Array){
			for (var twpro_attname in twpro_item.bonus.attributes) {
				if(!TWPro.twpro_re_att[twpro_attname]) continue;
				twpro_aktattributes = twpro_aktattributes.replace(TWPro.twpro_re_att[twpro_attname], twpro_item.bonus.attributes[twpro_attname]);
			}
		//}
		return eval((twpro_aktskills+'+'+twpro_aktattributes).replace(/[a-z_]+/gi, '0'));
	}

	function twpro_changeItem(change) {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_setItems = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
		}
		//TWPro.twpro_invHash = [];
		TWPro.twpro_initializeItems('wear', null);
		TWPro.twpro_initializeItems('bag', null);
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		if(change && change.inv_id && TWPro.searchInventory.cache){
			if(change.deleted) delete TWPro.searchInventory.cache[change.inv_id];
			else TWPro.twpro_searchInventory(true, change.inv_id);
		}
		TWPro.twpro_changeJob();
	}

	function twpro_changeJob() {
		if (TWPro.twpro_failure) return;
		if (TWPro.twpro_calculated) {
			var twpro_jobList = document.getElementById('twpro_jobList');
			var twpro_selected = twpro_jobList.selectedIndex;
			twpro_jobList.style.backgroundColor = twpro_jobList[twpro_selected].style.backgroundColor;
			var twpro_selectedJob = parseInt(twpro_jobList[twpro_selected].value);
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				if (document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i])) {
					document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i]).className = 'wear_' + TWPro.twpro_bag.twpro_types[twpro_i];
				}
			}
			for (var twpro_wear in Wear.wear) {
				Wear.wear[twpro_wear].popup.refresh();
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].popup.refresh();
				bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
			}
			if (twpro_selectedJob >= 0) {
				var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
				TWPro.twpro_highlight(twpro_job);
				var twpro_aktuelleap = twpro_job.twpro_skill - Math.max(0, twpro_job.malus);
				var twpro_setCounter = {};
				for (var twpro_wear in Wear.wear) {
					if (Wear.wear[twpro_wear].obj.twpro_bonus) {
						twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
					}
					if (Wear.wear[twpro_wear].obj.set != null) {
						if (twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] == undefined) {
							twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
						}
						else {
							twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
						}
					}
				}
				for (var twpro_set in twpro_setCounter) {
					if (twpro_setCounter[twpro_set] >= 2) {
						twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
					}
				}
				document.getElementById('twpro_aktuelleapvalue').innerHTML = eval(twpro_job.twpro_aps -1) + ' / '+ eval(twpro_aktuelleap - 1) + ' ' +TWPro.lang.LABORP;
				if (twpro_aktuelleap > 0) {
					if (twpro_aktuelleap >= twpro_job.twpro_aps) {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(160, 218, 120)';
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(230, 235, 108)';
					}
				}
				else {
					document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(232, 150, 120)';
				}
				document.getElementById('twpro_aktuelleap').style.visibility = 'visible';
			}
			else {
				document.getElementById('twpro_aktuelleap').style.visibility = 'hidden';
			}
			TWPro.twpro_bagVis();
		}
	}

	function twpro_highlight(twpro_job) {
		if (TWPro.twpro_failure) return;
		for (var twpro_wear in Wear.wear) {
			var twpro_item = Wear.wear[twpro_wear].obj;
			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
				}
			}
			else { if ((twpro_item.twpro_wearable) && ((twpro_item.type == 'animal') || ((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type])))) {
					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
				}
			}
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			var twpro_item = bagitems[twpro_bag].obj;
			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
				}
			}
			else { if ((twpro_item.twpro_wearable) && ((twpro_item.type != 'animal') && ((((twpro_item.type == 'yield') || (twpro_item.type == 'right_arm')) && (twpro_item.twpro_bonus == true) && (twpro_job.twpro_bestStats[twpro_item.type] > 0) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type])) || ((twpro_item.type != 'yield') && (twpro_item.type != 'right_arm') && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))))) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
				}
			}
		}
	}
	if(typeof window.TWPro == 'undefined'){try{
		window.TWPro = {};
		TWPro.lang = twpro_lang;
		TWPro.twpro_injectScript = twpro_injectScript;
		TWPro.twpro_preference = twpro_preference;
		TWPro.twpro_throwFailure = twpro_throwFailure;
		TWPro.twpro_injectionSwitch = twpro_injectionSwitch;
		TWPro.twpro_reportAccess = twpro_reportAccess;
		TWPro.twpro_getAuthor = twpro_getAuthor;
		TWPro.twpro_activeJob = twpro_activeJob;
		TWPro.twpro_getPlace = twpro_getPlace;
		TWPro.twpro_popup = twpro_popup;
		TWPro.twpro_insertList = twpro_insertList;
		TWPro.twpro_handleJobrank = twpro_handleJobrank;
		TWPro.twpro_searchInventory = twpro_searchInventory;
		TWPro.twpro_bagVis = twpro_bagVis;
		TWPro.twpro_sortList = twpro_sortList;
		TWPro.twpro_jobSortMark = twpro_jobSortMark;
		TWPro.twpro_showList = twpro_showList;
		TWPro.twpro_getBagPopup = twpro_getBagPopup;
		TWPro.twpro_clickList = twpro_clickList;
		TWPro.twpro_clickfilterList = twpro_clickfilterList;
		TWPro.twpro_updateList = twpro_updateList;
		TWPro.twpro_insertListItems = twpro_insertListItems;
		TWPro.twpro_sortJobs = twpro_sortJobs;
		TWPro.twpro_sortPlus = twpro_sortPlus;
		TWPro.twpro_initializeItems = twpro_initializeItems;
		TWPro.twpro_calculateJobs = twpro_calculateJobs;
		TWPro.twpro_calcSets = twpro_calcSets;
		TWPro.twpro_prepareItem = twpro_prepareItem;
		TWPro.twpro_wearItem = twpro_wearItem;
		TWPro.twpro_compareItem = twpro_compareItem;
		TWPro.twpro_testItem = twpro_testItem;
		TWPro.twpro_changeItem = twpro_changeItem;
		TWPro.twpro_changeJob = twpro_changeJob;
		TWPro.twpro_highlight = twpro_highlight;
		TWPro.calculateIncoming = calculateIncoming;
		TWPro.makefortlist = makefortlist;
		TWPro.makefortmessage = makefortmessage;
		TWPro.twpro_injectScript();}catch(e){alert(e)}
	}
	// export other stuff, not related to TW Pro item stuff


	window.insertBBcode = insertBBcode;
	(function(){
		try{
			
			window.convertduelreport = convertduelreport;
			window.convertduelreportfunc = convertduelreportfunc;
			window.makefortmessage = makefortmessage;
			window.makefortlist = makefortlist;
			window.makeadvicemessage = makeadvicemessage;
			window.makeadvicelist = makeadvicelist;
			
			(Reports.show = eval('('+Reports.show.toString()
								 .replace('{', '{data=convertduelreport("window_reports_show_"+report_id, data);')
								 +')')).bind(Reports);
		}catch(e){}
	})();
	if(!('_expand_answer' in Messages)){
		Messages._expand_answer = Messages.expand_answer;
		Messages.expand_answer = function(){
			Messages._expand_answer();
			insertbbcodesfunc(document.getElementById('answer_field_row').getElementsByTagName('textarea')[0], false);
		};
	}
	// BBCode at reports
	try{
		/*(ReportPublish.selectPublish = eval('('+ReportPublish.selectPublish.toString()
			.replace(/(showMessage\(xhtml,\s*header,)[^,]+,[^,]+/,
					 'var reportHash=$("reportList_title_"+reportId);reportHash=reportHash?reportHash.href.match(/\'([^\']+)/)[1]:document.getElementById("window_reports_show_"+reportId).innerHTML.match(/showLink\\([0-9]+, \'([^\']+)/)[1];xhtml=\'BBCode: <input type="text" onclick="this.select();" value="[report=\'+reportId+reportHash+\']\'+reportTitle+\'[/report]" name="report_bbcode" size="35" style="text-align:center;" readonly="readonly" class="input_layout">\'+xhtml;$1400, 320'
					)
		+')')).bind(ReportPublish);*/
	}
	catch(e){}
}
var url = window.location.href;
if (url.indexOf(".the-west.") != -1 && url.indexOf("forum.php?page=") != -1) {
	if (url.indexOf("page=forum&mode=new_thread") != -1 || ((url.indexOf("&answer") != -1 || url.indexOf("&edit_post")) && url.indexOf("page=thread") != -1)) {
		window.insertBBcode = insertBBcode;
		var ta = document.getElementsByTagName('textarea');
		if(ta.length) insertbbcodesfunc(ta[0], true);
	}
}
})

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_147', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_147', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=147&version=1.138';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();

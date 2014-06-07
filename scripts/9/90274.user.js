// ==UserScript==
// @name		IK archive
// @namespace	Ikariam Archive
// @author		Ashaya
// @description Ce script sauve des rapports, des messages et les conserve dans des archives. Soyez conscients que ce script n'est pas approuvé, parce qu'il imite Ikariam Plus. Utilisez-le à vos risque et péril ^^. 
// @version		0.4.0.1
// @history		0.4.0.1 added Latvian translation /lt/ (tnx Andrejs)
// @history		0.4.0.0 added Portuguese translation /pt/ (tnx jomacho)
// @history		0.4.0.0 changed css path due to a change in game version (tnx Cherry)
// @history		0.4.0.0 replaced some buttons texts for actual translations (tnx Cherry)
// @history		0.3.3.4 converted Serbian translation to cirilic /rs/ (tnx s-a-k-a)
// @history		0.3.3.3 added Spanish translation /es/ (tnx Rada974)
// @history		0.3.3.2 conflict with "Vejida`s Spy Protection Check" (tnx aletsan for reporting)
// @history		0.3.3.2 added Romanian translation /ro/ (tnx gheorghe)
// @history		0.3.3.2 added Greek translation /gr/ (tnx aletsan)
// @history		0.3.3.1 added Danish translation /dk/ (tnx MicCo)
// @history		0.3.3.0 css path changed
// @history		0.3.2.0 added Polish translation /pl/ (tnx Morpheush)
// @history		0.3.2.0 added language for ba, rs, com, de (tnx Cherry)
// @history		0.3.2.0 added language support
// @history		0.3.2.0 added autoupdate
// @history		0.3.2.0 patch conflict with other scripts that prevented injecting military arachive and report collecting (tnx for debuging Cherry)
// @history		0.3.2.0 archive expandable by clicking on table row not just arrow icon
// @history		0.3.1.1 hotfix, inbox archive page not populated
// @history		0.3.1 added archiving for outbox messages [tnx JosDaBosS for reminding me of outbox feature of the game :D]
// @history		0.3 v0.3.2 support
// @history		0.3 archive view/functionality redesing
// @history		0.3 one click multyple messages archiving
// @history		0.3 one click multyple reports/messages deleted
// @history		0.2 multi domain support [for thoes who play on more than one server]
// @include		http://s*.ikariam.*/*
// ==/UserScript==

/*
	Copyright (c) 2010,
	Released under Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License: http://creativecommons.org/licenses/by-nc-sa/3.0/
		
	Si vous modifiez ce script, merci de laisser le nom d'auteur original (en plus du votre).
	
*/
var cversion = '0.4.0.1';
var lang = lang();
var time = new Date().getTime()+'';
var getName = window.location.host+'.lastCheck';
var last_check = GM_getValue(getName);
if(!last_check) { GM_setValue(getName,time); }
if(time - last_check > 86400000)
{
	GM_setValue(getName,time);
	GM_xmlhttpRequest({
		method:				"GET",
		url:				"http://userscripts.org/scripts/source/52398.meta.js?sinc="+time,
		headers:			{ Accept:"text/javascript; charset=UTF-8" },
		overrideMimeType:	"application/javascript; charset=UTF-8",
		onload:				function(response) { checkversion(response); }
		});
}
function checkversion(response)
{
	var availableVersion;
	if (response.status == 200)
	{
		var resReg = /\/\/ @version\s+(\d+\.\d+\.\d+\.\d+)/.exec(response.responseText);
		if (resReg != null)
		{
			availableVersion = resReg[1];
		}
	}
	if(availableVersion!=cversion)
	{
		if(confirm(lang.newversion+availableVersion))
		{
			GM_openInTab('http://userscripts.org/scripts/source/52398.user.js');
		}
	}
}
// autoupdate	
function lang()
{
	var host = window.location.host.split('\.');
	if(host.length == 4 && host[3]=='com') { var lang_sw = host[1]; } else { var lang_sw = host[3]; }
	if(!lang_sw) { var lang_sw = 'en'; }
	switch(lang_sw)
	{
		case 'ba':
		lang = {
			'selectall': 'Označi sve',
			'selectnone': 'ništa',
			'selectinvert': 'okreni',
			'save': 'Sačuvaj u arhivu',
			'saveselected': 'Sačuvaj označeno',
			'remove': 'Obriši',
			'removeselected': 'Obriši označeno iz arhive',
			'messages': 'Poruke',
			'sender': 'Pošiljalac',
			'title': 'Naslov',
			'city': 'Grad',
			'date': 'Datum',
			'to': 'Primalac',
			'targetcity': 'Grad meta',
			'action': 'Akcija',
			'battle': 'Borba',
			'savereport': 'Sačuvaj izveštaj',
			'ikariamarchive': 'Ikariam arhiva',
			'alertmultydelete':'Brišete više poruka. Dali ste sigurni?',
			'alertsaved': 'Sačuvano',
			'alertsavefailed': 'Sačuvavanje nije uspelo!!!',
			'newversion': 'Dostupna je nova verzija Ikariam arhive. Instaliraj verziju: '
		}
		break;
		case 'rs':
			lang = {
			'selectall': 'Означи све',
			'selectnone': 'ништа',
			'selectinvert': 'окрени',
			'save': 'Сачувај у архиву',
			'saveselected': 'Сачувај означено',
			'remove': 'Обриши',
			'removeselected': 'Обриши означено из архиве',
			'messages': 'Поруке',
			'sender': 'Пошиљалац',
			'title': 'Наслов',
			'city': 'Град',
			'date': 'Датум',
			'to': 'Прималац',
			'targetcity': 'Град мета',
			'action': 'Акција',
			'battle': 'Борба',
			'savereport': 'Сачувај извештај',
			'ikariamarchive': 'Икариам архива',
			'alertmultydelete':'Бришете више порука. Да ли сте сигурни?',
			'alertsaved': 'Сачувано',
			'alertsavefailed': 'Чување није успело!!!',
			'newversion': 'Доступна је нова верзија Икариам архиве. Инсталирај верзију: '
			}
			break;
		case 'dk':
		lang = {
			'selectall': 'Vælg alt',
			'selectnone': 'Ingen',
			'selectinvert': 'Omvendt',
			'save': 'Gem i arkiv',
			'saveselected': 'Gem valgte',
			'remove': 'Remove',
			'removeselected': 'Fjern det valgte fra arkivet',
			'messages': 'Meddelelser',
			'sender': 'Afsender',
			'title': 'Titel',
			'city': 'By',
			'date': 'Dato',
			'to': 'Til',
			'targetcity': 'Mål by',
			'action': 'Hændelse',
			'battle': 'Kamp',
			'savereport': 'Gem rapport',
			'ikariamarchive': 'Ikariam arkiv',
			'alertmultydelete':'Du er ved at slette flere meddelelser, er Du sikker?',
			'alertsaved': 'Gemt',
			'alertsavefailed': 'Arkivering fejlede!!!',
			'newversion': 'Ny version af Ikariam arhive er tilgængelig. Installere ny version: '
		}
		break;
		case 'en':
		lang = {
			'selectall': 'Select all',
			'selectnone': 'None',
			'selectinvert': 'Invert',
			'save': 'Save in archive',
			'saveselected': 'Save selected',
			'remove': 'Remove',
			'removeselected': 'Remove selected from archive',
			'messages': 'Messages',
			'sender': 'Sender',
			'title': 'Title',
			'city': 'City',
			'date': 'Date',
			'to': 'To',
			'targetcity': 'Target city',
			'action': 'Action',
			'battle': 'Battle',
			'savereport': 'Save report',
			'ikariamarchive': 'Ikariam archive',
			'alertmultydelete':'You are about to delete multiple messages. Are you sure?',
			'alertsaved': 'Saved',
			'alertsavefailed': 'Saving failed!!!',
			'newversion': 'New version of Ikariam archive is available. Install version: '
		}
		break;
		case 'pl':
		lang = {
			'selectall': 'Wszystko',
			'selectnone': 'Nic',
			'selectinvert': 'Odwróć',
			'save': 'Zapisz w archiwum',
			'saveselected': 'Zapisz wybrane ',
			'remove': 'Skasuj',
			'removeselected': 'Skasuj wybrane z archiwum',
			'messages': 'Wiadomości',
			'sender': 'Wysyłający',
			'title': 'Tytuł',
			'city': 'Miasto',
			'date': 'Data',
			'to': 'Do',
			'targetcity': 'Miasto docelowe',
			'action': 'Akcja',
			'battle': 'Bitwa',
			'savereport': 'Zapisz raport',
			'ikariamarchive': 'Ikariam archive',
			'alertmultydelete':'Jesteś pewien, że chcesz usunąć kilka wiadomości?',
			'alertsaved': 'Zapisano',
			'alertsavefailed': 'Zapisywanie nie powiodło się!!!',
			'newversion': 'Nowa wersja "Ikariam arhive" jest już dostępna. Zainstaluj wersje: '
		}
		break;
		case 'ro':
		lang = {
			'selectall': 'Toate',
			'selectnone': 'Niciunul',
			'selectinvert': 'Inversează',
			'save': 'Salvează în arhivă',
			'saveselected': 'Salvează selectate',
			'remove': 'Elimină',
			'removeselected': 'Elimina selectate',
			'messages': 'Mesaje',
			'sender': 'Expeditor',
			'title': 'Titlu',
			'city': 'Oraş',
			'date': 'Data',
			'to': 'Către',
			'targetcity': 'Oraşul ţintă',
			'action': 'Acţiune',
			'battle': 'Bătălie',
			'savereport': 'Salvează raport',
			'ikariamarchive': 'Arhiva Ikariam',
			'alertmultydelete':'Sigur vrei să ştergi mai multe mesaje deodată?',
			'alertsaved': 'Salvat',
			'alertsavefailed': 'Salvarea a eşuat !!',
			'newversion': 'A apărut o nouă versiune a "Ikariam arhive". Tu ai versiunea:'
		}
		break;
		case 'gr':
		lang = {
			'selectall': 'Επιλογή όλων',
			'selectnone': 'Καμία',
			'selectinvert': 'Αντιστροφή επιλογής',
			'save': 'Σώσε στο αρχείο',
			'saveselected': 'Σώσε επιλεγμένα',
			'remove': 'Διαγραφή αναφοράς',
			'removeselected': 'Διέγραξε τις επιλεγμένες απο το αρχείο',
			'messages': 'Μηνύματα',
			'sender': 'Αποστολέας',
			'title': 'Τίτλος',
			'city': 'Πόλη',
			'date': 'Ημ/νία',
			'to': 'Προς',
			'targetcity': 'Πόλη στόχος',
			'action': 'Ενέργεια',
			'battle': 'Μάχη',
			'savereport': 'Σώσε αναφορά',
			'ikariamarchive': 'Ikariam archive',
			'alertmultydelete':'Θα διαγραφούν πολλά μηνύματα. Είσαι σίγουρος?',
			'alertsaved': 'Η αναφορά σώθηκε',
			'alertsavefailed': 'Το σώσιμο απέτυχε!!!',
			'newversion': 'Νέα έκδοση διαθέσιμη. Έκδοση προς εγκατάσταση: '
		}
		break;
		case 'es':
		lang = {
			'selectall': 'Selecciona Todos',
			'selectnone': 'Ninguno',
			'selectinvert': 'Invertir seleccion',
			'save': 'Guardar en Archivo',
			'saveselected': 'Seleccionado Guardar',
			'remove': 'Remover',
			'removeselected': 'Remover lo seleccionado de los Archivos',
			'messages': 'Mensajes',
			'sender': 'Remitente',
			'title': 'Titulo',
			'city': 'Ciudad',
			'date': 'Fecha',
			'to': 'Para',
			'targetcity': 'Ciudad Contrincante',
			'action': 'Accion',
			'battle': 'Batalla',
			'savereport': 'Salvar reporte',
			'ikariamarchive': 'Ikariam archive',
			'alertmultydelete':'Estas a punto de eliminar multiples mensajes. ¿estas seguro?',
			'alertsaved': 'Guardado',
			'alertsavefailed': 'Falló al guardar!!!',
			'newversion': 'Nueva version de Ikariam arhive esta disponible. Instalarla: '
		}
		break;
		case 'pt':
		lang = {
			'selectall': 'Todos',
			'selectnone': 'Nenhum',
			'selectinvert': 'Inverso',
			'save': 'Guardar',
			'saveselected': 'Guardar Seleccionados',
			'remove': 'Remover',
			'removeselected': 'Remover Seleccionados',
			'messages': 'Mensagens',
			'sender': 'Remetente',
			'title': 'Título',
			'city': 'Cidade',
			'date': 'Data',
			'to': 'Para',
			'targetcity': 'Cidade Destino',
			'action': 'Acção',
			'battle': 'Batalha',
			'savereport': 'Guardar Relatório',
			'ikariamarchive': 'Arquivo Ikariam',
			'alertmultydelete':'Tem a certeza que quer eliminar as mensagens seleccionadas?',
			'alertsaved': 'Guardado',
			'alertsavefailed': 'Erro a Guardar',
			'newversion': 'Está disponível nova versão do Ikariam Arquive. Instalar: '
		}
		break;
		case 'lt':
		lang = {
			'selectall': 'Izvēlēties visu',
			'selectnone': 'Izvēlēties neko',
			'selectinvert': 'Pretēji',
			'save': 'Saglabāt arhīvā',
			'saveselected': 'Saglabāt izvēlētos',
			'remove': 'Izdzēst',
			'removeselected': 'Izdzēst izvēlētos',
			'messages': 'Vēstules',
			'sender': 'Sūtītājs',
			'title': 'Nosaukums',
			'city': 'Pilsēta',
			'date': 'Datums',
			'to': 'Kam',
			'targetcity': 'Izvēlētā pilsēta',
			'action': 'Rīcība',
			'battle': 'Kauja',
			'savereport': 'Saglabāt ziņojumu',
			'ikariamarchive': 'Arhīvs',
			'alertmultydelete':'Tu esi izvēlējies izdzēst vairākas vēstules. Vai tu esi pārliecināts?',
			'alertsaved': 'Saglabāts',
			'alertsavefailed': 'Saglabāt neizdevās!!!',
			'newversion': 'Jauna versija Ikariam archive ir pieejama. Instalēt versiju: '
		}
		break;
		case 'de':
		lang = {
			'selectall': 'Alle',
			'selectnone': 'Keine',
			'selectinvert': 'Auswahl umkehren',
			'save': 'Speichern ins Archiv',
			'saveselected': 'speichere gewählte',
			'remove': 'aus dem Archiv entfernen',
			'removeselected': 'ausgewählte aus dem Archiv entfernen',
			'messages': 'Nachrichten',
			'sender': 'Absender',
			'title': 'Betreff',
			'city': 'Stadt',
			'date': 'Datum',
			'to': 'Empfänger',
			'targetcity': 'Ziel Stadt',
			'action': 'Aktion',
			'battle': 'Kampf',
			'savereport': 'Bericht speichern',
			'ikariamarchive': 'Ikariam Archiv',
			'alertmultydelete':'Du bist dabei, mehrere Nachrichten zu löschen. Bist Du dir sicher?',
			'alertsaved': 'Nachricht gespeichert!',
			'alertsavefailed': '!!!Nachricht nicht gespeichert!!!',
			'newversion': 'Neue Version von Ikariam arhive verfügbar ist. Installieren Version:'
		}
	}
	return lang;
}

function locator(searchStr)
{
	var searchStr;
	var start = location.search.indexOf(searchStr)+searchStr.length+1;
	var end = (location.search.indexOf('&', start) == -1)? location.search.length : location.search.indexOf('&', start);
	return unescape(location.search.substring(start, end));
}
unsafeWindow.mout = function(e) { e.bgColor="#FDF7DD"; }
unsafeWindow.mover = function(e) { e.bgColor="#ECD5AC"; }
function ViewMsgArchive()
{
	GM_addStyle(".arrow_down { float:left; } .t_row { text-align:center; } .no_d {text-decoration: none;}");

	var reports = '<h3 class="header"><span class="textLabel">'+lang.messages+'</span></h3><table width="100%"><tr><th style="width:10px;"></th><th style="width:24%;">'+lang.sender+'</th><th style="width:24%;">'+lang.title+'</th><th style="width:24%;">'+lang.city+'</th><th>'+lang.date+'</th></tr>';
	var saves = GM_listValues();
	var domain = window.location.host;
	for (var d = 0; d < saves.length; d++)
	{
		if(saves[d].substr(0,domain.length)==domain)
		{
			if(saves[d].replace(domain+'.','').substr(0,4)=='msg_')
			{
				var report 	= GM_getValue(saves[d]);
				var parts 	= report.split('%|%');
				report = '<tr class="entry t_row" onmouseout="mout(this);" onmouseover="mover(this);"><td><input type="checkbox" value="'+saves[d]+'" /> </td><td onClick="toggleView(\''+saves[d]+'\');"> <img src="skin/layout/down-arrow.gif" id="msgi'+saves[d]+'" class="arrow_down" /> '+parts[0]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[1]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[2]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[3]+'</td></tr><tr style="display:none;cursor:default;" class="text entry" id="'+saves[d]+'"><td colspan="5" style="padding:0px;"><p style="text-align: left;">'+parts[4]+'</p><div style="text-align:right;padding: 10px;"><a href="javascript:void(0);" style="" class="button no_d" onClick="deleteFromArchive(\''+saves[d]+'\');">'+lang.remove+'</a></div></td></tr>';
				reports = reports+report;
			}
		}
	}
	reports = reports + '<tr><td colspan="2"><a href="javascript:void(0);" onClick="selectArchived(\'all\');">'+lang.selectall+'</a> | <a href="javascript:void(0);" onClick="selectArchived(\'none\');">'+lang.selectnone+'</a> | <a href="javascript:void(0);" onClick="selectArchived(\'invert\');">'+lang.selectinvert+'</a></td><td colspan="3" style="padding: 10px;"><a href="javascript:void(0);" class="button no_d" onClick="deleteSlectedFromArchive();">'+lang.removeselected+'</a></td></tr></table>';
	return reports;
}
function ViewMsgArchiveOutbox()
{
	GM_addStyle(".arrow_down { float:left; } .t_row { text-align:center; } .no_d {text-decoration: none;}");
	var reports = '<h3 class="header"><span class="textLabel">'+lang.messages+'</span></h3><table width="100%"><tr><th></th><th>'+lang.to+'</th><th>'+lang.title+'</th><th>'+lang.date+'</th></tr>';
	var saves = GM_listValues();
	var domain = window.location.host;
	for (var d = 0; d < saves.length; d++)
	{
		if(saves[d].substr(0,domain.length)==domain)
		{
			if(saves[d].replace(domain+'.','').substr(0,7)=='msgout_')
			{
				var report 	= GM_getValue(saves[d]);
				var parts 	= report.split('%|%');
				report = '<tr class="entry t_row" onmouseout="mout(this);" onmouseover="mover(this);"><td><input type="checkbox" value="'+saves[d]+'" /></td><td onClick="toggleView(\''+saves[d]+'\');"><img src=skin/layout/down-arrow.gif id=msgi"'+saves[d]+'" class="arrow_down" /> '+parts[0]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[1]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[2]+'</td></tr><tr style="display:none;cursor:default;" class="text entry" id="'+saves[d]+'"><td colspan="4"><p style="text-align: left;">'+parts[3]+'</p><div style="text-align:right;padding: 10px;"><a href="javascript:void(0);" class="button no_d" onClick="deleteFromArchive(\''+saves[d]+'\');">'+lang.remove+'</a></div></td></tr>';
				reports = reports+report;
			}
		}
	}
	reports = reports + '<tr><td colspan="2"><a href="javascript:void(0);" onClick="selectArchived(\'all\');">All</a> | <a href="javascript:void(0);" onClick="selectArchived(\'none\');">None</a> | <a href="javascript:void(0);" onClick="selectArchived(\'invert\');">Invert</a></td><td colspan="2" style="padding: 10px;"><a href="javascript:void(0);" class="button no_d" onClick="deleteSlectedFromArchive();">'+lang.removeselected+'</a></td></tr></table>';
	return reports;
}
function ViewSpyReports()
{
	GM_addStyle(".arrow_down { float:left; } .no_d {text-decoration: none;}");
	var reports = '<div class="contentBox01" id="msgArchiveContainer"><h3 class="header"> </h3><div class="content"><table style="width:100%; margin:0px;" class="table01"><tr style="text-align:center;border-bottom:1px dotted #E4B873;"><th></th><th>'+lang.targetcity+'</th><th>'+lang.action+'</th><th>'+lang.date+'</th></tr>';
	var saves = GM_listValues();
	var domain = window.location.host;
	for (var d = 0; d < saves.length; d++)
	{	
		if(saves[d].substr(0,domain.length)==domain)
		{
			if(saves[d].replace(domain+'.','').substr(0,4)=='spy_')
			{
				var report 	= GM_getValue(saves[d]);
				var parts 	= report.split('%|%');
				report = '<tr style="border-bottom:1px dotted #E4B873;cursor: pointer;" class="entry" onmouseout="mout(this);" onmouseover="mover(this);"><td style="cursor:default;"><input type="checkbox" value="'+saves[d]+'" /></td><td onClick="toggleView(\''+saves[d]+'\');"><img src=skin/layout/down-arrow.gif id=msgi"'+saves[d]+'" class="arrow_down" /> '+parts[1]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[0]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[2]+'</td></tr><tr><td colspan="4" style="display: none;" id="'+saves[d]+'"><table><tr><td>'+parts[3]+'</td></tr></table><div style="text-align:right;padding: 10px;"><a href="javascript:void(0);" class="button no_d" onClick="deleteFromArchive(\''+saves[d]+'\');">'+lang.remove+'</a></div></td></tr>';
				reports = reports+report;
			}
		}
	}
	reports = reports+'<tr><td colspan="2"><a href="javascript:void(0);" onClick="selectArchived(\'all\');">'+lang.selectall+'</a> | <a href="javascript:void(0);" onClick="selectArchived(\'none\');">'+lang.selectnone+'</a> | <a href="javascript:void(0);" onClick="selectArchived(\'invert\');">'+lang.selectinvert+'</a></td><td colspan="3" style="padding: 10px;"><a href="javascript:void(0);" class="button no_d" onClick="deleteSlectedFromArchive();">'+lang.removeselected+'</a></td></tr>';
	return reports+'</table></div><div class="footer"></div></div>';
}
function ViewCombatReports()
{
	GM_addStyle(".arrow_down { float:left; } .t_row { text-align:center; } .no_d {text-decoration: none;}");
	var reports = '<div id="msgArchiveContainer"><table style="width:100%; margin:0px;" class="table01"><tr style="text-align:left;border-bottom:1px dotted #E4B873;"><th style="width: 15px;"></th><th style="width:45%;">'+lang.battle+'</th><th>'+lang.date+'</th></tr>';
	var saves = GM_listValues();
	var domain = window.location.host;
	for (var d = 0; d < saves.length; d++)
	{
		if(saves[d].substr(0,domain.length)==domain)
		{
			if(saves[d].replace(domain+'.','').substr(0,4)=='com_')
			{
				var report 	= GM_getValue(saves[d]);
				var parts 	= report.split('%|%');
				report = '<tr style="border-bottom:1px dotted #E4B873;cursor: pointer;" class="entry" onmouseout="mout(this);" onmouseover="mover(this);"><td style="cursor: default;"><input type="checkbox" value="'+saves[d]+'" /></td><td onClick="toggleView(\''+saves[d]+'\');"><img src="skin/layout/down-arrow.gif" id="msgi'+saves[d]+'" class="arrow_down" /> '+parts[0]+'</td><td onClick="toggleView(\''+saves[d]+'\');">'+parts[1]+'</td></tr><tr><td colspan="3" style="display: none;text-align:left; padding: 0px;" id="'+saves[d]+'"><div id="troopsReport">'+parts[2]+'<div class="result">'+parts[3]+'</div></div><div style="text-align:right;padding: 10px;"><a href="javascript:void(0);" class="button no_d" onClick="deleteFromArchive(\''+saves[d]+'\');">'+lang.remove+'</a></div></td></tr>';
				reports = reports+report;
			}
		}
	}
	reports = reports+'<tr><td colspan="2"><a href="javascript:void(0);" onClick="selectArchived(\'all\');">'+lang.selectall+'</a> | <a href="javascript:void(0);" onClick="selectArchived(\'none\');">'+lang.selectnone+'</a> | <a href="javascript:void(0);" onClick="selectArchived(\'invert\');">'+lang.selectinvert+'</a></td><td colspan="3" style="padding: 10px;"><a href="javascript:void(0);" class="button no_d" onClick="deleteSlectedFromArchive();">'+lang.removeselected+'</a></td></tr>';
	return reports+'</table><div class="footer"></div></div>';
}
unsafeWindow.toggleView = function(id)
{
	var id;
	var row = document.getElementById(id);
	if(row.style.display == 'none')
	{
		row.style.display = '';
	}
	else
	{
		row.style.display = 'none';
	}
}
unsafeWindow.saveSpyReport = function()
{
	var searchStr = 'reportId';
	var start = location.search.indexOf(searchStr)+searchStr.length+1;
	var end = (location.search.indexOf('&', start) == -1)? location.search.length : location.search.indexOf('&', start);
	var reportId = unescape(location.search.substring(start, end));
	var report_txt = document.getElementsByClassName('report');
	if(report_txt[0].innerHTML!='')
	{
		var reportTxt = report_txt[0].innerHTML.replace(/\s+/g,' ');
	}
	else
	{
		var reportTxt = '';
		for (var i = 0; i < report_txt.length; i++)
		{
			reportTxt = reportTxt + report_txt[i].innerHTML.replace(/\s+/g,' ');
		}
	}
	reportTxt = reportTxt.replace('id="resources"','align="center"');
	var mission = document.getElementsByClassName('report')[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].innerHTML;
	var city	= document.getElementsByClassName('report')[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[3].innerHTML;
	var date 	= document.getElementsByClassName('report')[0].parentNode.parentNode.parentNode.childNodes[1].childNodes[5].childNodes[3].innerHTML;
	var val_name = window.location.host+'.spy_'+reportId;
	var report = mission+'%|%'+city+'%|%'+date+'%|%'+reportTxt;
	if(window.setTimeout(function() {GM_setValue(val_name,report)},0))
	{
		alert(lang.alertsaved);
	}
	else
	{
		alert(lang.alertsavefailed);
	}
}
unsafeWindow.deleteFromArchive = function(id)
{
	var id;
	window.setTimeout(GM_deleteValue,0,id);
	document.location.reload();
}
unsafeWindow.DeleteAllReports = function ()
{
	if(confirm('Delete all archived reports?'))
	{
		var saves = GM_listValues();
		for (var d = 0; d < saves.length; d++)
		{
			GM_deleteValue(saves[d]);
		}
	}
}
unsafeWindow.SaveCombatReport = function(id)
{
	var title = document.getElementsByClassName('contentBox01h')[0].getElementsByClassName('header')[0].childNodes[0].nodeValue;
	var date = document.getElementsByClassName('date')[0].innerHTML.replace('(','').replace(')','');
	var battle = document.getElementById('troopsReport').getElementsByClassName('content')[0].innerHTML.replace(/\s+/g,' ');
	var result = document.getElementById('troopsReport').getElementsByClassName('result')[0].innerHTML.replace(/\s+/g,' ');

	var report = title+'%|%'+date+'%|%'+battle+'%|%'+result;
	var val_name = window.location.host+'.com_'+id;
	if(window.setTimeout(function() {GM_setValue(val_name,report)},0))
	{
		alert(lang.alertsaved);
	}
	else
	{
		alert(lang.alertsavefailed);
	}
}
unsafeWindow.messageSave = function(object)
{
	var object;
	var id 		= object.parentNode.parentNode.parentNode.id;
	var ID	 	= id.replace('tbl_reply','');
	var header 	= document.getElementById('message'+ID);
	var msg 	= document.getElementById('tbl_mail'+ID).childNodes[1].childNodes[1].innerHTML;

	var from 	= header.childNodes[5].childNodes[0].innerHTML;
	var title 	= header.childNodes[7].innerHTML;
	var city 	= header.childNodes[9].innerHTML;
	var dt		= header.childNodes[11].innerHTML;
	
	var report = from+'%|%'+title+'%|%'+city+'%|%'+dt+'%|%'+msg;
	var val_name = window.location.host+'.msg_'+ID;
	if(window.setTimeout(function() {GM_setValue(val_name,report)},0))
	{
		alert(lang.alertsaved);
	}
	else
	{
		alert(lang.alertsavefailed);
	}
}
unsafeWindow.messageSaveOutbox = function(object)
{
	var object;
	var id 		= object.parentNode.parentNode.parentNode.id;
	var ID	 	= id.replace('tbl_mail','');
	var header 	= document.getElementById('tbl_mail'+ID).previousSibling.previousSibling;

	var to 	= header.childNodes[5].childNodes[0].innerHTML;;
	var title 	= header.childNodes[7].innerHTML;
	var dt		= header.childNodes[9].innerHTML;
	
	var msg 	= document.getElementById('tbl_mail'+ID).childNodes[1].childNodes[1].innerHTML;

	var report = to+'%|%'+title+'%|%'+dt+'%|%'+msg;
	var val_name = window.location.host+'.msgout_'+ID;
	if(window.setTimeout(function() {GM_setValue(val_name,report)},0))
	{
		alert(lang.alertsaved);
	}
	else
	{
		alert(lang.alertsavefailed);
	}
}
unsafeWindow.saveSelectedMSGS = function()
{
	var selectedMsgs = new Array();
	var allInputs = document.getElementById("deleteMessages").getElementsByTagName("input");
	var b = 0;
	for (var i=0; i<allInputs.length; i++) {
		 if (allInputs[i].getAttribute("type") == "checkbox") {
			 if (allInputs[i].checked) {
				selectedMsgs[b++] = allInputs[i].name.replace("deleteId[","").replace("]","");
			 }
		 }
	}
    for(var i in selectedMsgs)
    {
        var msg = document.getElementById("tbl_mail"+selectedMsgs[i]).childNodes[1].childNodes[1].innerHTML;
        var info = document.getElementById("message"+selectedMsgs[i]);
        var from = info.childNodes[5].childNodes[0].innerHTML;
        var subject = info.childNodes[7].innerHTML;
        var city = info.childNodes[9].innerHTML;
        var date_time = info.childNodes[11].innerHTML;

		var report = from+'%|%'+subject+'%|%'+city+'%|%'+date_time+'%|%'+msg;
		var val_name = window.location.host+'.msg_'+selectedMsgs[i];
		unsafeWindow.saveMSG(val_name,report);
	}
	alert(lang.alertsaved);
}
unsafeWindow.saveSelectedMSGS_outbox = function()
{
	var selectedMsgs = new Array();
	var allInputs = document.getElementById("deleteMessages").getElementsByTagName("input");
	var b = 0;
	for (var i=0; i<allInputs.length; i++) {
		 if (allInputs[i].getAttribute("type") == "checkbox") {
			 if (allInputs[i].checked) {
				selectedMsgs[b++] = allInputs[i].name.replace("deleteId[","").replace("]","");
			 }
		 }
	}
    for(var i in selectedMsgs)
    {
        var msg = document.getElementById("tbl_mail"+selectedMsgs[i]).childNodes[1].childNodes[1].innerHTML;
        var info = document.getElementById("tbl_mail"+selectedMsgs[i]).previousSibling.previousSibling;
        var to = info.childNodes[5].childNodes[0].innerHTML;
        var subject = info.childNodes[7].innerHTML;
        var date_time = info.childNodes[9].innerHTML;

		var report = to+'%|%'+subject+'%|%'+date_time+'%|%'+msg;
		var val_name = window.location.host+'.msgout_'+selectedMsgs[i];
		unsafeWindow.saveMSG(val_name,report);
	}
	alert(lang.alertsaved);
}
unsafeWindow.saveMSG = function(val_name,report) { window.setTimeout(function() {GM_setValue(val_name,report)},0); }
unsafeWindow.deleteSlectedFromArchive = function()
{
	if(confirm(lang.alertmultydelete))
	{
		var selectedMsgs = new Array();
		var allInputs = document.getElementById("msgArchiveContainer").getElementsByTagName("input");
		var b = 0;
		for (var i=0; i<allInputs.length; i++) {
			 if (allInputs[i].getAttribute("type") == "checkbox") {
				 if (allInputs[i].checked) {
					window.setTimeout(GM_deleteValue,0,allInputs[i].value);
				 }
			 }
		}
		document.location.reload();
	}
}
unsafeWindow.selectArchived = function(command)
{
		var selectedMsgs = new Array();
		var allInputs = document.getElementById("msgArchiveContainer").getElementsByTagName("input");
		var b = 0;
		for (var i=0; i<allInputs.length; i++) {
			 if (allInputs[i].getAttribute("type") == "checkbox") {
				if(command == 'all')
				{
					allInputs[i].checked = true;
				}
				if(command == 'none')
				{
					allInputs[i].checked = false;
				}
				if(command == 'invert')
				{
					if(allInputs[i].checked) { allInputs[i].checked = false;} else {allInputs[i].checked = true;}
				}
			 }
		}
}
var view = locator('view');
if(view=='militaryAdvisorReportView')
{
	var button = document.getElementsByClassName('link')[0].childNodes[3];
	button.parentNode.removeChild(button);
	var link_btn = document.createElement('a');
	link_btn.setAttribute('href','javascript:void(0);');
	link_btn.setAttribute('onClick','SaveCombatReport(\''+locator('combatId')+'\');');
	link_btn.setAttribute('class','button');
	link_btn.innerHTML = lang.savereport;
	document.getElementsByClassName('link')[0].appendChild(link_btn);
}
if(view=='militaryAdvisorCombatReportsArchive')
{
	document.getElementsByTagName('body')[0].id = 'militaryAdvisorReportView';
	document.getElementsByClassName('buildingDescription')[0].setAttribute('style','min-height:0px;');
	document.getElementsByTagName('link')[2].href = '/skin/ik_militaryAdvisorReportView_0.4.0.css';
	document.getElementById('troopsOverview').getElementsByClassName('content')[0].innerHTML = ViewCombatReports();
}
if(view=='safehouseReports')
{
	var buttons = document.getElementsByClassName('button');
	buttons[0].parentNode.innerHTML = '<a href="javascript:void(0);" style="text-decoration: none;" class="button" onClick="saveSpyReport();">'+lang.savereport+'</a>';
}
if(view=='safehouse'&&locator('tab')=='archive')
{
	document.getElementById("mainview").childNodes[5].childNodes[1].innerHTML = ViewSpyReports();
}
if(view=='diplomacyAdvisor')
{
	var body = document.getElementsByTagName('body');
	var cbox = document.getElementsByClassName('selection');
	cbox[0].innerHTML = cbox[0].innerHTML + '<a href="javascript:void(0);" style="text-decoration: none;" class="button" onClick="saveSelectedMSGS();">'+lang.saveselected+'</a>';
	var retnode = [];
	var myclass = new RegExp('\\b'+'costAmbrosia'+'\\b');
	var elem = document.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++)
	{
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	for(var i in retnode)
	{
		retnode[i].parentNode.innerHTML = '<a href="javascript:void(0);" style="text-decoration: none;" class="button" onClick="messageSave(this);">'+lang.save+'</a>';
	}
}
if(view=='diplomacyAdvisorOutBox')
{
	var body = document.getElementsByTagName('body');
	var cbox = document.getElementsByClassName('selection');
	cbox[0].innerHTML = cbox[0].innerHTML + '<a href="javascript:void(0);" style="text-decoration: none;" class="button" onClick="saveSelectedMSGS_outbox();">'+lang.saveselected+'</a>';
	var retnode = [];
	var myclass = new RegExp('\\b'+'costAmbrosia'+'\\b');
	var elem = document.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++)
	{
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	for(var i in retnode)
	{
		retnode[i].parentNode.innerHTML = '<a href="javascript:void(0);" style="text-decoration: none;" class="button" onClick="messageSaveOutbox(this);">'+lang.save+'</a>';
	}
}
if(view=='diplomacyAdvisorArchive')
{
	document.getElementById('deleteMessages').childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML = '> '+lang.ikariamarchive+' <';
	
	var tabel = document.getElementById('deleteMessages').childNodes[1].getElementsByTagName("TBODY")[0];
	var row	= document.createElement("TR");
	var td = document.createElement("TD");

	td.setAttribute('colspan','6');
	td.setAttribute('id','msgArchiveContainer');
	td.setAttribute('style','padding:0px;');
	row.appendChild(td);
	tabel.appendChild(row);


	document.getElementById('msgArchiveContainer').innerHTML = ViewMsgArchive();
}
if(view=='diplomacyAdvisorArchiveOutBox')
{
	document.getElementById('deleteMessages').childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML = '> '+lang.ikariamarchive+' <';
	
	var tabel = document.getElementById('deleteMessages').childNodes[1].getElementsByTagName("TBODY")[0];
	var row	= document.createElement("TR");
	var td = document.createElement("TD");

	td.setAttribute('colspan','6');
	td.setAttribute('id','msgArchiveContainer');
	td.setAttribute('style','padding:0px;');
	row.appendChild(td);
	tabel.appendChild(row);


	document.getElementById('msgArchiveContainer').innerHTML = ViewMsgArchiveOutbox();
}
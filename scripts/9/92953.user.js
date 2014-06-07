// ==UserScript==
// @name            Facebook APR (application post remover)
// @description     remove old posts from FB applications (games, quizes, etc ...)
// @author          Sigi_cz
// @version         2.55
// @homepage        http://userscripts.org/scripts/show/92953
// @licence         http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include         http://userscripts.org/scripts/source/92953.meta.js*
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// ==/UserScript==

// some code parts are inspired or borroved from many great scripts (why reinvent wheel?)
// thanks to:
// "FFixer" http://userscripts.org/scripts/show/8861
// "FB MafiaWars Addon" http://userscripts.org/scripts/show/90615
// "Facebook Recent Activity" http://userscripts.org/scripts/show/68225
// "google.com"
// "stackoverflow.com"

/*jslint browser: true, devel: true, evil: true*/
/*global unsafeWindow:true, window:false, self:false, chrome:false, localStorage:true, XPathResult:false,
  GM_addStyle:true, GM_log:true, GM_getValue:true, GM_setValue:true, GM_deleteValue:true */

(function () {
var isDebug = true;


//------------------------------------------------
// script informations
//------------------------------------------------

var script_info = {
		name: 'Facebook Application Post Remover',
		name_med: 'FB Application Post Remover',
		name_short: 'FB APR',
		author: 'Sigi_cz',
		author_mail: 'sigi_cz@centrum.cz',
		id: '92953',
		ver: '2.55',
		url: 'http://userscripts.org/scripts/show/92953',
		meta: 'http://userscripts.org/scripts/source/92953.meta.js'
};


//------------------------------------------------
// skip "weird" pages
//------------------------------------------------

var stop_now = false, addr = window.location.href;
try {
	// don't run in frames, except updater
	if (self !== window.top) {
		if (!addr.match(script_info.meta)) { stop_now = true; }
	}
	// don't run on weird pages
	else if (
			(addr.indexOf('/ai.php') > 0) ||
			(addr.indexOf('/ajax/') > 0) ||
			(addr.indexOf('/connect/') > 0) ||
			(addr.indexOf('/extern/') > 0) ||
			(addr.indexOf('/plugins/') > 0) ||
			(addr.indexOf('/widgets/') > 0)) { stop_now = true; }
} catch(x) { debugMsg('skip "weird" pages error: ' + x, 1); stop_now = true; }
debugMsg('skip "weird" pages - ' + (stop_now ? 'stop' : 'continue') + '\n' + addr, 1);
if (stop_now) { return; }


//------------------------------------------------
// unsafeWindow
//------------------------------------------------

if (typeof unsafeWindow === 'undefined') { unsafeWindow = window; }

// detect Chromium browser - finally working code
var getDOMWindow = function () {
	var elt = document.createElement('div');
	elt.setAttribute('onclick', 'return window;');
	return elt.onclick();
};
if (typeof chrome  !== 'undefined' && chrome.extension) {
	unsafeWindow = getDOMWindow();
}


//------------------------------------------------
// custom settings
//------------------------------------------------

var cfg_default_user = {
		all_apps: false, // remove all application posts
		time_limit: 12, // remove posts older then X hours
		autorun: false, // start automatically (works only in Opera)
		only_user_posts: false, // false: remove all app. post; true: remove only your app. posts
		continue_proc: true, // search last known post and continue processing (disabled if hide_posts = true)
		hide_posts: false, // don't remove posts, only hide
		xhr_delay: 300, // XMLHttpRequest delay X in ms (you don't want to remove all posts at once)
		language: 'auto', // GUI language
		appIDs: [] // ID's of applications to remove
		, // temporary join global and user cfg
//};
//var cfg_default_global = {
		lastUpdateCheck: 0,
		version: '0',
		updateInterval: 6, // hours
		debug_mode: true // debug mode
};
var default_appIDs = [
		['10979261223','Mafia Wars'],
		['234860566661','Treasure Isle'],
		['46755028429','Castle Age'],
		['102452128776','FarmVille'],
		['130402594779','Kingdoms of Camelot']];
cfg_default_user.appIDs = default_appIDs;

var cfg = {}; // global configuration
var cfu = {}; // user configuration


//------------------------------------------------
// text strings
//------------------------------------------------

var text_strings = {
// translations can be made from 'en' text strings.
// untranslated lines can be removed and 'en' string will be used instead
// keep %number markers correctly placed - they are replaced later.
	languages : ['cs', 'en', 'es', 'nl', 'ro', 'sk', 'zh'],
	// English by Sigi_cz - default
	en : {
		'_language' : 'English',
		'cfg-language' : 'language: ',
		'cfg-config' : 'Configuration',
		'cfg-author' : 'author',
		'cfg-author_email' : 'send e-mail to author',
		'cfg-licence' : 'is licensed under a',
		'cfg-appIDs' : 'appID\'s to remove:',
		'cfg-appIDs-hlp' : 'each row contains one appID, optional text behind ID is comment',
		'cfg-all_apps' : 'all applications',
		'cfg-all_apps-hlp' : 'remove posts from all applications',
		'cfg-time_limit' : '(hours) time limit',
		'cfg-time_limit-hlp' : 'remove posts older then X hours',
		'cfg-continue_proc' : 'continue processing',
		'cfg-continue_proc-hlp' : 'search last known post and continue processing',
		'cfg-autorun' : 'start automatically',
		'cfg-autorun-hlp' : 'processing starts when page is loaded',
		'cfg-only_user_posts' : 'only own posts',
		'cfg-only_user_posts-hlp' : 'check only your app. posts or also from friends',
		'cfg-hide_posts' : 'hide posts',
		'cfg-hide_posts-hlp' : 'don\'t remove posts, only hide',
		'cfg-xhr_delay' : '(ms) delay for removing',
		'cfg-xhr_delay-hlp' : 'you don\'t want to remove all posts at once',
		'cfg-debug_mode' : 'debug mode',
		'gui-runbtn' : 'APR',
		'gui-runbtn-hlp' : 'start posts processing',
		'gui-cfgbtn' : 'Configure APR',
		'gui-cfgbtn-hlp' : 'show APR configuration window',
		'gui-close' : 'Close',
		'gui-save' : 'Save',
		'gui-add' : 'Add',
		'gui-remove' : 'Remove',
		'inf-error' : 'error - see console for details.',
		'inf-search' : 'searching last known old post %1 - page %2.',
		'inf-process' : 'processing visible posts.',
		'inf-xremoved' : '%1 posts total, %2 old removed.',
		'inf-xhidden' : '%1 posts total, %2 old hidden.',
		'str-update_long' : ' UPDATE FOUND%1%1 %2%1 installed version: %3%1 actual version: %4%1 update URL: %5%1%1 Do you want to update now?%1%1',
		'str-addremove' : 'add/remove application',
		'str-unknown' : 'unknown page',
		'str-unknown_long' : 'I don\'t know this page. Should I do something here?%1Contact me with suggestions: ',
		'str-old_profile' : 'old profile',
		'str-old_profile_long' : 'Old profile page layout is unsupported by APR.%1(I can\'t debug new features on it anymore.)%1%1Please switch to %2new profile layout%3.',
		'str-APRhome' : 'homepage',
		'str-APRhome_long' : 'Home sweet home :)',
		'_language_end' : 'English'
	},
	// Czech by Sigi_cz
	cs : {
		'_language' : 'Česky (Czech)',
		'cfg-language' : 'jazyk: ',
		'cfg-config' : 'Nastavení',
		'cfg-author' : 'autor',
		'cfg-author_email' : 'poslat e-mail autorovi',
		'cfg-licence' : 'je licencován pod',
		'cfg-appIDs' : 'ID aplikací k odstranění:',
		'cfg-appIDs-hlp' : 'každý řádek obsahuje jedno ID, text za ID je komentář',
		'cfg-all_apps' : 'všechny aplikace',
		'cfg-all_apps-hlp' : 'odstranit příspěvky ze všech aplikací',
		'cfg-time_limit' : '(hodin) časový limit',
		'cfg-time_limit-hlp' : 'odstranit příspěvky starší než X hodin',
		'cfg-continue_proc' : 'pokračovat ve zpracování',
		'cfg-continue_proc-hlp' : 'vyhledat poslední nezpracovaný příspěvek a pokračovat ve zpracování',
		'cfg-autorun' : 'automatické spouštění',
		'cfg-autorun-hlp' : 'zpracování se spustí ihned po načtení stránky',
		'cfg-only_user_posts' : 'pouze vlastní příspěvky',
		'cfg-only_user_posts-hlp' : 'kontrolovat pouze vlastní příspěvky, nebo i od přátel',
		'cfg-hide_posts' : 'skrývat příspěvky',
		'cfg-hide_posts-hlp' : 'příspěvky nemazat ale pouze skrývat',
		'cfg-xhr_delay' : '(ms) prodleva pro mazání',
		'cfg-xhr_delay-hlp' : 'nechceme odstraňovat všechny příspěvky najednou',
		'cfg-debug_mode' : 'režim ladění',
		'gui-runbtn' : 'APR',
		'gui-runbtn-hlp' : 'spustit zpracování příspěvků',
		'gui-cfgbtn' : 'Nastavit APR',
		'gui-cfgbtn-hlp' : 'zobrazit konfigurační okno APR',
		'gui-close' : 'Zavřít',
		'gui-save' : 'Uložit',
		'gui-add' : 'Přidat',
		'gui-remove' : 'Odebrat',
		'inf-error' : 'chyba - více informací v chybové konzoli.',
		'inf-search' : 'hledám poslední známý nezpracovaný příspěvek.',
		'inf-process' : 'zpracovávám zobrazené příspěvky.',
		'inf-xremoved' : '%1 příspěvků celkem, %2 starých odstraněno.',
		'inf-xhidden' : '%1 příspěvků celkem, %2 starých skryto.',
		'str-update_long' : ' NALEZENA AKTUALIZACE%1%1 %2%1 nainstalovaná verze: %3%1 aktuální verze: %4%1 adresa aktualizace: %5%1%1 Přejete si provést aktualizaci?%1%1',
		'str-addremove' : 'přidat/odebrat aplikaci',
		'str-unknown' : 'neznámá stránka',
		'str-unknown_long' : 'Tady to neznám. Měl bych tu něco dělat?%1Kontaktujte mě s nápady: ',
		'str-old_profile' : 'starý profil',
		'str-old_profile_long' : 'APR nepodporuje starý layout profilu%1(Už na něm nemůžu testovat nové věci.)%1%1Prosím přejděte na %2nový layout%3.',
		'str-APRhome' : 'homepage',
		'str-APRhome_long' : 'Domov sladký domov :)',
		'_language_end' : 'Česky (Czech)'
	},
	// Dutch translation by Stievydude
	nl : {
		'_language' : 'Nederlands (Dutch)',
		'cfg-language' : 'taal: ',
		'cfg-config' : 'Configuratie',
		'cfg-author' : 'auteur',
		'cfg-author_email' : 'verstuur een e-mail naar de auteur',
		'cfg-licence' : 'is gelicentieerd onder een',
		'cfg-appIDs' : 'te verwijderen toepassingID\'s:',
		'cfg-appIDs-hlp' : 'elke rij bevat één toepassingID, optionele tekst achter het ID is commentaar',
		'cfg-all_apps' : 'alle toepassingen',
		'cfg-all_apps-hlp' : 'verwijder posts van alle toepassingen',
		'cfg-time_limit' : '(uren) tijdslimiet',
		'cfg-time_limit-hlp' : 'verwijder posts ouder dan X uren',
		'cfg-continue_proc' : 'verdergaan met verwerken',
		'cfg-continue_proc-hlp' : 'zoek laatst gekende post en ga verder met verwerken',
		'cfg-autorun' : 'start automatisch',
		'cfg-autorun-hlp' : 'verwerken start wanneer de pagina is geladen',
		'cfg-only_user_posts' : 'alleen eigen posts',
		'cfg-only_user_posts-hlp' : 'controleer alleen eigen toepassingposts of ook van vrienden',
		'cfg-hide_posts' : 'verberg posts',
		'cfg-hide_posts-hlp' : 'verwijder geen posts, alleen verbergen',
		'cfg-xhr_delay' : '(ms) vertraging voor verwijderen ',
		'cfg-xhr_delay-hlp' : 'Je wil niet alle posts ineens verwijderen',
		'cfg-debug_mode' : 'debug modus',
		'gui-runbtn' : 'APR',
		'gui-runbtn-hlp' : 'start met verwerken posts',
		'gui-cfgbtn' : 'Configureer APR',
		'gui-cfgbtn-hlp' : 'toon APR configuratievenster',
		'gui-close' : 'Sluit',
		'gui-save' : 'Bewaar',
		'gui-add' : 'Voeg toe',
		'gui-remove' : 'Verwijder',
		'inf-error' : 'fout - zie console voor details.',
		'inf-search' : 'bezig met laatst bekende post te zoeken %1 - pagina %2.',
		'inf-process' : 'zichtbare posts verwerken.',
		'inf-xremoved' : '%1 posts in totaal, %2 oude verwijderd.',
		'inf-xhidden' : '%1 posts in totaal, %2 oude verborgen.',
		'str-update_long' : ' NIEUWE VERSIE GEVONDEN%1%1 %2%1 geïnstalleerde versie: %3%1 huidige versie: %4%1 update URL: %5%1%1 Nu updaten?%1%1',
		'str-addremove' : 'toepassing toevoegen/verwijderen',
		'str-unknown' : 'onbekende pagina',
		'str-unknown_long' : 'Ik ken deze pagina niet. Zou ik hier iets moeten doen? %1Contacteer me met suggesties: ',
		'str-old_profile' : 'oud profiel',
		'str-old_profile_long' : 'Oude profielpagina. De layout wordt niet ondersteund door APR.%1(Ik kan de nieuwe functies op deze pagina niet meer debuggen.)%1%1Stap a.u.b over naar het %2nieuw profiel%3.',
		'str-APRhome' : 'startpagina',
		'str-APRhome_long' : 'Zoals het klokje thuis tikt, tikt het nergens :)',
		'_language_end' : 'Nederlands (Dutch)'
	},
	// Spanish translation by Néstor
	es : {
		'_language' : 'Español (Spanish)',
		'cfg-language' : 'idioma: ',
		'cfg-config' : 'Configuración',
		'cfg-author' : 'autor',
		'cfg-author_email' : 'enviar e-mail al autor',
		'cfg-licence' : 'está bajo una licencia de',
		'cfg-appIDs' : 'appID\'s a borrar:',
		'cfg-appIDs-hlp' : 'cada linea contiene un appID, texto opcional detrás del ID es comentario',
		'cfg-all_apps' : 'Todas las aplicaciones',
		'cfg-all_apps-hlp' : 'borrar posts de todas aplicaciones',
		'cfg-time_limit' : '(horas) tiempo límite',
		'cfg-time_limit-hlp' : 'borrar posts más viejos que x horas',
		'cfg-continue_proc' : 'continua procesando',
		'cfg-continue_proc-hlp' : 'buscar último post y continuar procesando',
		'cfg-autorun' : 'comenzar automáticamente',
		'cfg-autorun-hlp' : 'proceso comienza cuando la página está cargada',
		'cfg-only_user_posts' : 'solo posts propios',
		'cfg-only_user_posts-hlp' : 'revisar sólo los posts de tus propias apps o tambien de amigos',
		'cfg-hide_posts' : 'ocultar posts',
		'cfg-hide_posts-hlp' : 'no borrar posts, sólo esconderlos',
		'cfg-xhr_delay' : '(ms) demora para el borrado',
		'cfg-xhr_delay-hlp' : 'no querrás borrar todos los posts al mismo tiempo',
		'cfg-debug_mode' : 'debug mode',
		'gui-runbtn' : 'APR',
		'gui-runbtn-hlp' : 'Comenzar a procesar posts',
		'gui-cfgbtn' : 'Configurar APR',
		'gui-cfgbtn-hlp' : 'Mostrar configuración APR',
		'gui-close' : 'Cerrar',
		'gui-save' : 'Guardar',
		'gui-add' : 'Agregar',
		'gui-remove' : 'Borrar',
		'inf-error' : 'error - mira la consola para detalles.',
		'inf-search' : 'buscando último post viejo conocido %1 - página %2.',
		'inf-process' : 'procesando posts visibles.',
		'inf-xremoved' : '%1 posts total, %2 viejos borrados.',
		'inf-xhidden' : '%1 posts total, %2 viejos ocultados.',
		'str-update_long' : ' ACTUALIZACIÓN ENCONTRADA%1%1 %2%1 versión instalada: %3%1 versión actual: %4%1 URL de actualiación: %5%1%1 ¿Quieres actualizar ahora?%1%1',
		'str-addremove' : 'agregar/quitar aplicación',
		'str-unknown' : 'página desconocida',
		'str-unknown_long' : 'No conozco esta página. ¿Debería hacer algo aquí?%1Contáctame con sugerencias: ',
		'str-old_profile' : 'viejo perfil',
		'str-old_profile_long' : 'El viejo diseño de página de perfil no es soportado por APR.%1(Ya no se puede depurar nuevas características en este.)%1%1Por favor cambie al %2nuevo diseño de perfil%3.',
		'str-APRhome' : 'homepage',
		'str-APRhome_long' : 'Hogar dulce hogar :)',
		'_language_end' : 'Español (Spanish)'
	},
	// Romanian translation by Virgil Damian
	ro : {
		'_language' : 'Romana (Romanian)',
		'cfg-language' : 'limba: ',
		'cfg-config' : 'Configurare',
		'cfg-author' : 'autor',
		'cfg-author_email' : 'trimite e-mail autorului',
		'cfg-licence' : 'are licenta',
		'cfg-appIDs' : 'appID-uri de sters:',
		'cfg-appIDs-hlp' : 'fiecare rand contine un appID, textul optional de dupa ID e comentariu',
		'cfg-all_apps' : 'toate aplicatiile',
		'cfg-all_apps-hlp' : 'sterge postarile de la toate aplicatiile',
		'cfg-time_limit' : '(ore) limita de timp',
		'cfg-time_limit-hlp' : 'sterge postarile mai vechi de X ore',
		'cfg-continue_proc' : 'continua procesarea',
		'cfg-continue_proc-hlp' : 'cauta ultima postare cunoscuta si continua procesarea',
		'cfg-autorun' : 'porneste automat',
		'cfg-autorun-hlp' : 'procesarea incepe cand se incarca pagina',
		'cfg-only_user_posts' : 'doar postarile proprii',
		'cfg-only_user_posts-hlp' : 'cauta doar postarile tale sau si pe cele ale prietenilor',
		'cfg-hide_posts' : 'ascunde postarile',
		'cfg-hide_posts-hlp' : 'postarile nu sunt sterse, doar ascunse',
		'cfg-xhr_delay' : '(ms) intarziere pentru stergere',
		'cfg-xhr_delay-hlp' : 'n-ai vrea sa stergi toate postarile deodata',
		'cfg-debug_mode' : 'debug mode',
		'gui-runbtn' : 'APR',
		'gui-runbtn-hlp' : 'incepe procesarea postarilor',
		'gui-cfgbtn' : 'Configureaza APR',
		'gui-cfgbtn-hlp' : 'arata fereastra de configurare APR',
		'gui-close' : 'Inchide',
		'gui-save' : 'Salveaza',
		'gui-add' : 'Adauga',
		'gui-remove' : 'Sterge',
		'inf-error' : 'eroare - vezi consola pentru detalii.',
		'inf-search' : 'se cauta ultima postare veche %1 - pagina %2.',
		'inf-process' : 'se proceseaza postarile vizible.',
		'inf-xremoved' : '%1 postari in total, %2 postari vechi sterse.',
		'inf-xhidden' : '%1 postari in total, %2 postari vechi ascunse.',
		'str-update_long' : ' ACTUALIZARE GASITA%1%1 %2%1 versiune instalata: %3%1 versiune actuala: %4%1 URL actualizare: %5%1%1 Vrei sa actualizezi acum?%1%1',
		'str-addremove' : 'adauga/sterge aplicatie',
		'str-unknown' : 'pagina necunoscuta',
		'str-unknown_long' : 'Nu conosc pagina aceasta. Ar trebui sa fac ceva aici?%1Contacteaza-ma cu sugestii: ',
		'str-old_profile' : 'profil vechi',
		'str-old_profile_long' : 'Stilul vechi pentru pagina de profil nu este suportat de APR.%1(Nu mai pot corecta proprietatile noi.)%1%1Te rog treci la %2noua tema de profil%3.',
		'str-APRhome' : 'pagina acasa',
		'str-APRhome_long' : 'Casa, dulce casa :)',
		'_language_end' : 'Romana (Romanian)'
	},
	// zh-tw translation by R-way Orz
	zh : {
		'_language' : '繁體中文 (Chinese)',
		'cfg-language' : '語言: ',
		'cfg-config' : '設定',
		'cfg-author' : '作者',
		'cfg-author_email' : '寄信給作者',
		'cfg-licence' : '依此授權:',
		'cfg-appIDs' : '限定移除的應用程式 ID:',
		'cfg-appIDs-hlp' : '每列包含一個應用程式 ID, ID 後為附註選填性文字',
		'cfg-all_apps' : '所有應用程式',
		'cfg-all_apps-hlp' : '移除所有應用程式的貼文',
		'cfg-time_limit' : '(小時) 保留時限',
		'cfg-time_limit-hlp' : '移除 N 小時以前的貼文',
		'cfg-continue_proc' : '接續處理',
		'cfg-continue_proc-hlp' : '從上次已知的最後一則貼文開始繼續處理',
		'cfg-autorun' : '自動開始',
		'cfg-autorun-hlp' : '網頁載入完即開始處理',
		'cfg-only_user_posts' : '僅自己的貼文',
		'cfg-only_user_posts-hlp' : '勾選的話則僅針對自己的應用程式貼文;否則一併處理朋友們的應用程式貼文',
		'cfg-hide_posts' : '隱藏貼文',
		'cfg-hide_posts-hlp' : '僅隱藏貼文而不移除 ',
		'cfg-xhr_delay' : '(毫秒) 間隔移除動作',
		'cfg-xhr_delay-hlp' : '若你不想一次秒殺所有貼文',
		'cfg-debug_mode' : '偵錯模式',
		'gui-runbtn' : 'APR',
		'gui-runbtn-hlp' : '開始處理貼文',
		'gui-cfgbtn' : '設定 APR',
		'gui-cfgbtn-hlp' : '顯示 APR 設定視窗',
		'gui-close' : '關閉',
		'gui-save' : '儲存',
		'gui-add' : '新增',
		'gui-remove' : '移除',
		'inf-error' : '錯誤 - 細節請查看主控台.',
		'inf-search' : '正在搜尋上次已知的最後一則貼文 %1 - 第 %2 頁.',
		'inf-process' : '正在處理可見貼文.',
		'inf-xremoved' : '總共 %1 則貼文, %2 則舊文已移除.',
		'inf-xhidden' : '總共 %1 則貼文, %2 則舊文已隱藏.',
		'str-update_long' : ' 發現更新%1%1 %2%1 已安裝版本: %3%1 實際版本: %4%1 更新網址: %5%1%1 現在就更新嗎?%1%1',
		'str-addremove' : '新增/移除 應用程式',
		'str-unknown' : '未知網頁',
		'str-unknown_long' : '這個網頁我不瞭啊. 我該幹些啥?%1給點建議吧: ',
		'str-old_profile' : '舊版個人檔案',
		'str-old_profile_long' : 'APR 不支援舊式個人檔案的頁面排版.%1(我再也無法維護舊版頁面裡的新功能.)%1%1請切換到 %2新版個人檔案%3.',
		'str-APRhome' : '首頁',
		'str-APRhome_long' : '甜蜜的家 :)',
		'_language_end' : '繁體中文 (Chinese)'
	},
	// Slovak translation by Strateny
	sk : {
		'_language' : 'Slovensky (Slovak)',
		'cfg-language' : 'jazyk: ',
		'cfg-config' : 'Nastavenia',
		'cfg-author' : 'autor',
		'cfg-author_email' : 'poslať e-mail autorovi',
		'cfg-licence' : 'je licencovaný pod',
		'cfg-appIDs' : 'ID aplikácií, ktoré budú odstraňované:',
		'cfg-appIDs-hlp' : 'každý riadok obsahuje jedno ID, text za ID je iba komentár',
		'cfg-all_apps' : 'všetky aplikácie',
		'cfg-all_apps-hlp' : 'odstrániť príspevky od všetkých aplikácií',
		'cfg-time_limit' : 'hodín - časový limit',
		'cfg-time_limit-hlp' : 'odstrániť príspevky staršie ako X hodín',
		'cfg-continue_proc' : 'pokračovať vo vymazávaní',
		'cfg-continue_proc-hlp' : 'vyhľadať posledný nespracovaný príspevok a pokračovať vo vymazávaní',
		'cfg-autorun' : 'automatické spúšťanie',
		'cfg-autorun-hlp' : 'vymazávanie sa spustí automaticky po načítaní stránky',
		'cfg-only_user_posts' : 'len vlastné príspevky',
		'cfg-only_user_posts-hlp' : 'spracovať len vlastné príspevky (od priateľov ponechať)',
		'cfg-hide_posts' : 'príspevky iba skrývať',
		'cfg-hide_posts-hlp' : 'príspevky nevymazávať, ale iba skrývať',
		'cfg-xhr_delay' : '(ms) oneskorenie pre vymazávanie',
		'cfg-xhr_delay-hlp' : 'čakanie na odozvu servera, príliš nízky čas výrazne spomalí prehliadač',
		'cfg-debug_mode' : 'ladiaci režim',
		'cfg-debug_mode-hlp' : 'help pre ladiaci režim',
		'gui-runbtn' : 'APR',
		'gui-runbtn-hlp' : 'spustiť spracovanie príspevkov',
		'gui-cfgbtn' : 'Nastaviť APR',
		'gui-cfgbtn-hlp' : 'zobraziť konfiguračné okno APR',
		'gui-close' : 'Zavrieť',
		'gui-save' : 'Uložiť',
		'gui-add' : 'Pridať',
		'gui-remove' : 'Odobrať',
		'inf-error' : 'chyba - viac informácií nájdete v chybovej konzole.',
		'inf-search' : 'vyhľadávam posledný známy nespracovaný príspevok.',
		'inf-process' : 'spracovávam zobrazené príspevky.',
		'inf-xremoved' : '%1 príspevkov celkom, z toho bolo %2 starých odstránených.',
		'inf-xhidden' : '%1 príspevkov celkem, z toho bolo %2 starých skrytých.',
		'str-update_long' : ' NÁJDENÁ AKTUALIZÁCIA%1%1 %2%1 nainštalovaná verzia: %3%1 aktuálna verzia: %4%1 adresa aktualizácie: %5%1%1 Chcete vykonať aktualizáciu?%1%1',
		'str-addremove' : 'pridať/odobrať aplikáciu',
		'str-unknown' : 'neznáma stránka',
		'str-unknown_long' : 'Tuto to nepoznám. Mal by som tu niečo robiť?%1Ak máte nápad, kontaktujte ma: ',
		'str-old_profile' : 'starý profil',
		'str-old_profile_long' : 'APR nepodporuje starý layout profilu%1(Už na ňom nemôžem testovať nové veci.)%1%1Prosím prejdite na %2nový layout%3.',
		'str-APRhome' : 'homepage',
		'str-APRhome_long' : 'Domov sladký domov :)',
		'_language_end' : 'Slovensky (Slovak)'
	},
	text_strings_end : ''
};


//------------------------------------------------
// some helpfull functions
//------------------------------------------------

function doClick(elm) { var e = document.createEvent('MouseEvents'); e.initEvent('click', true, true, window, 0); elm.dispatchEvent(e); }

function destroy(elm) { if (elm && elm.parentNode) { elm.parentNode.removeChild(elm); } }

function testClass(elm, cls) { if (typeof cls === 'string') { cls = new RegExp('(^|\\s)' + cls + '(\\s|$)'); } return (elm.className && cls.test(elm.className)); }

function insertBefore(elm, ref) { if (ref && ref.parentNode) { ref.parentNode.insertBefore(elm, ref); } }

// select elements by 'tagname' '#ID' '.class' './xpath' '//xpath'
function $(q, root, single) {
	if (root && typeof root === 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]==='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]==='/' || (q[0]==='.' && q[1]==='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]==='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

// add event listeners
function on(type, elm, func) {
	if (type instanceof Array) { var ii=type.length; while (ii--) { on(type[ii], elm, func); } return; }
	if (elm instanceof Array) { var jj=elm.length; while (jj--) { on(type, elm[jj], func); } return; }
	(typeof elm === 'string' ? $(elm) : elm).addEventListener(type, func, false);
}

// GM_addStyle emulation
function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else {
		var ishead = document.getElementsByTagName('head')[0];
		var document_element = (!ishead ? document.documentElement : null);
		var link_stylesheet = document.createElement('link');
		link_stylesheet.rel = 'stylesheet';
		link_stylesheet.type = 'text/css';
		link_stylesheet.href = 'data:text/css,' + encodeURIComponent(css);
		if (ishead) { ishead.appendChild(link_stylesheet); }
		else { document_element.insertBefore(link_stylesheet, document_element.firstChild); }
	}
}

// check if string is part of array
function contains(arr, str, identical) {
	var ii = arr.length;
	while (ii--) {
		if (!identical) { if (arr[ii].indexOf(str) >= 0) { return ii; } }
		else { if (arr[ii] === str) { return ii; } }
	}
	return ii;
}

// send XMLHttpRequest
function xhr(url, callback_fn, data) {
	var res = new XMLHttpRequest();
	res.onreadystatechange = function () { if (typeof callback_fn === 'function' && res.readyState === 4 && res.status === 200) { callback_fn(res.responseText); } };
	res.open(data ? 'POST' : 'GET', url, true);
	res.setRequestHeader('User-agent', window.navigator.userAgent);
	if (data) {
		res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		res.setRequestHeader('Connection', 'close');
		res.setRequestHeader('Content-length', data.length);
	}
	res.send(data||null);
}

// delay script processing
function delay(millis) {
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while (curDate-date < millis);
}

// write debug info to console
function debugMsg(msg, force) {
	if (!force && !isDebug) { return false; }
	if (force === 0) { return false; }
	msg = script_info.name_short + ': ' + msg;
	if (typeof GM_log !== 'undefined') { GM_log(msg); return true; }
	if (typeof opera !== 'undefined' && opera.postError) { opera.postError(msg); return true; }
	if (typeof console !== 'undefined' && console.log) { console.log(msg); return true; }
	alert(msg);
	return false;
}

function env(key) {
	if (typeof unsafeWindow.Env !== 'undefined' && typeof unsafeWindow.Env[key] !== 'undefined') { return unsafeWindow.Env[key]; }
	return 'undefined';
}

if (typeof GM_openInTab !== 'function') { GM_openInTab = function (url) { window.open(url, ''); } }


//------------------------------------------------
// Data storage
//------------------------------------------------

// implement JSON functions if they're not already defined - modified from
// http://www.sitepoint.com/blogs/2009/08/19/javascript-json-serialization/
if (!this.JSON) { this.JSON = {}; }
if (typeof JSON.stringify !== 'function') {
	JSON.stringify = function (obj) {
		var t = typeof (obj);
		if (t !== 'object' || obj === null) {
			if (t === 'string') { obj = '"' + obj.replace('"', '\\"') + '"'; }
			return String(obj);
		} else {
			var n, v, json = [], arr = (obj && obj.constructor === Array);
			for (n in obj) {
				v = obj[n]; t = typeof(v);
				if (t !== 'function') {
					if (t === 'string') { v = '"' + v.replace('"', '\\"') + '"'; }
					if ( t === 'object' && v !== null) { v = JSON.stringify(v); }
					json.push((arr ? '' : '"' + n + '":') + String(v));
				}
			}
			return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
		}
	};
}
if (typeof JSON.parse !== 'function') {
	JSON.parse = function (str) {
		if (str === '') { str = '""'; }
		eval('var p=' + str + ';');
		return p;
	};
}

// prepare data storage functions
function storageInit() {
	debugMsg('initialize data storage');

	// detect available storage type
	var storage = 'none';
	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			// test if greasemonkey's functions work.
			var GM_testkey = 'GM_testkey',
			    GM_testvalue = 'GM_testvalue-' + (new Date() * 1);
			GM_setValue(GM_testkey, GM_testvalue);
			if (GM_getValue(GM_testkey, false) === GM_testvalue) { storage = 'greasemonkey'; }
			GM_deleteValue(GM_testkey);
		}
	} catch(x) { debugMsg('storageInit error: ' + x, 1); }
	if (storage === 'none' && typeof localStorage === 'object') { storage = 'localstorage'; }
	debugMsg('storage type=' + storage);

	// some shitty browser detected
	if (storage === 'none') {
		setTimeout(function () {
			alert('Sorry but your browser sux ...\n' +
			      'No permanent storage detected - initiating temporary storage.\n' +
			      'All changes will be lost after page refresh!');
		}, 0);
		localStorage = (function () {
			var ls_instance = {},
			    tmp_array = [];
			ls_instance.setItem = function (name, value){
				tmp_array[name] = value;
			};
			ls_instance.getItem = function (name) {
				return tmp_array[name] || null;
			};
			ls_instance.removeItem = function (name) {
				tmp_array[name] = null;
			};
			return ls_instance;
		})();
		storage = 'fakestorage';
	}

	// fake GM_ functions
	if (storage === 'localstorage' || storage === 'fakestorage') {
		GM_setValue = function (name, value) {
			localStorage.setItem(name, value);
		};
		GM_getValue = function (name, defaultValue) {
			return localStorage.getItem(name) || defaultValue;
		};
		GM_deleteValue = function (name) {
			localStorage.removeItem(name);
		};
	}

	return storage;
}

// function to handle configuration data
var CfgHandler = function (name, defaults, load) {
	var cfg_name = 'FB_APR-' + name,
			options = defaults,
			cfg_handler = {};
	var o_diff = {added: {}, added_cnt: 0, removed: {}, removed_cnt: 0},
			first_load = true;

	function toGood(value, def) {
		switch (typeof def) {
			case 'string' : return String(value);
			case 'number' : return isNaN(value) === false ? parseInt(value, 10) : def;
			case 'boolean' : return value === true;
			default: return typeof value === typeof def ? value : def;
		}
	}

	cfg_handler.str = function (){
		return cfg_name + '|JSON=' + (JSON.stringify(options));
	};
	cfg_handler.diff = function () {
		return o_diff;
	};

	//use (any) handler to save/load single value config
	cfg_handler.sset = function (key, value){
		setTimeout(function () {
			GM_setValue(cfg_name + '-' + key, value);
		}, 0);
	};
	cfg_handler.sget = function (key, default_val) {
		return GM_getValue(cfg_name + '-' + key) || default_val;
	};
	cfg_handler.sremove = function (key) {
		GM_deleteValue(cfg_name + '-' + key);
	};

	//save/load config, access values with set/get
	cfg_handler.set = function (key, value, save) {
		options[key] = toGood(value, options[key]);
		if (save === true) { cfg_handler.save(); }
	};
	cfg_handler.get = function (key) {
		return options[key];
	};
	cfg_handler.remove = function (key) {
		delete options[key];
	};
	cfg_handler.save = function (callback) {
		//setTimeout(function () {
			GM_setValue(cfg_name, JSON.stringify(options));
			if (typeof callback === 'function') {
				callback.apply(this);
			}
		//}, 0);
	};
	cfg_handler.load = function (callback) {
		//setTimeout(function () {
			var optt = GM_getValue(cfg_name, null);
			if (optt === null) { return; } // use default options
			var tempOpt = JSON.parse(optt);

			for (key in tempOpt){
				if (typeof options[key] !== 'undefined') {
					options[key] = toGood(tempOpt[key], options[key]);
				}
			}

			// check for default-loaded differences
			if (first_load) {

				for (key in options){
					if (typeof tempOpt[key] === 'undefined') {
						o_diff.added[key] = options[key];
						o_diff.added_cnt++;
					}
				}

				for (key in tempOpt){
					if (typeof options[key] === 'undefined') {
						o_diff.removed[key] = tempOpt[key];
						o_diff.removed_cnt++;
					}
				}

				first_load = false;
			}

			if (typeof callback === 'function') {
				callback.apply(this);
			}
		//}, 0);
	};

	if (load === true) { cfg_handler.load(); }
	return cfg_handler;
};


//------------------------------------------------
// "GUI"
//------------------------------------------------

var apr_language = 'en';

// set current language
function guiLanguage() {
	debugMsg('GUI select language');

	// try read document locale or default to english
	var loc = document.body.className.match(/locale_([^ ]+)/i) || ['', 'en'],
	    cfglng = cfu.get('language');
	if (cfglng === 'auto') {
		apr_language = loc[1].toLowerCase();
		if (!text_strings[apr_language]) {
			apr_language = apr_language.split('_')[0];
			if (!text_strings[apr_language]) { apr_language = 'en'; }
		}
	} else { apr_language = cfglng; }
}

// Get a string in the current language, default to english or return empty.
// Replace %x with text from repl array
function str(key, repl) {
	var out_string, lng = apr_language;
	if (!text_strings[lng][key]) { lng = 'en'; }
	if (text_strings[lng][key]) { out_string = text_strings[lng][key]; }
	else { out_string = ''; }
	if (repl) {
		if (typeof repl === 'number') { repl = repl + ''; }
		if (typeof repl === 'string') { repl = repl.split('#&@'); }
		if (repl instanceof Array) { var rgx, ii = repl.length; while (ii--) { rgx = new RegExp('%' + (ii + 1), 'g'); out_string = out_string.replace(rgx, repl[ii]); } }
	}
	return out_string;
}

// create element
function $elm(eType, eId, eClass, eContent) {
	if ($('#' + eId)) { destroy($('#' + eId)); }
	try {
		var newElm = document.createElement(eType);
		newElm.id = eId;
		if (typeof eClass === 'string') { newElm.className = eClass; }
		if (typeof eContent === 'string') { newElm.innerHTML = eContent; }
		return newElm;
	} catch(x) { debugMsg('elm error: ' + x, 1); }
}

// show info in apr_info div
function aprInfo(text) {
	debugMsg('info: "' + text + '"', 1);

	try {
		var result = $('#apr_info');
		result.firstChild.innerHTML = 'APR: ' + text;
		result.style.height = 'auto';
		result.style.overflow = 'visible';
		result.style.visibility = 'visible';
	} catch(x) { debugMsg('aprInfo error: ' + x, 1); }
}

// hide apr_info div
function guiInfoHide() {
	debugMsg('GUI hide info div');

	try {
		var result = $('#apr_info');
		result.style.height = '0px';
		result.style.overflow = 'hidden';
		result.style.visibility = 'hidden';
	} catch(x) { debugMsg('guiInfoHide error: ' + x, 1); }
}

// create div for informations
function guiCreateInfoDiv(elm) {
	debugMsg('GUI create info div');

	if ($('#apr_info')) { return; }
	try {
		addStyle([
		         '#apr_info { height:0px; padding:0 5px; display:block; border:1px dotted grey; overflow:hidden; visibility:hidden; }',
		         '#apr_info:hover #apr_info_close { color:red; }',
		         ''].join(''));

		var ELMinfo = $elm('div', 'apr_info', null, [
				'<span style="float:left;">APR: information area.</span>',
				'<span id="apr_info_close" style="float:right;" title="' + str('gui-close') + '"> [x]</span>',
				'<div style="clear:both;"></div>',
				''].join(''));
		insertBefore(ELMinfo, $(elm).firstChild);
		on('click', '#apr_info', guiInfoHide);
	} catch(x) { debugMsg('guiCreateInfoDiv error: ' + x, 1); }
}

// create button on right side of top menu
function guiCreateRunButton() {
	debugMsg('GUI create run button');

	if ($('#apr_runbtn')) { return; }
	try {
		var ELMbutton = $elm('li', 'apr_runbtn', null,
				'<a onclick="javascript:return(void);" title="' + str('gui-runbtn-hlp') + '">' + str('gui-runbtn') + '</a>');
		$('#pageNav').appendChild(ELMbutton);
		on('click', '#apr_runbtn', function () { aprProcess(); });
	} catch(x) { debugMsg('guiCreateRunButton error: ' + x, 1); }
}

// create menu item inside FB account menu
function guiCreateConfigButton() {
	debugMsg('GUI create configuration button');

	if ($('#apr_cfgbtn')) { return; }
	try {
		var ELMconfig = $elm('li', 'apr_cfgbtn', null,
				'<a onclick="javascript:return(void);" title=\'' + str('gui-cfgbtn-hlp') + '\'>' + str('gui-cfgbtn') + '</a>');
		insertBefore(ELMconfig, $('//li[@id="navAccount"]/ul', null, true).childNodes[2]);
		on('click', '#apr_cfgbtn', aprShowConfig);
	} catch(x) { debugMsg('guiCreateConfigButton error: ' + x, 1); }
}

var apr_popup_level = 0;

// create popup
function guiCreatePopup() {
	debugMsg('GUI create popup');

	try {
		if (apr_popup_level === 0) {
			addStyle([
			         '.apr_popupanchor { display:none; top:0; right:0; bottom:0; left:0; }',
			         '.apr_popupshadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.3; }',
			         '.apr_popup { position:relative; margin:auto; padding:10px; border:3px double #666666; background:#f6f6f6; }',
			         '.apr_fll { float:left; }',
			         '.apr_flr { float:right; }',
			         '.apr_3t { position:relative; top:3px; }',
			         ''].join(''));
		}

		document.body.appendChild($elm('div', 'apr_popupanchor' + apr_popup_level, 'apr_popupanchor'));
		document.body.appendChild($elm('div', 'apr_popupshadow' + apr_popup_level, 'apr_popupshadow'));

	} catch(x) { debugMsg('guiCreatePopup error: ' + x, 1); }
}

// hide popup created with guiShowPopup
function guiHidePopup() {
	debugMsg('GUI hide popup');

	try {
		$('#apr_popupanchor' + apr_popup_level).style.display = 'none';
		$('#apr_popupshadow' + apr_popup_level).style.display = 'none';
		apr_popup_level--;
		if (apr_popup_level > 0) { $('#apr_popupshadow' + apr_popup_level).style.display = 'block'; }
	} catch(x) { debugMsg('guiHidePopup error: ' + x, 1); }
}

// show popup div with a shadow background
function guiShowPopup(id, width, top, fixedPosition, title, body, showAbout, footer_r, autoclose_delay) {
	debugMsg('GUI show popup');

	try {
		apr_popup_level++;
		guiCreatePopup();

		var anch = $('#apr_popupanchor' + apr_popup_level),
		    shdw = $('#apr_popupshadow' + apr_popup_level),
		    close_btn_id = '#apr_popup_msg_close' + apr_popup_level,
		    footer_l = '';

		if (typeof id !== 'string') { id = 'apr_popup-' + apr_popup_level; }
		if (typeof width !== 'string') { width = '400px'; }
		if (typeof top !== 'string') { top = '200px'; }
		if (typeof fixedPosition !== 'boolean') { fixedPosition = true; }
		if (typeof title !== 'string') { title = ''; }
		if (typeof body !== 'string') { body = ''; }
		if (typeof footer_l !== 'string') { footer_l = ''; }
		if (typeof footer_r !== 'string') { footer_r = ''; }

		if (typeof showAbout === 'boolean' && showAbout === true) {
			footer_l = [
				'<a href="' + script_info.url + '" target="_blank" title="' + script_info.name + '">' + script_info.name_short + '</a>',
				' v' + script_info.ver + ' (' + str('cfg-author') + ' ',
				'<a href="' + script_info.author_mail + '" title="' + str('cfg-author_email') + '">' + script_info.author + '</a>) ',
				str('cfg-licence') + ' ',
				'<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/" title="Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License">',
				'<span class="apr_3t"><img alt="cc-by-nc-nd-3.0" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-nd/3.0/80x15.png" /></span></a>',
				''].join('');
		}

		anch.innerHTML = [
			'<div id="' + id + '" class="apr_popup" style="width:' + width + '; top:' + top + ';">',
				// "title"
				'<span style="font-size:14px;"><b>' + script_info.name_med + '</b></span> - ' + title + '<br /><hr />',
				// "body"
				'<div>',
					body,
				'</div>',
				// "footer"
				'<div style="clear:both;"></div><hr />',
				'<div>',
					'<span class="apr_fll apr_3t">',
						footer_l,
					'</span>',
					'<span class="apr_flr">',
						footer_r,
						'<input type="button" id="' + close_btn_id + '" value="' + str('gui-close') + '" />',
					'</span>',
				'</div>',
				'<div style="clear:both;"></div>',
			'</div>'].join('');

		shdw.style.zIndex = (1000 + (apr_popup_level * 2)) + '';
		anch.style.zIndex = (1001 + (apr_popup_level * 2)) + '';
		shdw.style.display = 'block';
		anch.style.display = 'block';
		$('#apr_popupshadow' + (apr_popup_level - 1)).style.display = 'none';
		anch.style.position = fixedPosition ? 'fixed' : 'absolute';
		if (!fixedPosition) { window.scroll(0, 0); }
		doClick(anch); // click on popup to get rid of FB menu
		on('click', '#' + close_btn_id, guiHidePopup);
		if (typeof autoclose_delay === 'number') {
			var aprmsgtimeout = setTimeout(guiHidePopup, autoclose_delay);
			on('click', '#' + close_btn_id, function () { clearTimeout(aprmsgtimeout); });
		}

	} catch(x) { debugMsg('guiShowPopup error: ' + x, 1); }
}

// messagebox based on guiShowPopup
function guiShowMessage(title, body, buttons, autoclose_delay) {
	debugMsg('GUI show message');

	guiShowPopup(null, null, null, true, title, body, null, buttons, autoclose_delay);
}


//------------------------------------------------
// Configuration
//------------------------------------------------

// show config window
function aprShowConfig() {
	debugMsg('show configuration window');

	var apr_option = 'apr_cfg_o_',
	    cfgID = 'apr_popup-config';
	cfu.load();

	addStyle([
	         '.apr_in-row { overflow:hidden; clear:both; }',
	         '.apr_in-row label{ margin-left:4px; position:relative; top:3px; }',
	         '.apr_in-row_cb { float:left; width:36px; border:1px solid #f6f6f6; }',
	         '.apr_in-row_ni { float:left; width:32px; margin-right:2px; border:1px solid grey; }',
	         '#apr_cfg_leftcol { float:left; width:290px; }',
	         '#apr_cfg_rightcol { float:right; width:290px; }',
	         ''].join(''));

	// create checkbox
	function inChb(opt) {
		return ['<div title="' + str('cfg-' + opt + '-hlp') + '" class="apr_in-row">',
							'<div class="apr_in-row_cb"><input type="checkbox" id="' + apr_option + opt + '" class="apr_flr" /></div>',
							'<label for="' + apr_option + opt + '">' + str('cfg-' + opt) + '</label>',
						'</div>'].join('');
	}

	// create inputbox
	function inVal(opt) {
		return ['<div title="' + str('cfg-' + opt + '-hlp') + '" class="apr_in-row">',
							'<input type="text" id="' + apr_option + opt + '" class="apr_in-row_ni" />',
							'<label for="' + apr_option + opt + '">' + str('cfg-' + opt) + '</label>',
						'</div>'].join('');
	}

	// create language selector
	function selLang(opt) {
		var opts = '', ii, lngl = text_strings.languages.length;
		for (ii = 0; ii < lngl; ii++) {
			opts = opts + '<option value="' + text_strings.languages[ii] + '">' + text_strings[text_strings.languages[ii]]._language + '</option>';
		}
		return ['<div title="' + str('cfg-' + opt + '-hlp') + '" class="apr_in-row">',
						 str('cfg-' + opt),
						'<select id="' + apr_option + opt + '">',
							'<option value="auto">Automatic</option>',
							opts,
						'</select>',
						'</div>'].join('');
	}

	// show config window
	guiShowPopup(cfgID, '600px', '100px', true, str('cfg-config'),
			// body
			['<div id="apr_cfg_leftcol">',
					selLang('language'),
					'<br />',
					inVal('time_limit'),
					inChb('continue_proc'),
					inChb('autorun'),
					inChb('only_user_posts'),
					inChb('hide_posts'),
					'<br /><br />',
					inChb('debug_mode'),
					inVal('xhr_delay'),
				'</div>',
				'<div id="apr_cfg_rightcol">',
					inChb('all_apps'),
					'<span title="' + str('cfg-appIDs-hlp') + '">' + str('cfg-appIDs') + '</span><br />',
					'<textarea id="' + apr_option + 'appIDs" style="width:97%; height:150px;"></textarea>',
				'</div>',
			''].join(''),
			true, // about
			'<input type="button" id="apr_cfg_save" value="' + str('gui-save') + '" /> '
			);

	// set/get config values
	function setgetInputs(mode) {
		var elm, opt,
		    opts = $('//*[@id="' + cfgID + '"]//input[starts-with(@id,"' + apr_option + '")]'),
		    ii = opts.snapshotLength;

		while (ii--) {
			elm = opts.snapshotItem(ii);
			opt = elm.id.replace(apr_option, '');

			if (mode === 'set') {
				if (elm.type === 'checkbox') { elm.checked = cfu.get(opt); }
				if (elm.type === 'text') { elm.value = cfu.get(opt); }
			}
			if (mode === 'get') {
				if (elm.type === 'checkbox') { cfu.set(opt, elm.checked); }
				if (elm.type === 'text') { cfu.set(opt, elm.value); }
			}
		}
	}

	// set/get appIDs from textarea
	function setgetAppIDs(mode) {
		var ii, val, opt = 'appIDs',
		    elm = $('//*[@id="' + cfgID + '"]//*[@id="' + apr_option + opt + '"]').snapshotItem(0);

		function sortByName(a, b) {
				var x = ('str' + a[1]).toLowerCase(), y = ('str' + b[1]).toLowerCase();
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}

		if (mode === 'set') {
			//duplicate array, sort by name and join
			val = cfu.get(opt).slice().sort(sortByName); ii = val.length;
			while (ii--) { val[ii] = val[ii].join(' '); }
			elm.value = val.join('\n');
		}
		if (mode === 'get') {
			//remove empty lines and split into array ...
			val = elm.value.replace(/[\r\n][\s]+[\r\n]/g, '\n').replace(/^[\r\n]+|[\r\n]+$/g, '').split(/[\r\n]+/); ii = val.length;
			//... trim whitespaces from each element and split (2D array)
			while (ii--) { val[ii] = val[ii].replace(/^\s+|\s+$/g, '').split(/\s+(.+)/, 2); }
			cfu.set(opt, val);
		}
	}

	// set/get selected language option
	function setgetLanguage(mode) {
		var opt = 'language',
		    elm = $('//*[@id="' + cfgID + '"]//*[@id="' + apr_option + opt + '"]').snapshotItem(0);

		if (mode === 'set') { elm.value = cfu.get(opt); }
		if (mode === 'get') { cfu.set(opt, elm.value); }
	}

	function saveCfg() {
		setgetInputs('get');
		setgetAppIDs('get');
		setgetLanguage('get');
		guiLanguage();
		cfu.save();
		guiHidePopup();
		aprShowConfig();
	}

	setgetInputs('set');
	setgetAppIDs('set');
	setgetLanguage('set');

	on('click', '#apr_cfg_save', saveCfg);
}


//------------------------------------------------
// Updater
//------------------------------------------------

// check for script update in metadata iframe
function updaterStart() {
	debugMsg('updater - check update iframe', 1);

	try {
		var metadata = document.getElementsByTagName('body')[0].innerHTML,
		    metaID = metadata.match(/@uso:script\s*(.+)/)[1],
		    metaVer = metadata.match(/@version\s*(.+)/)[1];
		debugMsg('' +
		         'script_info.id=' + script_info.id + '\n' +
		         'metaID=' + metaID + '\n' +
		         'script_info.ver=' + script_info.ver + '\n' +
		         'metaVer=' + metaVer + '\n' +
		         '');
		if (metaID === script_info.id && metaVer > script_info.ver) {
			setTimeout(function () {
				if (confirm(str('str-update_long', ['\n', script_info.name, script_info.ver, metaVer, script_info.url]))) {
					GM_openInTab(script_info.url);
				}
			}, 0);
		}
	} catch(x) { debugMsg('updaterStart error: ' + x, 1); return; }
}

// add iframe and load metadata
function updaterFrame(updateSrc) {
	debugMsg('updater - create iFrame');

	if ($('#apr_updater')) { destroy($('#apr_updater')); }
	try {
		var ELMupdater = $elm('iframe', 'apr_updater');
		ELMupdater.setAttribute('style', 'display: none;');
		//ELMupdater.setAttribute('style', 'display: block; width:500px; height:300px; border:1px solid red;');
		ELMupdater.src = updateSrc;
		$('body')[0].appendChild(ELMupdater);
	} catch(x) { debugMsg('updaterFrame error: ' + x, 1); }
}

// initialize
function updaterInit(forced) {
	debugMsg('updater - initialize');

	var now = new Date().getTime();
	var updateInterval = forced ? 0 : (cfg.get('updateInterval') * 60 * 60 * 1000);
	var lastUpdateCheck = cfg.get('lastUpdateCheck');
	debugMsg('' +
	         'now.toLocaleString()=' + now.toLocaleString() + '\n' +
	         'lastUpdateCheck.toLocaleString()=' + lastUpdateCheck.toLocaleString() + '\n' +
	         'updateInterval=' + updateInterval + '\n' +
	         '', 0);
	if (now > (lastUpdateCheck + updateInterval)) {
		updaterFrame(script_info.meta + '?' + now);
		if (!forced) { cfg.set('lastUpdateCheck', now, true); }
	}
}


//------------------------------------------------
// First initialization (after script update)
//------------------------------------------------

// check if script was updated
function isUpdated() {
	debugMsg('is script updated');

	var updated = false,
	    version = cfg.get('version');
	debugMsg('\n' +
	         'version= ' + typeof version + ' | ' + version + '\n' +
	         'script_info.ver= ' + typeof script_info.ver + ' | ' + script_info.ver + '\n' +
	         '');
	if (version !== script_info.ver) {
		debugMsg('updated!!');
		updated = true;
	} else { debugMsg('old ...'); }

	return updated;
	//return (cfg.get('version') !== script_info.ver) ? true : false;
}

// initialize new variables, etc..
function firstInit(updatedI, storageI) {

	if (!updatedI) { return; }
	debugMsg('first initialization', 1);

	// ask for Opera Greasemonkey support
	if (typeof storageI !== 'undefined' && storageI !== 'greasemonkey' && typeof opera !== 'undefined') {
		var GMemu_url = 'http://userscripts.org/scripts/show/88932';
		if (confirm('Opera have no built in Greasemonkey suport.\n' +
		            'Please install Greasemonkey Emulation script.\n' +
		            'URL: ' + GMemu_url + '\n\n' +
		            'Do you want to install now?')) {
			GM_openInTab(GMemu_url, '_blank');
		}
	}

	//import "pre config handler" options
	if (cfg.get('version') === '0') {
		debugMsg('import "pre config handler" options');

		var prehist = GM_getValue('FB_APR-123456-cfg', 'undefined');

	debugMsg('\n' +
	         'cfg.str= ' + cfg.str() + '\n' +
	         'prehist= ' + prehist + '\n' +
	         '');

		if (prehist !== 'undefined') {
			prehist = JSON.parse(prehist);
			cfg.set('appIDs', prehist.appIDs);
			cfg.set('debug_mode', prehist.isDebug);
			cfg.set('autorun', prehist.autorun);
			cfg.set('all_apps', prehist.all_apps);
			cfg.set('language', prehist.language);
			cfg.set('xhr_delay', prehist.xhr_delay);
			cfg.set('time_limit', prehist.time_limit);
			cfg.set('hide_posts', prehist.hide_posts);
			cfg.set('continue_proc', prehist.continue_proc);
			cfg.set('only_user_posts', prehist.only_user_posts);
			cfu.sset('lastKnownPost', (GM_getValue('FB_APR-123456-lastKnownPost') || new Date()* 1) + '');
			GM_deleteValue('FB_APR-123456-cfg');

	debugMsg('\n' +
	         'cfg.str= ' + cfg.str() + '\n' +
	         '');
		} else {
			debugMsg('no options found');
		}
	}

	cfg.set('version', script_info.ver);
	cfg.save();

}


//------------------------------------------------
// Process
//------------------------------------------------

// process posts on profile page
function processProfilePage() {
	debugMsg('process profile page', 1);

	// FB profile page elements
	var elmStream = '#profile_minifeed',
	    elmTime = './/@data-date',
	    elmClBtn = '.uiSelectorButton',
	    elmPosts = './/*[@class="uiStreamSource"]',
	    elmMore = '.uiMorePagerPrimary',
	    elmMoreAn = '.uiMorePager';
	cfu.load();

	guiCreateInfoDiv(elmStream);

	var fb_env = {'user' : env('user'),
	              'post_form_id' : env('post_form_id'),
	              'fb_dtsg' : env('fb_dtsg')};

	// test access to unsafeWindow.Env
	if (fb_env.user === 'undefined') {
		aprInfo(str('inf-error'));
		debugMsg('no access to unsafeWindow.Env.user', 1);
		return;
	}

	//------------------------------------------------
	// functions - search last known post
	//------------------------------------------------

	function postsClickOlder(rpt) {
		debugMsg('click "Older Posts"');

		var clicked = false;
		var a = $(elmMore)[0];
		try {
			if (a) {
				try {
					if (a.onclick) {
						a.onclick();
						clicked = true;
					}
				} catch(xx) { }
				if (!clicked) {
					doClick(a);
				}
			}
		} catch(x) {
			debugMsg('clickOlderPosts error: ' + x, 1);
			if (rpt) { return; } // return on repeated error
			setTimeout(function (){ postsClickOlder(true); }, 1000);
		}
	}

	function postsLoadOlder(callback_func) {
		debugMsg('load older posts', 1);

		var ii=0;
		//check if new element is last and run "callback_func"
		function ni() {
			ii++;
			debugMsg('' +
			         'xx=' + ii + '\n' +
			         'profile_pager=' + $(elmMoreAn)[0].className + '\n' +
			         '', 0);
			if (!testClass($(elmMoreAn)[0], 'async_saving')) {
				debugMsg('load older posts - finished');
				$(elmStream).removeEventListener('DOMNodeInserted', ni, false);
				callback_func();
			}
		}

		$(elmStream).addEventListener('DOMNodeInserted', ni, false);

		postsClickOlder();

	}

	//------------------------------------------------
	// functions - process visible posts
	//------------------------------------------------

	// get "post" date
	function postDate(post) {
		if (typeof post === 'string') {
			debugMsg('get \'' + post + '\' post date');

			var elms = $(elmPosts, $(elmStream));
			if (post === 'first') { post = elms.snapshotItem(0); }
			if (post === 'last') { post = elms.snapshotItem(elms.snapshotLength - 1); }
		}
		return Date.parse($(elmTime, post).snapshotItem(0).textContent);
	}

	//fb_env, cfg(appIDs, all_apps, only_user_posts)
	function postsGet() {
		debugMsg('get posts', 1);

		var user2check = cfu.get('only_user_posts') ? 'contains(@data-ft,\'"actrs":"' + fb_env.user + '"\') and ' : '',
		    appArr = [], apps2check = '', ii;
		if (!cfu.get('all_apps')) {
			appArr = cfu.get('appIDs');
			ii = appArr.length;
			while (ii--) {
				apps2check = apps2check + 'contains(@data-ft,\'"app_id":"' + appArr[ii][0] + '",\') or ';
			}
		}
		else { apps2check = 'contains(@data-ft,\'"app_id":\')'; }
		apps2check = ('(' + apps2check + ')').replace(' or )', ')');

		debugMsg('' +
		         'appIDs=' + appArr + '\n' +
		         'user2check=' + user2check + '\n' +
		         'apps2check=' + apps2check + '\n' +
		         '');

		// select matching elements
		var elms = $('.//*[' + user2check + apps2check + ']', $(elmStream));
		debugMsg('' +
		         'elms.snapshotLength=' + elms.snapshotLength + '\n' +
		         //'elms.snapshotItem(0).innerHTML=' + elms.snapshotItem(0).innerHTML + '\n' +
		         '');
		return elms;
	}

	//cfg(time_limit)
	function postsFirstOld(elms) {
		debugMsg('find first old post', 1);

		var ii, tDiff,
		    elms_cnt = elms.snapshotLength,
		    old = elms_cnt, // first old post
		    time_limit = cfu.get('time_limit'),
		    tStory = new Date(), // story time
		    tNow = new Date(); // current time
		    tNow.getTime();

		// find first expired item
		for (ii=0; ii<elms_cnt; ii++) {

			tStory.setTime(postDate(elms.snapshotItem(ii)));
			tDiff = Math.floor((tNow-tStory)/1000/60/60); // difference in full hours

			debugMsg('' +
			         'ii=' + ii + '\n' +
			         'time_limit=' + time_limit + '\n' +
			         'tStory.toLocaleString()=' + tStory.toLocaleString() + '\n' +
			         'tNow.toLocaleString()=' + tNow.toLocaleString() + '\n' +
			         'tDiff=' + tDiff + '\n' +
			         '', 0);

			if (tDiff >= time_limit) {
				old = ii;
				break;
			}
		}

		debugMsg('' +
		         'first old=' + old + '\n' +
		         '');
		return old;
	}

	//save last known post date
	function postsSaveLastKnown(post) {
		var lkp = postDate(post);
		debugMsg('' +
		         'postsSaveLastKnown ' + new Date(lkp).toLocaleString() + '\n' +
		         '');
		cfu.sset('lastKnownPost', lkp + '');
	}

	//fb_env, cfg(xhr_delay, hide_posts)
	function postsRemove(elms, from) {
		debugMsg('remove posts', 1);

		var ii, story_type, story_key, clbtn,
		    elms_cnt = elms.snapshotLength,
		    xhr_delay = cfu.get('xhr_delay'),
		    do_remove = (!cfu.get('hide_posts') && xhr_delay > 0) ? true : false;

		// check xhr variables
		if (fb_env.user === 'undefined' || fb_env.post_form_id === 'undefined' || fb_env.fb_dtsg === 'undefined') {
			do_remove = false;
			debugMsg('postsRemove - no access to unsafeWindow.Env\nhiding posts', 1);
		}

		debugMsg('' +
		         'elms_cnt=' + elms_cnt + '\n' +
		         'from=' + from + '\n' +
		         'fb_env.user=' + fb_env.user + '\n' +
		         'fb_env.post_form_id=' + fb_env.post_form_id + '\n' +
		         'fb_env.fb_dtsg=' + fb_env.fb_dtsg + '\n' +
		         'xhr_delay=' + xhr_delay + '\n' +
		         '');

		// remove all expired (from last)
		for (ii=elms_cnt-1; ii>=from; ii--) {

			clbtn = $(elmClBtn, elms.snapshotItem(ii))[0];
			story_type = clbtn.getAttribute('ajaxify').match(/story_type=(\d+)/i)[1];
			story_key = clbtn.getAttribute('ajaxify').match(/story_key=(\d+)/i)[1];

			debugMsg('' +
			         'ii=' + ii + '\n' +
			         'story_type=' + story_type + '\n' +
			         'story_key=' + story_key + '\n' +
			         '', 0);

			if (do_remove) {
				delay(xhr_delay); // don't send all requests at once ...
				xhr('http://www.facebook.com/ajax/minifeed.php?__a=1', '',
				    'profile_fbid=' + fb_env.user +
				    '&ministory_key=' + story_key +
				    '&story_type=' + story_type +
				    '&post_form_id=' + fb_env.post_form_id +
				    '&post_form_id_source=AsyncRequest' +
				    '&fb_dtsg=' + fb_env.fb_dtsg
				   );
				postsSaveLastKnown(elms.snapshotItem(ii-1) || elms.snapshotItem(ii));
			}
			destroy(elms.snapshotItem(ii));
		}

		// save last post date
		if (do_remove && (elms_cnt === from)) {
			postsSaveLastKnown(elms_cnt === 0 ? 'first' : elms.snapshotItem(elms_cnt-1));
		}

		aprInfo(str((do_remove ? 'inf-xremoved' : 'inf-xhidden'), [elms_cnt, (elms_cnt - from)]));
	}

	// select all visible app posts, find first expired and remove old
	function postsProcessVisible() {
		aprInfo(str('inf-process'));
		var posts, firstOld;
		posts = postsGet();
		firstOld = postsFirstOld(posts);
		postsRemove(posts, firstOld);
	}

	//------------------------------------------------
	// processing start
	//------------------------------------------------

	if (cfu.get('continue_proc') && !cfu.get('hide_posts')) {

		var ii = 1, last_visible_post = 0,
		    last_known_post = cfu.sget('lastKnownPost', new Date()) * 1,
		    last_known_post_str = new Date(last_known_post).toLocaleString();

		function gogo() {
			last_visible_post = postDate('last');
			aprInfo(str('inf-search', [last_known_post_str, ii++]));

			debugMsg('' +
			         'last_known_post_str=' + last_known_post_str + '\n' +
			         'last_visible_post=' + last_visible_post + '\n' +
			         'last_visible_post=' + new Date(last_visible_post).toLocaleString() + '\n' +
			         '');

			if (last_known_post < last_visible_post) {
				debugMsg('last known post not found - load next page');
				postsLoadOlder(gogo);
			} else {
				debugMsg('last known post found');
				postsProcessVisible();
			}

		}
		gogo();

	} else {
		debugMsg('continue processing disabled');
		postsProcessVisible();
	}

	// processing finished
}

// add/remove appIDs on application pages
function processApplicationPage() {
	debugMsg('process application page', 1);

	var app_name = $('//*[contains(@class,"profileName")]').snapshotItem(0).innerHTML,
	    app_link = $('//*[contains(@id,"left_column")]//a[contains(@href,".php") and contains(@href,"id=")]'),
	    app_ID = app_link.snapshotItem(0).getAttribute('href').match(/id=(\d+)/i)[1],
	    elm_action_btn, itm, is_added,
	    appArr = [];
	cfu.load();
	appArr = cfu.get('appIDs');

	guiShowMessage(str('str-addremove'),
			'<span style="font-size:12px;"><b>' + app_ID + ' ' + app_name + '</b></span>',
			'<input type="button" id="apr_app_action" value="action" /> ');

	elm_action_btn = $('#apr_app_action');

	function checkApp() {
		itm = contains(appArr, app_ID);
		is_added = itm >= 0 ? true : false;
		elm_action_btn.value = is_added ? str('gui-remove') : str('gui-add');
	}

	function addremoveApp() {
		if (!is_added) { appArr.push([app_ID, app_name]); }
		else { appArr.splice(itm, 1); }
		cfu.set('appIDs', appArr, true);
		checkApp();
	}

	checkApp();
	on('click', '#apr_app_action', addremoveApp);
}

// identify current page and start
function aprProcess(autorun) {
	debugMsg('determine current page');

	var user_profile_new = $('//a[contains(@class,\'edit_profilepicture\')]').snapshotLength;
	if (user_profile_new) {
		debugMsg('current page is user profile (new)');
		processProfilePage();
		return;
	}

	// stop if autorun missed profile page
	if (autorun) { return; }

	var app_page = $('//*[contains(@id,"leftCol")]//a[contains(@href,"/ajax/report.php") or contains(@href,"/ajax/apps/block_app.php?")]').snapshotLength;
	if (app_page >= 2) {
		debugMsg('current page is application page');
		processApplicationPage();
		return;
	}

	var apr_homepage = $('//*[contains(@class,"profileName") and contains(text(),"FB Application Post Remover")]').snapshotLength;
	if (apr_homepage) {
		debugMsg('current page is FB APR homepage');
		guiShowMessage(str('str-APRhome'), str('str-APRhome_long'));
		return;
	}

	var user_profile_old = $('//div[contains(@class,\'can_edit\')]', $('#left_column')).snapshotLength;
	if (user_profile_old) {
		debugMsg('current page is user profile (old)');
		guiShowMessage(str('str-old_profile'), str('str-old_profile_long', ['<br />', '<a href="/about/profile/">', '</a>']));
		return;
	}

	debugMsg('current page is unknown');
	guiShowMessage(str('str-unknown'), [str('str-unknown_long', '<br />'),
			'<a href="' + script_info.author_mail + '" title="' + str('cfg-author_email') + '">' + script_info.author + '</a>',
			''].join(''), '', 10000);
	return;
}


//------------------------------------------------
// start script
//------------------------------------------------

function aprStart() {
	debugMsg('start - DOMContentLoaded\n', 1);

	// metadata found, check for script update and quit
	if (window.location.href.match(script_info.meta)) {
		updaterStart();
		return;
	}

	// initialize datastorage, so we can read and write options
	var storage = storageInit();

	// load current config
	//cfg = new CfgHandler('cfg_global', cfg_default_global, true);
	cfu = new CfgHandler('cfg_user_' + env('user'), cfg_default_user, true);
	cfg = cfu; //only one cfg handler for now. split config into global and user in future
	isDebug = cfg.get('debug_mode');

	var updated = isUpdated();
	updaterInit(updated);
	firstInit(updated, storage);

	guiLanguage();
	guiCreatePopup();
	guiCreateRunButton();
	guiCreateConfigButton();

	if (cfu.get('autorun') === true) {
		debugMsg('autorun enabled');
		aprProcess(true);
	}
}
document.addEventListener('DOMContentLoaded', aprStart(), false);
}());
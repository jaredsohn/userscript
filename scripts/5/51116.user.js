// ==UserScript==
// @name           Ikariam Aide-Memoire
// @namespace      http://userscripts.org/scripts/show/51116
// @author         Martynius (http://userscripts.org/users/68307)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/51116
// @description    DO NOT INSTALL THIS SCRIPT - USE THE SCRIPTS SPECIFIC TO A SCORE
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @version        1.0.2a
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php?*view=city*
// @include        http://s*.ikariam.*/index.php?*view=island*
// @include        http://s*.ikariam.*/index.php?*view=highscore*
// @include        http://s*.ikariam.*/index.php?*view=allyHighscore*
// @include        http://s*.ikariam.*/index.php?*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php?*view=embassy*
// @include        http://s*.ikariam.*/index.php?*view=options*&page=game*
// @exclude        http://support*.ikariam.*/*
//
// @history	1.0.2a	Revised include pages; Changed options to "Game Options" instead of "Account Data".
// @history	1.0.2	Updated for donations and resources scores.
// @history	1.0.1a	Added line for Bosnian translation.
// @history	1.0.1	Updated to work with PhasmaExMachina's Auto Updater UserScript.
// @history	1.0.0	Original version based on early versions of Ikariam Aide-Memoire (Generals Score)
// ==/UserScript==
//
// -- Resources --
// Refresh Icon from: http://www.iconarchive.com/show/boomy-icons-by-milosz-wlazlo/refresh-icon.html
// Globe Icon from: http://www.iconarchive.com/show/boomy-icons-by-milosz-wlazlo/go-website-icon.html
//

const PAGE_ID = {
	island:			"island",
	city:			"city",
	highscore:		"highscore",
	allyHighscore:		"allyHighscore",
	diplomacyAdvisor:	"ally",
	diplomacyAdvisorAlly:	"ally",
	embassy:		"ally",
	options:		"options"
}[ $("body").attr("id") ];

if ( PAGE_ID === undefined ) return;

function IkariamAideMemoire( options ) {
	var self = this;
	this.scoresLoaded = false;
	this.options = {
		SCRIPT_NAME:	'unknown',
		SCRIPT_ID:	0,
		SCRIPT_VERSION:	"1.0.2",
		SCORE_TYPE:	'army_score_main',
		LOAD_FUNCTION:	null
	};
	for ( var id in options )
		this.options[id] = options[id];

	this.cache_key		= getServerDomain() + '.' + getServerWorld();
	this.cache_variables	= {
			SCORES:		this.cache_key + '.scores',
			LAST_ISLAND:	this.cache_key + '.lastIsland',
			PLAYER:		this.cache_key + '.player',
			EMBASSY:	this.cache_key + '.showInEmbassy',
			HIGHSCORE:	this.cache_key + '.showInAllianceHighscore'
		};

	this.lang		= getLanguage();
	this.language 		= {
			"arabic":	{	ltr: false,	ds: ',',	back: 'إلى جزيرة',				prev: 'الصفحة السابقة',			next: 'الصفحة التالية',			update: 'آخر تحديث',				reset: 'إعادة العشرات',				msg: 'تحديث سجل في اخر 15 دقيقة. الرجاء الانتظار' },
			"bosnian":	{	ltr: true,	ds: ',',	back: 'Back To<br />Island',		prev: 'Previous Page',		next: 'Next Page',		update: 'Last update',			reset: 'Reset Scores',			msg: 'Score updated in the last 15 minutes. Please wait.' },
			"bulgarian":	{	ltr: true,	ds: ',',	back: 'Назад към<br />остров',		prev: 'Предишна страница',	next: 'Следваща страница ',	update: 'Последна актуализация',	reset: 'Нулиране рейтинги',		msg: 'Рейтинг актуализиран през последните 15 минути. Моля изчакайте' },
			"chinese":	{	ltr: true,	ds: ',',	back: '回岛',				prev: '前一页',			next: '下一页',			update: '最后更新',			reset: '重分數',				msg: '分数更新，在过去15分钟。请稍候' },
			"czech":	{	ltr: true,	ds: ',',	back: 'Zpět na<br />Island',		prev: 'Předchozí Strana',	next: 'Další Stránka',		update: 'Poslední aktualizace ',	reset: 'Reset Skóre',			msg: 'Skóre aktualizovány během posledních 15 minut. Prosím, vyčkejte' },
			"danish":	{	ltr: true,	ds: ',',	back: 'Tilbage til<br />Island',	prev: 'Forrige Side',		next: 'Næste Side',		update: 'Seneste opdatering',		reset: 'Nulstil Scores',		msg: 'Score opdateres i de sidste 15 minutter. Vent venligst' },
			"dutch":	{	ltr: true,	ds: ',',	back: 'Terug naar<br />het Eiland',	prev: 'Vorige Pagina',		next: 'Volgende Pagina',	update: 'Laatste update',		reset: 'Reset Scores',			msg: 'Score bijgewerkt in de laatste 15 minuten. Please wait' },
			"english":	{	ltr: true,	ds: ',',	back: 'Back To<br />Island',		prev: 'Previous Page',		next: 'Next Page',		update: 'Last update',			reset: 'Reset Scores',			msg: 'Score updated in the last 15 minutes. Please wait.' },
			"estonian":	{	ltr: true,	ds: ',',	back: 'Tagasi<br />Island',		prev: 'Eelmine Lehekülg',	next: 'Järgmine Lehekülg',	update: 'Viimati uuendatud',		reset: 'Nulli Scores',			msg: 'Score updated on viimase 15 minuti jooksul. Palun oota.' },
			"filipino":	{	ltr: true,	ds: ',',	back: 'Bumalik sa<br />Island',		prev: 'Nakaraang Pahina',	next: 'Susunod na Pahina',	update: 'Last update',			reset: 'I-reset ang Scores',		msg: 'Kalidad update sa huling 15 minuto. Mangyaring maghintay' },
			"finish":	{	ltr: true,	ds: ',',	back: 'Palaa<br />Island',		prev: 'Edellinen Sivu',		next: 'Seuraava Sivu',		update: 'Viimeisin päivitys',		reset: 'Nollaa Musiikkipainotuote',	msg: 'Pisteet päivitetty viimeksi 15 minuuttia. Odota' },
			"french":	{	ltr: true,	ds: '.',	back: 'Retour à<br />l\'île',		prev: 'Page Précédente',	next: 'Page Suivante',		update: 'Dernière mise à jour',		reset: 'Reset Partitions',		msg: 'Score de la dernière mise à jour en 15 minutes. S\'il vous plaît attendre' },
			"german":	{	ltr: true,	ds: ',',	back: 'Zurück zu<br />Insel',		prev: 'Vorhergehende Seite',	next: 'Nächste Seite',		update: 'Letzte Aktualisierung',	reset: 'Reset Noten',	msg: 'Ergebnis aktualisiert in den letzten 15 Minuten. Bitte warten' },
			"greek":	{	ltr: true,	ds: ',',	back: 'Επιστροφή<br />σε νησί',		prev: 'Προηγούμενη Σελίδα',	next: 'Επόμενη Σελίδα',		update: 'Τελευταία ενημέρωση',		reset: 'Επαναφορά Βαθμολογίες',		msg: 'Αποτέλεσμα ενημέρωση, τα τελευταία 15 λεπτά. Παρακαλώ περιμένετε' },
			"hebrew":	{	ltr: false,	ds: ',',	back: 'לראש איילנד',				prev: 'דף קודם',			next: 'הדף הבא',			update: 'עדכון אחרון',			reset: 'אפס ציוני',				msg: 'ציון עדכון אחרון של 15 דקות. אנא המתן' },
			"hungarian":	{	ltr: true,	ds: ',',	back: 'Vissza a<br />Sziget',		prev: 'Előző oldal',		next: 'Következő oldal',	update: 'Utolsó frissítés',		reset: 'Reset Scores',			msg: 'Pontszám frissítés az utolsó 15 perc. Kérem, várjon' },
			"italian":	{	ltr: true,	ds: ',',	back: 'Torna a<br />Isola',		prev: 'Pagina Precedente',	next: 'Pagina Successiva',	update: 'Ultimo aggiornamento',		reset: 'Reset Scores',			msg: 'Punteggio ottenuto aggiornato negli ultimi 15 minuti. Si prega di attendere' },
			"korean":	{	ltr: true,	ds: ',',	back: '맨 섬하려면',			prev: '이전 페이지',		next: '다음 페이지',		update: '마지막 업데이트',			reset: '재설정 점수',			msg: '점수는 지난 15 분 이내에 업데이 트되었습니다. 잠시 기다려주십시오' },
			"latvian":	{	ltr: true,	ds: ',',	back: 'Atpakaļ Uz<br />Island',		prev: 'Previous Page',		next: 'Next Page',		update: 'Last update',			reset: 'Atjaunot Rādītājus',		msg: 'Score atjaunināta pēdējo 15 minūšu laikā. Lūdzu, gaidiet' },
			"lithuanian":	{	ltr: true,	ds: ',',	back: 'Atgal Į<br />Salą',		prev: 'Ankstesnis Puslapis',	next: 'Kitas Puslapis',		update: 'Paskutinį kartą atnaujinta',	reset: 'Zresetuj Natos',		msg: 'Balą atnaujintas per paskutines 15 minučių. Prašome palaukti' },
			"norwegian":	{	ltr: true,	ds: ',',	back: 'Tilbake til<br />Island',	prev: 'Forrige Side',		next: 'Next Page',		update: 'Sist oppdatert',		reset: 'Tilbakestill Scores',		msg: 'Score oppdatert de siste 15 minutter. Vennligst vent' },
			"pinoy":	{	ltr: true,	ds: ',',	back: 'Bumalik sa<br />Island',		prev: 'Nakaraang Pahina',	next: 'Susunod na Pahina',	update: 'Last update',			reset: 'I-reset ang Scores',		msg: 'Kalidad update sa huling 15 minuto. Mangyaring maghintay' },
			"polish":	{	ltr: true,	ds: ',',	back: 'Powrót<br />na Wyspy',		prev: 'Poprzednia Strona',	next: 'Następna Strona',	update: 'Ostatnia aktualizacja',	reset: 'Resetuj Wynikach',		msg: 'Ocena zaktualizowane w ciągu ostatnich 15 minut. Proszę czekać' },
			"portuguese":	{	ltr: true,	ds: ',',	back: 'Regressar<br />à Ilha',		prev: 'Página Anterior',	next: 'Próxima Página',		update: 'Última atualização',		reset: 'Redefinir Escores',		msg: 'Pontuação atualizado nos últimos 15 minutos. Aguarde' },
			"romanian":	{	ltr: true,	ds: ',',	back: 'Înapoi Pentru<br />a Island',	prev: 'Previous Page',		next: 'Next Page',		update: 'Ultima actualizare',		reset: 'Resetare Note',			msg: 'Scor actualizat în ultimele 15 de minute. Vă rugăm să aşteptaţi' },
			"russian":	{	ltr: true,	ds: ',',	back: 'Вернуться<br />к островным',	prev: 'Предыдущая страница',	next: 'Следующая страница',	update: 'Последнее обновление',		reset: 'Сброс Баллы',			msg: 'Всего обновлено за последние 15 минут. Пожалуйста, подождите' },
			"serbian":	{	ltr: true,	ds: ',',	back: 'Назад на<br />Острво',		prev: 'Превиоус Паге',		next: 'Некст Паге',		update: 'Ласт упдате',			reset: 'Ресет Сцорес',			msg: 'Оцена ажурирани у последњих 15 минута. Молимо сачекајте' },
			"slovak":	{	ltr: true,	ds: ',',	back: 'Späť na<br />Island',		prev: 'Predchádzajúca Strana',	next: 'Ďalšia Stránka',		update: 'Posledná aktualizácia',	reset: 'Reset Skóre',			msg: 'Skóre aktualizované počas posledných 15 minút. Prosím, počkajte' },
			"slovene":	{	ltr: true,	ds: ',',	back: 'Nazaj<br />na Otok',		prev: 'Prejšnja stran',		next: 'Next Page',		update: 'Last update',			reset: 'Ponastavi Indekse',		msg: 'Ocena posodobitev v zadnjih 15 minutah. Prosimo, počakajte' },
			"spanish":	{	ltr: true,	ds: ',',	back: 'Volver a<br />la Isla',		prev: 'Anterior Página',	next: 'Página Siguiente',	update: 'Última actualización',		reset: 'Restablecer Partituras',	msg: 'Puntuación actualizada en los últimos 15 minutos. Por favor, espere' },
			"swedish":	{	ltr: true,	ds: ',',	back: 'Tillbaka<br />till ön',		prev: 'Föregående Sida',	next: 'Nästa Sida',		update: 'Senaste uppdatering',		reset: 'Återställ Poäng',		msg: 'Värdering uppdaterats under de senaste 15 minuter. Vänta' },
			"turkish":	{	ltr: true,	ds: ',',	back: 'Geri Adası<br />Için',		prev: 'Önceki Sayfa',		next: 'Sonraki Sayfa',		update: 'Son güncelleme',		reset: 'Sıfırla Puanları',		msg: 'Puan son 15 dakika içinde güncellendi. Lütfen bekleyin.' },
			"ukranian":	{	ltr: true,	ds: ',',	back: 'Повернутися<br />до острівних',	prev: 'Попередня сторінка',	next: 'Наступна сторінка',	update: 'Останнє оновлення',		reset: 'Скидання Бали',			msg: 'Всього оновлено за останні 15 хвилин. Будь ласка, зачекайте' },
			"urdu":		{	ltr: false,	ds: ',',	back: 'Back To<br />Island',		prev: 'Previous Page',		next: 'Next Page',		update: 'Last update',			reset: 'Reset Scores',			msg: 'Score updated in the last 15 minutes. Please wait.' },
			"vietnamese":	{	ltr: true,	ds: ',',	back: 'Trở về<br />Đảo',			prev: 'Trang trước',		next: 'Trang sau',		update: 'Lần cập nhật mới nhất',		reset: 'Thiết lập lại Điểm',		msg: 'Điểm được cập nhật trong vòng 15 phút. Xin vui lòng chờ' }
		}[this.lang];
	this.language.highscore	= language_highscore[this.lang];
	this.language.time	= language_time[this.lang];
	this.left		= this.language.ltr?'left':'right';
	this.right		= this.language.ltr?'right':'left';

	this.times = {
		quarterhour:	{ background: "DarkGreen",	time: (function(t) { return t <= 900000; }),	msg: 'alert( "' + self.language.msg + '" ); return false;' },
		hour:		{ background: "Green",		time: (function(t) { return t <= 3600000; })	},
		quarterday:	{ background: "Green",		time: (function(t) { return t <= 21600000; })	},
		halfday:	{ background: "GreenYellow",	time: (function(t) { return t <= 43200000; })	},
		day:		{ background: "Gold",		time: (function(t) { return t <= 86400000; })	},
		halfweek:	{ background: "Orange",		time: (function(t) { return t <= 302400000; })	},
		week:		{ background: "OrangeRed",	time: (function(t) { return t <= 604800000; })	},
		outdated:	{ background: "Red",		time: (function(t) { return true; })	}
	};

	/**
	 * Check for a later version of the script
	 * IkariamUserScriptUpdater object is in AutoUpdater.js
	 */
	ScriptUpdater.check( this.options.SCRIPT_ID );

	var SID		= this.options.SCRIPT_ID;
	var SVER	= this.options.SCRIPT_VERSION;
	GM_registerMenuCommand( this.options.SCRIPT_NAME + ": Check for update", function() { ScriptUpdater.forceNotice( SID, SVER ) } );

	if ( typeof this.options.LOAD_FUNCTION == 'function' )
		this.options.LOAD_FUNCTION.call( this );

	switch( PAGE_ID ) {
	case 'island':		this.processIsland();		break;
	case 'ally':		if ( GM_getValue( this.cache_variables.EMBASSY, true ) )
					this.processAlly();	break;
	case 'city':		this.processCity();		break;
	case 'highscore':	this.processHighscore();	break;
	case 'allyHighscore':	if ( GM_getValue( this.cache_variables.HIGHSCORE, true ) )
					this.processAllyHighscore();	break;
	case 'options':		this.processOptions();		break;
	}
}

IkariamAideMemoire.prototype.reformatNumber = function( n ) {
	var text = new String( n );
	var match;
	while ( match = /^(\D*)(\d+)(\d{3})(.*)$/.exec( text ) )
		text = (match[1]?match[1]:'') + match[2] + ',' + match[3] + (match[4]?match[4]:'');
	return text;
}

IkariamAideMemoire.prototype.getSavedScores = function() {
	if ( !this.scoresLoaded ) {
		this.scores = eval( GM_getValue( this.cache_variables.SCORES, false ) ) || {};
		this.scoresLoaded = true;
	}
}

IkariamAideMemoire.prototype.saveScores = function() {
	GM_setValue( this.cache_variables.SCORES, this.scores.toSource() );
}

IkariamAideMemoire.prototype.getOwnID= function() {
	return GM_getValue( this.cache_variables.PLAYER, false );
}

IkariamAideMemoire.prototype.getPlayerData = function( id, player, now ) {
	var	data		= { score: '?', rank: '?' },
		highlight	= 'outdated',
		msg		= false,
		update		= '?';
	if ( id === null ) {
		if ( player === null ) {
			id = 0;
			player = this.scores[id]?this.scores[id][4]:'';
		} else
			for ( var i in this.scores )
				if ( this.scores[i][4] == player ) {
					id = i;
					break;
				}
	}
	if ( this.scores[id] !== undefined ) {
		data.score = this.reformatNumber( this.scores[id][1] );
		data.rank = this.reformatNumber( this.scores[id][0] );
		var time = this.scores[id][2];
		var diff = now - time;
		var m = Math.floor( ( diff % 3600000 ) / 60000 );
		var h = Math.floor( ( diff % 86400000 ) / 3600000 );
		var d = Math.floor( diff / 86400000 );
		update = (d > 0?d + this.language.time.d + ' ':'') + (h > 0?h + this.language.time.h + ' ':'') + m + this.language.time.m;
		for ( var i in this.times )
			if ( this.times[i].time( diff ) ) {
				msg = this.times[i].msg;
				highlight = i;
				break;
			}
	}
	data.link =	"<a " + (msg?("onclick='" + msg + "'"):("href='/index.php?view=highscore&highscoreType=" + this.options.SCORE_TYPE + "&offset=0&searchUser=" + player.substr( 0, Math.min( 3, player.length ) ) + "'")) + " class='lookup' id='" + highlight + "'><img title='" + this.language.update + ": " + update + "' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC3klEQVR42qXTbUhTURgH8P/d3XVrL07dxDmHLzSJTDNTVDTJQFPJDxGsMpNQwl4+SKGRgaJSZGH4TYSikAozLcovKQpRma9B+ZY4mqXTdE2nd25zL273dsGKwH2JHng4H845v/PwnHMI/GcQv0fqNHVMuUfZqJKrwhc25odWdXSdo3OjF4vw4hIEvBjCjyllrT4BUkseTspO7MhIS/NnSAckhBhT3/TuvvGhKolLNkyrzGX0Jv3Ae4F5tR0QQRRZGdGfmZexb8T4BsY5E3apo5CfnAXa6AXfKYZYDlS/bDzLXmXvbwcOIDe1OKWL0VihG9TD8sXdBh6Y4DjBiTJtERmpUMO4uI6qluZrrhrHre1AIRqiM6MqgjVCjHV/9dpvu4QowFFJtLAjOTsSoiCuSGsYOp+/b3Q1OMt/7RNw6doCStCqTJMVxMWHY7R7zrU8sJ4AFW7KVKKd0sAdCq4ahc3hoCxzG89ZHs7wRWQ162GDvTTzEC14S+AUaoMSJTUpRzSY7J3HfL/5HNpwl8P9uIxAMsIRzJESTEMJjTxK2qpQS2H4ZLY6JlwZBI4jngol+xS7/aW2JSesOkcBMmGAGzFcoWtgsAQ58R121otx5IfHypsT0qMw+FoP0zBdt/UOCnEQfBRxZy5zy2/wcsh7akVIASgnKJ6f3bRisVhXHD3Q40pgrPhHfEokTze9iKUPa0+Ivxr6pzGCRuHjQ4n7C8nAddgsm3g3oANrQCKa8FFcL2Q0SSHE3NQy6NGNOwR8hKBW0FBZWFqhDgiFBSY8GnjmGRtcaIcNVMheiVYcJoJhZAWeSSbPJ0CUE5UlOSfrF+ZXGWkAycvPTkPf7BAMxiVQMgGGPk9gdcQ6ihmk+wRwEeclpDjDTTNNfB6RHhOvuZ6dkiUg/QGjeQ1tXe3rtlm7Fk/R4xsohj+m4MQwdxfcV0EusoRKYS0l56e6rG6Dx+a5zMwwL7h51jfwD/ETr1obYMQyGF8AAAAASUVORK5CYII='></a>";
	return data;
}

if ( PAGE_ID == 'ally' ) {

IkariamAideMemoire.prototype.processAlly = function() {
	var self = this;
	var css = [];
	for ( var id in this.times )
		css.push("table#memberList tr td a#" + id + "	{ background: " + this.times[id].background + "; }");
	GM_addStyle(
		"table#memberList td, table#memberList th	{ border-left: 1px solid #e4b873; border-right: 1px solid #e4b873; }" +
		"table#memberList td." + self.options.SCORE_TYPE + " div	{ position: relative; margin: 0px 19px 0px 0px; border: none; }" +
		"table#memberList td div a.lookup		{ text-decoration: none; border: 1px solid brown; display: block; position: absolute; top: 0px; " + this.right + ": -18px; width: 16px; height: 16px; cursor: pointer; }" +
		"table#memberList td div a.lookup img		{ width: 16px; height: 16px; }" +
		css.join( "" )
	);
	self.getSavedScores();
	$("table#memberList").each( function() {
		var columns		= [ 'lastActive', 'name', 'towns', 'rank', 'points' ];
		var columnMap		= { lastActive: 0, name: 1, towns: 2, rank: 3, points: 4, action: 5 };
		$("thead > tr", this).each( function() {
			$("th.action", this).before( "<th class='" + self.options.SCORE_TYPE + "'>" + self.language.highscore[ self.options.SCORE_TYPE ] + "</th>" );
			var i = 0;
			$( "th", this ).each( function() {
				var className = $(this).attr('class');
				if ( className )
					columns.splice( i, 0, className );
				columnMap[columns[i]] = i;
				i++;
			});
		});
		var now = new Date().getTime();
		$("tbody > tr", this).each( function() {
			if ( $(this).hasClass("alt") || $(this).hasClass("default") ) {
				var	link	= /\d+$/.exec( $( "td:eq(" + (columnMap['action'] - 1) + ") a:last", this ).attr("href") ),
					id	= link !== null?parseInt( link[0] ):null,
					player	= $( "td:eq(" + columnMap['name'] + ")", this ).text(),
					data	= self.getPlayerData.call( self, id, player, now );
				$("td.action", this).before(
						"<td class='" + self.options.SCORE_TYPE + "'><div>" +
						data.score + "&nbsp;" + data.link + "</div></td>"
					);
			}
		});
	});
}

} else if ( PAGE_ID == 'highscore' ) {

IkariamAideMemoire.prototype.processHighscore = function() {
	var self = this;
	GM_addStyle(
		'div#mainview div#highscoreOffsets a	{ text-decoration: none; color: black; cursor: pointer; }' +
		'div#islandLink				{ display: block; position: absolute; ' + self.right + ': 1px; top: 1px; z-index: 100; cursor: pointer; font-size: 8px; background: #e4b873; border: 1px solid brown; }' +
		'div#islandLink img			{ float: ' + self.right + '; margin-top: 5px; }' +
		'div#islandLink p			{ float: ' + self.right + '; margin: 0px; padding: 2px; }'
	);

	var index = 0, size = 0, select;

	if ( $( "div#highscoreOffsets" ).length == 0 ) {
		var offset = $("div#mainview select[name=offset]");
		offset	.wrap( "<div id='highscoreOffsets'></div>" )
			.before( "<a title='" + self.language.prev + "' id='prev'>&#9650;</a>" )
			.after( "<a title='" + self.language.next + "' id='next'>&#9660;</a>" )
			.each( function() {
				index = this.selectedIndex;
				size = this.options.length;
				select = this;
			});
		var offsetWrap = $( offset.parent() );
		$("a#prev", offsetWrap).click( function( e ) {
				if ( index > 0 ) {
					select.selectedIndex = index - 1;
					select.form.submit();
				}
			});
		$("a#next", offsetWrap).click( function( e ) {
				if ( index < size - 1 ) {
					select.selectedIndex = index + 1;
					select.form.submit();
				}
			});
	}

	var header = $("div#mainview h3.header");
	if ( $( "div#islandLink", header ).length == 0 ) {
		const lastIsland = GM_getValue( self.cache_variables.LAST_ISLAND, 1 );
		const globeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdElEQVR42m2Te0xbZRiHf4dzeqM9belKWWG04AEUJhuZ1stkhJsOyJYtI3ZRcPESTUQww+jmostisqiJxsQpc3+PuGjcDFumW3Um25TpMsq4xI31lBaBAiull9PDOZRejkfcyDJ9kyd5v3zJk+998/sI3FMfn50pX0wSexe4ZI2wlDQTy8mUXplhaVXW8VvZI8e/czqXcV8Rd5tPzvtfml+M9sxxJk0qrcKSKIGPcxA4HnoqDcaqHkwSvzx/rKP71n8EQ9Ps7j+mv/iGizMwKh9CoUVAmC/ANa8NngkBtwMRKCUR9ZvPeVodrdWbyjbNrwr8fsk4wB8amloYsRcZ6rBWuwOl+YsIxin0ewoQE69geEwAFx3Fg6Un8MyGD758utLZtSrwzI+0/+jZ36vI5KHC0oSqwh0watSIisCNwAQWUj1gg1cRDPvARRJgTM3zLY9+VF6xbt3CiqBvuO/o6NyR103aQpiVr+KJksdhNVCICRJmuUtgI324OdMPkRewyIlQE3lor/16y8N25rcVwaenh08OeC+0ZsmzM7YGOBjAoqMgpYKICm64x7yoKjEjX7MRWRkB0+FRMEXVz5YXlp9cEXzWN9Xj9g12xBIKGHIc8rYJ6EgKBeZz8vU1mFKvwFZUAV32vzOnRQF8aHw815LbaLVaJ4gj3/ufY+fiJ1Tmt+CfbAO/tBVG1TSq1u/DZmsbzEYnfLwKGoWEYCSN6zPLaLJHoOAnXTW1dU3EoV6PPoc2DEWTB4sTxAAGBt+RF2ZHruICeg+0wxOmcd5LIZWWEPYFkKQI1D/5ABLsT2ipfaRuJQc72/Y5a3bt+VZJH8TUTC5G/nwNS7dD+OpAGWYF4AyrQxoknOzncM0W4K/qF1BB3MDOSuXhu0lUNGx/+f2O/VveiyUM5HjgMcx6p9C4XkCRTY2zk3YMh9Q4emU7PrS8C09xDepNPmwtWT5G3EmjSSafKWW27drz4u7iymYGGV12PDAmWbVzpKgthStYBv3vLnCORpjX0NigYdG00di9+gIZyz8SGTtFUcU6vd4sionMtpbmhre7uxxkDoNT7gQiEg2bkUBe7CLruzn4FHHfv1DL6GS0d3qlzNrOzs6uvW++0ZDMQPPzZXfoav+vl10/nDocCoWu3yv4vyJlaJk1JEnaaJrWRqPRoHz2yURkMn8DmSZfefTcGh0AAAAASUVORK5CYII=';
		header.prepend("<div id='islandLink'><img src='" + globeImage + "' width='16' height='16'><p>" + self.language.back + "</p></div>");
		$("div#islandLink", header).click( function() {
			window.location.replace( '/index.php?view=island&id=' + lastIsland)
		});
		delete lastIsland, globeImage;
	}

	if ( new RegExp( "^" + self.options.SCORE_TYPE + "$" ).test( $("div#mainview select[name=highscoreType] option:selected").attr('value') ) ) {
		self.getSavedScores();
		var now = new Date().getTime();
		var lastRank;
		$("div#mainview table.table01:eq(1) tr:gt(0)").each( function() {
				var place = parseInt( $( "td:eq(0)", this ).text().replace( /[\.,]/g, '' ) );
				if ( isNaN( place ) )
					place = lastRank;
				else
					lastRank = place;
				var player	= $( "td:eq(1)", this ).text();
				var href	= /\d+$/.exec( $( "td:eq(4) a", this ).attr("href") );
				var id		= 0;
				if ( href != null )
					id	= parseInt( href[0] );
				var ally	= $( "td:eq(2)", this ).text().replace( /\s+/g, '_' );
				var points	= parseInt( $( "td:eq(3)", this ).text().replace( /[\.,]/g, '' ) );
				self.scores[id]	= [place,points,now,ally,player];
			});
		self.saveScores();
	}
}

} else if ( PAGE_ID == 'allyHighscore' ) {

IkariamAideMemoire.prototype.processAllyHighscore = function() {
	var self = this;
	self.getSavedScores();
	var allyScores = {};
	for ( var id in this.scores ) {
		var points	= this.scores[id][1];
		var ally	= this.scores[id][3];
		if ( allyScores[ally] === undefined )
			allyScores[ally] = { p: 0, m: 0};
		allyScores[ally].p += points;
		allyScores[ally].m++;
	}
	$("div#mainview table.table01:eq(1) tr:eq(0)").each( function() {
			$("th:eq(3)", this).after("<th>" + self.language.highscore[ self.options.SCORE_TYPE ] + "</th>");
		});
	$("div#mainview table.table01:eq(1) tr:gt(0)").each( function() {
			var	ally	= /\((.*?)\)$/.exec( $("td:eq(1)",this).text() )[1].replace(/\s+/g, '_'),
				total	= parseInt( $("td:eq(2)", this ).text().replace( /,/g, '' ) ),
				average	= parseInt( $("td:eq(3)", this ).text().replace( /,/g, '' ) ),
				members	= Math.round( total/average ),
				data	= allyScores[ally] || { p:0, m:0 };
			$("td:eq(3)", this).after("<td>" + self.reformatNumber( (data.p/members).toFixed(0) ) + "&nbsp;<sub><span style='font-size: 8px'>(" + self.reformatNumber( data.m ) + "/" + self.reformatNumber( members ) + ")</span></sub></td>");
		});
}

} else if ( PAGE_ID == 'island' || PAGE_ID == 'city' ) {

IkariamAideMemoire.prototype.addScore = function( cell, now ) {
	var 	allyCell	= $( "li.ally", cell ),
		owner		= $( "li.owner", cell ),
		player		= owner.length>0?$.trim(owner.text().replace( new RegExp( $( "span.textLabel", owner ).text() ), '' )):null,
		message		= $( "a.messageSend", owner ),
		id		= message.length>0?/\d+$/.exec(message.attr("href"))[0]:null,
		data		= this.getPlayerData( id, player, now ),
		text		= this.language.highscore[ this.options.SCORE_TYPE ],
		html		= "<li class='" + this.options.SCORE_TYPE + "'><span class='textLabel'><span>" + text + ":</span></span>" + data.score + " <span class='rank'>(" + data.rank + ")&nbsp;" + data.link + "</span></li>";
	if ( allyCell.length > 0 )
		allyCell.before( html );
	else {
		var btn = $("div.centerButton",cell);
		if ( btn.length > 0 )
			btn.before( html );
		else
			$(cell).append( html );
	}
}

IkariamAideMemoire.prototype.setCSS = function() {
	var css = [];
	for ( var id in this.times )
		css.push("#information ." + this.options.SCORE_TYPE + " span.rank a#" + id + "	{ background: " + this.times[id].background + "; }");
	GM_addStyle(
		"#information ." + this.options.SCORE_TYPE + "				{ line-height: 16px; }" +
		"#information ." + this.options.SCORE_TYPE + " .textLabel		{ float:" + this.left + ";width:80px; overflow-x: hidden; white-space: nowrap; }" +
		"#information ." + this.options.SCORE_TYPE + " span.rank		{ position: absolute; " + this.right + ": 5px; margin-top: -3px; padding-" + this.right + ": 16px; }" +
		"#information ." + this.options.SCORE_TYPE + " span.rank a.lookup	{ text-decoration: none; border: 1px solid brown; position: absolute; display: block; width: 16px; height: 16px; " + this.right + ": 0px; top: 0px; }" +
		css.join( "" ) +
		"#information ." + this.options.SCORE_TYPE + " span.rank a.lookup img	{ display: inline; width: 16px; height: 16px; }"
	);
}

if ( PAGE_ID == 'city' ) {
	IkariamAideMemoire.prototype.processCity = function() {
		this.setCSS();
		this.getSavedScores();
		var now = new Date().getTime();
		this.addScore( $("body > #container > #container2 > #information > .content")[0], now );
	}
} else {
	IkariamAideMemoire.prototype.processIsland = function() {
		this.setCSS();
		this.getSavedScores();
		var now = new Date().getTime();
		GM_setValue( this.cache_variables.LAST_ISLAND, $('div#cityNav form#changeCityForm input[name=id]').attr('value') );
		var self = this;
		$("body > #container > #container2 > #mainview > #cities > .city  > .cityinfo").each( function() { self.addScore.call( self, this, now ); });
		$("body > #container > #container2 > #infocontainer > #information > .cityinfo").each( function() { self.addScore.call( self, this, now ); });
	}
}

} else if ( PAGE_ID == 'options' ) {

IkariamAideMemoire.prototype.createOptionsTable = function() {
	GM_addStyle(
		"div#options_aideMemoire th { border-right: 1px solid #e4b873; }" +
		"div#options_aideMemoire thead th { text-align: center; border-bottom: 1px solid #e4b873; }"
	 );
	$( "div#mainview div.content div#options_debug" ).after(
			"<div id='options_aideMemoire'>" +
			"<h3>Ikariam Aide-Memoire</h3>" +
			"<table cellspacing='0' cellpadding='0' style='text-align: center'>" +
			"<col width='48%' />" +
			"<col width='17%' />" +
			"<col width='17%' />" +
			"<col width='17%' />" +
			"<thead>" +
			"<tr>" +
			"<th></th>" + 
			"<th>Embassy</th>" + 
			"<th>Alliance Highscore</th>" + 
			"<th style='border-right: none'></th>" + 
			"</tr>" +
			"</thead>" +
			"<tbody>" +
			"<tr id='building_score_main' style='display:none'>" +
			"<th>" + this.language.highscore.building_score_main + "</th>" + 
			"<td><input type='checkbox' id='embassy_building_score_main' /></td>" + 
			"<td><input type='checkbox' id='highscore_building_score_main' /></td>" + 
			"<td><input type='button' id='reset_building_score_main' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='building_score_secondary' style='display:none'>" +
			"<th>" + this.language.highscore.building_score_secondary + "</th>" + 
			"<td><input type='checkbox' id='embassy_building_score_secondary' /></td>" + 
			"<td><input type='checkbox' id='highscore_building_score_secondary' /></td>" + 
			"<td><input type='button' id='reset_building_score_secondary' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='research_score_main' style='display:none'>" +
			"<th>" + this.language.highscore.research_score_main + "</th>" + 
			"<td><input type='checkbox' id='embassy_research_score_main' /></td>" + 
			"<td><input type='checkbox' id='highscore_research_score_main' /></td>" + 
			"<td><input type='button' id='reset_research_score_main' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='research_score_secondary' style='display:none'>" +
			"<th>" + this.language.highscore.research_score_secondary + "</th>" + 
			"<td><input type='checkbox' id='embassy_research_score_secondary' /></td>" + 
			"<td><input type='checkbox' id='highscore_research_score_secondary' /></td>" + 
			"<td><input type='button' id='reset_research_score_secondary' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='army_score_main' style='display:none'>" +
			"<th>" + this.language.highscore.army_score_main + "</th>" + 
			"<td><input type='checkbox' id='embassy_army_score_main' /></td>" + 
			"<td><input type='checkbox' id='highscore_army_score_main' /></td>" + 
			"<td><input type='button' id='reset_army_score_main' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='offense' style='display:none'>" +
			"<th>" + this.language.highscore.offense + "</th>" + 
			"<td><input type='checkbox' id='embassy_offense' /></td>" + 
			"<td><input type='checkbox' id='highscore_offense' /></td>" + 
			"<td><input type='button' id='reset_offense' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='defense' style='display:none'>" +
			"<th>" + this.language.highscore.defense + "</th>" + 
			"<td><input type='checkbox' id='embassy_defense' /></td>" + 
			"<td><input type='checkbox' id='highscore_defense' /></td>" + 
			"<td><input type='button' id='reset_defense' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='trader_score_secondary' style='display:none'>" +
			"<th>" + this.language.highscore.trader_score_secondary + "</th>" + 
			"<td><input type='checkbox' id='embassy_trader_score_secondary' /></td>" + 
			"<td><input type='checkbox' id='highscore_trader_score_secondary' /></td>" + 
			"<td><input type='button' id='reset_trader_score_secondary' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='trade' style='display:none'>" +
			"<th>" + this.language.highscore.trade + "</th>" + 
			"<td><input type='checkbox' id='embassy_trade' /></td>" + 
			"<td><input type='checkbox' id='highscore_trade' /></td>" + 
			"<td><input type='button' id='reset_trade' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='resources' style='display:none'>" +
			"<th>" + this.language.highscore.resources + "</th>" + 
			"<td><input type='checkbox' id='embassy_resources' /></td>" + 
			"<td><input type='checkbox' id='highscore_resources' /></td>" + 
			"<td><input type='button' id='reset_resources' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"<tr id='donations' style='display:none'>" +
			"<th>" + this.language.highscore.donations + "</th>" + 
			"<td><input type='checkbox' id='embassy_donations' /></td>" + 
			"<td><input type='checkbox' id='highscore_donations' /></td>" + 
			"<td><input type='button' id='reset_donations' value='" + this.language.reset + "' /></td>" + 
			"</tr>" +
			"</tbody>" +
			"</table>" +
			"</div>"
		);
}

IkariamAideMemoire.prototype.processOptions = function() {

	if ( $( "div#mainview div.content div#options_aideMemoire" ).length == 0 )
		this.createOptionsTable();
	var self = this;
	$( "div#mainview div.content div#options_aideMemoire tr#" + this.options.SCORE_TYPE ).each( function() {
		$(this).css( 'display', 'table-row' );
		$("input#embassy_" + self.options.SCORE_TYPE , this).change( function() {
				GM_setValue( self.cache_variables.EMBASSY, this.checked );
			})
			.attr( 'checked', GM_getValue( self.cache_variables.EMBASSY, true ) );
		$("input#highscore_" + self.options.SCORE_TYPE , this).change( function() {
				GM_setValue( self.cache_variables.HIGHSCORE, this.checked );
			})
			.attr( 'checked', GM_getValue( self.cache_variables.HIGHSCORE, true ) );
		$("input#reset_" + self.options.SCORE_TYPE , this).click( function() {
				GM_deleteValue( self.cache_variables.SCORES );
			});
	});
}
}
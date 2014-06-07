// ==UserScript==
// @name           Ikariam Aide-Memoire (Inplace)
// @namespace      http://userscripts.org/scripts/show/67716
// @author         AubergineAnodyne (http://userscripts.org/users/127662)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/67716
// @description    DO NOT INSTALL THIS SCRIPT - USE THE SCRIPTS SPECIFIC TO A SCORE
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        1.02
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php*view=city*
// @include        http://s*.ikariam.*/index.php*view=island*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisor*&watch=4*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php*view=options*
// @exclude        http://support*.ikariam.*/*
//
// @history 1.02 Changed refresh logic to only trigger when you look at the information rather than always updating on page load.  Reduced refresh interval to 8 hours given the better behavior.  Removed display from your own town views, as there is no way to get the player info necessary to load scores.
// @history 1.01 Fixed display of refresh icon and made updates work in city view for scores you have never loaded before.
// @history	1.00 Original version adapted from Ikariam Aide Memoire script.
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

function debug(message) {
    if (unsafeWindow.console) {
        if (typeof(message) == 'string') {
            unsafeWindow.console.log("IAM: " + message);
        } else {
            unsafeWindow.console.log(message);
        }
    }
}

function curry(f) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return f.apply(this, args.concat([].slice.call(arguments, 0)));
  };
}
  
function curry_scope(f, scope) {
  var args = [].slice.call(arguments, 2);
  return function () {
    return f.apply(scope, args.concat([].slice.call(arguments, 0)));
  };
}

function IkariamAideMemoire( options ) {
    var start = new Date();
	var self = this;
	this.scoresLoaded = false;
	this.options = {
		SCRIPT_NAME:	'unknown',
		SCRIPT_ID:	0,
		SCRIPT_VERSION:	"1.01",
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
		
    this.lastId = null;
    this.lastPlayer = null;

	switch( PAGE_ID ) {
	  case 'island':
	    this.processIsland();
	    break;
	  case 'city':
	    this.processCity();
	    break;
	}
	debug('Finishing data update, time elapsed ' + (new Date() - start));
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

IkariamAideMemoire.prototype.getPlayerData = function( id, player, now, allowUpdate ) {
    debug("getPlayerData for: " + id + ", " + player);
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
	data.id = id;
	data.player = player;
	if ( this.scores[id] !== undefined ) {
		data.score = this.reformatNumber( this.scores[id][1] );
		data.rank = this.reformatNumber( this.scores[id][0] );
		var time = this.scores[id][2];
		var diff = now - time;
		var m = Math.floor( ( diff % 3600000 ) / 60000 );
		var h = Math.floor( ( diff % 86400000 ) / 3600000 );
		var d = Math.floor( diff / 86400000 );
		update = (d > 0?d + this.language.time.d + ' ':'') + (h > 0?h + this.language.time.h + ' ':'') + m + this.language.time.m;
		for ( var i in this.times ) {
			if ( this.times[i].time( diff ) ) {
				msg = this.times[i].msg;
				highlight = i;
				break;
			}
	    }
	    data.diff = diff;
	    if (allowUpdate && this.allowUpdate(data)) {
	        this.refreshScore(data);
	    }
	}
	// See comments in displayScore for explanation of link code
	var event_firing_id = this.makeEventFiringId(data);
	data.link =	$("<a href=\"javascript:evt=document.createEvent('HTMLEvents');evt.initEvent('click', true, true);node=document.getElementById('" + event_firing_id + "');node.dispatchEvent(evt); void(0);\" class='lookup'><img title='" + this.language.update + ": " + update + "' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC3klEQVR42qXTbUhTURgH8P/d3XVrL07dxDmHLzSJTDNTVDTJQFPJDxGsMpNQwl4+SKGRgaJSZGH4TYSikAozLcovKQpRma9B+ZY4mqXTdE2nd25zL273dsGKwH2JHng4H845v/PwnHMI/GcQv0fqNHVMuUfZqJKrwhc25odWdXSdo3OjF4vw4hIEvBjCjyllrT4BUkseTspO7MhIS/NnSAckhBhT3/TuvvGhKolLNkyrzGX0Jv3Ae4F5tR0QQRRZGdGfmZexb8T4BsY5E3apo5CfnAXa6AXfKYZYDlS/bDzLXmXvbwcOIDe1OKWL0VihG9TD8sXdBh6Y4DjBiTJtERmpUMO4uI6qluZrrhrHre1AIRqiM6MqgjVCjHV/9dpvu4QowFFJtLAjOTsSoiCuSGsYOp+/b3Q1OMt/7RNw6doCStCqTJMVxMWHY7R7zrU8sJ4AFW7KVKKd0sAdCq4ahc3hoCxzG89ZHs7wRWQ162GDvTTzEC14S+AUaoMSJTUpRzSY7J3HfL/5HNpwl8P9uIxAMsIRzJESTEMJjTxK2qpQS2H4ZLY6JlwZBI4jngol+xS7/aW2JSesOkcBMmGAGzFcoWtgsAQ58R121otx5IfHypsT0qMw+FoP0zBdt/UOCnEQfBRxZy5zy2/wcsh7akVIASgnKJ6f3bRisVhXHD3Q40pgrPhHfEokTze9iKUPa0+Ivxr6pzGCRuHjQ4n7C8nAddgsm3g3oANrQCKa8FFcL2Q0SSHE3NQy6NGNOwR8hKBW0FBZWFqhDgiFBSY8GnjmGRtcaIcNVMheiVYcJoJhZAWeSSbPJ0CUE5UlOSfrF+ZXGWkAycvPTkPf7BAMxiVQMgGGPk9gdcQ6ihmk+wRwEeclpDjDTTNNfB6RHhOvuZ6dkiUg/QGjeQ1tXe3rtlm7Fk/R4xsohj+m4MQwdxfcV0EusoRKYS0l56e6rG6Dx+a5zMwwL7h51jfwD/ETr1obYMQyGF8AAAAASUVORK5CYII='/></a>");
	data.loadLink = "http://" + document.domain + "/index.php?view=highscore&highscoreType=" + this.options.SCORE_TYPE + "&offset=0&searchUser=" + player;
	
	return data;
}

IkariamAideMemoire.prototype.allowUpdate = function(data) {
    debug("Considering refresh for: " + data.id);
    // Do a refresh if data is old.  Nastily, all the hackery to get this delayed until the 
    // user makes a city selection causes this to sometimes be called twice, 
    // so we keep track of the last id/player and only refresh once.
    if ((this.lastId != data.id || this.lastPlayer != data.player) && data.diff && data.diff > 1000*60*60*8) {
        this.lastId = data.id;
        this.lastPlayer = data.player;
        debug("Timed refresh score for " + data.player + " which is " + (data.diff/1000/60/60) + " hours old");
        this.refreshScore(data);
    }
    this.lastId = data.id;
	this.lastPlayer = data.player;
}

IkariamAideMemoire.prototype.extractScores = function(document) {
    var self = this;
    if ( new RegExp( "^" + self.options.SCORE_TYPE + "$" ).test( $("div#mainview select[name=highscoreType] option:selected", document).attr('value') ) ) {
		self.getSavedScores();
		var now = new Date().getTime();
		var lastRank;
		$("div#mainview table.table01:eq(1) tr:gt(0)", document).each( function() {
				var place = parseInt( $( "td:eq(0)", this ).text().replace( /,/g, '' ) );
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
				var points	= parseInt( $( "td:eq(3)", this ).text().replace( /,/g, '' ) );
				self.scores[id]	= [place,points,now,ally,player];
			});
		self.saveScores();
	}
}

IkariamAideMemoire.prototype.addScore = function( cell, now, allowUpdate ) {
	var allyCell = $( "li.ally", cell );
	var owner = $( "li.owner", cell );
	var player = owner.length>0?$.trim(owner.text().replace( new RegExp( $( "span.textLabel", owner ).text() ), '' )):null;
	if (PAGE_ID == 'city' && !player) {
	    // Viewing your own city.  No good way to get at the player id/name on this page, 
	    // so we punt and don't display anything.
	    return;
	}
	message = $( "a.messageSend", owner );
	id = message.length>0?/\d+$/.exec(message.attr("href"))[0]:null;
	data = this.getPlayerData( id, player, now, allowUpdate );
	html = $("<li class='" + this.options.SCORE_TYPE + "'></li>");
		
	if ( allyCell.length > 0 )
		allyCell.before( html );
	else {
		var btn = $("div.centerButton",cell);
		if ( btn.length > 0 )
			btn.before( html );
		else
			$(cell).append( html );
	}
    this.displayScore(data, html);
}

IkariamAideMemoire.prototype.refreshScore = function(data, nodeClass) {
    debug("Refreshing score for: " + data.id);
    var self = this;
    self.showScoreLoading(data, nodeClass);
    // Have to do this with a window.setTimeout to get around greasemonkey security restrictions 
    // on using GM_xmlhttprequest
    window.setTimeout(function() {
        self.getRemoteDocument(data.loadLink, function(responseDocument) {
            self.extractScores(responseDocument);
            var newData = self.getPlayerData(data.id, data.player, new Date());
            self.showScoreRefresh(newData, nodeClass);
        });
    }, 0);
}

IkariamAideMemoire.prototype.displayScore = function(data, node) {
    var self = this;
    var class = this.makeScoreClass(data);
    node.addClass(class);
    
    // We want to add an event listener whenever the "refresh" link is clicked.  
    // Unfortunately, it's not that simple because Ikariam copies the DOM tree when 
    // displaying city info in island view, and the event handlers don't get copied with 
    // the node.  So instead what we do is add an "event publishing" node that we 
    // listen for clicks on.  Then the href of the "refresh" link is given javascript 
    // code that will fire the "click" event on this "event publishing node".
    
    var event_firing_id = this.makeEventFiringId(data);
    var event_firing_node = $('#' + event_firing_id);
    
    // We only want to add one event publishing node per player id
    if (event_firing_node.length <= 0) {
        event_firing_node = $('<a id="' + event_firing_id + '"/>');
        $("body").append(event_firing_node);
        event_firing_node.click(function() {
            self.refreshScore(data, class);
        });
    }
    this.showScoreRefresh(data);
}

IkariamAideMemoire.prototype.makeEventFiringId = function(data) {
    var event_firing_id = 'IAM_event_firing_' + this.options.SCORE_TYPE;
    if (PAGE_ID != 'city') {
      event_firing_id = event_firing_id + '_' + data.id
    }
    return event_firing_id;
}

IkariamAideMemoire.prototype.showScoreRefresh = function(data, nodeClass) {
    var text = this.language.highscore[ this.options.SCORE_TYPE ];
    var class = nodeClass || this.makeScoreClass(data);
    var nodes = $('.' + class);
    debug("showScoreRefresh: " + nodes.length + " nodes");
    nodes.html("<span class='textLabel'><span>" + text + ":</span></span>" + data.score + " <span class='rank'>(" + data.rank + ")</span>");
    nodes.append(data.link);
}

IkariamAideMemoire.prototype.showScoreLoading = function(data) {
    var text = this.language.highscore[ this.options.SCORE_TYPE ];
    var class = this.makeScoreClass(data);
    var nodes = $('.' + class);
    debug("showScoreLoading: " + nodes.length + " nodes");
    nodes.html("<span class='textLabel'>" + text + ":</span> ...");
    //nodes.append(data.link);
}

IkariamAideMemoire.prototype.makeScoreClass = function(data) {
    var class = 'IAM_score_' + this.options.SCORE_TYPE
    if (PAGE_ID != 'city') {
        class = class + '_' + data.id;
    }
    return class;
}

IkariamAideMemoire.prototype.installNodeCopyHandler = function() {
    var oldShowInContainer = unsafeWindow.showInContainer;
    var self = this;
    unsafeWindow.showInContainer = function(source, target, exchangeClass) {
        self.handleShowInContainer(source, target, exchangeClass);
        oldShowInContainer(source, target, exchangeClass);
    };
}

IkariamAideMemoire.prototype.handleShowInContainer = function(source, target, exchangeClass) {
    debug('showInContainer: ' + exchangeClass);
    if (exchangeClass = 'cityinfo') {
        var sourceNode = source;
        if (typeof(sourceNode) == 'string') {
            sourceNode = $('#' + source);
        }
        var owner = $( "li.owner", sourceNode );
        var player = owner.length>0?$.trim(owner.text().replace( new RegExp( $( "span.textLabel", owner ).text() ), '' )):null;
	    var message	= $( "a.messageSend", owner );
	    var id = message.length>0?/\d+$/.exec(message.attr("href"))[0]:null;
	    var data = this.getPlayerData(id, player, new Date(), true);
    }
}

// Copied from IkaTools.
IkariamAideMemoire.prototype.getRemoteDocument = function(url, callback, method, data) {
	method = typeof(method) == 'undefined' ? 'GET' : method;
	data = typeof(data) == 'undefined' ? '' : data;
	var headers = {
		"User-agent":navigator.userAgent, 
		"Accept":method == 'POST' ? "application/atom+xml,application/xml,text/xml" : "text/html", 
		"Cookie":document.cookie,
		"Referer":"http://" + document.domain + "/index.php",
	}
	if(method == 'POST') {
		headers['Content-type'] = 'application/x-www-form-urlencoded';	
	}
	GM_xmlhttpRequest ({
		method:method,
		url:url,
		data:data,
		headers:headers,
		onload: function (response){
			var html = document.createElement("html");
			html.innerHTML = response.responseText;
			var response = document.implementation.createDocument("", "", null);
			response.appendChild(html);
			callback(response);
		}
	});
}

IkariamAideMemoire.prototype.setCSS = function() {
	var css = [];
	for ( var id in this.times )
		css.push("#information ." + this.options.SCORE_TYPE + " span.rank a#" + id + "	{ background: " + this.times[id].background + "; }");
	GM_addStyle(
		"#information ." + this.options.SCORE_TYPE + "				{ line-height: 16px; }" +
		"#information ." + this.options.SCORE_TYPE + " .textLabel		{ float:" + this.left + ";width:80px; overflow-x: hidden; white-space: nowrap; }" +
		//"#information ." + this.options.SCORE_TYPE + " span.rank		{ position: absolute; " + this.right + ": 5px; margin-top: -3px; padding-" + this.right + ": 16px; }" +
		"#information ." + this.options.SCORE_TYPE + " a.lookup	{ text-decoration: none; }" +
		css.join( "" ) +
		"#information ." + this.options.SCORE_TYPE + " a.lookup img	{ margin-left: 10px; display: inline; } "
	);
	//GM_addStyle("#information li * { color: blue; vertical-align: middle; }");
}

IkariamAideMemoire.prototype.processCity = function() {
	this.setCSS();
	this.getSavedScores();
	var now = new Date().getTime();
	this.addScore( $("body > #container > #container2 > #information > .content")[0], now, true);
}

IkariamAideMemoire.prototype.processIsland = function() {
	this.setCSS();
	this.getSavedScores();
	var now = new Date().getTime();
	this.installNodeCopyHandler();
	var self = this;
	$("body > #container > #container2 > #mainview > #cities > .city  > .cityinfo").each( function() { self.addScore(this, now ); });
	$("body > #container > #container2 > #infocontainer > #information > .cityinfo").each( function() { self.addScore(this, now, true ); });
}
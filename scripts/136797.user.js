// ==UserScript==
// @name        Sayaç
// @namespace   http://www.facebook.com/*
// @include     https://www.facebook.com/
// @version     1
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


(function($){
	$.fn.sayac = function(){
		var $this = $(this),
		    texts = [translate()],
		    $g    = $('<span>' + texts[0] + ': 0</span>');

		$this.keyup(function(){
			$g.html(texts[0] + ': ' + this.value.length);
		});

		$g.css({
			'padding': '5px',
			'line-height': '26px',
			'color': '#888'
		});

		$('div#uiComposerMessageBoxControls').append($g);
	}
})(jQuery);

var translate = function(){
	var baseLNG;

	if (navigator.userLanguage) {
		baseLNG = navigator.userLanguage.substring(0,2).toLowerCase();
	} else {
		baseLNG = navigator.language.substring(0,2).toLowerCase();
	}

	switch(baseLNG){
		case 'en' : return 'written';
		case 'tr' : return 'yazdınız';
		case 'ru' : return 'письменный';
		case 'ge' : return 'geschrieben';
		case 'cs' : return 'písemný';
		case 'zh' : return '书面';
		case 'fr' : return 'écrit';
		case 'ga' : return 'scríofa';
		case 'es' : return 'escrito';
		case 'sv' : return 'skrivet';
		case 'it' : return 'scritto';
		case 'ja' : return '書かれた';
		case 'ko' : return '쓴';
		case 'la' : return 'scriptum';
		case 'pl' : return 'napisany';
		case 'lv' : return 'rakstisks';
		case 'lt' : return 'Rašytinė';
		case 'hu' : return 'írott';
		case 'mt' : return 'miktub';
		case 'nb' : return 'skriftlig';
		case 'br' : return 'escrito';
		case 'ro' : return 'scris';
		case 'sk' : return 'písomný';
		case 'sl' : return 'Prispeval';
		case 'el' : return 'Γραπτές';
		default   : return 'written';
	}
}

$('textarea').eq(0).sayac();
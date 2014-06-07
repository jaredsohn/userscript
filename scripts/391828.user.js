// ==UserScript==
// @name        Wykop.pl - odgrzewane hity
// @namespace   odgrzewane_hity__kulmegil@wykop.pl
// @description Dodaje możliwość przejrzenia najlepszych znalezisk z wczoraj oraz możliwość filtrowania gorących wpisów z ostatnich 1h, 2h, 3h, 48h i 7dni.
// @icon        http://s3.amazonaws.com/uso_ss/icon/391828/large.png
// @include     http://www.wykop.pl/*
// @version     0.9
// @grant       none
// ==/UserScript==

;(function ( $, window, document, undefined ) {

var wykopLoaderEl = '<div class="dnone" id="paginationLoader" style="display: block;"><div>Ładuję kolejną stronę...</div></div>',
    pathname = location.pathname.split('/').slice(1), 
    page     = (page=pathname.indexOf('strona')) === -1? 1 : parseInt(pathname[page+1]);

if (pathname[0] === 'hity' && pathname[1] === 'wczoraj') {
	$.holdReady(true);
	var url = 'http://www.wykop.pl/szukaj/strona/'+page+
		'/?search[filter]=links&search[sort]=diggs&search[when]=yesterday&search[what]=promoted',
	pager = $('#links-list > .pager');
	
	$('#links-list').children().remove();
	$('#links-list').append(wykopLoaderEl);
	$.get(url).done(function(html) {
		var doc = $.parseHTML(html);
		
		// fix pager
		var lastPage = $('.pager a', doc).not(':contains(poprzednia), :contains(następna)').length;
		pager.children().not(':contains(poprzednia)' + (page < lastPage? ', :contains(następna)' : '')).slice(lastPage).remove();

		$('#links-list').html($('#links-list', doc)).append(pager);
		$.holdReady(false);
	}).fail(function() {
		$('#links-list').children().remove();
	});
}
else if (pathname.slice(0,3).join('/') === 'mikroblog/hot/ostatnie' && (pathname[3] === '48' || pathname[3] === '168')) {
	var url = 'http://www.wykop.pl/szukaj/wpisy/strona/'+page+'/?search[sort]=votes&search[when]=' + 
		(pathname[3]==='48'? 'yesterday' : 'week');

	$.holdReady(true);
	$('#activities-stream').children().remove();
	$('#activities-stream').append(wykopLoaderEl).load(url + ' #activities-stream', function() {
		$.holdReady(false);
	});
}


/** Fix: navigation **/
if (pathname[0] === 'hity') {
	var parent = $('.slideselect .slideoptions').has('a[href*="/hity/"]');
	if (pathname[1] === 'wczoraj') {
		$('span:first', parent).text('wczoraj');
		$('ul li', parent).has('a[href*="/hity/dnia"]')
			.after('<li><a class="block tdnone href" href="http://www.wykop.pl/hity/tygodnia/">tygodnia</a></li>');
	} else {
		$('ul li', parent).not(':has(a[href*="/hity/dnia"])').first()
			.before('<li><a class="block tdnone href" href="http://www.wykop.pl/hity/wczoraj/">wczoraj</a></li>');
	}
}
else if (pathname[0] === 'mikroblog') {
	var last = (last=pathname.indexOf('ostatnie')) === -1? 12 : parseInt(pathname[last+1]);
	// easter egg?: last 1h/2h/3h hot entries can be handled by site engine
	var parent = $('.newtagheader a[href*="/mikroblog/hot/ostatnie/"]').parent();
	parent.prepend(
		'<a title="" href="http://www.wykop.pl/mikroblog/hot/ostatnie/1/">1h</a>',
		' <span class="c999 marginleft5 marginright5">|</span>',
		'<a title="" href="http://www.wykop.pl/mikroblog/hot/ostatnie/2/">2h</a>',
		' <span class="c999 marginleft5 marginright5">|</span>',
		'<a title="" href="http://www.wykop.pl/mikroblog/hot/ostatnie/3/">3h</a>',
		' <span class="c999 marginleft5 marginright5">|</span>'
	).append(
		' <span class="c999 marginleft5 marginright5">|</span>',
		'<a title="" href="http://www.wykop.pl/mikroblog/hot/ostatnie/48/">48h</a>',
		' <span class="c999 marginleft5 marginright5">|</span>',
		'<a title="" href="http://www.wykop.pl/mikroblog/hot/ostatnie/168/">7d</a>'
	);
	// fix: selected link
	var el = $('a[href*="/mikroblog/hot/ostatnie/'+last+'/"]', parent);
	if (el.length === 1) {
		el.replaceWith('<b class="fbold">'+el.text()+'</b>');
		$('b:contains(12h)', parent).replaceWith('<a title="" href="http://www.wykop.pl/mikroblog/hot/ostatnie/12/">12h</a>');
	}
}

})( jQuery, window, document );
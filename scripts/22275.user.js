// ==UserScript==
// @name           Google Reader - Open all unread button
// @description    Opens all unread items in new tabs.
// @version        0.3.3
// @namespace      http://pas-bien.net/
// @icon           http://pas-bien.net/projects/GoogleReader-OpenAllUnread/google-reader-oau-icon.png
// @match          http://www.google.com/reader/view/*
// @match          http://www.google.ad/reader/view/*
// @match          http://www.google.ae/reader/view/*
// @match          http://www.google.com.af/reader/view/*
// @match          http://www.google.com.ag/reader/view/*
// @match          http://www.google.com.ai/reader/view/*
// @match          http://www.google.am/reader/view/*
// @match          http://www.google.co.ao/reader/view/*
// @match          http://www.google.com.ar/reader/view/*
// @match          http://www.google.as/reader/view/*
// @match          http://www.google.at/reader/view/*
// @match          http://www.google.com.au/reader/view/*
// @match          http://www.google.az/reader/view/*
// @match          http://www.google.ba/reader/view/*
// @match          http://www.google.com.bd/reader/view/*
// @match          http://www.google.be/reader/view/*
// @match          http://www.google.bf/reader/view/*
// @match          http://www.google.bg/reader/view/*
// @match          http://www.google.com.bh/reader/view/*
// @match          http://www.google.bi/reader/view/*
// @match          http://www.google.bj/reader/view/*
// @match          http://www.google.com.bn/reader/view/*
// @match          http://www.google.com.bo/reader/view/*
// @match          http://www.google.com.br/reader/view/*
// @match          http://www.google.bs/reader/view/*
// @match          http://www.google.co.bw/reader/view/*
// @match          http://www.google.by/reader/view/*
// @match          http://www.google.com.bz/reader/view/*
// @match          http://www.google.ca/reader/view/*
// @match          http://www.google.cd/reader/view/*
// @match          http://www.google.cf/reader/view/*
// @match          http://www.google.cg/reader/view/*
// @match          http://www.google.ch/reader/view/*
// @match          http://www.google.ci/reader/view/*
// @match          http://www.google.co.ck/reader/view/*
// @match          http://www.google.cl/reader/view/*
// @match          http://www.google.cm/reader/view/*
// @match          http://www.google.cn/reader/view/*
// @match          http://www.google.com.co/reader/view/*
// @match          http://www.google.co.cr/reader/view/*
// @match          http://www.google.com.cu/reader/view/*
// @match          http://www.google.cz/reader/view/*
// @match          http://www.google.de/reader/view/*
// @match          http://www.google.dj/reader/view/*
// @match          http://www.google.dk/reader/view/*
// @match          http://www.google.dm/reader/view/*
// @match          http://www.google.com.do/reader/view/*
// @match          http://www.google.dz/reader/view/*
// @match          http://www.google.com.ec/reader/view/*
// @match          http://www.google.ee/reader/view/*
// @match          http://www.google.com.eg/reader/view/*
// @match          http://www.google.es/reader/view/*
// @match          http://www.google.com.et/reader/view/*
// @match          http://www.google.fi/reader/view/*
// @match          http://www.google.com.fj/reader/view/*
// @match          http://www.google.fm/reader/view/*
// @match          http://www.google.fr/reader/view/*
// @match          http://www.google.ga/reader/view/*
// @match          http://www.google.ge/reader/view/*
// @match          http://www.google.gg/reader/view/*
// @match          http://www.google.com.gh/reader/view/*
// @match          http://www.google.com.gi/reader/view/*
// @match          http://www.google.gl/reader/view/*
// @match          http://www.google.gm/reader/view/*
// @match          http://www.google.gp/reader/view/*
// @match          http://www.google.gr/reader/view/*
// @match          http://www.google.com.gt/reader/view/*
// @match          http://www.google.gy/reader/view/*
// @match          http://www.google.com.hk/reader/view/*
// @match          http://www.google.hn/reader/view/*
// @match          http://www.google.hr/reader/view/*
// @match          http://www.google.ht/reader/view/*
// @match          http://www.google.hu/reader/view/*
// @match          http://www.google.co.id/reader/view/*
// @match          http://www.google.ie/reader/view/*
// @match          http://www.google.co.il/reader/view/*
// @match          http://www.google.im/reader/view/*
// @match          http://www.google.co.in/reader/view/*
// @match          http://www.google.iq/reader/view/*
// @match          http://www.google.is/reader/view/*
// @match          http://www.google.it/reader/view/*
// @match          http://www.google.je/reader/view/*
// @match          http://www.google.com.jm/reader/view/*
// @match          http://www.google.jo/reader/view/*
// @match          http://www.google.co.jp/reader/view/*
// @match          http://www.google.co.ke/reader/view/*
// @match          http://www.google.com.kh/reader/view/*
// @match          http://www.google.ki/reader/view/*
// @match          http://www.google.kg/reader/view/*
// @match          http://www.google.co.kr/reader/view/*
// @match          http://www.google.com.kw/reader/view/*
// @match          http://www.google.kz/reader/view/*
// @match          http://www.google.la/reader/view/*
// @match          http://www.google.com.lb/reader/view/*
// @match          http://www.google.li/reader/view/*
// @match          http://www.google.lk/reader/view/*
// @match          http://www.google.co.ls/reader/view/*
// @match          http://www.google.lt/reader/view/*
// @match          http://www.google.lu/reader/view/*
// @match          http://www.google.lv/reader/view/*
// @match          http://www.google.com.ly/reader/view/*
// @match          http://www.google.co.ma/reader/view/*
// @match          http://www.google.md/reader/view/*
// @match          http://www.google.me/reader/view/*
// @match          http://www.google.mg/reader/view/*
// @match          http://www.google.mk/reader/view/*
// @match          http://www.google.ml/reader/view/*
// @match          http://www.google.mn/reader/view/*
// @match          http://www.google.ms/reader/view/*
// @match          http://www.google.com.mt/reader/view/*
// @match          http://www.google.mu/reader/view/*
// @match          http://www.google.mv/reader/view/*
// @match          http://www.google.mw/reader/view/*
// @match          http://www.google.com.mx/reader/view/*
// @match          http://www.google.com.my/reader/view/*
// @match          http://www.google.co.mz/reader/view/*
// @match          http://www.google.com.na/reader/view/*
// @match          http://www.google.com.nf/reader/view/*
// @match          http://www.google.com.ng/reader/view/*
// @match          http://www.google.com.ni/reader/view/*
// @match          http://www.google.ne/reader/view/*
// @match          http://www.google.nl/reader/view/*
// @match          http://www.google.no/reader/view/*
// @match          http://www.google.com.np/reader/view/*
// @match          http://www.google.nr/reader/view/*
// @match          http://www.google.nu/reader/view/*
// @match          http://www.google.co.nz/reader/view/*
// @match          http://www.google.com.om/reader/view/*
// @match          http://www.google.com.pa/reader/view/*
// @match          http://www.google.com.pe/reader/view/*
// @match          http://www.google.com.ph/reader/view/*
// @match          http://www.google.com.pk/reader/view/*
// @match          http://www.google.pl/reader/view/*
// @match          http://www.google.pn/reader/view/*
// @match          http://www.google.com.pr/reader/view/*
// @match          http://www.google.ps/reader/view/*
// @match          http://www.google.pt/reader/view/*
// @match          http://www.google.com.py/reader/view/*
// @match          http://www.google.com.qa/reader/view/*
// @match          http://www.google.ro/reader/view/*
// @match          http://www.google.ru/reader/view/*
// @match          http://www.google.rw/reader/view/*
// @match          http://www.google.com.sa/reader/view/*
// @match          http://www.google.com.sb/reader/view/*
// @match          http://www.google.sc/reader/view/*
// @match          http://www.google.se/reader/view/*
// @match          http://www.google.com.sg/reader/view/*
// @match          http://www.google.sh/reader/view/*
// @match          http://www.google.si/reader/view/*
// @match          http://www.google.sk/reader/view/*
// @match          http://www.google.com.sl/reader/view/*
// @match          http://www.google.sn/reader/view/*
// @match          http://www.google.so/reader/view/*
// @match          http://www.google.sm/reader/view/*
// @match          http://www.google.st/reader/view/*
// @match          http://www.google.com.sv/reader/view/*
// @match          http://www.google.td/reader/view/*
// @match          http://www.google.tg/reader/view/*
// @match          http://www.google.co.th/reader/view/*
// @match          http://www.google.com.tj/reader/view/*
// @match          http://www.google.tk/reader/view/*
// @match          http://www.google.tl/reader/view/*
// @match          http://www.google.tm/reader/view/*
// @match          http://www.google.tn/reader/view/*
// @match          http://www.google.to/reader/view/*
// @match          http://www.google.com.tr/reader/view/*
// @match          http://www.google.tt/reader/view/*
// @match          http://www.google.com.tw/reader/view/*
// @match          http://www.google.co.tz/reader/view/*
// @match          http://www.google.com.ua/reader/view/*
// @match          http://www.google.co.ug/reader/view/*
// @match          http://www.google.co.uk/reader/view/*
// @match          http://www.google.com.uy/reader/view/*
// @match          http://www.google.co.uz/reader/view/*
// @match          http://www.google.com.vc/reader/view/*
// @match          http://www.google.co.ve/reader/view/*
// @match          http://www.google.vg/reader/view/*
// @match          http://www.google.co.vi/reader/view/*
// @match          http://www.google.com.vn/reader/view/*
// @match          http://www.google.vu/reader/view/*
// @match          http://www.google.ws/reader/view/*
// @match          http://www.google.rs/reader/view/*
// @match          http://www.google.co.za/reader/view/*
// @match          http://www.google.co.zm/reader/view/*
// @match          http://www.google.co.zw/reader/view/*
// @match          http://www.google.cat/reader/view/*
// @match          https://www.google.com/reader/view/*
// @match          https://www.google.ad/reader/view/*
// @match          https://www.google.ae/reader/view/*
// @match          https://www.google.com.af/reader/view/*
// @match          https://www.google.com.ag/reader/view/*
// @match          https://www.google.com.ai/reader/view/*
// @match          https://www.google.am/reader/view/*
// @match          https://www.google.co.ao/reader/view/*
// @match          https://www.google.com.ar/reader/view/*
// @match          https://www.google.as/reader/view/*
// @match          https://www.google.at/reader/view/*
// @match          https://www.google.com.au/reader/view/*
// @match          https://www.google.az/reader/view/*
// @match          https://www.google.ba/reader/view/*
// @match          https://www.google.com.bd/reader/view/*
// @match          https://www.google.be/reader/view/*
// @match          https://www.google.bf/reader/view/*
// @match          https://www.google.bg/reader/view/*
// @match          https://www.google.com.bh/reader/view/*
// @match          https://www.google.bi/reader/view/*
// @match          https://www.google.bj/reader/view/*
// @match          https://www.google.com.bn/reader/view/*
// @match          https://www.google.com.bo/reader/view/*
// @match          https://www.google.com.br/reader/view/*
// @match          https://www.google.bs/reader/view/*
// @match          https://www.google.co.bw/reader/view/*
// @match          https://www.google.by/reader/view/*
// @match          https://www.google.com.bz/reader/view/*
// @match          https://www.google.ca/reader/view/*
// @match          https://www.google.cd/reader/view/*
// @match          https://www.google.cf/reader/view/*
// @match          https://www.google.cg/reader/view/*
// @match          https://www.google.ch/reader/view/*
// @match          https://www.google.ci/reader/view/*
// @match          https://www.google.co.ck/reader/view/*
// @match          https://www.google.cl/reader/view/*
// @match          https://www.google.cm/reader/view/*
// @match          https://www.google.cn/reader/view/*
// @match          https://www.google.com.co/reader/view/*
// @match          https://www.google.co.cr/reader/view/*
// @match          https://www.google.com.cu/reader/view/*
// @match          https://www.google.cz/reader/view/*
// @match          https://www.google.de/reader/view/*
// @match          https://www.google.dj/reader/view/*
// @match          https://www.google.dk/reader/view/*
// @match          https://www.google.dm/reader/view/*
// @match          https://www.google.com.do/reader/view/*
// @match          https://www.google.dz/reader/view/*
// @match          https://www.google.com.ec/reader/view/*
// @match          https://www.google.ee/reader/view/*
// @match          https://www.google.com.eg/reader/view/*
// @match          https://www.google.es/reader/view/*
// @match          https://www.google.com.et/reader/view/*
// @match          https://www.google.fi/reader/view/*
// @match          https://www.google.com.fj/reader/view/*
// @match          https://www.google.fm/reader/view/*
// @match          https://www.google.fr/reader/view/*
// @match          https://www.google.ga/reader/view/*
// @match          https://www.google.ge/reader/view/*
// @match          https://www.google.gg/reader/view/*
// @match          https://www.google.com.gh/reader/view/*
// @match          https://www.google.com.gi/reader/view/*
// @match          https://www.google.gl/reader/view/*
// @match          https://www.google.gm/reader/view/*
// @match          https://www.google.gp/reader/view/*
// @match          https://www.google.gr/reader/view/*
// @match          https://www.google.com.gt/reader/view/*
// @match          https://www.google.gy/reader/view/*
// @match          https://www.google.com.hk/reader/view/*
// @match          https://www.google.hn/reader/view/*
// @match          https://www.google.hr/reader/view/*
// @match          https://www.google.ht/reader/view/*
// @match          https://www.google.hu/reader/view/*
// @match          https://www.google.co.id/reader/view/*
// @match          https://www.google.ie/reader/view/*
// @match          https://www.google.co.il/reader/view/*
// @match          https://www.google.im/reader/view/*
// @match          https://www.google.co.in/reader/view/*
// @match          https://www.google.iq/reader/view/*
// @match          https://www.google.is/reader/view/*
// @match          https://www.google.it/reader/view/*
// @match          https://www.google.je/reader/view/*
// @match          https://www.google.com.jm/reader/view/*
// @match          https://www.google.jo/reader/view/*
// @match          https://www.google.co.jp/reader/view/*
// @match          https://www.google.co.ke/reader/view/*
// @match          https://www.google.com.kh/reader/view/*
// @match          https://www.google.ki/reader/view/*
// @match          https://www.google.kg/reader/view/*
// @match          https://www.google.co.kr/reader/view/*
// @match          https://www.google.com.kw/reader/view/*
// @match          https://www.google.kz/reader/view/*
// @match          https://www.google.la/reader/view/*
// @match          https://www.google.com.lb/reader/view/*
// @match          https://www.google.li/reader/view/*
// @match          https://www.google.lk/reader/view/*
// @match          https://www.google.co.ls/reader/view/*
// @match          https://www.google.lt/reader/view/*
// @match          https://www.google.lu/reader/view/*
// @match          https://www.google.lv/reader/view/*
// @match          https://www.google.com.ly/reader/view/*
// @match          https://www.google.co.ma/reader/view/*
// @match          https://www.google.md/reader/view/*
// @match          https://www.google.me/reader/view/*
// @match          https://www.google.mg/reader/view/*
// @match          https://www.google.mk/reader/view/*
// @match          https://www.google.ml/reader/view/*
// @match          https://www.google.mn/reader/view/*
// @match          https://www.google.ms/reader/view/*
// @match          https://www.google.com.mt/reader/view/*
// @match          https://www.google.mu/reader/view/*
// @match          https://www.google.mv/reader/view/*
// @match          https://www.google.mw/reader/view/*
// @match          https://www.google.com.mx/reader/view/*
// @match          https://www.google.com.my/reader/view/*
// @match          https://www.google.co.mz/reader/view/*
// @match          https://www.google.com.na/reader/view/*
// @match          https://www.google.com.nf/reader/view/*
// @match          https://www.google.com.ng/reader/view/*
// @match          https://www.google.com.ni/reader/view/*
// @match          https://www.google.ne/reader/view/*
// @match          https://www.google.nl/reader/view/*
// @match          https://www.google.no/reader/view/*
// @match          https://www.google.com.np/reader/view/*
// @match          https://www.google.nr/reader/view/*
// @match          https://www.google.nu/reader/view/*
// @match          https://www.google.co.nz/reader/view/*
// @match          https://www.google.com.om/reader/view/*
// @match          https://www.google.com.pa/reader/view/*
// @match          https://www.google.com.pe/reader/view/*
// @match          https://www.google.com.ph/reader/view/*
// @match          https://www.google.com.pk/reader/view/*
// @match          https://www.google.pl/reader/view/*
// @match          https://www.google.pn/reader/view/*
// @match          https://www.google.com.pr/reader/view/*
// @match          https://www.google.ps/reader/view/*
// @match          https://www.google.pt/reader/view/*
// @match          https://www.google.com.py/reader/view/*
// @match          https://www.google.com.qa/reader/view/*
// @match          https://www.google.ro/reader/view/*
// @match          https://www.google.ru/reader/view/*
// @match          https://www.google.rw/reader/view/*
// @match          https://www.google.com.sa/reader/view/*
// @match          https://www.google.com.sb/reader/view/*
// @match          https://www.google.sc/reader/view/*
// @match          https://www.google.se/reader/view/*
// @match          https://www.google.com.sg/reader/view/*
// @match          https://www.google.sh/reader/view/*
// @match          https://www.google.si/reader/view/*
// @match          https://www.google.sk/reader/view/*
// @match          https://www.google.com.sl/reader/view/*
// @match          https://www.google.sn/reader/view/*
// @match          https://www.google.so/reader/view/*
// @match          https://www.google.sm/reader/view/*
// @match          https://www.google.st/reader/view/*
// @match          https://www.google.com.sv/reader/view/*
// @match          https://www.google.td/reader/view/*
// @match          https://www.google.tg/reader/view/*
// @match          https://www.google.co.th/reader/view/*
// @match          https://www.google.com.tj/reader/view/*
// @match          https://www.google.tk/reader/view/*
// @match          https://www.google.tl/reader/view/*
// @match          https://www.google.tm/reader/view/*
// @match          https://www.google.tn/reader/view/*
// @match          https://www.google.to/reader/view/*
// @match          https://www.google.com.tr/reader/view/*
// @match          https://www.google.tt/reader/view/*
// @match          https://www.google.com.tw/reader/view/*
// @match          https://www.google.co.tz/reader/view/*
// @match          https://www.google.com.ua/reader/view/*
// @match          https://www.google.co.ug/reader/view/*
// @match          https://www.google.co.uk/reader/view/*
// @match          https://www.google.com.uy/reader/view/*
// @match          https://www.google.co.uz/reader/view/*
// @match          https://www.google.com.vc/reader/view/*
// @match          https://www.google.co.ve/reader/view/*
// @match          https://www.google.vg/reader/view/*
// @match          https://www.google.co.vi/reader/view/*
// @match          https://www.google.com.vn/reader/view/*
// @match          https://www.google.vu/reader/view/*
// @match          https://www.google.ws/reader/view/*
// @match          https://www.google.rs/reader/view/*
// @match          https://www.google.co.za/reader/view/*
// @match          https://www.google.co.zm/reader/view/*
// @match          https://www.google.co.zw/reader/view/*
// @match          https://www.google.cat/reader/view/*
// ==/UserScript==

function main () {

	var oau_debug = false;

	// JS
	if(oau_debug) alert('begin');
	oau_loadJs('https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js');

	function oau_GM_wait() {
		if(typeof jQuery == 'undefined') {
			setTimeout(oau_GM_wait, 50);
		} else {
			jQuery.noConflict();
			if(oau_debug)  alert('jQuery loaded');
			oau_loadJs('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js');
			oau_GM_wait_UI();
		}
	}
	
	function oau_GM_wait_UI() {
		if(typeof jQuery.ui == 'undefined') {
			setTimeout(oau_GM_wait_UI, 50);
		} else {
			if(oau_debug)  alert('jQuery UI loaded');
			oau_process();
		}
	}
	oau_GM_wait();
	
	// CONSTS
	
	var oau_options = [
		[10000, 'Open all unread'],
		[2, 'Open 2 firsts unread'],
		[5, 'Open 5 firsts unread'],
		[10, 'Open 10 firsts unread'],
		[20, 'Open 20 firsts unread'],
		[50, 'Open 50 firsts unread'],
		[100, 'Open 100 firsts unread'],
		[200, 'Open 200 firsts unread']
	];
	
	// functions
	
	function oau_loadJs(src) {
		var oau_GM_UI = document.createElement('script'); 
		oau_GM_UI.src = src;
		oau_GM_UI.type = 'text/javascript'; 
		document.getElementsByTagName('head')[0].appendChild(oau_GM_UI);
	}
	
	function oau_process() {
		if(oau_debug)  alert('begin process');
		// CSS
		
		jQuery('<style id="torrent_css" type="text/css">'
		+ ' #open-all-unread-split-button { float: left; margin-right: 1.5em; } '
		+ ' #open-all-unread-options { position: absolute; } '
		+ '</style>').appendTo('head');
		
		// loaded ?
		if(jQuery('body').hasClass('loaded'))
			oau_initButton();
		else
			setTimeout(oau_process, 75); // not loaded try later
	}
	
	function oau_getOpenCount() {
		return localStorage['oau_openCount'] || 10000;
	}
	
	function oau_setOpenCount(count) {
		localStorage['oau_openCount'] = count;
		oau_initButton();
		jQuery('#open-all-unread-options').hide();
	}
	
	function oau_initButton() {
	
		// create menu
		oau_initOptions();
		
		// remove if exists
		jQuery('#open-all-unread-split-button').remove();

		// create button

		jQuery('<span id="open-all-unread-split-button">'
			+ '<div id="open-all-unread-button" tabindex="0" class="goog-inline-block jfk-button jfk-button-standard jfk-button-collapse-right" role="button" style="-moz-user-select: none;">'
				+ jQuery('#open-all-unread-options .goog-option-selected').text()
			+ '</div>'
			+ '<div id="open-all-unread-options-dropdown" class="goog-inline-block goog-flat-menu-button goog-flat-menu-button-collapse-left" title="" role="button" style="-moz-user-select: none;" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-activedescendant="">'
				+ '<div class="goog-inline-block goog-flat-menu-button-caption"></div>'
				+ '<div class="goog-inline-block goog-flat-menu-button-dropdown">&nbsp;</div>'
			+ '</div>'
		+ '</span>').insertAfter('#mark-all-as-read-split-button');
		
		//
		jQuery('#open-all-unread-button')
			.click(oau_openAllUnread);
		jQuery('#open-all-unread-button').hover(function() { jQuery(this).addClass('jfk-button-hover'); }, function() { jQuery(this).removeClass('jfk-button-hover'); });
		jQuery('#open-all-unread-options-dropdown').hover( function() { jQuery(this).addClass('goog-flat-menu-button-hover'); }, function() { jQuery(this).removeClass('goog-flat-menu-button-hover'); });
		// hide menu if click anywhere
		jQuery('body').click(function(eventObject) { if (jQuery(eventObject.target).closest('#open-all-unread-options-dropdown').length == 0) jQuery('#open-all-unread-options').hide(); });
		// hide menu on escape
		jQuery(document).keydown( function(eventObject){ if(eventObject.which == 27) jQuery('#open-all-unread-options').hide(); });
		//
		jQuery('#open-all-unread-options-dropdown').click(function() {
			jQuery('#open-all-unread-options').toggle();
			jQuery('#open-all-unread-options').position({
				my: 'left top',
				at: 'left bottom',
				of: jQuery('#open-all-unread-split-button'),
			});
		});
	}
	
	function oau_initOptions() {
	
		var oau_openCount = oau_getOpenCount();
	
		jQuery('#open-all-unread-options').remove();
		jQuery('<div id="open-all-unread-options" class="goog-menu goog-menu-vertical" role="menu" aria-haspopup="true" aria-activedescendant=""></div>').appendTo('body').hide();
		var oau_text_p1 = '<div class="goog-menuitem goog-option" role="menuitem" style="-moz-user-select: none;"><div class="goog-menuitem-content">';
		var oau_text_p3 = '</div></div>';
		jQuery.each(oau_options, function(index, value) {
			jQuery(oau_text_p1 + value[1] + oau_text_p3)
				.attr('rel', value[0])
				.click(function() { oau_setOpenCount(jQuery(this).attr('rel')); })
				.hover(function() { jQuery(this).addClass('goog-menuitem-highlight'); },function() { jQuery(this).removeClass('goog-menuitem-highlight'); })
				.appendTo('#open-all-unread-options')
				;
		});
		jQuery('#open-all-unread-options .goog-menuitem[rel=' + oau_openCount.toString() + ']').addClass('goog-option-selected');
		
	}
	
	function oau_openAllUnread () {
		
		// Check if in good state
		var oau_openCount = oau_getOpenCount();
		var entries = jQuery('div.entry:not(.read) a.entry-original, div.entry:not(.read) a.entry-title-link').slice(0, oau_openCount);

		if (entries.length == 0) {
			alert('No items founds...');
			return;
		}
		
		// Open in tabs
		entries.each(function(index, Element){
			// Open tab
			window.open(jQuery(Element).attr('href'));
			// Mark as readed
			oau_fireMouseEvent(jQuery(Element).closest('div.collapsed, div.card').get(0), 'click');
			//jQuery(Element).closest('div.collapsed, div.card').click();
		});
		
		// refresh
		oau_fireMouseEventById('viewer-refresh', 'click');
	}
	
	function oau_fireMouseEventById(id, type) {
		oau_fireMouseEvent(document.getElementById(id), type);
	}

	function oau_fireMouseEvent(elem, type) {
		type = type || 'click';
		evt = document.createEvent('MouseEvents');
		evt.initEvent(type, true, true );
		elem.dispatchEvent(evt);
	}
	
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

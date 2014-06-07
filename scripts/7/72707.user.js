// ==UserScript==
// @name           oGame.LT Žinučių ikona galaktikos peržiūroje
// @namespace      userscripts.org
// @description    Rodo žinučių ikonėlę galaktikos peržiūros lange
// @version        1.2
// @include        http://*.ogame.lt/game/index.php?page=*
// ==/UserScript==

(function() {
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}
	
	var $ = unsafe.$;
	var session = unsafe.session;

	if ( !$ ) return;
	
	try {
		// Ally message icon
		$('#menuTable .menu_icon a').eq(0)
			.clone()
			.attr('class','')
			.attr('href','index.php?page=networkkommunikation&session='+session)
			.attr('target','_blank')
			.replaceAll('#menuTable .menu_icon img[src*="navi_ikon_network_a"]')
			.find('img')
			.bind('mouseout',function(){this.src='img/navigation/navi_ikon_network_a.gif'})
			.bind('mouseover',function(){this.src='img/navigation/navi_ikon_network_b.gif'})
			.trigger('mouseout')
		;

		// Messages envelope in Galaxy view
		if (document.location.href.indexOf('galaxy') > -1) {
			$('#message_alert_box')
				.prependTo('#info')
				.css({'position':'absolute','left':'110px','top':'60px'})
			;
		}

	}
	catch (e) {}

}) ()
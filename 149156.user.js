// ==UserScript==
// @name           Улучшатель мосвара
// @namespace      moswar
// @description    фишки от Контры
// @include        http://*.moswar.ru*
// ==/UserScript==
if(location.href.search(/moswar\.ru/)!==-1) {
	var q0=document.createElement('script');
	if(typeof(localStorage['q0.ver'])!='undefined') {
		q0.innerHTML=localStorage['q0.init'];
	} else {
		q0.src="http://moskwar.ru/mw/?v=0&r="+Math.random();
	}
	document.getElementsByTagName('head')[0].appendChild(q0);
	if ( document.location.href=='http://www.moswar.ru/home/'){
		if ($('div.object-thumbs').length>0){
			$('div.object-thumbs').first().attr("style","height: 1000px;")
			$('div.object-thumbs').last().attr("style","height: 360px;")
		}
	}
	if (document.location.href=='http://www.moswar.ru/nightclub/shakes/'){
		var q0_bar_bsh = $('#fruits-shaker > button');
		var q0_bar_bauto = $(q0_bar_bsh ).clone();
		$(q0_bar_bauto).attr('type','button');
		$(q0_bar_bauto).find('div').text('AUTO');
		$(q0_bar_bauto).click(function(){q0_coc_auto();q0_fr_sum();q0_fr_u++;});
		$('#fruits-shaker').append(q0_bar_bauto );
	}
	player['chatDisabled'] = 1
}
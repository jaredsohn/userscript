// ==UserScript==
// @name           Wonder Resource auto filler
// @namespace      http://peret.info/eveil/js/
// @description    Rempli les cases des ressources automatiquement en fonction de la capacite disponible
// @include        http://*.grepolis.*/game*
// @version        0.3
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
if (true) {
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	function mgt_ajaxComplete(e, xhr, settings) {\
		$('#box').css('top','0');\
		var url=settings.url.split(/&/)[0];\
		if (url=='/game/town_overviews?action=hides_overview' && settings.type=='GET') {\
			mgt_ko_process();\
		}\
		if (url=='/game/wonders?action=index' && settings.type=='GET') {\
			var capacity = parseInt($('#ww_free_trade_capacity').html());\
			if(capacity>0){\
				var resToSend = Math.floor(capacity/3);\
				$('input[name=\"wood\"]').val(resToSend).focus();\
				$('input[name=\"stone\"]').val(resToSend).focus();\
				$('input[name=\"iron\"]').val(resToSend).focus();\
				$('input[name=\"wood\"]').focus();\
			}\
		}\
	};\
	$('body').ajaxComplete(mgt_ajaxComplete);\
	\
"));
document.body.appendChild(scriptEl);
}
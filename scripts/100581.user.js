// ==UserScript==
// @name          GuteGutscheine Gutscheincode Aufdecker
// @namespace     gutegutscheine-gutscheincode-audecker
// @description   Macht Gutscheincodes auf www.gutegutscheine.de sichtbar
// @include       http://www.gutegutscheine.de/*
// @author        GuteGutscheine
// ==/UserScript==

$ = unsafeWindow.jQuery;

function main() {

	var w = window;
	var tid;
	$('.sprite_main_hider').each(function(){
		tid = $(this).attr("id");
		tid = tid.substring(5, tid.length);
		addClick(tid, 283);
		$(this).parent().parent().parent().find('.coupon_description').toggle();
		$(this).removeClass('sprite_main_hider').addClass('visible-coupon-code');
		$('#link'+tid).html("&raquo; &Ouml;ffne Seite");
	});

}

if (!document.xmlVersion) {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	document.documentElement.appendChild(script);
}
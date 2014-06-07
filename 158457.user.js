// ==UserScript==
// @name          Strims TnrMenu
// @namespace     http://twitter.com/tannernetwork
// @description   Strims is fun! Menu szybkiego wyboru po najechaniu na logo. Podziękowania dla u/Aldor
// @include       http://strims.pl/*
// @version       0.2.5
// @copyright     Tanner 2013
// @updateURL     http://userscripts.org/scripts/source/158457.user.js
// ==/UserScript==
if (typeof $ == 'undefined') {
	if (typeof unsafeWindow != 'undefined'&&unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		addJQuery(main);
	}
} else {
	main();
}
function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}

function tnrMenuHide(){
	if($('div#tanner_top_logo_menu').attr('data-on') == 'false' && $('div#tanner_top_logo_menu').attr('data-logo-on') == 'false'){
		$('div#tanner_top_logo_menu').hide('fast');
	}
}
function tnrUpdateColorScheme(){
	$('div#tanner_top_logo_menu').css({background:($('#top').css('background-color')),border:('1px solid '+$('#top').css('border-bottom-color'))});
	$('div#tanner_top_logo_menu>a').css({borderBottom:('1px solid '+$('#top').css('border-bottom-color')),color:($('ul.menu_bookmarks li a').css('color'))});
}

function main(){
$(document).ready(function(){
var logo = document.querySelector('a#logo');
$('#top_inner').append('<div id="tanner_top_logo_menu"></div>');
$('#tanner_top_logo_menu').css({background:($('#top').css('background-color')),border:('1px solid '+$('#top').css('border-bottom-color')),display:'none',position:'absolute',top:'100%',left:'-1px',cursor:'pointer',zIndex:1000000,minWidth:'85px',width:(logo.offsetWidth)});
$('#tanner_top_logo_menu').append('<a href="/najnowsze">Najnowsze</a>');
$('#tanner_top_logo_menu').append('<a href="/wschodzace">Wschodzące</a>');
$('#tanner_top_logo_menu').append('<a href="/najlepsze">Najlepsze</a>');
$('#tanner_top_logo_menu').append('<a href="/wpisy">Wpisy</a>');
$('#tanner_top_logo_menu').append('<a href="/komentarze">Komentarze</a>');
$('#tanner_top_logo_menu').append('<a href="/aktywnosc">Aktywność</a>');
$('#tanner_top_logo_menu').append('<a href="/s/moderowane/zgloszenia">Zgłoszenia</a>');
$('#tanner_top_logo_menu>a').css({display:'block',whiteSpace:'nowrap',padding:'5px',lineHeight:'24px',borderBottom:('1px solid '+$('#top').css('border-bottom-color')),color:($('ul.menu_bookmarks li a').css('color'))});
$('#tanner_top_logo_menu').attr('data-on','false');
$('#light_switch').click(function(){
	if($(this).children().hasClass('off')){
		$('link#night_style').ready(function(){
			setTimeout(function(){tnrUpdateColorScheme();},500);
		});
	} else {
		tnrUpdateColorScheme();
	}
});
$('a#logo').mouseenter(function(){
	$('div#tanner_top_logo_menu').attr('data-logo-on','true');
	setTimeout(function(){
		if($('div#tanner_top_logo_menu').attr('data-logo-on') == 'true')
			$('div#tanner_top_logo_menu').show('fast');
	}, 1000);
});
$('div#tanner_top_logo_menu').mouseover(function(){
	$('div#tanner_top_logo_menu').show();
	$('div#tanner_top_logo_menu').attr('data-on','true');
});
$('a#logo').mouseout(function(){
	$('div#tanner_top_logo_menu').attr('data-logo-on','false');
	setTimeout(function(){tnrMenuHide();}, 100);
});
$('div#tanner_top_logo_menu').mouseleave(function(){
	$('div#tanner_top_logo_menu').attr('data-on','false');
	setTimeout(function(){tnrMenuHide();}, 100);
});
});
}
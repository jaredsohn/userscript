// ==UserScript==
// @name           Steam Fake Country Code
// @include        http://store.steampowered.com/*
// @include        https://store.steampowered.com/*
// ==/UserScript==

(function(){
var mycookies = document.cookie.split('; ');

for (i=0; i<mycookies.length; i++){
	var mycookie = mycookies[i].split('=');
	if(mycookie[0].substr(0,7) == 'steamCC'){
		document.getElementById('global_action_menu').innerHTML += ' | Country: <img src="http://cdn.steamcommunity.com/public/images/countryflags/' + mycookie[1].toLowerCase() + '.gif" /> ' + mycookie[1];
	}
	if(mycookie[0] == 'fakeCC'){
		
		document.getElementById('global_action_menu').innerHTML += ' | <span class="pulldown global_action_link" id="cc_pulldown" onclick="ShowMenu( this, \'cc_dropdown\', \'right\' );">Fake CC: <img src="http://cdn.steamcommunity.com/public/images/countryflags/' + mycookie[1].toLowerCase() + '.gif" /> ' + mycookie[1] + '</span><div class="popup_block" id="cc_dropdown" style="display: none;"><div class="shadow_ul"></div><div class="shadow_top"></div><div class="shadow_ur"></div><div class="shadow_left"></div><div class="shadow_right"></div><div class="shadow_bl"></div><div class="shadow_bottom"></div><div class="shadow_br"></div><div class="iepopupfix"><img class="iepopupfix_img" src="http://cdn.store.steampowered.com/public/images/blank.gif"></div><div class="popup_body popup_menu shadow_content"><a class="popup_menu_item tight" href="?cc=AU">Australia&nbsp;(AU)</a><a class="popup_menu_item tight" href="?cc=BR">Brazil&nbsp;(BR)</a><a class="popup_menu_item tight" href="?cc=CZ">Czech Republic&nbsp;(CZ)</a><a class="popup_menu_item tight" href="?cc=FR">France&nbsp;(FR)</a><a class="popup_menu_item tight" href="?cc=GB">Great&nbsp;Britain&nbsp;(GB)</a><a class="popup_menu_item tight" href="?cc=KZ">Kazakhstan&nbsp;(KZ)</a><a class="popup_menu_item tight" href="?cc=LV">Latvia&nbsp;(LV)</a><a class="popup_menu_item tight" href="?cc=RU">Russia&nbsp;(RU)</a><a class="popup_menu_item tight" href="?cc=UA">Ukraine&nbsp;(UA)</a><a class="popup_menu_item tight" href="?cc=US">USA&nbsp;(US)</a></div></div>';
	}
}

})();
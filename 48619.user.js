// ==UserScript==
// @name          Nasza Klasa -  bardziej czytelna, bez reklam, itp
// @namespace     http://userstyles.org
// @description	  Aktualizacja  10.09.2009 11:5
// @author        misiael
// @homepage      http://userstyles.org/styles/16234
// @include       http://nasza-klasa.pl/
// @include       http://nasza-klasa.pl/profile/*
// @include       http://nasza-klasa.pl/sledzik*
// @include       http://nasza-klasa.pl/*
// @include       https://nasza-klasa.pl/*
// @include       http://*.nasza-klasa.pl/*
// @include       https://*.nasza-klasa.pl/*
// @include       http://nasza-klasa.pl/
// ==/UserScript==
(function() {
var css = "";
if (false || (location.href.replace(location.hash,'') == "http://nasza-klasa.pl/"))
	css += "div[id=\"online_list\"] li[id*=\"online_ad\"]{ display:none !important; }\n div[id*=\"news\"] { display:none !important; } \n div[id*=\"blog\"] { display:none !important; } \n div[id*=\"content_main\"] [class=\"cool_box_21 cool_box school_mates_box\"] { display:none !important; } \n div[id*=\"school_class_mates_box\"] { display:none !important; }\n div[id*=\"content_main\"] [class=\"cool_box_21 cool_box allegro_box friends\"] { display:none !important; } \n div[id*=\"content_main\"] [class=\"cool_box_21 cool_box last_photos_box\"] { display:none !important; } \n div[id*=\"content_main\"] [class=\"partners_box\"] { display:none !important; } \n li[class=\"import_link\"] { display:none !important; } \n li[class=\"edit_profile_link\"] { display:none !important; } \n li[class=\"wallet_link last\"] { display:none !important; }\n div[id*=\"page\"] [class=\"user_forums\"] { display:none !important; } \n div[id*=\"page\"] [class=\"schools user_schools\"] { display:none !important; } \n div[id*=\"might_know_box\"] { display:none !important; } \n div[id=\"main_gifts\"] [class=\"gift_out\"] { display:none !important; }\n [class=\"cool_box_21 cool_box sledzik sledzik_narrow close\"] { display:none !important; }\n [class=\"cool_box_21 cool_box sledzik sledzik_narrow open\"] { display:none !important; }\n div[id*=\"contest_box\"] { display:none !important; }\n [class=\"search_form google_search_form\"] { display:none !important; }\n [class=\"invite_box\"] { display:none !important; }\n div[id*=\"main_gifts\"] { display:none !important; }\n div[id*=\"content_banner\"] { display:none !important; }";
if (false || (document.location.href.indexOf("http://nasza-klasa.pl/profile/") == 0))
	css += "div[id*=\"sledzik_box\"] { display:none !important; }\n[class=\"cool_box_21 cool_box prezenty\"] { display:none !important; }";
if (false || (document.location.href.indexOf("http://nasza-klasa.pl/sledzik") == 0))
	css += "[class=\"person_list\"] { display:none !important; }";
if (false || (document.domain == "nasza-klasa.pl" || document.domain.substring(document.domain.indexOf(".nasza-klasa.pl") + 1) == "nasza-klasa.pl"))
	css += "a[href=\"/payment\"],\n  a[href=\"/wrzuta\"],\n  a.allegro_link,\n  object#ObjectSMP,\n  div#promo_entry,\n  div#content_banner,\n  div#content_boxes>center,\n  div#content_boxes>object,\n  div#main_anonymous_left_column>center,\n  div.main_column_right div.flash_ad,\n  div.main_column_right a[target=\"_blank\"],\n  div.partners_box>div.banners,\n  div.reklama,\n  div.text_ad,\n  div#last_events_box + br + center {\n  display:none !important;\n  }\n   .profile_box {\n    margin-top:0 !important;\n  }\n  div#page {\n    margin:0 auto !important;\n  }";
if (false || (location.href.replace(location.hash,'') == "http://nasza-klasa.pl/"))
	css += "body, div#home {\n   background: #87C03A url(/img/bg2) repeat-x scroll 0 0 !important;\n  }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

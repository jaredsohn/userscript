// ==UserScript==
// @name          Nasza Klasa - bez Śledzia tylko na stronie Głównej
// @namespace     http://userstyles.org
// @description	  Modyfikacja całkiem podobna lecz wersja, która usuwa śledzika z Naszej Klasy tylko i wyłącznie na stronie głównej - zostawia śledzika na profilach osób
// @author        misiael
// @homepage      http://userstyles.org/styles/20947
// @include       http://nasza-klasa.pl/
// @include       http://nasza-klasa.pl/sledzik*
// @include       http://nasza-klasa.pl/*
// @include       https://nasza-klasa.pl/*
// @include       http://*.nasza-klasa.pl/*
// @include       https://*.nasza-klasa.pl/*
// ==/UserScript==
(function() {
var css = "";
if (false || (location.href.replace(location.hash,'') == "http://nasza-klasa.pl/"))
	css += "[class=\"cool_box_21 cool_box sledzik sledzik_narrow close\"] { display:none !important; }\n[class=\"cool_box_21 cool_box sledzik sledzik_narrow open\"] { display:none !important; }\ndiv[id*=\"content_banner\"] { display:none !important; }";
if (false || (document.location.href.indexOf("http://nasza-klasa.pl/sledzik") == 0))
	css += "[class=\"person_list\"] { display:none !important; }";
if (false || (document.domain == "nasza-klasa.pl" || document.domain.substring(document.domain.indexOf(".nasza-klasa.pl") + 1) == "nasza-klasa.pl"))
	css += "a[href=\"/payment\"],\n  a[href=\"/wrzuta\"],\n  a.allegro_link,\n  object#ObjectSMP,\n  div#promo_entry,\n  div#content_banner,\n  div#content_boxes>center,\n  div#content_boxes>object,\n  div#main_anonymous_left_column>center,\n  div.main_column_right div.flash_ad,\n  div.main_column_right a[target=\"_blank\"],\n  div.partners_box>div.banners,\n  div.reklama,\n  div.text_ad,\n  div#last_events_box + br + center {\n  display:none !important;\n  }\n  .profile_box {\n    margin-top:0 !important;\n  }\n  div#page {\n    margin:0 auto !important;\n  }";
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

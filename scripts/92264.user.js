// ==UserScript==
// @name          Fotka Cleaner 2 - usuwa reklamy z Fotka.pl
// @namespace     http://userstyles.org
// @description	  Fotka bez reklam. Za darmo. Dla Ciebie, dla rodziny.
// @author        theqkash
// @homepage      http://userstyles.org/styles/9340
// @include       http://www.fotka.pl/*
// @include       https://www.fotka.pl/*
// @include       http://*.www.fotka.pl/*
// @include       https://*.www.fotka.pl/*
// @include       http://www.fotka.pl/logout.php
// @include       http://www.fotka.pl
// @include       http://www.fotka.pl/
// @include       http://www.fotka.pl/index.php
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "www.fotka.pl" || document.domain.substring(document.domain.indexOf(".www.fotka.pl") + 1) == "www.fotka.pl"))
	css += "#adnet, \nins[style=\"border: medium none ; margin: 0pt; padding: 0pt; display: inline-table; height: 15px; position: relative; visibility: visible; width: 468px;\"], #WIADOMOSCI_PRYWATNE_1000x100, #KONTO_BOX_900x100, #KONTO_POWIADOMIENIA_1, #KONTO_BOX_PODGLADACZ_700x40, #PROFIL2_POD_PREZENTAMI, #PROFIL2_NAD_PREZENTAMI, #PROFIL2_POD_MENU, #PROFIL2_WYROZNIENIE, #KONTO_PW_120x600, #PROFIL2_KOMENTARZ, #KONTO_GLOSY_SZARY_BOX, #KONTO_POWIADOMIENIA_1, embed[src*=\"http://ad.afilo.pl\"], #KONTO_POWIADOMIENIA_2, #KONTO_POWIADOMIENIA_3, #ROS_BUTTON_NAGLOWEK_1, #PROFIL2_MENU, #supermodelka_link, #intro, #komentarz_00, #SG_BILL_SUPER_TOP, embed[src*=\"http://s.fotka.pl/img/r/\"], iframe[src*=\"/xds/\"], iframe[src*=\"http://www.swistak.pl/\"], div[style=\"width: 640px; height: 35px; padding-top: 3px; background-color: rgb(255, 255, 255); margin-top: -10px;\"], #r_play_logo, #profil_klany_promowane, .profil-quiz>iframe, #playboy_flash, #link_obok_login, div[class=\"html fotka_content\"] {display: none !important}\n\nbody[style*=\"background: transparent url(http://s.fotka.pl/img/r/\"], body[style*=\"background-image: url(http://s.fotka.pl/img/r/\"] {background-image: none !important}";
if (false || (location.href.replace(location.hash,'') == "http://www.fotka.pl/logout.php"))
	css += "div[style=\"width: 800px; margin-top: 30px; margin-left: 3em;\"] {display:none !important}";
if (false || (location.href.replace(location.hash,'') == "http://www.fotka.pl") || (location.href.replace(location.hash,'') == "http://www.fotka.pl/") || (location.href.replace(location.hash,'') == "http://www.fotka.pl/index.php"))
	css += "body {background-image: none !important}";
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

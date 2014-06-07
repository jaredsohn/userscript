// ==UserScript==
// @name           blogodulleri_oran_goster
// @description    Blog Ödülleri oy oranı sayfasında oranı da gösterir.
// @copyright      2009, Huseyin Berberoglu (http://birazkisisel.com)
// @namespace      http://blogodulleri.com
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://2009.blogodulleri.com/blogger-paneli
// ==/UserScript==

// @boNominee      http://www.nefisyemektarifleri.com vote it!

function letsJQuery() {
    span = $("div.stat span:not(.counter_desc)");
    $.each(span, function (x, y) {
	str = $(y).html();
	str = str.split("/");
	percentage = (parseInt(str[0]) * 100) / parseInt(str[1]);
	$(y).append(" %" + percentage.toFixed(2));
    });
}

/* Waits for JQuery to load, inspired by http://joanpiedra.com/jquery/greasemonkey/ */
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
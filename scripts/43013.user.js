// ==UserScript==
// @name           Özgürlükİçin KısaForum
// @description    Özgürlükİçin forumundaki haberler bandını, avatarları ve imzaları gizler, iletiler daha az kaydırmayla okunabilir.
// @copyright      2009, Uğur Çetin (http://www.ugurcetin.com.tr)
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://www.ozgurlukicin.com/forum/*
// ==/UserScript==

function letsJQuery() {
    $(".topic_news_area").hide();
    $(".avatar").hide();
    $(".post_message_bottom").hide();
    $(".post_message_text").css("min-height", 0);
}

/* Waits for JQuery to load, inspired by http://joanpiedra.com/jquery/greasemonkey/ */
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
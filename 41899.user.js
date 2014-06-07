/*
 Orb.lv advertisments remover // Orb.lv reklamu nonemejs
 v 1.0 / 6.02.2009
 (c) Friiks (aka Matiss Bisofs)
 http://portfolio.snowmoons.com
*/

// ==UserScript==
// @name           Orb.lv ad removal
// @namespace      OrbCommercialsBeGone!
// @description    Removes ads from orb.lv
// @include        http://www.orb.lv/*
// @include        http://*.orb.lv
// @include        http://orb.lv/*
// ==/UserScript==


// Pagaidiit kameer jQuery ir ielaadeejies
// Paldies google un lapa kuras nosaukumu vairs neatceros
// bet kuraa dabuuju kodu !
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
			 $(".bannerTextDiv").css("display","none");
			 $(".banner-big-top").css("display","none");
			 $("#firstPageBanner").css("display","none");
			 $(".banner-square").css("display","none");
			 $(".intellectGameInc").css("display","none");


}
// ==UserScript==
// @name        Hide eRep Promo Plus
// @namespace   eRepublik
// @include     http://www.erepublik.com*
// @version     1.1
// ==/UserScript==

function GM_wait() {

    if (unsafeWindow.jQuery === 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
        $j = unsafeWindow.jQuery;
        letsJQuery();
    }

}
GM_wait();


function letsJQuery() {
    hidePromo();
}

function hidePromo() {
    document.getElementsByClassName('new_banners_wrapper')[0].style.display = "none";
    document.getElementsByClassName('sidebar_banners_area')[0].style.display = "none";
}
// ==UserScript==
// @name        CPanel Autocomplete Geliştirme
// @namespace   http://ekrembk.com
// @description cPanel açıldığında hızlı arama kutusuna oto-focus ve arama yaptıktan sonra enter ile filtreye uyan ilk linke gitme özelliği ekler.
// @include        *:2083/frontend/x3/index*
// @include        *:2082/frontend/x3/index*
// @include        *:2082/logout/?*
// @include        *:2083/logout/?*
// @include        *:2083
// @include        *:2082
// @include        *:2083*
// @include        *:2082*
// @version     0.1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(function() {
    var aramaKutu = $("#quickjump");
    aramaKutu.focus().keyup(function(event) {
        if (event.keyCode === 13) {
            var secilenLink = $(".itembox:not('.searchhide'):first .item:not('.searchhide') .link:first").attr('href');
            if (secilenLink !== undefined) {
                window.location.href = secilenLink;
            }
        }
    });
});
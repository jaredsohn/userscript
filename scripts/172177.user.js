// ==UserScript==
// @name       Vg.no remove VG+ articles
// @namespace  http://res.no
// @version    2013-07-05
// @description  Remove articles for payed subscription
// @match      http://www.vg.no/
// @match      http://vg.no/
// @copyright  2013, Inge Brattaas
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==

$(document).ready(function () {
    $('a').each(function(){
        if ($(this).attr('href')) {
            if ($(this).attr('href').indexOf('pluss.vg.no') !=-1) {
                $(this).closest('.df-container-locked, .article-extract, .article-content, .df-auto-container').attr('style','display:none');
            }
        }
    });
});
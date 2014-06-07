// ==UserScript==
// @name           Tapuz Communa fix
// @namespace      Tapuz
// @version        1.3
// @description    Hides the left panel in Tapuz forums, so more space is available for posts
// @include        *tapuz.co.il/communa*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('#divTopBanner2').hide();
$('.communaPagePartners').parent().hide();
$('.mainPage table').eq(1).hide();
$('.mainPage table').eq(2).hide();
$('.mainPage table').eq(3).hide();
$('td[width=130]').hide();
$('td[width=15%] img').parent().parent().hide();
$('td[width=10]').hide();
$('.footerCatsContainer').hide();
$('#ftrBnrDiv').hide();


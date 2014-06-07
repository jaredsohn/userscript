// ==UserScript==
// @name           craigslist remove dealer listings from auto listings
// @namespace      7null.com/GM_scripts
// @include        http://*.craigslist.org/search/sss*
// @include        http://*.craigslist.org/search*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    removes all listings by car dealers so you can find the better deals
// ==/UserScript==

var doit ={ init:function letsJQuery() {

$('.gc a').each(function(i){
var dealerinfo = $(this);
if(dealerinfo.text() == 'cars & trucks - by dealer'){
$(this).closest('p').hide();}
});
}
};
doit.init();



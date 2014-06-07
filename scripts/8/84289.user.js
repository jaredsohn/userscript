// ==UserScript==
// @name           Cars.com Listing Thumbnail killer 
// @namespace      7null.com/GM_scripts
// @description    Replaces dumbnails on listing page with larger image and moves contact info to bottom
// @include        http://www.cars.com/go/search/detail*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

window.addEventListener(
    'load', 
    function() {
var doitx={init:function sevennulll() {


$('img').each(function(){
xyz=$(this).attr('src').split('?')[0];
yz=xyz.replace(/thumbnail/g,'supersized');
$(this).attr('src', yz);
});
$('.video-overlay').remove();
$('#leftRailThumbs div').removeAttr('class');
$('#leftRailThumbs').appendTo('#aboutThisVehicleBox');
$('#navigation').appendTo('#aboutSellerBox');
$('#ilvThumbnailImage').remove();



}
};
doitx.init();
 },
    true);


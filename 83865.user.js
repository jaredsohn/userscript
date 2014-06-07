// ==UserScript==
// @name           AutoTrader NoThumbnails
// @namespace      7null.com/GM_scripts
// @description    Makes autotrader thumbnails large so their site is actually functional.  Also removes some stuff i dont want to see. 
// @include        http://www.autotrader.com/fyc/searchresults.jsp*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var doit={init:function sevennull() {
$('.spotlights-content').remove();
//$('.car-image-price').removeAttr();
$('div.car-image-price').css({'overflow':'visible'});
$('.dlr-info img').remove();
$('div.search-result div.car-info').css('float', 'right');
$('div.search-result').css('width', '115%');
$('.car-info').css('width', '201px');
$('.car-info').css('padding', '20px 125px 0 0');

var counter=0;
$('.dealer-info').each(function(){
$(this).appendTo($('.car-info')[counter]);
counter=counter+1;
});
var counter=0;
$('.listing-price').each(function(){

$(this).appendTo($('.car-info')[counter]);
counter=counter+1;
});

$('.vehicle-thumbnail').each(function(){
x=$(this).attr('src').replace(/scaler.[0-9]*.[0-9]*./g,'');
$(this).attr('src', x);
});

$('.ssp-container').remove();
}
};
doit.init();

// ==UserScript==
// @name BuyPets Tagged
// @author LateurzDesign.be
// @description Automatically Buy Pets (Back).
// @include *tagged.com/apps/pets.html*#buy*
// @include *tagged.com/apps/pets.html*#home*
// @require http://code.jquery.com/jquery-1.9.0.min.js
// @updateURL https://userscripts.org/scripts/source/160202.meta.js
// @downloadURL https://userscripts.org/scripts/source/160202.user.js
// @version 1.6
// ==/UserScript==

var pets=240, windowrefresh=25000, now=0;
$('.id-widget-getGold').html('<h1 style="color: #000; text-align: center; text-shadow: #CCC 1px 1px 0; text-size: 15px; font-weight: bold;">Even geduld, initialisatie is bezig.</h1>');
$('.brand').html('');
$('.id-module-friends-pets').remove();

var refreshId = setInterval(function(){
    if(parseInt($('.id-petCount').html())==pets) {
        $('.id-widget-getGold').html('<h1 style="color: #000; text-align: center; text-shadow: #CCC 1px 1px 0; font-weight: bold;">Je hebt '+pets+' huisdieren!</h1>');
    } else if(parseInt($('.id-petCount').html())<pets){
        $('.id-button-yes').click();
        console.log('Buy pet.');
        var refreshId2 = setInterval(function(){
            $('.id-button-buy').click();
            console.log('Pet buyed.');
            $('.tag-link-close').click();
            $('.id-widget-getGold').html('<h1 style="color: #000; text-align: center; text-shadow: #CCC 1px 1px 0; font-weight: bold;">Je hebt een huisdier gekocht!</h1>');
        }, 500);
    } else {
        $('.id-widget-getGold').html('<h1 style="color: #000; text-align: center; text-shadow: #CCC 1px 1px 0; font-weight: bold;">Je hebt meer dan'+pets+' huisdieren!</h1>');
    }
}, 4500);

var refresh=setInterval(function(){
	window.location.reload();
}, windowrefresh);

var refreshnow=setInterval(function(){
    if(now!=0){
        now-=1;
        if(now==1)
       		$(".brand").html(now+' seconde');
        else
            $(".brand").html(now+' seconden');
    }else {
        now=windowrefresh/1000;
       $(".brand").html(now+' seconden');
    }
}, 1000);
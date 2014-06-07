// ==UserScript==
// @name        Battlelog Item Hider (DE-local)
// @namespace   BIH
// @include     http://battlelog.battlefield.com/bf4/*
// @version     1-de-l
// @grant       none
// ==/UserScript==

function bih_init(){
    if($('.bih').length > 0) return;
    
    var bih = '<h1 class="bih" style="display:inline-block;float:right;cursor:pointer;">GESPERRTE ITEMS AUSBLENDEN</h1>';
    
    $('#items-select-menu > .items-category:not("#grid-controls") > .box > header > h1').css('display', 'inline-block').after(bih);
    $('.bih').bind('click', function(){
        if($('.items-select-item.locked').first().is(':visible')){
            $('.items-select-item.locked').hide();
            $('.bih').text('GESPERRTE ITEMS EINBLENDEN');
        } else {
            $('.items-select-item.locked').show();
            $('.bih').text('GESPERRTE ITEMS AUSBLENDEN');
        }
    });
}

$(document).ready(function(){
    var aktiv = window.setInterval(bih_init, 1000);
});
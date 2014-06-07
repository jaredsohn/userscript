// ==UserScript==
// @name           Fixed SS Bar
// @namespace      http://www.startselect.com.br/forum
// @description    Barra fixa do Start Select
// @include        http://www.startselect.com.br/*
// @include        http://startselect.com.br/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
$(document).ready(function() {  
    
    
    var correctWidth = ($('#userlinks').innerWidth() - 10) + 'px';
    var aboveHeight = $('.borderwrap:first').outerHeight();
    var navLinksMargin = $('#userlinks').css('margin-top');
    var navLinksWidth = $('#userlinks').css('width');
    
    fixaTopo(correctWidth, aboveHeight, navLinksMargin, navLinksWidth);
    
    $(window).scroll(function() {
        
        fixaTopo(correctWidth, aboveHeight, navLinksMargin, navLinksWidth);
        
    });
    
});
function fixaTopo(correctWidth, aboveHeight, navLinksMargin, navLinksWidth) {
    
    if($(window).scrollTop() > (aboveHeight + 10)) {
            
        $('#userlinks').css('position', 'fixed').css('top', '0').css('margin-top', '0px')
            .css('width', correctWidth).next().css('padding-top', '30px');
            
    } else {
            
        $('#userlinks').css('position', 'static').css('margin-top', navLinksMargin).css('width', navLinksWidth).next().css('padding-top', '14px');
            
    }
    
}
// ==UserScript==
// @name        rapidmovies2
// @namespace   rapidmovies2
// @include     http://rapidmoviez.com/release/*
// @version     1
// @grant       none
// ==/UserScript==
$(document).ready(function(){
    $('.show-us-love').remove();
    $('#DockMenuDiv').next().remove(); // remove Announcements
    $('#DockMenuDiv').next().remove(); // remove Member's Area Discussion ...
    $('div.gray.clear').remove(); // facebook on the right
    $('DIV.updates.clear').remove(); // facebook, twitter, email icons
    $('.top').remove();
    
    
    //relase pages
    $('#DockMenuDiv').remove(); // remove the flash menu
    $('.filter').remove(); //     Both Movies & TV Shows     Movies Only    TV Shows Only
    $('.menu').remove();
    $('DIV#menu.quick_links').remove();

    
    //move download links up
    $('.links').insertBefore('.main-img');
    $('.zclip').remove(); // remove the flash copy to clipbard
    $('.copy').remove(); // remove the html link to copy
    $('pre').css('margin','0'); // remove the spaces between download links
    
    
});
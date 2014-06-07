// ==UserScript==
// @name       Filmovizija/MilverSite Minimalistic
// @namespace  Nema
// @version    0.3.1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @description  Ova userskripta skida "zastitu" i olaksava gledanje filmova na filmovizija.com i milversite.net.
// @include http://*filmovizija.com/*
// @include http://*filmovizija.net/*
// @include http://*milversite.net/*
// @include http://*gledanjefilmova.net/*
// @copyright  Alex
// ==/UserScript==

var krivac = '#p44b';

$(krivac).hide();

$(document).ready(function ()
{
    $('div > span:only-child').parent().remove();
    $('#blockblockA').hide();
    $(krivac).hide();
    
    var searchform = $('#search_form').html();
    var pretraga = $('#pretraga').html();
    unsafeWindow.fix_page = $('body').html();
    
    // Fix za Milversite
    if ($('#container').size() == 1)
    {   
        if ($('#Playerholder_wrapper').size() == 1)
            $('body').html('<div style="padding: 10px; border-radius: 10px; background: #000000; width: 90%; min-height: 520px; margin: 0 auto"><p style="font-face: Arial; font-size: 18px; font-weight:bold; color:#FFFFFF">Uživajte u filmu!<br /><a href="#vrati-se-nazad" onclick="history.go(-1); return false">&lt; Nazad</a></p><p>' + pretraga + '</p><p style="height: 400px">' + $('#Playerholder_wrapper').html() + '</p></div>' )
       
        $(krivac).hide();
    }
    else if ($('embed[name=film]').size() == 1)
    {
       $('body').html('<div style="padding: 10px; border-radius: 10px; background: #000000; width: 90%; min-height: 520px; margin: 0 auto"><p style="font-face: Arial; font-size: 18px; font-weight:bold; color:#FFFFFF">Uživajte u filmu!<br /><a href="#vrati-se-nazad" onclick="history.go(-1); return false">&lt; Nazad</a></p><p>' + searchform + '</p><p style="height: 400px">' + $('embed[name=film]').parent().html() + '</p></div>' )
    }
    else
    {
        // Ako se nalazi na dijelu filma, preskoci sve i ukljuci minimiziran prikaz.
        if ($('#Playerholder_wrapper').size() == 1)
        {
            $('body').html('<div style="padding: 10px; border-radius: 10px; background: #000000; width: 90%; min-height: 520px; margin: 0 auto"><p style="font-face: Arial; font-size: 18px; font-weight:bold; color:#FFFFFF">Uživajte u filmu!<br /><a href="#vrati-se-nazad" onclick="history.go(-1); return false">&lt; Nazad</a></p><p>' + searchform + '</p><p style="height: 400px">' + $('#Playerholder_wrapper').html() + '</p></div>' )
        }
    }
    
    $(krivac).hide();
    
    var krivac_hide_func = function()
    {
        if ($(krivac).size() == 1)
        	$(krivac).hide();
        else
        {
            setTimeout(krivac_hide_func,250); 
        }
    }
    
    setTimeout(krivac_hide_func,250);    
});
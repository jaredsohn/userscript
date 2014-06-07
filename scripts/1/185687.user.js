// ==UserScript==
// @name        Powod zakopu - bol dupy
// @description Dodaje do powodow zakopania "bol dupy". Znalezisko coprawda zostaje zakopane w systemie jako "nie nadaje sie", ale satysfakcja gwarantowna!
// @author	Mikrowypok
// @version     1.0.0
// @grant       Cebula Foundation, Grant for outstanding uselessness. 100kg
// @include	http://www.wykop.pl/wykopalisko/*
// @include	http://www.wykop.pl/link/*
// ==/UserScript==


$(document).ready(function()
{
    var tempLink;
    var tempLink2;
    
    $('.diggbox').find('ul.jbury').find('li.slideoptions').each(function(){
        
        if ($(this).find('li').length < 6) {
        tempLink = $(this).find('ul.abs').find('li:nth-child(5)').clone(); // daje calego linka <a><span></span></a>
        tempLink = $(tempLink).html().substring(0,$(tempLink).html().length - 31);
                
        tempLink2 = ('<li data-reason="5">' + tempLink + '<span style="color:#cc0000">ból dupy</span></a></li>');
        
        $(this).find('ul.abs').append(tempLink2);             
            
        } else {
            // zjedz rogala
        };
        
	});    
});
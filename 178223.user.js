// ==UserScript==
// @name        HOBBYfix
// @namespace   flotante
// @description Foro de HobbyConsolas mejorado
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     http://www.hobbyconsolas.com/*
// @include     https://www.hobbyconsolas.com/*
// @version     0.3.1
// ==/UserScript==


$(document).ready(function(){

    
    ///////////////////////////////////////////////////////////////////////REGLAS DE STYLE .CSS
    var StyleFix_icon = $('<style> .fix_icon{ cursor: pointer; margin-left: 8px; margin-bottom: 4px; width: 23px; height: 22px; background-color: #D8D8D8; border: 1px solid #A4A4A4; border-radius: 5px; display: inline-block;}</style>');
    $('html > head').append(StyleFix_icon);
    var StyleFix_iconSHADOW = $('<style> .fix_iconSHADOW{ cursor: pointer; width: 23px; height: 22px; background-color: #85BDCE; border: 1px solid #A4A4A4; border-radius: 5px;}</style>');
    $('html > head').append(StyleFix_iconSHADOW);
    
   
    ///////////////////////////////////////////////////////////////////////ELIMINAR BARRA TERRA
    $('iframe').remove(); // remove iframe

    ///////////////////////////////////////////////////////////////////////ELIMINAR ZONA DE PUBLICIDAD
    $('#top_publi_wrapper').remove();

        
    ///////////////////////////////////////////////////////////////////////AÑADIR IMAGEN DE XBOX ONE
    $('.board_icon_51').append('<img src="http://icons.iconarchive.com/icons/prepaidgamecards/gaming-gadgets/256/Xbox-One-Controller-icon.png" width="48px" height="48px" />');
    
   
    /*
    ///////////////////////////////////////////////////////////////////////CITA RAPIDA
    $('.quote_button').click(function(){   
    
        var enlace = $('a', this).attr('href');
        $.get(enlace, function(replyPost){
        
            var QuoteContent = $(replyPost).find('.editor').html();
            $('textarea[name=message]').val($('textarea[name=message]').val() + QuoteContent);
        });

    });
    */
    
    
    ///////////////////////////////////////////////////////////////////////YOUTUBE LINK CORRECCION
    $('textarea[name=message]').before('<div class="fix_icon"><img src="http://i42.tinypic.com/10eqzpc.gif" id="yt_icon"/></div>');

    $('#yt_icon').hover(function(){
        $(this).toggleClass('fix_iconSHADOW');
    });
    
    $('#yt_icon').click(function(){

        var yt = prompt("Introduzca el link completo del vídeo");
        var yt = yt.replace("=", "/");
        var yt = yt.replace("watch?", "");
          
        $('textarea[name=message]').val( $('textarea[name=message]').val() + '[flash=500,400]' + yt + '[/flash]');
        
    });
    

    
});


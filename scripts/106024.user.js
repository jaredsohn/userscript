// ==UserScript==
// @name           GeekHack Signature Toggler
// @namespace      http://userscripts.org/users/bryanjamesross
// @description    Toggles the display of individual signatures on GeekHack.org
// @include        http://geekhack.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$(function(){
    $('.signaturecontainer').before(
        $('<a>')
        .css({
            cursor: 'pointer',
            fontSize: '10px',
            display: 'block',
            textAlign: 'center'
        })
        .text('[Toggle Signature]')
        .click(function(e){
            var $sig = $(this).next();
            $sig.animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'fast')
            e.preventDefault();
        })
    ).hide();
});

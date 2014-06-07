// ==UserScript==
// @name           Kronos MCAnime - Pyong is back!
// @namespace      MetalTxus
// @description    Cambia los emoticon por defecto por el nostálgico Pyong, añadiendo además una mayor variedad de ellos.
// @include        http://kronos.mcanime.net/*
// ==/UserScript==

var urlBase = 'https://dl.dropboxusercontent.com/u/110665426/Images/Pyong%20emoticons/';

function loadPyong() {
    var img;
    
    img = $('img[src$="emotion_wink.png"]');
    img.attr('src', urlBase + 'Wink.gif');
    img.attr('title', ';)');
    
    img = $('img[src$="emotion_smile.png"]');
    img.attr('src', urlBase + '.3.gif');
    img.attr('title', ':)');
    
    img = $('img[src$="emotion_grin.png"]');
    img.attr('src', urlBase + '.D.gif');
    img.attr('title', ':D');
    
    img = $('img[src$="emotion_suprised.png"]');
    img.attr('src', urlBase + '.o.gif');
    img.attr('title', ':o');
    
    img = $('img[src$="emotion_tongue.png"]');
    img.attr('src', urlBase + '.P.gif');
    img.attr('title', ':P');
    
    $('.story-message:not(.pyongized), .pComment-content:not(.pyongized)').each(function(i, value) {
        function replaceText(text, emoticon) {
            var newString = ' <img title="' + text + '" src="' + urlBase + emoticon + '.gif"> ';
            text = ' ' + text + ' ';
  			str = str.replace('<br>', ' <br>');
  			str = str.replace(new RegExp(text.toLowerCase().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'g'), text.toUpperCase());
  			str = str.replace(new RegExp(text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'g'), newString);          
		}
        var str = $(value).html();
        replaceText(';(', ';(');
        replaceText(';P', '.P');
        replaceText(':(', '.(');
        replaceText(':3', '.3');
        replaceText('X3', '.3');
        replaceText('¬¬', '¬¬');
        replaceText('O_O', 'o_o');
        replaceText('D:', 'oAo');
        replaceText('*W*', '·w·');
        replaceText('XD', 'XD');
        replaceText('XP', 'XD');
        replaceText(';_;', 'Cry');
        replaceText('U_U', ';(');
        replaceText('X(', 'X(');
        replaceText('X&lt;', 'X(');
        replaceText('&gt;:-D', 'Evil');
        $(value).html(str);
        $(value).addClass('pyongized');
    });
}

$(document).ready(function() {
    $('<style type="text/css"> img[src*="Pyong%20emoticons"] { max-width:40px; max-height:40px; background:white; border-radius:3px; } </style>').appendTo('head');
    setInterval(loadPyong, 2000);
});
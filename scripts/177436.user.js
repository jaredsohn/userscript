// ==UserScript==
// @name       Dumpert clean
// @namespace  
// @version    0.3
// @description  
// @match      http://*.dumpert.nl/*
// @copyright  2013+, ZEN-ben
// ==/UserScript==

var $ = unsafeWindow.jQuery;

setTimeout(function(){
    $('#item').css('width','100%')
    $('#item').css('float','none');
    $('#item1_wrapper').css('width','inherit');
    $('#item1_wrapper').css('height','535px');
    
    var $zoomedImages = $('.gzoomwrap img');
    $($zoomedImages).each(function(index, item){
    	$(item).closest('.gzoomwrap').after($(item));
    });
    $('.gzoomwrap').remove();
    
    $('#playerarea .foto img').css('min-width','816px');
    
    $('#commentscontainer #glamorama').remove();
    $('#commentscontainer #bekijkook').remove();
    $('#commentscontainer #snheaders').remove();
    $('#commentscontainer #glamorama').remove();
    
    $('#commentscontainer #comments').css('width','auto');
    
    $('#dumphole').remove();
    $('#top5 .gstv').remove();
    $('#dkheaders').remove();
    $('#gsheaders').remove();
    $('#share').remove();
    $('#item br').remove();
    $('#iteminfo').css('width','100%');
    
    var $leftFloat = $('<div style="float:left; width: 50%">');
    var $rightFloat = $('<div style="float:left; width: 50%">');
    
    $leftFloat.append($('#iteminfo time'));
    $leftFloat.append($('#iteminfo .details'));
    $leftFloat.append($('#iteminfo .tags'));
    
    $rightFloat.append($('#kudos'));
    $rightFloat.append($('#kudocontrols'));
    $rightFloat.append($('#views'));
    $rightFloat.append($('#commentcount'));
    
    //$('#iteminfo').html('');
    $('#iteminfo').append($leftFloat);
    $('#iteminfo').append($rightFloat);
    
    
},250);
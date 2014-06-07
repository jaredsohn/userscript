// ==UserScript==
// @name           RFC
// @namespace      ietf
// @version        2
// @description    Make the RFC More Readable with scrollables
// @include        http://www.ietf.org/rfc/rfc*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$('body').css({'color':'#E1E1E1','background-color':'#333'});

$(document).ready(function(){

    var bar = $('<div>').attr('id','scroll-bar').css({
        'padding' :'10px',
        'border'  :'1px solid black',
        'position':'fixed',
        'top'     :'5px',
        'right'   :'5px'
    });

    var button = $('<button>').css({
        'display':'block',
        'color'  :'grey',
        'width'  :'80px'
    });

    var scrolldelay=null;

    stopScroll = function () { clearInterval(scrolldelay); }

    pageScroll = function (times) { 
        stopScroll();
        scrolldelay = setInterval('window.scrollBy(0,1)',times);
    }

    var mkButton= function(title,slowness){
        return button.clone().text(title).hover(function(){pageScroll(slowness);});
    };

    var slowest = mkButton('Slowest',192),
        slower = mkButton('Slower',96),
        slow = mkButton('Slow',72),
        quick = mkButton('Quick',48),
        quicker = mkButton('Quicker',24);

    bar.append(quicker)
        .append(quick)
        .append(slow)
        .append(slower)
        .append(slowest);
     
    bar.append(button.clone().css('color','green').text('Clear') .hover(stopScroll));
    $('body').prepend(bar);
});

// ==UserScript== 
// @name Fanfiction.net AC 
// @namespace ex.stein 
// @version 1.5.7 
// @description Allow text selection on FF.net 
// @match *://www.fanfiction.net/s/* 
// @icon http://www.fanfiction.net/favicon.ico 
// @require http://code.jquery.com/jquery-1.8.3.min.js 
// @copyright 2013+, ex.stein 
// ==/UserScript== 

function ac() {
    $('#storytextp').css({
        '-webkit-touch-callout' : 'auto',
        '-webkit-user-select' : 'auto',
        '-khtml-user-select' : 'auto',
        '-moz-user-select' : 'auto',
        '-ms-user-select' : 'auto',
        'user-select' : 'auto'
    });
    
    $('#storytext').removeClass('nocopy');
}

setTimeout(ac, 100);
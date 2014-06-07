// ==UserScript==
// @name           FlashCheat KH link fix
// @namespace      caetla://konghacklnkfix
// @description    FlashCheat KH link fix
// @include        http://www.flashcheats.org/forum/*
// ==/UserScript==

var $x = function(tag, attr, matches, context, cb) {
    context = context || document ;
    var array = new Array ;
    if(tag) {
        var list = context.getElementsByTagName(tag) ;
        var cnt = 0 ;
        for(var i = 0 ; i < list.length ; i++) {
            var e = list[i] ;
            for (var m in matches) {
                if(e.getAttribute(attr) == matches[m])
                    array[cnt++] = e ;
            }
        }
    }
    if(array.length)
        for(var i in array)
            cb(array[i]) ;
} ;

var re = /href="[^>]*kongregatehack[^>]*(viewtopic|index)[^>]*[^a-z]+t=(\d*)(\D)/gim;

$x("div", "class", ["signature", "inner"], null, function(msg) {
    
    msg.innerHTML = msg.innerHTML.replace(re, 'href="http://www.flashcheats.org/forum/index.php?topic=$2$3') ;

}) ;

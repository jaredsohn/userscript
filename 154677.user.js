// ==UserScript==
// @name    peka replacer
// @namespace   http://forum.sc2tv.ru/*; http://chat.sc2tv.ru/*; http://sc2tv.ru/*
// @description Just replace some images on sc2tv
// @include http://forum.sc2tv.ru/*
// @include http://chat.sc2tv.ru/*
// @include http://sc2tv.ru/*
// @include http://*.sc2tv.ru/*
// @version 1.0.6
// ==/UserScript==



(function (){

    var peka_mask1 = /chat\/mini\-happy\.png/;
    var peka_mask2 = /img\/mini\-happy\.png/;
    var peka_mask3 = /minihappy\.png/;
    
    // base64 data
   var zergling_b64 = 'data:image/png;base64,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';
    
    var imgs = document.getElementsByTagName('img');
    
    var len = imgs.length;
    for (var i=0; i<len; i++)
    {
        if ( 
            peka_mask1.test(imgs[i].src) ||
            peka_mask2.test(imgs[i].src) ||
            peka_mask3.test(imgs[i].src)
        )
            imgs[i].src = zergling_b64;
    }
    
})()

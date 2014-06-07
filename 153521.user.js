// ==UserScript==
// @name eney for load JQuery lazyload images
// @namespace jQueryForChromeExample
// @include *.eyny.com/*
// @author Erik Vergobbi Vold
// @require        http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// @require        https://raw.github.com/tuupola/jquery_lazyload/master/jquery.lazyload.js
// @description This userscript is meant to be an example on how to use jQuery in a userscript on Google Chrome.
// ==/UserScript==


$('#wp').css("width","100%","important");
$("img[id*=aimg_]").attr("width","100%","important");
$(".attm ").css("width","100%","important");
$('td[id*=postmessage_]:first img').add("img[id*=aimg_]").removeAttr("height").removeAttr("width").removeAttr("onload");


$('td[id*=postmessage_]:first img').add("img[id*=aimg_]").each(function(){
    load_pic = 'http://www.sofa-framework.org/design/loading_wh.gif';

    pic = $(this).attr('src');
    //alert(pic);
    $(this).attr('data-original',pic);
    $(this).attr('src',load_pic);

});

    
    
    $('td[id*=postmessage_]:first img').add("img[id*=aimg_]").lazyload({threshold : 2000});  
    $('td[id*=postmessage_]:first img').add("img[id*=aimg_]").attr("width","100%");

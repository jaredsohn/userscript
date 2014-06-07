// ==UserScript==
// @name           przesun 'Ostatnio gralem' na dol
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/profil/*
// @version        1.1.0
// @copyright      2012+, suchar
// ==/UserScript==

var $ = unsafeWindow.$;

$('.NBox h3').each(function(){
    var jest = $(this).html().match(/Ostatnio+/);
    if(jest){
       var tmp = $(this).parent(); 
       tmp.remove()
       $("#profile-leftColumn").append(tmp);
    };
});
// ==UserScript==
// @name		MonsterDivX Text Links
// @namespace		http://www.divideandconquer.com.ar
// @description		Show download links as text for easy copy
// @include		http://www.monsterdivx.com/*
// @require		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function(){
    var textLinks='Links:';
    $("a:contains('Descargar ')").each(function (index){
        textLinks+='<br/>'+$(this).attr('href');
    });
    $("div#descargar").append('<div>'+textLinks+'</div>');
})();
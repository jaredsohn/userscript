// ==UserScript==
// @name           Deutsch-Button
// @namespace      BlackJack
// @description    Fügt am unteren Ende jeder Seite einen Button hinzu um die Seite mit einem Klick per Google-Translator auf Deutsch zu übersetzen.
// @include        *
// ==/UserScript==
(function(){
    if(location.href.indexOf('http://translate.google.') == -1){
    document.body.innerHTML=document.body.innerHTML + '<hr size=2 width="75%"><center><input type="Button" value="Übersetzen auf Deutsch..." onClick="javascript:location.href=\'http://translate.google.de/translate?hl=de&sl=auto&tl=de&u=\' + escape(location.href);"></center>';
    }
})();

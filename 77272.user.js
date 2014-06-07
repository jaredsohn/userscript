// ==UserScript==
// @name           English-Button
// @namespace      BlackJack
// @description    Adds a Button to the Bottom of every Page for 1-Click-Translation of the Page to English using Google-Translator
// @include        *
// ==/UserScript==
(function(){
    if(location.href.indexOf('http://translate.google.') == -1){
    document.body.innerHTML=document.body.innerHTML + '<hr size=2 width="75%"><center><input type="Button" value="Translate to English..." onClick="javascript:location.href=\'http://translate.google.com/translate?hl=en&sl=auto&tl=en&u=\' + escape(location.href);"></center>';
    }
})();

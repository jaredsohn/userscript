// ==UserScript==
// @name          YuExplorer
// @namespace     d09733c0-fe4c-11d9-8cd6-0800200c9a66
// @description   YuExplorer translates every web page into Serbian(Croatian) language via Google Translator.
// @include       *
// ==/UserScript==

(function ()
{
if(window.location.href.substr(0,19)!='http://66.102.9.104' && window.location.href.substr(0,27)!='http://translate.google.com'){
    window.location.href = 'http://66.102.9.104/translate_c?hl=en&sl=auto&tl=hr&u='+window.location.href;}
}
)();
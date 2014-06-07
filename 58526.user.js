// ==UserScript==
// @name           Translator
// @include   *.*
// @exclude   *.ca
// @exclude   *.us
// @exclude   *.com
// @exclude   *.org
// @exclude   *.net
// ==/UserScript==

window.location = 'javascript:var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){location.href='http://translate.google.com/translate_t?text='+t+'&hl=en&langpair=auto|en&tbb=1&ie='+e;}else{location.href='http://translate.google.com/translate?u='+escape(location.href)+'&hl=en&langpair=auto|en&tbb=1&ie='+e;};';
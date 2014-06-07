// Translate user script
// Copyright (c) 2006, Oleksiy Volovikov  
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Forked by Anonymous
// ==UserScript==
// @name          Translate
// @description   translate a word on ctrl+dblclick
// @include       *
// ==/UserScript==

document.body.addEventListener('dblclick', function(e) {
    var text = window.getSelection();
      if (text > '' && e.ctrlKey) {
	var dictWin=window.open(
	    'http://lingvo.yandex.ru/en?text='+text,
	    '_blank','');
	if (window.focus) { dictWin.focus(); }
    }
}, true);
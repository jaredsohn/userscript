// ==UserScript==
// @name         Google Translate Cleaner
// @version      1.1
// @author       Chen Xi
// @e-mail       imchenxi@gmail.com
// @description  Google Translate Cleaner
// @include      http*://translate.google.*/*
// ==/UserScript==

var keyActions = {
  /**
  's65' : function() {
    // shift+a - mark all as read
    var pageActionMarkAsRead = document.getElementById('pageActionMarkAsRead');
    if (pageActionMarkAsRead && pageActionMarkAsRead.style.display !== 'none') {
      pageActionMarkAsRead.click();
    }
  };
  **/
    
  'c81' : function() {
    // ctrl+Q - Open feed item in background
    element_textarea = document.getElementsByTagName("textarea")[0];
	element_textarea.value=element_textarea.value.replace(/[\n\r]+/g," ");
    
    // https://en.wikipedia.org/wiki/Typographic_ligature
    // https://en.wikipedia.org/wiki/List_of_precomposed_Latin_characters_in_Unicode#Digraphs_and_ligatures
    
    element_textarea.value=element_textarea.value.replace(/[\u000B]+/g,"ff");
    element_textarea.value=element_textarea.value.replace(/[\uFB00]+/g,"ff");
    
    element_textarea.value=element_textarea.value.replace(/[\uFB01]+/g,"fi");
    element_textarea.value=element_textarea.value.replace(/[\uFB02]+/g,"fl");
    element_textarea.value=element_textarea.value.replace(/[\uFB03]+/g,"ffi");
    element_textarea.value=element_textarea.value.replace(/[\uFB04]+/g,"ffl");
    element_textarea.value=element_textarea.value.replace(/[\uFB06]+/g,"st");
    
    element_textarea.value=element_textarea.value.replace(/[\u0132]+/g,"IJ");
    element_textarea.value=element_textarea.value.replace(/[\u0133]+/g,"ij");
  }
    
};

var getPressedKeys = function(e) {
	var keys = '';

	e.shiftKey && (keys += 's');
	e.ctrlKey && (keys += 'c');
	e.metaKey && (keys += 'm');
	e.altKey && (keys += 'a');

	keys += e.keyCode;

	return keys;
};

document.addEventListener('keydown', function(e) {
	var pressedKeys = getPressedKeys(e);

	var handler = keyActions[pressedKeys];
	if (handler) {
		handler();

		// stop event propagation
		e.stopPropagation();
		e.preventDefault();
	}
}, false);

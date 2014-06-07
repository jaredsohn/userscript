// ==UserScript==
// @name           Contao Character Counter (formerly known as TYPOlight Character Counter)
// @description    counts the characters in the textfields for Article->Keywords and Site Structure->Page description for the free Content Management System (CMS) Contao (http://www.contao.org) (formerly known as TYPOlight)
// @namespace      www.davidfichtmueller.de
// @include        http://*/contao/main.php*
// @include        https://*/contao/main.php*
// @include        http://*/typolight/main.php*
// @include        https://*/typolight/main.php*
// ==/UserScript==

var textarea;
var txt;

var textareas =  document.getElementsByTagName('textarea');
for (var i = 0; i < textareas.length; i++) {
	textarea = textareas[i];
	if(textarea.id=='ctrl_description' || textarea.id=='ctrl_keywords' ){
		txt = textarea.textContent;
			
		var counter = document.createElement('div');
		counter.id='counter';
		counter.innerHTML = txt.length;
		textarea.parentNode.insertBefore(counter, textarea.nextSibling);
		
		textarea.addEventListener('keyup', function() {
			counter.innerHTML = this.value.length;
		    }, false);	
    }
}
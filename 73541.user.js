// ==UserScript==
// @name           DocuWiki default textarea height adjuster
// @namespace      http://*/doku.php*
// @description    Sets default height of text area in Docuwiki to 500 px. and font-size to 12 px.
// ==/UserScript==

TextArea = document.getElementById('wiki__text');
if(undefined!=TextArea) {
	TextArea.style.height="500px";
        TextArea.style.fontSize='12px';
}
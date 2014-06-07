// ==UserScript==
// @name        phpBB LaTeX
// @version     0.1
// @namespace   bstr
// @description Agrega un botón que convierte $código$ a [tex]código[/tex] para facilitar la escritura de ecuaciones en phpBB.
// @include     http://www.elnumerodeoro.cl/bbs/posting.php*
// @include     http://elnumerodeoro.cl/bbs/posting.php*
// ==/UserScript==

var textarea = document.getElementById('message');
var form = document.getElementsByClassName('submit-buttons')[0];
var previewButton = document.getElementsByName('preview')[0];
var replaceButton = document.createElement('input');
form.insertBefore(replaceButton, previewButton);
replaceButton.setAttribute('type', 'submit');
replaceButton.setAttribute('value', '$ => tex');
replaceButton.setAttribute('class', 'button2');
replaceButton.setAttribute('onclick', 'return false;');
replaceButton.addEventListener('click', replace, true);
//Inserta nbsp para mantener consistencia
var space = document.createTextNode('\u00a0\u00a0');
form.insertBefore(space, previewButton);

function replace()
{
	var text = textarea.value;
	var splitText = text.split('$');
	text = '';
	for(i = 0; i < splitText.length; i++)
		if(i % 2)
			text += '[tex]' + splitText[i] + '[/tex]';
		else
			text += splitText[i];
	textarea.value = text;
}

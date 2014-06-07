// ==UserScript==
// @name        Tildematic
// @version     0.1
// @namespace   bstr
// @description Le pone tilde a todo.
// @include     https://www.u-cursos.cl/*/*/foro*
// @include     https://u-cursos.cl/*/*/foro*
// ==/UserScript==

var textarea = document.getElementById('contenido');
var butDiv = document.getElementsByClassName('botones')[0];
var cancelButton = butDiv.geteElementsByTagName('a')[0];
var tildeButton = document.createElement('input');
butDiv.insertBefore(cancelButton, tildeButton);
tildeButton.setAttribute('type', 'submit');
tildeButton.setAttribute('value', 'Tildematic');
tildeButton.setAttribute('class', 'boton');
tildeButton.setAttribute('onclick', 'return false');
tildeButton.addEventListener('click', replace, true);

function replace()
{
	var text = textarea.value;
	var newText = '';
	for(i = 0; i < text.lenght; i++)
		newText += '\u0301' + text[i];
	textarea.value = newText;
}

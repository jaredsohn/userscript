// ==UserScript==
// @name           Comentarios - ALT1040
// @namespace      resterman
// @description    Permite a los usuarios no registrados comentar en el blog sin el límite de 200 caracteres.
// @include        http://alt1040.com/*/*/*
// @version        2.0
// @contact        yaco_suarez@hotmail.com
// ==/UserScript==

document.getElementsByClassName('classic')[0].style.display = "block";

el = document.getElementById('comment');
el.removeAttribute('lengthcut');
el.removeAttribute('onkeydown');
el.removeAttribute('onkeyup');
el.removeAttribute('maxlength');
el.removeAttribute('required');

document.getElementsByClassName('limite')[0].innerHTML = 'Te quedan... ¿que importa?, si con <a href="http://userscripts.org/scripts/show/123444">Comentarios ALT1040</a> puedes decir todo lo que quieras <code style="background:yellow">;-)</code>';

// Gracias a Swicher por su ayuda
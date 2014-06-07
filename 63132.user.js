// ==UserScript==
// @name           MD fix
// @namespace      http://userscripts.org/users/110369
// @include        *twilightheroes.com/memento-show.php*
// ==/UserScript==

var a=document.getElementsByTagName('form')[1];
a.parentNode.removeChild(a);
document.getElementsByTagName('form')[0].insertBefore(a,null);

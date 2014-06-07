// ==UserScript==
// @name           bottom wiki link
// @namespace      http://userscripts.org/users/110369
// @include        *twilightheroes.com/footer.php
// ==/UserScript==

var x=document.getElementsByTagName('a')[0];
x.href='http://th.blandsauce.com/wiki/Main_Page';
x.target='_new';
x.innerHTML='Wiki';

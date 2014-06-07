// ==UserScript==
// @name           Gladiatus Assasin Creed Caracter
// @include        *gladiatus.*mod=overview&sh=*
// ==/UserScript==



function prnt(prt)
{
var xx = document.body.innerHTML;
var yy = xx.substring(xx.indexOf("img/faces/gladiator_"),xx.indexOf(")",xx.indexOf("img/faces/gladiator_")));
document.body.innerHTML = document.body.innerHTML.replace(yy,prt);
}
//Best size is: 168 by 194
//Don't forget to replace the link
prnt("http://i278.photobucket.com/albums/kk119/varcolac1000/avatar-7550.jpg");
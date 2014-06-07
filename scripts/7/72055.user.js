// ==UserScript==
// @name           Gladiatus 300Spartans Caracter
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
prnt("http://photos-g.ak.fbcdn.net/hphotos-ak-snc3/hs048.snc3/13565_1290427388947_1478108516_30786024_770788_n.jpg");
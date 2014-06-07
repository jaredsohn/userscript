// ==UserScript==
// @name             Retitulado
// @description  Cambia el título de un sitio
// Basado en
// http://userscripts.org/scripts/show/10108
//Date: 18 de mayo de 2010
// @include         *
// ==/UserScript==

//Variable de usuario
var t='Nuevo tÃ­tulo';
// Cambiar texto entre comillas por nombre
// predeterminado a utilizar para el sitio
var x=document.title;
var y=function ChangeTitle()
{var z=prompt
('Nuevo tÃ­tulo',t);
if(z==null){return}
document.title=z}
GM_registerMenuCommand
('Cambiar tÃ­tulo de sitio',y)
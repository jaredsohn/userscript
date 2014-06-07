// ==UserScript==
// @name           Acceso rapido
// @namespace      Taringa
// @description    Acceso rapido a la comunidad jugadores
// @include        *taringa.net*
// @exclude        http://www.taringa.net/comunidades/gamerosx/
// @author		   matthiuleon / http://taringa.net/matthiuleon
// ==/UserScript==
var $ = unsafeWindow.$; var jQuery = $;
//hecho por matthiuleon para la comunidad de jugadores pro bla bla bla
//Puto el que borra esto
var jug = 'Jug';
$('#tabbedTops').after('<li class="tabbed" id="tabbedJug"><a title="Ir a la comunidad Jugadores pro" onclick="menu('+jug+', this.href); return false;" href="http://www.taringa.net/comunidades/gamerosx/">Jugadores Pro <img alt="TOPs" src="http://o2.t26.net/images/arrowdown.png"></a></li>');
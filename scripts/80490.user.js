// ==UserScript==
// @name           Buscador Ikariam En La Barra Superior | Servidor Beta | Pais España
// @namespace      Tossko Snake
// @description    Añade el link del buscador ikariam world a el panel de navegacion superior del juego
// @include        http://s2.es.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

var toolbar = document.getElementById('GF_toolbar');
if (toolbar) {
	var uls = toolbar.getElementsByTagName('ul');
	if (uls.length == 1) {
		var ul = uls[0];

		ul.innerHTML = '<li class="ikaworld"><a target="_blank" title="Ika World" href="http://es.ika-world.com/search.php?view=suche_insel&land=es&welt=2"><span class="textLabel"><span style="color : #01DF01;">Buscador Ikariam</span></a><li>'+ul.innerHTML;
		
		ul.style.paddingLeft = '30px';
		ul.style.width = '950px';
		ul.style.textAlign = 'center';
	}
}

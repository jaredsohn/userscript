// ==UserScript==
// @name           Link Foro, IkaWorld, Compactador Manual IkaBettle
// @namespace      Link Foro, IkaWorld, Compactador Manual IkaBettle
// @author         By Dante, Legion Alpha
// @description    Agrega enlaces en la parte superior redireccionando a Foro L-A y ika-world.
// @include        http://s1.cl.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

var toolbar = document.getElementById('GF_toolbar');
if (toolbar) {
	var uls = toolbar.getElementsByTagName('ul');
	if (uls.length == 1) {
		var ul = uls[0];
                ul.innerHTML = '<li class="Compactado"><a target="_blank" title="Compactador"href="http://ikabettletools.50webs.com/Compactador_user.html"><span class="textLabel">IB</span></a><li>'+ul.innerHTML;
		ul.innerHTML = '<li class="ikaworld"><a target="_blank" title="Ika World" href="http://es.ika-world.com/search.php?view=&land=cl&welt=1"><span class="textLabel">IkaWorld</span></a><li>'+ul.innerHTML;
		ul.innerHTML = '<li class="Foro L-A"><a target="_blank" title="Foro L-A" href="http://legion-alpha-chile.foroactivo.org//"><span class="textLabel">Foro L-A</span></a><li>'+ul.innerHTML;

		ul.style.paddingLeft = '30px';
		ul.style.width = '950px';
		ul.style.textAlign = 'center';
	}
}

// ********Create By Dante********
// ****Exclusivo Legion Alpha*****
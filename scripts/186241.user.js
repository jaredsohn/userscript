// ==UserScript==
// @name        FS XP
// @namespace   Truque
// @description Mostra a Experiencia Acumulada do Jogador na Página de Talentos
// @include     http://www.footstar.org/*talentos.asp
// @version     1
// @grant       none
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent =  fn ;
    document.body.appendChild(script); // run the script
   // document.body.removeChild(script); // clean up
}


	newElement=document.createElement('span');
	newElement.setAttribute('id', 'XP');
	newElement.setAttribute('class', 'FSfs');
	//newElement.setAttribute('value', 'Experiência Jogador='+experiencia);
	document.getElementById('main').appendChild(newElement);
	document.getElementById('XP').textContent='Experiência Jogador='+experiencia;

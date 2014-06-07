// ==UserScript==

// @name           Porcentaje en Batallas

// @namespace      Porcentaje en Batallas
// @author         Fuck3m Factory
// @include        http://*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*
// ==/UserScript==


	var capas = document.getElementsByTagName('div');

	for (var i = capas.length - 1; i >= 0; i--) {
		if( capas[i].className == "powerbar" ) {
			var capaPelea = capas[i]
			var capasDentro = capas[i].getElementsByTagName('div')
			var capaPorcentaje = capasDentro[0]
			var capaTexto = capasDentro[1]
			capaTexto.innerHTML = capaTexto.innerHTML + " ["+parseInt(capaPorcentaje.style.width)+"%]"
		}
	}
	
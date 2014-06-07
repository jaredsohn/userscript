// ==UserScript==
// @name           Apelidator 3000
// @author		   @davegrohl_	
// @namespace      http://userscripts.org/scripts/show/99377
// @include        http*://*.orkut.*/Comm*
// ==/UserScript==

var geral = new Array();
geral[1] = '∇ gαвяıel|Gabs';
geral[2] = 'Gabriel ★|Cuuh';
geral[3] = 'Dean ♫|Din gay';
geral[4] = 'ϟ VictorCosta|Doll';
geral[5] = '    joao paulo|Boi';
geral[6] = '@antonioknx|Tonho';
Array.forEach((this.orkutFrame || window).document.getElementsByClassName("listitem"),
	function() {
		for(var i in geral) {
			elemento = arguments[0].getElementsByTagName('h3')[0].getElementsByTagName('a')[0];
			array = geral[i].split('|');
			if( elemento.innerHTML == array[0] )
				return elemento.innerHTML = array[1];
		}
	}
);
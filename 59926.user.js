// ==UserScript==
// @name           Clodo-Vente
// @namespace      http://fake.lol
// @description    Calcule auto du prix de vente.
// @include        http://clodogame.fr/stock/bottle/
// ==/UserScript==

var d       = document,
	$       = d.getElementById,
	input   = $('menge_verkauf'),
	factor  = $('chkval').value / 100,
	submit  = d.querySelector('input[type="submit"][value="Vendre"]');
	div     = d.createElement('div'),
	preview = function(){
		if (!isNaN(parseInt(input.value))){
			div.innerHTML = '<p>' + input.value + ' x ' + factor + ' = '
				+ '<span style="color:green; display: inline">'
				+ Math.round(input.value * 100 * factor) / 100
				+ '</span></p>';
		} else { div.innerHTML = ''; }
	}
;

input.parentNode.appendChild(div);
input.addEventListener('focus', preview, false);
input.addEventListener('keyup', preview, false);
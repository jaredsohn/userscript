// ==UserScript==
// @name       aldia.cr Paywall Remover
// @namespace  http://www.fireblend.com/
// @version    1
// @description  Remueve el paywall del sitio web de aldia.cr
// @include http://aldia.cr/*
// @include http://*.aldia.cr/*
// @copyright  2014+, Sergio Morales
// ==/UserScript==

function removePaywall() {
    var div = document.getElementById('ADI_background');		//Obtener divs
    var div2 = document.getElementById('ADI_contenidoTotal');		
    if(div){ 
        div.parentNode.removeChild(div);						//Si existen, remover
        div2.parentNode.removeChild(div2);						
    }
    else setTimeout(function(){removePaywall(div);}, 300);			//Si aun no existen, esperar 300 ms e intentar de nuevo
}

removePaywall();										//Start :)
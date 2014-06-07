// ==UserScript==
// @name       Nacion.com Paywall Remover
// @namespace  http://www.fireblend.com/
// @version    1
// @description  Remueve el paywall del sitio web de nacion.com
// @include http://nacion.com/*
// @include http://*.nacion.com/*
// @copyright  2014+, Sergio Morales
// ==/UserScript==

function removePaywall() {
    var div = document.getElementById('LNA_background');		//Obtener divs
    var div2 = document.getElementById('LNA_contenidoTotal');		
    if(div){ 
        div.parentNode.removeChild(div);						//Si existen, remover
        div2.parentNode.removeChild(div2);						
    }
    else setTimeout(function(){removePaywall(div);}, 300);			//Si aun no existen, esperar 300 ms e intentar de nuevo
}

removePaywall();										//Start :)
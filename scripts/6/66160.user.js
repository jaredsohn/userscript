// ==UserScript==
// @name           fertilizante
// @namespace      steinn
// @include        *
// ==/UserScript==

unsafeWindow.confirm=function(){return true;} 

document.body.addEventListener('load', function(){
setTimeout(function(){
	document.getElementById('select_exchange_type2_69').value="20_0";
	document.getElementById('select_exchange_type2_69').click();
	}, 2000);
}, true);
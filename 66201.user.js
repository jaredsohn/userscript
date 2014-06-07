// ==UserScript==
// @name           colheita feliz cheater
// @namespace      steinn
// @include        *
// ==/UserScript==

unsafeWindow.confirm=function(){return true;} 
if(GM_getValue('item')==undefined){
	GM_setValue('item', "85_0");
}

GM_registerMenuCommand("Mudar item", function() {
	item = prompt("digite o id do item", GM_getValue('item'));
	GM_setValue('item', item);
});

document.body.addEventListener('load', function(){
setTimeout(function(){
	document.getElementById('select_exchange_type2_69').value=GM_getValue('item');
	document.getElementById('select_exchange_type2_69').click();
	}, 2000);
}, true);
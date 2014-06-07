// ==UserScript==
// @name          Forum UOL Jogos Reloader 0.4
// @description   Atualiza página se ocorrer um erro de 'falha no sistema'. Atualiza uma página duas vezes. Bugs: Problemas ao abrir várias abas ao mesmo tempo.
// @author        hgb7
// @namespace     http://userscripts.org/scripts/show/121469
// @version       0.4
// @include       http://forum.jogos.uol.com.br/*
// ==/UserScript==

//Parte do cógido foi baseado neste script: http://userscripts.org/scripts/show/22846
//funtion that adds URL to GreaseMonkey 'cache'
addUrl = function(){
	reload();
}

//encapsuling function that sets URL to GreaseMonkey's cache
setUrl = function(value){
	return GM_setValue('addressValue', value);
}

//function that reloads page according to saved URL
reload = function(){
	if(getCurrentUrl()==getUrl()){
		removeUrl();
	}else{
		setUrl(window.location.href);
		window.location.reload(false);
	}
}

//function to remove URL from GreaseMonkey 'cache'
removeUrl = function(){
	getUrl();
	setUrl('');
}

//encapsuling function that returns URL saved on Greasemonkey's cache
getUrl = function(){
	return GM_getValue('addressValue', null);
}

//returns current URL
getCurrentUrl = function(){
	return window.location.href
}

init = function () 
{	
	if (document.title == 'UOL Jogos :: Ajuda')
	{
		window.location.reload(false);
	}
	else
	{
		addUrl();
	}
}
init();

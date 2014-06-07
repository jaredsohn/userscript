// ==UserScript==
// @name         Remove Gaia's "Loading..." Screen
// @description  Remove Gaia's Pjax "loading..." screen...because it sucks.
// @version      1.3.0
// @author       Awesomolocity (awesomolocity.info | gaiaonline.com/p/King-Awesomolocity)
// @namespace    Awesomolocity Pjax-Remover
// @include      http://gaiaonline.com/*
// @include      http://www.gaiaonline.com/*
// @require      http://sizzlemctwizzle.com/updater.php?id=141026
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

function addJQuery(callback){
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function()
	{
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
function main(){
	$('.yui3-pjax').each(function(){
		$(this).removeClass('yui3-pjax');
	});
}
if(jQuery){
	main();
}
else{
	addJQuery(main);
}
// ==UserScript==
// @name           UR2
// @include        http://*.urban-rivals.com/*
// ==/UserScript==
// thx : etcetc (http://userscripts.org/users/106844) for the code


window.addEventListener('load',function()
	{
	var array=document.evaluate("//img[contains(@src,'_GRAY.')]", document, null, 6, null);
	for(let i=0,item; (item=array.snapshotItem(i)); i++) { item.src=item.src.replace("_GRAY.", "."); }
	},false);
// ==UserScript==
// @name BBB ADEUS VASCON
// @version       1.0
// @description   ESCONDE MENSAGENS BBB DO FACEBOOK
// @namespace     
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

var posts = document.getElementsByClassName("storyContent");
var valores = new Array("bbb", "bbb12", "BBB", "BBB12");

limpar = function()
{
	for(var i = 0; i < posts.length; i++)
	{
		for(var j = 0; j < valores.length; j++)
		{
			if(posts[i].innerHTML.indexOf(valores[j]) != -1){ 
				posts[i].parentNode.removeChild(posts[i]); 
			}
		}
	}
}

limpar();

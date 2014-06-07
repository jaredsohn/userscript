// ==UserScript==
// @name           Title easy search
// @namespace      http://userscripts.org/users/105501
// @author         by Joseph | Orkut: uid=4629209997186050418 MSN: joseph.lol@live.com
// @description    Script para modificar o titulo das paginas do orkut
// @include        *orkut.com*/CommMsgs*
// ==/UserScript==

var insere = function()
	{
		var htmlentities = function() 
		{
  			 var text = document.createElement("textarea");
  			 text.innerHTML = arguments[0].
			 replace(/</g,"&lt;").replace(/>/g,"&gt;");
 			 return text.value;
		}

		window.onload = function()
			{
				document.title = htmlentities(
				document.getElementsByTagName("h1")[0].innerHTML);
			}
	}
insere = String(insere);
insere = insere.substring(13, insere.length - 2);
var script = document.createElement("script");
script.setAttribute("language","JavaScript");
script.innerHTML = insere;
document.body.appendChild(script);
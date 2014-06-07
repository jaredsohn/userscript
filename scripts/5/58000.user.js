// ==UserScript==
// @name           Break Line
// @namespace      by Joseph | uid=4629209997186050418
// @description    Script para quebrar linhas em postagens
// @include        *.orkut.*/*CommMsgPost*
// ==/UserScript==

var insere = function()
	{
		function quebraLinhas()
			{
				var textarea = document.getElementById("messageBody");
				if (document.body.innerHTML.match("HTML permitido para postagens."))
					textarea.value = textarea.value.replace(/\n/g,"<br />\n");
				else 
					textarea.value = textarea.value.replace(/\n/g,"\xad\n");
			};
	}
insere = String(insere);
insere = insere.substring(13,insere.length-2);
var script = document.createElement("script");
script.innerHTML = insere;
document.getElementsByTagName("head")[0].appendChild(script);

function mudaEnviar()
	{
		var tagBody = document.body;
		var stringItem = "quebraLinhas();_submitForm(this,'submit','');; return false;";
		tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'submit', ''" + 
		");; return false;",stringItem);
	};

//Inicia tudo:
mudaEnviar();
// ==UserScript==
// @name           Foto Original
// @namespace      by Joseph | uid=4629209997186050418
// @description    Script para colocar um botao de foto original ao trocar sua foto no orkut
// @include        *.orkut.*/EditSummary*
// @include        *.orkut.*/Main#EditSummary*
// ==/UserScript==

/*
+---------------------------------------------------------------------+
| 		Visite a comunidade DgoH Codes no Orkut 	      |
|		http://www.orkut.com.br/Community?cmm=3309943	      |
|		Fórum DgoH Codes: 				      |
|		http://www.dgoh.org				      |
+---------------------------------------------------------------------+
*/

var addNaPagina = function()
	{
		function pegaLarguraIMG()
			{
				var $ = document.getElementsByClassName(" offsetImage")[0];
				return [$.width,$.height];
			};
		function _()
			{
				return document.getElementsByName(arguments[0])[0];
			};
		function useOriginal()
			{
				_("apx").value = pegaLarguraIMG()[0];
				_("apy").value = pegaLarguraIMG()[1];
				_("apw").value = pegaLarguraIMG()[0];
				_("aph").value = pegaLarguraIMG()[1];
				_("apdw").value = pegaLarguraIMG()[0];
				_("apdh").value = pegaLarguraIMG()[1];
				with(document.forms[document.forms.length - 1])
					{
						action = "/EditSummary?apw=".concat(pegaLarguraIMG()[0],
						 "&aph=",pegaLarguraIMG()[1],"&apdw=", pegaLarguraIMG()[0], 
						"&apdh=",pegaLarguraIMG()[1],"&Action.cropProfilePhoto");
						submit();
					}
				location.href = "/Home";
			};
	};

addNaPagina = String(addNaPagina);
addNaPagina = addNaPagina.substring(13, addNaPagina.length - 2);
var script = document.createElement("script");
script.innerHTML = addNaPagina;
document.getElementsByTagName("head")[0].appendChild(script);

function tiraCancelar()
	{
		var $ = document.getElementsByClassName("btn")[6];
		$.setAttribute("onClick","useOriginal()");
		$.innerHTML = "Use a original!";
	};

int = setInterval(function()
	{
		if (document.getElementById("cropForm"))
		{
			tiraCancelar();
			clearInterval(int);
		}
	}, 1000);

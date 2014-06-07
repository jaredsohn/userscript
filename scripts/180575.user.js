// ==UserScript==
// @name        liberaInput
// @namespace   deletaElementoDisabledDosImputs
// @include     https://www3.comprasnet.gov.br/SICAFWeb/private/pages/consultas/fornecedor/pessoaJuridica/frm_consultarFornecedorCadastroPJ.jsf
// @version     1
// @grant       none
// ==/UserScript==

var input = document.getElementsByTagName("input");
	
	for (var cont=0; cont<=input.length; cont++)
	{
	   input[cont].removeAttribute("disabled");
	   input[cont].removeAttribute("readonly");	  
       
	}
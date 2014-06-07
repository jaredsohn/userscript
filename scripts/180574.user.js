// ==UserScript==
// @name        pegarInformacoes
// @namespace   pega informaçoes do sicaf
// @include     https://www3.comprasnet.gov.br/SICAFWeb/private/pages/credenciamento/frm_consultarCadastroFornecedorPesquisar.jsf

// @version     1
// ==/UserScript==

      var body = document.getElementById("bodyPage");
        var cnpj = document.getElementById("formPrincipal:subFormDemaisCampos:cnpjDisplay");
        var razaoSocial = document.getElementById("formPrincipal:subFormDemaisCampos:razaoSocial");
        var tel1 = "("+document.getElementById("formPrincipal:subFormDemaisCampos:ddd").value+") "+document.getElementById("formPrincipal:subFormDemaisCampos:telefone").value;
        var tel2 = "("+document.getElementById("formPrincipal:subFormDemaisCampos:ddd2").value+") "+document.getElementById("formPrincipal:subFormDemaisCampos:telefone2").value;
        var email = document.getElementById("formPrincipal:subFormDemaisCampos:email");



(function() {
	
    var box = document.createElement("div");    
    var table = document.createElement("table");    
        table.style = "border:1px solid #000000;";
        novaLinha(table,"CNPJ",cnpj.value);
        novaLinha(table,"Razão Social",razaoSocial.value);
        novaLinha(table,"E-Mail",email.value);
        
        novaLinha(table,"Telefone",tel1);
        novaLinha(table,"Telefone",tel2);
        
        
        
        box.appendChild(table);        
    
        box.style = "position:absolute; top:20px; left:30px; background-color:#DCDCDC; width:350px;height:300px;";
    body.appendChild(box);
	
	//document.getElementById("formPrincipal:subFormDemaisCampos:descCNAEPrimario").removeAttribute("disabled");
   var input = document.getElementsByTagName("input");
	
	for (var cont=0; cont<=input.length; cont++)
	{
	   input[cont].removeAttribute("disabled");
	   input[cont].removeAttribute("readonly");
	  
       
	}   
    return 0;
	})();

function novaLinha (table, nome, valor)
{
    var tr1 = document.createElement("tr");
        
        var td1 = document.createElement("td");
        td1.style = "border:1px solid #000000;";
            td1.innerHTML = nome;
            tr1.appendChild(td1);
        var td2 = document.createElement("td");
        td2.style = "border:1px solid #000000;";
            td2.innerHTML = valor;
            tr1.appendChild(td2);
    table.appendChild(tr1); 

}


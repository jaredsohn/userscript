// ==UserScript==
// @name        AlteraNameserversRegistroBR
// @author		Presciliano dos Santos Neto
// @namespace   http://www.educacional.com.br
// @description Altera automaticamente os nameservers de dominios no registro.br
// @include     https://*registro.br/cgi-bin/nicbr/tktstatus*
// @include     https://*registro.br/cgi-bin/nicbr/cadmmng*
// @version     1.0
// ==/UserScript==

//Instrucoes de uso
//1. Instale o add-on GreaseMonkey no Firefox
//2. Altere a lista de dominios e respectivos nameservers, no formato 'dominio;ns1;ns2;ns3;ns4'
//3. [opcional] Crie uma conta em beta.registro.br para testes antes de aplicar alterações em produção
//4. [opcional] Para solicitação de confirmação para as alterações, edite o script conforme instruções ao final
//5. Faça o login em beta.registro.br ou registro.br e, na lista de domínios, clique sobre o domínio
//6. [opcional] Utilize o script AbrePaginasRegistroBR.user.js para automatizar o passo acima

window.onload=function() {
  if(window.name.indexOf("janela")>=0) {
    var dominios = new Array();
    //Lista de dominios com os nameservers no formato 'dominio;ns1;ns2;ns3;ns4'
    dominios.push('dominio1.com.br;ns1.dns1.com.br;ns2.dns1.com.br;ns3.dns1.com.br;ns3.dns1.com.br'.split(';'))
    dominios.push('dominio2.com.br;ns1.dns2.com.br;ns2.dns2.com.br;ns3.dns2.com.br;ns3.dns2.com.br'.split(';'))
    dominios.push('dominio3.com.br;ns1.dns3.com.br;ns2.dns3.com.br;ns3.dns3.com.br;ns3.dns3.com.br'.split(';'))
    var old=new Array();
    //Grava os valores atuais e expande os campos de servidores DNS para 4
    for (i=0;i<4;i++) {
      old[i]=document.getElementById('host'+(i+1)).value;
      document.getElementById('dns'+(i+1)).style.display="table-row";
    }
    document.getElementById('dns5').style.display="none";
    document.getElementById('dns6').style.display="none";
    document.getElementById('dsSection').style.display="none";
    // Busca o dominio na relacao e se existir, troca os nameservers
    for(i=0;i<dominios.length;i++) {
      if(document.getElementsByClassName('subtitulocgi').item(0).innerHTML==dominios[i][0]) {
	    for(j=1;j<5;j++) document.getElementById('host'+j).value=dominios[i][j];
	    //Para solicitar confirmacao antes de salvar, comente a linha abaixo (setTimeout) e descomente as
		// demais, se nao confirmado retorna os valores anteriores
		setTimeout(function(){document.getElementById('domainForm').submit()},Math.random()*30000+5000);
        //  if(confirm(dominios[i][0]+'\nNameservers preenchidos automaticamente. Salvar registro ?\n\nNameservers antigos:\n'+old[0]+'\n'+old[1]+'\n'+old[2]+'\n'+old[3])) {
		//document.getElementById('domainForm').submit();
        //  }
        //  else
        //  {
        //    for (i=0;i<4;i++) document.getElementById('host'+(i+1)).value=old[i];
        //  }	  
	  }
    }
  }
}
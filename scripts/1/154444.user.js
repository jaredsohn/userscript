// ==UserScript==
// @name        AbrePaginasRegistroBR
// @author		Presciliano dos Santos Neto
// @namespace   http://www.educacional.com.br
// @description Complemento ao script AlteraNameServersRegistroBR.user.js, para abrir automaticamente as páginas de configuração de domínios
// @include     https://*registro.br/cgi-bin/nicbr/domng*
// @version     1.0
// ==/UserScript==

//Instrucoes de uso
//1. Instale o add-on GreaseMonkey no Firefox
//2. Instale o script AlteraNameServersRegistroBR.user.js
//3. [opcional] Crie uma conta em beta.registro.br para testes antes de aplicar alterações em produção
//5. Faça o login em beta.registro.br ou registro.br
//6. Inclua o site *.registro.br na lista de desbloqueio de popups
//7. Se houver paginação na lista de domínios com contato administrativo ou técnico, será solicitada uma confirmação para abertura de uma
//   nova janela para cada página, dê um intervalo de 5 minutos entre cada confirmação

window.onload=function() {

  if(window.name.indexOf("janela")<0) {

    var a=document.getElementsByTagName("a");
    
	//Verifica se a pagina eh a principal ou de paginacao
	//Se for pagina principal abre todos os links para dominios e as paginas secundárias
    if(document.location.href.indexOf("#")==-1) {
      for(i=0;i<a.length;i++) {
        if(a[i].href.indexOf("cgi-bin/nicbr/cadmmng?stkey=")>0||a[i].href.indexOf("cgi-bin/nicbr/ctecmng?stkey=")>0) {
          var url=a[i].href;
  	      document.getElementById("conteudo").innerHTML+='<div><iframe name="janela" src="'+url+'"width="1140" height="100"></iframe></div>';
   	    }
      }
	  for(i=0;i<a.length;i++) {
        if(a[i].href.indexOf("cgi-bin/nicbr/domng?stkey=")>0 && a[i].href.indexOf("#")>0) {
          if(confirm("Abrir página: "+a[i].href)) window.open(a[i].href,"pagina"+i);		
        }
      } 
    }
    else {
	  //Se tiver paginacao abre somente os com contato administrativo
	  if(document.location.href.indexOf("#pa")>0) {
        for(i=0;i<a.length;i++) {
          if(a[i].href.indexOf("cgi-bin/nicbr/cadmmng?stkey=")>0) {
  	        var url=a[i].href;
	        document.getElementById("conteudo").innerHTML+='<div><iframe name="janela" src="'+url+'"width="1140" height="100"></iframe></div>';
  	      }
        }
	  }
	  //Se tiver paginacao abre somente os com contato tecnico
      if(document.location.href.indexOf("#pt")>0) {
        for(i=0;i<a.length;i++) {
          if(a[i].href.indexOf("cgi-bin/nicbr/ctecmng?stkey=")>0) {
  	        var url=a[i].href;
		    document.getElementById("conteudo").innerHTML+='<div><iframe name="janela" src="'+url+'"width="1140" height="100"></iframe></div>';
  	      }
        }
	  }
    }
  }
}
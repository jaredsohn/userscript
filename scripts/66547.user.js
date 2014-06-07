// ==UserScript==
// @name           exibir forum de comunidades
// @namespace      
// @description    exibe o link do forum das comunidades;
// @include        http://www.orkut.com.br/*Home*
// @include        http://www.orkut.com.br/*Profile*
// @include        http://www.orkut.com.br/*Communit*
// ==/UserScript==

// Variáveis 

var fc_preto         = "#000000" ;
var fc_azul          = "#0000ff" ;
var fc_azulmarinho   = "#0000AA" ;
var fc_verdeescuro   = "#007000" ;
var fc_vermelho      = "#EE4444" ;
var fc_roxoescuro    = "#9900dd" ;
var fc_pink          = "#FF00FF" ;
var fc_marrom        = "#A34567" ;
var fc_cinza         = "#606060" ;
var fc_azul_links    = "#0047BE" ;

//---------------------------------------------------


//------  config. ----------


	fc_cor = fc_preto  ;
	

//------ Config -------------
	  
	 


function linksForum(){
var i=document.getElementsByTagName('a');

 for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    if(linkdata){
	    var linkparts = linkdata.split("?");
	    if( linkdata.indexOf("Community") > -1 && ! i[j].innerHTML.match("<img")) {
		var sp = document.createElement("span");
		sp.setAttribute("style", "#20B2AA");
		sp.innerHTML = " &#91;" ;
	
		var templink = document.createElement("a");
	
		  templink.href="http://www.orkut.com.br/CommTopics?"+linkparts[1];
		  templink.style.color = fc_cor;
		  templink.style.textDecoration="none";
		  templink.innerHTML="Forum";
		  templink.title = "Tópicos do Fórum dessa comunidade"
		  sp.appendChild( templink);
		  
	
	
		  sp.innerHTML += "]";
		
	
	        i[j].parentNode.insertBefore( sp ,i[j].nextSibling);
	
	        }
	 }
  }

}

linksForum();

//---------- Changelog ------------------
/*
 *
 */

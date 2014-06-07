// ==UserScript==
// @name	     Transp Images
// @namespace	greasemonkey.sitesbr.net
// @description    Deixa as imagens semi-transparentes, ficando normais ao passar o mouse
// @include	  *cmm=36907180*
// ==/UserScript==

/*
  Autor: Sergio Abreu
  Criado em: 05/04/2008 18:00h   versão 1.0 		  
		  
 


 * --------- CONFIGURAÇÃO PESSOAL: Nível de Transparência
 * Informe um valor de 0.1 a 0.99 na frente do igual
 *
 */
 
  var nivel_transp = 0.10;		  
   

 // --------- FIM DA CONFIGURAÇÃO 


  

	var ims = document.images;
	
		for( var i=0; i < ims.length; i++){
	     	  ims[i].style.opacity = nivel_transp;
		}

	
var scr = function(){

   var quant_transp = nivel_transp;	  

	function doTranspImages(){
	
	var ims = document.images;
	
		for( var i=0; i < ims.length; i++){
	     	  ims[i].style.opacity = quant_transp;
		  ims[i].addEventListener("mouseover", function(){ this.style.opacity = 1.0;}, false);
		  ims[i].addEventListener("mouseout", function(){ this.style.opacity = quant_transp;}, false);
		}
	}
	
	 doTranspImages();
	
}
     
 var sc = document.createElement("script");
 scr = "" + scr;
 scr = scr.replace(/nivel_transp/gi, ""+ nivel_transp);
 
 
 
 sc.innerHTML = scr.substring(13, scr.length -1);
 
 document.getElementsByTagName('head')[0].appendChild(sc);
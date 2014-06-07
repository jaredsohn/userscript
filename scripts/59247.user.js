// ==UserScript==
// @name           maniworlds
// @namespace      uglyface
// @include        http://www.erepublik.com/*
// @include 	    http://www.erepublik.com/en*
// @include 	    http://www.erepublik.com/es*
// @include 	    http://www.erepublik.com/de*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function salvaPagina( slot, url, contenido) {
	 GM_setValue( slot + "_url", url )
	 GM_setValue( slot + "_content", contenido )
}


function getPagina( slot ){

	var obj = new Object();
	
	obj.url = GM_getValue(slot + "_url",false);
	obj.content = GM_getValue(slot + "_content",false);

	return obj;
}


var numPaginas = 10;

var indiceUsable = GM_getValue( "indice",0);


$(document).ready(function() {

	//alert(indiceUsable);

	var codigo = $("#content").html();
  
	  
  
	
	for(var t=indiceUsable-1;t>0;t--){
		if (t<0) continue;
		
		var oldpage = getPagina(t);
		if (oldpage){
			try{	
				$("#content").append( "<hr style='clear:both' />  <h1>"+oldpage.url+"</h1>" );			
				$("#content").append( oldpage.content );			
			}catch(e){};
		}								
	}

   	for(var t=numPaginas;t>indiceUsable;t--){	
		
		var oldpage = getPagina(t);
		if (oldpage){
			try{	
				$("#content").append( "<hr style='clear:both' />  <h1>"+oldpage.url+"</h1>" );			
				$("#content").append( oldpage.content );			
			}catch(e){};
		}								
	}
	
	salvaPagina( indiceUsable, document.location.href, codigo);
   
	indiceUsable++;	
	if (indiceUsable>numPaginas)
		indiceUsable = 0;			

	GM_setValue( "indice", indiceUsable);
	

	
});

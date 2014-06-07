// ==UserScript==
// @name           Unlock Sexy Clube Photos
// @namespace      http://userscripts.org
// @description    Allows viewing photos of www.sexyclube.com.br. The photo s of girls opens!!
// @include        *http://sexyclube.ig.com.br/*
// ==/UserScript==

/*
* Autor: Planet - Brasil
*
* Criação: 20/01/2008
* Updated: 20/01/2008 14:11h  
**/

function SiteAntigo(){
	var l=window.frames['menuFotos'].document.links;
	for(var i=0; i<l.length;i++)
		if(l[i].href.indexOf('/ensaios2/fotos/fotos.asp')!=-1)
		{
			l[i].href = l[i].href.replace("/ensaios2/fotos/fotos.asp","/ensaios/fotos/foto.asp");
			l[i].target='FotosPrincipal';
		}
}
	
function SiteNovo(){ //Hospedado na IG
	var links = document.links;	

	for(var i=0; i<links.length;i++){
		var link = links[i];		
		
		if ((link.childNodes.length > 0)
			 && (link.href.indexOf('p=23') > -1)){
			//Pegando numero da foto
			var firstpos=link.href.lastIndexOf('=')+1;
			var lastpos=link.href.length;
			var val =  0 + link.href.substring(firstpos,lastpos);
			link.href = "javascript:changeImage(" + val + ");";
		}
		
	}
	
}
SiteNovo();
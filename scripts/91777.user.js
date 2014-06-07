// ==UserScript==
// @name				Baixa Resolução Vídeos Olhar Digital
// @author			Taf
// @version			
// @description	Deixa todos os vídeos na menor resolução no site do Olhar Digital 
// @include		*olhardigital.uol.com.br/*
// ==/UserScript==

var eR=new RegExp(/central_de_videos.*[0-9]+/);
var links=document.getElementsByTagName('a');
for(var cont=0;cont<links.length;cont++)
{
	if(eR.test(links[cont].href))
	{
		links[cont].href+='/baixa';
	}
}

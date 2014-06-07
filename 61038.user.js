// ==UserScript==
// @name	reality kings desbloquear imagens [reality kings unlock picture]
// @description	Visualizando todas as imagens de rk.com | Pause o carregamento quando aparecer os link das fotos ou esperar a pagina carregar [Viewing all images rk.com | Pause loading when you see the link for the photos or wait for page load]
// @include	http://www.rk.com/*
// ==/UserScript==

function main(){var divs=document.getElementsByTagName('div');
for(var cont=0;;++cont){if(divs[cont].className!='item')continue;
url=divs[cont].childNodes[1].href.split(/ture_[0-9]{1,2}/);
cont+=6;for(var num=5;divs[cont].className=='item';++cont)
{url2=url[0]+'ture_'+num+++url[1];
divs[cont].childNodes[1].href=url2;}
break;}}main();
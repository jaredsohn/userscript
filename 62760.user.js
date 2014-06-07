// ==UserScript==
// @name           Poringa Hide
// @namespace      poringa
// @description    Quita el icono y el titulo a la pagina poringa
// @include        *poringa.net/*
// ==/UserScript==

document.title="Taringa! - Inteligencia Colectiva";

var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'http://i.t.net.ar/images/favicon.ico');
head.appendChild(icon);

var css=document.createElement('link');
css.setAttribute('type', 'text/css');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'http://i.t.net.ar/images/css/beta_estilos2.css?3.2');
head.appendChild(css);

var allHTMLTags=document.getElementsByTagName('*');
for (i=0; i<allHTMLTags.length; i++) 
{
    if (allHTMLTags[i].className=='categoriaPost poringueras')
    {
    allHTMLTags[i].setAttribute('class','categoriaPost taringa');;
    }
    if(allHTMLTags[i].getAttribute("href")=="http://o1.t26.net/images/css/beta_estilos-p.css?1.4")
	head.removeChild(allHTMLTags[i]);//.setAttribute("href","");	
}



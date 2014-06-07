// ==UserScript==
// @name           FUMATINGA Elgranrojo
// @namespace      Fumatinga
// @description    Cambia el estilo a mi gusto
// @version        Laqueanduvomejor v.1
// @autor          Elgranrojo
// @contacto       roeyi18@live.com.ar
// @include        *taringa.net/comunidades/cannabis*
// ==/UserScript==

document.title="Fumatinga!";

var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href','http://elgranrojo.comli.com/favicongiffumatingaElgranrojo.gif');
head.appendChild(icon);

var css=document.createElement('link');
css.setAttribute('type', 'text/css');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'http://elgranrojo.comli.com/CssfumatingaElgranrojo.css');
head.appendChild(css);

var allHTMLTags=document.getElementsByTagName('*');
for (i=0; i<allHTMLTags.length; i++) 
{
    if (allHTMLTags[i].className=='mBtn btnCancel')
    {
    allHTMLTags[i].setAttribute('value','Si, soy de la DEA');;
    }
}

var allHTMLTags=document.getElementsByTagName('*');
for (i=0; i<allHTMLTags.length; i++) 
{
    if (allHTMLTags[i].className=='dialogBox')
    {
    allHTMLTags[i].setAttribute('src','http://elgranrojo.comli.com/dialog.gif');;
    }
}
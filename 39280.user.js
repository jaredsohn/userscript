// ==UserScript==
// @name           Último post
// @namespace      http://userscripts.org/scripts/show/39280
// @description    Link para ir direto ao último post do tópico
// @include        http://*.orkut.*CommTopics.aspx*
// @include        http://*.orkut.*Community.aspx*
// ==/UserScript==


// author         Link <http://www.orkut.com.br/Profile.aspx?uid=15998896938353128878>

// modificador1    Sergio Abreu <http://www.orkut.com.br/Profile.aspx?uid=9651141801320759919>
// + Corrigido erro de Caps (estava nextsibling, mudei para nextSibling para funcionar)
// + Simplificado o estilo, modificada a cor.

// modificador2     diegoscfc
// 1. O script só tava funcionando em metade dos tópicos. Corrigido. 2. Mudei o nome do script porque ele não vai pro último post, mas sim pra última página. Para ir pro último post, teria que adicionar #footer no link. Tentei, mas deu bug. [by DIEGOSCFC]

// modificador3     Leandro Costa
// + Acrescentado "#footer" em ambos "&na=2" e reescrito o nome do script para "Último post".
// + Retirado a cor, modificado o nome do link de "[&gt;]" para "»»".


u=0;
d=document;
l=d.links;
ll=l.length;
var a=0;
for(u=0;u<500;u++){
if(l[u].href.indexOf('&tid=')>-1 && l[u].href!=a){
var main=d.getElementsByTagName('a').item(u);
var newE=d.createElement("y");
newE.innerHTML=" <a style=\"color: none;\" href=\""+l[u].href+"&na=2#footer\"><small>»»</small></a>"
newE.title="Último Post";
main.parentNode.insertBefore(newE,main.nextSibling);
a=l[u].href+"&na=2#footer"
}
}




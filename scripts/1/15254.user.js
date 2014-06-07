// ==UserScript==
// @name           Last Post For Orkut
// @namespace      http://www.link.1br.net/
// @description    Link to go to the last post of topics of orkut
// @include        http://www.orkut.com/CommTopics.aspx*
// @include        http://www.orkut.com/Community.aspx*
// ==/UserScript==


// author         Link <http://www.orkut.com/Profile.aspx?uid=15998896938353128878>
// modificador    Rodrigo Wilasco <http://www.orkut.com/Profile.aspx?uid=2446600014886086985>
// + Corrigido erro de Caps (estava nextsibling, mudei para nextSibling para funcionar)
// + Simplificado o estilo, modificada a cor.

u=0;
d=document;
l=d.links;
ll=l.length;
var a=0;
for(u=0;u<ll;u++){
if(l[u].href.indexOf('&tid=')>-1 && l[u].href!=a){
var main=d.getElementsByTagName('a').item(u);
var newE=d.createElement("y");
newE.innerHTML=" <a style=\"color:red;text-decoration: none;\" href=\""+l[u].href+"&na=2\">[&gt;]</a>"
newE.title="Ver";
main.parentNode.insertBefore(newE,main.nextSibling);
a=l[u].href+"&na=2"
}
}



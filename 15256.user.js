// ==UserScript==
// @name           Last Post
// @namespace     Rodrigo Wilasco
// @description   Add a button next to the title of the topic in orkut
// @include        http://www.orkut.com/CommTopics.aspx*
// @include        http://www.orkut.com/Community.aspx*
// ==/UserScript==



u=0;
d=document;
l=d.links;
ll=l.length;
var a=0;
for(u=0;u<ll;u++){
if(l[u].href.indexOf('&tid=')>-1 && l[u].href!=a){
var main=d.getElementsByTagName('a').item(u);
var newE=d.createElement("y");
newE.innerHTML=" <a style=\"color:blue;text-decoration: none;\" href=\""+l[u].href+"&na=2\">Ver</a>"
newE.title="Post Recente/ By Rodrigo Wilasco";
main.parentNode.insertBefore(newE,main.nextSibling);
a=l[u].href+"&na=2"
}
}



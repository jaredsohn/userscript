// ==UserScript==
// @name           orkut - Last Post (by LeoWebmaster)
// @namespace      LeoWebmaster [ Kumail Raza ]
// @description    Add a button next to the title of the topic in orkut... go direct to last post of the topic
// @include        http://www.orkut.com/CommTopics.aspx*
// @include        http://www.orkut.com/Community.aspx*
// @maintained by  Copyright  2005-2008, LeoWebmaster.\nAll Right Reserved.\n\nSite developed and Maintained by LeoWebmaster[Kumail Raza].
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
newE.innerHTML=" <a style=\"color:blue;text-decoration: none;\" href=\""+l[u].href+"&na=2\">[end]</a>"
newE.title="Recent Post[LeoWebmaster]";
main.parentNode.insertBefore(newE,main.nextSibling);
a=l[u].href+"&na=2"
}
}
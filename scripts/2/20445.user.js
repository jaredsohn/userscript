// ==UserScript==
// @name           Last Post..
// @author         Saady ..
// @description    Link u directly to last post oF the topic =)
// @include        http://www.orkut.com/CommTopics.aspx*
// @include        http://www.orkut.com/Community.aspx*
// ==/UserScript==

u=0;
d=document;
l=d.links;
ll=l.length*2;
var a=0;
for(u=0;u<ll;u++){
if(l[u].href.indexOf('&tid=')>-1 && l[u].href!=a){
var main=d.getElementsByTagName('a').item(u);
var newE=d.createElement("y");
newE.innerHTML=" <a style=\"text-decoration: none;\" href=\""+l[u].href+"&na=2\"><font color=\"navy\" size=\"1\">[>]</font></a>"
newE.title="Last Post";
main.parentNode.insertBefore(newE,main.nextsibling);
a=l[u].href+"&na=2"
}
}
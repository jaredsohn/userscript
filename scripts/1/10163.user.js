// ==UserScript==
// @name           Simpymeta
// @namespace      http://nagarjunv.blogspot.com
// @description    Will find meta keywords and include them in the simpy this link
// @include        *
// ==/UserScript==

var metacon,x,til,loc,labels,notes;

til=document.title;
loc=window.location.href;

x = document.getElementsByTagName('meta'); 
for (var i=0;i<x.length;i++)
  { 
	metacon=x[i]
		if(metacon.name=="keywords"){
		labels=metacon.content;		}
		if(metacon.name=="description" || metacon.name=="Description"){
		notes=metacon.content;		}

}
if(!labels){labels='';}
if(!notes){notes='';}
var simpythis = document.createElement("div"); simpythis.innerHTML = '<div style="margin: 0 auto 0 auto; ' +     'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +     'font-size: small;  ' +     'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +'<a href="http://www.simpy.com/simpy/LinkAdd.do?title='+til+'&tags='+labels+'&href='+loc+'&note='+notes+'">Simpy This</a>' +     '</p></div>'; 
document.body.insertBefore(simpythis, document.body.firstChild);
// ==UserScript==
// @name           Meebo Minibar
// @description    Meebo Minibar for Opera
// @include        http://*
// @include        https://*
// @include        file:*
// @author         Neo Soctimer
// @version        1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 License
// @copyright      Meebo MiniBar
// ==/UserScript==
window.Meebo||function(d){function o(){return["<",i,' onload="var d=',g,";d.getElementsByTagName('head')[0].",
j,"(d.",h,"('script')).",k,"='//www.meebo.com/cim?iv=",b.v,"&",p,"=",d[p],"&extension=true",
d[l]?"&"+l+"="+d[l]:"",d[f]?"&"+f+"="+d[f]:"","'\"></",i,">"].join("")}var a=window;
if(!(a.location.toString().match(/^https?:\/\/www\.meebo\.com\/?(messenger)?\/?$/)||
a.location.hostname.toString().match(/\.dev\.meebo\.com$/)||a.location.hostname==
"127.0.0.1"||a.location.hostname=="localhost"||a.location.protocol!="http:"||a.top!=
a)){var b=a.Meebo=a.Meebo||function(){(b._=b._||[]).push(arguments)},e=document,
i="body",q=e[i],r;if(!q){r=arguments.callee;return setTimeout(function(){r(d)},
100)}b.$={0:+new Date};b.T=function(u){b.$[u]=new Date-b.$[0]};b.v=4;var j="appendChild",
h="createElement",k="src",l="lang",p="network",f="domain",m=e[h]("div"),v=m[j](e[h]("m")),
c=e[h]("iframe"),g="document",n,s=function(){b.T("load");b("load")};a.addEventListener?
a.addEventListener("load",s,false):a.attachEvent("onload",s);m.style.display="none";
q.appendChild(m).id="meebo";c.frameBorder="0";c.id="meebo-iframe";c.allowTransparency=
"true";v[j](c);try{c.contentWindow[g].open()}catch(w){d[f]=e[f];n="javascript:var d="+
g+".open();d.domain='"+e.domain+"';";c[k]=n+"void(0);"}try{var t=c.contentWindow[g];
t.write(o());t.close()}catch(x){c[k]=n+'d.write("'+o().replace(/"/g,'\\"')+'");d.close();'}b.T(1)}}({network:"everywhere"});
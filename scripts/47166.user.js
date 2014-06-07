// ==UserScript==
// @name IAC SSH Tunneling Link Rewriter
// @description Seeks out links to internal IAC servers, and will rewrite them to point to the local tunnels
// @include *
// ==/UserScript==
//Based on SourceForge Download Link Rewriter (http://userscripts.org/scripts/show/1517)

(function()
{
  for(var i=0;i<document.links.length;i++)
  {
    var elem = document.links[i];
    if(elem.href.match(/^http:\/\/marta(.*)/i)) {elem.href="http://localhost:8000"+RegExp.$1;}
    if(elem.href.match(/^http:\/\/goya(.*)/i)) {elem.href="http://localhost:8002"+RegExp.$1;}
    if(elem.href.match(/^http:\/\/pccau(.*)/i)) {elem.href="http://localhost:8003"+RegExp.$1;}
    if(elem.href.match(/^http:\/\/afrodita.ll.iac.es:8080(.*)/i)) {elem.href="http://localhost:8004"+RegExp.$1;}
    if(elem.href.match(/^http:\/\/beoiac(.*)/i)) {elem.href="http://localhost:8006"+RegExp.$1;}
  }
})();

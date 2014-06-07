// ==UserScript==
// @name           my loos
// @namespace      http://userscripts.org/scripts/show/10087
// @description    Changes links to the egloos site into "my valley" links
// @include        http://*.egloos.com/*
// ==/UserScript==

(function()
{
  for(var i=0;i<document.links.length;i++)
  {
    var elem = document.links[i];
    var myregexp1=/^http:\/\/www.egloos.com$/i;
    var myregexp2=/^http:\/\/www.egloos.com\/$/i;
    
    if(elem.href.match(myregexp1)||elem.href.match(myregexp2))
	{
    elem.href="http://valley.egloos.com/my";
	}
  }
})();
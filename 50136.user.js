// ==UserScript==
// @name           Direct links on Sourceforge download pages
// @namespace      http://www.amdmi3.ru/
// @copyright      2009-2010, Dmitry Marakasov <amdmi3@amdmi3.ru>
// @license        BSD
// @include        http://sourceforge.net/projects/*
// @include        http://www.sourceforge.net/projects/*
// @include        https://sourceforge.net/projects/*
// @include        https://www.sourceforge.net/projects/*
// ==/UserScript==

(function()
{
  // !!! Change this to your favorite mirror !!!
  var mirror = "kent";

  for(var i = 0; i < document.links.length; i++) {
    var elem = document.links[i];

    if (elem.href.match(/\/projects\/([^\/]+)\/files\/(.+)\/download/i)) {
      elem.href="http://"+mirror+".dl.sourceforge.net/project/"+RegExp.$1+"/"+RegExp.$2;
    }
  }
})();

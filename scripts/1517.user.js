// ==UserScript==
// @name SourceForge Download Link Rewriter
// @description Seeks out SourceForge download links in plain, non-redirected URLs and rewrites them to point to the actual download. Will not mess with SF internal links.
// @include *
// @exclude http://www.sourceforge.net/*
// @exclude http://www.sf.net/*
// @exclude http://sourceforge.net/*
// @exclude http://sf.net/*
// ==/UserScript==
//Based on Hide Google Redirects 1.0 by David James <james@cs.toronto.edu> http://www.cs.toronto.edu/~james

(function()
{
  for(var i=0;i<document.links.length;i++)
  {
    var elem = document.links[i];
    var myregexp=/^http:\/\/prdownloads\.s(ource)f(orge)\.net\/(.*?)\/(.*?)\?download$/i;
    if(elem.href.match(myregexp))
	{
	  elem.href="http://dl.s"+RegExp.$1+"f"+RegExp.$2+".net/sourceforge/"+RegExp.$3+"/"+RegExp.$4;
	}
  }
})();
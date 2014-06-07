// ==UserScript==
// @name Haloscan Link Rewriter (digby)
// @description Rewrites Haloscan links as proper URLs and not popups
// @include http://digbysblog.blogspot.com/*
// ==/UserScript==
//Based on Hide Google Redirects 1.0 by David James <james@cs.toronto.edu> http://www.cs.toronto.edu/~james
//and TorrentSpy Link Rewriter 1.0 by Chris Cunningham <thumperward@hotmail.com> http://blondechris.com

(function()
{
  for(var i=0;i<document.links.length;i++)
  {
    var elem = document.links[i];

     var myregexp=/^javascript:HaloScan\(\'([0-9]*)\'\)\;$/i;
    
    if(elem.href.match(myregexp))
	{
	  //elem.href="http://dl.s"+RegExp.$1+"f"+RegExp.$2+".net/sourceforge/"+RegExp.$3+"/"+RegExp.$4;
    
    //elem.href="http://"+RegExp.$1+"torrentspy.com/download.asp?id="+RegExp.$3;
    
    
    elem.href="http://www.haloscan.com/comments/digby/"+RegExp.$1;
	}
  }
})();

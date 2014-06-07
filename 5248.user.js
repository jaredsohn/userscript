// ==UserScript==
// @name TorrentSpy Link Rewriter
// @description Rewrites TorrentSpy links to point to the download instead of to the details page.
// @include http://www.torrentspy.com/*
// @include http://torrentspy.com/*
// ==/UserScript==
//Based on Hide Google Redirects 1.0 by David James <james@cs.toronto.edu> http://www.cs.toronto.edu/~james

(function()
{
  for(var i=0;i<document.links.length;i++)
  {
    var elem = document.links[i];
    // var myregexp=/^http:\/\/prdownloads\.s(ource)f(orge)\.net\/(.*?)\/(.*?)\?download$/i;
    
    //var myregexp=/^http:\/\/(.*?)torrentspy.com(.*?)\?mode=torrentdetails&id=([0-9]*)(.*?)$/i;
    var myregexp=/^http:\/\/(.*?)torrentspy.com(.*?)\/([0-9]*)\/(.*?)$/i;
    
    if(elem.href.match(myregexp))
	{
	  //elem.href="http://dl.s"+RegExp.$1+"f"+RegExp.$2+".net/sourceforge/"+RegExp.$3+"/"+RegExp.$4;
    
    elem.href="http://"+RegExp.$1+"torrentspy.com/download.asp?id="+RegExp.$3;
	}
  }
})();



// what have we learned?
// regexps start with ^ and end with $
// they can also have an end switch. /i means case-insensitive
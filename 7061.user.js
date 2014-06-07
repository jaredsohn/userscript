// ==UserScript==
// @name  NYT Registration Free Links
// @namespace http://www.bobpaul.org/userScripts/
// @description Rewrites New York Times links to point to blogspace's link generator to make it Registration free. The script now clicks the generated link for you ;)
// @include *
// @exclude *.google.com/*
// ==/UserScript==




////To also have ad free pages, set the "NY Times: Link to Print pages:" script to
////include only "http://nytimes.blogspace.com/genlink?*" instead of "*"

//8-01-05 Fixed URLs that don't include the "www."


//Major Update: 6-5-05
// I found the "open" method. This allows the script to click the link on blogspace.com
// This makes the back button a little annoying, however. I'll see what I can do ;)

//Major Update: 6-17-05
// Using location.replace() instead of open to click the link, as this doesn't create a new history object
// and you can hit back from the NYTimes article without noticing blogspace...

(function() {
  var xpath = "//a[starts-with(@href,'http://www.nytimes.com/')]";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;

  if (document.location.href.indexOf("blogspace") == -1)
  {
    for (i = 0; link = res.snapshotItem(i); i++)
    {
      link.href = "http://nytimes.blogspace.com/genlink?q=" + link.href;
    }

    xpath = "//a[starts-with(@href,'http://nytimes.com/')]";
    res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (i = 0; link = res.snapshotItem(i); i++)
        {
          link.href = "http://nytimes.blogspace.com/genlink?q=http://www." + link.href.substring(7);
    }

  }
  else
  {
    link = res.snapshotItem(0);

    //Quick and Dirty fix since I was getting an extra click after it got to the nytimes page...
    if (link.href != "http://www.nytimes.com/ref/membercenter/faq/linkingqa16.html")
    {
      location.replace( link.href );
    }
    /*else
    {
      window.alert("Prevented from clicking: " + link.href + " again. ")
    }*/
  }

})();



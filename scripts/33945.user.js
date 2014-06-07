// ==UserScript==
// @name FilterOutDuplicate
// @description Try to filter out all the duplicate rss items while user scrolling
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==

/**
 * 20080918
 * This script are used to hide the duplicate RSS items in Google Reader.
 * When you subscribe to some RSS feed, such as http://news.google.cn/nwshp?tab=wn&ned=ccn&topic=es&output=rss, there are many duplicate items.
 * Do not want to see them again and again? Here is the way to hide them.
 **/

var linkset = new Array;
var titleset = new Array;

function $x(q, c) {
  var doc = c ? (c.contentDocument || c.ownerDocument || c) : document;
  c = (c && c.contentDocument) ? c.contentDocument : c; // if c is an iframe, set c to its contentDoc element
  return doc.evaluate(q, (c || doc), null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function catalog()
{
  var myset = $x("//h2[@class='entry-title']/a[@class='entry-title-link']");

  if (myset.snapshotLength > titleset.length)
  {
    for (var i = titleset.length; i < myset.snapshotLength; i++)
    {
    	single = myset.snapshotItem(i);

      if (single.childNodes[0] && single.childNodes[0].nodeValue)
      {
      	var a_node = single.childNodes[0].nodeValue;
      	if (a_node.indexOf(" - ") != -1)
      	{
      		var a_title = a_node.substring(0, a_node.indexOf(" - "));
      	}
        else
        {
        	var a_title = a_node;
        }

      	if (titleset.toString().indexOf(a_title) != -1)
      	{
      		titleset[i] = "";
      		var a_hideset = $x("//div[@id='entries']/div[contains(@class,'entry')]");
      		var a_hideitem = a_hideset.snapshotItem(i);
      		a_hideitem.style.display = "none";
      		continue;
      	}
        else
        {
      	  titleset[i] = a_title;
      	}
      }
    }
  }
}

if (document.getElementById("viewer-box-table"))
{
	document.getElementById("viewer-box-table").addEventListener("load", catalog, true);
  document.getElementById("viewer-box-table").addEventListener("scroll", catalog, true);
}

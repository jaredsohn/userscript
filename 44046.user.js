// ==UserScript==
// @author         0nce
// @version        1.0
// @name           Flickr StartPage Ad Remover
// @namespace      http://userscripts.org/users/83254
// @include        http://www.flickr.com/
// @description    Removes the right column on your Flickr start page and expands the main column
// ==/UserScript==

var allHTMLTags = new Array();

function changeElementByClass(theClass, theAction, theValue)
{
  var allHTMLTags=document.getElementsByTagName("*");

  for (i=0; i<allHTMLTags.length; i++)
  {
    if (allHTMLTags[i].className==theClass)
    {
      if(theAction=="hide")
      { allHTMLTags[i].style.display='none'; }
      if(theAction=="enlarge")
      { allHTMLTags[i].style.width=theValue+'px'; }
    }
  }
}

changeElementByClass("tt-col2", "hide", 0);
changeElementByClass("tt-col1", "enlarge", 800);
changeElementByClass("act-item apply-hover f-", "enlarge", 600);
changeElementByClass("act-content", "enlarge", 550);

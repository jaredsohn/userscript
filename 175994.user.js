// ==UserScript==
// @name        ANTI-WIKIA 1 (w/ archive.org)
// @namespace   kokorosenshiForNow
// @description Changes Wikia links on a page to archive.org links
// @version     1.0
// ==/UserScript==

document.addEventListener('DOMNodeInserted', replaceLinks, false); //Everytime the page changes, it will use the function 'replaceLinks()'

function replaceLinks() //This will find Wikia links and 'Archive.org'-ify them
{
var Links = document.getElementsByTagName("a"); //'Links' is now an array of all link elements on the page
  for (var i = 0; i < Links.length; i++) //for all the items in the array ...
  { 
    if (Links[i].hasAttribute("href")) //and if it has such an 'href' attribute to later change ...
    {
    var hrefValue = Links[i].getAttribute("href"); //Let 'hrefValue' be what 'href' contains
      if (hrefValue.contains("wikia.")) //if it has this string in it, it's probably a link to a wikia page, so...
      {
        if (hrefValue.contains("web.archive.org/web/") == false) //if it has this string in it, it has already been 'Archive.org'-ified
        {
        //alert(hrefValue) //CHECK THE LINKS THAT ARE BEING CHANGED
        Links[i].setAttribute("href", "http://web.archive.org/web/" + hrefValue)
        //alert(hrefValue)//CHECK THE LINKS AFTER CHANGE
        }
      }
    }
  }
}//closefunction
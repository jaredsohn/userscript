// ==UserScript==
// @name           Search YouTube Anywhere
// @author         dstjacques
// @namespace      http://userscripts.org/users/dstjacques
// @description    Search YouTube for the keywords you highlight on any page and have top results displayed in new tab.
// @include        *
// @run-at         document-end
// ==/UserScript==

function getSelection()
{
   var text = "";
   if (window.getSelection)
   {
      text = window.getSelection();
   }
   else if (document.getSelection)
   {
      text = document.getSelection();
   }
   else return;

   return text;
}

function youtubeResults()
{
   var keywords = new String(getSelection());
   if(keywords == "")
   {
      return;
   }

   var spaces = new RegExp(' ','g');
   keywords = keywords.replace(spaces, "+");
   
   var searchResultsURL = "https://gdata.youtube.com/feeds/api/videos?orderby=relevance&max-results=15&v=2&q=" + keywords;

   var searchResultsWindow = window.open(searchResultsURL,"_newtab");
}

document.addEventListener ("mouseup", function () { youtubeResults() }, false);

// ==UserScript==
// @name           Highlight items in google reader about to expire
// @namespace      http://userscripts.org/
// @description    Items that are close to 1 month old get their title in red
// @include        https://www.google.com/reader/*
// ==/UserScript==


//entries = document.getElementById("activity-indicator");
//entries.addEventListener ("DOMAttrModified", highlightOld, true);
// DOMAttrModified is not supported in WebKit: https://bugs.webkit.org/show_bug.cgi?id=8191
// Trying DOMNodeInserted instead
entries = document.getElementById("entries");
entries.addEventListener ("DOMNodeInserted", highlightOld, true);

function highlightOld()
{
  entries = document.getElementById("entries").children;

  for(i in entries)
  {
    if(entries[i].className.search("entry") != -1)
    {
      ds = entries[i].children[0].children[1].textContent;
      d = new Date(ds);
      t = new Date();
      if( (t-d)/1000/60/60/24 > 25 )
      {
        entries[i].children[0].children[2].children[2].children[0].style.color = "red";
      }
    }
  }
}
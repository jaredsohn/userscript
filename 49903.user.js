// ==UserScript==
// @name           OpenSubtitles - English default search/redirect
// @namespace      http://userscripts.org/users/ym
// @description    Automatically selects english as default for search, or redirects to only english results from ALL results
// @include        http://www.opensubtitles.org/*
// @date           2009-23-05
// @version        1.0
// @GM_version     0.6.7
// ==/UserScript==

document.getElementById('SubLanguageID').value = "eng";


fullurl = window.location.href.split("/"); 
var loc = window.location.href.replace("sublanguageid-all","sublanguageid-eng");
for(i=0;i<=fullurl.length;i++)
{
  if(fullurl[i]=="sublanguageid-all")
  {
      window.location.href = loc;
  }
}

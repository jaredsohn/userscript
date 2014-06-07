// ==UserScript==
// @name           Outline external do-follow links
// @author         Federico Infanti
// @version        2011-02-03
// @description    Highlighs external do-follow links on a webpage
// @namespace      http://userscripts.org/scripts/show/96020
// @include        *
// ==/UserScript==

function OutlineExternalDoFollowLinks()
{
  for( var i = 0; i < document.getElementsByTagName("a").length; i++)
  {
    if(!document.getElementsByTagName("a")[i].href.match(top.location.host) && document.getElementsByTagName("a")[i].rel != "nofollow")
    {
      document.getElementsByTagName("a")[i].style.border = "1px solid #FF0000";
    }
  }
}

OutlineExternalDoFollowLinks();
// ==UserScript==
// @name          HighlightExternalLinks
// @namespace     http://www.mbdealer.de/seo/seo-tools/greasemonkey-benutzerskript-highlight-external-links/
// @author        MBDealer (Rafael Prukop) <info@mbdealer.de>
// @website       http://www.mbdealer.de/
// @include       *
// @description   SEO-Tool - Highlight External Links 
// @version       1.0
// ==/UserScript==

function HighlightExternalLinks()
{  
  for(var i = 0; i < document.getElementsByTagName("a").length; i++)
  {
    if(!document.getElementsByTagName("a")[i].href.match(top.location.host) && document.getElementsByTagName("a")[i].rel == "nofollow")
    {
      document.getElementsByTagName("a")[i].style.color = "#000000";
      document.getElementsByTagName("a")[i].style.backgroundColor = "#00FF00";
      document.getElementsByTagName("a")[i].style.border = "1px solid #FF0000";
      document.getElementsByTagName("a")[i].style.padding = "1px";
    }  

    if(!document.getElementsByTagName("a")[i].href.match(top.location.host) && document.getElementsByTagName("a")[i].rel != "nofollow")
    {
      document.getElementsByTagName("a")[i].style.color = "#000000";
      document.getElementsByTagName("a")[i].style.backgroundColor = "#00FF00";
      document.getElementsByTagName("a")[i].style.border = "1px solid #00FF00";
      document.getElementsByTagName("a")[i].style.padding = "1px";
    }
  }
}

HighlightExternalLinks();

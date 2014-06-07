// ==UserScript==
// @name 		CBS Flashplayer Linker
// @namespace	CBSFlashplayerLinker
// @author		obsessiveatbest
// @description	modifies CBS Video links to direct them to the standalone flashplayer instead of the full page
// @include        http://www.cbs.com/*
// @license        GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @version        1.00
// @date          2009-5-5
//
//Based of off peteb's  wowdb link replace (http://userscripts.org/scripts/show/40522)
// ==/UserScript==

var links = getElements("a");

for(var i=0;i<links.length;i++)
{
	// item
	if(links[i].href.indexOf("video.php?") >= 0)
	{
		links[i].href = "http://www.cbs.com/thunder/player/1_0/partner/can/partner.swf?pid="+links[i].href.substr((links[i].href.indexOf('pid=')+4),32)+'&partner=cbs&gen=1&autoPlayVid=true';
	}
}

function getElements(element, classname, classvalue){      
   var elements = [];   
   var xpathExp = "//" + element;   
   
   if(classname != undefined)
      if(classvalue != undefined)
         xpathExp = xpathExp + "[@" + classname + "='" + classvalue + "']";
      else
         xpathExp = xpathExp + "[@" + classname + "]";  
         
   var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElements.snapshotLength; i++)
      elements.push(allElements.snapshotItem(i))
      
   return elements;
}
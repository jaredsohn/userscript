// ==UserScript== 
// @name info suppl EU2 
// @namespace http://australis.eu2.looki.fr/index.php 
// @description Darwin29
// @include http://australis.eu2.looki.fr/*
// ==/UserScript==
	
var allElements, thisElement, tabelem, stat, html, texte;

allElements = document.evaluate(
		   "//div[@class='resource_top']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		
for (var i = 0; i < allElements.snapshotLength; i++) 
{
		
		 thisElement = allElements.snapshotItem(i); 
		 texte = "";
		 html = "";
		 texte = thisElement.innerHTML;
         //alert(texte); debug
         tabelem = null;
		 tabelem = texte.split(/<br[^>]*>/g);
		
    if ((tabelem.length) == 8)
	{

		 thisElement.innerHTML = "";
		 stat =  " (" + tabelem[3]*24 + " /j )";
		
		 for(var j = 0; j < tabelem.length; j++) 
		 {
		
	    	if (j!=0)
			{html = html + "<br>";}
		
		    //alert(tabelem[j]); debug
			html = html + tabelem[j]; 
			
			if (j==3)
		    {html = html + stat;}
		
		 }
		
	}	
	thisElement.innerHTML = thisElement.innerHTML + html;	
	
}
		
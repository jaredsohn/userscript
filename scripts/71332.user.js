// ==UserScript==
// @name           SpamGTFO
// @description    Fights Spam
// ==/UserScript==
var tables = document.getElementsByTagName("table");

for ( var i = 0; i < tables.length; i++)
{
    var tCell = tables[i].rows[0].cells;
    
    for ( var j = 0; j < tCell.length; j++)
    {
        if((tCell[j].innerHTML.indexOf("Runescape private server made") > 0) || 
                 (tCell[j].innerHTML.indexOf("4changold.net") > 0) ||
                 (tCell[j].innerHTML.indexOf("Clan chat for epic lulz") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Declaring WAR against /b/") > 0)
                 (tCell[j].innerHTML.indexOf('www {dot} chan-exposed {dot} ph {dot} tc') > 0)
        	 )
        {
            var spamFaggery = tCell[j].parentNode;
            spamFaggery.parentNode.removeChild(spamFaggery);
        }
    
    }
}
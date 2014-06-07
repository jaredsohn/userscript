// ==UserScript==
// @name           Antispam
// @namespace      NobodyReallyCares
// @include        http://*.4chan.org/g/*
// ==/UserScript==
var tables = document.getElementsByTagName("table");

for ( var i = 0; i < tables.length; i++)
{
    var tCell = tables[i].rows[0].cells;
    
    for ( var j = 0; j < tCell.length; j++)
    {
        if((tCell[j].innerHTML.indexOf("are you an addict or something bitch") > 0) || 
        	 (tCell[j].innerHTML.indexOf("savedforfutureuse423423") > 0) ||
        	 (tCell[j].innerHTML.indexOf("savedforfutureuse234234") > 0)
        	 )
        {
            var spamFaggery = tCell[j].parentNode;
            spamFaggery.parentNode.removeChild(spamFaggery);
        }
    
    }
}
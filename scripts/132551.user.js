// ==UserScript==
// @name           Politopia Frontpage: Remove Poster Image 
// @version	   2.0
// @namespace      KarlSRuher
// @description    Remove Image of thread author and highlight unread threads
// @include        http://www.politopia.de/*
// @match 	   http://*.politopia.de/*
// ==/UserScript==


threadtable = document.getElementById("module5"); 

// remove header ("Ersteller")
ersteSpalte = threadtable.getElementsByTagName("td")[0];
ersteSpalte.parentNode.removeChild(ersteSpalte)

// remove first column
rows = threadtable.getElementsByClassName("vba_module");
for (var i = 0; i < rows.length; i++)
{
   ersteSpalte = rows[i].getElementsByTagName("td")[0];
   ersteSpalte.parentNode.removeChild(ersteSpalte)

   ersteSpalte = rows[i].getElementsByTagName("td")[0];
   if (!(typeof ersteSpalte.getElementsByTagName("img")[0] === 'undefined'))
	if (ersteSpalte.getElementsByTagName("img")[0].src == "http://www.politopia.de/images/styles/RoyalFlush/buttons/firstnew.png")
        ersteSpalte.getElementsByTagName("a")[1].style.fontWeight ='bold';
}
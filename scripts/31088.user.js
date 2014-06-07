// ==UserScript==
// @name           IkaSpy
// @namespace      Kampfschaf
// @description    Neue und Übersichtliche Ansicht bei den Spionen
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

GM_addStyle("#container #mainview table.table01									{width: 95%; margin-bottom: 30px; margin-top: -1px; border-top: 0px}");
GM_addStyle("#safehouse #container #mainview td.subject a						{background-color: #fbf2cc; text-decoration: none}");
GM_addStyle("#safehouse #container #mainview .spyinfo table.spyMessages        	{border: 10px solid #000000}");
GM_addStyle("#safehouse #container #mainview div.spyinfo                       	{border: 1px double #e4b873; background-color: #faefbf}");
GM_addStyle("#safehouse #container #mainview td.subject a                      	{font-weight: bold}");
GM_addStyle("#safehouse #container #mainview ul li.risk .statusBar             	{border: 1px solid #775726; height: 10px; background-color: #f3f0dd}");
GM_addStyle("#safehouseMissions #mainview ul#missionlist li                    	{border-bottom: 2px double #e4b873}");
GM_addStyle("#safehouseReports #container #mainview table.reportTable          	{border: 2px double #e4b873}");
GM_addStyle("#safehouseReports #container #mainview table.reportTable th       	{background-color: #e4b873}");

hardImageFix();

function hardImageFix()
{
   for ( i = 0 ; i < document.images.length; i++ )
   {
      for ( x = 0 ; x < replaceImages.length; x++ )
      {
         var imageReplace = replaceImages[x].split("|");
         
         if ( document.images[i].src.search(imageReplace[0]) != -1 )
         {
            document.images[i].src = URL + "hardcode/" + imageReplace[1];
         }         
      }
   }
}
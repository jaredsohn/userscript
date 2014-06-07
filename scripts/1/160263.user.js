// ==UserScript==
// @name           highlight chosen words 
// @description    highlights certain words in a given web page
// @grant none
// @include        http://www.ana.pt/*

/* This script is based (copied) on the explanation found here - [http://useroffline.blogspot.pt/2008/11/write-your-own-greasemonkey-script-to.html] . */
/* It highlights certain words in a given web page. */
/* In this example, it checks portuguese airport flight schedules and highlights the flights coming or going out of Schengen area. */
/* The scripts searches for any table cell and checks the text for certain words. If there is a match, the word is highlighted in bold red text. */
/* To change this script, just replace the "include" pages above and the text below (airport cities). */

allElements = document.evaluate(
 '//td',
 document,
 null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null);
for (var i = 0; i < allElements.snapshotLength; i++) {
 thisElement = allElements.snapshotItem(i);
  // Highlight these words (airports)
 if(thisElement.innerHTML.search(/Belfast|Blackpool|Birmingham|Bristol|Bournemouth|Cardiff|Cork|Doncaster|Dublin|Edinburgh|Exeter|East Midlands|Glasgow|Knock|Kerry|Leeds|Liverpool|London|Londres|Manchester|Newcastle|Nottingham|Prestwick|Shannon|Southampton|Toronto|Mosco|Horizon|Janeiro|Natal|Caracas|Luanda|Kiev|Casablanca|Istanbul|Marrake|Zagreb|Duba|Sal|Vicente|Maputo|Algier|Bamako|Accra|Chisinau|Brasilia|Tunis|Dakar|Fortaleza|Miami|Newark|Ouagad|Praia|Salvador|Paulo|Tome/i)>0) {
   with(thisElement.style){
     color="red";
	 fontWeight="bold";
   }
 }
}

// ==/UserScript==
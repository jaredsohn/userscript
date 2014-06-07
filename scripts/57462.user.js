// ==UserScript==
// @name				Berekenen voor hoeveel edels we pakketjes hebben
// @author				Laoujin / De Goede Fee
// @namespace			
// @description			
// @include			http://nl*.tribalwars.nl/game.php?*screen=snob*
// ==/UserScript==

var nobleText = new RegExp("\"\\>(\\d*) x", "g");
var match;
if (match = nobleText.exec(document.documentElement.innerHTML))
{
	var cost = match[1] * 1;
	var stored;
	if (match = nobleText.exec(document.documentElement.innerHTML))
	{
		stored = match[1] * 1;
		var canProduce = 0;
		while (stored > cost)
		{
			stored -= cost;
			cost++;
			canProduce++;
		}
		
		doc = getGameDoc(); 
		var table = getLastElementByClassName(doc, 'vis'); 
		var row = table.insertRow(5);
		var cell = row.insertCell(0);
		cell.innerHTML = "Je kan meteen produceren:";
		
		cell = row.insertCell(1);
		cell.innerHTML = "<b>"+canProduce+"</b> ("+stored+")";
	}
}


function getGameDoc() {
   doc = window.document; 
   if(!doc.URL.match('game\.php')) {
      for(i = 0; i < window.frames.length; i++) {
         if(window.frames.document.URL.match('game\.php')) {
            doc = window.frames.document; 
            }
         }
      }
   return doc; 
   }; 

function getLastElementByClassName(doc, classname) {
	t = doc.getElementsByTagName("table"); 
	return t[t.length - 1];
   };
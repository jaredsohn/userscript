// ==UserScript== 
// @name StadiumNamer 
// @namespace http://userscripts.org
// @description  Substitute original stadium name for corporate naming rights on public arenas
// @include * 
// ==/UserScript== 



(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data;
s = s.replace( /\bAmeriquest Field\b/gi, "The Ballpark in Arlington");

s = s.replace( /\bChase Field\b/gi, "Diamondback Field");

s = s.replace( /\bCiti Field\b/gi, "New Shea Stadium");

s = s.replace( /\bComerica Park\b/gi, "Tiger Stadium");

s = s.replace( /\bMinute Maid Park\b/gi, "Astro's Turf");

s = s.replace( /\bGreat American Ball Park\b/gi, "Riverfront Stadium");

s = s.replace( /\bProgressive Field\b/gi, "Jacobs Field");

s = s.replace( /\bKauffman Stadium\b/gi, "Royals Stadium");

s = s.replace( /\bMcAfee Coliseum\b/gi, "Oakland Coliseum");

s = s.replace( /\bMiller Park\b/g, "Milwaukee County Stadium");

s = s.replace( /\bAT&T Park\b/g, "The House That Bonds Built");

s = s.replace( /\bPETCO Park\b/gi, "Padres Park");

s = s.replace( /\bPNC Park\b/gi, "Three Rivers Stadium");

s = s.replace( /\bPro Player Stadium\b/g, "Dolphin Stadium");

s = s.replace( /\bRogers Centre\b/g, "Skydome");

s = s.replace( /\bSafeco Field\b/g, "Mariners Field");

s = s.replace( /\bTropicana Field\b/gi, "Florida Suncoast Dome");

s = s.replace( /\bTurner Field\b/g, "Olympic Stadium");

s = s.replace( /\bU.S. Cellular Field\b/g, "Comiskey Park");

s = s.replace( /\bCitizens Bank Park\b/gi, "Veterans Stadium");

s = s.replace( /\bFedEx Field\b/gi, "Jack Kent Cooke Stadium");

s = s.replace( /\bInvesco Field\b/gi, "Mile High Stadium");

s = s.replace( /\bBank of America Stadium\b/gi, "Panthers Stadium");

s = s.replace( /\bQualcomm Stadium\b/gi, "Chargers Stadium");

s = s.replace( /\bMonster Park\b/gi, "Candlestick Park");

s = s.replace( /\bM&T Bank Stadium\b/g, "Baltimore Stadium");

s = s.replace( /\bReliant Stadium\b/g, "Texans Stadium");

s = s.replace( /\bLP Field\b/gi, "Titans Field");

s = s.replace( /\bGillette Stadium\b/gi, "Patriots Stadium");

s = s.replace( /\bLincoln Financial Field\b/gi, "Eagles Stadium");

s = s.replace( /\bQwest Field\b/g, "Seahawks Field");

s = s.replace( /\bEdward Jones Dome\b/gi, "Rams Field");

s = s.replace( /\bRaymond James Stadium\b/g, "Buc Stadium");

s = s.replace( /\bHeinz Field\b/g, "Three Rivers Stadium");

s = s.replace( /\bUniversity of Phoenix Stadium\b/gi, "Cardinals Stadium");

s = s.replace( /\bLucas Oil Stadium\b/g, "Colts Stadium");

s = s.replace( /\bTD Banknorth Garden\b/g, "Boston Garden");

s = s.replace( /\bIzod Center\b/gi, "Brendan Byrne Arena");

s = s.replace( /\bWachovia Center\b/g, "The Spectrum");

s = s.replace( /\bAir Canada Centre\b/gi, "Canada Center");

s = s.replace( /\bPhilips Arena\b/gi, "Omni Coliseum");

s = s.replace( /\bAmericanAirlines Arena\b/g, "Miami Arena");

s = s.replace( /\bAmway Arena\b/g, "Orlando Arena");

s = s.replace( /\bVerizon Center\b/gi, "Capital Center");

s = s.replace( /\bUnited Center\b/gi, "Chicago Stadium");

s = s.replace( /\bQuicken Loans Arena\b/g, "Gund Arena");

s = s.replace( /\bConseco Fieldhouse\b/gi, "Market Square Fieldhouse");

s = s.replace( /\bAmerican Airlines Center\b/gi, "Dallas Center");

s = s.replace( /\bToyota Center\b/gi, "The Summit");

s = s.replace( /\bFedExForum\b/gi, "Memphis Forum");

s = s.replace( /\bAT&T Center\b/gi, "San Antonio Center");

s = s.replace( /\bPepsi Center\b/gi, "Denver Arena");

s = s.replace( /\bTarget Center\b/gi, "Timberwolves Arena");

s = s.replace( /\bKeyArena\b/g, "Oklahoma City");

s = s.replace( /\bEnergySolutions Arena\b/gi, "Salt Palace");

s = s.replace( /\bStaples Center\b/gi, "Great Western Forum");

s = s.replace( /\bUS Airways Center\b/gi, "Phoenix Arena");

s = s.replace( /\bARCO Arena\b/gi, "Sacramento Arena");

s = s.replace( /\bPrudential Center\b/gi, "Devils Arena");

s = s.replace( /\bWachovia Center\b/gi, "The Spectrum");

s = s.replace( /\bTD Banknorth Garden\b/gi, "Boston Garden");

s = s.replace( /\bHSBC Arena\b/g, "Buffalo Arena");

s = s.replace( /\bBell Centre\b/gi, "Montreal Center");

s = s.replace( /\bScotiabank Place\b/gi, "The Palladium");

s = s.replace( /\bRBC Center\b/gi, "Raleigh  Arena");

s = s.replace( /\bBankAtlantic Center\b/gi, "Miami Arena");

s = s.replace( /\bSt. Pete Times Forum\b/gi, "Ice Palace");

s = s.replace( /\bNationwide Arena\b/gi, "Columbus Center");

s = s.replace( /\bSommet Center\b/gi, "Nashville Arena");

s = s.replace( /\bScottrade Center\b/gi, "Kiel Center");

s = s.replace( /\bPengrowth Saddledome\b/gi, "Olympic Saddledome");

s = s.replace( /\bRexall Place\b/gi, "Northlands Coliseum");

s = s.replace( /\bXcel Energy Center\b/g, "JUNIUS");

s = s.replace( /\bnoon\b/gi, "Wild Arena");

s = s.replace( /\bGeneral Motors Place\b/g, "Pacific Coliseum");

s = s.replace( /\bHonda Center\b/gi, "The Pond");

s = s.replace( /\bJobing.com Arena\b/gi, "Glendale Arena");

s = s.replace( /\bBarry Bonds\b/gi, "Barry Bonds*");

s = s.replace( /\bRoger Clemens\b/gi, "Roger Clemens*");



    node.data = s; 
		}
} 

})();


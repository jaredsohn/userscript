// ==UserScript==
// @name          Travian Wegerechner-Link Auto
// @namespace     http://userscripts.org/scripts/show/11448
// @description   Adds a link to the way calculator with all own villages.
// @include       *.travian.*/*.php*
// @exclude       *.travian.*/anleitung.php*
// @exclude       *.travian.*/chat.php*
// @exclude       *.travian.*/impressum.php*
// @exclude       *.travian.*/index.php*
// @exclude       *.travian.*/links.php*
// @exclude       *.travian.*/login.php*
// @exclude       *.travian.*/logout.php*
// @exclude       *.travian.*/screenshots.php*
// @exclude       *.travian.*/spielregeln.php*
// @exclude       *.travian.*/tutorial.php*
// @author        PJhimself, based on Guy Fraser's Travian MarketPlace Helper Auto
// ==/UserScript==

(function() {

 // array of the village data (populated later)
 var villages = [];

 // get all village names
 var searchNames = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[1]/a";
 var names = document.evaluate(searchNames, document, null, XPathResult.ANY_TYPE, null);

 // get their X coords
 var searchXs = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[2]/table/tbody/tr/td[1]";
 var Xs = document.evaluate(searchXs, document, null, XPathResult.ANY_TYPE, null);

 // get their Y coords
 var searchYs = "//div[@id='lmidall']/div[@id='lright1']/table/tbody/tr/td[2]/table/tbody/tr/td[3]";
 var Ys = document.evaluate(searchYs, document, null, XPathResult.ANY_TYPE, null);

 // Go through each village and add it's details to the villages array
 var thisName = names.iterateNext();
 var thisX = Xs.iterateNext();
 var thisY = Ys.iterateNext();
 while (thisName) {
  thisX = thisX.textContent.substr(1); // remove opening (
  thisY = parseInt(thisY.textContent); // remove closing )
  villages.push({name:thisName.textContent, x:thisX, y:thisY});
  thisName = names.iterateNext();
  thisX = Xs.iterateNext();
  thisY = Ys.iterateNext();
 }

  // build the linkadress
 var n = villages.length;
 var alink = "http://www.javaschubla.de/2006/travian/wegerechner/wegerechner-multi.html?";
 alink += "num="+n+"&endkoord=&tag=&monat=&jahr=&hh=&mm=&ss=";
 while (-1<--n) {
   alink += "&start"+(n+1)+"=("+villages[n].x+"%7C"+villages[n].y+") "+villages[n].name;
   alink += "&speed"+(n+1)+"=";
   alink += "&turnier"+(n+1)+"=0";
   alink += "&comment"+(n+1)+"=";
 }
 alink += "&dim=400";

 // create the link
 var hlink = document.createElement("a");
 hlink.innerHTML = '<a target="_blank" href="'+alink+'">zum Wegerechner</a>';

 // add the link
 document.body.appendChild(hlink);
 
})();

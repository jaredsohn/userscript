// ==UserScript==
// @name          Travian Rally Point auto-helper
// @namespace     http://userscripts.org/scripts/show/9553
// @description   Adds a list of your villages to rally point screens.
// @include       http://s*.travian.*/a2b.php*
// @author        Guy Fraser
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
  thisX = parseInt(thisX.textContent.substr(1)); // remove opening (
  thisY = parseInt(thisY.textContent); // remove closing )
  villages.push({name:thisName.textContent, x:thisX, y:thisY});
  thisName = names.iterateNext();
  thisX = Xs.iterateNext();
  thisY = Ys.iterateNext();
 }

 // reverse villages list so it's in same sequence as what is shown in right sidebar
 villages.reverse();

 // get node to attach the select list to
 var node = document.getElementsByName('y')[0];

 // build the select list
 var sel = "<select id='rallyhelper'><option value='-1'>Select Village...</option>";
 var i = villages.length;
 while (-1<--i) {
  // this version with coords in drop-down:
  sel += "<option value = '"+i+"' onClick='document.getElementsByName(\"x\")[0].value="+villages[i].x+";document.getElementsByName(\"y\")[0].value="+villages[i].y+";return false;'>"+villages[i].name+"</option>";
 }
 sel += "</select>";

 // add the select box to the node
 node.parentNode.parentNode.innerHTML += sel;
})();
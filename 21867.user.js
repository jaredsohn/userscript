// ==UserScript==
// @name          Travian Piacnál segítő
// @namespace     http://userscripts.org/scripts/show/9544
// @description   Piacnál kiválaszthatod a városod, nem kell beütni a koordinátáit. -- Fordította: Simulacrum
// @include       http://s*.travian.*/build.php*
// @author        Guy Fraser, based on original by Ankur Saxena
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
  //alertText += thisName.textContent + " @ ("+thisX+","+thisY+")\n"
  villages.push({name:thisName.textContent, x:thisX, y:thisY});
  thisName = names.iterateNext();
  thisX = Xs.iterateNext();
  thisY = Ys.iterateNext();
 }
 //alert(alertText);

 // reverse villages list so it's in same sequence as what is shown in right sidebar
 villages.reverse();

 // get node to attach the select list to
 var node = document.getElementsByName('y')[0];

 // build the select list
 var sel = "<select>";
 var i = villages.length;
 while (-1<--i) {
  // this version with coords in drop-down:
  //sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+" ("+villages[i].x+","+villages[i].y+")</option>";
  // this version without coords in drop-down:
  sel += "<option value = '"+i+"' onClick='document.snd.x.value="+villages[i].x+";document.snd.y.value="+villages[i].y+";'>"+villages[i].name+"</option>";
 }
 sel += "</select>";

 // add the select box to the node
 node.parentNode.parentNode.innerHTML += sel;
})();
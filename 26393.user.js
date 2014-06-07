// ==UserScript==
// @name         GarminConnectPlus
// @namespace    http://runeskaug.com/greasemonkey
// @description  Fixes a few irritations with Garmin Connect.
// @author       Rune Skaug (greasemonkey@runeskaug.com)
// @include      http://connect.garmin.com/*
// @include      https://connect.garmin.com/*
// @version      1.0.0
// @released     2008-05-12
// @updated      2008-05-12
// @compatible   Greasemonkey
// ==/UserScript==

/* 
 * Creative Commons Attribution License
 * http://creativecommons.org/licenses/by/2.5/
 */

(function() {
  function f() {
     // Add Pace to laps table
     var lapsTable = document.getElementById('lapsTable');
     
     // Header
     var newNode = document.createElement("th");
     newNode.setAttribute('id', 'paceHeader');
     newNode.setAttribute('align', 'center');
     newNode.setAttribute('style', 'font-weight: bold; text-align: center;');
     newNode.appendChild(document.createTextNode("Pace"));
     var headerRow = lapsTable.getElementsByTagName('tr')[0];
     var hrHeader = document.getElementById('hrHeader');
     var cellCount  = headerRow.getElementsByTagName('th').length;
		 if (cellCount==8) {
       headerRow.insertBefore(newNode, hrHeader);
     }
     
     // For each row
		var rows = lapsTable.getElementsByTagName('tr');
		for (var i=1,row;row = rows[i];i++) {
		  var cells = row.getElementsByTagName('td');
		  var newPace = document.createElement("td");
		  newPace.setAttribute('class','x-grid3-col');
		  newPace.setAttribute('align','center');
      var speed = getInnerText(cells[3])*1;
		  newPace.appendChild(document.createTextNode(formatFractionTime(speedToPace(speed))));
		  var innerDiv = document.createElement("div");
		  innerDiv.appendChild(newPace);
		  var paceDiv = document.createElement("div");
		  paceDiv.setAttribute("class", "x-grid3-cell-inner");
		  paceDiv.appendChild(innerDiv);
		  if (cells.length==8) {
		    row.insertBefore(paceDiv, cells[4]);
		  }
		}
		     
     // Add Pace to text fields around the page
     var els = document.getElementsByTagName('SPAN');
     for (var i=0,el;el=els[i];i++) {
       var s = getInnerText(el);
       var kphPos = s.indexOf('kph'); var mphPos = s.indexOf('mph'); 
       if (kphPos>0 || mphPos>0) {
       	 var speed = s.substring(0, (kphPos>0?kphPos:mphPos)-1)*1;
       	 if (speed>0) {
	       	 var paceText = ' ('+formatFractionTime(speedToPace(speed)) + ' '+(kphPos>0?'mpk':'mpm')+')'; 
	         el.innerHTML += paceText;
	       }
       }
     }
  };
  
  function speedToPace(dSpeed) {
    return 1 / (dSpeed / 60);
  }

  function formatFractionTime(ft) {
    var fts = ft+'';
    var minutes = fts.substring(0,fts.indexOf('.')); // Everything before '.'
    var fraction = ('0.'+fts.substring(fts.indexOf('.')+1))*1;
    var seconds = Math.round(fraction*60);
    return minutes+':'+(seconds<10?'0':'')+seconds;
  }
  
  function getInnerText(el) {
    var s='';
    for (var i=0,node; node=el.childNodes[i]; i++) {
      if (node.nodeType == 1) s += getInnerText(node); 
      else if (node.nodeType == 3) s += node.nodeValue;
    }
    return s;
  }
  f();
})();
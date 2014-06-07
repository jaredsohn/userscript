// ==UserScript==
// @name           The West - Show All Jobs
// @namespace      http://www.puli.sk
// @include        http://*.the-west.*/game.php*
// @version        1.1
// ==/UserScript==

showAll = 
"  try {"+
"  for (var x in this.marker)"+
"    for (var y in this.marker[x]) {"+
"      if (this.marker[x][y]['job']) {"+
"        var marker = this.marker[x][y]['job'];"+
"        if (!marker.data.visible)"+
"          marker.data.visible=2;"+
"      }"+
"    }"+
"  } catch(e) {}";

function inject() {
  var scrpt = unsafeWindow.document.createElement('SCRIPT');
  scrpt.innerHTML = "function evalPC(cmd){eval(cmd)}";
  unsafeWindow.document.body.appendChild(scrpt);

  // modify big map
  var newSource = unsafeWindow.WMap.updateAllTiles.toSource();
  var toPoint = newSource.indexOf("this.recalcMarker()");
  if (toPoint == -1) return;
  newSource = newSource.substring(0,toPoint)+showAll+newSource.substring(toPoint);
  unsafeWindow.evalPC("WMap.updateAllTiles = "+newSource);

  // modify minimap
  var strToFind = "WMap.mapData.check_job_points({job_id: key, malus: value.malus}) != 0";
  var newSource = unsafeWindow.WMinimap.updateJobs.toSource();
  var toPoint = newSource.indexOf(strToFind);
  if (toPoint == -1) return;
  newSource = newSource.substring(0,toPoint)+"true"+newSource.substring(toPoint+strToFind.length);
  unsafeWindow.evalPC("WMinimap.updateJobs = "+newSource);
  unsafeWindow.WMinimap.updateJobs();

  unsafeWindow.document.body.removeChild(scrpt);
}

unsafeWindow.addEventListener("load", inject, false);
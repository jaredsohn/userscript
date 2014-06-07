// ==UserScript==
// @name           Move Tons of Fleets
// @namespace      apache1990.dod.net
// @description    Allows movement of huge numbers of fleets at once.  Warning: Must be configured for your purposes.
// @include        *.war-facts.com/logistics.php
// ==/UserScript==

function zz(p, context){
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

unsafeWindow.loadXMLDoc = function(url){
	// branch for native XMLHttpRequest object
	//unsafeWindow.GM_log("Beginning purchase.");
	req = new XMLHttpRequest();
	req.onreadystatechange = unsafeWindow.processReqChange();
	req.open("GET", url, true);
	req.send(null);
}

unsafeWindow.processReqChange = function(){
	// only if req shows "complete"
	unsafeWindow.GM_log("Processing mission.");
	if (req.readyState == 4) {
		//unsafeWindow.GM_log("A launch finished.");
		// only if "OK"
	        if (req.status == 200) {
        	    
			}else{
				//unsafeWindow.GM_log("There was a problem moving a fleet:\n" + req.statusText);
			}
	}else{
		//unsafeWindow.GM_log("Epic fail.  Trying again.");
		setTimeout("processReqChange()", 1000);
	}
}

unsafeWindow.moveThem = function(x, y, z){
	/*
		NOTICE:
		Set i to your first fleet id, and j to the last.
		We assume that you auto refreshed a page to make all your fleets (of one ship), but if
		there are any fleet ids other than yours between your fleets, it won't really hurt anything.
	*/
	var j = 52420;
	//unsafeWindow.GM_log(x+", "+y+", "+z);
	for(var i = 52120; i <= j; i++){
		document.getElementById('executeButton').value = 'Moving fleet ' + (i+1) + ', last fleet is ' + j + '.';
		unsafeWindow.loadXMLDoc('http://' + window.location.hostname + '/fleet_navigation.php?fleet=' + i + "&x=" + x + "&y=" + y + "&z=" + z + "&tpos=global&mtype=transfer&verify");
	}
	
	document.getElementById('executeButton').value = "Missions launched";
	
	return;
}

//unsafeWindow.GM_log = GM_log;
unsafeWindow.x = 0;
unsafeWindow.y = 0;
unsafeWindow.z = 0;
var row = document.createElement('tr'), column = document.createElement('td'), newInput = document.createElement('input');
column.innerHTML = "Destination - X:<input type='text' length='8' onblur='x=this.value' value='0' /> Y: <input type='text' length='8' onblur='y=this.value' value='0' /> Z: <input type='text' length='8' onblur='z=this.value' value='0' /> <input type='submit' value='Engage Mass Transit' onclick='moveThem(x, y, z);' id='executeButton' />";
row.appendChild(column);
zz("//a[@href='warpnet.php']/../../..")[0].appendChild(row);
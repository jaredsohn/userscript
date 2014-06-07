// ==UserScript==
// @name           Move tons of fleets 2
// @namespace      By guardian
// @description    Allows you to move tons of fleets at global coordinates or planets
// @include        http://*.war-facts.com/logistics.php
// ==/UserScript==


/* This Script was written by guardian.
It is an improvement over Apache1990's script : Move tons of fleets
Most of the code here was written by apache1990
Changelog in version 2 (by guardian):
i) No longer need to configure the script, input starting and ending fleet ids in the logistic screen
ii) You can send fleets to planets now (by planet id)
*/

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
	//unsafeWindow.GM_log("Processing mission.");
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

unsafeWindow.moveThem = function(x, y, z, w, i, j){
	/*
		NOTICE:
		We assume that you auto refreshed a page to make all your fleets (of one ship), but if
		there are any fleet ids other than yours between your fleets, it won't really hurt anything.
	*/
	
	//unsafeWindow.GM_log(x+", "+y+", "+z);
	
	
	for( var k = i; k <= j; k++){
	
		document.getElementById('executeButton').value = 'Moving fleet ' + k + ', last fleet is ' + j + '.';
		if ( w!=0 )
		{
		unsafeWindow.loadXMLDoc('http://' + window.location.hostname + '/fleet_navigation.php?tworld=' + w + '&fleet=' + k + '&tpos=global&mtype=transfer&verify');
		}
		else
		unsafeWindow.loadXMLDoc('http://' + window.location.hostname + '/fleet_navigation.php?fleet=' + k + "&x=" + x + "&y=" + y + "&z=" + z + "&tpos=global&mtype=transfer&verify");
	}
	
	
	
	
	document.getElementById('executeButton').value = "Missions launched";
	
	return;
}

//unsafeWindow.GM_log = GM_log;
unsafeWindow.x = 0;
unsafeWindow.y = 0;
unsafeWindow.z = 0;
unsafeWindow.w = 0; // w is a variable that gets the planet id
unsafeWindow.i = 0; // i is the first fleet id
unsafeWindow.j = 0; // j is the last fleet id
var row1 = document.createElement('tr'), row2 = document.createElement('tr'), column1 = document.createElement('td'), column2 = document.createElement('td'), newInput = document.createElement('input');

column1.innerHTML = "Destination : X: <input type='text' length='8' onblur='x=this.value' value='0' /> Y: <input type='text' length='8' onblur='y=this.value' value='0' /> Z: <input type='text' length='8' onblur='z=this.value' value='0'  /> Planet id: <input type='text' length='8' onblur='w=this.value' value='0'  />";
row1.appendChild(column1);
column2.innerHTML = "Fleets to move: First fleet id: <input type='text' length='8' onblur='i=this.value' value='0'  /> Last fleet id: <input type='text' length='8' onblur='j=this.value' value='0'  /> <input type='submit' value='Engage Mass Transit' onclick='moveThem(x, y, z, w, i , j);' id='executeButton' />";
row2.appendChild(column2);

zz("//a[@href='warpnet.php']/../../..")[0].appendChild(row1);
zz("//a[@href='warpnet.php']/../../..")[0].appendChild(row2);
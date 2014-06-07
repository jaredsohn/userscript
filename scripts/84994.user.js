// ==UserScript==
// @name           Fleet Monitor
// @namespace      http://www.war-facts.com/message.php?player=9972
// @description    Use perimeter scan, wait for refresh and view route in VRML.
// @include        http://www.war-facts.com/extras/scan.php*
// ==/UserScript==

//VARIABLES

var centerBox = document.getElementsByTagName('center')[0];
var scanTable = centerBox.getElementsByTagName('table')[1];
var headTable = centerBox.getElementsByTagName('table')[0];
var outside = scanTable.rows[1].cells[5].innerHTML.indexOf('Open');
var alltr = scanTable.getElementsByTagName('tr');
var count = 61;
var vectorA = new Array();
var vectorB = new Array();
var angle = 0;
var dTime = 1;

//FUNCTIONS

function nextPhase() {
	GM_log("Entering Phase 2");
	GM_setValue('monitor',1);
	window.location.reload();
}

function timer() {
	cTd.innerHTML = "<strong>Fleet Monitor: </strong>Active<br>Updating in " +count+ " s<br>";
	count = count - 1;
	t=setTimeout(timer,1000);
}

function saveFleets() {
	GM_log("Saving.");

	for (var i = 1; (i+1) < alltr.length; ++i) {
		var itds = alltr[i].getElementsByTagName('td');
		var fleetId = itds[0].firstChild.firstChild.href.substr(itds[0].firstChild.firstChild.href.indexOf("&tfleet=")+8);
		var fleetPos = itds[5].getElementsByTagName('a')[0].innerHTML;
		GM_setValue( fleetId, fleetPos );
	}

}

function deleteFleets() {
	GM_log("Cleaning.");

	for each (var val in GM_listValues()) {
 		if (parseInt(val)) {
			GM_deleteValue(val);
		}
	}
}

function speed(a,b) {
	vectorA[0] = parseInt(a);
	vectorB[0] = parseInt(b);
	a = a.substr(a.indexOf(",")+1);
	b = b.substr(b.indexOf(",")+1);
	vectorA[1] = parseInt(a);
	vectorB[1] = parseInt(b);
	a = a.substr(a.indexOf(",")+1);
	b = b.substr(b.indexOf(",")+1);
	vectorA[2] = parseInt(a);
	vectorB[2] = parseInt(b);

	vectorA[0] = vectorB[0]-vectorA[0];
	vectorA[1] = vectorB[1]-vectorA[1];
	vectorA[2] = vectorB[2]-vectorA[2];

	var fSpeed = Math.sqrt(Math.pow(vectorA[0],2)+Math.pow(vectorA[1],2)+Math.pow(vectorA[2],2));
	var error = (vectorA[0]+vectorA[1]+vectorA[2])/fSpeed;

	angle = Math.atan( 1/fSpeed );
	angle = Math.round(angle/Math.PI*180000)/1000;

	vectorA[0] = vectorA[0]/fSpeed;
	vectorA[1] = vectorA[1]/fSpeed;
	vectorA[2] = vectorA[2]/fSpeed;
	return Math.round(fSpeed*40000/36/dTime) + "&plusmn;" + Math.round(Math.abs(error*40000/36/dTime));
}



function vrmlLine() {
	var Dfactor = GM_getValue('cLength',20000);
	vectorA[0] = Math.round(vectorB[0]+vectorA[0]*Dfactor);
	vectorA[1] = Math.round(vectorB[1]+vectorA[1]*Dfactor);
	vectorA[2] = Math.round(vectorB[2]+vectorA[2]*Dfactor);
	var vLine = "http://www.war-facts.com/extras/vrmlmap.php";
	vLine = vLine + "?x=" + vectorB[0] + "&y=" + vectorB[1] + "&z=" + vectorB[2];
	vLine = vLine + "&xn=" + vectorA[0] + "&yn=" + vectorA[1] + "&zn=" + vectorA[2];
	return vLine;
}

function vrml() {
	var link = this.name;
	window.open(link,'vrml','height=515,width=700');

}

function doubleTime() {
	if (dTime == 1) {
		GM_log("Double Time");
		dTime = 2;
		clearTimeout(tid1);
		count = count + 60;
		this.type="hidden";
	}
}

function saveL() {
	var cL = parseInt(lInput.value);
	if (cL && cL > -10000 && cL < 10000) {
		GM_setValue('cLength', cL*250);
	}
	else {
		GM_log("Magnitude not saved.");
	}
}

// Main

var newTr = document.createElement('tr');
newTr.innerHTML = "<td><center><strong>Fleet Monitor</strong><br><br></center></td>"; 
headTable.insertBefore(newTr,headTable.lastChild.nextSibling);
var cTd = newTr.firstChild;

newTr = document.createElement('tr');
headTable.insertBefore(newTr,headTable.lastChild.nextSibling);
newTd = document.createElement('td');
newTr.insertBefore(newTd,newTr.firstChild);

var lInput = document.createElement('input');
lInput.value = GM_getValue('cLength',20000)*0.004;
lInput.type = "text";
lInput.class = "text";
lInput.name="cLengtht";
lInput.size="3";
lInput.maxlength="4";
newTd.insertBefore(lInput, newTd.firstChild);

var txtNode = document.createTextNode("mil km "); 
newTd.insertBefore(txtNode, newTd.lastChild.nextSibling);

var sButton = document.createElement('input');
sButton.value = "Save Magnitude";
sButton.type = "button";
sButton.addEventListener("click", saveL, false);
newTd.insertBefore(sButton, newTd.lastChild.nextSibling);

var br = document.createElement('br');
newTd.insertBefore(br, newTd.lastChild.nextSibling);

if (outside != -1) {

	if ( GM_getValue('monitor',0) == 0 ) { // Phase 1 Adding new data and waits for scan update
		var tid1 = setTimeout(nextPhase, 61000);
		setTimeout(nextPhase, 121000);
		timer();

		deleteFleets();
		saveFleets();

		var dButton = document.createElement('input');
		dButton.value = "Double Time";
		dButton.type = "button";
		dButton.class = "warn";
		dButton.addEventListener("click", doubleTime, false);
		newTd.insertBefore(dButton, newTd.lastChild.nextSibling);

	}
	else if ( GM_getValue('monitor',0) == 1 ) { // Phase 2 VRML-buttons
		var newTd = document.createElement('td');
		newTd.class = "head";
		newTd.innerHTML = '<strong>Movement&nbsp;</strong>';
		alltr[0].insertBefore(newTd,alltr[0].lastChild.nextSibling);

		for (var i = 1; (i+1) < alltr.length; ++i) {
			var itd = alltr[i].getElementsByTagName('td')[5];
			var itd2 = alltr[i].getElementsByTagName('td')[0];

			if (itd) {
				var fId = itd2.firstChild.firstChild.href.substr(itd2.firstChild.firstChild.href.indexOf("&tfleet=")+8);
				var posB = itd.getElementsByTagName('a')[0].innerHTML;
				var newTd = document.createElement('td');
				itd.parentNode.insertBefore(newTd,itd.nextSibling);

				if ( GM_getValue(fId) ) {
					if ( GM_getValue(fId) == posB ) {
						newTd.innerHTML = "Speed: 0 m/s";
					}
					else {
						newTd.innerHTML = "Speed: "+ speed(GM_getValue(fId), posB) +" m/s <br>";
						
						var newButton = document.createElement('input');
						newButton.value = "Course ("+"\u00B1"+angle+"\u00B0"+")";
						newButton.type = "button";
						newButton.name = vrmlLine();
						newTd.innerHTML = newTd.innerHTML + "End point: " + vectorA[0] +","+ vectorA[1] +","+ vectorA[2];
						newButton.addEventListener("click", vrml, false);
						newTd.insertBefore(newButton,newTd.firstChild);
					}
				}
				else {
					newTd.innerHTML = "New fleet in<br>scan range.";
					
				}

				

			}
		}
		cTd.innerHTML = "<strong>Fleet Monitor </strong><br>Note: 1\u00B0 error is 1.75mil km at distance of 100mil km<br>";
		GM_setValue('monitor',0);
	}
}
else {
	GM_log("Inside a system.");
}
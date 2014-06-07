// ==UserScript==
// @name           DWMC
// @namespace      http://www.war-facts.com/message.php?player=9972
// @description    "Dude, Where's My Colony" -script lets you know your closest colony to system you are viewing.
// @include        http://www.war-facts.com/extras/view_system.php*
// @include        http://www.war-facts.com/intelligence.php
// ==/UserScript==


//Functions

function getColonies(list) {
	var iter = 0;
	var temp = new Array();;

	for (var i= 0; list.rows[i]; i+=2) {
		if (!list.rows[i].cells[1]) break;
		var sString = list.rows[i].cells[1].innerHTML;
		temp[iter] = sString.substring( sString.indexOf( "(" )+1 );
		var planets = list.rows[i+1].cells[0];

		for (var j= 1; planets.getElementsByTagName('td')[j]; j+=19) {
			clink = planets.getElementsByTagName('td')[j].innerHTML;

			if (clink != "&nbsp;") {
				clink = clink.substring(0, clink.indexOf("/a>")+3);
				temp[iter] = temp[iter] + clink;
			}
		}

		if ( temp[iter].indexOf("<a") != -1 ) {
			iter += 1;
		}
	}

	if (iter != 0) {
	var confirmed = window.confirm("DWMC: Save location of "+iter+" colonized system?");

		if (confirmed) {
			deleteDatabase();

			for (var i = 0; i < iter; i++) {
				GM_setValue( i, temp[i] );
			}
		} 
	}
	
}

function deleteDatabase() {

	for each (var val in GM_listValues()) {
		if (parseInt(val) || val == "0") {
			GM_deleteValue(val);
		}
	}
}

function toArray(xyz) {
	var vector = new Array();
	vector[0] = parseInt( xyz );
	xyz =  xyz.substring(xyz.indexOf(",")+1);
	vector[1] = parseInt( xyz );
	xyz =  xyz.substring(xyz.indexOf(",")+1);
	vector[2] = parseInt( xyz );
	return vector; //parseInt ignores rest of the string
}

function giveDir(vector) { // ignore z-coord
	var x = vector[0];
	var y = vector[1];
	var angle = 0;
	var dir = "";
	if (x == 0) {
		if(y<0) {
			dir = "S";
		}
		else {
			dir = "N";
		}
	}
	else {
		var angle = Math.atan(y/x)/(2*Math.PI); //now full circle is 1
		if (x<0 && y<0) {
			angle += 0.5;
		}
		else if (x<0) {
			angle += 0.5;
		}
		else if (y<0) {
			angle += 1;
		}

		if (angle <= 0.0625 || angle > 0.9375) {
			dir = "E";
		}
		else if (angle > 0.0625 && angle <= 0.1875) {
			dir = "NE";
		}
		else if (angle > 0.1875 && angle <= 0.3125) {
			dir = "N";
		}
		else if (angle > 0.3125 && angle <= 0.4375) {
			dir = "NW";
		}
		else if (angle > 0.4375 && angle <= 0.5625) {
			dir = "W";
		}
		else if (angle > 0.5625 && angle <= 0.6875) {
			dir = "SW";
		}
		else if (angle > 0.6875 && angle <= 0.8125) {
			dir = "S";
		}
		else if (angle > 0.8125 && angle <= 0.9375) {
			dir = "SE";
		}
	}
	return dir;
}

function findNearest(xyz) {
	var it = 0;
	var nMag = -1;
	var nIt
	var link = "";
	var nvector = new Array();
	for (var it=0; GM_getValue(it.toString(),false); it+=1) {
		sString = GM_getValue(it.toString());
		sxyz = toArray(sString);
		var vector = new Array();
		vector[0] = sxyz[0]-xyz[0];
		vector[1] = sxyz[1]-xyz[1];
		vector[2] = sxyz[2]-xyz[2];

		var mag = Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2)+Math.pow(vector[2],2))*4000;

		if (nMag == -1 || nMag > mag) {
			nMag = mag;
			nIt = it;
			nvector[0] = vector[0];
			nvector[1] = vector[1];
			nvector[2] = vector[2];
		}
	}
	if (nMag == 0) {
		var colonylink = GM_getValue(nIt.toString());

		link = "You have colonies in this system:<br>";
		while (colonylink.indexOf("<a") != -1) {
			colonylink = colonylink.substring(0,colonylink.indexOf(">")) + ' target="maingame"' + colonylink.substring(colonylink.indexOf(">"));
			link = link + colonylink.substring(colonylink.indexOf("<a"),colonylink.indexOf("</a")+4) + "<br>";
			colonylink = colonylink.substring(colonylink.indexOf("</a")+4);
		}
	}
	else if (nMag < 0) {
		link = "Error: No Colony Data.";
	}
	else {
		var colonylink = GM_getValue(nIt.toString());
		link = "Your nearest colony is <b>"+Math.round(nMag/10000)/100+"</b> mil km <b>"+giveDir(nvector)+"</b><br>";
		while (colonylink.indexOf("<a") != -1) {
colonylink = colonylink.substring(0,colonylink.indexOf(">")) + ' target="maingame"' + colonylink.substring(colonylink.indexOf(">"));
			link = link + colonylink.substring(colonylink.indexOf("<a"),colonylink.indexOf("</a")+4) + "<br>";
			colonylink = colonylink.substring(colonylink.indexOf("</a")+4);
		}
	}

	return link;
}


//Main

var page = window.location.href;
page = page.substring(page.indexOf("com") + 4);
page = page.substring(0, page.indexOf("."));

if (page == "intelligence") { //refresh colonies
	var uTable = document.getElementsByTagName('table')[3];

	if (uTable) {
		getColonies(uTable);
	}
}
else if (page == "extras/view_system") { //look for closest colony
	var sData = document.getElementsByTagName('font')[0];
	var pos = sData.innerHTML.substring(sData.innerHTML.indexOf("(")+1, sData.innerHTML.indexOf(")"));
	pos = toArray(pos);
	cLink = findNearest(pos);
	sData.innerHTML = cLink + sData.innerHTML;
	
}

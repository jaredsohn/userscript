// ==UserScript==
// @name           Travian Quick Menu
// @description    Add menu to the left bar and automatically fill in village information
// @include        http://*.travian.*/*

// ==/UserScript==

function mainmenu()
{
//	alert("TEST");
	var menuBox = document.getElementById('side_navi');
//	alert(menuBox.innerHTML);
	
	var text = "<p><a href='build.php?gid=17'>Market</a>"
		+ "<a href='build.php?gid=17&t=2'>Bid</a>"
		+ "<a href='build.php?gid=19'>Barrack</a>"
		+ "<a href='build.php?gid=20'>Stable</a>"
		+ "<a href='build.php?gid=16'>RallyPoint</a>"
		+ "</p>";
	var text = text + "<p><a href='allianz.php'>Allianz</a>"
		+ "<a href='allianz.php?s=3'>Allianz Attacks</a>"
		+ "<a href='allianz.php?s=2'>Allianz Forum</a>"
		+ "</p>";

	menuBox.innerHTML = menuBox.innerHTML + text;
}

function updateText(textname, textvalue) {
	var result = document.evaluate("//input[@name='" + textname + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (result) { 
		result.value = textvalue;
	}

}
function updateVillage(villageName) {
	if (villageName == "") {
		var result = document.evaluate("//input[@name='dname']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		result.value = "";
		result = document.evaluate("//input[@name='x']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		result.value = "";
		result = document.evaluate("//input[@name='y']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		result.value = "";
	}

	var result = document.evaluate("//input[@name='dname']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (result) { 
		result.value = villageName;
	}
	
	var villageList = getVillages();
	for (var j=0; j < villageList.length;j++) {
		var temp = villageList[j].split('|');
		var vlName = temp[0];
		if ( vlName == villageName ) {
			result = document.evaluate("//input[@name='x']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (result) { 
				result.value = temp[1];
			}

			result = document.evaluate("//input[@name='y']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (result) { 
				result.value = temp[2];
			}
		}
	}

}

function addOffer(textName) {
	result = document.evaluate("//input[@name='" + textName + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
 	if (result) {
		var selectBox = document.createElement('select');	
		selectBox.className = "dropdown";
		selectBox.options[0]=new Option("", "");
		selectBox.options[1]=new Option("500", "500");
		selectBox.options[2]=new Option("1000", "1000");
		selectBox.options[3]=new Option("1500", "1500");
		selectBox.options[4]=new Option("2000", "2000");
		selectBox.options[5]=new Option("2500", "2500");
		selectBox.addEventListener('change', function() { updateText(textName, this.value);	}, 0);
		result.parentNode.appendChild(selectBox);
	}
}

function addMechant(textName) {
	result = document.evaluate("//input[@name='" + textName + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
 	if (result) {
		var selectBox = document.createElement('select');	
		selectBox.className = "dropdown";
		selectBox.options[0]=new Option("", "");
		selectBox.options[1]=new Option("1200", "1200");
		selectBox.options[2]=new Option("2400", "2400");
		selectBox.options[3]=new Option("3600", "3600");
		selectBox.options[4]=new Option("4800", "4800");
		selectBox.options[5]=new Option("6000", "6000");
		selectBox.options[6]=new Option("7200", "7200");
		selectBox.options[7]=new Option("8400", "8400");
		selectBox.options[8]=new Option("9600", "9600");
		selectBox.options[9]=new Option("10800", "10800");
		selectBox.options[10]=new Option("12000", "12000");
		selectBox.options[11]=new Option("24000", "24000");
		selectBox.addEventListener('change', function() { updateText(textName, this.value);	}, 0);
		result.parentNode.appendChild(selectBox);
	}
}



function addVillage(textName) {
	var villageList = getVillages();

	result = document.evaluate("//input[@name='" + textName + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
	if (result) {
		var selectBox = document.createElement('select');	
		selectBox.className = "dropdown";

		selectBox.options[0]=new Option("", ""); 

		for(var i=0; i<villageList.length; i++) {
			var temp = villageList[i].split('|');
			selectBox.options[i+1]=new Option(temp[0], temp[0]);
		}
		selectBox.addEventListener('change', function() { updateVillage(this.value);	}, 0);
		result.parentNode.appendChild(selectBox);
	}
}




function marketoffer() {
	addOffer("m1");
	addOffer("m2");
	addMechant("r1");
	addMechant("r2");
	addMechant("r3");
	addMechant("r4");
	addVillage("dname");
}

function getVillages() {
	var villageList = [];
	var rows = document.getElementById("vlist").rows;
    	for(var i=1; i<rows.length; i++) {

		var vlname = rows[i].cells[1];		
		var vlxy = rows[i].cells[2];
		// GM_log("Row" + i + " out of " + rows.length + " -->" + vlxy.innerHTML);
		var temp = xpathToFirstFound("div/a[contains(@href, 'newdid')]", vlname);
		var VILLAGENAME = temp.innerHTML;
		temp = xpathToFirstFound("div[@class='cox']", vlxy);
		var X = temp.innerHTML.substring(1, temp.innerHTML.length)
		temp = xpathToFirstFound("div[@class='coy']", vlxy);
		var Y = temp.innerHTML.substring(0, temp.innerHTML.length -1)
			if (X) {
				villageList[i-1] = VILLAGENAME+ "|" + X + "|" + Y;
				// GM_log("VILLAGE " + villageList[i-1]);
			}		
	}
	return villageList;
}

function xpathToList(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

 
mainmenu();

// market, offer
//if (document.URL.indexOf('build.php?id=33&t=2') > -1 ) {
if (document.URL.indexOf('build.php') > -1 ) {
	marketoffer();
}
if (document.URL.indexOf('a2b.php') > -1 ) {
	addVillage("dname");
}

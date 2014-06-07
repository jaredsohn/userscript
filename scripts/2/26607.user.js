// ==UserScript==
// @author      Ben
// @namespace	http://userscripts.org/
// @name	Travian Totally Spies
// @description	Send spies to a village from karte page with one right click
// @include     http://s*.travian.*/karte.php*
// @include     http://s*.travian3.*/karte.php*
// @include     http://welt*.travian.*/karte.php*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// ==/UserScript==


/*********************************************************/
//Part of the code was taken or inspired by the scripts
//Travian: Resource++ v4
//Travian Task Queue


// TODO : Add possibility to block certain villages (red), and to privilege others (green)

/*********************************************************/
// Settings you can modify

var iScoutMode = "1"; //1 is "Spy troops and resources" 2 is "Spy troops and defences"	
var numberOfSpies = "0";
var tsTribe;

/*********************************************************/
// General variables you should not modify
var activeVillageNumber = 0;

/*********************************************************/
//launch main function after doc is loaded
window.addEventListener('load', loadTotallySpies, true);

//main function
function loadTotallySpies() {
	_log(3, "-> loadTotallySpies()");
	
	GM_registerMenuCommand("Travian Totally Spies set options", displayOptionBox);
	tsTribe = getOption("tsTribe", "undefined");
	numberOfSpies = getOption("numberOfSpies", "1");
	
	_log(2, "Tribe is set to " + tsTribe);
	_log(2, "Number of Spies is set to " + numberOfSpies);
	
	createMouseEvents();
	
	_log(3, "<- loadTotallySpies()");
}

function createMouseEvents() {
	_log(3, "<- createMouseEvents()");
	
	var karteMap = document.getElementById("karte");

	for (var i = 0; i < 49; ++i) {
		var karteArea = karteMap.childNodes[i];
		karteArea.addEventListener("contextmenu",
		function(e) {
			sendSpies(this.href.split("=")[1].split("&")[0]);
			e.preventDefault();
		},
		false);

	}

	_log(3, "-> createMouseEvents()");
}

function sendSpies(villageTarget) {

	_log(3, "triger sendSpies(" + villageTarget + ")");
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", "a2b.php?z=" + villageTarget, true);
	httpRequest.onreadystatechange = function() {
		firstCallBack(httpRequest, villageTarget);
	};

	httpRequest.send(null);
}

function firstCallBack(httpRequest, villageTarget) {
	_log(3, "-> firstCallBack(" + villageTarget + ")");

	if (httpRequest.readyState == 4 && httpRequest.status == 200) { // ok				
		var sResponse = httpRequest.responseText;

		if (!sResponse) { // error retrieving the response				
			_log(1, "firstCallBack : We didn't get any response. No attack will be sent.");

			alert("Error : Could not send spies to the village.");
			return;
		}

		_log(2, "firstCallBack : Received response.");

		_log(3, sResponse);

		var coordonates = getCoordonates(sResponse);

		followWithAttack(coordonates, villageTarget);

	}

	_log(3, " <- firstCallBack()");
}

function getCoordonates(sResponse) {

	var x = 0,
	y = 0;
	x = sResponse.split('<input class="fm" type="Text" name="x" value="')[1].split('" size="2"')[0];
	y = sResponse.split('<input class="fm" type="Text" name="y" value="')[1].split('" size="2"')[0];

	_log(2, "coordonates = " + x + " " + y);

	return [x, y];
}

function followWithAttack(coordonates, villageTarget) {

	_log(3, "-> followWithAttack(" + villageTarget + ")");

	var sParams = "z=" + villageTarget;
	sParams += "&b=1";
	if(tsTribe=="gaul")
	sParams += "&t1=&t2=&t3=" + numberOfSpies + "&t4=&t5=&t6=&t7=&t8=&t9=&t10=&t11=";
	else if (tsTribe=="roman" || tsTribe=="teuton")
	sParams += "&t1=&t2=&t3=&t4=" + numberOfSpies + "&t5=&t6=&t7=&t8=&t9=&t10=&t11=";
	else {
	_log(1, "Error : inexistant tribe set to " + tsTribe);
	return;
	}
	sParams += "&c=3";
	sParams += "&dname=";
	sParams += "&x=" + coordonates[0] + "&y=" + coordonates[1];

	_log(3, "followWithAttack sParams\n" + sParams);

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		secondCallBack(httpRequest, villageTarget);
	};
	sParams = encodeURI(sParams);
	httpRequest.open("POST", "a2b.php", true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", sParams.length);
	httpRequest.setRequestHeader("Connection", "close");
	httpRequest.overrideMimeType("application/xhtml+xml");
	httpRequest.send(sParams);

	_log(3, "<- followWithAttack(" + villageTarget + ")");
}

function secondCallBack(httpRequest, villageTarget) {

	_log(3, "-> secondCallBack(" + villageTarget + ")");

	if (httpRequest.readyState == 4 && httpRequest.status == 200) { // ok				
		var sResponse = httpRequest.responseText;

		if (!sResponse) { // error retrieving the response				
			_log(1, "secondCallBack : We didn't get any response. No attack will be sent.");

			alert("Error : Could not send spies to the village.");
			return;
		}

		_log(2, "secondCallBack : Received response.");

		_log(3, sResponse);

		if (!checkResponse(sResponse)) {
			return;
		}
		updateResultTable(sResponse);

		finnishAttack(sResponse, villageTarget);

	}
	_log(3, " <- secondCallBack()");

}

function checkResponse(sResponse) {

	var errorMessage = sResponse.split('<div class="f10 e b">');

	if (errorMessage[1] && errorMessage[1] != "") {

		errorMessage = errorMessage[1].split('</div>')[0];

		_log(1, "checkResponse errorMessage = " + errorMessage);

		alert(errorMessage);
		return false;

	}
	return true;

}

function finnishAttack(sResponse, villageTarget) {

	_log(3, "-> finnishAttack(" + villageTarget + ")");

	var valueOfA = getValueOfA(sResponse);

	var sParams = "id=39&c=3&kid=" + villageTarget + "&a=" + valueOfA;
	if(tsTribe=="gaul")
	sParams += "&t1=0&t2=0&t3=" + numberOfSpies + "&t4=0&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0";
	else if (tsTribe=="roman" || tsTribe=="teuton")
	sParams += "&t1=0&t2=0&t3=0&t4=" + numberOfSpies + "&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0";
	
	else {
	_log(1, "Error : inexistant tribe set to " + tsTribe);
	return;
	}
	sParams += "&spy=" + iScoutMode;

	_log(3, "finnishAttack sParams\n" + sParams);

	sParams = encodeURI(sParams);

	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function() {
		thirdCallBack(httpRequest, villageTarget)
	};

	httpRequest.open("POST", "a2b.php", true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", sParams.length);
	httpRequest.setRequestHeader("Connection", "close");
	httpRequest.overrideMimeType("application/xhtml+xml");
	httpRequest.send(sParams);

	_log(2, "The attack on " + villageTarget + " was requested.");

	_log(3, " <- finnishAttack()");

}

function thirdCallBack(httpRequest, villageTarget) {

	_log(3, "-> thirdCallBack(" + villageTarget + ")");

	if (httpRequest.readyState == 4 && httpRequest.status == 200) { // ok
		var sResponse = httpRequest.responseText;

		if (!sResponse) { // error retrieving the response				
			_log(1, "thirdCallBack : We didn't get any response. Impossible to determine whether the attack was sent.");

			alert("Error : Verify that the spies have been sent to the village.");
			return;
		}

		_log(2, "thirdCallBack : Received response.");

		_log(3, sResponse);

		var re = new RegExp('<a href="warsim.php">', 'i'); //Is it the page whith the war simulator link? if yes then ok
		if (re.test(sResponse)) {

			_log(1, "It seems your attack was successfully sent.");

		} else {

			_log(1, "Your attack could not be sent.");

			alert("Error: No spies were sent.Do you have any spy left ? ");

		}

	}
	_log(3, "<- thirdCallBack()");

}

function getValueOfA(sResponse) {

	var a = 0;

	a = sResponse.split('<input type="hidden" name="a" value="')[1].split('">')[0];

	_log(2, "valueOfA = " + a);

	return a;

}

function createResultTable() {

	_log(3, "-> createResultTable()");
	var centralDiv = document.getElementById("lmid1");
	var resultDiv = document.createElement('div');
	resultDiv.setAttribute('style', 'position:relative; width:500px; top:20px; clear:both;');

	resultDiv.innerHTML = '<div class="f10 b">Spying missions:</div><table id="resultTable" width="100%" class="f10"></table>';

	centralDiv.appendChild(resultDiv);

	_log(3, "<- createResultTable()");

}

function updateResultTable(sResponse) {

	_log(3, " -> updateResultTable()");
	var result = sResponse.split(new RegExp("</?h1>", "gi"))[1];
	var resultLink = sResponse.split('<a href="karte.php?')[1].split('">')[0];

	_log(2, result + " @ " + resultLink);

	var resultTable = document.getElementById("resultTable");
	if (!resultTable) {
		createResultTable();
		resultTable = document.getElementById("resultTable");

	}
	var newResultTableRow = document.createElement('tr');
	newResultTableRow.innerHTML = '<td><a href="karte.php?' + resultLink + '>' + result + '</a></td>';
	resultTable.insertBefore(newResultTableRow, resultTable.firstChild);

	_log(3, " <- updateResultTable()");
}



function displayOptionBox() {

	_log(3, "-> displayOptionBox()");

	var optionBoxWidth = 200;

	//Let's make the table itself
	var optionBox = document.createElement('table');
	optionBox.id = 'optionBox';
	optionBox.setAttribute('style', 'z-index:100;clear:both;position:absolute;top:100px;left:100px;width:' + optionBoxWidth + 'px;');
	optionBox.setAttribute('cellspacing', 1);
	optionBox.setAttribute('cellpadding', 1);
	optionBox.className = 'tbg';

	//Let's make the table header
	optionBox.appendChild(document.createElement('tHead'));
	optionBox.tHead.innerHTML = "<tr><td class='rbg'>Totally Spies Options</td></tr>";

	//Let's make the table body

	optionBox.appendChild(document.createElement('tbody'));
	optionBox.tBodies[0].innerHTML = '<tr><td>Set your Tribe <br><input type="radio" name="tsTribe" value="roman" ' + (tsTribe == "roman" ? "checked": "") + '><img class="unit" src="img/un/u/9.gif" border="0" title="Roman"><input type="radio" name="tsTribe" value="teuton" ' + (tsTribe == "teuton" ? "checked": "false") + '><img class="unit" src="img/un/u/19.gif" border="0" title="Teutons"><input type="radio" name="tsTribe" value="gaul" ' + (tsTribe == "gaul" ? "checked": "") + '><img class="unit" src="img/un/u/29.gif" border="0" title="Gauls"></td></tr>'
					 + '<tr><td>Set number of spies to send on each mission <input type="text" name="numberOfSpies" class="fm" size="4" value="' + numberOfSpies + '"></td></tr>' + '<tr><td></td></tr>';
	
	var saveButton = document.createElement('input');
	saveButton.type = "submit";
	saveButton.value = "Save";
	saveButton.width = "80";
	saveButton.height = "20";
	saveButton.addEventListener("click", saveOptions, true);

	optionBox.tBodies[0].rows[2].cells[0].appendChild(saveButton);

	document.body.appendChild(optionBox);

	_log(3, "<- displayOptionBox()");
}

function saveOptions() {

	_log(3, "-> saveOptions()");
	
	var tsTribes = document.getElementsByName("tsTribe");
	
	for (var i = 0; i < tsTribes.length; ++i) {
		if (tsTribes[i].checked) tsTribe = tsTribes[i].value;
	}

	setOption("tsTribe", tsTribe);

	numberOfSpies = (document.getElementsByName("numberOfSpies")[0]).value;

	setOption("numberOfSpies", numberOfSpies);

	_log(2, "Tribe is set to " + tsTribe);
	_log(2, "Number of Spies is set to " + numberOfSpies);

	document.body.removeChild(document.getElementById("optionBox"));

	_log(3, "<- saveOptions()");
}

function setOption(key, value) {
	key = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + key;
	GM_setValue(key, value);
}
function getOption(key, value) {
	key = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + key;
	return GM_getValue(key, value);
}

/*********************************************************/
//Logging functions from Risi of http://userscripts.org/

var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) GM_log(msg);
}
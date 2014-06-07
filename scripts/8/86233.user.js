// ==UserScript==
// @name           Send mutiple spys
// @namespace      SendMutipleSpys
// @description    Replaces the 'send spy'-link to send more than 1 spy at a once to the same city
// @include        http://*.ikariam.*/index.php?view=sendSpy&destinationCityId=*&islandId=*
// @require        http://home.arcor.de/tvbwsrtt/577user.js
// @author         El Nino
// @version        1.04
//
// @history        1.04 Changed the link to include the external script to a secure local copy of it to prevent further malicious mass infections from other users scripts
// @history        1.03 Fixed name and namespace tags
// @history        1.02 Changed code to ensure an serial script execution so that 10/10, 5/5 , ... spies are actually sent
// @history        1.01 ScriptUpdater added
// @history        1.00 Initial release
//
// ==/UserScript==


ScriptUpdater.check(86233, "1.04");


var gameServer = top.location.host;


sendOneSpy = function(sendingIDs, id, nr, adress) {
	var buttonid = 'button' + id;
	var spyNr = id - nr + 1;
	document.getElementById(buttonid).firstChild.data = 'Sending No. ' + spyNr;
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://' + gameServer + '/index.php?' + sendingIDs,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			//var content = response.responseText;
			nr -= 1;
			if (nr >= 1) {
				receiveNewIDs(id, nr, adress);
			}
			if (nr == 0) {
				top.location.href = targetLink;
			}
		}
	});
};
receiveNewIDs = function(id, nr, adress) {
	GM_xmlhttpRequest({
		method:'GET',
		url: adress,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php', 
			'Cookie': document.cookie
		},
		onload: function(response) {
			var content = response.responseText;
			try {
				var newID = ((content.split('class="centerButton"')[1]).split('href="')[1]).split('"')[0];
				sendOneSpy(newID, id, nr, adress);
			} catch (err) {
				//alert(err);
			}
		}
	});
};
buttons = function(nr, text, appObject) {
	var newButton = document.createElement('a');
	newButton.className = 'button';
	newButton.id = 'button' + nr;
	var newLinkText = document.createTextNode(text + ' x ' + nr);
	newButton.appendChild(newLinkText);

	appObject[0].insertBefore(newButton, appObject[0].firstChild);
};


// START
var currentAdress = top.location.href;
var appendingObject = document.getElementsByClassName('centerButton');
var sendSpyText = appendingObject[0].getElementsByTagName('a')[0].text;
var sendSpyAdress = appendingObject[0].getElementsByTagName('a')[0].href;

// creating traget adress
var traget = currentAdress.split('&')[2];
var islandId = traget.split('=')[1];
var targetLink = 'http://' + gameServer + '/index.php?view=island&id=' + islandId;


// hide original button
var nodeToChange = appendingObject[0].getElementsByTagName('a')[0];
nodeToChange.id = 'buttonOriginal';
GM_addStyle('#buttonOriginal { display: none }');


// creating new buttons
buttons(10, sendSpyText, appendingObject);
buttons(5, sendSpyText, appendingObject);
buttons(3, sendSpyText, appendingObject);
buttons(2, sendSpyText, appendingObject);
buttons(1, sendSpyText, appendingObject);

document.getElementById('button1').addEventListener('click', function(e) {sendOneSpy(sendSpyAdress, 1, 1, currentAdress); e.preventDefault();}, false);
document.getElementById('button2').addEventListener('click', function(e) {sendOneSpy(sendSpyAdress,2, 2, currentAdress); e.preventDefault();}, false);
document.getElementById('button3').addEventListener('click', function(e) {sendOneSpy(sendSpyAdress,3, 3, currentAdress); e.preventDefault();}, false);
document.getElementById('button5').addEventListener('click', function(e) {sendOneSpy(sendSpyAdress,5, 5, currentAdress); e.preventDefault();}, false);
document.getElementById('button10').addEventListener('click', function(e) {sendOneSpy(sendSpyAdress,10, 10, currentAdress); e.preventDefault();}, false);


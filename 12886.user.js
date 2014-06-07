// ==UserScript==
// @name           Preview eH Profile
// @include        http://www.eharmony.com/singles/servlet/user/aboutme/info
// @description    See how your eHarmony profile looks to others.  The preview is just text, so it's easy to copy/paste or print.
// ==/UserScript==
//
// Copyright (c) 2007, Kevin J. Scott (http://kevinjscott.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================


window.addEventListener("load", function(e) {
	var newDiv = document.createElement('div');
	newDiv.innerHTML = "<div id='clickToClean' style='width: 200px; border: solid; border-color: silver; padding: 5px; margin: 2px; color: white; background: blue; font-weight: bold; text-align: center; '>Preview profile</div>";
	var someNode = document.getElementById('infobar');
	someNode.parentNode.insertBefore(newDiv, someNode.nextSibling);
	newDiv.addEventListener('click', cleanit, true);
	}, false);


window.addHeading = function(str){
	var newDiv = document.createElement('div');
	newDiv.innerHTML = "<div style='font-weight: bold; text-align: left; '>" + str + "</div>";
	document.body.appendChild(newDiv);
	}


window.addResponse = function(str){
	var newDiv = document.createElement('div');
	newDiv.innerHTML = "<div style='font-weight: normal; text-align: left; '>* " + str + "</div>";
	document.body.appendChild(newDiv);
	}

window.addBR = function(){
	document.body.appendChild(document.createElement('br'));
	}

window.cleanit = function(){
	try {
		someNode = document.getElementById('announcementBox').parentNode.parentNode.parentNode.parentNode;
		someNode.parentNode.removeChild(someNode);
		}
	catch (err) {}

	try {
		someNode = document.getElementsByTagName('table')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('div')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('div')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('div')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('div')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('br')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('br')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('br')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('tr')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0];
		someNode.parentNode.removeChild(someNode);

		var theQnATable = document.getElementsByTagName('table')[2];

		addHeading("Occupation:");
		someNode = document.evaluate("//input[@name='occupation']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		addResponse(someNode.value);
		addBR();

		addHeading("Height:");
		someNode = document.evaluate("//input[@name='feet']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		strTemp = someNode.value + "' "
		someNode = document.evaluate("//input[@name='inches']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		addResponse(strTemp + someNode.value + '"');
		addBR();

		addHeading("The one thing I am most passionate about:");
		someNode = document.evaluate("tbody/tr/td[2]", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		addResponse(someNode.textContent);
		addBR();

		addHeading("The three things which I am most thankful for:");
		someNode = document.evaluate("tbody/tr[4]/td[2]/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		addResponse(someNode.value);
		someNode = document.evaluate("tbody/tr[4]/td[2]/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
		addResponse(someNode.value);
		someNode = document.evaluate("tbody/tr[4]/td[2]/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);
		addResponse(someNode.value);
		addBR();

		addHeading("The most influential person in my life has been:");
		someNode = document.evaluate("tbody/tr/td[2]", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);
		addResponse(someNode.textContent);
		addBR();

		addHeading("My friends describe me as");
		someNode = document.evaluate("tbody/tr[8]/td[2]/li", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		addResponse(someNode.textContent);
		someNode = document.evaluate("tbody/tr[8]/td[2]/li", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
		addResponse(someNode.textContent);
		someNode = document.evaluate("tbody/tr[8]/td[2]/li", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);
		addResponse(someNode.textContent);
		someNode = document.evaluate("tbody/tr[8]/td[2]/li", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(3);
		addResponse(someNode.textContent);
		addBR();

		addHeading("Three of my best life-skills are:");
		someNode = document.evaluate("tbody/tr[10]/td[2]/li", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		addResponse(someNode.textContent);
		someNode = document.evaluate("tbody/tr[10]/td[2]/li", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
		addResponse(someNode.textContent);
		someNode = document.evaluate("tbody/tr[10]/td[2]/li", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);
		addResponse(someNode.textContent);
		addBR();

		addHeading("The most important thing I'm looking for in a person is:");
		someNode = document.evaluate("//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);
		addResponse(someNode.textContent);
		addBR();

		addHeading("The first thing you'll probably notice about me when you meet me:");
		someNode = document.evaluate("//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(3);
		addResponse(someNode.textContent);
		addBR();

		addHeading("The one thing I wish MORE people would notice about me is:");
		someNode = document.evaluate("//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(4);
		addResponse(someNode.textContent);
		addBR();

		addHeading("I typically spend my leisure time:");
		someNode = document.evaluate("//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(5);
		addResponse(someNode.textContent);
		addBR();

		addHeading("The things I can't live without are:");
		someNode = document.evaluate("tbody/tr[20]/td[2]/table/tbody/tr/td/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		addResponse(someNode.value);
		someNode = document.evaluate("tbody/tr[20]/td[2]/table/tbody/tr/td/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
		addResponse(someNode.value);
		someNode = document.evaluate("tbody/tr[20]/td[2]/table/tbody/tr/td/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2);
		addResponse(someNode.value);
		someNode = document.evaluate("tbody/tr[20]/td[2]/table/tbody/tr/td/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(3);
		addResponse(someNode.value);
		someNode = document.evaluate("tbody/tr[20]/td[2]/table/tbody/tr/td/input", theQnATable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(4);
		addResponse(someNode.value);
		addBR();

		addHeading("The last book I read and enjoyed:");
		someNode = document.evaluate("//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(6);
		addResponse(someNode.textContent);
		addBR();

		addHeading("One thing that only my best friends know is:");
		someNode = document.evaluate("//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(7);
		addResponse(someNode.textContent);
		addBR();

		addHeading("Some additional information I wanted you to know is:");
		someNode = document.evaluate("//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(8);
		addResponse(someNode.textContent);
		addBR();

		someNode = document.getElementsByTagName('table')[0];
		someNode.parentNode.removeChild(someNode);

		someNode = document.getElementsByTagName('div')[0];
		someNode.parentNode.removeChild(someNode);

		}
	catch (err) {
		alert("Something went wrong with the 'Preview eH Profile' Greasemonkey script.  It's likely that the eHarmony profile page layout has changed and this has confused the preview script.");
		alert("When you close this dialog box, you will be directed to the script's home page.  Please click on 'Preview eH Profile', then post a comment asking someone to fix/update the script.");
		window.location = "http://userscripts.org/scripts/search?q=preview+eh+profile"
		}
	}

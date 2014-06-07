// ==UserScript==
// @name         Display GWO Experiment Number
// @namespace    gwoExperimentNumber
// @include      https://www.google.com/analytics/siteopt/settings?*
// @datecreated  2010-03-05
// @lastupdated  2010-03-05
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript displays the experiment number on the experiment settings page to help users identify the scripts used for the test.
// ==/UserScript==

(function(doc){
	var inTable = doc.evaluate("//tr/td/strong[contains(text(),'Experiment Notes:')]",doc,null,9,null).singleNodeValue;
	if(!inTable) return;
	inTable = inTable.parentNode.parentNode.parentNode;

	var location = document.location.href.replace("https://www.google.com/analytics/siteopt/settings","https://www.google.com/analytics/siteopt/installcode"),
		req = new XMLHttpRequest();

	req.open('GET', location, true);
	req.onreadystatechange = function (e) {
		if (req.readyState != 4 || req.status != 200) return;

		var num = /\/(\d+)\/(?:test|goal)/i.exec(req.responseText);
		if(num) num = num[1];

		var newTr = doc.createElement("tr"),
			newTd1 = doc.createElement("td"),
			newTd2 = doc.createElement("td"),
			newStrong = doc.createElement("strong");

		newTr.appendChild(newTd1).appendChild(newStrong).innerHTML = "Experiment Number:";
		newTr.appendChild(newTd2).innerHTML = num;
		newTr.setAttribute("class","dashed_top");
		newTr.setAttribute("valign","top");

		inTable.appendChild(newTr);
	};
	req.send(null);
})(document);
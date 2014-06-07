// ==UserScript==
// @name           Thanachart Fund NAV Percent Change
// @namespace      greasedev.com
// @include        http://www.thanachartfund.com/th/of/of2_NAVHistory.asp*
// ==/UserScript==

var elmFirstResult = document.evaluate("//table[@class='thai14px']//tr", document,
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var elmNewTd = document.createElement('td');
elmNewTd.setAttribute("align", "center");
elmNewTd.appendChild(document.createTextNode("% Change"));
elmFirstResult.appendChild(elmNewTd);

var snapResults = document.evaluate("//table[@class='thai14px']//tr",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 1; i < snapResults.snapshotLength; i++) {
	var elm = snapResults.snapshotItem(i);

	var nav = parseFloat(elm.childNodes[5].textContent);
	var change = parseFloat(elm.childNodes[7].textContent);		

	var previousNav = nav - change;

	var percentChange = (change/previousNav*100).toFixed(4);

	var elmNewTd = document.createElement('td');
	elmNewTd.setAttribute("align", "center");
	elmNewTd.appendChild(document.createTextNode(percentChange));
	elm.appendChild(elmNewTd);
}

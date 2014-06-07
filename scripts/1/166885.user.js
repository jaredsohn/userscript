// ==UserScript==
// @name         wg-gesucht improved
// @version      1.1.1
// @description  wg-gesucht improved
// @author       w177us
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js 
// @include      http://www.wg-gesucht.de/*
// @include      https://www.wg-gesucht.de/*
// ==/UserScript==

// Remove these annoying ImmobilienScout24 fake entries
////////////////////////////////////////////////////////

var list = document.evaluate("//table[@class='liste']/tbody/tr[not(contains(@id, 'ad-'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 1; i < list.snapshotLength; i++) {
	var tr = list.snapshotItem(i);	
	tr.parentNode.removeChild(tr);
}

// Now calculate square meter prices and colorize them
///////////////////////////////////////////////////////

// Adjust the right most border a bit for our new column...
$('.liste').css({ width: '850px' });
$('#td_2spalten_content').css({ width: '850px' })

// Also add a new column header
rentTh = $('th.ang_spalte_miete')[0];                                               // find related <th>
newEurSqmTh = rentTh.cloneNode(true);                                               // create clone of related <th>
newEurSqmTh.replaceChild(newEurSqmTh.firstChild.firstChild, newEurSqmTh.firstChild) // strip <a> element from clone (sorting impossible on server side)
newEurSqmTh.firstChild.textContent = "Quadratmeterpreis";                           // fix text in clone
rentTh.parentNode.insertBefore(newEurSqmTh, rentTh);                                // insert clone

// Calculate prices for each row
var rentTds = document.evaluate("//td[@class='ang_spalte_miete']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < rentTds.snapshotLength; i++) {
	var rentTd = rentTds.snapshotItem(i);
	var parentTr = rentTd.parentNode;
	
	// Read Size
	var sizeTextField = document.evaluate("td[@class='ang_spalte_groesse']/a/text()", parentTr, null, XPathResult.STRING_TYPE, null);
	var size = sizeTextField.stringValue.trim().split(' ')[0];

	// Read Price
	var priceTextField = document.evaluate("td[@class='ang_spalte_miete']/div/a/b/text()", parentTr, null, XPathResult.STRING_TYPE, null);
	var price = priceTextField.stringValue.trim().split(' ')[0];

	// Calculate Ratio
	var ratio = price / size;
	var ratioText = ratio.toFixed(2) + ' €/m²';

	// Create new Td Node
	var newEurSqmTd = document.createElement('td');
    
	// Create new Span Node ...
	var spanNode = document.createElement("span");

	// ... for this color
	var color = "Black";
	if (ratio <= 20)
		color = "DarkGreen";
	else if (ratio > 20 && ratio <= 25)
		color = "Olive";
	else if (ratio > 25 && ratio <= 30)
		color = "OrangeRed";
	else if (ratio > 30)
		color = "Red";

	// ... with span style Attribute
	var styleAttribute = document.createAttribute("style");
	styleAttribute.nodeValue = 'color: ' + color + ';  font-weight:bold';
	spanNode.setAttributeNode(styleAttribute);
	
	// Create new Text Node
	var ratioTextNode = document.createTextNode(ratioText);

	// Assemble new elements ...
	spanNode.appendChild(ratioTextNode);
	newEurSqmTd.appendChild(spanNode);
    
	// ... and insert everything into the page
	parentTr.insertBefore(newEurSqmTd, rentTd);
}

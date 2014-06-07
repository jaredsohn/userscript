// ==UserScript==
// @name           RKO Arranger Search
// @namespace      http://www.maeki.org
// @description    Turns arranger mail links into search links for that arranger.
// @include        http://remix.kwed.org/*
// ==/UserScript==

function deAccentify (aName) {
	var daName = aName;
	daName = daName.replace(/é/g, 'e');
	daName = daName.replace(/á/g, 'a');
	daName = daName.replace(/ä/g, 'a');
  daName = daName.replace(/õ/g, 'o');
  daName = daName.replace(/ö/g, 'o');
  daName = daName.replace(/ü/g, 'u');
  daName = daName.replace(/_/g, ' ');
  return daName;
}

function xpath(node, expr) {
	var resultSet =  document.evaluate(expr, node, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var found = [];
	var res;
	for (var i = 0; i < resultSet.snapshotLength; i++) {
		found.push(resultSet.snapshotItem(i));
	}
	return found;
}

var centerDiv, allLinks, thisLink;

centerDiv = xpath (document, '//div[@class="centerContents"]')[0];

allLinks = xpath(centerDiv, '//table/tbody/tr/td/a[@href]');
 
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    if (thisLink.href.match(/ArrangerMail\('\d+'\)/))
    	{
    		var arrName = thisLink.innerHTML.match(/[:-_.0-9A-ZÅÄÖa-zåäöáéõü ]+/).toString();
    		arrName = deAccentify(arrName);
    		
    		var collabNameMatch, collabName, collabSearchName;
    		
    		collabNameMatch = thisLink.innerHTML.match(/&amp; ([:-_.0-9A-ZÅÄÖa-zåäöáéõü ]+)/);
    		if (collabNameMatch)
    		{
    			collabName = collabNameMatch[1];
    		}
    		
    		collabSearchName = collabName;
    		if (collabName)	
    		{
    			collabSearchName = deAccentify(collabSearchName);
    		}
    		
    				thisLink.href = 'index.php?search=' + escape(arrName);	
    				if (collabName)
    				{
    					var newElement = document.createElement('a');
    					newElement.href = 'index.php?search=' + escape(collabSearchName);
    					newElement.innerHTML = thisLink.innerHTML.match(/&amp;.*/);
    					thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
    					thisLink.innerHTML = thisLink.innerHTML.replace (/&amp;.*/, '');
    				}    			
    	}
}
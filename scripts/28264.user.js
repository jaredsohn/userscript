// ==UserScript==
// @name            Travian Quick Report v1.4b
// @author          mikrop
// @include         http://s*.travian.*/berichte.php*
// @include         http://s*.travian.*/nachrichten.php*
// @include         http://s*.travian.*/allianz.php?s=3
// @include         http://s*.travian.*/karte.php?d=*&c=*
// @version         Latest version 1.4b
// @description		CZ: Script slouzi pro rychlejsi prochazeni hlaseni a vojenskych udalosti
// @description		EN: This script provides to quick passing reports and troop events        
// ==/UserScript==

//-- constants --

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var URL = { BERICHTE: 'BERICHTE', NACHRICHTEN: 'NACHRICHTEN', ALLIANZ: 'ALLIANZ', KARTE: 'KARTE' };
var urlResult = urlResult();
var XPTbgTab = ".//table[contains(@class, 'tbg')]";

//---------------

function find(xpath, xpres) {
    var ret = document.evaluate(xpath, document, null, xpres, null);
    return (xpres) == XPFirst ? ret.singleNodeValue : ret;
}

function urlResult() {
	
	if (location.href.indexOf('berichte.php') != -1) {
		return (URL.BERICHTE);
	} else if (location.href.indexOf('nachrichten.php') != -1) {
		return (URL.NACHRICHTEN);
	} else if (location.href.indexOf('allianz.php') != -1) {
		return (URL.ALLIANZ);
	} else if (location.href.indexOf('karte.php') != -1) {
		return (URL.KARTE);
	}
	
}

/**
 * Podle urlResult priradi hodnotu definovanemu attributu v poradi
 * var attributesArray = new Array(URL.BERICHTE, URL.NACHRICHTEN, URL.ALLIANZ, URL.KARTE);
 * 
 * @param {Object} attributesArray
 */
function setObjectAttribute(attributesArray) {

	var attribute = null;
	switch (urlResult) {
		case URL.BERICHTE:
	  		attribute = attributesArray[0]; 
			break;
		case URL.NACHRICHTEN:
			attribute = attributesArray[1];
		  	break;
		case URL.ALLIANZ:
			attribute = attributesArray[2];
		  	break;
		case URL.KARTE:
		  	attribute = attributesArray[3];
			break;
		default:
		  	GM_log('Nastaveni pro neznamou url');
			break;
	}
		
	return (attribute);

}

function xmlhttpRequest(url, anonymousFunction) {

    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
            'Accept': 'text/xml, text/html',
        },
        onload: function(response) {
			if (response.status == 200 || response.status == 304) {
				var tmp = window.document.createElement('div');
        			tmp.innerHTML = response.responseText;
				anonymousFunction(tmp);
			}
			else {
				GM_log('XML request error: ' + response.status);
			}	 	
        }
    });

}

function createReportElements(parent) {
	
	var elDivPaddingright = new Array('', '30px', '', '');
	var elDiv = window.document.createElement('div');
		elDiv.setAttribute('class', 'report');
		elDiv.style.paddingright = setObjectAttribute(elDivPaddingright);
		elDiv.style.textAlign = 'right';
		elDiv.style.minWidth = '350px';
		elDiv.style.display = 'none';
		
	var elTdColspan	= new Array(3, 4, 4, 0);
	var elTd = window.document.createElement('td');
		elTd.setAttribute('colspan', setObjectAttribute(elTdColspan));
		elTd.appendChild(elDiv);
		
	if (urlResult == URL.KARTE) {
		parent.parentNode.parentNode.parentNode.insertBefore(elTd, parent.nextSibling);
	} else {
		var elTr = window.document.createElement('tr');
		elTr.appendChild(elTd);
		parent.parentNode.insertBefore(elTr, parent.nextSibling);
	}
	
}

function resultXPTab(tmp) {
	
	var XPTabArray = new Array(XPTbgTab, ".//table[contains(@class, 'f10')]", XPTbgTab, XPTbgTab);
	var XPTab = setObjectAttribute(XPTabArray);
	var result = document.evaluate(XPTab, tmp, null, XPList, null);
	
	if (result.snapshotLength) {
		return (result.snapshotItem(0));	
	} else {
	  	return (null);
	}
	tmp = null;
	
}

function appendReportElement(i, tbgTab) {
	
	var sampleXp = ".//div[contains(@class, 'report')]"; 
	var result = find(sampleXp, XPList);
	
	var parentDiv = result.snapshotItem(i);
		parentDiv.appendChild(tbgTab);	
	
}

function myEventListener(parent, j, e, d) {
	
	parent.addEventListener(e, function(event) {
		var el = event.target;
		
		var elDiv = null;
		if (urlResult == URL.KARTE) {
			elDiv = el.parentNode.parentNode.parentNode.childNodes[(5 + j)].firstChild;
		} else {
			elDiv = el.parentNode.parentNode.nextSibling.firstChild.firstChild;	
		}
			elDiv.style.display = d;
			
	}, false);
	
}

function addReportListener(parent, j) {
	
	var objectEvents = { e: ['mouseover', 'mouseout'], d: ['block', 'none'] };
	for (var i = 0; i < 2; i++) {
		myEventListener(parent, j, objectEvents.e[i], objectEvents.d[i]);
    }	
	
}

(function() {

	var sampleXp = null;
	if (urlResult == URL.KARTE) {
		sampleXp = "//table[@class='f10']/tbody/tr/td[2]/li/a";
	} else {
		sampleXp = XPTbgTab + "/tbody/tr[not(@class='rbg' or @class='cbg1')]";	
	}
	var result = find(sampleXp, XPList);	
	
    if (result.snapshotLength) {

		var i = 0;
		for (j = 0; j < result.snapshotLength; j++) {
		
			var parent = result.snapshotItem(j);

			createReportElements(parent);
			
			var pageAnchor = null;
			if ((urlResult == URL.BERICHTE) || (urlResult == URL.ALLIANZ)) {
				pageAnchor = parent.childNodes[3].firstChild;
			} else if (urlResult == URL.NACHRICHTEN) {
				pageAnchor = parent.childNodes[2].firstChild;
			} else if (urlResult == URL.KARTE) {
				
				/* 
				 * Klicka, aby nedochazelo po zobrazeni reportu k odsunuti ostatnich odkazu a tim vyvolani 
				 * udalosti onMouseOut
				 */ 
				parent.parentNode.parentNode.style.verticalAlign = 'top';
				pageAnchor = parent;
				
			}
			
			addReportListener(pageAnchor, j);

			xmlhttpRequest(pageAnchor.href, function(tmp) {
				var XPTab = resultXPTab(tmp);
				appendReportElement(i++, XPTab);
			});

		}
		
	}	

})();

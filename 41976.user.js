// ==UserScript==
// @name           Spiegel-Online_MultiColumn_PureContent
// @namespace      http://www.ingmar-kellner.de
// @description    Makes articles on spiegel-online easier to read (similar to "real newspapers"):
//		   Displays the content of spiegel-online main pages in 2 columns
//                 and of articles in 2 or 3 columns depending on article size.
//                 Removes ads and other unnecessary elements.
//	           Optimized for a screen-resolution of 1680x1050 pix.
// @include        http://www.spiegel.de/*
// ==/UserScript==

//Update 2009-04-05:
//     - Top-area has now full width
//     - Small ads in top-area are now removed as well
//
//Update 2009-03-08: 
//     - Removed top graphic of articles
//     - Reduced line spacing
     
var columnCount = 2; 
var screenHeight = 550;

function removeElement(id) {
	var element = document.getElementById(id);
	if (element != null) {
		element.parentNode.removeChild(element);
	}
	element = null;
}

function removeElementsByTagName(tagName) {
  var elements = document.getElementsByTagName(tagName);
  for (var i=0; i< elements.length; i++) {
    	elements[i].parentNode.removeChild(elements[i]);
  }
}

function removeElementsByAttribute(elementType, attribute, attributeValue) {
	var elements = document.getElementsByTagName(elementType);
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].getAttribute(attribute).indexOf(attributeValue) > 0) {
			elements[i].parentNode.removeChild(elements[i]);
		}
	}
}


function removeElementByClass(class, isWildCard) {
	var xpath = "//*[starts-with(@class, '" + class + "')]";
	
	var elements = document.evaluate(xpath,
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < elements.snapshotLength; i++) {
		var element = elements.snapshotItem(i);
		element.parentNode.removeChild(element);
	}
	var elements = null;
}


function verticalScrollbarPresent() {
	var element = document.documentElement;
	element.scrollTop = 1;
	if (element.scrollTop > 0) {
		element.scrollTop = 0;
		return true;
	} else {
		return false;
	}
}

function removeElements(elementsArray, byClass) {
	for (var i=0; i < elementsArray.length; i++) {
		if (byClass) {
			removeElementByClass(elementsArray[i], true);
		} else {
			removeElement(elementsArray[i]);
		}
	}	
	
}

function printStyles() {
	for (var i = 0; i < document.styleSheets.length; i++) {
		styleSheet = document.styleSheets[i];
		for (var j = 0; j < styleSheet.cssRules.length; j++) {
			var cssText = styleSheet.cssRules[j].cssText;
			if ((cssText.match("#spMainContent") != null)
			   && (cssText.match("width")!= null)) 
			{
				//GM_log("stylesheet[" + i + "] rule [" + j + "]: " + styleSheet.cssRules[j].cssText);
				
			}
		}
		styleSheet = null;
	}
}

function replaceStyleRule(styleClass, oldCssAttribute, newCssAttribute) {
	for (var i = 0; i < document.styleSheets.length; i++) {
		styleSheet = document.styleSheets[i];
		for (var j = 0; j < styleSheet.cssRules.length; j++) {

			var cssText = styleSheet.cssRules[j].cssText;
			
			if (cssText.match(styleClass) != null && cssText.match(oldCssAttribute) != null)
			{
				cssText = cssText.replace(oldCssAttribute, newCssAttribute);
				
				styleSheet.deleteRule(j);
				styleSheet.insertRule(cssText, j);
			}
		}
		styleSheet = null;
	}
}

function deleteStyleRule(styleClass) {
	for (var i = 0; i < document.styleSheets.length; i++) {
		styleSheet = document.styleSheets[i];
		for (var j = 0; j < styleSheet.cssRules.length; j++) {
			var cssText = styleSheet.cssRules[j].cssText;
			if (cssText.match(styleClass) != null)
			{
				//GM_log("delete rule: " + cssText);
				document.styleSheets[i].deleteRule(j);
			}
		}
		styleSheet = null;
	}
}

function addStyleRule(styleClass, rule) {
	for (var i = 0; i < document.styleSheets.length; i++) {
		styleSheet = document.styleSheets[i];
		for (var j = 0; j < styleSheet.cssRules.length; j++) {
			var cssText = styleSheet.cssRules[j].cssText;
			var index = cssText.indexOf("{");
			if (index - styleClass.length > 2) {
				continue;
			}
			
			if (cssText.match(styleClass) != null)
			{
				var endIndex = cssText.lastIndexOf("}");
				
				cssText = cssText.substring(0, endIndex-1);
				
				cssText = cssText + rule + "}";
				styleSheet.deleteRule(j);
				styleSheet.insertRule(cssText, j);
				
			}
		}
		styleSheet = null;
	}
}

function isArticle() {
  //TODO
  var mainPages = new Array("wirtschaft",
                            "politik",
                            "panorama",
                            "sport",
                            "kultur",
                            "netzwelt",
                            "wissenschaft",
                            "");
  return true;
}

function removeStyleRule(styleSheet, rule) {
	
	document.styleSheets[styleSheet].deleteRule(rule);
}


function getAbsoluteFromPx(property) {
	return parseInt(property.substring(0, property.length - 2));
}

elementsToRemove = new Array(
        "eyeDiv",
	"spBreadcrumbLine",
	"spTopNavi",
	"spFooter",
	"spColumnAd",
	"spColumnRight",
  "qcTopBlocker"
);

elementsToRemoveByClass = new Array(
	"spContiHP1",
	"spPartnerBar",
	"spArticleCredit",
	"spRessortTeaserBoxBottom",
	"spAsset spAssetAlign",
	"spAsset spAssetAlignleft",
	"spTagbox spAssetAlignleft",
	"spAssetAlignleft",
	"spCommercial",
	"spDiscussBox",
	"spCommentBox spAssetAlignleft",
	"spKopfgrafik"
	
);

removeElements(elementsToRemove);
removeElements(elementsToRemoveByClass, true);
removeElementsByAttribute("embed", "src", "adserv"); 
removeElementsByTagName("object");

replaceStyleRule("body", "line-height: 1.333em;", "line-height: 1.15em;");

replaceStyleRule("#spHeader", "width: 794px;", "width: 100%;");
replaceStyleRule("#spMainContent", "line-height: 1.333em ! important;", "line-height: 1.15em ! important;");

replaceStyleRule(".spBigScreen #spMainContent", "width: 517px ! important;", "width: 95% ! important;");
replaceStyleRule(".spBigScreen #spMainContent", "margin: 20px 0 10px", "margin: 8px 0 8px");
addStyleRule(".spBigScreen #spMainContent", "-moz-column-count:2; column-count:2;");
replaceStyleRule(".spBigScreen .spRessortTeaserBox", "width: 517px;", "width: 95%;");

replaceStyleRule("#spContainer", "padding: 0pt 0pt 0pt 22px ! important", "padding: 0pt 0pt 0pt 5px ! important");

replaceStyleRule("#spContainer", "min-width: 980px;", "min-width: 90%;");
replaceStyleRule(".spTopThema", "float: left", "");

replaceStyleRule(".spSmallScreen #spMainContent", "width: 422px ! important;", "width:100%;");
addStyleRule(".spSmallScreen #spMainContent", "-moz-column-count:" + columnCount +";");

if (verticalScrollbarPresent() && isArticle()) {
	replaceStyleRule(".spSmallScreen #spMainContent", "-moz-column-count: " + columnCount +";", 
		"-moz-column-count:" + (columnCount+1) +";");	
}

replaceStyleRule(".spSmallScreen #spMainContent", "margin: 20px 12px 10px 0pt", "margin: 20px 0pt 10px 0pt");
addStyleRule(".spTopThema", "min-height:180px");
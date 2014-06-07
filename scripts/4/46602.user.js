// ==UserScript==
// @name           Stern.de
// @namespace      www.ingmar-kellner.de
// @include        http://www.stern.de/*
// ==/UserScript==


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
			if ((cssText.match("#TopTeaser") != null)
			   && (cssText.match("width") != null)) 
			{
			//	GM_log("stylesheet[" + i + "] rule [" + j + "]: " 
                        //   + styleSheet.cssRules[j].cssText);
				
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

/**
 * Use GM_addStyle() instead
 */ 
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

function removeStyleRule(styleSheet, rule) {
	document.styleSheets[styleSheet].deleteRule(rule);
}


function getAbsoluteFromPx(property) {
	return parseInt(property.substring(0, property.length - 2));
}

elementsToRemove = new Array(
	"adRahmen",
	"logoRahmen",
	"navFooter",
  "contRight",
  "sky"  
);

elementsToRemoveByClass = new Array(
	"marktplatz",
	"grau",
	"sidebar_box_headline anzeige",
	"moreArticleListHead",
	"moreArticle",
	"boxGeneral"
);

removeElements(elementsToRemove);
removeElements(elementsToRemoveByClass, true);
removeElementsByAttribute("embed", "src", "adserv"); 
removeElementsByTagName("object");

GM_addStyle("#TopTeaser, #navTop, #contentContainer {width: 100%;}");
GM_addStyle("#contRight {position: absolute; right: 0px; top: 0px;}");
GM_addStyle("#contentContainer {width: 100%;}");
if (document.location.href.indexOf(".html") == -1) {
  GM_addStyle("#contMain {width: 98%; -moz-column-count: 2; margin-left: 0px ! important; padding-left: 5px;" 
  + " padding-rigth: 5px;}");
} else {
  GM_addStyle("#contMain {width: 98%; -moz-column-count: 3; margin-left: 0px ! important; padding-left: 5px;" 
+ " padding-rigth: 5px;}");
}
GM_addStyle("#menu {width: 100%;}");
GM_addStyle(".zwischenleiste {width: 350px;}");

//TODO: Put everything between two elements with class "abstand" in a div to prevent
// column-break in a section. 
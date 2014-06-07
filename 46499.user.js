// ==UserScript==
// @name           Spiegel-Online Einestages MultiColumn
// @namespace      http://ingmars.scripts.de
// @include        http://einestages.spiegel.de/*
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



function removeStyleRule(styleSheet, rule) {
	
	document.styleSheets[styleSheet].deleteRule(rule);
}


function getAbsoluteFromPx(property) {
	return parseInt(property.substring(0, property.length - 2));
}

elementsToRemove = new Array(
	"huTopLine",
	"huTopLink"
);

elementsToRemoveByClass = new Array(
	"huLastPostInclude",
	"huColumnRight ieColumnRight",
	"huAlbumLinkList"
);
if (document.location.href == "http://einestages.spiegel.de/page/Home.html")
	return;

removeElements(elementsToRemove);
removeElements(elementsToRemoveByClass, true);
removeElementsByAttribute("embed", "src", "adserv"); 
removeElementsByTagName("object");

replaceStyleRule("body", "line-height: 1.333em;", "line-height: 1.15em;");

replaceStyleRule("#huWrapper", "width: 920px;", "width: 100%;");
replaceStyleRule("#huWrapper", "margin: 0pt 0pt 33px;", "margin: 0px;");
replaceStyleRule("#huContent", "width: 900px;", "width: 98%;"); 
replaceStyleRule("#huSponLinks", "width: 905px;", "width: 100%;");
replaceStyleRule("#huSponLinks", "padding: 2px 0pt 0pt 15px;", "padding: 0pt;");

replaceStyleRule("#zeitzeugen .huNewAlbum p", "line-height: 1.5em;", "line-height: 1.35em;");
//#alleThemen .huNewAlbum p

GM_addStyle(".huColumnLeft {width: 99% ! important;}");
GM_addStyle(".huNewAlbum {-moz-column-count:3; column-count:2;/* height: 850px; */}");
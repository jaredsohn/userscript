// ==UserScript==
// @name           GayRomeo_VisitorCheck
// @namespace      http://www.stillewasser.info/GayRomeoMods
// @description    Periodically checks for new visitors on your profile
// @include        http*://www.gayromeo.com/*/main/shortcuts.php
// @include        http*://www.gayromeo.de/*/main/shortcuts.php
// @include        http*://www.planetromeo.com/*/main/shortcuts.php
// @include        http*://www.planetromeo.de/*/main/shortcuts.php
// @include        http*://83.98.143.20/*/main/shortcuts.php
// @version        0.3.1
// ==/UserScript==


var checkInterval = 30000;
var visitorLinkDivHighlightStyle = "background:#800000";

var visitorLinkDiv = null;
var visitorPageLink = null;
var lastVisitor = null;
var lastTapsDiv = null;
var lastTaps = null;

function resetVisitorColor() {
		visitorLinkDiv.setAttribute("style", "");
}

function setVisitorColor() {
		visitorLinkDiv.setAttribute("style", visitorLinkDivHighlightStyle);
}

function checkLastVisitor() {
		var req = new XMLHttpRequest();
    req.open('GET', visitorPageLink, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4 && req.status == 200) {
           evaluateResponse(req.responseText);
        }  
    };
    req.send(null); 
}

function evaluateResponse(docText) {

    var doc = document.createElement("body");
    doc.innerHTML = getBody(docText)
    
    checkVisitor(doc);
		checkTaps(doc);
}

function checkVisitor(doc) {
	  var list = document.evaluate(
        "//td[@class='resHeadline']/a", 
        doc, 
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
        
    if (list.snapshotLength > 0) {
        var currentLastVisitor = list.snapshotItem(0).firstChild.nodeValue;
        if ((lastVisitor != null) && (lastVisitor != currentLastVisitor)) {
            setVisitorColor();
        } 
        lastVisitor = currentLastVisitor;
        
        if (visitorName.hasChildNodes()) {
        		visitorName.removeChild(visitorName.firstChild);
        }
        
        visitorName.appendChild( list.snapshotItem(0));
    }
}



function checkTaps(doc) {
	  var list = document.evaluate(
        "//img[contains(@src,'/footprints/')]", 
        doc, 
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
		
		var oldTaps = lastTapsDiv.firstChild;
		var removeTaps = true;
		
		if (list.snapshotLength > 0) {
			  
			  var tapsImg = list.snapshotItem(0);
			  if (tapsImg.title.split(" ")[0] == lastVisitor) {
					if (oldTaps != null) {
							lastTapsDiv.removeChild(oldTaps);
					} 
	        lastTapsDiv.appendChild(tapsImg);
	        list.snapshotItem(0).removeAttribute("align");
	        removeTaps = false;
      	}

    } 
    
    if (oldTaps != null && removeTaps) {
				lastTapsDiv.removeChild(oldTaps);
		}     
}


function getBody(content) 
{ 
   var x = content.indexOf("<body");
   x = content.indexOf(">", x);    
   var y = content.lastIndexOf("</body>"); 
   return content.slice(x + 1, y);
}

var contentDivResult = document.evaluate(
    "//div[@id='shortcuts']//div[@class='content']", 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
var contentDiv = contentDivResult.snapshotItem(contentDivResult.snapshotLength - 1);

var lastRowDiv = document.evaluate(
    "//div[@class='row']", 
    contentDiv, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
lastRowDiv .snapshotItem(lastRowDiv.snapshotLength - 1).setAttribute("class", "rowLine");

visitorLinkDiv = document.createElement("div");
visitorLinkDiv.setAttribute("class", "row");
visitorLinkDiv.setAttribute("title", "Meine Besucher");
contentDiv.appendChild(visitorLinkDiv);

var myVisitorLink = document.createElement("a");
myVisitorLink.setAttribute("style", "color: rgb(255, 153, 0);");
myVisitorLink.setAttribute("accesskey", "b");
myVisitorLink.setAttribute("target", "mitte");
var link = "/search/index.php?action=execute&searchType=myVisitors";
myVisitorLink.setAttribute("href", link);
myVisitorLink.appendChild(document.createTextNode("Meine Besucher"));
visitorLinkDiv.appendChild(myVisitorLink);

visitorPageLink = location.protocol + "//" + location.host + link;
visitorLinkDiv.addEventListener("click", resetVisitorColor, false);

var lastVisitorDiv = document.createElement("div");
visitorLinkDiv.appendChild(lastVisitorDiv);

lastVisitorDiv.appendChild(document.createTextNode("\u00A0\u00bb "));

visitorName = document.createElement("span");
lastVisitorDiv.appendChild(visitorName);
visitorName.appendChild(document.createTextNode("..."));

lastTapsDiv = document.createElement("div");
lastTapsDiv.setAttribute("style", "width:100%;text-align:center")
lastTapsDiv.appendChild(document.createTextNode(""));
lastVisitorDiv.appendChild(lastTapsDiv);

checkLastVisitor();
setInterval(checkLastVisitor, checkInterval);

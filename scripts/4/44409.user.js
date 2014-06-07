// ==UserScript==
// @name           xpath-node-locator
// @namespace      debug
// @description    A XPath debug mini-tool for locate nodes
// @include        *
// ==/UserScript==

var oAuxEleContainer = document.createElement("div");
oAuxEleContainer.setAttribute("id", "dvGMXpathQueryForm");
oAuxEleContainer.setAttribute("style", "position : absolute; top : 0px; left : 0px; padding : 3px; background-color : white; border : 1px solid #DFDFDF;");

var oAuxEle = document.createElement("input");
oAuxEle.setAttribute("id", "tGMXpathQuery");
oAuxEle.setAttribute("type", "text");
oAuxEle.setAttribute("style", "border : 1px solid #DFDFDF; margin-right : 3px;");
oAuxEle.setAttribute("value", "//a[contains(@href,'http')]");

oAuxEleContainer.appendChild(oAuxEle);

oAuxEle = document.createElement("input");
oAuxEle.setAttribute("type", "button");
oAuxEle.setAttribute("style", "border : 1px solid #DFDFDF; margin-right : 3px;");
oAuxEle.setAttribute("value", "Go!");

oAuxEle.addEventListener("click", 
	function () {
		var oAuxTxt;
		var sAux = "";
		var i = 1;

		var nodesSnapshot = document.evaluate(document.getElementById("tGMXpathQuery").value, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {
			nodesSnapshot.snapshotItem(i).setAttribute("style", "position : relative; border : 1px dotted red; background-color : #FFAAAA; padding : 3px;");
			sAux = "<span style=\"border : 1px solid #000000; color : red; position : absolute; top : -5px; left: -5px; font-size : 6px; background-color : #FFFFFF; padding : 0 3px 0 3px;\">" + i + "</span>";
			if (nodesSnapshot.snapshotItem(i).tagName == "IMG") {
				nodesSnapshot.snapshotItem(i).parentNode.innerHTML += sAux;
			} else {
				nodesSnapshot.snapshotItem(i).innerHTML += sAux;
			}
		}
	} , true);

oAuxEleContainer.appendChild(oAuxEle);

oAuxEle = document.createElement("input");
oAuxEle.setAttribute("type", "button");
oAuxEle.setAttribute("style", "border : 1px solid #DFDFDF; margin-right : 3px;");
oAuxEle.setAttribute("value", "Hide me");

oAuxEle.addEventListener("click", 
	function () {
		document.getElementById("dvGMXpathQueryForm").style.display = "none";
	}, true);

oAuxEleContainer.appendChild(oAuxEle);

document.body.appendChild(oAuxEleContainer);

// ==UserScript==
// @name		schuelerVZ | LastVisited
// @namespace		agrafix.net
// @description		Zeigt eine Box auf der linken Leiste an, in der steht auf welchen Seiten man als letztes war.
// @include		http://www.schuelervz.net/*
// ==/UserScript==


// @version 1.0

function main() {
	// load
	var StorageArray = eval(GM_getValue('SVZLastVisited', '[]'));

	// on user page
	if (document.location.href.indexOf("/Profile/") !== -1) {
		var Parts = document.location.href.split("/");
		var currentID = Parts[4];
		
		var Titles = document.getElementsByClassName("ellipsis");
		var t = Titles[0].innerHTML;
		var Parts2 = t.split("s Seite");
		var currentName = Parts2[0];
		
		//alert(currentName);
		
		// delete existing ones
		for ( var i=0; i<StorageArray.length; ++i ){
			if (StorageArray[i].indexOf(currentID) !== -1) {
				StorageArray.splice(i, 1);
			}
		}
		
		// append new
		if (StorageArray.length < 10) {
			StorageArray.reverse();
			StorageArray.push(currentID + "|" + currentName);
			StorageArray.reverse();
		}
		else {
			StorageArray.reverse();
			StorageArray.shift();
			StorageArray.push(currentID + "|" + currentName);
			StorageArray.reverse();
		}
		
		// save
		GM_setValue('SVZLastVisited', uneval(StorageArray));
	}
	
	// show
	var SideBar = $gid("Grid-Page-Left");
	var Box = document.createElement("div");
	Box.setAttribute("style", "border:1px solid #FF8080; padding:0px");
	
	var BTitle = document.createElement("div");
	BTitle.setAttribute("style", "margin:0px;background:#E04060;color:#FFFFFF;font-weight:bold;padding:3px;");
	BTitle.innerHTML = "Zuletzt angesehen";
	Box.appendChild(BTitle);
	
	var BContent = document.createElement("div");
	BContent.setAttribute("style", "padding: 3px");
	
	var List = document.createElement("ul");
	for ( var i=0, len=StorageArray.length; i<len; ++i ){
		var Pt = StorageArray[i].split("|");
		AddListElement(List, "<a href='http://www.schuelervz.net/Profile/" + Pt[0] + "'>" + Pt[1] + "</a>");
	}
	BContent.appendChild(List)
	Box.appendChild(BContent);
	
	var P = document.createElement("p");
	P.setAttribute("style", "margin:0;padding:3px;font-size:x-small;");
	P.innerHTML = "powered by <a href='http://www.agrafix.net' target='_blank'>agrafix.net</a>";
	
	Box.appendChild(P);
	
	SideBar.appendChild(Box);
	
}

main();


/*
 * The function library
 * 
 */
function AddListElement(ListElement, Content) {
	var LiEl = document.createElement("li");
	LiEl.innerHTML = Content;
	ListElement.appendChild(LiEl);
}
 
function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;

	return node;
}

function $gid(id) {
	var el = document.getElementById(id);

	return el;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

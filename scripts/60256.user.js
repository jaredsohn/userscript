// ==UserScript==
// @name            Cheggit Keyboard Nav
// @description     Adds keyboard navigation to Cheggit
// @namespace       http://userscripts.org/users/4294
// @include         http://cheggit.net/browsetorrents.php
// @include         http://cheggit.net/browsetorrents.php?*
// ==/UserScript==

// TODO : need to ignore hidden rows

// This started as a slight modification of Signe's Add Prev/Next Navigation <http://userscripts.org/scripts/show/38138>
// but it kind of got out of hand.

var CKNversion = 4;
// Current script version (release date), last update check and last remote version seen
var scriptVersion = 1286688297745; // Oct 10 2010

function CKNusage() {
	var usageStr = "Key bindings for Cheggit Keyboard Navigation can be modified to your liking.\n\n";
	usageStr += "Select \"Cheggit Keyboard Nav settings\" in the Greasemonkey User Script Commands menu to see the defaults and set your own preferences.\n\n";
	usageStr += "Current settings:\n\n";
	usageStr += getBinding("nt", 'j') + " = select next torrent\n";
	usageStr += getBinding("pt", 'k') + " = select previous torrent\n";
	usageStr += getBinding("op", 'l') + " = preview torrent\n";
	usageStr += getBinding("cp", 'h') + " = hide preview\n";
	usageStr += getBinding("pd", 'u') + " = scroll preview down\n";
	usageStr += getBinding("pu", 'i') + " = scroll preview up\n";
	usageStr += getBinding("pl", 'y') + " = scroll preview left\n";
	usageStr += getBinding("pr", 'o') + " = scroll preview right\n";
	usageStr += getBinding("dl", 'd') + " = download\n";
	usageStr += getBinding("np", '<Right>') + " = next page\n";
	usageStr += getBinding("pp", '<Left>') + " = previous page\n";
	usageStr += "\nAlso, 1 - 0 go directly to pages 1 - 10";
	alert(usageStr);
}

function cloneObject(that) {
	for (i in that) {
		this[i] = that[i];
	}
}

function findPos(obj) {
	var posX = obj.offsetLeft;
	var posY = obj.offsetTop;

	while(obj.offsetParent){
		if(obj==document.getElementsByTagName('body')[0]) {
			break;
		} else {
			posX = posX+obj.offsetParent.offsetLeft;
			posY = posY+obj.offsetParent.offsetTop;
			obj = obj.offsetParent;
		}
	}

	return [posX,posY];
}

function makeElementOnscreen(elem, alignTop) {
	var elemY = findPos(elem)[1];

	var topOffset = elemY - window.scrollY - 30;
	var bottomOffset = elemY + elem.clientHeight - ( window.scrollY + window.innerHeight) + 30;

	if (elemY < window.scrollY) {
		window.scrollBy(0, alignTop?topOffset:bottomOffset);
	}
	if (elemY + elem.clientHeight > window.scrollY + window.innerHeight) {
		window.scrollBy(0, alignTop?topOffset:bottomOffset);
	}
}

function selectKey(id, selected) {
	var sel = document.createElement("select");
	sel.id = id;

	var op;
	op = document.createElement("option");
	op.value = -38;
	op.innerHTML = "&lt;Up&gt;";
	if (selected == "<Up>") {
		op.setAttribute("selected", true);
		selected = '';
	}
	sel.appendChild(op);
	op = document.createElement("option");
	op.value = -40;
	op.innerHTML = "&lt;Down&gt;";
	if (selected == "<Down>") {
		op.setAttribute("selected", true);
		selected = '';
	}
	sel.appendChild(op);
	op = document.createElement("option");
	op.value = -37;
	op.innerHTML = "&lt;Left&gt;";
	if (selected == "<Left>") {
		op.setAttribute("selected", true);
		selected = '';
	}
	sel.appendChild(op);
	op = document.createElement("option");
	op.value = -39;
	op.innerHTML = "&lt;Right&gt;";
	if (selected == "<Right>") {
		op.setAttribute("selected", true);
		selected = '';
	}
	sel.appendChild(op);

	for (var i = 97; i <= 122; i++) {
		var op = document.createElement("option");
		op.value = i;
		op.innerHTML = String.fromCharCode(i);
		if (selected.charCodeAt(0) == i) {
			op.setAttribute("selected", true);
		}
		sel.appendChild(op);
	}
	for (var i = 65; i <= 90; i++) {
		var op = document.createElement("option");
		op.value = i;
		op.innerHTML = String.fromCharCode(i);
		if (selected.charCodeAt(0) == i) {
			op.setAttribute("selected", true);
		}
		sel.appendChild(op);
	}
	for (var i = 48; i <= 57; i++) {
		var op = document.createElement("option");
		op.value = i;
		op.innerHTML = String.fromCharCode(i);
		if (selected.charCodeAt(0) == i) {
			op.setAttribute("selected", true);
		}
		sel.appendChild(op);
	}
	for (var i = 33; i <= 47; i++) {
		var op = document.createElement("option");
		op.value = i;
		op.innerHTML = String.fromCharCode(i);
		if (selected.charCodeAt(0) == i) {
			op.setAttribute("selected", true);
		}
		sel.appendChild(op);
	}
	for (var i = 58; i <= 64; i++) {
		var op = document.createElement("option");
		op.value = i;
		op.innerHTML = String.fromCharCode(i);
		if (selected.charCodeAt(0) == i) {
			op.setAttribute("selected", true);
		}
		sel.appendChild(op);
	}
	for (var i = 91; i <= 96; i++) {
		var op = document.createElement("option");
		op.value = i;
		op.innerHTML = String.fromCharCode(i);
		if (selected.charCodeAt(0) == i) {
			op.setAttribute("selected", true);
		}
		sel.appendChild(op);
	}
	for (var i = 123; i <= 126; i++) {
		var op = document.createElement("option");
		op.value = i;
		op.innerHTML = String.fromCharCode(i);
		if (selected.charCodeAt(0) == i) {
			op.setAttribute("selected", true);
		}
		sel.appendChild(op);
	}

	return sel;
}

function CKNsettings() {
	var CKNsettingsBox = document.createElement("div");
	CKNsettingsBox.id = "CKNsettingsBox";
	CKNsettingsBox.style.position = "fixed";
	CKNsettingsBox.style.top = "0px";
	//CKNsettingsBox.style.bottom = "0px";
	CKNsettingsBox.style.zIndex = "10";
	CKNsettingsBox.style.minWidth = "30%";
	CKNsettingsBox.style.left = "20%";
	CKNsettingsBox.style.right = "20%";

	var CKNsettingsBoxContent = document.createElement("div");
	CKNsettingsBoxContent.style.textAlign = "center";
	CKNsettingsBoxContent.style.backgroundColor = "grey";

	var CKNsettingsForm = document.createElement("form");

	var CKNsettingsFormHeader = document.createElement("span");
	CKNsettingsFormHeader.style.fontSize = "larger";
	CKNsettingsFormHeader.innerHTML = "Cheggit Keyboard Navigation settings";

	CKNsettingsForm.appendChild(CKNsettingsFormHeader);

	CKNsettingsForm.innerHTML += "<br/><br/>Download<br/>";
	CKNsettingsForm.appendChild(selectKey("dl", getBinding("dl",'d')));
	var CKNsettingsLayout = new Array();
	CKNsettingsLayout[0] = document.createElement("div");
	CKNsettingsLayout[1] = document.createElement("div");
	CKNsettingsLayout[2] = document.createElement("div");
	CKNsettingsForm.appendChild(CKNsettingsLayout[0]);
	CKNsettingsLayout[0].appendChild(CKNsettingsLayout[2]);
	CKNsettingsLayout[0].appendChild(CKNsettingsLayout[1]);

	CKNsettingsLayout[1].style.width = "50%";
	CKNsettingsLayout[1].style.textAlign = "right";
	CKNsettingsLayout[2].style.textAlign = "left";
	CKNsettingsLayout[2].style.position = "absolute";
	CKNsettingsLayout[2].style.left = "50%";

	CKNsettingsLayout[1].innerHTML += "Next Torrent ";
	CKNsettingsLayout[1].appendChild(selectKey("nt", getBinding("nt", 'h')));
	CKNsettingsLayout[2].appendChild(selectKey("pt", getBinding("pt", 'k')));
	CKNsettingsLayout[2].innerHTML += " Previous Torrent<br/>";
	CKNsettingsLayout[1].innerHTML += "<br/>Open Preview ";
	CKNsettingsLayout[1].appendChild(selectKey("op", getBinding("op", 'l')));
	CKNsettingsLayout[2].appendChild(selectKey("cp", getBinding("cp", 'h')));
	CKNsettingsLayout[2].innerHTML += " Close Preview<br/>";
	CKNsettingsLayout[1].innerHTML += "<br/>Scroll Preview Down ";
	CKNsettingsLayout[1].appendChild(selectKey("pd", getBinding("pd", 'u')));
	CKNsettingsLayout[2].appendChild(selectKey("pu", getBinding("pu", 'i')));
	CKNsettingsLayout[2].innerHTML += " Scroll Preview Up<br/>";
	CKNsettingsLayout[1].innerHTML += "<br/>Scroll Preview Left ";
	CKNsettingsLayout[1].appendChild(selectKey("pl", getBinding("pl", 'y')));
	CKNsettingsLayout[2].appendChild(selectKey("pr", getBinding("pr", 'o')));
	CKNsettingsLayout[2].innerHTML += " Scroll Preview Right<br/>";
	CKNsettingsLayout[1].innerHTML += "<br/>Previous Page ";
	CKNsettingsLayout[1].appendChild(selectKey("pp", getBinding("pp", '<Left>')));
	CKNsettingsLayout[2].appendChild(selectKey("np", getBinding("np", '<Right>')));
	CKNsettingsLayout[2].innerHTML += " Next Page";
	//CKNsettingsFormElems["submit"] = document.createElement("input");
	//CKNsettingsFormElems["submit"].type = "submit";
	//CKNsettingsFormElems["submit"].addEventListener("click", function() { CKNsettingsBoxWrapper.style.display = "none"; return false; }, false);
	//CKNsettingsForm.appendChild(CKNsettingsFormElems["submit"]);
	//CKNsettingsForm.addEventListener("submit", function(e) { e.stopPropagation(); e.preventDefault(); CKNsettingsBoxWrapper.style.display = "none"; return false; }, true);

	CKNsettingsForm.innerHTML += "<br/>Click outside the grey box to close";

	CKNsettingsBoxContent.appendChild(CKNsettingsForm);

	CKNsettingsBox.appendChild(CKNsettingsBoxContent);
	// NiftyCorners
	CKNsettingsBox.innerHTML += "<b style='display:block;'><b style='display:block;height:2px;overflow:hidden;background:grey;margin:0 1px;'></b><b style='display:block;height:1px;overflow:hidden;background:grey;margin:0 2px;'></b><b style='display:block;height:1px;overflow:hidden;background:grey;margin:0 3px;'></b><b style='display:block;height:1px;overflow:hidden;background:grey;margin:0 5px;'></b></b>";

	var CKNsettingsBoxVeil = document.createElement("div");
	CKNsettingsBoxVeil.style.position = "fixed";
	CKNsettingsBoxVeil.style.top = "0px";
	CKNsettingsBoxVeil.style.bottom = "0px";
	CKNsettingsBoxVeil.style.left = "0px";
	CKNsettingsBoxVeil.style.right = "0px";
	CKNsettingsBoxVeil.style.backgroundColor = "black";
	CKNsettingsBoxVeil.style.opacity = "0.8";
	CKNsettingsBoxVeil.style.zIndex = "9";

	var CKNsettingsBoxWrapper = document.createElement("div");
	CKNsettingsBoxWrapper.style.display = "none";

	CKNsettingsBoxWrapper.appendChild(CKNsettingsBoxVeil);
	CKNsettingsBoxWrapper.appendChild(CKNsettingsBox);

	CKNsettingsBoxVeil.addEventListener("click", function() { CKNsettingsBoxWrapper.style.display = "none"; }, true);

	document.body.appendChild(CKNsettingsBoxWrapper);
	document.getElementById("dl").addEventListener("change", setBindingCB, false);
	document.getElementById("nt").addEventListener("change", setBindingCB, false);
	document.getElementById("pt").addEventListener("change", setBindingCB, false);
	document.getElementById("op").addEventListener("change", setBindingCB, false);
	document.getElementById("cp").addEventListener("change", setBindingCB, false);
	document.getElementById("pd").addEventListener("change", setBindingCB, false);
	document.getElementById("pu").addEventListener("change", setBindingCB, false);
	document.getElementById("pp").addEventListener("change", setBindingCB, false);
	document.getElementById("np").addEventListener("change", setBindingCB, false);

	CKNsettingsBoxWrapper.style.display = "";
}

function getBinding(id, def) {
	if (def == "<Up>") {
		def = -38;
	} else if (def == "<Down>") {
		def = -40;
	} else if (def == "<Left>") {
		def = -37;
	} else if (def == "<Right>") {
		def = -39;
	} else {
		def = def.charCodeAt(0);
	}

	var val = GM_getValue("bindings." + id, def);

	if (val == -37) {
		return "<Left>";
	} else if (val == -38) {
		return "<Up>";
	} else if (val == -39) {
		return "<Right>";
	} else if (val == -40) {
		return "<Down>";
	} else {
		return String.fromCharCode(val);
	}
}

function setBindingCB(event) {
	alert(event.target.options[event.target.selectedIndex].value);
	GM_setValue("bindings." + event.target.id, event.target.options[event.target.selectedIndex].value);
}

if (GM_getValue('version',0) < CKNversion) {
	CKNusage();
	GM_setValue('version', CKNversion);
}

GM_registerMenuCommand("Cheggit Keyboard Nav usage", CKNusage);
GM_registerMenuCommand("Cheggit Keyboard Nav settings", CKNsettings);

GM_addStyle('div #torrentPagination .page, div #torrentPagination span { margin: 0 5px; }');

var currentPage = getQueryVariable('p');

// If we're not on a page, we're on page 1
if (currentPage == null) {
    currentPage = 1;
}

var prevPage = Number(currentPage) - 1;
var nextPage = Number(currentPage) + 1;

var pagination = document.getElementsByTagName('tr');

for (var i = 0; i < pagination.length; i++) {
    if (pagination[i].className == 'pagination') {
        var pageCol = pagination[i].childNodes[1];
        for (var j = 0; j < pageCol.childNodes.length; j++) {
            if (pageCol.childNodes[j].nodeName == '#text' ||
                pageCol.childNodes[j].innerHTML == '&lt;' ||
                pageCol.childNodes[j].innerHTML == '&lt;&lt;' ||
                pageCol.childNodes[j].innerHTML == '&gt;' ||
                pageCol.childNodes[j].innerHTML == '&gt;&gt;') {
                pageCol.removeChild(pageCol.childNodes[j]);
                j--;
            }
        }

        if (prevPage) {
            var prevLink = document.createElement('a');
                prevLink.href = replaceQueryVariable('p', prevPage);
                prevLink.className = 'page';
                prevLink.innerHTML = '&larr; Prev';
    
            pageCol.insertBefore(prevLink, pageCol.childNodes[0]);
        }
        var nextLink = document.createElement('a');
            nextLink.href = replaceQueryVariable('p', nextPage);
            nextLink.className = 'page';
            nextLink.innerHTML = 'Next &rarr;';
        pageCol.appendChild(nextLink);
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return null;
}

function replaceQueryVariable(variable, value) {
    var query = window.location.search.substring(1);
    if ( query != "" ) {
	var vars = query.split("&");
	var newQueryString = "?";
	var found = false;
	
	for (var i = 0; i < vars.length; i++) {
	    var pair = vars[i].split("=");
	    if (pair[0] == variable) {
		pair[1] = value;
		found = true;
	    }
	    newQueryString += pair.join('=') + '&';
	}
	if (!found) {
	    newQueryString += variable + '=' + value + '&';
	}
	return document.location.href.replace(document.location.search, newQueryString.slice(0, -1));
    } else {
	return document.location.href + '?' + variable + '=' + value;
    }
}

function keyNav(event) {
	if ( /textarea/i.test(event.target.nodeName) ) {
		return;
	}
	if ( /input/i.test(event.target.nodeName) && /password|text/i.test(event.target.type)) {
		return;
	}

	if (event.which == 0) {
		keyPress = event.keyCode * -1;
	} else {
		keyPress = event.which;
	}

	//alert(typeof GM_getValue("bindings.pp", -37));
	//alert(typeof keyPress);

	if (keyPress == GM_getValue("bindings.np", -39)) { // -39 == Right Arrow
		// "click" Next
		window.location.replace(replaceQueryVariable('p', nextPage));
	} else if (keyPress == GM_getValue("bindings.pp", -37)) { // -37 == Left Arrow
		// "click" Prev
		if (prevPage > 0) {
			window.location.replace(replaceQueryVariable('p', prevPage));
		}
	} else if (keyPress == GM_getValue("bindings.nt", 106)) { // 106 == j
		torrIframeTr.style.display = 'none';
		if (selections[selectedTorr+1] != undefined) {
			selections[selectedTorr].style.display='none';
			selectedTorr++;
			selections[selectedTorr].style.display='inline';
			makeElementOnscreen(selections[selectedTorr].parentNode.parentNode, true);
		} else {
			window.location.replace(replaceQueryVariable('p', nextPage));
		}
	} else if (keyPress == GM_getValue("bindings.pt", 107)) { // 107 == k
		torrIframeTr.style.display = 'none';
		if (selections[selectedTorr-1] != undefined) {
			selections[selectedTorr].style.display='none';
			selectedTorr--;
			selections[selectedTorr].style.display='inline';
			makeElementOnscreen(selections[selectedTorr].parentNode.parentNode, false);
		} else if (prevPage > 0) {
			window.location.replace(replaceQueryVariable('p', prevPage));
		}
	} else if (keyPress == GM_getValue("bindings.op", 108)) { // 108 == l
		// create iframe and populate it with link
		var torrRow = selections[selectedTorr].parentNode.parentNode;
		torrIframe.src = torrRow.getElementsByTagName('a')[0].href;
		torrIframe.addEventListener("load", cleanIframe, true);
		if ((selections.length <= selectedTorr+1) || (torrRow.parentNode != selections[selectedTorr+1].parentNode.parentNode.parentNode)) {
			var temprow = torrRow.parentNode.insertRow(torrRow.parentNode.rows.length);
			torrRow.parentNode.insertBefore(torrIframeTr, temprow);
		} else {
			torrRow.parentNode.insertBefore(torrIframeTr, selections[selectedTorr+1].parentNode.parentNode);
		}
		torrIframeTr.style.display = '';
		makeElementOnscreen(torrIframeTr, false);
	} else if (keyPress == GM_getValue("bindings.cp", 104)) { // 104 == h
		torrIframeTr.style.display = 'none';
		makeElementOnscreen(selections[selectedTorr].parentNode.parentNode, true);
	} else if (keyPress == GM_getValue("bindings.pd", 117)) { // 117 == u
		for (var i = 0; i < window.frames.length; i++) {
			if (window.frames[i].name == "tframe") {
				window.frames[i].scrollBy(0,15);
			}
		}
	} else if (keyPress == GM_getValue("bindings.pu", 105)) { // 105 == i
		for (var i = 0; i < window.frames.length; i++) {
			if (window.frames[i].name == "tframe") {
				window.frames[i].scrollBy(0,-15);
			}
		}
	} else if (keyPress == GM_getValue("bindings.pl", 121)) { // 121 == y
		for (var i = 0; i < window.frames.length; i++) {
			if (window.frames[i].name == "tframe") {
				window.frames[i].scrollBy(-15,0);
			}
		}
	} else if (keyPress == GM_getValue("bindings.pr", 111)) { // 111 == o
		for (var i = 0; i < window.frames.length; i++) {
			if (window.frames[i].name == "tframe") {
				window.frames[i].scrollBy(15,0);
			}
		}
	} else if (keyPress == GM_getValue("bindings.dl", 100)) { // 100 == d
		var dlLinks = selections[selectedTorr].parentNode.parentNode.getElementsByTagName("a");
		for (var i = 0; i < dlLinks.length; i++) {
			if (dlLinks[i].title == "and cheggit out") {
				location.replace(dlLinks[i].href);
			}
		}
	} else if (keyPress >= 48 && keyPress <= 57) { // 48 == 0, 49 == 1, ... , 57 == 9
		var page;
		if ( keyPress == 48 ) {
			page = 10;
		} else {
			page = keyPress - 48;
		}
		window.location.replace(replaceQueryVariable('p', page));
	}
}

function cleanIframe() {
	var torrIframeElems;

	/* Remove Cyronaseez's huge rotating Julie Strain pictures */
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@id='cleft']//li", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		if (thisTorrIframeElem.innerHTML.match(/Uploader:.*Cyronaseez/)) {
			var julieStrainElems = torrIframe.contentDocument.evaluate("//body//div[@id='cmd-main-title']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var j = 0; j < julieStrainElems.snapshotLength; j++) {
				var julieStrain = julieStrainElems.snapshotItem(i);
				julieStrain.parentNode.removeChild(julieStrain);
			}
			break;
		}
	}

	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@id='cheader']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@id='cleft']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@id='cright']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@id='ccenter']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.style.width="100%";
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@id='commentcontrols']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@class='post']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@class='breakrow']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//div[@class='menubox']", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//iframe", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.parentNode.removeChild(thisTorrIframeElem);
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//img", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		thisTorrIframeElem.src = thisTorrIframeElem.src.replace(new RegExp("^(http://pics\\.cheggit\\.nl/.*/)t([^/]+)$"), "$1$2");
		thisTorrIframeElem.src = thisTorrIframeElem.src.replace(new RegExp("^(http://(www\\.)?dumppix\\.com/images.*)_thumb\\.jpg$"), "$1.jpg");
	}
	torrIframeElems = torrIframe.contentDocument.evaluate("//body//a", torrIframe.contentDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < torrIframeElems.snapshotLength; i++) {
		var thisTorrIframeElem = torrIframeElems.snapshotItem(i);
		if ((thisTorrIframeElem.href == thisTorrIframeElem.innerHTML) && (thisTorrIframeElem.href.match(/jpe?g$/i))) {
			var linkedImg = document.createElement("img");
			linkedImg.src = thisTorrIframeElem.href;
			thisTorrIframeElem.parentNode.insertBefore(linkedImg, thisTorrIframeElem);
		}
	}
}

document.addEventListener("keypress", keyNav, true);

var torrIframe = document.createElement("iframe");
var torrIframeTr = document.createElement("tr");
var torrIframeTd = document.createElement("td");
torrIframe.height = "600";
torrIframe.width = "100%";
torrIframe.setAttribute("id", "tframe");
torrIframe.setAttribute("name", "tframe");
torrIframeTd.colSpan = 9;
torrIframeTd.appendChild(torrIframe);
torrIframeTr.appendChild(torrIframeTd);
torrIframeTr.style.display = 'none';
torrIframeTr.className = 'tabletext';

var allTorrents = document.evaluate("//tr[@class]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var selections = new Array();
var selectedTorr;
var j = 0;

var first = true;
for (var i = 0; i < allTorrents.snapshotLength; i++) {
	thisTorrent = allTorrents.snapshotItem(i);
	if (thisTorrent.className.match('tablehead')) {
		var currTorr = document.createElement("td");
		currTorr.className = "tabletext";
		thisTorrent.insertBefore(currTorr, thisTorrent.childNodes[0]);
	}
	if (! thisTorrent.className.match('tablerow')) {
		continue;
	}
	var currTorr = document.createElement("td");
	currTorr.vAlign = 'middle';
	currTorr.width = '15px';
	var currTorrSpan = document.createElement("span");
	currTorrSpan.innerHTML = "&rarr;";
	currTorrSpan.style.fontWeight = "bold";
	if (first) {
		selectedTorr = j;
		first = false;
	} else {
		currTorrSpan.style.display='none';
	}
	currTorr.appendChild(currTorrSpan);
	thisTorrent.insertBefore(currTorr, thisTorrent.childNodes[0]);
	selections[j] = currTorrSpan; j++;
}


var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
if (isNaN(scriptLastCheck)) scriptLastCheck = 0;

var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", scriptVersion.toString()), 10);
if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = scriptVersion;

// URLs related to the script
var scriptFileURL = "http://userscripts.org/scripts/source/60256.user.js";
var scriptHomepageURL = "http://userscripts.org/scripts/show/60256";

// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage, scriptNewVersion) {

	// Gets the notice box and the script new version date in UTC format
	var messageDiv;
	var scriptNewVersionDate = (new Date(scriptNewVersion)).toUTCString();

	// Shows/creates/hides the update notice
	if (scriptShowMessage == false) {
		// Hides the notice if it exists
		if (messageDiv) messageDiv.style.display = "none";
	}
	else {

		if (messageDiv) {
			// Shows the notice
			messageDiv.style.display = "";
		}
		else {
			// Creates the notice

			messageDiv = document.createElement("div", {title: "A new Cheggit Keyboard Nav version is available"});
			messageDiv.innerHTML = "A new version of Cheggit Keyboard Nav (" + scriptNewVersionDate + ") is available<br/>" +
				"<a href='" + scriptFileURL + "' title='Install the script update'>Install</a> | " +
				"<a href='" + scriptHomepageURL + "' target='_blank' title='Go to Cheggit Keyboard Nav homepage'>Go to web page</a>";
			messageDiv.style.backgroundColor = '#C00040';
			messageDiv.style.color = 'white';
			messageDiv.style.outline = 'black solid thin';
			messageDiv.style.overflow = 'auto';
			messageDiv.style.padding = '5px';
			messageDiv.style.position = 'fixed';
			messageDiv.style.zIndex = '99';
			messageDiv.style.top = '0px';
			messageDiv.style.right = '0px';
			messageDiv.style.left = '0px';
			messageDiv.style.height = '40px';
			messageDiv.style.textAlign = 'center';
			//"#gsscriptVersionMessage a {margin: 0px 5px}"
			document.body.appendChild(messageDiv);
		}
	}
}

// Checks if there is a new script version according to the version information in the script homepage
// The version information is in a line in the full description of the script: "<p>#[V:00000000]#</p>" (00000000 is the version number)
// If the request is successful and there is a new version available, a message to the user is displayed
function scriptCheckVersion() {
	GM_xmlhttpRequest({
		method: "GET",
		url: scriptHomepageURL,
		onload: function(evt) {
			if ((evt.readyState == 4) && (evt.status == 200)) {

				// Gets the remote version from the response and makes sure it is a number
				var responseMatch = evt.responseText.match(/<p>#\[V:(\d+)]#<\/p>/);
				var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
				if (isNaN(remoteVersion)) return;

				// Saves the more recent version according to the server and shows the update notice if the server version is newer
				GM_setValue("scriptLastRemoteVersion", remoteVersion.toString());
				if (remoteVersion > scriptVersion) scriptShowUpdateMessage(true, remoteVersion);

			}
		}
	});
}

// Checks for script updates
if (Date.now() - scriptLastCheck >= 86400000) { // 1 day
	// At least a day has passed since the last check. Sends a request to check for a new script version
	GM_setValue("scriptLastCheck", Date.now().toString());
	scriptCheckVersion();
}
else {
	// If a new version was previously detected the notice will be shown to the user
	// This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
	if (scriptLastRemoteVersion > scriptVersion) {
		scriptShowUpdateMessage(true, scriptLastRemoteVersion);
	}
}

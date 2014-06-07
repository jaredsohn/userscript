// Safari Online - Improve eBook behavior
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Safari Online - Improve eBook behavior
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Improves the layout for continuous reading (removes header, makes book narrower). Adds keyboard shortcuts (press Space when at bottom of a page to go to the next page or press 'N' or 'P' for Next and Previous).
// @include         http://proquestcombo.safaribooksonline.com/*
// ==/UserScript==

// ====================== Improve the format for the page ==============================/

function addGlobalStyle(css) {
        style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
}

var cssRules = ".Main { max-width: 900px; margin-left: auto; margin-right: auto; }";
addGlobalStyle(cssRules);


// ====================== Add a keyboard shortut to navigate ==============================/

function findNextButton() {
	var xpath = "//a[@accesskey='2']"; 
	var nextButtonSnapshot = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (nextButtonSnapshot.snapshotLength == 2) {
		var nextButton = nextButtonSnapshot.snapshotItem(0);
  		return nextButton;
	}
}


function findPreviousButton() {
	var xpath = "//a[@accesskey='1']"; 
	var prevButtonSnapshot = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (prevButtonSnapshot.snapshotLength == 2) {
		var prevButton = prevButtonSnapshot.snapshotItem(0);
  		return prevButton;
	}
}


function click(node) { 
	if (!node) return;

	var evt = node.ownerDocument.createEvent('MouseEvents'); 
	evt.initMouseEvent('click', true, true, node.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null); 
	node.dispatchEvent(evt); 

	deleteContent();
	window.scrollTo(0,0);
}

function handleKeypress(e) {
	if (e.charCode == 110) {
		click(findNextButton());
	}
	if (e.charCode == 112) {
		click(findPreviousButton());
	}
	if (e.charCode == 32 && window.scrollY >= window.scrollMaxY) {
		click(findNextButton());
		e.preventDefault();
	}
}

function deleteContent() {
	var contentNode = window.document.getElementById("SectionContent");
	while (contentNode != null && contentNode.hasChildNodes())
	{
    		contentNode.removeChild(contentNode.firstChild);
	}

            contentNode = window.document.getElementById("pfcontent");
	while (contentNode != null && contentNode.hasChildNodes())
	{
    		contentNode.removeChild(contentNode.firstChild);
	}
}

window.addEventListener("keypress", handleKeypress, true);


// ====================== Hide banner ==============================/

var xpath = "//body/table[1]/tbody[1]/tr[1]/td/div/table/tbody/tr[1]";
var brandBarSnapshot = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (brandBarSnapshot.snapshotLength == 1) {
  var brandBar = brandBarSnapshot.snapshotItem(0);
  brandBar.parentNode.removeChild(brandBar);
}


// ====================== Fix title ==============================/
function fixTitle() {
  window.document.title = window.document.title.replace(/[^-]* - [^-]* - /, "") + " - Safari Online";
}

fixTitle();

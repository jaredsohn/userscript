// ==UserScript==
// @name Javadoc Obvious Overrides
// @include */docs/api/java/*
// ==/UserScript==


var ObviousOverrides = {};

ObviousOverrides.embed = function() {
	// Get all methods
	var methods = ObviousOverrides.getMethods();
	
	for (var i = 0; i < methods.length; i++) {
		var info = ObviousOverrides.getInfo(methods[i]);
		if (info) {
			methods[i].containingCell.innerHTML += info;
		}
	}
}

ObviousOverrides.getAnchor = function(name) {
	var element = false;
	for (var i = 0; i < document.anchors.length; i++) {
		if (document.anchors[i].name == name) {
			element = document.anchors[i];
			break;
		}
	}
	return element;
}

ObviousOverrides.getMethods = function() {
	var methods = [];
	
	// Get the table containing methods summary
	var msum = ObviousOverrides.getAnchor("method_summary");
	if (msum)
		msum = msum.nextSibling.nextSibling;
	else return false;
	
	// Get all cells in that table
	var cells = msum.getElementsByTagName("td");	
	
	for (var i = 0; i < cells.length; i++) {
		// Get all references in the cell and find anchor
		var refs = cells[i].getElementsByTagName("a");
		for (var j = 0; j < refs.length; j++) {
			var idx = refs[j].href.lastIndexOf("#");
			if (idx != -1) {
				var entry = {
					anchor: decodeURIComponent(refs[j].href.substr(++idx)),
					containingCell: cells[i]
				};
				methods.push(entry);
			}
		}
	}
	
	return methods;
}

ObviousOverrides.getInfo = function(method) {
	var specPat = "Specified by:";
	var overPat = "Overrides:";
	var info = {
		spec: null,
		over: null
	};
	
	// Get the DL containing details
	var dl = ObviousOverrides.getAnchor(method.anchor);
	do {
		dl = dl.nextSibling;
	} while (dl.nodeName != "DL");
	
	var terms = dl.getElementsByTagName("dt");
	for (var i = 0; i < terms.length; i++) {
		var title = terms[i].firstChild.innerHTML;
		if (title == specPat)
			info.spec = terms[i].nextSibling.innerHTML;
		else if (title == overPat)
			info.over = terms[i].nextSibling.innerHTML;
	}
	
	var infoStr = "&nbsp;(";
	if (info.over != null) {
		infoStr += overPat.bold() + " " + info.over;
		if (info.spec != null)
			infoStr += "; " + specPat.bold() + " " + info.spec;
		infoStr += ")";
	} else if (info.spec != null) {
		infoStr += specPat.bold() + " " + info.spec + ")";
	} else {
		return false;
	}
	
	return infoStr;
}

ObviousOverrides.embed();
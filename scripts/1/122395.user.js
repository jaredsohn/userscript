// ==UserScript==
// @name           ITC - full description
// @namespace      Haromp
// @description    Auto-expand all descriptions on ITC
// @include        http://inthecrack.com/collections/collection/collection.aspx?IDCollection=*
// @downloadURL	   http://userscripts.org/scripts/source/122395.user.js
// @updateURL	   http://userscripts.org/scripts/source/122395.meta.js
// @version        1.0
// ==/UserScript==

// extract text ID from link
function getID(linkEle) {
	var parts = linkEle.id.split('_');
	
	if (parts.length != 2 || parts[0] != 'ClipDes') {
		alert('Unexpected link ID:\n' + id);
		return -1;
	}
	
	return parts[1];
}

// get a random number (13 digits)
function getRandomNum() {
	return Math.floor(Math.random() * 1e13);
}

// replace original (abridged) text with the complete text from AJAX response
function replaceText(txtEle, txtResp) {
	try {
		txtResp = JSON.parse(txtResp).Description;
	}
	catch (e) {
		alert('Parsing error: ' + e.message + '\n\nServer response:\n' + txtResp);
		return;
	}
	
	// get rid of <span>...</span>
	txtResp = txtResp.replace(/<span.*<\/span> /, '');

	// replace shortened version with full version + make it look nice
	txtEle.innerHTML = txtResp;
	txtEle.style.overflow="auto";
	txtEle.style.maxHeight="7em";
	txtEle.style.marginRight="0px";
	txtEle.style.paddingRight="10px";
}

function handleMore(linkEle) {
	if (linkEle == null) {
		alert('No link: "' + linkEle + '"');
		return;
	}

	// get full text
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://inthecrack.com/collections/collection/collection_xhr.aspx?cmd=GetClipDescription&IDClip=' + getID(linkEle) + '&_=' + getRandomNum(),
		onload: function(response) {
			replaceText(linkEle.parentNode, response.responseText);
		}
	});
}


// main function
(function(){
	// process all "More" elements
	var elems = document.getElementsByClassName("More");

	for (var cc = 0; cc < elems.length; cc++) {
		handleMore(elems[cc]);
	}
})();

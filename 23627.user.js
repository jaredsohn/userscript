// ==UserScript==
// @name           Zooomr All Sizes Direct
// @namespace      http://www.zooomr.com/photos/ping/
// @description    A faster way to get direct links to the different photo sizes.
// @include        http://*.zooomr.com/photos/*/*/
// @include        http://*.zooomr.com/photos/*/*/#*
// ==/UserScript==
(function() {

var ZAPI = unsafeWindow.ZAPI;
var json_parse = unsafeWindow.json_parse;
var _INFO_TAGS = unsafeWindow._INFO_TAGS;

var allSizeLink;
var _isShowing = 0;

var sizesDiv= document.createElement("div");
sizesDiv.id = "all_sizes_dropdown";

var success = function(t) {
	var data = json_parse(t.responseText);
	
	// Init Menu Div
	sizesDiv.innerHTML = '';
	for (i = 0; i < data.sizes.size.length; i++) {
		sizesDiv.innerHTML += '<a href="' + data.sizes.size[i].url + '">' + data.sizes.size[i].label + '</a>';
		sizesDiv.innerHTML = sizesDiv.innerHTML + ' (' + data.sizes.size[i].width + 'x' + data.sizes.size[i].height + ') ';
		sizesDiv.innerHTML += '<br/>';
		sizesDiv.innerHTML += '<input size="70" id="' + data.sizes.size[i].label + '_' + _INFO_TAGS['_']['cnx'][ 'pid' ] + '" class="editable" style="font-size: 12px" type="text" value="&lt;a href=&quot;' + data.sizes.size[i].source + '&quot;&gt;View ' +  data.sizes.size[i].label + '&lt;/a&gt;">';
		sizesDiv.innerHTML += ' <a href="#" onClick="javascript: return sendToDesc(\'' + data.sizes.size[i].label + '_' + _INFO_TAGS['_']['cnx'][ 'pid' ] + '\')" title="Please click on the description textarea to make it editable first." >[paste]</a>';
		sizesDiv.innerHTML += '<br/>';
		
	}
	
	allSizeLink.innerHTML += '+';	// Visual marker to indicate that ZAPI call has completed
	allSizeLink.addEventListener('click', toggleAllSizesMenu, false);
	
}

unsafeWindow.sendToDesc = function (eleID) {
	
	if (document.getElementById(eleID)) {
		var textAreaDesc = document.getElementById('photodesc_' + _INFO_TAGS['_']['cnx'][ 'pid' ] + '_edit');
		if (textAreaDesc) {
			tagIt(textAreaDesc, document.getElementById(eleID).value + ' <a href="http://www.zooomr.com/photos/ping/4425960/">(?)</a>', '');
		}
	}
	hideAllSizesMenu();
	return false;
};


function tagIt (textAreaDesc, tagOpen,tagClose) {
	var v = textAreaDesc.value;
	var selLength = textAreaDesc.textLength;
	var selStart = textAreaDesc.selectionStart;
	var selEnd = textAreaDesc.selectionEnd;
	if (selEnd==1 || selEnd==2) selEnd=selLength;
	var start = (v).substring(0,selStart);
	var middle = (v).substring(selStart, selEnd)
		var end = (v).substring(selEnd, selLength);
	textAreaDesc.value = start + tagOpen + middle + tagClose + end;

	textAreaDesc.selectionStart = textAreaDesc.value.length;
	textAreaDesc.selectionEnd = textAreaDesc.value.length;
	textAreaDesc.focus();
	
}
	
function toggleAllSizesMenu(e) {
	
	if (!_isShowing) {
		// Hook on grandparent if the parent node is an alink
		if (e.target.parentNode.tagName == 'A') {
			eleHook = e.target.parentNode.parentNode;
		} else {
			eleHook = e.target.parentNode;
		}
		eleHook.appendChild(sizesDiv);

		unsafeWindow.Element.show(sizesDiv);
		_isShowing = 1;
	} else {
		unsafeWindow.Element.hide(sizesDiv);
		_isShowing = 0;
	}
}

function hideAllSizesMenu() {
	unsafeWindow.Element.hide(sizesDiv);
	_isShowing = 0;
}

doMain =  function() {
	var allSizeImg;
	allSizeImg = document.evaluate(
		'//img[@alt="All Sizes"]'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
	
	if (allSizeImg) {
		allSizeLink = allSizeImg.snapshotItem(0).parentNode;
		allSizeLink.href="";
		allSizeLink.setAttribute('onClick','javascript: return false;');
		if (allSizeLink.tagName == 'A') {
			ZAPI.callMethodJSON( 'zooomr.photos.getSizes', {'photo_id' : _INFO_TAGS['_']['cnx'][ 'pid' ]} , {onSuccess: success } );
		}
	}
	
}

unsafeWindow.setTimeout(doMain, 1);
	
})()

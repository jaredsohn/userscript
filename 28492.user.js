// ==UserScript==
// @name           Zooomr Wordle Tags
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Generates a tag list in your sidebar for use on Wordle.net.
// @include        http://*.zooomr.com/
// @include        http://*.zooomr.com
// @include        http://*.zooomr.com/page*
// @include        http://*.zooomr.com/zipline/
// @include        http://*.zooomr.com/zipline
// @include        http://*.zooomr.com/zipline/page*
// ==/UserScript==

(function() {

var ZAPI = unsafeWindow.ZAPI;
var json_parse = unsafeWindow.json_parse;
var global_nsid = unsafeWindow.global_nsid;
var $ = unsafeWindow.$;
var wordletext = "";
var _isOpen = false;

if (global_nsid == "00@Z01") {
	return;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
// Add some styling
addGlobalStyle(' li.WordleTags { background:transparent url(/images/silk/tag_blue.png) no-repeat; } ');


var success = function(t) {
var data = json_parse(t.responseText);
	for (i = 0; i < data.who._content.tags._content.tag.length; i++) {		
		if (data.who._content.tags._content.tag[i].machine_tag == "0") {

			for (x = 1; x < parseInt(data.who._content.tags._content.tag[i].count); x++) {
				if (wordletext != '') {  wordletext += " "; }
				wordletext += data.who._content.tags._content.tag[i]._content;
			}
		}
	}

	var divWordleTagsStatus = document.getElementById('divWordleTagsStatus');
	var taWordleTags = document.getElementById('taWordleTags');
	taWordleTags.value = wordletext;
	unsafeWindow.Element.hide(divWordleTagsStatus);
	unsafeWindow.Element.show(taWordleTags);
}

function generateWordleTags() {

	var divWordleTagsStatus = document.getElementById('divWordleTagsStatus');
	var taWordleTags = document.getElementById('taWordleTags');
	if (!_isOpen) {
		ZAPI.callMethodJSON( 'zooomr.tags.getListUser', {'user_id' : global_nsid, per_page: '500'} , {onSuccess: success } );
		unsafeWindow.Element.show(divWordleTagsStatus);
	} else {
		unsafeWindow.Element.hide(divWordleTagsStatus);
		unsafeWindow.Element.hide(taWordleTags);
	}
	_isOpen = !_isOpen;
	return false;
}

var divSideBar, eleList, listItem;
// Get the sidebar
divSideBar = document.evaluate(
	'//div[@id="sidebar"]'
	, document
	, null
	, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
	, null);
// Get the ul in the sidebar
if (divSideBar.snapshotLength > 0) {
	eleList = divSideBar.snapshotItem(0).getElementsByTagName('ul')[0];
}

if (eleList) {
	var liCount = eleList.getElementsByTagName('li').length;
	eleList.getElementsByTagName('li')[liCount - 1].style.marginBottom = '5px';
	
	// *** Add WordleTags link ***
	listItem = eleList.insertBefore(
		document.createElement('li')
		, null);
	listItem.setAttribute('class','WordleTags');
	
	var aWordleTags = listItem.appendChild(document.createElement('a'));
	aWordleTags.id = 'linkWordleTags';
	aWordleTags.href = '#';
	aWordleTags.innerHTML = 'Your Tags for Wordle.net';
	aWordleTags.setAttribute('class','smalllink_dblue');
	aWordleTags.setAttribute('onClick','javascript: return false;');
	aWordleTags.addEventListener('click', generateWordleTags, false);
	
	var divWordleTagsStatus = listItem.appendChild(document.createElement('div'));
	divWordleTagsStatus.id = 'divWordleTagsStatus';
	divWordleTagsStatus.innerHTML = 'Please wait...';
	unsafeWindow.Element.hide(divWordleTagsStatus);
	
	var taWordleTags = listItem.appendChild(document.createElement('textarea'));
	taWordleTags.id = 'taWordleTags';
	taWordleTags.setAttribute('class','editable');
	taWordleTags.setAttribute('style','width: 100%');
	taWordleTags.setAttribute('rows','7');
	taWordleTags.setAttribute('onClick','this.select();');
	unsafeWindow.Element.hide(taWordleTags);
	
}

})();

// ==UserScript==
// @name           Update Spotback Ratings Titles
// @namespace      http://www.dp.cx/archives/userscripts/
// @include        http://*.spotback.com/users/*
// ==/UserScript==

function updateLinks() {
	var objids = new Array();

	// get all of the 'links' for this page
	var links = $x("//tr[count(td)=1 and count(td/table) = 1]/td/table/tbody/tr/td/a");
	for(var lid = 0; lid < links.length; lid++) {
		var node = links[lid];
		if (node.innerHTML.match(/^edit$/)) {
			node.parentNode.innerHTML.match(/Item.edit\((\d+)\)/);
			objids.push(RegExp.$1);
			simulateClick(node);
		}
	}

	for(var i = 0; i < objids.length; i++) {
		var id = objids[i];
		GM_log(id);
		var inputUrl = document.getElementById('inputUrl_'+id).value;
		(function(id){
			GM_xmlhttpRequest({
			  method:  'GET',
			  url:     inputUrl,
			  headers: {
				'User-agent': 'GM_agent',
			  },
			  onload:  function(responseDetails) {
				if (responseDetails.status == 200) {
					responseDetails.responseText.match(/<title>(.*?)<\/title>/m);
					var title = RegExp.$1;
					document.getElementById('inputTitle_'+id).value = title;
					simulateClick(document.getElementById('inputTitle_'+id).parentNode.parentNode.parentNode.lastChild.previousSibling.previousSibling.previousSibling.childNodes[1].childNodes[1]);
				} else {
					simulateClick(document.getElementById('inputTitle_'+id).parentNode.parentNode.parentNode.lastChild.previousSibling.previousSibling.previousSibling.childNodes[1].childNodes[5]);
				}
			  }
			});
		})(id);
	}
}

GM_registerMenuCommand('Update Spotback Links', updateLinks);

function simulateClick(node) {
    var event = node.ownerDocument.createEvent("MouseEvents");

    var offsets = findPos(node);
    event.initMouseEvent("click",
                         true, // can bubble
                         true, // cancellable
                         node.ownerDocument.defaultView,
                         1, // clicks
                         offsets[0], offsets[1], // screen coordinates
                         offsets[0], offsets[1], // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         node);

    node.dispatchEvent(event);
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
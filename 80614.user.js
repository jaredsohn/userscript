// ==UserScript==
// @name          Reveal Anchors
// @namespace     http://userscripts.org/users/gimix/
// @description   Lets you make a link to a sepecific section of a document.
// ==/UserScript==

function revealNow() {
	var links;
	links = document.evaluate(
		// any <a name="..."> or <... id="..."> may be used as named anchor, as per http://www.w3.org/TR/REC-html40/struct/links.html
		"//a[@name] | //*[@id]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < links.snapshotLength; i++) {
		var a = links.snapshotItem(i);
		var anchorName = (a.name!=undefined && a.name.length > 0)?a.name:a.id;
		var fullAnchor = pageAddr + "#" + anchorName;
		//GM_log(fullAnchor);
		var ref = document.createElement("div");
/*		ref.innerHTML = '<div style="display: inline; position: relative;">' +
			'<div style="margin: 0 0 0 0; ' +
			'padding: 0 0 0 0; ' +
			'position: absolute; top: 0; left: -0.5em; ' +
			'font-size: x-small; ' + 
			'font-family: Arial, Helvetica, sans-serif; ' +
			'background-color: red; ' +
			'color: white;">' +
			'<a href="' + fullAnchor + '">#</a> ' +
			'</div></div>';
		a.parentNode.replaceChild(ref, a);
		ref.appendChild(a);*/
		ref.innerHTML =	'<a href="' + fullAnchor + '">#</a>';
		var posleft = postop = 0;
		var obj = a;
		do {
			posleft += obj.offsetLeft;
			postop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		posleft = (posleft>5)?(posleft-5):0;
		postop = (postop>5)?(postop-5):0;
		ref.style.position = 'absolute';
		ref.style.top = postop + 'px';
		ref.style.left = posleft + 'px';
		ref.style.margin = '0';
		ref.style.padding = '0';
		ref.style.backgroundColor = 'red';
		ref.style.fontFamily = 'Arial, Helvetica, sans-serif';
		ref.style.fontSize = 'x-small';
		ref.style.color = 'white';
		ref.style.zIndex = 999;
		document.body.appendChild(ref);
	}
}


var pageAddr = window.location.href;
var alm = pageAddr.search('#');
if(alm >= 0)
	pageAddr = pageAddr.substring(0, alm);
GM_registerMenuCommand("Reveal anchors", revealNow);
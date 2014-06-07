// ==UserScript==
// @name          hd editmax
// @namespace     http://hp.vector.co.jp/authors/VA024182/
// @description   hateda edit size max ,sidebar del
// @include       http://d.hatena.ne.jp/*/edit*
// ==/UserScript==

function delitem(it) {
	var item = document.evaluate(it , 
	document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotItem(0)) {
    		item.snapshotItem(0).parentNode.removeChild(item.snapshotItem(0));
	}
}

// delete tags "div" whose id are id
function deldiv(id) {
	delitem('//div[@id=\"' + id + '\"]' );
}

// delete tags whose name are tag
function deltag(tag) {
	delitem('//'+tag );
}

// delete evaluated items' parentNode
function delparent(it) {
	var item = document.evaluate(it , 
	document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotItem(0)) {
    	pt=item.snapshotItem(0).parentNode;
    	pt.parentNode.removeChild(pt);
	}
}


function deldelbtn() {
	delparent('//form/input[@value="delete"]');
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


deldiv('sidebar');
deldiv('neighbor-list');
deldiv('comment-list');
deldiv('referer-list');
deldiv('breadcrumbs');
deldiv('tips-message');
deldiv('backup');
deldiv('footer');
deltag('table');
deltag('div/table');
deldelbtn();
addGlobalStyle(
	'#main{ width: 100% ! important; margin-left:0px ! important; } ' +
	'#textarea-edit{ width: 100% ! important; height:1000px ! important; }' +
	'body, div, div.hatena-body{ width: 100% ! important; heigth: 100% ! important; margin: 0; padding: 0; }'
);
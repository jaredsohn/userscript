// gr_collapse_folders.user.js
// version 2.0 
// 2008-09-01
// Copyright (c) 2008, Giacomo Lacava <g.lacava@gmail.com>
// Released under the GPL license v.2
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          GoodReads Collapse Folders
// @description   Collapse/expand group folders
// @include       http://www.goodreads.com/group/show/*
// ==/UserScript==

MAX_FOLDERS = 'maxfolders';
MAX_FOLDERS_DEFAULT = 2;

// menu command to change threshold
function changeMaxFolders(){
	msg = "If a group has less folders than what specified here, they will not be collapsed by default.";
	var number;
	number = parseInt(window.prompt(msg,GM_getValue(MAX_FOLDERS, MAX_FOLDERS_DEFAULT)));
	GM_setValue(MAX_FOLDERS,number);
}
GM_registerMenuCommand("Change Number of Auto-Collapsed Folders ",changeMaxFolders);

// UI action function
function expand(event){
	topN = event.target.parentNode;
	nodes = topN.parentNode.childNodes; 
	numE = nodes.length;
	
	for(var i = 0; i < numE; i++){
		node = nodes[i];
		if((node.nodeType == node.ELEMENT_NODE) && (node != topN)){
			if(node.style.display == 'none'){
				node.style.display= 'block';
			} else {
				node.style.display= 'none';
			}
		}
	}
	event.preventDefault();
}

// add UI element to folders
folders =  document.evaluate(
		"//div[@class='brownBox']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (var f = 0; f < folders.snapshotLength ; f++){
	div = folders.snapshotItem(f);
	a = document.createElement('a');
	a.setAttribute('href','#');
	a.appendChild(document.createTextNode('[+/-]'));
	a.addEventListener('click',expand,false);
	div.insertBefore(a,div.firstChild);
}

// collapse all items at load if necessary
if(folders.snapshotLength > GM_getValue(MAX_FOLDERS,MAX_FOLDERS_DEFAULT)){
	items =  document.evaluate(
			"//div[@class='elementList'] |  //div[@class='elementList elementListLast']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
	for (var f = 0; f < items.snapshotLength ; f++){
		div = items.snapshotItem(f);
		div.style.display = 'none';
	}
}
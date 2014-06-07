// ==UserScript==
// @name           4chan no youtube videos in posts
// @namespace      http://userscripts.org/users/33432
// @description    Disables videos in mod posts on 4chan.
// @include        http://boards.4chan.org/*
// ==/UserScript==

function get(str){
	var list,elem;
	var res=[];
	
	list=document.evaluate(str,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var index=0;index<list.snapshotLength;index++){
		res[index]=list.snapshotItem(index);
	}	

	return res;
}

var elems=get("//blockquote/object");
for(i in elems){
	elems[i].parentNode.removeChild(elems[i]);
}

var elems=get("//embed");
for(i in elems){
	elems[i].parentNode.removeChild(elems[i]);
}

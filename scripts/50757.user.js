// ==UserScript==
// @name           4chan no japanese bird cooking spaghetti
// @namespace      http://userscripts.org/users/33432
// @description    Removes threads contating picture of japanese bird cooking spaghetti (some asshole keeps spamming the board with it)
// @include        http://zip.4chan.org/jp/*
// ==/UserScript==

function get(str,index){
	var list,elem;
	list=document.evaluate(str,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(index<0) index=list.snapshotLength+index;
	if(list.snapshotLength>index)
		return list.snapshotItem(index);

	return null;
}
function remove(str,index){
	var elem=get(str,index);
	if(elem)
		elem.parentNode.removeChild(elem);
}


var list=document.evaluate(
	'/html/body/form/a/img',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	
	if(!elem.attributes[5]) continue;
	
	var md5=elem.attributes[5].nodeValue;
	
	if(md5!='15XOrbEbx69kTYtA6h9THA==') continue;

	var s=elem.parentNode.previousSibling.previousSibling;
	
	while(1){
		var name=s.nodeName;
		
		var ns=s.nextSibling;
		s.parentNode.removeChild(s);
		s=ns;
		
		if(s.nodeName=="HR") break;
	}

}

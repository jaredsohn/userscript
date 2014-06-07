// ==UserScript==
// @name           CUBA
// @namespace      CU
// @include        http://bbs*.chinaunix.net/*
// ==/UserScript==

var blacklist = new Array("ttplay","albcamus","zxz1984","中山狼","YaoFei");

function hiderow(x){
	x.style.display="none";
}
function filterforumdisplay(x){
	author = x.cells[2].childNodes[1].childNodes[0].data;
	for (var i=0;i < blacklist.length;i++)
		if(blacklist[i] == author)
			return true;
	return false;
}
function filterthread(x){
	try{
		author = x.childNodes[1].rows[0].cells[0].childNodes[2].childNodes[0].childNodes[0].data;
		}
	catch(err){
		try{
			author = x.childNodes[1].rows[0].cells[0].childNodes[3].childNodes[0].childNodes[0].data;
		}
		catch(err){
			author = x.childNodes[1].rows[0].cells[0].childNodes[4].childNodes[0].childNodes[0].data;
			}
		}
	for (var i=0;i < blacklist.length;i++)
		if(blacklist[i] == author)
			return true;
	return false;
}

var r = new RegExp("http://bbs.\.chinaunix\.net/forum.*");

if (r.test(location.href)){
var trlist = new Array()
alltrs = document.evaluate( "//tr[@onmouseout=\"this.className='row'\"]", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<alltrs.snapshotLength;i++){
		trlist.push(alltrs.snapshotItem(i));
	}
trlist = trlist.filter(filterforumdisplay);
trlist.map(hiderow);

}else{

var tblist = new Array()
alltbs = document.evaluate( "/html/body/center/div[4]/form/table", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<alltbs.snapshotLength;i++){
		tblist.push(alltbs.snapshotItem(i));
	}
tblist = tblist.filter(filterthread);
tblist.map(hiderow);
}
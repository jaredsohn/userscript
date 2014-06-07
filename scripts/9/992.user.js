// ==UserScript==
// @name          Del.icio.us sort
// @namespace     http://mkgray.com:8000/userscripts
// @include       http://del.icio.us/*
// @description	  Sort del.icio.us items by number of people
// ==/UserScript==

(function() {

window.delishSortByNumber = function(){
    if(window.delishSorted){
	return;
    }

    var mainpath = '//div[@id="posts"]';
    //var xpath = '//div[@class="post"]//text()[contains(., "other")]';
    var xpath = '//div[@class="post"]/div[@class="meta"]/a[last()-1]/text()';
    var numxpath = '//div/a[@class="delNav"]/text()[contains(., "other")]';
    var theLinks = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var entries = new Array();
    var entryCount = new Array();
    for(i = 0; entry=theLinks.snapshotItem(i);i++){
	pdiv = entry.parentNode.parentNode.parentNode;
	pdiv.did = i;
	result = entry.nodeValue.match(/(\d+) other/);
	if(result){
		npeople = Number(result[1]);
	}
	else{
		npeople = Number(0);
	}
	entries.push(pdiv);
	entryCount[pdiv.did] = npeople;
    }
    topLinks = entries.sort(function(a,b) { return entryCount[a.did]-entryCount[b.did];});

    var delMainRes = document.evaluate(mainpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var delMain = delMainRes.snapshotItem(0);
    for (i=0;i<topLinks.length;i++){
	link = topLinks[i];
	delMain.insertBefore(link,delMain.firstChild);
    }
   window.delishSorted = true;
};

window.delishSortByRecency = function(){
    if(!window.delishSorted){
	return;
    }

    var mainpath = '//div[@id="posts"]';
    var xpath = '//div[@class="post"]/div[@class="meta"]/a[last()-1]/text()';
    var theLinks = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var entries = new Array();
    var entryCount = new Array();
    for(i = 0; entry=theLinks.snapshotItem(i);i++){
	pdiv = entry.parentNode.parentNode.parentNode;
	pdiv.ndid = i;
	result = entry.nodeValue.match(/(\d+) other/);
	if(result){
		npeople = Number(result[1]);
	}
	else{ npeople = 0; }
	entries.push(pdiv);
	entryCount[pdiv.ndid] = npeople;
    }
    topLinks = entries.sort(function(a,b) { return b.did-a.did;});
    var delMainRes = document.evaluate(mainpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var delMain = delMainRes.snapshotItem(0);
    for (i=0;i<topLinks.length;i++){
	link = topLinks[i];
	delMain.insertBefore(link,delMain.firstChild);
    }
    window.delishSorted = false;
};

delishSortByNumber();

var banright = '//div[@class="banner"]';
var banRes = document.evaluate(banright, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var banner = banRes.snapshotItem(0);

cmdlink = document.createElement("span");
cmdlink.innerHTML = '| <a href="javascript:delishSortByNumber();" onclick="delishSortByNumber()">Sort</a> | <a href="javascript:delishSortByRecency();" onclick="delishSortByRecency()">Unsort</a>';
banner.appendChild(cmdlink);

})();

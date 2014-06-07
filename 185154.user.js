// ==UserScript==
// @name          Block Sopher
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   sorry 2 block our big Philosopher at CqDouBan
// @include       http://www.douban.com/group/cq/*
// @include       http://douban.com/group/cq/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

//alert('Good Bye Sopher !');
function blockSopher(){

    //alert("Sorry,My Dear Sopher :-(");
    var allDivs, thisDiv;
    allDivs = document.evaluate(
    	"//a[@href='http://www.douban.com/group/people/81024673/']/parent::*", //u can block anyone by replace the '62765584' to any id like  'ezcafe' or '74371789'
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    for (var i = 0;i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
    	thisDiv=thisDiv.parentNode;
    	thisDiv.parentNode.removeChild(thisDiv);
    
        }
    

}


blockSopher();
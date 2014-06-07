// ==UserScript==
// @name          remove-ad-sinanews
// @description   remove sina news ad
// @namespace     http://blog.sina.com.cn/nmgxiaozhao
// @include       http://news.sina.com.cn/*
// by laoniu 
// Email:nmgxiaozhao@126.com
// ==/UserScript==

var topAD=matchNode('//div[@class="topAD"]').snapshotItem(0);
topAD.parentNode.removeChild(topAD); 
var NewsNav=matchNode('//div[@class="NewsNav"]').snapshotItem(0);
NewsNav.parentNode.removeChild(NewsNav); 


function matchNode(xpath, root){
    var type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    var doc = root ? root.evaluate ? root : root.ownerDocument : document;
    return doc.evaluate(xpath, root || doc, null, type, null);
}
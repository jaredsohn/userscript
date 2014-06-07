// ==UserScript==
// @name           CWEB FY Party Killer
// @namespace      http://pto2k.blogspot.com
// @description    眼不见 页自翻
// @include        http://*cwebgame.tld/*
// ==/UserScript==

/* 通用函数*/
/* 用id查对象 */

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

posts = xpath("//div[@class='t_msgfont']")
postsParent = xpath("//div[@class='t_msgfont']/ancestor::div[@class='spaceborder']")
if (posts){
    for (i=0;i<posts.snapshotLength;i++){
        str = posts.snapshotItem(i).innerHTML
        z1 = str.search(/翻页/);
        z2 = str.search(/沙发/);
        if((z1!=-1)||(z2!=-1)){
            postsParent.snapshotItem(i).parentNode.removeChild(postsParent.snapshotItem(i))
        }
    }
}

// ==UserScript==
// @name           booksky frame killer
// @namespace      http://blog.chris.tw/
// @description    針對快眼看書網站，去掉上頭的頁框，只顯示目的網頁。
// @author chris
// @version 1.0.4
// @date 2013-05-02
// @homepageURL http://userscripts.org/scripts/show/80583
// @updateURL https://userscripts.org/scripts/source/80583.meta.js
// @include        http://view.booksky.org/*
// @include        http://view.bookcu.com/*
// @include        http://search.booksky.org/ViewBook.aspx?SiteID=*
// @include        http://www.booksky.org/ViewBook.aspx?*
// @include        http://www.yankanshu.com/view.php?*
// ==/UserScript==

// Chris 的第一支 GreaseMonkey 腳本 
// http://blog.chris.tw/

// 學自 http://www.firefox.net.cn/dig/patterns/match-attribute.html
// http://userscripts.org/scripts/show/1346 Frame Killer Plus 亦有相同效果且通用性更強，會直接除去主要框架以外的小框架。


var allFrames, thisFrame, newLoc='';
allFrames = document.evaluate(
    "//frame[@name='Main']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allFrames.snapshotLength; i++) {
    thisFrame = allFrames.snapshotItem(i);
    // 得到所有名稱為main的頁框
    newLoc=thisFrame.src;
}
if (newLoc!='') document.location.replace(newLoc);
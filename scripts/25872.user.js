// ==UserScript==
// @name           MACD Attachment Link Fixer
// @namespace      http://www.quchao.com/
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    Fixing the attachment link at MACD
// @include        http://bbs.macd.cn/*
// ==/UserScript==


/*-----------------------------------------------------------------------------
* Core
*-------------------------------------------------------------------------- */
    
var links = document.evaluate('//a[starts-with(@href,"http://bbs.macd.cn/attachment.")]', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (links) {
    var linkLen = links.snapshotLength;
    for(var i = 0; i < linkLen; i ++){
        thisLink = links.snapshotItem(i);
        alert(thisLink.href);
        thisLink.href = thisLink.href.replace('http://bbs.macd.cn/attachment.','http://bbs.macd.cn/attachments.');
    }
}
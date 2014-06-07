// ==UserScript==
// @id             www.colg.cn-63ca0296-eb4c-4cc4-b34d-8868ec34ffa0@RinkoW
// @name           FUCK COLG Hide Topics
// @version        1.0
// @namespace      RinkoW
// @author         
// @description    
// @include        http://www.colg.cn/thread-*.html
// @include        http://colg.cn/thread-*.html
// @run-at         document-end
// ==/UserScript==

function $(id)
{
    return document.getElementById(id);
}

var sshot = document.evaluate('//div[@class="locked"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if(sshot.snapshotLength > 0)
{
    $('fastpostmessage').value = unescape('%u697C%u4E3B%u5927%u50BB%u903C');
    $('fastpostsubmit').click();
}

// ==UserScript==
// @name           Hi-PDA论坛屏蔽ID
// @description    屏蔽Hi-PDA论坛的烦人ID 
// @namespace      
// @version    0.1
// @include        *www.hi-pda.com/forum/viewthread.php*
// @include        *www.hi-pda.com/forum/forumdisplay.php*
// ==/UserScript==


// 需要屏蔽的ID列表，注意引号和逗号
var blockList = [
    '锅王胡师傅',
    '傻逼',
];

// 是否显示“已屏蔽”占位符，true显示，false直接清除
var placeHolder = false;


for (i in blockList) {
    u = blockList[i];
    if (window.location.href.indexOf('viewthread.php') != -1) {
        xr = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + u + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (j = 0; j < xr.snapshotLength; ++j) {
            if (placeHolder) {
                xr.snapshotItem(j).parentNode.innerHTML = '<center>已屏蔽</center>';
            } else {
               xr.snapshotItem(j) .parentNode.remove();
            }
        }
    } else if (window.location.href.indexOf('forumdisplay.php') != -1) {
        xr = document.evaluate('//table/tbody/tr[1][td[3]//a[text()="' + u + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (j = 0; j < xr.snapshotLength; ++j) {
            if (placeHolder) {
               xr.snapshotItem(j) .innerHTML = '<td class="folder"><td></td></td><th class="subject">已屏蔽</th>';
            } else {
                xr.snapshotItem(j).parentNode.remove();
            }
        }
    }
}

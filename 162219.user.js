// ==UserScript==
// @name       Open Original Links for getPocket
// @author	   s2marine
// @version    2.71 
// @description  Pocket打开原始链接
// @homepageURL    https://userscripts.org/scripts/show/162219
// @updateURL      https://userscripts.org/scripts/show/162219.meta.js
// @downloadURL    https://userscripts.org/scripts/show/162219.user.js
// @include     http://getpocket.com/a/*
// @include     https://getpocket.com/a/*
// ==/UserScript==

function changeOriginalLink(data) {
    //console.debug('change Original Links');
    for (var each in data) {
        //console.debug(data[each]["item_id"]);
        id = data[each]["item_id"];
        unsafeWindow.$("#i"+id+" .link")[0].href = unsafeWindow.$("#i"+id+" .original_url")[0].href;
        unsafeWindow.$("#i"+id+" .link").attr('class','link start_webview');
        //console.debug(item[0]);
    }
}
function rebuildListHooker(data, o) {
    unsafeWindow.wb.newRebuildList(data, o);
    changeOriginalLink(data);
}
function checkAndHook() {
    if (!unsafeWindow.wb.newRebuildList) {
        unsafeWindow.wb.newRebuildList = unsafeWindow.wb.rebuildList;
        unsafeWindow.wb.rebuildList = rebuildListHooker;
    }
}
function init(){
    checkAndHook();
    //console.debug('init');
}

function main() {
    init();
}
main();

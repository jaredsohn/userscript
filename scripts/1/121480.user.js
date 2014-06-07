// ==UserScript==
// @name           No Image In Douban Group
// @namespace      douban.com
// @description    No image in douban group
// @include        http://www.douban.com/group/topic/*
// ==/UserScript==

var oContent = document.getElementById('content');
var aImgs = oContent.getElementsByTagName('img');
var iImgCount = aImgs.length;
for(var i = 0; i < iImgCount; i++) {
    if(aImgs[i].src.indexOf("group_topic") != -1) {
        oImgParent = aImgs[i].parentNode;
        oSpan = oImgParent.getElementsByTagName('span');
        if(oSpan.length > 0) {
            oImgParent.getElementsByTagName('span')[0].style.display = 'none'
        }
        oNewSpan = document.createElement("span");
        sTitle = '';
        if(aImgs[i].alt) {
            sTitle = aImgs[i].alt;
        } else {
            sTitle = aImgs[i].src;
        }
        oNewSpan.innerHTML = '<a target="_blank" href="' + aImgs[i].src + '">'+sTitle+'</a>';
        oImgParent.insertBefore(oNewSpan, aImgs[i]);
        aImgs[i].style.display = 'none';
    }
}

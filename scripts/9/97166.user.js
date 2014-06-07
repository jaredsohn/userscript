// ----------------------------------------
// Name     open in current tab
// Version  1.1
// Author   jiazhoulvke
// email    jiazhoulvke@gmail.com
// blog     http://jiazhoulvke
// ----------------------------------------
// ==UserScript==
// @name          open in current tab
// @namespace     http://jiazhoulvke.com/
// @version       1.1
// @description   强制在当前窗口打开链接
// @include       *
// @exclude       http://chrome.google.com/*
// ==/UserScript==

var linkArray=document.getElementsByTagName("A");
for (i=0;i<linkArray.length;i++) {
    if (linkArray[i].href!="#" && linkArray[i].href!="javascript:;" && linkArray[i].href!="javascript:void(0)") {
        linkArray[i].target="_self";
    }
}

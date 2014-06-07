// ==UserScript==
// @name       Enable Install Chrome Web Store Extensions
// @namespace  http://userscripts.org/scripts/source/69621.user.js
// @version    1.4
// @description  使非 Chrome 浏览器可以在 Chrome 应用商店直接下载扩展；使用方法：点击蓝色的按钮“适用于 Chrome 浏览器”
// @match      http*://chrome.google.com/webstore/*
// @copyright  2013, DemoJameson
// ==/UserScript==

document.addEventListener('click', function(oE){
    if (oE.button === 0 || oE.button === 1) {
        var oD = oE.target;
        if(/适用于 Chrome 浏览器|加到 Chrome|Available on Chrome/.test(oE.target.textContent)) {
            oE.stopPropagation();
            oE.preventDefault();
            var oA = document.evaluate('ancestor-or-self::a', oE.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            var sID = oA.pathname.replace(/.+\//,'');
            location.href = 'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D' + sID + '%26uc';
        }}
}, true);
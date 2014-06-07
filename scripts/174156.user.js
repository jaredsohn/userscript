// ==UserScript==
// @name        Enable Install Chrome Extensions
// @namespace   :)
// @version     1
// @description Chrome 
// @match       https://chrome.google.com/webstore/*
// ==/UserScript==

document.addEventListener('click', function(oE){
    if (oE.button === 0 || oE.button === 1) {
        var oD = oE.target;
        if(/??? Chrome ???|?? Chrome|Available on Chrome/.test(oE.target.textContent)) {
            oE.stopPropagation();
            oE.preventDefault();
            var oA = document.evaluate('ancestor-or-self::a', oE.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            var sID = oA.pathname.replace(/.+\//,'');
            location.href = 'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D' + sID + '%26uc';
        }}
}, true);
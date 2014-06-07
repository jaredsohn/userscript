// ==UserScript==
// @name        Twitter auto PR cutter
// @namespace   http://twitter.com/teraminato
// @description 血気盛んな少年少女達が若さ故に手を出してしまう自動自己宣伝ツイートとかが原因で「いままでありがとう」と言ってしまう前に、一度それらを一掃してすがすがしいTLにしてすがすがしいTLにしてみませんか。 (Based on Dan Carleton)
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @author      Teraminato
// @version     0.1.3.4
// ==/UserScript==

(function(){
IyanItem = "//div[contains(@data-screen-name, 'dummy') or *[contains(text(),'【自動')] or *[contains(text(),'[自動]')] or *[contains(text(),'RT ')] or *[contains(text(),' RT')] or *[contains(text(),'拡散希望')] or *[contains(text(),'[bot')] or *[contains(text(),'dummy')]]/..";

function IyanCutter() {
    var result = document.evaluate(
        IyanItem,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    
    for (var i = 0; i < result.snapshotLength; i++) {
        var target = result.snapshotItem(i);
        target.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
    IyanCutter()
}, false);

window.setInterval(IyanCutter, 2000);
})();
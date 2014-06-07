// ==UserScript==
// @name           delayLoadingImages
// @namespace      ericpromislow.com
// @description    delay the image
// @include        http://www.example.com/
// ==/UserScript==

var imgs = document.evaluate("//img[@src]",
                             document,
                             null,
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
                             );
for (var i = 0; i < imgs.snapshotLength; i++) {
    var img = imgs.snapshotItem(i);
    var src = img.src;
    var button = document.createElement("button");
    button.value = "Show " + src;
    img.parentNode.replaceChild(button, img);
    var showSrc = function(event) {
        var new_img = document.createElement("img");
        new_img.src = src;
        button.parentNode.replaceChild(new_img, button);
    };
    button.addEventListener('click', showSrc, false);
}

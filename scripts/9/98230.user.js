// ==UserScript==
// @name          FUCK imageshack
// @description   imageshack link auto fix
// @version	      1.0
// @include       *
// ==/UserScript==
var links, oldimg, src, newimg;
links = document.evaluate(
    "//img[@src]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < links.snapshotLength; i++) {
    oldimg = links.snapshotItem(i);
    src = oldimg.src;
    if (src.match(/^http:\/\/img\d+\.imageshack\.us/)) {
		oldimg.style.display = "none";
		src = src.replace(/img\d+/, 'a');
		newimg = document.createElement("img");
		newimg.src = src;
		oldimg.parentNode.insertBefore(newimg, oldimg);
    }}
// ==UserScript==
// @name           Click and Download Image
// @namespace      sizzlemctwizzle
// @description    Click an image and have it downloaded automatically
// @include        *
// ==/UserScript==

function forEach(lst, cb) {
  for (var i = 0, len = lst.snapshotLength; i < len; ++i)
    cb(lst.snapshotItem(i), i, lst);
}

forEach(document.evaluate('//img[@src]', document, null, 6, null), function(node) {
    node.addEventListener('click', function(e) {
        GM_downloadFile(e.target.src, 'pics');
     }, false);
});

GM_registerMenuCommand("Select image download path", function(){
    GM_chooseSaveLocation('pics');
});

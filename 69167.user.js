// ==UserScript==
// @name  one.lv REAL big photos
// @include        *one.lv/viewPhoto.do*
// ==/UserScript==

var img,imgs;
imgs = document.evaluate(
  "//img",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = 0; i < imgs.snapshotLength; i++) {
  img = imgs.snapshotItem(i);
  if (img.src.match('getImage')){
    img.src = img.src.replace(/photoType=\d+/,'photoType=3');
  }
}

location.href = 'javascript:void(PopupPage.resizeHeight())';
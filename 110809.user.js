// ==UserScript==
// @name          【ＰＣ製作】真．閃電十一人爆裂論壇上線會員圖示更改器
// @description   這個Script可以把真．閃電十一人爆裂論壇的上線會員圖示變更為円堂（調調神用）（圖片來自悠炎（管姐））（ＰＣ製作請勿抄襲）Ｐ.Ｓ.如有問題可洽爆裂論壇的pcchou
// @version	      1.3
// @icon          http://beelzebub.sclub.tw/images/common/http://3.share.photo.xuite.net/saberlin12/13c40b1/4700436/194732445_x.jpg
// @include       http://beelzebub.sclub.tw/*
// ==/UserScript==
var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('images/common/http://3.share.photo.xuite.net/saberlin12/13c40c4/4700436/195236528_x.jpg');
	if (srcMatch != null) {
  thisImg.src = 'http://3.share.photo.xuite.net/saberlin12/13c40b1/4700436/194732445_x.jpg';
	}
}
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('images/common/http://3.share.photo.xuite.net/saberlin12/13c40c3/4700436/195236527_x.jpg');
	if (srcMatch != null) {
  thisImg.src = 'http://3.share.photo.xuite.net/saberlin12/13c40ca/4700436/194810806_x.jpg';
	}
}
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('images/common/http://3.share.photo.xuite.net/saberlin12/13c40c5/4700436/195236529_x.jpg');
	if (srcMatch != null) {
  thisImg.src = 'http://3.share.photo.xuite.net/saberlin12/13c40ac/4700436/194809496_x.jpg';
	}
}
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('images/common/http://3.share.photo.xuite.net/saberlin12/13c40d6/4700436/194703298_x.jpg');
	if (srcMatch != null) {
  thisImg.src = 'http://3.share.photo.xuite.net/saberlin12/13c40c9/4700436/194740917_x.jpg';
	}
}
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('images/common/online_member.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://3.share.photo.xuite.net/saberlin12/13c40b1/4700436/194732445_x.jpg';
	}
}


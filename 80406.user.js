// ==UserScript==
// @author         Palad1
// @name           Ars Proper Edit Quote Icons
// @namespace      com.arstechnica.palad1
// @description    Proper edit icons for ars openforum
// @include        http://arstechnica.com/civis/viewtopic.php*
// ==/UserScript==



// <div class="post-actions">
//    <a href="./posting.php?mode=quote&amp;f=23&amp;p=20565159"><img src="http://static.arstechnica.com/civis/ars/imageset/en/icon_post_quote.png" alt="Reply with quote" title="Reply with quote"></a>
// </div>


var snapImgPost = document.evaluate("//*[@class='post-actions']/a/img[contains(@src,'http://static.arstechnica.com/civis/ars/imageset/en/icon_post_edit.png')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i =snapImgPost.snapshotLength-1;i>=0;--i){
	var imgPost=snapImgPost.snapshotItem(i);
	imgPost.src='http://www.aurichlawson.com/ars/misc/banana_rider.gif';
	imgPost.setAttribute('alt','AUTOADD : I like pie. Me to. QFT. This. ');
}

snapImgPost = document.evaluate("//*[@class='post-actions']/a/img[contains(@src,'http://static.arstechnica.com/civis/ars/imageset/en/icon_post_quote.png')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i =snapImgPost.snapshotLength-1;i>=0;--i){
	var imgPost=snapImgPost.snapshotItem(i);
	imgPost.src='http://www.aurichlawson.com/ars/misc/banana0tq.gif';
	imgPost.setAttribute('alt','And so quoteth teh bananath');
}
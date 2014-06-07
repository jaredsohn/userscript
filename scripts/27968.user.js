// ==UserScript==
// @name           ImageModScript
// @namespace      http://localhost
// @description    This script changes the images used in HoboWars. There was a special request for a green  lightsaber. Change the URLs if you want different pictures, it's pretty simple. 
// @author         Xyan Flux
// @version        1.0.1
// @include        http://www.hobowars.com/fb/game.php* 
// @exclude
// ==/UserScript==


var allImgs, thisImg;
allImgs = document.evaluate('//img[@src]',document,null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImgs = allImgs.snapshotItem(i);

	if(thisImgs.src=='http://www.hobowars.com/images/items/gifs/Lightsaber.gif'){
		thisImgs.src='http://www.light-sabers.net/images/fantasy-lightsaber-green.jpg';
	}else if(thisImgs.src=='http://www.hobowars.com/images/items/gifs/Tron-Armor.gif'){
		thisImgs.src='http://cache.reelzchannel.com/assets/content/blog/TronBlog.jpg';
	}else if(thisImgs.src=='http://www.hobowars.com/images/items/gifs/Gold-Ring-with-Diamond.gif'){
		thisImgs.src='http://www.hmns.org/images/The-One-Ring2.jpg';
	}
}




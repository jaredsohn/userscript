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

		thisImgs.src='http://www.hobowars.com/images/items/gifs/Lightsaber.gif';

	}else if(thisImgs.src=='http://www.hobowars.com/images/items/gifs/Tron-Armor.gif'){

		thisImgs.src='http://www.hobowars.com/images/items/gifs/Tron-Armor.gif';

	}else if(thisImgs.src=='http://www.hobowars.com/images/items/gifs/Gold-Ring-with-Diamond.gif'){

		thisImgs.src='http://img.skitch.com/20080626-nyb35jfr1bp9h5hskbm84xd64e.jpg';

	}

}








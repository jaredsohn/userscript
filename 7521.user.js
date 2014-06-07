// ==UserScript==
// @name          Rotteneggs: Anti-PageStretching 
// @namespace     Junkie Monkey
// @description	  Limits Maximum Image Sizes to 640px X 480px So Spammers Cant Stretch Pages and So Mods Can Easly Drop Shit Eggs.
// @include       *
// ==/UserScript==
// MaxImageSize.user.js

//I hope You Guys Like This. The Idea For This Script Came From This Fourm Post: http://www.rotteneggs.com/r3/show/se/700-forum-display_topic-0-1-1462887.html

/*
This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
select "MaxImageSize", and click Uninstall.
*/

(function() {
   window.addEventListener("load", function(e) {
	var t0 = new Date().getTime();
    var imgList = document.getElementsByTagName("img");
	for (i=0; i < imgList.length; i++)
	{
		var width = imgList[i].width;
		var height = imgList[i].height;

		if (width > 640 || height > 480)
		{
			imgList[i].width = Math.min(width, 640);
			imgList[i].height = Math.min(imgList[i].width * height / width, 480);
			imgList[i].width = imgList[i].height * width / height;
//			window.status = ("GreaseMonkey - MaxImageSize Re-sized " + imgList[i].src + " to be " + imgList[i].width + " x " + imgList[i].height);
//			alert(imgList[i].src + "\nis now " + imgList[i].width + " x " + imgList[i].height);
		}
	}
	var t1 = new Date().getTime();
//	alert("Resized " + imgList.length + " images on this page in " + ((t1-t0)/1000) + " seconds");
	return;
  }, false);
})();



// ==UserScript==
// @name          MaxImageSize
// @namespace     http://not.pers3vs.net/userscripts
// @description	  Limits Maximum Image Sizes to 5000px X 5000px
// @include       *
// ==/UserScript==
// MaxImageSize.user.js

/* 
"The flaw allows a hacker Web site to crash both IE and Firefox by displaying an image with
huge height and width attributes. There's no workaround for Internet Explorer. But you can
prevent the problem from affecting Firefox by installing an extension named Grease Monkey. In
the words of Andrew, the poster, you then use the extension program to write a DHTML user
script and set a height and width limit for images to 5000 pixels."
- Brian Livingston 4/14/2005
*/

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

		if (width > 5000 || height > 5000)
		{
			imgList[i].width = Math.min(width, 5000);
			imgList[i].height = Math.min(imgList[i].width * height / width, 5000);
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



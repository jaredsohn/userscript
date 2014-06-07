/*
This is my first greasemonkey script. What it does is if you go to a private page on bebo that your not allowed
to view ("Sorry, No Can Do") It will enlarage the persons 60X60 image of them selfs so you can better see
who they are and be sure they are really the person you want to add. I made this because with 1600X1200 res
on a 17' screen there pic becomes very small and you cant even see who the person was.

*/


// ==UserScript==

// @name           bebo big image
// @namespace      bmgjet

// @include        http://www.bebo.com/c/profile/no_can_do?MemberId=*
// @include       http://*.bebo.com/*


// ==/UserScript==



var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
	var image_element = imgs[i];
	if(image_element.src.toLowerCase().match(/^http:\/\/i(.*).bebo.com\/(.*)/)) {
		image_element.src = image_element.src.replace("small","mediuml");
		image_element.src = image_element.src.replace("s.jpg","ml.jpg");
		image_element.setAttribute("width", "auto");
		image_element.setAttribute("height", "auto");
	}

}

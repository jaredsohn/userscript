// ==UserScript==
// @name           ImageBam.com Just Image
// @namespace      freakz
// @description    Gives you the image from ImageBam on its own and resizes it for you for your browser window
// @include        http://www.imagebam.com/image/*
// @version        0.2
// ==/UserScript==

/*Notes [Known Bugs]:
 - The Automatic resizer is a bit buggy and can sometimes leave images at a resized 
   resolution. Just resize the window again to reset! [F11 x2]
*/
var timer = 3;

//Do not change below here
var height = 0;
var imgheight = 0;

function main(){	
	var img = document.getElementById("imageContainer").getElementsByTagName('tr')[1].getElementsByTagName('img')[0];

	height = window.innerHeight;
	imgheight = img.height;
	
	if (height > imgheight){
		height = imgheight;
	}
		
	var newbd = "<img align=\"left\" height=\"" + height + "px\" src=\"" + img.src + "\" \\>";
	document.body.innerHTML = newbd;
	document.body.setAttribute("onResize", "tempImage = new Image(); tempImage.src = document.getElementsByTagName('img')[0].src; tempImage.onload = \"\"; if (tempImage.height < window.innerHeight){document.getElementsByTagName('img')[0].height = tempImage.height;} else {document.getElementsByTagName('img')[0].height = window.innerHeight;}", true);
}

window.setTimeout(main, timer * 1000);
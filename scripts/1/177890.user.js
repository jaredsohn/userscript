(function () {
// ==UserScript==
// @name          Ohloh colorize commit sparks
// @description   Colorize commit spark graphs by seasons
// @version       1.0
// @copyright     2013
// @namespace     http://deetah.jogger.pl
// @include       https://www.ohloh.net/p/*/contributors*
// @debug         0
//
// ==/UserScript==


 
function find_starting_month(imageData)
{
    var y = 22;
    for(x=0; x<imageData.width; x++) {
	var idx = y*imageData.width+x;
	if (imageData.data[4*(idx)+0]==0 && imageData.data[4*(idx)+3]==255)
	  break;
    }
    return x;
}

function replace_image(image)
{
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image onto the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    // Get the pixel data
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    var startingMonth = find_starting_month(imageData);
    
    var currentMonth = startingMonth/3 + 3; //+1 because it was zero-indexed
    for (x=0; x<imageData.width; x+=3) {
	currentMonth = (currentMonth + 1) % 12;
	var idx = 22*imageData.width+x;
	if (imageData.data[4*(idx)] != 169) {
	    continue;
	}
	if (currentMonth >= 0 && currentMonth <= 2) {
	    for (y=23; y>=0; y--) {
		for (x2=x; x2<x+2; x2++) {
		    idx = y*imageData.width+x2;
		    if (imageData.data[4*(idx)] != 169) {
			break;
		    }
		    imageData.data[4*(idx)] = 175;
		    imageData.data[4*(idx)+1] = 169;
		    imageData.data[4*(idx)+2] = 232;
		    imageData.data[4*(idx)+3] = 255;
		}
	    }
	}

	if (currentMonth >= 3 && currentMonth <= 5) {
	    for (y=23; y>=0; y--) {
		for (x2=x; x2<x+2; x2++) {
		    idx = y*imageData.width+x2;
		    if (imageData.data[4*(idx)] != 169) {
			break;
		    }
		    imageData.data[4*(idx)] = 169;
		    imageData.data[4*(idx)+1] = 232;
		    imageData.data[4*(idx)+2] = 175;
		    imageData.data[4*(idx)+3] = 255;
		}
	    }
	}

	if (currentMonth >= 6 && currentMonth <= 8) {
	    for (y=23; y>=0; y--) {
		for (x2=x; x2<x+2; x2++) {
		    idx = y*imageData.width+x2;
		    if (imageData.data[4*(idx)] != 169) {
			break;
		    }
		    imageData.data[4*(idx)] = 255;
		    imageData.data[4*(idx)+1] = 165;
		    imageData.data[4*(idx)+2] = 0;
		    imageData.data[4*(idx)+3] = 255;
		}
	    }
	}

	if (currentMonth >= 9 && currentMonth <= 11) {
	    for (y=23; y>=0; y--) {
		for (x2=x; x2<x+2; x2++) {
		    idx = y*imageData.width+x2;
		    if (imageData.data[4*(idx)] != 169) {
			break;
		    }
		    imageData.data[4*(idx)] = 232;
		    imageData.data[4*(idx)+1] = 176;
		    imageData.data[4*(idx)+2] = 137;
		    imageData.data[4*(idx)+3] = 169;
		}
	    }
	}

    }

    ctx.putImageData(imageData, 0, 0);
    image.parentNode.replaceChild(canvas, image);
}

window.onload = function () 
{
    var imgs = document.getElementsByTagName("img");
    for (i=0; i<imgs.length; i++) {
	if (imgs[i].alt == "Commits_spark") {
	    replace_image(imgs[i]);
	}
    }
};

})();
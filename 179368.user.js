// ==UserScript==
// @name        Quickie
// @namespace   Test
// @description Testing better document resizing
// @include     http://www.smartestk12.com/demo
// @version     1.1
// @grant       none
// ==/UserScript==

window.onresize = resizeEvent;							//Initialization
imageHolder = document.getElementById("imageHolder0");
myCanvas = document.getElementById("myCanvas0");


imageHolder.style.width = "900px"; // I'm taking a guess and saying that document height is pushed
myCanvas.style.width = "900px"; // from the server, so I'm making width a definite width too,
						  // instead of a percentage of the window width. In actual deployment,
						  // width would also be given in definite units from the server.

originalHeight = parseInt(imageHolder.style.height.replace("px", "")); 
originalWidth = parseInt(imageHolder.style.width.replace("px", ""));

function resizeEvent(){         //If the region is too small, scale to fit
    if (window.innerWidth > 30 + originalWidth) {
        imageHolder.style.height = originalHeight + "px";
        imageHolder.style.width = originalWidth + "px";
    } else {
        imageHolder.style.height = (originalHeight * $(window).width() / (originalWidth - 30)).toString() + "px";
        imageHolder.style.width = ($(window).width() - 30).toString() + "px";
    }
    myCanvas.style.height = imageHolder.style.height;
    myCanvas.style.width = imageHolder.style.width;
}

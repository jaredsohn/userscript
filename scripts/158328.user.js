// ==UserScript==
// @name        Image Rotator
// @namespace   Cromagnon
// @description Control Right-click to rotate images
// @include     *
// @version     1.0.0202
// ==/UserScript==



//go through and add the listener to all images
//
function rotateImage(e) {

  if (!e.ctrlKey) return;
  
  e.preventDefault();
  
  var img = e.target;

  if (img.style && img.style.transform) {
  
    var rotation = img.style.transform;
 
    if (!rotation.match(/rotate\(\d+deg\)/)) return;

    rotation = Number(rotation.match(/\d+/)[0]);
	
    rotation += (rotation == 315) ? -315 : 45;
	  
    img.style.transform = "rotate(" + rotation + "deg)";
    
   } else img.style.transform = "rotate(45deg)";

};



//go through and add the listener to all images
//
function hookImageRightClick(e) {

  var target = (e == null) ? document : e.target;
  
  if (target.nodeName == "IMG")
  
      target.addEventListener("contextmenu", rotateImage, false);
  
  var images = target.getElementsByTagName("img");
  
  for(var i = 0; i < images.length; i++)
  
      images[i].addEventListener("contextmenu", rotateImage, false);
  
};



// Main function
//
function init() {

    hookImageRightClick();

    document.addEventListener("DOMNodeInserted", hookImageRightClick, false);

};



// Call our main function.
//

init();

//end
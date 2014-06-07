// ==UserScript==
// @name        Image auto resize
// @namespace   rb_image_resize
// @include     *
// @exclude *.png*
// @exclude *.jpg*
// @exclude *.jpeg*
// @exclude *.bmp*
// @version     1.0
// ==/UserScript==

var maxWidth = 800;
var maxHeight = 600;

GM_addStyle("img.gm_image_resize {border: 2px solid silver; margin:0px;} img.gm_image_resize:hover {border-color: gray;}");
GM_addStyle(".cursor_zoom_in {cursor:pointer;cursor:-moz-zoom-in;} .cursor_zoom_out {cursor:pointer;cursor:-moz-zoom-out;}");
//GM_addStyle(".gm_image_resize_infotab {background-color:#000; color:#fff; font-size:11px; font-family:verdana, tahoma, arial; font-weight:normal; height:20px;line-height:1em; margin:-26px 0px 0px 2px; opacity:0.7; padding: 5px 10px 0px; position:absolute;}");

var image = document.getElementsByTagName('img');

for(var i=0; i<image.length;i++) {

  if(image[i].width > maxWidth) {    
    image[i].setAttribute("class", "gm_image_resize cursor_zoom_in");
    image[i].origWidth = image[i].width;
    image[i].origHeight = image[i].height;
    imageResize(image[i]);
    /*
    var divElem = document.createElement("div");
    divElem.setAttribute("class","gm_image_resize_infotab");
    image[i].parentNode.insertBefore(divElem, image[i].nextSibling);
    divElem.innerHTML = image[i].origWidth+" x "+image[i].origHeight+" px";
    divElem.style.width = image[i].width - 20 +"px";
    */
    image[i].addEventListener("click", imageClick, false);
    
  } else if (image[i].height > maxHeight) {
      
    image[i].setAttribute("class", "gm_image_resize cursor_zoom_in");
    image[i].origWidth = image[i].width;
    image[i].origHeight = image[i].height;
    imageResize(image[i]);
    /*
    var divElem = document.createElement("div");
    divElem.setAttribute("class","gm_image_resize_infotab");
    image[i].parentNode.insertBefore(divElem, image[i].nextSibling);
    divElem.innerHTML = image[i].origWidth+" x "+image[i].origHeight+" px";
    divElem.style.width = image[i].width - 20 +"px";
    */
    image[i].addEventListener("click", imageClick, false);
  }
  
}

function imageClick(event) {
  event.preventDefault()
  if(event.target.getAttribute("class").indexOf("cursor_zoom_in") != -1) {
    event.target.setAttribute("class", "gm_image_resize cursor_zoom_out");
    event.target.width = event.target.origWidth;
    event.target.height = event.target.origHeight;
  } else {
    event.target.setAttribute("class", "gm_image_resize cursor_zoom_in");
    imageResize(event.target);
  }
}

function imageResize(img) {
  if(img.width > maxWidth) {
    img.height = img.height * (maxWidth / img.width); 
    img.width = maxWidth; 
    if (img.height > maxHeight) {
      img.width = img.width * (maxWidth / img.height); 
      img.height = maxHeight; 
    }
    
  } else if (img.height > maxHeight) {
    img.width = img.width * (maxWidth / img.height); 
    img.height = maxHeight; 
    if (img.width > maxWidth) { 
      img.height = img.height * (maxWidth / img.width); 
      img.width = maxWidth;
    }
  }
}
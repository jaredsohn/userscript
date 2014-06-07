// ==UserScript==
// @name           MLS.ca larger photo gallery
// @description    Change MLS.ca Photo Gallery page to show larger images
// @namespace      uttara.ca
// @include        http://www.mls.ca/PropertyPhotos.aspx?*
// ==/UserScript==

// the image display size is speced in the stylesheet,
// so we change that first
// http://www.mls.ca/presentation/CSS/cobrand_1.css
// .PhotosProperty         {width:260px; height:200px ;margin-left:7px}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.PhotosProperty {width:auto; height:auto;}');


// and now we switch the image source from medium to high resolution
var image_elements = document.getElementsByTagName('img');       

for(var i=0;i<image_elements.length;i++){
    var image_element = image_elements[i];
    if(image_element.src.toLowerCase().match(/^http:\/\/images.mls.ca\/listings\/(.*)/)) {
        image_element.src = image_element.src.replace("medres","highres");
	image_element.style.width = "auto"
	image_element.style.height = "auto"
    }
}


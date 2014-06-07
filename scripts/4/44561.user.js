// ==UserScript==
// @name           F&S Image Resizer
// @namespace      http://userscripts.org/users/84128
// @description    Enlarge small images on Frost and Sullivan
// @include        http://www.frost.com.libproxy.mit.edu/prod/servlet/report-document.pag*
// ==/UserScript==


function correspondingImage(obj) {
    if(obj.tagName.toLowerCase() == 'img')
        return obj;
    else if (obj.src) {
        var newImage = new Image();
        newImage.src = obj.src;
        return newImage;
    } else return null;
}


window.addEventListener('load', function() {


var z = document.getElementsByTagName('img');
for(i=0;i<z.length;i++) {
if(z[i].width == 100) {
	var node = z[i];
        var img = correspondingImage(node);
	node.width = img.naturalWidth;
	node.height = img.naturalHeight;
	node.padding = 100;
	}
}

//hide right side column
var rghtPanel = document.getElementById('rghtPanel');
rghtPanel.style.display='none';


//prevent image clipping problems
var y = document.getElementsByTagName('img');
for(i=0;i<y.length;i++) {
if(y[i].style.overflow=='hidden') {
	y[i].style.overflow='visible';
	}
}

//make sure images and tables don't get cut off when printed by creating a print style sheet and adding a custom rule.
	var styleElement = document.createElement('style');
	if (styleElement) {
		styleElement.setAttribute("type", "text/css");
		// rules are for printed output only 
		styleElement.setAttribute("media", "print");
		styleElement.setAttribute("id", "gm_sanitize_styles");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		// for some reason, document.getElementById doesn't work with insertRule further on...
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule("div#Head2, #Head3, #Head4, #Body { display: inline; }", 0);
	}






}, false);
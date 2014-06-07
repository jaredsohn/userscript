// ==UserScript==
// @name           F365 Images
// @namespace      http://f365.com/
// @description    Image Resizer for F365 Forum
// @include        http://forum.football365.com/*
// @exclude        http://forum.football365.com/boss.htm
// ==/UserScript==


// styles =======================================
	var s = '.forumImage{border:10px solid #CCCCCC;}';
	var cssnode = document.createTextNode(s);
	var css=document.createElement('style');
	css.type='text/css';
	css.appendChild(cssnode);
	document.getElementsByTagName('head')[0].appendChild(css);

// main =========================================

window.addEventListener("load", function(e) {
	var maxSize, iHeight, iWidth, sizeGuide, size2, sizeRatio, newSize1, newSize2, x;
	var imgsrc;
	maxSize = 600;
	
	for (x=0; x<document.images.length; x++) {
		iHeight = document.images[x].height;
		iWidth = document.images[x].width;
		
		if (iHeight > iWidth){
			sizeGuide = iHeight;
			size2 = iWidth;
		} else {
			sizeGuide = iWidth;
			size2 = iHeight;
		}
		
		if (sizeGuide > maxSize){
			sizeRatio = sizeGuide / size2;
			newSize1 = maxSize;
			newSize2 = newSize1 / sizeRatio;
			
			if (iHeight > iWidth){
				document.images[x].height = newSize1;
				document.images[x].width = newSize2;
			} else {
				document.images[x].width = newSize1;
				document.images[x].height = newSize2;
			}
			document.images[x].className = 'forumImage';
			imgsrc = document.images[x].src;
			var im;
			im = document.images[x];
			im.addEventListener('click', function(thisimg){window.open(this.src,'new');}, true);
		}
	}
}, false);

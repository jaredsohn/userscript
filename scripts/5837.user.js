// ==UserScript==
// @name angadi.org Comic Image viewer
// @namespace http://willrawls.blogspot.com
// @description Any image in an anchor on angadi.org will be rewritten (and displayed) as a IMG tag.
// @include http://www.angadi.org/comic*
// @include http://angadi.org/comic*
// ==/UserScript==

// VERSION: OCTOBER 5, 2006

var elements = document.getElementsByTagName("a");
	for (var i=0; (anchor=elements[i]); i++) {
		src = anchor.getAttribute("href");
		if(src.indexOf('.gif') > -1 || src.indexOf('.jpg') > -1)
		{
			img = document.createElement('img');
			img.setAttribute('src',src);
			anchor.innerHTML = '';
			anchor.appendChild(img);
		}
		else if(src.indexOf('comics-archive') == -1 && src.indexOf('angadi') == -1)
		{
			anchor.innerHTML = '';
		}
	}

// The following copied from the Comic Add script
//STYLE THE PAGE
var newSS, styles='  br {display:block;} * {color: white; background-color: #555}* ';
if(document.createStyleSheet) {
  document.createStyleSheet("javascript:'"+styles+"'"); 
} else {
 newSS=document.createElement('link'); 
 newSS.rel='stylesheet'; 
 newSS.href='data:text/css,'+escape(styles); 
 document.getElementsByTagName("head")[0].appendChild(newSS); 
}

// ==/UserScript==

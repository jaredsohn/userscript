// ==UserScript==
// @name        StareeXL
// @namespace   http://userscripts.org/users/440089
// @description Photo Links will now link to XL sized image
// @include     http://staree.com/*/photos*
// @include     http://*.staree.com/*/photos*
// @version     1
// ==/UserScript==

var images = document.images;

for (var i=0; i<images.length; i++)
{
 	if (images[i].className != null && images[i].className == 'listed_photo') 
 	{
 		images[i].parentNode.parentNode.removeAttribute("onclick");
 		images[i].parentNode.parentNode.removeAttribute("ontouchend");
 		images[i].parentNode.removeAttribute("onmouseover");
 		images[i].parentNode.removeAttribute("onmouseout");
 		
 		var img = images[i];
 		var imgAnchor = document.createElement('a');
 		imgAnchor.href = images[i].src.replace('thumbnails', 'xlarge');
 		imgAnchor.target = "_blank";
 		images[i].parentNode.replaceChild(imgAnchor, images[i]);
 		imgAnchor.appendChild(img);
 		
 		//images[i].setAttribute('onclick', "window.open('" + images[i].src.replace('thumbnails', 'xlarge') + "', '_blank')");
	}
}
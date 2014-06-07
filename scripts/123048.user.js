// ==UserScript==
// @name           AAA Easy-Refresh
// @namespace      http://clraik.com
// @description    Makes the shoopskeeper clickleable
// @include        *neopets.com/halloween/*garage*.phtml
// @include        *neopets.com/halloween/process_garage.phtml*
// ==/UserScript==


var imgs = document.getElementsByTagName('img');
var img = false;


for(var i = parseInt(imgs.length/2); i < imgs.length; i++){
	if(imgs[i].src == 'http://images.neopets.com/halloween/ghost_shop.gif'){
		var img = imgs[i];
		break;}}
if(img)
{
img.addEventListener('click', function(){ window.location = window.location; }, false);
img.style.cursor = 'pointer';
img.title = img.alt = 'Click to reload!';}

var a = document.getElementByClass('contentModuleContent');
if(a) {a.style.display = 'none';}
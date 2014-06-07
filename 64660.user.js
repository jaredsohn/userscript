// ==UserScript==
// @name          bungie alt theme
// @author	  Braddlez
// @namespace     http://www.bungie.net
// @description   Replaces the new Bungie.net logo with a new theme
// @include       http://*bungie.net*
// ==/UserScript==

GM_addStyle("body {background: #000000 url(http://fascinatingly.com/wp-content/gallery/nebula-and-space-clouds-wallpaper/orion-awsome-full-color-space-image-wallpaper.jpg) repeat-x;} div.sContent-head {background: url();} .RadMenu_topNav2.RadMenu .rmHorizontal .navTopLevel:hover {background: ;}");



document.getElementsByClassName = 
function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) 
	{
		var classes = elem[i].className;
		if (myclass.test(classes))
		{
			retnode.push(elem[i]);
		}
	}
	return retnode;
}; 

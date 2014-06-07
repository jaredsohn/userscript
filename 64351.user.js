// ==UserScript==
// @name          Reach BNET Theme
// @author	  Braddlez
// @namespace     http://www.bungie.net
// @description   Replaces the new Bungie.net logo with a new, reach theme
// @include       http://*bungie.net*
// ==/UserScript==

GM_addStyle("body {background: #000000 url(http://www.bungie.net/images/games/Reach/background2.jpg) repeat-x;} div.sContent-head {background: url();} .RadMenu_topNav2.RadMenu .rmHorizontal .navTopLevel:hover {background: ;}");



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

var logo = document.getElementsByClassName('top_logo_bungie')[0];
logo.style.backgroundImage = "url(http://www.bungie.net/images/games/reach/haloreachlogo.png)";
//REMOVE THE '//' IN THE NEXT LINE FOR THE OLD LOGO
//logo.style.backgroundImage = "url(/images/errors/struct_images/logo_bungie_01.gif)";
//REMOVE THE '//' IN NEXT LINE FOR SUPER OLD LOGO
//logo.style.backgroundImage = "url(/images/base_struct_images/logo_bungie.gif)";
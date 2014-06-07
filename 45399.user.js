// ==UserScript==
// @name          Bungie.net Rainbow Logo
// @author		Paul Maravelias (paulmarv)
// @author		Duardo
// @namespace     http://www.bungie.net
// @description   Replaces the new Bungie.net logo with a new, rainbow version
// @include       http://*bungie.net*
// ==/UserScript==

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
logo.style.backgroundImage = "url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/3-1.gif)";
//REMOVE THE '//' IN THE NEXT LINE FOR THE OLD LOGO
//logo.style.backgroundImage = "url(/images/errors/struct_images/logo_bungie_01.gif)";
//REMOVE THE '//' IN NEXT LINE FOR SUPER OLD LOGO
//logo.style.backgroundImage = "url(/images/base_struct_images/logo_bungie.gif)";
// ==UserScript==
// @name           Anuroop
// @namespace      Anuroop
// @description    sets proper photo size
// @include        http://www.anuroopwiwaha.com/control/search_member.aspx
// ==/UserScript==
///Ravindra Sane

var searchtable = document.getElementById("ctl00_ContentPlaceHolder1_gv_member_search");
if (searchtable)
{
	var images = searchtable.getElementsByTagName('img');
	if (images.length>0)
	{	
		var i;
		for (i=0;i<images.length;i++)
		{	images[i].removeAttribute("height");
			images[i].setAttribute('onclick','if(this.width==\'100\'){this.removeAttribute(\'width\');} else {this.width=\"100\";}');
			images[i].setAttribute('width','100');
		}
	}
}
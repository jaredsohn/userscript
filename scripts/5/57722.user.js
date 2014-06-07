// ==UserScript==
// @name           Dropbox Links Fixer
// @description    Fixes the links for dropbox files
// @namespace      http://userscripts.org/users/63675
// @version        1.2
// @include        http://*fpsbanana.com*
// @include        http://*rtsbanana.com*
// @include        http://*rpgbanana.com*
// ==/UserScript==

/*
If you want to, you can set it to only include the dropbox pages by adding:
http://*banana.com/*dropbox*
to the include list, but then if a link to a dropbox item is not on that page, it won't fix it :-/.
*/

var pre = "http://dropbox.hazardstrip.com/";
var pre_fixed = "http://files.fpsbanana.com/dropbox/";
var eles = document.getElementsByTagName("a");
for(i=0;i<eles.length;i++)
{
	ele = eles[i];
	if(ele.href.substr(0,pre.length).toLowerCase()==pre.toLowerCase())
	{
		ele.href = pre_fixed + ele.href.substr(pre.length,ele.href.length-pre.length);
	}
}
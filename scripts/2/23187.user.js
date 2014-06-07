// ==UserScript==
// @name           Mobile01 image shower
// @description    Show all mobil01 images directly
// @include        https://www.mobile01.com/topicdetail.php*
// @include        http://www.mobile01.com/topicdetail.php*
// ==/UserScript==

function LoadImg(name) {
	document.getElementById(name).innerHTML = '<img src="http://attach1.mobile01.com/attach/' + name + '" border="0">';		
	return false;
}

imgs = document.getElementsByName("attachimg");
for (i=0; i<imgs.length; i++)
{
  LoadImg(imgs[i].id);
}
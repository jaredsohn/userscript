// ==UserScript==
// @name           Mobile01 image shower collocate with AutoPagerize
// @namespace      MA
// @description    可搭配AutoPagerize使用的Mobile01 image shower
// @include        https://www.mobile01.com/topicdetail.php*
// @include        http://www.mobile01.com/topicdetail.php*
// @include        https://www.mobile01.com/waypointtopicdetail.php*
// @include        http://www.mobile01.com/waypointtopicdetail.php*
// @version        0.02
// ==/UserScript==

function LoadAttachImage()
{
	var img,i,imgLength;

	img=document.getElementsByName('attachimg');
	imgLength=img.length;
	for(i=0;i<imgLength;i++)
	{
		img[0].innerHTML='<img src="http://attach.mobile01.com/attach/'+img[0].id+'" border="0">';
		img[0].removeAttribute('name');
	}

	img=document.getElementsByName('waypointimg');
	imgLength=img.length;
	for(i=0;i<imgLength;i++)
	{
		img[0].innerHTML='<img src="http://attach.mobile01.com/waypoint/'+img[0].id+'" border="0">';
		img[0].removeAttribute('name');
	}
}
//以下兩行感謝shyangs at ptt.cc的提供XDD
LoadAttachImage();
window.addEventListener('AutoPagerize_DOMNodeInserted',function(){LoadAttachImage();},false);
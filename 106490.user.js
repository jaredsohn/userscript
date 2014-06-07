// ==UserScript==
// @author         shyangs
// @name           光輝之街
// @description    使光輝之街圖片正確顯示
// @namespace      http://wiki.moztw.org/index.php/User:Shyangs
// @version        0.1
// @include        http://cmi.star-kids.info/sellman/drago/*
// @license        MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==
(function() {
	var pStr="http://i271.photobucket.com/albums/jj139/shyangs_album/ACGN/GAME/dragonoma/";
	var regex=/http:\/\/cmi\.star\-kids\.info\/sellman\/drago\/image\/item\-no\-\d{1,3}\.png/;
	var a=document.images;
	var n=a.length;//圖片計數
	for(var i=0;i<n;i++)
	{
	    //GM_log(a[i].src)
	   //如果圖片連結匹配，置換圖片連結
	   if(regex.test(a[i].src))
	   {
	       a[i].src=a[i].src.replace("http://cmi.star-kids.info/sellman/drago/image/",pStr);
	    }
	}
})();
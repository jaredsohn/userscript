// ==UserScript==
// @author         shyangs
// @name           e72play星夜之城
// @description    使星夜之城圖片正確顯示
// @namespace      http://wiki.moztw.org/index.php/User:Shyangs
// @version        0.1
// @include        http://e72play.com/wa/watlas/*
// @license        MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==
(function() {
	var pStr="http://i271.photobucket.com/albums/jj139/shyangs_album/ACGN/GAME/e72play/";
	var regex=/http:\/\/e72play\.com\/wa\/watlas\/image\/item\-no\-\d{1,2}\.png/;
	var a=document.images;
	var n=a.length;//圖片計數
	for(var i=0;i<n;i++)
	{
	   //如果圖片連結匹配，置換圖片連結
	   if(regex.test(a[i].src))
	   {
	       a[i].src=a[i].src.replace("http://e72play.com/wa/watlas/image/",pStr);
	    }
	}
})();
// ==UserScript==
// @name        Tieba_openPicture
// @namespace   yuxingyc
// @include     http://tieba.baidu.com/photo/p?kw=*
// @include		http://tieba.baidu.com/f?ct=*
// @include		http://tieba.baidu.com/p/*
// @run-at		document-start
// @grant		GM_setValue
// @grant		GM_getValue
// @version     1.0
// ==/UserScript==
(function(){
var thisUrl=location.href;
testUrl=thisUrl.indexOf("http:\/\/tieba.baidu.com\/photo\/p?kw=");
if(GM_getValue("displayPic",false)&&testUrl==0){
	var rr=document.title;
	GM_setValue("displayPic",false);
	var imgUrl='http://imgsrc.baidu.com/forum/pic/item/'+thisUrl.match(/pic_id=(.*?)&/)[1]+'.jpg'
	setTimeout(function(){
			document.write("<body style='text-align:center; background-color :black; '><img style='border:1px solid #d3d3d3' src="+imgUrl+"><br><br><br></body>");	
	
		document.title=rr;	
		},1);
	if (document.readyState != "complete")document.write("");
}
else
{
	document.onreadystatechange = function () 
	{
 		if (document.readyState != "complete") 
 		{
			var allPics=document.getElementsByTagName("img");  
			var len=allPics.length;
  			for(var i=0;i<len;i++)
  			{	
 		 	thisPic=allPics[i];
  			if(thisPic.className=="BDE_Image")thisPic.onclick=function(){GM_setValue("displayPic",true);}
  			}
 		} 
	}  
}
})();
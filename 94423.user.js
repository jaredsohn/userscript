// ==UserScript==
// @name           Better DD's
// @namespace      http://userscripts.org/users/274264
// @include        http://today.deviantart.com/dds/*
// @author         Trezoid
// @version        0.2.7
// ==/UserScript==

/*
* Simple script to shift the focus of the DD's to the art.
*
* features:
***Big thumbs
***Cleaned style
*
*The bigger thumbs I'll be releasing at a later date as a seperate script for the whole of dA when I improve loading issues :D
*
* update log for v0.2.6:
* 		+ Fixed the loading. it now just trys ONE image per page image
*		+ Now breaks short but wide thumbs slightly less.
* 		+ 
*/

function getImages()
{	
	for(var i = 0;i<document.images.length;i++)
	{
		if(document.images[i].height ==150 || document.images[i].width ==150)
		{
		
			document.images[i].height = document.images[i].height *2;	
			document.images[i].width = document.images[i].width *2;
					
					
			var src = document.images[i].src;
			var splitImage = src.split("/");
			
			/*
			* Thanks goes to electricjohnny who pointed out the easy way of doing what I was trying to do :D
			*/
			
			var replaceImage = "http://" + splitImage[2] +"/" + splitImage[3] +"/" +  splitImage[5] +"/"+ splitImage[6] +"/"+ splitImage[7] +"/"+ splitImage[8] +"/"+ splitImage[9] +"/"+ splitImage[10];
			
			
				document.images[i].src = replaceImage;	
		 }
	}
}

GM_addStyle(".ddinfo{height:1px!important;overflow:hidden!important;} .ddinfo:hover{height:200px!important;padding:0!important;margin:0!important;} .tt-w,.tt-a{width:285px!important;} .alt{background:transparent none!important;");
getImages();
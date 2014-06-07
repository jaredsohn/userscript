// ==UserScript==
// @name          Google Images Viewer
// @namespace     http://www.pearlcreation.com
// @description	  Add Direct Link to Google Images
// @include       http://images.google.*/*
// ==/UserScript==
// تعريب عباس منصور
(function()
{

function pointLinksToImages() 
{
	ImgElements = document.body.getElementsByTagName("a");
	if(ImgElements)
	{
		for(i=0;i<ImgElements.length;i++)
		{
			if(ImgElements[i].href.indexOf("/imgres?imgurl=") != -1 &&
			   ImgElements[i].href.indexOf("&imgrefurl=") != -1)
			   {
			
					/*var gmatch = null;
					var target = ImgElements[i].getAttribute("target");
					if (!target) {
						target = "";
					}*/
						
					var originPage = null;
					gmatch = ImgElements[i].href.match(/\&imgrefurl\=(.*?)\&h=/);
					if (gmatch) {
						originPage = unescape(gmatch[1]);
					}
					var originImage = null;
		
					gmatch = ImgElements[i].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );
					if (gmatch) 
					{
						originImage = unescape(gmatch[1]);
						ImgElements[i].href = originImage;
				
					    var div = document.createElement('div');
						var s = '<span style="font-family:\'Trebuchet MS\', sans-serif; font-size:12px;">[ ';
						s += '<a style="color:0060ff;" href="'+originImage+'" target="_blank" alt=" View '+originImage+' in new Window " title=" افتح الصورة الاصلية في لسان جديد">' + "الصورة الاصلية" + '</a>';
						if (originPage) {
							s += '&nbsp;|&nbsp;';
							s += '<a style="color:0060ff;" href="'+originPage+'" target="_blank" alt=" View '+originPage+' in new Window " title=" افتح الصفحة الاصلية في لسان جديد ">' +  "الصفحة الاصلية" + '</a>';
						}
						s  += ' ]</span>';
						
					    div.innerHTML = s;

						ImgElements[i].parentNode.appendChild(div);
			   		}
				}
		}
	}
}

// Google image search
pointLinksToImages();

}
)();
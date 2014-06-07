// ==UserScript==
// @name          Google Image Link
// @description	  Google Image Link Viewer
// @author        Vaibhav Gupta 
// @webpage	http://www.pearlcreation.com/
// @include       http://images.google.*/*
// ==/UserScript==

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
						var s = '<span style="font-family:\'Trebuchet MS\', sans-serif; font-size:11px;">[ ';
						s += '<a style="color:#CC3300;" href="'+originImage+'" target="_blank" alt=" View '+originImage+' in new Window " title=" View '+originImage+' in new Window ">' + "Original Image" + '</a>';
						if (originPage) {
							s += '&nbsp;|&nbsp;';
							s += '<a style="color:#CC3300;" href="'+originPage+'" target="_blank" alt=" View '+originPage+' in new Window " title=" View '+originPage+' in new Window ">' +  "Original Page" + '</a>';
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
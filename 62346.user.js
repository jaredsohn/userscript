// ==UserScript==
// @name          PHVD
// @description	  Video Downloader for Pornhub.com
// @include       http://www.pornhub.com/embed_player_v3.php?id=*
// @include       http://www.pornhub.com/view_video.php?viewkey=*
// ==/UserScript==

/*
 (C) 2009 by DT.N Services
 Website: http://www.DecodeThe.Net
 E-Mail:  1337@DecodeThe.Net
 Version: 2.0
 Compability:
 [x] Greasemonkey
 [x] Ie7Pro 
*/
 
(function() 
{
	function Request()
	{
		var videoid = document.getElementById("video_0").value;	   
		var url = "http://www.pornhub.com/embed_player_v3.php?id="+videoid;
		var xmlhttp;
		
		if (window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp.open("GET", url, true);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xmlhttp.onreadystatechange = function()
		{
			if(xmlhttp.readyState == 4 )
			{
				if(xmlhttp.responseXML)
				{
					Process(xmlhttp.responseXML);
				}
			}
		}
		
		xmlhttp.send(null);		
	}

	var Elements = new Array();
	Elements = document.getElementsByTagName("*");
	var Element;
	
	for (i=0; i<Elements.length; i++)
	{
		if (Elements[i].className=="download-bar")
		{
			Element = Elements[i];
			Element.style.display = 'none';
		}
	}

	var Element_parent = Element.parentNode;
	var div = document.createElement("div");
		
	div.className = "download-bar";
	Element_parent.insertBefore(div, Element);

	function Process(response)
	{
		var Array = response.getElementsByTagName("options");
			
		if(Array.length > 0)
		{
			for(i=0; i<Array.length; i++)
			{
				var item = Array[i];
				videourl  =  item.getElementsByTagName("flv_url")[0].firstChild.nodeValue;
				
				if(videourl != "")
				{
					div.innerHTML = '<a href="'+videourl+'"><img src="http://cdn-www.pornhub.com/images/video/banners/banner21.jpg"/></a>';
				}
				else
				{
					div.innerHTML = '<a href="" onclick="alert(\'Error while fetching the video-url\');return false;"><img src="http://cdn-www.pornhub.com/images/video/banners/banner21.jpg"/></a>';
				}
			}
		}  
	}
	
	Request();
})(); 
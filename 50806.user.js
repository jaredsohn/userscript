// ==UserScript==
// @name Reuters Single Page View, v. 0.8 (just for google reader)
// @namespace http://megatron.princeton.edu/GM
// @include http://*.reuters.com/*
// @description If u just want view the news text from google reader when click reuters title link 
// ==/UserScript==

(function()
{

	if(document.location.href.match(/\/article\//) && !document.location.href.match(/sp\=true$/))
	{
		if(document.location.href.match(/\?/) && document.location.href.match(/\=/))
		{
			document.location = document.location + '&sp=true';
		}
		else
		{
			document.location = document.location + '?sp=true';
		}
	}

	var hrefs = document.getElementsByTagName('a');
	if (hrefs.length)
	{
		for(var i=0; i<hrefs.length; i++)
		{
			if(hrefs[i].href.match(/\/article\//) && hrefs[i].host.indexOf('reuters.com') != -1)
			{

				if(hrefs[i].href.match(/\?/) && hrefs[i].href.match(/\=/))
				{
					hrefs[i].href = hrefs[i].href + '&sp=true';
				}
				else
				{
					hrefs[i].href = hrefs[i].href + '?sp=true';
				}
			}
		}
	}
	document.title="unix";
	var mytitle= document.getElementsByTagName("h1") ;
	var hhh=mytitle[0].innerHTML;
	var mdivs = document.getElementsByTagName("div") ;
	if(mdivs.length)
	{
		for(var i=0;i<mdivs.length;i++)
		{

			if( mdivs[i].id=="resizeableText" )
			{
				document.body.innerHTML="<div style='margin:10px'> <span style='font:bold 24px serif;' >"
				+hhh+"</span>"+mdivs[i].innerHTML + "</div>";

				var ndivs = document.body.getElementsByTagName("div") ;
				if(ndivs.length)
				{
					for(var j=0;j<ndivs.length;j++)
					{
						if( ndivs[j].className=="inlineSlideControls" 
			     			|| ndivs[j].className=="inlineRelatedContent" 
						)
						{
							ndivs[j].innerHTML="";
						}
					}
				}
	
				break;
			}
		}
	}
}
)();

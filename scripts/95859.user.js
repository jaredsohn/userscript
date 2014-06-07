// ==UserScript==
// @name           kijiji.ca promoted listing remover (removes garbage ads from top of listings) and enables large thumbnails
// @namespace      kij
// @include        http://*.kijiji.ca/*
// ==/UserScript==

	
location.href = "javascript:(" + function() 
{


var da = document.getElementsByTagName("div");
for (var el=0;el<da.length;el++)
{
    
	if (da[el].className.indexOf('adsense-top-bar')==0
       || da[el].className.indexOf('top-ads-top-bar')==0 )
	{
		da[el].style.display='none';
	}
    
    else if(da[el].className.indexOf('multiple-images')==0)
    {
        da[el].style.background='none';
    }
        
}

    
da = document.getElementsByTagName("table");

for (var el=0;el<da.length;el++)
{
    
	if (da[el].className.indexOf('top-feature')==0)
	{
		da[el].style.display='none';
		
	}
}
    
da = document.getElementsByTagName("img");
for (var el=0;el<da.length;el++)
{
	var s=da[el].src;
	var si=s.indexOf('_2.JPG');
	if(si>-1)
	{		
		da[el].src=s.substring(0,si)+"_35.JPG";
        da[el].style.maxWidth='none';
        da[el].style.maxHeight='none';
        
	}
}
    
da = document.getElementById("gpt-leaderboard-top");
if(da!=null)
	da.style.display='none';    
	
da = document.getElementById("LayoutFooter");
if(da!=null)
	da.style.display='none';
    
} + ")();";	

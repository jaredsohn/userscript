// ==UserScript==
// @name        Google Plus Remover 
// @namespace   org.mamclain.google.gmail.fix
// @description Removes the annoying Google + link and replaces it with the classical gmail link
// @include     https://www.google.com/*
// @include     http://www.google.com/*
// @include     https://mail.google.com/*
// @include     http://mail.google.com/*
// @version     1.3
// @grant       none
// ==/UserScript==

function SwapPlusWithGmail() 
{
    var seracharray=["gb_c","gb_f", "gb_g","gb_k"];
    for (lp = 0; lp < seracharray.length; ++lp) 
    {
    	var myeles = document.getElementsByClassName(seracharray[lp]);
    	for (var i=0; i < myeles.length; i++)
    	{
    		var ele = myeles[i];
    		if (ele.tagName == "A")
    		{
    			var href = ele.getAttribute("href");
    			var match = href.match(/plus\.google\.com*/);	
    			if (match) 
    			{
    				ele.setAttribute('href',"https://mail.google.com/mail/?tab=wm");
    				ele.innerHTML = 'Gmail';
    			}
    		}
    	}
	}
	return myeles.length;
}

document.addEventListener('DOMNodeInserted',SwapPlusWithGmail,false);
SwapPlusWithGmail();
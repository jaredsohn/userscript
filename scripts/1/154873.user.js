// ==UserScript==
// @name           Forgifs keys switcher
// @author		   Alex_ij
// @description    Switching gifs by arrow keys
// @include        *4gifs.org/*
// @include		   *forgifs.com/*
// @grant          GM_setValue
// @grant		   GM_getValue
// ==/UserScript==

function keyDown(event) 
{
	event.preventDefault()
	
	var allRX = new RegExp(".*forgifs.*")
	var forgifs = allRX.test(document.location.href)
	
	var next = document.getElementById("gsContent").getElementsByTagName("div")[4].getElementsByTagName("div")[1].getElementsByTagName("a")[0]
	var prev = document.getElementById("gsContent").getElementsByTagName("div")[4].getElementsByTagName("div")[2].getElementsByTagName("a")[1]
	
	if(!forgifs)
		if(event.keyCode == 40)
		{
			if(document.body.style.visibility != "hidden")
				document.body.style.visibility = "hidden"
			else
				document.body.style.visibility = "visible"
		}

	//end
	if(event.keyCode == 35)
	{
		if(forgifs)
			GM_setValue("lastPage_FORGIFS", document.location.href)
		else
			GM_setValue("lastPage_4GIFS",   document.location.href)
	}
	
	//home
	if(event.keyCode == 36)	
	{
		var last;
		
		if(forgifs)
			last = GM_getValue("lastPage_FORGIFS", 0)
		else
			last = GM_getValue("lastPage_4GIFS",   0)
	
		if(last != 0)
			document.location.href = last
	}
	
	if(event.keyCode == 39)
		if(next)
			document.location.href = next.href	
			
	if(event.keyCode == 37)
		if(prev)
			document.location.href = prev.href
			
	return false
}

document.addEventListener("keydown", keyDown, false)
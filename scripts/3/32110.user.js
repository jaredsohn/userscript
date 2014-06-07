// ==UserScript==
// @name		InterfaceLift Favourite Resolutions
// @namespace   The internet
// @description Display direct links to a selection of favourite resolutions for each wallpaper on InterfaceLift
// @updateURL	http://userscripts.org/scripts/source/32110.user.js
// @version		0.99
// @date		2009-05-17
// @include		http://interfacelift.com/wallpaper*/*
// @include		http://*.interfacelift.com/wallpaper*/*
// @grant		none
// ==/UserScript==

// Idea and a little bit of code borrowed from Syntax's InterfaceLIFT Autoselect Resolution
// http://userscripts.org/scripts/show/30518

var res = new Array('1024x768', '1280x1024', '2560x1024');
	// Edit the res array to suit your favourite resolutions selection (3 items seems ok).
	// Default values are for 15", 17" and 19" LCD screens native resolutions, and dual screen.
    // Warning: no checking can be done, i.e. you may get a 404 error (dead link) if the wallpaper does not exist in a specific size.
function generateLinks()
{
	var selects = document.getElementsByName('resolution');
	if (selects.length==0)
        {
		return;
	}

	for (var i = 0; i < selects.length; i++)
	{
		currentElement = selects[i];
		var url = currentElement.getAttribute('onChange');
		// extract wallpaper id and name from the onChange attribute to build the new links
		// eg. onChange="javascript:sndReq_dl(this,'1661','privatedocksunset')"
		// v0.99 - Parameters order and function have changed : onChange="javascript:sndReqload(this,'summervines','1903')"
		// v0.20131101 - new function with parameters ordered differently : onchange="javascript:imgload('paradisesailer', this,'3406')"
		var urlElementsFull = url.split("(");
		var urlElements = urlElementsFull[1].split(",");
		// v0.20131101 - var urlName = urlElements[1].replace(/'/g,"");
		var urlName = urlElements[0].replace(/'/g,"");
		var urlId = urlElements[2].replace(/'/g,"");
		// remove the closing ) of the last parameter after the chain has been split
		urlId = urlId.replace(")","");
		// v0.20131101 - var divId = document.getElementById("dl_" + urlId);
		var divId = document.getElementById("download_" + urlId);
		// shrinks a bit the Download button, so we can have 3 more buttons properly aligned beneath
		divId.setAttribute('style', 'heigth:10px;padding:2px 2px 2px 2px;margin:2px 2px 2px 0px');
		for(var j = 0; j < res.length; j++)
		{
			var newLink = document.createElement("a");
			// v0.99 - New URL http://interfacelift.com/wallpaper_beta/Dba68ead/01903_summervines_1024x768.jpg
            // v0.99 - the random value and padding 0 is added by the server on the generated URL
            // v0.99 - http://interfacelift.com/wallpaper_beta/1903_summervines_1024x768.jpg
			// v0.20131101 - http://interfacelift.com/wallpaper/7yz4ma1/03406_paradisesailer_640x960.jpg
			newLink.setAttribute('href', '/wallpaper/7yz4ma1/' + urlId + '_' + urlName + '_' + res[j] + '.jpg');
			// v0.20131101 - newLink.setAttribute('href', '/wallpaper_beta/dl/' + urlId + '_' + urlName + '_' + res[j] + '.jpg');
			newLink.setAttribute('target', '_blank');
			var newText = document.createTextNode(res[j]);
			newLink.appendChild(newText);
			var newDiv = document.createElement("div");
			newDiv.setAttribute('class', 'button_disabled');
			newDiv.setAttribute('onmouseover', 'this.className=\"button_on\"');
			newDiv.setAttribute('onmouseout', 'this.className=\"button_disabled\"');
			newDiv.setAttribute('style', 'heigth:10px;padding:2px 2px 2px 2px;margin:2px 2px 2px 0px');
			newDiv.appendChild(newLink);
         		currentElement.parentNode.appendChild(newDiv);
		}
	}
}

generateLinks();
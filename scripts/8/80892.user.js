// ==UserScript==
// @name           Remove toolbars
// @namespace      mdryden
// @include        *
// @version        0.3
// @description    Uses some basic logic to try and hide those annoying hover over toolbars.
// ==/UserScript==

/* Options */

var notifyWhenRemoving = false;


/* End of options - do not modify below this line */
/* ---------------------------------------------- */

removeToolbars();

function removeToolbars()
{
	// look for elements which look like a toolbar...
	var divs = document.getElementsByTagName("div");

	//var regex = new RegExp("tool", "g");
	// timing
	var startTime = new Date();
	var endTime;
	var elapsedTime = new Date();
	
	var removed = 0;

	for (var i = 0; i < divs.length; i++)
	{
		
		var div = divs[i];
		if (isPossibleToolbar(div))
		{
			//alert(div.id);
			// fuck you, toolbar
			div.style.display = "none";
			removed++;
		}
	}
		
	endTime = new Date();
	elapsedTime.setTime(endTime.getTime() - startTime.getTime());

	if (removed > 0 && notifyWhenRemoving)
	{
		alert("Removed " + removed + " toolbars in " + elapsedTime.getMilliseconds() + "ms");
	}
}

function isPossibleToolbar(element)
{
	// some sites (like macnn.com) don't use an id, just a class.  gotta check them too I guess.
	if (isSuspicious(element.id) || isSuspicious(element.className))
	{
		//alert(element.id);
		// suspicious name + fixed position = match
		return isFixedPosition(element);
	}
}

function isSuspicious(value)
{	
	if (value == "") return false;
	
	if (contains(value, "tool")) return true;
	
	// HuffPo's is called "service_bottom_bar".  Bar's probably a common enough one too.
	if (contains(value, "bar")) return true;
	
	// nypost's is called "hat_wrap"
	if (contains(value, "hat_wrap")) return true;
	
	// cracked.com
	if (contains(value, "fb_sliver")) return true;
		
}

function contains(source, pattern)
{
	source = source.toLowerCase();
	pattern = pattern.toLowerCase();
	
	if (source.indexOf(pattern) != -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function isFixedPosition(element)
{
	//alert(getStyle(element, "position"));
	// if its a fixed position div its almost certainly a toolbar
	// (high z-index check too?  need more samples)
	if (getStyle(element, "position") == "fixed") return true;
}

function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

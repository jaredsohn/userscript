// ==UserScript==
// @name           Newgrounds Direct Launch
// @namespace      http://myscripts.com/myscripts
// @description    Launch movies and games directly
// @include        http://www.newgrounds.com/*
// ==/UserScript==

var allLinks, thisLink;

var first = 0;

allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    
    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.href.indexOf('javascript:') != -1)
    {
    	// This is a javascript launching link
    	var segments = thisLink.href.split("'");
    	var theswf = segments[1];
    	
    	var osegments = thisLink.href.split(",");
    	var fwidth = osegments[1];
    	var fheight = osegments[2];
    	
    	
    	if (theswf != undefined)
    	{
		// is it legit?
		if (theswf.indexOf('swf') != -1)
		{
		
			if (first == 0)
			{
				first = 1;
			}
			else
			{
			
			    	GM_setValue("fwidth",fwidth);
    				GM_setValue("fheight",fheight);
			
				newElement = document.createElement('a');
				otherElement = document.createElement('a');

				// What is the directory for this?
				var nsegments = theswf.split('_');
				var thenumber = nsegments[0];
				thenumber = Math.floor(thenumber / 1000) * 1000;
				
				var theurl = "http://uploads.ungrounded.net/" + thenumber + "/" + theswf;
				var thefeatures = "width=" + fheight + ",height=" + fwidth + ",location=0";
				var themsg = "HELLO";
				
				otherElement.innerHTML="<a  href='' onclick='javascript:window.open(\""+theurl+"\",\"" + themsg + "\",\"" + thefeatures + "\")'><font color='#ffcc00'><b>DIRECT LAUNCH</b></font><font size=-2 color='#ffcc00'><b>" + fheight + ' x ' + fwidth + "</b></font></a><br>";

				newElement.innerHTML = '<a href="http://uploads.ungrounded.net/' + thenumber + '/' + theswf + '" target="_blank"><font color="#ffcc00"><b>DIRECT LAUNCH</b></font><font size=-2 color="#ffcc00"><b>FREE</b></a><br>';
				
				thisLink.parentNode.insertBefore(newElement,thisLink);
				thisLink.parentNode.insertBefore(otherElement,thisLink);
			}
		}
    	}
    }
}

//http://uploads.ungrounded.net/303000/303410_lego.swf
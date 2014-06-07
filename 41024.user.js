// ==UserScript==
// @name           Newgrounds Direct Launch
// @namespace      http://userscripts.org/
// @description    Launch movies and games directly and center the 500x500 ones
// @include        http://www.newgrounds.com/*
// @notes          updated January 23, 2009 by Jonathan for new Newgrounds layout
//		   updated July 5, 2007 by BigAl to include centering
//                 original author: Kman, March 25, 2006
// ==/UserScript==

var allLinks, thisLink, thisAttr;
var first = 0;

allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisAttr = thisLink.attributes[0].value;
    if (thisAttr.indexOf('movie_viewer.Launch') != -1)
    {
	// This is a javascript launching link
    	//var segments = thisAttr.split("'");
    	//var theswf = segments[3];

    	var osegments = thisAttr.split(",");
    	var fwidth = osegments[2];
    	var fheight = osegments[3];
	var theswf = osegments[1].split("'")[1];

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

		    var thefeatures = "width=" + fwidth + ",height=" + fheight + ",location=0";

		    otherElement.innerHTML="<a  href='' onclick='javascript:mywin=window.open(\"\",\"\",\"" + thefeatures + "\");mywin.moveTo(self.screen.width/4,self.screen.height/4);mydoc=mywin.document;mydoc.write(\"\\x3chtml\\x3e\\x3cbody\\x3e\\x3cobject classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" width=\\\"100%\\\" height=\\\"100%\\\"\\x3e\\x3cembed src=\\\"" + theswf + "\\\" type=\\\"application/x-shockwave-flash\\\" width=\\\"100%\\\" height=\\\"100%\\\"/\\x3e\\x3c/object\\x3e\\x3c/body\\x3e\\x3c/html\\x3e\");'><font color='#ffcc00'><b>DIRECT LAUNCH</b></font><font size=-2 color='#ffcc00'><b>" + fheight + ' x ' + fwidth + "</b></font></a><br>";

		    //newElement.innerHTML = '<a href="' + theswf + '" target="_blank"><font color="#ffcc00"><b>DIRECT LAUNCH</b></font><font size=-2 color="#ffcc00"><b>FREE</b></a><br>';
		    newElement.innerHTML="<a  href='' onclick='javascript:mywin=window.open();mydoc=mywin.document;mydoc.write(\"\\x3chtml\\x3e\\x3cbody\\x3e\\x3cobject classid=\\\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\\\" width=\\\"100%\\\" height=\\\"100%\\\"\\x3e\\x3cembed src=\\\"" + theswf + "\\\" type=\\\"application/x-shockwave-flash\\\" width=\\\"100%\\\" height=\\\"100%\\\"/\\x3e\\x3c/object\\x3e\\x3c/body\\x3e\\x3c/html\\x3e\");'><font color='#ffcc00'><b>DIRECT LAUNCH</b></font><font size=-2 color='#ffcc00'><b>FREE</b></font></a><br>";

		    thisLink.parentNode.insertBefore(newElement,thisLink);
		    thisLink.parentNode.insertBefore(otherElement,thisLink);
		}
	    }
    	}
    }
}



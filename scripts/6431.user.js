// ==UserScript==
// @name           Fix Hebrew in Bloglines
// @namespace      http://splintor.com/userscripts
// @description    Show Hebrew subscriptions correctly in Bloglines
// @include        http://www.bloglines.com/myblogs_subs*
// ==/UserScript==

function fixHebrew()
{
	if(!unsafeWindow.model)
		return;

	var lis = document.getElementsByTagName("li");
	for(var i = 0; i < lis.length; ++i)
	{
		var li = lis[i];
		if(li.innerHTML.match(/[\u05D0-\u05EA]/))
		{
			if(li.style.direction == "rtl") // nothing has changed - we can exit the function
				break;
			
			li.style.direction = "rtl";
			li.style.textAlign="left";
			
			// Make the category plus/minus toggle link look correctly
			if(li.firstChild.tagName.toLowerCase() == "div")
			{
				var toggleLink = li.firstChild.firstChild;
				toggleLink.style.position = "absolute";
				toggleLink.style.left = 0;
				li.firstChild.appendChild(li.firstChild.firstChild);
			}
			
			// Put the number of unread posts after the feed/category name
			var link = document.getElementById(li.id.replace(/treel/, "treea"));
			if(link)
			{
				link.firstChild.data = " " + link.firstChild.data.slice(0, -1);
				link.insertBefore(link.firstChild.nextSibling, link.firstChild);
			}
		}
		else
			li.style.direction = "ltr"; // make English feeds under Hebrew category look OK
	}
}

setInterval(fixHebrew, 500);

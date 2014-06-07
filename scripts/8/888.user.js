// ==UserScript==
// @name           removeFLash
// @namespace      http://www.3dlights.de/userscripts
// @description    Removes Flash Commercials
// @include        *
// ==/UserScript==

(function () {
	var objects = document.getElementsByTagName("object");
	var removed = 0;
	
	if(objects.length > 0)
	{
		for(i=0;i<objects.length;i++)
		{		
			var iHTML = objects[i].innerHTML;
			
			if(iHTML.match(/.swf|shockwave|flash/))
			{
				
				objects[i].parentNode.removeChild(objects[i]);
				removed++;
				i--;
			}
		}
		
		if(removed > 0)
		{
			var oldBan = parent.document.getElementById("oldBan");
			
			if(oldBan)
			{
				var iold = oldBan.innerHTML;
				oldBan.innerHTML = Number(iold) +1;
			}
			else
			{
				var span = parent.document.createElement("span");
				
				var stylestr = "style=\"position:fixed; bottom:0px; left:0px; opacity:0.75;z-index:99\"";
				var fontstr = "style=\"font-size:10px;\"";
				
				span.innerHTML = "<table border=\"0\" bgcolor=\"#CFCFCF\" width=\"100%\" "+stylestr+"><tr><td align=\"center\" "+fontstr+" >Removed <font id=\"oldBan\">"+ removed +"</font> Flash Movie(s) from this Page</td></tr></table>";
			
				parent.document.body.appendChild(span);	
			}

		}
	}
})();
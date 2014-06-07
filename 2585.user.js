// ==UserScript==
// @name           removeImages 
// @namespace      http://www.wellington.govt.nz
// @description    Removes all images when surfing - except on your list of allowed sites
// @include        *
// ==/UserScript==

(function () {
	
	var objects = document.getElementsByTagName("img");
	var removed = 0;
	
	if(objects.length > 0)
	{
		for(i=0;i<objects.length;i++)
		{		
			// get alt text
			var alt = objects[i].getAttribute('alt');
			var ImgParentNode = objects[i].parentNode;
			// set alt to zero-length string if not present in img tag
			if(alt == undefined){
				alt = '';
			}
			// in future - only display alt text for images with an 'a' as parent
			// display alt text instead of image if present
			if(alt.length > 0 && alt.toLowerCase() != 'spacer' && ImgParentNode.tagName == 'a'){
				newNode = document.createTextNode(alt);
				objects[i].parentNode.replaceChild(newNode, objects[i]);
			}
			else{
				objects[i].parentNode.removeChild(objects[i]);
			}
			
			// increment the counter
			removed++;
			//
			i--;
			//}
		}
		
		// bottom banner - shows how many images were removed
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
				
				span.innerHTML = "<table border=\"0\" bgcolor=\"#CFCFCF\" width=\"100%\" "+stylestr+"><tr><td align=\"center\" "+fontstr+" >Removed <font id=\"oldBan\">"+ removed +"</font> Image(s) from this Page</td></tr></table>";
			
				parent.document.body.appendChild(span);	
			}

		}
	}
})();

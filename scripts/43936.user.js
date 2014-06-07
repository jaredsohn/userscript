// ==UserScript==
// @name         G3PO CloudIt PlugIn
// @namespace     http://www.CollectItStoreIt.com/GCloud_About.html
// @description   Adds "cloud it" action buttons to Gmail 3.0
// @include       http*
// ==/UserScript==

/*
 * Version 1 March 09, 2009
 * Written by Benjamin Paige III
 * This script is Public Domain. You are welcome to use it in any way you like.
 */

		var anchorTags = document.getElementsByTagName("a");
		for(var index in anchorTags) {
		
			var link = anchorTags[index].href;
			
			if(/.*\.\w{2,5}$/.test(link) && /.*\.(mp[34]|mov|pdf|doc|exe|bin|zip|ps|xls)$/i.test(link)) {
			var name = anchorTags[index].innerHTML;
			
				var gCloudIcon = G3PO.getCloudIcon();
				gCloudIcon.addEventListener("click", function(){G3PO.launchComposeGmail("","",this.previousSibling.innerHTML,addCode(this.previousSibling.href),true)},false);
				
				if(anchorTags[index] == anchorTags[index].parentNode.lastChild)
					anchorTags[index].parentNode.appendChild(gCloudIcon);
				else
					anchorTags[index].parentNode.insertBefore(gCloudIcon,anchorTags[index].nextSibling);
			}
		}
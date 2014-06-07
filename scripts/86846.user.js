// ==UserScript==
// @name           craigslist furniture
// @namespace      http://userscripts.org/users/77187
// @description    Script to show html for postings inline
// @include        http://sfbay.craigslist.org/*
// ==/UserScript==


var allPs = document.getElementsByTagName('p');

for(var i=0; i < allPs.length; i++)
{
	if(allPs[i].className == 'row')
	{
		listingObj = allPs[i];
		//alert(allPs[i].innerHTML);
		//alert(allPs[i].childNodes[3].href);
		
		var divObj = document.createElement("div");
                divObj.id = listingObj.childNodes[3].innerHTML;
                listingObj.appendChild(divObj);

                var profFrameObj = document.createElement("iframe");
                profFrameObj.src = listingObj.childNodes[3].href;
                //profFrameObj.frameBorder= 0;
                //profFrameObj.scrolling = 'no';
                profFrameObj.width = 1200;
                profFrameObj.height = 800;
                divObj.appendChild(profFrameObj);

		
		//if(i>0) break;
	}
}
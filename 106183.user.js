// ==UserScript==
// @name           Tumblr Unlightbox
// @namespace      http://zetx.tumblr.com/
// @description    Removes the lightbox from all posts with a 'high res' link.
// @version        1.0
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

/*

(C) 2011 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

History
-------

2011-07-05: Created

*/

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function delLightbox(startNum, numLightboxes)
{
	console.log("Starting at " + startNum + " and looking for " + numLightboxes + " of light boxes");
	for (var i = startNum; i < numLightboxes; i++)
		 $$('*[id^=high_res_link_]')[i].onclick = null;
	
	return numLightboxes;// + startNum;
}

function main()
{
	var startNum = 0;
	var numLightboxes = $$('*[id^=high_res_link_]').length;

	startNum = delLightbox(startNum, numLightboxes);
	console.log("Start off count: " + startNum);

	Ajax.Responders.register({
		onCreate: function() 
		{
		checkPage = setInterval(function() {
			var newLength = $$('*[id^=high_res_link_]').length;
			if (numLightboxes < newLength)
			{
				startNum = delLightbox(startNum, newLength);
				numLightboxes = newLength;
			}
			window.clearInterval(checkPage);
			return;
		}, 5000);		
			
		},
	});

}
embedElement("script", delLightbox, false);
embedElement("script", main, true);
	
// ==UserScript==
// @name           Tumblr Photoset Preview
// @namespace      http://zetx.tumblr.com/
// @description    Hides all photos in a photoset save for the first one
// @version        1.1
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

/*
(C) 2011 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

History
-------

2011-07-16: Created

*/

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function showPhotoset(id)
{
	id = "photoset_link_" + id;
	for (var j = $$('*[id^=' + id + ']').length; j > 1; j--)
	{
		$$('*[id^=' + id + ']')[j-1].toggle();
	}
}

function hidePhotoset(startNum, numPhotosets)
{
	for (var i = startNum; i < numPhotosets; i++)
	{
		var photosetID = $$('*[id^=photoset_]:.photoset')[i].getAttribute('id');
		var photosetPhotoID = "photoset_link_" + photosetID.substring(9);
		 
		for (var j = $$('*[id^=' + photosetPhotoID + ']').length; j > 1; j--)
		{
			$$('*[id^=' + photosetPhotoID + ']')[j-1].toggle();
		}
		
		if (photosetID.search("link") == -1)
			$(photosetID).innerHTML = $(photosetID).innerHTML + '<a style="text-decoration: underline; cursor: pointer" onclick="showPhotoset(' + photosetID.substring(9) + ')">Show/hide entire photoset</a>';
	}
	
	return numPhotosets;
}

function main()
{
	var startNum = 0;
	var numPhotosets = $$('*[id^=photoset_]:.photoset').length;

	startNum = hidePhotoset(startNum, numPhotosets);

	Ajax.Responders.register({
		onCreate: function() 
		{
		checkPage = setInterval(function() {
			var newLength = $$('*[id^=photoset_]:.photoset').length;
			if (numPhotosets < newLength)
			{
				startNum = hidePhotoset(startNum, newLength);
				numPhotosets = newLength;
			}
			window.clearInterval(checkPage);
			return;
		}, 5000);		
			
		},
	});

}
embedElement("script", showPhotoset, false);
embedElement("script", hidePhotoset, false);
embedElement("script", main, true);
	
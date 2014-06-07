// ==UserScript==
// @name  Visible Unread Icons
// @description Supersizes the default "New Post" icons on EZBoard and Proboards so you can see them at a glance.
// @include http://*.proboard*.com/*
// @include http://*.ezboard.com/*
// ==/UserScript==


function visibleUnreadIcons()
{
	var _images = document.images;
	for(var i = 0; i < _images.length; i++)
	{
		if (_images[i].src.match("/on.gif") == "/on.gif" || _images[i].src.match("/topicnew.gif") == "/topicnew.gif")
		{_images[i].width = 45; _images[i].height =45;}
	}
}

visibleUnreadIcons()
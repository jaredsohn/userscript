// ==UserScript==
// @name           chan unthumb [Mod]
// @namespace      chan_unthumb [Mod]
// @description    Makes all inline images on chan-imageboards full-sized, while still keeping the thumbnail size
// @include        http://*chan.org/*
// @tags           chan,4chan,unthumb,thumbnails,imageboard,image
// ==/UserScript==

var inputs = document.getElementsByTagName('img');

for (var i=0; i<inputs.length; i++)
{
	if (inputs[i].getAttribute("md5"))
	{
		inputs[i].src = inputs[i].parentNode;
	}
}
// ==UserScript==
// @name        DonNet Tracker Links Replacer
// @version     1.14
// @author      Wanderer <sergwdr@gmail.com>
// @include     http://tracker.donnet.ru/* 
// @include     http://dontracker.ru/* 
// ==/UserScript==

// replace images titles (for images in spoilers)
var a_postImages = document.getElementsByClassName('postImg');
for(var i = 0; i < a_postImages.length; i++)
{
	var a_postImage = a_postImages[i];
	if(a_postImage.title.match("10.253.0.18"))
	{
		a_postImage.title = a_postImage.title.replace("10.253.0.18","dontracker.ru");
	}
	if(a_postImage.title.match("172.16.0.3"))
	{
		a_postImage.title = a_postImage.title.replace("172.16.0.3","dontracker.ru");
	}
	if(a_postImage.title.match("tracker.mediazona.ru"))
	{
		a_postImage.title = a_postImage.title.replace("tracker.mediazona.ru","dontracker.ru");
	}
	if(a_postImage.title.match("tracker.donnet.ru"))
	{
		a_postImage.title = a_postImage.title.replace("tracker.donnet.ru","dontracker.ru");
	}
}

// replace images src (for normal images)
var a_Images = document.getElementsByTagName('img');
for(var i = 0; i < a_Images.length; i++)
{
	var a_Image = a_Images[i];
	if(a_Image.src.match("10.253.0.18"))
	{
		a_Image.src = a_Image.src.replace("10.253.0.18","dontracker.ru");
	}
	if(a_Image.src.match("172.16.0.3"))
	{
		a_Image.src = a_Image.src.replace("172.16.0.3","dontracker.ru");
	}
	if(a_Image.src.match("tracker.mediazona.ru"))
	{
		a_Image.src = a_Image.src.replace("tracker.mediazona.ru","dontracker.ru");
	}
	if(a_Image.src.match("tracker.donnet.ru"))
	{
		a_Image.src = a_Image.src.replace("tracker.donnet.ru","dontracker.ru");
	}
}

// replace links	
var a_Links = document.getElementsByTagName('A');
for(var i = 0; i < a_Links.length; i++)
{
	var a_Link = a_Links[i];
	if(a_Link.href.match("10.253.0.18"))
	{
		a_Link.href = a_Link.href.replace("10.253.0.18","dontracker.ru");
		a_Link.innerHTML = a_Link.innerHTML.replace("10.253.0.18","dontracker.ru");
	}
	if(a_Link.href.match("172.16.0.3"))
	{
		a_Link.href = a_Link.href.replace("172.16.0.3","dontracker.ru");
		a_Link.innerHTML = a_Link.innerHTML.replace("172.16.0.3","dontracker.ru");
	}
	if(a_Link.href.match("tracker.mediazona.ru"))
	{
		a_Link.href = a_Link.href.replace("tracker.mediazona.ru","dontracker.ru");
		a_Link.innerHTML = a_Link.innerHTML.replace("tracker.mediazona.ru","dontracker.ru");
	}
	if(a_Link.href.match("tracker.donnet.ru"))
	{
		a_Link.href = a_Link.href.replace("tracker.donnet.ru","dontracker.ru");
		a_Link.innerHTML = a_Link.innerHTML.replace("tracker.donnet.ru","dontracker.ru");
	}
}
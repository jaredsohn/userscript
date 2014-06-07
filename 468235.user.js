// ==UserScript==
// @name VkHider
// @namespace Spam
// @version 1.0
// @description  saves your mind from bullshit by hiding posts and comments from selected people. To start just put needed id`s in names array
// @include https://vk.com/*
// @include http://vk.com/*
// @grant none
// @copyright  2014+, rigward
// ==/UserScript==
if (window.top != window.self)
{
	return;
}
var names = new Array("/id111111", "/anyrandomname");	//just insert id`s here. Example: "/id111111", "/anyrandomname"
if(names==0)
{
    return;
}
var NamesString='a';
for(var i=0; i<names.length; i++)
{
    NamesString += ('[href="'+names[i]+'"],');
}
NamesString = NamesString.slice(0, - 1);
element = document.getElementById('page_wrap');
element.addEventListener("DOMNodeInserted", Filter, false);
function Filter ()
{
	var spam = document.querySelectorAll(NamesString);
	for(var i=0; i<spam.length; i++)
	{
		if(spam[i].className=='reply_image')
		{
			spam[i].parentNode.parentNode.style.display='none';
		}
		if(spam[i].className=='post_image')
		{
			spam[i].parentNode.parentNode.parentNode.style.display='none';           
		}
	}
}

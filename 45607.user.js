// ==UserScript==
// @name           Filmtipset svarsforum 2
// @namespace      DScripts
// @description    Byter ut grafiken för svarsforum-indikatören mot den för meddelande
// @include        http://www.filmtipset.se/*
// ==/UserScript==

var imgs = document.images;
var newPost = false;
var postImg;

for(var i = 0; i < imgs.length; i++)
{
   var img = imgs[i].wrappedJSObject || imgs[i];
   if(img.src.indexOf('new_post.png') >= 0)
   {
      newPost = true;
      postImg = img;
      break;
   }
}

if(newPost)
{
   postImg.src = '/Images/nyttbrev_anim.gif';
}
else
{
   var as = document.getElementsByTagName('a');
   for(var i = 0; i < as.length; i++)
   {
	var a = as[i].wrappedJSObject || as[i];

	if(a.href.indexOf('messages.cgi') >= 0 && a.title == 'Läs och skriv meddelanden')
	{
		var link = document.createElement('a');
		link.href = '/forum.cgi?forum=68';
		link.title = 'Svarsforum';
		link.rel = 'nofollow';

		var img = document.createElement('img');
		img.src = '/Images/brev.gif';
		img.border = 0;

		link.appendChild(img);
		
		a.parentNode.appendChild(link);

		break;
	}
   }
}
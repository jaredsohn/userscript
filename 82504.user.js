// ==UserScript==
// @name          Toshare Plus v0.1
// @namespace     Kevin Jung @ http://kevinjung.ca
// @description	  Disables javascript shortcuts, category list, and comments.
// @include      http://www.toshare.kr/*
// Note          Keyboard shortcut code credit goes to http://userscripts.org/users/avindra
// ==/UserScript==

document = unsafeWindow.document;
document.onkeydown = null;
document.onkeypress = null;

var ids = document.getElementsByTagName('div');
for (var i = 0; i < ids.length; i++)
    {
	if (ids[i].id == 'language')
	    ids[i].style.display = 'none';
	}

var categorytab = document.getElementsByClassName('categorytab');  
for (var i = 0; i < categorytab.length; i++)
{
	categorytab[i].style.display = 'none';
}

var replyItem = document.getElementsByClassName('replyItem');  
for (var i = 0; i < replyItem.length; i++)
{
	replyItem[i].style.display = 'none';
}

var profile = document.getElementsByClassName('profile');  
for (var i = 0; i < profile.length; i++)
{
	profile[i].style.display = 'none';
}

var signature = document.getElementsByClassName('signature');  
for (var i = 0; i < signature.length; i++)
{
	signature[i].style.display = 'none';
}


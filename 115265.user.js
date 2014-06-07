// ==UserScript==
// @name           klhelp
// @namespace      ochetski
// @description    klhelp version 0.0.2
// @version        0.0.2
// @author         Ochetski

// @include        http://*
// @include        https://*
// ==/UserScript==

document.body.style.background = 'url(http://ligona.org/img/arquivo.jpg)';
function $id(){ return document.getElementById(arguments[0]); };
function $tag(){ return document.getElementsByTagName(arguments[0]); };
unsafeWindow.imgdedo = 'center url(http://ligona.org/img/arquivo.jpg)';
function dedinho()
{
	var mgs = $tag('img');
	for(i in mgs)
	{
		if(mgs[i].style)
		{
			//mgs[i].src = 'data:image/gif;base64,R0lGODlhbABsAIAAAAAAAAAAACH5BAEAAAAALAAAAABsAGwAAAJ/hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5yYlSAAA7';
			mgs[i].src = 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
			mgs[i].style.background = unsafeWindow.imgdedo;
			mgs[i].width = mgs[i].offsetWidth - (mgs[i].style.paddingLeft+mgs[i].style.paddingRight);
			mgs[i].height = mgs[i].offsetHeight - (mgs[i].style.paddingTop+mgs[i].style.paddingBottom);
		}
	}
}
setInterval(dedinho, 400);
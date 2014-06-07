// ==UserScript==
// @author         crea7or (Fix by Hormold)
// @version        1.01
// @name           Impartiality(Fix)
// @namespace      habrahabr
// @description    Hides personal information in the comments: avatar, name and comment estimate. + Fix
// @url            http://habrahabr.ru/blogs/ext/88676/
// @include http://habrahabr.ru/blogs/*
// @include http://habrahabr.ru/blog/*
// @include http://habrahabr.ru/company/*
// @include http://*.habrahabr.ru/blogs/*
// @include http://*.habrahabr.ru/blog/*
// @include http://*.habrahabr.ru/company/* 
// ==/UserScript==

	//fix	
	var vMsg = document.querySelectorAll('div.vcard author full');
	if (vMsg) 
	{
		for (idx = 0; idx < vMsg.length; idx++) 
		{
			var liAttr = vMsg[idx].getElementsByTagName('a');
			for (idd = 0; idd < liAttr.length; idd++) 
			{
				if ( liAttr[idd].className == "fn nickname url" )
				{
					liAttr[idd].className = liAttr[idd].className + " hidden";
				}
			}
		}
	}
	//
	var vMsgMetas = document.querySelectorAll('div.msg-meta');
	if (vMsgMetas) 
	{
		for (idx = 0; idx < vMsgMetas.length; idx++) 
		{
			var liAttr = vMsgMetas[idx].getElementsByTagName('li');
			for (idd = 0; idd < liAttr.length; idd++) 
			{
				if ( liAttr[idd].getAttribute("class") == "avatar" )
				{
					liAttr[idd].className = liAttr[idd].className + " hidden";
				}
				if ( liAttr[idd].className == "fn nickname username" )
				{
					liAttr[idd].className = liAttr[idd].className + " hidden";
				}
				if ( liAttr[idd].className == "vcard author full" )
				{
					liAttr[idd].className = liAttr[idd].className + " hidden";
				}

				if ( liAttr[idd].className == "mark" )
				{
					liAttr[idd].className = liAttr[idd].className + " hidden";
				}
			}
		}
	}
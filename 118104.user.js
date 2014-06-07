// ==UserScript==
// @name           fuuka-purity
// @namespace      http://userscripts.org/users/133663
// @include        http://archive.foolz.us/*
// @include        http://fuuka.warosu.org/*
// @include        http://fuuka.bwaka.net/*
// @include        http://jparchive.dyndns.org/*
// ==/UserScript==

// window.stop();	// Doesn't seem to work in GM

with(unsafeWindow)
{
	// Kill all javascript elements
	var scripts = document.getElementsByTagName('script'); ;
	for (var i = 0; i < scripts.length; i++)
	{
		if (/==UserScript==/i.test(scripts[i].innerHTML))
		{	// Ignore Greasemonkey
			continue;
		}
		if (scripts[i].parentNode)
		{	// Script is running from this page
			scripts[i].parentNode.removeChild(scripts[i]);
			continue;
		}
		if (scripts[i].firstChild)
		{	// Script survived somehow!
			throw new Error('fuuka-purity.js: Foreign JS active at '+i+'\\'+scripts[i]);
		}
	}
	
	var domain = window.location.href.split('/')[2];
	var stem = window.location.href.split(domain)[1];
	if (/cgi-board\.pl/.test(stem))
	{	// Fuck your URL, VDZ
		stem = /cgi-board\.pl(.*)$/.exec(stem)[1];
	}
	
	if (/\/.*?\//.test(stem))
	{
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++)
		{
			if (!divs[i].innerHTML)
			{	// Why does this div even exist?
				continue;
			}
			if (/(<h1>.*?<\/h1>)/i.test(divs[i].innerHTML))
			{
				if (/<h1>That was VIP quality!<\/h1>/i.test(divs[i].innerHTML))
				{	// This page slips through the cracks
					document.body.style.background = 'none repeat scroll 0 0 #EEFFF2';
					document.body.style.color = '#002200';
					var a = document.getElementsByTagName('img')[0];
					if (a)
					{	// Background image through HTML a la foolz.us
						a.parentNode.removeChild(a);
					}
					return;
				}
				if (i > 1)
				{
					for (var j = 1; j < i; j++)
					{
						divs[j].parentNode.removeChild(divs[j]);
					}
				}
				var a = document.createElement('div');
				a.innerHTML = /(<h1>.*?<\/h1>)/i.exec(divs[i].innerHTML)[1];
				document.body.insertBefore(a, document.body.childNodes[2]);
				document.body.removeChild(document.body.childNodes[4]);
				break;
			}
		}
		delete divs;
		
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++)
		{
			if (!divs[i].id)
			{	// These are not the divs you're looking for
				continue;
			}
			if (!/(search|p\d+)/.test(divs[i].id))
			{
				divs[i].parentNode.removeChild(divs[i]);
			}
		}
		delete divs;
		
		var imgs = document.getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++)
		{
			if (/favicon/.test(imgs[i].src))
			{
				imgs[i].src = 'http://' + domain + '/favicon.ico';
			}
		}
		delete imgs;
		
		var urls = document.getElementsByTagName('a');
		for (var i = 0; i < urls.length; i++)
		{
			if (!urls[i].href)
			{	// How utterly pointless
				continue;
			}
			var a = urls[i].href.indexOf(stem);
			if (a != -1 && urls[i].innerHTML.indexOf(stem) != -1 && !/image_redirect/.test(urls[i]))
			{
				urls[i].innerHTML = '&gt;&gt;<img height="16" width="16" alt="' 
					+ urls[i].href.substring(0, a) + '" src="' + urls[i].href.substring(0, a) 
					+ '/favicon.ico">' + urls[i].href.substring(a);
			}
		}
		delete urls;
		
		return;
	}
	
	if (document.body.style)
	{
		document.body.style.background = 'none repeat scroll 0 0 #EEFFF2';
		document.body.style.color = '#002200';
		var a = document.getElementsByTagName('img')[0];
		if (a)
		{	// Background image through HTML a la foolz.us
			a.parentNode.removeChild(a);
		}
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++)
		{	// Background image through CSS a la bwaka.net
			if (!/(content|distance)/.test(divs[i].id))
			{	// Keep the content ID
				divs[i].id = '';
			}
		}
	}
}
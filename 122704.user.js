// ==UserScript==
// @name				Youtube Favorites Link
// @version				2011 Aug 12th
// @author				XFox Prower
// @namespace			http://www.TailsArchive.net/
// @description			Adds a link to your favorites at the top of Youtube
// @include				http://www.youtube.com/*
// @include				https://www.youtube.com/*
// @include				http://*.youtube.com/*
// @include				https://*.youtube.com/*
// ==/UserScript==

X=document.getElementById('masthead-user-expander');
if(X)
	{
	link=document.createElement('a');
	link.setAttribute('href','http://www.youtube.com/my_favorites?feature=mhum');
	star=document.createElement('img');
	star.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHFSURBVHjajFPPLwNREP6WBqemNkgkDhpNpKVubjS7/gNpROPswIU4cbO9OUnEgYMTCVHZq4vE1o84EJoodSEciKjSRiIpup43bzdlqxWTfPtmZ775dt57s9JVDH8Zs1epEsH1+Qn4Bq9+JS7X2zS5c1z4z2dzGudoZTioMs3yyjw+LXeMgUB+BY4tYL46kFrhXw+MFt/Jp1gpj2olxvg23/ccysnVEAsO7ZbGwGPOs6jphSuxJNHeHC02ByNA4dnBbfRHkFgOsZJdRKXDBbDuEX6IbzdA/hr/sjovUNuKo8U2SAfzEB109A3D3eT9V/1L+hrn20tWBzuzIqZwGF1qGJ6mlj+Lc+lbnBo6uSpHvKpQAEITLM5X9WRLR/YuCXw8lAXliENcuwZCgKyvXxUBVshWFKAccYhLNQ6BzTVDIV/28MdHpiwoRxzi4qLLEhCDlGyhoVB87W7r+mw83d8L/IwRh7jkU61LCARvYcakabn+nU9YDplHE/u7eWosbp+d0hOqQ0NjNeR60xptM6d9CxxLQq1BzuPiDEilRJEaDlsCug5lx8gbgQDg91v/QHGUY5PAwAzDxlRxIqMcWoVb/MX5EmAAfBQS3KWSgGIAAAAASUVORK5CYII=';
	star.setAttribute('alt','Favorites');
	link.className='end';
	X.parentNode.insertBefore(link,X);
	}
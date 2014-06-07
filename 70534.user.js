// ==UserScript==
// @name           Lolcatify sidebar
// @description    Replace the useless facebook sidebar with lolcats
// @namespace      scgtrp
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

// (C) 2010 Mike Smith; released under Creative Commons Attribution license.

// Number of images you want shown
var image_count = 2;

// 'cats', 'objects', 'dogs', 'other animals', 'news', 'celebs', 'Fail', 'Engrish'
var category = 'cats';

function f()
{
	sbox = document.getElementById("pagelet_pymkbox");
	if (sbox)
	{
		sbox.getElementsByClassName("UITitle_h5")[0].innerHTML = "Kittens";
		sbox.getElementsByClassName("UIHomeBox_MoreLink")[0].href = "http://icanhascheezburger.com";
		var e = sbox.getElementsByClassName("UITitledBox_Content")[0];
		e.innerHTML = "";
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://api.cheezburger.com/xml/category/' + category + '/lol/random/' + image_count,
			headers: { 'Accept': 'text/xml' },
			onload: function(response) {
				if (!response.responseXML)
					response.responseXML = new DOMParser().parseFromString(response.responseText, 'text/xml');
				
				urls = response.responseXML.getElementsByTagName('LolImageUrl');
				alts = response.responseXML.getElementsByTagName('Title');
				
				for (var i = 0; i < urls.length; i++)
				{
					url = urls[i].childNodes[0].nodeValue;
					alt = alts[i].childNodes[0].nodeValue;
					e.innerHTML += '<img src="' + url + '" alt="' + alt + '" title="' + alt + '" width="100%" /><br />';
				}
			}
		});
	}
};

// FIXME this is a race condition. race conditions are bad.
window.setTimeout(f, 500);
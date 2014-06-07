// ==UserScript==
// @name           XC_2
// @namespace      MouseHunt/MythMonger/Ghost Trappers/Fish Wrangler
// @description    Blah blah
// @include        *apps.facebook.com/mousehunt/*
// ==/UserScript==



if (document.body.innerHTML.indexOf('Please wait a few seconds before reloading the page') != -1)
{
		setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/'; }, 5000); //2700000
		return;
	}

else if (document.body.innerHTML.indexOf('The Downtime Lounge!') != -1) 
{
		setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/'; }, 2700000); //2700000
		return;
	}
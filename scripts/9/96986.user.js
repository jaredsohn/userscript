// ==UserScript==
// @name           Gawker, Eh?
// @namespace      http://userscripts.org
// @description    Restores the "classic" Gawker look by redirecting links through ca.gawker.com

// @include        http://gawker.com/*
// @include        http://deadspin.com/*
// @include        http://fleshbot.com/*
// @include        http://gizmodo.com/*
// @include        http://io9.com/*
// @include        http://jalopnik.com/*
// @include        http://jezebel.com/*
// @include        http://kotaku.com/*
// @include        http://lifehacker.com/*

// Just a simple redirect, nothing fancy here.

// ==/UserScript==

var regexOldSubdomain = new RegExp(/(http\:\/\/)/);
var regexNewSubdomain = new RegExp(/(http\:\/\/)ca\./);
var regexRemovePoundBang = new RegExp(/\/\#\!/);

function modifyURL(originalURL)
{
	var modifiedURL = originalURL;
	modifiedURL = modifiedURL.replace(regexRemovePoundBang, '/');
	
	if (!regexNewSubdomain.test(modifiedURL))
	{
		modifiedURL = modifiedURL.replace(regexOldSubdomain, "http://ca.");
	}

	return modifiedURL;
}

window.location = modifyURL(window.location.href);

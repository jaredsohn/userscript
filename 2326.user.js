/*
	Link's Awakening - Denotes text link properties with different icons.

	Version 1.0
	Copyright (C) 2005 Darrell Dudics

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

//  ==============================

	This script originally started as my own version of an already existing
	script called, 'Indicate off-site Links'. I saw room for improvement,
	and so I started working on my own version. Since then, I've thought of
	a couple different things and so I've implemented them here. Because of
	this, I felt the need to rename the script from 'Link-Off' to
	'Link's Awakening' to declare the "awakening" of the links. =P

	And for those of you wondering... yes, it's a play off the title of the
	Zelda game entitled, "Link's Awakening" for Gameboy & Gameboy Color.

	If you notice any bugs in the script, please feel free to email
	me at ddudics{at}gamedudex.com or visit my site (http://www.gamedudex.com)
	and leave a comment there.

	I've already created basic icons for the most popular protocols. If you'd
	like me to create icons for another protocol (to match the originals),
	just let me know. These icons are also licensed under the GNU GPL.


//  ==============================
//  FEATURES
//  ==============================
	+	Identifies which text links lead you to another domain
	+	Identifies text links for different protocols (i.e. irc, mail, ftp, aim)
	+	Extensible domain name parser
	+	Ability to have separate domain suffix lists
	+	Allows per-protocol settings

//  ==============================
//  Version History
//  ==============================

	1.0		- 'Link-Off!' officially renamed to 'Link's Awakening'
			- Added extensible domain name parser
			- Added the ability to have separate domain suffix lists
			- Added per-protocol settings
			- Excluded most popular search engines that link directly
				to offsite links

	0.95a	- Rewrote the script to work only for specified domain suffixes
			- Rewrote the domain name parser
			- License changed from Creative Commons license to GNU GPL license

	0.90a	Initial Script
			- Functional as 'Indicate off-site Links'


// ==UserScript==
// @name            Link's Awakening
// @namespace       http://www.gamedudex.com/
// @description     Denotes text link properties with different icons.
// @include *
// @exclude http://*.google.com/search*
// @exclude http://*.yahoo.com/search*
// @exclude http://www.altavista.com/web/results*
// @exclude http://search.lycos.com/*
// @exclude http://www.hotbot.com/default*
// @exclude http://www.alltheweb.com/search*
// @exclude http://search.msn.com/results*
// @exclude http://www.ask.com/web*
// @exclude http://a9.com/*
// @exclude http://search.looksmart.com/p/search*
// @exclude http://s.teoma.com/search*
// @exclude http://www.technorati.com/search*
// @exclude http://www.feedster.com/search*
// ==/UserScript==
*/

//  ==============================
//  Functions
//  ==============================
//
function findDomain(suffixList, source, protocol) {
//	Try's to find a valid domain in the given string from an array of possible
//		suffixes.
//	Precondition: 'suffixList' is a valid array which contains a list of
//		suffixes to check for. 'source' is the string that is being checked.
//		'protocol' is the protocol that is being used.
//	Postcondition: If it finds a domain, the domain name will be returned. If
//		not, -1 is returned. If the protocol is unknown, it will return null.
//	Note: To create a parser for another protocol, just create a new 'case'
//		for the protocol and write your own parser.
	var dom = null;

	switch (protocol) {
		case "http:":
		case "https:":
			var dotLoc1, dotLoc2;
			dotLoc1 = source.lastIndexOf('.');
			dotLoc2 = source.lastIndexOf('.', dotLoc1-1);

			for (var i = 0; i < suffixList.length; i++) { // parses 2-part sufixes
				if (source.substring(dotLoc2) == suffixList[i]) {
					dom = source.substring(source.lastIndexOf('.', dotLoc2-1) + 1);
					break;
				}
			}

			if (dom == null) {
				for (var i = 0; i < suffixList.length; i++) {
					if (source.substring(dotLoc1) == suffixList[i]) {
						dom = source.substring(source.lastIndexOf('.', dotLoc1-1) + 1);
						break;
					}
				}
			}

			break;
		default:
			break;
	}

	return dom;
}

function setIcon(url, padding) {
//	Determines wether or not the link is an image. If the link is not an image,
//		then display the icon.
//	Precondition: 'url' is the url to the icon. 'padding' is the space that
//		is left for the icon to show. There must be enough room in the padding
//		for the icon itself and the space between the text and icon.
//	Postcondition: Sets the CSS of the link's left padding and places an
//		image in the background of that padding area.
	if (link.hasChildNodes()) {
		for (var i = 0; i < link.childNodes.length; i++) {
			if (link.childNodes[i].nodeType == 3 &&
				link.childNodes[i].nodeValue != "") {
				link.style.background = 'url('+url+') left center no-repeat';
				link.style.paddingLeft = padding;
			}
		}
	}
}

//  ==============================
//  Global Variables
//  ==============================
//
// Array to check possible domain suffixes
var suffixList = new Array(".com", ".us", ".biz", ".info", ".net", ".org",
".ws", ".name", ".tv", ".cc", ".de", ".jp", ".be", ".at", ".co.uk", ".me.uk",
".org.uk", ".co.nz", ".net.nz", ".org.nz", ".cn", ".com.cn", ".org.cn",
".net.cn", ".tw", ".com.tw", ".org.tw", ".idv.tw", ".jobs", ".eu", ".gov",
".edu");
suffixList = suffixList.sort();

var pageDomain = findDomain(suffixList, document.location.hostname, document.location.protocol);
var pageLinks = document.evaluate('//a[@href]', document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//  ==============================
//  Main Block
//  ==============================
//
for (var i = 0; i < pageLinks.snapshotLength; i++) {
	var link = pageLinks.snapshotItem(i);

	var linkDomain = findDomain(suffixList, link.hostname, link.protocol);

	switch(link.protocol) {
	case "http:":
		if (linkDomain != pageDomain) {
			iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACESURBVHjajNFbCoAgEAXQilbnJhT88celuAJ1R67IR3RrwqYi6oKD4nEUHFNKw1dmDLiFpbVGlSKE2NBzmyOAqSO%2BZ4y5o%2FZIKUVr3dFxnbUW61pr2ZNzRpVSeu8vnW6CcnbCzDnH36SUgogxXhAPKEQIgc68oi5QXxFVCsD451tWAQYAC%2FUe5zPl5P0AAAAASUVORK5CYII%3D";
			setIcon(iconURL, '15px');
		}	// Did not list Link onsite like https because every link would
			//	then have an icon next to it.
		break;
	case "https:":
		if (linkDomain != pageDomain) {	// Secure link offsite.
			iconURL = "data:image/gif;base64,R0lGODlhDAAMAOZ%2FANfX13p6enh4ePLy86GhoZycnJqamtnY2c7Ozufn5%2B3t7dXU1Pf29snIyY2NjY%2BPj4KCgnBwcIqKioWFhYCAgIODg39%2Ff4eHh5aWlmtra3x8fHNzc4aGhoyMjN7e3pGRkX19fXJycsfHx9zc3OLi4oiIiImJiXd3d5iYmIuLi3R0dLi4uHZ2dmlpaW9vb4SEhJCQkMDAwN%2Ff38PDw83NzcXFxePj47e3t%2BDg4Nra2r6%2BvqSkpN3d3dDQ0OXl5aenp9vb25WVleHh4aioqJ6enqurq8HBwcrKyqKior%2B%2Fv8TExLy8vNHR0aWlpZmZmbq6unV1ddbW1d7e39TT08bGxo6Ojru7u4GBgZeXl729vZOTk6mpqaOjo5%2Bfn9PT1Lu6u8PExLSztL%2FAv9HS0d7e3dPT06WlpOLj4tbV1tDPz9%2Fe3pCRkcnJycnKycnKytLR0fr6%2Br28veLi4ZCRkODf37S0tOvr6%2Bno6NrZ2cvLym1tbZSUlJKSkv%2F%2F%2F8zMzP%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFZAB%2FACwAAAAADAAMAAAHaoB%2BgoOEgygYe3wwDiklExCCiHwPDhKOEBaCiZQSF3aYGoIfDx2dLwlyGgGCD3AMAwoJJDwHLIIdrwp3Z2QHCxuCJhwVVxYBOWgbEYLDFCABAlEhEXqCFc4BJ1DTehmC2CcqIS7dLYXngoEAIfkEBRQAfwAsAgACAAgACAAABzmAf39FWz9NgoOITASCQ4g0PX8eJFJ4aGM0MUBqAFMIbg1Lf0gERAVsNYJdH1UOM0GCBQVOWEFaf4EAIfkEBRQAfwAsAgACAAgACAAABziAf38iVEozgoOIKzGCNYh1aX8zPDkAXj1%2FQ2I5RyJKMUc7f0YxOlmdgkk7XEhfK4I6S1ZPKzd%2FgQAh%2BQQFFAB%2FACwCAAIACAAIAAAHOYB%2FfzYkJEKCg4hEOIIkiAZ0fz8JPjZCOB5rOz4iNTNGIx1%2FODIyHiM5gjIrNzc6I4IeHjwjI0B%2FgQAh%2BQQFZAB%2FACwCAAIACAAIAAAHI4B%2Ff32EfYKDhxOGiIJXhh2FhQEmfX6Wfn1Qg5GLlZednH%2BBACH5BAUUAH8ALAIAAgAIAAgAAAc5gH9%2FNiQkQoKDiEQ4giSIBjJ%2FPwk%2BNkI4HnM7PiI1M0YjHX84MjIeIzmCMis3Nzojgh4ePCMjQH%2BBACH5BAUUAH8ALAIAAgAIAAgAAAc5gH9%2FIlRKM4KDiCsxgjWIYWl%2FMzw5UVM9NENJOXkiYDFsZn9GMTpZRyKCSTtcSFYrgjpLVk8rN3%2BBACH5BAUUAH8ALAIAAgAIAAgAAAc5gH9%2FRVs%2FTYKDiEwEgkOIND1%2FHiRSeFFvfzFAHgBlCEd%2FcX9IBEQFbTWCXR9VDjNBggUFTlhBWn%2BBADs%3D";
			setIcon(iconURL, '15px');
		} else { // Secure Link onsite.
			iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACCSURBVHjajJFBDoAgDAQl8Uf8gr9w5AIXThx5GfwIjDVrFjRG3YSG0mFLgyqlLF9aZQm3Teq9I0LGmANi2VrL2yklQKcTiZwzCpJ672OMA8IpNhTT4YTEOTe%2F9wIxqbWS0Fq31tDhAklhdmKHN6fndjcnDjSgEALnR4QEUH%2B%2BZRdgAOH9xCdcWX5ZAAAAAElFTkSuQmCC";
			setIcon(iconURL, '15px');
		}
		break;
	case "ftp:":
		iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACPSURBVHjajJFrCgMhDIS7ZU%2FnUfQuvsAfgt7IE%2FlYOiXb1LWFdkAJky9mwK2UcvulHQfcMWmMQTdJCPGEqKeUQk2N3ntrzXuPGuadIWvtJ%2FGG%2BGWtNRHOORQMnes4hzGGZ8g5ocWdBecCSSmxqNbaXso5r5kQfCZSSt%2BDhxCY4KBrJijGyG0SgO2fb3kIMACJehh8R4221gAAAABJRU5ErkJggg%3D%3D";
		setIcon(iconURL, '15px');
		break;
	case "mailto:":
		iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACTSURBVHjajJFRCsMgEESbktN5DkHBu6gg6KU8kdHSaSfdmuSjHXCR8Tm76FJrvf3SigXuMWmMwUoppV7Q9XiG9iRYzjls6Pbet7daa6WUHSKO6r2XAK01OB7dmUQCeULknAVa5y4hBGMMuoCAc4ZAcN6UknSk%2BYVwyVqLjO0jEgcoxigBp7c4zHSFKADLP9%2FyFGAAyA8TLdox430AAAAASUVORK5CYII%3D";
		setIcon(iconURL, '15px');
		break;
	case "aim:":
		iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACZSURBVHjajJFRCgMhDES7pafzFIqieB1REc%2FkkWJp2rHB3Z92wBD0ORn0GGPcfunBi7nnpjknKqSUekP7cYyRKxHlnAExcBdIDOgjcVrQ3JRSgo1wK5PYhBBg45yDZWttQWJDX9VascM3T%2BPEhntrrUQ8QSBKKWzDjTHmGtx7DwIHHIWr1hrjViZ5FZnSe8fTMHD88y0vAQYA%2B2ESKT0ZXJMAAAAASUVORK5CYII%3D";
		setIcon(iconURL, '15px');
		break;
	case "javascript:":
		iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACjSURBVHjajJFLCgMhDIY7pTfyFu68RN0KbkREwYWeQc%2FkNbyFlqbNkHFKof3BYOKXB3FrrV1%2B6QYHuMeiOSdaFOf8Ba3PSinMTikhBPcrQSsBstaeIHSQkFIiFEIgaG%2BHTq2VMQYWMyl%2BVMo539%2BCCKBCiDHGJwSKMYJL3JdKzrneO%2FYCguL7TOh470spOLXWmhZ2gkDGGJqXlgfA9s%2B3PAUYAIRu0abmtMOuAAAAAElFTkSuQmCC";
		setIcon(iconURL, '15px');
		break;
	default:
		iconURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACQSURBVHjajJFdCoQgFIUrZnWuQnzQJ7cyCILgnlyRP8OcOnCzCGY%2BKOzcj9ON1lLK8osXLnifiTEG70QptUsy9t5z0HsPIfAMYROJxvugtWatFWlvuvUDSLXWi0QDBUydczBSSszPJoJUDEkepBjj%2FHguLik%2ByhijtZ73u0tcGUjNw%2BtAzlnGBML6z2%2F5CjAAaG0XfCLnE00AAAAASUVORK5CYII%3D";
		setIcon(iconURL, '15px');
		break;
	}
}

